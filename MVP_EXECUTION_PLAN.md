# Saudi Proposal OS — MVP Execution Plan

> **Mode:** EXECUTION  
> **Timeline:** 7 Days · 1 Developer  
> **Goal:** A working product that creates AI-powered proposals and exports PDFs

---

## THE MVP — What We Ship in 7 Days

**One sentence:** User signs up → fills 3 simple forms → clicks "Generate" → AI creates a full proposal → user reviews → clicks "Export" → downloads a professional PDF.

**No more, no less.**

---

## THE FIRST USER JOURNEY

```
1. User visits saudi-proposal-os.com
2. Clicks "Start Free Trial"
3. Signs up with email + password (or Google)
4. Lands on empty dashboard → clicks "Create Proposal"
5. Step 1: Project Info (name, client, city, type)
6. Step 2: Scope + Timeline (short description, start/end dates)
7. Step 3: Commercial Terms (total value, payment breakdown)
8. Clicks "Generate Proposal with AI"
9. Sees loading progress for ~30 seconds
10. Reviews generated proposal (scope, commercial terms, assumptions)
11. Edits anything that needs changing
12. Clicks "Export PDF"
13. Downloads professional PDF
14. Returns to dashboard — proposal is listed
```

**Total time for first-time user:** ~5 minutes from sign-up to PDF download.

---

## THE FIRST SCREEN WE BUILD

### Screen 1: Proposal Creation Form (Day 1–2)

Not the landing page. Not the dashboard. The **form**.

Why? Because the form IS the product. Everything else supports it.

**The form has 3 steps (not 5 from PRD — simplified for MVP):**

```
Step 1: Project Info
├── Project name (text input)
├── Client name (text input)
├── City (dropdown: Riyadh, Jeddah, Dammam, Makkah, Madinah, Other)
├── Project type (dropdown: Construction, Engineering, Consulting, Maintenance, Agency)
└── Client type (dropdown: Private, Government, Semi-government, Individual)

Step 2: Scope & Timeline
├── Scope of work (textarea — user types naturally, AI will structure it)
├── Start date (date picker)
└── End date (date picker)

Step 3: Commercial Terms
├── Total project value (SAR — number input)
├── Payment structure (dropdown: Milestone %, Monthly, Fixed on completion)
├── Milestones (dynamic — if milestone selected):
│   ├── Down payment (default: 30%)
│   ├── On delivery (default: 40%)
│   └── After handover (default: 30%)
└── Warranty period (text input, default: "1 year")
```

Every step auto-saves to the database. No save button. No "are you sure?" dialogs.

---

## THE FIRST DATABASE TABLES (Minimal Subset)

### We need exactly 5 tables, not the 8+ from the DDS:

```prisma
// We write actual code for these — this is the plan for what we build

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?  // hashed, null for Google OAuth users
  image     String?  // avatar URL
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  proposals Proposal[]
  company   CompanyProfile?
}

model CompanyProfile {
  id            String @id @default(cuid())
  userId        String @unique
  companyName   String
  logoUrl       String?
  crNumber      String?
  vatNumber     String?
  phone         String?
  email         String?
  website       String?
  brandColor    String @default("#1a56db") // hex

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Proposal {
  id             String   @id @default(cuid())
  userId         String
  status         String   @default("draft") // draft | generating | review | completed | exported
  version        Int      @default(1)

  // Step 1: Project Info
  projectName    String
  clientName     String
  city           String
  projectType    String
  clientType     String

  // Step 2: Scope & Timeline
  scopeDescription String?
  startDate      DateTime?
  endDate        DateTime?

  // Step 3: Commercial Terms
  totalValue     Float?
  paymentStructure String? // milestone | monthly | fixed
  downPayment    Float?
  deliveryPayment Float?
  handoverPayment Float?
  warrantyPeriod String?

  // AI Generated Content (all JSON)
  scopeItems     Json?      // [{title, description}]
  deliverables   Json?      // [{name, description}]
  paymentSchedule Json?     // {milestones: [{percentage, description, trigger}]}
  assumptions    Json?      // [{text, category}]
  exclusions     Json?      // [{text, category}]
  introduction   String?
  summary        String?
  sections       Json?      // Full assembled proposal sections

  // Review state
  sectionsReviewed Json? @default("[]") // ["scope", "commercial", "assumptions"]

  // Metadata
  proposalNumber String?   // AUTO-001 format
  exportedAt     DateTime?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  documents GeneratedDocument[]
}

model GeneratedDocument {
  id           String   @id @default(cuid())
  proposalId   String
  type         String   // pdf | share_link
  fileUrl      String?  // S3 URL for PDF
  shareToken   String?  @unique // for share links
  password     String?  // optional password for share links
  expiresAt    DateTime?
  createdAt    DateTime @default(now())

  proposal Proposal @relation(fields: [proposalId], references: [id], onDelete: Cascade)
}
```

