import { db } from "@/shared/lib/db";
import type { ReviewGateKey, ReviewGates } from "@/shared/types/trust-layer.types";
import { TrustLayerValidationError } from "@/shared/types/trust-layer.types";
import {
  ALL_REVIEW_GATE_KEYS,
  canPublishFromGates,
  countRequiredGateProgress,
  getPendingPublishGates,
  getRequiredPublishGateKeys,
  initializeReviewGates,
  migrateLegacyReviewSections,
  parseReviewGates,
  resolveReviewGates,
} from "@/shared/lib/review-gates.utils";

export {
  ALL_REVIEW_GATE_KEYS,
  getRequiredPublishGateKeys,
  initializeReviewGates,
  parseReviewGates,
  migrateLegacyReviewSections,
  resolveReviewGates,
  getPendingPublishGates,
  countRequiredGateProgress,
} from "@/shared/lib/review-gates.utils";

export class PublishGateBlockedError extends TrustLayerValidationError {
  constructor(
    message: string,
    public readonly pendingGates: ReviewGateKey[]
  ) {
    super(message, "PUBLISH_GATES_INCOMPLETE");
    this.name = "PublishGateBlockedError";
  }
}

export function canPublishProposal(proposal: {
  reviewGates: unknown;
  reviewedSections: unknown;
  deliverables: unknown;
}): { allowed: boolean; pendingGates: ReviewGateKey[] } {
  const gates = resolveReviewGates(proposal);
  const deliverables = Array.isArray(proposal.deliverables)
    ? proposal.deliverables
    : [];
  const pendingGates = getPendingPublishGates(gates, {
    hasDeliverables: deliverables.length > 0,
  });

  return {
    allowed: pendingGates.length === 0,
    pendingGates,
  };
}

export async function assertCanPublishProposal(proposalId: string): Promise<void> {
  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
    select: {
      reviewGates: true,
      reviewedSections: true,
      deliverables: true,
      status: true,
    },
  });

  if (!proposal) {
    throw new TrustLayerValidationError("Proposal not found", "PROPOSAL_NOT_FOUND");
  }

  if (proposal.status !== "review" && proposal.status !== "reviewed") {
    throw new PublishGateBlockedError(
      "Proposal must complete contractor review before publishing",
      ALL_REVIEW_GATE_KEYS.filter((k) => k !== "timeline")
    );
  }

  const { allowed, pendingGates } = canPublishProposal(proposal);

  if (!allowed) {
    throw new PublishGateBlockedError(
      `Review gates incomplete: ${pendingGates.join(", ")}`,
      pendingGates
    );
  }
}

export async function confirmReviewGate(
  proposalId: string,
  gateKey: ReviewGateKey
): Promise<ReviewGates> {
  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { reviewGates: true, reviewedSections: true },
  });

  if (!proposal) {
    throw new TrustLayerValidationError("Proposal not found", "PROPOSAL_NOT_FOUND");
  }

  const gates = resolveReviewGates(proposal);
  gates[gateKey] = { confirmed: true, at: new Date().toISOString() };

  await db.proposal.update({
    where: { id: proposalId },
    data: { reviewGates: gates as object, status: "review" },
  });

  const full = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { deliverables: true },
  });
  const hasDeliverables = ((full?.deliverables as unknown[]) ?? []).length > 0;

  if (canPublishFromGates(gates, hasDeliverables)) {
    await db.proposal.update({
      where: { id: proposalId },
      data: { status: "reviewed" },
    });
  }

  return gates;
}

export async function unconfirmReviewGate(
  proposalId: string,
  gateKey: ReviewGateKey
): Promise<ReviewGates> {
  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { reviewGates: true, reviewedSections: true },
  });

  if (!proposal) {
    throw new TrustLayerValidationError("Proposal not found", "PROPOSAL_NOT_FOUND");
  }

  const gates = resolveReviewGates(proposal);
  gates[gateKey] = { confirmed: false, at: null };

  await db.proposal.update({
    where: { id: proposalId },
    data: { reviewGates: gates as object, status: "review" },
  });

  return gates;
}

export function countConfirmedGates(gates: ReviewGates): {
  confirmed: number;
  total: number;
} {
  const confirmed = ALL_REVIEW_GATE_KEYS.filter((k) => gates[k]?.confirmed).length;
  return { confirmed, total: ALL_REVIEW_GATE_KEYS.length };
}
