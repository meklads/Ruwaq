/**
 * Post-AI Trust Layer pipeline — BOQ, clauses, review gates.
 */

import { db } from "@/shared/lib/db";
import type { CommercialMode, ProjectArchetype } from "@/shared/types";
import type { BoqLineDraft } from "@/shared/types/trust-layer.types";
import { allocateBoqLines } from "./boq/boq-allocator.service";
import { inferProjectArchetype } from "./clauses/clause-archetype";
import { matchAndPersistClausesForProposal } from "./clauses/clause-matcher.service";
import { initializeReviewGates } from "@/shared/lib/review-gates.utils";

function commercialMode(raw: string | null | undefined): CommercialMode {
  return raw === "estimate_only" ? "estimate_only" : "fixed_price";
}

export async function persistBoqLines(
  proposalId: string,
  lines: BoqLineDraft[]
): Promise<void> {
  await db.$transaction(async (tx) => {
    await tx.proposalBoqLine.deleteMany({ where: { proposalId } });

    for (const line of lines) {
      await tx.proposalBoqLine.create({
        data: {
          proposalId,
          sortOrder: line.sortOrder,
          labelAr: line.labelAr,
          labelEn: line.labelEn,
          amount: line.amount,
          percent: line.percent,
          category: line.category,
          note: line.note ?? null,
          source: line.source,
          isEstimated: line.isEstimated,
          aiReason: line.aiReason ?? null,
        },
      });
    }
  });
}

export type TrustLayerPipelineResult = {
  archetype: ProjectArchetype;
  boqLineCount: number;
  clauseCount: number;
  priceEscalationAutoTriggered: boolean;
  reviewGatesInitialized: true;
};

/**
 * Runs after AI content is saved. Sets status → review with fresh reviewGates.
 */
export async function runPostGenerationTrustLayer(
  proposalId: string
): Promise<TrustLayerPipelineResult> {
  const proposal = await db.proposal.findUnique({ where: { id: proposalId } });
  if (!proposal) {
    throw new Error("Proposal not found");
  }

  const mode = commercialMode(proposal.commercialMode);
  const archetype =
    (proposal.projectArchetype as ProjectArchetype | null) ??
    inferProjectArchetype({
      description: proposal.description,
      propertyType: proposal.propertyType,
      specifications: proposal.specifications,
    });

  const boqResult = allocateBoqLines({
    budget: proposal.budget,
    commercialMode: mode,
    archetype,
  });

  await persistBoqLines(proposalId, boqResult.lines);

  const clauseResult = await matchAndPersistClausesForProposal(proposalId);

  const reviewGates = initializeReviewGates();

  await db.proposal.update({
    where: { id: proposalId },
    data: {
      status: "review",
      projectArchetype: archetype,
      reviewGates: reviewGates as object,
      publishedAt: null,
    },
  });

  return {
    archetype,
    boqLineCount: boqResult.lineCount,
    clauseCount: clauseResult.selections.length,
    priceEscalationAutoTriggered: clauseResult.priceEscalationAutoTriggered,
    reviewGatesInitialized: true,
  };
}
