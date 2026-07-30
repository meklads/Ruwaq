/** Western Region cities — URL slugs ↔ Prisma enum */
export const MARKETPLACE_CITIES = [
  {
    slug: "jeddah",
    enum: "JEDDAH" as const,
    nameAr: "جدة",
    nameEn: "Jeddah",
  },
  {
    slug: "makkah",
    enum: "MAKKAH" as const,
    nameAr: "مكة المكرمة",
    nameEn: "Makkah",
  },
  {
    slug: "madinah",
    enum: "MADINAH" as const,
    nameAr: "المدينة المنورة",
    nameEn: "Madinah",
  },
] as const;

export type MarketplaceCitySlug = (typeof MARKETPLACE_CITIES)[number]["slug"];

export type ProviderType = "EXECUTOR" | "SUPPLIER" | "CONSULTANT";

/** AD editorial directory — 8 core sectors */
export const MARKETPLACE_CATEGORIES = [
  {
    slug: "fit-out",
    nameAr: "التشطيبات والتصميم الداخلي",
    nameEn: "Fit-Out & Interior",
    icon: "✨",
    providerType: "EXECUTOR" as ProviderType,
    subcategoriesAr: [
      "تصميم داخلي فاخر",
      "تشطيب فلل ومقرات تجارية",
      "أعمال الجبس والأرضيات والرخام",
    ],
    subcategoriesEn: [
      "Luxury interior design",
      "Villas & commercial fit-out",
      "Gypsum, flooring & marble",
    ],
    turrivaCapture: true,
  },
  {
    slug: "contracting",
    nameAr: "المقاولات والبناء",
    nameEn: "General Contracting",
    icon: "🏗️",
    providerType: "EXECUTOR" as ProviderType,
    subcategoriesAr: [
      "ترميم وتأهيل المباني والفنادق",
      "بناء الملاحق والتوسعات",
      "بناء عظم وهياكل إنشائية",
    ],
    subcategoriesEn: [
      "Building & hotel renovation",
      "Annexes & extensions",
      "Structural shell works",
    ],
    turrivaCapture: true,
  },
  {
    slug: "supervision",
    nameAr: "الإشراف الهندسي والاستشارات",
    nameEn: "Engineering Supervision",
    icon: "📐",
    providerType: "CONSULTANT" as ProviderType,
    subcategoriesAr: [
      "إشراف ميداني للمشاريع السكنية",
      "تقارير جودة واستلام مراحل",
      "استشارات هندسية وإدارة مشروع",
    ],
    subcategoriesEn: [
      "Residential site supervision",
      "Quality reports & phase sign-off",
      "Engineering consultancy & PM",
    ],
    turrivaCapture: false,
  },
  {
    slug: "hvac",
    nameAr: "التكييف والتهوية",
    nameEn: "HVAC & Ventilation",
    icon: "❄️",
    providerType: "EXECUTOR" as ProviderType,
    subcategoriesAr: [
      "تكييف مركزي ودكت",
      "صيانة تكييف فنادق وعمائر",
      "أنظمة كاسيت وVRF للمشاريع",
    ],
    subcategoriesEn: [
      "Central AC & ducting",
      "Hotel & tower maintenance",
      "VRF & cassette for projects",
    ],
    turrivaCapture: false,
  },
  {
    slug: "kitchens",
    nameAr: "المطابخ والخزائن التخصصية",
    nameEn: "Kitchens & Custom Joinery",
    icon: "🍳",
    providerType: "EXECUTOR" as ProviderType,
    subcategoriesAr: [
      "مطابخ فاخرة حسب الطلب",
      "خزائن walk-in وdressing rooms",
      "أعمال خشبية للفلل والقصور",
    ],
    subcategoriesEn: [
      "Bespoke luxury kitchens",
      "Walk-in closets & dressing rooms",
      "Villa & palace custom woodwork",
    ],
    turrivaCapture: false,
  },
  {
    slug: "luxury-materials",
    nameAr: "المواد الفاخرة والإضاءة",
    nameEn: "Luxury Materials & Lighting",
    icon: "💎",
    providerType: "SUPPLIER" as ProviderType,
    subcategoriesAr: [
      "رخام وجرانيت فاخر",
      "إضاءة معمارية وديكور",
      "تجهيزات Sanitary ومواد تشطيب",
    ],
    subcategoriesEn: [
      "Premium marble & stone",
      "Architectural & decorative lighting",
      "Sanitary ware & finish materials",
    ],
    turrivaCapture: false,
  },
  {
    slug: "outdoor",
    nameAr: "الحدائق واللاندسكيب",
    nameEn: "Landscaping & Outdoor",
    icon: "🌿",
    providerType: "EXECUTOR" as ProviderType,
    subcategoriesAr: [
      "تنسيق حدائق فلل وقصور",
      "مسابح وشلالات خارجية",
      "إضاءة خارجية وزراعة",
    ],
    subcategoriesEn: [
      "Villa & palace landscaping",
      "Outdoor pools & water features",
      "Exterior lighting & planting",
    ],
    turrivaCapture: false,
  },
  {
    slug: "maintenance",
    nameAr: "الصيانة وتشغيل المباني",
    nameEn: "Maintenance & FM",
    icon: "🔧",
    providerType: "EXECUTOR" as ProviderType,
    subcategoriesAr: [
      "عقود صيانة سنوية للفلل",
      "عزل أسطح وخزانات",
      "تشغيل وصيانة مباني تجارية",
    ],
    subcategoriesEn: [
      "Annual villa maintenance contracts",
      "Roof & tank waterproofing",
      "Commercial building O&M",
    ],
    turrivaCapture: false,
  },
] as const;

export type MarketplaceCategorySlug =
  (typeof MARKETPLACE_CATEGORIES)[number]["slug"];

/** Retired slugs → canonical AD sector (301 redirects) */
export const LEGACY_CATEGORY_REDIRECTS: Record<string, MarketplaceCategorySlug> = {
  elevators: "contracting",
  waterproofing: "maintenance",
  furnishing: "fit-out",
  facades: "luxury-materials",
};

export function resolveCategorySlug(
  slug: string | undefined
): MarketplaceCategorySlug | null {
  if (!slug) return null;
  const legacy = LEGACY_CATEGORY_REDIRECTS[slug];
  if (legacy) return legacy;
  const found = getCategoryBySlug(slug);
  return found?.slug ?? null;
}

export function getCityBySlug(slug: string) {
  return MARKETPLACE_CITIES.find((c) => c.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return MARKETPLACE_CATEGORIES.find((c) => c.slug === slug);
}

export function citySlugFromEnum(
  city: "JEDDAH" | "MAKKAH" | "MADINAH"
): MarketplaceCitySlug {
  const found = MARKETPLACE_CITIES.find((c) => c.enum === city);
  return found?.slug ?? "jeddah";
}

export function defaultProviderTypeForCategory(
  slug: MarketplaceCategorySlug
): ProviderType {
  return getCategoryBySlug(slug)?.providerType ?? "EXECUTOR";
}
