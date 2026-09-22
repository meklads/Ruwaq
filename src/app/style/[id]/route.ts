import { NextRequest, NextResponse } from "next/server";
import {
  HEADER_FOOTER_PREF_COOKIE,
  parseHeaderFooterStyleId,
} from "@/modules/proposal/export/header-footer-styles";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * Public showcase → cookie → company settings.
 * GET /style/[id] sets the preferred header/footer skin and redirects to login/settings.
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const styleId = parseHeaderFooterStyleId(id);
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", "/settings/company");

  const res = NextResponse.redirect(loginUrl);
  res.cookies.set(HEADER_FOOTER_PREF_COOKIE, styleId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    httpOnly: false,
  });
  return res;
}
