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

export const MARKETPLACE_CATEGORIES = [
  {
    slug: "hvac",
    nameAr: "التكييف والتبريد",
    nameEn: "HVAC & Cooling",
    icon: "❄️",
    subcategoriesAr: [
      "تكييف مركزي ودكت",
      "صيانة تكييف فنادق وعمائر",
      "أنظمة كاسيت وسبليت للمشاريع",
    ],
    turrivaCapture: false,
  },
  {
    slug: "fit-out",
    nameAr: "التشطيبات والتصميم الداخلي",
    nameEn: "Fit-Out & Interior",
    icon: "✨",
    subcategoriesAr: [
      "تصميم داخلي فاخر",
      "تشطيب فلل ومقرات تجارية",
      "أعمال الجبس والأرضيات والرخام",
    ],
    turrivaCapture: true,
  },
  {
    slug: "contracting",
    nameAr: "المقاولات العامة والترميم",
    nameEn: "General Contracting",
    icon: "🏗️",
    subcategoriesAr: [
      "ترميم وتأهيل المباني والفنادق",
      "بناء الملاحق والتوسعات",
      "بناء عظم وهياكل إنشائية",
    ],
    turrivaCapture: true,
  },
  {
    slug: "elevators",
    nameAr: "المصاعد والأنظمة الميكانيكية",
    nameEn: "Elevators & Mechanical",
    icon: "🛗",
    subcategoriesAr: [
      "توريد وتركيب مصاعد",
      "صيانة مصاعد واعتمادات الدفاع المدني",
    ],
    turrivaCapture: false,
  },
  {
    slug: "waterproofing",
    nameAr: "العزل المائي والحراري",
    nameEn: "Waterproofing",
    icon: "💧",
    subcategoriesAr: ["عزل أسطح وفوم", "عزل خزانات ومسابح", "معالجة التسربات"],
    turrivaCapture: false,
  },
  {
    slug: "furnishing",
    nameAr: "الفرش والتأثيث الفندقي والسكني",
    nameEn: "FF&E & Furnishing",
    icon: "🛋️",
    subcategoriesAr: [
      "تأثيث فنادق وإسكان حجاج",
      "تجهيز شقق الإيجار اليومي والفلل",
    ],
    turrivaCapture: false,
  },
  {
    slug: "facades",
    nameAr: "تنظيف وجلي الواجهات والرخام",
    nameEn: "Facades & Marble",
    icon: "🏢",
    subcategoriesAr: [
      "جلي وتلميع رخام",
      "غسيل واجهات مرتفعات (زجاج وكلادينج)",
    ],
    turrivaCapture: false,
  },
] as const;

export type MarketplaceCategorySlug =
  (typeof MARKETPLACE_CATEGORIES)[number]["slug"];

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
