import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Hero visual: a fine dotted globe with a soft atmospheric rim and a few thin
 * arcs of travelling light. Deliberately quiet: no post-processing, no text.
 * Rotates slowly, leans toward the pointer, renders one still frame under
 * prefers-reduced-motion and pauses off-screen. If the first frame comes out
 * blank it throws, so the boundary in Hero.jsx shows the CSS orb instead.
 */

const R = 1.6;

const DOT_VERT = `
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aRand;
  varying float vFacing;
  varying float vRand;
  varying float vY;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * normalize(position));
    vFacing = n.z;
    vRand = aRand;
    vY = position.y;
    gl_PointSize = uSize * uPixelRatio * (0.55 + 0.45 * max(n.z, 0.0));
    gl_Position = projectionMatrix * mv;
  }
`;

const DOT_FRAG = `
  uniform float uTime;
  varying float vFacing;
  varying float vRand;
  varying float vY;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    float front = smoothstep(-0.15, 0.85, vFacing);
    float twinkle = 0.8 + 0.2 * sin(uTime * 1.3 + vRand * 40.0);
    float a = mix(0.04, 0.72, front) * twinkle;
    vec3 col = mix(vec3(0.55, 0.66, 1.0), vec3(0.80, 0.76, 1.0), clamp((vY / ${R.toFixed(1)} + 1.0) * 0.5, 0.0, 1.0));
    gl_FragColor = vec4(col, a);
  }
`;

const ATMO_VERT = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMO_FRAG = `
  varying vec3 vNormal;
  void main() {
    // Back faces of a slightly larger shell: d is ~0.5 at the globe's edge and
    // 0 at the shell's edge, so the glow peaks just outside the dots and fades out.
    float d = -dot(vNormal, vec3(0.0, 0.0, 1.0));
    float i = smoothstep(0.0, 0.45, d) * (1.0 - smoothstep(0.45, 0.95, d)) * 0.55;
    gl_FragColor = vec4(vec3(0.25, 0.45, 1.0) * i, i);
  }
`;

const ARC_VERT = `
  attribute float aT;
  varying float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ARC_FRAG = `
  uniform float uHead;
  varying float vT;
  void main() {
    float tail = 0.35;
    float trail = smoothstep(uHead - tail, uHead, vT) * step(vT, uHead);
    float a = 0.07 + trail * 0.9;
    vec3 col = mix(vec3(0.45, 0.85, 1.0), vec3(0.72, 0.62, 1.0), vT);
    gl_FragColor = vec4(col, a);
  }
