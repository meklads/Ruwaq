import type { MarketplaceCitySlug, MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";
import { TOUR_IMAGES } from "@/content/marketing-images";

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
  credits: ProjectTourCredit[];
  publishedAt: string;
};

export const PROJECT_TOURS: ProjectTour[] = [
  {
    slug: "north-jeddah-villa-fitout",
    citySlug: "jeddah",
    categorySlug: "fit-out",
    heroImage: TOUR_IMAGES.jeddahHero,
    gallery: [...TOUR_IMAGES.jeddahGallery],
    titleAr: "فيلا شمال جدة — تشطيب فاخر متكامل",
    titleEn: "North Jeddah Villa — Full Luxury Fit-Out",
    subtitleAr: "تصميم داخلي، مطبخ مخصص، وتكييف مخفي — تسليم 2025",
    subtitleEn: "Interior design, bespoke kitchen, and concealed AC — delivered 2025",
    storyAr: [
      "يقع المشروع في حي سكني راقٍ شمال جدة، حيث طلب المالك تشطيباً كاملاً لفيلا 850 م² دون المساس بالواجهة الخارجية.",
      "بدأت توريفا بمرحلة التصميم الداخلي: توزيع majlis، مطبخ مفتوح، وغرف نوم master مع dressing room مدمج.",
      "نفّذ استوديو الأركان مطبخاً حسب الطلب بخشبيات ألمانية وquartz، بينما جهّزت صروح الغربية أنظمة VRF مخفية بالكامل.",
      "النتيجة: تسليم editorial-ready خلال 18 أسبوعاً — معتمد من Ruwaq PRO للشركات المنفّذة.",
    ],
    storyEn: [
      "This premium residential project sits in north Jeddah, where the owner requested a full interior transformation without altering the exterior shell.",
      "Turriva led interior design: majlis layout, open kitchen, and master suites with integrated dressing rooms.",
      "Arkan Luxury Kitchens delivered bespoke German joinery and quartz tops; Sorouh Al-Gharbiya installed fully concealed VRF systems.",
      "Outcome: editorial-ready handover in 18 weeks — credited to Ruwaq PRO verified partners.",
    ],
    credits: [
      {
        roleAr: "التصميم والتشطيب",
        roleEn: "Design & fit-out",
        listingSlug: "turriva-fitout-jeddah",
      },
      {
        roleAr: "المطبخ والخزائن",
        roleEn: "Kitchen & joinery",
        listingSlug: "arkan-kitchens-jeddah",
      },
      {
        roleAr: "التكييف والتهوية",
        roleEn: "HVAC",
        listingSlug: "sorouh-gharbiya-hvac-jeddah",
      },
    ],
    publishedAt: "2025-11-01",
  },
  {
    slug: "makkah-serviced-residence",
    citySlug: "makkah",
    categorySlug: "fit-out",
    heroImage: TOUR_IMAGES.makkahHero,
    gallery: [...TOUR_IMAGES.makkahGallery],
    titleAr: "عمارة فندقية — تشطيب وحدات ضيافة",
    titleEn: "Serviced Tower — Hospitality Unit Fit-Out",
    subtitleAr: "120 وحدة — مواد مقاومة للرطوبة ومعايير ضيافة",
    subtitleEn: "120 units — moisture-resistant finishes and hospitality standards",
    storyAr: [
      "مشروع تأهيل عمارة فندقية قرب العزيزية في مكة، لاستقبال ضيوف على مدار العام.",
      "شركة نمط المعمار نفّذت تشطيب الوحدات بمواد مقاومة للرطوبة، أرضيات porcelain، وجبس acoustic.",
      "نسيم الحرم للتكييف زوّد وحدات كاسيت عالية الكفاءة مع عقود صيانة ما قبل موسم الحج.",
      "المشروع نموذجي لمالكي العقارات الذين يبحثون عن مقاولين معتمدين في قطاع الضيافة بمكة.",
    ],
    storyEn: [
      "A serviced tower near Makkah's Al Aziziyah district, repositioned for year-round hospitality guests.",
      "Namat Al-Mi'mar Decor executed unit fit-out with moisture-resistant materials, porcelain flooring, and acoustic gypsum.",
      "Haram Breeze HVAC supplied high-efficiency cassette systems with pre-Hajj maintenance contracts.",
      "A reference project for property owners seeking verified hospitality contractors in Makkah.",
    ],
    credits: [
      {
        roleAr: "التشطيب والديكور",
        roleEn: "Fit-out & decor",
        listingSlug: "namat-mimar-makkah",
      },
      {
        roleAr: "التكييف",
        roleEn: "HVAC",
        listingSlug: "haram-breeze-hvac-makkah",
      },
    ],
    publishedAt: "2025-09-15",
  },
  {
    slug: "madinah-villa-garden",
    citySlug: "madinah",
    categorySlug: "outdoor",
    heroImage: TOUR_IMAGES.madinahHero,
    gallery: [...TOUR_IMAGES.madinahGallery],
    titleAr: "فيلا المدينة — حديقة ومساحات خارجية",
    titleEn: "Madinah Villa — Landscape & Outdoor Living",
    subtitleAr: "تنسيق حدائق، مسبح، وإضاءة خارجية متكاملة",
    subtitleEn: "Landscaping, pool, and integrated exterior lighting",
    storyAr: [
      "فilla سكنية حديثة في المدينة المنورة طلبت تحويل الفناء الخلفي إلى مساحة معيشة خارجية كاملة.",
      "مؤسسة رؤية المكان أنجزت deck خارجي وpergola، بينما تولت الواحة الخضراء الزراعة والري الذكي.",
      "أضيف مسبح family-size مع إضاءة path lights مخفية — تصميم sustainable يراعي مناخ الحجاز.",
      "المشروع يبرز تكامل قطاعي التشطيب واللاندسكيب في دليل Ruwaq PRO.",
    ],
    storyEn: [
      "A contemporary Madinah villa needed its rear courtyard transformed into a full outdoor living suite.",
      "Vision of Place Design built the deck and pergola; Green Oasis Landscaping handled planting and smart irrigation.",
      "A family pool was added with concealed path lighting — a sustainable design tuned to the Hijaz climate.",
      "This tour highlights how fit-out and outdoor sectors connect inside the Ruwaq PRO directory.",
    ],
    credits: [
      {
        roleAr: "التصميم الداخلي والخارجي",
        roleEn: "Interior & outdoor design",
        listingSlug: "vision-makan-madinah",
      },
      {
        roleAr: "اللاندسكيب والحدائق",
        roleEn: "Landscaping",
        listingSlug: "green-oasis-madinah",
      },
    ],
    publishedAt: "2025-08-20",
  },
];

export function getProjectTour(slug: string): ProjectTour | undefined {
  return PROJECT_TOURS.find((t) => t.slug === slug);
}
