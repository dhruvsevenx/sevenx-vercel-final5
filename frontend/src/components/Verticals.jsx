import React from "react";
import { verticals } from "../mock/mock";

export default function Verticals() {
  return (
    <section className="relative px-6 md:px-10 py-20 md:py-28 border-t border-[#111]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">
            <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_003</span> VERTICALS_WE_COVER
          </div>
          <h3 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] tracking-tight text-[#E3E8EC] mb-6">
            EVERY <span className="text-[#FF0033]">GEO.</span><br/>
            EVERY <span className="text-[#FF0033]">VERTICAL.</span>
          </h3>
          <p className="font-mono text-[12px] text-[#999] leading-[1.8] uppercase max-w-md">
            We manage traffic at all stages — from integration to scaling. We guarantee analytics, predictable results, transparency and high quality.
          </p>
        </div>

        <div className="md:col-span-8 grid grid-cols-3 gap-2">
          {verticals.map((v, i) => (
            <div
              key={v}
              className="group relative aspect-[3/2] border border-[#1a1a1a] flex items-center justify-center overflow-hidden hover:border-[#FF0033] transition-colors"
            >
              <div className="absolute top-2 left-2 font-mono text-[9px] text-[#FF0033]">
                NO_{String(i + 1).padStart(3, "0")}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#FF0033]/0 group-hover:to-[#FF0033]/30 transition-all" />
              <span className="font-display text-lg md:text-2xl uppercase tracking-tight text-[#666] group-hover:text-white transition-colors relative z-10 text-center px-2">
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
