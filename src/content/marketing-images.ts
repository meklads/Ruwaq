/**
 * Central marketing image registry — no duplicate URLs across homepage sections.
 * Dot For Life assets live in /public/images/marketing (optimized JPEG).
 * HVAC uses one topic-specific Unsplash; everything else is local.
 */

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const MARKETING_IMAGES = {
  hero: "/images/marketing/hero-villa-family.jpg",
  ghStudio: "/images/marketing/gh-studio-visualization.jpg",
  architecturalModel: "/images/marketing/architectural-model-3d.jpg",
  interiorLounge: "/images/marketing/interior-lounge.jpg",
  familyLiving: "/images/marketing/family-living-room.jpg",
  familyDining: "/images/marketing/family-dining-planning.jpg",
  keysNewHome: "/images/marketing/keys-new-home.jpg",
  modelHousePlanning: "/images/marketing/model-house-planning.jpg",
  kitchenFamily: "/images/marketing/kitchen-family.jpg",
  proposalDesk: "/images/marketing/proposal-desk.jpg",
  familySavings: "/images/marketing/family-savings-home.jpg",
  turrivaAd: "/images/marketing/ad1.png",
  graphicsHouseAdAr: "/images/marketing/ad2Ar.png",
  graphicsHouseAdEn: "/images/marketing/ad2En.png",
  proposalsAdAr: "/images/marketing/ad3Ar.png",
  proposalsAdEn: "/images/marketing/ad3En.png",
} as const;

/** Default social / listing fallback when no upload exists. */
export const DEFAULT_MARKETING_HERO = MARKETING_IMAGES.hero;

/** One unique, topic-relevant image per directory sector. */
export const CATEGORY_IMAGES: Record<string, string> = {
  "fit-out": MARKETING_IMAGES.interiorLounge,
  contracting: MARKETING_IMAGES.modelHousePlanning,
  supervision: MARKETING_IMAGES.familyDining,
  hvac: U("photo-1631679706909-d082507cbce0"),
  kitchens: MARKETING_IMAGES.kitchenFamily,
  "luxury-materials": MARKETING_IMAGES.architecturalModel,
  outdoor: MARKETING_IMAGES.hero,
  maintenance: MARKETING_IMAGES.keysNewHome,
};

export const FEATURED_AD_IMAGES = {
  visualization: MARKETING_IMAGES.ghStudio,
  proposals: MARKETING_IMAGES.proposalDesk,
} as const;

/** Guide heroes — aligned with each article topic. */
export const GUIDE_IMAGES = {
  marble: MARKETING_IMAGES.architecturalModel,
  hvac: U("photo-1621905251189-08b45d6a269e"),
  kitchen: MARKETING_IMAGES.kitchenFamily,
  supervision: MARKETING_IMAGES.keysNewHome,
  maintenance: MARKETING_IMAGES.familySavings,
  landscape: MARKETING_IMAGES.hero,
} as const;

/** Project tour heroes & galleries (local assets). */
export const TOUR_IMAGES = {
  jeddahHero: MARKETING_IMAGES.familyLiving,
  jeddahGallery: [
    MARKETING_IMAGES.interiorLounge,
    MARKETING_IMAGES.kitchenFamily,
    MARKETING_IMAGES.familyDining,
    MARKETING_IMAGES.proposalDesk,
  ],
  makkahHero: MARKETING_IMAGES.architecturalModel,
  makkahGallery: [
    MARKETING_IMAGES.ghStudio,
    MARKETING_IMAGES.modelHousePlanning,
    MARKETING_IMAGES.familyLiving,
    MARKETING_IMAGES.interiorLounge,
  ],
  madinahHero: MARKETING_IMAGES.familySavings,
  madinahGallery: [
    MARKETING_IMAGES.hero,
    MARKETING_IMAGES.keysNewHome,
    MARKETING_IMAGES.familySavings,
    MARKETING_IMAGES.kitchenFamily,
  ],
} as const;

export const VISUALIZATION_HERO = MARKETING_IMAGES.ghStudio;

export function categoryImageForSlug(slug: string | undefined): string {
  if (slug && CATEGORY_IMAGES[slug]) return CATEGORY_IMAGES[slug]!;
  return DEFAULT_MARKETING_HERO;
}

export function absoluteMarketingImage(path: string, siteOrigin: string): string {
  const base = siteOrigin.replace(/\/$/, "");
  return path.startsWith("http") ? path : `${base}${path}`;
}
