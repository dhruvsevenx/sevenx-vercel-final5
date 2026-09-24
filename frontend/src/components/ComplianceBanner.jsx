import React from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Static, always-visible compliance banner for the Global (iGaming/crypto) site.
 * Renders at the very top of the page above the navbar.
 */
export default function ComplianceBanner() {
  return (
    <div
      data-testid="compliance-banner"
      className="fixed top-0 left-0 right-0 z-[60] bg-[#0057FF] text-white font-mono text-[10px] md:text-[11px] tracking-widest uppercase py-2 px-4 flex items-center justify-center gap-3 border-b border-[#00A3FF]"
    >
      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
      <span className="text-center leading-relaxed">
        iGaming &amp; crypto services are provided only for licensed operators
        <strong className="font-bold"> in markets where they are permitted</strong>.
        <span className="hidden md:inline">
          &nbsp;They are <strong className="font-bold">not offered in India</strong>.
        </span>
      </span>
    </div>
  );
}
