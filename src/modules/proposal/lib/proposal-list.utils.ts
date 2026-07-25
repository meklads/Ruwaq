import type { ReviewGates } from "@/shared/types/trust-layer.types";
import {
  countRequiredGateProgress,
  resolveReviewGates,
} from "@/shared/lib/review-gates.utils";

export type ProposalListGroup = "draft" | "review" | "published";

export function proposalListGroup(status: string): ProposalListGroup {
  if (status === "exported") return "published";
  if (status === "review" || status === "reviewed") return "review";
  return "draft";
}

export function deliverablesCount(deliverables: unknown): boolean {
  return Array.isArray(deliverables) && deliverables.length > 0;
}

export function gateProgressForProposal(input: {
  reviewGates: unknown;
  reviewedSections: unknown;
  deliverables: unknown;
}): { confirmed: number; total: number } {
  const gates: ReviewGates = resolveReviewGates({
    reviewGates: input.reviewGates,
    reviewedSections: input.reviewedSections,
  });
  return countRequiredGateProgress(gates, deliverablesCount(input.deliverables));
}

export const PROPOSAL_LIST_GROUP_ORDER: ProposalListGroup[] = [
  "review",
  "draft",
  "published",
];
