/**
 * Hybrid Clause Engine — match, auto-trigger, and render pre-vetted clauses.
 */

import { db } from "@/shared/lib/db";
import type { CommercialMode, ProjectArchetype } from "@/shared/types";
import type { Locale } from "@/shared/i18n/locale";
import {
  exceedsDurationThreshold,
  resolveProjectDurationDays,
} from "../boq/duration-parser";
import {
  buildProjectContext,
  contextFromProposalRecord,
} from "../proposal-ai.prompts";
import { requestClauseAiSelection } from "./clause-ai.service";
import {
  DEFAULT_ALTERNATIVE_BY_GROUP,
  inferProjectArchetype,
  packSlugForArchetype,
  parseAutoTriggerRules,
} from "./clause-archetype";
import {
  assertRenderedFromTemplate,
  renderClauseTemplate,
} from "./clause-renderer.service";
import type {
  ClauseAiSelection,
  ClauseMatchInput,
  ClauseMatchResult,
  ClausePackRecord,
  ClauseTemplateRecord,
  RenderedClause,
} from "./clause.types";
import {
  ESCALATION_AUTO_TRIGGER_DAYS,
  isPriceEscalationClause,
} from "./clause.types";
import { TrustLayerValidationError } from "@/shared/types/trust-layer.types";
import { ensureClausePacksSeeded } from "./clause-pack-seed.service";

function proposalCommercialMode(raw: string | null | undefined): CommercialMode {
  return raw === "estimate_only" ? "estimate_only" : "fixed_price";
}

function proposalLocale(raw: string | null | undefined): Locale {
  return raw === "en" ? "en" : "ar";
}

