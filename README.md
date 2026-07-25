# Ruwaq (رواق)

Standalone product for AI-powered real estate & engineering proposals — extracted from [Turriva](https://www.turriva.com) so the proposal workspace can live on its own domain.

## What’s included

- Create proposal flow (`/proposals/new`)
- Proposal review, BOQ, clauses, PDF export
- Guest proposals + Google sign-in
- Company profile & export templates
- Sample template gallery (`/templates/sample`)
- Client share links (`/share/[token]`)

## Stack

Next.js 14, Prisma (PostgreSQL), NextAuth (Google), OpenAI for generation.

## Local setup

1. Copy env and fill secrets:

```bash
cp .env.example .env.local
```

2. Install and run DB:

```bash
npm install
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/proposals/new`.

## Deploy

Same as Turriva: set `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `NEXT_PUBLIC_APP_URL`, and `OPENAI_API_KEY`. Optional: Google OAuth, R2 storage for logos, `APP_GATE_PASSWORD` for pre-launch.

## Repository

[github.com/meklads/Ruwaq](https://github.com/meklads/Ruwaq)
