/**
 * Letterhead frame motifs for NASAQ proposals.
 * Same pattern everywhere: decorative header (logo) + decorative footer (company data).
 * Shape language varies; colors always come from the 2–3 color palette (never black).
 */

import type { ProposalExportData } from "./proposal-export-types";
import type { TemplatePalette } from "./template-palettes";
import { escapeHtml } from "./proposal-export-utils";
import { companyInitials } from "./template-letterhead";

export type LetterheadFrameId =
  | "wave"
  | "corner_cut"
  | "dual_bar"
  | "soft_arc"
  | "diagonal"
  | "ribbon"
  | "split_block"
  | "crest_line";

export type LetterheadFrame = {
  id: LetterheadFrameId;
  nameAr: string;
  nameEn: string;
};

export const LETTERHEAD_FRAMES: Record<LetterheadFrameId, LetterheadFrame> = {
  wave: { id: "wave", nameAr: "موجة", nameEn: "Wave" },
  corner_cut: { id: "corner_cut", nameAr: "زاوية هندسية", nameEn: "Corner cut" },
  dual_bar: { id: "dual_bar", nameAr: "شريطان", nameEn: "Dual bar" },
  soft_arc: { id: "soft_arc", nameAr: "قوس ناعم", nameEn: "Soft arc" },
  diagonal: { id: "diagonal", nameAr: "مائل", nameEn: "Diagonal" },
  ribbon: { id: "ribbon", nameAr: "شريط", nameEn: "Ribbon" },
  split_block: { id: "split_block", nameAr: "كتلة منقسمة", nameEn: "Split block" },
  crest_line: { id: "crest_line", nameAr: "خط شعار", nameEn: "Crest line" },
};

export const LETTERHEAD_FRAME_ORDER: LetterheadFrameId[] = [
  "wave",
  "corner_cut",
  "dual_bar",
  "soft_arc",
  "diagonal",
  "ribbon",
  "split_block",
  "crest_line",
];

export function parseLetterheadFrameId(value: string | null | undefined): LetterheadFrameId {
  if (value && value in LETTERHEAD_FRAMES) return value as LetterheadFrameId;
  return "wave";
}

function safeHttpUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.href;
  } catch {
    return null;
  }
}

function headerDecorSvg(frame: LetterheadFrameId, primary: string, accent: string, rtl: boolean): string {
  const flip = rtl ? `transform="scale(-1,1) translate(-800,0)"` : "";
  switch (frame) {
    case "wave":
      return `<svg class="lh-decor lh-decor--header" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><path fill="${primary}" d="M0 0h800v52C620 88 420 40 0 70V0z"/><path fill="${accent}" d="M0 48c260 28 480-20 800 8V62C560 28 300 78 0 58V48z" opacity="0.92"/></g></svg>`;
    case "corner_cut":
      return `<svg class="lh-decor lh-decor--header" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><polygon fill="${primary}" points="520,0 800,0 800,90 620,90"/><polygon fill="${accent}" points="560,0 800,0 800,38 680,38"/><polygon fill="${accent}" points="0,0 120,0 0,48" opacity="0.85"/></g></svg>`;
    case "dual_bar":
      return `<svg class="lh-decor lh-decor--header" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><rect fill="${primary}" width="800" height="54"/><rect fill="${accent}" y="54" width="800" height="10"/><rect fill="${accent}" x="640" y="0" width="160" height="54" opacity="0.35"/></g></svg>`;
    case "soft_arc":
      return `<svg class="lh-decor lh-decor--header" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><path fill="${primary}" d="M0 0h800v40c-180 48-420 48-800 0V0z"/><path fill="none" stroke="${accent}" stroke-width="6" d="M0 58c220 36 520 36 800 0"/></g></svg>`;
    case "diagonal":
      return `<svg class="lh-decor lh-decor--header" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><polygon fill="${primary}" points="0,0 800,0 800,28 180,90 0,90"/><polygon fill="${accent}" points="200,0 360,0 120,90 0,90 0,70"/></g></svg>`;
    case "ribbon":
      return `<svg class="lh-decor lh-decor--header" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><path fill="${primary}" d="M0 0h800v36H0z"/><path fill="${accent}" d="M0 36h520l40 18-40 18H0z"/><path fill="${primary}" d="M520 36l40 18 40-18v36H520z" opacity="0.9"/></g></svg>`;
    case "split_block":
      return `<svg class="lh-decor lh-decor--header" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><rect fill="${primary}" width="420" height="70"/><rect fill="${accent}" x="420" width="380" height="14"/><rect fill="${primary}" x="420" y="56" width="380" height="14" opacity="0.55"/><circle cx="400" cy="35" r="18" fill="${accent}"/></g></svg>`;
    case "crest_line":
    default:
      return `<svg class="lh-decor lh-decor--header" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><rect fill="${primary}" y="0" width="800" height="8"/><rect fill="${accent}" y="12" width="800" height="3"/><path fill="${primary}" d="M300 20h200l20 28H280z" opacity="0.15"/></g></svg>`;
  }
}

