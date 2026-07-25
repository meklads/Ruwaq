import { db } from "@/shared/lib/db";
import type { CommercialMode } from "@/shared/types";
import type { Locale } from "@/shared/i18n/locale";
import OpenAI from "openai";
import {
  buildProjectContext,
  contextFromProposalRecord,
  realEstateSystemRole,
} from "./proposal-ai.prompts";
import { runPostGenerationTrustLayer } from "./trust-layer.pipeline";
import { logUsageEvent } from "@/shared/lib/usage-events";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

type MockStage =
  | "analysis"
  | "scope"
  | "commercial"
  | "assumptions"
  | "intro"
  | "timeline";

function proposalCommercialMode(raw: string | null | undefined): CommercialMode {
  return raw === "estimate_only" ? "estimate_only" : "fixed_price";
}

function proposalLocale(raw: string | null | undefined): Locale {
  return raw === "en" ? "en" : "ar";
}

function languageDirective(locale: Locale): string {
  return locale === "ar"
    ? "Write ALL user-facing text in Arabic only (formal Saudi business Arabic). Do NOT use any English words. Keep JSON keys in English."
    : "Write ALL user-facing text in English only. Do NOT use any Arabic words or characters. Keep JSON keys in English.";
}

export async function regenerateSection(
  proposalId: string,
  section: string
): Promise<{ section: string; success: boolean }> {
  const proposal = await db.proposal.findUnique({ where: { id: proposalId } });
  if (!proposal) throw new Error("Proposal not found");

  const locale = proposalLocale(proposal.locale);
  const commercialMode = proposalCommercialMode(proposal.commercialMode);
  const lang = languageDirective(locale);
  const context = buildProjectContext(
    contextFromProposalRecord(proposal, commercialMode),
    locale
  );

  const scopeItems = (proposal.scopeItems ?? []) as any[];

  if (section === "scopeItems") {
    const scopeResult = await callAI(
      locale,
      "scope",
      realEstateSystemRole(locale, "You are a scope of work writer"),
      `Generate real estate scope items for:\n\n${context}\n\n${lang}\n\nRespond in JSON: { "scopeItems": [{ "id": "unique", "title": "string", "description": "string" }], "deliverables": [{ "id": "unique", "name": "string", "description": "string" }] }`
    );
    const parsed = parseJson<{ scopeItems?: any[]; deliverables?: any[] }>(
      scopeResult,
      {}
    );
    await db.proposal.update({
      where: { id: proposalId },
      data: {
        scopeItems: (parsed.scopeItems ?? []) as any,
        deliverables: (parsed.deliverables ?? proposal.deliverables) as any,
      },
    });
  } else if (section === "commercialTerms") {
    const commercialResult = await callAI(
      locale,
      "commercial",
      realEstateSystemRole(locale, "You are a commercial terms specialist"),
      `Generate commercial terms:\n\n${context}\n\n${lang}\n\nRespond in JSON: { "totalValue": number, "paymentSchedule": [{ "percentage": number, "label": "string" }], "warrantyPeriod": "string", "retention": number | null }`
    );
    const commercialTerms = buildCommercialTerms(
      parseJson(commercialResult, {}),
      proposal.budget,
      locale,
      commercialMode
    );
    await db.proposal.update({
      where: { id: proposalId },
      data: { commercialTerms: commercialTerms as any },
    });
  } else if (section === "assumptions" || section === "exclusions") {
    const result = await callAI(
      locale,
      "assumptions",
      realEstateSystemRole(locale, "You are a commercial terms specialist"),
      `Generate assumptions and exclusions for a real estate project:\n\nScope: ${scopeItems.map((s: any) => s.title).join(", ")}\n\n${lang}\n\nRespond in JSON: { "assumptions": ["string"], "exclusions": ["string"] }`
    );
    const parsed = parseJson<{ assumptions?: string[]; exclusions?: string[] }>(
      result,
      {}
    );
    await db.proposal.update({
      where: { id: proposalId },
      data: {
        assumptions: (parsed.assumptions ?? proposal.assumptions) as any,
        exclusions: (parsed.exclusions ?? proposal.exclusions) as any,
      },
    });
  }

  return { section, success: true };
}

