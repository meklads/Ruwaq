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
  {
    slug: "makkah-serviced-tower-fitout",
    citySlug: "makkah",
    categorySlug: "fit-out",
    heroImage: "/images/projects/thakher-makkah/main.jpg",
    gallery: [
      "/images/projects/thakher-makkah/gallery-1.jpg",
      "/images/projects/thakher-makkah/gallery-2.jpg",
      "/images/marketing/interior-lounge.jpg",
      "/images/marketing/family-living-room.jpg",
    ],
    titleAr: "عمارة فندقية مكة — تشطيب 120+ وحدة ضيافة",
    titleEn: "Makkah Serviced Tower — 120+ Hospitality Unit Fit-Out",
    subtitleAr:
      "تشطيب فندقي على 12 طابقاً — مواد مقاومة للرطوبة، جبس acoustic، وبورسلان للمناطق الرطبة.",
    subtitleEn:
      "Hotel-grade fit-out across 12 floors — moisture-resistant finishes, acoustic gypsum, and porcelain in wet zones.",
    storyAr: [
      "مشروع عمارة فندقية في مكة يتطلب معايير مختلفة عن الفيلا السكنية: دوام تشغيل، رطوبة، وكثافة استخدام. بدأنا بجدول مراحل يربط كل طابق بمحضر استلام مستقل.",
      "المواد: بورسلان R10 في الحمامات، جبس acoustic في الممرات، وMDF مقاوم للرطوبة في الوحدات المفروشة. التكييف VRF مركزي مع zoning لكل وحدة.",
      "120+ وحدة سُلّمت على 3 دفعات — مع فريق Ruwaq PRO (نمط المعمار) وضمان سنة على التشطيبات.",
    ],
    storyEn: [
      "A Makkah serviced tower demands different standards from a villa: uptime, humidity, and heavy use. We built a phase schedule tying each floor to its own sign-off minutes.",
      "Materials: R10 porcelain in bathrooms, acoustic gypsum in corridors, and moisture-resistant MDF in furnished units. Central VRF with zoning per unit.",
      "120+ units delivered in three batches — with Ruwaq PRO partner Namat Al-Mi'mar and a one-year finish warranty.",
    ],
    highlightsAr: ["120+ وحدة", "12 طابق", "معايير ضيافة", "VRF مركزي"],
    highlightsEn: ["120+ units", "12 floors", "Hospitality grade", "Central VRF"],
    developer: { nameAr: "نمط المعمار", nameEn: "Namat Al-Mi'mar" },
    completionDateAr: "يناير 2025",
    completionDateEn: "January 2025",
    scopeAr: "تشطيب وحدات ضيافة — حمامات، مطابخ، غرف نوم",
    scopeEn: "Hospitality unit fit-out — bathrooms, kitchens, bedrooms",
    areaSqm: 8400,
    credits: [
      {
        roleAr: "التشطيب والتنفيذ",
        roleEn: "Fit-out & delivery",
        listingSlug: "namat-mimar-makkah",
      },
      {
        roleAr: "التكييف",
        roleEn: "HVAC",
        listingSlug: "haram-breeze-hvac-makkah",
      },
    ],
    publishedAt: "2025-01-20",
  },
  {
    slug: "jeddah-coastal-apartment-renovation",
    citySlug: "jeddah",
    categorySlug: "fit-out",
    heroImage: "/images/marketing/family-living-room.jpg",
    gallery: [
      "/images/marketing/kitchen-family.jpg",
      "/images/marketing/interior-lounge.jpg",
      "/images/marketing/gh-studio-visualization.jpg",
      "/images/marketing/family-dining-planning.jpg",
    ],
    titleAr: "شقة ساحلية جدة — تجديد كامل بروح Minimal Coastal",
    titleEn: "Jeddah Coastal Apartment — Full Renewal in Minimal Coastal Style",
    subtitleAr:
      "185 م² على الواجهة البحرية — أرضيات بورسلان، مطبخ مفتوح، وإضاءة طبيعية بإدارة توريفا.",
    subtitleEn:
      "185 m² on the waterfront — porcelain floors, open kitchen, and daylight-first layout by Turriva.",
    storyAr: [
      "المالكان طلبا شقةً تستقبل الضوء دون فوضى بصرية. أزلنا الحواجز غير الإنشائية، ومددنا البورسلان من المدخل إلى الشرفة بانسياب واحد.",
      "المطبخ: جزيرة quartz، خزائن مطفية، وشفاط بقدرة عالية للبخار الساحلي. الحمامات: travertine مع sealant مخصص للملوحة.",
      "التسليم في 90 يوماً — قبل موسم العودة للمدينة.",
    ],
    storyEn: [
      "The owners wanted light without visual clutter. We removed non-structural walls and ran porcelain from entry to balcony in one continuous plane.",
      "Kitchen: quartz island, matte joinery, and a high-capacity hood for coastal steam. Bathrooms: travertine with a salt-air sealant spec.",
      "Handover in 90 days — ahead of the city return season.",
    ],
    highlightsAr: ["185 م²", "90 يوماً", "Minimal coastal", "مطبخ مفتوح"],
    highlightsEn: ["185 m²", "90 days", "Minimal coastal", "Open kitchen"],
    developer: { nameAr: "توريفا", nameEn: "Turriva" },
    completionDateAr: "يونيو 2024",
    completionDateEn: "June 2024",
    scopeAr: "تجديد تشطيب داخلي كامل",
    scopeEn: "Full interior renovation",
    areaSqm: 185,
    credits: [
      {
        roleAr: "التشطيب",
        roleEn: "Fit-out",
        listingSlug: "turriva-fitout-jeddah",
      },
      {
        roleAr: "المطبخ",
        roleEn: "Kitchen",
        listingSlug: "arkan-kitchens-jeddah",
      },
    ],
    publishedAt: "2024-06-10",
  },
];

export function getProjectTour(slug: string): ProjectTour | undefined {
  return PROJECT_TOURS.find((t) => t.slug === slug);
}

export function getCompletedHomeTours(): ProjectTour[] {
  return PROJECT_TOURS;
}
