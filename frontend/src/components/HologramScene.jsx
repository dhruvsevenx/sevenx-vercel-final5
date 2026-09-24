import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
// Archivo Black (SIL OFL), subset to the wordmark glyphs and converted to three.js typeface JSON.
import wordmarkFont from "../assets/archivo-black-wordmark.typeface.json";

/**
 * WebGL hero emblem: extruded, iridescent-chrome SEVENX / MEDIA wordmark
 * inside a particle globe with gyroscope rings, a hologram projector beam
 * and a deep star field, finished with bloom. Tilts toward the pointer,
 * sways on its own on touch devices, renders one still frame under
 * prefers-reduced-motion, and pauses while off-screen.
 *
 * Loaded lazily from Hero.jsx; the CSS hologram shows until it's ready.
 */

const PALETTE = {
  bg: 0x040a1c,
  cyan: new THREE.Color("#22E4FF"),
  blue: new THREE.Color("#2F6BFF"),
  violet: new THREE.Color("#8B5CFF"),
  magenta: new THREE.Color("#FF4FD8"),
};

// Soft round sprite for particles and glows.
function makeGlowTexture(stops) {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => grad.addColorStop(o, col));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Dark studio lit by neon strips: gives the chrome deep blacks and coloured highlights.
function makeNeonEnvironment() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x01030a);
  const strip = (hex, intensity, w, h, pos) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(intensity), side: THREE.DoubleSide })
    );
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  strip("#22E4FF", 7, 12, 1.4, [-5, 4, 7]); // cyan, upper left
  strip("#FF4FD8", 5, 10, 1.1, [5, -4, 7]); // magenta, lower right
  strip("#FFFFFF", 5, 8, 0.5, [0, 7, 5]); // white top rim
  strip("#8B5CFF", 5, 1.6, 12, [8, 1, 3]); // violet, right
  strip("#2F6BFF", 4, 1.6, 12, [-8, -1, 3]); // blue, left
  strip("#2F6BFF", 1.2, 16, 8, [0, 0, -9]); // dim blue backdrop

  // Big soft gradient panel behind the camera: what the letters' front faces reflect.
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#CFF6FF");
  grad.addColorStop(0.28, "#22B8FF");
  grad.addColorStop(0.55, "#1B2E9E");
  grad.addColorStop(0.8, "#7B3CFF");
  grad.addColorStop(1, "#FF6ADF");
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const front = new THREE.Mesh(
    new THREE.PlaneGeometry(22, 14),
    new THREE.MeshBasicMaterial({ map: tex, color: new THREE.Color(1.6, 1.6, 1.6), side: THREE.DoubleSide })
  );
  front.position.set(0, 0, 10);
  front.lookAt(0, 0, 0);
  env.add(front);
  return env;
}

function buildWordmark(font) {
  const group = new THREE.Group();

  const chrome = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#E4EEFF"),
    metalness: 1,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    iridescence: 1,
    iridescenceIOR: 1.7,
    iridescenceThicknessRange: [180, 780],
    envMapIntensity: 1.25,
  });
  // Extruded sides glow electric blue so the letters read as solid light.
  const edge = new THREE.MeshStandardMaterial({
    color: PALETTE.blue,
    emissive: PALETTE.blue,
    emissiveIntensity: 2.2,
    metalness: 0.6,
    roughness: 0.3,
  });

  const main = new TextGeometry("SEVENX", {
    font,
    size: 1,
    depth: 0.34,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.028,
    bevelSegments: 6,
  });
  main.computeBoundingBox();
  const mb = main.boundingBox;
  main.translate(-(mb.max.x + mb.min.x) / 2, -(mb.max.y + mb.min.y) / 2 + 0.28, -0.17);
  group.add(new THREE.Mesh(main, [chrome, edge]));

  // MEDIA: per-letter meshes so it can be widely tracked.
  const glow = new THREE.MeshBasicMaterial({ color: PALETTE.cyan.clone().multiplyScalar(1.6), toneMapped: false });
  const size = 0.3;
  const tracking = 0.34;
  const letters = "MEDIA".split("").map((ch) => {
    const geo = new TextGeometry(ch, { font, size, depth: 0.06, curveSegments: 8, bevelEnabled: false });
    geo.computeBoundingBox();
    return { geo, w: geo.boundingBox.max.x - geo.boundingBox.min.x, minX: geo.boundingBox.min.x };
  });
  const total = letters.reduce((s, l) => s + l.w, 0) + tracking * (letters.length - 1);
  let x = -total / 2;
  letters.forEach(({ geo, w, minX }) => {
    geo.translate(x - minX, -0.78, -0.03);
    group.add(new THREE.Mesh(geo, glow));
    x += w + tracking;
  });

  return group;
}

