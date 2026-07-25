# Saudi Proposal OS — Technical Foundation Design

> **Status:** Draft v1.0  
> **Author:** Principal Software Architecture  
> **Date:** June 2026  
> **Based on:** PRD v1.0 + TAS v1.0 + Domain Model v1.0 + DDS v1.0  
> **Confidentiality:** Internal — Meklads / Ruwaq

---

## PART 1 — TECH STACK DECISIONS

### Selection Philosophy

Every tool is chosen based on three criteria:
1. **Does it align with our architecture principles?** (monolith, server-first, simplicity)
2. **Does it reduce cognitive load for a small team?** (we are 1–3 developers)
3. **Does it have proven production maturity?** (not the newest, not the shiniest — the most battle-tested)

---

### Stack Overview

| Layer | Choice | Justification |
|-------|--------|---------------|
| **Frontend** | Next.js (App Router) | Server-first by design. React Server Components deliver zero JS to the client by default. File-based routing aligns with domain modules. Server Actions eliminate boilerplate for form handling. |
| **Backend** | Next.js API Routes + Server Actions | True monolith — one codebase, one deployment, one server process. Backend logic lives in `modules/`, exposed through Server Actions (mutation) and Route Handlers (read/API). No separate backend server needed. |
| **Database** | PostgreSQL | Relational integrity for complex domain relationships. JSONB for AI-generated semi-structured content. Battle-tested for 20+ years. Full-text search for proposal search. Row-level security for future multi-tenancy. |
| **ORM** | Prisma | Type-safe database access. Generated TypeScript types eliminate manual type definitions. Migration system handles schema evolution. Best-in-class DX for a TypeScript monolith. |
| **Auth** | Auth.js (NextAuth v5) | Built for Next.js. Supports email/password, Google, and Apple out of the box. Session management is handled. Extensible for future providers. |
| **Validation** | Zod + Prisma's native types | Zod for runtime validation (forms, API inputs, AI outputs). Type inference bridges Zod schemas to TypeScript types. Prisma provides the source of truth for data shapes. |
| **AI Provider** | OpenAI (GPT-4o) | Best quality-to-latency ratio for structured JSON generation. GPT-4o-mini for cost-sensitive operations (rewrites, suggestions). Well-documented API, predictable pricing. Azure OpenAI as future alternative for Saudi data residency. |
| **PDF Engine** | Puppeteer (server-side) | Industry standard for HTML-to-PDF conversion. Full CSS support including RTL and Arabic typography. Consistent output across all browsers. Chromium handles the complex layouts proposals require (tables, headers, footers, page numbers). |
| **Billing** | Stripe | Mature API, webhooks, subscription management, invoicing. Supports Saudi riyal (SAR). Stripe Tax handles ZATCA compliance. Moyasar as V1.1 addition for local payment methods (MADA, STC Pay). |
| **Email** | Resend | Simple transactional email API. React Email for building beautiful email templates (proposal notifications, invoices). High deliverability. Generous free tier. |
| **Storage** | S3-compatible (Cloudflare R2) | No egress fees (R2). Store: logos, generated PDFs, exported documents. Public URLs for shareable content. Signed URLs for private documents. |
| **Analytics** | PostHog (self-hosted or cloud) | Event-based product analytics. Tracks: proposal creation, AI generation, exports, sign-ups. Privacy-compliant. Self-hosted option for data sovereignty. |
| **Deployment** | Railway (MVP) → Fly.io (Scale) | One-command deploy from GitHub. Built-in PostgreSQL. Automatic SSL. Simple horizontal scaling when needed. No Kubernetes, no Docker compose, no ops team. |

---

### Why Not Alternatives Considered

| Alternative | Rejected Because |
|-------------|------------------|
| **Create React App / Vite SPA** | Client-side rendering contradicts our server-first philosophy. Slower initial load, weaker SEO, more JS shipped. |
| **Express / Fastify (separate backend)** | Adds a second codebase, deployment, and API contract to maintain. Unnecessary for a monolith team. |
| **MongoDB / Firestore** | No relational integrity for our domain (proposals have clear relationships). Schema-less design causes more bugs than it prevents. |
| **Drizzle ORM** | Less mature than Prisma for complex migrations and type generation. Prisma's type safety is more complete. (Drizzle is a strong alternative for V2 if Prisma proves limiting.) |
| **TailwindCSS alone** | We will use TailwindCSS for utility classes + a minimal component library (shadcn/ui) for accessible primitives. Not a rejection, but a note: we build our own design system on top of Tailwind. |
| **Turbopack / Bun** | Too early for production. Node.js + webpack/next build is proven and stable. |
| **Kubernetes / Docker Swarm** | Infrastructure complexity that provides zero value at 5,000 users. A PaaS abstracts server management entirely. |

