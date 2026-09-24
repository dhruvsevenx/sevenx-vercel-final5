import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useContent } from "../context/ContentContext";
import { ArrowDown } from "lucide-react";
import { selectIntent } from "../lib/intent";

// WebGL emblem, split into its own chunk so three.js never blocks first paint.
const HologramScene = lazy(() => import("./HologramScene"));

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    // three.js needs WebGL 2.
    return !!(window.WebGL2RenderingContext && c.getContext("webgl2"));
  } catch (_e) {
    return false;
  }
}

// Falls back to the CSS hologram if the WebGL chunk fails to load or the
// renderer can't start, instead of taking the whole page down.
class EmblemBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <Hologram /> : this.props.children;
  }
}

// Shows the WebGL emblem when the device can render it; the CSS hologram
// covers loading, failures and devices without WebGL.
function HeroEmblem() {
  const [webgl] = useState(supportsWebGL);
  return (
    <div className="holo-frame">
      {webgl ? (
        <EmblemBoundary>
          <Suspense fallback={<Hologram />}>
            <HologramScene />
          </Suspense>
        </EmblemBoundary>
      ) : (
        <Hologram />
      )}
    </div>
  );
}

// Number of stacked back-layers that give the 7X its extruded depth.
const EXTRUDE_LAYERS = 16;

/**
 * Tilts the hologram in 3D: follows the mouse when there is one,
 * otherwise sways on its own. Writes --rx / --ry on the stage element
 * directly (no React re-renders) and pauses while off-screen.
 */
function useHoloTilt(stageRef) {
  useEffect(() => {
    const rig = stageRef.current;
    if (!rig || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let raf = 0;
    let pointer = null;
    const cur = { x: 0, y: 0 };

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
    };
    const onLeave = () => { pointer = null; };

    const loop = (t) => {
      const target = pointer
        ? { x: -pointer.y * 44, y: pointer.x * 64 }
        : { x: Math.sin(t / 2600) * 14, y: Math.sin(t / 3400) * 32 };
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      rig.style.setProperty("--rx", `${cur.x.toFixed(2)}deg`);
      rig.style.setProperty("--ry", `${cur.y.toFixed(2)}deg`);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      raf = entry.isIntersecting ? requestAnimationFrame(loop) : 0;
    });
    io.observe(rig);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [stageRef]);
}

// The emblem's wordmark. Rendered once per extrusion / ghost / face layer.
function HoloWord({ className, style }) {
  return (
    <span className={`holo-word ${className}`} style={style}>
      <span className="w1">SEVENX</span>
      <span className="w2">MEDIA</span>
    </span>
  );
}

/**
 * Holographic SEVENX MEDIA Emblem — devils.inc-inspired centerpiece.
 * CSS 3D: a wireframe globe and gyroscope orbits spinning in real 3D space,
 * an extruded wordmark, and parallax layers — all tilting with the pointer.
 * The wordmark lives in its own 3D layer on top so the globe's planes never
 * slice through it; both layers share the same tilt.
 */
