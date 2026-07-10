import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Automatic region routing.
 *
 * Priority order (highest wins):
 *   1. Explicit `?region=in|global` query param (persisted).
 *   2. Persisted `localStorage["sevenx_region_choice"]`.
 *   3. Search-intent keywords in `document.referrer` or UTM params:
 *      igaming, betting, casino, sportsbook, poker, gambling, crypto marketing,
 *      web3 marketing, affiliate casino, licensed iGaming → /global.
 *   4. Geolocation via `ipapi.co/country/`:
 *        - IN or blank → India site (default, no redirect).
 *        - anything else → /global.
 *
 * We never redirect away from a page the visitor deliberately opened by URL
 * (i.e. if they typed /global we honour it), and we never bounce more than once.
 */

const GLOBAL_KEYWORDS = [
  "igaming", "i-gaming", "i gaming",
  "betting", "sports betting", "sportsbook",
  "casino", "online casino", "casino marketing",
  "poker", "lottery", "gambling",
  "affiliate casino", "affiliate igaming",
  "crypto marketing", "crypto ads",
  "web3 marketing", "defi marketing",
];

function textContainsGlobalKeyword(txt) {
  if (!txt) return false;
  const s = txt.toLowerCase();
  return GLOBAL_KEYWORDS.some((k) => s.includes(k));
}

export default function GeoRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Guard: only run once per full page load.
    if (window.__sevenxRegionResolved) return;
    window.__sevenxRegionResolved = true;

    const path = location.pathname;
    const search = new URLSearchParams(location.search);

    // 1) explicit override via query string
    const regionParam = (search.get("region") || "").toLowerCase();
    if (regionParam === "in" || regionParam === "india") {
      try { localStorage.setItem("sevenx_region_choice", "india"); } catch (_e) { /* noop */ }
      if (path.startsWith("/global")) navigate("/" + (location.search || ""), { replace: true });
      return;
    }
    if (regionParam === "global" || regionParam === "int" || regionParam === "world") {
      try { localStorage.setItem("sevenx_region_choice", "global"); } catch (_e) { /* noop */ }
      if (!path.startsWith("/global")) navigate("/global" + (location.search || ""), { replace: true });
      return;
    }

    // 2) persisted choice
    let saved = null;
    try { saved = localStorage.getItem("sevenx_region_choice"); } catch (_e) { /* noop */ }
    if (saved === "india" && path.startsWith("/global")) {
      navigate("/", { replace: true });
      return;
    }
    if (saved === "global" && !path.startsWith("/global")) {
      navigate("/global", { replace: true });
      return;
    }
    if (saved) return; // respect saved choice, no further probing

    // 3) search-intent detection (referrer + UTM keywords)
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    const utmTerms = [
      search.get("utm_term"),
      search.get("utm_campaign"),
      search.get("utm_content"),
      search.get("q"),
      search.get("keyword"),
    ].filter(Boolean).join(" ");

    if (textContainsGlobalKeyword(referrer) || textContainsGlobalKeyword(utmTerms)) {
      if (!path.startsWith("/global")) {
        navigate("/global" + (location.search || ""), { replace: true });
      }
      return;
    }

    // 4) IP-based geolocation (best-effort, fails open to India default)
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 2500);
    fetch("https://ipapi.co/country/", { signal: ac.signal })
      .then((r) => (r.ok ? r.text() : ""))
      .then((code) => {
        clearTimeout(t);
        const c = (code || "").trim().toUpperCase();
        if (!c) return;
        if (c === "IN") {
          if (path.startsWith("/global")) navigate("/", { replace: true });
          return;
        }
        // Non-India visitor → global variant (unless they typed /global themselves)
        if (!path.startsWith("/global")) {
          navigate("/global" + (location.search || ""), { replace: true });
        }
      })
      .catch(() => { /* network fail → stay on India */ });

    return () => { clearTimeout(t); ac.abort(); };
  }, []);

  return null;
}
