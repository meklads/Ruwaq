# Saudi Proposal OS — Database Design Specification (DDS)

> **Status:** Conceptual v1.0  
> **Author:** Database Architecture & Data Engineering Team  
> **Date:** June 2026  
> **Based on:** PRD v1.0 + TAS v1.0 + Domain Model v1.0  
> **Confidentiality:** Internal — Meklads / Ruwaq

---

## PART 1 — AGGREGATE ROOTS

### Philosophy

An aggregate root is the **entry point** to a cluster of domain objects that must be treated as a single unit for data changes. All access to entities within the aggregate happens **through** the root. This ensures consistency, enforces invariants, and prevents orphaned data.

We identify aggregate roots by asking: **"What entity has natural ownership over other entities, and cannot exist without them?"**

---

### Aggregate Root 1: User

| Aspect | Description |
|--------|-------------|
| **Ownership** | The User is the highest-level aggregate. It owns proposals, subscription, profile, and usage records. Nothing in the system exists without a User owner. |
| **Boundaries** | The User aggregate contains: User identity, authentication secrets (hashed), preferences, account status. It does NOT contain CompanyProfile (separate aggregate — different lifecycle). |
| **Responsibilities** | • Authenticate and authorize access<br>• Serve as the ownership anchor for all user-generated data<br>• Control account lifecycle (active → frozen → deleted)<br>• Maintain contact and preference data |
| **Why an aggregate root?** | A User exists independently. It is the "who" of the system. Every other aggregate is ultimately traceable to a User, but User does not depend on any other aggregate for its existence. |
| **Invariant rules** | • Email must be unique across all Users<br>• A User cannot be deleted if they have active Subscriptions (must cancel first)<br>• A User's proposals outlive the User for audit purposes (see Cascading Rules) |

---

### Aggregate Root 2: CompanyProfile

| Aspect | Description |
|--------|-------------|
| **Ownership** | Owned by exactly one User. However, it is a separate aggregate because it has its own lifecycle independent of User — a User can exist without a CompanyProfile, and the Profile can be updated without affecting the User's identity. |
| **Boundaries** | Contains: company name (Arabic + English), logo, brand colors, CR number, VAT number, contact info, address. Does NOT contain: User credentials, proposals, subscription info. |
| **Responsibilities** | • Provide branding assets for proposals<br>• Store legal/commercial identity<br>• Act as the "face" of the User to their clients |
| **Why an aggregate root?** | A CompanyProfile can be created, updated, and archived independently of the User. It has its own validation rules (CR number format, VAT format). It is referenced by Proposals as a snapshot — changes to the Profile do not cascade to historical proposals. This independence justifies separate aggregate status. |
| **Invariant rules** | • CR number and VAT number must be unique across all CompanyProfiles (no two companies with the same registration)<br>• A User can have at most one active CompanyProfile (for MVP; Brand Kit in V2 allows multiple) |

---

### Aggregate Root 3: Proposal

| Aspect | Description |
|--------|-------------|
| **Ownership** | Owned by exactly one User. The Proposal is the **core aggregate** of the system — everything revolves around creating, editing, finalizing, and exporting proposals. |
| **Boundaries** | Contains: all user inputs (project info, scope, timeline, commercial terms, fine print), all AI-generated content (scope items, deliverables, payment schedule, assumptions, exclusions), status and lifecycle data, version metadata. |
| **Responsibilities** | • Capture and validate all proposal inputs<br>• Orchestrate AI generation (via service layer, not data layer)<br>• Track lifecycle state (draft → generating → reviewing → completed → exported → archived)<br>• Produce GeneratedDocuments |
| **Why an aggregate root?** | A Proposal has its own lifecycle independent of other aggregates. It is the primary unit of work in the system. It contains or references all the data needed to generate a commercial offer. Its state transitions are governed by business rules that must be enforced atomically. |
| **Sub-entities within the aggregate** | • Input data (project info, scope, timeline, commercial, fine print)<br>• AI-generated content (scope items, payment schedule, assumptions, exclusions)<br>• Version metadata<br>• Section review status<br>These sub-entities have no meaning outside the Proposal — they are deleted when the Proposal is deleted. |
| **Invariant rules** | • A Proposal must have exactly one owner User<br>• A Proposal cannot transition to `completed` unless all sections are marked `reviewed`<br>• A Proposal in `exported` state is immutable (see Part 4)<br>• A Proposal version number increments on each finalized edit after export |

---

### Aggregate Root 4: Subscription

| Aspect | Description |
|--------|-------------|
| **Ownership** | Owned by exactly one User. The Subscription manages the commercial relationship between the User and the platform. |
| **Boundaries** | Contains: plan tier, status, billing period dates, trial data, cancellation metadata, payment provider references. Does NOT contain usage records — those are a separate aggregate (UsageRecord) that references Subscription by period. |
| **Responsibilities** | • Track current plan and status<br>• Manage billing lifecycle (trial → active → past_due → canceled → expired)<br>• Integrate with payment provider<br>• Determine feature access (via plan tier) |
| **Why an aggregate root?** | Subscription has its own lifecycle and external dependencies (payment provider). It changes independently of User data. A User can update their CompanyProfile or create Proposals without affecting Subscription state, and vice versa. |
| **Invariant rules** | • A User can have at most one active Subscription at any time<br>• Historical Subscriptions are preserved for audit (cannot be deleted)<br>• Plan changes take effect according to business rules (immediate for upgrade, end-of-period for downgrade)<br>• Trial cannot be extended programmatically |

