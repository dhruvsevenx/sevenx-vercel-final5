# SevenX Media — Deploy on Vercel & Edit Guide

This repo is now **fully Vercel-compatible** as a monorepo:

```
sevenxnew/
├── frontend/         # React 19 + Tailwind (Create React App / Craco)
├── api/              # ✅ Vercel Python Serverless Function (FastAPI)
│   ├── index.py         → routes /api/*
│   └── requirements.txt → slim, Vercel-only Python deps
├── backend/          # Original FastAPI (local dev only — NOT deployed on Vercel)
├── vercel.json       # Build + rewrites config
├── .vercelignore     # Excludes backend/, tests/, memory/, .emergent/ from Vercel
└── DEPLOY_AND_EDIT.md
```

How the deployed site is served:

| Request                       | Handled by                                            |
| ----------------------------- | ----------------------------------------------------- |
| `/static/**`, `/index.html`   | Static assets from `frontend/build/` (React app)      |
| `/api`, `/api/*`              | Python serverless function at `api/index.py` (FastAPI)|
| Anything else (e.g. `/about`) | Rewritten to `/index.html` so React Router works      |

---

## 1. One-time: Deploy to Vercel

### Option A — Import from GitHub (recommended)

1. Push this repo to GitHub (use the **"Save to GitHub"** button in Emergent).
2. Go to <https://vercel.com/new> → **Import** your `sevenxnew` repo.
3. On the **Configure Project** screen, keep every setting **as detected** (`vercel.json` does the work).
4. *(Optional but recommended)* Under **Environment Variables**, add:

   | Name          | Example value                                                        | When you need it                               |
   | ------------- | -------------------------------------------------------------------- | ---------------------------------------------- |
   | `MONGO_URL`   | `mongodb+srv://user:pass@cluster.xyz.mongodb.net/?retryWrites=true`  | Only if you want the `/api/status` DB endpoints to work |
   | `DB_NAME`     | `sevenx`                                                             | Same as above                                  |
   | `CORS_ORIGINS`| `https://yourdomain.com,https://sevenxnew.vercel.app`                | Tighten CORS in production                     |

   You can add these later — the site **and** the API both work without them (Mongo endpoints just return 503 until you set the URL).

5. Click **Deploy**. First build takes ~2–3 minutes.
6. Open your Vercel URL, then also try:
   - `https://your-app.vercel.app/api` → JSON greeting from FastAPI
   - `https://your-app.vercel.app/api/health` → health check
   - `https://your-app.vercel.app/api/docs` → auto-generated Swagger docs

### Option B — Vercel CLI

```bash
npm i -g vercel
cd sevenxnew
vercel            # first time: links project
vercel --prod     # production deploy
```

---

## 2. Setting up MongoDB (optional, only if you use the API)

Vercel is serverless — you **cannot** run a local MongoDB there. Use **MongoDB Atlas** (free 512 MB tier is plenty for this project):

