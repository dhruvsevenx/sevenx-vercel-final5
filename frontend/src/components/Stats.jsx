import React from "react";
import { stats } from "../mock/mock";

function StatCard({ s, idx }) {
  return (
    <div className="relative group">
      <div className="relative overflow-hidden aspect-[4/5] bg-gradient-to-b from-[#FF0033]/40 via-[#8B0018]/30 to-[#1a0006] border border-[#FF0033]/40 red-glow">
        <div className="absolute inset-0 bg-noise opacity-60" />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-[#FF6680]">
          <span className="bg-[#FF0033] text-black px-1 font-bold">NO_{String(idx + 1).padStart(3, "0")}</span>
          <span>□</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-[10vw] md:text-[6vw] text-white leading-[0.9] tracking-tight">
            {s.value}
            <span className="text-[#FF0033]">{s.suffix}</span>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-white tracking-widest uppercase">
          {s.label}
        </div>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative px-6 md:px-10 py-20 md:py-28 border-t border-[#111]">
      <div className="flex items-start justify-between mb-10 gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">
            <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_001</span> NUMBERS_THAT_PRESENT_US
          </div>
          <h3 className="font-display text-4xl md:text-6xl uppercase text-[#E3E8EC] max-w-2xl leading-[0.95]">
            THE PROOF <span className="text-[#FF0033]">IS IN THE PIPELINE.</span>
          </h3>
        </div>
        <div className="font-mono text-[10px] text-[#666] tracking-widest max-w-xs md:text-right">
          <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_002</span>
          EVERY METRIC TRACKED. EVERY DOLLAR ATTRIBUTED. NO VANITY.
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <StatCard s={s} key={s.label} idx={i} />
        ))}
      </div>
    </section>
  );
}
