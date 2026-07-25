import { db } from "@/shared/lib/db";
import type {
  CommercialTerms,
  Deliverable,
  ScopeItem,
  Timeline,
} from "@/shared/types";
import type { Locale } from "@/shared/i18n/locale";

export type ShareClauseView = {
  category: string;
  categoryLabel: string;
  text: string;
  sourceRef: string | null;
};

export type ShareBoqLineView = {
  label: string;
  amount: number;
  percent: number;
  isEstimated: boolean;
};

export type ShareCompanyView = {
  companyName: string | null;
  logoUrl: string | null;
  phone: string | null;
  email: string | null;
  crNumber: string | null;
  vatNumber: string | null;
};

export type ShareProposalView = {
  token: string;
  locale: Locale;
  projectName: string;
  clientName: string;
  introduction: string | null;
  proposalNumber: string | null;
  budget: number;
  commercialMode: "fixed_price" | "estimate_only";
  estimateVariancePercent: number;
  exportedAt: string;
  scopeItems: ScopeItem[];
  deliverables: Deliverable[];
  timeline: Timeline | null;
  commercialTerms: CommercialTerms | null;
  boqLines: ShareBoqLineView[];
  clauseItems: ShareClauseView[];
  clausePackName: string | null;
  clausePackVersion: string | null;
  company: ShareCompanyView | null;
  pdfUrl: string;
};

export async function getShareViewByToken(
  token: string
): Promise<ShareProposalView | null> {
  const doc = await db.generatedDocument.findFirst({
    where: { shareToken: token },
    include: {
      proposal: {
        include: {
          boqLines: { orderBy: { sortOrder: "asc" } },
          clauseSelections: {
            where: { enabled: true },
            include: { clauseTemplate: true },
            orderBy: { sortOrder: "asc" },
          },
          clausePack: true,
        },
      },
    },
  });

  if (!doc?.proposal) return null;

  const proposal = doc.proposal;
  const locale: Locale = proposal.locale === "en" ? "en" : "ar";

  const company = proposal.userId
    ? await db.companyProfile.findUnique({
        where: { userId: proposal.userId },
      })
    : null;

  const { getMessages } = await import("@/shared/i18n");
  const messages = getMessages(locale);

  const clauseItems: ShareClauseView[] = proposal.clauseSelections.map(
    (sel) => {
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
    }
  );

  const boqLines: ShareBoqLineView[] = proposal.boqLines.map((line) => ({
    label: locale === "ar" ? line.labelAr : line.labelEn,
    amount: line.amount,
    percent: line.percent,
    isEstimated: line.isEstimated,
  }));

  const clausePackName =
    locale === "ar"
      ? proposal.clausePack?.nameAr ?? messages.review.clauses.defaultPackName
      : proposal.clausePack?.nameEn ?? messages.review.clauses.defaultPackName;

  return {
    token,
    locale,
    projectName: proposal.projectName,
    clientName: proposal.clientName,
    introduction: proposal.introduction,
    proposalNumber: proposal.proposalNumber,
    budget: proposal.budget,
    commercialMode:
      proposal.commercialMode === "estimate_only" ? "estimate_only" : "fixed_price",
    estimateVariancePercent: proposal.estimateVariancePercent,
    exportedAt: (proposal.exportedAt ?? proposal.updatedAt).toISOString(),
    scopeItems: (proposal.scopeItems ?? []) as unknown as ScopeItem[],
    deliverables: (proposal.deliverables ?? []) as unknown as Deliverable[],
    timeline: proposal.timeline as unknown as Timeline | null,
    commercialTerms: proposal.commercialTerms as unknown as CommercialTerms | null,
    boqLines,
    clauseItems,
    clausePackName,
    clausePackVersion: proposal.clausePackVersion,
    company: company
      ? {
          companyName: company.companyName,
          logoUrl: company.logoUrl,
          phone: company.phone,
          email: company.email,
          crNumber: company.crNumber,
          vatNumber: company.vatNumber,
        }
      : null,
    pdfUrl: `/api/share/${token}/export/pdf`,
  };
}
