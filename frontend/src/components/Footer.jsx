import React from "react";
import { Send, Instagram, Linkedin, Youtube } from "lucide-react";

const letters = "STABILITY.THAT.SCALES.INTO.GROWTH".split("");

export default function Footer() {
  return (
    <footer className="relative border-t border-[#0F1B36] bg-[#050B1F] overflow-hidden" data-testid="footer">
      <div className="px-6 md:px-10 pt-16 md:pt-24 pb-10">
        <div className="flex items-baseline gap-4 md:gap-6 flex-wrap">
          <span className="font-display text-4xl md:text-6xl text-[#00A3FF] uppercase">SEVENX &mdash;</span>
          {letters.map((l, i) => (
            <span
              key={i}
              className={`font-display text-3xl md:text-5xl uppercase ${l === "." ? "text-[#00A3FF]" : "text-[#E6EDFF]"}`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-[#1B2A4A]">
        <div className="md:col-span-4">
          <div className="font-display text-2xl text-[#00A3FF] mb-4">SEVENX MEDIA</div>
          <p className="font-mono text-xs text-[#9BB0D6] leading-[1.8] uppercase max-w-sm">
            India&apos;s performance marketing agency for high-intent verticals. RBI &middot; IRDAI &middot; SEBI &middot; ASCI &middot; DPDP compliant. 42 brands scaled, 22 states, 8.4M+ qualified leads.
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">NAVIGATE</div>
          <ul className="space-y-2 font-mono text-xs text-[#9BB0D6]">
            <li><a href="#services" className="hover:text-[#00A3FF]">SERVICES</a></li>
            <li><a href="#verticals" className="hover:text-[#00A3FF]">VERTICALS</a></li>
            <li><a href="#cases" className="hover:text-[#00A3FF]">CASE STUDIES</a></li>
            <li><a href="#partners" className="hover:text-[#00A3FF]">PARTNERS</a></li>
            <li><a href="#contact" className="hover:text-[#00A3FF]">CONTACT</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">CONTACT</div>
          <ul className="space-y-2 font-mono text-xs text-[#9BB0D6]">
            <li>INFO@SEVENXMEDIA.IN</li>
            <li>NEW DELHI &middot; MUMBAI &middot; BENGALURU</li>
            <li>28&deg;36&apos;48.99&quot;N</li>
            <li>77&deg;13&apos;19.99&quot;E</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">SOCIALS</div>
          <div className="flex gap-2">
            {[Send, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 border border-[#1B2A4A] hover:border-[#00A3FF] hover:text-[#00A3FF] flex items-center justify-center transition-colors text-[#9BB0D6]">
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 py-6 border-t border-[#1B2A4A] flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[10px] text-[#6B7FA8] tracking-widest">
        <div>&copy; SEVENX&trade; MEDIA 2026. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#00A3FF]">PRIVACY POLICY</a>
          <a href="#" className="hover:text-[#00A3FF]">COOKIE POLICY</a>
          <a href="#" className="hover:text-[#00A3FF]">TERMS OF USE</a>
        </div>
        <a href="#top" className="hover:text-[#00A3FF]">BACK TO TOP &uarr;</a>
      </div>
    </footer>
  );
}
