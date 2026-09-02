/**
 * NASAQ letterhead library — header + footer frames only.
 * Preview mode uses circle “الشعار هنا” and footer address rectangles “العنوان هنا”.
 * Motifs follow the professional letterhead references (wings, triangles, waves, arcs…).
 */

import type { ProposalExportData } from "./proposal-export-types";
import type { TemplatePalette } from "./template-palettes";
import { escapeHtml } from "./proposal-export-utils";

export type LetterheadFrameId =
  | "corner_cut"
  | "diagonal"
  | "wave"
  | "crest_line"
  | "soft_arc"
  | "ribbon"
  | "split_block"
  | "dual_bar";

export type LetterheadFrame = {
  id: LetterheadFrameId;
  nameAr: string;
  nameEn: string;
};

export const LETTERHEAD_FRAMES: Record<LetterheadFrameId, LetterheadFrame> = {
  corner_cut: { id: "corner_cut", nameAr: "جناح هندسي", nameEn: "Corner wing" },
  diagonal: { id: "diagonal", nameAr: "مثلثات", nameEn: "Triangles" },
  wave: { id: "wave", nameAr: "موجة مزدوجة", nameEn: "Dual wave" },
  crest_line: { id: "crest_line", nameAr: "شريط متوازي", nameEn: "Parallel bars" },
  soft_arc: { id: "soft_arc", nameAr: "قوس مزدوج", nameEn: "Soft arcs" },
  ribbon: { id: "ribbon", nameAr: "موجة تقنية", nameEn: "Tech wave" },
  split_block: { id: "split_block", nameAr: "كتل مستديرة", nameEn: "Rounded blocks" },
  dual_bar: { id: "dual_bar", nameAr: "شريط مائل", nameEn: "Angled bar" },
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

function inkOf(primary: string): string {
  const hex = primary.replace("#", "");
  if (hex.length !== 6) return primary;
  const n = parseInt(hex, 16);
  const r = Math.max(0, ((n >> 16) & 255) - 28);
  const g = Math.max(0, ((n >> 8) & 255) - 28);
  const b = Math.max(0, (n & 255) - 28);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

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
    case "corner_cut":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="xMaxYMin meet" aria-hidden="true"><g ${flip}>
        <rect x="0" y="0" width="800" height="3" fill="${ink}" opacity="0.35"/>
        <polygon fill="${ink}" points="520,0 800,0 800,78 610,78"/>
        <polygon fill="${accent}" points="560,0 800,0 800,36 640,36"/>
        <polygon fill="${accent}" points="500,0 545,0 505,78 460,78" opacity="0.55"/>
      </g></svg>`;
    case "diagonal":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="xMaxYMin meet" aria-hidden="true"><g ${flip}>
        <polygon fill="${ink}" points="620,0 800,0 800,110"/>
        <polygon fill="${accent}" points="560,0 720,0 800,70 800,110 640,40"/>
        <polygon fill="${primary}" points="680,0 800,0 800,48" opacity="0.85"/>
        <polygon fill="${accent}" points="0,0 95,0 0,55"/>
      </g></svg>`;
    case "wave":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${accent}" d="M0 0h800v78C640 118 420 95 0 108V0z"/>
        <path fill="${primary}" d="M0 0h800v58C600 98 380 72 0 88V0z"/>
        <path fill="${ink}" d="M0 72c280 42 520-8 800 28v18C560 78 300 128 0 98V72z" opacity="0.92"/>
        <path fill="${surface}" d="M0 95c300 28 520-12 800 18V140H0z"/>
      </g></svg>`;
    case "crest_line":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="xMaxYMin meet" aria-hidden="true"><g ${flip}>
        <rect x="0" y="8" width="620" height="10" fill="${accent}"/>
        <polygon fill="${ink}" points="600,0 800,0 800,48 640,48"/>
        <polygon fill="${accent}" points="560,52 760,52 720,92 520,92"/>
      </g></svg>`;
    case "soft_arc":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${accent}" d="M0 0h800v28C560 70 240 70 0 28V0z"/>
        <path fill="${primary}" d="M0 18h800v36C580 92 220 92 0 54V18z"/>
        <path fill="none" stroke="${accent}" stroke-width="5" d="M40 78c220 36 500 36 720 0"/>
      </g></svg>`;
    case "ribbon":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <path fill="${primary}" d="M0 0h800v70C580 115 260 100 0 88V0z"/>
        <path fill="${accent}" d="M0 0h800v42C600 78 300 55 0 62V0z"/>
        <path fill="${surface}" d="M0 85c280 30 520-5 800 20V140H0z"/>
      </g></svg>`;
    case "split_block":
      return `<svg class="lh-art lh-art--header" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true"><g ${flip}>
        <rect x="0" y="0" width="800" height="6" fill="${accent}"/>
        <path fill="${primary}" d="M0 6h380v88c0 18-14 32-32 32H0V6z"/>
        <rect x="400" y="98" width="360" height="5" fill="${accent}"/>
      </g></svg>`;
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

function brandOnColor(frame: LetterheadFrameId): boolean {
  return frame === "wave" || frame === "dual_bar" || frame === "ribbon" || frame === "split_block";
}

export type LetterheadPlaceholderCopy = {
  logoHere: string;
  addressHere: string;
  docTitle: string;
};

/** Library preview header: decorative art + circle “الشعار هنا”. */
export function buildLibraryHeaderHtml(options: {
  palette: TemplatePalette;
  frameId: LetterheadFrameId;
  dir: "rtl" | "ltr";
  copy: LetterheadPlaceholderCopy;
}): string {
  const { palette, frameId, dir, copy } = options;
  const rtl = dir === "rtl";
  const onColor = brandOnColor(frameId);
  const tone = onColor ? "lh-header--on-color" : "lh-header--on-white";

  return `<header class="banner lh-header lh-frame--${frameId} ${tone}">
      <div class="lh-header-art" aria-hidden="true">
        ${headerArtSvg(frameId, palette.primary, palette.accent, palette.surface, rtl)}
      </div>
      <div class="lh-header-inner">
        <div class="lh-brand">
          <div class="lh-logo-circle" aria-label="${escapeHtml(copy.logoHere)}">
            <span>${escapeHtml(copy.logoHere)}</span>
          </div>
          <div class="lh-brand-text">
            <div class="lh-doc-title">${escapeHtml(copy.docTitle)}</div>
          </div>
        </div>
      </div>
    </header>`;
}

/** Library preview footer: decorative art + address rectangles “العنوان هنا”. */
export function buildLibraryFooterHtml(options: {
  palette: TemplatePalette;
  frameId: LetterheadFrameId;
  dir: "rtl" | "ltr";
  copy: LetterheadPlaceholderCopy;
}): string {
  const { palette, frameId, dir, copy } = options;
  const rtl = dir === "rtl";
  const boxes = [0, 1, 2]
    .map(
      () =>
        `<div class="lh-address-box"><span>${escapeHtml(copy.addressHere)}</span></div>`
    )
    .join("");

  return `<footer class="doc-footer-client lh-footer lh-frame--${frameId}">
      <div class="lh-footer-inner">
        <div class="lh-address-row">${boxes}</div>
      </div>
      <div class="lh-footer-art" aria-hidden="true">
        ${footerArtSvg(frameId, palette.primary, palette.accent, palette.surface, rtl)}
      </div>
    </footer>`;
}

export function buildCenterWatermarkHtml(options: {
  palette: TemplatePalette;
  enabled: boolean;
  label: string;
}): string {
  if (!options.enabled) return "";
  return `<div class="lh-center-watermark" aria-hidden="true">
      <div class="lh-wm-mark" style="color:${options.palette.primary}">
        <span class="lh-wm-mono">${escapeHtml(options.label.slice(0, 2))}</span>
      </div>
    </div>`;
}

/** Mini card art for the library grid (static, no iframe). */
export function buildFrameThumbSvg(
  frameId: LetterheadFrameId,
  primary: string,
  accent: string
): string {
  const ink = inkOf(primary);
  const deco =
    frameId === "corner_cut"
      ? `<polygon fill="${ink}" points="95,0 160,0 160,36 115,36"/><polygon fill="${accent}" points="110,0 160,0 160,16 125,16"/>`
      : frameId === "diagonal"
        ? `<polygon fill="${ink}" points="115,0 160,0 160,42"/><polygon fill="${accent}" points="100,0 140,0 160,28 160,42"/>`
        : frameId === "wave" || frameId === "dual_bar" || frameId === "ribbon"
          ? `<path fill="${primary}" d="M0 0h160v28C110 42 60 34 0 38V0z"/><path fill="${accent}" d="M0 0h160v18C100 30 50 22 0 26V0z"/>`
          : frameId === "soft_arc"
            ? `<path fill="${primary}" d="M0 0h160v22C110 40 50 40 0 22V0z"/><path fill="none" stroke="${accent}" stroke-width="2" d="M12 30c40 12 96 12 136 0"/>`
            : frameId === "crest_line"
              ? `<rect x="0" y="6" width="110" height="5" fill="${accent}"/><polygon fill="${ink}" points="108,0 160,0 160,20 120,20"/>`
              : `<rect x="0" y="0" width="70" height="34" fill="${primary}"/><rect x="78" y="28" width="70" height="3" fill="${accent}"/>`;

  const foot =
    frameId === "corner_cut" || frameId === "crest_line"
      ? `<rect x="0" y="200" width="160" height="12" fill="${ink}"/><polygon fill="${accent}" points="0,186 28,186 18,200 0,200"/>`
      : frameId === "diagonal"
        ? `<polygon fill="${accent}" points="0,210 0,175 36,210"/>`
        : frameId === "soft_arc"
          ? `<path fill="${primary}" d="M0 188c50-16 110-16 160 0V210H0z"/>`
          : `<path fill="${accent}" d="M0 192h110L160 210H0z"/>`;

  return `<svg viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg" class="h-auto w-full" aria-hidden="true">
    <rect width="160" height="220" fill="#fff" rx="4"/>
    ${deco}
    <circle cx="34" cy="52" r="16" fill="#F7F4EF" stroke="${accent}" stroke-width="1.5" stroke-dasharray="3 2"/>
    <text x="34" y="55" text-anchor="middle" font-size="6" fill="${primary}" font-family="sans-serif">logo</text>
    ${foot}
    <rect x="14" y="172" width="40" height="12" rx="2" fill="#F7F4EF" stroke="${accent}" stroke-width="1"/>
    <rect x="60" y="172" width="40" height="12" rx="2" fill="#F7F4EF" stroke="${accent}" stroke-width="1"/>
    <rect x="106" y="172" width="40" height="12" rx="2" fill="#F7F4EF" stroke="${accent}" stroke-width="1"/>
  </svg>`;
}

export function buildLetterheadFrameCss(palette: TemplatePalette, dir: "rtl" | "ltr"): string {
  const { primary, accent, onPrimary, surface } = palette;
  return `
    .lh-header, .lh-footer {
      position: relative;
      overflow: hidden;
      background: #ffffff !important;
      border: none !important;
      padding: 0 !important;
      box-shadow: none !important;
      color: ${primary};
    }
    .lh-header { min-height: 128px; }
    .lh-footer {
      min-height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .lh-header-art, .lh-footer-art {
      position: absolute;
      left: 0; right: 0;
      pointer-events: none;
      line-height: 0;
    }
    .lh-header-art { top: 0; height: 128px; }
    .lh-footer-art { bottom: 0; height: 92px; }
    .lh-art { width: 100%; height: 100%; display: block; }
    .lh-header-inner {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 28px 36px 20px;
    }
    .lh-brand { display: flex; align-items: center; gap: 14px; }
    .lh-logo-circle {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 2px dashed ${accent};
      background: ${surface};
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 8px;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(47,74,110,0.08);
    }
    .lh-logo-circle span {
      font-size: 11px;
      font-weight: 700;
      line-height: 1.35;
      color: ${primary};
    }
    .lh-doc-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${accent};
    }
    .lh-header--on-color .lh-logo-circle {
      background: rgba(255,255,255,0.92);
      border-style: solid;
    }
    .lh-header--on-color .lh-doc-title { color: ${onPrimary}; }
    .lh-frame--soft_arc .lh-header-inner { justify-content: center; padding-top: 16px; }
    .lh-frame--ribbon .lh-header-inner { padding-top: 52px; }
    .lh-frame--split_block .lh-header-inner { padding-top: 24px; }
    .lh-footer-inner {
      position: relative;
      z-index: 2;
      padding: 12px 28px 14px;
    }
    .lh-address-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }
    .lh-address-box {
      min-height: 44px;
      border: 1.5px dashed ${accent};
      border-radius: 8px;
      background: ${surface};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 10px;
      text-align: center;
    }
    .lh-address-box span {
      font-size: 11px;
      font-weight: 700;
      color: ${primary};
    }
    .lh-frame--soft_arc .lh-footer-inner,
    .lh-frame--split_block .lh-footer-inner {
      position: absolute;
      left: 0; right: 0; bottom: 28px;
      z-index: 3;
      background: transparent;
    }
    .lh-frame--soft_arc .lh-address-box,
    .lh-frame--split_block .lh-address-box {
      background: rgba(255,255,255,0.92);
    }
    .lh-center-watermark {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lh-wm-mark { opacity: 0.1; }
    .lh-wm-mono {
      font-size: 96px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: ${primary};
    }
  `;
}

export function buildLetterheadHeaderHtml(options: {
  data: ProposalExportData;
  palette: TemplatePalette;
  frameId: LetterheadFrameId;
  dir: "rtl" | "ltr";
  docTitle: string;
  preparedForLabel: string;
}): string {
  return buildLibraryHeaderHtml({
    palette: options.palette,
    frameId: options.frameId,
    dir: options.dir,
    copy: {
      logoHere: options.dir === "rtl" ? "الشعار هنا" : "Logo here",
      addressHere: options.dir === "rtl" ? "العنوان هنا" : "Address here",
      docTitle: options.docTitle,
    },
  });
}

export function buildLetterheadFooterHtml(options: {
  data: ProposalExportData;
  palette: TemplatePalette;
  frameId: LetterheadFrameId;
  dir: "rtl" | "ltr";
  labels: Record<string, string>;
}): string {
  return buildLibraryFooterHtml({
    palette: options.palette,
    frameId: options.frameId,
    dir: options.dir,
    copy: {
      logoHere: options.dir === "rtl" ? "الشعار هنا" : "Logo here",
      addressHere: options.dir === "rtl" ? "العنوان هنا" : "Address here",
      docTitle: "",
    },
  });
}
