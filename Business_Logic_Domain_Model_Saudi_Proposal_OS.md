# Saudi Proposal OS — Business Logic Flow & Domain Model

> **Status:** Draft v1.0  
> **Author:** Domain & Systems Architecture Team  
> **Date:** June 2026  
> **Based on:** PRD v1.0 + TAS v1.0  
> **Confidentiality:** Internal — Meklads / Ruwaq

---

## PART 1 — SYSTEM FLOW

### Complete Lifecycle of the Product

Below is the end-to-end system flow. Every stage is explained in terms of what happens, why it happens, and what decisions are made.

```
                        ┌──────────────┐
                        │   Visitor    │
                        └──────┬───────┘
                               │
                               ▼
                     ┌─────────────────┐
                     │  Authentication  │
                     │  (Sign Up / In)  │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │   Onboarding    │
                     │ (Optional Step) │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │   Dashboard     │
                     │  (Empty State)  │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │  Create Proposal │
                     │  (New Proposal)  │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │  Input Collection │
                     │  (5-Step Form)   │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │   Validation    │
                     │  (4 Validation  │
                     │    Layers)      │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │ AI Generation   │
                     │  Pipeline       │
                     │  (4 Stages)     │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │  Post-Validation │
                     │  (Schema Check) │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │  Review & Edit  │
                     │  (User Approval)│
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │  Proposal       │
                     │  Assembly       │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │  PDF Generation │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │  Export / Share │
                     │  (PDF, Email,   │
                     │   WhatsApp)     │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │  Dashboard      │
                     │ (Updated State) │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │  Billing        │
                     │ (Usage Tracked) │
                     └─────────────────┘
```

---

### Stage 0: Visitor → Authentication

**What happens:**
A visitor lands on the landing page. They can:
- Sign up with email + password
- Sign up with Google OAuth
- Sign in if already registered
- Access a "Demo Mode" (proceed without saving, limited to 1 proposal preview)

**Business decisions at this stage:**
- No credit card required for sign-up. We want zero friction.
- First-time users are placed on a 14-day trial with the Starter plan capabilities.
- Demo mode never creates a persistent user record — data is lost on session end.

**Transition condition:** User provides valid credentials or OAuth token. System creates a User entity with `status: trial`.

---

### Stage 1: Onboarding (Optional)

**What happens:**
After first login, the user may optionally:
- Set up their company profile (name, logo, CR number, VAT, brand colors)
- Select their primary industry (construction, engineering, consulting, etc.)
- Watch a 30-second walkthrough video

**Business decisions:**
- Onboarding is skippable. The user can create their first proposal immediately.
- If skipped, the proposal will use default branding (Ruwaq "Created by Ruwaq" watermark on free tier).
- Users can complete their profile at any time from Settings.

**Transition condition:** User clicks "Skip" or completes the onboarding steps. System sets `onboarding_completed: true`.

---

### Stage 2: Dashboard (Empty State → Active State)

**What happens:**
The user sees their dashboard. On first visit, it shows:
- Empty state illustration
- "Create your first proposal" prominent CTA button
- Quick stats: "0 proposals created / 3 remaining this month" (trial limits)

**Business decisions:**
- The dashboard is the home base. It shows proposals grouped by status (Draft, Completed, Exported, Archived).
- Search and filter by client name, project type, or date range (simple client-side filtering for MVP).

**Transition condition:** User clicks "Create Proposal."

---

### Stage 3: Create Proposal Initiation

**What happens:**
Before entering the form, the system:
- Checks usage limits: "Has the user exceeded their monthly proposal quota?"
- If exceeded → show upgrade prompt with pricing. No proposal creation allowed.
- If within limits → initialize a new Proposal entity with `status: draft` and proceed.

**Business decisions:**
- Usage limits are checked here, not at export. We want users to know early if they can proceed.
- Draft proposals DO count toward the monthly limit once they move past "Input Collection." This prevents users from stockpiling infinite drafts.

**Transition condition:** Usage check passes. A Proposal entity is created with a unique ID and `status: draft`.

---

### Stage 4: Input Collection (5-Step Form)

**What happens:**
The user progresses through five sequential screens:

| Step | Content | UX Pattern |
|------|---------|------------|
| **Step 1: Project Info** | Project name, client name, client type, city, project type + category | Dropdowns + text inputs |
| **Step 2: Scope of Work** | Free-text description of deliverables + AI suggestion button | Text area + AI chip suggestions |
| **Step 3: Timeline** | Start date, end date, milestones, deliverables list | Date pickers + dynamic list |
| **Step 4: Commercial Terms** | Total value, payment structure, milestones %, retention, warranty | Number inputs + percentage calculator |
| **Step 5: Fine Print** | Assumptions, exclusions, terms & conditions (AI pre-filled) | Text areas with AI-generated defaults |

**Business decisions:**
- Each step auto-saves as the user types (debounced, 2-second delay). No save button needed.
- User can go back to any previous step without losing data.
- Step 1 is the minimum viable input. Steps 2–5 have sensible AI defaults if the user skips them.
- The "Generate with AI" button is available from Step 2 onward, but the full generation only triggers when all steps are completed at least minimally.

**Transition condition:** User clicks "Generate Proposal" on Step 5. All Step 1 fields are required. Steps 2–5 can be minimal.

---

### Stage 5: Validation (4 Validation Layers)

**What happens before AI is called:**

The system performs four validation passes in sequence:

**Layer 1 — Client-side Validation (in the browser):**
- Required fields are filled (project name, client name, client type, city, project type)
- Dates are logical (end ≥ start)
- Values are positive numbers
- Instant feedback with inline error messages

**Layer 2 — API Validation (server receives data):**
- Request body matches the expected schema (structural validation)
- Data types are correct (string, number, date, enum)
- Field lengths are within limits
- No unexpected fields present

**Layer 3 — Business Rule Validation (server logic):**
- User is authenticated and active
- Usage quota is confirmed (double-check, as client-side check could be bypassed)
- Total payment percentages sum to ~100% (within 2% tolerance for rounding)
- At least one milestone or payment term is defined

**Layer 4 — Pre-AI Readiness Check:**
- Is there enough context for AI to generate quality output? (e.g., if scope description is too short (< 10 chars), ask user to elaborate)
- Does the project type have a matching template? (If not, fall back to generic template)

**Business decisions:**
- If any validation fails, the user is returned to the relevant step with a clear error message and the specific field highlighted.
- No partial AI calls — if validation fails, the AI is never called. This saves API costs.
- Layer 4 is a "soft" check — it warns but doesn't block. The user can proceed with minimal input, but the AI output quality may be lower.

**Transition condition:** All validation layers pass. System proceeds to AI Generation.

---

### Stage 6: AI Generation Pipeline (4 Sequential Stages)

**What happens:**

