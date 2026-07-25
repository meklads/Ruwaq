# Saudi Proposal OS — Technical Architecture Specification (TAS)

> **Status:** Draft v1.0  
> **Author:** Technical Architecture Team  
> **Date:** June 2026  
> **Based on:** PRD v1.0  
> **Confidentiality:** Internal — Meklads / Ruwaq

---

## 1. Core Architecture Principles

### Simplicity Over Complexity
Every architectural decision should be questioned: "Is this the simplest thing that works?" Complexity is debt — it slows development, makes debugging harder, and increases cognitive load for every future developer. We choose the simple path even if it means writing slightly more code, because simple code is predictable, testable, and changeable.

**Practical application:** A single web server, a single database, a direct request-response flow. No layers of abstraction that exist "just in case." We add complexity only when the problem demands it, not when our imagination anticipates it.

### Monolith First
A monolith is not a dirty word. It is the correct starting point for every SaaS product that has not yet proven product-market fit. A monolith allows us to:
- Ship features in hours, not days
- Refactor without cross-service coordination
- Debug with a single codebase and single set of logs
- Deploy with a single command
- Hire and onboard developers faster

We will not split into microservices until we have evidence that (a) we need to scale a specific function independently, and (b) the cost of the monolith exceeds the cost of distribution.

### Maintainability First
The codebase must be understandable by a new developer within one hour of reading. This means:
- Consistent patterns everywhere (no "clever" solutions)
- Naming that reveals intent, not implementation
- Modules that have one reason to change
- Tests that document behavior, not just cover lines

**Rule:** If a developer cannot explain what a module does in one sentence, the module is too complex.

### Production-Grade but Lean
Production-grade means: errors are handled, data is safe, the app doesn't crash, and users can trust it. It does NOT mean: every edge case is anticipated, every failure mode is handled, every environment is supported.

We ship what is solid, not what is exhaustive. A lean production system is one that handles the 80% case perfectly, the 15% case gracefully, and acknowledges the 5% case honestly.

### Avoid Overengineering
Overengineering is the single biggest killer of early-stage SaaS products. It manifests as:
- Generic abstractions before there are multiple use cases
- Caching layers before there is a performance problem
- Queue systems before there is an async processing need
- Service boundaries before there are independent teams

**Antidote:** Build for what you know today. Refactor when you see the pattern emerge. Never abstract based on speculation.

---

## 2. MVP Scope Boundaries

### IN SCOPE

| Component | Rationale for Inclusion |
|-----------|------------------------|
| **Authentication** | Required for multi-tenant data isolation, billing, and session management. Without auth, we cannot charge users or protect their data. |
| **Proposal Form** | The core product interface. Without it, there is no product. The multi-step guided form is the primary user interaction. |
| **AI Generation** | The differentiator. AI writes the scope, assumptions, exclusions, and commercial terms. Without AI, we are a template builder — not a proposal OS. |
| **Validation** | Input validation (user side) and output validation (AI side) are critical for trust. We must ensure garbage does not reach the user or the PDF. |
| **PDF Export** | The primary deliverable. Users need a professional PDF to send to clients. Without PDF, the product has no output. |
| **Dashboard** | Proposal list, status tracking, and basic organization. Users need to find, manage, and duplicate proposals. |
| **Billing** | Revenue. Without billing, there is no business. Stripe/Moyasar integration for subscription management. |

### OUT OF SCOPE (Explicitly Excluded from MVP)