---

### Aggregate Root 5: GeneratedDocument

| Aspect | Description |
|--------|-------------|
| **Ownership** | Belongs to exactly one Proposal. However, it is an aggregate root because it has its own lifecycle (generated → sent → viewed → expired) and is independently auditable. Additionally, a GeneratedDocument outlives the Proposal for legal/historical reasons (see Cascading Rules). |
| **Boundaries** | Contains: document metadata (type, format, file reference), delivery information (method, recipient if applicable), access controls (password, expiry), tracking data (view count — V2). |
| **Responsibilities** | • Represent an immutable export artifact<br>• Provide access control for shared links<br>• Track delivery and viewing (V2)<br>• Serve as the audit record of what was sent to the client |
| **Why an aggregate root?** | A GeneratedDocument is the only entity that outlives its parent Proposal when the Proposal is archived. It must be independently queryable ("find all documents sent to client X") and independently lifecycle-managed (links expire, documents are retained). |
| **Sub-entities within the aggregate** | • Access log entries (who viewed, when — V2)<br>These have no meaning outside the GeneratedDocument. |
| **Invariant rules** | • A GeneratedDocument is immutable once created (see Part 4)<br>• A share link cannot be changed after creation — a new link must be generated<br>• Expired documents return a controlled "not available" response, never an error |

---

### Aggregate Root 6: UsageRecord

| Aspect | Description |
|--------|-------------|
| **Ownership** | Owned by exactly one User, scoped to a billing period. Represents the consumption of billable resources. |
| **Boundaries** | Contains: period start/end, proposals count, AI calls count (V2), limits per the current plan. |
| **Responsibilities** | • Track usage against plan limits<br>• Provide data for "X of Y used" UI<br>• Enforce usage boundaries at proposal creation |
| **Why an aggregate root?** | UsageRecord is the source of truth for whether a User can perform a billable action. It is checked synchronously and must be accurate under concurrent access. Its lifecycle (reset at billing period) is independent of other aggregates. |
| **Invariant rules** | • Usage count is monotonic within a period — it only increases, never decreases<br>• A UsageRecord is immutable once the period ends (for audit)<br>• Usage limits are checked atomically (read + increment in one operation) |

---

### Summary: Aggregate Roots

| Aggregate | Owned By | Has Sub-entities | Lifecycle | Immutable After |
|-----------|----------|-----------------|-----------|-----------------|
| **User** | — (self) | Preferences, auth | Account lifecycle | Never (but audit trail) |
| **CompanyProfile** | User | — | Created → Archived | Never |
| **Proposal** | User | Inputs, AI content, versioning | Draft → Archived | Exported |
| **Subscription** | User | — | Trial → Expired | Period end |
| **GeneratedDocument** | Proposal | Access logs | Created → Expired | Creation |
| **UsageRecord** | User | — | Per period | Period end |

---

## PART 2 — ENTITY RELATIONSHIPS

### Relationship Map (Conceptual)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   ┌──────────────────────────────────────────────────┐          │
│   │                 USER (Aggregate)                  │          │
│   │  [identity] [preferences] [auth secrets]         │          │
│   └──┬──────┬──────────┬────────────┬───────────────┘          │
│      │      │          │            │                           │
│      │ 1:1  │ 1:1      │ 1:N        │ 1:N per period           │
│      ▼      ▼          ▼            ▼                           │
│   ┌────┐ ┌────────┐ ┌────────┐ ┌──────────────┐               │
│   │CP  │ │ Sub    │ │ Pro-   │ │ UsageRecord  │               │
│   │(0..│ │(1 only)│ │ posal  │ │ (1/period)   │               │
│   │1)  │ └────────┘ └───┬────┘ └──────────────┘               │
│   └────┘                │                                      │
│                         │ 1:N                                  │
│                         ▼                                      │
│                   ┌──────────┐                                 │
│                   │   GD     │                                 │
│                   │ (0..N)   │                                 │
│                   └──────────┘                                 │
│                                                                  │
│   Legend:                                                        │
│   CP = CompanyProfile                                            │
│   Sub = Subscription                                             │
│   GD = GeneratedDocument                                         │
│                                                                  │
│   Solid lines = Strong reference (child cannot exist without     │
│                  parent)                                         │
│   Dashed lines = Snapshot reference (historical copy, not live)  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

### Relationship Types

#### 1. One-to-One (1:1)

| Relationship | Type | Details |
|-------------|------|---------|
| **User → CompanyProfile** | 1:0..1 | A User may have zero or one active CompanyProfile. If deleted, the Profile is soft-deleted with the User. |
| **User → Subscription** | 1:1 (active) | A User has exactly one active Subscription record. Historical subscriptions are preserved (1:N over time, but 1:1 at any moment). |
| **User → UsageRecord** | 1:1 per period | A User has exactly one UsageRecord per billing period. |

