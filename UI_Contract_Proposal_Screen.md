# Saudi Proposal OS — UI Contract: Generated Proposal Screen

> **Mode:** UI/UX Design Only  
> **Inspiration:** Notion editing · Linear clarity · Stripe reading experience  
> **Flow Position:** After AI generation completes → This screen

---

## 1. LAYOUT STRUCTURE

### Overall Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│  TOP BAR (sticky)                                                    │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ ← Back to Form    │  🔄 Regenerate   📄 Download PDF  ···     ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  PROPOSAL TITLE AREA                                            ││
│  │  Villa Interior Fit-out — Al Malqa, Riyadh                     ││
│  │  Prepared for: Ahmed Al-Otaibi                                  ││
│  │  Prepared by: [Your Company Name]                               ││
│  │  Date: June 19, 2026                                            ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  SECTION: Scope of Work                                         ││
│  │  ┌── item 1 ───────────────────────────────────────────────────┐││
│  │  │  1. 🖊️ Flooring Installation                               │││
│  │  │     Supply and install porcelain tiles...                   │││
│  │  └─────────────────────────────────────────────────────────────┘││
│  │  ┌── item 2 ───────────────────────────────────────────────────┐││
│  │  │  2. 🖊️ Painting & Finishing                                │││
│  │  │     Interior painting with high-quality...                  │││
│  │  └─────────────────────────────────────────────────────────────┘││
│  │  ┌── item 3 ───────────────────────────────────────────────────┐││
│  │  │  3. 🖊️ Kitchen Cabinets                                    │││
│  │  │     Custom-designed kitchen cabinets...                     │││
│  │  └─────────────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  SECTION: Commercial Terms                                      ││
│  │  Total Value:  SAR 185,000 🖊️                                 ││
│  │  ── Payment Schedule ──                                         ││
│  │  30% Down Payment        55,500 SAR 🖊️                        ││
│  │  40% On Delivery         74,000 SAR 🖊️                        ││
│  │  30% After Handover      55,500 SAR 🖊️                        ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  SECTION: Assumptions ⚠️                                       ││
│  │  • Client provides site access during working hours 🖊️        ││
│  │  • Materials are available in Saudi market 🖊️                 ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  SECTION: Exclusions ⚠️                                        ││
│  │  • Structural modifications 🖊️                                ││
│  │  • External landscaping 🖊️                                    ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  BOTTOM BAR (sticky)                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  ✅ All sections reviewed     │  [  📄 Download PDF  ]  ···    ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### Section Types

| Section | Visual Treatment | AI Confidence |
|---------|-----------------|---------------|
| **Proposal Title** | Large, bold, centered above the document | Always high (user-identified) |
| **Scope of Work** | Numbered list, each item is a card | Confidence shown per item |
| **Deliverables** | Bullet list (if present) | Per-item badge |
| **Commercial Terms** | Table layout with numbers right-aligned | Section-level indicator |
| **Timeline** | Simple date line or milestone table | Section-level |
| **Assumptions** | Bullet list with ⚠️ header | Always flagged (legal caution) |
| **Exclusions** | Bullet list with ⚠️ header | Always flagged (legal caution) |

### Empty/Fallback States

| Condition | What Shows |
|-----------|-----------|
| AI generated 0 scope items | "AI couldn't generate scope items. [Write manually] or [Regenerate]" |
| AI confidence very low on a section | Section header shows 🟡 "AI estimated — tap to adjust" instead of ⚠️ |
| User clears a section entirely | Shows empty state: "Write your own scope of work" with textarea |

---

## 2. EDITING MECHANISM

### Decision: INLINE EDITING (Not panel, not modal)

**Why:** The user should never leave the document to edit it. Editing is a direct manipulation of the content, not a separate operation.

### How It Works

| Action | Behavior |
|--------|----------|
| **Click 🖊️ icon** | Text becomes editable (like Notion — click to edit, no mode switch) |
| **Click directly on text** | Same as clicking 🖊️ — text becomes editable |
| **Editing state** | Text shows a subtle border/background change (very light gray, no jumping) |
| **Press Enter** | Scope items: creates a new item below. Others: saves the edit. |
| **Press Escape** | Cancels edit, reverts to original text |
| **Click outside** | Saves the edit (auto-save on blur) |
| **Tab** | Moves to next editable field (within a section) |