**What we cut from the DDS for MVP:**
- ❌ `Subscription` table — no billing in v1. All users are free. We add billing in week 2.
- ❌ `UsageRecord` table — no limits in v1. Add when we add billing.
- ❌ `AIGenerationLog` table — log to console + file in v1. Table in v2.
- ❌ `BillingInvoice` — no billing in v1.
- ❌ `User.preferences`, `User.role` — not needed yet.
- ❌ `ProposalVersion` — versioning handled by simple version integer. Full version table in v2.

---

## THE FIRST API ROUTES / SERVER ACTIONS

### Server Actions (what the forms call):

| Action | What It Does |
|--------|-------------|
| `createProposal()` | Creates proposal row, returns proposal ID |
| `updateProposalStep(step, data)` | Saves form data for step 1, 2, or 3 |
| `generateProposalContent(id)` | Orchestrates AI pipeline (4 calls), saves results |
| `regenerateSection(id, section)` | Re-generates a single AI section |
| `markSectionReviewed(id, section)` | Marks a section as user-approved |
| `finalizeProposal(id)` | Assembles final document, sets status to completed |
| `exportProposalPdf(id)` | Generates PDF, saves GeneratedDocument, returns download URL |
| `getProposal(id)` | Returns proposal with all data |
| `listProposals()` | Returns user's proposals (paginated, filtered) |
| `duplicateProposal(id)` | Creates new draft with copied data |
| `archiveProposal(id)` | Sets status to archived |
| `deleteProposal(id)` | Soft-deletes proposal |
| `updateCompanyProfile(data)` | Saves company branding info |

### API Routes (when Server Actions aren't enough):

| Route | What It Does |
|-------|-------------|
| `GET /api/proposals/[id]/export/pdf` | Streams PDF download |
| `GET /api/share/[token]` | Public share link view |

### Auth Routes (handled by Auth.js):

| Route | What It Does |
|-------|-------------|
| `/api/auth/*` | Auth.js handles all auth routes |

---

## THE ORDER OF IMPLEMENTATION (7 Days)

### Day 1: Foundation

**Goal:** Working Next.js app with database, auth, and a form that saves data.

```
Morning:
  [1.1] Initialize Next.js project with TypeScript + Tailwind
  [1.2] Set up Prisma + PostgreSQL (connection, schema, migration)
  [1.3] Set up Auth.js (email/password + Google)
  [1.4] Create basic layout (dashboard shell with sidebar)
  [1.5] Create env.ts for typed environment variables

Afternoon:
  [1.6] Build Step 1 form (Project Info)
  [1.7] Build Step 2 form (Scope & Timeline)  
  [1.8] Build Step 3 form (Commercial Terms)
  [1.9] Create createProposal + updateProposalStep Server Actions
  [1.10] Form auto-saves on input change (debounced)

✅ End of Day 1: User can sign up, fill 3 forms, and data is saved to database.
```

### Day 2: AI Integration

**Goal:** AI generates proposal content from form inputs.

