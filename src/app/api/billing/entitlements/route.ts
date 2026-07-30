import { NextResponse } from "next/server";
import { getSession } from "@/modules/auth/server/session";
import { getCompanyEntitlements } from "@/modules/billing/server/entitlements.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entitlements = await getCompanyEntitlements(userId);
  if (!entitlements) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json({ entitlements });
}
