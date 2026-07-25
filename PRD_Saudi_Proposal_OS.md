# Saudi Proposal OS — Master Product Specification (PRD)

> **Status:** Draft v1.0  
> **Author:** Product & Strategy Team  
> **Date:** June 2026  
> **Confidentiality:** Internal — Meklads / Ruwaq

---

## 1. Vision

### Long-Term Vision
To become the **operating system for business documentation in the Saudi construction and professional services sector** — the default tool every contractor, consultant, and agency uses to win work, communicate scope, and close deals.

### Mission
Eliminate the hours, friction, and inconsistency of writing proposals from scratch. Give every business in Saudi Arabia the ability to produce **professional, compliant, and compelling proposals** in minutes — not days — using AI that understands the local market, language, and regulations.

### Core Philosophy
- **Speed over complexity.** A proposal should take 5 minutes, not 5 hours.
- **Local first.** Built for Saudi Arabia — Saudi content, Saudi pricing, Saudi regulations, Saudi Arabic.
- **Professional output, zero effort.** The PDF must look like a top-tier consulting firm produced it.
- **AI as co-pilot, not replacement.** The user knows their project; we help them articulate it beautifully.
- **Trust through structure.** Clear terms, assumptions, exclusions — reduce disputes before they happen.

### Problems Solved
| Problem | Solution |
|---------|----------|
| Proposals take 2–6 hours to write | AI generates a complete draft in under 5 minutes |
| Inconsistent quality and formatting | Professional template system + AI ensures consistent output |
| Scope gaps lead to disputes | Structured input + AI suggestions + clear assumptions/exclusions |
| Arabic/English switching is painful | Full bilingual support, smart language detection |
| Small teams have no dedicated proposal writer | AI fills the gap without hiring |
| Pricing is hard to get right | Market-aware pricing suggestions based on project type, city, and scope |
| PDF tools are clunky | Seamless browser-based PDF generation, no software install required |

### Value Proposition
> "Create professional, Saudi-ready proposals in 5 minutes — with AI that knows the local market, writes in Arabic and English, and produces PDFs that win clients."

---

## 2. Target Market

### Primary (MVP Focus)
| Segment | Sub-segments | Estimated Size (KSA) |
|---------|-------------|----------------------|
| **Construction Companies** | Main contractors, subcontractors, fit-out companies, MEP contractors | 10,000+ |
| **Engineering Offices** | Architectural, civil, structural, electrical, mechanical consultants | 4,000+ |
| **Consultants** | Project management, QS, supervision, feasibility studies | 2,000+ |
| **Service Businesses** | Maintenance, cleaning, security, landscaping, facilities management | 8,000+ |
| **Agencies** | Marketing, PR, branding, digital, event management | 3,000+ |

### Secondary (V2+)
- Freelancers and independent consultants
- Real estate developers (RFPs to contractors)
- Government entities (simplified RFQ responses)
- Architects and interior designers
- Event planning companies

### Geographic Expansion (Long-term)
- **Phase 1:** Saudi Arabia (all regions — Riyadh, Jeddah, Dammam, Makkah, Madinah, etc.)
- **Phase 2:** GCC — UAE, Kuwait, Qatar, Oman, Bahrain
- **Phase 3:** Broader MENA region

---

## 3. Customer Personas

### Persona 1: Bandar — The Construction SME Owner
- **Profile:** Saudi male, 38, owns a contracting company with 20–50 employees
- **Pain Points:** Loses bids because proposals are late or poorly formatted; his project manager spends 4 hours per proposal; clients complain about unclear scope
- **Daily Workflow:** WhatsApp all day, visits sites, manages 3–5 ongoing projects, bids 2–4 new projects/month
- **Current Solution:** Opens Word, copies-pastes from old proposal, changes names and numbers, exports to PDF — messy and inconsistent
- **Reason to Buy:** "I can send a professional proposal in 10 minutes from my phone"
- **Reason to Resist:** "I've been doing it my way for 10 years. Why change?"