### Visual States

```
Default:      🖊️ 1. Flooring Installation (text with pencil icon)
Hover:        🖊️ 1. Flooring Installation (pencil becomes slightly blue)
Editing:      ┌─────────────────────────────────┐
              │ 1. Flooring Installation         │  ← light gray background
              │ Supply and install porcelain...  │     blue left border
              └─────────────────────────────────┘
Saved:        ✓ 1. Flooring Installation (brief checkmark, 1 second, fades)
```

### What Can Be Edited

| Element | Editable? | How |
|---------|-----------|-----|
| Project name | ✅ Yes | Click title text |
| Client name | ✅ Yes | Click text |
| Scope item title | ✅ Yes | Click 🖊️ or text |
| Scope item description | ✅ Yes | Click 🖊️ or text |
| Total value | ✅ Yes | Click number → number input |
| Payment percentages | ✅ Yes | Click percentage → slider or number input |
| Milestone descriptions | ✅ Yes | Click text |
| Assumptions | ✅ Yes | Click text |
| Exclusions | ✅ Yes | Click text |
| Section headings | ❌ No | Fixed (AI generates, but user can regenerate) |
| Empty space | ➕ Add item | Click "+ Add item" at bottom of any list section |

### Adding Items (Not Just Editing)

```
At the bottom of Scope of Work section:

    4. 🖊️ [ Click to add another scope item... ]  ← placeholder, click to type

Same for Assumptions, Exclusions, Deliverables.
```

### Deleting Items

- Select an item → press Backspace on empty text → item is removed
- Or: hover item → three-dot menu → "Delete"
- Deletion is soft: "Undo" link appears for 5 seconds at bottom of section

---

## 3. AI CONFIDENCE VISUALIZATION

### Philosophy

The user is not an AI engineer. They don't need to know "confidence scores." They need to know:
- "This looks right" → no indicator (most content)
- "Check this before sending" → subtle flag (some content)
- "AI guessed this, please confirm" → visible flag (rare)

### Three States

| State | Visual | Meaning | Frequency |
|-------|--------|---------|-----------|
| ✅ **High confidence** | No indicator. Normal text. | "We're confident this is accurate for your project type." | ~70% of content |
| 👁️ **Review suggested** | Section header has subtle gray badge: "review" | "We generated this from limited context. Quick check recommended." | ~25% of content |
| ⚠️ **Please verify** | Section header has yellow badge: "⚠️ AI estimated" | "AI made its best guess. Please confirm before sending." | ~5% of content |

### Visual Detail

```
High confidence (no indicator):

    Scope of Work
    1. Flooring Installation
       Supply and install...

Review suggested (gray badge):

    Assumptions  [ review ]        ← subtle, no color
    • Client provides site access...

Please verify (yellow badge):

    Timeline  [ ⚠️ AI estimated ]   ← yellow, visible but not alarming
    • Duration: 6 weeks
```

**The badge is on the section header, not on individual items.** This prevents visual clutter. If a section needs review, the whole section is flagged — the user checks it as a group.

### Badge Interaction

| Action | Behavior |
|--------|----------|
| **Click "review" badge** | Highlights all items in that section with a brief animation (1 second pulse) |
| **Click "⚠️ AI estimated" badge** | Expands a small tooltip: "This section was generated from limited information. Tap any item to edit." |
| **User edits an item in a flagged section** | Badge becomes "reviewed" on that item. When all items are edited, section badge disappears. |
| **User does nothing** | Badge stays. User can still download PDF. Badge does NOT block export. |

### When Confidence Is Very Low (Edge Case)

If AI confidence is critically low on the entire proposal (e.g., user wrote "fix house" as the only input):

```
The proposal loads normally, but the top bar shows:

⚠️ This proposal was generated from minimal input. 
   [Add more detail for better results]  [Continue anyway]
```

This is a **dismissible banner**, not a blocking modal. User can continue, edit, and export. The banner disappears once user edits any section.

---

## 4. WARNINGS DISPLAY

### Philosophy

Warnings inform. They do not alarm. They do not block. They do not accumulate.

### Warning Types

