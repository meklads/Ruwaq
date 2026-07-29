import { renderToBuffer } from "@react-pdf/renderer";
import { loadProposalExportContext } from "@/modules/proposal/server/proposal-export-data";
import { appBaseUrlFromEnv } from "@/modules/proposal/export/proposal-export-utils";
import { ProposalQuotePdfDocument } from "./proposal-quote-pdf-document";
import { registerProposalPdfFonts } from "./register-pdf-fonts";
import {
  buildQuoteLines,
  computeQuoteTotals,
  resolveLogoDataUri,
  type QuotePdfPayload,
} from "./quote-pdf-utils";

export async function buildProposalQuotePdfBuffer(
  proposalId: string,
  options: { watermarked?: boolean } = {}
): Promise<{ buffer: Buffer; projectName: string } | null> {
  registerProposalPdfFonts();

  const ctx = await loadProposalExportContext(proposalId, options);
  if (!ctx) return null;

  const data = {
    ...ctx.exportData,
    appBaseUrl: appBaseUrlFromEnv(),
  };

  const lines = buildQuoteLines(data);
  const subtotal =
    lines.length > 0
      ? Math.round(lines.reduce((s, l) => s + l.total, 0) * 100) / 100
      : data.budget;
  const { vatRate, vatAmount, grandTotal } = computeQuoteTotals(subtotal, 0.15);
  const logoSrc = await resolveLogoDataUri(data.logoUrl);

  const payload: QuotePdfPayload = {
    locale: ctx.locale,
    labels: ctx.messages.export,
    pdfLabels: ctx.messages.export.pdfQuote,
    data,
    lines,
    subtotal,
    vatRate,
    vatAmount,
    grandTotal,
    logoSrc,
  };

  const buffer = await renderToBuffer(<ProposalQuotePdfDocument payload={payload} />);

  return { buffer, projectName: ctx.projectName };
}
