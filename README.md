# AI Resume Builder

Full-stack AI-powered career toolkit: build resumes (PDF/DOCX), analyze skill gaps with NLP, match resumes to job descriptions, generate cover letters and learning roadmaps—secured with JWT auth and Supabase storage.

---

## Features

| Feature | Description |
|--------|-------------|
| **Resume Builder** | Form-based generator; download PDF or DOCX; optional ATS-style score and tips. |
| **Skill Gap Analyzer** | Upload PDF/DOCX; pick a role; NLP + fuzzy matching vs role skills; course links; optional Groq roadmap & interview Qs. |
| **JD Keyword Matcher** | Paste a job description + upload resume; keyword overlap score and suggestions. |
| **Cover Letter** | AI-generated letter from profile fields (Groq). |
| **My Resumes** | List / download / delete saved resumes (Supabase). |
| **Auth** | Signup/login with bcrypt-hashed passwords and JWT sessions. |

---

## Architecture

```
┌─────────────────┐     HTTPS / REST      ┌──────────────────┐
│  React (Vite)   │ ◄──────────────────► │  FastAPI (Python) │
│  Vercel / CDN   │    VITE_API_BASE_URL   │  Render / Docker   │
└─────────────────┘                        └─────────┬────────┘
                                                     │
                                            ┌────────▼────────┐
                                            │ Supabase (PG)   │
                                            │ Groq (LLM APIs) │
                                            └─────────────────┘
```

- **Frontend**: `frontend/` — React 19, React Router 7, Tailwind, Axios/fetch to API.
- **Backend**: `backend/` — FastAPI, spaCy + rapidfuzz (skill extraction), Groq for LLM features, ReportLab / python-docx, pdfminer.
- **Data**: Supabase PostgreSQL (`users`, `resumes`).

---

## Tech Stack

| Layer | Technologies |
|-------|----------------|
| Frontend | React 19, Vite 8, Tailwind CSS 3, React Router 7, Axios |
| Backend | Python 3.11, FastAPI, Uvicorn, spaCy (`en_core_web_sm`), rapidfuzz, Groq API |
| Auth | PyJWT, bcrypt |
| Deploy | Vercel (frontend SPA), Render (`render.yaml` + `build.sh`), optional Docker |

---

## Repository layout

```
AI-Resume-Builder-V2/
├── backend/
│   ├── main.py           # API routes, CORS, auth
│   ├── skill_gap.py      # Role skills + NLP extraction
│   ├── jd_matcher.py     # JD vs resume keyword analysis
│   ├── llm_service.py    # Groq: roadmap, cover letter, ATS
│   ├── resume_engine.py  # PDF / DOCX generation
│   ├── requirements.txt
│   ├── runtime.txt       # Python 3.11.x for Render
│   ├── build.sh          # pip install + spaCy model (with fallback wheel)
│   ├── render.yaml       # Render Blueprint
│   ├── Dockerfile        # Optional container deploy
│   └── Procfile          # Heroku-style process type
├── frontend/
│   ├── src/
│   │   ├── config.js     # API_BASE_URL (env-driven)
│   │   ├── services/api.js
│   │   └── pages/ ...
│   ├── vite.config.js
│   ├── vercel.json       # SPA rewrites
│   └── netlify.toml      # Netlify build + SPA redirects
├── .env.example          # Index of required variables
└── README.md
```

---

## Prerequisites

- **Node.js** 18+ (20 LTS recommended)
- **Python** 3.11.9 exactly — download from python.org/downloads/release/python-3119 — newer versions (3.12+) will cause dependency conflicts
- **Git**
- Accounts / keys: **Supabase** project, **Groq** API key (recommended for AI features)

---

## Quick start (local, Windows-friendly)

### 1. Clone

```bash
git clone https://github.com/divya-m06/AI-Resume-Builder.git
cd AI-Resume-Builder
```

### 2. Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

The spaCy English model installs automatically via pip install -r requirements.txt. No separate download needed.

Create `backend/.env` from `backend/.env.example` and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | **Yes** | Supabase project URL |
| `SUPABASE_KEY` | **Yes** | Supabase anon (or service) key |
| `APP_SECRET_KEY` | **Yes** | JWT signing secret (`python -c "import secrets; print(secrets.token_hex(32))"`) |
| `FRONTEND_URL` | **Yes** | CORS origin(s). Local: `http://localhost:5173`. Multiple: comma-separated URLs (no spaces). |
| `GROQ_API_KEY` | No* | Groq API key. Without it the API still starts; LLM features use fallbacks or skip interview generation. |