---

## PART 2 — FOLDER ARCHITECTURE

### Philosophy

The folder structure answers one question: **"Where do I find the code for feature X?"**

The answer is always the same: look in `modules/<feature-name>/`.

We organize by **domain** (what the code does) not by **layer** (whether it's a route, service, or component). This is Domain-Driven Design applied to folder structure.

```
src/
├── app/                            # Next.js App Router (pages + API routes)
├── modules/                        # Domain modules (the core of the application)
│   ├── auth/                       # Authentication module
│   ├── proposal/                   # Proposal module (the largest)
│   ├── company/                    # Company profile module
│   ├── subscription/               # Subscription & plans module
│   └── billing/                    # Billing & payments module
├── shared/                         # Shared kernel (cross-cutting)
│   ├── ui/                         # Design system components
│   ├── lib/                        # Utilities and helpers
│   ├── services/                   # Shared services (AI, PDF, Email)
│   └── types/                      # Shared TypeScript types
├── config/                         # Application configuration
└── prisma/                         # Prisma schema and migrations
```

---

### Detailed Structure

```
src/
├── app/
│   ├── (marketing)/                # Marketing pages (landing, about, pricing)
│   │   ├── page.tsx               # Landing page
│   │   ├── pricing/page.tsx
│   │   └── layout.tsx             # Marketing layout (no sidebar)
│   ├── (auth)/                     # Authentication pages
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/               # Authenticated pages (require session)
│   │   ├── layout.tsx             # Dashboard layout (sidebar, header)
│   │   ├── page.tsx               # Dashboard home / overview
│   │   ├── proposals/
│   │   │   ├── page.tsx           # Proposal list
│   │   │   ├── new/page.tsx       # New proposal (multi-step form)
│   │   │   └── [id]/
│   │   │       ├── page.tsx       # Proposal detail / editor
│   │   │       └── preview/page.tsx # Proposal preview (read-only)
│   │   ├── settings/
│   │   │   ├── profile/page.tsx
│   │   │   └── company/page.tsx
│   │   └── billing/
│   │       ├── page.tsx           # Billing overview
│   │       └── history/page.tsx
│   └── api/                        # API route handlers (when Server Actions aren't enough)
│       ├── auth/                   # Auth.js routes (required by NextAuth)
│       ├── webhooks/               # Stripe webhooks
│       │   ├── stripe/route.ts
│       │   └── resend/route.ts
│       └── proposals/
│           ├── [id]/
│           │   ├── export/
│           │   │   └── pdf/route.ts  # PDF download endpoint
│           │   └── share/
│           │       └── [token]/route.ts  # Public share link
│
├── modules/
│   ├── auth/
│   │   ├── server/
│   │   │   ├── auth.config.ts     # Auth.js configuration
│   │   │   ├── auth.service.ts    # Auth business logic
│   │   │   └── session.ts         # Session helpers
│   │   ├── validators/
│   │   │   └── auth.schema.ts     # Zod schemas for login/signup
│   │   └── types/
│   │       └── auth.types.ts      # Auth-specific types
│   │
│   ├── proposal/
│   │   ├── server/
│   │   │   ├── proposal.service.ts      # Core business logic
│   │   │   ├── proposal-ai.service.ts   # AI generation orchestration
│   │   │   ├── proposal-pdf.service.ts   # PDF generation
│   │   │   ├── proposal-export.service.ts # Export/share logic
│   │   │   └── proposal-version.service.ts # Version management
│   │   ├── validators/
│   │   │   ├── proposal-input.schema.ts  # User input validation
│   │   │   ├── proposal-ai-output.schema.ts # AI output validation
│   │   │   └── proposal-export.schema.ts # Export options
│   │   ├── types/
│   │   │   ├── proposal.types.ts
│   │   │   ├── proposal-ai.types.ts
│   │   │   └── proposal-export.types.ts
│   │   ├── components/
│   │   │   ├── proposal-form/           # Multi-step form components
│   │   │   ├── proposal-preview/        # Preview components
│   │   │   ├── proposal-card/           # Dashboard card
│   │   │   └── proposal-actions/        # Action buttons (export, share, archive)
│   │   └── templates/                   # Proposal HTML templates for PDF
│   │       ├── construction/
│   │       ├── engineering/
│   │       ├── consulting/
│   │       ├── maintenance/
│   │       └── agency/
│   │
│   ├── company/
│   │   ├── server/
│   │   │   ├── company.service.ts
│   │   │   └── company-upload.service.ts # Logo upload handling
│   │   ├── validators/
│   │   │   └── company.schema.ts
│   │   ├── types/
│   │   │   └── company.types.ts
│   │   └── components/
│   │       ├── company-form/
│   │       └── brand-preview/
│   │
│   ├── subscription/
│   │   ├── server/
│   │   │   ├── subscription.service.ts     # Plan management
│   │   │   ├── usage.service.ts            # Usage tracking
│   │   │   └── feature-flags.service.ts    # Feature access control
│   │   ├── validators/
│   │   │   └── subscription.schema.ts
│   │   └── types/
│   │       └── subscription.types.ts
│   │
│   └── billing/
│       ├── server/
│       │   ├── billing.service.ts        # Stripe integration
│       │   ├── billing-webhook.service.ts # Webhook handlers
│       │   └── billing-invoice.service.ts # Invoice generation
│       ├── validators/
│       │   └── billing.schema.ts
│       └── types/
│           └── billing.types.ts
│
├── shared/
│   ├── ui/                        # Design system (shadcn/ui + custom)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── toast.tsx
│   │   └── ...                   # ~30 components total for MVP
│   ├── lib/
│   │   ├── db.ts                  # Prisma client singleton
│   │   ├── env.ts                 # Environment variables (typed)
│   │   ├── logger.ts              # Structured logging
│   │   ├── errors.ts              # Error classes
│   │   ├── response.ts            # API response helpers
│   │   ├── format.ts              # SAR currency, date, Arabic number formatting
│   │   └── utils.ts               # Tiny pure utilities (cn(), etc.)
│   ├── services/
│   │   ├── ai/
│   │   │   ├── ai-client.ts       # OpenAI client wrapper
│   │   │   ├── ai-prompt-builder.ts # Prompt construction
│   │   │   └── ai-retry.ts        # Retry logic with backoff
│   │   ├── pdf/
│   │   │   ├── pdf-engine.ts      # Puppeteer wrapper
│   │   │   ├── pdf-templates.ts   # Template rendering
│   │   │   └── pdf-styles.ts      # Shared PDF styles
│   │   └── email/
│   │       ├── email-client.ts    # Resend wrapper
│   │       └── email-templates/   # React Email templates
│   ├── types/
│   │   ├── common.types.ts        # Shared type definitions
│   │   └── next.types.ts          # Next.js type extensions
│   └── middleware/
│       ├── auth.middleware.ts      # Auth guard (check session)
│       └── subscription.middleware.ts # Subscription check
│
├── config/
│   ├── site.ts                    # Site configuration (name, URLs, etc.)
│   ├── plans.ts                   # Plan definitions (limits, features, prices)
│   ├── ai-prompts/                # System prompts for AI stages
│   │   ├── analysis.txt
│   │   ├── scope.txt
│   │   ├── commercial.txt
│   │   └── assembly.txt
│   └── templates/                 # Default proposal templates (JSON)
│       ├── villa-fitout.json
│       ├── engineering.json
│       └── ...
│
└── prisma/
    ├── schema.prisma              # Database schema
    └── migrations/                 # Auto-generated migrations
```

---

### Why This Structure Works

| Characteristic | How It's Achieved |
|----------------|-------------------|
| **Discoverability** | All code for "proposals" is in `modules/proposal/`. You never search across layers. |
| **Module independence** | Each module can be understood, tested, and modified without touching other modules. |
| **Shared kernel clarity** | `shared/` contains only truly cross-cutting code. If something is used by only one module, it stays in that module. |
| **Next.js compatibility** | The `app/` directory follows Next.js conventions exactly. Modules are imported by pages, not mixed in. |
| **Scalability for new modules** | Adding Contract OS = adding `modules/contract/`. The rest of the structure doesn't change. |

---

## PART 3 — SHARED KERNEL PHILOSOPHY

### What Belongs in Shared

The shared kernel contains code that **two or more modules** need, and that has **no business domain logic**.

| Category | What Goes Here | Examples |
|----------|---------------|----------|
| **UI Components** | Design system primitives | Button, Input, Card, Dialog, Select, Toast. These have no business knowledge. |
| **Utilities** | Pure functions with no side effects | `cn()` for class merging, `formatCurrency()` for SAR, `formatDate()`, `cnpj()` equivalent for CR number formatting. |
| **Infrastructure Clients** | Wrappers around external services | AI client (OpenAI wrapper), PDF engine (Puppeteer wrapper), Email client (Resend wrapper). These are stateless and domain-agnostic. |
| **Shared Types** | Types used across multiple modules | `PaginatedResponse<T>`, `ApiResponse<T>`, `SortDirection`, `Language` (ar/en). |
| **Middleware** | Cross-cutting request logic | Auth guard, subscription check (checks if user can access, but has no subscription business logic). |
| **Configuration** | Environment variables, site config | Typed env access, site name/URL, plan definitions (data, not logic). |

### What Does NOT Belong in Shared

| Category | Why It Stays in Its Module |
|----------|---------------------------|
| **Business logic** | Each module owns its business rules. Proposal logic doesn't belong in shared. |
| **Domain-specific types** | `ProposalStatus`, `PaymentStructure`, `AIGenerationStage` belong in the proposal module. |
| **Module-specific components** | `ProposalForm`, `ProposalCard` are UI + business logic combined. They stay in their module. |
| **AI prompts** | Proposal-specific prompts stay in `modules/proposal/`. Future Contract OS will have its own prompts. |
| **Templates** | Proposal templates are specific to the proposal domain. |

### Shared Kernel Rules

1. **No business logic.** A file in `shared/` should never contain an `if` statement that encodes a business rule.
2. **No direct database access.** Database queries belong in module services, never in shared utilities.
3. **No module imports.** `shared/` should never import from `modules/`. The dependency direction is one-way: `modules/` → `shared/`.
4. **Stable interface.** Code in `shared/` should change less frequently than module code. API-breaking changes to shared code affect every module.
5. **Minimal surface area.** Only put something in shared when you have at least two consumers. One consumer = keep it in the module.

---

## PART 4 — CODING STANDARDS

### 4.1 Naming Conventions

| Category | Convention | Example |
|----------|-----------|---------|
| **Files** | `kebab-case` | `proposal.service.ts`, `ai-client.ts` |
| **React components** | `PascalCase` files | `ProposalForm.tsx`, `Button.tsx` |
| **Functions** | `camelCase` | `createProposal()`, `generateScope()` |
| **Types/Interfaces** | `PascalCase` prefixed with domain | `ProposalInput`, `AIOutput`, `UserSession` |
| **Zod schemas** | Suffix with `Schema` | `proposalInputSchema`, `loginSchema` |
| **Constants** | `UPPER_SNAKE_CASE` | `MAX_PROPOSAL_LENGTH`, `FREE_TIER_LIMIT` |
| **Environment variables** | `PUBLIC_` / `PRIVATE_` prefix | `PUBLIC_APP_URL`, `PRIVATE_OPENAI_KEY` |
| **Database models (Prisma)** | `PascalCase` singular | `User`, `Proposal`, `GeneratedDocument` |

### 4.2 File Conventions

| Rule | Explanation |
|------|-------------|
| **One export per file** | A file exports one primary thing (a function, a component, a type). No barrel exports that re-export 20 things. |
| **File name matches export** | `proposal.service.ts` exports `ProposalService`. `button.tsx` exports `Button`. |
| **Max 200 lines per file** | If a file exceeds 200 lines, it likely has multiple responsibilities. Split it. |
| **Max 3 levels of nesting** | Deep nesting indicates complexity. Extract into smaller functions. |
| **No `index.ts` files** | Explicit imports are clearer. `import { createProposal } from 'modules/proposal/server/proposal.service'` vs implicit barrel imports. |

### 4.3 Type Safety Rules

| Rule | Explanation |
|------|-------------|
| **No `any`** | Never. If you don't know the type, use `unknown` and narrow it. Code review rejects `any`. |
| **No `as` casts** | Type assertions hide real type errors. If you need `as`, your types are wrong. Fix the types. |
| **Strict mode** | TypeScript `strict: true` in `tsconfig.json`. No exceptions. |
| **Prisma types as source of truth** | Database-facing types come from Prisma generated types. Never manually duplicate them. |
| **Zod for all boundaries** | Every user input, every API request, every AI output is validated through a Zod schema at the boundary. Internal code uses inferred types. |
| **Function return types are explicit** | Every exported function has an explicit return type annotation. No reliance on type inference for public API surfaces. |

### 4.4 Error Handling Philosophy

| Principle | Implementation |
|-----------|---------------|
| **Errors are values, not exceptions** | Business logic functions return `Result<T, E>` patterns or throw typed errors that are caught at the boundary. |
| **Three error categories** | `InputError` (user provided bad data), `BusinessError` (operation violates a rule), `SystemError` (AI failed, DB down). Each is handled differently. |
| **User-facing errors are human-readable** | `InputError` → show the field and the problem. `BusinessError` → explain the rule. `SystemError` → apologize and offer alternatives. |
| **Server errors are logged, not displayed** | Full error details go to the logger (with correlation ID). User sees: "Something went wrong. We've been notified." |
| **Every API handler has a try-catch** | The outermost handler catches all errors, logs them, and returns a structured error response. No uncaught exceptions. |

### 4.5 Server-First Principles

| Principle | Implementation |
|-----------|---------------|
| **Mutations go through Server Actions** | Forms submit to Server Actions. The action validates, processes, and returns the result. No client-side API calls for mutations. |
| **Reads use Server Components** | Data fetching happens in Server Components. Client Components receive data as props. No `useEffect` for data fetching. |
| **Client Components are leaves** | Only the deepest interactive components are Client Components. They receive data and callbacks as props from Server Components. |
| **Business logic never runs on the client** | No secret keys, no business rules, no AI calls on the client. The client is a view. |
| **Loading states are handled by Suspense** | Use `loading.tsx` and `Suspense` boundaries, not client-side loading spinners. |

### 4.6 No Duplicated Logic

| Rule | How We Enforce |
|------|---------------|
| **Single source of truth for data shapes** | Prisma model → Zod schema → TypeScript type. One change propagates through code generation, not manual updates. |
| **Single source of truth for business rules** | `proposal.service.ts` is the only place that knows "a proposal needs all sections reviewed before completion." No other file duplicates this check. |
| **No copy-paste** | If you're tempted to copy-paste code, extract it into a shared utility or service. |
| **No "similar but slightly different" functions** | If two functions are 80% similar, abstract the 80% into a parameterized function. |

### 4.7 No Hidden Magic

| Rule | Explanation |
|------|-------------|
| **No implicit side effects** | A function called `getProposal()` should not mutate state. Side effects are named explicitly (`saveProposalAndNotify`). |
| **No automatic behaviors** | No "magic" that happens without the developer explicitly triggering it. No auto-save that fires without being called. |
| **No implicit transformations** | Data should not be transformed without explicit request. `createProposal` returns the created proposal — it doesn't also format it for display. |
| **Configuration is explicit** | No magic numbers. No hardcoded strings. Every constant lives in `config/` or in a well-named constant near where it's used. |

---

## PART 5 — DEPENDENCY PHILOSOPHY

### 5.1 Minimal Dependencies

**Principle:** Every dependency is a liability. It can break, become unmaintained, introduce vulnerabilities, or increase bundle size. We add dependencies only when the value is clear and the cost is justified.

**Decision framework:**
1. Can we write this functionality in ≤ 50 lines of code? → Write it ourselves.
2. Is the dependency mature, well-maintained, and stable? → Consider it.
3. Does the dependency have a small API surface that we can wrap? → Accept it.
4. Is the dependency > 100KB gzipped? → Question it aggressively.

### 5.2 Approved Dependencies (MVP)

| Category | Dependency | Why Approved |
|----------|-----------|--------------|
| **Framework** | `next`, `react`, `react-dom` | Core platform. Cannot write ourselves. |
| **Database** | `@prisma/client`, `prisma` | ORM with type generation. Essential for productivity. |
| **Auth** | `next-auth` | Full-featured auth for Next.js. Avoids building auth from scratch. |
| **Validation** | `zod` | Industry standard. Small footprint. Type inference is critical. |
| **UI** | `tailwindcss`, `tailwind-merge`, `class-variance-authority`, `lucide-react` | Tailwind for utility CSS. CVA for component variants. Lucide for icons. ~30KB total. |
| **UI Components** | `@radix-ui/react-*` (individual primitives) | Accessible, unstyled primitives. We add our own styles. Only import what we use. |
| **AI** | `openai` | Official SDK. Handles streaming, retries, error types. |
| **PDF** | `puppeteer` or `@playwright/browser-chromium` | Essential for HTML-to-PDF. No lighter alternative handles RTL Arabic correctly. |
| **Billing** | `stripe` | Official SDK. Webhook signature verification. Type-safe API. |
| **Email** | `resend`, `@react-email/components` | Transactional email API. React Email for template development. |
| **Formatting** | `date-fns` | Tree-shakeable date formatting. Locale support for Arabic dates. |
| **Security** | `bcryptjs`, `uuid` | Password hashing, UUID generation. Tiny and stable. |

### 5.3 What We Avoid

| Category | Why Avoided |
|----------|-------------|
| **State management (Redux, Zustand, Jotai)** | Server state is managed by Next.js caching and Server Actions. Client state is minimal (form state lives in the form component). We don't need a global state library. |
| **HTTP client (axios, ky)** | `fetch` is built-in and sufficient. We wrap it in a thin `api.client.ts` if we need defaults. |
| **CSS frameworks (Bootstrap, MUI, Chakra)** | Heavy, opinionated, difficult to customize for our brand. Tailwind + Radix gives us full control. |
| **Form libraries (react-hook-form, formik)** | Server Actions + Zod handle form validation natively. For complex multi-step forms, we add lightweight form state management if needed, not a heavy library. |
| **Testing frameworks (MVP)** | Jest + React Testing Library added when we have 10+ files. Not on day one. |
| **Lodash / Ramda** | Modern JS (ES2020+) covers 90% of lodash use cases. We write the remaining 10% in < 10 lines. |

### 5.4 Dependency Management Rules

| Rule | Enforcement |
|------|-------------|
| **Pin major versions** | `next: "14.2.x"` not `next: "^14.0.0"`. We control when we upgrade. |
| **Review all new dependencies** | Any new dependency requires a PR comment explaining: what it does, why we need it, what the alternatives were. |
| **Remove unused dependencies** | `npm prune` and manual review before every release. |
| **Prefer built-in APIs** | `URLSearchParams` over `qs`. `structuredClone` over `lodash.cloneDeep`. `Intl.DateTimeFormat` over moment. |
| **No monorepo tools** | Turborepo, Nx, Lerna add complexity. A single Next.js app doesn't need them. |

---

## PART 6 — ENVIRONMENT VARIABLES STRATEGY

### 6.1 Naming Standards

| Prefix | Visibility | Example |
|--------|------------|---------|
| `PUBLIC_` | Available to client and server | `PUBLIC_APP_URL` |
| `PRIVATE_` | Server-only | `PRIVATE_OPENAI_API_KEY` |
| (no prefix) | Server-only (legacy) | `DATABASE_URL` |

**Rules:**
- `PUBLIC_` variables are safe to expose to the client (app URL, public API keys for analytics, etc.)
- Everything else is server-only
- Next.js `.env.local` for local development
- GitHub Actions secrets for CI/CD
- Railway/Fly.io dashboard for production

### 6.2 Required Variables

| Variable | Type | Description |
|----------|------|-------------|
| `DATABASE_URL` | Private | PostgreSQL connection string |
| `PRIVATE_OPENAI_API_KEY` | Private | OpenAI API key |
| `PRIVATE_STRIPE_SECRET_KEY` | Private | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public | Stripe publishable key |
| `PRIVATE_RESEND_API_KEY` | Private | Resend API key |
| `PUBLIC_APP_URL` | Public | Application base URL |
| `PUBLIC_APP_NAME` | Public | "Saudi Proposal OS" |
| `NEXTAUTH_SECRET` | Private | Auth.js encryption secret |
| `NEXTAUTH_URL` | Private | Auth.js URL (same as PUBLIC_APP_URL) |
| `PRIVATE_STORAGE_ACCESS_KEY` | Private | S3-compatible storage access key |
| `PRIVATE_STORAGE_SECRET_KEY` | Private | S3-compatible storage secret key |
| `PRIVATE_STORAGE_BUCKET` | Private | Storage bucket name |
| `PRIVATE_STORAGE_ENDPOINT` | Private | Storage endpoint URL |
| `PRIVATE_STRIPE_WEBHOOK_SECRET` | Private | Stripe webhook signing secret |
| `SMTP_HOST` (optional) | Private | Custom SMTP host (if not using Resend) |

### 6.3 Type Safety for Environment Variables

Environment variables are accessed through a typed `env.ts` file, never through `process.env` directly:

```typescript
// shared/lib/env.ts (conceptual — not code, just the pattern)
// Every environment variable is validated at startup.
// If a required variable is missing, the app fails to start (fail fast).
// TypeScript ensures all variables are accessed with the correct type.
```

**Rules:**
- All environment variables are validated at application startup
- Missing required variables prevent the app from starting
- Environment variables are never accessed via raw `process.env.X` anywhere in the codebase
- The `env.ts` file is the single source of truth

### 6.4 Secrets Management

| Stage | Method |
|-------|--------|
| **Local development** | `.env.local` file (gitignored). Example values in `.env.example`. |
| **CI/CD** | GitHub Actions secrets |
| **Production** | PaaS dashboard (Railway, Fly.io) or cloud secret manager |
| **No committed secrets** | `.env` files are in `.gitignore`. Secrets never appear in code. |

---

## PART 7 — MODULE PHILOSOPHY

### 7.1 Module Boundaries

Each module is a self-contained domain with:
- **Its own service layer** (business logic)
- **Its own validators** (Zod schemas)
- **Its own types** (TypeScript types specific to the domain)
- **Its own components** (React components for the domain)

Modules communicate through:
- **Service calls** (one module's service calls another module's exported service)
- **Shared kernel** (common types, utilities, infrastructure clients)
- **Events** (for loose coupling — V2)

### 7.2 Module: Auth

| Aspect | Description |
|--------|-------------|
| **Responsibility** | User identity, authentication, session management |
| **What it owns** | Authentication strategies, session data, password hashing, OAuth flows |
| **What it does NOT own** | User profile data (that's company module), permissions/roles (future) |
| **Exports** | `auth()` helper (get current session), sign-in/out actions, middleware |
| **Dependencies** | NextAuth.js, Prisma (User model), bcryptjs |
| **Key principle** | Auth validates who you are, not what you can do. Authorization is the subscription module's job. |

### 7.3 Module: Proposal

| Aspect | Description |
|--------|-------------|
| **Responsibility** | The core product. Creating, editing, generating, exporting, and managing proposals. |
| **What it owns** | Proposal lifecycle, AI generation pipeline, PDF generation, export/share, version management |
| **What it does NOT own** | Company branding (company module), billing (billing module), user identity (auth module) |
| **Exports** | `createProposal()`, `generateProposal()`, `exportProposalAsPdf()`, `duplicateProposal()`, etc. |
| **Dependencies** | AI service (shared), PDF service (shared), company module (for branding), subscription module (for limits), usage service (for tracking) |
| **Key principle** | The proposal module is the largest and most complex. It orchestrates the AI pipeline, manages state transitions, and produces exports. It should be aggressively split into sub-services (`proposal-ai.service.ts`, `proposal-pdf.service.ts`, etc.) to keep each file under 200 lines. |

### 7.4 Module: Company

| Aspect | Description |
|--------|-------------|
| **Responsibility** | Company/brand profile management |
| **What it owns** | Company name, logo upload, brand colors, CR/VAT numbers, contact info |
| **What it does NOT own** | User identity, subscription, proposals |
| **Exports** | `getCompanyProfile()`, `updateCompanyProfile()`, `uploadLogo()` |
| **Dependencies** | Storage service (shared), Prisma (CompanyProfile model) |
| **Key principle** | CompanyProfile is referenced by Proposal as a snapshot. The company module is simple — mostly CRUD with file upload. In V2, this becomes "Brand Kit" with support for multiple profiles per user. |

### 7.5 Module: Subscription

| Aspect | Description |
|--------|-------------|
| **Responsibility** | Plan management, usage tracking, feature flag access control |
| **What it owns** | Subscription lifecycle (trial → active → expired), usage counting, feature flags, plan definitions |
| **What it does NOT own** | Payment processing (billing module), user identity (auth module) |
| **Exports** | `checkUsageLimit()`, `incrementUsage()`, `getFeatureFlags()`, `getCurrentPlan()` |
| **Dependencies** | Prisma (Subscription, UsageRecord models), billing module (for payment status) |
| **Key principle** | The subscription module is the gatekeeper. Every feature check goes through `getFeatureFlags()`. Every proposal creation goes through `checkUsageLimit()`. It enforces business rules without knowing what a proposal is. |

### 7.6 Module: Billing

| Aspect | Description |
|--------|-------------|
| **Responsibility** | Payment processing, invoices, webhook handling |
| **What it owns** | Stripe integration, payment methods, invoices, payment webhooks |
| **What it does NOT own** | Plan definitions (subscription module), usage tracking (subscription module) |
| **Exports** | `createCheckoutSession()`, `handleWebhook()`, `getInvoiceHistory()` |
| **Dependencies** | Stripe SDK, subscription module (to update plan on payment), Prisma (billing-related models) |
| **Key principle** | The billing module is a thin layer over Stripe. It translates Stripe events into subscription module updates. It has minimal business logic — Stripe is the source of truth for payment state, and we sync to our database. |

### 7.7 Module Dependency Rules

| Rule | Explanation |
|------|-------------|
| **Modules depend on shared, not on each other directly** | Proposal uses AI service from shared. Subscription uses types from shared. Modules communicate through service interfaces, not by importing each other's internal files. |
| **Cross-module calls go through service methods** | Proposal calls `subscription.checkUsageLimit()` — it doesn't query the database directly. This preserves encapsulation. |
| **No circular module dependencies** | If Proposal needs something from Subscription, and Subscription needs something from Proposal, our module boundaries are wrong. Redesign. |
| **Module A can import from Module B's public API only** | Each module has a clear public API (its service methods). Internal files (`validators/`, `types/`, `components/`) are private by convention. |

---

## PART 8 — SCALING PHILOSOPHY

### 8.1 Target: 5,000 Active Users

**Assumptions:**
- 5,000 users × 10 proposals/month = 50,000 proposals/month
- 50,000 proposals / 30 days = ~1,667 proposals/day
- 1,667 / 24 hours = ~69 proposals/hour ≈ 1 proposal/minute
- Peak load: 3× average = ~3 proposals/minute

**One proposal lifecycle resource usage:**
- 4 AI calls (analysis, scope, commercial, assembly) = ~40 seconds total
- 1 PDF generation = ~5 seconds
- Multiple database reads/writes = ~200ms
- Total per proposal: ~45 seconds of server time

**At peak load (3 proposals/minute):**
- 3 × 45 seconds = 135 seconds of work per minute
- CPU utilization at ~50% on a 4-core server
- Database: ~10 queries/minute — trivial for PostgreSQL

**Conclusion:** A single medium-sized server (4 CPU, 8GB RAM) handles 5,000 users with room to spare. This is not a scaling problem — it's a well-architected monolith.

### 8.2 No Microservices

**Why we don't need them:**
- Microservices solve organizational scaling (multiple teams deploying independently). We have one team.
- Microservices introduce: network latency, data consistency challenges, deployment coordination, debugging complexity, and distributed transaction nightmares.
- A monolith at 5,000 users is simpler, faster, and more reliable.

**When we would consider microservices:**
- When we have 50,000+ active users AND we need to scale AI generation independently (CPU-bound)
- When we have 3+ engineering teams that need to deploy independently
- When the monolith's deployment time exceeds 30 minutes

### 8.3 No Docker Initially

**Why we don't need it:**
- Our PaaS (Railway, Fly.io) handles containerization for us
- Docker adds: Dockerfile maintenance, compose files for local dev, container registry, image build time
- For local development, `node dev` is simpler than `docker compose up`

**When we would add Docker:**
- When we deploy to bare metal (not PaaS)
- When we need to guarantee identical environments across the team (> 5 developers)
- When we run background workers (PDF generation, AI jobs) as separate processes

### 8.4 No Redis Initially

**Why we don't need it:**
- PostgreSQL handles our query patterns efficiently at 5,000 users
- We don't have session data that needs Redis (Auth.js uses the database)
- We don't have real-time features that need pub/sub
- We don't have rate limiting at the application level (our PaaS provides basic rate limiting)

**When we would add Redis:**
- When specific query patterns are proven too slow (> 200ms) and cannot be optimized further
- When we need distributed locking for job processing
- When we add real-time collaboration (V2)

### 8.5 No Queues Initially

**Why we don't need them:**
- AI generation and PDF generation are synchronous for MVP
- Total generation time (~45 seconds) is acceptable for an initial proposal — user sees a progress bar
- A queue adds: worker process, job storage, retry logic, monitoring

**When we would add queues:**
- When users start complaining about wait times (> 30 seconds is the threshold we watch)
- When we add batch operations (export 50 proposals at once)
- When we add async features (email notifications, webhook deliveries)
- **Implementation:** A database-backed job queue (no Redis dependency). Simple, reliable, easy to monitor.

### 8.6 Scaling Approach (When Needed)

| Bottleneck | Solution Before Adding Infrastructure |
|------------|----------------------------------------|
| **AI generation latency** | Optimize prompts, reduce token count, stream responses |
| **PDF generation CPU usage** | Move to a separate process on the same server (Node.js cluster mode) |
| **Database query speed** | Add indexes, optimize N+1 queries, use PostgreSQL connection pooling |
| **Server CPU saturation** | Vertical scale (larger server). A single beefy server goes a long way. |
| **Server memory pressure** | Optimize PDF generation (stream to disk, not memory). Optimize AI response handling. |
| **Storage I/O** | Move PDFs to S3 (already in architecture). Use local disk for temporary files only. |

**Only after all optimizations are exhausted:**
- Horizontal scaling: Add a second server instance behind a load balancer
- Database read replica: For analytics queries
- Redis cache: For frequently accessed data (templates, plan definitions)

---

## Appendix: Principle Enforcement Checklist

Every PR and architectural decision should be checked against:

| Principle | Question to Ask |
|-----------|----------------|
| **Monolith first** | Does this decision add a new service/process? If yes, can we do it in the monolith? |
| **Server-first** | Does this logic need to run on the client? If not, keep it on the server. |
| **Minimal dependencies** | Are we adding a new dependency? Does it pass the "can we write it in 50 lines?" test? |
| **Strong typing** | Are there any `any` types? Any untyped function parameters? |
| **Module boundaries** | Does this code belong in the module it's in, or does it cross a domain boundary? |
| **No duplication** | Is there similar code elsewhere? Can we extract the shared part? |
| **Simplicity over complexity** | Is there a simpler way to achieve the same result? |
| **Production-grade but lean** | Does this handle errors gracefully? Is it overengineered for today's needs? |

---

*End of Technical Foundation Design v1.0*

*This document defines how the codebase will be built. Every file created should align with the structure, standards, and philosophy defined here.*
