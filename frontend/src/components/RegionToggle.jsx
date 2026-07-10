import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe2, MapPin } from "lucide-react";

/**
 * Small pill that lets visitors flip between the India-market site and the
 * Global (licensed iGaming/crypto markets) site. When the user chooses
 * explicitly, we persist the choice so the GeoRedirect stops bouncing them.
 */
export default function RegionToggle({ current }) {
  const location = useLocation();
  const isGlobal = current === "global";
  const target = isGlobal ? "/" : "/global";
  const targetLabel = isGlobal ? "INDIA SITE" : "GLOBAL / LICENSED MARKETS";
  const Icon = isGlobal ? MapPin : Globe2;

  const persist = () => {
    try {
      localStorage.setItem("sevenx_region_choice", isGlobal ? "india" : "global");
    } catch (_) { /* ignore */ }
  };

  return (
    <Link
      to={target + (location.search || "")}
      onClick={persist}
      data-testid="region-toggle"
      className="fixed top-20 right-4 md:right-6 z-[70] inline-flex items-center gap-2 px-3 py-2 border border-[#00A3FF] bg-[#050B1F]/80 backdrop-blur-md font-mono text-[10px] tracking-widest text-[#00A3FF] hover:bg-[#00A3FF] hover:text-[#050B1F] transition-colors"
    >
      <Icon className="w-3.5 h-3.5" strokeWidth={2} />
      <span>SWITCH TO {targetLabel} &rarr;</span>
    </Link>
  );
}
