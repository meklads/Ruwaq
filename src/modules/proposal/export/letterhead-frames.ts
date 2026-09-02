/**
 * Letterhead library — exact reference designs as full-page backgrounds.
 * Logo = circle “الشعار هنا” overlaid at the same spot as each sample.
 * Address = rectangles “العنوان هنا” overlaid on footer contact zones.
 */

export type LetterheadFrameId =
  | "graphics_house"
  | "dream_studio"
  | "triangles"
  | "personal_brand"
  | "wave_company"
  | "navy_gold"
  | "soft_arcs"
  | "tech_wave";

export type OverlayBox = {
  /** % of sheet width/height */
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
  /** Exact reference PNG under /letterheads/refs/ */
  image: string;
  /** White mask covering body text so only chrome shows */
  bodyMask: { top: number; bottom: number };
  logo: OverlayBox;
  addressBoxes: OverlayBox[];
  /** Soft watermark center optional */
  watermarkCenter?: boolean;
};

export const LETTERHEAD_FRAMES: Record<LetterheadFrameId, LetterheadFrame> = {
  graphics_house: {
    id: "graphics_house",
    nameAr: "Graphics House",
    nameEn: "Graphics House",
    image: "/letterheads/refs/template-p1.png",
    bodyMask: { top: 14, bottom: 16 },
    logo: { left: 5.5, top: 3.8, width: 9.5, height: 6.8 },
    addressBoxes: [
      { left: 58, bottom: 11, width: 36, height: 3.2 },
      { left: 58, bottom: 7.2, width: 36, height: 3.2 },
      { left: 58, bottom: 3.4, width: 36, height: 3.2 },
    ],
  },
  dream_studio: {
    id: "dream_studio",
    nameAr: "جناح استوديو",
    nameEn: "Dream Studio",
    image: "/letterheads/refs/dream-studio.png",
    bodyMask: { top: 12, bottom: 14 },
    logo: { left: 6, top: 3.5, width: 8.5, height: 6 },
    addressBoxes: [
      { right: 6, bottom: 11.5, width: 32, height: 2.8 },
      { right: 6, bottom: 8.2, width: 32, height: 2.8 },
      { right: 6, bottom: 4.9, width: 32, height: 2.8 },
    ],
  },
  triangles: {
    id: "triangles",
    nameAr: "مثلثات هندسية",
    nameEn: "Triangles",
    image: "/letterheads/refs/triangles.png",
    bodyMask: { top: 18, bottom: 12 },
    logo: { left: 6, top: 9, width: 9, height: 6.5 },
    addressBoxes: [
      { right: 6, bottom: 7.5, width: 34, height: 3 },
      { right: 6, bottom: 4, width: 34, height: 3 },
    ],
  },
  personal_brand: {
    id: "personal_brand",
    nameAr: "هوية شخصية",
    nameEn: "Personal Brand",
    image: "/letterheads/refs/personal-brand.png",
    bodyMask: { top: 14, bottom: 14 },
    logo: { left: 5.5, top: 5.5, width: 8.5, height: 6 },
    addressBoxes: [
      { left: 6, bottom: 8, width: 28, height: 4 },
      { left: 36, bottom: 8, width: 28, height: 4 },
      { left: 66, bottom: 8, width: 28, height: 4 },
    ],
  },
  wave_company: {
    id: "wave_company",
    nameAr: "موجة شركة",
    nameEn: "Company Wave",
    image: "/letterheads/refs/wave-company.png",
    bodyMask: { top: 16, bottom: 14 },
    logo: { left: 5, top: 3.2, width: 8, height: 5.8 },
    addressBoxes: [
      { right: 5, bottom: 10, width: 30, height: 2.6 },
      { right: 5, bottom: 7, width: 30, height: 2.6 },
      { right: 5, bottom: 4, width: 30, height: 2.6 },
    ],
  },
  navy_gold: {
    id: "navy_gold",
    nameAr: "كتل ذهبية",
    nameEn: "Navy Gold",
    image: "/letterheads/refs/navy-gold.png",
    bodyMask: { top: 16, bottom: 14 },
    logo: { left: 48, top: 4.5, width: 8, height: 5.8 },
    addressBoxes: [
      { left: 5, bottom: 5, width: 28, height: 4.5 },
      { left: 36, bottom: 5, width: 58, height: 4.5 },
    ],
  },
  soft_arcs: {
    id: "soft_arcs",
    nameAr: "أقواس ناعمة",
    nameEn: "Soft Arcs",
    image: "/letterheads/refs/soft-arcs.png",
    bodyMask: { top: 16, bottom: 12 },
    logo: { left: 42, top: 2.8, width: 16, height: 7.5 },
    addressBoxes: [
      { left: 8, bottom: 4.5, width: 26, height: 3.5 },
      { left: 37, bottom: 4.5, width: 26, height: 3.5 },
      { left: 66, bottom: 4.5, width: 26, height: 3.5 },
    ],
    watermarkCenter: true,
  },
  tech_wave: {
    id: "tech_wave",
    nameAr: "موجة تقنية",
    nameEn: "Tech Wave",
    image: "/letterheads/refs/tech-wave.png",
    bodyMask: { top: 18, bottom: 12 },
    logo: { right: 6, top: 2.5, width: 9, height: 6.5 },
    addressBoxes: [
      { left: 12, top: 12, width: 22, height: 2.4 },
      { left: 36, top: 12, width: 28, height: 2.4 },
      { left: 66, top: 12, width: 26, height: 2.4 },
    ],
  },
};