The system calls the AI API four times in sequence, each call building on the output of the previous call. Each call has a structured prompt and expects a structured JSON response.

```
                ┌─────────────────────────────┐
                │   Stage 1: Project Analysis │
                │   Input: Project Info       │
                │   Output: Context Analysis  │
                └─────────────┬───────────────┘
                              │
                              ▼
                ┌─────────────────────────────┐
                │   Stage 2: Scope Generation │
                │   Input: Analysis + Scope   │
                │   Output: Scope Items []    │
                └─────────────┬───────────────┘
                              │
                              ▼
                ┌─────────────────────────────┐
                │   Stage 3: Commercial Terms │
                │   Input: Scope + Commercial │
                │   Output: Payment Schedule, │
                │   Assumptions, Exclusions   │
                └─────────────┬───────────────┘
                              │
                              ▼
                ┌─────────────────────────────┐
                │   Stage 4: Final Assembly   │
                │   Input: All Above          │
                │   Output: Complete Proposal │
                │   JSON Document             │
                └─────────────┬───────────────┘
                              │
                              ▼
                    Post-Validation Stage
```

**Stage 1 — Project Analysis:**
- **Input:** Project name, client type, city, project type + category
- **Prompt instruction:** "Analyze this project context for the Saudi market. Identify relevant regulations, typical practices, and market norms."
- **Output JSON:**
```json
{
  "project_summary": "string",
  "market_context": "string",
  "key_considerations": ["string"],
  "suggested_tone": "formal | professional | standard"
}
```
- **Duration:** Fast (< 5 seconds). Mostly context retrieval.

**Stage 2 — Scope Generation:**
- **Input:** Project Analysis output + user's scope description + selected project type
- **Prompt instruction:** "Generate a professional scope of work with clear deliverables. Structure as numbered items."
- **Output JSON:**
```json
{
  "scope_items": [
    { "id": "string", "title": "string", "description": "string", "type": "deliverable | milestone | service" }
  ],
  "deliverables": [
    { "id": "string", "name": "string", "description": "string" }
  ]
}
```
- **Duration:** Medium (< 15 seconds). Heavier generation.
- **Note:** If the user selected specific scope items from AI suggestions earlier, those are injected into the prompt as preferences.

**Stage 3 — Commercial Terms Generation:**
- **Input:** Scope items + user's commercial inputs (total value, payment structure)
- **Prompt instruction:** "Based on the scope and project type, suggest a payment schedule, assumptions, and exclusions appropriate for the Saudi market."
- **Output JSON:**
```json
{
  "payment_schedule": {
    "type": "milestone | monthly | fixed",
    "milestones": [
      { "percentage": "number", "description": "string", "trigger_event": "string" }
    ],
    "total_percentage": 100
  },
  "assumptions": [
    { "id": "string", "text": "string", "category": "scope | timeline | cost | legal" }
  ],
  "exclusions": [
    { "id": "string", "text": "string", "category": "scope | materials | permits | other" }
  ],
  "warranty_period": "string",
  "retention_percentage": "number (or null)"
}
```
- **Duration:** Medium (< 15 seconds).
- **Validation:** System checks that percentages sum to ~100%. If not, regenerates.

**Stage 4 — Final Assembly:**
- **Input:** All previous stage outputs + all user inputs
- **Prompt instruction:** "Combine everything into a complete, coherent proposal document. Add a professional introduction, organize sections, and ensure consistency."
- **Output JSON:**
```json
{
  "title": "string",
  "introduction": "string (2-3 sentences)",
  "sections": [
    { "id": "string", "heading": "string", "content": "string or array", "order": "number" }
  ],
  "summary": "string (one paragraph)",
  "validity_period": "string (e.g., '30 days')"
}
```
- **Duration:** Fast (< 8 seconds). Mostly aggregation and formatting.

**Total AI pipeline time:** ~40 seconds maximum.

**Business decisions:**
- Each stage has a timeout (30 seconds). If a stage times out, the system retries once. If it fails again, the user is shown a partial draft with a warning: "Some sections could not be generated. You can edit manually."
- Progress is shown to the user as a progress bar with stage labels: "Analyzing project...", "Generating scope...", "Creating commercial terms...", "Assembling proposal..."
- The user CANNOT skip stages — all four stages must complete for a full proposal. However, the user CAN cancel generation and receive a partial draft (only what was generated so far).

**Transition condition:** All four stages complete successfully, OR at least Stage 1 + 2 complete (minimum viable proposal with scope + assembly). System proceeds to Post-Validation.

---

### Stage 7: Post-Validation (AI Output Validation)

**What happens after AI responds:**

The system validates the AI output before presenting it to the user:

1. **Schema Compliance:** Does the JSON match the expected structure for each section?
2. **Completeness:** Are all required sections present? (scope, deliverables, payment terms, assumptions, exclusions, introduction)
3. **Numerical Integrity:** Do payment percentages sum to ~100%? Are values within reasonable ranges?
4. **Content Quality:** Is each text field non-empty and coherent? (basic check — not NLP quality, just length + structure)
5. **Safety Check:** Does the content contain any disallowed patterns? (e.g., specific legal promises, pricing guarantees, regulatory claims)

**Validation responses:**
| Result | Action |
|--------|--------|
| All checks pass | Proceed to Review & Edit |
| Schema mismatch | Regenerate that specific stage (max 2 retries) |
| Numerical integrity fail | Regenerate Commercial Terms stage |
| Content quality fail (empty/too short) | Regenerate that section with stricter prompt |
| Safety check fail | Block the output. Inform user: "AI generated content that requires review. Please edit manually." Show sections that need attention. |

**Business decisions:**
- Post-validation is critical for trust. A malformed or hallucinated proposal destroys credibility.
- After 2 failed regeneration attempts, fall back to template-based defaults for the failing section. The user is notified: "We had trouble generating this section. Here is a template to start from."
- Safety checks are conservative. Better to block and ask than to let problematic content through.

**Transition condition:** Post-validation passes or fallback applied. System proceeds to Review & Edit.

---

### Stage 8: Review & Edit

**What happens:**

The user sees the complete proposal in a clean, editable interface:

- **Left sidebar:** Section navigation (Scope, Timeline, Commercial, Assumptions, Exclusions, etc.)
- **Main area:** Full proposal preview with inline editing
- **AI actions bar:** Per section, the user can:
  - "Regenerate this section" (calls AI for that section only)
  - "Improve wording" (AI rewrite)
  - "Make shorter/longer" (AI reformat)
  - "Translate to Arabic/English" (AI translation, preserving structure)
- **Approval toggle:** Each section has a "Reviewed" checkbox. The proposal cannot be finalized until all sections are reviewed.

**Business decisions:**
- The user must explicitly mark each section as "Reviewed" before exporting. This is our legal protection — we can prove the user saw and approved every term.
- The proposal is auto-saved every 30 seconds during editing.
- If the user leaves and returns, they resume exactly where they left off.

