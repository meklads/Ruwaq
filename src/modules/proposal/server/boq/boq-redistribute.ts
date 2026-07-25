/**
 * Pure math — Smart BOQ redistribution.
 * Invariant: SUM(line.amount) === budget (within BOQ_SUM_TOLERANCE).
 */

import {
  BOQ_MAX_LINES,
  BOQ_MIN_LINES,
  BOQ_SUM_TOLERANCE,
} from "@/shared/constants/boq.constants";
import type { BoqLineDraft } from "@/shared/types/trust-layer.types";
import { TrustLayerValidationError } from "@/shared/types/trust-layer.types";

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function assertLineCount(count: number): void {
  if (count < BOQ_MIN_LINES || count > BOQ_MAX_LINES) {
    throw new TrustLayerValidationError(
      `BOQ must have ${BOQ_MIN_LINES}–${BOQ_MAX_LINES} lines (got ${count})`,
      "BOQ_LINE_COUNT"
    );
  }
}

export function sumAmounts(lines: ReadonlyArray<{ amount: number }>): number {
  return roundMoney(lines.reduce((acc, line) => acc + line.amount, 0));
}

export function verifySumEqualsBudget(
  lines: ReadonlyArray<{ amount: number }>,
  budget: number
): boolean {
  return Math.abs(sumAmounts(lines) - roundMoney(budget)) <= BOQ_SUM_TOLERANCE;
}

export function computePercent(amount: number, budget: number): number {
  if (budget <= 0) return 0;
  return roundMoney((amount / budget) * 100);
}

export function attachPercents(
  lines: BoqLineDraft[],
  budget: number
): BoqLineDraft[] {
  return lines.map((line) => ({
    ...line,
    percent: computePercent(line.amount, budget),
  }));
}

/**
 * Allocate amounts from weights; last line absorbs rounding remainder.
 */
export function allocateByWeights(
  lines: ReadonlyArray<{ id: string; weight: number }>,
  budget: number
): Map<string, number> {
  if (lines.length === 0) {
    throw new TrustLayerValidationError("Cannot allocate empty BOQ", "BOQ_EMPTY");
  }

  const totalWeight = lines.reduce((acc, line) => acc + line.weight, 0);
  if (totalWeight <= 0) {
    throw new TrustLayerValidationError(
      "BOQ weights must sum to a positive value",
      "BOQ_WEIGHTS"
    );
  }

  const roundedBudget = roundMoney(budget);
  const amounts = new Map<string, number>();
  let allocated = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (i === lines.length - 1) {
      amounts.set(line.id, roundMoney(roundedBudget - allocated));
    } else {
      const share = roundMoney((roundedBudget * line.weight) / totalWeight);
      amounts.set(line.id, share);
      allocated = roundMoney(allocated + share);
    }
  }

  return amounts;
}

function redistributeDeltaProportionally(
  lines: BoqLineDraft[],
  budget: number,
  recipientIds: string[],
  delta: number
): BoqLineDraft[] {
  if (recipientIds.length === 0) {
    throw new TrustLayerValidationError(
      "No unlocked lines available for redistribution",
      "BOQ_NO_UNLOCKED"
    );
  }

  const recipients = lines.filter((l) => recipientIds.includes(l.id));
  const recipientTotal = recipients.reduce((acc, l) => acc + l.amount, 0);

  if (recipientTotal <= 0) {
    const share = roundMoney(-delta / recipientIds.length);
    return lines.map((line) =>
      recipientIds.includes(line.id)
        ? { ...line, amount: roundMoney(Math.max(0, line.amount + share)) }
        : line
    );
  }

  let distributed = 0;
  const updates = new Map<string, number>();

  recipientIds.forEach((id, index) => {
    const line = lines.find((l) => l.id === id)!;
    if (index === recipientIds.length - 1) {
      updates.set(id, roundMoney(line.amount - (delta + distributed)));
    } else {
      const share = roundMoney((delta * line.amount) / recipientTotal);
      updates.set(id, roundMoney(line.amount - share));
      distributed = roundMoney(distributed + share);
    }
  });

  const adjusted = lines.map((line) =>
    updates.has(line.id)
      ? { ...line, amount: Math.max(0, updates.get(line.id)!) }
      : line
  );

  return fixSumDrift(adjusted, budget, recipientIds[recipientIds.length - 1]!);
}