function footerDecorSvg(frame: LetterheadFrameId, primary: string, accent: string, rtl: boolean): string {
  const flip = rtl ? `transform="scale(-1,1) translate(-800,0)"` : "";
  switch (frame) {
    case "wave":
      return `<svg class="lh-decor lh-decor--footer" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><path fill="${accent}" d="M0 28c280-36 520 24 800-4V80H0z" opacity="0.9"/><path fill="${primary}" d="M0 40c260-30 540 20 800-2V80H0z"/></g></svg>`;
    case "corner_cut":
      return `<svg class="lh-decor lh-decor--footer" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><polygon fill="${primary}" points="0,30 180,80 0,80"/><rect fill="${primary}" y="58" width="800" height="22"/><polygon fill="${accent}" points="640,40 800,40 800,80 700,80"/></g></svg>`;
    case "dual_bar":
      return `<svg class="lh-decor lh-decor--footer" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><rect fill="${accent}" y="40" width="800" height="10"/><rect fill="${primary}" y="50" width="800" height="30"/></g></svg>`;
    case "soft_arc":
      return `<svg class="lh-decor lh-decor--footer" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><path fill="none" stroke="${accent}" stroke-width="5" d="M0 22c220-30 520-30 800 0"/><path fill="${primary}" d="M0 36c260-40 540-40 800 0V80H0z"/></g></svg>`;
    case "diagonal":
      return `<svg class="lh-decor lh-decor--footer" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><polygon fill="${primary}" points="0,50 620,20 800,20 800,80 0,80"/><polygon fill="${accent}" points="560,28 800,28 800,48 600,48"/></g></svg>`;
    case "ribbon":
      return `<svg class="lh-decor lh-decor--footer" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><path fill="${accent}" d="M280 18h520v44H280l-20-22z"/><path fill="${primary}" d="M0 40h800v40H0z"/></g></svg>`;
    case "split_block":
      return `<svg class="lh-decor lh-decor--footer" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><rect fill="${accent}" y="28" width="800" height="10"/><rect fill="${primary}" y="38" width="520" height="42"/><rect fill="${primary}" x="520" y="50" width="280" height="30" opacity="0.7"/></g></svg>`;
    case "crest_line":
    default:
      return `<svg class="lh-decor lh-decor--footer" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true"><g ${flip}><rect fill="${accent}" y="36" width="800" height="3"/><rect fill="${primary}" y="48" width="800" height="32"/></g></svg>`;
  }
}

function logoBlock(data: ProposalExportData, onPrimary: string, accent: string): string {
  const logo = safeHttpUrl(data.logoUrl);
  const name = data.companyName?.trim() || "";
  if (logo) {
    return `<div class="lh-logo"><img src="${escapeHtml(logo)}" alt=""></div>`;
  }
  if (name) {
    return `<div class="lh-logo lh-logo--mono" style="border-color:${accent};color:${accent};background:${onPrimary}22">${escapeHtml(
      companyInitials(name)
    )}</div>`;
  }
  return "";
}

