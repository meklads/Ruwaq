/**
 * NASAQ letterhead library — original SVG header/footer chrome only.
 * Logo = circle “الشعار هنا”; address = dashed rectangles “العنوان هنا”.
 * No third-party reference images.
 */

export type LetterheadFrameId =
  | "wing_crest"
  | "facet_geometry"
  | "ribbon_brand"
  | "wave_horizon"
  | "arc_atelier";

export type OverlayBox = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width: number;
  height: number;
};

export type LetterheadFrame = {
  id: LetterheadFrameId;
  nameAr: string;
  nameEn: string;
  primary: string;
  accent: string;
  mute: string;
  logo: OverlayBox;
  addressBoxes: OverlayBox[];
  watermarkCenter?: boolean;
};

export const LETTERHEAD_FRAMES: Record<LetterheadFrameId, LetterheadFrame> = {
  wing_crest: {
    id: "wing_crest",
    nameAr: "جناح مؤسسي",
    nameEn: "Wing Crest",
    primary: "#1F3A5F",
    accent: "#C9A063",
    mute: "#7A9BB0",
    logo: { left: 5.5, top: 3.2, width: 9, height: 6.5 },
    addressBoxes: [
      { right: 5.5, bottom: 11, width: 34, height: 2.8 },
      { right: 5.5, bottom: 7.6, width: 34, height: 2.8 },
      { right: 5.5, bottom: 4.2, width: 34, height: 2.8 },
    ],
  },
  facet_geometry: {
    id: "facet_geometry",
    nameAr: "أوجه هندسية",
    nameEn: "Facet Geometry",
    primary: "#243B55",
    accent: "#D4A574",
    mute: "#5C7A8F",
    logo: { left: 6, top: 7.5, width: 9, height: 6.5 },
    addressBoxes: [
      { right: 6, bottom: 8, width: 36, height: 3 },
      { right: 6, bottom: 4.2, width: 36, height: 3 },
    ],
  },
  ribbon_brand: {
    id: "ribbon_brand",
    nameAr: "شريط هوية",
    nameEn: "Ribbon Brand",
    primary: "#2A4568",
    accent: "#C9846A",
    mute: "#8FA8B8",
    logo: { left: 5.5, top: 4.5, width: 8.5, height: 6 },
    addressBoxes: [
      { left: 5.5, bottom: 7.5, width: 28, height: 3.6 },
      { left: 36, bottom: 7.5, width: 28, height: 3.6 },
      { left: 66.5, bottom: 7.5, width: 28, height: 3.6 },
    ],
  },
  wave_horizon: {
    id: "wave_horizon",
    nameAr: "أفق الموجة",
    nameEn: "Wave Horizon",
    primary: "#1B4A5C",
    accent: "#E0A45A",
    mute: "#5A9AAA",
    logo: { left: 5, top: 2.8, width: 8.5, height: 6 },
    addressBoxes: [
      { right: 5, bottom: 10.5, width: 32, height: 2.6 },
      { right: 5, bottom: 7.2, width: 32, height: 2.6 },
      { right: 5, bottom: 3.9, width: 32, height: 2.6 },
    ],
  },
  arc_atelier: {
    id: "arc_atelier",
    nameAr: "مرسم الأقواس",
    nameEn: "Arc Atelier",
    primary: "#2F4A6E",
    accent: "#B8956A",
    mute: "#A8B8C4",
    logo: { left: 42, top: 2.5, width: 16, height: 7.2 },
    addressBoxes: [
      { left: 8, bottom: 4.2, width: 26, height: 3.4 },
      { left: 37, bottom: 4.2, width: 26, height: 3.4 },
      { left: 66, bottom: 4.2, width: 26, height: 3.4 },
    ],
    watermarkCenter: true,
  },
};

export const LETTERHEAD_FRAME_ORDER: LetterheadFrameId[] = [
  "wing_crest",
  "facet_geometry",
  "ribbon_brand",
  "wave_horizon",
  "arc_atelier",
];

export function parseLetterheadFrameId(value: string | null | undefined): LetterheadFrameId {
  if (!value) return "wing_crest";
  const legacy: Record<string, LetterheadFrameId> = {
    graphics_house: "wing_crest",
    dream_studio: "wing_crest",
    triangles: "facet_geometry",
    personal_brand: "ribbon_brand",
    wave_company: "wave_horizon",
    navy_gold: "facet_geometry",
    soft_arcs: "arc_atelier",
    tech_wave: "wave_horizon",
    corner_cut: "wing_crest",
    diagonal: "facet_geometry",
    wave: "wave_horizon",
    crest_line: "ribbon_brand",
    soft_arc: "arc_atelier",
    ribbon: "ribbon_brand",
    split_block: "facet_geometry",
    dual_bar: "wave_horizon",
    "ruwaq-classic": "wing_crest",
  };
  if (value in LETTERHEAD_FRAMES) return value as LetterheadFrameId;
  if (value in legacy) return legacy[value]!;
  return "wing_crest";
}