function buildGlobe(count) {
  // Fibonacci sphere of glowing points, tinted cyan → violet from top to bottom.
  const radius = 2.7;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    pos.set([Math.cos(th) * r * radius, y * radius, Math.sin(th) * r * radius], i * 3);
    c.copy(PALETTE.cyan).lerp(PALETTE.violet, (1 - y) / 2);
    col.set([c.r, c.g, c.b], i * 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.07,
    map: makeGlowTexture([[0, "rgba(255,255,255,1)"], [0.35, "rgba(255,255,255,0.6)"], [1, "rgba(255,255,255,0)"]]),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const points = new THREE.Points(geo, mat);

  // Faint latitude / longitude wireframe for structure.
  const wire = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.SphereGeometry(radius * 0.995, 24, 12), 1),
    new THREE.LineBasicMaterial({ color: PALETTE.blue, transparent: true, opacity: 0.12, depthWrite: false })
  );

  const g = new THREE.Group();
  g.add(points, wire);
  return g;
}

function buildRings() {
  const specs = [
    { r: 3.25, tilt: [1.2, 0.3, 0], speed: 0.35, color: PALETTE.cyan, sat: PALETTE.cyan },
    { r: 3.55, tilt: [1.75, -0.55, 0.2], speed: -0.22, color: PALETTE.violet, sat: PALETTE.magenta },
    { r: 3.9, tilt: [0.35, 1.1, 0], speed: 0.14, color: PALETTE.blue, sat: PALETTE.cyan },
  ];
  return specs.map(({ r, tilt, speed, color, sat }) => {
    const pivot = new THREE.Group();
    pivot.rotation.set(...tilt);
    const spin = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.012, 8, 320),
      new THREE.MeshBasicMaterial({ color: color.clone().multiplyScalar(1.4), toneMapped: false })
    );
    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 16),
      new THREE.MeshBasicMaterial({ color: sat.clone().multiplyScalar(3), toneMapped: false })
    );
    satellite.position.set(r, 0, 0);
    spin.add(ring, satellite);
    pivot.add(spin);
    pivot.userData = { spin, speed };
    return pivot;
  });
}