```
Morning:
  [2.1] Install + configure OpenAI SDK
  [2.2] Build AI prompt for Stage 1: Project Analysis
  [2.3] Build AI prompt for Stage 2: Scope Generation
  [2.4] Build AI prompt for Stage 3: Commercial Terms
  [2.5] Build AI prompt for Stage 4: Final Assembly

Afternoon:
  [2.6] Create generateProposalContent Server Action
  [2.7] Build 4-stage pipeline with progress tracking
  [2.8] Add validation for AI outputs (Zod schemas for each stage)
  [2.9] Add retry logic (1 retry per stage on failure)
  [2.10] Wire "Generate" button to pipeline

✅ End of Day 2: User clicks "Generate" → sees progress → AI creates full proposal.
```

### Day 3: Review & Edit

**Goal:** User can see, edit, and approve AI-generated content.

```
Morning:
  [3.1] Build review page layout (left: section nav, right: content)
  [3.2] Display AI-generated scope items (editable list)
  [3.3] Display AI-generated commercial terms (editable)
  [3.4] Display AI-generated assumptions + exclusions (editable)

Afternoon:
  [3.5] Build inline editing for each section
  [3.6] Add "Regenerate Section" button per section
  [3.7] Add "Reviewed" checkbox per section
  [3.8] Create markSectionReviewed + regenerateSection Server Actions
  [3.9] Create finalizeProposal Server Action (locks content)

✅ End of Day 3: User can review, edit, approve, and finalize the proposal.
```

### Day 4: PDF Export

**Goal:** User downloads a professional PDF.

```
Morning:
  [4.1] Install + configure Puppeteer
  [4.2] Build HTML template for proposal PDF
  [4.3] Style template with proper RTL/Arabic support
  [4.4] Add company branding (logo, colors, header, footer)

Afternoon:
  [4.5] Create exportProposalPdf Server Action
  [4.6] Wire "Export PDF" button → generates PDF → triggers download
  [4.7] Save GeneratedDocument record
  [4.8] Add WhatsApp message + email draft copy buttons

✅ End of Day 4: User clicks "Export PDF" → downloads a beautiful branded PDF.
```

### Day 5: Dashboard & Polish

**Goal:** User can see, manage, and find their proposals.

```
Morning:
  [5.1] Build dashboard list (proposals table with status badges)
  [5.2] Add search/filter by project name, client, status
  [5.3] Create listProposals + getProposal Server Actions
  [5.4] Add proposal detail view (read-only after export)

Afternoon:
  [5.5] Add duplicate proposal action
  [5.6] Add archive + delete actions
  [5.7] Build company profile settings page
  [5.8] Add logo upload to company profile
  [5.9] Polish: loading states, empty states, error messages

✅ End of Day 5: Dashboard is functional. User manages all proposals from one place.
```

### Day 6: User Experience & Edge Cases

**Goal:** Smooth UX. Handle errors gracefully.

```
Morning:
  [6.1] Add landing page (basic: hero, features, CTA)
  [6.2] Add pricing page (show plans, no payment yet)
  [6.3] Handle: AI failure → show partial proposal + retry option
  [6.4] Handle: form validation errors → inline messages
  [6.5] Handle: concurrent edits → optimistic locking

Afternoon:
  [6.6] Add share link functionality (public, read-only view)
  [6.7] Add RTL/LTR language detection (basic: if Arabic input → Arabic output)
  [6.8] Polish mobile responsiveness (forms work on phone)
  [6.9] Add basic analytics events (PostHog or just console)

✅ End of Day 6: UX is polished. Edge cases are handled.
```

### Day 7: Launch

**Goal:** Deploy to production. Real users can sign up and use it.

