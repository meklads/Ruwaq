# Ruwaq Trust Layer — Architecture v1

> **Status:** Approved (2026-06-21)  
> **Scope:** Smart BOQ · Clause Library · Live Proposal Room · Review Gates  
> **Prisma:** `prisma/schema.prisma` (models appended in this release)

---

## Approved Product Decisions (Locked)

| # | Decision |
|---|----------|
| 1 | Smart BOQ: **8–15 lines**, `SUM(lines) = userTotal`, proportional redistribution on edit |
| 2 | Clause packs v1: **Fit-out · Supervision · Maintenance** |
| 3 | Live Room: **Soft approval** (name, date, IP, checkboxes) — no Nafath Phase 1 |
| 4 | **Web link primary**, PDF secondary, watermarked (client name + date) |
| 5 | `estimate_only`: single numbers + **تقديري** badge + ±15% disclaimer top & bottom |

---

## 1. Data Model Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  ClausePack     │────<│  ClauseTemplate  │     │  Proposal           │
│  (seeded)       │     │  (pre-vetted)    │     │  + projectArchetype │
└─────────────────┘     └────────┬─────────┘     │  + reviewGates      │
                                 │               └──────────┬──────────┘
                                 │                          │
                    ┌────────────▼────────────┐    ┌─────────▼──────────┐
                    │ ProposalClauseSelection │    │ ProposalBoqLine    │
                    │ (enabled + filled vars) │    │ (8–15 rows)        │
                    └─────────────────────────┘    └────────────────────┘

┌──────────────────┐     ┌─────────────────────┐     ┌──────────────────┐
│ ProposalShareLink│────<│ ProposalViewSession │────<│ ProposalSectionView│
│ (Live Room)      │     │ (analytics)         │     │ (dwell per layer)  │
└────────┬─────────┘     └─────────────────────┘     └──────────────────┘
         │
         ├──── ClientAction (approve · amend · pdf · open)
         └──── AmendmentRequest
```

### Relationship to existing models

| Existing | Evolution |
|----------|-----------|
| `Proposal.commercialTerms` | Keeps payment schedule; **total breakdown moves to `ProposalBoqLine`** |
| `Proposal.assumptions` / `exclusions` JSON | **Display source becomes `ProposalClauseSelection`**; JSON kept as export cache / legacy fallback during migration |
| `GeneratedDocument.shareToken` | **Deprecated for new publishes** → `ProposalShareLink.token`; PDF exports still create `GeneratedDocument` rows |
| `Proposal.reviewedSections` | **Superseded by structured `reviewGates` JSON** (migration maps old IDs) |

---

## 2. Prisma Models (Reference)

See `prisma/schema.prisma` for the authoritative schema. Summary:

### 2.1 Clause Library (global, seeded)

**`ClausePack`**
- One row per pack version: `fit_out_v1`, `supervision_v1`, `maintenance_v1`
- Fields: `slug`, `nameAr`, `nameEn`, `archetype`, `version`, `isActive`

**`ClauseTemplate`**
- Pre-vetted bilingual text with `{placeholder}` tokens
- `category`: `materials | permits | payment | warranty | scope_change | delay | vat | other`
- `riskSide`: `protects_contractor | balanced`
- `isMandatory`: cannot disable without explicit contractor override + audit
- `alternativeGroup`: clauses in same group are mutually exclusive (pick one)
- `autoTriggerRules`: e.g. `{ "minDurationDays": 90 }` — auto-enables price escalation clause
- `placeholders`: JSON array of allowed keys, e.g. `["warranty_months", "retention_percent"]`

### 2.2 Smart BOQ (per proposal)

**`ProposalBoqLine`**
- 8–15 rows per proposal (enforced in service layer)
- `amount` + `percent` (percent derived, stored for display)
- `category`: `materials | labor | equipment | phase | management | other`
- `source`: `ai_suggested | user_edited | user_added`
- `isEstimated`: true when `Proposal.commercialMode = estimate_only`

**Proposal fields added:**
- `projectArchetype`: `fit_out | supervision | maintenance | other`
- `clausePackId` + `clausePackVersion`: snapshot at generation time
- `estimateVariancePercent`: default **15** for `estimate_only`

### 2.3 Live Proposal Room

**`ProposalShareLink`**
- `token`: public URL `/p/{token}`
- `status`: `active | expired | revoked`
- `expiresAt`, optional `passwordHash`
- `watermarkClientName`: copied from `Proposal.clientName` at publish
- `allowPdfDownload`: always true (Phase 1), events logged

**`ProposalViewSession`**
- One row per browser visit (session cookie or fingerprint hash)
- `durationSec`, `ipHash` (hashed, not raw IP), `geoApprox`, `userAgent`

**`ProposalSectionView`**
- Aggregated dwell time per section: `understanding | scope | deliverables | commercial | boq | payment | timeline | clauses | acceptance`

**`ClientAction`**
- `type`: `link_open | section_view | download_pdf | soft_approve | request_amendment | ask_question`
- `payload`: structured JSON per type (see §4)

**`AmendmentRequest`**
- Created from `request_amendment` action
- `status`: `open | in_progress | resolved | declined`
- `resolvedInProposalVersion`: links to new proposal version after contractor edit

### 2.4 Review Gates

**`Proposal.reviewGates`** (JSON):

```json
{
  "projectUnderstanding": { "confirmed": true, "at": "2026-06-21T10:00:00Z" },
  "scope": { "confirmed": true, "at": "..." },
  "deliverables": { "confirmed": false, "at": null },
  "commercialTerms": { "confirmed": false, "at": null },
  "boqBreakdown": { "confirmed": false, "at": null },
  "clausePack": { "confirmed": false, "at": null },
  "timeline": { "confirmed": false, "at": null },
  "legalDisclaimer": { "confirmed": false, "at": null }
}
```

**Publish rule:** All gates with `required: true` must be `confirmed` before `ProposalShareLink` creation.

| Gate | Required | Blocks |
|------|----------|--------|
| `boqBreakdown` | always | publish |
| `clausePack` | always | publish |
| `commercialTerms` | always | publish |
| `scope` | always | publish |
| `assumptionsExclusions` (merged UI) | always | publish |
| `legalDisclaimer` | always | publish |
| `deliverables` | if pack includes deliverables section | publish |
| `timeline` | optional (warn only) | — |

---

## 3. Service Logic (No UI — Data Rules)

### 3.1 Smart BOQ generation pipeline

```
INPUT: projectName, description, budget, commercialMode, optional context
  ↓