function boxStyle(box: OverlayBox): string {
  const parts: string[] = [`width:${box.width}%`, `height:${box.height}%`];
  if (box.left != null) parts.push(`left:${box.left}%`);
  if (box.right != null) parts.push(`right:${box.right}%`);
  if (box.top != null) parts.push(`top:${box.top}%`);
  if (box.bottom != null) parts.push(`bottom:${box.bottom}%`);
  return parts.join(";");
}

/** Original full-page chrome (A4 viewBox). Header + footer only — white body stays empty. */
export function buildLetterheadChromeSvg(frameId: LetterheadFrameId): string {
  const f = LETTERHEAD_FRAMES[frameId];
  const { primary: p, accent: a, mute: m } = f;

  switch (frameId) {
    case "wing_crest":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210" height="297" preserveAspectRatio="xMidYMid meet">
  <rect width="210" height="297" fill="#fff"/>
  <!-- Header wing sweep -->
  <path d="M0 0 H210 V28 C175 34 145 18 118 22 C88 27 62 42 0 36 Z" fill="${p}"/>
  <path d="M0 22 C48 48 78 8 112 18 C148 28 172 44 210 38 V52 C168 58 140 36 108 40 C72 45 40 62 0 48 Z" fill="${m}" opacity="0.55"/>
  <path d="M0 0 H78 V8 C52 14 28 18 0 14 Z" fill="${a}"/>
  <path d="M132 8 C158 4 184 10 210 6 V14 C182 18 156 12 132 14 Z" fill="${a}" opacity="0.85"/>
  <path fill="none" stroke="${a}" stroke-width="0.7" d="M18 40 C55 58 90 28 126 38 C162 48 184 56 198 52"/>
  <!-- Footer mirrored wing -->
  <path d="M0 297 H210 V268 C168 262 140 278 108 274 C72 269 40 254 0 260 Z" fill="${p}"/>
  <path d="M0 274 C42 252 78 286 118 278 C154 270 178 256 210 260 V248 C172 242 144 264 110 258 C74 251 38 236 0 250 Z" fill="${m}" opacity="0.5"/>
  <path d="M132 289 H210 V297 H150 Z" fill="${a}"/>
  <circle cx="24" cy="18" r="1.6" fill="${a}"/>
  <circle cx="186" cy="279" r="1.4" fill="${a}"/>
</svg>`;

    case "facet_geometry":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210" height="297" preserveAspectRatio="xMidYMid meet">
  <rect width="210" height="297" fill="#fff"/>
  <!-- Top-right facets -->
  <polygon points="118,0 210,0 210,72 168,48 148,22" fill="${p}"/>
  <polygon points="148,0 210,0 210,38 178,18" fill="${a}" opacity="0.9"/>
  <polygon points="128,0 168,0 155,28 118,42 108,18" fill="${m}" opacity="0.7"/>
  <polygon points="175,42 210,55 210,88 192,70" fill="${m}" opacity="0.45"/>
  <polygon points="0,0 42,0 28,22 0,16" fill="${p}"/>
  <line x1="108" y1="42" x2="148" y2="58" stroke="${a}" stroke-width="0.6" opacity="0.7"/>
  <line x1="148" y1="58" x2="188" y2="48" stroke="${a}" stroke-width="0.6" opacity="0.5"/>
  <!-- Bottom-left facets -->
  <polygon points="0,297 0,228 48,252 78,278 52,297" fill="${p}"/>
  <polygon points="0,297 0,268 38,282" fill="${a}" opacity="0.85"/>
  <polygon points="52,297 78,278 110,292 92,297" fill="${m}" opacity="0.55"/>
  <polygon points="0,228 22,242 0,252" fill="${m}" opacity="0.4"/>
  <rect x="0" y="54" width="3.2" height="168" fill="${p}" opacity="0.15"/>
  <rect x="206.8" y="90" width="3.2" height="140" fill="${p}" opacity="0.12"/>
</svg>`;

    case "ribbon_brand":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210" height="297" preserveAspectRatio="xMidYMid meet">
  <rect width="210" height="297" fill="#fff"/>
  <!-- Soft header ribbons -->
  <path d="M0 0 H210 V18 Q168 32 126 22 Q78 10 0 28 Z" fill="${p}"/>
  <path d="M0 26 C46 8 88 36 132 24 C168 14 190 28 210 22 V36 C178 44 152 28 118 36 C76 46 40 24 0 40 Z" fill="${a}" opacity="0.88"/>
  <path d="M0 38 C52 52 96 30 140 42 C172 50 194 40 210 46 V54 C176 46 148 58 112 50 C70 40 36 58 0 50 Z" fill="${m}" opacity="0.5"/>
  <circle cx="52" cy="48" r="1.2" fill="${p}" opacity="0.35"/>
  <circle cx="72" cy="52" r="1.2" fill="${p}" opacity="0.35"/>
  <circle cx="92" cy="49" r="1.2" fill="${p}" opacity="0.35"/>
  <circle cx="112" cy="53" r="1.2" fill="${p}" opacity="0.35"/>
  <!-- Footer ribbon bar -->
  <path d="M0 268 C40 258 80 278 120 266 C155 256 180 272 210 262 V297 H0 Z" fill="${p}"/>
  <path d="M0 278 C48 268 90 288 138 276 C170 268 192 280 210 274 V286 C176 292 148 280 110 288 C68 298 32 284 0 290 Z" fill="${a}" opacity="0.75"/>
  <rect x="18" y="292" width="42" height="1.4" rx="0.7" fill="${a}" opacity="0.5"/>
  <rect x="84" y="292" width="42" height="1.4" rx="0.7" fill="${a}" opacity="0.5"/>
  <rect x="150" y="292" width="42" height="1.4" rx="0.7" fill="${a}" opacity="0.5"/>
</svg>`;

    case "wave_horizon":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210" height="297" preserveAspectRatio="xMidYMid meet">
  <rect width="210" height="297" fill="#fff"/>
  <!-- Layered header waves -->
  <path d="M0 0 H210 V34 C175 48 140 22 105 36 C70 50 35 28 0 42 Z" fill="${p}"/>
  <path d="M0 36 C40 52 75 28 110 40 C145 52 175 34 210 46 V58 C172 44 142 64 108 52 C74 40 38 58 0 48 Z" fill="${m}" opacity="0.65"/>
  <path d="M0 48 C48 62 82 44 118 56 C154 68 182 50 210 60 V68 C176 56 148 72 114 62 C80 52 42 68 0 58 Z" fill="${a}" opacity="0.55"/>
  <path fill="none" stroke="${a}" stroke-width="0.9" d="M12 62 C48 74 78 58 112 68 C146 78 176 64 198 70"/>
  <!-- Footer waves -->
  <path d="M0 297 H210 V262 C172 248 140 274 105 260 C70 246 35 268 0 254 Z" fill="${p}"/>
  <path d="M0 260 C38 244 72 268 108 256 C144 244 176 262 210 252 V242 C174 254 144 236 110 248 C76 260 40 242 0 250 Z" fill="${m}" opacity="0.55"/>
  <path d="M0 248 C46 236 84 254 122 242 C158 232 186 248 210 240 V232 C178 242 150 228 116 238 C82 248 44 232 0 240 Z" fill="${a}" opacity="0.45"/>
</svg>`;

    case "arc_atelier":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210" height="297" preserveAspectRatio="xMidYMid meet">
  <rect width="210" height="297" fill="#fff"/>
  <!-- Corner soft arcs (header) -->
  <path d="M0 0 H210 V12 C150 8 60 8 0 12 Z" fill="${p}" opacity="0.12"/>
  <circle cx="0" cy="0" r="58" fill="none" stroke="${p}" stroke-width="14" opacity="0.18"/>
  <circle cx="0" cy="0" r="42" fill="none" stroke="${a}" stroke-width="8" opacity="0.35"/>
  <circle cx="0" cy="0" r="28" fill="none" stroke="${m}" stroke-width="5" opacity="0.4"/>
  <circle cx="210" cy="0" r="58" fill="none" stroke="${p}" stroke-width="14" opacity="0.18"/>
  <circle cx="210" cy="0" r="42" fill="none" stroke="${a}" stroke-width="8" opacity="0.35"/>
  <circle cx="210" cy="0" r="28" fill="none" stroke="${m}" stroke-width="5" opacity="0.4"/>
  <path d="M78 0 H132 V6 C118 10 92 10 78 6 Z" fill="${p}" opacity="0.25"/>
  <!-- Footer arcs + bar -->
  <circle cx="0" cy="297" r="48" fill="none" stroke="${p}" stroke-width="12" opacity="0.16"/>
  <circle cx="210" cy="297" r="48" fill="none" stroke="${p}" stroke-width="12" opacity="0.16"/>
  <circle cx="0" cy="297" r="32" fill="none" stroke="${a}" stroke-width="6" opacity="0.3"/>
  <circle cx="210" cy="297" r="32" fill="none" stroke="${a}" stroke-width="6" opacity="0.3"/>
  <rect x="0" y="278" width="210" height="19" fill="${p}" opacity="0.08"/>
  <line x1="24" y1="276" x2="186" y2="276" stroke="${a}" stroke-width="0.8" opacity="0.55"/>
</svg>`;
  }
}

export function frameThumbDataUri(frameId: LetterheadFrameId): string {
  const svg = buildLetterheadChromeSvg(frameId);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function frameThumbUrl(frameId: LetterheadFrameId): string {
  return frameThumbDataUri(frameId);
}

export function renderExactLetterheadHtml(options: {
  locale: "ar" | "en";
  frameId: LetterheadFrameId;
  appBaseUrl?: string;
  centerWatermark?: boolean;
}): string {
  const frame = LETTERHEAD_FRAMES[options.frameId];
  const isAr = options.locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const logoText = isAr ? "الشعار هنا" : "Logo here";
  const addressText = isAr ? "العنوان هنا" : "Address here";
  const showWm = options.centerWatermark !== false;
  const chrome = buildLetterheadChromeSvg(options.frameId);

  const addressHtml = frame.addressBoxes
    .map(
      (box) =>
        `<div class="lh-address" style="${boxStyle(box)}"><span>${addressText}</span></div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${options.locale}">
<head>
  <meta charset="utf-8">
  <title>${isAr ? frame.nameAr : frame.nameEn}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 20px;
      background: #e8e4dc;
      font-family: ${
        isAr
          ? "'IBM Plex Sans Arabic', Tahoma, sans-serif"
          : "'IBM Plex Sans', system-ui, sans-serif"
      };
      direction: ${dir};
    }
    .sheet {
      position: relative;
      width: 210mm;
      height: 297mm;
      margin: 0 auto;
      background: #fff;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(30,40,60,0.18);
    }
    .sheet-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
      user-select: none;
    }
    .sheet-bg svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .lh-logo {
      position: absolute;
      z-index: 5;
      border-radius: 50%;
      background: #fff;
      border: 2px dashed ${frame.accent};
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 6px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      aspect-ratio: 1 / 1;
      height: auto !important;
    }
    .lh-logo span {
      font-size: clamp(8px, 1.1vw, 12px);
      font-weight: 700;
      color: ${frame.primary};
      line-height: 1.3;
    }
    .lh-address {
      position: absolute;
      z-index: 5;
      border-radius: 6px;
      border: 1.5px dashed ${frame.accent};
      background: rgba(255,255,255,0.94);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 6px;
      text-align: center;
    }
    .lh-address span {
      font-size: clamp(8px, 1vw, 11px);
      font-weight: 700;
      color: ${frame.primary};
    }
    .wm {
      position: absolute;
      inset: 0;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: 0.09;
      font-size: 72px;
      font-weight: 800;
      color: ${frame.primary};
      letter-spacing: 0.08em;
    }
    @media print {
      body { padding: 0; background: #fff; }
      .sheet { box-shadow: none; width: 100%; height: 100vh; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="sheet-bg" aria-hidden="true">${chrome}</div>
    ${showWm ? `<div class="wm" aria-hidden="true">${isAr ? "نسق" : "NQ"}</div>` : ""}
    <div class="lh-logo" style="${boxStyle(frame.logo)}"><span>${logoText}</span></div>
    ${addressHtml}
  </div>
</body>
</html>`;
}

/* ---- Compatibility stubs for older import sites ---- */
import type { TemplatePalette } from "./template-palettes";
import type { ProposalExportData } from "./proposal-export-types";

export function buildLetterheadFrameCss(_palette: TemplatePalette, _dir: "rtl" | "ltr"): string {
  return "";
}

export function buildLetterheadHeaderHtml(_o: {
  data: ProposalExportData;
  palette: TemplatePalette;
  frameId: LetterheadFrameId;
  dir: "rtl" | "ltr";
  docTitle: string;
  preparedForLabel: string;
}): string {
  return "";
}

export function buildLetterheadFooterHtml(_o: {
  data: ProposalExportData;
  palette: TemplatePalette;
  frameId: LetterheadFrameId;
  dir: "rtl" | "ltr";
  labels: Record<string, string>;
}): string {
  return "";
}

export function buildCenterWatermarkHtml(_o: {
  palette: TemplatePalette;
  enabled: boolean;
  label: string;
}): string {
  return "";
}

export function buildLibraryHeaderHtml(): string {
  return "";
}

export function buildLibraryFooterHtml(): string {
  return "";
}

export function buildFrameThumbSvg(
  frameId: LetterheadFrameId,
  _primary?: string,
  _accent?: string
): string {
  return buildLetterheadChromeSvg(frameId);
}
