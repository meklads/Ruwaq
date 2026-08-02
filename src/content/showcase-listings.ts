import {
  graphicsHouseReferralUrl,
  turrivaReferralUrl,
} from "@/shared/constants/brand";
import {
  LISTING_SEED_IMAGE_POOLS,
  MARKETING_IMAGES,
  TOUR_IMAGES,
} from "@/content/marketing-images";
import { CURATED_PRO_SLUGS } from "@/content/curated-pro-listings";

export type ShowcaseStat = {
  labelAr: string;
  labelEn: string;
  valueAr: string;
  valueEn: string;
};

export type ShowcaseProject = {
  titleAr: string;
  titleEn: string;
  metaAr?: string;
  metaEn?: string;
  tourSlug?: string;
};

export type ShowcaseListingProfile = {
  slug: string;
  isBenchmark?: boolean;
  websiteUrl: string;
  websiteLabelAr: string;
  websiteLabelEn: string;
  crNumber?: string;
  portfolioImages: string[];
  stats: ShowcaseStat[];
  specialties: { ar: string; en: string }[];
  highlights: { ar: string; en: string }[];
  projects: ShowcaseProject[];
};

const POOL = LISTING_SEED_IMAGE_POOLS as Record<string, readonly string[]>;
const pool = (key: string) => [...(POOL[key] ?? [])];