export function buildLetterheadHeaderHtml(options: {
  data: ProposalExportData;
  palette: TemplatePalette;
  frameId: LetterheadFrameId;
  dir: "rtl" | "ltr";
  docTitle: string;
  preparedForLabel: string;
}): string {
  const { data, palette, frameId, dir, docTitle, preparedForLabel } = options;
  const rtl = dir === "rtl";
  const company = data.companyName?.trim() || "";
  return `<header class="banner lh-header lh-frame--${frameId}">
      ${headerDecorSvg(frameId, palette.primary, palette.accent, rtl)}
      <div class="lh-header-inner">
        <div class="lh-brand">
          ${logoBlock(data, palette.onPrimary, palette.accent)}
          <div class="lh-brand-text">
            ${company ? `<div class="lh-company">${escapeHtml(company)}</div>` : ""}
            <div class="lh-doc-title">${escapeHtml(docTitle)}</div>
          </div>
        </div>
        <div class="lh-header-meta">
          <div class="lh-project">${escapeHtml(data.projectName)}</div>
          <div class="lh-client">${escapeHtml(preparedForLabel)} ${escapeHtml(data.clientName)}</div>
        </div>
      </div>
    </header>`;
}

export function buildLetterheadFooterHtml(options: {
  data: ProposalExportData;
  palette: TemplatePalette;
  frameId: LetterheadFrameId;
  dir: "rtl" | "ltr";
  labels: {
    phone: string;
    email: string;
    address: string;
    crNumber: string;
    vatNumber: string;
    websiteLink: string;
    footer: string;
  };
}): string {
  const { data, palette, frameId, dir, labels } = options;
  const rtl = dir === "rtl";
  const items: Array<{ label: string; value: string }> = [];
  if (data.companyPhone?.trim()) items.push({ label: labels.phone, value: data.companyPhone.trim() });
  if (data.companyEmail?.trim()) items.push({ label: labels.email, value: data.companyEmail.trim() });
  if (data.website?.trim()) items.push({ label: labels.websiteLink, value: data.website.trim() });
  if (data.address?.trim()) items.push({ label: labels.address, value: data.address.trim() });
  if (data.crNumber?.trim()) items.push({ label: labels.crNumber, value: data.crNumber.trim() });
  if (data.vatNumber?.trim()) items.push({ label: labels.vatNumber, value: data.vatNumber.trim() });

  const company = data.companyName?.trim() || "";
  const grid =
    items.length > 0
      ? `<div class="lh-footer-grid">${items
          .slice(0, 4)
          .map(
            (item) =>
              `<div class="lh-footer-item"><span class="lh-footer-dot" aria-hidden="true"></span><div><div class="lh-footer-label">${escapeHtml(
                item.label
              )}</div><div class="lh-footer-value">${escapeHtml(item.value)}</div></div></div>`
          )
          .join("")}</div>`
      : `<div class="lh-footer-fallback">${escapeHtml(labels.footer)}</div>`;

  return `<footer class="doc-footer-client lh-footer lh-frame--${frameId}">
      <div class="lh-footer-inner">
        ${company ? `<div class="lh-footer-company">${escapeHtml(company)}</div>` : ""}
        ${grid}
      </div>
      ${footerDecorSvg(frameId, palette.primary, palette.accent, rtl)}
    </footer>`;
}

/** Optional center watermark at ~10% opacity — logo or company monogram. */
export function buildCenterWatermarkHtml(options: {
  data: ProposalExportData;
  palette: TemplatePalette;
  enabled: boolean;
}): string {
  if (!options.enabled) return "";
  const { data, palette } = options;
  const logo = safeHttpUrl(data.logoUrl);
  const name = data.companyName?.trim() || data.projectName;
  const inner = logo
    ? `<img src="${escapeHtml(logo)}" alt="">`
    : `<span class="lh-wm-mono">${escapeHtml(companyInitials(name))}</span>`;
  return `<div class="lh-center-watermark" aria-hidden="true">
      <div class="lh-wm-mark" style="color:${palette.primary}">${inner}</div>
    </div>`;
}

