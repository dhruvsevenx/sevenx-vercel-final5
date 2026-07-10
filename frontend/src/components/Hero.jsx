import React, { useEffect, useState } from "react";
import { heroTags, coordinates } from "../mock/mock";
import { ArrowDown } from "lucide-react";

/**
 * Holographic 7X Emblem — devils.inc-inspired centerpiece.
 * Pure CSS + SVG. Rotating rings, chromatic aberration, scan line and iridescent core.
 */
function Hologram() {
  return (
    <div className="holo-stage" role="img" aria-label="SevenX 7X holographic emblem" data-testid="hero-hologram">
      <div className="holo-core" />
      <div className="holo-ring r1" />
      <div className="holo-ring r2" />
      <div className="holo-ring r3" />
      <div className="holo-ring r4" />
      <div className="holo-ticks">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} style={{ transform: `translateX(-50%) rotate(${(i * 360) / 24}deg)` }} />
        ))}
      </div>
      <div className="holo-scan" />
      <div className="holo-text" aria-hidden="true">7X</div>
      <div className="holo-cross">
        <span className="top" />
        <span className="bottom" />
        <span className="left" />
        <span className="right" />
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
          <span className="animate-blink">■</span> // SEVENX_INDIA_LIVE
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

      <div className="relative flex items-center justify-center py-10 md:py-14">
        <Hologram />
      </div>

      <div className="relative px-6 md:px-10">
        <h1 className="font-display text-[13vw] md:text-[10vw] leading-[0.9] tracking-tight text-[#E6EDFF] uppercase">
          <span className="block">PERFORMANCE</span>
          <div className="flex items-end gap-4 flex-wrap">
            <span className="block">MARKETING</span>
            <span className="block bg-[#0057FF] text-white px-3 md:px-6 leading-[1] pt-2">FOR</span>
          </div>
          <span className="block">
            HIGH-INTENT <span className="gradient-text">INDIA.</span>
          </span>
        </h1>

        <p className="mt-6 max-w-3xl font-mono text-[12px] md:text-sm text-[#9BB0D6] leading-relaxed">
          Fintech · Insurance · Real Estate · EdTech · D2C · Healthcare · SEBI-registered advisory ·
          Crypto &amp; Forex education. RBI, IRDAI, ASCI, SEBI and DPDP-compliant lead generation
          across 22+ Indian states.
        </p>

        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="font-mono text-[10px] text-[#6B7FA8] tracking-widest">
            SEVENX&trade; // MEDIA <br />
            {coordinates.location}
          </div>
          <a
            href="#contact"
            data-testid="hero-cta-contact"
            className="group inline-flex items-center gap-4 border border-[#0057FF] text-white bg-[#0057FF]/10 px-6 py-4 font-mono text-xs tracking-widest hover:bg-[#0057FF] transition-all duration-300"
          >
            <span>LET&apos;S BUILD — [ 0{(tick % 9) + 1} / 09 ]</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <div className="font-mono text-[10px] text-[#6B7FA8] tracking-widest text-right">
            42 BRANDS · 22 STATES <br />
            8.4M+ QUALIFIED LEADS
          </div>
        </div>
      </div>
    </section>
  );
}
