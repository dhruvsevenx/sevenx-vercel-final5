import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", href: "#top" },
  { label: "SERVICES", href: "#services" },
  { label: "CASE STUDIES", href: "#cases" },
  { label: "PARTNERS", href: "#partners" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const upd = () => {
      const d = new Date();
      setTime(
        d.toUTCString().split(" ").slice(4, 5)[0]
      );
    };
    upd();
    const i = setInterval(upd, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between mix-blend-difference">
        <a href="#top" className="font-display text-lg tracking-widest text-[#FF0033] hover-glitch">
          SEVENX
        </a>
        <div className="hidden md:flex items-center gap-6 font-mono text-[10px] text-[#FF0033] tracking-widest">
          <span className="animate-blink">■</span>
          <span>28°36'N / 77°13'E</span>
          <span className="opacity-60">// SEVENX_LIVE</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="font-display text-lg tracking-widest text-[#FF0033] flex items-center gap-2 hover:text-white transition-colors"
        >
          MENU <Menu className="w-5 h-5" strokeWidth={3} />
        </button>
      </header>

      {/* Full-screen menu */}
      <div
        className={`fixed inset-0 z-[80] bg-black transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-noise" />
        <div className="relative h-full flex flex-col p-6 md:p-10">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg tracking-widest text-[#FF0033]">SEVENX</span>
            <button
              onClick={() => setOpen(false)}
              className="font-display text-lg tracking-widest text-[#FF0033] flex items-center gap-2 hover:text-white"
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
                className="group flex items-baseline gap-6 border-b border-[#1a1a1a] pb-3"
              >
                <span className="font-mono text-xs text-[#FF0033] w-14">
                  NO_{String(i + 1).padStart(3, "0")}
                </span>
                <span className="font-display text-5xl md:text-8xl text-[#E3E8EC] group-hover:text-[#FF0033] transition-colors uppercase">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-[#666]">
            <div>info@sevenxm.com</div>
            <div>NEW DELHI · DUBAI · MANILA</div>
            <div>SEVENX™ // 2026</div>
          </div>
        </div>
      </div>
    </>
  );
}
