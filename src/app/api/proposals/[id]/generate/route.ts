import { NextRequest, NextResponse } from "next/server";
import {
  bindProposalEditKey,
  hasProposalEditAccess,
} from "@/modules/proposal/server/proposal-edit-access";
import { generateProposalContent } from "@/modules/proposal/server/proposal-ai.service";
import { getSession } from "@/modules/auth/server/session";
import { db } from "@/shared/lib/db";
import { isBillingEnabled } from "@/shared/lib/env";
import { isCompanyProfileReadyForGeneration } from "@/modules/company/lib/profile-completeness";
import { planAllowsAnotherProposal } from "@/modules/billing/lib/plans";
import {
  guestHasFreeGenerationLeft,
  recordGuestGeneration,
} from "@/shared/lib/guest-usage";
import { logServerError, logUsageEvent } from "@/shared/lib/usage-events";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let body: { editKey?: string } = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    if (body.editKey) {
      await bindProposalEditKey(params.id, body.editKey);
    }

    const allowed = await hasProposalEditAccess(params.id);
    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 403 });
    }

    const session = await getSession();
    const userId = session?.user?.id ?? null;

    if (!userId) {
      // Anonymous guest — one free taste, then sign-in required. Always
      // enforced regardless of BILLING_ENABLED: this is cost protection,
      // not a monetization decision.
      const hasFreeUse = await guestHasFreeGenerationLeft();
      if (!hasFreeUse) {
        return NextResponse.json(
          {
            error: "سجّل دخولك بحساب جوجل لإنشاء المزيد من العروض.",
            code: "SIGN_IN_REQUIRED",
          },
          { status: 401 }
        );
      }
    } else {
      // Registered user — profile must be complete enough to brand a real
      // proposal before we spend AI credits on it.
      const profile = await db.companyProfile.findUnique({
        where: { userId },
        select: { companyName: true, logoUrl: true, crNumber: true, about: true, planId: true },
      });

      if (!isCompanyProfileReadyForGeneration(profile)) {
        return NextResponse.json(
          {
            error: "أكمل بيانات شركتك وشعارها أولاً من ملف الشركة.",
            code: "PROFILE_INCOMPLETE",
          },
          { status: 403 }
        );
      }

      if (isBillingEnabled()) {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const usedThisMonth = await db.usageEvent.count({
          where: {
            type: "proposal_generated",
            userId,
            createdAt: { gte: startOfMonth },
          },
        });

        if (!planAllowsAnotherProposal(profile?.planId, usedThisMonth)) {
          logUsageEvent("quota_blocked", { userId, proposalId: params.id, metadata: { planId: profile?.planId ?? "free", usedThisMonth } });
          return NextResponse.json(
            {
              error: "وصلت للحد الشهري لباقتك. راجع صفحة الباقات للترقية.",
              code: "QUOTA_EXCEEDED",
            },
            { status: 402 }
          );
        }
      }
    }

    await generateProposalContent(params.id);

    if (!userId) {
      await recordGuestGeneration();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    logServerError("generate proposal", error, { proposalId: params.id });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