Start the API:

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Health check: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 3. Frontend

```powershell
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the dev server:

```powershell
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Production build (frontend)

```powershell
npm run build
npm run preview
```

Build output is `frontend/dist/` (used by Vercel/Netlify).

---

## Environment variables (cheat sheet)

### Backend — `backend/.env`

Copy from `backend/.env.example`.

- **`FRONTEND_URL`**: Single origin or comma-separated list, e.g.  
  `https://myapp.vercel.app,https://myapp-git-main-org.vercel.app`

### Frontend — `frontend/.env`

Copy from `frontend/.env.example`.

- **`VITE_API_BASE_URL`**: Public backend URL (no trailing slash), e.g. `https://your-api.onrender.com`

Root `.env.example` summarizes both files (no secrets).

---

## Supabase schema (minimal)

**`users`**: `id` (uuid PK), `name`, `email` (unique), `userid` (unique), `phone`, `password` (bcrypt hash), `created_at`.

**`resumes`**: `id` (uuid PK), `user_id` (fk → `users.id`), `full_name`, `job_title`, `resume_data` (jsonb), `created_at`.

---

## Deployment

### Backend — Render

1. Push repo to GitHub.
2. New **Web Service** → connect repo → **Root Directory**: `backend`.
3. Build: `bash build.sh` · Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`  
   (`render.yaml` can define this for Blueprint deploys.)
4. Set env vars: `SUPABASE_URL`, `SUPABASE_KEY`, `APP_SECRET_KEY`, `FRONTEND_URL`, `GROQ_API_KEY` (recommended).
5. Health check path: `/health` (configured in `render.yaml`).
6. Free tier may cold-start (~30s after idle).

### Frontend — Vercel

1. Import repo; **Root Directory**: `frontend`.
2. Framework: Vite (auto).
3. Build: `npm run build` · Output: `dist`.
4. Env: `VITE_API_BASE_URL=https://<your-render-host>.onrender.com`
5. Redeploy backend or update `FRONTEND_URL` if the frontend URL changes (CORS).

`frontend/vercel.json` rewrites all routes to `index.html` for SPA routing.

### Frontend — Netlify

Use `frontend/netlify.toml` (build `npm run build`, publish `dist`, SPA redirect).

### Backend — Docker

From repo root:

```bash
docker build -t ai-resume-api ./backend
docker run -p 8000:8000 --env-file backend/.env ai-resume-api
```

### Backend — Railway / Heroku-style

- **Dockerfile**: `backend/Dockerfile`
- **Procfile**: `backend/Procfile` (`$PORT` must be set by the platform)

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| CORS errors in browser | `FRONTEND_URL` on backend must exactly match the site origin (scheme + host + port). Use comma-separated list for preview deployments. |
| `SUPABASE_URL and SUPABASE_KEY must be set` | Create `backend/.env`; restart Uvicorn. |
| Skill gap always empty / NLP errors | Run `python -m spacy download en_core_web_sm` or install the wheel (see above). |
| Interview questions always empty | Set `GROQ_API_KEY`; without it, interview Q generation is skipped by design. |
| Frontend calls wrong API | Set `VITE_API_BASE_URL`; rebuild after changing env (`npm run build`). |
| Render build fails on spaCy | `build.sh` falls back to installing `en_core_web_sm` via pip wheel. |

---

## Scripts reference

| Location | Command |
|----------|---------|
| Frontend | `npm run dev`, `npm run build`, `npm run preview`, `npm run lint` |
| Backend | `uvicorn main:app --reload` (dev), `uvicorn main:app --host 0.0.0.0 --port 8000` (local prod test) |

---

## Security notes

- Never commit `.env` files; use `.env.example` only as templates.
- Rotate `APP_SECRET_KEY` if leaked.
- Use Supabase **anon** key with RLS policies appropriate for production.

---

## License / hackathon

Submitted for hackathon evaluation—ensure judges can run locally using the **Quick start** section and deploy using **Deployment** subsections.
