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
  const targetLabel = isGlobal ? "SevenX India" : "SevenX Global";
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
      className="hero-sans fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full px-4 py-2.5 border border-white/10 bg-[#070B16]/85 backdrop-blur-md text-[13px] text-[#C9D3E6] shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-white/25 hover:text-white transition-colors"
    >
      <Icon className="w-3.5 h-3.5" strokeWidth={2} />
      <span>{targetLabel} &rarr;</span>
    </Link>
  );
}