### Persona 2: Layan — The Engineering Office Manager
- **Profile:** Saudi/Syrian female, 32, manages proposals for a 15-person engineering consultancy in Riyadh
- **Pain Points:** Tracks 6–8 proposals at different stages; constant back-and-forth with engineers on scope; formatting takes 2 hours per proposal
- **Current Solution:** Google Docs template + manual PDF export — version control is a nightmare
- **Reason to Buy:** "One place to create, review, and share proposals. No more 'which version is this?'"
- **Reason to Resist:** "We have a system already (Google Docs/Word). This is another tool to learn."

### Persona 3: Fahad — The Marketing Agency Owner
- **Profile:** Saudi male, 29, runs a creative agency in Jeddah, 10 employees
- **Pain Points:** Proposals need to look beautiful to match their brand; typical proposal tools are too corporate/rigid
- **Current Solution:** Uses Canva for proposals — looks great but takes forever and doesn't handle commercial terms well
- **Reason to Buy:** "Design forward proposals with proper commercial terms — best of both worlds"
- **Reason to Resist:** "Will it limit my creative freedom?"

### Persona 4: Noura — The Freelance Consultant
- **Profile:** Saudi female, 41, independent project management consultant
- **Pain Points:** Every client wants a different format; she wastes time reformatting; looks less professional than big firms
- **Current Solution:** Her own Notion templates + Canva + PDF export
- **Reason to Buy:** "Makes me look like a McKinsey consultant with 5 minutes of work"
- **Reason to Resist:** 49 SAR/month feels expensive when she only bids 2–3 projects/month

---

## 4. Main User Journey

### Step-by-Step Flow

#### Step 1: Sign Up / Log In
- Options: Email + password, Google, Apple, or "Continue without account" (demo mode)
- No credit card required for trial
- Onboarding wizard optional (can skip)

#### Step 2: Dashboard — "My Proposals"
- Empty state: "Let's create your first proposal" with big CTA
- List/draft/sent/won/lost tabs
- Search and filter by client, project type, status

#### Step 3: New Proposal — "Tell us about your project"
- **Form 1: Project Info**
  - Project name (required)
  - Client name / company (required)
  - Client type (Government / Private / Semi-government / Individual)
  - City / Region (dropdown — all Saudi cities)
  - Project type (categorized — Construction, Engineering, Consulting, Maintenance, Agency services, Other)
  - Project category (sub-selection based on type)

- **Form 2: Scope of Work**
  - Free text or bullet list — "Describe what you'll deliver"
  - AI suggestion button: "Suggest scope items based on project type"
  - Input method: Type naturally in Arabic or English — AI structures it
  - Option to select from common scope templates (e.g., "Fit-out of villa — standard package")

- **Form 3: Timeline & Deliverables**
  - Start date / End date
  - Milestones (auto-suggested based on project type)
  - Deliverables checklist (AI generates based on scope)

- **Form 4: Commercial Terms**
  - Total project value (SAR)
  - Payment terms — structured options:
    - Percentage-based milestones (e.g., 30% down, 40% on completion, 30% after handover)
    - Monthly installments
    - Fixed upon completion
    - Custom schedule
  - Retention / warranty period
  - Late payment penalties (optional, suggested)
  - Additional costs (mobilization, materials, permits — AI suggests based on project type)

- **Form 5: Fine Print (smart defaults, editable)**
  - Assumptions (AI generates based on scope)
  - Exclusions (AI generates based on scope)
  - Terms & conditions (standard template editable)

#### Step 4: Review & Edit
- Preview the full proposal in a clean, Notion-like interface
- Edit any section inline
- AI suggestions: "Improve this section", "Shorten", "Make more persuasive"
- Language toggle: Arabic / English / Bilingual side-by-side
- Legal check: "Highlight any risky terms" (V2)

