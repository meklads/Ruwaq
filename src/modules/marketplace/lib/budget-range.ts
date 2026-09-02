/**
 * Parse free-text budget ranges from marketplace leads into SAR amounts.
 * Reuses the same heuristics as lead-match scoring.
 */
export function parseBudgetRangeToAmount(
  budgetRange: string | null | undefined
): { amount: number; isEstimate: boolean } {
  if (!budgetRange?.trim()) {
    return { amount: 0, isEstimate: true };
  }

  const text = budgetRange.toLowerCase();
  const numbers = [...budgetRange.matchAll(/(\d[\d,.]*)/g)].map((match) =>
    Number.parseFloat(match[1]?.replace(/,/g, "") ?? "0")
  );
  const hasMillion = /مليون|million|\bm\b/i.test(text);
  const hasRange = /[-–—]|إلى|to|between/i.test(text);

  if (numbers.length === 0) {
    return { amount: 0, isEstimate: true };
  }

  const normalized = numbers.map((n) => {
    if (hasMillion && n > 0 && n < 100) return n * 1_000_000;
    if (n >= 1000) return n;
    return n * 1000;
  });

  const amount =
    hasRange && normalized.length >= 2
      ? Math.round((normalized[0]! + normalized[normalized.length - 1]!) / 2)
      : Math.round(Math.max(...normalized));

  return {
    amount: Number.isFinite(amount) && amount > 0 ? amount : 0,
    isEstimate: hasRange || !Number.isFinite(amount) || amount <= 0,
  };
}
