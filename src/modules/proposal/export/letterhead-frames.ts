/**
 * NASAQ letterhead library:
 * - 1 Graphics House PDF example (fixed artwork)
 * - 4 very simple rectangular header/footer layouts (colorable)
 */

export type LetterheadFrameId =
  | "graphics_house"
  | "bar_classic"
  | "bar_accent"
  | "bar_split"
  | "bar_bands";

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
  /** Fixed reference image (Graphics House only) */
  image?: string;
  /** PDF download for the GH example */
  pdf?: string;
  colorable: boolean;
  logo: OverlayBox;
  addressBoxes: OverlayBox[];
};

export const LETTERHEAD_FRAMES: Record<LetterheadFrameId, LetterheadFrame> = {
  graphics_house: {
    id: "graphics_house",
    nameAr: "مثال Graphics House",
    nameEn: "Graphics House example",
    image: "/letterheads/refs/template-p1.png",
    pdf: "/letterheads/refs/template.pdf",
    colorable: false,
    logo: { left: 5.5, top: 3.8, width: 9.5, height: 6.8 },
    addressBoxes: [
      { left: 58, bottom: 11, width: 36, height: 3.2 },
      { left: 58, bottom: 7.2, width: 36, height: 3.2 },
      { left: 58, bottom: 3.4, width: 36, height: 3.2 },
    ],
  },
  bar_classic: {
    id: "bar_classic",
    nameAr: "شريط كلاسيكي",
    nameEn: "Classic bar",
    colorable: true,
    logo: { left: 5, top: 2.8, width: 9, height: 6.5 },
    addressBoxes: [
      { left: 5, bottom: 4.5, width: 28, height: 3.5 },
      { left: 36, bottom: 4.5, width: 28, height: 3.5 },
      { left: 67, bottom: 4.5, width: 28, height: 3.5 },
    ],
  },
  bar_accent: {
    id: "bar_accent",
    nameAr: "شريط بخط مميز",
    nameEn: "Accent line",
    colorable: true,
    logo: { left: 5, top: 2.5, width: 9, height: 6.5 },
    addressBoxes: [
      { right: 5, bottom: 5, width: 34, height: 3.2 },
      { right: 5, bottom: 1.4, width: 34, height: 3.2 },
    ],
  },
  bar_split: {
    id: "bar_split",
    nameAr: "شريط مقسوم",
    nameEn: "Split bar",
    colorable: true,
    logo: { left: 4, top: 2.2, width: 9, height: 6.5 },
    addressBoxes: [
      { left: 5, bottom: 3.8, width: 42, height: 3.4 },
      { left: 52, bottom: 3.8, width: 43, height: 3.4 },
    ],
  },
  bar_bands: {
    id: "bar_bands",
    nameAr: "شريطان متراكبان",
    nameEn: "Double band",
    colorable: true,
    logo: { left: 42, top: 2.8, width: 16, height: 7 },
    addressBoxes: [
      { left: 8, bottom: 3.5, width: 26, height: 3.2 },
      { left: 37, bottom: 3.5, width: 26, height: 3.2 },
      { left: 66, bottom: 3.5, width: 26, height: 3.2 },
    ],
  },
};

export const LETTERHEAD_FRAME_ORDER: LetterheadFrameId[] = [
  "graphics_house",
  "bar_classic",
  "bar_accent",
  "bar_split",
  "bar_bands",
];

export function parseLetterheadFrameId(value: string | null | undefined): LetterheadFrameId {
  if (!value) return "bar_classic";
  const legacy: Record<string, LetterheadFrameId> = {
    wing_crest: "bar_classic",
    facet_geometry: "bar_split",
    ribbon_brand: "bar_accent",
    wave_horizon: "bar_bands",
    arc_atelier: "bar_bands",
    dream_studio: "bar_classic",
    triangles: "bar_split",
    personal_brand: "bar_accent",
    wave_company: "bar_bands",
    navy_gold: "bar_split",
    soft_arcs: "bar_bands",
    tech_wave: "bar_accent",
    corner_cut: "bar_classic",
    diagonal: "bar_split",
    wave: "bar_bands",
    crest_line: "bar_accent",
    soft_arc: "bar_bands",
    ribbon: "bar_accent",
    split_block: "bar_split",
    dual_bar: "bar_bands",
    "ruwaq-classic": "bar_classic",
  };
  if (value in LETTERHEAD_FRAMES) return value as LetterheadFrameId;
  if (value in legacy) return legacy[value]!;
  return "bar_classic";
}

function boxStyle(box: OverlayBox): string {
  const parts: string[] = [`width:${box.width}%`, `height:${box.height}%`];
  if (box.left != null) parts.push(`left:${box.left}%`);
  if (box.right != null) parts.push(`right:${box.right}%`);
  if (box.top != null) parts.push(`top:${box.top}%`);
  if (box.bottom != null) parts.push(`bottom:${box.bottom}%`);
  return parts.join(";");
}

