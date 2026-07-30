import {
  getCategoryBySlug,
  getCityBySlug,
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
  const found = getCategoryBySlug(value ?? "");
  return found?.slug ?? fallback;
}
