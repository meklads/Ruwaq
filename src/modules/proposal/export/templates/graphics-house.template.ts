import type { Locale } from "@/shared/i18n/locale";
import { getMessages } from "@/shared/i18n";
import { localeDir, localeToBcp47 } from "@/shared/i18n/locale";
import type { ProposalExportData } from "../proposal-export-types";
import { graphicsHouseBrand } from "../brands/graphics-house.tokens";
import { PAGED_JS_SCRIPT_TAG, buildPrintPaginationCss } from "../print-pagination";
import {
  escapeHtml,
  formatAmount,
} from "../proposal-export-utils";

function assetUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}${path}`;
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

function exportLink(href: string, label: string, color: string): string {
  return `<a href="${escapeHtml(href)}" style="color:${color};text-decoration:none;">${escapeHtml(label)}</a>`;
}

function headerBrandHtml(
  data: ProposalExportData,
  labels: ReturnType<typeof getMessages>["export"],
  base: string,
  assets: (typeof graphicsHouseBrand)["assets"]
): string {
  const logo = safeHttpUrl(data.logoUrl) ?? assetUrl(base, assets.logoMark);
  const companyName = data.companyName?.trim();

  return `<div class="header-brand-col" aria-label="${escapeHtml(labels.preparedBy)}">
      <img class="gh-logo" src="${escapeHtml(logo)}" alt="${escapeHtml(companyName ?? "Graphics House")}">
      ${companyName ? `<p class="header-company-name">${escapeHtml(companyName)}</p>` : ""}
    </div>`;
}

export function renderGraphicsHouseTemplate(
  locale: Locale,
  data: ProposalExportData
): string {
  const labels = getMessages(locale).export;
  const review = getMessages(locale).review;
  const dir = localeDir(locale);
  const bcp47 = localeToBcp47(locale);
  const { colors, fonts, footer, assets } = graphicsHouseBrand;
  const isExecutive = data.templateId === "ruwaq_executive";
  const currency = locale === "ar" ? "ريال" : "SAR";
  const docTitle = locale === "ar" ? "عرض سعر" : "Proposal";
  const fontFamily = locale === "ar" ? fonts.arabic : fonts.latin;
  const printBtnPos = dir === "rtl" ? "left: 16px" : "right: 16px";
  const base = data.appBaseUrl;

  const propertyLabels: Record<string, string> = {
    villa: locale === "ar" ? "فيلا" : "Villa",
    apartment: locale === "ar" ? "شقة" : "Apartment",
    office: locale === "ar" ? "مكتب" : "Office",
    retail: locale === "ar" ? "تجاري" : "Retail",
    other: locale === "ar" ? "أخرى" : "Other",
  };

  const isEstimate = data.commercialMode === "estimate_only";
  const displayTotal =
    isEstimate && data.budget <= 0
      ? labels.estimatePending
      : `${formatAmount(data.budget, locale)} ${currency}`;

  const metaRows = [
    [labels.preparedFor, data.clientName],
    data.proposalNumber ? [labels.proposalNumber, data.proposalNumber] : null,
    [labels.date, data.date],
    [labels.validity, data.validityDate],
    data.projectLocation ? [labels.location, data.projectLocation] : null,
    data.propertyType
      ? [labels.propertyType, propertyLabels[data.propertyType] ?? data.propertyType]
      : null,
    data.areaSqm && data.areaSqm > 0
      ? [labels.area, `${formatAmount(data.areaSqm, locale)} ${locale === "ar" ? "م²" : "sqm"}`]
      : null,
  ].filter(Boolean) as [string, string][];

  const identityRows = [
    data.crNumber ? [labels.crNumber, data.crNumber] : null,
    data.vatNumber ? [labels.vatNumber, data.vatNumber] : null,
    data.companyPhone ? [labels.phone, data.companyPhone] : null,
    data.companyEmail ? [labels.email, data.companyEmail] : null,
    data.address ? [labels.address, data.address] : null,
  ].filter(Boolean) as [string, string][];

  const showBrandPanel = Boolean(data.companyName?.trim() || safeHttpUrl(data.logoUrl) || data.platformBranding);

  const websiteHref = safeHttpUrl(data.website);
  const portfolioHref = safeHttpUrl(data.portfolioUrl);
  const catalogHref = safeHttpUrl(data.catalogUrl);
  const linkItems = [
    websiteHref ? exportLink(websiteHref, labels.websiteLink, colors.gold) : "",
    portfolioHref ? exportLink(portfolioHref, labels.portfolioLink, colors.gold) : "",
    catalogHref ? exportLink(catalogHref, labels.catalogLink, colors.gold) : "",
  ].filter(Boolean);

  const paymentSchedule = Array.isArray(data.commercialTerms?.paymentSchedule)
    ? (data.commercialTerms.paymentSchedule as Record<string, unknown>[])
    : [];

  const paymentRows = paymentSchedule
    .map((m) => {
      const amount =
        typeof m.amount === "number" && m.amount > 0
          ? `${formatAmount(m.amount, locale)} ${currency}`
          : isEstimate
            ? labels.tbd
            : `${formatAmount(m.amount, locale)} ${currency}`;
      return `<tr>
        <td style="padding:10px 14px;border-bottom:1px solid ${colors.cream};">${escapeHtml(m.label)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid ${colors.cream};text-align:center;">${escapeHtml(m.percentage)}%</td>
        <td style="padding:10px 14px;border-bottom:1px solid ${colors.cream};text-align:${dir === "rtl" ? "left" : "right"};font-weight:600;">${escapeHtml(amount)}</td>
      </tr>`;
    })
    .join("");

  const sectionTitle = (title: string) =>
    `<h2 class="section-title">${escapeHtml(title)}</h2>`;

  const printSurface = colors.printSurface;
  const printBorder = colors.printBorder;

  const platformBranding = data.platformBranding === true;
  const showWatermark = Boolean(data.watermarkClientName && data.watermarkDate);
  const watermarkText = showWatermark
    ? `${data.watermarkClientName} · ${data.watermarkDate}`
    : "";
  const variancePct = data.estimateVariancePercent ?? 15;
  const boqLines = data.boqLines ?? [];
  const clauseItems = data.clauseItems ?? [];
  const useClausePack = clauseItems.length > 0;

  const boqRows = boqLines
    .map((line) => {
      const amount =
        isEstimate && line.isEstimated && line.amount <= 0
          ? labels.tbd
          : `${formatAmount(line.amount, locale)} ${currency}`;
      const estimateTag = line.isEstimated
        ? `<span class="estimate-badge">${escapeHtml(review.boq.estimateBadge)}</span>`
        : "";
      return `<tr>
        <td class="boq-line-label">${escapeHtml(line.label)}${estimateTag}</td>
        <td class="col-center tabular">${escapeHtml(String(Math.round(line.percent * 10) / 10))}%</td>
        <td class="col-end tabular amount-cell">${escapeHtml(amount)}</td>
      </tr>`;
    })
    .join("");

  const boqSection =
    boqLines.length > 0
      ? `${sectionTitle(review.boq.title)}
      ${
        isEstimate
          ? `<div class="estimate-banner"><span class="estimate-banner-label">${escapeHtml(review.boq.estimateBadge)}</span>${escapeHtml(review.boq.estimateDisclaimerTop(variancePct))}</div>`
          : ""
      }
      <table class="boq-table">
        <thead><tr>
          <th>${escapeHtml(review.boq.lineItem)}</th>
          <th class="col-center">${escapeHtml(labels.percentage)}</th>
          <th class="col-end">${escapeHtml(labels.amount)}</th>
        </tr></thead>
        <tbody>${boqRows}</tbody>
      </table>
      ${
        isEstimate
          ? `<p class="estimate-footnote">${escapeHtml(review.boq.estimateDisclaimerBottom(variancePct))}</p>`
          : ""
      }`
      : "";

  const clauseBlocks = clauseItems
    .map(
      (clause, i) => `<div class="clause-item">
        <div class="clause-head">
          <span class="clause-num">${i + 1}</span>
          <span class="clause-cat">${escapeHtml(clause.categoryLabel)}</span>
        </div>
        <p class="clause-text">${escapeHtml(clause.text)}</p>
        ${
          clause.sourceRef
            ? `<div class="clause-ref">${escapeHtml(review.clauses.source)}: ${escapeHtml(clause.sourceRef)}</div>`
            : ""
        }
      </div>`
    )
    .join("");

  const clausePackMeta = [
    data.clausePackName,
    data.clausePackVersion ? `v${data.clausePackVersion}` : null,
    review.clauses.approvedCount(clauseItems.length),
  ]
    .filter(Boolean)
    .join(" · ");

  const clauseSection = useClausePack
    ? `${sectionTitle(review.clauses.title)}
      <p style="font-size:13px;color:${colors.textMuted};margin:-6px 0 16px;">${escapeHtml(clausePackMeta)}</p>
      ${clauseBlocks}
      <p style="font-size:11px;color:${colors.textMuted};margin:16px 0 0;padding:12px 14px;background:${colors.creamBg};border-radius:8px;border:1px solid ${colors.cream};line-height:1.6;">${escapeHtml(review.clauses.legalDisclaimer)}</p>`
    : "";

  const watermarkOverlay = showWatermark
    ? `<div class="watermark-layer" aria-hidden="true">
        <div class="watermark-grid">${Array.from({ length: 18 })
          .map(() => `<span class="watermark-tile">${escapeHtml(watermarkText)}</span>`)
          .join("")}</div>
      </div>
      <div class="watermark-band" aria-hidden="true">
        <span class="watermark-band-inner">${escapeHtml(watermarkText)}</span>
      </div>`
    : "";

  const bodyClass = `${showWatermark ? "has-watermark" : ""} gh-template`.trim();

  const milestones = Array.isArray(data.timeline?.milestones)
    ? (data.timeline!.milestones as Record<string, unknown>[])
    : [];

  const headerLogo = headerBrandHtml(data, labels, base, assets);
  const footerTagline = locale === "ar" ? footer.taglineAr : footer.taglineEn;
  const footerAddress = locale === "ar" ? footer.addressAr : footer.addressEn;
  const sampleBadge = platformBranding
    ? `<div style="display:inline-block;margin-top:10px;padding:4px 10px;border-radius:6px;background:rgba(212,175,55,0.18);border:1px solid ${colors.gold};font-size:11px;font-weight:600;color:${colors.gold};">${escapeHtml(labels.sampleBadge)}</div>`
    : "";

  const clientFooterLines = [
    data.companyName?.trim(),
    data.address?.trim(),
    data.companyPhone?.trim(),
    data.companyEmail?.trim(),
    data.crNumber ? `${labels.crNumber} ${data.crNumber}` : "",
    data.vatNumber ? `${labels.vatNumber} ${data.vatNumber}` : "",
  ].filter(Boolean);

  const clientFooter =
    clientFooterLines.length > 0
      ? `<footer class="doc-footer-client">
          <div style="font-weight:600;color:${colors.navy};margin-bottom:6px;">${escapeHtml(clientFooterLines[0] ?? "")}</div>
          ${clientFooterLines
            .slice(1)
            .map((line) => `<div style="margin-top:3px;">${escapeHtml(line)}</div>`)
            .join("")}
          <div style="margin-top:10px;opacity:0.7;font-size:10px;">${escapeHtml(labels.footer)}</div>
        </footer>`
      : `<footer class="doc-footer-client doc-footer-minimal">
          <div>${escapeHtml(labels.footer)}</div>
        </footer>`;

  const platformFooter = `<footer class="doc-footer">
      <div>
        <img src="${escapeHtml(assetUrl(base, assets.logoMark))}" alt="Graphics House" class="gh-footer-logo">
        <div class="doc-footer-tagline">${escapeHtml(footerTagline)}</div>
      </div>
      <div class="doc-footer-meta">
        <div>${escapeHtml(footerAddress)}</div>
        <div class="doc-footer-link"><a href="https://${footer.website}">${escapeHtml(footer.website)}</a></div>
        <div class="doc-footer-note">${escapeHtml(labels.sampleFooter)}</div>
      </div>
    </footer>`;

  const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Cairo:wght@400;600;700&family=Montserrat:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">`;

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${locale}">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(data.projectName)} — ${docTitle}</title>
  ${fontLink}
  <style>
    @media print {
      .no-print { display: none !important; }
      body { margin: 0; }
      .page-wrap { box-shadow: none !important; }
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      background: #e5e7eb;
      font-family: ${fontFamily};
      color: ${colors.text};
      direction: ${dir};
      text-align: ${dir === "rtl" ? "right" : "left"};
      line-height: 1.65;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page-wrap {
      max-width: 820px;
      margin: 0 auto;
      background: ${colors.white};
      box-shadow: 0 8px 32px rgba(15,23,42,0.12);
      overflow: hidden;
    }
    .print-btn {
      position: fixed; top: 16px; ${printBtnPos};
      padding: 10px 20px; background: ${colors.gold}; color: ${colors.navy};
      border: none; border-radius: 8px; cursor: pointer; font-size: 14px;
      font-weight: 700; z-index: 10; font-family: inherit;
    }
    .banner {
      background: ${colors.white};
      padding: 0 0 18px;
      color: ${colors.text};
      border-bottom: 1px solid ${printBorder};
    }
    .banner-teal-bar {
      height: 6px;
      background: linear-gradient(90deg, ${colors.navy}, ${colors.gold});
      margin-bottom: 18px;
    }
    .banner-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      padding: 0 32px;
    }
    .header-brand-col {
      flex-shrink: 0;
      text-align: center;
      min-width: 120px;
    }
    .gh-logo {
      max-width: 140px;
      max-height: 52px;
      width: auto;
      height: auto;
      display: block;
      margin: 0 auto 4px;
      object-fit: contain;
    }
    .header-company-name {
      font-size: 10px;
      font-weight: 700;
      color: ${colors.navy};
      margin: 0;
      line-height: 1.4;
    }
    .banner-main {
      flex: 1;
      min-width: min(100%, 240px);
    }
    .banner-badge {
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${colors.gold};
      font-weight: 700;
      margin-bottom: 4px;
    }
    .banner-title {
      font-size: 22px;
      font-weight: 700;
      color: ${colors.navy};
      margin: 0 0 4px;
      line-height: 1.38;
      word-break: break-word;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: ${colors.navy};
      margin: 28px 0 12px;
      padding: 0;
    }
    body.gh-template .clause-cat { color: ${colors.gold}; }
    body.gh-template .doc-footer-tagline { color: ${colors.navy}; }
    .gh-footer-logo { max-height: 36px; }
    .banner-client {
      font-size: 13px;
      color: ${colors.textMuted};
    }
    .content { padding: 24px 32px 12px; }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px 28px;
      background: ${colors.creamBg};
      border: 1px solid ${colors.cream};
      border-radius: 14px;
      padding: 18px 20px;
      margin-bottom: 28px;
      font-size: 13px;
    }
    .meta-grid div { color: ${colors.textMuted}; }
    .meta-grid strong { color: ${colors.navy}; font-weight: 600; }
    .intro {
      font-size: 14px;
      color: ${colors.text};
      line-height: 1.75;
      white-space: pre-wrap;
      margin-bottom: 8px;
      padding: 14px 16px;
      background: ${colors.creamBg};
      border-radius: 10px;
    }
    .scope-item {
      margin: 14px 0;
      padding: 14px 16px;
      background: ${colors.creamBg};
      border-radius: 10px;
      border: 1px solid ${colors.cream};
    }
    .scope-item h3 {
      font-size: 14px;
      font-weight: 700;
      color: ${colors.navy};
      margin: 0 0 6px;
    }
    .scope-item p {
      font-size: 13px;
      color: ${colors.textMuted};
      margin: 0;
      white-space: pre-wrap;
    }
    table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; }
    th {
      background: ${printSurface};
      color: ${colors.navy};
      padding: 10px 14px;
      font-size: 12px;
      font-weight: 600;
      text-align: start;
      border-bottom: 1px solid ${printBorder};
    }
    td { font-size: 13px; color: ${colors.text}; }
    .total-box {
      display: inline-block;
      background: ${printSurface};
      color: ${colors.navy};
      padding: 10px 18px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 700;
      margin: 8px 0 16px;
      border: 1px solid ${printBorder};
    }
    .estimate-banner {
      background: ${colors.estimateBg};
      border: 1px solid ${colors.estimateBorder};
      border-radius: 10px;
      padding: 14px 18px;
      font-size: 13px;
      color: ${colors.estimateText};
      line-height: 1.7;
      margin: 12px 0 18px;
    }
    .estimate-banner-label {
      display: inline-block;
      margin-${dir === "rtl" ? "left" : "right"}: 8px;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(201, 160, 99, 0.15);
      border: 1px solid rgba(201, 160, 99, 0.35);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: ${colors.estimateText};
      vertical-align: middle;
    }
    .estimate-footnote {
      font-size: 11px;
      color: ${colors.estimateText};
      margin: 0 0 22px;
      line-height: 1.65;
      padding: 10px 14px;
      background: ${colors.creamBg};
      border-radius: 8px;
      border: 1px solid ${colors.cream};
    }
    .estimate-badge {
      display: inline-block;
      margin-${dir === "rtl" ? "right" : "left"}: 8px;
      padding: 2px 8px;
      border-radius: 999px;
      background: ${colors.estimateBg};
      border: 1px solid ${colors.estimateBorder};
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: ${colors.estimateText};
      vertical-align: middle;
    }
    .boq-table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0 22px;
      border: 1px solid ${printBorder};
      border-radius: 8px;
      overflow: hidden;
    }
    .boq-table th {
      background: ${printSurface};
      color: ${colors.navy};
      padding: 10px 14px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.03em;
    }
    .boq-table td {
      padding: 11px 14px;
      font-size: 13px;
      color: ${colors.text};
      border-bottom: 1px solid ${colors.cream};
    }
    .boq-table tbody tr:nth-child(even) {
      background: ${colors.creamBg};
    }
    .boq-table tbody tr:last-child td {
      border-bottom: none;
    }
    .boq-line-label {
      font-weight: 500;
      line-height: 1.5;
    }
    .col-center { text-align: center; }
    .col-end { text-align: ${dir === "rtl" ? "left" : "right"}; }
    .tabular { font-variant-numeric: tabular-nums; }
    .amount-cell { font-weight: 700; color: ${colors.navy}; }
    ul { padding-inline-start: 20px; margin: 8px 0; }
    li { margin: 8px 0; font-size: 13px; color: ${colors.text}; }
    .signature {
      margin-top: 36px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }
    .signature-box {
      border-top: 1px solid ${printBorder};
      padding-top: 10px;
      font-size: 13px;
      color: ${colors.textMuted};
      min-height: 72px;
    }
    .doc-footer {
      background: ${printSurface};
      color: ${colors.text};
      padding: 18px 32px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      font-size: 11px;
      border-top: 1px solid ${printBorder};
    }
    .doc-footer img { max-height: 40px; }
    .doc-footer a { color: ${colors.navy}; text-decoration: none; font-weight: 600; }
    .doc-footer-tagline { color: ${colors.gold}; font-weight: 600; margin-top: 4px; }
    .doc-footer-meta {
      text-align: ${dir === "rtl" ? "left" : "right"};
      color: ${colors.textMuted};
    }
    .doc-footer-note { margin-top: 6px; font-size: 10px; opacity: 0.85; }
    .doc-footer-client {
      border-top: 1px solid ${printBorder};
      margin-top: 24px;
      padding: 16px 32px 20px;
      font-size: 12px;
      color: ${colors.textMuted};
      background: ${printSurface};
    }
    .doc-footer-minimal {
      text-align: center;
      font-size: 11px;
    }
    .clause-item {
      margin: 0 0 12px;
      padding: 14px 16px;
      background: ${colors.white};
      border: 1px solid ${printBorder};
      border-radius: 8px;
      page-break-inside: avoid;
    }
    .clause-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .clause-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 26px;
      height: 26px;
      border-radius: 50%;
      background: ${printSurface};
      color: ${colors.navy};
      font-size: 12px;
      font-weight: 700;
      border: 1px solid ${printBorder};
    }
    .clause-cat {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: ${colors.gold};
    }
    .clause-text {
      font-size: 13px;
      color: ${colors.text};
      line-height: 1.85;
      margin: 0;
      white-space: pre-wrap;
      text-align: justify;
    }
    .clause-ref {
      margin-top: 8px;
      font-size: 10px;
      color: ${colors.textMuted};
    }
    .watermark-layer {
      position: fixed;
      inset: 0;
      z-index: 9998;
      pointer-events: none;
      overflow: hidden;
    }
    .watermark-grid {
      position: absolute;
      inset: -25%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(6, 1fr);
      align-items: center;
      justify-items: center;
      transform: rotate(-28deg);
      opacity: 0.055;
    }
    .watermark-tile {
      font-size: 13px;
      font-weight: 600;
      color: ${colors.navy};
      white-space: nowrap;
      letter-spacing: 0.14em;
      user-select: none;
      font-family: ${fontFamily};
      text-transform: uppercase;
    }
    .watermark-band {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      pointer-events: none;
      padding: 0;
      background: linear-gradient(180deg, rgba(247,245,242,0.97) 0%, rgba(247,245,242,0.88) 100%);
      border-bottom: 2px solid ${colors.gold};
      box-shadow: 0 1px 0 rgba(15,23,42,0.06);
    }
    .watermark-band-inner {
      display: block;
      text-align: center;
      padding: 7px 16px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${colors.navy};
      font-family: ${fontFamily};
    }
    body.has-watermark .page-wrap {
      margin-top: 36px;
    }
    @media print {
      .watermark-grid { opacity: 0.07; }
      .watermark-band { opacity: 1; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body.has-watermark .page-wrap { margin-top: 32px; }
    }
    ${buildPrintPaginationCss(colors.white)}
  </style>
  ${PAGED_JS_SCRIPT_TAG}
</head>
<body class="${bodyClass}">
  ${watermarkOverlay}
  <button class="print-btn no-print" onclick="window.print()">${escapeHtml(labels.savePdf)}</button>
  <div class="page-wrap">
    <header class="banner">
      <div class="banner-teal-bar"></div>
      <div class="banner-top">
        <div class="banner-main">
          <div class="banner-badge">${escapeHtml(docTitle)}</div>
          <h1 class="banner-title">${escapeHtml(data.projectName)}</h1>
          <div class="banner-client">${escapeHtml(labels.preparedFor)} ${escapeHtml(data.clientName)}</div>
          ${sampleBadge}
        </div>
        ${showBrandPanel ? headerLogo : ""}
      </div>
    </header>

    <!-- Rendered here (not at the end of the document) so Paged.js's
         position: running(pageFooter) captures it before laying out
         page 1 — a running element only repeats on pages generated AFTER
         its source appears in the DOM, so this must sit near the top,
         right alongside the header, even though it visually renders in
         the page's bottom margin box on every page. -->
    ${platformBranding ? platformFooter : clientFooter}

    <main class="content">
      <div class="meta-grid">
        ${metaRows
          .map(
            ([label, value]) =>
              `<div><strong>${escapeHtml(label)}</strong> ${escapeHtml(value)}</div>`
          )
          .join("")}
        ${
          identityRows.length
            ? identityRows
                .map(
                  ([label, value]) =>
                    `<div><strong>${escapeHtml(label)}</strong> ${escapeHtml(value)}</div>`
                )
                .join("")
            : ""
        }
      </div>
      ${
        linkItems.length
          ? `<div style="font-size:13px;margin-bottom:20px;">${linkItems.join(" · ")}</div>`
          : ""
      }
      ${
        data.introduction
          ? `<div class="intro">${escapeHtml(data.introduction)}</div>`
          : ""
      }
      ${
        data.about?.trim()
          ? `${sectionTitle(labels.aboutUs)}<p style="font-size:14px;color:${colors.textMuted};line-height:1.75;white-space:pre-wrap;margin:0 0 8px;">${escapeHtml(data.about.trim())}</p>`
          : ""
      }

      ${sectionTitle(labels.scopeOfWork)}
      ${data.scopeItems
        .map(
          (item, i) => `<div class="scope-item">
            <h3>${i + 1}. ${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
          </div>`
        )
        .join("")}

      ${
        data.deliverables.length
          ? `${sectionTitle(labels.deliverables)}<ul>${data.deliverables
              .map(
                (d) =>
                  `<li><strong>${escapeHtml(d.name)}</strong> — ${escapeHtml(d.description)}</li>`
              )
              .join("")}</ul>`
          : ""
      }

      ${
        data.timeline
          ? `${sectionTitle(labels.timeline)}
             <p style="font-size:14px;">${escapeHtml(labels.duration)} <strong>${escapeHtml(String(data.timeline.duration ?? "TBD"))}</strong></p>
             ${
               milestones.length
                 ? `<ul>${milestones.map((m) => `<li>${escapeHtml(m.name)}</li>`).join("")}</ul>`
                 : ""
             }`
          : ""
      }

      ${sectionTitle(labels.commercialTerms)}
      ${isEstimate ? `<div class="estimate-banner">${escapeHtml(labels.estimateOnly)}</div>` : ""}
      <div class="total-box">
        ${escapeHtml(labels.total)} ${escapeHtml(displayTotal)}
        ${
          isEstimate && data.budget > 0
            ? ` <span style="font-size:12px;font-weight:500;opacity:0.85;">(${escapeHtml(labels.estimateIndicative)})</span>`
            : ""
        }
      </div>
      <table>
        <thead><tr>
          <th>${escapeHtml(labels.milestone)}</th>
          <th>${escapeHtml(labels.percentage)}</th>
          <th>${escapeHtml(labels.amount)}</th>
        </tr></thead>
        <tbody>${paymentRows}</tbody>
      </table>

      ${boqSection}

      ${clauseSection}

      ${
        !useClausePack && data.assumptions.length
          ? `${sectionTitle(labels.assumptions)}<ul>${data.assumptions.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>`
          : ""
      }
      ${
        !useClausePack && data.exclusions.length
          ? `${sectionTitle(labels.exclusions)}<ul>${data.exclusions.map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul>`
          : ""
      }

      ${sectionTitle(labels.acceptance)}
      <p style="font-size:13px;color:${colors.textMuted};margin-bottom:8px;">${escapeHtml(labels.acceptanceText)}</p>
      <div class="signature">
        <div class="signature-box"><strong style="color:${colors.navy};">${escapeHtml(labels.clientSignature)}</strong><br>${escapeHtml(data.clientName)}</div>
        <div class="signature-box"><strong style="color:${colors.navy};">${escapeHtml(labels.providerSignature)}</strong><br>${escapeHtml(data.companyName ?? "—")}</div>
      </div>
    </main>
  </div>
</body>
</html>`;
}
