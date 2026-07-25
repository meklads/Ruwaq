# Saudi Proposal OS — Implementation Blueprint

> **Mode:** FINAL · PRODUCTION · IMPLEMENTATION READY  
> **No philosophy. No discussion. No extras. Only code-ready specs.**

---

## 1. FINAL DATA MODEL (Canonical Proposal Object)

```typescript
// This is the SINGLE source of truth for Proposal shape
// Used by: Prisma schema, Zod validators, TypeScript types, AI prompts, PDF renderer

interface Proposal {
  // === IDENTITY ===
  id: string                    // cuid
  userId: string | null         // null if user hasn't signed up yet
  status: "draft" | "generating" | "review" | "reviewed" | "exported"
  version: number               // starts at 1, increments on re-export after edit

  // === USER INPUT (Step 1 - 3) ===
  projectName: string
  clientName: string
  description: string           // free text from user
  budget: number                // SAR, always
  paymentType: "milestone_30_40_30" | "monthly" | "fixed" | "custom"

  // === AI GENERATED OUTPUT ===
  scopeItems: ScopeItem[]       // AI generated + user editable
  deliverables: Deliverable[]   // AI generated + user editable
  timeline: Timeline | null     // AI generated + user editable
  commercialTerms: CommercialTerms  // AI generated + user editable
  assumptions: string[]         // AI generated + user editable
  exclusions: string[]          // AI generated + user editable

  // === CONFIDENCE & WARNINGS ===
  confidence: {
    scopeItems: "high" | "medium" | "low"
    deliverables: "high" | "medium" | "low"
    timeline: "high" | "medium" | "low"
    commercialTerms: "high" | "medium" | "low"
    assumptions: "always_warn"    // always warn for legal sections
    exclusions: "always_warn"     // always warn for legal sections
  }

  // === REVIEW STATE ===
  reviewedSections: string[]    // ["scopeItems", "commercialTerms", ...]
                                // cleared section IDs that user has reviewed

  // === METADATA ===
  createdAt: string             // ISO 8601
  updatedAt: string             // ISO 8601
  exportedAt: string | null     // ISO 8601
  proposalNumber: string | null // "PROP-001" (assigned on first export)
}

// === SUB-TYPES ===

interface ScopeItem {
  id: string                    // unique within proposal (uuid or index)
  title: string
  description: string
  editable: true                // always true
}

interface Deliverable {
  id: string
  name: string
  description: string
}

interface Timeline {
  duration: string              // "6 weeks", "3 months"
  startDate: string | null      // ISO 8601 or null if user didn't provide
  endDate: string | null
  milestones: Milestone[]
}

interface Milestone {
  name: string
  date: string | null
}

interface CommercialTerms {
  totalValue: number            // SAR
  paymentSchedule: PaymentMilestone[]
  warrantyPeriod: string        // "1 year"
  retention: number | null      // percentage or null
}

interface PaymentMilestone {
  percentage: number            // e.g., 30
  label: string                 // "Down Payment", "On Delivery"
  amount: number                // calculated: totalValue * percentage / 100
}
```

---

## 2. MINIMUM DATABASE SCHEMA (Prisma)

```prisma
// 3 tables ONLY. Nothing else.
// No Subscription. No UsageRecord. No AIGenerationLog. No BillingInvoice.

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  emailVerified DateTime?
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts  Account[]
  sessions  Session[]
  proposals Proposal[]
  company   CompanyProfile?
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ─── CUSTOM TABLES BELOW ───

model CompanyProfile {
  id          String @id @default(cuid())
  userId      String @unique
  companyName String @default("")
  logoUrl     String?
  crNumber    String?
  vatNumber   String?
  phone       String?
  email       String?
  website     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Proposal {
  id          String   @id @default(cuid())
  userId      String?
  status      String   @default("draft")       // draft | generating | review | reviewed | exported
  version     Int      @default(1)

  // === USER INPUT ===
  projectName String   @default("")
  clientName  String   @default("")
  description String   @default("")
  budget      Float    @default(0)
  paymentType String   @default("milestone_30_40_30")

  // === AI OUTPUT (ALL JSON — flexible, no schema migrations needed) ===
  scopeItems      Json?   // ScopeItem[]
  deliverables    Json?   // Deliverable[]
  timeline        Json?   // Timeline
  commercialTerms Json?   // CommercialTerms
  assumptions     Json?   // string[]
  exclusions      Json?   // string[]

  // === CONFIDENCE ===
  confidence      Json?   // { scopeItems: "high"|"medium"|"low", ... }

  // === REVIEW STATE ===
  reviewedSections Json?  @default("[]")  // string[]

  // === METADATA ===
  proposalNumber String?
  exportedAt     DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  user      User?             @relation(fields: [userId], references: [id], onDelete: SetNull)
  documents GeneratedDocument[]
}

model GeneratedDocument {
  id         String   @id @default(cuid())
  proposalId String
  type       String   // "pdf" | "share_link"
  fileUrl    String?  // S3 URL
  shareToken String?  @unique
  createdAt  DateTime @default(now())

  proposal Proposal @relation(fields: [proposalId], references: [id], onDelete: Cascade)
}
```