**Transition condition:** All sections marked "Reviewed." User clicks "Finalize Proposal." System sets `status: completed`.

---

### Stage 9: Proposal Assembly (Finalization)

**What happens:**

The system performs a final assembly of the proposal before PDF generation:

- **Merge:** User edits + AI content are merged into a single canonical document
- **Apply brand kit:** Company logo, colors, fonts, and contact info are applied
- **Apply template layout:** Section ordering, spacing, headers, and footers are set based on the selected template
- **Generate metadata:** Proposal number, version, date, expiry date
- **Save final state:** The assembled proposal is saved as a `ProposalDocument` record (immutable after this point — becomes a historical record if edited later)

**Business decisions:**
- Once assembled and finalized, the proposal becomes immutable for audit purposes. Future edits create a new version (v1, v2, v3...).
- This is important for legal disputes — the version that was sent to the client cannot be altered.

**Transition condition:** Assembly complete. System proceeds to PDF Generation.

---

### Stage 10: PDF Generation

**What happens:**

The system generates a professional PDF:

1. **Template rendering:** The assembled proposal content is injected into an HTML template
2. **Server-side rendering:** The HTML is converted to PDF using a headless browser engine on the server
3. **Quality checks:**
   - PDF page count is within reasonable range (5–30 pages)
   - No rendering artifacts (basic visual check via pixel comparison)
   - All images (logo) loaded correctly
4. **PDF storage:** The PDF is stored and a URL is returned

**Business decisions:**
- PDF generation is synchronous for MVP (user waits). Typical generation time: 3–8 seconds.
- If generation takes > 15 seconds, the system shows a "We'll email you when ready" option (async fallback).
- The PDF filename is auto-generated: `Proposal_[ProjectName]_[Date].pdf`

**Transition condition:** PDF generated successfully. System sets `status: exported`.

---

### Stage 11: Export / Share

**What happens:**

The user can share the proposal through multiple channels:

| Channel | Action | UX |
|---------|--------|----|
| **Download PDF** | Direct download | Browser downloads PDF. Counted as 1 export. |
| **Email Client** | Opens default mail app | Prefilled: To, Subject (Proposal: [Project]), Body (professional message), Attachment |
| **WhatsApp** | Copies formatted message + PDF link | User pastes into WhatsApp manually. Link opens proposal in a mobile-optimized web viewer. |
| **Share Link** | Generates a unique URL | Optional password protection. Optional expiry date. |

**Business decisions:**
- WhatsApp and Email do NOT require API integration for MVP — they use native share features (mailto: links, clipboard copy).
- The share link view is a read-only, mobile-optimized version of the proposal. It counts as a "view" in analytics (V2).
- Each export method increments the proposal's `export_count`. This is used for usage tracking.

**Transition condition:** User performs an export action or navigates away. Proposal status remains `exported`.

---

### Stage 12: Dashboard (Updated State)

**What happens:**

The user returns to the dashboard. The proposal now appears in their list with:
- Status badge: "Exported" (green)
- Export date
- View count (if shared link was viewed — V2)
- Quick actions: Duplicate, Archive, Create Similar

**Business decisions:**
- Duplicate creates a new Draft proposal with all fields pre-filled from the exported proposal. User can modify and regenerate.
- Archive moves the proposal to "Archived" tab. Archived proposals don't count toward monthly limits.
- Delete is soft-delete for 30 days (recoverable). After 30 days, hard delete.

---

### Stage 13: Billing (Continuous Background Process)

**What happens throughout the lifecycle:**

| Event | Billing Action |
|-------|----------------|
| User signs up | Trial created (14 days). Usage counter initialized. |
| User creates proposal | Usage counter incremented (at Stage 3, not Stage 0). |
| User reaches limit | Dashboard shows upgrade prompt. New proposal creation blocked. |
| User upgrades | Subscription updated. Usage counter reset for new billing period. |
| User downgrades | Next billing cycle adopts lower tier limits. Proposals already created are safe. |
| User cancels | Service continues until end of billing period. Then account frozen (read-only). |
| Trial expires | Account frozen. User can view but not create new proposals. Upgrade prompt on every page. |

**Business decisions:**
- Usage is counted at proposal creation (Stage 3), not at export. This prevents users from creating 50 proposals and only exporting the one they need.
- Frozen accounts can still download previously exported PDFs. We don't hold data hostage.
- Payment is processed through Stripe/Moyasar. Invoicing is automatic.

---

## PART 2 — DOMAIN ENTITIES

Below are the core business entities. Each entity is described by its purpose, responsibilities, lifecycle, and relationships to other entities.

---

### Entity 1: User

| Aspect | Description |
|--------|-------------|
| **Purpose** | Represents a human who uses the platform. The central actor in the system. |
| **Responsibilities** | • Owns proposals and company profile<br>• Has subscription and usage rights<br>• Manages team members (V2)<br>• Receives notifications (V2) |
| **Lifecycle** | `visitor → registered → trial → active → past_due → canceled → deleted` |
| **Key Attributes (Business)** | • Identity (email, name, phone)<br>• Role (owner, admin, member — V2)<br>• Status (trial, active, past_due, canceled)<br>• Onboarding state (completed, skipped)<br>• Preferred language (ar, en)<br>• Region/country (for localization)<br>• Auth provider (email, google) |
| **Relationships** | • **Owns** many Proposals<br>• **Has one** CompanyProfile<br>• **Has one** Subscription<br>• **Has many** UsageRecords<br>• **Has many** GeneratedDocuments (via Proposals) |

**Key business rules:**
- A User must have a unique email address.
- A User can only have one active Subscription at a time.
- A User's data is permanently deleted 90 days after account deletion request.

---

### Entity 2: CompanyProfile

| Aspect | Description |
|--------|-------------|
| **Purpose** | Stores the user's company information used in proposal branding. This is the "face" of the business that clients see. |
| **Responsibilities** | • Provides branding assets (logo, colors)<br>• Stores legal information (CR number, VAT)<br>• Supplies contact information for proposals<br>• Can be switched for agencies managing multiple brands (V2) |
| **Lifecycle** | `created → complete → updated → archived` |
| **Key Attributes (Business)** | • Company name (Arabic + English)<br>• Commercial Registration (CR) number<br>• VAT number<br>• Logo (image URL)<br>• Brand colors (primary, secondary, accent)<br>• Contact person, phone, email, website<br>• Address (city, region, street) |
| **Relationships** | • **Belongs to** one User<br>• **Used by** many Proposals |

**Key business rules:**
- A User can have one CompanyProfile (for MVP). Multiple profiles become Brand Kit in V2.
- The CompanyProfile is optional. If not set, proposals use default Ruwaq branding (with watermark on free tier).
- CR and VAT numbers are validated for format only (not against government databases).

