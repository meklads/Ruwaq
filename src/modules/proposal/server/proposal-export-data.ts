import { db } from "@/shared/lib/db";
import type { CommercialMode } from "@/shared/types";
import type { Locale } from "@/shared/i18n/locale";
import { localeToBcp47 } from "@/shared/i18n/locale";
import { getMessages } from "@/shared/i18n";
import {
  hasPremiumExportAccess,
  shouldApplyRuwaqBranding,
} from "@/modules/billing/lib/product-access";
import { resolveEntitledExportTemplateId } from "@/modules/company/lib/export-template-ids";
import {
  resolveCompanyTier,
} from "@/modules/billing/lib/tiers";
import {
  asObjectList,
  asStringList,
  buildProposalExportHtml,
} from "./proposal-export-html";
import type { ProposalExportData } from "../export/proposal-export-types";

export type BuildProposalExportOptions = {
  /** Default true — client name + date watermark on PDF/share exports. */
  watermarked?: boolean;
};

export async function loadProposalExportContext(
  proposalId: string,
  options: BuildProposalExportOptions = {}
) {
  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
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
  if (!proposal) return null;

  const company = proposal.userId
    ? await db.companyProfile.findUnique({
        where: { userId: proposal.userId },
      })
    : null;

  const tier = company ? resolveCompanyTier(company) : "STARTER";
  const applyBranding = company
    ? shouldApplyRuwaqBranding(company)
    : options.watermarked !== false;
  const applyClientWatermark = applyBranding && options.watermarked !== false;
  const premiumExport = company ? hasPremiumExportAccess(company) : false;

  const locale: Locale = proposal.locale === "en" ? "en" : "ar";
  const messages = getMessages(locale);
  const commercialMode: CommercialMode =
    proposal.commercialMode === "estimate_only" ? "estimate_only" : "fixed_price";

  const validityDate = new Date();
  validityDate.setDate(validityDate.getDate() + 30);

  const issueDate = new Date().toLocaleDateString(localeToBcp47(locale), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const boqLines = proposal.boqLines.map((line) => ({
    label: locale === "ar" ? line.labelAr : line.labelEn,
    amount: line.amount,
    percent: line.percent,
    category: line.category,
    isEstimated: line.isEstimated,
  }));

  const clauseItems = proposal.clauseSelections.map((sel) => {
    const category = sel.clauseTemplate.category;
    const categoryLabel =
      messages.review.clauses.categories[category] ?? category;
    const text =
      locale === "ar"
        ? sel.renderedTextAr ?? sel.clauseTemplate.textAr
        : sel.renderedTextEn ?? sel.clauseTemplate.textEn;

    return {
      category,
      categoryLabel,
      text,
      sourceRef: sel.clauseTemplate.sourceRef,
    };
  });

  const clausePackName =
    locale === "ar"
      ? proposal.clausePack?.nameAr ?? messages.review.clauses.defaultPackName
      : proposal.clausePack?.nameEn ?? messages.review.clauses.defaultPackName;

  const exportData: Omit<ProposalExportData, "appBaseUrl"> & {
    templateId?: ProposalExportData["templateId"];
  } = {
    projectName: proposal.projectName,
    clientName: proposal.clientName,
    companyName: company?.companyName ?? undefined,
    logoUrl: company?.logoUrl ?? undefined,
    address: company?.address ?? undefined,
    about: company?.about ?? undefined,
    website: company?.website ?? undefined,
    portfolioUrl: company?.portfolioUrl ?? undefined,
    catalogUrl: company?.catalogUrl ?? undefined,
    crNumber: company?.crNumber ?? undefined,
    vatNumber: company?.vatNumber ?? undefined,
    companyPhone: company?.phone ?? undefined,
    companyEmail: company?.email ?? undefined,
    proposalNumber: proposal.proposalNumber,
    introduction: proposal.introduction,
    date: issueDate,
    validityDate: validityDate.toLocaleDateString(localeToBcp47(locale), {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    scopeItems: asObjectList(proposal.scopeItems),
    deliverables: asObjectList(proposal.deliverables),
    timeline:
      proposal.timeline && typeof proposal.timeline === "object"
        ? (proposal.timeline as Record<string, unknown>)
        : null,
    commercialTerms:
      proposal.commercialTerms && typeof proposal.commercialTerms === "object"
        ? (proposal.commercialTerms as Record<string, unknown>)
        : null,
    assumptions: asStringList(proposal.assumptions),
    exclusions: asStringList(proposal.exclusions),
    budget: proposal.budget,
    commercialMode,
    projectLocation: proposal.projectLocation ?? undefined,
    propertyType: proposal.propertyType ?? undefined,
    areaSqm: proposal.areaSqm ?? undefined,
    boqLines,
    clauseItems,
    clausePackName,
    clausePackVersion: proposal.clausePackVersion,
    estimateVariancePercent: proposal.estimateVariancePercent,
    watermarkClientName: applyClientWatermark ? proposal.clientName : undefined,
    watermarkDate: applyClientWatermark ? issueDate : undefined,
    poweredByRuwaqFooter: applyBranding,
    templateId: resolveEntitledExportTemplateId(
      company?.exportTemplateId,
      premiumExport
    ),
    headerFooterStyleId: company?.headerFooterStyleId ?? undefined,
  };

  return {
    locale,
    messages,
    exportData,
    projectName: proposal.projectName,
  };
}

export async function buildProposalExportHtmlForId(
  proposalId: string,
  options: BuildProposalExportOptions = {}
) {
  const ctx = await loadProposalExportContext(proposalId, options);
  if (!ctx) return null;

  const html = buildProposalExportHtml(ctx.locale, ctx.exportData);

  return { html, projectName: ctx.projectName };
}