CLASSIFY → projectArchetype + clausePackId + breakdownTemplateId
  ↓
LOAD template weights (e.g. fit_out: prep 15%, structure 25%, MEP 20%…)
  ↓
AI: assign labels + notes per line (NOT amounts)
  ↓
SYSTEM: allocate amounts = budget × weights, adjust rounding on last line
  ↓
VALIDATE: 8 ≤ lines ≤ 15, SUM = budget
  ↓
PERSIST: ProposalBoqLine[]
```

**Edit rules (service):**
- User edits line `amount` → redistribute delta across unlocked lines proportionally
- User adds line → if at 15 lines, reject; else redistribute
- User deletes line → merge amount into largest category or `other`
- `estimate_only`: set all `isEstimated = true`, attach variance copy
- **Duration > 90 days:** parse `durationHint` / `timeline.duration` → if ≥ 90 calendar days, auto-enable `SA-*-PRICE-ESCALATION` clause (`autoTriggerRules.minDurationDays = 90`) in Panel 5; show contractor notice «تم تفعيل شرط تذبذب الأسعار تلقائياً»

### 3.2 Hybrid Clause Engine

```
CLASSIFY → clausePackId
  ↓
LOAD all ClauseTemplate for pack
  ↓
AI: score optional clauses (returns clauseKey + placeholder values ONLY)
  ↓
SYSTEM: merge mandatory + selected optionals; resolve alternativeGroup (one winner)
  ↓
RENDER: fill placeholders from proposal fields (no free-text legal)
  ↓
PERSIST: ProposalClauseSelection[] with renderedTextAr/En cache
  ↓
MAP to document layers 9–10 + relevant payment/warranty clauses in layer 7
```

**Forbidden:** Any `ProposalClauseSelection` where `renderedText` was not produced from a `ClauseTemplate` row.

### 3.3 Publish & Live Room

```
PRECONDITION: all required reviewGates confirmed
  ↓
CREATE ProposalShareLink (token, expiry default 14d, watermarkClientName)
  ↓
SET Proposal.status = published, publishedAt = now
  ↓
GENERATED PDF (optional, on-demand): watermark + clause pack version footer
  ↓
CONTRACTOR copies link / WhatsApp template
```

**Client open flow:**
```
GET /p/{token} → validate expiry/password
  ↓
CREATE ProposalViewSession
  ↓
LOG ClientAction link_open
  ↓
RENDER read-only layers (company brand only)
  ↓
