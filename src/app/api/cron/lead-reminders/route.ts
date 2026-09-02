import { NextResponse } from "next/server";
import { processContractorLeadReminders } from "@/modules/marketplace/server/lead-reminder.service";

export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

/** Coolify / external cron: GET with Authorization: Bearer $CRON_SECRET */
export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result = await processContractorLeadReminders();
  return NextResponse.json({ ok: true, ...result, timestamp: new Date().toISOString() });
}
