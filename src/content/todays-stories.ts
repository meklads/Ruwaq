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
    featured: true,
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
  {
    id: "story-custom-kitchen",
    kind: "guide",
    href: "/guides/custom-kitchen-planning",
    image: "/images/marketing/kitchen-family.jpg",
    titleAr: "تخطيط مطبخ مخصص: workflow، مواد، وميزانية واقعية",
    titleEn: "Custom Kitchen Planning: Workflow, Materials & Budget",
    excerptAr: "من المثلث الذهبي إلى اختيار الخشب والحجر — قبل التوقيع مع المورد.",
    excerptEn: "From the work triangle to wood and stone specs — before you sign with a supplier.",
    categoryAr: "مطابخ",
    categoryEn: "Kitchens",
    publishedAt: "2025-02-10",
  },
  {
    id: "story-concealed-ac",
    kind: "guide",
    href: "/guides/concealed-vs-central-ac",
    image: "/images/marketing/categories/hvac.jpg",
    titleAr: "التكييف المخفي مقابل المركزي في فلل جدة",
    titleEn: "Concealed vs Central AC in Jeddah Villas",
    excerptAr: "VRF، Chilled water، والتكلفة على 8 أشهر تشغيل — مقارنة عملية.",
    excerptEn: "VRF, chilled water, and cost over 8 cooling months — a practical comparison.",
    categoryAr: "تكييف",
    categoryEn: "HVAC",
    publishedAt: "2025-01-28",
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
