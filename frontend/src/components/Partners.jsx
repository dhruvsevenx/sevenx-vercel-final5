import React from "react";
import { partners } from "../mock/mock";

export default function Partners() {
  const loop = [...partners, ...partners, ...partners];
  return (
    <section id="partners" className="relative py-20 md:py-28 border-t border-[#0F1B36] overflow-hidden">
      <div className="px-6 md:px-10 flex items-end justify-between mb-10">
        <div>
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">
            <span className="bg-[#00A3FF] text-black px-1 font-bold mr-2">NO_001</span> OUR_PARTNERS
          </div>
          <h3 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] tracking-tight text-[#E6EDFF]">
            TRUSTED BY<br/>
            <span className="text-[#00A3FF]">SCALED BRANDS.</span>
          </h3>
        </div>
        <div className="hidden md:block font-mono text-[10px] text-[#6B7FA8] tracking-widest text-right">
          <span className="bg-[#00A3FF] text-black px-1 font-bold mr-2">NO_002</span>
          8+ FLAGSHIPS · 120+ AFFILIATES
        </div>
      </div>

      <div className="relative overflow-hidden py-8 border-y border-[#1B2A4A] bg-[#050B1F] no-scrollbar">
        <div className="flex gap-16 md:gap-24 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
          {loop.map((p, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <span className="font-display text-4xl md:text-6xl uppercase tracking-tight text-[#2E4270] group-hover:text-[#00A3FF] transition-colors">
                {p}
              </span>
              <span className="text-[#00A3FF] font-display text-2xl md:text-4xl">+</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden py-4 bg-[#00A3FF] no-scrollbar">
        <div className="flex gap-8 animate-marquee-fast whitespace-nowrap" style={{ width: "max-content" }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="font-display text-lg md:text-2xl text-[#050B1F] uppercase tracking-tight">
              PARTNERSHIP //
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