1. Sign up at <https://www.mongodb.com/cloud/atlas> (free).
2. Create a new **Cluster** (free M0 tier is fine).
3. Under **Database Access** → add a user with password.
4. Under **Network Access** → **Add IP Address** → `0.0.0.0/0` (Vercel's IPs are dynamic; this is standard for serverless).
5. **Connect** → **Drivers** → copy the connection string:
   `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Paste it into Vercel → Project → **Settings → Environment Variables → `MONGO_URL`**.
7. Redeploy (or push any commit). Mongo endpoints now work.

---

## 3. Every subsequent deploy = just push to GitHub

Once linked, **every `git push` to `main` auto-deploys** to production. Pull requests get a preview URL automatically.

---

## 4. How to edit the site — quick reference

All content lives in **`frontend/src/`**. Here's what controls what:

| What you want to change                                                                                              | File                                                     |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **All text content** (hero taglines, stats, services, case studies, testimonials, verticals, partners) ⭐ start here | `frontend/src/mock/mock.js`                              |
| Hero section layout                                                                                                  | `frontend/src/components/Hero.jsx`                       |
| Big "SEVENX" wordmark                                                                                                | `frontend/src/components/BigWordmark.jsx`                |
| Navbar links / logo                                                                                                  | `frontend/src/components/Navbar.jsx`                     |
| Stats section                                                                                                        | `frontend/src/components/Stats.jsx`                      |
| Services grid                                                                                                        | `frontend/src/components/Services.jsx`                   |
| Case studies                                                                                                         | `frontend/src/components/CaseStudies.jsx`                |
| Partners strip                                                                                                       | `frontend/src/components/Partners.jsx`                   |
| Verticals section                                                                                                    | `frontend/src/components/Verticals.jsx`                  |
| Testimonials                                                                                                         | `frontend/src/components/Testimonials.jsx`               |
| "Why choose us"                                                                                                      | `frontend/src/components/WhyChoose.jsx`                  |
| **Contact form + email + office locations**                                                                          | `frontend/src/components/Contact.jsx`                    |
| Footer (links, copyright)                                                                                            | `frontend/src/components/Footer.jsx`                     |
| Preloader animation                                                                                                  | `frontend/src/components/Preloader.jsx`                  |
| **Colors, theme, spacing**                                                                                           | `frontend/tailwind.config.js`                            |
| Global CSS + custom classes (`bg-noise`, `radial-red`)                                                               | `frontend/src/App.css` and `frontend/src/index.css`      |
| Page `<title>`, favicon, meta tags                                                                                   | `frontend/public/index.html`                             |
| **API endpoints (Vercel)**                                                                                           | `api/index.py`                                           |

### 4.1 Changing the accent red

The signature red `#FF0033` is used inline in components. To change it globally, search-and-replace `#FF0033` across `frontend/src/`.

### 4.2 Contact form behaviour

The form currently saves submissions to the browser's `localStorage` (key: `sevenx_leads`). It does **not** email anyone. To wire it up:

- **Server route (recommended)** — add a route in `api/index.py`:
  ```python
  @api_router.post("/contact")
  async def submit_contact(payload: ContactModel):
      db = get_db()
      await db.leads.insert_one(payload.model_dump())
      return {"ok": True}
  ```
  Then update `frontend/src/components/Contact.jsx` `submit()` to POST to `/api/contact`.
- **Zero-backend alternatives**: Formspree, Web3Forms, Resend.

---

## 5. Editing workflow options

### Option A — Edit directly on GitHub (fastest)
Pencil-icon any file → commit → Vercel auto-deploys in ~1–2 minutes.

### Option B — Edit locally with hot reload

```bash
git clone https://github.com/<you>/sevenxnew.git
cd sevenxnew/frontend
cp .env.example .env
yarn install
yarn start          # opens http://localhost:3000
```

For the API locally (optional):
```bash
cd sevenxnew
python -m venv .venv && source .venv/bin/activate
pip install -r api/requirements.txt
uvicorn api.index:app --reload --port 8001
# open http://localhost:8001/api
```

When happy:
```bash
git add -A
git commit -m "Update hero copy"
git push
```

### Option C — Keep editing inside Emergent
Just tell the assistant what to change, then click **Save to GitHub** → Vercel picks it up.

---

## 6. Custom domain

1. Vercel dashboard → your project → **Settings → Domains** → add `sevenxm.com`.
2. Vercel shows the DNS records; add them at your registrar.
3. SSL auto-issues in ~10 minutes.

---

## 7. Environment variables reference

| Variable        | Where set                        | Used by                    | Required?               |
| --------------- | -------------------------------- | -------------------------- | ----------------------- |
| `MONGO_URL`     | Vercel Project → Env Vars        | `api/index.py`             | Only for DB endpoints   |
| `DB_NAME`       | Vercel Project → Env Vars        | `api/index.py`             | Only for DB endpoints   |
| `CORS_ORIGINS`  | Vercel Project → Env Vars        | `api/index.py`             | No (defaults to `*`)    |
| `REACT_APP_*`   | Vercel Project → Env Vars        | React build (frontend)     | No (none used today)    |

Frontend variables **must** be prefixed with `REACT_APP_` to be exposed to the browser (Create React App rule).

---

## 8. Troubleshooting

| Symptom                                             | Fix                                                                                                                              |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Build fails with "Module not found"                 | 99% a syntax error in a `.jsx` file — repro locally with `yarn build` inside `frontend/`.                                        |
| `/api` returns 500 on Vercel                        | Check Vercel **Functions** log. Usually a missing Python dep in `api/requirements.txt` or a bad `MONGO_URL`.                     |
| `/api/status` returns 503                           | Expected — you haven't set `MONGO_URL` yet. Add it in Vercel env vars (see §2).                                                  |
| Routes 404 on refresh                               | Should never happen — `vercel.json` has SPA rewrites. Ensure `vercel.json` is at repo root.                                      |
| Fonts / images not loading                          | Check `frontend/public/index.html` `<link>` tags.                                                                                |
| Old version still showing after push                | Vercel usually finishes in ~2 min. Try a hard refresh (Cmd/Ctrl+Shift+R).                                                        |
| Python cold start too slow                          | Trim `api/requirements.txt` further. Motor + FastAPI + Pydantic is already small (~30 MB unzipped).                              |

---

## 9. About the `backend/` folder

The original FastAPI backend at `/backend/server.py` is **not used on Vercel** — the deployed API lives in `/api/index.py` which is self-contained. `backend/` is kept for:
- Local dev with the original supervisor setup (`sudo supervisorctl restart backend`)
- Future deploys to a long-running host (Railway / Render / Fly.io) if you outgrow serverless.

`.vercelignore` already excludes `backend/` from Vercel uploads.
