import React from "react";
import { Link } from "react-router-dom";
import { Send, Instagram, Linkedin, Youtube } from "lucide-react";
import { useContent } from "../context/ContentContext";
import content from "../content/globalContent.json";

const letters = "STABILITY.THAT.SCALES.INTO.GROWTH".split("");

const indiaLinks = [
  { label: "SERVICES", href: "/#services" },
  { label: "VERTICALS", href: "/#verticals" },
  { label: "CASE STUDIES", href: "/#cases" },
  { label: "PARTNERS", href: "/#partners" },
  { label: "CONTACT", href: "#contact" },
];

const globalLinks = [
  { label: "WHAT WE DO", href: "/global#capabilities" },
  ...content.services.map((s) => ({ label: s.name.toUpperCase(), to: `/global/${s.slug}` })),
  { label: "FAQ", href: "/global#faq" },
  { label: "CONTACT", href: "#contact" },
];

export default function Footer() {
  const { region, coordinates } = useContent();
  const isGlobal = region === "global";
  const links = isGlobal ? globalLinks : indiaLinks;
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
            {isGlobal ? (
              <>Performance marketing, media buying, lead generation and affiliate growth for brands and affiliate programs in international markets.</>
            ) : (
              <>India&apos;s performance marketing agency for high-intent verticals. RBI &middot; IRDAI &middot; SEBI &middot; ASCI &middot; DPDP compliant. 42 brands scaled, 22 states, 8.4M+ qualified leads.</>
            )}
          </p>
          <Link
            to={isGlobal ? "/" : "/global"}
            className="mt-5 inline-block font-mono text-[10px] tracking-widest text-[#00A3FF] hover:text-white"
            data-testid="footer-region-link"
          >
            {isGlobal ? "SEVENX INDIA →" : "SEVENX GLOBAL →"}
          </Link>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">NAVIGATE</div>
          <ul className="space-y-2 font-mono text-xs text-[#9BB0D6]">
            {links.map((l) => (
              <li key={l.label}>
                {l.to ? (
                  <Link to={l.to} className="hover:text-[#00A3FF]">{l.label}</Link>
                ) : (
                  <a href={l.href} className="hover:text-[#00A3FF]">{l.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[10px] text-[#00A3FF] tracking-widest mb-3">CONTACT</div>
          <ul className="space-y-2 font-mono text-xs text-[#9BB0D6]">
            <li>INFO@SEVENXMEDIA.IN</li>
            <li>{isGlobal ? coordinates.location : <>NEW DELHI &middot; MUMBAI &middot; BENGALURU</>}</li>
            <li>{isGlobal ? coordinates.lat : <>28&deg;36&apos;48.99&quot;N</>}</li>
            <li>{isGlobal ? coordinates.lng : <>77&deg;13&apos;19.99&quot;E</>}</li>
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
