import { NextRequest, NextResponse } from "next/server";
import {
  recordShareClientAction,
  submitAmendmentRequest,
  submitSoftApprove,
} from "@/modules/proposal/server/live-room.service";
import type { LiveRoomSectionKey } from "@/shared/types/trust-layer.types";

export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string | null {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null
  );
}

type ActionBody = {
  type: string;
  sessionId?: string;
  payload?: unknown;
  clientName?: string;
  sectionKey?: LiveRoomSectionKey;
  note?: string;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const body = (await req.json()) as ActionBody;
    const ip = clientIp(req);

    if (body.type === "download_pdf") {
      const result = await recordShareClientAction({
        token: params.token,
        sessionId: body.sessionId,
        type: "download_pdf",
        ip,
      });
      if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ ok: true });
    }

    if (body.type === "soft_approve") {
      if (!body.sessionId) {
        return NextResponse.json({ error: "SESSION_REQUIRED" }, { status: 400 });
      }
      const result = await submitSoftApprove({
        token: params.token,
        sessionId: body.sessionId,
        payload: body.payload,
        ip,
      });
      if (!result.ok) {
        const status =
          result.error === "ALREADY_APPROVED"
            ? 409
            : result.error === "INVALID_PAYLOAD"
              ? 400
              : 404;
        return NextResponse.json({ error: result.error }, { status });
      }
      return NextResponse.json({ ok: true });
    }

    if (body.type === "request_amendment") {
      if (!body.sessionId || !body.sectionKey || !body.note || !body.clientName) {
        return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
      }
      const result = await submitAmendmentRequest({
        token: params.token,
        sessionId: body.sessionId,
        amendment: {
          sectionKey: body.sectionKey,
          note: body.note,
          clientName: body.clientName,
        },
        ip,
      });
      if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "UNKNOWN_ACTION" }, { status: 400 });
  } catch (error) {
    console.error("Share action error:", error);
    return NextResponse.json({ error: "Failed to record action" }, { status: 500 });
  }
}
