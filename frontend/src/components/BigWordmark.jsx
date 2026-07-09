import React from "react";

export default function BigWordmark() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden border-t border-[#111]">
      <div className="absolute inset-0 radial-red opacity-40" />
      <div className="relative px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="font-mono text-[11px] text-[#FF0033] tracking-widest leading-relaxed max-w-md">
          <span className="bg-[#FF0033] text-black font-bold px-1 text-[9px] mr-2">NO_001</span>
          OUR ECOSYSTEM INCLUDES MEDIA BUYING, CREATIVE, TRACKING, AND DEVELOPMENT INFRASTRUCTURE FOR HIGH-RISK BRAND GROWTH.
        </div>
        <div className="font-mono text-[11px] text-[#FF6680] tracking-widest leading-relaxed max-w-md md:justify-self-end">
          <span className="bg-[#FF0033] text-black font-bold px-1 text-[9px] mr-2">NO_002</span>
          WE GO BEYOND IGAMING — EXPLORING FINTECH, CRYPTO, E-COMMERCE, NUTRA AND EMERGING VERTICALS ACROSS EMERGING MARKETS.
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <h2 className="font-display text-[22vw] leading-[0.85] tracking-tighter text-[#E3E8EC] uppercase select-none">
          SEVEN<span className="text-[#FF0033]">X</span>
        </h2>
      </div>

      <div className="relative px-6 md:px-10 mt-10 flex items-center justify-between font-mono text-[10px] text-[#666] tracking-widest">
        <span>777 // PERFORMANCE // AGENCY</span>
        <span>EST. 2019 — NEW DELHI</span>
      </div>
    </section>
  );
}
