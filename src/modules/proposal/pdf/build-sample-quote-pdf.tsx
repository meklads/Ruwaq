import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { getMessages } from "@/shared/i18n";
import type { Locale } from "@/shared/i18n/locale";
import type { ProposalExportData } from "@/modules/proposal/export/proposal-export-types";
import { ProposalQuotePdfDocument } from "./proposal-quote-pdf-document";
import { registerProposalPdfFonts } from "./register-pdf-fonts";
import {
  buildQuoteLines,
  computeQuoteTotals,
  type QuotePdfPayload,
} from "./quote-pdf-utils";

export async function buildQuotePdfBufferFromExportData(
  locale: Locale,
  data: ProposalExportData,
  options: { logoSrc?: string } = {}
): Promise<Buffer> {
  registerProposalPdfFonts();

  const messages = getMessages(locale);
  const lines = buildQuoteLines(data);
  const subtotal =
    lines.length > 0
      ? Math.round(lines.reduce((s, l) => s + l.total, 0) * 100) / 100
      : data.budget;
  const { vatRate, vatAmount, grandTotal } = computeQuoteTotals(subtotal, 0.15);

  const payload: QuotePdfPayload = {
    locale,
    labels: messages.export,
    pdfLabels: messages.export.pdfQuote,
    data,
    lines,
    subtotal,
    vatRate,
    vatAmount,
    grandTotal,
    logoSrc: options.logoSrc,
  };

  return renderToBuffer(<ProposalQuotePdfDocument payload={payload} />);
}