---

## 3. SERVER ACTIONS LIST

```typescript
// === Server Actions (Next.js App Router) ===
// Each action is exported from 'use server' and callable from client components.

// ─── PROPOSAL LIFECYCLE ───

SA1: createProposal(input: { projectName, clientName, description, budget, paymentType })
     → Promise<{ id: string }>
     // Creates a Proposal with status "draft", userId from session (or null)

SA2: generateProposalWithAI(proposalId: string)
     → Promise<{ success: boolean, proposal: Proposal }>
     // Sets status "generating" → calls OpenAI 4-stage pipeline →
     // saves AI output to scopeItems, deliverables, timeline, commercialTerms,
     // assumptions, exclusions → sets confidence levels → sets status "review"
     // Returns full proposal object

SA3: regenerateSection(proposalId: string, section: string)
     → Promise<{ section: string, content: any, confidence: string }>
     // Re-generates ONE section (scopeItems | commercialTerms | assumptions | exclusions)
     // Returns new content + confidence for that section only

// ─── EDITING ───

SA4: updateProposalField(proposalId: string, field: string, value: any)
     → Promise<{ success: boolean }>
     // Updates a SINGLE field. field is dot-notation path
     // Examples:
     //   ("proposal-1", "projectName", "New Name")
     //   ("proposal-1", "scopeItems[0].title", "Updated Title")
     //   ("proposal-1", "budget", 250000)
     // This is the ONLY edit action. All inline edits call this.

SA5: addProposalItem(proposalId: string, section: string, item: any)
     → Promise<{ id: string }>
     // Adds item to array section (scopeItems, assumptions, exclusions, deliverables)
     // Returns new item's id

SA6: removeProposalItem(proposalId: string, section: string, itemId: string)
     → Promise<{ success: boolean }>
     // Removes item from array section by id

// ─── REVIEW & EXPORT ───

SA7: markSectionReviewed(proposalId: string, section: string)
     → Promise<{ reviewedSections: string[] }>
     // Adds section to reviewedSections array
     // If all sections reviewed → status becomes "reviewed"

SA8: exportProposalPDF(proposalId: string)
     → Promise<{ url: string, filename: string }>
     // Creates GeneratedDocument record
     // Generates PDF via Puppeteer with current proposal data
     // Uploads to S3
     // Sets status "exported", sets exportedAt, assigns proposalNumber if first export
     // Returns download URL

// ─── QUERIES (Server Components, not Server Actions) ───

SQ1: getProposal(proposalId: string)
     → Promise<Proposal | null>

SQ2: listUserProposals(userId: string)
     → Promise<Proposal[]>          // Not needed in first flow. Needed for dashboard.

// ─── AUTH (Auth.js handles these automatically) ───

// signIn, signOut, session — provided by Auth.js
```

---

## 4. RENDERING CONTRACT

### 4.1 JSON → UI Mapping

Every section in the UI maps DIRECTLY to a field in the Proposal JSON object.

```typescript
// THE RULE: Proposal JSON field name = UI Section name
// One-to-one mapping. No transformation. No interpretation.

Proposal.projectName        →  <h1> {projectName} </h1>
Proposal.clientName         →  <span> {clientName} </span>

Proposal.scopeItems         →  <ScopeSection items={scopeItems} />
  scopeItems[].title        →    <ScopeItemTitle/>
  scopeItems[].description  →    <ScopeItemDescription/>

Proposal.commercialTerms    →  <CommercialTermsSection terms={commercialTerms} />
  commercialTerms.totalValue   →  <TotalValue/>
  commercialTerms.paymentSchedule → <PaymentTable/>

Proposal.timeline           →  <TimelineSection timeline={timeline} />

Proposal.assumptions        →  <AssumptionsSection items={assumptions} />
Proposal.exclusions         →  <ExclusionsSection items={exclusions} />
```

### 4.2 Editing Updates Data

```typescript
// EDIT FLOW:
// 1. User clicks text → component enters edit mode (contentEditable or input)
// 2. User modifies text
// 3. On blur (or Enter): component calls updateProposalField(field, newValue)
// 4. Server updates database, returns success
// 5. Component shows saved state (✓ flash for 1 second)

// EXAMPLE: User edits scope item title
// Component state: local copy of text (optimistic)
// On blur: call updateProposalField("proposal-1", "scopeItems[0].title", "New Title")
// Server updates Proposal.scopeItems[0].title in JSON
// Server returns { success: true }
// Component shows checkmark briefly

// RULE: No complex state management.
// Each editable block owns its text locally (React state).
// On blur: persist to server.
// No syncing, no conflict resolution, no real-time.
```

### 4.3 Confidence Flags → Rendering

