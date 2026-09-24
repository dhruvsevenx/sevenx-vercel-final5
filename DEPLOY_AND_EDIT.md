# SevenX Media — Deploy on Vercel & Edit Guide

This repo uses **Vercel Services** (Vercel's monorepo multi-service feature) to deploy the React frontend and the FastAPI backend together in a single Vercel project.

```
sevenxnew/
├── frontend/          # React 19 + Tailwind (Create React App / Craco) — served as static site
├── backend/           # FastAPI + Mongo — deployed as a Vercel Service
│   ├── server.py         (exports the `app` variable, entrypoint = "server:app")
│   └── requirements.txt  (slim: fastapi, pydantic, motor, pymongo, dotenv)
├── vercel.json        # Multi-service config (services + rewrites)
├── .vercelignore      # Excludes tests/, memory/, .emergent/, node_modules/
└── DEPLOY_AND_EDIT.md
```

**How the deployed site is served:**

| Request | Handled by |
|---|---|
| `/api`, `/api/*` | `backend` service (FastAPI at `backend/server.py`) |
| Everything else | `frontend` service (React static build) |

The React Router SPA fallback is handled by the `frontend` service (Create React App preset on Vercel) automatically.

---

## 1. Deploy to Vercel — quick steps

1. **Push the repo to GitHub** (Emergent → "Save to GitHub" button).
2. Go to <https://vercel.com/new> → **Import** your `sevenxnew` (or `sevenx-vercel2main`) repo.
3. On the **Configure Project** screen, Vercel will show it auto-detected two services (`frontend` + `backend`). Leave everything as-is — `vercel.json` in this repo already tells Vercel what to do.
4. **Framework preset**: make sure the project-level preset is set to **Services** (Vercel does this automatically when a `services` block is present in `vercel.json`).
5. *(Optional now, needed later for DB endpoints)* Add environment variables under **Settings → Environment Variables**:

   | Name                        | Example value                                                        | Applied to |
   | --------------------------- | -------------------------------------------------------------------- | ---------- |
   | `MONGO_URL`                 | `mongodb+srv://user:pass@cluster.xyz.mongodb.net/?retryWrites=true`  | `backend`  |
   | `DB_NAME`                   | `sevenx`                                                             | `backend`  |
   | `CORS_ORIGINS`              | `https://yourdomain.com,https://sevenxnew.vercel.app`                | `backend`  |
   | `REACT_APP_SHEETS_ENDPOINT` | `https://script.google.com/macros/s/XXXX/exec` (see `GOOGLE_SHEETS_SETUP.md`) | `frontend` |

6. Click **Deploy**. First build takes ~2–4 minutes.
7. Verify the endpoints:
   - `https://your-app.vercel.app/` → React landing page
   - `https://your-app.vercel.app/api/` → `{"message":"Hello from SevenX API","mongo_enabled":false}`
   - `https://your-app.vercel.app/api/health` → `{"status":"ok",...}`
   - `https://your-app.vercel.app/api/docs` → auto-generated Swagger docs

---

## 2. The exact `vercel.json`

Already committed at the repo root:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "frontend": {
      "root": "frontend",
      "framework": "create-react-app"
    },
    "backend": {
      "root": "backend",
      "framework": "fastapi",
      "entrypoint": "server:app"
    }
  },
  "rewrites": [
    {
      "source": "/api(/.*)?",
      "destination": { "type": "service", "service": "backend" }
    },
    {
      "source": "/(.*)",
      "destination": { "type": "service", "service": "frontend" }
    }
  ]
}
```

**Do not delete this file** — without it Vercel doesn't know it's a multi-service project.

---

## 3. MongoDB Atlas (only if you use `/api/status` DB endpoints)

The site works fine without a database. The `/api/status` endpoints return `503` until you configure Mongo. When you want to enable them:

1. Sign up free at <https://www.mongodb.com/cloud/atlas>.
2. Create a **Cluster** (M0 free tier).
3. **Database Access** → add a user + password.
4. **Network Access** → **Add IP Address** → `0.0.0.0/0` (Vercel's IPs are dynamic).
5. **Connect → Drivers** → copy the connection string.
6. Vercel → Project → **Settings → Environment Variables** → add `MONGO_URL` (and `DB_NAME=sevenx`).
7. Redeploy (or just push any commit).

---

## 4. Every subsequent deploy = just push to GitHub

Once linked, **every `git push` to `main` auto-deploys** to production. Pull requests get a preview URL automatically. Both services (frontend + backend) build and deploy atomically.

---

## 5. How to edit the site

All frontend content lives in **`frontend/src/`**:

| What you want to change | File |
|---|---|
| **All text content** (hero taglines, stats, services, case studies, testimonials, verticals, partners) ⭐ start here | `frontend/src/mock/mock.js` |
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
| Global CSS + custom classes (`bg-noise`, `radial-blue`, `holo-*`) | `frontend/src/App.css` and `frontend/src/index.css` |
| Page `<title>`, favicon, meta tags, **SEO schema (JSON-LD)**, **Google Analytics** | `frontend/public/index.html` |
| Sitemap / robots for search engines | `frontend/public/sitemap.xml`, `frontend/public/robots.txt` |
| **Contact form → Google Sheets** setup (Apps Script) | `GOOGLE_SHEETS_SETUP.md` (repo root) |
| **API endpoints** | `backend/server.py` |

### Global pages (`/global` and `/global/<service>`)
| What you want to change | File |
|---|---|
| Global FAQ, service pages (affiliate management, recruitment, sub-affiliate, iGaming), their titles & meta descriptions | `frontend/src/content/globalContent.json` |
| Global hub sections (capabilities, affiliate team, iGaming, market expansion…) | `frontend/src/components/global/GlobalSections.jsx` |
| Global stats, case studies, testimonials, partners, verticals, hero tags | `frontend/src/mock/mockGlobal.js` |
| Confirmed markets for the market map (empty until confirmed) | `MARKETS` in `GlobalSections.jsx` |

`yarn build` runs `scripts/seo-postbuild.js` afterwards, which writes `build/global/**/index.html` with each route's own title, canonical, Open Graph tags and JSON-LD (read from `globalContent.json`). To add a service page, add an entry to `services` in that JSON file and a line to `public/sitemap.xml`.

### Changing the accent red
Search-and-replace `#FF0033` across `frontend/src/`.

