import React from "react";
import { useContent } from "../context/ContentContext";

export default function WhyChoose() {
  const { whyChoose } = useContent();
  return (
    <section className="relative px-6 md:px-10 py-20 md:py-32 border-t border-[#0F1B36]">
      <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">
            <span className="bg-[#00A3FF] text-black px-1 font-bold mr-2">NO_001</span> WHY_SEVENX
          </div>
          <h2 className="font-display text-5xl md:text-8xl uppercase leading-[0.9] tracking-tight text-[#E6EDFF]">
            WHY CHOOSE<br/>
            <span className="text-[#00A3FF]">SEVENX?</span>
          </h2>
        </div>
        <div className="font-mono text-[10px] text-[#6B7FA8] tracking-widest max-w-xs">
          <span className="bg-[#00A3FF] text-black px-1 font-bold mr-2">NO_002</span>
          BUILT FOR OPERATORS WHO REFUSE TO WAIT.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {whyChoose.map((w, i) => (
          <div
            key={w.id}
            className="group relative border-t border-l border-[#1B2A4A] p-6 md:p-8 hover:bg-[#0A1B3D] transition-all min-h-[240px] flex flex-col justify-between"
            style={{
              borderRightWidth: (i + 1) % 3 === 0 ? 1 : 0,
              borderBottomWidth: i >= whyChoose.length - 3 ? 1 : 0,
            }}
          >
            <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest">
              {w.id}
            </div>
            <div>
              <h3 className="font-display text-3xl md:text-4xl uppercase text-[#E6EDFF] group-hover:text-[#00A3FF] transition-colors leading-[0.95] mb-4">
                {w.title}
              </h3>
              <p className="font-mono text-[11px] text-[#9BB0D6] leading-relaxed uppercase">
                {w.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
