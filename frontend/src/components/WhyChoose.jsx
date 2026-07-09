import React from "react";
import { whyChoose } from "../mock/mock";

export default function WhyChoose() {
  return (
    <section className="relative px-6 md:px-10 py-20 md:py-32 border-t border-[#111]">
      <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">
            <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_001</span> WHY_SEVENX
          </div>
          <h3 className="font-display text-5xl md:text-8xl uppercase leading-[0.9] tracking-tight text-[#E3E8EC]">
            WHY CHOOSE<br/>
            <span className="text-[#FF0033]">SEVENX?</span>
          </h3>
        </div>
        <div className="font-mono text-[10px] text-[#666] tracking-widest max-w-xs">
          <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_002</span>
          BUILT FOR OPERATORS WHO REFUSE TO WAIT.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {whyChoose.map((w, i) => (
          <div
            key={w.id}
            className="group relative border-t border-l border-[#1a1a1a] p-6 md:p-8 hover:bg-[#0a0000] transition-all min-h-[240px] flex flex-col justify-between"
            style={{
              borderRightWidth: (i + 1) % 3 === 0 ? 1 : 0,
              borderBottomWidth: i >= whyChoose.length - 3 ? 1 : 0,
            }}
          >
            <div className="font-mono text-[10px] text-[#FF0033] tracking-widest">
              {w.id}
            </div>
            <div>
              <h4 className="font-display text-3xl md:text-4xl uppercase text-[#E3E8EC] group-hover:text-[#FF0033] transition-colors leading-[0.95] mb-4">
                {w.title}
              </h4>
              <p className="font-mono text-[11px] text-[#999] leading-relaxed uppercase">
                {w.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
