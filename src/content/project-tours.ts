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
  highlightsAr?: string[];
  highlightsEn?: string[];
  developer?: {
    nameAr: string;
    nameEn: string;
    logo?: string;
  };
  completionDateAr: string;
  completionDateEn: string;
  scopeAr: string;
  scopeEn: string;
  areaSqm?: number;
  credits: ProjectTourCredit[];
  publishedAt: string;
};

/** Editorial completed Home Tours — AD-style walkthroughs of delivered work. */
export const PROJECT_TOURS: ProjectTour[] = [
  {
    slug: "north-jeddah-villa-fitout",
    citySlug: "jeddah",
    categorySlug: "fit-out",
    heroImage: "/images/marketing/interior-lounge.jpg",
    gallery: [
      "/images/marketing/family-living-room.jpg",
      "/images/marketing/kitchen-family.jpg",
      "/images/marketing/hero-villa-family.jpg",
      "/images/marketing/gh-studio-visualization.jpg",
      "/images/marketing/family-dining-planning.jpg",
    ],
    titleAr: "فيلا شمال جدة — حيث يلتقي الرخام الدافئ بالضوء الطبيعي",
    titleEn: "North Jeddah Villa — Where Warm Marble Meets Natural Light",
    subtitleAr:
      "تشطيب داخلي كامل على 420 م² — من التصور ثلاثي الأبعاد إلى التسليم، بإدارة توريفا وتصور Graphics House.",
    subtitleEn:
      "Full 420 m² interior fit-out — from 3D visualization through handover, delivered by Turriva with Graphics House CGI.",
    storyAr: [
      "عندما التقت العائلة بفريق توريفا، كان المطلوب واضحاً: فيلا تعكس هدوء الشمال دون فقدان الدفء العائلي. بدأنا بجلسات تصميم مع Graphics House — نماذج ثلاثية الأبعاد للصالة، المطبخ، وغرف النوم — قبل أن تُرفع أول مطرقة.",
      "اخترنا رخاماً تركياً مع معالجة ضد الرطوبة الساحلية، وأرضيات بورسلان بدرجة R10 للمناطق الرطبة. الإضاءة مخفية في الأسقف مع dimming zones — صالة للاستقبال، ركن عائلي، وممرات — لتقليل الوهج في أيام جدة الحارة.",
      "المطبخ: واجهات خشبية مطفية، جزيرة مركزية، وربط بصري مع غرفة الطعام عبر فتحة زجاجية. غرف النوم: خزائن مدمجة، تكييف مخفي، وأسقف بارتفاعات متنوعة لكسر الرتابة.",
      "التسليم تم خلال 120 يوماً — مع جولة تسليم موثّقة، وضمان سنة على التشطيبات، وملف صيانة للمواد. هذه الجولة جزء من معرض Ruwaq PRO للمشاريع المكتملة.",
    ],
    storyEn: [
      "When the family met the Turriva team, the brief was clear: a north Jeddah villa that feels calm without losing warmth. We started with Graphics House — 3D models of the living room, kitchen, and bedrooms — before the first hammer swing.",
      "We specified Turkish marble with coastal humidity treatment and R10 porcelain in wet zones. Lighting is recessed with dimming zones — reception, family lounge, corridors — to cut glare on hot Jeddah afternoons.",
      "Kitchen: matte wood fronts, a central island, and a glass opening into the dining room. Bedrooms: built-in wardrobes, concealed AC, and varied ceiling heights to break monotony.",
      "Handover in 120 days — documented walkthrough, one-year warranty on finishes, and a materials maintenance pack. This tour is part of the Ruwaq PRO completed-project gallery.",
    ],
    highlightsAr: [
      "420 م² تشطيب داخلي",
      "120 يوماً من التصميم للتسليم",
      "تصور 3D قبل التنفيذ",
      "رخام ومواد مقاومة للرطوبة",
    ],
    highlightsEn: [
      "420 m² interior fit-out",
      "120 days design to handover",
      "3D visualization before build",
      "Humidity-resistant marble & materials",
    ],
    developer: {
      nameAr: "توريفا",
      nameEn: "Turriva",
    },
    completionDateAr: "مارس 2025",
    completionDateEn: "March 2025",
    scopeAr: "تشطيب داخلي كامل — صالات، مطبخ، غرف نوم، حمامات",
    scopeEn: "Full interior fit-out — living, kitchen, bedrooms, bathrooms",
    areaSqm: 420,
    credits: [
      {
        roleAr: "التشطيب والتنفيذ",
        roleEn: "Fit-out & delivery",
        listingSlug: "turriva-fitout-jeddah",
      },
      {
        roleAr: "التصور ثلاثي الأبعاد",
        roleEn: "3D visualization",
        listingSlug: "graphics-house-visualization-jeddah",
      },
    ],
    publishedAt: "2025-03-15",
  },
];

export function getProjectTour(slug: string): ProjectTour | undefined {
  return PROJECT_TOURS.find((t) => t.slug === slug);
}

export function getCompletedHomeTours(): ProjectTour[] {
  return PROJECT_TOURS;
}