| Type | Visual | Location | Behavior |
|------|--------|----------|----------|
| **Section needs review** | `[ review ]` gray badge | Section header | Static. Disappears when user edits the section. |
| **AI estimated** | `[ ⚠️ AI estimated ]` yellow badge | Section header | Static. Disappears when user confirms or edits. |
| **Minimal input warning** | Yellow banner | Below top bar | Dismissible. Disappears on edit or close. |
| **Legal disclaimer** | Small gray italic text | Footer of Assumptions/Exclusions | Always visible at section bottom. Not a warning — just a note. |

### Legal Disclaimer (Always Present)

```
At the bottom of Assumptions and Exclusions sections:

    ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
    ℹ️ AI-generated draft. Review before sending to client.
```

This is tiny, gray, and unobtrusive. It's a CYA line, not a warning.

### Warning Hierarchy

```
Warnings are shown IN ORDER of severity, not all at once:

1. ⚠️ AI estimated (yellow) — most important, shown first
2. Minimal input warning (banner) — shown if applicable
3. [review] badges (gray) — least important, always shown
```

Only "AI estimated" and "Minimal input" are shown in the top bar. `[review]` badges are section-level only and never appear in the top bar.

---

## 5. NAVIGATION (Long Proposals)

### Approach: Scroll-Based + Smart Anchor Menu

Proposals can be 5–20 pages. Navigation must be frictionless.

### Sticky Section Anchor Bar

```
When the user scrolls past the top bar, a SECOND sticky bar appears:

┌─────────────────────────────────────────────────────────────────────┐
│  ← Back    |  📄 Proposal  |  [ Project Info ] [ Scope ▼ ] [ Terms ] │
└─────────────────────────────────────────────────────────────────────┘

Scope ▼ expands to: Scope of Work · Deliverables · Timeline
Terms ▼ expands to: Commercial Terms · Payment Schedule · Assumptions · Exclusions
```

This bar is **thin** (32px height), **semi-transparent** on scroll, and **appears only when scrolling down**. It gives the user a sense of where they are in the document.

### Active Section Highlighting

As the user scrolls, the anchor bar updates to show which section is currently in view. The active section is highlighted (bold + blue underline).

```
[  Scope ▼  ]  [ Terms ▼  ]  [  Assumptions  ]  [ Exclusions ]
                          ↑ bold + blue underline
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `↑` / `↓` | Scroll up/down |
| `Cmd/Ctrl + G` | Open section navigator (searchable dropdown) |
| `Cmd/Ctrl + F` | Browser find (native) |

### Mobile Navigation

On mobile, the anchor bar becomes a collapsible "Jump to section..." dropdown at the top:

```
[Jump to section... ▼]
    Scope of Work
    Deliverables
    Timeline
    Commercial Terms
    Payment Schedule
    Assumptions
    Exclusions
```

This replaces the sticky anchor bar on screens < 768px.

---

## 6. ALWAYS-VISIBLE ELEMENTS (Sticky)

### Top Bar (Always Sticky)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ← Back to form         🕐 Auto-saved    Download PDF ▼   ···        │
│                                        [📄 Download]                 │
└──────────────────────────────────────────────────────────────────────┘
```

| Element | Sticky? | Behavior |
|---------|---------|----------|
| **"← Back to form"** | ✅ Always | Returns to form (user keeps edits). Soft: uses router.back() not location.href |
| **"🕐 Auto-saved"** | ✅ Always | Appears after first edit. Updates timestamp: "Saved 2 min ago" |
| **"📄 Download PDF"** | ✅ Always | Primary action. Blue button, always visible. |
| **"···" (more)** | ✅ Always | Dropdown: Regenerate, Duplicate, Share link, Print |

### Bottom Bar (Appears on scroll, sticky at bottom)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Sections reviewed: 4/5    [ ⚠️ 1 section needs review ]            │
│  [  📄 Download PDF  ]                                              │
└──────────────────────────────────────────────────────────────────────┘
```

| Element | Sticky? | Behavior |
|---------|---------|----------|
| **Review progress** | ✅ Bottom | "4/5 sections reviewed". Subtle, not a blocker. |
| **Warning count** | ✅ Bottom (if applicable) | "⚠️ 1 section needs review". Links to that section on click. |
| **Download PDF button** | ✅ Bottom | Same as top bar. Always available. Never disabled. |

### What Is NOT Sticky

| Element | Why Not |
|---------|---------|
| Proposal title | User scrolls past it naturally. Not needed for navigation. |
| Section headers | They scroll with their content. The anchor bar replaces them. |
| Legal disclaimer | Scrolls with the Assumptions/Exclusions section. |

---

## 7. DOWNLOAD PDF ACTION

### Primary Flow

```
User clicks "Download PDF" (top bar or bottom bar)

