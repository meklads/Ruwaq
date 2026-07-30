"use server";

import {
  createProposal as createProposalSvc,
  updateProposalField,
  addProposalItem,
  removeProposalItem,
  markSectionReviewed,
  getProposal,
  deleteProposal,
  duplicateProposal,
} from "./proposal.service";
import type { CreateProposalInput } from "@/shared/types";
import { getSession } from "@/modules/auth/server/session";
import { ProposalAccessError } from "./proposal-auth";
import { assertProposalGenerationAllowed } from "@/modules/billing/server/entitlements.service";
import { isCompanyProfileReadyForGeneration } from "@/modules/company/lib/profile-completeness";
import { db } from "@/shared/lib/db";

function actionError(error: unknown, fallback: string) {
  let message = error instanceof Error ? error.message : fallback;

  if (error instanceof ProposalAccessError) {
    message = error.message;
  } else if (
    message.includes("DATABASE_URL") ||
    message.includes("Environment variable not found")
  ) {
    message =
      "Database is not connected. Add DATABASE_URL in Coolify Environment Variables, then Redeploy.";
  } else if (message.includes("Invalid environment variables")) {
    message =
      "Server configuration incomplete. In Coolify add: DATABASE_URL, AUTH_SECRET, AUTH_URL=https://turriva.co, then Redeploy.";
  } else if (message.includes("Can't reach database server")) {
    message =
      "Cannot reach the database server. Check DATABASE_URL and that PostgreSQL is running.";
  } else if (
    message.includes("Clause pack not found") ||
    message.includes("CLAUSE_PACK_NOT_FOUND")
  ) {
    message =
      "Legal clause library is still initializing. Wait a moment and try again, if this persists, redeploy or run: npm run db:seed";
  } else if (
    message.includes("editToken") ||
    message.includes("exportTemplateId") ||
    message.includes("does not exist in the current database")
  ) {
    message =
      "قاعدة البيانات تحتاج تحديث. في Coolify اضغط Redeploy، أو شغّل: npx prisma db push";
  } else if (
    message.includes("fetch failed") ||
    message.includes("ETIMEDOUT") ||
    message.includes("ECONNRESET") ||
    message.includes("socket hang up")
  ) {
    message =
      "انتهت مهلة التوليد أو انقطع الاتصال. انتظر قليلاً ثم أعد المحاولة، التوليد قد يستغرق دقيقة أو دقيقتين.";
  } else if (
    message.includes("Incorrect API key") ||
    message.includes("invalid_api_key") ||
    message.includes("OPENAI")
  ) {
    message =
      "خدمة الذكاء الاصطناعي غير متاحة حالياً. تواصل مع فريق توريفا العقارية أو حاول لاحقاً.";
  }

  console.error(`[proposal.action] ${fallback}:`, error);
  return { success: false as const, error: message };
}

// SA1
export async function createProposalAction(input: CreateProposalInput) {
  try {
    const result = await createProposalSvc(input);
    if (result.editKey) {
      const { setProposalEditCookie } = await import("./proposal-edit-access");
      await setProposalEditCookie(result.id, result.editKey);
    }
    return {
      success: true as const,
      id: result.id,
      editKey: result.editKey,
    };
  } catch (error) {
    return actionError(error, "Failed to create proposal");
  }
}

// SA1b, create + AI in one request (guest cookie + DB stay in sync)
export async function createAndGenerateProposalAction(
  input: CreateProposalInput
) {
  try {
    const session = await getSession();
    const userId = session?.user?.id;
    if (userId) {
      const gate = await assertProposalGenerationAllowed(userId);
      if (!gate.allowed && gate.code === "QUOTA_EXCEEDED") {
        return {
          success: false as const,
          error: "وصلت للحد الشهري لباقتك.",
          code: "QUOTA_EXCEEDED" as const,
        };
      }
    }

    const result = await createProposalSvc(input);
    if (result.editKey) {
      const { setProposalEditCookie } = await import("./proposal-edit-access");
      await setProposalEditCookie(result.id, result.editKey);
    }
    const { generateProposalContent } = await import("./proposal-ai.service");
    await generateProposalContent(result.id);
    return {
      success: true as const,
      id: result.id,
      editKey: result.editKey,
    };
  } catch (error) {
    return actionError(error, "Failed to create and generate proposal");
  }
}

// SA2
export async function generateWithAI(proposalId: string, editKey?: string) {
  try {
    if (editKey) {
      const { bindProposalEditKey } = await import("./proposal-edit-access");
      const bound = await bindProposalEditKey(proposalId, editKey);
      if (!bound) {
        return { success: false as const, error: "Unauthorized" };
      }
    }
    await assertCanMutate(proposalId);

    const session = await getSession();
    const userId = session?.user?.id;
    if (userId) {
      const profile = await db.companyProfile.findUnique({
        where: { userId },
        select: { companyName: true, logoUrl: true, crNumber: true, about: true, tier: true, planId: true },
      });
      if (!isCompanyProfileReadyForGeneration(profile)) {
        return {
          success: false as const,
          error: "أكمل بيانات شركتك وشعارها أولاً من ملف الشركة.",
          code: "PROFILE_INCOMPLETE" as const,
        };
      }
      const gate = await assertProposalGenerationAllowed(userId);
      if (!gate.allowed && gate.code === "QUOTA_EXCEEDED") {
        return {
          success: false as const,
          error: "وصلت للحد الشهري لباقتك.",
          code: "QUOTA_EXCEEDED" as const,
          entitlements: gate.entitlements,
        };
      }
    }

    const { generateProposalContent } = await import("./proposal-ai.service");
    await generateProposalContent(proposalId);
    return { success: true as const, id: proposalId };
  } catch (error) {
    return actionError(error, "Failed to generate proposal with AI");
  }
}

