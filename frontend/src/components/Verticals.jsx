import React from "react";
import { verticals } from "../mock/mock";

export default function Verticals() {
  return (
    <section id="verticals" className="relative px-6 md:px-10 py-20 md:py-28 border-t border-[#0F1B36]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">
            <span className="bg-[#00A3FF] text-[#050B1F] px-1 font-bold mr-2">NO_003</span> VERTICALS_WE_COVER
          </div>
          <h3 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] tracking-tight text-[#E6EDFF] mb-6">
            EVERY <span className="text-[#00A3FF]">STATE.</span><br />
            EVERY <span className="text-[#00A3FF]">VERTICAL.</span>
          </h3>
          <p className="font-mono text-[12px] text-[#9BB0D6] leading-[1.8] uppercase max-w-md">
            Compliant, India-first lead generation across regulated categories. Every campaign audited
            against ASCI, SEBI, IRDAI, RBI, Ayush, FSSAI and the DPDP Act 2023.
          </p>
        </div>

        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-2">
          {verticals.map((v, i) => (
            <div
              key={v.name}
              data-testid={`vertical-tile-${v.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative aspect-[3/2] border border-[#1B2A4A] flex flex-col items-center justify-center overflow-hidden hover:border-[#00A3FF] transition-colors bg-[#0A1128]/60"
            >
              <div className="absolute top-2 left-2 font-mono text-[9px] text-[#00A3FF]">
                NO_{String(i + 1).padStart(3, "0")}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0057FF]/0 group-hover:to-[#0057FF]/30 transition-all" />
              <span className="font-display text-lg md:text-2xl uppercase tracking-tight text-[#8FA6D6] group-hover:text-white transition-colors relative z-10 text-center px-2">
                {v.name}
              </span>
              <span className="relative z-10 mt-1 font-mono text-[8px] tracking-[0.2em] text-[#4D8CFF] uppercase">
                {v.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