**Design implication:** These are true 1:1 relationships where the foreign key can be on either side, but we place the foreign key on the dependent side (CompanyProfile has `user_id`, Subscription has `user_id`, UsageRecord has `user_id`).

#### 2. One-to-Many (1:N)

| Relationship | Type | Details |
|-------------|------|---------|
| **User → Proposal** | 1:N | A User owns many Proposals. This is the primary 1:N relationship. Proposals are strongly referenced — they cannot exist without a User owner. |
| **Proposal → GeneratedDocument** | 1:N | A Proposal produces many GeneratedDocuments (PDF, share link, re-exports). GeneratedDocuments are strongly referenced to the Proposal. |
| **Subscription → UsageRecord** | 1:N (over time) | A User's subscription history creates multiple UsageRecords (one per billing period). Historical records are preserved. |

**Design implication:** The child table always holds the foreign key to the parent. This is the standard database pattern.

#### 3. Snapshot References vs. Live References

| Relationship | Type | Purpose |
|-------------|------|---------|
| **Proposal → CompanyProfile** | Snapshot | When a Proposal is created, it copies the CompanyProfile data (logo URL, brand colors, company name) at that moment. Future changes to the CompanyProfile do NOT affect already-created Proposals. This preserves historical integrity. |
| **Proposal → Template** | Snapshot | The Template structure (sections, ordering) is copied at Proposal creation. If the platform updates a Template, existing Proposals are unaffected. |
| **GeneratedDocument → Proposal** | Live + Snapshot | The GeneratedDocument references the Proposal for context, but the actual document content is stored as an immutable file. The Proposal may later be updated (new version), but the GeneratedDocument remains a snapshot of what was sent. |

**Design implication:** Snapshot references are implemented by storing a copy of the relevant data at the time of creation, not a foreign key to a live entity that could change. This is critical for legal and audit purposes.

---

### Ownership Rules

| Rule | Explanation |
|------|-------------|
| **Strong ownership** | Proposal, GeneratedDocument, CompanyProfile, Subscription, UsageRecord are all strongly owned by User. If a reference says "this belongs to User," the User is the ultimate owner. |
| **No shared ownership** | Every record has exactly one owner. There is no co-ownership (until Team collaboration in V2, which introduces shared access, not shared ownership). |
| **Ownership chain** | User → Proposal → GeneratedDocument. A GeneratedDocument's ultimate owner is the User (through Proposal). This chain is used for authorization — "Can this User view this GeneratedDocument?" is answered by traversing the chain. |
| **Ownership cannot be transferred** | A Proposal cannot be transferred to another User. This keeps the data model simple and avoids complex authorization scenarios. |

---

### Lifecycle Relationships

| Relationship | Lifecycle Coupling |
|-------------|-------------------|
| **User → CompanyProfile** | Coupled: Profile is soft-deleted with User. But Profile can exist without User? No — it cannot. |
| **User → Subscription** | Loosely coupled: Subscription expires independently of User. User can have expired Subscription and still access exported proposals. |
| **User → Proposal** | Coupled for deletion, but not for modification. Proposal lives its own lifecycle (draft → archived) within the User's ownership. |
| **Proposal → GeneratedDocument** | Coupled: GeneratedDocument cannot exist without a Proposal. However, a GeneratedDocument outlives an archived Proposal (see Part 6). |
| **User → UsageRecord** | Coupled per period: UsageRecord is reset each billing period. Historical records are kept. |

---

### History Preservation Philosophy

**The system must never rewrite history.**

This means:
- When a CompanyProfile is updated, existing Proposals retain the old profile data (snapshot)
- When a Proposal is modified after export, a new version is created — the old version is preserved
- When a Subscription is changed, the old subscription record is archived, not deleted
- When a User changes their email, the old email is logged (for support/audit)

**Implementation pattern:** History is preserved either through:
1. **Snapshot copies** — storing data at creation time (Proposal → CompanyProfile)
2. **Immutable records** — never updating, only inserting new versions (Proposal versions)
3. **Audit logs** — recording changes as events (email changes, plan changes)

---

## PART 3 — DATA LIFECYCLES

### 3.1 Creation Patterns

Every record in the system follows a consistent creation pattern:

| Step | What Happens | Guarantee |
|------|-------------|-----------|
| 1. Identity assigned | A unique ID (UUID) is generated | No collision, no sequential guessing |
| 2. Ownership established | The owning User ID is set | Never null for owned entities |
| 3. Status initialized | Entity starts in its initial lifecycle state | Draft for Proposal, Trial for Subscription |
| 4. Timestamps set | created_at, updated_at recorded | Immutable created_at |
| 5. Snapshot taken (if needed) | External data copied (CompanyProfile, Template) | Future changes to originals don't affect this record |

**Rules:**
- No record is created without an owner (except system-level seed data like Templates)
- No record is created with a "final" status — all entities start in a preliminary state
- `created_at` is set once and never modified

---

### 3.2 Update Patterns

