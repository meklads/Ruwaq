import type { CommercialMode } from "@/shared/types";
import type { Locale } from "@/shared/i18n/locale";

export type ProposalExportData = {
  projectName: string;
  clientName: string;
  companyName?: string;
  logoUrl?: string;
  address?: string;
  about?: string;
  website?: string;
  portfolioUrl?: string;
  catalogUrl?: string;
  crNumber?: string;
  vatNumber?: string;
  companyPhone?: string;
  companyEmail?: string;
  proposalNumber?: string | null;
  introduction?: string | null;
  date: string;
  validityDate: string;
  scopeItems: Record<string, unknown>[];
  deliverables: Record<string, unknown>[];
  timeline: Record<string, unknown> | null;
  commercialTerms: Record<string, unknown> | null;
  assumptions: string[];
  exclusions: string[];
  budget: number;
  commercialMode: CommercialMode;
  projectLocation?: string;
  propertyType?: string;
  areaSqm?: number;
  appBaseUrl: string;
  templateId?: "ruwaq" | "ruwaq_executive" | "graphics_house";
  /** Header/footer color skin — only applied when templateId is "ruwaq". */
  headerFooterStyleId?: string;
  /** Curated or custom 2–3 color palette driving the whole document chrome. */
  paletteId?: string;
  palettePrimary?: string;
  paletteAccent?: string;
  paletteSurface?: string;
  /** When true, shows Ruwaq platform branding (sample preview only). */
  platformBranding?: boolean;
  /** Smart BOQ lines for export (Trust Layer). */
  boqLines?: ProposalExportBoqLine[];
  /** Rendered clause pack items (Trust Layer). */
  clauseItems?: ProposalExportClause[];
  clausePackName?: string | null;
  clausePackVersion?: string | null;
  estimateVariancePercent?: number;
  /** Hard watermark — client name + issue date on every page. */
  watermarkClientName?: string;
  watermarkDate?: string;
  /** Starter tier footer — "Powered by Ruwaq" on PDF exports. */
  poweredByRuwaqFooter?: boolean;
};

export type ProposalExportBoqLine = {
  label: string;
  amount: number;
  percent: number;
  category: string;
  isEstimated: boolean;
};

export type ProposalExportClause = {
  category: string;
  categoryLabel: string;
  text: string;
  sourceRef?: string | null;
};
