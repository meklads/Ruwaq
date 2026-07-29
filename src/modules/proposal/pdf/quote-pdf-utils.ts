import type { ProposalExportData } from "@/modules/proposal/export/proposal-export-types";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";
import { appBaseUrlFromEnv } from "@/modules/proposal/export/proposal-export-utils";

export type QuotePdfLine = {
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
  isEstimated: boolean;
};

export type QuotePdfPayload = {
  locale: Locale;
  labels: Messages["export"];
  pdfLabels: Messages["export"]["pdfQuote"];
  data: ProposalExportData;
  lines: QuotePdfLine[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
  logoSrc?: string;
};

export function buildQuoteLines(data: ProposalExportData): QuotePdfLine[] {
  const boq = data.boqLines ?? [];
  if (boq.length > 0) {
    return boq.map((line) => ({
      description: line.label,
      qty: 1,
      unitPrice: line.amount,
      total: line.amount,
      isEstimated: line.isEstimated,
    }));
  }
  return [
    {
      description: data.projectName,
      qty: 1,
      unitPrice: data.budget,
      total: data.budget,
      isEstimated: data.commercialMode === "estimate_only",
    },
  ];
}

export function computeQuoteTotals(subtotal: number, vatRate = 0.15) {
  const vatAmount = Math.round(subtotal * vatRate * 100) / 100;
  const grandTotal = Math.round((subtotal + vatAmount) * 100) / 100;
  return { vatRate, vatAmount, grandTotal };
}

export async function resolveLogoDataUri(logoUrl?: string): Promise<string | undefined> {
  if (!logoUrl?.trim()) return undefined;
  try {
    const base = appBaseUrlFromEnv();
    const href = logoUrl.startsWith("http") ? logoUrl : `${base}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}`;
    const res = await fetch(href, { cache: "no-store" });
    if (!res.ok) return undefined;
    const contentType = res.headers.get("content-type") ?? "image/png";
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 2_500_000) return undefined;
    return `data:${contentType};base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export function formatPdfMoney(amount: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-SA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted} ${locale === "ar" ? "ر.س" : "SAR"}`;
}
