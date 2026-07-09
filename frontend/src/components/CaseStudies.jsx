import React, { useState } from "react";
import { caseStudies } from "../mock/mock";
import { Plus } from "lucide-react";

export default function CaseStudies() {
  const [open, setOpen] = useState(0);

  return (
    <section id="cases" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-[#111]">
      <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">
            <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_001</span> CASE_STUDIES
          </div>
          <h3 className="font-display text-5xl md:text-8xl uppercase leading-[0.9] tracking-tight text-[#E3E8EC]">
            SIGNALS FROM<br/>
            <span className="text-[#FF0033]">THE FIELD.</span>
          </h3>
        </div>
        <div className="font-mono text-[10px] text-[#666] tracking-widest max-w-xs">
          <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_002</span>
          REAL DEPLOYMENTS. REAL ATTRIBUTION. REAL SCALE.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {caseStudies.map((c, i) => {
          const isOpen = open === i;
          return (
            <div
              key={c.id}
              className={`relative border transition-all duration-500 ${
                isOpen ? "border-[#FF0033] bg-[#0a0000]" : "border-[#1a1a1a] bg-[#080808]"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between text-left p-5 md:p-8"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] text-[#FF0033]">{c.id}</span>
                  <h4 className="font-display text-2xl md:text-5xl uppercase tracking-tight text-[#E3E8EC]">
                    {c.client}
                  </h4>
                </div>
                <Plus className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 ${isOpen ? "rotate-45 text-[#FF0033]" : "text-[#E3E8EC]"}`} strokeWidth={1.5} />
              </button>

              <div
                className={`grid transition-all duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-8 pb-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-2 font-mono text-[10px] text-[#FF6680] tracking-widest uppercase">
                      {c.region}
                    </div>
                    <p className="md:col-span-6 font-mono text-[13px] text-[#CCC] leading-[1.7]">
                      {c.summary}
                    </p>
                    <div className="md:col-span-4 grid grid-cols-3 gap-3">
                      {c.metrics.map((m) => (
                        <div key={m.k} className="border border-[#FF0033]/30 p-3 bg-black/40">
                          <div className="font-display text-xl md:text-2xl text-[#FF0033]">{m.v}</div>
                          <div className="font-mono text-[9px] text-[#999] tracking-widest mt-1">{m.k}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