```typescript
// Proposal.confidence contains per-section confidence levels
// UI reads confidence object ONCE when rendering sections

function SectionHeader({ sectionName, confidence }) {
  const level = confidence[sectionName]

  if (level === "high" || level === undefined) {
    return <h2>{sectionName}</h2>                      // NO indicator
  }
  if (level === "medium") {
    return <h2>{sectionName} <Badge>review</Badge></h2> // gray badge
  }
  if (level === "low") {
    return <h2>{sectionName} <Badge variant="warning">⚠️ AI estimated</Badge></h2>
  }
  if (level === "always_warn") {
    return <h2>{sectionName} <Badge>review</Badge></h2> // gray badge (always)
  }
}

// BADGE BEHAVIOR:
// - Static display only. Not clickable (MVP).
// - Disappears when user edits that section (client-side, after updateProposalField called)
// - Does NOT block export. User can download PDF with warnings present.

// LEGAL DISCLAIMER:
// Always rendered at bottom of Assumptions and Exclusions sections:
// <small>ℹ️ AI-generated draft. Review before sending to client.</small>
```

### 4.4 Proposal Screen Render Sequence

```tsx
// ProposalScreen.tsx (Client Component)

export default function ProposalScreen({ proposalId }) {
  const proposal = await getProposal(proposalId)  // Server Component fetch

  return (
    <div>
      <StickyTopBar proposal={proposal} />
      <ProposalTitle proposal={proposal} />
      <ScopeSection
        items={proposal.scopeItems}
        confidence={proposal.confidence.scopeItems}
      />
      <CommercialTermsSection
        terms={proposal.commercialTerms}
        confidence={proposal.confidence.commercialTerms}
      />
      <TimelineSection
        timeline={proposal.timeline}
        confidence={proposal.confidence.timeline}
      />
      <AssumptionsSection
        items={proposal.assumptions}
        confidence={proposal.confidence.assumptions}
      />
      <ExclusionsSection
        items={proposal.exclusions}
        confidence={proposal.confidence.exclusions}
      />
      <StickyBottomBar proposal={proposal} />
    </div>
  )
}

// Each Section component:
// - Renders its items
// - Each item is editable inline (contentEditable or input)
// - Each item shows 🖊️ on hover
// - Section header shows confidence badge if applicable
// - Section footer shows legal disclaimer if assumptions/exclusions
```

---

## 5. BUILD ORDER (ABSOLUTE MINIMUM)

```
STEP 1: PROJECT SETUP
  - Initialize Next.js (TypeScript + Tailwind + App Router)
  - Configure Prisma + PostgreSQL
  - Copy 3 tables schema, run migration
  - Set up Auth.js (Google + Email)
  - Create env.ts for typed env vars
  - Push to GitHub

STEP 2: CREATE PROPOSAL FORM
  - Build single-page form component (3 fields: projectName, clientName, description)
    → Note: budget + paymentType are Step 2, not Step 1. MVP starts with 2 fields first.
  - Build Step 2 fields (budget input + paymentType dropdown)
  - Wire createProposal server action
  - Form saves on "Generate" click (not auto-save for MVP simplicity)

STEP 3: AI INTEGRATION
  - Set up OpenAI SDK wrapper
  - Build 4-stage generation pipeline
    → Stage 1: analysis + prompt construction
    → Stage 2: scope generation
    → Stage 3: commercial terms generation
    → Stage 4: assembly
  - Build generateProposalWithAI server action
  - Add progress indicator UI (simple bar, no stages text)
  - Handle: success → show proposal | failure → show retry button

STEP 4: PROPOSAL REVIEW SCREEN
  - Build ProposalScreen layout (scrolling document)
  - Render scope items as editable cards
  - Render commercial terms as editable table
  - Render assumptions/exclusions as editable lists
  - Wire updateProposalField (inline editing)
  - Wire addProposalItem + removeProposalItem
  - Wire markSectionReviewed
  - Wire regenerateSection

STEP 5: PDF EXPORT + FINISH
  - Set up Puppeteer (or @playwright/browser-chromium)
  - Build HTML template for PDF (RTL + Arabic support)
  - Wire exportProposalPDF server action
  - Wire download button → triggers PDF generation → file download
  - Add GeneratedDocument table + save record
  - Add sign-up prompt after first export (toast)
  - Deploy to Railway
```

---

## BUILD STRICTURE RULES

| Rule | Meaning |
|------|---------|
| **Build in order** | Step 1 complete → Step 2. Never skip ahead. |
| **One thing at a time** | Finish one server action before starting the next. |
| **No parallel work** | Single developer cannot context-switch between AI and PDF. |
| **Test after each step** | Manual test: does the form save? Does AI return data? Does PDF render? |
| **No refactoring** | If it works, leave it. Refactor only if it blocks the next step. |
| **No styling beyond basic** | Tailwind utility classes only. No design system. No custom components library. No animations in MVP. |
| **Console.log for errors** | No Sentry. No monitoring. Log to console + file. |

---

## IMPLEMENTATION NOTE TO SELF

The proposal JSON is stored in a single column (`scopeItems Json?`).

There is NO separate table for `ScopeItem`, `CommercialTerms`, `Assumption`.

The entire AI output lives in JSON columns on the Proposal row.

**Why:** Because we don't know exactly what fields we'll need yet. JSON gives us flexibility to iterate without migrations. When the schema stabilizes, we can normalize.

**This is intentional. Not lazy. Not technical debt. It's speed.**

---

*End of Implementation Blueprint*