export async function loadClausePackBySlug(
  slug: string
): Promise<ClausePackRecord | null> {
  const pack = await db.clausePack.findUnique({
    where: { slug, isActive: true },
    include: {
      clauses: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!pack) return null;

  return {
    id: pack.id,
    slug: pack.slug,
    nameAr: pack.nameAr,
    nameEn: pack.nameEn,
    archetype: pack.archetype,
    version: pack.version,
    clauses: pack.clauses as ClauseTemplateRecord[],
  };
}

/**
 * Strict 90-day rule — uses duration-parser output ONLY.
 * Returns false when duration is unknown (null).
 */
export function shouldAutoTriggerClause(
  template: ClauseTemplateRecord,
  projectDurationDays: number | null
): boolean {
  const rules = parseAutoTriggerRules(template.autoTriggerRules);
  if (!rules?.minDurationDays) return false;

  if (isPriceEscalationClause(template.clauseKey)) {
    return exceedsDurationThreshold(
      projectDurationDays,
      ESCALATION_AUTO_TRIGGER_DAYS
    );
  }

  if (projectDurationDays === null) return false;
  return projectDurationDays >= rules.minDurationDays;
}

function resolveAlternativeWinners(
  templates: ClauseTemplateRecord[],
  aiSelection: ClauseAiSelection
): Map<string, string> {
  const winners = new Map<string, string>();
  const groups = new Map<string, ClauseTemplateRecord[]>();

  for (const t of templates) {
    if (!t.alternativeGroup) continue;
    const list = groups.get(t.alternativeGroup) ?? [];
    list.push(t);
    groups.set(t.alternativeGroup, list);
  }

  for (const [group, members] of groups) {
    const aiPick = aiSelection.alternativeChoices[group];
    const validAi = members.find((m) => m.clauseKey === aiPick);
    const defaultKey = DEFAULT_ALTERNATIVE_BY_GROUP[group];
    const validDefault = members.find((m) => m.clauseKey === defaultKey);
    const winner = validAi ?? validDefault ?? members[0];

    if (winner) {
      winners.set(group, winner.clauseKey);
    }
  }

  return winners;
}

function shouldEnableTemplate(
  template: ClauseTemplateRecord,
  input: ClauseMatchInput,
  alternativeWinners: Map<string, string>,
  optionalKeys: Set<string>
): { enabled: boolean; source: RenderedClause["source"] } {
  if (template.isMandatory) {
    return { enabled: true, source: "system_mandatory" };
  }

  if (shouldAutoTriggerClause(template, input.projectDurationDays)) {
    return { enabled: true, source: "system_auto_trigger" };
  }

  if (template.alternativeGroup) {
    const winner = alternativeWinners.get(template.alternativeGroup);
    if (winner === template.clauseKey) {
      return { enabled: true, source: "ai_suggested" };
    }
    return { enabled: false, source: "ai_suggested" };
  }

  if (
    input.commercialMode === "estimate_only" &&
    template.clauseKey.includes("ESTIMATE-DISCLAIMER")
  ) {
    return { enabled: true, source: "system_mandatory" };
  }

  if (optionalKeys.has(template.clauseKey)) {
    return { enabled: true, source: "ai_suggested" };
  }

  return { enabled: false, source: "ai_suggested" };
}

/**
 * Pure matching + rendering — no DB writes.
 */
export function matchAndRenderClauses(input: ClauseMatchInput): ClauseMatchResult {
  const templates = input.pack.clauses;
  const alternativeWinners = resolveAlternativeWinners(
    templates,
    input.aiSelection
  );

  const validOptional = new Set(
    input.aiSelection.optionalClauseKeys.filter((key) =>
      templates.some((t) => t.clauseKey === key)
    )
  );

  const renderCtx = {
    commercialMode: input.commercialMode,
    estimateVariancePercent: input.estimateVariancePercent,
    projectDurationDays: input.projectDurationDays,
    budget: input.budget,
    clientName: input.clientName,
    projectName: input.projectName,
  };

  const selections: RenderedClause[] = [];
  let priceEscalationAutoTriggered = false;

  for (const template of templates) {
    const { enabled, source } = shouldEnableTemplate(
      template,
      input,
      alternativeWinners,
      validOptional
    );

    if (!enabled) continue;

    if (
      isPriceEscalationClause(template.clauseKey) &&
      source === "system_auto_trigger"
    ) {
      priceEscalationAutoTriggered = true;
    }

    const overrides: Record<string, string> = {};
    for (const [key, value] of Object.entries(
      input.aiSelection.placeholderOverrides
    )) {
      if (key !== "project_duration_days") {
        overrides[key] = value;
      }
    }

    const rendered = renderClauseTemplate(template, renderCtx, overrides);
    assertRenderedFromTemplate(
      template,
      rendered.renderedTextAr,
      rendered.renderedTextEn
    );

    selections.push({
      clauseTemplateId: template.id,
      clauseKey: template.clauseKey,
      sortOrder: template.sortOrder,
      enabled: true,
      filledPlaceholders: rendered.filledPlaceholders,
      source,
      renderedTextAr: rendered.renderedTextAr,
      renderedTextEn: rendered.renderedTextEn,
      aiReason: input.aiSelection.selectionReasons[template.clauseKey] ?? null,
    });
  }

  selections.sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    packId: input.pack.id,
    packSlug: input.pack.slug,
    packVersion: input.pack.version,
    archetype: input.archetype,
    projectDurationDays: input.projectDurationDays,
    priceEscalationAutoTriggered,
    selections,
  };
}

export async function matchClausesForProposal(
  proposalId: string
): Promise<ClauseMatchResult> {
  const proposal = await db.proposal.findUnique({ where: { id: proposalId } });
  if (!proposal) {
    throw new TrustLayerValidationError("Proposal not found", "PROPOSAL_NOT_FOUND");
  }

  const locale = proposalLocale(proposal.locale);
  const commercialMode = proposalCommercialMode(proposal.commercialMode);
  const timeline = proposal.timeline as { duration?: string } | null;

  const projectDurationDays = resolveProjectDurationDays({
    durationHint: proposal.durationHint,
    timelineDuration: timeline?.duration ?? null,
  });

  const archetype =
    (proposal.projectArchetype as ProjectArchetype | null) ??
    inferProjectArchetype({
      description: proposal.description,
      propertyType: proposal.propertyType,
      specifications: proposal.specifications,
    });

  const packSlug = packSlugForArchetype(archetype);
  await ensureClausePacksSeeded();
  const pack = await loadClausePackBySlug(packSlug);

  if (!pack) {
    throw new TrustLayerValidationError(
      `Clause pack not found: ${packSlug}`,
      "CLAUSE_PACK_NOT_FOUND"
    );
  }

  const context = buildProjectContext(
    contextFromProposalRecord(proposal, commercialMode),
    locale
  );

  const aiSelection = await requestClauseAiSelection({
    locale,
    projectContext: context,
    templates: pack.clauses,
  });

  return matchAndRenderClauses({
    pack,
    archetype,
    commercialMode,
    estimateVariancePercent: proposal.estimateVariancePercent,
    projectDurationDays,
    aiSelection,
    budget: proposal.budget,
    clientName: proposal.clientName,
    projectName: proposal.projectName,
  });
}

/** Persist selections — replaces existing clause rows for proposal */
export async function persistClauseSelections(
  proposalId: string,
  result: ClauseMatchResult
): Promise<void> {
  await db.$transaction(async (tx) => {
    await tx.proposalClauseSelection.deleteMany({ where: { proposalId } });

    for (const sel of result.selections) {
      await tx.proposalClauseSelection.create({
        data: {
          proposalId,
          clauseTemplateId: sel.clauseTemplateId,
          enabled: true,
          sortOrder: sel.sortOrder,
          filledPlaceholders: sel.filledPlaceholders,
          source: mapSelectionSourceToDb(sel.source),
          renderedTextAr: sel.renderedTextAr,
          renderedTextEn: sel.renderedTextEn,
        },
      });
    }

    await tx.proposal.update({
      where: { id: proposalId },
      data: {
        projectArchetype: result.archetype,
        clausePackId: result.packId,
        clausePackVersion: result.packVersion,
      },
    });
  });
}

function mapSelectionSourceToDb(
  source: RenderedClause["source"]
): "ai_suggested" | "user_toggled" | "user_alternative" {
  if (source === "user_toggled" || source === "user_alternative") {
    return source;
  }
  return "ai_suggested";
}

export async function matchAndPersistClausesForProposal(
  proposalId: string
): Promise<ClauseMatchResult> {
  const result = await matchClausesForProposal(proposalId);
  await persistClauseSelections(proposalId, result);
  return result;
}

export {
  inferProjectArchetype,
  packSlugForArchetype,
} from "./clause-archetype";

export {
  renderClauseTemplate,
  mergePlaceholderValues,
} from "./clause-renderer.service";

export type { ClauseAiSelection, ClauseMatchResult, RenderedClause };