```
Morning:
  [7.1] Set up production database (Railway PostgreSQL)
  [7.2] Set up S3 storage (Cloudflare R2)
  [7.3] Deploy to Railway (or Fly.io)
  [7.4] Configure custom domain
  [7.5] Test full flow on production (sign-up → proposal → PDF)

Afternoon:
  [7.6] Set up Stripe (just connect account, no plans yet)
  [7.7] Add basic error monitoring (Sentry or similar)
  [7.8] Add basic usage analytics
  [7.9] Write 1-page README for the project
  [7.10] 🚀 LAUNCH

✅ End of Day 7: Saudi Proposal OS is live. Real users can create proposals.
```

---

## WHAT WE EXPLICITLY DO NOT BUILD IN V1

### ❌ No Billing / Subscriptions
- No Stripe checkout
- No plan limits
- No usage tracking
- Every user gets full features for free
- We add billing AFTER we see users are actually using it

### ❌ No Team Collaboration
- No multi-user
- No roles
- No shared proposals

### ❌ No WhatsApp API
- Just a "copy message" button (native share)
- WhatsApp Business API is complex — defer to v2

### ❌ No E-signatures
- No DocuSign, No SignNow
- User prints and signs, or uses their own e-sign tool

### ❌ No Client Portal
- Clients don't log in
- Share link is just a read-only web page

### ❌ No Mobile App
- Web app works on phones (responsive)
- No React Native, no Swift, no Kotlin

### ❌ No Advanced Analytics
- No view tracking
- No proposal analytics dashboard
- No "who viewed your proposal"

### ❌ No Multi-language UI
- MVP is Arabic-first, English-second
- Language toggle is basic (browser detects or user picks in settings)
- No Urdu, no French, no other languages

### ❌ No Custom Templates
- 3 default templates (Construction, Consulting, General)
- No template builder
- No user-created templates

### ❌ No API
- No public API for third-party integration
- No webhooks outbound

### ❌ No Email Notifications
- No "your proposal was viewed" emails
- No follow-up reminders
- No onboarding email sequence (beyond auth emails)

### ❌ No Dark Mode
- Light mode only
- Dark mode is CSS work with zero revenue impact

### ❌ No Docker
- Direct deploy to PaaS
- No Dockerfile, no docker-compose

### ❌ No Redis
- No caching
- No queues
- No pub/sub

### ❌ No Tests (beyond manual)
- No unit tests, no integration tests, no E2E
- We test manually on Day 7
- Tests come in week 2 when we have paying users

---

## THE REAL MVP — A Honest Summary

**What the MVP actually is:**
> A web form with 3 steps that sends data to GPT-4o, structures the response, shows it to the user in an editable interface, and exports it as a PDF.

**That's it. That's the product.**

Everything else (dashboard, auth, company profile) is supporting infrastructure to make that core loop work.

**If the AI generation + PDF export doesn't deliver value, nothing else matters.**
**If the AI generation + PDF export IS valuable, we can add everything else later.**

---

## WHAT SUCCESS LOOKS LIKE AFTER DAY 7

A user can:
1. Open the website
2. Create an account in 30 seconds
3. Fill a form in 2 minutes
4. Get a professional proposal in 30 seconds
5. Edit it in 1 minute
6. Download a PDF in 3 seconds
7. Copy a WhatsApp message in 1 click
8. See all their proposals in a list

**Total time for first proposal:** ~5 minutes  
**Total time for repeat proposal:** ~2 minutes  
**Value delivered:** Replaces 2–4 hours of manual work

---

## APPENDIX: Day 1 Starter Commands (for reference)

```bash
# Create Next.js project
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# Install core dependencies
npm install @prisma/client @auth/prisma-adapter next-auth@beta
npm install zod openai puppeteer stripe resend @react-email/components
npm install date-fns uuid lucide-react class-variance-authority
npm install tailwind-merge @radix-ui/react-dialog @radix-ui/react-select
npm install @radix-ui/react-tabs @radix-ui/react-toast

# Install dev dependencies
npm install -D prisma

# Initialize Prisma
npx prisma init

# Set up shadcn/ui (component library)
npx shadcn@latest init -y
```

**Key: Start with PM. Don't overthink. Just build.**
