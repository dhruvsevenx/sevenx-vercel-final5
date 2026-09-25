import React from "react";
import { Info } from "lucide-react";

/**
 * Static, always-visible compliance banner for the Global (iGaming/crypto) site.
 * Renders at the very top of the page; the navbar is offset below it (BANNER_HEIGHT).
 */
export const BANNER_HEIGHT = 32;

export default function ComplianceBanner() {
  return (
    <div
      data-testid="compliance-banner"
      className="hero-sans fixed top-0 left-0 right-0 z-[60] h-8 px-4 flex items-center justify-center gap-2 bg-[#05070E]/90 backdrop-blur border-b border-white/[0.08] text-[12px] text-[#8E9BB5]"
    >
      <Info className="w-3.5 h-3.5 flex-shrink-0 text-[#4C8DFF]" strokeWidth={2} />
      <span className="truncate">
        <span className="hidden sm:inline">iGaming &amp; crypto services: licensed operators only, where permitted</span>
        <span className="sm:hidden">iGaming: licensed operators only</span>
        <span className="text-[#C9D3E6]"> · Not offered in India</span>
      </span>
    </div>
  );
}