`;

function fibonacciSphere(count, radius) {
  const pos = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    pos.set([Math.cos(th) * r * radius, y * radius, Math.sin(th) * r * radius], i * 3);
    rand[i] = Math.random();
  }
  return { pos, rand };
}

// A great-circle arc lifted off the surface, with a 0..1 parameter per vertex.
function arcGeometry(a, b, segments = 96) {
  const pos = new Float32Array((segments + 1) * 3);
  const t = new Float32Array(segments + 1);
  const angle = a.angleTo(b);
  const lift = 0.12 + angle * 0.18;
  const v = new THREE.Vector3();
  for (let i = 0; i <= segments; i++) {
    const s = i / segments;
    v.copy(a).lerp(b, s).normalize();
    v.multiplyScalar(R * (1 + lift * Math.sin(Math.PI * s)));
    pos.set([v.x, v.y, v.z], i * 3);
    t[i] = s;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aT", new THREE.BufferAttribute(t, 1));
  return g;
}

function randomOnSphere() {
  return new THREE.Vector3().randomDirection();
}

// Samples the middle of the canvas; true when nothing visible was drawn.
function frameLooksBlank(renderer) {
  const gl = renderer.getContext();
  const w = gl.drawingBufferWidth;
  const h = gl.drawingBufferHeight;
  const px = new Uint8Array(4);
  let max = 0;
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      gl.readPixels(Math.floor(w * (0.2 + (0.6 * i) / 14)), Math.floor(h * (0.2 + (0.6 * j) / 14)), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      max = Math.max(max, px[0], px[1], px[2]);
    }
  }
  renderer.resetState();
  return max < 30;
}

export default function HeroGlobe() {
  const wrapRef = useRef(null);
  const [failed, setFailed] = useState(false);
  if (failed) throw new Error("Hero globe rendered blank on this device");

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = wrap.clientWidth < 520;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    const tilt = new THREE.Group();
    tilt.rotation.set(0.36, 0, 0.14);
    scene.add(tilt);
    const spin = new THREE.Group();
    tilt.add(spin);

    // Dots
    const { pos, rand } = fibonacciSphere(small ? 2800 : 5600, R);
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dotGeo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    const dotMat = new THREE.ShaderMaterial({
      vertexShader: DOT_VERT,
      fragmentShader: DOT_FRAG,
      uniforms: {
        uSize: { value: small ? 2.1 : 2.2 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });
    spin.add(new THREE.Points(dotGeo, dotMat));

    // Atmosphere rim
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.16, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: ATMO_VERT,
        fragmentShader: ATMO_FRAG,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    tilt.add(atmo);

    // Arcs with travelling light
    const arcs = [];
    const endpointPos = [];
    for (let i = 0; i < (small ? 5 : 8); i++) {
      let a;
      let b;
      do {
        a = randomOnSphere();
        b = randomOnSphere();
      } while (a.angleTo(b) < 0.6 || a.angleTo(b) > 1.9);
      const mat = new THREE.ShaderMaterial({
        vertexShader: ARC_VERT,
        fragmentShader: ARC_FRAG,
        uniforms: { uHead: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      spin.add(new THREE.Line(arcGeometry(a, b), mat));
      arcs.push({ mat, speed: 0.12 + Math.random() * 0.1, phase: Math.random() * 1.6 });
      endpointPos.push(a.x * R, a.y * R, a.z * R, b.x * R, b.y * R, b.z * R);
    }
    const endGeo = new THREE.BufferGeometry();
    endGeo.setAttribute("position", new THREE.Float32BufferAttribute(endpointPos, 3));
    spin.add(
      new THREE.Points(
        endGeo,
        new THREE.PointsMaterial({ color: 0x9fd8ff, size: 0.045, transparent: true, opacity: 0.9, depthWrite: false })
      )
    );

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // Fit the globe plus its rim inside the smaller dimension.
      const fitH = (R * 1.32) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      camera.position.set(0, 0, Math.max(fitH, fitH / camera.aspect));
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

    const lean = { x: 0, y: 0 };
    const update = (t) => {
      spin.rotation.y = t * 0.07;
      const target = pointer ? { x: pointer.y * 0.18, y: pointer.x * 0.28 } : { x: 0, y: 0 };
      lean.x += (target.x - lean.x) * 0.04;
      lean.y += (target.y - lean.y) * 0.04;
      tilt.rotation.x = 0.36 + lean.x;
      tilt.rotation.y = lean.y;
      dotMat.uniforms.uTime.value = t;
      arcs.forEach((a) => {
        a.mat.uniforms.uHead.value = ((t * a.speed + a.phase) % 1.6);
      });
    };

    const timer = new THREE.Timer();
    let raf = 0;
    const loop = (ts) => {
      timer.update(ts);
      update(timer.getElapsed());
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    let io = null;
    const cleanup = () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      scene.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };

    update(reduced ? 3 : 0);
    renderer.render(scene, camera);
    if (frameLooksBlank(renderer)) {
      cleanup();
      setFailed(true);
      return undefined;
    }

    if (!reduced) {
      raf = requestAnimationFrame(loop);
      io = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(raf);
        raf = entry.isIntersecting ? requestAnimationFrame(loop) : 0;
      });
      io.observe(wrap);
    }

    return cleanup;
  }, []);

  return <div ref={wrapRef} className="hero-globe absolute inset-0" role="img" aria-label="Globe showing connected markets" />;
}
