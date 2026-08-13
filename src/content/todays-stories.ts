export type TodaysStoryKind = "home-tour" | "guide" | "launch";

export type TodaysStory = {
  id: string;
  kind: TodaysStoryKind;
  href: string;
  image: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  categoryAr: string;
  categoryEn: string;
  featured?: boolean;
  publishedAt: string;
};

/** Curated weekly editorial feed — update slots when publishing new guides or tours. */
export const TODAYS_STORIES: TodaysStory[] = [
  {
    id: "story-engineering-supervision",
    kind: "guide",
    href: "/guides/engineering-supervision-basics",
    image: "/images/marketing/keys-new-home.jpg",
    titleAr: "الإشراف الهندسي على فيلا جدة: مراحل، NCR، وتكلفة 2026",
    titleEn: "Engineering Supervision for a Jeddah Villa: Phases, NCRs & 2026 Cost",
    excerptAr: "من الأساسات إلى التسليم — hold points، أوامر التغيير، ورسوم الإشراف السنوية.",
    excerptEn: "Foundations to handover — hold points, variation orders, and annual supervision fees.",
    categoryAr: "إشراف",
    categoryEn: "Supervision",
    featured: true,
    publishedAt: "2026-08-13",
  },
  {
    id: "story-villa-maintenance",
    kind: "guide",
    href: "/guides/villa-maintenance-contract",
    image: "/images/marketing/family-savings-home.jpg",
    titleAr: "عقد صيانة فيلا جدة: SLA، موسم الأمطار، وتكلفة AMC",
    titleEn: "Jeddah Villa AMC: SLA, Rain Season & Annual Cost",
    excerptAr: "ما يجب أن يشمله العقد قبل نوفمبر — HVAC، الأسطح، وقطع الغيار.",
    excerptEn: "What the contract must cover before November — HVAC, roofs, and spare parts.",
    categoryAr: "صيانة",
    categoryEn: "Maintenance",
    publishedAt: "2026-08-12",
  },
  {
    id: "story-landscape-madinah",
    kind: "guide",
    href: "/guides/landscape-madinah-villas",
    image: "/images/marketing/hero-villa-family.jpg",
    titleAr: "تنسيق حدائق فلل المدينة: نباتات، ري، وhardscape",
    titleEn: "Madinah Villa Landscaping: Plants, Drip Irrigation & Hardscape",
    excerptAr: "صيف أجف من جدة — zones الري، تكلفة المشروع، وضمان 12 شهراً.",
    excerptEn: "Drier than Jeddah summers — irrigation zones, project cost, and a 12-month warranty.",
    categoryAr: "لاندسكيب",
    categoryEn: "Landscape",
    publishedAt: "2026-08-11",
  },
  {
    id: "story-gypsum-ceiling",
    kind: "guide",
    href: "/guides/gypsum-ceiling-jeddah-villas",
    image: "/images/marketing/family-living-room.jpg",
    titleAr: "أسقف الجبس في فلل جدة: إضاءة مخفية ومقاومة الرطوبة",
    titleEn: "Gypsum Ceilings in Jeddah Villas: Hidden Lighting & Humidity",
    excerptAr: "ارتفاع السقف المعلق، zones الإضاءة، ونوع الجبس قبل التشطيب.",
    excerptEn: "Drop height, lighting zones, and board type before fit-out.",
    categoryAr: "تشطيب",
    categoryEn: "Fit-out",
    publishedAt: "2026-08-02",
  },
  {
    id: "story-north-jeddah-villa",
    kind: "home-tour",
    href: "/tours/north-jeddah-villa-fitout",
    image: "/images/marketing/interior-lounge.jpg",
    titleAr: "فيلا شمال جدة — حيث يلتقي الرخام الدافئ بالضوء الطبيعي",
    titleEn: "North Jeddah Villa — Where Warm Marble Meets Natural Light",
    excerptAr: "تشطيب 420 م² من التصور ثلاثي الأبعاد إلى التسليم — جولة Home Tour كاملة.",
    excerptEn: "420 m² fit-out from 3D visualization through handover — a full Home Tour walkthrough.",
    categoryAr: "Home Tour",
    categoryEn: "Home Tour",
    publishedAt: "2025-03-15",
  },
  {
    id: "story-marble-jeddah",
    kind: "guide",
    href: "/guides/marble-jeddah-climate",
    image: "/images/marketing/categories/luxury-materials.jpg",
    titleAr: "اختيار الرخام لفلل جدة: دليل المناخ الساحلي والملوحة",
    titleEn: "Choosing Marble for Jeddah Villas: Coastal Climate & Salt Air",
    excerptAr: "معايير مختلفة عن الداخل — امتصاص الماء، الواجهة المتهوية، ومعالجة travertine.",
    excerptEn: "Different specs than interiors — absorption, ventilated facades, and travertine treatment.",
    categoryAr: "تصميم + مواد",
    categoryEn: "Design + Materials",
    publishedAt: "2025-02-20",
  },
  {
    id: "story-sumou-anara",
    kind: "launch",
    href: "/tours/sumou-anara",
    image: "/images/projects/sumou-anara/main.jpg",
    titleAr: "أنارا — حي السحاب: 758 وحدة في شمال الرياض",
    titleEn: "Anara — Al Sahab: 758 Units in North Riyadh",
    excerptAr: "مشروع سمو العقارية على 748 ألف م² — فيديو، مخططات، وجدول دفعات.",
    excerptEn: "Sumou Real Estate on 748k m² — film, master plans, and payment schedule.",
    categoryAr: "إطلاق جديد",
    categoryEn: "New launch",
    publishedAt: "2025-11-01",
  },
];

export function getTodaysStories(): TodaysStory[] {
  return [...TODAYS_STORIES].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

export function getFeaturedTodaysStory(): TodaysStory {
  return getTodaysStories().find((s) => s.featured) ?? getTodaysStories()[0]!;
}

export function getSecondaryTodaysStories(): TodaysStory[] {
  const featured = getFeaturedTodaysStory();
  return getTodaysStories().filter((s) => s.id !== featured.id).slice(0, 4);
}
