import { z } from "zod";
import type { CommercialMode } from "@/shared/types/proposal.types";

// ============================================================
// Trust Layer — Project & archetype
// ============================================================

export type ProjectArchetype = "fit_out" | "supervision" | "maintenance" | "other";

export type BoqCategory =
  | "materials"
  | "labor"
  | "equipment"
  | "phase"
  | "management"
  | "other";

export type BoqLineSource = "ai_suggested" | "user_edited" | "user_added";

export type ClauseCategory =
  | "materials"
  | "permits"
  | "payment"
  | "warranty"
  | "scope_change"
  | "delay"
  | "vat"
  | "compliance"
  | "escalation"
  | "soil"
  | "other";

export type ClientActionType =
  | "link_open"
  | "section_view"
  | "download_pdf"
  | "soft_approve"
  | "request_amendment"
  | "ask_question";

export type LiveRoomSectionKey =
  | "understanding"
  | "scope"
  | "deliverables"
  | "commercial"
  | "boq"
  | "payment"
  | "timeline"
  | "clauses"
  | "acceptance";

export type ReviewGateKey =
  | "projectUnderstanding"
  | "scope"
  | "deliverables"
  | "commercialTerms"
  | "boqBreakdown"
  | "clausePack"
  | "timeline"
  | "legalDisclaimer";

export interface ReviewGateState {
  confirmed: boolean;
  at: string | null;
}

export type ReviewGates = Record<ReviewGateKey, ReviewGateState>;

export interface PlaceholderDef {
  key: string;
  default: string;
}

// ============================================================
// Smart BOQ
// ============================================================

export interface BoqLineDraft {
  id: string;
  sortOrder: number;
  labelAr: string;
  labelEn: string;
  amount: number;
  percent: number;
  category: BoqCategory;
  note?: string | null;
  source: BoqLineSource;
  isEstimated: boolean;
  aiReason?: string | null;
  /** When true, amount is excluded from auto-redistribution */
  locked?: boolean;
}

export interface BoqAllocateInput {
  budget: number;
  commercialMode: CommercialMode;
  archetype: ProjectArchetype;
  /** Optional AI overrides — labels/notes only; amounts are system-allocated */
  labelOverrides?: Array<{
    sortOrder: number;
    labelAr?: string;
    labelEn?: string;
    note?: string;
    aiReason?: string;
  }>;
}

export interface BoqAllocateResult {
  lines: BoqLineDraft[];
  lineCount: number;
  budget: number;
  sumVerified: true;
}

// ============================================================
// Soft approval — estimate_only enforces disclaimer ack
// ============================================================

const softApproveBaseFields = {
  clientName: z.string().trim().min(1, "clientName is required"),
  clientEmail: z.string().email().optional(),
  approvedScope: z.literal(true, { message: "approvedScope must be true" }),
  approvedCommercial: z.literal(true, {
    message: "approvedCommercial must be true",
  }),
  approvedTimeline: z.boolean(),
  submittedAt: z.string().datetime({ offset: true }),
  clientIpHash: z.string().optional(),
};

export const softApproveFixedPriceSchema = z.object({
  ...softApproveBaseFields,
  commercialMode: z.literal("fixed_price"),
  acknowledgedEstimateDisclaimer: z.undefined().optional(),
  estimateVariancePercent: z.undefined().optional(),
});

export const softApproveEstimateOnlySchema = z.object({
  ...softApproveBaseFields,
  commercialMode: z.literal("estimate_only"),
  acknowledgedEstimateDisclaimer: z.literal(true, {
    message:
      "acknowledgedEstimateDisclaimer must be true when commercialMode is estimate_only",
  }),
  estimateVariancePercent: z.number().positive().optional(),
});

export const softApprovePayloadSchema = z.discriminatedUnion("commercialMode", [
  softApproveFixedPriceSchema,
  softApproveEstimateOnlySchema,
]);

export type SoftApprovePayloadFixed = z.infer<typeof softApproveFixedPriceSchema>;
export type SoftApprovePayloadEstimate = z.infer<
  typeof softApproveEstimateOnlySchema
>;
export type SoftApprovePayload = z.infer<typeof softApprovePayloadSchema>;

/**
 * Parse and validate soft-approval payload against proposal commercial mode.
 * Throws ZodError when estimate_only projects omit disclaimer acknowledgment.
 */
export function parseSoftApprovePayload(
  payload: unknown,
  commercialMode: CommercialMode
): SoftApprovePayload {
  const withMode =
    typeof payload === "object" && payload !== null
      ? { ...payload, commercialMode }
      : { commercialMode };

  return softApprovePayloadSchema.parse(withMode);
}

/** Type guard — estimate_only payloads always carry disclaimer ack */
export function isEstimateSoftApprove(
  payload: SoftApprovePayload
): payload is SoftApprovePayloadEstimate {
  return payload.commercialMode === "estimate_only";
}

// ============================================================
// Client actions & amendments
// ============================================================

export interface AmendmentRequestInput {
  sectionKey: LiveRoomSectionKey;
  note: string;
  clientName: string;
}

export interface AutoTriggerRules {
  minDurationDays?: number;
}

export class TrustLayerValidationError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = "TrustLayerValidationError";
  }
}