export function buildLetterheadFrameCss(palette: TemplatePalette, dir: "rtl" | "ltr"): string {
  const { primary, accent, onPrimary, textMuted } = palette;
  return `
    .lh-header, .lh-footer {
      position: relative;
      overflow: hidden;
      background: transparent !important;
      background-image: none !important;
      border: none !important;
      border-bottom: none !important;
      border-top: none !important;
      padding: 0 !important;
      color: ${primary};
      box-shadow: none !important;
    }
    .lh-decor {
      display: block;
      width: 100%;
      pointer-events: none;
    }
    .lh-decor--header { height: 72px; }
    .lh-decor--footer { height: 56px; margin-top: 8px; }
    .lh-header-inner {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      padding: 10px 28px 14px;
      margin-top: -58px;
      flex-wrap: wrap;
    }
    .lh-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .lh-logo {
      width: 52px;
      height: 52px;
      border-radius: 10px;
      background: #fff;
      border: 1.5px solid ${accent};
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(47,74,110,0.12);
    }
    .lh-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 6px;
    }
    .lh-logo--mono {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.06em;
    }
    .lh-company {
      font-size: 14px;
      font-weight: 800;
      color: ${onPrimary};
      line-height: 1.3;
      text-shadow: 0 1px 2px rgba(47,74,110,0.25);
    }
    .lh-doc-title {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${accent};
      margin-top: 2px;
    }
    .lh-header-meta {
      text-align: ${dir === "rtl" ? "left" : "right"};
      max-width: 280px;
    }
    .lh-project {
      font-size: 13px;
      font-weight: 700;
      color: ${primary};
      line-height: 1.35;
    }
    .lh-client {
      font-size: 11px;
      color: ${textMuted};
      margin-top: 3px;
    }
    /* Frames with solid top bars need light text on the brand row */
    .lh-frame--dual_bar .lh-company,
    .lh-frame--ribbon .lh-company,
    .lh-frame--split_block .lh-company,
    .lh-frame--wave .lh-company,
    .lh-frame--soft_arc .lh-company,
    .lh-frame--diagonal .lh-company {
      color: ${onPrimary};
    }
    .lh-frame--crest_line .lh-company,
    .lh-frame--crest_line .lh-project {
      color: ${primary};
    }
    .lh-frame--crest_line .lh-doc-title { color: ${accent}; }
    .lh-frame--crest_line .lh-header-inner { margin-top: 4px; }
    .lh-frame--corner_cut .lh-header-inner { margin-top: -40px; }
    .lh-footer-inner {
      position: relative;
      z-index: 1;
      padding: 10px 28px 4px;
    }
    .lh-footer-company {
      font-size: 12px;
      font-weight: 800;
      color: ${primary};
      margin-bottom: 8px;
    }
    .lh-footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 8px 14px;
    }
    .lh-footer-item {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      font-size: 10px;
      color: ${textMuted};
    }
    .lh-footer-dot {
      width: 8px;
      height: 8px;
      margin-top: 3px;
      border-radius: 2px;
      background: ${accent};
      flex-shrink: 0;
    }
    .lh-footer-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: ${primary};
      margin-bottom: 1px;
    }
    .lh-footer-value { line-height: 1.4; word-break: break-word; }
    .lh-footer-fallback { font-size: 10px; color: ${textMuted}; }
    .lh-center-watermark {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lh-wm-mark {
      opacity: 0.1;
      width: min(42vw, 280px);
      height: min(42vw, 280px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lh-wm-mark img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: grayscale(0.15);
    }
    .lh-wm-mono {
      font-size: 96px;
      font-weight: 800;
      letter-spacing: 0.08em;
      line-height: 1;
      opacity: 1;
    }
    @media print {
      .lh-center-watermark { position: fixed; }
      .lh-wm-mark { opacity: 0.1; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `;
}