ON scroll/section visibility → upsert ProposalSectionView dwellMs
```

**Soft approve payload:**
```json
{
  "clientName": "string",
  "clientEmail": "optional",
  "approvedScope": true,
  "approvedCommercial": true,
  "approvedTimeline": true,
  "acknowledgedEstimateDisclaimer": true,
  "estimateVariancePercent": 15,
  "submittedAt": "ISO8601",
  "clientIpHash": "sha256(...)"
}
```

**Rule:** When `Proposal.commercialMode = estimate_only`, `acknowledgedEstimateDisclaimer` is **required** before `soft_approve` is accepted; logged on `ClientAction.payload` for audit.

---

## 4. UX/UI Flow — Step 6: Review & Gates Layer

### 6.0 Entry condition

User lands here when `Proposal.status = review` after AI generation completes.

**Screen shell:**
- Sticky top: Project name · Client · Mode badge (`سعر محدد` | `تقدير أولي`)
- Sticky bottom: Gate progress `4/6 confirmed` · Primary CTA disabled until complete
- Left rail (desktop) / accordion (mobile): 11 document layers grouped into **6 review panels**

---

### 6.1 Panel map (review order — mandatory sequence)

| Order | Panel ID | Document layers | Gate key |
|-------|----------|-----------------|----------|
| 1 | `understanding` | Layer 3 — Project understanding | `projectUnderstanding` |
| 2 | `scope` | Layer 4 — Scope | `scope` |
| 3 | `deliverables` | Layer 5 — Deliverables | `deliverables` |
| 4 | `commercial` | Layers 6–7 — Offer + Payment | `commercialTerms` |
| 4b | *(embedded)* | **Smart BOQ table** | `boqBreakdown` |
| 5 | `clauses` | Layers 9–10 via Clause Pack | `clausePack` |
| 6 | `timeline` | Layer 8 — Timeline | `timeline` |
| 7 | `legal` | Layer 11 + disclaimers | `legalDisclaimer` |

Panels 4 and 4b share one screen (commercial stack).

---

### 6.2 Panel 4 — Commercial + Smart BOQ (critical path)

**Layout (desktop):**

```
┌─────────────────────────────────────────────────────────────┐
│ [تقدير أولي] banner if estimate_only                        │
│ "ميزانية أولية غير ملزمة — قابلة للتغيير ±15% …"           │
├─────────────────────────────────────────────────────────────┤
│ إجمالي العرض: 300,000 ر.س          🔒 يطابق مدخلك           │
├─────────────────────────────────────────────────────────────┤
│ جدول التفصيل المالي (مبسّط)                    [إعادة توزيع]│
│ ┌──────────────┬──────────┬─────┬──────────┐                │
│ │ البند        │ المبلغ   │ %   │ [تقديري] │                │
│ ├──────────────┼──────────┼─────┼──────────┤                │
│ │ … editable rows …        │     │          │                │
│ └──────────────┴──────────┴─────┴──────────┘                │
│ disclaimer footer (estimate_only only)                      │
├─────────────────────────────────────────────────────────────┤
│ جدول الدفعات (existing payment schedule UI)                 │
├─────────────────────────────────────────────────────────────┤
│ ☐ أكّدت جدول التفصيل المالي                                 │
│ ☐ أكّدت الشروط التجارية والدفعات                           │
└─────────────────────────────────────────────────────────────┘
```

**Interactions:**
- Edit amount → instant proportional redistribution + toast «تم تعديل التوزيع»
- `[إعادة توزيع]` → re-run AI labels only, keep user amounts if edited (confirm dialog)
- `+ إضافة بند` disabled at 15 lines
- Gate checkboxes disabled until table validates (SUM = total)

**estimate_only visuals:**
- Amber badge **تقديري** on every BOQ row
- Top + bottom disclaimer (±15% copy, non-binding)

---

### 6.3 Panel 5 — Clause Pack

```
┌─────────────────────────────────────────────────────────────┐
│ حزمة البنود: تشطيب داخلي v1.0          [بند معتمد ×12]      │
├─────────────────────────────────────────────────────────────┤
│ ▼ مسؤولية الرخص والتصاريح          [إلزامي]        [ON]      │
│   نص البند… (read-only, from library)                       │
│ ▼ توريد المواد                     [اختر بديل ▼]   [ON]      │
│   ○ على المقاول  ● على العميل                               │
│ ▼ التربة الصخرية                   [موصى]          [ON]      │
│   ℹ️ اقترحنا هذا لأن وصف المشروع ي mentions …               │
├─────────────────────────────────────────────────────────────┤
│ ⚠️ إيقاف بند إلزامي يتطلب تأكيداً إضافياً                   │
│ ☐ أكّدت البنود المعتمدة — Ruwaq لا يقدم استشارة قانونية     │
└─────────────────────────────────────────────────────────────┘
```

**Rules:**
- Mandatory clauses: toggle off → modal «هل أنت متأكد؟» + reason (stored in audit)
- Alternative groups: radio, not free text
- Expanding clause shows `sourceRef` + pack version (trust)

---

### 6.4 Gate progress & publish

**Sticky footer states:**

| State | Primary CTA |
|-------|-------------|
| Gates incomplete | «أكمل المراجعة (3 متبقية)» — disabled |
| All confirmed | «انشر رابط العرض للعميل» — enabled |
| Published | «نسخ الرابط» · «معاينة غرفة العميل» · «لوحة النشاط» |

**Publish modal:**
```
┌─ انشر العرض ─────────────────────────────┐
│ الرابط هو الطريقة الأساسية للعميل        │
│ صلاحية الرابط: [14 يوم ▼]                │
│ ☐ حماية بكلمة مرور (اختياري)             │
│ PDF متاح للتحميل مع watermark باسم العميل │
│           [إلغاء]  [انشر الآن]           │
└──────────────────────────────────────────┘
```

---

### 6.5 Post-publish — Contractor activity view

```
┌─ نشاط العميل ────────────────────────────┐
│ ● لم يُفتح بعد                           │
│ ● فُتح · 3m 12s · ركّز على: التفصيل المالي│
│ ● طلب تعديل على: النطاق — "…"           │
│ ● موافقة soft — Scope ✓ Commercial ✓     │
│ ● حمّل PDF                               │
└──────────────────────────────────────────┘
[فتح طلب التعديل] → returns to review with amendment pinned
```

---

### 6.6 Client Live Room (`/p/{token}`)

**Header:** Contractor logo · company name · «عرض مقدّم لـ {clientName}»

**Body:** Same 11 layers, read-only, smooth scroll sections

**Footer actions (always visible mobile):**
- `موافقة على العرض` → soft approve form
- `طلب تعديل`
- `تحميل PDF` (watermarked, logs event)

**Soft approve form:**
- Name (required)
- Checkboxes: Scope · Price/BOQ · Timeline
- If `estimate_only`: extra checkbox «أفهم أن الأرقام تقديرية ±15%»
- Submit → `ClientAction soft_approve` + email/notification to contractor (Phase 1: in-app only)

---

## 5. Seed Data Plan (Clause Packs v1)

| Pack slug | archetype | ~clause count | Mandatory highlights |
|-----------|-----------|---------------|----------------------|
| `fit_out_v1` | fit_out | 14 | permits, materials supply, rock/soil exclusion, variation order, retention |
| `supervision_v1` | supervision | 12 | site visits, RFI response times, not responsible for contractor means |
| `maintenance_v1` | maintenance | 10 | SLA response, spare parts, excluded equipment, annual renewal |

Each pack ships with **2 alternative groups** minimum (materials supply, delay penalties).

**Regulatory pillars embedded in seed (Arabic primary):**
| Theme | Clause keys | Pack(s) |
|-------|-------------|---------|
| SBC 1101 residential compliance | `*-SBC-1101-RESIDENTIAL` | fit_out, supervision, maintenance (SBC safety) |
| Balady permits & delay liability | `*-BALADY-PERMITS` | all 3 |
| Balady debris / waste delay | `*-BALADY-DEBRIS-DELAY` | fit_out |
| Hidden soil / rock (التربة الصخرية) | `*-SOIL-ROCK-EXCLUSION` | fit_out, supervision |
| Price escalation (>90 days auto-trigger) | `*-PRICE-ESCALATION` | all 3 (`autoTriggerRules.minDurationDays: 90`) |
| ZATCA VAT | `*-VAT-ZATCA` | all 3 |
| Phase sign-off (Live Room hook) | `SA-SUPERV-PHASE-SIGNOFF` | supervision |

**Seed command:** `npm run db:seed` (after migrate)

**Seed files:** `prisma/seed.ts` · `prisma/seed/clause-data.ts`

---

## 6. Migration Notes

1. Add new tables without breaking existing proposals
2. Backfill: existing proposals keep JSON assumptions/exclusions until re-generated
3. `reviewedSections[]` → map to `reviewGates` on first open after deploy
4. `GeneratedDocument.shareToken` → create matching `ProposalShareLink` for active exports (one-time script)

---

## 7. Out of Scope (Phase 1 — unchanged)

- Nafath / qualified e-sign
- Full BOQ / unit-rate BOQ
- CRM pipeline
- Real-time material price APIs
- Client accounts / login

---

*Next implementation step after this doc: Prisma migrate · seed clause packs · service layer for BOQ allocator + clause matcher · Review UI panels.*