export async function generateProposalContent(proposalId: string) {
  const proposal = await db.proposal.findUnique({ where: { id: proposalId } });
  if (!proposal) throw new Error("Proposal not found");

  const locale = proposalLocale(proposal.locale);
  const commercialMode = proposalCommercialMode(proposal.commercialMode);
  const lang = languageDirective(locale);
  const defaults = localeDefaults(locale);

  await db.proposal.update({
    where: { id: proposalId },
    data: { status: "generating" },
  });

  try {
    const aiCtx = contextFromProposalRecord(proposal, commercialMode);
    const context = buildProjectContext(aiCtx, locale);

    const analysis = await callAI(
      locale,
      "analysis",
      realEstateSystemRole(locale, "You are a proposal analyst"),
      `Analyze this Saudi real estate project:\n\n${context}\n\n${lang}`
    );

    const scopeResult = await callAI(
      locale,
      "scope",
      realEstateSystemRole(locale, "You are a scope of work writer"),
      `Generate real estate scope items for:\n\n${context}\nAnalysis: ${analysis}\n\n${lang}\n\nRespond in JSON: { "scopeItems": [{ "id": "unique", "title": "string", "description": "string" }], "deliverables": [{ "id": "unique", "name": "string", "description": "string" }] }`
    );

    let scopeItems: any[] = [];
    let deliverables: any[] = [];
    const scopeParsed = parseJson<{ scopeItems?: any[]; deliverables?: any[] }>(
      scopeResult,
      {}
    );
    scopeItems = scopeParsed.scopeItems ?? [];
    deliverables = scopeParsed.deliverables ?? [];
    if (scopeItems.length === 0) {
      scopeItems = [{ id: "1", ...defaults.fallbackScopeItem(proposal.description) }];
    }

    const scopeTitles = scopeItems.map((s: any) => s.title).join(", ");

    const [commercialResult, assumptionsResult, timelineResult] = await Promise.all([
      callAI(
        locale,
        "commercial",
        realEstateSystemRole(locale, "You are a commercial terms specialist"),
        `Generate commercial terms:\n\n${context}\nScope: ${scopeTitles}\n\n${lang}\n\nRespond in JSON: { "totalValue": number, "paymentSchedule": [{ "percentage": number, "label": "string" }], "warrantyPeriod": "string", "retention": number | null }`
      ),
      callAI(
        locale,
        "assumptions",
        realEstateSystemRole(locale, "You are a commercial terms specialist"),
        `Generate assumptions and exclusions for a real estate project:\n\nScope: ${scopeTitles}\n\n${lang}\n\nRespond in JSON: { "assumptions": ["string"], "exclusions": ["string"] }`
      ),
      callAI(
        locale,
        "timeline",
        realEstateSystemRole(locale, "You are a project scheduler"),
        `Estimate timeline for a real estate project:\n\n${context}\nScope: ${scopeTitles}\n\n${lang}\n\nRespond in JSON: { "duration": "string", "startDate": null, "endDate": null, "milestones": [{ "name": "string", "date": null }] }`
      ),
    ]);

    const commercialTerms = buildCommercialTerms(
      parseJson(commercialResult, {}),
      proposal.budget,
      locale,
      commercialMode
    );

    const legalParsed = parseJson<{ assumptions?: string[]; exclusions?: string[] }>(
      assumptionsResult,
      {}
    );
    const assumptions: string[] = legalParsed.assumptions ?? defaults.assumptions;
    const exclusions: string[] = legalParsed.exclusions ?? defaults.exclusions;

    const timelineParsed = parseJson<{
      duration?: string;
      startDate?: string | null;
      endDate?: string | null;
      milestones?: { name: string; date: string | null }[];
    }>(timelineResult, {});
    const timeline = {
      duration:
        timelineParsed.duration ??
        (proposal.durationHint?.trim() || defaults.timeline.duration),
      startDate: timelineParsed.startDate ?? null,
      endDate: timelineParsed.endDate ?? null,
      milestones: timelineParsed.milestones ?? defaults.timeline.milestones,
    };

    const priceLine =
      commercialMode === "estimate_only"
        ? locale === "en"
          ? "Preliminary estimate — final price after site visit"
          : "تقدير أولي — السعر النهائي بعد المعاينة"
        : locale === "en"
          ? `Total: SAR ${proposal.budget}`
          : `الإجمالي: ${proposal.budget} ريال`;

    const introResult = await callAI(
      locale,
      "intro",
      realEstateSystemRole(locale, "You are a proposal writer"),
      `Write a 2 sentence real estate proposal introduction for:\n\nProject: ${proposal.projectName}\nClient: ${proposal.clientName}\n${priceLine}\n\n${lang}`
    );
    const introduction =
      introResult.trim() ||
      (locale === "en"
        ? `We are pleased to submit this proposal for ${proposal.projectName} to ${proposal.clientName}.`
        : `يسعدنا تقديم هذا العرض لمشروع ${proposal.projectName} إلى ${proposal.clientName}.`);

    await db.proposal.update({
      where: { id: proposalId },
      data: {
        introduction,
        scopeItems: scopeItems as any,
        deliverables: deliverables as any,
        commercialTerms: commercialTerms as any,
        assumptions: assumptions as any,
        exclusions: exclusions as any,
        timeline: timeline as any,
        confidence: {
          scopeItems: scopeItems.length > 2 ? "high" : "medium",
          deliverables: deliverables.length > 0 ? "medium" : "low",
          timeline: timeline.milestones?.length > 1 ? "medium" : "low",
          commercialTerms:
            commercialMode === "estimate_only"
              ? "always_warn"
              : commercialTerms?.paymentSchedule?.length
                ? "high"
                : "medium",
          assumptions: "always_warn",
          exclusions: "always_warn",
        } as any,
        status: "generating",
      },
    });

    await runPostGenerationTrustLayer(proposalId);

    logUsageEvent("proposal_generated", {
      userId: proposal.userId,
      proposalId,
      metadata: { locale, commercialMode },
    });

    return { success: true, id: proposalId };
  } catch (error) {
    await db.proposal.update({
      where: { id: proposalId },
      data: { status: "draft" },
    });
    throw error;
  }
}