// SA3
export async function regenerateSectionAction(
  proposalId: string,
  section: string
) {
  try {
    await assertCanMutate(proposalId);
    const { regenerateSection } = await import("./proposal-ai.service");
    await regenerateSection(proposalId, section);
    const proposal = await getProposal(proposalId);
    if (!proposal) {
      return { success: false as const, error: "Proposal not found" };
    }
    return { success: true as const, proposal };
  } catch (error) {
    return actionError(error, "Failed to regenerate section");
  }
}

// SA4
export async function updateFieldAction(
  proposalId: string,
  field: string,
  value: unknown
) {
  try {
    await assertCanMutate(proposalId);
    const result = await updateProposalField(proposalId, field, value);
    return { success: result.success };
  } catch (error) {
    return actionError(error, "Failed to update field");
  }
}

// SA5
export async function addItemAction(
  proposalId: string,
  section: string,
  item: Record<string, unknown>
) {
  try {
    await assertCanMutate(proposalId);
    const result = await addProposalItem(proposalId, section, item);
    return { success: true as const, id: result.id };
  } catch (error) {
    return actionError(error, "Failed to add item");
  }
}

// SA6
export async function removeItemAction(
  proposalId: string,
  section: string,
  itemId: string
) {
  try {
    await assertCanMutate(proposalId);
    const result = await removeProposalItem(proposalId, section, itemId);
    return { success: result.success };
  } catch (error) {
    return actionError(error, "Failed to remove item");
  }
}

// SA7
export async function markReviewedAction(
  proposalId: string,
  section: string
) {
  try {
    await assertCanMutate(proposalId);
    const result = await markSectionReviewed(proposalId, section);
    return { success: true as const, reviewedSections: result.reviewedSections };
  } catch (error) {
    return actionError(error, "Failed to mark section reviewed");
  }
}

export async function confirmReviewGateAction(
  proposalId: string,
  gateKey: string
) {
  try {
    await assertCanMutate(proposalId);
    const { confirmReviewGate } = await import("./review-gates.service");
    const reviewGates = await confirmReviewGate(
      proposalId,
      gateKey as import("@/shared/types/trust-layer.types").ReviewGateKey
    );
    return { success: true as const, reviewGates };
  } catch (error) {
    return actionError(error, "Failed to confirm review gate");
  }
}

export async function updateBoqLineAction(
  proposalId: string,
  lineId: string,
  newAmount: number
) {
  try {
    await assertCanMutate(proposalId);
    const { updateBoqLineAmount } = await import("./boq/boq.service");
    const result = await updateBoqLineAmount(proposalId, lineId, newAmount);
    const { resolveReviewGates } = await import("./review-gates.service");
    const proposal = await getProposal(proposalId);
    const reviewGates = proposal
      ? resolveReviewGates({
          reviewGates: proposal.reviewGates,
          reviewedSections: proposal.reviewedSections,
        })
      : null;
    return {
      success: true as const,
      lines: result.lines.map((line) => ({
        id: line.id,
        sortOrder: line.sortOrder,
        labelAr: line.labelAr,
        labelEn: line.labelEn,
        amount: line.amount,
        percent: line.percent,
        category: line.category,
        isEstimated: line.isEstimated,
        source: line.source,
        note: line.note ?? null,
      })),
      sum: result.sum,
      sumValid: result.sumValid,
      reviewGates,
    };
  } catch (error) {
    return actionError(error, "Failed to update BOQ line");
  }
}

// SA8
export async function exportPdfAction(proposalId: string) {
  try {
    await assertCanMutate(proposalId);
    const { exportProposalAsPdf } = await import("./proposal-pdf.service");
    const result = await exportProposalAsPdf(proposalId);
    return { success: true as const, ...result };
  } catch (error) {
    return actionError(error, "Failed to export proposal");
  }
}

export async function claimProposalAction(proposalId: string) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return { success: false as const, error: "Sign in required" };
    }
    const { claimProposal } = await import("./proposal.service");
    const result = await claimProposal(proposalId, session.user.id);
    if (!result.success) {
      return {
        success: false as const,
        error: "Could not save proposal to your account",
      };
    }
    return { success: true as const };
  } catch (error) {
    return actionError(error, "Failed to claim proposal");
  }
}

export async function refreshProposalAction(proposalId: string) {
  try {
    const proposal = await getProposal(proposalId);
    if (!proposal) {
      return { success: false as const, error: "Proposal not found" };
    }
    return { success: true as const, proposal };
  } catch (error) {
    return actionError(error, "Failed to load proposal");
  }
}

export async function deleteProposalAction(proposalId: string) {
  try {
    await assertCanMutate(proposalId);
    await deleteProposal(proposalId);
    return { success: true as const };
  } catch (error) {
    return actionError(error, "Failed to delete proposal");
  }
}

export async function duplicateProposalAction(proposalId: string) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return { success: false as const, error: "Sign in required" };
    }
    const { id } = await duplicateProposal(proposalId, session.user.id);
    return { success: true as const, id };
  } catch (error) {
    return actionError(error, "Failed to duplicate proposal");
  }
}

async function assertCanMutate(proposalId: string) {
  const { assertCanMutateProposal } = await import("./proposal-auth");
  await assertCanMutateProposal(proposalId);
}
