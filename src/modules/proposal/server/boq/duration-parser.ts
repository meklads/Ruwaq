/**
 * Parse duration strings (Arabic/English) into calendar days.
 * Used for 90-day price-escalation auto-trigger.
 */

const WEEK_ALIASES = /أسبوع|اسبوع|week/i;
const MONTH_ALIASES = /شهر|month/i;
const DAY_ALIASES = /يوم|day/i;

/** "6–8 weeks", "14 أسبوعاً", "3 months", "90 days" */
export function parseDurationToDays(input: string | null | undefined): number | null {
  if (!input?.trim()) return null;

  const normalized = input
    .trim()
    .replace(/[–—−]/g, "-")
    .replace(/,/g, ".");

  const rangeMatch = normalized.match(
    /(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(أسبوع|اسبوع|week|شهر|month|يوم|day)/i
  );
  if (rangeMatch) {
    const low = parseFloat(rangeMatch[1]!);
    const high = parseFloat(rangeMatch[2]!);
    const unit = rangeMatch[3]!;
    const avg = (low + high) / 2;
    return unitToDays(avg, unit);
  }

  const singleMatch = normalized.match(
    /(\d+(?:\.\d+)?)\s*(أسبوع|اسبوع|week|شهر|month|يوم|day)/i
  );
  if (singleMatch) {
    return unitToDays(parseFloat(singleMatch[1]!), singleMatch[2]!);
  }

  const bareNumber = normalized.match(/^(\d+(?:\.\d+)?)$/);
  if (bareNumber) {
    return Math.round(parseFloat(bareNumber[1]!));
  }

  return null;
}

function unitToDays(value: number, unit: string): number {
  if (WEEK_ALIASES.test(unit)) return Math.round(value * 7);
  if (MONTH_ALIASES.test(unit)) return Math.round(value * 30);
  if (DAY_ALIASES.test(unit)) return Math.round(value);
  return Math.round(value);
}

export function resolveProjectDurationDays(input: {
  durationHint?: string | null;
  timelineDuration?: string | null;
}): number | null {
  return (
    parseDurationToDays(input.timelineDuration) ??
    parseDurationToDays(input.durationHint)
  );
}

export function exceedsDurationThreshold(
  days: number | null,
  thresholdDays: number
): boolean {
  return days !== null && days >= thresholdDays;
}
