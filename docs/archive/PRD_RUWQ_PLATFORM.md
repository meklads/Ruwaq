# Ruwaq Platform (ruwaq.co) — Product Requirement Document

> **Implementation note (repo):** Production runs on **Coolify + PostgreSQL + Prisma + NextAuth** with the existing **AI proposal builder**. This PRD is the north star; we implement in phases without throwing away the working proposals tool. Supabase/Vercel/shadcn migration is optional later.

See user-provided full spec below. Phases 1–3 are being built incrementally in `src/modules/marketplace/`.

---

## Project Overview

- **Brand:** منصة رواق | Ruwaq
- **Domain:** ruwaq.co
- **Purpose:** B2B/B2C marketplace for high-ticket engineering & real estate services in Western KSA (Jeddah, Makkah, Madinah), plus SaaS proposals for contractors and lead routing to Turriva (`turriva.com`) for fit-out & general contracting.

## Tech (target vs current)

| PRD | Current repo |
|-----|----------------|
| Supabase | PostgreSQL + Prisma (Coolify) |
| next-intl | Custom i18n (`src/shared/i18n`) |
| Vercel | Coolify |
| @react-pdf | Existing HTML/PDF export pipeline |

## Categories (7)

`hvac`, `fit-out`, `contracting`, `elevators`, `waterproofing`, `furnishing`, `facades`

## Lead routing

- **fit-out, contracting** → `ASSIGNED_TO_TURRIVA`
- **Other categories** → `BROADCASTED_TO_PARTNERS`

## Routing (target)

- `/` — marketplace hero + quote entry + contractor proposal tool
- `/[city]/[category]` — programmatic SEO listings
- `/request-quote` — lead capture
- `/proposals/*` — existing SaaS tool (workspace)

_Full original PRD sections (schema, UI copy, phases) preserved in git history and product discussions._