async function callAI(
  locale: Locale,
  stage: MockStage,
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  if (!openai) {
    return mockResponse(locale, stage, userMessage);
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 2000,
    response_format:
      stage !== "analysis" && stage !== "intro"
        ? { type: "json_object" }
        : undefined,
  });

  return response.choices[0]?.message?.content ?? "";
}

function parseJson<T extends Record<string, unknown>>(
  raw: string,
  fallback: T
): T {
  try {
    const cleaned = raw.replace(/```json\n?|\n?```/g, "").trim();
    return { ...fallback, ...JSON.parse(cleaned) };
  } catch {
    return fallback;
  }
}

function buildCommercialTerms(
  parsed: Record<string, any>,
  budget: number,
  locale: Locale,
  commercialMode: CommercialMode = "fixed_price"
) {
  const defaults = localeDefaults(locale);
  const totalValue =
    commercialMode === "estimate_only" && budget <= 0
      ? 0
      : (parsed.totalValue ?? budget);

  if (!parsed.paymentSchedule?.length) {
    return {
      totalValue,
      paymentSchedule: defaults.paymentSchedule.map((m) => ({
        ...m,
        amount:
          totalValue > 0 ? Math.round((totalValue * m.percentage) / 100) : 0,
      })),
      warrantyPeriod: defaults.warrantyPeriod,
      retention: null,
    };
  }

  return {
    totalValue,
    paymentSchedule: parsed.paymentSchedule.map((m: any) => ({
      ...m,
      amount:
        totalValue > 0
          ? Math.round((totalValue * m.percentage) / 100)
          : 0,
    })),
    warrantyPeriod: parsed.warrantyPeriod ?? defaults.warrantyPeriod,
    retention: parsed.retention ?? null,
  };
}