/** Nudge last unlocked line so SUM === budget exactly */
function fixSumDrift(
  lines: BoqLineDraft[],
  budget: number,
  fallbackLineId: string
): BoqLineDraft[] {
  const drift = roundMoney(budget - sumAmounts(lines));
  if (Math.abs(drift) <= BOQ_SUM_TOLERANCE) {
    return attachPercents(lines, budget);
  }

  const targetId =
    lines.find((l) => l.id === fallbackLineId && !l.locked)?.id ??
    lines.find((l) => !l.locked)?.id;

  if (!targetId) {
    throw new TrustLayerValidationError(
      "Cannot fix BOQ sum drift — all lines locked",
      "BOQ_ALL_LOCKED"
    );
  }

  return attachPercents(
    lines.map((line) =>
      line.id === targetId
        ? { ...line, amount: roundMoney(Math.max(0, line.amount + drift)) }
        : line
    ),
    budget
  );
}

/**
 * User edits one line amount — redistribute delta across unlocked peers.
 */
export function redistributeAfterLineEdit(
  lines: BoqLineDraft[],
  budget: number,
  editedLineId: string,
  newAmount: number
): BoqLineDraft[] {
  assertLineCount(lines.length);

  const edited = lines.find((l) => l.id === editedLineId);
  if (!edited) {
    throw new TrustLayerValidationError(
      `Line ${editedLineId} not found`,
      "BOQ_LINE_NOT_FOUND"
    );
  }

  const clamped = roundMoney(Math.min(Math.max(0, newAmount), budget));
  const delta = roundMoney(clamped - edited.amount);

  const withEdit = lines.map((line) =>
    line.id === editedLineId
      ? {
          ...line,
          amount: clamped,
          source: "user_edited" as const,
        }
      : line
  );

  if (Math.abs(delta) <= BOQ_SUM_TOLERANCE) {
    return attachPercents(withEdit, budget);
  }

  const recipientIds = withEdit
    .filter((l) => l.id !== editedLineId && !l.locked)
    .map((l) => l.id);

  const redistributed = redistributeDeltaProportionally(
    withEdit,
    budget,
    recipientIds,
    delta
  );

  if (!verifySumEqualsBudget(redistributed, budget)) {
    throw new TrustLayerValidationError(
      "BOQ sum invariant violated after edit",
      "BOQ_SUM_INVARIANT"
    );
  }

  return redistributed;
}

/**
 * Remove a line — merge its amount into the largest unlocked peer.
 */
export function redistributeAfterLineDelete(
  lines: BoqLineDraft[],
  budget: number,
  deletedLineId: string
): BoqLineDraft[] {
  const deleted = lines.find((l) => l.id === deletedLineId);
  if (!deleted) {
    throw new TrustLayerValidationError(
      `Line ${deletedLineId} not found`,
      "BOQ_LINE_NOT_FOUND"
    );
  }

  const remaining = lines
    .filter((l) => l.id !== deletedLineId)
    .map((l, i) => ({ ...l, sortOrder: i }));

  assertLineCount(remaining.length);

  const mergeTarget =
    remaining
      .filter((l) => !l.locked)
      .sort((a, b) => b.amount - a.amount)[0] ?? remaining[0]!;

  const merged = remaining.map((line) =>
    line.id === mergeTarget.id
      ? { ...line, amount: roundMoney(line.amount + deleted.amount) }
      : line
  );

  return fixSumDrift(merged, budget, mergeTarget.id);
}

/**
 * Add a line — take share proportionally from unlocked lines.
 */
export function redistributeAfterLineAdd(
  lines: BoqLineDraft[],
  budget: number,
  newLine: Omit<BoqLineDraft, "amount" | "percent">
): BoqLineDraft[] {
  if (lines.length >= BOQ_MAX_LINES) {
    throw new TrustLayerValidationError(
      `Cannot exceed ${BOQ_MAX_LINES} BOQ lines`,
      "BOQ_MAX_LINES"
    );
  }

  const initialShare = roundMoney(budget / (lines.length + 1));
  const donorIds = lines.filter((l) => !l.locked).map((l) => l.id);

  const reduced =
    donorIds.length > 0
      ? redistributeDeltaProportionally(
          lines,
          budget,
          donorIds,
          -initialShare
        )
      : lines;

  const inserted: BoqLineDraft = {
    ...newLine,
    amount: initialShare,
    percent: computePercent(initialShare, budget),
    sortOrder: lines.length,
    source: "user_added",
  };

  const combined = [...reduced, inserted].map((l, i) => ({
    ...l,
    sortOrder: i,
  }));

  assertLineCount(combined.length);
  return fixSumDrift(combined, budget, inserted.id);
}

export function rebalanceToBudget(
  lines: BoqLineDraft[],
  budget: number
): BoqLineDraft[] {
  assertLineCount(lines.length);
  const currentSum = sumAmounts(lines);
  const delta = roundMoney(currentSum - budget);

  if (Math.abs(delta) <= BOQ_SUM_TOLERANCE) {
    return attachPercents(lines, budget);
  }

  const donorIds = lines.filter((l) => !l.locked).map((l) => l.id);
  return redistributeDeltaProportionally(lines, budget, donorIds, delta);
}
