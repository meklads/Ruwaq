/**
 * A4 pagination + a real repeating header/footer for exported proposal
 * documents, via Paged.js (https://pagedjs.org) — a browser-side polyfill
 * for the CSS Paged Media spec (the same @page / running-element CSS used
 * by professional print tooling).
 *
 * Why Paged.js and not a server-side Puppeteer render: Puppeteer needs a
 * full Chromium binary bundled into the Docker image, which meaningfully
 * grows the container and adds real deploy risk on top of an already
 * fragile Nixpacks/Coolify pipeline. Paged.js is a single <script> tag —
 * no new backend dependency, no image size change, nothing to break in
 * CI. It runs the moment the exported HTML loads (not just when the user
 * hits print), so the on-screen "export" view already looks exactly like
 * the printed/PDF'd result — no surprises at print time.
 *
 * How it works: `.banner` and the footer are pulled out of normal flow
 * with `position: running(...)` and Paged.js re-inserts them into the
 * page margin boxes on every generated page. The @page margin has to be
 * large enough to fit the tallest banner/footer across every export
 * variant (10 header/footer skins × logo/no-logo × 1-2 line titles) —
 * sized generously below. If a real print ever shows clipping or too
 * much empty space above/below the content, tighten/loosen these two
 * numbers first; nothing else needs to change.
 */

export const PAGED_JS_SCRIPT_TAG =
  '<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>';

const PAGE_MARGIN_TOP = "48mm";
const PAGE_MARGIN_BOTTOM = "40mm";
const PAGE_MARGIN_SIDE = "14mm";

export function buildPrintPaginationCss(pageBackground: string): string {
  return `
    /* --- A4 pagination + repeating header/footer (Paged.js) --- */
    @page {
      size: A4;
      margin: ${PAGE_MARGIN_TOP} ${PAGE_MARGIN_SIDE} ${PAGE_MARGIN_BOTTOM};
      @top-center { content: element(pageHeader); width: 100%; margin: 0; }
      @bottom-center { content: element(pageFooter); width: 100%; margin: 0; }
    }
    .pagedjs_pages { background: #E8E4DC; padding: 24px 0; }
    .pagedjs_page {
      background: ${pageBackground};
      box-shadow: 0 4px 18px rgba(47,74,110,0.12);
    }
    /* Cover is a full page with its own chrome header/footer */
    .cover-page {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    /* Running letterhead on every content page after the cover */
    .banner { position: running(pageHeader); }
    .doc-footer, .doc-footer-client { position: running(pageFooter); }
    .meta-grid, .scope-item, .clause-item, .estimate-banner,
    .signature-box, table tr, .boq-table tr {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .section-title {
      break-after: avoid;
      page-break-after: avoid;
    }
    @media print {
      .pagedjs_page { box-shadow: none !important; }
    }
  `;
}
