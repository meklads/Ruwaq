import {
  LISTING_SEED_IMAGE_POOLS,
  MARKETING_IMAGES,
  TOUR_IMAGES,
} from "../../src/content/marketing-images";
import { CURATED_PRO_SLUGS } from "../../src/content/curated-pro-listings";
import { RUWQ_SUPPORT_WHATSAPP_E164 } from "../../src/shared/constants/brand";
import type { ListingSeed } from "./marketplace-listing-generator";

type ListingOverride = Partial<
  Pick<
    ListingSeed,
    | "titleAr"
    | "titleEn"
    | "descriptionAr"
    | "descriptionEn"
    | "phone"
    | "whatsapp"
    | "address"
    | "isFeatured"
    | "directoryTier"
    | "images"
  >
>;

/** Rich seed overrides for ecosystem partners + tour credits (realistic showcase profiles). */
const OVERRIDES: Record<string, ListingOverride> = {
  "turriva-fitout-jeddah": {
    descriptionAr: `توريفا العقارية — شريك Ruwaq PRO المرجعي للتشطيبات الفاخرة في المنطقة الغربية.

• تصميم داخلي وتشطيب متكامل للفلل والقصور والمقرات التجارية
• جبس، أرضيات، رخام، وإضاءة ديكورية بمعايير تنفيذية عالية
• حزمة شروط وضمانات Ruwaq جاهزة لعروض العملاء
• مشاريع موثّقة في جولات رواق — فيلا شمال جدة (2025)

الملف المرجعي الذي نقيس به جودة باقي شركات الدليل.`,
    descriptionEn: `Turriva Real Estate — Ruwaq PRO benchmark partner for luxury fit-out across Western KSA.

• Interior design and turnkey finishing for villas, palaces, and commercial premises
• Gypsum, flooring, marble, and decorative lighting to executive standards
• Ruwaq clause & warranty pack ready for client proposals
• Featured in Ruwaq project tours — North Jeddah villa (2025)

The reference profile other directory listings are measured against.`,
    phone: RUWQ_SUPPORT_WHATSAPP_E164,
    whatsapp: RUWQ_SUPPORT_WHATSAPP_E164,
    address: "جدة — حي المحمدية، المملكة العربية السعودية",
    isFeatured: true,
    directoryTier: "PRO",
    images: [
      MARKETING_IMAGES.interiorLounge,
      MARKETING_IMAGES.familyLiving,
      MARKETING_IMAGES.kitchenFamily,
      TOUR_IMAGES.jeddahHero,
      ...TOUR_IMAGES.jeddahGallery.slice(0, 2),
    ],
  },
  "turriva-contracting-jeddah": {
    descriptionAr: `توريفا للمقاولات — بناء، ترميم، وتوسعات للمشاريع السكنية والضيافة في جدة.

• مقاول عام معتمد لـ Ruwaq PRO
• ملاحق، عظم، وترميم فنادق وفلل
• تنسيق مع استوديوهات Graphics House للتصور قبل التنفيذ
• SLA واضح ومحاضر استلام مرحلية`,
    descriptionEn: `Turriva General Contracting — build, renovation, and extensions for residential and hospitality in Jeddah.

• Ruwaq PRO verified general contractor
• Annexes, shell works, and hotel/villa renovation
• Coordinates with Graphics House for pre-build visualization
• Clear SLA and phased handover minutes`,
    phone: RUWQ_SUPPORT_WHATSAPP_E164,
    whatsapp: RUWQ_SUPPORT_WHATSAPP_E164,
    isFeatured: true,
    directoryTier: "PRO",
    images: LISTING_SEED_IMAGE_POOLS.contracting.slice(0, 4),
  },
  "graphics-house-visualization-jeddah": {
    descriptionAr: `Graphics House (GH) — التصوير المعماري، التصور ثلاثي الأبعاد، وProjectLaunch™ للمطورين.

• شريك Ruwaq للتصور قبل التشطيب والتسويق
• Renders، أفلام، وshowrooms ذكية للمشاريع العقارية
• تكامل مع توريفا للتنفيذ الميداني
• مسار Ruwaq /visualization للتسجيل السريع`,
    descriptionEn: `Graphics House (GH) — architectural visualization, 3D CGI, and ProjectLaunch™ for developers.

• Ruwaq visualization partner before fit-out and sales marketing
• Renders, films, and smart showrooms for real estate launches
• Integrated with Turriva for site execution
• Fast intake via Ruwaq /visualization`,
    phone: RUWQ_SUPPORT_WHATSAPP_E164,
    whatsapp: RUWQ_SUPPORT_WHATSAPP_E164,
    isFeatured: true,
    directoryTier: "PRO",
    images: [
      MARKETING_IMAGES.ghStudio,
      MARKETING_IMAGES.architecturalModel,
      ...LISTING_SEED_IMAGE_POOLS["luxury-materials"].slice(0, 3),
    ],
  },
  "arkan-kitchens-jeddah": {
    descriptionAr: `استوديو الأركان — مطابخ وخزائن فاخرة حسب الطلب في جدة.

• خشبيات ألمانية، quartz، وwalk-in pantries
• شريك معتمد في جولة فيلا شمال جدة
• قياس ميداني، تصنيع، وتركيب خلال 6–8 أسابيع
• Ruwaq PRO — قطاع المطابخ والخزائن`,
    descriptionEn: `Arkan Luxury Kitchens — bespoke kitchens and joinery in Jeddah.

• German joinery, quartz tops, and walk-in pantries
• Verified partner on the North Jeddah villa tour
• Site survey, manufacture, and install in 6–8 weeks
• Ruwaq PRO — kitchens & custom joinery`,
    phone: "+966920012304",
    whatsapp: "+966920012304",
    isFeatured: true,
    directoryTier: "PRO",
    images: [...LISTING_SEED_IMAGE_POOLS.kitchens],
  },
  "sorouh-gharbiya-hvac-jeddah": {
    descriptionAr: `صروح الغربية — تكييف VRF مخفي وصيانة للفلل والفنادق في جدة.

• تركيب وصيانة أنظمة concealed VRF
• شريك جولة فيلا شمال جدة
• عقود صيانة موسمية للمشاريع السكنية
• Ruwaq PRO — قطاع التكييف`,
    descriptionEn: `Sorouh Al-Gharbiya — concealed VRF HVAC and maintenance for villas and hotels in Jeddah.

• VRF concealed install and service
• North Jeddah villa tour partner
• Seasonal maintenance plans for residential projects
• Ruwaq PRO — HVAC sector`,
    phone: "+966920012305",
    whatsapp: "+966920012305",
    isFeatured: true,
    directoryTier: "PRO",
    images: [...LISTING_SEED_IMAGE_POOLS.hvac],
  },
  "namat-mimar-makkah": {
    descriptionAr: `شركة نمط المعمار — تشطيب وحدات ضيافة ومشاريع فندقية في مكة.

• 120+ وحدة في مشروع عمارة فندقية (جولة رواق)
• مواد مقاومة للرطوبة ومعايير ضيافة
• جبس acoustic وبورسلان للمناطق الرطبة
• Ruwaq PRO معتمد — التشطيبات`,
    descriptionEn: `Namat Al-Mi'mar — hospitality unit fit-out and hotel-grade finishing in Makkah.

• 120+ units on a serviced tower project (Ruwaq tour)
• Moisture-resistant materials and hospitality standards
• Acoustic gypsum and porcelain for wet areas
• Ruwaq PRO verified — fit-out`,
    phone: "+966920012306",
    whatsapp: "+966920012306",
    isFeatured: true,
    directoryTier: "PRO",
    images: [
      TOUR_IMAGES.makkahHero,
      ...TOUR_IMAGES.makkahGallery,
      MARKETING_IMAGES.interiorLounge,
    ],
  },
  "haram-breeze-hvac-makkah": {
    descriptionAr: `نسيم الحرم — تكييف مركزي وVRF للمشاريع السكنية والضيافة في مكة.

• شريك جولة عمارة فندقية مكة
• صيانة تكييف فنادق وعمائر سكنية
• Ruwaq PRO — التكييف والتهوية`,
    descriptionEn: `Haram Breeze HVAC — central and VRF systems for residential and hospitality in Makkah.

• Makkah serviced tower tour partner
• Hotel and residential tower AC maintenance
• Ruwaq PRO — HVAC`,
    phone: "+966920012307",
    whatsapp: "+966920012307",
    isFeatured: true,
    directoryTier: "PRO",
    images: [...LISTING_SEED_IMAGE_POOLS.hvac],
  },
  "vision-makan-madinah": {
    descriptionAr: `مؤسسة رؤية المكان — تصميم داخلي وخارجي وdeck/pergola للفلل في المدينة.

• شريك جولة فيلا المدينة — مساحات outdoor living
• تكامل مع اللاندسكيب والإضاءة الخارجية
• Ruwaq PRO — اللاندسكيب والمساحات الخارجية`,
    descriptionEn: `Vision of Place Design — interior, outdoor decks, and pergolas for Madinah villas.

• Madinah villa tour partner — outdoor living suites
• Integrated with landscaping and exterior lighting
• Ruwaq PRO — outdoor & landscape`,
    phone: "+966920012308",
    whatsapp: "+966920012308",
    isFeatured: true,
    directoryTier: "PRO",
    images: [
      TOUR_IMAGES.madinahHero,
      ...TOUR_IMAGES.madinahGallery,
      MARKETING_IMAGES.hero,
    ],
  },
  "green-oasis-madinah": {
    descriptionAr: `الواحة الخضراء — تنسيق حدائق، ري ذكي، وزراعة للفلل في المدينة.

• شريك جولة فيلا المدينة
• مسابح family-size وpath lighting مخفي
• Ruwaq PRO — اللاندسكيب`,
    descriptionEn: `Green Oasis Landscaping — gardens, smart irrigation, and planting for Madinah villas.

• Madinah villa tour partner
• Family pools and concealed path lighting
• Ruwaq PRO — landscaping`,
    phone: "+966920012309",
    whatsapp: "+966920012309",
    isFeatured: true,
    directoryTier: "PRO",
    images: [...LISTING_SEED_IMAGE_POOLS.outdoor],
  },
  "marble-crown-jeddah": {
    descriptionAr: `تاج الرخام — توريد رخام وجرانيت فاخر للواجهات والأرضيات في جدة.

• Calacatta، Travertine، وقطع حسب المقاس
• مورد trade معتمد لـ Ruwaq PRO
• تنسيق مع مقاولي التشطيب في الدليل`,
    descriptionEn: `Marble Crown Trading — premium marble and granite for facades and floors in Jeddah.

• Calacatta, travertine, and cut-to-size slabs
• Ruwaq PRO verified trade supplier
• Works with fit-out contractors in the directory`,
    phone: "+966920012310",
    whatsapp: "+966920012310",
    isFeatured: true,
    directoryTier: "PRO",
    images: [...LISTING_SEED_IMAGE_POOLS["luxury-materials"]],
  },
};

export const SHOWCASE_LISTING_SLUGS = [...CURATED_PRO_SLUGS];

export function applyShowcaseListingOverrides(seeds: ListingSeed[]): ListingSeed[] {
  return seeds.map((seed) => {
    const patch = OVERRIDES[seed.slug];
    if (!patch) return seed;
    return { ...seed, ...patch };
  });
}
