import React, { Suspense, lazy, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { selectIntent } from "../lib/intent";

// three.js lives in its own chunk so it never blocks first paint.
const HeroGlobe = lazy(() => import("./HeroGlobe"));

function supportsWebGL2() {
  try {
    return !!(window.WebGL2RenderingContext && document.createElement("canvas").getContext("webgl2"));
  } catch (_e) {
    return false;
  }
}

// Quiet CSS orb shown while the globe loads, without WebGL, or if it fails.
function Orb() {
  return <div className="hero-orb" aria-hidden="true" />;
}

class GlobeBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <Orb /> : this.props.children;
  }
}

function HeroVisual() {
  const [webgl] = useState(supportsWebGL2);
  if (!webgl) return <Orb />;
  return (
    <GlobeBoundary>
      <Suspense fallback={<Orb />}>
        <HeroGlobe />
      </Suspense>
    </GlobeBoundary>
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
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-24 overflow-hidden"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 radial-blue pointer-events-none" style={{ opacity: 0.6 }} />

      <div className="relative z-10 px-6 md:px-10 flex items-start justify-between">
        <div className="font-mono text-[10px] text-[#00A3FF] leading-relaxed">
          {coordinates.lat}<br />
          {coordinates.lng}
        </div>
        <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest">
          <span className="animate-blink">■</span> // {region === "global" ? "SEVENX_GLOBAL_LIVE" : "SEVENX_INDIA_LIVE"}
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-0">
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

      {/* Dotted globe: between the tags and the headline on small screens,
          behind the text on the right on large screens. */}
      <div className="relative h-[320px] sm:h-[400px] my-4 lg:my-0 lg:absolute lg:h-auto lg:top-[8%] lg:bottom-[8%] lg:right-[-4%] lg:w-[48%] pointer-events-none">
        <HeroVisual />
      </div>

      <div className="relative z-10 px-6 md:px-10 lg:mt-20">
        {region === "global" ? (
          <h1 className="font-display text-[10.5vw] md:text-[10vw] leading-[0.9] tracking-tight text-[#E6EDFF] uppercase">
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
          <h1 className="font-display text-[10.5vw] md:text-[10vw] leading-[0.9] tracking-tight text-[#E6EDFF] uppercase">
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
