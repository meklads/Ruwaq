import type { ProposalExportData } from "./proposal-export-types";
import { escapeHtml } from "./proposal-export-utils";

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

export function companyInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

type LetterheadColors = {
  navy: string;
  gold: string;
  goldLight: string;
  white: string;
  textMuted: string;
};

export function buildHeaderLogoHtml(
  data: ProposalExportData,
  labels: { logoPlaceholder: string; preparedBy: string },
  usePlaceholder: boolean,
  colors: LetterheadColors
): string {
  const logo = usePlaceholder ? null : safeHttpUrl(data.logoUrl);
  const companyName = data.companyName?.trim();

  const inner = logo
    ? `<img src="${escapeHtml(logo)}" alt="">`
    : `<span class="logo-monogram-text">${escapeHtml(
        companyName ? companyInitials(companyName) : labels.logoPlaceholder.slice(0, 2)
      )}</span>`;

  const frameClass = logo ? "logo-letterhead" : "logo-monogram";

  return `<div class="header-logo-col letterhead" aria-label="${escapeHtml(labels.preparedBy)}">
      <div class="${frameClass}">${inner}</div>
      ${companyName ? `<p class="header-company-name">${escapeHtml(companyName)}</p>` : ""}
    </div>`;
}

export function buildCoverPageHtml(options: {
  locale: "ar" | "en";
  data: ProposalExportData;
  colors: LetterheadColors;
  docTitle: string;
  preparedForLabel: string;
  dateLabel: string;
  validityLabel: string;
  confidentialLabel: string;
  isExecutive: boolean;
  useLogoPlaceholder: boolean;
  mandalaUrl: string;
  headerLogoHtml: string;
  footerHtml: string;
}): string {
  const {
    locale,
    data,
    colors,
    docTitle,
    preparedForLabel,
    dateLabel,
    validityLabel,
    confidentialLabel,
    isExecutive,
    useLogoPlaceholder,
    mandalaUrl,
    headerLogoHtml,
    footerHtml,
  } = options;

  const logo = useLogoPlaceholder ? null : safeHttpUrl(data.logoUrl);
  const companyName = data.companyName?.trim();
  const coverClass = `cover-page${isExecutive ? " cover-page--executive" : ""}`;

  const logoBlock = logo
    ? `<div class="cover-logo cover-logo--image"><img src="${escapeHtml(logo)}" alt=""></div>`
    : companyName
      ? `<div class="cover-logo cover-logo--monogram"><span>${escapeHtml(
          companyInitials(companyName)
        )}</span></div>`
      : "";

  const metaRows = [
    [dateLabel, data.date],
    [validityLabel, data.validityDate],
    data.proposalNumber ? [locale === "ar" ? "رقم العرض" : "Proposal #", data.proposalNumber] : null,
    data.projectLocation
      ? [locale === "ar" ? "الموقع" : "Location", data.projectLocation]
      : null,
  ].filter(Boolean) as [string, string][];

  return `<section class="${coverClass}" aria-label="${escapeHtml(docTitle)}">
      <div class="cover-chrome-header">
        <div class="cover-chrome-header-inner">
          <div>
            <div class="banner-badge" style="margin:0 0 4px;">${escapeHtml(docTitle)}</div>
            <div class="cover-chrome-project">${escapeHtml(data.projectName)}</div>
          </div>
          ${headerLogoHtml}
        </div>
      </div>
      <div class="cover-ornament" aria-hidden="true">
        <img src="${escapeHtml(mandalaUrl)}" alt="">
      </div>
      <div class="cover-inner">
        ${logoBlock}
        ${companyName ? `<p class="cover-company">${escapeHtml(companyName)}</p>` : ""}
        <p class="cover-eyebrow">${escapeHtml(docTitle)}</p>
        <h1 class="cover-title">${escapeHtml(data.projectName)}</h1>
        <p class="cover-client">${escapeHtml(preparedForLabel)} ${escapeHtml(data.clientName)}</p>
        <div class="cover-meta">
          ${metaRows
            .map(
              ([label, value]) =>
                `<div class="cover-meta-item"><span class="cover-meta-label">${escapeHtml(
                  label
                )}</span><span class="cover-meta-value">${escapeHtml(value)}</span></div>`
            )
            .join("")}
        </div>
        <div class="cover-footer">
          <span class="cover-confidential">${escapeHtml(confidentialLabel)}</span>
          <span class="cover-gold-rule" aria-hidden="true"></span>
        </div>
      </div>
      <div class="cover-chrome-footer">${footerHtml}</div>
    </section>`;
}

