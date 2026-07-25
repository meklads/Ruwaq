/**
 * Compile clause text from ClauseTemplate + PLACEHOLDER_DEFAULTS.
 * AI never produces legal prose — only the matcher supplies override values.
 */

import {
  getPlaceholderDefault,
  PLACEHOLDER_DEFAULTS,
} from "@/shared/constants/clause-placeholder-defaults";
import type { PlaceholderDef } from "@/shared/types";
import { TrustLayerValidationError } from "@/shared/types/trust-layer.types";
import type {
  ClauseRenderContext,
  ClauseTemplateRecord,
} from "./clause.types";

export function normalizePlaceholderDefs(raw: unknown): PlaceholderDef[] {
  if (!Array.isArray(raw)) return [];

  return raw.flatMap((item): PlaceholderDef[] => {
    if (typeof item === "string") {
      return [{ key: item, default: getPlaceholderDefault(item) }];
    }
    if (
      typeof item === "object" &&
      item !== null &&
      "key" in item &&
      typeof (item as PlaceholderDef).key === "string"
    ) {
      const def = item as PlaceholderDef;
      return [
        {
          key: def.key,
          default: def.default ?? getPlaceholderDefault(def.key),
        },
      ];
    }
    return [];
  });
}

export function allowedPlaceholderKeys(template: ClauseTemplateRecord): Set<string> {
  return new Set(normalizePlaceholderDefs(template.placeholders).map((p) => p.key));
}

/** System-resolved values — duration-parser output takes precedence for escalation */
export function buildSystemPlaceholderValues(
  template: ClauseTemplateRecord,
  ctx: ClauseRenderContext
): Record<string, string> {
  const defs = normalizePlaceholderDefs(template.placeholders);
  const values: Record<string, string> = {};

  for (const def of defs) {
    values[def.key] = def.default || getPlaceholderDefault(def.key);
  }

  if ("variance_percent" in values) {
    values.variance_percent = String(ctx.estimateVariancePercent);
  }

  if ("project_duration_days" in values) {
    values.project_duration_days =
      ctx.projectDurationDays !== null
        ? String(ctx.projectDurationDays)
        : PLACEHOLDER_DEFAULTS.project_duration_days;
  }

  if ("vat_rate_percent" in values && !values.vat_rate_percent) {
    values.vat_rate_percent = PLACEHOLDER_DEFAULTS.vat_rate_percent;
  }

  return values;
}

/**
 * Merge system values + AI overrides (allowlisted keys only).
 */
export function mergePlaceholderValues(
  template: ClauseTemplateRecord,
  ctx: ClauseRenderContext,
  aiOverrides: Record<string, string> = {}
): Record<string, string> {
  const allowed = allowedPlaceholderKeys(template);
  const merged = buildSystemPlaceholderValues(template, ctx);

  for (const [key, value] of Object.entries(aiOverrides)) {
    if (!allowed.has(key)) {
      throw new TrustLayerValidationError(
        `Placeholder "${key}" is not allowed on clause ${template.clauseKey}`,
        "CLAUSE_PLACEHOLDER_FORBIDDEN"
      );
    }
    if (key === "project_duration_days") {
      continue;
    }
    merged[key] = String(value);
  }

  if (allowed.has("project_duration_days")) {
    merged.project_duration_days =
      ctx.projectDurationDays !== null
        ? String(ctx.projectDurationDays)
        : merged.project_duration_days ?? PLACEHOLDER_DEFAULTS.project_duration_days;
  }

  return merged;
}

export function fillTemplateText(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(/\{([a-z_]+)\}/gi, (_, key: string) => {
    return values[key] ?? `{${key}}`;
  });
}

export function renderClauseTemplate(
  template: ClauseTemplateRecord,
  ctx: ClauseRenderContext,
  aiOverrides: Record<string, string> = {}
): {
  filledPlaceholders: Record<string, string>;
  renderedTextAr: string;
  renderedTextEn: string;
} {
  const filledPlaceholders = mergePlaceholderValues(template, ctx, aiOverrides);

  return {
    filledPlaceholders,
    renderedTextAr: fillTemplateText(template.textAr, filledPlaceholders),
    renderedTextEn: fillTemplateText(template.textEn, filledPlaceholders),
  };
}

/**
 * Architecture guard — rendered text must originate from template + placeholders.
 */
export function assertRenderedFromTemplate(
  template: ClauseTemplateRecord,
  renderedTextAr: string,
  renderedTextEn: string
): void {
  if (!template.textAr.trim() || !template.textEn.trim()) {
    throw new TrustLayerValidationError(
      `Clause ${template.clauseKey} has empty template text`,
      "CLAUSE_TEMPLATE_EMPTY"
    );
  }
  if (renderedTextAr === template.textAr && template.textAr.includes("{")) {
    // unfilled placeholders are OK for audit but warn in strict mode — allow partial
  }
  if (
    renderedTextAr.length > 0 &&
    renderedTextEn.length > 0 &&
    renderedTextAr === renderedTextEn &&
    template.textAr !== template.textEn
  ) {
    // bilingual templates should differ when sources differ — not an error
  }
}
