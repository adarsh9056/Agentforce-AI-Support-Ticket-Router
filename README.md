# Agentforce AI Support Ticket Router

Production-ready full-stack AI support routing platform with modern auth UI, role-based operations workspace, telemetry analytics, and automated deployment pipeline.

## Project

- **Name:** `agentforce-ai-support-ticket-router`
- **Repository:** [adarsh9056/Agentforce-AI-Support-Ticket-Router](https://github.com/adarsh9056/Agentforce-AI-Support-Ticket-Router)

## Live Links

- **Frontend (Vercel):** [https://agentforce-ai-support-ticket-router.vercel.app](https://agentforce-ai-support-ticket-router.vercel.app)
- **Backend API (Render):** [https://agentforce-ai-support-ticket-router.onrender.com](https://agentforce-ai-support-ticket-router.onrender.com)
- **Backend health:** [https://agentforce-ai-support-ticket-router.onrender.com/health](https://agentforce-ai-support-ticket-router.onrender.com/health)

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + Recharts
- **Backend:** Node.js + Express + JWT auth
- **Database:** PostgreSQL on Supabase
- **AI Classification:** OpenAI (`gpt-3.5-turbo`)
- **Deploy:** Vercel (frontend) + Render (backend)
- **CI/CD:** GitHub Actions

## Current Product Capabilities

- Authentication with role-aware access (`user`, `admin`)
- Ticket creation with AI category classification:
  - `Billing`, `Technical`, `General`, `Escalate`
- Ticket lifecycle updates (`open`, `in_progress`, `resolved`, `closed`)
- Admin telemetry:
  - tickets per hour
  - classification accuracy
  - avg resolution time
  - open vs closed indicators
- Modern monochrome UI with improved spacing/typography and animated auth experience
- Form guidance for validation:
  - title minimum 5 characters
  - description minimum 10 characters

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/tickets`
- `GET /api/tickets`
- `PATCH /api/tickets/:id/status`
- `GET /api/metrics`

## Project Structure

```txt
agentforce-ai-support-ticket-router/
├── .github/workflows/ci.yml
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
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── services/
    ├── .env.example
    └── package.json
```

## Local Development

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

- Frontend local: `http://localhost:5173`
- Backend local: `http://localhost:5000`

## Environment Variables

### Backend (`backend/.env`)

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN=7d`
- `OPENAI_API_KEY`
- `NODE_ENV`
- `PORT` (optional in cloud)

### Frontend (`frontend/.env`)

- `VITE_API_URL=https://agentforce-ai-support-ticket-router.onrender.com`

## Database Setup (Supabase)

Run the schema from:

- `backend/sql/schema.sql`

This creates:

- `users`
- `tickets`
- `telemetry_logs`

## Testing & Quality

### Backend

```bash
cd backend
npm run lint
npm test
```

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

## Postman

Import:

- `backend/postman/ai-ticket-router.postman_collection.json`

## Deployment Notes

### Render (Backend)

- Root directory: `backend`
- Build command: `npm install`
- Start command: `node server.js`
- Use Supabase pooler URI in `DATABASE_URL`

### Vercel (Frontend)

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Env: `VITE_API_URL` pointing to Render backend URL
