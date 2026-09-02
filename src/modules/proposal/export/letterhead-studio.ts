/**
 * Empty A4 letterhead preview — header + footer library only.
 * Circle “الشعار هنا”, address rectangles “العنوان هنا”, no proposal content.
 */

import type { Locale } from "@/shared/i18n/locale";
import { localeDir } from "@/shared/i18n/locale";
import {
  buildCenterWatermarkHtml,
  buildLetterheadFrameCss,
  buildLibraryFooterHtml,
  buildLibraryHeaderHtml,
  parseLetterheadFrameId,
  type LetterheadFrameId,
} from "./letterhead-frames";
import {
  buildPaletteThemeCss,
  resolveTemplatePalette,
  type TemplatePalette,
} from "./template-palettes";

export function renderLetterheadStudioHtml(options: {
  locale: Locale;
  frameId?: LetterheadFrameId | string;
  palette?: TemplatePalette;
  centerWatermark?: boolean;
}): string {
  const { locale } = options;
  const dir = localeDir(locale);
  const palette = options.palette ?? resolveTemplatePalette({});
  const frameId = parseLetterheadFrameId(options.frameId);
  const isAr = locale === "ar";
  const copy = {
    logoHere: isAr ? "الشعار هنا" : "Logo here",
    addressHere: isAr ? "العنوان هنا" : "Address here",
    docTitle: isAr ? "عرض سعر" : "Proposal",
  };

  const header = buildLibraryHeaderHtml({ palette, frameId, dir, copy });
  const footer = buildLibraryFooterHtml({ palette, frameId, dir, copy });
  const watermark = buildCenterWatermarkHtml({
    palette,
    enabled: options.centerWatermark !== false,
    label: isAr ? "نسق" : "NQ",
  });

  const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">`;

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${locale}">
<head>
  <meta charset="utf-8">
  <title>${copy.docTitle}</title>
  ${fontLink}
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      background: #e8e4dc;
      font-family: ${
        isAr
          ? "'IBM Plex Sans Arabic', 'Noto Sans Arabic', Tahoma, sans-serif"
          : "'IBM Plex Sans', system-ui, sans-serif"
      };
      direction: ${dir};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .studio-sheet {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background: #fff;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 10px 36px rgba(47,74,110,0.16);
    }
    .studio-body {
      position: relative;
      z-index: 1;
      flex: 1;
      min-height: 160mm;
      background: #fff;
    }
    ${buildPaletteThemeCss(palette, dir)}
    ${buildLetterheadFrameCss(palette, dir)}
    .lh-header, .lh-footer { flex-shrink: 0; }
    .lh-center-watermark { position: absolute; }
    @media print {
      body { padding: 0; background: #fff; }
      .studio-sheet { box-shadow: none; width: 100%; min-height: 100vh; }
    }
  </style>
</head>
<body>
  <div class="studio-sheet">
    ${watermark}
    ${header}
    <main class="studio-body" aria-hidden="true"></main>
    ${footer}
  </div>
</body>
</html>`;
}
