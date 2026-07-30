import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/shared/i18n/locale";
import {
  buildSampleExportData,
  buildStressTestExportData,
} from "@/modules/proposal/export/sample-proposal-data";
import { appBaseUrlFromEnv } from "@/modules/proposal/export/proposal-export-utils";
import { buildQuotePdfBufferFromExportData } from "@/modules/proposal/pdf/build-sample-quote-pdf";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const localeParam = req.nextUrl.searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "ar";
  const linesParam = req.nextUrl.searchParams.get("lines");
  const lineCount = linesParam ? Number.parseInt(linesParam, 10) : 0;
  const base = appBaseUrlFromEnv();

  const data =
    lineCount > 0
      ? buildStressTestExportData(locale, lineCount, base)
      : buildSampleExportData(locale, "ruwaq-classic", base);

  const buffer = await buildQuotePdfBufferFromExportData(locale, data);
  const suffix = lineCount > 0 ? `-stress-${lineCount}` : "";

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="ruwaq-sample${suffix}-${locale}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
