import type { MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";
import { JEDDAH_INTENT_LANDINGS, JEDDAH_SECTOR_LANDINGS } from "./data";
import type { JeddahIntentLanding, JeddahSectorLanding } from "./types";

export type { JeddahIntentLanding, JeddahSectorLanding } from "./types";

export function getJeddahSectorLanding(
  categorySlug: MarketplaceCategorySlug
): JeddahSectorLanding | undefined {
  return JEDDAH_SECTOR_LANDINGS.find((l) => l.categorySlug === categorySlug);
}

export function getJeddahIntentLanding(intentSlug: string): JeddahIntentLanding | undefined {
  return JEDDAH_INTENT_LANDINGS.find((l) => l.intentSlug === intentSlug);
}

export function getAllJeddahIntentSlugs(): string[] {
  return JEDDAH_INTENT_LANDINGS.map((l) => l.intentSlug);
}

export function landingContentForCategory(
  categorySlug: MarketplaceCategorySlug
): JeddahSectorLanding | undefined {
  return getJeddahSectorLanding(categorySlug);
}