function Hologram() {
  const stageRef = useRef(null);
  useHoloTilt(stageRef);

  return (
    <div className="holo-stage" ref={stageRef} role="img" aria-label="SevenX Media holographic emblem" data-testid="hero-hologram">
      <div className="holo-rig">
        <div className="holo-core" />
        <div className="holo-ring r1" />
        <div className="holo-ticks">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} style={{ transform: `translateX(-50%) rotate(${(i * 360) / 24}deg)` }} />
          ))}
        </div>
        <div className="holo-ring r4" />

        <div className="holo-globe">
          {[0, 45, 90, 135].map((deg) => (
            <span key={deg} className="holo-meridian" style={{ transform: `rotateY(${deg}deg)` }} />
          ))}
          <span className="holo-latitude" />
          <span className="holo-latitude north" />
          <span className="holo-latitude south" />
        </div>

        <div className="holo-orbit o1"><span className="holo-sat" /></div>
        <div className="holo-orbit o2"><span className="holo-sat" /></div>

        <div className="holo-cross">
          <span className="top" />
          <span className="bottom" />
          <span className="left" />
          <span className="right" />
        </div>
      </div>

      <div className="holo-rig">
        <div className="holo-text3d" aria-hidden="true">
          {Array.from({ length: EXTRUDE_LAYERS }).map((_, i) => (
            <HoloWord
              key={i}
              className="holo-extrude"
              style={{
                transform: `translateZ(${-(i + 1) * 2}px)`,
                color: `hsl(220, 100%, ${46 - (i * 30) / EXTRUDE_LAYERS}%)`,
              }}
            />
          ))}
          <HoloWord className="holo-text" />
          <HoloWord className="holo-ghost cyan" />
          <HoloWord className="holo-ghost pink" />
        </div>

        <div className="holo-scan" />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="holoGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#0057FF" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#050B1F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="url(#holoGlow)" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const { heroTags, coordinates, region } = useContent();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 overflow-hidden"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 radial-blue pointer-events-none" style={{ opacity: 0.6 }} />

      <div className="relative px-6 md:px-10 flex items-start justify-between">
        <div className="font-mono text-[10px] text-[#00A3FF] leading-relaxed">
          {coordinates.lat}<br />
          {coordinates.lng}
        </div>
        <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest">
          <span className="animate-blink">■</span> // {region === "global" ? "SEVENX_GLOBAL_LIVE" : "SEVENX_INDIA_LIVE"}
        </div>
      </div>

      <div className="relative px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-0">
        {heroTags.map((t, i) => (
          <div
            key={t.no}
            className={`flex items-start gap-2 font-mono text-[11px] leading-[1.5] text-[#4D8CFF] md:max-w-[280px] ${
              i === 0 ? "md:justify-self-end md:text-right md:flex-row-reverse" : ""
            } ${i === 2 ? "md:justify-self-end md:text-right md:flex-row-reverse" : ""}`}
          >
            <span className="bg-[#00A3FF] text-[#050B1F] font-bold px-1 text-[9px] whitespace-nowrap">
              {t.no}
            </span>
            <span className="uppercase">{t.text}</span>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center py-6 md:py-8">
        <HeroEmblem />
      </div>

      <div className="relative px-6 md:px-10">
        {region === "global" ? (
          <h1 className="font-display text-[13vw] md:text-[10vw] leading-[0.9] tracking-tight text-[#E6EDFF] uppercase">
            <span className="block">PERFORMANCE</span>{" "}
            <span className="flex items-end gap-4 flex-wrap">
              <span className="block">MARKETING</span>{" "}
              <span className="block bg-[#0057FF] text-white px-3 md:px-6 leading-[1] pt-2">&amp;</span>
            </span>{" "}
            <span className="block">ACQUISITION</span>{" "}
            <span className="block">
              ACROSS <span className="gradient-text">MARKETS.</span>
            </span>
          </h1>
        ) : (
          <h1 className="font-display text-[13vw] md:text-[10vw] leading-[0.9] tracking-tight text-[#E6EDFF] uppercase">
            <span className="block">PERFORMANCE</span>{" "}
            <span className="flex items-end gap-4 flex-wrap">
              <span className="block">MARKETING</span>{" "}
              <span className="block bg-[#0057FF] text-white px-3 md:px-6 leading-[1] pt-2">FOR</span>
            </span>{" "}
            <span className="block">
              HIGH-INTENT <span className="gradient-text">INDIA.</span>
            </span>
          </h1>
        )}

        <p className="mt-6 max-w-3xl font-mono text-[12px] md:text-sm text-[#9BB0D6] leading-relaxed">
          {region === "global" ? (
            <>
              From paid media and lead generation to affiliate management, publisher acquisition and sub-affiliate
              operations, SevenX gives ambitious companies an acquisition team built around measurable growth.
              <span className="block mt-3 text-[#6B7FA8]">
                Specialist iGaming affiliate growth for licensed operators.
                <strong className="text-[#00A3FF]"> Never marketed in India or unlicensed markets.</strong>
              </span>
            </>
          ) : (
            <>
              Fintech &middot; Insurance &middot; Real Estate &middot; EdTech &middot; D2C &middot; Healthcare &middot; SEBI-registered advisory &middot;
              Crypto &amp; Forex education. RBI, IRDAI, ASCI, SEBI and DPDP-compliant lead generation
              across 22+ Indian states.
            </>
          )}
        </p>

        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="font-mono text-[10px] text-[#6B7FA8] tracking-widest">
            SEVENX&trade; // MEDIA <br />
            {coordinates.location}
          </div>
          <a
            href="#contact"
            onClick={() => region === "global" && selectIntent("OTHER", "Talk to SevenX")}
            data-testid="hero-cta-contact"
            className="group inline-flex items-center gap-4 border border-[#0057FF] text-white bg-[#0057FF]/10 px-6 py-4 font-mono text-xs tracking-widest hover:bg-[#0057FF] transition-all duration-300"
          >
            <span>{region === "global" ? "TALK TO SEVENX" : "LET\u2019S BUILD"} — [ 0{(tick % 9) + 1} / 09 ]</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <div className="font-mono text-[10px] text-[#6B7FA8] tracking-widest text-right">
            {region === "global" ? (
              <>PAID · AFFILIATE · PUBLISHER <br />ONE ACQUISITION TEAM</>
            ) : (
              <>42 BRANDS · 22 STATES <br />8.4M+ QUALIFIED LEADS</>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
