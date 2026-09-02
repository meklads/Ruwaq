/**
 * Letterhead frames — faithful replicas of the professional letterhead
 * references (Dream Studio wings, triangle corners, dual waves, teal bars,
 * rounded navy blocks, soft arcs). Palette colors replace sample hues;
 * near-black ink uses a lifted slate, never #000.
 *
 * Proportions (A4): header ≈ 14–18% · footer ≈ 12–15% · white body between.
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
  wave: { id: "wave", nameAr: "موجة مزدوجة", nameEn: "Dual wave" },
  corner_cut: { id: "corner_cut", nameAr: "جناح هندسي", nameEn: "Corner wing" },
  dual_bar: { id: "dual_bar", nameAr: "شريط مائل", nameEn: "Angled bar" },
  soft_arc: { id: "soft_arc", nameAr: "قوس مزدوج", nameEn: "Soft arcs" },
  diagonal: { id: "diagonal", nameAr: "مثلثات", nameEn: "Triangles" },
  ribbon: { id: "ribbon", nameAr: "موجة تقنية", nameEn: "Tech wave" },
  split_block: { id: "split_block", nameAr: "كتل مستديرة", nameEn: "Rounded blocks" },
  crest_line: { id: "crest_line", nameAr: "شريط متوازي", nameEn: "Parallel bars" },
};

export const LETTERHEAD_FRAME_ORDER: LetterheadFrameId[] = [
  "corner_cut",
  "diagonal",
  "wave",
  "crest_line",
  "soft_arc",
  "ribbon",
  "split_block",
  "dual_bar",
];

export function parseLetterheadFrameId(value: string | null | undefined): LetterheadFrameId {
  if (value && value in LETTERHEAD_FRAMES) return value as LetterheadFrameId;
  return "corner_cut";
}

/** Dark accent for layered shapes — never pure black. */
function inkOf(primary: string): string {
  const hex = primary.replace("#", "");
  if (hex.length !== 6) return primary;
  const n = parseInt(hex, 16);
  const r = Math.max(0, ((n >> 16) & 255) - 28);
  const g = Math.max(0, ((n >> 8) & 255) - 28);
  const b = Math.max(0, (n & 255) - 28);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
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

/**
 * Header art — viewBox 800×140 (≈ 18% of A4 height when scaled to page width).
 * Shapes sit in corners; brand row lives in the clear white zone.
 */
function headerArtSvg(
  frame: LetterheadFrameId,
  primary: string,
  accent: string,
  surface: string,
  rtl: boolean
): string {
  const flip = rtl ? `transform="scale(-1,1) translate(-800,0)"` : "";
  const ink = inkOf(primary);

  switch (frame) {
    /* Dream Studio — overlapping parallelogram wings, top-right */
    case "corner_cut":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="xMaxYMin meet" aria-hidden="true"><g ${flip}>
        <rect x="0" y="0" width="800" height="3" fill="${ink}" opacity="0.35"/>
        <polygon fill="${ink}" points="520,0 800,0 800,78 610,78"/>
        <polygon fill="${accent}" points="560,0 800,0 800,36 640,36"/>
        <polygon fill="${accent}" points="500,0 545,0 505,78 460,78" opacity="0.55"/>
      </g></svg>`;

    /* Triangle corner stack — top-right + slim left tip */
    case "diagonal":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="xMaxYMin meet" aria-hidden="true"><g ${flip}>
        <polygon fill="${ink}" points="620,0 800,0 800,110"/>
        <polygon fill="${accent}" points="560,0 720,0 800,70 800,110 640,40"/>
        <polygon fill="${primary}" points="680,0 800,0 800,48" opacity="0.85"/>
        <polygon fill="${accent}" points="0,0 95,0 0,55"/>
      </g></svg>`;

    /* Dual wave — thick primary + secondary ink wave (Company template) */
    case "wave":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${accent}" d="M0 0h800v78C640 118 420 95 0 108V0z"/>
        <path fill="${primary}" d="M0 0h800v58C600 98 380 72 0 88V0z"/>
        <path fill="${ink}" d="M0 72c280 42 520-8 800 28v18C560 78 300 128 0 98V72z" opacity="0.92"/>
        <path fill="${surface}" d="M0 95c300 28 520-12 800 18V140H0z"/>
      </g></svg>`;

    /* Parallel bars + corner parallelograms (Personal Brand teal style) */
    case "crest_line":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="xMaxYMin meet" aria-hidden="true"><g ${flip}>
        <rect x="0" y="8" width="620" height="10" fill="${accent}"/>
        <polygon fill="${ink}" points="600,0 800,0 800,48 640,48"/>
        <polygon fill="${accent}" points="560,52 760,52 720,92 520,92"/>
      </g></svg>`;

    /* Soft double arcs (Brands green) — logo sits in white center top */
    case "soft_arc":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${accent}" d="M0 0h800v28C560 70 240 70 0 28V0z"/>
        <path fill="${primary}" d="M0 18h800v36C580 92 220 92 0 54V18z"/>
        <path fill="none" stroke="${accent}" stroke-width="5" d="M40 78c220 36 500 36 720 0"/>
      </g></svg>`;

    /* Tech wave — red over navy curves */
    case "ribbon":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${primary}" d="M0 0h800v70C580 115 260 100 0 88V0z"/>
        <path fill="${accent}" d="M0 0h800v42C600 78 300 55 0 62V0z"/>
        <path fill="${surface}" d="M0 85c280 30 520-5 800 20V140H0z"/>
      </g></svg>`;

    /* Rounded navy block left + yellow rules (LZ company) */
    case "split_block":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <rect x="0" y="0" width="800" height="6" fill="${accent}"/>
        <path fill="${primary}" d="M0 6h380v88c0 18-14 32-32 32H0V6z"/>
        <rect x="400" y="98" width="360" height="5" fill="${accent}"/>
        <path fill="${surface}" d="M360 6h440v100c0 0-40 0-80-40S400 6 360 6z" opacity="0"/>
      </g></svg>`;

    /* Angled bottom-style header bar with white swoop */
    case "dual_bar":
    default:
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${accent}" d="M0 0h800v72C620 110 400 85 0 100V0z"/>
        <path fill="${primary}" d="M0 0h800v52C580 90 360 68 0 78V0z"/>
        <path fill="${ink}" d="M0 68c300 38 500-10 800 22v14C540 72 280 118 0 92V68z" opacity="0.88"/>
        <path fill="${surface}" d="M0 100c320 22 500-8 800 12V140H0z"/>
      </g></svg>`;
  }
}

/**
 * Footer art — viewBox 800×110 (≈ 13% of A4).
 * Contact row sits above this band in HTML.
 */
function footerArtSvg(
  frame: LetterheadFrameId,
  primary: string,
  accent: string,
  surface: string,
  rtl: boolean
): string {
  const flip = rtl ? `transform="scale(-1,1) translate(-800,0)"` : "";
  const ink = inkOf(primary);

  switch (frame) {
    case "corner_cut":
      return `<svg class="lh-art lh-art--footer" viewBox="0 0 800 110" preserveAspectRatio="xMinYMax meet" aria-hidden="true"><g ${flip}>
        <polygon fill="${accent}" points="0,48 140,48 100,110 0,110"/>
        <polygon fill="${ink}" points="90,55 200,55 160,110 50,110" opacity="0.45"/>
        <rect x="0" y="88" width="800" height="22" fill="${ink}"/>
        <polygon fill="${accent}" points="0,78 800,78 800,88 0,88"/>
      </g></svg>`;

    case "diagonal":
      return `<svg class="lh-art lh-art--footer" viewBox="0 0 800 110" preserveAspectRatio="xMinYMax meet" aria-hidden="true"><g ${flip}>
        <polygon fill="${accent}" points="0,110 0,35 160,110"/>
        <polygon fill="${primary}" points="0,110 40,55 220,110"/>
        <polygon fill="${ink}" points="80,110 0,70 0,110"/>
      </g></svg>`;

    case "wave":
      return `<svg class="lh-art lh-art--footer" viewBox="0 0 800 110" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${surface}" d="M0 0h800v40C520 10 280 55 0 28V0z"/>
        <path fill="${accent}" d="M0 55h560L800 110H0z"/>
        <polygon fill="${ink}" points="720,70 800,70 800,110 680,110"/>
      </g></svg>`;

    case "crest_line":
      return `<svg class="lh-art lh-art--footer" viewBox="0 0 800 110" preserveAspectRatio="xMinYMax meet" aria-hidden="true"><g ${flip}>
        <polygon fill="${ink}" points="0,55 160,55 120,110 0,110"/>
        <rect x="80" y="88" width="720" height="22" fill="${accent}"/>
        <polygon fill="${accent}" points="480,52 700,52 660,88 440,88"/>
      </g></svg>`;

    case "soft_arc":
      return `<svg class="lh-art lh-art--footer" viewBox="0 0 800 110" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="none" stroke="${accent}" stroke-width="6" d="M30 28c230-40 510-40 740 0"/>
        <path fill="${primary}" d="M0 48c260-44 540-44 800 0V110H0z"/>
      </g></svg>`;

    case "ribbon":
      return `<svg class="lh-art lh-art--footer" viewBox="0 0 800 110" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${accent}" d="M0 35c280-40 520 10 800-5V70C560 95 280 50 0 78V35z"/>
        <path fill="${primary}" d="M0 58c300-35 520 15 800 0V110H0z"/>
      </g></svg>`;

    case "split_block":
      return `<svg class="lh-art lh-art--footer" viewBox="0 0 800 110" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <rect x="0" y="20" width="800" height="5" fill="${accent}"/>
        <path fill="${accent}" d="M0 40h300v70c0 0-20 0-48-28S0 40 0 40z"/>
        <path fill="${primary}" d="M280 40h520v70H280z"/>
      </g></svg>`;

    case "dual_bar":
    default:
      return `<svg class="lh-art lh-art--footer" viewBox="0 0 800 110" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${accent}" d="M0 55h580L720 110H0z"/>
        <polygon fill="${ink}" points="680,70 800,55 800,110 640,110"/>
      </g></svg>`;
  }
}

function logoBlock(data: ProposalExportData, primary: string, accent: string): string {
  const logo = safeHttpUrl(data.logoUrl);
  const name = data.companyName?.trim() || "";
  if (logo) {
    return `<div class="lh-logo"><img src="${escapeHtml(logo)}" alt=""></div>`;
  }
  if (name) {
    return `<div class="lh-logo lh-logo--mono" style="background:${primary};color:${accent};border-color:${accent}">${escapeHtml(
      companyInitials(name)
    )}</div>`;
  }
  return "";
}

/** Frames where brand sits on colored wave (need light text). */
function brandOnColor(frame: LetterheadFrameId): boolean {
  return frame === "wave" || frame === "dual_bar" || frame === "ribbon" || frame === "split_block";
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
  const onColor = brandOnColor(frameId);
  const tone = onColor ? "lh-header--on-color" : "lh-header--on-white";

  return `<header class="banner lh-header lh-frame--${frameId} ${tone}">
      <div class="lh-header-art" aria-hidden="true">
        ${headerArtSvg(frameId, palette.primary, palette.accent, palette.surface, rtl)}
      </div>
      <div class="lh-header-inner">
        <div class="lh-brand">
          ${logoBlock(data, palette.primary, palette.accent)}
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
              `<div class="lh-footer-item"><span class="lh-footer-icon" aria-hidden="true"></span><div><div class="lh-footer-label">${escapeHtml(
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
      <div class="lh-footer-art" aria-hidden="true">
        ${footerArtSvg(frameId, palette.primary, palette.accent, palette.surface, rtl)}
      </div>
    </footer>`;
}

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
  const { primary, accent, onPrimary, textMuted, surface } = palette;
  return `
    .lh-header, .lh-footer {
      position: relative;
      overflow: hidden;
      background: #ffffff !important;
      background-image: none !important;
      border: none !important;
      padding: 0 !important;
      box-shadow: none !important;
      color: ${primary};
    }
    .lh-header {
      min-height: 118px;
    }
    .lh-footer {
      min-height: 108px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .lh-header-art, .lh-footer-art {
      position: absolute;
      left: 0;
      right: 0;
      pointer-events: none;
      line-height: 0;
    }
    .lh-header-art {
      top: 0;
      height: 118px;
    }
    .lh-footer-art {
      bottom: 0;
      height: 88px;
    }
    .lh-art {
      width: 100%;
      height: 100%;
      display: block;
    }
    .lh-header-inner {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      padding: 22px 32px 16px;
      flex-wrap: wrap;
    }
    .lh-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      max-width: 58%;
    }
    .lh-logo {
      width: 56px;
      height: 56px;
      border-radius: 10px;
      background: #fff;
      border: 1.5px solid ${accent};
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      box-shadow: 0 2px 10px rgba(47,74,110,0.1);
    }
    .lh-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 6px;
    }
    .lh-logo--mono {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.06em;
      border-radius: 10px;
    }
    .lh-company {
      font-size: 16px;
      font-weight: 800;
      line-height: 1.25;
      letter-spacing: 0.01em;
      color: ${primary};
    }
    .lh-doc-title {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${accent};
      margin-top: 3px;
    }
    .lh-header-meta {
      text-align: ${dir === "rtl" ? "left" : "right"};
      max-width: 260px;
      padding-top: 4px;
    }
    .lh-project {
      font-size: 12px;
      font-weight: 700;
      color: ${primary};
      line-height: 1.35;
    }
    .lh-client {
      font-size: 11px;
      color: ${textMuted};
      margin-top: 4px;
    }
    /* Brand on colored wave */
    .lh-header--on-color .lh-company { color: ${onPrimary}; text-shadow: 0 1px 2px rgba(47,74,110,0.2); }
    .lh-header--on-color .lh-doc-title { color: ${accent}; }
    .lh-header--on-color .lh-project { color: ${onPrimary}; }
    .lh-header--on-color .lh-client { color: ${onPrimary}cc; }
    .lh-header--on-color .lh-logo { border-color: ${onPrimary}55; }
    .lh-frame--split_block .lh-header-inner { padding-inline-start: 28px; }
    .lh-frame--split_block.lh-header--on-color .lh-brand { max-width: 44%; }
    .lh-frame--soft_arc .lh-header-inner { justify-content: center; text-align: center; padding-top: 12px; }
    .lh-frame--soft_arc .lh-brand { flex-direction: column; max-width: 100%; }
    .lh-frame--soft_arc .lh-header-meta { display: none; }
    .lh-frame--ribbon .lh-header-inner { padding-top: 48px; }
    .lh-frame--ribbon.lh-header--on-color .lh-company { color: ${accent}; }
    .lh-footer-inner {
      position: relative;
      z-index: 2;
      padding: 10px 32px 12px;
      background: linear-gradient(180deg, #ffffff 70%, ${surface}00 100%);
    }
    .lh-footer-company {
      font-size: 12px;
      font-weight: 800;
      color: ${primary};
      margin-bottom: 8px;
    }
    .lh-footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px 16px;
    }
    .lh-footer-item {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      font-size: 10px;
      color: ${textMuted};
    }
    .lh-footer-icon {
      width: 14px;
      height: 14px;
      margin-top: 1px;
      border-radius: 3px;
      background: ${accent};
      flex-shrink: 0;
    }
    .lh-footer-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: ${primary};
      margin-bottom: 1px;
    }
    .lh-footer-value { line-height: 1.4; word-break: break-word; }
    .lh-footer-fallback { font-size: 10px; color: ${textMuted}; }
    .lh-frame--soft_arc .lh-footer-inner {
      padding-bottom: 8px;
    }
    .lh-frame--soft_arc .lh-footer-item,
    .lh-frame--soft_arc .lh-footer-label,
    .lh-frame--soft_arc .lh-footer-value,
    .lh-frame--soft_arc .lh-footer-company { color: ${onPrimary}; }
    .lh-frame--soft_arc .lh-footer-icon { background: ${accent}; }
    .lh-frame--soft_arc .lh-footer-inner {
      position: absolute;
      left: 0; right: 0; bottom: 10px;
      z-index: 3;
      background: transparent;
      padding-bottom: 4px;
    }
    .lh-frame--split_block .lh-footer-inner {
      position: absolute;
      left: 0; right: 0; bottom: 18px;
      z-index: 3;
      background: transparent;
      padding-bottom: 0;
    }
    .lh-frame--split_block .lh-footer-company,
    .lh-frame--split_block .lh-footer-label { color: ${onPrimary}; }
    .lh-frame--split_block .lh-footer-value { color: ${onPrimary}dd; }
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
      width: min(42vw, 260px);
      height: min(42vw, 260px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lh-wm-mark img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .lh-wm-mono {
      font-size: 88px;
      font-weight: 800;
      letter-spacing: 0.08em;
      line-height: 1;
    }
    @media print {
      .lh-wm-mark { opacity: 0.1; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `;
}
