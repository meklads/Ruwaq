/**
 * Single-page letterhead studio preview — matches the reference pattern:
 * decorative header (logo) + soft center watermark + company footer.
 * No cover page, no long proposal body — the frame is the product.
 */

import type { Locale } from "@/shared/i18n/locale";
import { localeDir } from "@/shared/i18n/locale";
import { getMessages } from "@/shared/i18n";
import type { ProposalExportData } from "./proposal-export-types";
import {
  buildCenterWatermarkHtml,
  buildLetterheadFooterHtml,
  buildLetterheadFrameCss,
  buildLetterheadHeaderHtml,
  parseLetterheadFrameId,
  type LetterheadFrameId,
} from "./letterhead-frames";
import {
  buildPaletteThemeCss,
  resolveTemplatePalette,
  type TemplatePalette,
} from "./template-palettes";
import { escapeHtml } from "./proposal-export-utils";

export function renderLetterheadStudioHtml(options: {
  locale: Locale;
  data: ProposalExportData;
  frameId?: LetterheadFrameId | string;
  palette?: TemplatePalette;
}): string {
  const { locale, data } = options;
  const dir = localeDir(locale);
  const labels = getMessages(locale).export;
  const palette =
    options.palette ??
    resolveTemplatePalette({
      paletteId: data.paletteId,
      primary: data.palettePrimary,
      accent: data.paletteAccent,
      surface: data.paletteSurface,
    });
  const frameId = parseLetterheadFrameId(options.frameId ?? data.letterheadFrameId);
  const docTitle = locale === "ar" ? "عرض سعر" : "Proposal";

  const header = buildLetterheadHeaderHtml({
    data,
    palette,
    frameId,
    dir,
    docTitle,
    preparedForLabel: labels.preparedFor,
  });

  const footer = buildLetterheadFooterHtml({
    data,
    palette,
    frameId,
    dir,
    labels: {
      phone: labels.phone,
      email: labels.email,
      address: labels.address,
      crNumber: labels.crNumber,
      vatNumber: labels.vatNumber,
      websiteLink: labels.websiteLink,
      footer: labels.footer,
    },
  });

  const watermark = buildCenterWatermarkHtml({
    data,
    palette,
    enabled: data.centerWatermark !== false,
  });

  const bodyLines =
    locale === "ar"
      ? [
          "يسرّنا تقديم عرضنا وفق المواصفات المتفق عليها.",
          "يشمل النطاق الأعمال التنفيذية، الجدول الزمني، والشروط التجارية المرفقة.",
          "نلتزم بمعايير الجودة والتسليم المرحلي حسب الاتفاق.",
        ]
      : [
          "We are pleased to submit our proposal per the agreed specifications.",
          "Scope covers execution works, timeline, and the commercial terms enclosed.",
          "We commit to quality standards and phased handover as agreed.",
        ];

  const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">`;

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${locale}">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(data.companyName || docTitle)} — ${escapeHtml(docTitle)}</title>
  ${fontLink}
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: #ebe6de;
      font-family: ${
        locale === "ar"
          ? "'IBM Plex Sans Arabic', 'Noto Sans Arabic', Tahoma, sans-serif"
          : "'IBM Plex Sans', system-ui, sans-serif"
      };
      color: ${palette.text};
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
      box-shadow: 0 8px 28px rgba(47,74,110,0.14);
    }
    .studio-body {
      position: relative;
      z-index: 1;
      flex: 1;
      padding: 22px 36px 18px;
      background: #fff;
    }
    .studio-to {
      font-size: 12px;
      color: ${palette.textMuted};
      margin-bottom: 18px;
      line-height: 1.7;
    }
    .studio-to strong {
      display: block;
      color: ${palette.primary};
      font-size: 14px;
      margin-bottom: 2px;
    }
    .studio-date {
      float: ${dir === "rtl" ? "left" : "right"};
      font-size: 11px;
      color: ${palette.textMuted};
    }
    .studio-p {
      clear: both;
      font-size: 13px;
      line-height: 1.85;
      color: ${palette.text};
      margin: 0 0 12px;
      max-width: 58ch;
    }
    .studio-sign {
      margin-top: 36px;
      font-size: 12px;
      color: ${palette.textMuted};
    }
    .studio-sign-line {
      display: block;
      width: 160px;
      border-top: 1px solid ${palette.primary};
      margin-top: 28px;
      padding-top: 8px;
      color: ${palette.primary};
      font-weight: 700;
    }
    ${buildPaletteThemeCss(palette, dir)}
    ${buildLetterheadFrameCss(palette, dir)}
    .lh-header, .lh-footer { flex-shrink: 0; }
    .lh-center-watermark { position: absolute; }
  </style>
</head>
<body>
  <div class="studio-sheet">
    ${watermark}
    ${header}
    <main class="studio-body">
      <div class="studio-date">${escapeHtml(labels.date)} ${escapeHtml(data.date)}</div>
      <div class="studio-to">
        <strong>${escapeHtml(labels.preparedFor)} ${escapeHtml(data.clientName)}</strong>
        ${data.projectName ? `<span>${escapeHtml(data.projectName)}</span>` : ""}
      </div>
      ${bodyLines.map((line) => `<p class="studio-p">${escapeHtml(line)}</p>`).join("")}
      <div class="studio-sign">
        <span class="studio-sign-line">${escapeHtml(data.companyName || labels.providerSignature)}</span>
      </div>
    </main>
    ${footer}
  </div>
</body>
</html>`;
}
