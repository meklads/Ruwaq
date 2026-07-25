import type { CommercialMode } from "@/shared/types";
import type { Locale } from "@/shared/i18n/locale";

const REAL_ESTATE_DOMAIN = {
  ar: "قطاع العقار السعودي (تشطيب، fit-out، إشراف، صيانة، إدارة أملاك، استشارات عقارية)",
  en: "Saudi real estate sector (fit-out, finishing, supervision, maintenance, property management, real estate consulting)",
};

const PROPERTY_TYPE_LABELS: Record<string, { ar: string; en: string }> = {
  villa: { ar: "فيلا", en: "Villa" },
  apartment: { ar: "شقة", en: "Apartment" },
  office: { ar: "مكتب", en: "Office" },
  retail: { ar: "تجاري", en: "Retail" },
  other: { ar: "أخرى", en: "Other" },
};

export interface ProposalAIContext {
  projectName: string;
  clientName: string;
  description: string;
  budget: number;
  paymentType: string;
  commercialMode: CommercialMode;
  projectLocation?: string | null;
  propertyType?: string | null;
  areaSqm?: number | null;
  durationHint?: string | null;
  specifications?: string | null;
}

export function realEstateSystemRole(locale: Locale, role: string): string {
  const domain = REAL_ESTATE_DOMAIN[locale];
  return `${role} specializing in ${domain}. Write for Saudi business culture. Never invent prices, guarantees, legal commitments, or certifications.`;
}

export function commercialContext(
  budget: number,
  paymentType: string,
  commercialMode: CommercialMode,
  locale: Locale
): string {
  if (commercialMode === "estimate_only") {
    return locale === "ar"
      ? `الوضع: تقدير أولي فقط — السعر النهائي يُؤكد بعد المعاينة.\n${budget > 0 ? `مبلغ إرشادي: ${budget} ريال (ليس سعراً نهائياً)` : "لم يُحدد مبلغ إرشادي بعد."}\nطريقة الدفع المفضلة: ${paymentType}`
      : `Mode: preliminary estimate only — final price confirmed after site visit.\n${budget > 0 ? `Indicative amount: SAR ${budget} (not final)` : "No indicative amount provided yet."}\nPreferred payment: ${paymentType}`;
  }
  return locale === "ar"
    ? `السعر المعتمد: ${budget} ريال\nطريقة الدفع: ${paymentType}`
    : `Confirmed price: SAR ${budget}\nPayment: ${paymentType}`;
}

function propertyTypeLabel(type: string, locale: Locale): string {
  return PROPERTY_TYPE_LABELS[type]?.[locale] ?? type;
}

export function buildProjectContext(
  ctx: ProposalAIContext,
  locale: Locale
): string {
  const lines = [
    `Project: ${ctx.projectName}`,
    `Client: ${ctx.clientName}`,
    `Work description: ${ctx.description}`,
  ];

  if (ctx.projectLocation?.trim()) {
    lines.push(
      locale === "ar"
        ? `موقع المشروع (من المستخدم): ${ctx.projectLocation.trim()}`
        : `Project location (user-provided): ${ctx.projectLocation.trim()}`
    );
  }

  if (ctx.propertyType?.trim()) {
    lines.push(
      locale === "ar"
        ? `نوع العقار (من المستخدم): ${propertyTypeLabel(ctx.propertyType, locale)}`
        : `Property type (user-provided): ${propertyTypeLabel(ctx.propertyType, locale)}`
    );
  }

  if (ctx.areaSqm && ctx.areaSqm > 0) {
    lines.push(
      locale === "ar"
        ? `المساحة (من المستخدم): ${ctx.areaSqm} م²`
        : `Area (user-provided): ${ctx.areaSqm} sqm`
    );
  }

  if (ctx.durationHint?.trim()) {
    lines.push(
      locale === "ar"
        ? `مدة التنفيذ المتوقعة (من المستخدم): ${ctx.durationHint.trim()}`
        : `Expected duration (user-provided): ${ctx.durationHint.trim()}`
    );
  }

  if (ctx.specifications?.trim()) {
    lines.push(
      locale === "ar"
        ? `مواصفات إضافية (من المستخدم):\n${ctx.specifications.trim()}`
        : `Additional specifications (user-provided):\n${ctx.specifications.trim()}`
    );
  }

  lines.push(commercialContext(ctx.budget, ctx.paymentType, ctx.commercialMode, locale));

  lines.push(
    locale === "ar"
      ? "مهم: أي معلومة وُسمت «من المستخدم» يجب احترامها في النطاق والجدول والافتراضات. لا تخالفها."
      : "Important: Any field marked user-provided must be respected in scope, timeline, and assumptions. Do not contradict it."
  );

  return lines.join("\n");
}

export function contextFromProposalRecord(
  proposal: {
    projectName: string;
    clientName: string;
    description: string;
    budget: number;
    paymentType: string;
    commercialMode: string | null;
    projectLocation?: string | null;
    propertyType?: string | null;
    areaSqm?: number | null;
    durationHint?: string | null;
    specifications?: string | null;
  },
  commercialMode: CommercialMode
): ProposalAIContext {
  return {
    projectName: proposal.projectName,
    clientName: proposal.clientName,
    description: proposal.description,
    budget: proposal.budget,
    paymentType: proposal.paymentType,
    commercialMode,
    projectLocation: proposal.projectLocation,
    propertyType: proposal.propertyType,
    areaSqm: proposal.areaSqm,
    durationHint: proposal.durationHint,
    specifications: proposal.specifications,
  };
}
