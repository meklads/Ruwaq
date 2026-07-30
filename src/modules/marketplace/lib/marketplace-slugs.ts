import {
  getCityBySlug,
  LEGACY_CATEGORY_REDIRECTS,
  resolveCategorySlug,
  type MarketplaceCategorySlug,
  type MarketplaceCitySlug,
} from "@/shared/constants/marketplace-taxonomy";

export function parseCitySlug(
  value: string | undefined,
  fallback: MarketplaceCitySlug = "jeddah"
): MarketplaceCitySlug {
  const found = getCityBySlug(value ?? "");
  return found?.slug ?? fallback;
}

export function parseCategorySlug(
  value: string | undefined,
  fallback: MarketplaceCategorySlug = "fit-out"
): MarketplaceCategorySlug {
  const resolved = resolveCategorySlug(value ?? "");
  return resolved ?? fallback;
}

export function isLegacyCategorySlug(slug: string): boolean {
  return slug in LEGACY_CATEGORY_REDIRECTS;
}

export function legacyCategoryRedirectTarget(
  slug: string
): MarketplaceCategorySlug | null {
  return LEGACY_CATEGORY_REDIRECTS[slug] ?? null;
}

/** Special `/request-quote?category=visualization` — routes to Graphics House, not marketplace. */
export const VISUALIZATION_QUOTE_SLUG = "visualization";

export function parseQuoteIntent(
  categoryParam: string | undefined
): "marketplace" | "visualization" {
  if (categoryParam?.trim() === VISUALIZATION_QUOTE_SLUG) {
    return "visualization";
  }
  return "marketplace";
}