function localeDefaults(locale: Locale) {
  if (locale === "en") {
    return {
      fallbackScopeItem: (description: string) => ({
        title: "Project Execution",
        description,
      }),
      assumptions: [
        "Client provides site access during working hours",
        "Property is vacant and ready for work unless stated otherwise",
        "All finishing materials are available in the Saudi market",
      ],
      exclusions: [
        "Structural modifications to load-bearing elements",
        "Municipality and civil defense approvals",
        "Furniture, appliances, and soft furnishings",
        "External landscaping and boundary walls",
      ],
      timeline: {
        duration: "6-8 weeks",
        milestones: [
          { name: "Site survey & kickoff", date: null },
          { name: "Execution phase", date: null },
          { name: "Final handover", date: null },
        ],
      },
      paymentSchedule: [
        { percentage: 30, label: "Down Payment" },
        { percentage: 40, label: "On Delivery" },
        { percentage: 30, label: "After Handover" },
      ],
      warrantyPeriod: "1 year",
    };
  }

  return {
    fallbackScopeItem: (description: string) => ({
      title: "تنفيذ المشروع",
      description,
    }),
    assumptions: [
      "يوفر العميل الوصول للموقع خلال ساعات العمل",
      "العقار جاهز للعمل ما لم يُذكر خلاف ذلك",
      "مواد التشطيب متوفرة في السوق السعودي",
    ],
    exclusions: [
      "التعديلات الإنشائية على العناصر الحاملة",
      "موافقات البلدية والدفاع المدني",
      "الأثاث والأجهزة والتجهيزات الناعمة",
      "تنسيق الحدائق الخارجية والأسوار",
    ],
    timeline: {
      duration: "6-8 أسابيع",
      milestones: [
        { name: "معاينة الموقع وبدء المشروع", date: null },
        { name: "مرحلة التنفيذ", date: null },
        { name: "التسليم النهائي", date: null },
      ],
    },
    paymentSchedule: [
      { percentage: 30, label: "دفعة مقدمة" },
      { percentage: 40, label: "عند التسليم" },
      { percentage: 30, label: "بعد الاستلام" },
    ],
    warrantyPeriod: "سنة واحدة",
  };
}

function mockResponse(
  locale: Locale,
  stage: MockStage,
  userMessage: string
): string {
  const budgetMatch = userMessage.match(/(?:SAR |ريال )?(\d+)/);
  const budget = budgetMatch ? parseInt(budgetMatch[1]!, 10) : 100000;
  const d = localeDefaults(locale);

  switch (stage) {
    case "analysis":
      return locale === "en"
        ? "Saudi real estate fit-out project requiring structured scope, commercial terms, and handover milestones."
        : "مشروع تشطيب عقاري في السعودية يتطلب نطاقاً منظماً وشروطاً تجارية ومراحل تسليم.";
    case "scope":
      return JSON.stringify({
        scopeItems: [
          {
            id: "1",
            title: locale === "en" ? "Project Management" : "إدارة المشروع",
            description:
              locale === "en"
                ? "Manage all project activities and coordination with the client"
                : "إدارة جميع أنشطة المشروع والتنسيق مع العميل",
          },
          {
            id: "2",
            title: locale === "en" ? "Execution" : "التنفيذ",
            description:
              locale === "en"
                ? "Execute the full scope of work as described"
                : "تنفيذ نطاق العمل الكامل كما هو موصوف",
          },
          {
            id: "3",
            title: locale === "en" ? "Quality Control" : "ضبط الجودة",
            description:
              locale === "en"
                ? "Ensure quality standards and final handover"
                : "ضمان معايير الجودة والتسليم النهائي",
          },
        ],
        deliverables: [
          {
            id: "d1",
            name: locale === "en" ? "Completed Works" : "الأعمال المنجزة",
            description:
              locale === "en"
                ? "All scope items completed to specification"
                : "إنجاز جميع بنود النطاق وفق المواصفات",
          },
          {
            id: "d2",
            name: locale === "en" ? "Handover Report" : "محضر التسليم",
            description:
              locale === "en"
                ? "Final project handover documentation"
                : "توثيق التسليم النهائي للمشروع",
          },
        ],
      });
    case "commercial":
      return JSON.stringify({
        totalValue: budget,
        paymentSchedule: d.paymentSchedule,
        warrantyPeriod: d.warrantyPeriod,
        retention: null,
      });
    case "assumptions":
      return JSON.stringify({
        assumptions: d.assumptions,
        exclusions: d.exclusions,
      });
    case "timeline":
      return JSON.stringify({
        duration: d.timeline.duration,
        startDate: null,
        endDate: null,
        milestones: d.timeline.milestones,
      });
    case "intro":
      return locale === "en"
        ? "Professional proposal prepared for the described project scope."
        : "عرض احترافي مُعد لنطاق المشروع الموصوف.";
  }
}
