import { db } from "@/shared/lib/db";
import { getSession } from "@/modules/auth/server/session";
import { getLocale } from "@/shared/i18n/server";
import {
  validateLocaleText,
  validateProposalFields,
  type Locale,
} from "@/shared/i18n/locale";
import { getMessages } from "@/shared/i18n";
import { setByPath } from "@/shared/lib/json-path";
import { assertCanMutateProposal, assertCanClaimProposal } from "./proposal-auth";
import { createEditToken } from "./proposal-edit-access";
import { logUsageEvent } from "@/shared/lib/usage-events";
import type {
  CreateProposalInput,
  Proposal,
  ScopeItem,
  Deliverable,
  CommercialTerms,
  Timeline,
} from "@/shared/types";
import {
  gateProgressForProposal,
  proposalListGroup,
} from "@/modules/proposal/lib/proposal-list.utils";

// ─── CREATE ───

export async function createProposal(
  input: CreateProposalInput
): Promise<{ id: string; editKey?: string }> {
  let userId: string | null = null;
  try {
    const session = await getSession();
    userId = session?.user?.id ?? null;
  } catch {
    userId = null;
  }

  const locale = await getLocale();
  const localeError = validateProposalFields(
    {
      projectName: input.projectName,
      clientName: input.clientName,
      description: input.description,
    },
    locale
  );
  if (localeError) {
    const t = getMessages(locale);
    throw new Error(t.form.errors[localeError.error]);
  }

  const optionalTexts = [
    input.projectLocation,
    input.durationHint,
    input.specifications,
  ].filter((v): v is string => !!v?.trim());

  for (const text of optionalTexts) {
    const optError = validateLocaleText(text, locale);
    if (optError) {
      const t = getMessages(locale);
      throw new Error(t.form.errors[optError]);
    }
  }

  const editToken = userId ? null : createEditToken();

  const proposal = await db.proposal.create({
    data: {
      userId: userId ?? null,
      editToken,
      locale,
      projectName: input.projectName,
      clientName: input.clientName,
      description: input.description,
      projectLocation: input.projectLocation?.trim() || null,
      propertyType: input.propertyType?.trim() || null,
      areaSqm: input.areaSqm && input.areaSqm > 0 ? input.areaSqm : null,
      durationHint: input.durationHint?.trim() || null,
      specifications: input.specifications?.trim() || null,
      budget: input.budget,
      paymentType: input.paymentType,
      commercialMode: input.commercialMode ?? "fixed_price",
      status: "draft",
      confidence: {
        scopeItems: "medium" as const,
        deliverables: "medium" as const,
        timeline: "medium" as const,
        commercialTerms: "medium" as const,
        assumptions: "always_warn" as const,
        exclusions: "always_warn" as const,
      },
      reviewedSections: [],
    },
  });

  logUsageEvent("proposal_created", {
    userId,
    proposalId: proposal.id,
    metadata: { locale, commercialMode: input.commercialMode ?? "fixed_price", isGuest: !userId },
  });

  return { id: proposal.id, editKey: editToken ?? undefined };
}

// ─── GET ───

