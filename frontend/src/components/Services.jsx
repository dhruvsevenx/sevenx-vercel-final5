import React, { useState } from "react";
import { services } from "../mock/mock";
import { Handshake, TrendingUp, BarChart3, Rocket, Zap, Bot, Globe, ArrowUpRight } from "lucide-react";

const iconMap = { Handshake, TrendingUp, BarChart3, Rocket, Zap, Bot, Globe };

export default function Services() {
  const [hover, setHover] = useState(null);

  return (
    <section id="services" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-[#0F1B36]">
      <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">
            <span className="bg-[#00A3FF] text-black px-1 font-bold mr-2">NO_001</span> WHAT_WE_OFFER
          </div>
          <h3 className="font-display text-5xl md:text-8xl uppercase leading-[0.9] tracking-tight text-[#E6EDFF]">
            WHAT DO <br/>
            <span className="text-[#00A3FF]">WE OFFER?</span>
          </h3>
        </div>
        <div className="font-mono text-[10px] text-[#6B7FA8] tracking-widest max-w-xs">
          <span className="bg-[#00A3FF] text-black px-1 font-bold mr-2">NO_002</span>
          A COMPLETE PERFORMANCE STACK. FROM AFFILIATE TO ATTRIBUTION.
        </div>
      </div>

      <div className="border-t border-[#1B2A4A]">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon] || Zap;
          const active = hover === i;
          return (
            <div
              key={s.id}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative group border-b border-[#1B2A4A] transition-colors duration-300 hover:bg-[#0a0a0a] cursor-pointer"
            >
              <div className="grid grid-cols-12 gap-3 py-6 md:py-8 items-center">
                <div className="col-span-2 md:col-span-1 font-mono text-[10px] text-[#00A3FF]">
                  {s.id}
                </div>
                <div className="col-span-8 md:col-span-4 flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${active ? "text-[#00A3FF]" : "text-[#E6EDFF]"} transition-colors`} strokeWidth={1.5} />
                  <h4 className={`font-display text-2xl md:text-4xl uppercase tracking-tight transition-colors ${active ? "text-[#00A3FF]" : "text-[#E6EDFF]"}`}>
                    {s.title}
                  </h4>
                  {s.badge && (
                    <span className="font-mono text-[9px] bg-[#00A3FF] text-black px-1.5 py-0.5 font-bold">{s.badge}</span>
                  )}
                </div>
                <div className="hidden md:block col-span-6 font-mono text-[11px] text-[#9BB0D6] leading-relaxed uppercase">
                  {s.desc}
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-end">
                  <ArrowUpRight className={`w-6 h-6 transition-all ${active ? "text-[#00A3FF] rotate-45" : "text-[#6B7FA8]"}`} strokeWidth={1.5} />
                </div>
              </div>
              {/* Mobile description */}
              <div className="md:hidden pb-6 pl-[8.33%] pr-4 font-mono text-[10px] text-[#9BB0D6] leading-relaxed uppercase">
                {s.desc}
              </div>
              {/* Hover red bar */}
              <div className={`absolute left-0 top-0 h-full w-[2px] bg-[#00A3FF] transition-transform origin-top duration-300 ${active ? "scale-y-100" : "scale-y-0"}`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
