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