export async function getProposal(id: string): Promise<Proposal | null> {
  const p = await db.proposal.findUnique({
    where: { id },
    include: {
      boqLines: { orderBy: { sortOrder: "asc" } },
      clauseSelections: {
        where: { enabled: true },
        include: { clauseTemplate: true },
        orderBy: { sortOrder: "asc" },
      },
      clausePack: true,
    },
  });
  if (!p) return null;

  const confidence = p.confidence as unknown as Proposal["confidence"];

  return {
    id: p.id,
    userId: p.userId,
    status: p.status as Proposal["status"],
    version: p.version,
    projectName: p.projectName,
    clientName: p.clientName,
    description: p.description,
    budget: p.budget,
    paymentType: p.paymentType as Proposal["paymentType"],
    commercialMode:
      p.commercialMode === "estimate_only" ? "estimate_only" : "fixed_price",
    locale: p.locale === "en" ? "en" : "ar",
    introduction: p.introduction ?? null,
    projectLocation: p.projectLocation,
    propertyType: p.propertyType,
    areaSqm: p.areaSqm,
    durationHint: p.durationHint,
    specifications: p.specifications,
    scopeItems: (p.scopeItems ?? []) as unknown as ScopeItem[],
    deliverables: (p.deliverables ?? []) as unknown as Deliverable[],
    timeline: p.timeline as unknown as Timeline | null,
    commercialTerms: p.commercialTerms as unknown as CommercialTerms | null,
    assumptions: (p.assumptions ?? []) as unknown as string[],
    exclusions: (p.exclusions ?? []) as unknown as string[],
    confidence,
    reviewedSections: (p.reviewedSections ?? []) as unknown as string[],
    reviewGates: (p.reviewGates as Proposal["reviewGates"]) ?? null,
    estimateVariancePercent: p.estimateVariancePercent,
    projectArchetype: p.projectArchetype,
    clausePackNameAr: p.clausePack?.nameAr ?? null,
    clausePackNameEn: p.clausePack?.nameEn ?? null,
    clausePackVersion: p.clausePackVersion,
    boqLines: p.boqLines.map((line) => ({
      id: line.id,
      sortOrder: line.sortOrder,
      labelAr: line.labelAr,
      labelEn: line.labelEn,
      amount: line.amount,
      percent: line.percent,
      category: line.category,
      isEstimated: line.isEstimated,
      source: line.source,
      note: line.note,
    })),
    clauseSelections: p.clauseSelections.map((sel) => ({
      id: sel.id,
      clauseTemplateId: sel.clauseTemplateId,
      clauseKey: sel.clauseTemplate.clauseKey,
      category: sel.clauseTemplate.category,
      isMandatory: sel.clauseTemplate.isMandatory,
      alternativeGroup: sel.clauseTemplate.alternativeGroup,
      enabled: sel.enabled,
      renderedTextAr: sel.renderedTextAr,
      renderedTextEn: sel.renderedTextEn,
      sourceRef: sel.clauseTemplate.sourceRef,
      sortOrder: sel.sortOrder,
    })),
    proposalNumber: p.proposalNumber,
    exportedAt: p.exportedAt?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

// ─── UPDATE FIELD (dot-notation) ───

export async function updateProposalField(
  proposalId: string,
  field: string,
  value: unknown
): Promise<{ success: boolean }> {
  await assertCanMutateProposal(proposalId);

  const scalarFields = [
    "projectName",
    "clientName",
    "description",
    "projectLocation",
    "propertyType",
    "areaSqm",
    "durationHint",
    "specifications",
    "budget",
    "paymentType",
    "commercialMode",
    "status",
    "introduction",
  ];

  if (scalarFields.includes(field)) {
    const data: Record<string, unknown> = { [field]: value };

    // Keep commercial total in sync when budget changes
    if (field === "budget" && typeof value === "number") {
      const proposal = await db.proposal.findUnique({
        where: { id: proposalId },
        select: { commercialTerms: true },
      });
      if (proposal?.commercialTerms) {
        const terms = JSON.parse(
          JSON.stringify(proposal.commercialTerms)
        ) as CommercialTerms;
        terms.totalValue = value;
        if (terms.paymentSchedule?.length) {
          terms.paymentSchedule = terms.paymentSchedule.map((m) => ({
            ...m,
            amount: Math.round((value * m.percentage) / 100),
          }));
        }
        data.commercialTerms = terms;
      }
    }

    await db.proposal.update({
      where: { id: proposalId },
      data,
    });
    return { success: true };
  }

  const jsonFields = [
    "scopeItems",
    "deliverables",
    "timeline",
    "commercialTerms",
    "assumptions",
    "exclusions",
    "confidence",
    "reviewedSections",
  ];

  const rootMatch = field.match(/^(\w+)/);
  if (!rootMatch) return { success: false };

  const rootKey = rootMatch[1]!;
  if (!jsonFields.includes(rootKey)) return { success: false };

  const subPath = field.slice(rootKey.length);
  const current = await db.proposal.findUnique({
    where: { id: proposalId },
    select: {
      [rootKey]: true,
      budget: true,
    },
  });
  if (!current) return { success: false };

  const defaultValue =
    rootKey === "assumptions" || rootKey === "exclusions" || rootKey === "scopeItems" || rootKey === "deliverables"
      ? []
      : rootKey === "reviewedSections"
        ? []
        : null;

  let currentData = JSON.parse(
    JSON.stringify(current[rootKey as keyof typeof current] ?? defaultValue)
  );

  if (subPath) {
    currentData = setByPath(currentData, subPath, value);
  } else {
    currentData = value;
  }

  // Recalculate payment amounts when percentage changes
  if (
    rootKey === "commercialTerms" &&
    subPath.includes("paymentSchedule") &&
    subPath.endsWith("percentage")
  ) {
    const terms = currentData as CommercialTerms;
    const budget = current.budget ?? terms.totalValue ?? 0;
    const total = terms.totalValue ?? budget;
    if (terms.paymentSchedule?.length) {
      terms.paymentSchedule = terms.paymentSchedule.map((m) => ({
        ...m,
        amount: Math.round((total * m.percentage) / 100),
      }));
      currentData = terms;
    }
  }

  await db.proposal.update({
    where: { id: proposalId },
    data: { [rootKey]: currentData as any },
  });
  return { success: true };
}

// ─── ADD ITEM TO ARRAY SECTION ───

export async function addProposalItem(
  proposalId: string,
  section: string,
  item: Record<string, unknown>
): Promise<{ id: string }> {
  await assertCanMutateProposal(proposalId);

  const current = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { [section]: true },
  });
  if (!current) throw new Error("Proposal not found");

  const arr = (current[section as keyof typeof current] ?? []) as any[];
  const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
  arr.push({ ...item, id });

  await db.proposal.update({
    where: { id: proposalId },
    data: { [section]: arr as any },
  });

  return { id };
}

