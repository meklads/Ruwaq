import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/shared/i18n/locale";
import { buildSampleExportData } from "@/modules/proposal/export/sample-proposal-data";
import {
  isSampleTemplateSlug,
  type SampleTemplateSlug,
} from "@/modules/proposal/export/sample-template-keys";
import { renderProposalExportHtml } from "@/modules/proposal/export/templates";
import { renderLetterheadStudioHtml } from "@/modules/proposal/export/letterhead-studio";
import { appBaseUrlFromEnv } from "@/modules/proposal/export/proposal-export-utils";
import {
  parsePaletteQuery,
  resolveTemplatePalette,
} from "@/modules/proposal/export/template-palettes";
import { parseLetterheadFrameId } from "@/modules/proposal/export/letterhead-frames";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const localeParam = req.nextUrl.searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "ar";
  const paletteQuery = parsePaletteQuery(req.nextUrl.searchParams);
  const frameId = parseLetterheadFrameId(req.nextUrl.searchParams.get("frame"));
  const wm = req.nextUrl.searchParams.get("wm");
  const view = req.nextUrl.searchParams.get("view");
  const palette = resolveTemplatePalette(paletteQuery);

  // Library preview: empty letterhead page (header + footer only).
  if (view !== "full") {
    const html = renderLetterheadStudioHtml({
      locale,
      frameId,
      palette,
      centerWatermark: wm === "0" ? false : true,
    });
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  if (!isSampleTemplateSlug(slug)) {
    return NextResponse.json({ error: "Unknown sample template" }, { status: 404 });
  }

  const hfStyleId = req.nextUrl.searchParams.get("hf") ?? undefined;
  const base = appBaseUrlFromEnv();
  const data = buildSampleExportData(
    locale,
    slug as SampleTemplateSlug,
    base,
    hfStyleId,
    paletteQuery,
    { frameId, centerWatermark: wm === "0" ? false : true }
  );
  const html = renderProposalExportHtml(locale, data);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