---

### Entity 3: Proposal

| Aspect | Description |
|--------|-------------|
| **Purpose** | The core business entity. A proposal is a collection of project information, scope, commercial terms, and generated content that together form a commercial offer to a client. |
| **Responsibilities** | • Captures all user inputs (project info, scope, timeline, commercial, fine print)<br>• Holds AI-generated content for each section<br>• Tracks its own lifecycle state<br>• Maintains version history<br>• Records export activity |
| **Lifecycle** | `draft → generating → reviewing → completed → exported → archived` (with branching for rejection/duplication) |
| **Key Attributes (Business)** | • **User inputs:** project_name, client_name, client_type, city, project_type, category, scope_description, start_date, end_date, total_value, payment_structure <!-- include the rest --><br>• **AI outputs:** scope_items, deliverables, payment_schedule, assumptions, exclusions, introduction, summary<br>• **State:** status, version_number, reviewed_sections [], export_count, last_exported_at<br>• **Metadata:** created_at, updated_at, completed_at |
| **Relationships** | • **Belongs to** one User<br>• **Belongs to** one CompanyProfile (at time of creation)<br>• **Uses** one Template<br>• **Produces** one or more GeneratedDocuments<br>• **Has** many ProposalVersions (V2)<br>• **Associated with** UsageRecord (via creation event) |

**Key business rules:**
- A Proposal is immutable once its status reaches `exported`. Future edits create a new version.
- A Proposal can only be deleted (soft) if its status is `draft` or `archived`.
- A Proposal in `generating` state is write-locked — the user cannot edit until generation completes or fails.
- The reviewed_sections field tracks which sections the user has explicitly approved. All sections must be reviewed before `completed` status.

---

### Entity 4: Template

| Aspect | Description |
|--------|-------------|
| **Purpose** | Defines the structure, layout, and default content for a type of proposal. Templates ensure consistency and speed. |
| **Responsibilities** | • Provides default section ordering<br>• Defines which sections are included<br>• Supplies industry-specific default text (e.g., terms & conditions for construction)<br>• Controls PDF layout (margins, fonts, spacing) |
| **Lifecycle** | `created → active → deprecated → retired` (managed by platform, not users for MVP) |
| **Key Attributes (Business)** | • Name, industry, description<br>• Section definitions [{id, heading, required, order}]<br>• Default assumptions and exclusions (industry-specific)<br>• PDF styling parameters<br>• Is_premium (locked behind paywall) |
| **Relationships** | • **Used by** many Proposals<br>• **Belongs to** platform (admin-managed for MVP)<br>• **Accessible to** Subscription tiers (basic templates for all, premium templates for paid plans) |

**Key business rules:**
- MVP ships with 5–10 industry-specific templates (Villa Fit-out, Engineering Consultancy, Maintenance Contract, Marketing Agency, General Consulting).
- Templates are selected automatically based on project_type + category. User can override.
- Premium templates are locked behind Professional plan or higher.
- Custom templates (user-created) are V2.

---

### Entity 5: GeneratedDocument

| Aspect | Description |
|--------|-------------|
| **Purpose** | Represents an immutable, finalized version of a proposal output (PDF, share link, etc.). This is the "shippable" artifact. |
| **Responsibilities** | • Stores the finalized PDF (or reference to it)<br>• Records what was sent to the client (for audit)<br>• Tracks delivery method (download, email, whatsapp, link)<br>• Records when it was sent and to whom |
| **Lifecycle** | `pending → generated → sent → viewed (V2) → expired` |
| **Key Attributes (Business)** | • Document type (pdf, share_link)<br>• File URL / storage reference<br>• File size, page count<br>• Delivery method<br>• Sent to (email/phone if applicable)<br>• Password (if share link is protected)<br>• Expiry date (if set)<br>• View count (V2) |
| **Relationships** | • **Belongs to** one Proposal<br>• **Belongs to** one User (via Proposal) |

**Key business rules:**
- A Proposal can have multiple GeneratedDocuments (e.g., PDF + share link).
- GeneratedDocuments are immutable. Once generated, the content cannot change.
- When a Proposal is versioned (v2 created), GeneratedDocuments remain associated with their original Proposal version.
- Expired share links return a "This proposal is no longer available" page.

---

### Entity 6: Subscription

| Aspect | Description |
|--------|-------------|
| **Purpose** | Represents the user's paid access to the platform. Controls feature access and usage limits. |
| **Responsibilities** | • Tracks plan tier (free, starter, professional, business)<br>• Manages billing cycle (monthly/yearly)<br>• Controls feature flags (what the user can access)<br>• Integrates with payment provider for recurring billing<br>• Handles trial periods and grace periods |
| **Lifecycle** | `trial → active → past_due → canceled → expired` |
| **Key Attributes (Business)** | • Plan tier<br>• Status<br>• Current period start/end<br>• Trial end date (if applicable)<br>• Payment provider subscription ID<br>• Auto-renew (boolean)<br>• Canceled at date (if applicable)<br>• Grace period end (past_due → expired) |
| **Relationships** | • **Belongs to** one User<br>• **Controls** UsageRecord limits<br>• **Determines** feature access (feature flags)<br>• **Related to** BillingInvoice (V2) |

**Key business rules:**
- A User can only have one active Subscription.
- Trial cannot be extended programmatically (manual override by admin only).
- Downgrades take effect at the end of the current billing period.
- Cancellation is effective immediately for new feature access, but service continues until period end.
- Past_due status has a 7-day grace period before expiring.

---

### Entity 7: UsageRecord

| Aspect | Description |
|--------|-------------|
| **Purpose** | Tracks consumption of billable resources. Enforces plan limits and provides data for upgrade prompts. |
| **Responsibilities** | • Records each proposal creation event<br>• Tracks count against plan limit<br>• Provides data for "you've used X of Y proposals" UI<br>• Resets per billing cycle |
| **Lifecycle** | `recorded → counted → reset (at cycle end)` |
| **Key Attributes (Business)** | • Period start/end (aligned with billing cycle)<br>• Proposals used (integer count)<br>• Proposals limit (from plan tier)<br>• AI calls made (for overage tracking — V2)<br>• PDF exports |
| **Relationships** | • **Belongs to** one User<br>• **Determined by** Subscription tier<br>• **Incremented by** Proposal creation |

**Key business rules:**
- Usage count increments when a Proposal transitions from `draft` to `generating` (i.e., after input collection completes).
- Usage count does NOT decrement if a proposal is archived or deleted. The resource was consumed.
- Usage limit is checked synchronously before proposal creation — no overage allowed. User must upgrade.
- Usage records are immutable for audit purposes (we need accurate billing history).

---

### Entity 8: AIGenerationLog

