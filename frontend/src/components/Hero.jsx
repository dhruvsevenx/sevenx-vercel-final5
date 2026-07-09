import React, { useEffect, useState } from "react";
import { heroTags, coordinates } from "../mock/mock";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <section id="top" className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      {/* Red glow */}
      <div className="absolute inset-0 radial-red pointer-events-none" style={{ opacity: 0.5 }} />

      {/* Top annotations */}
      <div className="relative px-6 md:px-10 flex items-start justify-between">
        <div className="font-mono text-[10px] text-[#FF0033] leading-relaxed">
          {coordinates.lat}<br/>
          {coordinates.lng}
        </div>
        <div className="font-mono text-[10px] text-[#FF0033] tracking-widest">
          <span className="animate-blink">■</span> // SEVENX LIVE FEED
        </div>
      </div>

      {/* Center annotations grid */}
      <div className="relative px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-0">
        {heroTags.map((t, i) => (
          <div
            key={t.no}
            className={`flex items-start gap-2 font-mono text-[11px] leading-[1.5] text-[#FF6680] md:max-w-[280px] ${
              i === 0 ? "md:justify-self-end md:text-right md:flex-row-reverse" : ""
            } ${i === 2 ? "md:justify-self-end md:text-right md:flex-row-reverse" : ""}`}
          >
            <span className="bg-[#FF0033] text-black font-bold px-1 text-[9px] whitespace-nowrap">
              {t.no}
            </span>
            <span className="uppercase">{t.text}</span>
          </div>
        ))}
      </div>

      {/* Center crosshair icon */}
      <div className="relative flex items-center justify-center py-8">
        <div className="relative w-40 h-40 md:w-56 md:h-56">
          <div className="absolute inset-0 rounded-full border border-[#FF0033]/30" />
          <div className="absolute inset-4 rounded-full border border-[#FF0033]/50" />
          <div className="absolute inset-8 rounded-full border border-[#FF0033]/70 red-glow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-5xl md:text-7xl text-[#FF0033]">7X</span>
          </div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-6 bg-[#FF0033]" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-px h-6 bg-[#FF0033]" />
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-px w-6 bg-[#FF0033]" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-px w-6 bg-[#FF0033]" />
        </div>
      </div>

      {/* Big headline at bottom */}
      <div className="relative px-6 md:px-10">
        <h1 className="font-display text-[13vw] md:text-[10vw] leading-[0.9] tracking-tight text-[#E3E8EC] uppercase">
          <span className="block">PERFORMANCE</span>
          <div className="flex items-end gap-4 flex-wrap">
            <span className="block">MARKETING</span>
            <span className="block bg-[#FF0033] text-black px-3 md:px-6 leading-[1] pt-2">FOR</span>
          </div>
          <span className="block">HIGH-RISK{" "}
            <span className="text-[#FF0033]">VERTICALS.</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="font-mono text-[10px] text-[#666] tracking-widest">
            SEVENX™ // HOLDING <br />
            {coordinates.location}
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 border border-[#FF0033] text-[#FF0033] px-6 py-4 font-mono text-xs tracking-widest hover:bg-[#FF0033] hover:text-black transition-all duration-300"
          >
            <span>LET'S BUILD — [ 0{(tick % 9) + 1} / 09 ]</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <div className="font-mono text-[10px] text-[#666] tracking-widest text-right">
            36 BRANDS · 11 GEOS <br />
            72M+ IMPRESSIONS
          </div>
        </div>
      </div>
    </section>
  );
}