↓

BRIEF STATE: Button shows spinner for ~2-3 seconds
Button text changes to "Generating..."

↓

A subtle slide-in toast appears at top right:
"✅ PDF ready — download starting"

↓ (if this is the FIRST export)

Browser downloads: "Villa_Interior_Fit-out_Al_Malqa.pdf"

Toast updates:
"✅ Downloaded! Create an account to save your proposals"
[Sign Up] [Maybe Later]
```

### States

| State | Button Visual | Behavior |
|-------|--------------|----------|
| **Ready** | `[ 📄 Download PDF ]` | Blue filled button. Clickable. |
| **Generating** | `[ ⏳ Generating... ]` | Spinner. Button disabled. ~2-3 seconds. |
| **Success** | `[ 📄 Download PDF ]` | Returns to ready state. Toast shows success. |
| **Error** | `[ 📄 Retry Download ]` | Returns to ready with "Retry" text. Error toast: "Something went wrong. Try again." |

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| **User clicks Download multiple times** | Subsequent clicks re-download the same file (if already generated). No re-generation. |
| **User edits after download** | Button becomes `[ 📄 Download Updated PDF ]` — blue with a subtle pulse to signal "new version available" |
| **User is not signed in** | Download works. PDF is generated. After download, sign-up prompt appears (see below). |
| **PDF generation fails** | Toast error. "Something went wrong. Try again." Button becomes "Retry Download." No data loss. |
| **Filename conflicts** | Uses proposal number if available: `PROP-001_Villa_Fitout.pdf`. Otherwise: `Proposal_[project_name].pdf`. Spaces → underscores. |

### Post-Download Flow (First Time Only)

After the first successful download, if user is not signed in:

```
The toast stays visible at top:
    ✅ PDF downloaded
    ─────────────────────────
    🔒 Create a free account to:
    ✓ Save all your proposals
    ✓ Add your company logo
    ✓ Access from anywhere
    [  Sign Up  ]  [  Maybe Later  ]
```

This toast is **dismissible**. If user clicks "Maybe Later," it doesn't show again for 24 hours (localStorage). On next visit, if they start a new proposal, the toast shows again.

---

## ANIMATION & TRANSITION PRINCIPLES

| Element | Animation | Duration |
|---------|-----------|----------|
| **Proposal appearing after generation** | Fade in + slight upward slide (content reveals gradually) | 300ms |
| **Editing a field** | Subtle background flash (blue → white) | 200ms |
| **Deleting an item** | Item fades out, items below slide up | 200ms |
| **Adding an item** | New item slides down from button | 200ms |
| **Review badge checked** | Badge fades out, section gets subtle green left border | 300ms |
| **Sticky bar appearing** | Slides down from top | 150ms |
| **Toast notification** | Slides in from right | 250ms |

**No loading spinners** except during PDF generation. Content appears as it becomes available (skeleton states for sections if loading slowly, though AI generation is complete before this screen loads).

---

## RESPONSIVE BEHAVIOR

| Breakpoint | Layout Change |
|------------|---------------|
| **> 1024px** | Full document view with sticky anchor bar |
| **768–1024px** | Same layout, thinner margins |
| **< 768px** | Full-width document, no anchor bar (dropdown instead), larger touch targets for 🖊️ |

---

## SUMMARY: UI RULES

| Rule | Statement |
|------|-----------|
| **1. One screen** | The proposal is shown, edited, and exported from one screen. No separate preview mode, editing mode, or settings panel. |
| **2. Everything editable inline** | No modals, no side panels, no "edit this section" page navigation. Click text → edit text. |
| **3. Warnings inform, don't block** | Badges and banners flag content that needs attention. Nothing prevents the user from downloading. |
| **4. Actions are always visible** | Download PDF is in the top bar AND bottom bar. Always one click away. |
| **5. AI confidence is invisible** | Except when it matters. High confidence → no indicator. Low confidence → yellow badge. The user never sees a "score." |
| **6. Mobile works** | Same flow, larger targets, dropdown navigation instead of sticky bar. |

---

*End of UI Contract: Generated Proposal Screen*
