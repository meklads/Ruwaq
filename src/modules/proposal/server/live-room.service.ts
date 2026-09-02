import { createHash, randomBytes } from "crypto";
import { db } from "@/shared/lib/db";
import {
  parseSoftApprovePayload,
  type AmendmentRequestInput,
  type ClientActionType,
} from "@/shared/types/trust-layer.types";
import type { CommercialMode } from "@/shared/types";

export type ResolvedShareToken = {
  kind: "live" | "legacy";
  shareLinkId: string | null;
  proposalId: string;
  token: string;
  status: string;
};

function hashIp(ip: string | null | undefined): string | null {
  if (!ip?.trim()) return null;
  return createHash("sha256").update(ip.trim()).digest("hex").slice(0, 32);
}

export async function resolveShareToken(token: string): Promise<ResolvedShareToken | null> {
  const live = await db.proposalShareLink.findUnique({
    where: { token },
    select: { id: true, proposalId: true, status: true },
  });
  if (live) {
    return {
      kind: "live",
      shareLinkId: live.id,
      proposalId: live.proposalId,
      token,
      status: live.status,
    };
  }

  const legacy = await db.generatedDocument.findFirst({
    where: { shareToken: token },
    select: { proposalId: true, proposal: { select: { clientName: true } } },
  });
  if (!legacy?.proposalId) return null;

  const shareLink = await ensureProposalShareLink(
    legacy.proposalId,
    legacy.proposal?.clientName ?? "Client",
    token
  );

  return {
    kind: "legacy",
    shareLinkId: shareLink.id,
    proposalId: legacy.proposalId,
    token,
    status: shareLink.status,
  };
}

export async function ensureProposalShareLink(
  proposalId: string,
  clientName: string,
  token?: string
) {
  const existing = await db.proposalShareLink.findFirst({
    where: { proposalId, status: "active" },
    orderBy: { publishedAt: "desc" },
  });
  if (existing) return existing;

  return db.proposalShareLink.create({
    data: {
      proposalId,
      token: token ?? randomBytes(12).toString("hex"),
      watermarkClientName: clientName,
      status: "active",
    },
  });
}

export async function getProposalIdByAnyShareToken(token: string): Promise<string | null> {
  const resolved = await resolveShareToken(token);
  return resolved?.proposalId ?? null;
}

export async function startShareViewSession(
  token: string,
  userAgent: string | null,
  ip: string | null
): Promise<{
  sessionId: string;
  shareLinkId: string;
  proposalId: string;
  alreadyApproved: boolean;
} | null> {
  const resolved = await resolveShareToken(token);
  if (!resolved?.shareLinkId || resolved.status !== "active") return null;

  const session = await db.proposalViewSession.create({
    data: {
      shareLinkId: resolved.shareLinkId,
      userAgent: userAgent?.slice(0, 500) ?? null,
      ipHash: hashIp(ip),
    },
  });

  await db.clientAction.create({
    data: {
      shareLinkId: resolved.shareLinkId,
      sessionId: session.id,
      type: "link_open",
      clientIpHash: hashIp(ip),
    },
  });

  const approved = await db.clientAction.findFirst({
    where: { shareLinkId: resolved.shareLinkId, type: "soft_approve" },
    select: { id: true },
  });

  return {
    sessionId: session.id,
    shareLinkId: resolved.shareLinkId,
    proposalId: resolved.proposalId,
    alreadyApproved: Boolean(approved),
  };
}

