import { NextRequest, NextResponse } from "next/server";
import {
  APP_GATE_REALM,
  getGateCredentials,
  isGateEnabled,
  shouldProtectPath,
  verifyBasicAuth,
} from "@/shared/lib/app-gate";

export function middleware(request: NextRequest) {
  if (!isGateEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (!shouldProtectPath(pathname)) {
    return NextResponse.next();
  }

  const credentials = getGateCredentials();
  if (!credentials) {
    return NextResponse.next();
  }

  if (verifyBasicAuth(request.headers.get("authorization"), credentials)) {
    return NextResponse.next();
  }

  return new NextResponse(
    "Ruwaq · Pre-launch access only.\n\nرواق · الوصول للمعاينة قبل الإطلاق فقط.",
    {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${APP_GATE_REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: [
    /*
     * Run on all routes except static files at root (images, etc.)
     * Marketing pages are allowed through via isPublicAppPath().
     */
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
