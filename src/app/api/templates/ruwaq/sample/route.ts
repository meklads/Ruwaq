import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/shared/i18n/locale";
import { buildSampleExportData } from "@/modules/proposal/export/sample-proposal-data";
import { renderProposalExportHtml } from "@/modules/proposal/export/templates";
import { appBaseUrlFromEnv } from "@/modules/proposal/export/proposal-export-utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const localeParam = req.nextUrl.searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "ar";
  const base = appBaseUrlFromEnv();
  const data = buildSampleExportData(locale, "ruwaq-classic", base);
  const html = renderProposalExportHtml(locale, data);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