| Aspect | Description |
|--------|-------------|
| **Purpose** | Records every AI API call for debugging, cost tracking, and quality improvement. |
| **Responsibilities** | • Logs prompt and response for every AI call<br>• Records latency, success/failure, retry count<br>• Stores user feedback (thumbs up/down — V2)<br>• Enables prompt engineering improvements based on real data |
| **Lifecycle** | `initiated → completed → analyzed (V2)` |
| **Key Attributes (Business)** | • Proposal ID (for correlation)<br>• AI stage (analysis, scope, commercial, assembly)<br>• Prompt sent (truncated for storage efficiency)<br>• Response received (truncated)<br>• Latency (ms)<br>• Status (success, failed, retried)<br>• Tokens used (input + output)<br>• Cost (estimated)<br>• Error message (if failed) |
| **Relationships** | • **Belongs to** one Proposal<br>• **Belongs to** one User (via Proposal) |

**Key business rules:**
- AI logs are stored for 90 days for debugging, then aggregated/anonymized for prompt improvement.
- Logs are never exposed to users — internal use only.
- Token usage is tracked for cost analysis and future overage billing.

---

### Entity 9: BillingInvoice (V2 — Structural Placeholder)

| Aspect | Description |
|--------|-------------|
| **Purpose** | Represents a billing transaction. |
| **Lifecycle** | `pending → paid → failed → refunded` |
| **Relationships** | • **Belongs to** Subscription |

*Detailed design deferred to V2. Included here to complete the domain model.*

---

## PART 3 — RELATIONSHIPS

### Entity Relationship Map (Business Logic, Not Database)

```
┌─────────────────────────────────────────────────────────────────┐
│                         SYSTEM                                   │
│                                                                  │
│  ┌──────────┐     ┌────────────────┐     ┌──────────────────┐   │
│  │   User   │────→│ CompanyProfile │     │    Template      │   │
│  │          │     │ (0..1 per User)│     │ (Platform-owned) │   │
│  │          │     └────────────────┘     └────────┬─────────┘   │
│  │          │                                     │              │
│  │          │     ┌──────────────┐                │              │
│  │          │────→│  Proposal   │◄───────────────┘              │
│  │          │     │              │                               │
│  │          │     │ (owned by    │                               │
│  │          │     │  User)       │                               │
│  │          │     └──────┬───────┘                               │
│  │          │            │                                       │
│  └──────────┘            │                                       │
│        │                 │                                       │
│        │                 ▼                                       │
│        │     ┌────────────────────┐                              │
│        │     │ GeneratedDocument  │                              │
│        │     │ (1+ per Proposal)  │                              │
│        │     └────────────────────┘                              │
│        │                                                        │
│        ▼                                                        │
│  ┌──────────────┐     ┌──────────────┐                          │
│  │ Subscription │────→│ UsageRecord  │                          │
│  │ (1 per User) │     │ (resets      │                          │
│  │              │     │  monthly)    │                          │
│  └──────────────┘     └──────────────┘                          │
│                                                                  │
│  ┌────────────────┐                                              │
│  │ AIGenerationLog│ (for every AI call)                          │
│  └────────────────┘                                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Detailed Relationship Descriptions

#### 1. User → Proposal: **Owns (1:N)**
- **Direction:** One User has many Proposals.
- **Constraint:** A Proposal must belong to exactly one User.
- **Business implication:** Proposals are private to the User. No other User can see them (until Team collaboration in V2).
- **Cascade:** If a User deletes their account, all Draft proposals are soft-deleted. Exported proposals are anonymized (User becomes "Deleted User").

#### 2. User → CompanyProfile: **Has (1:0..1)**
- **Direction:** One User has zero or one CompanyProfile.
- **Constraint:** A User can only have one active CompanyProfile at a time.
- **Business implication:** If no CompanyProfile exists, proposals use Ruwaq's default branding.

#### 3. User → Subscription: **Has (1:1)**
- **Direction:** One User has exactly one active Subscription at any time.
- **Constraint:** A new Subscription is created when the User signs up (trial). Changing plans updates the existing Subscription record.
- **Historical:** Previous Subscription records are kept for audit purposes.

#### 4. User → UsageRecord: **Has (1:1 per cycle)**
- **Direction:** One User has one UsageRecord per billing cycle.
- **Constraint:** The UsageRecord resets at the start of each billing cycle.
- **Business implication:** UsageRecord is the source of truth for "can the user create a proposal?"

#### 5. Proposal → GeneratedDocument: **Produces (1:N)**
- **Direction:** One Proposal can have multiple GeneratedDocuments (different export formats, different times).
- **Constraint:** A GeneratedDocument must belong to exactly one Proposal.
- **Business implication:** Each export creates a new GeneratedDocument. The count is tracked for usage analytics.

#### 6. Proposal → Template: **Uses (N:1)**
- **Direction:** Many Proposals can use the same Template.
- **Constraint:** A Template is selected at Proposal creation time. Changing the template mid-creation is allowed (it re-layouts the content).

#### 7. Proposal → CompanyProfile: **References (N:1)**
- **Direction:** A Proposal uses the CompanyProfile that was active at the time of creation.
- **Business implication:** Even if the User updates their CompanyProfile later, the Proposal retains the profile snapshot of when it was created. This ensures that sent proposals always look exactly as they did when sent.

#### 8. Subscription → UsageRecord: **Defines (1:1 per cycle)**
- **Direction:** The Subscription's plan tier defines the usage limit for the associated UsageRecord.
- **Constraint:** When Subscription changes (upgrade/downgrade), the UsageRecord limit is updated for the next cycle, not mid-cycle.

#### 9. Subscription → Feature Access: **Controls (1:N)**
- **Direction:** The Subscription's plan tier determines which features are available.
- **Implementation:** Feature flags are derived from the plan tier, not stored separately for MVP. (e.g., `plan_tier >= professional` → premium templates unlocked.)

#### 10. Proposal → AIGenerationLog: **Has (1:N)**
- **Direction:** One Proposal has multiple AI logs (one per generation stage, plus re-generations).
- **Constraint:** Not all proposals will have AI logs if generation fails before any AI call.

### Key Relationship Rules

| Rule | Explanation |
|------|-------------|
| **Data cannot be orphaned** | Every child entity (Proposal, GeneratedDocument, UsageRecord) must have a parent User. |
| **History is preserved** | Changing a CompanyProfile does not retroactively update sent Proposals. Changing Subscription does not affect existing UsageRecords mid-cycle. |
| **Soft deletes cascade but do not destroy** | Deleting a User soft-deletes their Proposals and GeneratedDocuments. These are recoverable for 30 days. Hard delete is a separate process. |
| **Subscription is independent of proposals** | A User can still view and download their exported proposals even after Subscription expires. They just cannot create new ones. |

---

## PART 4 — STATE TRANSITIONS

### 4.1 Proposal State Machine

```
                          ┌──────────┐
                          │  Draft   │
                          └────┬─────┘
                               │ User clicks "Generate"
                               ▼
                        ┌──────────────┐
                        │  Generating  │
                        │(AI Pipeline) │
                        └──────┬───────┘
                    ┌──────────┼──────────┐
                    │          │          │
                    ▼          ▼          ▼
              ┌─────────┐ ┌─────────┐ ┌─────────┐
              │ Review  │ │ Partial │ │ Failed  │
              │ (Full)  │ │ (Stages │ │ (No AI) │
              └────┬────┘ │ 1-2OK)  │ └────┬────┘
                   │      └────┬────┘      │
                   │           │           │
                   │           ▼           │
                   │    ┌──────────────┐   │
                   └────→  Reviewing   │◄──┘
                        │ (User edits) │
                        └──────┬───────┘
                               │ User marks all
                               │ sections reviewed
                               ▼
                        ┌──────────────┐
                        │  Completed   │
                        │ (Assembled)  │
                        └──────┬───────┘
                               │ User exports
                               ▼
                        ┌──────────────┐
                        │  Exported    │
                        │ (PDF/Sent)   │
                        └──────┬───────┘
                               │ User archives
                               │ or re-exports
                               ▼
                        ┌──────────────┐
                        │  Archived    │
                        │ (Soft Delete)│
                        └──────────────┘