const PROFILES: ShowcaseListingProfile[] = [
  {
    slug: "turriva-fitout-jeddah",
    isBenchmark: true,
    websiteUrl: turrivaReferralUrl("listing_benchmark"),
    websiteLabelAr: "turriva.com",
    websiteLabelEn: "turriva.com",
    crNumber: "4030123456",
    portfolioImages: [
      MARKETING_IMAGES.interiorLounge,
      MARKETING_IMAGES.familyLiving,
      MARKETING_IMAGES.kitchenFamily,
      TOUR_IMAGES.jeddahHero,
      ...TOUR_IMAGES.jeddahGallery.slice(0, 2),
    ],
    stats: [
      { labelAr: "خبرة", labelEn: "Experience", valueAr: "+12 سنة", valueEn: "12+ years" },
      { labelAr: "مشاريع", labelEn: "Projects", valueAr: "+180", valueEn: "180+" },
      { labelAr: "المدن", labelEn: "Cities", valueAr: "3", valueEn: "3" },
    ],
    specialties: [
      { ar: "تشطيب فلل فاخرة", en: "Luxury villa fit-out" },
      { ar: "تصميم داخلي", en: "Interior design" },
      { ar: "رخام وأرضيات", en: "Marble & flooring" },
      { ar: "ضيافة وفنادق", en: "Hospitality" },
    ],
    highlights: [
      {
        ar: "الملف المرجعي لـ Ruwaq PRO — معايير الاعتماد والشروط.",
        en: "Ruwaq PRO benchmark profile — verification and clause standards.",
      },
      {
        ar: "تكامل مع Graphics House للتصور وBeesMotion للتسويق.",
        en: "Integrated with Graphics House (CGI) and BeesMotion (marketing).",
      },
    ],
    projects: [
      {
        titleAr: "فيلا شمال جدة — تشطيب فاخر",
        titleEn: "North Jeddah villa — luxury fit-out",
        metaAr: "2025 · 420 م²",
        metaEn: "2025 · 420 m²",
        tourSlug: "north-jeddah-villa-fitout",
      },
    ],
  },
  {
    slug: "turriva-contracting-jeddah",
    websiteUrl: turrivaReferralUrl("listing_contracting"),
    websiteLabelAr: "turriva.com",
    websiteLabelEn: "turriva.com",
    portfolioImages: pool("contracting").slice(0, 5),
    stats: [
      { labelAr: "خبرة", labelEn: "Experience", valueAr: "+12 سنة", valueEn: "12+ years" },
      { labelAr: "ترميم", labelEn: "Renovation", valueAr: "فنادق وفلل", valueEn: "Hotels & villas" },
    ],
    specialties: [
      { ar: "مقاولات عامة", en: "General contracting" },
      { ar: "ترميم وتوسعات", en: "Renovation & extensions" },
      { ar: "بناء عظم", en: "Structural shell" },
    ],
    highlights: [
      {
        ar: "توجيه leads تشطيب/مقاولات عبر Ruwaq.",
        en: "Fit-out and contracting leads routed via Ruwaq.",
      },
    ],
    projects: [
      {
        titleAr: "ترميم فيلا — الشاطئ",
        titleEn: "Coastal villa renovation",
        metaAr: "2024 · 680 م²",
        metaEn: "2024 · 680 m²",
      },
    ],
  },
  {
    slug: "graphics-house-visualization-jeddah",
    websiteUrl: graphicsHouseReferralUrl("listing_showcase"),
    websiteLabelAr: "3dgraphicshouse.com",
    websiteLabelEn: "3dgraphicshouse.com",
    portfolioImages: [
      MARKETING_IMAGES.ghStudio,
      MARKETING_IMAGES.architecturalModel,
      ...pool("luxury-materials").slice(0, 3),
    ],
    stats: [
      {
        labelAr: "تصور 3D",
        labelEn: "3D visualization",
        valueAr: "مطورون ومكاتب",
        valueEn: "Developers & firms",
      },
      {
        labelAr: "ProjectLaunch™",
        labelEn: "ProjectLaunch™",
        valueAr: "إطلاق مشاريع",
        valueEn: "Project launches",
      },
    ],
    specialties: [
      { ar: "Renders معمارية", en: "Architectural renders" },
      { ar: "أفلام تسويقية", en: "Marketing films" },
      { ar: "Showrooms ذكية", en: "Smart showrooms" },
    ],
    highlights: [
      {
        ar: "شريك Ruwaq للتصور — مسار /visualization.",
        en: "Ruwaq visualization partner — /visualization intake.",
      },
    ],
    projects: [
      {
        titleAr: "أنارا — حي السحاب",
        titleEn: "Anara — Al Sahab",
        metaAr: "CGI + فيلم",
        metaEn: "CGI + film",
        tourSlug: "sumou-anara",
      },
    ],
  },
  {
    slug: "arkan-kitchens-jeddah",
    websiteUrl: "/listing/arkan-kitchens-jeddah",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    portfolioImages: pool("kitchens"),
    stats: [
      { labelAr: "تصنيع", labelEn: "Manufacturing", valueAr: "محلي", valueEn: "Local" },
      { labelAr: "تركيب", labelEn: "Install", valueAr: "6–8 أسابيع", valueEn: "6–8 weeks" },
    ],
    specialties: [
      { ar: "مطابخ فاخرة", en: "Luxury kitchens" },
      { ar: "خزائن walk-in", en: "Walk-in pantries" },
      { ar: "Quartz & خشب ألماني", en: "Quartz & German joinery" },
    ],
    highlights: [{ ar: "شريك جولة فيلا شمال جدة.", en: "North Jeddah villa tour partner." }],
    projects: [
      {
        titleAr: "مطبخ فيلا شمال جدة",
        titleEn: "North Jeddah villa kitchen",
        metaAr: "2025 · German joinery",
        metaEn: "2025 · German joinery",
        tourSlug: "north-jeddah-villa-fitout",
      },
    ],
  },
  {
    slug: "sorouh-gharbiya-hvac-jeddah",
    websiteUrl: "/listing/sorouh-gharbiya-hvac-jeddah",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    portfolioImages: pool("hvac"),
    stats: [{ labelAr: "أنظمة", labelEn: "Systems", valueAr: "VRF مخفي", valueEn: "Concealed VRF" }],
    specialties: [
      { ar: "VRF مخفي", en: "Concealed VRF" },
      { ar: "صيانة فنادق", en: "Hotel maintenance" },
    ],
    highlights: [{ ar: "شريك جولة فيلا شمال جدة.", en: "North Jeddah villa tour partner." }],
    projects: [
      {
        titleAr: "تكييف فيلا شمال جدة",
        titleEn: "North Jeddah villa HVAC",
        metaAr: "VRF · 420 م²",
        metaEn: "VRF · 420 m²",
        tourSlug: "north-jeddah-villa-fitout",
      },
    ],
  },
  {
    slug: "marble-crown-jeddah",
    websiteUrl: "/listing/marble-crown-jeddah",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    portfolioImages: pool("luxury-materials"),
    stats: [{ labelAr: "نوع", labelEn: "Type", valueAr: "مورد trade", valueEn: "Trade supplier" }],
    specialties: [
      { ar: "رخام Calacatta", en: "Calacatta marble" },
      { ar: "Travertine", en: "Travertine" },
      { ar: "جرانيت", en: "Granite" },
    ],
    highlights: [
      { ar: "مورد مواد لشركات التشطيب في الدليل.", en: "Material supplier for fit-out firms." },
    ],
    projects: [
      {
        titleAr: "واجهة رخام — فيلا ساحلية",
        titleEn: "Marble facade — coastal villa",
        metaAr: "Travertine · 2024",
        metaEn: "Travertine · 2024",
      },
    ],
  },
  {
    slug: "namat-mimar-makkah",
    websiteUrl: "/listing/namat-mimar-makkah",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    portfolioImages: [
      TOUR_IMAGES.makkahHero,
      ...TOUR_IMAGES.makkahGallery,
      MARKETING_IMAGES.interiorLounge,
    ],
    stats: [
      { labelAr: "وحدات", labelEn: "Units", valueAr: "120+", valueEn: "120+" },
      { labelAr: "قطاع", labelEn: "Sector", valueAr: "ضيافة", valueEn: "Hospitality" },
    ],
    specialties: [
      { ar: "تشطيب فندقي", en: "Hotel-grade fit-out" },
      { ar: "وحدات مفروشة", en: "Serviced units" },
    ],
    highlights: [{ ar: "شريك جولة Thakher مكة.", en: "Thakher Makkah tour partner." }],
    projects: [
      {
        titleAr: "عمارة فندقية — مكة",
        titleEn: "Serviced tower — Makkah",
        metaAr: "120+ وحدة",
        metaEn: "120+ units",
        tourSlug: "thakher-makkah",
      },
    ],
  },
  {
    slug: "haram-breeze-hvac-makkah",
    websiteUrl: "/listing/haram-breeze-hvac-makkah",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    portfolioImages: pool("hvac").slice(0, 4),
    stats: [{ labelAr: "مدينة", labelEn: "City", valueAr: "مكة", valueEn: "Makkah" }],
    specialties: [
      { ar: "تكييف مركزي", en: "Central AC" },
      { ar: "VRF", en: "VRF" },
    ],
    highlights: [{ ar: "صيانة أبراج ضيافة في مكة.", en: "Hospitality tower maintenance in Makkah." }],
    projects: [
      {
        titleAr: "تكييف عمارة فندقية",
        titleEn: "Serviced tower HVAC",
        metaAr: "مكة · 2024",
        metaEn: "Makkah · 2024",
        tourSlug: "thakher-makkah",
      },
    ],
  },
  {
    slug: "vision-makan-madinah",
    websiteUrl: "/listing/vision-makan-madinah",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    portfolioImages: [
      TOUR_IMAGES.madinahHero,
      ...TOUR_IMAGES.madinahGallery,
      MARKETING_IMAGES.hero,
    ],
    stats: [
      {
        labelAr: "خارجي",
        labelEn: "Outdoor",
        valueAr: "Deck & pergola",
        valueEn: "Deck & pergola",
      },
    ],
    specialties: [
      { ar: "مساحات outdoor", en: "Outdoor living" },
      { ar: "تصميم داخلي/خارجي", en: "Interior & exterior" },
    ],
    highlights: [{ ar: "تصميم deck وpergola للفلل.", en: "Deck and pergola design for villas." }],
    projects: [
      {
        titleAr: "Outdoor living — المدينة",
        titleEn: "Madinah outdoor living",
        metaAr: "Deck · pergola",
        metaEn: "Deck · pergola",
      },
    ],
  },
  {
    slug: "green-oasis-madinah",
    websiteUrl: "/listing/green-oasis-madinah",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    portfolioImages: pool("outdoor"),
    stats: [{ labelAr: "ري", labelEn: "Irrigation", valueAr: "ذكي", valueEn: "Smart" }],
    specialties: [
      { ar: "لاندسكيب", en: "Landscaping" },
      { ar: "مسابح", en: "Pools" },
    ],
    highlights: [{ ar: "ري ذكي ومساحات خضراء للفلل.", en: "Smart irrigation and planted gardens." }],
    projects: [
      {
        titleAr: "حديقة فيلا — المدينة",
        titleEn: "Madinah villa garden",
        metaAr: "2024 · 600 م²",
        metaEn: "2024 · 600 m²",
      },
    ],
  },
];

const bySlug = new Map(PROFILES.map((p) => [p.slug, p]));

export function getShowcaseListingProfile(slug: string): ShowcaseListingProfile | undefined {
  return bySlug.get(slug);
}

export function getCuratedShowcaseProfiles(): ShowcaseListingProfile[] {
  return CURATED_PRO_SLUGS.flatMap((slug) => {
    const profile = bySlug.get(slug);
    return profile ? [profile] : [];
  });
}

export function isShowcaseListing(slug: string): boolean {
  return bySlug.has(slug);
}

/** @deprecated Use CURATED_PRO_SLUGS from curated-pro-listings.ts */
export { CURATED_PRO_SLUGS as SHOWCASE_LISTING_SLUGS };
