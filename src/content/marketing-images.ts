/**
 * Central marketing image registry — no duplicate URLs across homepage sections.
 * Dot For Life assets live in /public/images/marketing (optimized JPEG).
 * Remaining slots use distinct Unsplash IDs not reused in listings seed pools.
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
  graphicsHouseAd: "/images/marketing/ad2.png",
  proposalsAdAr: "/images/marketing/ad3Ar.png",
  proposalsAdEn: "/images/marketing/ad3En.png",
} as const;

/** One unique image per directory sector (homepage category grid). */
export const CATEGORY_IMAGES: Record<string, string> = {
  "fit-out": MARKETING_IMAGES.interiorLounge,
  contracting: MARKETING_IMAGES.modelHousePlanning,
  supervision: MARKETING_IMAGES.familyDining,
  hvac: U("photo-1631679706909-d082507cbce0"),
  kitchens: MARKETING_IMAGES.kitchenFamily,
  "luxury-materials": U("photo-1615529328331-f8917597711f"),
  outdoor: U("photo-1600566753086-00f18fb576b9"),
  maintenance: U("photo-1581094794329-c8112a89af12"),
};

/** Featured ad device previews */
export const FEATURED_AD_IMAGES = {
  visualization: MARKETING_IMAGES.ghStudio,
  proposals: MARKETING_IMAGES.proposalDesk,
} as const;

/** Guides — each image unique vs category grid and hero. */
export const GUIDE_IMAGES = {
  marble: U("photo-1615874959477-df969457a1eb"),
  hvac: U("photo-1621905251189-08b45d6a269e"),
  kitchen: U("photo-1600585154526-990dced4db0d"),
  supervision: MARKETING_IMAGES.keysNewHome,
  maintenance: U("photo-1581578731548-c64695cc6952"),
  landscape: U("photo-1416879595882-3373a0480b0b"),
} as const;

/** Project tour heroes & galleries (detail pages — may reuse Unsplash not shown on homepage). */
export const TOUR_IMAGES = {
  jeddahHero: MARKETING_IMAGES.familyLiving,
  jeddahGallery: [
    U("photo-1618221195710-dd6b41faaea6"),
    U("photo-1600585154340-be6161a56a0c"),
    U("photo-1556911220-bff31c812dba"),
    U("photo-1600607687920-4e2a09cf159d"),
  ],
  makkahHero: MARKETING_IMAGES.architecturalModel,
  makkahGallery: [
    U("photo-1595526114035-0d45ed16cfbf"),
    U("photo-1566665797739-1674de7a421a"),
    U("photo-1631545806606-4119a794c1a1"),
    U("photo-1616486338812-3dadae4b4ace"),
  ],
  madinahHero: MARKETING_IMAGES.familySavings,
  madinahGallery: [
    U("photo-1600047509807-ba8f99d2cd09"),
    U("photo-1600566753376-12c8ab7fb165"),
    U("photo-1558904541-efa843a96f01"),
    U("photo-1600607687939-ce8a6c25118c"),
  ],
} as const;

/** Visualization landing aside */
export const VISUALIZATION_HERO = MARKETING_IMAGES.ghStudio;