```

**State definitions:**

| State | Definition | User Can | System Does |
|-------|------------|----------|-------------|
| **Draft** | Proposal created, no AI generation attempted | Edit any field, delete, abandon | Auto-saves every 30s, counts toward usage limit (counted at creation) |
| **Generating** | AI pipeline is running | Cancel (returns to Draft), wait | Runs 4-stage AI pipeline, shows progress bar, handles retries |
| **Reviewing** | AI output is ready, user is reviewing/editing | Edit any section, regenerate specific sections, mark sections as reviewed | Auto-saves, provides AI rewrite actions, tracks reviewed sections |
| **Completed** | All sections reviewed, proposal is finalized | View, export, duplicate, archive. Cannot edit without creating new version. | Assembles final document, applies branding, creates immutable snapshot |
| **Exported** | At least one export action performed | Download again, share, archive. View export history. | Logs each export (GeneratedDocument created). Updates export_count. |
| **Archived** | User moved to archive | Restore (to Draft), permanently delete | Hides from main dashboard, excluded from usage counts, auto-delete after 365 days unless restored |

**Edge cases:**

| Scenario | Behavior |
|----------|----------|
| User closes browser during Generating | Proposal remains in `generating` state. On next visit, system detects stale generation (> 5 minutes) and returns to `draft` with a warning: "Previous generation was interrupted. You can try again." |
| User cancels during Generating | Pipeline stops. Whatever was generated (if any stage completed) is saved as partial output. Proposal returns to `draft`. User can retry generation. |
| AI generation fails entirely | Proposal returns to `draft` with error message: "AI generation encountered an issue. Please check your inputs and try again, or edit manually." |
| User marks all sections reviewed but misses some | System prevents transition to `completed`. Highlights unreviewed sections. |
| User tries to edit an Exported proposal | System creates a new version: "You are editing v1. Changes will create v2. Previous version is still available." |

---

### 4.2 Subscription State Machine

```
                  ┌────────────┐
                  │   None     │
                  │(New Signup)│
                  └──────┬─────┘
                         │ Sign up
                         ▼
                  ┌──────────────┐
                  │    Trial     │
                  │  (14 days)   │
                  └──────┬───────┘
                    ┌────┴────┐
                    │         │
              ┌─────┴──┐ ┌───┴──────┐
              │ Active │ │ Expired  │
              │ (Paid) │ │(No card) │
              └──┬──┬──┘ └──┬───────┘
           ┌─────┘  └──────┐│
           ▼                ▼▼
    ┌──────────┐     ┌──────────┐
    │ Past Due │     │ Canceled │
    │ (7 days) │     │(End of   │
    └────┬─────┘     │ period)  │
         │           └────┬─────┘
         ▼                ▼
    ┌──────────┐     ┌──────────┐
    │ Expired  │     │ Expired  │
    └──────────┘     └──────────┘
