# Saudi Proposal OS — Single Core User Flow (SCUF)

> **Mode:** Pure Product Design  
> **Think:** Apple first experience, not SaaS system  
> **Goal:** One flow. One moment. Nothing else.

---

## 1. THE FIRST SCREEN

Not a landing page.

Not a sign-up form.

Not a dashboard.

**The first screen is a blank proposal form.**

The user arrives at `ruwaq.co` and sees:

```
┌──────────────────────────────────────────────────────┐
│  ruwaq                                       العربية │
│                                                      │
│  ┌──────────────────────────────────────────────────┐│
│  │                                                  ││
│  │     ✨ Create Your First Proposal                ││
│  │     It takes 2 minutes.                          ││
│  │                                                  ││
│  │     ┌────────────────────────────────────────┐   ││
│  │     │ What is the project name?              │   ││
│  │     └────────────────────────────────────────┘   ││
│  │     ┌────────────────────────────────────────┐   ││
│  │     │ What is the client company name?       │   ││
│  │     └────────────────────────────────────────┘   ││
│  │                                                  ││
│  │     [  Start Writing  →  ]                       ││
│  │                                                  ││
│  │     No account needed. No credit card.           ││
│  └──────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────┘
```

**No login wall.** The user starts creating immediately. The account is created AFTER the proposal is done, only if they want to save it.

**Why:** The worst thing a SaaS can do is ask for commitment before delivering value. Let the user taste the value first.

---

## 2. THE SINGLE FLOW (Step by Step)

### Step 1: Name the Project (15 seconds)

User types two things:
- Project name
- Client name

That's it. Two fields. No dropdowns. No city selector. No project type.

**The user presses Enter or clicks "Continue".**

---

### Step 2: Describe the Work (30 seconds)

A single textarea:

```
┌──────────────────────────────────────────────────────┐
│  Describe the work in your own words:                │
│                                                      │
│  ┌──────────────────────────────────────────────────┐│
│  │                                                  ││
│  │  Interior fit-out of a 300sqm villa in           ││
│  │  Riyadh. Includes flooring, painting,            ││
│  │  kitchen cabinets, bathroom fixtures,            ││
│  │  and lighting installation.                      ││
│  │                                                  ││
│  └──────────────────────────────────────────────────┘│
│                                                      │
│  [  ← Back  ]                    [  Generate  →  ]  │
└──────────────────────────────────────────────────────┘
```

**One field.** The user writes naturally — in Arabic or English. The AI understands everything.

**No dropdowns for project type. No city selector. No client type radio buttons.**
The AI extracts all of this from the description.

---

### Step 3: Tell Us the Budget (5 seconds)

```
┌──────────────────────────────────────────────────────┐
│  Total project budget:                               │
│                                                      │
│  ┌──────────────────────────────────────────────────┐│
│  │  SAR           [   185,000    ]                  ││
│  └──────────────────────────────────────────────────┘│
│                                                      │
│  How will you be paid?                               │
│                                                      │
│  ○ 30% down, 40% on delivery, 30% after handover     │
│  ○ Monthly installments                              │
│  ○ Fixed on completion                               │
│  ○ Custom                                            │
│                                                      │
│  [  ← Back  ]                    [  Generate  →  ]  │
└──────────────────────────────────────────────────────┘
```

**One number. One selection.** Default payment structure is pre-selected (the most common one).

---

### ⚡ THE AHA MOMENT: "Generate" (5 seconds of suspense, then magic)

User clicks **"Generate"**.

Loading state — not a spinner, but a subtle progress line:

```
┌──────────────────────────────────────────────────────┐
│  ✨ Ruwaq is writing your proposal...                │
│                                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━░░░░░░░░░░░░░  60%           │
│                                                      │
│  ✓ Analyzing your project...                         │
│  ✓ Writing scope of work...                          │
│  ▷ Building commercial terms...                      │
│  ☐ Assembling proposal...                            │
└──────────────────────────────────────────────────────┘
```

**~15 seconds later...**

The user sees a **complete, professional proposal document** — already rendered, already formatted, already beautiful:

```
┌──────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────┐│
│  │  PROPOSAL                                        ││
│  │  Villa Interior Fit-out — Al Malqa, Riyadh      ││
│  │                                                  ││
│  │  Prepared for: Ahmed Al-Otaibi                   ││
│  │  Prepared by: Your Company Name                  ││
│  │  Date: June 19, 2026                             ││
│  │                                                  ││
│  │  ──── SCOPE OF WORK ────                         ││
│  │                                                   ││
│  │  1. Flooring Installation                        ││
│  │     Supply and install porcelain tiles...        ││
│  │                                                   ││
│  │  2. Painting & Finishing                         ││
│  │     Interior painting with high-quality...       ││
│  │                                                   ││
│  │  3. Kitchen Cabinets                             ││
│  │     Custom-designed kitchen cabinets...          ││
│  │                                                   ││
│  │  ──── COMMERCIAL TERMS ────                       ││
│  │                                                   ││
│  │  Total Value: SAR 185,000                        ││
│  │  ── Payment Schedule ──                           ││
│  │  30% Down Payment:        SAR 55,500             ││
│  │  40% On Delivery:         SAR 74,000             ││
│  │  30% After Handover:      SAR 55,500             ││
│  │                                                   ││
│  │  ──── ASSUMPTIONS ────                            ││
│  │  • Client provides access during working hours    ││
│  │  • Materials specified are available in market    ││
│  │                                                   ││
│  │  ──── EXCLUSIONS ────                             ││
│  │  • Structural changes to walls                    ││
│  │  • Electrical and plumbing rough-in               ││
│  │                                                   ││
│  └──────────────────────────────────────────────────┘│
│                                                      │
│  [Edit]  [Download PDF]  [Copy WhatsApp]  [Send]    │
└──────────────────────────────────────────────────────┘
```