| Component | Rationale for Exclusion |
|-----------|------------------------|
| **CRM** | Proposals are not a CRM problem. Managing leads, contacts, and pipelines is a separate product. We track proposal status, not customer relationships. Mixing them dilutes focus. |
| **WhatsApp API** | Requires WhatsApp Business API approval, webhook infrastructure, and message template management. The MVP can use a simple "copy message" button — no integration needed. |
| **Team Collaboration** | Multi-user editing, roles, permissions, and real-time collaboration introduce significant complexity in auth, data model, and UI. Launch as single-user first. Add teams when users request it. |
| **Client Portal** | A portal where clients log in to view, approve, or reject proposals. This requires client auth, a separate UI, notification systems, and state management. Premature for MVP. |
| **E-signatures** | Requires third-party API integration (DocuSign, SignNow, or Tawakkalna), legal compliance, and webhook handling. Users can sign manually for now. |
| **Notifications** | Email reminders, push notifications, follow-up alerts. Useful but not critical for the core flow. Users check the dashboard when they need to. |
| **Mobile App** | Native iOS/Android development doubles engineering effort. The web app is responsive and works on mobile browsers. Native app is a distribution play for later. |
| **Advanced Analytics** | View tracking, time-on-page, drop-off analysis. Interesting data but not required to create and send a proposal. |
| **Multi-language UI** | Arabic and English are the MVP languages. Adding more languages (Urdu, etc.) multiplies translation effort and UI testing. Add when user demand is clear. |

**Why this scoping matters:** Every feature outside the MVP is a distraction from learning the core question: "Will users pay for AI-generated proposals?" We find the answer with the smallest possible product.

---

## 3. Technical Design Principles

### Server-First Philosophy
The server is the source of truth. The client is a view into the server's state. This means:
- All business logic lives on the server
- The client renders what the server provides
- Validation happens on the server regardless of client validation
- AI generation is server-side only (API keys never reach the client)
- PDF generation is server-side only (consistent output, no client variance)

**Why:** Client-side logic is untrustworthy, unreproducible, and unrecoverable. If a user loses their internet connection, the server still has their draft. If a client behaves unexpectedly, the server still enforces rules. Server-first is not about control — it is about reliability.

### Strong Typing
Every data structure must have a defined shape. Types are documentation that the compiler enforces. This means:
- All API request/response schemas are typed
- All AI input/output schemas are typed
- All database entities are typed
- All form fields are typed

**Why:** Type mismatches are the most common class of bugs in SaaS applications. Strong typing catches these at compile time rather than production. It also makes refactoring predictable and onboarding faster — new developers can read types to understand the system.

### Modular Architecture
The codebase is organized by domain, not by technical layer. This means:
- `proposals/` contains everything related to proposals (routes, service, validation, templates, AI prompts)
- `auth/` contains everything related to authentication
- `billing/` contains everything related to subscriptions
- `pdf/` contains everything related to PDF generation

**Why:** When a developer needs to modify how proposals work, they go to one place. They don't search across `routes/`, `controllers/`, `services/`, `utils/` — they find `proposals/` and everything is there. This is the modular monolith approach popularized by Ruby on Rails engines and Domain-Driven Design.

### Reusable Components
UI components are built once and used everywhere. This means:
- A form input component is used across all forms
- A proposal section component renders in preview, edit, and PDF
- A status badge component renders on dashboard, detail, and email

**Why:** Reusable components ensure visual consistency, reduce code volume, and make systematic changes (e.g., rebranding) possible in minutes rather than hours.

### Separation of Concerns
Every function, module, and service has exactly one responsibility. This means:
- Route handlers parse the request and call the service — they do not contain business logic
- Services execute business logic — they do not handle HTTP concerns
- Validators validate — they do not transform data
- AI services generate content — they do not format it

**Why:** Single-responsibility code is testable in isolation, replaceable without side effects, and understandable without context. When a bug occurs, the responsible module is obvious.

### Validation Layers
Data is validated at every boundary crossing:
1. **Client-side validation** — instant feedback, user-friendly errors
2. **API validation** — structural validation (required fields, types, formats)
3. **Service validation** — business rule validation (e.g., "end date must be after start date")
4. **AI output validation** — structural validation of AI responses before they reach the user

**Why:** A single validation layer is a single point of failure. Multiple layers ensure that garbage data never reaches the database, the PDF, or the client.