### Contact form → real submissions
Currently the form saves to `localStorage`. To store leads in the backend DB, add a route in `backend/server.py`:

```python
class Lead(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    telegram: Optional[str] = None
    vertical: Optional[str] = None
    budget: Optional[str] = None
    message: str

@api_router.post("/leads")
async def submit_lead(lead: Lead):
    db = get_db()
    if db is None:
        raise HTTPException(503, "Mongo not configured")
    doc = lead.model_dump()
    doc["ts"] = datetime.now(timezone.utc).isoformat()
    await db.leads.insert_one(doc)
    return {"ok": True}
```

Then in `frontend/src/components/Contact.jsx` `submit()`, replace the localStorage block with:

```js
await fetch("/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

Because both services live under the same Vercel deployment, `/api/leads` works with no CORS setup and no env-var URL — Vercel's rewrites route it to the backend service.

---

## 6. Editing workflow options

### Option A — Edit on GitHub (fastest for small changes)
Pencil-icon any file → commit → Vercel auto-deploys in ~1–2 min.

### Option B — Local editing with hot reload

Frontend:
```bash
git clone https://github.com/<you>/sevenxnew.git
cd sevenxnew/frontend
cp .env.example .env
yarn install
yarn start        # http://localhost:3000
```

Backend (separate terminal):
```bash
cd sevenxnew/backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
# http://localhost:8001/api/
```

Push when done:
```bash
git add -A && git commit -m "Update copy" && git push
```

### Option C — Edit inside Emergent
Tell the assistant what to change → click **Save to GitHub** → Vercel picks it up.

---

## 7. Custom domain

1. Vercel dashboard → project → **Settings → Domains** → add `sevenxm.com`.
2. Add the DNS records Vercel shows at your registrar.
3. SSL auto-issues in ~10 min.

---

## 8. Environment variables reference

| Variable | Applied to service | Purpose | Required? |
|---|---|---|---|
| `MONGO_URL` | `backend` | Atlas connection string | Only for DB endpoints |
| `DB_NAME` | `backend` | Database name (default `sevenx`) | Only for DB endpoints |
| `CORS_ORIGINS` | `backend` | Comma-separated allowlist (default `*`) | No |
| `REACT_APP_*` | `frontend` | Any React-side config | No (none used today) |

Frontend variables **must** be prefixed with `REACT_APP_` to be exposed to the browser.

---

## 9. Troubleshooting

| Symptom | Fix |
|---|---|
| Vercel says "vercel.json required" on import | Make sure `vercel.json` is at the **repo root** (not inside `frontend/` or `backend/`). |
| Build fails on the frontend | Reproduce locally with `yarn build` inside `frontend/`. It's almost always a `.jsx` syntax error. |
| Backend `/api/*` returns 500 | Check the **Vercel → Deployment → Functions/Services → backend** logs. Usually a missing dep in `backend/requirements.txt` or a bad `MONGO_URL`. |
| `/api/status` returns 503 | Expected — set `MONGO_URL` (see §3) to enable. |
| Routes 404 on refresh (e.g. `/services`) | This is handled by the `frontend` service (CRA preset) — if you add real routes to React Router, they'll work. |
| Backend cold start slow | Vercel Services keep FastAPI warm (Fluid Compute). If still slow, further trim `backend/requirements.txt`. |
| Old version still showing after push | Wait ~2 min, then hard refresh (Cmd/Ctrl+Shift+R). |

---

## 10. Notes about the old setup

If you're comparing this to the previous `vercel.json` I set up before:
- **Old:** single-service + serverless functions in `/api/*.py` — replaced.
- **New:** Vercel Services with `frontend` + `backend` as two co-deployed services in one project.
- The old top-level `/api/` folder has been removed; the FastAPI backend now lives entirely in `backend/`.
