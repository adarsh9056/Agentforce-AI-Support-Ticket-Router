# Agentforce-style AI Support Ticket Router

Production-ready full-stack support ticket routing system with AI classification, JWT auth, role-based dashboard, and telemetry.

## Project Name

`agentforce-ai-support-ticket-router`

## Architecture

- `frontend` - React + Tailwind + Recharts (Vercel)
- `backend` - Node.js + Express + PostgreSQL + OpenAI (Render)
- `database` - Supabase PostgreSQL

## Folder Structure

```txt
agentforce-ai-support-ticket-router/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── tests/
│   ├── postman/
│   ├── sql/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── .env.example
│   └── package.json
└── .github/workflows/ci.yml
```

## Implemented Features

1. Ticket submission (`title`, `description`, `priority`)
2. AI ticket classification into `Billing`, `Technical`, `General`, `Escalate`
3. JWT auth with role-based access (`user`, `admin`)
4. Admin telemetry panel:
   - Tickets per hour
   - Classification accuracy
   - Avg resolution time
   - Open vs closed ratio
5. REST APIs:
   - `POST /api/tickets`
   - `GET /api/tickets`
   - `PATCH /api/tickets/:id/status`
   - `GET /api/metrics`
6. GitHub Actions CI/CD with tests, lint, and frontend build
7. Postman collection included

## Local Setup

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend defaults to `http://localhost:5173`, backend to `http://localhost:5000`.

## Supabase SQL

Run `backend/sql/schema.sql` in Supabase SQL editor.

## Postman

Import: `backend/postman/ai-ticket-router.postman_collection.json`

## Deployment (Free)

### Backend -> Render

1. Push repo to GitHub
2. Create Render Web Service from repo
3. Build command: `cd backend && npm install`
4. Start command: `cd backend && node server.js`
5. Add backend env vars (`DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY`)

### Frontend -> Vercel

1. Import repo on Vercel
2. Set root directory to `frontend`
3. Add env var `VITE_API_URL=https://your-render-app.onrender.com`
4. Deploy

## Live URLs

- Frontend URL: `https://<your-vercel-project>.vercel.app`
- Backend URL: `https://<your-render-service>.onrender.com`
