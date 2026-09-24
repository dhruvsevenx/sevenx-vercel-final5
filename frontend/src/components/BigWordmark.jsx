import React from "react";

export default function BigWordmark() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden border-t border-[#0F1B36]">
      <div className="absolute inset-0 radial-blue opacity-40" />
      <div className="relative px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="font-mono text-[11px] text-[#00A3FF] tracking-widest leading-relaxed max-w-md">
          <span className="bg-[#00A3FF] text-black font-bold px-1 text-[9px] mr-2">NO_001</span>
          COMPLIANT INDIA-FIRST PERFORMANCE ECOSYSTEM — MEDIA BUYING, VERNACULAR CREATIVE, SERVER-SIDE TRACKING AND CRO INFRASTRUCTURE BUILT FOR HIGH-INTENT BRAND GROWTH.
        </div>
        <div className="font-mono text-[11px] text-[#4D8CFF] tracking-widest leading-relaxed max-w-md md:justify-self-end">
          <span className="bg-[#00A3FF] text-black font-bold px-1 text-[9px] mr-2">NO_002</span>
          RBI · IRDAI · SEBI · ASCI · DPDP-COMPLIANT CAMPAIGNS ACROSS FINTECH, INSURANCE, REAL ESTATE, EDTECH, D2C, HEALTHCARE AND CRYPTO EDUCATION — PAN-INDIA & GCC DIASPORA.
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div aria-hidden="true" className="font-display text-[22vw] leading-[0.85] tracking-tighter text-[#E6EDFF] uppercase select-none">
          SEVEN<span className="text-[#00A3FF]">X</span>
        </div>
      </div>

      <div className="relative px-6 md:px-10 mt-10 flex items-center justify-between font-mono text-[10px] text-[#6B7FA8] tracking-widest">
        <span>777 // PERFORMANCE // AGENCY</span>
        <span>EST. 2019 — NEW DELHI</span>
      </div>
    </section>
  );
}