export const LETTERHEAD_FRAME_ORDER: LetterheadFrameId[] = [
  "graphics_house",
  "dream_studio",
  "triangles",
  "personal_brand",
  "wave_company",
  "navy_gold",
  "soft_arcs",
  "tech_wave",
];

export function parseLetterheadFrameId(value: string | null | undefined): LetterheadFrameId {
  if (!value) return "graphics_house";
  const legacy: Record<string, LetterheadFrameId> = {
    corner_cut: "dream_studio",
    diagonal: "triangles",
    wave: "wave_company",
    crest_line: "personal_brand",
    soft_arc: "soft_arcs",
    ribbon: "tech_wave",
    split_block: "navy_gold",
    dual_bar: "wave_company",
    "ruwaq-classic": "graphics_house",
  };
  if (value in LETTERHEAD_FRAMES) return value as LetterheadFrameId;
  if (value in legacy) return legacy[value]!;
  return "graphics_house";
}

function boxStyle(box: OverlayBox): string {
  const parts: string[] = [
    `width:${box.width}%`,
    `height:${box.height}%`,
  ];
  if (box.left != null) parts.push(`left:${box.left}%`);
  if (box.right != null) parts.push(`right:${box.right}%`);
  if (box.top != null) parts.push(`top:${box.top}%`);
  if (box.bottom != null) parts.push(`bottom:${box.bottom}%`);
  return parts.join(";");
}

export function renderExactLetterheadHtml(options: {
  locale: "ar" | "en";
  frameId: LetterheadFrameId;
  appBaseUrl: string;
  centerWatermark?: boolean;
}): string {
  const frame = LETTERHEAD_FRAMES[options.frameId];
  const isAr = options.locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const logoText = isAr ? "الشعار هنا" : "Logo here";
  const addressText = isAr ? "العنوان هنا" : "Address here";
  const base = options.appBaseUrl.replace(/\/$/, "");
  const imgSrc = `${base}${frame.image}`;
  const showWm = options.centerWatermark !== false && frame.watermarkCenter !== false;

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
      object-fit: fill;
      display: block;
      pointer-events: none;
      user-select: none;
    }
    .body-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: ${frame.bodyMask.top}%;
      bottom: ${frame.bodyMask.bottom}%;
      background: #ffffff;
      z-index: 2;
    }
    .lh-logo {
      position: absolute;
      z-index: 5;
      border-radius: 50%;
      background: #fff;
      border: 2px dashed #C9A063;
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
      color: #2F4A6E;
      line-height: 1.3;
    }
    .lh-address {
      position: absolute;
      z-index: 5;
      border-radius: 6px;
      border: 1.5px dashed #C9A063;
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
      color: #2F4A6E;
    }
    .wm {
      position: absolute;
      inset: 0;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: 0.1;
      font-size: 72px;
      font-weight: 800;
      color: #2F4A6E;
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
    <img class="sheet-bg" src="${imgSrc}" alt="">
    <div class="body-mask" aria-hidden="true"></div>
    ${showWm ? `<div class="wm" aria-hidden="true">${isAr ? "نسق" : "NQ"}</div>` : ""}
    <div class="lh-logo" style="${boxStyle(frame.logo)}"><span>${logoText}</span></div>
    ${addressHtml}
  </div>
</body>
</html>`;
}

/** Card thumbnail = the real reference image (cropped feel via object-fit). */
export function frameThumbUrl(frameId: LetterheadFrameId): string {
  return LETTERHEAD_FRAMES[frameId].image;
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
  const src = LETTERHEAD_FRAMES[frameId].image;
  return `<img src="${src}" alt="" style="width:100%;height:auto;display:block;aspect-ratio:210/297;object-fit:cover;object-position:top;"/>`;
}