// ─── REMOVE ITEM FROM ARRAY SECTION ───

export async function removeProposalItem(
  proposalId: string,
  section: string,
  itemId: string
): Promise<{ success: boolean }> {
  await assertCanMutateProposal(proposalId);

  const current = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { [section]: true },
  });
  if (!current) return { success: false };

  const arr = (current[section as keyof typeof current] ?? []) as any[];
  const filtered = arr.filter((item: any) => item.id !== itemId);

  await db.proposal.update({
    where: { id: proposalId },
    data: { [section]: filtered as any },
  });

  return { success: true };
}

// ─── MARK SECTION AS REVIEWED ───

export async function markSectionReviewed(
  proposalId: string,
  section: string
): Promise<{ reviewedSections: string[] }> {
  await assertCanMutateProposal(proposalId);

  const current = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { reviewedSections: true },
  });
  if (!current) throw new Error("Proposal not found");

  const reviewed = (current.reviewedSections ?? []) as string[];
  if (!reviewed.includes(section)) {
    reviewed.push(section);
  }

  const allSections = [
    "scopeItems",
    "commercialTerms",
    "assumptions",
    "exclusions",
  ];
  const nextStatus =
    allSections.every((s) => reviewed.includes(s)) ? "reviewed" : "review";

  await db.proposal.update({
    where: { id: proposalId },
    data: {
      reviewedSections: reviewed as any,
      status: nextStatus,
    },
  });

  return { reviewedSections: reviewed };
}

// ─── LIST PROPOSALS ───

export async function listUserProposals(userId: string) {
  const rows = await db.proposal.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      projectName: true,
      clientName: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      proposalNumber: true,
      reviewGates: true,
      reviewedSections: true,
      deliverables: true,
      publishedAt: true,
    },
  });

  return rows.map((p) => {
    const gateProgress = gateProgressForProposal({
      reviewGates: p.reviewGates,
      reviewedSections: p.reviewedSections,
      deliverables: p.deliverables,
    });

    return {
      ...p,
      group: proposalListGroup(p.status),
      gateProgress,
    };
  });
}

export async function claimProposal(
  proposalId: string,
  userId: string
): Promise<{ success: boolean }> {
  try {
    await assertCanClaimProposal(proposalId, userId);
  } catch {
    return { success: false };
  }

  await db.proposal.update({
    where: { id: proposalId },
    data: { userId, editToken: null },
  });
  logUsageEvent("guest_claimed", { userId, proposalId });
  return { success: true };
}

export async function deleteProposal(proposalId: string): Promise<void> {
  await assertCanMutateProposal(proposalId);
  await db.proposal.delete({ where: { id: proposalId } });
}

export async function duplicateProposal(
  proposalId: string,
  userId: string
): Promise<{ id: string }> {
  const source = await db.proposal.findUnique({ where: { id: proposalId } });
  if (!source) throw new Error("Proposal not found");
  if (source.userId && source.userId !== userId) {
    throw new Error("Unauthorized");
  }

  const copy = await db.proposal.create({
    data: {
      userId,
      locale: source.locale,
      introduction: source.introduction,
      projectName:
        source.locale === "en"
          ? `${source.projectName} (copy)`
          : `${source.projectName} (نسخة)`,
      clientName: source.clientName,
      description: source.description,
      projectLocation: source.projectLocation,
      propertyType: source.propertyType,
      areaSqm: source.areaSqm,
      durationHint: source.durationHint,
      specifications: source.specifications,
      budget: source.budget,
      paymentType: source.paymentType,
      commercialMode: source.commercialMode ?? "fixed_price",
      status: "review",
      scopeItems: source.scopeItems ?? undefined,
      deliverables: source.deliverables ?? undefined,
      timeline: source.timeline ?? undefined,
      commercialTerms: source.commercialTerms ?? undefined,
      assumptions: source.assumptions ?? undefined,
      exclusions: source.exclusions ?? undefined,
      confidence: source.confidence ?? undefined,
      reviewedSections: [],
    },
  });

  return { id: copy.id };
}

export async function getProposalIdByShareToken(
  token: string
): Promise<string | null> {
  const doc = await db.generatedDocument.findFirst({
    where: { shareToken: token },
    select: { proposalId: true },
  });
  return doc?.proposalId ?? null;
}

