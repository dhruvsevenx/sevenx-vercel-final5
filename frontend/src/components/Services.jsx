import React, { useState } from "react";
import { services } from "../mock/mock";
import { Handshake, TrendingUp, BarChart3, Rocket, Zap, Bot, Globe, ArrowUpRight } from "lucide-react";

const iconMap = { Handshake, TrendingUp, BarChart3, Rocket, Zap, Bot, Globe };

export default function Services() {
  const [hover, setHover] = useState(null);

  return (
    <section id="services" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-[#111]">
      <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">
            <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_001</span> WHAT_WE_OFFER
          </div>
          <h3 className="font-display text-5xl md:text-8xl uppercase leading-[0.9] tracking-tight text-[#E3E8EC]">
            WHAT DO <br/>
            <span className="text-[#FF0033]">WE OFFER?</span>
          </h3>
        </div>
        <div className="font-mono text-[10px] text-[#666] tracking-widest max-w-xs">
          <span className="bg-[#FF0033] text-black px-1 font-bold mr-2">NO_002</span>
          A COMPLETE PERFORMANCE STACK. FROM AFFILIATE TO ATTRIBUTION.
        </div>
      </div>

      <div className="border-t border-[#1a1a1a]">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon] || Zap;
          const active = hover === i;
          return (
            <div
              key={s.id}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative group border-b border-[#1a1a1a] transition-colors duration-300 hover:bg-[#0a0a0a] cursor-pointer"
            >
              <div className="grid grid-cols-12 gap-3 py-6 md:py-8 items-center">
                <div className="col-span-2 md:col-span-1 font-mono text-[10px] text-[#FF0033]">
                  {s.id}
                </div>
                <div className="col-span-8 md:col-span-4 flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${active ? "text-[#FF0033]" : "text-[#E3E8EC]"} transition-colors`} strokeWidth={1.5} />
                  <h4 className={`font-display text-2xl md:text-4xl uppercase tracking-tight transition-colors ${active ? "text-[#FF0033]" : "text-[#E3E8EC]"}`}>
                    {s.title}
                  </h4>
                  {s.badge && (
                    <span className="font-mono text-[9px] bg-[#FF0033] text-black px-1.5 py-0.5 font-bold">{s.badge}</span>
                  )}
                </div>
                <div className="hidden md:block col-span-6 font-mono text-[11px] text-[#999] leading-relaxed uppercase">
                  {s.desc}
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-end">
                  <ArrowUpRight className={`w-6 h-6 transition-all ${active ? "text-[#FF0033] rotate-45" : "text-[#666]"}`} strokeWidth={1.5} />
                </div>
              </div>
              {/* Mobile description */}
              <div className="md:hidden pb-6 pl-[8.33%] pr-4 font-mono text-[10px] text-[#999] leading-relaxed uppercase">
                {s.desc}
              </div>
              {/* Hover red bar */}
              <div className={`absolute left-0 top-0 h-full w-[2px] bg-[#FF0033] transition-transform origin-top duration-300 ${active ? "scale-y-100" : "scale-y-0"}`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