export function buildCoverPageCss(
  colors: LetterheadColors,
  dir: "rtl" | "ltr",
  isExecutive: boolean
): string {
  const textAlign = dir === "rtl" ? "right" : "left";

  return `
    .cover-page {
      position: relative;
      min-height: 297mm;
      padding: 0;
      background: linear-gradient(165deg, ${colors.white} 0%, #f7f4ef 48%, ${colors.white} 100%);
      border-bottom: 1px solid rgba(47, 74, 110, 0.1);
      break-after: page;
      page-break-after: always;
      overflow: hidden;
      text-align: ${textAlign};
      display: flex;
      flex-direction: column;
    }
    .cover-page--executive {
      background: linear-gradient(145deg, ${colors.navy} 0%, #3d5a80 100%);
      color: ${colors.white};
      border-bottom: 4px solid ${colors.gold};
    }
    .cover-chrome-header {
      padding: 14px 28px;
      flex-shrink: 0;
    }
    .cover-chrome-header-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }
    .cover-chrome-project {
      font-size: 14px;
      font-weight: 700;
      line-height: 1.35;
      max-width: 420px;
    }
    .cover-chrome-footer {
      margin-top: auto;
      flex-shrink: 0;
      padding: 14px 28px 16px;
    }
    .cover-chrome-footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      flex-wrap: wrap;
      font-size: 11px;
    }
    .cover-chrome-footer-company {
      font-weight: 700;
    }
    .cover-chrome-footer-meta {
      opacity: 0.8;
      max-width: 320px;
      text-align: ${dir === "rtl" ? "left" : "right"};
    }
    .cover-ornament {
      position: absolute;
      ${dir === "rtl" ? "left" : "right"}: -8%;
      top: 12%;
      width: 52%;
      max-width: 420px;
      opacity: ${isExecutive ? 0.07 : 0.045};
      pointer-events: none;
    }
    .cover-ornament img {
      width: 100%;
      height: auto;
      display: block;
    }
    .cover-inner {
      position: relative;
      z-index: 1;
      max-width: 620px;
      margin: 0 auto;
      padding: 28px 40px 32px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .cover-logo {
      margin-bottom: 18px;
    }
    .cover-logo--image img {
      max-height: 72px;
      max-width: 220px;
      object-fit: contain;
      display: block;
    }
    .cover-logo--monogram {
      width: 72px;
      height: 72px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${isExecutive ? "rgba(255,255,255,0.08)" : colors.navy};
      border: 1.5px solid ${isExecutive ? "rgba(255,255,255,0.28)" : colors.gold};
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: ${isExecutive ? colors.white : colors.goldLight};
    }
    .cover-company {
      margin: 0 0 28px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: ${isExecutive ? "rgba(255,255,255,0.72)" : colors.textMuted};
    }
    .cover-eyebrow {
      margin: 0 0 10px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${colors.gold};
    }
    .cover-title {
      margin: 0 0 14px;
      font-size: clamp(28px, 4.2vw, 36px);
      font-weight: 800;
      line-height: 1.22;
      color: ${isExecutive ? colors.white : colors.navy};
      letter-spacing: -0.02em;
    }
    .cover-client {
      margin: 0 0 32px;
      font-size: 15px;
      color: ${isExecutive ? "rgba(255,255,255,0.78)" : colors.textMuted};
    }
    .cover-meta {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px 24px;
      margin-bottom: 48px;
      padding: 18px 20px;
      border-radius: ${isExecutive ? "2px" : "12px"};
      background: ${isExecutive ? "rgba(255,255,255,0.06)" : colors.white};
      border: 1px solid ${isExecutive ? "rgba(255,255,255,0.14)" : "rgba(15,23,42,0.08)"};
    }
    .cover-meta-label {
      display: block;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: ${isExecutive ? "rgba(255,255,255,0.55)" : colors.textMuted};
      margin-bottom: 4px;
    }
    .cover-meta-value {
      font-size: 13px;
      font-weight: 600;
      color: ${isExecutive ? colors.white : colors.navy};
    }
    .cover-footer {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: auto;
      padding-top: 24px;
    }
    .cover-confidential {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${isExecutive ? colors.goldLight : colors.textMuted};
    }
    .cover-gold-rule {
      flex: 1;
      height: 2px;
      background: linear-gradient(90deg, ${colors.gold}, transparent);
      opacity: 0.85;
    }
    .logo-letterhead {
      width: 88px;
      height: 88px;
      border-radius: 10px;
      background: ${colors.white};
      border: 1px solid rgba(15, 23, 42, 0.1);
      box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin: 0 auto 8px;
    }
    .logo-letterhead img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 10px;
    }
    .logo-monogram {
      width: 72px;
      height: 72px;
      border-radius: 10px;
      background: linear-gradient(145deg, ${colors.navy} 0%, #3d5a80 100%);
      border: 1.5px solid ${colors.gold};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 8px;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.18);
    }
    .logo-monogram-text {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: ${colors.goldLight};
      line-height: 1;
    }
    body.variant-executive .logo-letterhead {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.22);
      box-shadow: none;
    }
    body.variant-executive .logo-monogram {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.3);
    }
  `;
}
