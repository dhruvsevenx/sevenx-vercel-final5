import React from "react";
import { Send, Instagram, Linkedin, Youtube } from "lucide-react";

const letters = "STABILITY.THAT.SCALES.INTO.GROWTH".split("");

export default function Footer() {
  return (
    <footer className="relative border-t border-[#111] bg-black overflow-hidden">
      {/* Big vertical letters band */}
      <div className="px-6 md:px-10 pt-16 md:pt-24 pb-10">
        <div className="flex items-baseline gap-4 md:gap-6 flex-wrap">
          <span className="font-display text-4xl md:text-6xl text-[#FF0033] uppercase">SEVENX —</span>
          {letters.map((l, i) => (
            <span
              key={i}
              className={`font-display text-3xl md:text-5xl uppercase ${l === "." ? "text-[#FF0033]" : "text-[#E3E8EC]"}`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-[#1a1a1a]">
        <div className="md:col-span-4">
          <div className="font-display text-2xl text-[#FF0033] mb-4">SEVENX MEDIA</div>
          <p className="font-mono text-xs text-[#999] leading-[1.8] uppercase max-w-sm">
            Performance marketing for high-risk verticals. 36 brands launched, 11 GEOs, 72M+ impressions driven.
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">NAVIGATE</div>
          <ul className="space-y-2 font-mono text-xs text-[#999]">
            <li><a href="#services" className="hover:text-[#FF0033]">SERVICES</a></li>
            <li><a href="#cases" className="hover:text-[#FF0033]">CASE STUDIES</a></li>
            <li><a href="#partners" className="hover:text-[#FF0033]">PARTNERS</a></li>
            <li><a href="#contact" className="hover:text-[#FF0033]">CONTACT</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">CONTACT</div>
          <ul className="space-y-2 font-mono text-xs text-[#999]">
            <li>INFO@SEVENXM.COM</li>
            <li>NEW DELHI · DUBAI · MANILA</li>
            <li>28°36'48.99"N</li>
            <li>77°13'19.99"E</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[10px] text-[#FF0033] tracking-widest mb-3">SOCIALS</div>
          <div className="flex gap-2">
            {[Send, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 border border-[#1a1a1a] hover:border-[#FF0033] hover:text-[#FF0033] flex items-center justify-center transition-colors text-[#999]">
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 py-6 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[10px] text-[#666] tracking-widest">
        <div>© SEVENX™ MEDIA 2026. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#FF0033]">PRIVACY POLICY</a>
          <a href="#" className="hover:text-[#FF0033]">COOKIE POLICY</a>
          <a href="#" className="hover:text-[#FF0033]">TERMS OF USE</a>
        </div>
        <a href="#top" className="hover:text-[#FF0033]">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
