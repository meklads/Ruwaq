// ============================================================
// Canonical Proposal Types — Single Source of Truth
// ============================================================

export type ProposalStatus =
  | "draft"
  | "generating"
  | "review"
  | "reviewed"
  | "exported";

export type ConfidenceLevel = "high" | "medium" | "low" | "always_warn";

export type PaymentType =
  | "milestone_30_40_30"
  | "monthly"
  | "fixed"
  | "custom";

export type CommercialMode = "fixed_price" | "estimate_only";

export type PropertyType =
  | ""
  | "villa"
  | "apartment"
  | "office"
  | "retail"
  | "other";

export interface ProposalOptionalContext {
  projectLocation?: string;
  propertyType?: PropertyType | string;
  areaSqm?: number;
  durationHint?: string;
  specifications?: string;
}

// --- User Input ---

export interface ProposalInput {
  projectName: string;
  clientName: string;
  description: string;
  budget: number;
  paymentType: PaymentType;
  commercialMode: CommercialMode;
}

// --- AI Generated Structures ---

export interface ScopeItem {
  id: string;
  title: string;
  description: string;
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
}

export interface PaymentMilestone {
  percentage: number;
  label: string;
  amount: number;
}

export interface CommercialTerms {
  totalValue: number;
  paymentSchedule: PaymentMilestone[];
  warrantyPeriod: string;
  retention: number | null;
}

export interface Timeline {
  duration: string;
  startDate: string | null;
  endDate: string | null;
  milestones: { name: string; date: string | null }[];
}

// --- Confidence Map ---

export interface ConfidenceMap {
  scopeItems: ConfidenceLevel;
  deliverables: ConfidenceLevel;
  timeline: ConfidenceLevel;
  commercialTerms: ConfidenceLevel;
  assumptions: ConfidenceLevel;
  exclusions: ConfidenceLevel;
}

// --- Trust Layer (Review UI) ---

export interface ProposalBoqLineView {
  id: string;
  sortOrder: number;
  labelAr: string;
  labelEn: string;
  amount: number;
  percent: number;
  category: string;
  isEstimated: boolean;
  source: string;
  note: string | null;
}

export interface ProposalClauseSelectionView {
  id: string;
  clauseTemplateId: string;
  clauseKey: string;
  category: string;
  isMandatory: boolean;
  alternativeGroup: string | null;
  enabled: boolean;
  renderedTextAr: string | null;
  renderedTextEn: string | null;
  sourceRef: string | null;
  sortOrder: number;
}

export type { ReviewGates, ReviewGateKey } from "./trust-layer.types";

// --- Full Proposal ---

export interface Proposal {
  id: string;
  userId: string | null;
  status: ProposalStatus;
  version: number;

  // User input
  projectName: string;
  clientName: string;
  description: string;
  budget: number;
  paymentType: PaymentType;
  commercialMode: CommercialMode;
  locale: "ar" | "en";
  introduction: string | null;

  projectLocation: string | null;
  propertyType: string | null;
  areaSqm: number | null;
  durationHint: string | null;
  specifications: string | null;

  // AI generated
  scopeItems: ScopeItem[];
  deliverables: Deliverable[];
  timeline: Timeline | null;
  commercialTerms: CommercialTerms | null;
  assumptions: string[];
  exclusions: string[];

  // Confidence
  confidence: ConfidenceMap;

  // Review
  reviewedSections: string[];
  reviewGates: import("./trust-layer.types").ReviewGates | null;
  estimateVariancePercent: number;
  projectArchetype: string | null;
  clausePackNameAr: string | null;
  clausePackNameEn: string | null;
  clausePackVersion: string | null;
  boqLines: ProposalBoqLineView[];
  clauseSelections: ProposalClauseSelectionView[];

  // Metadata
  proposalNumber: string | null;
  exportedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- Server Action Inputs ---

export type CreateProposalInput = Omit<ProposalInput, "commercialMode"> &
  ProposalOptionalContext & {
    commercialMode?: CommercialMode;
  };

export interface UpdateFieldInput {
  proposalId: string;
  field: string; // dot-notation path: "scopeItems[0].title"
  value: unknown;
}

export interface AddItemInput {
  proposalId: string;
  section: "scopeItems" | "assumptions" | "exclusions" | "deliverables";
  item: Record<string, unknown>;
}

export interface RemoveItemInput {
  proposalId: string;
  section: "scopeItems" | "assumptions" | "exclusions" | "deliverables";
  itemId: string;
}
