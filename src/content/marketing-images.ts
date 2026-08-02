/**
 * Central marketing image registry — no duplicate URLs across homepage sections.
 * Dot For Life assets live in /public/images/marketing (optimized JPEG).
 * Sector hero photos live in /public/images/marketing/categories (Pexels/Unsplash, local).
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
  graphicsHouseAd: "/images/marketing/ad2En2.png",
  proposalsAdAr: "/images/marketing/ad3Ar.png",
  proposalsAdEn: "/images/marketing/ad3En.png",
  beesmotionAd: "/images/marketing/ad4.png",
} as const;

/** Default social / listing fallback when no upload exists. */
export const DEFAULT_MARKETING_HERO = MARKETING_IMAGES.hero;

const CATEGORY_PHOTO = (slug: string) =>
  `/images/marketing/categories/${slug}.jpg` as const;

/** One unique, topic-relevant stock photo per directory sector (local assets). */
export const CATEGORY_IMAGES: Record<string, string> = {
  "fit-out": CATEGORY_PHOTO("fit-out"),
  contracting: CATEGORY_PHOTO("contracting"),
  supervision: CATEGORY_PHOTO("supervision"),
  hvac: CATEGORY_PHOTO("hvac"),
  kitchens: CATEGORY_PHOTO("kitchens"),
  "luxury-materials": CATEGORY_PHOTO("luxury-materials"),
  outdoor: CATEGORY_PHOTO("outdoor"),
  maintenance: CATEGORY_PHOTO("maintenance"),
};

/** Six unique local images per directory sector for seed listings (no Unsplash). */
export const LISTING_SEED_IMAGE_POOLS: Record<string, readonly string[]> = {
  "fit-out": [
    MARKETING_IMAGES.interiorLounge,
    MARKETING_IMAGES.familyLiving,
    MARKETING_IMAGES.kitchenFamily,
    MARKETING_IMAGES.familyDining,
    MARKETING_IMAGES.proposalDesk,
    MARKETING_IMAGES.ghStudio,
  ],
  contracting: [
    MARKETING_IMAGES.modelHousePlanning,
    MARKETING_IMAGES.architecturalModel,
    MARKETING_IMAGES.keysNewHome,
    MARKETING_IMAGES.hero,
    MARKETING_IMAGES.familySavings,
    MARKETING_IMAGES.ghStudio,
  ],
  supervision: [
    MARKETING_IMAGES.familyDining,
    MARKETING_IMAGES.keysNewHome,
    MARKETING_IMAGES.proposalDesk,
    MARKETING_IMAGES.modelHousePlanning,
    MARKETING_IMAGES.familySavings,
    MARKETING_IMAGES.familyLiving,
  ],
  hvac: [
    MARKETING_IMAGES.keysNewHome,
    MARKETING_IMAGES.modelHousePlanning,
    MARKETING_IMAGES.familySavings,
    MARKETING_IMAGES.ghStudio,
    MARKETING_IMAGES.hero,
    MARKETING_IMAGES.architecturalModel,
  ],
  kitchens: [
    MARKETING_IMAGES.kitchenFamily,
    MARKETING_IMAGES.familyDining,
    MARKETING_IMAGES.interiorLounge,
    MARKETING_IMAGES.familyLiving,
    MARKETING_IMAGES.proposalDesk,
    MARKETING_IMAGES.hero,
  ],
  "luxury-materials": [
    MARKETING_IMAGES.architecturalModel,
    MARKETING_IMAGES.ghStudio,
    MARKETING_IMAGES.interiorLounge,
    MARKETING_IMAGES.hero,
    MARKETING_IMAGES.familyLiving,
    MARKETING_IMAGES.kitchenFamily,
  ],
  outdoor: [
    MARKETING_IMAGES.hero,
    MARKETING_IMAGES.familyLiving,
    MARKETING_IMAGES.architecturalModel,
    MARKETING_IMAGES.keysNewHome,
    MARKETING_IMAGES.familySavings,
    MARKETING_IMAGES.ghStudio,
  ],
  maintenance: [
    MARKETING_IMAGES.keysNewHome,
    MARKETING_IMAGES.familySavings,
    MARKETING_IMAGES.modelHousePlanning,
    MARKETING_IMAGES.proposalDesk,
    MARKETING_IMAGES.familyDining,
    MARKETING_IMAGES.interiorLounge,
  ],
};

export const FEATURED_AD_IMAGES = {
  visualization: MARKETING_IMAGES.ghStudio,
  proposals: MARKETING_IMAGES.proposalDesk,
} as const;

/** Guide heroes & inline illustrations — topic-aligned. */
export const GUIDE_IMAGES = {
  marble: MARKETING_IMAGES.architecturalModel,
  marbleInterior: MARKETING_IMAGES.interiorLounge,
  marbleFacade: MARKETING_IMAGES.ghStudio,
  hvac: U("photo-1621905251189-08b45d6a269e"),
  hvacDuct: CATEGORY_PHOTO("hvac"),
  kitchen: MARKETING_IMAGES.kitchenFamily,
  kitchenPlan: MARKETING_IMAGES.familyDining,
  supervision: MARKETING_IMAGES.keysNewHome,
  supervisionSite: MARKETING_IMAGES.modelHousePlanning,
  maintenance: MARKETING_IMAGES.familySavings,
  maintenanceRoof: MARKETING_IMAGES.proposalDesk,
  landscape: MARKETING_IMAGES.hero,
  landscapeGarden: U("photo-1585320806290-979417b93370"),
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