export async function recordShareClientAction(input: {
  token: string;
  sessionId?: string;
  type: ClientActionType;
  payload?: unknown;
  clientName?: string;
  ip?: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const resolved = await resolveShareToken(input.token);
  if (!resolved?.shareLinkId || resolved.status !== "active") {
    return { ok: false, error: "LINK_NOT_FOUND" };
  }

  if (input.sessionId) {
    const session = await db.proposalViewSession.findFirst({
      where: { id: input.sessionId, shareLinkId: resolved.shareLinkId },
      select: { id: true },
    });
    if (!session) return { ok: false, error: "SESSION_INVALID" };
  }

  await db.clientAction.create({
    data: {
      shareLinkId: resolved.shareLinkId,
      sessionId: input.sessionId ?? null,
      type: input.type,
      payload: input.payload ? (input.payload as object) : undefined,
      clientName: input.clientName?.trim() || null,
      clientIpHash: hashIp(input.ip),
    },
  });

  return { ok: true };
}

export async function submitSoftApprove(input: {
  token: string;
  sessionId: string;
  payload: unknown;
  ip?: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const resolved = await resolveShareToken(input.token);
  if (!resolved?.shareLinkId || resolved.status !== "active") {
    return { ok: false, error: "LINK_NOT_FOUND" };
  }

  const proposal = await db.proposal.findUnique({
    where: { id: resolved.proposalId },
    select: { commercialMode: true, estimateVariancePercent: true },
  });
  if (!proposal) return { ok: false, error: "PROPOSAL_NOT_FOUND" };

  const commercialMode = (proposal.commercialMode === "estimate_only"
    ? "estimate_only"
    : "fixed_price") as CommercialMode;

  let parsed;
  try {
    parsed = parseSoftApprovePayload(input.payload, commercialMode);
  } catch {
    return { ok: false, error: "INVALID_PAYLOAD" };
  }

  const existing = await db.clientAction.findFirst({
    where: { shareLinkId: resolved.shareLinkId, type: "soft_approve" },
    select: { id: true },
  });
  if (existing) return { ok: false, error: "ALREADY_APPROVED" };

  const session = await db.proposalViewSession.findFirst({
    where: { id: input.sessionId, shareLinkId: resolved.shareLinkId },
    select: { id: true },
  });
  if (!session) return { ok: false, error: "SESSION_INVALID" };

  await db.clientAction.create({
    data: {
      shareLinkId: resolved.shareLinkId,
      sessionId: input.sessionId,
      type: "soft_approve",
      payload: parsed as object,
      clientName: parsed.clientName,
      clientIpHash: hashIp(input.ip),
    },
  });

  return { ok: true };
}

export async function submitAmendmentRequest(input: {
  token: string;
  sessionId: string;
  amendment: AmendmentRequestInput;
  ip?: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const resolved = await resolveShareToken(input.token);
  if (!resolved?.shareLinkId || resolved.status !== "active") {
    return { ok: false, error: "LINK_NOT_FOUND" };
  }

  const note = input.amendment.note.trim();
  const clientName = input.amendment.clientName.trim();
  if (!note || !clientName) return { ok: false, error: "INVALID_PAYLOAD" };

  const session = await db.proposalViewSession.findFirst({
    where: { id: input.sessionId, shareLinkId: resolved.shareLinkId },
    select: { id: true },
  });
  if (!session) return { ok: false, error: "SESSION_INVALID" };

  const action = await db.clientAction.create({
    data: {
      shareLinkId: resolved.shareLinkId,
      sessionId: input.sessionId,
      type: "request_amendment",
      payload: {
        sectionKey: input.amendment.sectionKey,
        note,
      },
      clientName,
      clientIpHash: hashIp(input.ip),
    },
  });

  await db.amendmentRequest.create({
    data: {
      shareLinkId: resolved.shareLinkId,
      proposalId: resolved.proposalId,
      clientActionId: action.id,
      sectionKey: input.amendment.sectionKey,
      note,
      clientName,
      clientIpHash: hashIp(input.ip),
      status: "open",
    },
  });

  return { ok: true };
}

export async function hasShareSoftApproval(token: string): Promise<boolean> {
  const resolved = await resolveShareToken(token);
  if (!resolved?.shareLinkId) return false;
  const approved = await db.clientAction.findFirst({
    where: { shareLinkId: resolved.shareLinkId, type: "soft_approve" },
    select: { id: true },
  });
  return Boolean(approved);
}
