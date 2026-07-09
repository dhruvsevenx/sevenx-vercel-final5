# SevenX Media — Deploy on Vercel & Edit Guide

This repo hosts a **pure static React landing page** (built with Create React App + Craco + Tailwind).
The `backend/` folder is kept in the repo but is **not deployed** — the site works entirely on the frontend.

---

## 1. One-time: Deploy to Vercel

### Option A — Import from GitHub (recommended)

1. Push this repo to GitHub (use the **"Save to GitHub"** button in Emergent, top-right of chat).
2. Go to <https://vercel.com/new> and sign in with GitHub.
3. Click **"Import"** next to your `sevenxnew` repository.
4. On the **Configure Project** screen, use these settings:

   | Setting | Value |
   |---|---|
   | Framework Preset | **Other** (leave as detected) |
   | Root Directory | `.` (repo root — do **not** change) |
   | Build Command | *(leave default — `vercel.json` handles it)* |
   | Output Directory | *(leave default — `vercel.json` handles it)* |
   | Install Command | *(leave default)* |

5. Click **Deploy**. First build takes ~2–3 minutes.
6. When done you'll get a URL like `https://sevenxnew.vercel.app` — that's your live site.

### Option B — Vercel CLI

```bash
npm i -g vercel
cd /path/to/sevenxnew
vercel            # follow prompts, first time links project
vercel --prod     # deploy to production URL
```

---

## 2. Every subsequent deploy = just push to GitHub

Once the project is linked, **every `git push` to `main` auto-deploys** to production.
Pull requests get a preview URL automatically.

---

## 3. How to edit the site — quick reference

All content lives in **`frontend/src/`**. Here's what controls what:

| What you want to change | File |
|---|---|
| **All text content** (hero taglines, stats numbers, services, case studies, testimonials, verticals, partners) | `frontend/src/mock/mock.js` ⭐ start here |
| Hero section layout | `frontend/src/components/Hero.jsx` |
| Big "SEVENX" wordmark | `frontend/src/components/BigWordmark.jsx` |
| Navbar links / logo | `frontend/src/components/Navbar.jsx` |
| Stats section | `frontend/src/components/Stats.jsx` |
| Services grid | `frontend/src/components/Services.jsx` |
| Case studies | `frontend/src/components/CaseStudies.jsx` |
| Partners strip | `frontend/src/components/Partners.jsx` |
| Verticals section | `frontend/src/components/Verticals.jsx` |
| Testimonials | `frontend/src/components/Testimonials.jsx` |
| "Why choose us" | `frontend/src/components/WhyChoose.jsx` |
| **Contact form + email + office locations** | `frontend/src/components/Contact.jsx` |
| Footer (links, copyright) | `frontend/src/components/Footer.jsx` |
| Preloader animation | `frontend/src/components/Preloader.jsx` |
| **Colors, theme, spacing** | `frontend/tailwind.config.js` |
| Global CSS + custom classes (e.g. `bg-noise`, `radial-red`) | `frontend/src/App.css` and `frontend/src/index.css` |
| Page `<title>`, favicon, meta tags | `frontend/public/index.html` |

### 3.1 Where the accent red comes from

The signature red `#FF0033` is used inline in components. To change it globally,
search-and-replace `#FF0033` across `frontend/src/`.

### 3.2 Contact form behaviour

The form currently saves submissions to the browser's `localStorage` (key: `sevenx_leads`).
It does **not** email anyone. To wire it to a real service later, edit the `submit` function
in `frontend/src/components/Contact.jsx`. Popular no-backend options:

- **Formspree** — <https://formspree.io> (free tier, just a POST to their URL)
- **Web3Forms** — <https://web3forms.com> (free, no signup)
- **Resend** — <https://resend.com> (best for transactional email, needs a small serverless function)

---

## 4. Editing workflow options

### Option A — Edit directly on GitHub (fastest for small text changes)

1. Go to your repo on GitHub.
2. Click any file (e.g. `frontend/src/mock/mock.js`) → pencil icon (Edit).
3. Make your change → **Commit changes** → done.
4. Vercel auto-deploys in ~1–2 minutes.

### Option B — Edit locally with hot reload (best for bigger changes)

```bash
git clone https://github.com/<you>/sevenxnew.git
cd sevenxnew/frontend
cp .env.example .env         # optional, project doesn't need env vars yet
yarn install
yarn start                   # opens http://localhost:3000 with hot reload
```

When happy:

```bash
git add -A
git commit -m "Update hero copy"
git push                     # triggers Vercel auto-deploy
```

### Option C — Keep editing inside Emergent

Just tell the assistant what to change, then click **Save to GitHub** → Vercel picks it up.

---

## 5. Custom domain (optional)

1. In Vercel dashboard → your project → **Settings → Domains**.
2. Add your domain (e.g. `sevenxm.com`).
3. Vercel shows the DNS records to add at your registrar (usually an `A` record + `CNAME` for `www`).
4. Once DNS propagates (~10 min), Vercel auto-issues an SSL cert.

---

## 6. Environment variables (future)

Right now, none are required — the site is fully static.

When you later add integrations (e.g. connect Contact form to Formspree), add the keys in:

- **Vercel dashboard** → Project → **Settings → Environment Variables**
- Prefix any variable you want to read from React code with `REACT_APP_` (e.g. `REACT_APP_FORMSPREE_ID`).

---

## 7. Troubleshooting

| Symptom | Fix |
|---|---|
| Build fails on Vercel | Check the Vercel build log. 99% of the time it's a syntax error in a `.jsx` file — same error you'd see running `yarn build` locally. |
| Page shows blank white | Open browser devtools → Console. Usually a missing import in a component. |
| Routes 404 on refresh | Should never happen — `vercel.json` includes SPA rewrites. If it does, ensure `vercel.json` is at repo root. |
| Fonts not loading | Check `frontend/public/index.html` `<link>` tags. |
| Old version still showing after push | Vercel is done in ~2 min; try a hard refresh (Cmd/Ctrl+Shift+R). |

---

## 8. About the `backend/` folder

The FastAPI backend is **not used** by the site and is **excluded from Vercel builds**
(see `.vercelignore`). It's kept so you can later spin it up on Railway / Render / Fly.io
if you decide to store leads server-side.
