/**
 * The 10 Ruwaq PRO showcase partners — single source of truth for homepage,
 * /pro, and seed overrides. Order is editorial (benchmark first).
 */
export const CURATED_PRO_SLUGS = [
  "turriva-fitout-jeddah",
  "turriva-contracting-jeddah",
  "graphics-house-visualization-jeddah",
  "arkan-kitchens-jeddah",
  "sorouh-gharbiya-hvac-jeddah",
  "marble-crown-jeddah",
  "namat-mimar-makkah",
  "haram-breeze-hvac-makkah",
  "vision-makan-madinah",
  "green-oasis-madinah",
] as const;

export type CuratedProSlug = (typeof CURATED_PRO_SLUGS)[number];

const SLUG_ORDER = new Map<string, number>(
  CURATED_PRO_SLUGS.map((slug, index) => [slug, index])
);

export function isCuratedProListing(slug: string): slug is CuratedProSlug {
  return SLUG_ORDER.has(slug);
}

export function curatedProSortRank(slug: string): number {
  return SLUG_ORDER.get(slug) ?? 999;
}

export function sortByCuratedProOrder<T extends { slug: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => curatedProSortRank(a.slug) - curatedProSortRank(b.slug)
  );
}