**This is the "aha moment."**

The user just wrote 3 sentences and got a **complete, professional, ready-to-send proposal** — something that normally takes 2–4 hours to write, format, and structure.

---

## 3. THE EXACT OUTPUT IN THE FIRST 60 SECONDS

| Time | Event |
|------|-------|
| **0s** | User lands on page |
| **10s** | Types project name + client name |
| **30s** | Types work description (or pastes it) |
| **40s** | Enters budget + selects payment plan |
| **45s** | Clicks "Generate" |
| **60s** | Sees complete proposal on screen |

**One minute. Three inputs. One button. A complete proposal.**

---

## 4. THE "AHA MOMENT"

**"I just wrote three sentences and got a complete proposal."**

That's it. That's the moment the user realizes:
- This saves me hours
- This is professional quality
- I can send this to a client RIGHT NOW
- I don't need Word, I don't need a template, I don't need to think about formatting

This moment happens in the **first 60 seconds**, before the user even creates an account.

---

## 5. WHAT IS REMOVED

Everything that doesn't directly serve the 60-second aha moment is **removed from the first flow**:

| Removed | Why |
|---------|-----|
| **Landing page** | The product IS the landing page. No hero section, no features grid, no testimonials. Just the form. |
| **Sign-up wall** | The user creates after value, not before. |
| **Project type dropdown** | AI extracts it from the description. |
| **City selector** | AI extracts it from the description. |
| **Client type selector** | AI extracts it. Not needed upfront. |
| **Start/End dates** | AI suggests timelines based on scope. User adjusts later. |
| **Detailed milestones** | AI generates standard milestones. User edits later. |
| **Assumptions & Exclusions editing** | AI generates them. User sees them in the result, can edit after. |
| **Warranty period** | AI generates standard warranty. User edits later. |
| **Company profile setup** | After the proposal is created, user is asked: "Want to add your company logo?" |
| **Dashboard** | User sees their proposal first. Dashboard is secondary. |
| **Template selection** | AI picks the right template from context. No choice needed. |
| **Language toggle** | AI detects language from input. |
| **Multiple payment options shown** | One default option selected. User clicks "Custom" only if needed. |
| **Any settings, any configuration, any onboarding** | Zero setup. Zero friction. Zero decisions before value. |

---

## 6. THE REVISED MVP — A SINGLE FLOW

The MVP is not a "product with features."

The MVP is **one screen, three inputs, one button, one output.**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   SCREEN 1: The Form (3 steps on one page)                  │
│                                                             │
│   ✨ Create a professional proposal in 2 minutes            │
│                                                             │
│   Project name ───────────────────────────────────────      │
│   Client name ────────────────────────────────────────      │
│                                                             │
│   Describe the work ──────────────────────────────────      │
│   ────────────────────────────────────────────────────      │
│   ────────────────────────────────────────────────────      │
│                                                             │
│   Budget ─────────── SAR ────────────────────────────       │
│   Payment ───── [ 30/40/30 ▼ ] ──────────────────────       │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              ✨ Generate Proposal                    │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   No account needed. Free. 2 minutes.                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   SCREEN 2: The Result (proposal document)                  │
│                                                             │
│   [Full proposal preview — beautiful, structured]           │
│                                                             │
│   [Download PDF] [Copy WhatsApp] [Send Email]               │
│                                                             │
│   ─── After export ───                                      │
│   "Create an account to save your proposals"                │
│   [Sign Up with Google] [Sign Up with Email]                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**That's it. That's the whole MVP.**

---

## 7. THE POST-AHA EXPERIENCE (AFTER THE FIRST USE)

Only after the user has experienced the aha moment:

1. **"Want to save this proposal? Create an account."** → Sign-up prompt
2. **"Add your company logo to make it yours."** → Logo upload
3. **"View all your proposals."** → Dashboard (list view)
4. **"Create another."** → Same flow, but now with pre-filled company info

Everything is progressive. Nothing is required before value.

---

## 8. ONE SENTENCE SUMMARY

> **The user types three things, waits 15 seconds, and gets a complete professional proposal they can send immediately — without signing up, without configuring anything, without learning anything.**

---

## 9. THE PRODUCT PRINCIPLE BEHIND THIS

**"Don't make the user set up the restaurant before they taste the food."**

Most SaaS products ask users to:
1. First, create an account
2. Then, configure your profile
3. Then, learn how to use the tool
4. Then, create something
5. Finally, see if it's valuable

This is backwards.

**Our flow:**
1. First, taste the value (60 seconds)
2. Then, if you liked it, create an account (to save)
3. Then, if you want, configure your profile (to brand)
4. Then, create more (faster each time)

The value comes BEFORE the commitment.

---

*End of Single Core User Flow v1.0*