| Pattern | Description | Applied To |
|---------|-------------|------------|
| **Mutable** | Entity can be freely updated within its lifecycle | User preferences, CompanyProfile, Draft Proposals |
| **Append-only** | New data is added, existing data is never changed | Proposal versions, AI generation logs |
| **Status-only** | Only the status field changes, content is frozen | Proposal after `completed`, Subscription after `active` |
| **Immutable** | No updates allowed after a certain state | GeneratedDocument, UsageRecord after period end |

**Rules:**
- Every update touches `updated_at` timestamp
- For entities with versioning (Proposal), updates after export create a new version, never modify the old one
- Bulk updates are never allowed — every update is scoped to a single record

---

### 3.3 Archiving

Archiving is a **soft removal from active view**. The data still exists, is still queryable (with explicit archive filter), and is still counted for retention purposes.

| Entity | Archive Trigger | Archive Behavior |
|--------|----------------|-----------------|
| **Proposal** | User clicks "Archive" or auto-archive after 365 days of no activity | Status changes to `archived`. Hidden from default dashboard view. Still downloadable. Still counts toward storage. |
| **CompanyProfile** | User creates a new Profile (Brand Kit — V2) | Old Profile is archived. Cannot be used for new Proposals. Existing Proposals retain their snapshot. |

