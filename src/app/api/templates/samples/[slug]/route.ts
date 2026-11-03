import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/shared/i18n/locale";
import { renderLetterheadStudioHtml } from "@/modules/proposal/export/letterhead-studio";
import { parseLetterheadFrameId } from "@/modules/proposal/export/letterhead-frames";
import { appBaseUrlFromEnv } from "@/modules/proposal/export/proposal-export-utils";
import { buildSampleExportData } from "@/modules/proposal/export/sample-proposal-data";
import { isSampleTemplateSlug } from "@/modules/proposal/export/sample-template-keys";
import { renderProposalExportHtml } from "@/modules/proposal/export/templates";
import { parsePaletteQuery } from "@/modules/proposal/export/template-palettes";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const localeParam = req.nextUrl.searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "ar";

  // Ready sample proposals (NASAQ gallery): a full fictional proposal for the chosen template.
  if (req.nextUrl.searchParams.get("mode") === "proposal") {
    if (!isSampleTemplateSlug(slug)) {
      return NextResponse.json({ error: "Unknown sample template" }, { status: 404 });
    }
    const data = buildSampleExportData(
      locale,
      slug,
      appBaseUrlFromEnv(),
      req.nextUrl.searchParams.get("hf") ?? undefined,
      parsePaletteQuery(req.nextUrl.searchParams)
    );
    return new NextResponse(renderProposalExportHtml(locale, data), {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  const frameId = parseLetterheadFrameId(req.nextUrl.searchParams.get("frame"));
  const wm = req.nextUrl.searchParams.get("wm");
  const paletteId = req.nextUrl.searchParams.get("palette");
  const primary = req.nextUrl.searchParams.get("primary");
  const accent = req.nextUrl.searchParams.get("accent");

  const html = renderLetterheadStudioHtml({
    locale,
    frameId,
    centerWatermark: wm === "0" ? false : true,
    appBaseUrl: appBaseUrlFromEnv(),
    paletteId,
    primary,
    accent,
  });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
