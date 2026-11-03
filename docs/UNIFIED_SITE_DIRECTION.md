# Ruwaq — unified public site (direction and limits)

**Positioning:** Ruwaq is a business-opportunity intelligence platform (starting with the Saudi market). Radar is its main product, currently in development and used internally. The owner-advisor / contractor-quote-review direction is cancelled for the public experience.

## What the public site does now
- `/` home: intro, problem, how it works (marked *in development*), Radar section, product principles, NASAQ mention. The hero card is an **illustrative example** and says so.
- `/radar`: public explainer (who it is for, journey, fact vs inference states, current status). No sign-up, trial or subscription.
- `/about`, `/contact`: rewritten for the new positioning (contact uses the existing email/WhatsApp constants).
- Header/footer/metadata/share image/JSON-LD/sitemap updated to the new message.
- Visual system taken from the published v4 design (`src/app/ruwaq-v3.css`, green logos); radar-specific additions in `src/app/ruwaq-radar.css`. Copy lives in `src/modules/site/copy.ts` (AR/EN).

## Radar entry button
"Enter Radar" renders only when `NEXT_PUBLIC_RADAR_APP_URL` is set to an approved **https** URL on a public host (`src/modules/site/radar-link.ts`). Local/private/non-https values are rejected. Unset by default. The Radar app is **not** integrated into this site.

## Kept but not linked from the new navigation (deferred decisions)
Directory and marketplace routes (`/categories`, `/[city]/[category]`, `/listing`, `/pro`, `/join`, `/request-quote`, `/quote`, `/how-we-match`, `/how-it-works`, `/faq`, `/tours`, `/hubs`, `/developers`, `/pricing`, `/visualization`), guides (`/guides`), NASAQ (`/proposals`, `/workspace`, `/share`), billing and their database tables. They still carry their old copy and are **not** reviewed for the new positioning, so the site is not claimed to be fully neutral. Components no longer used by the shell (e.g. `ruwaq-pro-apply-band`) are left in place.

## Not taken from the published version
Owner-advisor pages and modules (`/check`, `/project-file`, `/aman`, `/checklist`, `/estimate`, `/charter`, quote-check forms, `modules/ruwaq/*`), the 299 SAR report offer, the v2 redirects and the Prisma schema additions. No database schema change was made.

## Reference
Published reference: `Websites/RuwaqPublished` @ `3cf2d19`. Pre-change backup: `_Archive/Ruwaq-pre-unify-2026-11-03` (see its MANIFEST.txt). Superseded marketplace PRD moved to `docs/archive/`.

## Update — 2026-11-03: umbrella positioning
- Ruwaq is the public umbrella for knowledge about projects and organisations in the Saudi market, still under construction. The home page no longer presents Radar as the product.
- Home order: hero with an honest section-status card → the three sections (updates, insights, specialists; «قريبًا» until material is approved and published) → principles → a quiet Radar note → NASAQ link.
- Radar is a secondary item: «قيد التطوير والتجربة الداخلية», tested inside Graphics House, not available for subscription or external use. `/radar` separates what the prototype does from what is planned, and carries the illustrative example (labelled hypothetical). No waitlist, sign-up, launch date or results claims.
- The header and footer show a quiet «دخول العملاء» link only when `NEXT_PUBLIC_RADAR_APP_URL` is set to an https public host. The public site never reads Radar data.
- The five real drafts stay out of the public build; the private preview build is unchanged.
- No section named «العروض الجاهزة» exists in this repository or its history (see the delivery note); nothing was invented in its place.

## NASAQ: restored path and what is still open — 2026-11-03
Rule from the owner: no existing function or content is hidden, removed or shortened for design unification without a stated impact and explicit approval.

Path (guest, tested on an isolated local database, Arabic and English): `/proposals` → ready proposals gallery (3 templates) → «ابدأ بهذا المظهر» (template + palette in the URL) → `/proposals/new` → editor → themed print / save-as-PDF (`/api/proposals/[id]/export/html`) or standard PDF download → reopen by URL.

How the look is kept: it is stored with the proposal inside the existing `Proposal.confidence` JSON under `_look` (validated against known templates, frames, palettes and hex colours). No schema change: production runs `prisma db push` on every start (`scripts/start.sh`), so a new column would have changed the production database.

Exports:
- **Print / save PDF in your look** (primary): the themed, paginated A4 document (template, palette, letterhead frame). The browser prints it; the user chooses «Save as PDF». Same review gates as the PDF.
- **Standard PDF** (secondary): fixed layout, does not apply palette or letterhead. The editor says so.

Fixes made on the way: blank first page and two blank pages in the themed export (cover sized to the page area; a top margin that pushed the cover off-screen), clause headings alone at the bottom of a page in the standard PDF, the client share page `/share/[token]` that returned 500 (function labels passed to a client component), typed price now wins over numbers found in the description, mobile button overflow in the editor, and legacy URLs of the cancelled owner-advisor service now go to the home page.

Not tested: Google sign-in, the saved list «عروضي» for signed-in users, claiming a guest proposal. The palette «free / subscription» wording is not enforced anywhere in export (only the premium templates are limited by entitlement). Needs a business decision: `/listing/*` and `/directory/*` → `/pro`, and `/visualization` → an external site.

Pages that respond 200 but are not linked from the unified site (owner-advisor direction, left as they are by decision): `/charter`, `/checklist`, `/check`, `/check/sample`, `/estimate`, `/project-file`, `/faq`, `/how-it-works`, `/join`. `/tours` pages exist only in Git history (0edd30c).

## Site quality round — 2026-11-03
- Header: «المعرفة» menu (three sections with their status beside each), نَسَق (`/proposals`), عن الرادار, من نحن, تواصل, language switch, and «دخول المشتركين» (`/subscribers`). Below 1100px a drawer lists the same links grouped. Footer repeats NASAQ, the ready proposals and subscriber sign-in.
- `/subscribers` redirects to the Radar app's `/sign-in` when `RADAR_APP_URL` (server env, read at runtime, https public host only) is set; otherwise it says plainly that the sign-in is not connected yet. The public site never holds Radar data and does not know whether a visitor is signed in to Radar (different origin).
- Home: shorter hero with an index panel (sections + tools, status chip beside each), section cards, a methodology block that carries the coverage limits, a NASAQ band, a quiet Radar note. Status wording appears next to each section only.
- Radar gate (in RuwaqRadar, not in this repository): username + password, workspace fixed by server setting, ANALYST role, rate limiting, dashboard after sign-in.
