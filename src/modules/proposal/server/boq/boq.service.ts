import { db } from "@/shared/lib/db";
import type { BoqLineDraft } from "@/shared/types/trust-layer.types";
import { assertCanMutateProposal } from "../proposal-auth";
import { persistBoqLines } from "../trust-layer.pipeline";
import {
  redistributeAfterLineEdit,
  sumAmounts,
  verifySumEqualsBudget,
} from "./boq-allocator.service";
import { unconfirmReviewGate } from "../review-gates.service";

function toDraft(
  rows: Awaited<ReturnType<typeof db.proposalBoqLine.findMany>>
): BoqLineDraft[] {
  return rows.map((line) => ({
    id: line.id,
    sortOrder: line.sortOrder,
    labelAr: line.labelAr,
    labelEn: line.labelEn,
    amount: line.amount,
    percent: line.percent,
    category: line.category as BoqLineDraft["category"],
    note: line.note,
    source: line.source as BoqLineDraft["source"],
    isEstimated: line.isEstimated,
    aiReason: line.aiReason,
    locked: false,
  }));
}

export async function getBoqLinesForProposal(proposalId: string) {
  return db.proposalBoqLine.findMany({
    where: { proposalId },
    orderBy: { sortOrder: "asc" },
  });
}

export async function updateBoqLineAmount(
  proposalId: string,
  lineId: string,
  newAmount: number
) {
  await assertCanMutateProposal(proposalId);

  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { budget: true },
  });
  if (!proposal) throw new Error("Proposal not found");

  const rows = await getBoqLinesForProposal(proposalId);
  const drafts = toDraft(rows);
  const updated = redistributeAfterLineEdit(
    drafts,
    proposal.budget,
    lineId,
    newAmount
  );

  await persistBoqLines(proposalId, updated);
  await unconfirmReviewGate(proposalId, "boqBreakdown");

  return {
    lines: updated,
    sum: sumAmounts(updated),
    budget: proposal.budget,
    sumValid: verifySumEqualsBudget(updated, proposal.budget),
  };
}