function buildProjector() {
  // Hologram projector: a glowing base ring and a soft light beam rising into the globe.
  const g = new THREE.Group();
  const baseY = -3.05;

  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(2.4, 0.55, 2.6, 96, 1, true),
    new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uColor: { value: PALETTE.cyan } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        varying vec2 vUv; uniform float uTime; uniform vec3 uColor;
        void main(){
          float fade = pow(1.0 - vUv.y, 1.6);
          float bands = 0.75 + 0.25 * sin(vUv.y * 60.0 - uTime * 4.0);
          float streaks = 0.85 + 0.15 * sin(vUv.x * 40.0 + uTime * 0.5);
          gl_FragColor = vec4(uColor, fade * bands * streaks * 0.16);
        }`,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
  );
  beam.position.y = baseY + 1.3;
  g.add(beam);

  const base = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 0.62, 96),
    new THREE.MeshBasicMaterial({ color: PALETTE.cyan.clone().multiplyScalar(2), toneMapped: false, side: THREE.DoubleSide })
  );
  base.rotation.x = -Math.PI / 2;
  base.position.y = baseY;
  g.add(base);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture([[0, "rgba(34,228,255,0.9)"], [0.4, "rgba(47,107,255,0.3)"], [1, "rgba(47,107,255,0)"]]),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    })
  );
  halo.scale.set(3.2, 1.1, 1);
  halo.position.y = baseY;
  g.add(halo);

  g.userData.beam = beam;
  return g;
}

function buildStars(count) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(9 + Math.random() * 18);
    pos.set([v.x, v.y, v.z - 6], i * 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.06,
      color: new THREE.Color("#9FC2FF"),
      map: makeGlowTexture([[0, "rgba(255,255,255,1)"], [1, "rgba(255,255,255,0)"]]),
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
}

export default function HologramScene() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = wrap.clientWidth < 700;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(PALETTE.bg, 1);
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(PALETTE.bg, 0.028);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = makeNeonEnvironment();
    const envRT = pmrem.fromScene(envScene, 0.015);
    scene.environment = envRT.texture;

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

    // Lights tint the chrome's reflections; two of them orbit for shimmer.
    scene.add(new THREE.AmbientLight(0x2040a0, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(2, 4, 6);
    scene.add(key);
    const cyanLight = new THREE.PointLight(PALETTE.cyan, 9, 20, 2);
    const magentaLight = new THREE.PointLight(PALETTE.magenta, 7, 20, 2);
    scene.add(cyanLight, magentaLight);

    const rig = new THREE.Group();
    scene.add(rig);

    const coreGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture([[0, "rgba(90,110,255,0.4)"], [0.45, "rgba(47,107,255,0.12)"], [1, "rgba(4,10,28,0)"]]),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
      })
    );
    coreGlow.scale.set(8, 8, 1);
    coreGlow.position.z = -1.5;
    rig.add(coreGlow);

    const globe = buildGlobe(small ? 900 : 1600);
    const rings = buildRings();
    const projector = buildProjector();
    const wordmark = buildWordmark(new FontLoader().parse(wordmarkFont));
    rig.add(globe, projector, wordmark, ...rings);

    const stars = buildStars(small ? 500 : 1100);
    scene.add(stars);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.75, 0.5, 0.78);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      camera.aspect = w / h;
      // Keep the wordmark + rings framed on narrow screens.
      camera.position.set(0, 0.15, camera.aspect < 1.25 ? 14 : 10.6);
      camera.lookAt(0, -0.1, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let pointer = null;
    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
    };
    const onLeave = () => { pointer = null; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    const timer = new THREE.Timer();
    const tilt = { x: 0, y: 0 };
    const update = (t) => {
      const target = pointer
        ? { x: pointer.y * 0.55, y: pointer.x * 0.9 }
        : { x: Math.sin(t * 0.38) * 0.14, y: Math.sin(t * 0.29) * 0.42 };
      tilt.x += (target.x - tilt.x) * 0.05;
      tilt.y += (target.y - tilt.y) * 0.05;
      rig.rotation.set(tilt.x, tilt.y, 0);
      stars.rotation.set(tilt.x * 0.3, t * 0.01 + tilt.y * 0.3, 0);
      // Sweep the reflections across the chrome as it turns.
      scene.environmentRotation.set(tilt.x * 0.8, tilt.y * 1.4 + Math.sin(t * 0.25) * 0.5, 0);

      wordmark.position.y = Math.sin(t * 0.9) * 0.06;
      globe.rotation.y = t * 0.12;
      rings.forEach((r) => { r.userData.spin.rotation.z = t * r.userData.speed; });
      projector.userData.beam.material.uniforms.uTime.value = t;

      cyanLight.position.set(Math.cos(t * 0.6) * 6, 2.5 + Math.sin(t * 0.4), Math.sin(t * 0.6) * 3 - 1);
      magentaLight.position.set(Math.cos(t * 0.6 + Math.PI) * 6, -2, Math.sin(t * 0.6 + Math.PI) * 3 - 1);
    };

    let raf = 0;
    const loop = (ts) => {
      timer.update(ts);
      update(timer.getElapsed());
      composer.render();
      raf = requestAnimationFrame(loop);
    };

    let io = null;
    if (reduced) {
      update(2.2);
      rig.rotation.set(0.12, -0.35, 0);
      composer.render();
    } else {
      io = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(raf);
        raf = entry.isIntersecting ? requestAnimationFrame(loop) : 0;
      });
      io.observe(wrap);
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      scene.traverse((o) => {
        o.geometry?.dispose();
        [].concat(o.material || []).forEach((m) => { m.map?.dispose(); m.dispose(); });
      });
      envScene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
      envRT.dispose();
      pmrem.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="holo-webgl"
      role="img"
      aria-label="SevenX Media 3D holographic emblem"
      data-testid="hero-hologram"
    />
  );
}
