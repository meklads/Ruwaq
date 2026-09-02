import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/shared/i18n/locale";
import { buildSampleExportData } from "@/modules/proposal/export/sample-proposal-data";
import {
  isSampleTemplateSlug,
  type SampleTemplateSlug,
} from "@/modules/proposal/export/sample-template-keys";
import { renderProposalExportHtml } from "@/modules/proposal/export/templates";
import { appBaseUrlFromEnv } from "@/modules/proposal/export/proposal-export-utils";
import { parsePaletteQuery } from "@/modules/proposal/export/template-palettes";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  if (!isSampleTemplateSlug(slug)) {
    return NextResponse.json({ error: "Unknown sample template" }, { status: 404 });
  }

  const localeParam = req.nextUrl.searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "ar";
  const hfStyleId = req.nextUrl.searchParams.get("hf") ?? undefined;
  const palette = parsePaletteQuery(req.nextUrl.searchParams);
  const base = appBaseUrlFromEnv();
  const data = buildSampleExportData(
    locale,
    slug as SampleTemplateSlug,
    base,
    hfStyleId,
    palette
  );
  const html = renderProposalExportHtml(locale, data);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
