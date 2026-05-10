# AI Resume Builder

A full-stack AI-powered career tools web application that helps users build professional resumes, analyze skill gaps against job roles, and match their resume against job descriptions — all in one place.

---

## Features

| Feature | Description |
|---|---|
| Resume Builder | Form-based resume generator. Fill in your details and download a professionally formatted PDF or DOCX instantly. |
| Skill Gap Analyzer | Upload a resume file (PDF or DOCX), select a target job role, and get a breakdown of matched and missing skills using NLP. Includes course suggestions and interview questions. |
| JD Keyword Matcher | Paste a job description and your resume text to get a keyword match score, matched keywords, and missing keywords. |
| My Resumes | View all previously generated resumes saved to your account. Download as PDF or delete. |
| Authentication | Secure custom signup and login with bcrypt password hashing and JWT-based session tokens. |

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Axios
- Deployed on Vercel

**Backend**
- FastAPI (Python)
- spaCy (`en_core_web_sm`) + rapidfuzz — NLP-based skill extraction and fuzzy matching
- Groq API (`llama3-8b-8192`) — AI-generated learning roadmaps
- PyJWT + bcrypt — authentication
- ReportLab — PDF generation
- python-docx — DOCX generation
- pdfminer.six — resume text extraction
- Deployed on Render

**Database**
- Supabase (PostgreSQL)

---

## Project Structure

```
AI-Resume-Builder-V2/
├── backend/
│   ├── main.py              # FastAPI app, all routes, auth logic
│   ├── skill_gap.py         # Skill gap analysis and interview question bank
│   ├── jd_matcher.py        # JD keyword extraction and match scoring
│   ├── resume_engine.py     # PDF and DOCX generation
│   ├── llm_service.py       # Groq API integration for roadmap generation
│   ├── requirements.txt     # Pinned Python dependencies
│   ├── build.sh             # Render build script (installs spaCy model)
│   └── render.yaml          # Render deployment configuration
├── frontend/
│   ├── src/
│   │   ├── pages/           # Landing, Login, Dashboard, ResumeBuilder, SkillGap, JDMatcher, MyResumes
│   │   ├── components/      # Navbar, Footer
│   │   ├── services/        # api.js — all backend API calls
│   │   └── hooks/           # useAuth.js
│   ├── vercel.json          # Vercel SPA routing configuration
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Local Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- A Supabase project with `users` and `resumes` tables
- A Groq API key

---

### Backend

**1. Navigate to the backend directory**

```bash
cd backend
```

**2. Create and activate a virtual environment**

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

**3. Install dependencies**

```bash
pip install -r requirements.txt
```

**4. Download the spaCy language model**

```bash
python -m spacy download en_core_web_sm
```

**5. Create a `.env` file in the `backend/` directory**

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
APP_SECRET_KEY=your_random_64_char_hex_secret
FRONTEND_URL=http://localhost:5173
```

Generate a secure `APP_SECRET_KEY` with:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

**6. Start the backend server**

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.
Health check: `http://localhost:8000/health`

---

### Frontend

**1. Navigate to the frontend directory**

```bash
cd frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Create a `.env` file in the `frontend/` directory**

```
VITE_API_BASE_URL=http://localhost:8000
```

**4. Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_KEY` | Your Supabase anon/service key |
| `GROQ_API_KEY` | Your Groq API key for LLM roadmap generation |
| `APP_SECRET_KEY` | Random secret used to sign JWT tokens (min 32 bytes hex) |
| `FRONTEND_URL` | The frontend origin allowed by CORS (e.g. `http://localhost:5173` or your Vercel URL) |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | The backend base URL (e.g. `http://localhost:8000` or your Render URL) |

---

## Supabase Table Schema

**`users` table**

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key, auto-generated |
| `name` | text | |
| `email` | text | Unique |
| `userid` | text | Unique, user-chosen login ID |
| `phone` | text | Optional |
| `password` | text | bcrypt hash — never stored as plaintext |
| `created_at` | timestamptz | Auto-generated |

**`resumes` table**

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key, auto-generated |
| `user_id` | uuid | Foreign key referencing `users.id` |
| `full_name` | text | |
| `job_title` | text | |
| `resume_data` | jsonb | Full resume payload |
| `created_at` | timestamptz | Auto-generated |

---

## Deployment

### Backend — Render

**1.** Push the repository to GitHub.

**2.** Go to [render.com](https://render.com) and create a new **Web Service**.

**3.** Connect your GitHub repository. Set the **Root Directory** to `backend/`.

**4.** Render will detect `render.yaml` automatically. Confirm:
- Build Command: `bash build.sh`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**5.** Add the following environment variables in the Render dashboard:

```
SUPABASE_URL      = your_supabase_url
SUPABASE_KEY      = your_supabase_key
GROQ_API_KEY      = your_groq_key
APP_SECRET_KEY    = your_secret_key
FRONTEND_URL      = https://your-app.vercel.app
```

**6.** Deploy. Once live, verify with: `https://your-render-url.onrender.com/health`

---

### Frontend — Vercel

**1.** Go to [vercel.com](https://vercel.com) and create a new project from your GitHub repository.

**2.** Set the **Root Directory** to `frontend/`.

**3.** Framework preset: **Vite** (auto-detected).

**4.** Add the following environment variable:

```
VITE_API_BASE_URL = https://your-render-url.onrender.com
```

**5.** Deploy.

**6.** After deployment, go back to Render and update `FRONTEND_URL` to your Vercel URL, then redeploy the backend to apply the CORS update.

> **Note:** Render free tier services spin down after 15 minutes of inactivity. The first request after inactivity may take 20–30 seconds to respond.

---

## Screenshots

Screenshots will be added after deployment.