/** Simple rectangular chrome only — colors drive the look. */
export function buildLetterheadChromeSvg(
  frameId: LetterheadFrameId,
  primary: string,
  accent: string
): string {
  const p = primary;
  const a = accent;

  switch (frameId) {
    case "bar_classic":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210" height="297" preserveAspectRatio="none">
  <rect width="210" height="297" fill="#fff"/>
  <rect x="0" y="0" width="210" height="28" fill="${p}"/>
  <rect x="0" y="269" width="210" height="28" fill="${p}"/>
</svg>`;

    case "bar_accent":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210" height="297" preserveAspectRatio="none">
  <rect width="210" height="297" fill="#fff"/>
  <rect x="0" y="0" width="210" height="24" fill="${p}"/>
  <rect x="0" y="24" width="210" height="4" fill="${a}"/>
  <rect x="0" y="269" width="210" height="4" fill="${a}"/>
  <rect x="0" y="273" width="210" height="24" fill="${p}"/>
</svg>`;

    case "bar_split":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210" height="297" preserveAspectRatio="none">
  <rect width="210" height="297" fill="#fff"/>
  <rect x="0" y="0" width="140" height="26" fill="${p}"/>
  <rect x="140" y="0" width="70" height="26" fill="${a}"/>
  <rect x="0" y="271" width="70" height="26" fill="${a}"/>
  <rect x="70" y="271" width="140" height="26" fill="${p}"/>
</svg>`;

    case "bar_bands":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210" height="297" preserveAspectRatio="none">
  <rect width="210" height="297" fill="#fff"/>
  <rect x="0" y="0" width="210" height="18" fill="${p}"/>
  <rect x="0" y="18" width="210" height="12" fill="${a}"/>
  <rect x="0" y="267" width="210" height="12" fill="${a}"/>
  <rect x="0" y="279" width="210" height="18" fill="${p}"/>
</svg>`;

    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297"><rect width="210" height="297" fill="#fff"/></svg>`;
  }
}

export function frameThumbDataUri(
  frameId: LetterheadFrameId,
  primary = "#2F4A6E",
  accent = "#C9A063"
): string {
  const frame = LETTERHEAD_FRAMES[frameId];
  if (frame.image) return frame.image;
  const svg = buildLetterheadChromeSvg(frameId, primary, accent);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function frameThumbUrl(
  frameId: LetterheadFrameId,
  primary?: string,
  accent?: string
): string {
  return frameThumbDataUri(frameId, primary, accent);
}

export function renderExactLetterheadHtml(options: {
  locale: "ar" | "en";
  frameId: LetterheadFrameId;
  appBaseUrl?: string;
  centerWatermark?: boolean;
  primary?: string;
  accent?: string;
}): string {
  const frame = LETTERHEAD_FRAMES[options.frameId];
  const isAr = options.locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const logoText = isAr ? "الشعار هنا" : "Logo here";
  const addressText = isAr ? "العنوان هنا" : "Address here";
  const showWm = options.centerWatermark !== false;
  const primary = options.primary ?? "#2F4A6E";
  const accent = options.accent ?? "#C9A063";
  const base = (options.appBaseUrl ?? "").replace(/\/$/, "");

  const addressHtml = frame.addressBoxes
    .map(
      (box) =>
        `<div class="lh-address" style="${boxStyle(box)}"><span>${addressText}</span></div>`
    )
    .join("");

  let chromeHtml: string;
  if (frame.image) {
    const imgSrc = `${base}${frame.image}`;
    chromeHtml = `<img class="sheet-bg-img" src="${imgSrc}" alt="">
    <div class="body-mask" aria-hidden="true"></div>`;
  } else {
    chromeHtml = `<div class="sheet-bg" aria-hidden="true">${buildLetterheadChromeSvg(
      options.frameId,
      primary,
      accent
    )}</div>`;
  }

  const pdfLink =
    frame.pdf &&
    `<p class="pdf-note"><a href="${base}${frame.pdf}" target="_blank" rel="noopener">${
      isAr ? "تحميل مثال PDF (Graphics House)" : "Download PDF example (Graphics House)"
    }</a></p>`;

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
    .pdf-note { text-align: center; margin: 0 0 12px; }
    .pdf-note a { color: ${primary}; font-weight: 700; font-size: 13px; }
    .sheet {
      position: relative;
      width: 210mm;
      height: 297mm;
      margin: 0 auto;
      background: #fff;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(30,40,60,0.18);
    }
    .sheet-bg, .sheet-bg-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
      user-select: none;
    }
    .sheet-bg svg { width: 100%; height: 100%; display: block; }
    .sheet-bg-img { object-fit: fill; }
    .body-mask {
      position: absolute;
      left: 0; right: 0;
      top: 14%; bottom: 16%;
      background: #fff;
      z-index: 2;
    }
    .lh-logo {
      position: absolute;
      z-index: 5;
      border-radius: 50%;
      background: #fff;
      border: 2px dashed ${accent};
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
      color: ${primary};
      line-height: 1.3;
    }
    .lh-address {
      position: absolute;
      z-index: 5;
      border-radius: 6px;
      border: 1.5px dashed ${accent};
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
      color: ${primary};
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
      color: ${primary};
      letter-spacing: 0.08em;
    }
    @media print {
      body { padding: 0; background: #fff; }
      .pdf-note { display: none; }
      .sheet { box-shadow: none; width: 100%; height: 100vh; }
    }
  </style>
</head>
<body>
  ${pdfLink || ""}
  <div class="sheet">
    ${chromeHtml}
    ${showWm ? `<div class="wm" aria-hidden="true">${isAr ? "نسق" : "NQ"}</div>` : ""}
    <div class="lh-logo" style="${boxStyle(frame.logo)}"><span>${logoText}</span></div>
    ${addressHtml}
  </div>
</body>
</html>`;
}

/* ---- Compatibility stubs ---- */
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
  primary = "#2F4A6E",
  accent = "#C9A063"
): string {
  if (LETTERHEAD_FRAMES[frameId].image) {
    const src = LETTERHEAD_FRAMES[frameId].image!;
    return `<img src="${src}" alt="" style="width:100%;height:auto;display:block;aspect-ratio:210/297;object-fit:cover;object-position:top;"/>`;
  }
  return buildLetterheadChromeSvg(frameId, primary, accent);
}
