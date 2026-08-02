import {
  beesmotionReferralUrl,
  graphicsHouseReferralUrl,
  turrivaReferralUrl,
} from "@/shared/constants/brand";

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
  stats: ShowcaseStat[];
  specialties: { ar: string; en: string }[];
  highlights: { ar: string; en: string }[];
  projects: ShowcaseProject[];
};

const PROFILES: ShowcaseListingProfile[] = [
  {
    slug: "turriva-fitout-jeddah",
    isBenchmark: true,
    websiteUrl: turrivaReferralUrl("listing_benchmark"),
    websiteLabelAr: "turriva.com",
    websiteLabelEn: "turriva.com",
    crNumber: "4030123456",
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
        ar: "تكامل مع Graphics House للتصور وBeesmotion للتسويق.",
        en: "Integrated with Graphics House (CGI) and Beesmotion (marketing).",
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
    projects: [],
  },
  {
    slug: "graphics-house-visualization-jeddah",
    websiteUrl: graphicsHouseReferralUrl("listing_showcase"),
    websiteLabelAr: "3dgraphicshouse.com",
    websiteLabelEn: "3dgraphicshouse.com",
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
    projects: [],
  },
  {
    slug: "arkan-kitchens-jeddah",
    websiteUrl: "/jeddah/kitchens",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
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
        tourSlug: "dar-wa-emaar-saraya-al-ruba",
      },
    ],
  },
  {
    slug: "sorouh-gharbiya-hvac-jeddah",
    websiteUrl: "/jeddah/hvac",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    stats: [{ labelAr: "أنظمة", labelEn: "Systems", valueAr: "VRF مخفي", valueEn: "Concealed VRF" }],
    specialties: [{ ar: "VRF", en: "VRF" }, { ar: "صيانة فنادق", en: "Hotel maintenance" }],
    highlights: [],
    projects: [
      {
        titleAr: "تكييف فيلا شمال جدة",
        titleEn: "North Jeddah villa HVAC",
        tourSlug: "dar-wa-emaar-saraya-al-ruba",
      },
    ],
  },
  {
    slug: "namat-mimar-makkah",
    websiteUrl: "/makkah/fit-out",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    stats: [
      { labelAr: "وحدات", labelEn: "Units", valueAr: "120+", valueEn: "120+" },
      { labelAr: "قطاع", labelEn: "Sector", valueAr: "ضيافة", valueEn: "Hospitality" },
    ],
    specialties: [
      { ar: "تشطيب فندقي", en: "Hotel-grade fit-out" },
      { ar: "وحدات مفروشة", en: "Serviced units" },
    ],
    highlights: [],
    projects: [
      {
        titleAr: "عمارة فندقية — مكة",
        titleEn: "Serviced tower — Makkah",
        tourSlug: "thakher-makkah",
      },
    ],
  },
  {
    slug: "haram-breeze-hvac-makkah",
    websiteUrl: "/makkah/hvac",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    stats: [{ labelAr: "مدينة", labelEn: "City", valueAr: "مكة", valueEn: "Makkah" }],
    specialties: [{ ar: "تكييف مركزي", en: "Central AC" }, { ar: "VRF", en: "VRF" }],
    highlights: [],
    projects: [
      {
        titleAr: "تكييف عمارة فندقية",
        titleEn: "Serviced tower HVAC",
        tourSlug: "thakher-makkah",
      },
    ],
  },
  {
    slug: "vision-makan-madinah",
    websiteUrl: "/madinah/outdoor",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
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
    highlights: [],
    projects: [
      {
        titleAr: "فيلا المدينة — outdoor living",
        titleEn: "Madinah villa — outdoor living",
        tourSlug: "roshn-sedra",
      },
    ],
  },
  {
    slug: "green-oasis-madinah",
    websiteUrl: "/madinah/outdoor",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    stats: [{ labelAr: "ري", labelEn: "Irrigation", valueAr: "ذكي", valueEn: "Smart" }],
    specialties: [{ ar: "لاندسكيب", en: "Landscaping" }, { ar: "مسابح", en: "Pools" }],
    highlights: [],
    projects: [
      {
        titleAr: "حديقة فيلا المدينة",
        titleEn: "Madinah villa landscape",
        tourSlug: "roshn-sedra",
      },
    ],
  },
  {
    slug: "marble-crown-jeddah",
    websiteUrl: "/jeddah/luxury-materials",
    websiteLabelAr: "ملف Ruwaq",
    websiteLabelEn: "Ruwaq profile",
    stats: [{ labelAr: "نوع", labelEn: "Type", valueAr: "مورد trade", valueEn: "Trade supplier" }],
    specialties: [
      { ar: "رخام Calacatta", en: "Calacatta marble" },
      { ar: "Travertine", en: "Travertine" },
      { ar: "جرانيت", en: "Granite" },
    ],
    highlights: [
      { ar: "مورد مواد لشركات التشطيب في الدليل.", en: "Material supplier for fit-out firms." },
    ],
    projects: [],
  },
];

const bySlug = new Map(PROFILES.map((p) => [p.slug, p]));

export function getShowcaseListingProfile(slug: string): ShowcaseListingProfile | undefined {
  return bySlug.get(slug);
}

export function isShowcaseListing(slug: string): boolean {
  return bySlug.has(slug);
}
