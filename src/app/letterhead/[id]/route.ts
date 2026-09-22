import { NextRequest, NextResponse } from "next/server";
import {
  LETTERHEAD_FRAME_PREF_COOKIE,
  LETTERHEAD_PALETTE_PREF_COOKIE,
  parseLetterheadFrameId,
} from "@/modules/proposal/export/letterhead-frames";
import { TEMPLATE_PALETTES } from "@/modules/proposal/export/template-palettes";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

function parsePalette(value: string | null): string {
  if (value && value in TEMPLATE_PALETTES) return value;
  return "gold_sand";
}

/**
 * Gallery pick → cookies → company settings / export.
 * GET /letterhead/[id]?palette=gold_sand
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const frameId = parseLetterheadFrameId(id);
  const palette = parsePalette(req.nextUrl.searchParams.get("palette"));

  const dest = new URL("/workspace/proposals/new", req.url);
  dest.searchParams.set("frame", frameId);
  dest.searchParams.set("palette", palette);

  const res = NextResponse.redirect(dest);
  res.cookies.set(LETTERHEAD_FRAME_PREF_COOKIE, frameId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    httpOnly: false,
  });
  res.cookies.set(LETTERHEAD_PALETTE_PREF_COOKIE, palette, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    httpOnly: false,
  });
  return res;
}
