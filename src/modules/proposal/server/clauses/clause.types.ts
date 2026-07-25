import { z } from "zod";
import type { CommercialMode, ProjectArchetype } from "@/shared/types";

/** AI output — keys and placeholder values ONLY. No legal prose. */
export const clauseAiSelectionSchema = z.object({
  optionalClauseKeys: z.array(z.string()).default([]),
  /** alternativeGroup → chosen clauseKey */
  alternativeChoices: z.record(z.string(), z.string()).default({}),
  /** Only keys allowed on matched templates */
  placeholderOverrides: z.record(z.string(), z.string()).default({}),
  /** UX tooltips — not rendered as legal text */
  selectionReasons: z.record(z.string(), z.string()).default({}),
});

export type ClauseAiSelection = z.infer<typeof clauseAiSelectionSchema>;

export type ClauseSelectionSource =
  | "ai_suggested"
  | "user_toggled"
  | "user_alternative"
  | "system_auto_trigger"
  | "system_mandatory";

export type ClauseTemplateRecord = {
  id: string;
  clauseKey: string;
  category: string;
  riskSide: string;
  textAr: string;
  textEn: string;
  placeholders: unknown;
  sortOrder: number;
  isMandatory: boolean;
  alternativeGroup: string | null;
  autoTriggerRules: unknown;
  sourceRef: string | null;
};

export type ClausePackRecord = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  archetype: string;
  version: string;
  clauses: ClauseTemplateRecord[];
};

export type ClauseRenderContext = {
  commercialMode: CommercialMode;
  estimateVariancePercent: number;
  /** Strictly from duration-parser — never guessed by AI */
  projectDurationDays: number | null;
  budget?: number;
  clientName?: string;
  projectName?: string;
};

export type RenderedClause = {
  clauseTemplateId: string;
  clauseKey: string;
  sortOrder: number;
  enabled: true;
  filledPlaceholders: Record<string, string>;
  source: ClauseSelectionSource;
  renderedTextAr: string;
  renderedTextEn: string;
  aiReason?: string | null;
};

export type ClauseMatchInput = {
  pack: ClausePackRecord;
  archetype: ProjectArchetype;
  commercialMode: CommercialMode;
  estimateVariancePercent: number;
  projectDurationDays: number | null;
  aiSelection: ClauseAiSelection;
  budget?: number;
  clientName?: string;
  projectName?: string;
};

export type ClauseMatchResult = {
  packId: string;
  packSlug: string;
  packVersion: string;
  archetype: ProjectArchetype;
  projectDurationDays: number | null;
  priceEscalationAutoTriggered: boolean;
  selections: RenderedClause[];
};

export const PRICE_ESCALATION_KEY_SUFFIX = "-PRICE-ESCALATION";
export const ESCALATION_AUTO_TRIGGER_DAYS = 90;

export function isPriceEscalationClause(clauseKey: string): boolean {
  return clauseKey.endsWith(PRICE_ESCALATION_KEY_SUFFIX);
}
