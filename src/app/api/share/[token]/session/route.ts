import { NextRequest, NextResponse } from "next/server";
import { startShareViewSession } from "@/modules/proposal/server/live-room.service";

export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string | null {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const session = await startShareViewSession(
      params.token,
      req.headers.get("user-agent"),
      clientIp(req)
    );
    if (!session) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(session);
  } catch (error) {
    console.error("Share session error:", error);
    return NextResponse.json({ error: "Failed to start session" }, { status: 500 });
  }
}