### Error Handling Philosophy
Errors are not exceptional — they are expected. Our error handling strategy:
- **User-facing errors** are human-readable, actionable, and never technical. "Something went wrong" is followed by "Try again" or "Contact support."
- **Developer-facing errors** are logged with full context (request ID, user ID, stack trace, input data).
- **Silent failures** are not acceptable. If something fails, the user must know. If something fails partially, the user must know what worked and what didn't.
- **Recovery** is built in. If AI generation fails on the first attempt, retry once. If PDF generation fails, save the draft state so no work is lost.

---

## 4. AI System Principles

### AI Assists, Not Decides
The AI is a co-pilot, not an autopilot. Every AI-generated output is presented as a draft that the user must review and approve. The user is always the final decision-maker. This is both a product philosophy and a legal necessity — we cannot be held liable for AI-generated terms that a user sends to their client without review.

**Implementation principle:** The "Generate" button creates a draft. The "Save" or "Send" button only works after the user has seen and acknowledged the draft. The user must explicitly confirm before AI content becomes final.

### Structured JSON Outputs
All AI responses must conform to a predefined JSON schema. No free-form text responses from the AI. This means:
- The scope section must be returned as an array of `{ title: string, description: string }`
- Assumptions must be returned as an array of `{ item: string }`
- Payment milestones must be returned as an array of `{ percentage: number, description: string, trigger: string }`

**Why:** (a) Structured data is predictable and we can validate it before showing to the user. (b) Structured data can be rendered consistently across preview, edit, and PDF views. (c) Structured data prevents the AI from generating content that breaks our UI or PDF layout.

### Multi-Stage Generation
Complex proposal generation is broken into sequential stages, each building on the previous:
1. **Project Analysis Stage** — AI analyzes the project type, city, and client type to determine the relevant context
2. **Scope Generation Stage** — AI generates scope items based on the analysis
3. **Commercial Terms Stage** — AI generates payment structures, assumptions, and exclusions based on the scope
4. **Final Assembly Stage** — All generated content is assembled, validated, and presented

**Why:** Single-stage generation produces lower quality results. Breaking it into stages allows:
- Each stage to be validated independently
- Users to approve/reject stages individually
- Earlier stages to inform later stages with better context
- Easier debugging (which stage produced the bad output?)

### Deterministic Workflows
The proposal creation flow is a deterministic state machine, not an AI conversation. The user progresses through predefined steps in a specific order. The AI generates content at specific points in the flow, not on every user action.

**Why:** A conversational AI would be unpredictable, hard to validate, and impossible to surface in a consistent UI. A deterministic workflow ensures every user has the same experience, every time.

### Validation Before Generation
Before calling the AI, validate that the user has provided sufficient input. If required fields are missing, tell the user what's needed rather than calling the AI and getting poor results. This saves API costs and user frustration.

**Example:** If the user selects "Construction" as project type but doesn't specify "Villa / Building / Tower / Infrastructure," ask for clarification before generating scope.

### Validation After Generation
After the AI responds, validate the output against the expected schema before presenting it to the user. If the output is malformed, regenerate (up to 2 retries) or fall back to a template. Never show the user raw AI output that doesn't match our schema.

**Validation checks:**
- Does the response match the expected JSON schema?
- Are all required fields present?
- Are numeric fields within reasonable ranges? (e.g., payment percentages should sum to ~100%)
- Is the content non-empty and coherent?

---

## 5. Performance Philosophy

### Minimal Dependencies
Every dependency is a liability. A dependency:
- Can introduce breaking changes
- Can have security vulnerabilities
- Adds to bundle size
- Requires developer learning
- Must be maintained

**Rule:** Before adding a dependency, ask: "Can we write this in 50 lines of code or less?" If yes, write it. If no, evaluate the dependency critically.

**Exception:** Core infrastructure dependencies (web framework, database driver, PDF library, AI SDK) are acceptable. Utility dependencies are not.