```

**State definitions:**

| State | Definition | User Can | System Does |
|-------|------------|----------|-------------|
| **Trial** | First 14 days after sign-up. Full Starter plan features. | Create up to 3 proposals. No watermark. Full features. | Counts down trial days. Shows "X days remaining" banner. On day 14, transitions to Past Due if no payment method added. |
| **Active** | Subscription is paid and current. | Full plan features based on tier. | Billing recurring. Usage tracked. |
| **Past Due** | Payment failed or trial ended without payment. | View existing proposals. Cannot create new ones. | Sends payment reminder emails on days 1, 3, 5, 7. After 7 days, transitions to Expired. |
| **Canceled** | User manually canceled. Service continues until period end. | Full access until period end. Cannot create new proposals after period end. | Shows "Your plan ends on [date]" banner. At period end, transitions to Expired. |
| **Expired** | No active subscription. | Read-only access to exported proposals. Can download previously exported PDFs. Cannot create, edit, or export. | Shows upgrade prompt on every page. Data retained for 90 days after expiration, then scheduled for deletion (with email warning at 30, 14, 7 days). |

---

### 4.3 User Account State

| State | Description |
|-------|-------------|
| **Active** | Normal operation. Subscription may be trial, active, or past_due (but not expired). |
| **Frozen** | Subscription expired. Read-only access. Can view and download existing exported proposals. Upgrade prompt shown. |
| **Suspended** | Violation of terms. Admin action only. No access. |
| **Deleted** | User requested deletion. 30-day soft delete (recoverable by support). After 30 days, permanent deletion. |

**Transitions:**
- Active → Frozen: Subscription expires or trial ends without payment.
- Active → Suspended: Admin suspends for ToS violation.
- Any → Deleted: User initiates deletion from Settings.
- Frozen → Active: User upgrades/pays.

---

## PART 5 — BUSINESS RULES

### 5.1 Proposal Limits

| Rule | Detail |
|------|--------|
| **Free tier limit** | 3 proposals per month |
| **Starter tier limit** | 15 proposals per month |
| **Professional tier limit** | 50 proposals per month |
| **Business tier limit** | Unlimited |
| **Counting method** | A proposal is "counted" when it transitions from `draft` to `generating` (Stage 3 in the flow). Drafts that never reach generation do NOT count. |
| **Reset period** | Usage counter resets on the billing cycle date (not calendar month). |
| **Carryover** | Unused proposals do NOT carry over to the next cycle. |
| **Archived proposals** | Do not count toward the limit. However, archiving an existing proposal does NOT free up a slot for the current month — the usage was already consumed. |
| **Overage** | Not allowed. The system blocks creation when the limit is reached. User sees upgrade prompt. |

### 5.2 Trial Restrictions

| Rule | Detail |
|------|--------|
| **Trial duration** | 14 days from sign-up |
| **Trial features** | Full Starter plan features (15 proposals/month limit, no watermark, all basic templates) |
| **Trial limit** | 3 proposals maximum during trial (not per month — total) |
| **Payment required** | No credit card required at sign-up |
| **Trial extension** | Not available programmatically. Admin can extend manually in exceptional cases. |
| **End of trial** | If no payment method added: account becomes Frozen. Data retained for 90 days. |
| **During trial** | User sees "X days remaining on your trial" banner |

### 5.3 Export Permissions

| Rule | Detail |
|------|--------|
| **Who can export** | Any user with an active (non-expired) subscription |
| **Export formats** | PDF (always available). Share link (always available). Email draft (always available). WhatsApp message (always available). |
| **Watermark** | Free tier: PDF includes "Created by Ruwaq" watermark (subtle, footer). Paid tiers: no watermark. |
| **PDF quality** | Same for all tiers. No "premium PDF" vs "basic PDF" distinction. |
| **Export count** | Not limited by tier. Users can export the same proposal multiple times. (Usage is counted at creation, not export.) |
| **Share link expiry** | Free tier: links expire after 30 days. Paid tiers: configurable expiry (30/60/90 days or never). |

### 5.4 Regeneration Policies

| Rule | Detail |
|------|--------|
| **Full regeneration** | User can regenerate the entire proposal from scratch. Counts as a new proposal usage. Previous version remains available. |
| **Section regeneration** | User can regenerate individual sections (scope, commercial terms, assumptions) without creating a new proposal. Does NOT count as new usage. |
| **Regeneration limit** | No limit per proposal for section regeneration. However, rate-limited to 5 regenerations per 10 minutes to prevent API abuse. |
| **AI rewrite ("Improve")** | User can rewrite existing AI content. Calls AI with instruction (make shorter, more persuasive, more formal). Counted as lightweight AI call (not full generation). |

### 5.5 Usage Tracking Rules

| Rule | Detail |
|------|--------|
| **What is tracked** | • Proposals created (count)<br>• AI calls made (usage — V2 for cost tracking)<br>• Storage used (PDFs + logos — V2) |
| **When tracking occurs** | At proposal creation (transition from draft to generating). |
| **Who tracks** | The UsageRecord entity, owned by the User, scoped to the billing period. |
| **Accuracy** | Usage count is checked BEFORE each proposal creation. Check + increment is an atomic operation (no race conditions). |
| **Refunds** | No usage refunds. If the user creates a proposal and deletes it, the usage is consumed. |

### 5.6 Subscription Upgrade/Downgrade Rules

| Rule | Detail |
|------|--------|
| **Upgrade** | Immediate effect. User gets access to higher tier features right away. Billing is prorated for the remainder of the current period. |
| **Downgrade** | Takes effect at the end of the current billing period. User retains current tier features until then. |
| **Crossgrade (same price)** | Immediate effect. |
| **Plan change mid-cycle** | Usage limit for the current cycle is recalculated based on the new tier. If user already exceeded the new tier's limit, they cannot create new proposals until the next cycle (but existing proposals are safe). |
| **Cancellation** | Immediate for new features. Service continues until current period end. No refunds for partial periods (per SaaS standard). |

### 5.7 Data Retention Rules

| Rule | Detail |
|------|--------|
| **Active account** | All data retained indefinitely while account is active. |
| **Frozen account (expired)** | Data retained for 90 days. Email reminders at day 30, 60, 75, 85, 89. |
| **Deleted account** | Soft delete for 30 days (recoverable by support). Hard delete after 30 days. |
| **AI logs** | Retained for 90 days, then anonymized/aggregated. |
| **Generated PDFs** | Stored permanently if account is active. Deleted according to data retention policy above. |

### 5.8 AI Usage Policy

| Rule | Detail |
|------|--------|
| **AI model** | Single model per tier (e.g., GPT-4o for Professional+, GPT-4o-mini for Free/Starter). |
| **Rate limit** | 10 AI calls per user per minute. 100 per hour. |
| **Content policy** | AI must not generate: false legal claims, pricing guarantees without context, discriminatory content, or unlicensed regulatory assertions. |
| **Disclaimer** | Every proposal includes: "This proposal was generated with AI assistance and should be reviewed by a qualified professional before submission." |

---

## PART 6 — ERROR SCENARIOS

### 6.1 AI Failure

#### Scenario: AI API returns an error (timeout, rate limit, internal error)

| Aspect | Detail |
|--------|--------|
| **Detection** | HTTP 4xx/5xx from AI provider, or stage timeout (> 30 seconds per stage) |
| **System reaction** | 1. Log the error with full context (user_id, proposal_id, stage, prompt, response, error)<br>2. Retry the failed stage once automatically (different prompt phrasing, same inputs)<br>3. If retry fails: mark that stage as "failed" in the proposal<br>4. If Stage 1 or 2 succeeded: present partial proposal to user with note<br>5. If Stage 1 failed: return to draft with error message |
| **User sees** | Message: "AI generation encountered an issue. We saved your inputs. You can try again or edit manually." Option to retry or proceed with manual editing. |
| **Data safety** | All user inputs are saved. No data loss. |
| **Recovery** | User can retry generation at any time from the proposal editor. |

#### Scenario: AI generates low-quality output (valid JSON, but nonsensical content)

| Aspect | Detail |
|--------|--------|
| **Detection** | Heuristic checks: content length < 20 chars, repetitive text, placeholder text detected |
| **System reaction** | 1. Flag the section for user review ("This section may need attention")<br>2. Do NOT block the user — they can still use the proposal after editing<br>3. Log for prompt improvement analysis |
| **User sees** | Yellow warning banner on the affected section: "This section may need review. Edit or regenerate." |
| **Recovery** | User can regenerate the section or edit manually. |

### 6.2 Invalid Inputs

#### Scenario: User submits form with missing/invalid data

| Aspect | Detail |
|--------|--------|
| **Detection** | Client-side validation (instant) + Server-side validation (API) |
| **System reaction** | 1. Return specific error for each invalid field<br>2. Highlight fields in red with message<br>3. Do NOT allow progression to next step<br>4. Log invalid submission attempt (for UX improvement analysis) |
| **User sees** | Inline error messages: "Project name is required", "End date must be after start date", "Payment percentages must sum to 100%" |
| **Recovery** | User corrects highlighted fields and resubmits. |

#### Scenario: User enters extreme values (e.g., project value 999,999,999,999 SAR)

| Aspect | Detail |
|--------|--------|
| **Detection** | Business rule validation: value > 1B SAR or < 100 SAR |
| **System reaction** | 1. Flag as suspicious but do NOT block (user may have a real mega-project)<br>2. Show confirmation dialog: "You entered [value] SAR. Is this correct?"<br>3. Log for fraud/abuse monitoring |
| **User sees** | Soft confirmation: "Is this amount correct? (Yes, it's correct / No, let me change it)" |
| **Recovery** | User confirms or edits. |

### 6.3 PDF Failure

#### Scenario: PDF generation fails (rendering error, timeout, file too large)

| Aspect | Detail |
|--------|--------|
| **Detection** | Rendering engine returns error, or generation exceeds 30 seconds |
| **System reaction** | 1. Log the error with proposal context<br>2. Retry once with simplified layout (no images, standard fonts)<br>3. If retry fails: "We're having trouble generating your PDF. We'll email you when it's ready." Generate asynchronously and email. |
| **User sees** | Initial attempt: progress bar. If fails: "Something went wrong. We'll email you the PDF shortly." |
| **Data safety** | Proposal data is saved. No data loss. |
| **Recovery** | User can also download the proposal as a text/markdown file (fallback format). |

### 6.4 Usage Limit Reached

#### Scenario: User has reached their monthly proposal limit

| Aspect | Detail |
|--------|--------|
| **Detection** | UsageRecord check at proposal creation (Stage 3) |
| **System reaction** | 1. Block proposal creation<br>2. Show upgrade prompt with clear comparison: "You've used all X proposals this month. Upgrade to get more."<br>3. Offer one-time purchase option: "Buy 5 additional proposals for 19 SAR" (V2) |
| **User sees** | Modal: "You've reached your limit. Upgrade to create more proposals." CTA buttons: "View Plans" / "Maybe Later" |
| **Recovery** | User upgrades subscription or waits until next billing cycle. |

#### Scenario: User hits limit while in the middle of editing a draft

| Aspect | Detail |
|--------|--------|
| **Detection** | Limit check at the moment they click "Generate" |
| **System reaction** | 1. Save the draft (status remains "draft")<br>2. Show upgrade prompt<br>3. Draft is accessible but cannot proceed to generation |
| **User sees** | Same upgrade prompt, but with context: "Your proposal is saved. Upgrade to generate it." |
| **Recovery** | Upgrade to continue from where they left off. |

### 6.5 Payment Expired / Failed

#### Scenario: Credit card charge fails on renewal date

| Aspect | Detail |
|--------|--------|
| **Detection** | Payment provider webhook (stripe.invoice.payment_failed) |
| **System reaction** | 1. Mark Subscription as "past_due"<br>2. Send email to user: "Your payment failed. Update your payment method to keep using the service."<br>3. Retry charge automatically every 3 days (up to 3 retries)<br>4. After 7 days in past_due: mark as "expired" |
| **User sees** | Banner on every page: "Payment issue — update your billing info to avoid interruption" |
| **Recovery** | User updates payment method. System retries immediately. |

### 6.6 Concurrent Access / Race Conditions

#### Scenario: User has the same proposal open in two browser tabs, editing simultaneously

| Aspect | Detail |
|--------|--------|
| **Detection** | optimistic concurrency control — check `updated_at` timestamp on save |
| **System reaction** | 1. First save wins<br>2. Second save returns conflict error<br>3. UI shows: "This proposal was updated in another window. Please refresh." |
| **User sees** | Snackbar/toast: "Proposal was updated elsewhere. Refresh to see latest version." |
| **Recovery** | User refreshes. Latest version is loaded. No data loss. |

### 6.7 Network Interruption

#### Scenario: User loses internet while AI generation is in progress

| Aspect | Detail |
|--------|--------|
| **Detection** | Client-side: API call fails with network error. Server-side: generation continues (AI was already called). |
| **System reaction** | 1. Server continues AI generation (server-side process doesn't depend on client connection)<br>2. When user reconnects, they see: "Your proposal was generated while you were offline. Review and continue."<br>3. If generation finished: proposal is in `reviewing` state. If interrupted: retry. |
| **User sees** | On reconnect: success state with generated proposal ready for review. |
| **Recovery** | Seamless. No data loss. |

### 6.8 Data Integrity / Corruption

#### Scenario: Database write fails mid-operation

| Aspect | Detail |
|--------|--------|
| **Detection** | Database transaction fails or returns error |
| **System reaction** | 1. Rollback the transaction (no partial writes)<br>2. Log the error with full context<br>3. Return error to user: "We encountered an issue saving your data. Please try again."<br>4. If retry fails: alert engineering team automatically |
| **User sees** | Error message with apology + reassurance: "Your data is safe. Please try again." |
| **Recovery** | User retries. No partial state. |

### 6.9 Hallucinated Critical Content

#### Scenario: AI generates a legally problematic statement (e.g., "We guarantee approval from the Ministry of XYZ")

| Aspect | Detail |
|--------|--------|
| **Detection** | Post-validation safety check: pattern matching against a list of prohibited phrases (guarantees, regulatory promises, absolute claims) |
| **System reaction** | 1. Block the specific section from being saved<br>2. Flag the content for AI prompt improvement<br>3. Show user: "This section contains content that we cannot include. Please edit or regenerate."<br>4. Include suggestion: "Try describing what you will do rather than guaranteeing outcomes." |
| **User sees** | Warning with explanation. |
| **Recovery** | User edits the section manually or regenerates with adjusted prompt. |

### 6.10 Storage Exhaustion

#### Scenario: User uploads a logo that exceeds file size limits

| Aspect | Detail |
|--------|--------|
| **Detection** | File upload validation (client + server) |
| **System reaction** | 1. Reject the file immediately<br>2. Inform user: "File too large. Maximum size is 5MB."<br>3. Offer compression suggestion: "Try a PNG under 5MB." |
| **User sees** | Inline error on upload field. |
| **Recovery** | User uploads a smaller file. |

---

## Appendix: Decision Log

| Decision | Rationale |
|----------|-----------|
| Usage counted at creation, not export | Prevents abuse (create 100, export 1). Aligns with "value is in the creation." |
| Usage NOT refunded on delete | Prevents gaming the system (create → delete → recreate loop). |
| Partial AI failure allows partial proposal | Better to give user something usable than a hard failure. User can fill gaps manually. |
| Reviewed sections as explicit approval | Legal protection. User explicitly accepted each section. |
| 7-day grace period for payment | Reduces churn from forgotten card expiry. Standard SaaS practice. |
| 90-day data retention for frozen accounts | Gives users time to return without holding data forever. |
| AI retry once automatically | Masks transient AI failures. User doesn't need to see every hiccup. |
| Soft confirmation for extreme values | Prevents data entry errors without blocking legitimate use cases. |

---

*End of Business Logic Flow & Domain Model v1.0*

*This document defines the behavioral rules of the system. Every engineering decision should be traceable back to a business rule defined here.*
