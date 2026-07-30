import type { MarketplaceCategorySlug, MarketplaceCitySlug } from "@/shared/constants/marketplace-taxonomy";

export type RuwaqGuide = {
  slug: string;
  citySlug?: MarketplaceCitySlug;
  categorySlug: MarketplaceCategorySlug;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  readMinutes: number;
  heroImage: string;
  bodyAr: string[];
  bodyEn: string[];
  ctaLabelAr: string;
  ctaLabelEn: string;
  publishedAt: string;
};

export const RUWQ_GUIDES: RuwaqGuide[] = [
  {
    slug: "marble-jeddah-climate",
    citySlug: "jeddah",
    categorySlug: "luxury-materials",
    titleAr: "كيف تختار الرخام المناسب لفلل جدة؟",
    titleEn: "Choosing marble for Jeddah villas",
    excerptAr:
      "الرطوبة والملوحة والاستخدام الخارجي — دليل عملي قبل الشراء.",
    excerptEn:
      "Humidity, salt air, and outdoor use — a practical guide before you buy.",
    readMinutes: 6,
    heroImage:
      "https://images.unsplash.com/photo-1615874959477-df969457a1eb?q=80&w=1200&auto=format&fit=crop",
    bodyAr: [
      "مناخ جدة الساحلي يفرض معايير مختلفة عن الداخل: الرطوبة العالية والملوحة قد تؤثر على بعض أنواع الرخام الناعم.",
      "للواجهات الخارجية: فضّل granite أو travertine مع معالجة sealant، وتجنب الرخام الناعم غير المعالج في المناطق المعرّضة للمطر.",
      "للأرضيات الداخلية: Calacatta و Carrara يعملان بشكل ممتاز في majlis ومداخل الفلل مع صيانة دورية.",
      "اطلب دائماً sample board من المورد واختبره في موقع المشروع قبل أمر الشراء الكامل.",
    ],
    bodyEn: [
      "Jeddah's coastal climate demands different specs than interiors: high humidity and salt air can affect soft marbles.",
      "For exterior facades: prefer granite or travertine with sealant treatment; avoid untreated soft marble in rain-exposed zones.",
      "For interior floors: Calacatta and Carrara work beautifully in majlis and entry halls with periodic maintenance.",
      "Always request a sample board from your supplier and test on-site before placing the full order.",
    ],
    ctaLabelAr: "تصفّح موردي المواد الفاخرة في جدة",
    ctaLabelEn: "Browse luxury material suppliers in Jeddah",
    publishedAt: "2025-10-01",
  },
  {
    slug: "concealed-vs-central-ac",
    citySlug: "jeddah",
    categorySlug: "hvac",
    titleAr: "التكييف المركزي أم المخفي (VRF) للفلل؟",
    titleEn: "Central AC vs concealed VRF for villas",
    excerptAr: "مقارنة التكلفة، الصيانة، والكفاءة في المشاريع السكنية الفاخرة.",
    excerptEn: "Cost, maintenance, and efficiency compared for luxury homes.",
    readMinutes: 5,
    heroImage:
      "https://images.unsplash.com/photo-1631545806606-4119a794c1a1?q=80&w=1200&auto=format&fit=crop",
    bodyAr: [
      "التكييف المركزي (ducted) مناسب للفلل الكبيرة مع توزيع متساوٍ وصوت منخفض — لكنه يتطلب مساحة سقف للدكت.",
      "أنظمة VRF/ concealed cassette توفر مرونة zone-by-zone وتوفير طاقة أفضل في الفلل متعددة الطوابق.",
      "في جدة: احرص على حساب heat load صحيح مع هامش 10–15% للرطوبة.",
      "اختر مقاولاً معتمداً يقدّم عقد صيانة سنوي — التكييف استثمار طويل الأمد.",
    ],
    bodyEn: [
      "Central ducted AC suits large villas with even distribution and low noise — but needs ceiling space for ducting.",
      "VRF and concealed cassette systems offer zone control and better energy savings in multi-storey villas.",
      "In Jeddah: ensure accurate heat-load calculations with a 10–15% margin for humidity.",
      "Choose a verified contractor offering an annual maintenance contract — AC is a long-term investment.",
    ],
    ctaLabelAr: "شركات التكييف المعتمدة في جدة",
    ctaLabelEn: "Verified HVAC companies in Jeddah",
    publishedAt: "2025-09-20",
  },
  {
    slug: "custom-kitchen-planning",
    citySlug: "jeddah",
    categorySlug: "kitchens",
    titleAr: "تخطيط المطبخ الفاخر قبل التشطيب",
    titleEn: "Planning a luxury kitchen before fit-out",
    excerptAr: "ترتيب workflow، نقاط الخدمات، واختيار الخامات.",
    excerptEn: "Workflow, MEP points, and material selection.",
    readMinutes: 7,
    heroImage:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop",
    bodyAr: [
      "المطبخ المخصص يُخطّط قبل أعمال التشطيب: حدّد triangle workflow (ثلاجة — حوض — موقد) مبكراً.",
      "تنسيق مع مقاول التشطيب لنقاط MEP (غاز، مياه، drainage، كهرباء) قبل الجبس.",
      "الخشبيات: MDF مغلف HPL للرطوبة، أو solid wood للـ island مع sealant مناسب.",
      "اطلب 3D render وsample door finish قبل التصنيع — التعديل بعد الإنتاج مكلف.",
    ],
    bodyEn: [
      "Custom kitchens are planned before fit-out: define the work triangle (fridge — sink — cooktop) early.",
      "Coordinate MEP points (gas, water, drainage, power) with your fit-out contractor before gypsum closes.",
      "Joinery: HPL-coated MDF for humidity zones, or solid wood on islands with proper sealant.",
      "Request 3D renders and door-finish samples before manufacture — post-production changes are costly.",
    ],
    ctaLabelAr: "استوديوهات المطابخ في جدة",
    ctaLabelEn: "Kitchen studios in Jeddah",
    publishedAt: "2025-09-10",
  },
  {
    slug: "engineering-supervision-basics",
    categorySlug: "supervision",
    titleAr: "متى تحتاج إشرافاً هندسياً مستقلاً؟",
    titleEn: "When do you need independent supervision?",
    excerptAr: "حماية المالك، جودة التنفيذ، ومحاضر الاستلام.",
    excerptEn: "Owner protection, execution quality, and sign-off minutes.",
    readMinutes: 5,
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    bodyAr: [
      "الإشراف الهندسي المستقل يحمي المالك عندما ينفّذ مقاول مختلف عن المصمم — أو في المشاريع فوق 2 مليون ريال.",
      "يتضمن: زيارات دورية، تقارير PDF، مطابقة BOQ، ومحاضر استلام مراحل.",
      "في رواق: مكاتب الإشراف المعتمدة مرتبطة بـ Proposal OS — نفس لغة العقود والشروط.",
      "لا تخلط بين «إشراف المقاول على نفسه» والإشراف المستقل — الفرق في الحياد والتوثيق.",
    ],
    bodyEn: [
      "Independent supervision protects owners when the executor differs from the designer — or on projects above SAR 2M.",
      "Scope includes: periodic visits, PDF reports, BOQ compliance, and phase sign-off minutes.",
      "On Ruwaq: verified supervision offices align with Proposal OS — shared contract language.",
      "Don't confuse contractor self-supervision with independent oversight — neutrality and documentation differ.",
    ],
    ctaLabelAr: "مكاتب الإشراف المعتمدة",
    ctaLabelEn: "Verified supervision consultants",
    publishedAt: "2025-08-25",
  },
  {
    slug: "villa-maintenance-contract",
    citySlug: "jeddah",
    categorySlug: "maintenance",
    titleAr: "عقد صيانة سنوي للفيلا — ماذا يشمل؟",
    titleEn: "Annual villa maintenance — what's included?",
    excerptAr: "SLA، الزيارات الدورية، وعزل الأسطح.",
    excerptEn: "SLA, periodic visits, and roof waterproofing.",
    readMinutes: 4,
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
    bodyAr: [
      "عقد FM السنوي للفلل ي typically يشمل: كهرباء، سباكة، تكييف، و فحص أسطح قبل موسم الأمطار.",
      "اطلب SLA مكتوباً: زمن استجابة الطوارئ (مثلاً 4 ساعات) وزيارات وقائية شهرية.",
      "عزل الأسطح والخزانات يُجدّد كل 5–7 سنوات — ادمجه في العقد أو كـ variation منفصل.",
      "شركات الصيانة المعتمدة في دليل رواق توفر تقارير بعد كل زيارة.",
    ],
    bodyEn: [
      "Annual villa FM contracts typically cover: electrical, plumbing, AC, and pre-rain season roof checks.",
      "Insist on a written SLA: emergency response time (e.g. 4 hours) and monthly preventive visits.",
      "Roof and tank waterproofing renews every 5–7 years — bundle it in the contract or as a separate variation.",
      "Verified maintenance firms in Ruwaq provide reports after every visit.",
    ],
    ctaLabelAr: "شركات الصيانة في جدة",
    ctaLabelEn: "Maintenance companies in Jeddah",
    publishedAt: "2025-08-15",
  },
  {
    slug: "landscape-madinah-villas",
    citySlug: "madinah",
    categorySlug: "outdoor",
    titleAr: "تنسيق حدائق فلل المدينة — نباتات مناسبة",
    titleEn: "Madinah villa landscaping — suitable plants",
    excerptAr: "نباتات مقاومة للحرارة وري ذكي.",
    excerptEn: "Heat-tolerant plants and smart irrigation.",
    readMinutes: 5,
    heroImage:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1200&auto=format&fit=crop",
    bodyAr: [
      "المدينة المنورة: درجات حرارة مرتفعة صيفاً — فضّل نباتات محلية مثل الاشجار الظل وال shrubs قليلة المياه.",
      "نظام الري: drip irrigation مع controller ذكي يوفر 30–40% من استهلاك المياه.",
      "الhardscape (بلاط، pergola) يُنفّذ قبل الزراعة — خطّط الإضاءة الخارجية مع اللاندسكiper.",
      "اطلب ضماناً على الري والزراعة لمدة 12 شهراً على الأقل.",
    ],
    bodyEn: [
      "Madinah summers are intense — prefer native shade trees and low-water shrubs.",
      "Irrigation: drip systems with smart controllers save 30–40% water versus manual watering.",
      "Hardscape (tile, pergola) comes before planting — plan exterior lighting with your landscaper.",
      "Request at least a 12-month warranty on irrigation and planting.",
    ],
    ctaLabelAr: "شركات اللاندسكيب في المدينة",
    ctaLabelEn: "Landscaping firms in Madinah",
    publishedAt: "2025-07-30",
  },
];

export function getGuide(slug: string): RuwaqGuide | undefined {
  return RUWQ_GUIDES.find((g) => g.slug === slug);
}
