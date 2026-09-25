import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { PRIMARY_EMAIL } from "../constants/emails";

const indiaNav = [
  { label: "HOME", href: "#top" },
  { label: "SERVICES", href: "#services" },
  { label: "VERTICALS", href: "#verticals" },
  { label: "CASE STUDIES", href: "#cases" },
  { label: "PARTNERS", href: "#partners" },
  { label: "CONTACT", href: "#contact" },
];

const globalNav = [
  { label: "HOME", href: "#top" },
  { label: "WHAT WE DO", href: "#capabilities" },
  { label: "AFFILIATE", href: "#affiliate" },
  { label: "IGAMING", href: "#igaming" },
  { label: "CASE STUDIES", href: "#cases" },
  { label: "CONTACT", href: "#contact" },
];

// `base` prefixes section anchors when the navbar sits on a sub-page
// (e.g. /global/affiliate-management), so links go back to the hub sections.
export default function Navbar({ base = "", offset = 0 }) {
  const [open, setOpen] = useState(false);
  const { region, coordinates } = useContent();
  const isGlobal = region === "global";
  const navItems = (isGlobal ? globalNav : indiaNav).map((item) =>
    base && item.href !== "#contact" ? { ...item, href: base + (item.href === "#top" ? "" : item.href) } : item
  );

  return (
    <>
      <header style={{ top: offset }} className="fixed left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between mix-blend-difference">
        <a href={base || "#top"} className="font-display text-lg tracking-widest text-[#00A3FF] hover-glitch" data-testid="navbar-logo">
          SEVENX
        </a>
        <button
          onClick={() => setOpen(true)}
          data-testid="navbar-menu-btn"
          className="font-display text-lg tracking-widest text-[#00A3FF] flex items-center gap-2 hover:text-white transition-colors"
        >
          MENU <Menu className="w-5 h-5" strokeWidth={3} />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[80] bg-[#050B1F] transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-noise" />
        <div className="relative h-full flex flex-col p-6 md:p-10">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg tracking-widest text-[#00A3FF]">SEVENX</span>
            <button
              onClick={() => setOpen(false)}
              data-testid="navbar-close-btn"
              className="font-display text-lg tracking-widest text-[#00A3FF] flex items-center gap-2 hover:text-white"
            >
              CLOSE <X className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-4 md:gap-6">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex items-baseline gap-6 border-b border-[#1B2A4A] pb-3"
              >
                <span className="font-mono text-xs text-[#00A3FF] w-14">
                  NO_{String(i + 1).padStart(3, "0")}
                </span>
                <span className="font-display text-5xl md:text-8xl text-[#E6EDFF] group-hover:text-[#00A3FF] transition-colors uppercase">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-[#6B7FA8]">
            <a href={`mailto:${PRIMARY_EMAIL}`} className="hover:text-[#00A3FF]">{PRIMARY_EMAIL}</a>
            <div>{isGlobal ? coordinates.location : <>NEW DELHI &middot; MUMBAI &middot; BENGALURU</>}</div>
            <div>SEVENX&trade; // 2026</div>
          </div>
        </div>
      </div>
    </>
  );
}
