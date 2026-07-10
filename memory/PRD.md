# SevenX Media — Product Requirements

## Vision
India's premier performance marketing agency landing site for high-intent, regulated verticals — built to convert Indian and GCC enterprises.

## Original Problem Statement
Deploy the `sevenxnew` repo to Vercel (Vercel Services / monorepo) and provide a simple editing workflow. Following that, adapt the site to the Indian market — remove iGaming / betting content, keep high-risk / high-intent verticals, make it 100% SEO-ranked, switch to a blue/white palette, replace the center 7X logo with a hologram (devils.inc style), add Google Analytics on every page, and connect the contact form to Google Sheets.

## User Personas
1. **Enterprise marketing leaders** — Growth Directors, CMOs and Heads of Marketing at Indian fintechs, insurtechs, real-estate portals, EdTechs and D2C brands looking for a compliance-aware performance partner.
2. **Founders & Country Heads** — early-stage Indian founders and GCC market-entry teams evaluating vendors.
3. **Compliance officers** — the site must survive scrutiny under ASCI, SEBI, IRDAI, RBI, Ayush, FSSAI and DPDP Act 2023.

## Feature Status

### Completed (2026-02)
- Vercel Services monorepo config (`vercel.json`) with `yarn` build forced.
- Lazy-Mongo FastAPI backend (returns 503 gracefully if `MONGO_URL` not set).
- `DEPLOY_AND_EDIT.md` master edit-and-deploy guide.
- "Made with Emergent" watermark removed sitewide (badge + injector script).
- **India-market rewrite**:
  - All iGaming/betting copy removed. Verticals shifted to fintech, insurance, real estate, EdTech, D2C, healthcare, SEBI advisory, crypto/forex *education*.
  - Case studies rewritten around RBI/IRDAI/SEBI/Ayush-compliant clients.
  - Partner logos swapped to real Indian brands (Groww, Upstox, Policybazaar, Acko, Bajaj Finserv, PhysicsWallah, Mamaearth etc.).
  - Copy references DPDP Act 2023, ASCI, vernacular pods (Hindi / Tamil / Telugu / Marathi / Bengali / Kannada).
- **Full SEO layer**:
  - Title, description, keywords, canonical, robots, geo.region, ICBM.
  - Open Graph + Twitter card meta.
  - JSON-LD schema: Organization + ProfessionalService (with aggregateRating & OfferCatalog) + FAQPage.
  - `sitemap.xml` and `robots.txt` served from `/public`.
  - India-friendly (`lang="en-IN"`, `geo.region=IN-DL`).
- **Google Analytics 4** (`G-VG9JEPE5YX`) firing on every page + `generate_lead` conversion on contact submit.
- **Contact form → Google Sheets** via Apps Script Web App:
  - Env-driven endpoint (`REACT_APP_SHEETS_ENDPOINT`), `no-cors` POST with `text/plain`, localStorage fallback so no lead is lost.
  - Full setup guide in `/app/GOOGLE_SHEETS_SETUP.md`.
- **Blue/navy theme**: electric-blue `#0057FF` + cyan-blue `#00A3FF` accents on deep-navy `#050B1F` surface. Chromatic gradient text for accent headlines.
- **Holographic 7X emblem** (pure CSS/SVG) — layered rotating rings, cardinal ticks, iridescent conic-gradient core, radial glow, chromatic aberration ghosts, sweeping scan line, targeting crosshair.

### Backlog (P1)
- Wire contact form through FastAPI backend with MongoDB persistence (currently direct-to-Sheets + localStorage).
- Add dedicated `/case-studies/[slug]` MDX pages for long-form SEO.
- Add `/services/[slug]` service landing pages per vertical for keyword-specific SEO.
- Add a `/blog` route with 3 pillar posts targeting the top keywords.
- Deploy `og-image.png` (currently referenced but not present).
- Verified Google Search Console + submit sitemap.

### Backlog (P2)
- Privacy Policy, Terms and Cookie Policy pages (currently footer links are placeholders).
- Multilingual sub-sites (`/hi`, `/ta`).
- Contact form → WhatsApp Business notification for the sales team.

## Tech Stack
- React 19 + Craco + Tailwind CSS 3 (frontend, Vercel static)
- FastAPI + Motor + MongoDB (backend, Vercel Python serverless — lazy init)
- Google Analytics 4 (gtag.js)
- Google Apps Script Web App (Sheets bridge)

## Deployment
- Vercel Services monorepo. See `DEPLOY_AND_EDIT.md`.
- Set `REACT_APP_SHEETS_ENDPOINT` on Vercel before/right after go-live (see `GOOGLE_SHEETS_SETUP.md`).
