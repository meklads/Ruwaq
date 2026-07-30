/**
 * Monthly proposal-count plans — legacy `planId` on CompanyProfile.
 * Primary tier model: see `tiers.ts` (STARTER | VERIFIED | PRO).
 */

import {
  tierFromPlanId,
  tierAllowsAnotherProposal as tierAllows,
  type RuwaqTier,
} from "@/modules/billing/lib/tiers";

export type PlanId = "free" | "starter" | "professional" | "business";

export type Plan = {
  id: PlanId;
  nameAr: string;
  nameEn: string;
  priceSar: number;
  monthlyProposalLimit: number | null;
  featuresAr: string[];
  featuresEn: string[];
};

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    nameAr: "مجاني",
    nameEn: "Free",
    priceSar: 0,
    monthlyProposalLimit: 3,
    featuresAr: [
      "3 عروض شهرياً",
      "القالب الأساسي فقط",
      "بدون هوية شركة مخصصة على التصدير المميز",
    ],
    featuresEn: [
      "3 proposals / month",
      "Basic template only",
      "No custom branding on premium exports",
    ],
  },
  starter: {
    id: "starter",
    nameAr: "أساسي",
    nameEn: "Starter",
    priceSar: 49,
    monthlyProposalLimit: 15,
    featuresAr: [
      "15 عرضاً شهرياً",
      "هوية الشركة الكاملة (شعار وألوان)",
      "كل القوالب و10 تناسقات هيدر/فوتر",
      "مشاركة عبر واتساب والبريد",
    ],
    featuresEn: [
      "15 proposals / month",
      "Full company branding",
      "All templates & 10 header/footer styles",
      "WhatsApp & email sharing",
    ],
  },
  professional: {
    id: "professional",
    nameAr: "احترافي",
    nameEn: "Professional",
    priceSar: 119,
    monthlyProposalLimit: 50,
    featuresAr: [
      "50 عرضاً شهرياً",
      "أولوية في توليد الذكاء الاصطناعي",
      "قوالب متقدمة",
      "تتبع مشاهدة العرض",
    ],
    featuresEn: [
      "50 proposals / month",
      "Priority AI generation",
      "Advanced templates",
      "Proposal view tracking",
    ],
  },
  business: {
    id: "business",
    nameAr: "أعمال",
    nameEn: "Business",
    priceSar: 299,
    monthlyProposalLimit: null,
    featuresAr: [
      "عروض غير محدودة",
      "إزالة العلامة المائية بالكامل",
      "دعم ذو أولوية",
    ],
    featuresEn: [
      "Unlimited proposals",
      "Full white-label (no Turriva badge)",
      "Priority support",
    ],
  },
};

export const PLAN_ORDER: PlanId[] = ["free", "starter", "professional", "business"];

export function getPlan(planId: string | null | undefined): Plan {
  if (planId && planId in PLANS) return PLANS[planId as PlanId];
  return PLANS.free;
}

export function planAllowsAnotherProposal(
  planId: string | null | undefined,
  usedThisMonth: number
): boolean {
  const tier: RuwaqTier = tierFromPlanId(planId);
  return tierAllows(tier, usedThisMonth);
}
