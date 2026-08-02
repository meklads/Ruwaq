import { NextRequest, NextResponse } from "next/server";
import {
  bindProposalEditKey,
  hasProposalEditAccess,
} from "@/modules/proposal/server/proposal-edit-access";
import { generateProposalContent } from "@/modules/proposal/server/proposal-ai.service";
import { getSession } from "@/modules/auth/server/session";
import { db } from "@/shared/lib/db";
import { isCompanyProfileReadyForGeneration } from "@/modules/company/lib/profile-completeness";
import {
  assertProposalGenerationAllowed,
} from "@/modules/billing/server/entitlements.service";
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
        select: { companyName: true, logoUrl: true, email: true, crNumber: true, about: true, tier: true, planId: true },
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

      const gate = await assertProposalGenerationAllowed(userId);
      if (!gate.allowed && gate.code === "QUOTA_EXCEEDED") {
        logUsageEvent("quota_blocked", {
          userId,
          proposalId: params.id,
          metadata: {
            tier: gate.entitlements.tier,
            usedThisMonth: gate.entitlements.usedThisMonth,
            limit: gate.entitlements.monthlyLimit,
          },
        });
        return NextResponse.json(
          {
            error: "وصلت للحد الشهري لباقتك. رقِّ حسابك لفتح المزيد من العروض.",
            code: "QUOTA_EXCEEDED",
            entitlements: gate.entitlements,
          },
          { status: 402 }
        );
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
