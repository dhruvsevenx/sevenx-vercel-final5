# SevenX Media — Product Requirements

## Vision
A **dual-audience premium marketing site** for SevenX Media that serves:
1. **India-based visitors** and Indian regulators — compliant performance marketing for fintech, insurance, real estate, EdTech, D2C, SEBI-registered advisory and crypto/forex *education*.
2. **International visitors** and iGaming/crypto search intent — full-funnel iGaming, sportsbook, casino, poker, lottery, crypto/Web3 growth **only inside licensed jurisdictions** (MGA, UKGC, KGC, Curacao, Ontario iGO, Colombia Coljuegos, Brazil SPA, etc.). **Never marketed in India**.

## Original Problem Statement (compressed)
1. Deploy `sevenxnew` to Vercel with clean edit workflow.
2. Adapt to Indian market: remove iGaming/betting, keep high-intent verticals, RBI/IRDAI/SEBI/ASCI/DPDP compliant, 100% SEO ranked, blue+white theme, holographic 7X emblem, Google Analytics everywhere, Google Sheets on the form.
3. Reintroduce the old iGaming site as a **secondary global route** so non-India visitors and Google searches for "iGaming/betting/casino/crypto marketing agency" land on the compliant iGaming variant — with a clear disclaimer that these services never run in India.

## Architecture
- **Client-side routing**: `/` → `Home` (India), `/global` → `GlobalHome` (iGaming/crypto).
- **`GeoRedirect`** — top-level component runs once on load, priority order:
  1. `?region=in` / `?region=global` query param (persisted to localStorage).
  2. Persisted `sevenx_region_choice`.
  3. Search-intent keywords in `document.referrer` or UTM (`igaming`, `betting`, `casino`, `sportsbook`, `poker`, `crypto marketing`, `web3 marketing`, `affiliate casino`, `gambling`, …) → forces `/global`.
  4. Geolocation via `ipapi.co/country/` — non-IN countries redirected to `/global`.
- **`ContentContext`** provides either `mock.js` (India) or `mockGlobal.js` (Global) to every downstream component. One-line switch per component.
- **`ComplianceBanner`** — sticky at top of `/global`, states iGaming/crypto services never run in India.
- **`RegionToggle`** — floating pill in both variants for manual switching.
- **Long-form jurisdiction notice** on `/global` explicitly names accepted regulators (MGA, UKGC, KGC, Curacao, Ontario iGO, Colombia Coljuegos, Brazil SPA, Nigeria NLRC, South Africa WCGRB, MiCA, FINTRAC) and links back to `/?region=in` for Indian visitors.

## Tech Stack
React 19 · Craco · Tailwind · React Router v7 · React Context · Lucide icons · Google Analytics 4 (gtag) · Google Apps Script (Sheets bridge) · FastAPI backend (lazy Mongo, currently unused on Vercel).

## Completed
- **2026-02**: Vercel Services deploy config, DEPLOY_AND_EDIT.md, backend lazy-init, "Made with Emergent" watermark stripped.
- **2026-02**: India-market rewrite (mock.js), electric blue palette (`#0057FF` / `#00A3FF` / `#050B1F`), holographic 7X emblem, full SEO stack (title/desc/keywords/OG/Twitter/JSON-LD Organization + ProfessionalService + FAQ, sitemap.xml, robots.txt), GA4 wired sitewide, Contact form → Google Sheets (Apps Script) with GA4 `generate_lead` event and localStorage fallback.
- **2026-02**: **Dual-region site**. `/global` iGaming route with sticky compliance banner, jurisdiction notice section, region-aware Hero/Verticals/Contact copy, geo + keyword + UTM based auto-redirect, sitemap hreflang tags.

## Backlog
- **P1**: `og-image.png` at `/frontend/public/og-image.png`.
- **P1**: Google Search Console setup + submit sitemap.xml.
- **P1**: Privacy Policy, Terms and Cookie Policy pages (footer links currently placeholders).
- **P2**: `/case-studies/[slug]` and `/services/[slug]` static MDX pages for long-tail SEO.
- **P2**: Hindi / Tamil `/hi` and `/ta` sub-sites.
- **P2**: Floating WhatsApp CTA button with GA4 click tracking.
- **P2**: Server-side region detection via Vercel `x-vercel-ip-country` for faster/cheaper redirect than `ipapi.co`.

## Deployment notes
- Vercel Services monorepo. `vercel.json` forces `yarn` on the frontend service.
- Env vars required on Vercel: `REACT_APP_SHEETS_ENDPOINT` (once the user deploys the Apps Script per `GOOGLE_SHEETS_SETUP.md`).
- Optional: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS` for the backend service (returns 503 gracefully if absent).

## Files of reference
- `/app/frontend/src/pages/Home.jsx` — India landing page (wraps in ContentProvider region="india").
- `/app/frontend/src/pages/GlobalHome.jsx` — Global iGaming landing page (banner + jurisdiction notice).
- `/app/frontend/src/context/ContentContext.jsx` — provider that swaps mock data per region.
- `/app/frontend/src/mock/mock.js` — India content.
- `/app/frontend/src/mock/mockGlobal.js` — Global iGaming content.
- `/app/frontend/src/components/GeoRedirect.jsx` — auto region routing (geo + keyword).
- `/app/frontend/src/components/RegionToggle.jsx` — manual switch pill.
- `/app/frontend/src/components/ComplianceBanner.jsx` — sticky top disclaimer on /global.
- `/app/frontend/src/App.js` — routes both pages.
- `/app/frontend/public/sitemap.xml` — both routes with hreflang alternates.