**Archiving is NOT:**
- A performance optimization (we don't move data to "cold storage")
- A deletion (data is fully recoverable)
- A way to bypass usage limits (archived proposals do not reduce usage count)

---

### 3.4 Soft Deletion

Soft deletion is a **recoverable removal**. The record is marked as deleted but retained for a recovery period.

| Entity | Soft Delete Trigger | Recovery Period | Hard Delete After |
|--------|--------------------|-----------------|-------------------|
| **User** | User initiates account deletion | 30 days | 90 days (allows for 30-day recovery + 60-day grace) |
| **Proposal** | User deletes a draft proposal | 30 days | 30 days |
| **GeneratedDocument** | Never soft-deleted (immutable) | N/A | N/A |
| **CompanyProfile** | Deleted with User account | 30 days | 90 days |

**Soft deletion rules:**
- Soft-deleted records are excluded from all queries by default (WHERE deleted_at IS NULL)
- Admins can query soft-deleted records for recovery
- Soft-deleted records count toward storage quotas
- During the recovery period, the User (or support) can restore the record
- After the hard delete period, the record is permanently removed

---

### 3.5 Hard Deletion (Permanent Removal)

Hard deletion is **irreversible data destruction**. It must be:
- Delayed (never immediate — always a grace period)
- Logged (a record of what was deleted is kept)
- Limited (only certain entities qualify)

| Entity | Hard Delete Condition | What Is Deleted | What Remains |
|--------|----------------------|-----------------|--------------|
| **User** | 90 days after soft delete | User record, CompanyProfile, Draft proposals | Exported GeneratedDocuments (anonymized), audit logs, billing records |
| **Proposal (Draft)** | 30 days after soft delete | Proposal record + all associated data | Nothing — but if any GeneratedDocument existed (unlikely for draft), it remains |
| **Proposal (Exported)** | Never hard deleted | N/A | N/A — exported proposals are permanent |
| **GeneratedDocument** | Never hard deleted | N/A | N/A — these are permanent audit records |
| **Subscription** | Never hard deleted | N/A | N/A — billing history is permanent |
| **UsageRecord** | 7 years after period end | N/A | N/A — retained for tax/accounting purposes |

**Why some entities are never hard deleted:**
- **GeneratedDocument:** Legal requirement — a proposal that was sent to a client may need to be referenced years later
- **Subscription:** Accounting requirement — billing history must be retained
- **UsageRecord:** Tax requirement — usage may be tied to invoicing

---

### 3.6 Retention Periods Summary

| Data Category | Active | Frozen (Expired) | Deleted | Permanent |
|---------------|--------|------------------|---------|-----------|
| User identity | Indefinite | 90 days | 30 days soft + 60 days grace | — |
| CompanyProfile | Indefinite | 90 days | 30 days soft | — |
| Draft Proposals | Indefinite | 90 days | 30 days soft | — |
| Exported Proposals | Indefinite | Indefinite (read-only) | — | Indefinite |
| GeneratedDocuments | Indefinite | Indefinite (read-only) | — | Indefinite |
| Subscription history | Indefinite | Indefinite | — | Indefinite |
| UsageRecords | Indefinite | Indefinite | — | 7 years |
| AI logs | 90 days | — | — | — (anonymized after 90 days) |

---

### 3.7 Historical Integrity

**Principle: The past must always be knowable.**

This means:
- When a Proposal is updated (new version), the old version remains queryable
- When a CompanyProfile is updated, old Proposals still show the old profile
- When a Template is modified, existing Proposals retain the old template structure
- When a User changes their name/email, old proposals still show the name/email at time of creation

**Implementation:**
1. **Snapshot at creation** — Copy relevant external data at the moment of Proposal creation
2. **Version chaining** — Each Proposal version links to its predecessor
3. **Event logging** — All entity changes of significance are logged as events

---

## PART 4 — IMMUTABILITY RULES

### 4.1 Which Records Are Immutable

| Record Type | Immutable From | Rationale |
|-------------|---------------|-----------|
| **GeneratedDocument** | Moment of creation | A proposal sent to a client must never change. It is a legal document. The client received exactly this content on this date. |
| **Proposal (body content)** | After `completed` status | Once the user has reviewed and approved all sections, the content is locked. Edits create a new version. The `completed` snapshot is preserved. |
| **Export event log** | Moment of logging | "This user exported proposal X on date Y via method Z" — this is an audit fact that cannot be altered. |
| **UsageRecord (after period end)** | End of billing period | Usage data for a closed period must be fixed for accurate billing and accounting. |
| **Subscription (after period end)** | End of billing period | Historical subscription data is needed for churn analysis, accounting, and customer support. |
| **AI generation log** | Moment of logging | Essential for debugging, quality improvement, and cost analysis. Cannot be reconstructed if altered. |

### 4.2 Why Immutability Matters

**Legal protection:**
The most important reason. If a client disputes what was promised in a proposal, the version that was sent must be provably the version that was sent. If the system allows retroactive editing, the legal value of the entire platform collapses.

**Audit integrity:**
An auditor (financial, compliance, or internal) must be able to trust that records have not been altered. Immutable records provide this trust.

**Reproducibility:**
If a bug is discovered in AI generation or PDF rendering, immutable records allow us to reproduce the exact issue with the exact data that was used at the time.

**User trust:**
Users need to trust that what they sent to their client is exactly what the client received. This trust is the foundation of the platform's value proposition.

### 4.3 How Immutability Is Enforced

**At the application layer:**
- State-dependent write permissions — a Proposal in `completed` status cannot be edited through any API endpoint
- Version creation on edit — modifying a completed Proposal creates a new version, never modifies the old one

**At the data layer:**
- Some records use append-only patterns (new rows inserted, old rows never updated)
- Some records use write-once patterns (created_at = updated_at, never modified)
- Deletion is never allowed for immutable records

**At the storage layer:**
- GeneratedDocuments are stored as files with checksums. Any modification would change the checksum, which is detected.
- Database-level permissions can prevent accidental updates (future — when we need stricter controls)

### 4.4 Exceptions to Immutability

There are no exceptions for user-facing data. However:

| Scenario | What Happens | Is This an Exception? |
|----------|-------------|----------------------|
| A PDF contains a typo in the company name | User creates a new version of the proposal (v2). The original (v1) is preserved as the "sent" version if it was exported. | No — immutability is preserved. The fix is a new version. |
| A share link expires and needs to be extended | A new GeneratedDocument is created with the new expiry date. The old link stops working on its original expiry date. | No — the old document record is immutable. A new one is created. |
| Legal requirement to delete a User's data (GDPR/PDPL) | Personal data (name, email) is anonymized. GeneratedDocuments remain but with "Deleted User" attribution. | Partial exception — data is modified, but the document body is preserved. The anonymization is logged. |

---

## PART 5 — AUDITABILITY

### 5.1 Audit Philosophy

**Audit is not a feature — it is a property of the data model.**

This means auditability is built into the architecture, not added as an afterthought. Every significant business event should be:
1. **Recorded** — stored as a fact with timestamp and actor
2. **Immutable** — never altered after recording
3. **Queryable** — accessible for support, compliance, and analysis
4. **Minimal** — we record what matters, not everything (avoiding audit log bloat)

### 5.2 What Should Be Auditable

| Event Category | Specific Events | Why Audit Matters |
|---------------|----------------|-------------------|
| **Proposal Lifecycle** | Creation, generation, completion, export, archive, deletion | Trace the full lifecycle of a proposal for support and legal inquiries |
| **AI Generation** | Each AI call (stage, tokens, latency, success/failure) | Debug AI issues, track costs, improve prompts |
| **Subscription Changes** | Plan change, cancel, reactivate, payment failure, expiry | Customer support, churn analysis, revenue assurance |
| **Export Actions** | Download, email, WhatsApp copy, share link generation | Track how proposals are delivered, detect abuse |
| **User Account Changes** | Email change, password reset, profile update, deletion request | Security, compliance (PDPL/GDPR) |
| **Billing Events** | Invoice created, payment received, payment failed, refund | Accounting, revenue reconciliation |

### 5.3 Audit Patterns

| Pattern | Description | Used For |
|---------|-------------|----------|
| **Immutable entity records** | Records that are written once and never updated | GeneratedDocuments, UsageRecords, AI logs |
| **Status history** | A separate table/collection that tracks status changes over time | Proposal status changes, Subscription status changes |
| **Event log** | A centralized event log for significant business events | Exports, account changes, billing events |

**The Event Log pattern** (recommended for MVP):
```
For each auditable event, record:
- Event type (e.g., "proposal.exported")
- Actor ID (User who performed the action)
- Target ID (the entity affected — proposal_id, subscription_id, etc.)
- Context JSON (relevant data — export method, plan tier, etc.)
- Timestamp (when it happened)
- IP address / user agent (security context)
```

**Rules:**
- Event logs are append-only
- Event logs are never deleted (retained indefinitely)
- Event logs are indexed by actor, target, type, and timestamp
- Event logs are separate from business data — they are a cross-cutting concern

### 5.4 Audit Retention

| Audit Data | Retention | Rationale |
|-----------|-----------|-----------|
| User account changes | 7 years | Security and compliance |
| Proposal lifecycle events | Lifetime of the proposal + 7 years | Legal |
| Subscription changes | 7 years | Accounting |
| Billing events | 10 years | Tax and accounting (KSA ZATCA requirements) |
| AI generation logs | 90 days (raw), 2 years (aggregated) | Cost and quality analysis |
| Export events | Lifetime of the document | Legal |

---

## PART 6 — CASCADING RULES

### 6.1 If User Is Soft-Deleted

| Entity | What Happens | Detail |
|--------|-------------|--------|
| **CompanyProfile** | Soft-deleted | Cascade from User. No CompanyProfile should exist without a User. |
| **Draft Proposals** | Soft-deleted | Cascade from User. Drafts have no legal value. |
| **Completed/Exported Proposals** | Anonymized | Proposal content remains intact. The User reference is changed to a "Deleted User" placeholder. The snapshot of CompanyProfile (company name, logo) is preserved as-is. |
| **GeneratedDocuments** | Preserved | These are legal records. They remain accessible via their share link. Attribution is anonymized ("This proposal was created by a user who has since deleted their account"). |
| **Subscription** | Canceled (if active) | Subscription is marked as canceled. No further billing. |
| **UsageRecord** | Preserved | Historical usage data is kept for accounting. |
| **AI Logs** | Anonymized | User ID is removed from AI logs. Logs are retained for quality analysis. |

**Why exported proposals are preserved:**
A proposal that was sent to a client is a legal document. The client may have relied on it. Deleting it would be irresponsible and potentially legally problematic. Anonymization balances privacy with legal preservation.

### 6.2 If Proposal Is Archived

| Entity | What Happens | Detail |
|--------|-------------|--------|
| **GeneratedDocuments** | Preserved | Share links continue to work (unless individually expired). PDFs remain downloadable. |
| **Proposal content** | Frozen | Archived proposals are immutable. No further edits (without creating a new version, which would be a new Proposal). |
| **UsageRecord** | Unaffected | The usage was already counted at creation. Archiving does not refund or reduce usage count. |

**Transition:** Archived proposals can be restored (unarchived) by the User. This changes status back to `completed` or `draft` (depending on the original state).

### 6.3 If Subscription Expires

| Entity | What Happens | Detail |
|--------|-------------|--------|
| **Exported Proposals** | Accessible (read-only) | User can still download previously exported PDFs. This is a trust signal — we don't hold data hostage. |
| **Draft Proposals** | Frozen | Visible but cannot be edited or generated. User sees "Upgrade to continue working on this proposal." |
| **New Proposal creation** | Blocked | Usage limit enforced at creation check. Blocked with upgrade prompt. |
| **CompanyProfile** | Editable | Users can still update their profile (preparing to come back). |
| **GeneratedDocuments** | Accessible via existing links | Share links continue to work. New links cannot be generated. |

**Philosophy:** We want users to return. Making their data completely inaccessible creates resentment. Read-only access keeps them engaged and more likely to upgrade.

### 6.4 If CompanyProfile Changes

| Impact | What Happens |
|--------|-------------|
| **Existing Proposals (completed/exported)** | Unaffected. They retain the snapshot of the profile at time of creation. |
| **Proposals in Draft/Reviewing** | Updated to reflect the new profile. The draft will use the current profile. |
| **Future Proposals** | Use the new profile automatically. |

**Why existing exported proposals are not updated:**
The proposal that was sent to a client should not retroactively change its branding. Imagine if a company rebrands and all their old proposals suddenly show the new logo — this would cause confusion and potentially legal issues.

### 6.5 If Template Changes (Platform-Level)

| Impact | What Happens |
|--------|-------------|
| **Existing Proposals** | Unaffected. They used the template structure at creation time. |
| **New Proposals** | Use the new template version. |

**Why:** Same as CompanyProfile — historical integrity. A proposal created with a specific template layout should keep that layout.

### 6.6 If User Is Hard-Deleted (After 90 Days)

| Entity | What Happens |
|--------|-------------|
| **User identity record** | Permanently deleted (except anonymized reference in audit logs). |
| **CompanyProfile** | Permanently deleted. |
| **Draft Proposals** | Permanently deleted. |
| **Completed/Exported Proposals** | Anonymized (if not already — this was done at soft delete). Content preserved. |
| **GeneratedDocuments** | Preserved permanently. |
| **Subscription history** | Preserved (anonymized). |
| **UsageRecords** | Preserved (anonymized). |
| **AI Logs** | Preserved (anonymized — done at soft delete). |

---

## PART 7 — FUTURE EXPANSION

### 7.1 Philosophy: The Platform Is a Foundation

The Saudi Proposal OS is the **first product** on a platform designed to host multiple products. The database architecture must accommodate:
- **Contract OS** — Generate contracts from proposal data
- **Site Report OS** — Generate site visit / inspection reports
- **Construction Suite** — Project management documentation

Without requiring:
- Schema changes to existing modules
- Data migration for existing users
- Breaking changes to existing APIs

### 7.2 Multi-Module Data Architecture

The principle is simple: **Each module owns its data. Shared data lives once.**

```
┌─────────────────────────────────────────────────────────┐
│                    SHARED KERNEL                         │
│  ┌──────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │  User    │  │ CompanyProfile │  │  Subscription  │  │
│  │  (auth,  │  │ (branding,     │  │  (billing,     │  │
│  │  prefs)  │  │  legal info)   │  │  plans)        │  │
│  └──────────┘  └────────────────┘  └────────────────┘  │
│  ┌──────────┐  ┌────────────────┐                      │
│  │  Usage   │  │   Audit Log    │                      │
│  │  Record  │  │   (events)     │                      │
│  └──────────┘  └────────────────┘                      │
└─────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  PROPOSAL OS    │  │   CONTRACT OS   │  │  SITE REPORT OS │
│  ┌────────────┐ │  │  ┌────────────┐ │  │  ┌────────────┐ │
│  │ Proposal   │ │  │  │ Contract   │ │  │  │ SiteReport │ │
│  │ Inputs     │ │  │  │ Clauses    │ │  │  │ Inspections│ │
│  │ AI Content │ │  │  │ Signatures │ │  │  │ Photos     │ │
│  │ Generated  │ │  │  │ Templates  │ │  │  │ Findings   │ │
│  │ Documents  │ │  │  │ Versions   │ │  │  │ Attachments│ │
│  └────────────┘ │  │  └────────────┘ │  │  └────────────┘ │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 7.3 How Each Module Extends the Platform

**Step 1: Define the module's aggregate root(s)**
- Contract OS → `Contract` aggregate
- Site Report OS → `SiteReport` aggregate
- Each module has its own aggregate root that follows the same patterns as Proposal

**Step 2: Reference the shared kernel**
- Each module's aggregate references `User` (owner) and `CompanyProfile` (snapshot)
- These references are by ID — no foreign key constraints across module boundaries (decoupled)
- The shared kernel entities are never modified by modules

**Step 3: Owned data lives in the module's scope**
- Contract OS data is stored separately from Proposal OS data
- They share the same database instance (monolith), but in separate schema/table groups
- No cross-module queries (except through the shared kernel)

**Step 4: Consistent patterns**
- Each module uses the same lifecycle pattern: Draft → Completed → Exported → Archived
- Each module produces GeneratedDocuments (immutable exports)
- Each module consumes UsageRecords from the shared kernel
- Each module inherits Subscription-based access control from the shared kernel

### 7.4 What Does NOT Change When a New Module Is Added

- **User table** — no new columns, no new relationships
- **CompanyProfile** — no changes
- **Subscription** — no changes (plans may be updated to include new modules, but the structure stays)
- **UsageRecord** — may get a `module` discriminator (which module is the usage for), but the core structure stays
- **Audit Log** — no changes (event types grow, but the log schema is fixed)
- **Authentication system** — no changes
- **Billing integration** — no changes (module access is a feature flag on the plan)

### 7.5 What Changes When a New Module Is Added

- **New aggregate tables** for the module's domain data
- **New GeneratedDocuments** (or reuse the existing GeneratedDocument pattern)
- **New templates** (module-specific)
- **New AI prompts** (module-specific)
- **Feature flags** updated to control access to the new module

### 7.6 Data Isolation Between Modules

| Principle | Rationale |
|-----------|-----------|
| Modules do not directly reference each other's data | A Proposal should not query Contract data directly. If cross-module features are needed (e.g., "Generate contract from this proposal"), they go through a service layer, not a direct data join. |
| Modules share the User identity, not User data | Both modules know "User X exists," but neither module depends on the other's data structures. |
| Schema namespacing | Each module's tables are in a clearly named group (e.g., `proposal_*`, `contract_*`, `site_report_*`), even within the same database. |

---

## PART 8 — ANTI-CORRUPTION PRINCIPLES

### 8.1 No Circular Dependencies

**Rule:** Entity A can reference Entity B, but B must never reference A. The dependency graph must be a directed acyclic graph (DAG).

**Correct:**
```
User ← Proposal ← GeneratedDocument
User ← Subscription
Proposal → CompanyProfile (snapshot)
```

**Incorrect:**
```
Proposal → CompanyProfile → Proposal  (circular)
GeneratedDocument → Subscription → GeneratedDocument (circular)
```

**How we enforce this:**
- Ownership always flows downward (User → Proposal → GeneratedDocument)
- Cross-aggregate references are by ID only, never bidirectional
- Snapshot copies eliminate the need for back-references (Proposal doesn't need to query CompanyProfile — it already has the data it needs)

### 8.2 No Orphan Records

**Rule:** Every record must have a traceable owner chain. No record should exist in the database without a path to a User (or a system account for seed data).

**Pattern:**
```
User <── Proposal <── GeneratedDocument
User <── CompanyProfile
User <── UsageRecord
User <── Subscription
```

**Guardrails:**
- Foreign key constraints (at the database level) enforce referential integrity
- Application-level checks verify ownership before any operation
- Scheduled integrity checks scan for orphaned records and alert (future)

**Exception:** Audit logs reference entities that may have been deleted (User). In this case, the User reference is optional (nullable or replaced with "Deleted User" placeholder).

### 8.3 No Shared Mutable State

**Rule:** Two aggregates should never directly modify the same data record. Each aggregate owns its data exclusively.

**Correct:**
- Proposal owns its inputs, AI content, and status
- Subscription owns its plan, period, and status
- Each modifies only its own data

**Incorrect:**
- Proposal tries to update UsageRecord directly (should go through a service)
- Subscription directly modifies Proposal access (should be checked at query time)

**Coordination pattern:**
When one aggregate needs data from another:
1. Read the data (query the aggregate's public interface)
2. Make a decision
3. Act only on your own aggregate

When one aggregate's action affects another:
1. The service layer orchestrates the interaction
2. Each aggregate is updated independently within a transaction
3. No aggregate directly modifies another aggregate's data

### 8.4 No Data Duplication (Without Intent)

**Rule:** Duplicate data is only acceptable when it serves a purpose (snapshot for immutability, cache for performance). Accidental duplication is forbidden.

**Intentional duplication (acceptable):**
- CompanyProfile data is duplicated in each Proposal (snapshot for historical integrity)
- Template structure is duplicated in each Proposal (snapshot for consistency)

**Unintentional duplication (forbidden):**
- Storing the User's name in both User table and Proposal table directly (Proposal should store a snapshot of the CompanyProfile, not the User's personal name)
- Storing Subscription plan name in UsageRecord (UsageRecord should reference the plan by ID)

**How we prevent unintended duplication:**
- Every data field has a "single source of truth" defined in the domain model
- If a field appears in more than one place, the reason must be documented (usually: snapshot for immutability)
- Code reviews flag unexplained data duplication

### 8.5 No Leaky Abstractions

**Rule:** The database structure should not expose implementation details that other modules (or external systems) depend on, unless part of a stable API.

**What this means in practice:**

| Leaky Abstraction | Why It's a Problem | How We Avoid It |
|-------------------|-------------------|-----------------|
| Exposing AI prompt structures in the Proposal data | External systems or future modules might depend on a specific prompt format, making it impossible to change prompts | AI prompts and their outputs are internal to the Proposal aggregate. External access is through the proposal content, not raw prompt/response pairs. |
| Exposing payment provider IDs in the Proposal data | If we switch from Stripe to Moyasar, we don't want Proposal data referencing Stripe-specific IDs | Payment provider references are isolated in the Subscription aggregate. Proposal has no knowledge of payment infrastructure. |
| Exposing internal IDs to clients via share links | If the share link encodes a database ID, clients can guess other document IDs | GeneratedDocuments use opaque UUIDs for external references. Internal sequential IDs (if any) are never exposed. |
| Direct table access from modules | If Contract OS queries Proposal tables directly, a schema change in Proposal breaks Contract | Modules communicate through service interfaces, not direct data access. |

**The stable surface:**
The only data structures that are "public" (stable, versioned, accessible across modules) are:
- User identity (ID, email, name — read-only for modules)
- GeneratedDocument (ID, type, status, metadata)
- Event log (for cross-module audit)

Everything else is internal to its aggregate and subject to change.

### 8.6 Transaction Boundaries

**Rule:** A transaction should span exactly one aggregate. Cross-aggregate operations use eventual consistency or a saga pattern.

| Scenario | Approach |
|----------|----------|
| Creating a Proposal with User validation | Single transaction on Proposal aggregate. User validation is a read-only check. |
| Creating a Proposal and incrementing UsageCount | Two transactions: (1) create Proposal, (2) increment UsageCount. If step 2 fails, the Proposal still exists (orphaned). Mitigation: scheduled cleanup of proposals with no usage record. |
| Upgrading Subscription | Single transaction on Subscription aggregate. Feature access is determined at query time based on current plan. |

**Why we avoid cross-aggregate transactions:**
- They create coupling between aggregates
- They increase lock contention
- They make the system harder to scale (distributed transactions if aggregates are in different databases)

**Compensation pattern:**
For operations that span aggregates (like creating a proposal + recording usage), we use a "compensating action" pattern:
1. Create the Proposal (succeeds independently)
2. Record the usage (if this fails, a background job retries)
3. If usage cannot be recorded after 5 retries, the Proposal is flagged for admin review

---

## Appendix: Summary of Architectural Rules

| Rule | Category | Enforcement Level |
|------|----------|-------------------|
| Every record has exactly one owner | Ownership | Database (FK) + Application |
| No circular references | Dependency | Design review + Code review |
| Immutable records are never updated | Immutability | Application (state-based access control) |
| Historical data is preserved via snapshots | History | Application (creation logic) |
| Audit events are append-only | Audit | Application (no update API) |
| Usage counts are monotonic | Usage | Application (atomic increment) |
| Cross-aggregate operations use compensation pattern | Transactions | Application (saga/retry logic) |
| Modules do not reference each other's data | Modularity | Design review + Code review |
| Soft delete precedes hard delete | Deletion | Application + Scheduled job |
| Soft-deleted records are excluded by default | Query | Application (default scope) |

---

*End of Database Design Specification v1.0*

*This document defines the conceptual data architecture. The physical schema (tables, columns, indexes) will be designed in the next phase, informed by these principles.*
