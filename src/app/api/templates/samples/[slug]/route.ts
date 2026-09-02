import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/shared/i18n/locale";
import { renderLetterheadStudioHtml } from "@/modules/proposal/export/letterhead-studio";
import { parseLetterheadFrameId } from "@/modules/proposal/export/letterhead-frames";
import { appBaseUrlFromEnv } from "@/modules/proposal/export/proposal-export-utils";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  await params; // slug unused — library is frame-based
  const localeParam = req.nextUrl.searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "ar";
  const frameId = parseLetterheadFrameId(req.nextUrl.searchParams.get("frame"));
  const wm = req.nextUrl.searchParams.get("wm");

  const html = renderLetterheadStudioHtml({
    locale,
    frameId,
    centerWatermark: wm === "0" ? false : true,
    appBaseUrl: appBaseUrlFromEnv(),
  });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
