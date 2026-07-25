import { randomUUID } from "crypto";
import {
  BOQ_WEIGHT_TEMPLATES,
  type BoqTemplateLine,
} from "@/shared/constants/boq.constants";
import type {
  BoqAllocateInput,
  BoqAllocateResult,
  BoqLineDraft,
  ProjectArchetype,
} from "@/shared/types/trust-layer.types";
import { TrustLayerValidationError } from "@/shared/types/trust-layer.types";
import {
  allocateByWeights,
  assertLineCount,
  attachPercents,
  verifySumEqualsBudget,
} from "./boq-redistribute";

function resolveTemplate(archetype: ProjectArchetype): readonly BoqTemplateLine[] {
  return BOQ_WEIGHT_TEMPLATES[archetype] ?? BOQ_WEIGHT_TEMPLATES.other;
}

function applyLabelOverrides(
  template: readonly BoqTemplateLine[],
  overrides?: BoqAllocateInput["labelOverrides"]
): BoqTemplateLine[] {
  if (!overrides?.length) return [...template];

  return template.map((line, index) => {
    const override = overrides.find((o) => o.sortOrder === index);
    if (!override) return line;
    return {
      ...line,
      labelAr: override.labelAr ?? line.labelAr,
      labelEn: override.labelEn ?? line.labelEn,
    };
  });
}

/**
 * Generate initial Smart BOQ lines from archetype weights.
 * AI may override labels/notes only — amounts are always system-allocated.
 */
export function allocateBoqLines(input: BoqAllocateInput): BoqAllocateResult {
  const budget = input.budget;

  if (!Number.isFinite(budget) || budget < 0) {
    throw new TrustLayerValidationError(
      "Budget must be a non-negative number",
      "BOQ_BUDGET"
    );
  }

  const template = applyLabelOverrides(
    resolveTemplate(input.archetype),
    input.labelOverrides
  );

  assertLineCount(template.length);

  const draftIds = template.map(() => randomUUID());
  const weightRows = template.map((line, i) => ({
    id: draftIds[i]!,
    weight: line.weight,
  }));

  const amountMap = allocateByWeights(weightRows, budget);
  const isEstimated = input.commercialMode === "estimate_only";

  const lines: BoqLineDraft[] = template.map((line, index) => {
    const override = input.labelOverrides?.find((o) => o.sortOrder === index);
    const id = draftIds[index]!;
    const amount = amountMap.get(id) ?? 0;

    return {
      id,
      sortOrder: index,
      labelAr: line.labelAr,
      labelEn: line.labelEn,
      amount,
      percent: 0,
      category: line.category,
      note: override?.note ?? null,
      source: "ai_suggested",
      isEstimated,
      aiReason: override?.aiReason ?? null,
      locked: false,
    };
  });

  const withPercents = attachPercents(lines, budget);

  if (!verifySumEqualsBudget(withPercents, budget)) {
    throw new TrustLayerValidationError(
      "Initial BOQ allocation failed sum invariant",
      "BOQ_SUM_INVARIANT"
    );
  }

  return {
    lines: withPercents,
    lineCount: withPercents.length,
    budget,
    sumVerified: true,
  };
}

export {
  redistributeAfterLineAdd,
  redistributeAfterLineDelete,
  redistributeAfterLineEdit,
  rebalanceToBudget,
  sumAmounts,
  verifySumEqualsBudget,
} from "./boq-redistribute";

export {
  exceedsDurationThreshold,
  parseDurationToDays,
  resolveProjectDurationDays,
} from "./duration-parser";
