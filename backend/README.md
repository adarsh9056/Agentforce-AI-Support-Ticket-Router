# Agentforce AI Support Ticket Router (Backend)

Production-ready Express backend for AI-powered support ticket routing.

## Project Name

`agentforce-ai-support-ticket-router`

## Tech Stack

- Node.js + Express.js
- PostgreSQL (Supabase)
- OpenAI API (`gpt-3.5-turbo`)
- JWT authentication

## Run Locally

1. Install dependencies:
   - `npm install`
2. Copy envs:
   - `cp .env.example .env`
3. Configure values in `.env`
4. Run server:
   - `npm run dev`

Health check: `GET /health`

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/tickets`
- `GET /api/tickets`
- `PATCH /api/tickets/:id/status`
- `GET /api/metrics`

## Test + Lint

- `npm test`
- `npm run lint`

## Deployment

### Backend on Render

Build command: `npm install`  
Start command: `node server.js`

Live URL placeholder: `https://your-app-name.onrender.com`

## Additional Assets

- SQL schema: `sql/schema.sql`
- Postman collection: `postman/ai-ticket-router.postman_collection.json`
- CI workflow: `.github/workflows/ci.yml`