### Fast Loading
Time to first meaningful interaction must be under 2 seconds on a 4G connection in Saudi Arabia. This means:
- Server-rendered pages (no client-side rendering for initial load)
- Minimal JavaScript shipped to the client
- Static assets served via CDN
- No heavy client-side frameworks that block rendering

**Why:** Saudi users on mobile networks experience higher latency than wired connections in western markets. Our app must feel instant even on slower connections.

### Simplicity
A simple architecture is a performant architecture. Simple request flows have fewer round-trips. Simple data models have fewer joins. Simple code has fewer allocations.

**Performance rule of thumb:** If the solution feels complex, it probably won't perform well. The simplest implementation is usually the fastest implementation.

### Maintainability
Performance optimizations must not come at the cost of maintainability. We will not:
- Introduce caching layers before there is a proven performance problem
- Denormalize data before query performance is measured
- Write complex SQL for queries that run 5 times per day

**Why:** Premature optimization creates unmaintainable code. We optimize when we have data that proves the optimization is needed.

### Scalability
Performance for 5,000 users is achieved through good fundamentals, not complex infrastructure:
- Efficient queries (proper indexing, N+1 prevention)
- Reasonable data models (not too many joins, not too much nesting)
- Minimal network round-trips (batch data, don't waterfall)
- Server-side rendering (less client work, faster perceived performance)

**Why:** 5,000 users is not a lot. A well-written monolith on a single server can handle this easily. We do not need distributed caching, read replicas, or CDN-backed databases.

---

## 6. Security Principles

### Secure API Keys
AI API keys (OpenAI, etc.) are server-side only. They never reach the client browser. This means:
- All AI API calls originate from the server
- The client sends content to the server, and the server sends it to the AI
- API keys are stored in environment variables, not in the database or codebase

**Why:** If an API key is exposed in client-side code, anyone can use it at our expense. Server-side API calls prevent this.

### Environment Variables
All configuration that varies by environment (development, staging, production) is stored in environment variables, not in code. This includes:
- Database credentials
- API keys
- External service URLs
- Application secrets

**Why:** Environment variables are the industry standard for configuration management. They prevent accidental commits of secrets, enable different configurations per environment, and integrate with all deployment platforms.

### Input Sanitization
All user input is sanitized before storage or rendering. This means:
- HTML/JS injection prevention (strip or escape dangerous characters)
- File upload validation (type check, size limit, virus scanning for future)
- Text field length limits (prevent abuse)

**Why:** User input is the primary attack vector for web applications. Sanitization prevents XSS, injection attacks, and data corruption.

### Data Protection
User data is protected at rest and in transit:
- **In transit:** All traffic is HTTPS. API calls are authenticated.
- **At rest:** Database encryption at rest (RDS/cloud provider default). No plaintext passwords (hashed + salted).
- **Data isolation:** Multi-tenant data is isolated by user/team ID in every query. A user should never see another user's proposals.

**Why:** Proposal data is commercially sensitive. Users must trust that their data is secure and isolated.

### Future RLS Philosophy
Row-Level Security (RLS) in the database is the preferred approach for multi-tenant data isolation as we scale. RLS ensures that even if a query forgets to filter by user_id, the database enforces the filter. This is a defense-in-depth strategy.

**Why:** Application-level data isolation is good. Database-level RLS is a safety net. When we introduce team collaboration, RLS becomes essential for preventing cross-tenant data leaks.

---

## 7. Scaling Philosophy

### Design for 5,000 Users Without Requiring a Rewrite

5,000 active users generating 10 proposals/month each = 50,000 proposals/month = ~1,667 proposals/day = ~1 proposal/minute.

A single well-optimized monolith can handle this on modest hardware. Here is how we design for it:

#### Monolith First
A single codebase, a single process, a single deployment. The monolith handles HTTP requests, AI calls, PDF generation, and database access in-process. This is the simplest architecture and it scales easily to 5,000+ users.

**When to reconsider:** When we have 50,000+ active users AND we need to scale AI generation independently (because it's CPU-bound and blocks HTTP requests). Until then, the monolith wins.

#### No Microservices
Microservices introduce network latency, data consistency challenges, deployment coordination, and debugging complexity. They solve organizational scaling problems (multiple teams deploying independently) — not technical scaling problems. We do not have organizational scaling problems.

**Rule:** We will not adopt microservices until we have at least 3 engineering teams that need to deploy independently.

#### No Kubernetes
Kubernetes solves container orchestration at scale. It introduces enormous operational complexity (cluster management, networking, monitoring, upgrades). For 5,000 users, a single server or a simple PaaS (Railway, Fly.io, Render) is more than sufficient.

**Rule:** We will not adopt Kubernetes until we have at least 10 servers and need to manage them as a fleet.

#### No Event Bus
Event buses (Kafka, RabbitMQ, SQS) are used for asynchronous communication between services. In a monolith, communication is in-process — there is no need for an event bus. If we need background processing, we can use a simple job queue backed by the database.

**Rule:** We will not adopt an event bus until we have split into microservices AND need asynchronous communication between them.

#### No Distributed Systems
Distributed systems introduce the fallacies of distributed computing: network latency, partial failure, clock skew, consistency models. A monolith is not a distributed system — it is a single process.

**Rule:** We will not design distributed systems until the monolith proves insufficient. This is likely years away, if ever.

---

## 8. Deployment Philosophy

### Keep Infrastructure Simple
The deployment infrastructure should be describable in one paragraph:

> "The application runs as a single web process on a cloud server. It serves HTTP traffic, connects to a managed PostgreSQL database, and stores uploaded files (logos) in cloud object storage. Environment variables configure all external services."

This simplicity means:
- One person can set up the entire infrastructure in a few hours
- There is no "infrastructure team" dependency
- Debugging production issues requires only SSH access and a database connection

### No Docker Initially
Docker adds a layer of abstraction (containerization, Dockerfiles, Docker Compose, container registry) that is unnecessary when deploying to a PaaS. Most PaaS platforms (Railway, Fly.io, Render, Heroku) handle the containerization for you.

**When to add Docker:** When we need to run the application on bare metal, or when we need to guarantee identical environments across development, staging, and production.

### No Redis Initially
Redis is a powerful caching and queue backend, but it adds operational overhead (another service to run, monitor, and back up). For 5,000 users, PostgreSQL is fast enough for all query patterns. If we need caching, we can add in-memory caching in the application process or use database-level query optimization first.

**When to add Redis:** When we have identified a specific query pattern that is too slow for PostgreSQL AND we cannot optimize the query further.

### No Queues Initially
Background job processing (sidekiq, bull, etc.) requires a queue backend (Redis or database) and a worker process. For MVP traffic levels, all work can be done synchronously in the request-response cycle.

**When to add queues:** When AI generation or PDF generation takes longer than 30 seconds and blocks the user from continuing their workflow.

**Alternative approach:** If we need background processing early, use a database-backed job queue (simpler, no Redis dependency, easy to monitor).

---

## 9. Future Expansion Philosophy

The platform is designed not for what it does today, but for what it will become. The Saudi Proposal OS is the first module in a suite of AI-powered business tools for the Saudi market.

### How Future Modules Are Added

#### Module-Based Architecture
The codebase is organized by domain module. Each module is self-contained:
- `modules/proposals/` — Proposal OS
- `modules/contracts/` — Contract OS (future)
- `modules/site-reports/` — Site Report OS (future)
- `modules/construction-suite/` — Construction Suite (future)

Each module has its own:
- Routes and controllers
- Services and business logic
- Validators and schemas
- AI prompts and generation logic
- Templates and views
- Database migrations (namespaced)

**Why:** A new module can be added without modifying existing modules. A developer working on Contract OS does not need to understand Proposal OS internals. Each module is independently testable and, if needed in the future, independently deployable.

#### Shared Kernel
Common functionality is shared across modules in a `shared/` or `core/` directory:
- Authentication and authorization
- User/team management
- Billing and subscription management
- File upload and storage
- PDF generation utilities
- AI client and prompt infrastructure
- Notification templates
- UI design system components

**Why:** Shared infrastructure prevents duplication. Every module benefits from improvements to the AI client, PDF engine, or billing system. The shared kernel is owned by the platform team and evolves independently of any single module.

#### Consistent Module Interface
Every module follows the same interface pattern:
1. **Input Schema** — What data the module accepts (validated, typed)
2. **AI Generation** — How the module uses AI to generate content (structured, multi-stage)
3. **Output Schema** — What the module produces (structured data, PDF, shareable content)
4. **Lifecycle** — Create → Draft → Review → Finalize → Archive

**Why:** A consistent interface means the platform knows how to interact with any module. The dashboard, billing, and sharing systems work the same way for proposals, contracts, and site reports. Users learn one mental model and apply it across all modules.

#### Extending Without Rebuilding

**To add a new module:**
1. Create a new directory under `modules/` (e.g., `modules/contracts/`)
2. Define the input schema (what data does this module collect?)
3. Define the AI prompts (how does AI generate content for this domain?)
4. Define the output schema (what does this module produce?)
5. Register the module in the platform (automatically appears in dashboard, billing, sharing)

**No changes required to:**
- Authentication system (user is already authenticated)
- Billing system (module is added to subscription plan)
- Dashboard (module appears as a new card)
- PDF engine (module provides its own template)
- AI infrastructure (module provides its own prompts)

**This is the power of modular architecture:** The platform becomes a foundation for a family of products, each added independently without rewriting the shared infrastructure.

---

## Appendix A: Key Architectural Principles Summary

| Principle | Decision | Why |
|-----------|----------|-----|
| Architecture | Monolith | Simplest, fastest to build, easy to maintain, scales to 5,000+ users |
| Deployment | Single process, PaaS | No infrastructure complexity, one-person ops |
| Database | Single PostgreSQL | Reliable, scalable, battle-tested for SaaS |
| AI Integration | Server-side API calls | Secure API keys, structured outputs, validation layers |
| Rendering | Server-first with progressive enhancement | Fast initial load, SEO-friendly, works without JS |
| Data Isolation | User/team ID in all queries + future RLS | Defense-in-depth, commercially sensitive data |
| Module Expansion | Domain directories + shared kernel | New products without rebuilding platform |

---

## Appendix B: Anti-Patterns We Explicitly Avoid

| Anti-Pattern | Why We Avoid It |
|--------------|-----------------|
| Microservices from day one | Premature distribution creates coordination overhead |
| Kubernetes | Operational complexity without benefit at our scale |
| Event-driven architecture | Adds async complexity that makes debugging harder |
| GraphQL | Schema complexity, caching challenges, over-fetching concerns |
| JAMStack / client-side rendering | Slower initial load, weaker SEO, more client JS |
| AI chatbot interface | Unpredictable, unvalidatable, unprocessable |
| Separate mobile app for MVP | Doubles development effort for no proven distribution need |

---

## Appendix C: Decision Record

| Decision | Date | Context | Alternatives Considered |
|----------|------|---------|------------------------|
| Monolith over microservices | June 2026 | Team size 1-3, MVP scope | Microservices rejected for premature complexity |
| PostgreSQL over NoSQL | June 2026 | Structured data with relationships | MongoDB considered, rejected for lack of schema enforcement |
| Server-rendered over SPA | June 2026 | Mobile-first, Saudi network conditions | React SPA rejected for slower initial load |
| Server-side AI calls | June 2026 | API key security, output validation | Client-side calls rejected for security risk |
| Single process deployment | June 2026 | Keep ops simple | Docker rejected for unnecessary abstraction layer |

---

*End of Technical Architecture Specification v1.0*

*This document is a living artifact — it will evolve as we learn about performance needs, scaling constraints, and market demands.*
