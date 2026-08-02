import type { MarketplaceCitySlug, MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";

export type ProjectTourCredit = {
  roleAr: string;
  roleEn: string;
  listingSlug: string;
};

export type ProjectTour = {
  slug: string;
  citySlug: MarketplaceCitySlug;
  categorySlug: MarketplaceCategorySlug;
  heroImage: string;
  gallery: string[];
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  storyAr: string[];
  storyEn: string[];
  credits: ProjectTourCredit[];
  publishedAt: string;
};

/** Editorial completed tours — replaced by flagship developer launch pages on /tours. */
export const PROJECT_TOURS: ProjectTour[] = [];

export function getProjectTour(slug: string): ProjectTour | undefined {
  return PROJECT_TOURS.find((t) => t.slug === slug);
}