#### Step 5: Export & Share
- **Download PDF** — professional, branded, paginated
  - Choose color theme (matches user's brand or platform defaults)
  - Include/Exclude sections (toggle)
- **Send Email** — prefilled with proposal attached, customizable message
- **Copy WhatsApp message** — clean summary with price + link to PDF
- **Share link** — private, password-optional, expires optionally

#### Step 6: Track & Follow Up
- Proposal status: Sent / Viewed / Downloaded / Won / Lost
- Reminder: "Follow up with [Client] — proposal viewed 3 days ago"
- Analytics: View count, time spent on each section (V2)

---

## 5. Features

### ⭐ MVP Features (v1.0 — Must Have)

| Category | Feature | Priority |
|----------|---------|----------|
| **Auth** | Email + Google login, magic link option | P0 |
| **Proposal Creation** | Multi-step guided form (5 steps) | P0 |
| **AI Generation** | Generate full proposal draft from inputs | P0 |
| **AI Scope Writing** | Suggest scope items based on project type | P0 |
| **Bilingual** | Full Arabic + English support, smart detection | P0 |
| **Commercial Terms** | Structured payment schedules, milestone builder | P0 |
| **Assumptions & Exclusions** | AI-generated suggestions, user editable | P0 |
| **PDF Export** | Professional PDF with branding (logo, colors) | P0 |
| **Share** | Email draft, WhatsApp message, share link | P0 |
| **Dashboard** | Proposal list with status tracking | P0 |
| **Templates** | 5–10 industry-specific templates (fit-out, consulting, maintenance, marketing, etc.) | P0 |
| **User Profile** | Company name, logo, contact info, brand colors | P0 |

### 🚀 v1.1 — Launch + Quick Wins (Near-term)

| Feature | Rationale |
|---------|-----------|
| **Dark mode** | Saudi users love dark mode — shows attention to UX |
| **Quick PDF preview** | Instant preview without leaving the editor |
| **Copy as image** | For Instagram/WhatsApp stories — "New project announcement" |
| **Commercial calculator** | Automatically calculate totals, VAT, retainage |
| **One-click duplicate proposal** | "Create similar proposal for another client" |

### 🌟 v2.0 — Growth Features

| Feature | Rationale |
|---------|-----------|
| **AI "Improve Proposal"** | Rewrite sections for better persuasion, clarity, or brevity |
| **Multi-language proposals** | Same proposal in Arabic + English + Urdu (for labor contracts) |
| **Collaboration** | Team members can edit, comment, approve — role-based |
| **Brand Kit** | Save multiple brand profiles (for agencies managing multiple clients) |
| **Proposal Analytics** | View tracking, time spent per section, drop-off |
| **e-Signature integration** | SignNow / DocuSign / Tawakkalna integration |
| **Client portal** | Client sees proposal, asks questions, approves/rejects online |
| **API** | Integrate with CRM, ERP, or accounting tools |
| **WhatsApp Business API** | Send proposals directly via WhatsApp |

### 🔮 v3.0+ — Ecosystem & Platform

| Feature | Rationale |
|---------|-----------|
| **AI Contract Drafting** | Generate full contracts based on proposal content |
| **RFP/RFQ Response Generator** | Upload RFP PDF, AI extracts requirements and generates response |
| **Project Dashboard** | After winning, track project milestones and payments |
| **Invoice Generation** | Generate invoices based on payment milestones |
| **Saudi Regulatory Compliance** | Automatically check proposal against Saudi labor law, municipal requirements |
| **Market Intelligence** | "You're pricing 15% below market avg for this project type in Riyadh" |
| **Procurement Marketplace** | Connect consultants with subcontractors |
| **Mobile App** | Full mobile experience for on-site proposal creation |

---

## 6. Inputs (Data Model Thinking)

> Conceptual only — not a database schema. These are all the inputs the user provides.

### Project Information
| Field | Type | Notes |
|-------|------|-------|
| Project Name | Text | |
| Client Company | Text | |
| Client Type | Enum | Government / Private / Semi-Government / Individual |
| City | Enum | All Saudi cities + "Other" |
| Region | Enum | Central, Western, Eastern, Northern, Southern |
| Project Type | Categorical | Construction, Engineering, Consulting, Maintenance, Agency, Other |
| Project Category | Conditional | Based on type — e.g., Construction → Villa, Building, Tower, Infrastructure, Fit-out, etc. |
| Project Value (SAR) | Number | |
| Currency | Enum | SAR (default), USD, other GCC |

### Scope of Work
| Field | Type | Notes |
|-------|------|-------|
| Scope Description | Long text | User writes naturally |
| AI Scope Suggestions | Generated | Presented as selectable chips |
| Scope Bullets | Array | Structured from AI or user input |

### Timeline & Deliverables
| Field | Type | Notes |
|-------|------|-------|
| Start Date | Date | |
| End Date / Duration | Date or Number | Days/weeks/months |
| Milestones | Array of {name, date, value} | AI suggests based on project type |
| Deliverables | Array of {item, description} | AI suggests based on scope |

### Commercial Terms
| Field | Type | Notes |
|-------|------|-------|
| Total Value | Number (SAR) | |
| Payment Structure | Enum | Milestone % / Monthly / On-completion / Custom |
| Milestones n | Array of {%, description, trigger} | e.g., 30% Down payment, 40% On delivery, 30% After handover |
| VAT Treatment | Enum | Inclusive / Exclusive / Not applicable |
| Retention (%) | Number | Typical 5–10% |
| Warranty Period | Text | e.g., "1 year from handover" |
| Late Payment Penalty | Text | Suggested by AI |
| Mobilization Cost | Number | If applicable |
| Materials Cost | Number | If applicable |
| Permits & Approvals | Number | If applicable |

### Company / Brand Profile
| Field | Type | Notes |
|-------|------|-------|
| Company Name | Text | |
| CR Number | Text | Saudi Commercial Registration |
| VAT Number | Text | |
| Contact Person | Text | |
| Phone | Text | |
| Email | Text | |
| Website | URL | |
| Logo | Image | Upload |
| Brand Colors | Color picker or auto-extract from logo | |
| Signature | Image | Optional |

---

## 7. Outputs

### Primary Outputs (MVP)
| Output | Format | Details |
|--------|--------|---------|
| **Full Proposal** | In-app preview, structured sections | Professional, editable, sectioned |
| **Scope of Work (SOW)** | PDF section + standalone export | Clear, bulleted, comprehensive |
| **Deliverables Table** | PDF section | Checklist format |
| **Timeline / Schedule** | PDF section | Visual timeline (Gantt-like) or table |
| **Commercial Terms** | PDF section | Transparent, structured, detailed |
| **Assumptions** | PDF section | AI-generated, user-approved |
| **Exclusions** | PDF section | AI-generated, user-approved |
| **Professional PDF** | Downloadable .pdf | Branded, paginated, print-ready |
| **Email Draft** | Opens default mail client | Prefilled subject, body, attachment |
| **WhatsApp Message** | Copyable text | Clean summary + price + link to view online |

### Secondary Outputs (V2+)
| Output | Format | Notes |
|--------|--------|-------|
| **Light Proposal** | Mobile-optimized web view | For quick sharing on WhatsApp |
| **Proposal Video / GIF** | Animated summary | Premium upsell (Ruwaq Graphics) |
| **Executive Summary** | 1-page PDF | For decision-makers who don't read details |
| **Terms & Conditions** | PDF appendix | Standard Saudi legal terms |
| **Payment Schedule** | Calendar/reminder export | .ics for Google Calendar |
| **Proposal in Urdu** | PDF | For labor/staff contracts |
| **Interactive Proposal** | Web page with accept/decline buttons | Client can approve without meeting |

---

## 8. User Experience Principles

### Core UX Tenets

**1. 5-Minute First Proposal**
- Create the first complete proposal in under 5 minutes from sign-up
- No configuration, no setup, no "before you start" walls
- Default templates are pre-loaded and ready to go

**2. Progressive Disclosure**
- Show only what's needed at each step
- Advanced options behind "Show more" or settings
- Never overwhelm with 50 fields at once

**3. AI, Not Autopilot**
- AI generates drafts — user approves and edits
- Suggestions are optional, not forced
- Every AI output is editable in one click

**4. Bilingual by Default**
- System detects language from input and adapts
- Easy toggle Arabic ↔ English at any point
- RTL support must be flawless — no layout bugs
- Numbers always in Western numerals (industry standard for Saudi proposals)

**5. Mobile-First, Desktop-Full**
- Create a proposal entirely on WhatsApp Web / mobile browser
- Full features on desktop for heavy editing
- Responsive design, not separate apps (until V3)

**6. Instant Gratification**
- See the proposal preview update in real time as you type
- PDF download should feel instant (under 3 seconds)
- No "loading" screens — skeleton states and optimistic UI

**7. Trust Signals**
- Clean, professional design (Linear/Notion aesthetic)
- No clutter, no ads, no upsells during proposal creation
- "Created by Ruwaq" watermark on free plan (subtle, professional)

**8. Zero Training Required**
- Every button says exactly what it does
- Tooltips for first-time users
- No onboarding tour required — learn by doing

---

## 9. Pricing Strategy

### Core Philosophy
> "Free to try, cheap to start, valuable enough to pay. Price in SAR, localized for Saudi purchasing power."

### MVP Pricing (Launch)

**Free Tier** — *For occasional users and trial*
- 3 proposals/month
- Ruwaq watermark on PDF
- Basic templates only
- No custom branding

**Starter** — **49 SAR/month** (≈ $13)
- 15 proposals/month
- No watermark
- Custom branding (logo, colors)
- All templates
- WhatsApp & email sharing

**Professional** — **119 SAR/month** (≈ $32)
- 50 proposals/month
- Priority AI (faster generation)
- Advanced templates + custom template creation
- Proposal analytics (view tracking)
- Team: 3 members

**Business** — **299 SAR/month** (≈ $80)
- Unlimited proposals
- White-label (Ruwaq branding removed)
- API access
- Priority support
- Team: 10 members
- e-Signature integration (V2)

### Annual Pricing (Discount)
- All plans: **20% off** when billed annually
- Professional annual: **1,149 SAR/year** (≈ 95 SAR/month effective)

### Future Pricing Considerations
- **Pay-per-proposal** model for extremely occasional users (e.g., 15 SAR/proposal)
- **Enterprise** — custom pricing for 50+ users, on-premise option for government
- **Freemium + credit system** — "AI credits" for advanced features

---

## 10. Upsell Opportunities

### Core Upsell Philosophy
> "Offer premium services only when the user is in a buying mindset — immediately after they create a proposal, when they're thinking about winning the client."

### Ruwaq Graphics House Services

**Tier 1: Proposal Enhancement** (49–149 SAR one-time)
| Service | Description | Price (SAR) |
|---------|-------------|-------------|
| **3D Render** | Professional architectural render to include in proposal | 149–499 |
| **Infographic Scope Summary** | Visual one-pager of the scope | 99 |
| **Cover Page Design** | Custom illustrated cover page for the proposal | 49 |

**Tier 2: Presentation Package** (199–599 SAR)
| Service | Description |
|---------|-------------|
| **Full proposal design** | Custom layout, graphics, icons, photography |
| **Brand alignment** | Match proposal to existing brand identity |
| **Animation / walkthrough video** | Animated project preview |
| **Pitch deck** | Investor/board-ready presentation |

**Tier 3: Identity & Digital** (999–4,999 SAR)
| Service | Description |
|---------|-------------|
| **Brand Identity** | Logo, colors, typography, stationery |
| **Landing Page** | Professional website for the company |
| **Social Media Kit** | Ready-to-post graphics for winning announcement |

### Integration with Proposal Flow
- **After PDF preview:** "Want a designer to review this proposal? We'll make it look premium."
- **After creating a proposal for a large project:** "Include a 3D render to win the client — starting from 149 SAR."
- **In dashboard:** "Your proposals don't have a logo yet. Add brand identity starting from 999 SAR."

### Commission / Partnership Model
- Ruwaq Graphics delivers services
- Revenue share with proposal platform (30–50%)
- Or fixed markup model

---

## 11. Risks

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AI generates poor quality content | Medium | High | Continuous prompt engineering + user rating system + fallback templates |
| AI hallucinations (wrong facts, wrong pricing) | Medium | Critical | All AI outputs are drafts — user must approve; disclaimer in PDF: "AI-generated — verify before sending" |
| PDF rendering breaks on some browsers | Low | Medium | Use battle-tested libraries (e.g., Puppeteer/Playwright for server-side PDF); extensive cross-browser testing |
| Arabic RTL rendering issues | Medium | High | Test with real Arabic content from day 1; prioritize RTL during development |
| Slow AI response time | Medium | High | Optimize prompts; use streaming responses; cache common templates |

### Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Low willingness to pay for proposals | Medium | High | Free tier removes barrier; value must be obvious in first use |
| Churn after first month | High | Medium | Onboarding sequence; "create 3 proposals free" hook; email reminders |
| Copycats in Saudi market | Medium | Medium | Build brand + local trust first; speed to market; deep localization is a moat |
| Difficulty reaching construction companies | Medium | Medium | WhatsApp-based onboarding; partnerships with engineering syndicates; trade show presence |

### Competition Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| BetterProposals / PandaDoc / Qwilr already exist | Low | Medium | They're not localized for Saudi; no Arabic, no RTL, no SAR pricing. Our advantage is local depth. |
| Zoho or large CRM adds proposal feature | Low | Low | Proposals as feature != proposal as product. They lack AI + localization focus. |
| Saudi government launches free tool | Low | High | Unlikely but possible. Mitigation: move upmarket to premium design and AI services. |

### Adoption Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Users prefer Word/Google Docs (habit) | Medium | High | Make import from Word/Google Docs seamless; show time savings ("You saved 2 hours vs Word"); offer templates that match their existing format |
| WhatsApp-only users find web app complex | Medium | Medium | Build WhatsApp-first experience: send proposal link, client views on phone, accept on WhatsApp. No app download needed. |
| Trust in AI-generated proposals | Medium | Medium | Show AI rating / quality score; allow manual override everywhere; include human review option (upsell) |
| English-speaking users feel underserved | Low | Medium | Full English interface + English templates + bilingual proposals |

---

## 12. Roadmap

### 📅 Phase 1: MVP — "Ship Fast, Learn Faster" (Q3 2026)

**Goal:** Validate that people will pay for AI-generated proposals in Saudi Arabia.

**Timeline:** 6–8 weeks from greenlight

**Deliverables:**
- [ ] User authentication (email + Google)
- [ ] 5-step proposal creation flow
- [ ] AI generation for scope, assumptions, exclusions
- [ ] 5 industry-specific templates
- [ ] Professional PDF export with branding
- [ ] Email draft + WhatsApp message copy
- [ ] Dashboard with proposal list
- [ ] Free + Starter plan (49 SAR/month)
- [ ] Stripe / Moyasar payment integration

**Success Metrics:**
- 100 paid users in first 30 days
- 70% complete a proposal in first session
- < 60% churn rate after 3 months (iteratively improve)

### 📅 Phase 2: Growth — "Deepen & Expand" (Q4 2026 — Q1 2027)

**Goal:** Scale to 500+ paid users and reduce churn.

**Deliverables:**
- [ ] Collaboration (team members, roles)
- [ ] Proposal analytics (view tracking)
- [ ] Brand Kit (multiple brands for agencies)
- [ ] e-Signature integration
- [ ] Advanced AI: "Improve Proposal" rewrite
- [ ] Client portal (accept/decline online)
- [ ] API for CRM integration
- [ ] WhatsApp Business API integration
- [ ] Professional + Business plans
- [ ] UAE expansion (AED pricing, Dubai city data)

**Success Metrics:**
- 500+ paid users
- Churn < 30%
- 10% conversion from free to paid

### 📅 Phase 3: Ecosystem — "Platform Play" (Q2 2027 — Q4 2027)

**Goal:** Become the operating system for Saudi professional documentation.

**Deliverables:**
- [ ] AI Contract Drafting (from proposal data)
- [ ] RFP/RFQ Response Generator
- [ ] Invoice Generation
- [ ] Project Tracking (post-win)
- [ ] Market Intelligence (pricing data)
- [ ] Mobile App (iOS + Android)
- [ ] Regulatory compliance checks
- [ ] GCC expansion (Kuwait, Qatar, Oman, Bahrain)
- [ ] Enterprise tier + government on-premise

**Success Metrics:**
- 2,000+ paid users
- 5M+ SAR ARR
- 10% enterprise / government revenue

### 🔭 Long-term Vision: "The Proposal Network"

**2028+**
- **Network effect:** When a client receives a proposal through Ruwaq, they create an account and send their own proposals
- **Industry data:** Anonymous market pricing data becomes a valuable asset
- **Procurement layer:** Match consultants with projects looking for proposals
- **AI Assistant:** Full WhatsApp-based AI assistant that creates, sends, and tracks proposals entirely via chat

---

## Appendix A: Competitive Landscape

| Competitor | Strength | Weakness vs. Saudi Proposal OS |
|------------|----------|--------------------------------|
| **PandaDoc** | Enterprise-ready, e-signature | No Arabic, no RTL, expensive for SMEs, not localized |
| **BetterProposals** | Simple UI, fast | No Arabic, no SAR pricing, no Saudi templates |
| **Qwilr** | Beautiful output, analytics | Too expensive, no localization, enterprise focus |
| **Proposify** | Templates, workflow | No Arabic, no local market understanding |
| **Microsoft Word** | Everyone has it | Manual, no AI, no tracking, inconsistent quality |
| **Canva** | Beautiful design, affordable | Not built for commercial terms, weak PDF output for proposals |

**Our Unfair Advantage:** Deep Saudi localization + AI-first + affordable pricing + focus on construction and professional services.

---

## Appendix B: Brand & Tone

- **Product Personality:** Professional, helpful, understated — like a trusted consultant
- **Visual Direction:** Clean, structured, Notion-meets-Stripe aesthetic
- **Arabic Tone:** Formal but not stiff — "فصيح واضح" not "فصحى متقعرة"
- **English Tone:** Direct, professional, warm
- **Error Messages:** Helpful, not technical. Never "Error 500". Always "Something went wrong — your draft is saved. Try again."
- **Empty States:** Encouraging, never cold. "Ready to win your next project?"

---

## Appendix C: AI Prompt Strategy (Conceptual)

> No prompt engineering here — only principles.

1. **System persona:** "You are a professional proposal writer with 15 years of experience in the Saudi construction and consulting industry."
2. **Context injection:** Always include project type, city, client type, and value range in the AI context
3. **Output structure:** Always return structured JSON that maps to proposal sections
4. **Language detection:** If input is Arabic → output in Arabic. If input is English → output in English. If mixed → ask user preference.
5. **Quality guardrails:**
   - Never invent specific laws or regulations (only suggest consulting a legal advisor)
   - Never suggest unethical practices (inflating prices, hiding terms)
   - Always include disclaimer: "AI-generated — review before sending"
6. **Continuous improvement:** Thumbs up/down on every AI output helps fine-tune prompts over time

---

*End of Master Product Specification v1.0*

*This document is a living artifact — it will evolve as we learn from users, the market, and the product itself.*
