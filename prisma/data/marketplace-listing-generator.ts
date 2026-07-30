import type { MarketplaceCity, RuwaqTier } from "@prisma/client";
import {
  MARKETPLACE_CATEGORIES,
  type MarketplaceCategorySlug,
  type ProviderType,
} from "../../src/shared/constants/marketplace-taxonomy";

export type ListingSeed = {
  categorySlug: string;
  city: MarketplaceCity;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  phone: string;
  whatsapp: string;
  address: string;
  isVerified: boolean;
  isFeatured: boolean;
  directoryTier: RuwaqTier;
  providerType: ProviderType;
  images: string[];
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop";

const CITIES: MarketplaceCity[] = ["JEDDAH", "MAKKAH", "MADINAH"];

const CITY_META: Record<
  MarketplaceCity,
  { slug: string; nameAr: string; nameEn: string; districts: string[] }
> = {
  JEDDAH: {
    slug: "jeddah",
    nameAr: "جدة",
    nameEn: "Jeddah",
    districts: ["حي المحمدية", "حي الشاطئ", "حي الروضة", "حي النزهة", "حي الصفا", "حي البوادي"],
  },
  MAKKAH: {
    slug: "makkah",
    nameAr: "مكة المكرمة",
    nameEn: "Makkah",
    districts: ["حي العزيزية", "حي الزاهر", "حي النسيم", "حي الشرائع", "حي العوالي", "حي المعابدة"],
  },
  MADINAH: {
    slug: "madinah",
    nameAr: "المدينة المنورة",
    nameEn: "Madinah",
    districts: ["حي العوالي", "حي بدر", "حي الحرم", "حي الأزهري", "حي العريض", "حي بني ظفر"],
  },
};

type CompanyDef = {
  slugKey: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: (cityAr: string) => string;
  descriptionEn: (cityEn: string) => string;
};

type CategoryCatalog = {
  slug: MarketplaceCategorySlug;
  providerType: ProviderType;
  companies: CompanyDef[];
};

const CATEGORY_CATALOG: CategoryCatalog[] = [
  {
    slug: "fit-out",
    providerType: "EXECUTOR",
    companies: [
      {
        slugKey: "turriva-fitout",
        titleAr: "توريفا للتصميم الداخلي والتشطيبات",
        titleEn: "Turriva Interior Design & Fit-Out",
        descriptionAr: (c) =>
          `تشطيب فاخر للفلل والقصور والمقرات التجارية في ${c} — تصميم داخلي، جبس، أرضيات، ورخام بمعايير تنفيذية عالية.`,
        descriptionEn: (c) =>
          `Luxury fit-out for villas, palaces, and commercial premises in ${c} — interior design, gypsum, flooring, and marble to executive standards.`,
      },
      {
        slugKey: "afq-interior",
        titleAr: "استوديو أفق للتصميم الداخلي",
        titleEn: "Afq Interior Design Studio",
        descriptionAr: (c) =>
          `تصميم وتنفيذ داخلي معاصر للفلل السكنية في ${c} — مطابخ مدمجة، غرف معيشة، ومساحات ضيافة بمواد فاخرة.`,
        descriptionEn: (c) =>
          `Contemporary interior design and execution for residential villas in ${c} — integrated kitchens, living suites, and hospitality spaces.`,
      },
      {
        slugKey: "lamsat-raha",
        titleAr: "مؤسسة لمسة رخاء للتشطيبات",
        titleEn: "Lamsat Raha Fit-Out",
        descriptionAr: (c) =>
          `تشطيبات كاملة للشقق والفلل في ${c} — دهانات، أرضيات porcelain، وأعمال جبس بجودة معتمدة.`,
        descriptionEn: (c) =>
          `Turnkey finishing for apartments and villas in ${c} — paint, porcelain flooring, and gypsum works with verified quality.`,
      },
      {
        slugKey: "namat-mimar",
        titleAr: "شركة نمط المعمار للديكور",
        titleEn: "Namat Al-Mi'mar Decor",
        descriptionAr: (c) =>
          `ديكور داخلي فندقي وسكني في ${c} — تشطيب وحدات الإيجار اليومي والشقق المفروشة بمعايير ضيافة عالية.`,
        descriptionEn: (c) =>
          `Hotel-grade and residential interior decor in ${c} — fit-out for serviced apartments and furnished units.`,
      },
      {
        slugKey: "luxury-home-group",
        titleAr: "مجموعة البيت الفاخر للتشطيب",
        titleEn: "Luxury Home Fit-Out Group",
        descriptionAr: (c) =>
          `تشطيب فلل فاخرة في ${c} — رخام، خشبيات، وإضاءة مخفية مع فريق تصميم وتنفيذ متكامل.`,
        descriptionEn: (c) =>
          `Luxury villa fit-out in ${c} — marble, joinery, and concealed lighting with integrated design-build team.`,
      },
      {
        slugKey: "vision-makan",
        titleAr: "مؤسسة رؤية المكان للتصميم",
        titleEn: "Vision of Place Design",
        descriptionAr: (c) =>
          `تحويل المساحات السكنية والتجارية في ${c} — من المخطط إلى التسليم مع إشراف يومي على جودة التشطيب.`,
        descriptionEn: (c) =>
          `Residential and commercial space transformation in ${c} — from concept to handover with daily finish-quality oversight.`,
      },
    ],
  },
  {
    slug: "contracting",
    providerType: "EXECUTOR",
    companies: [
      {
        slugKey: "turriva-contracting",
        titleAr: "توريفا للمقاولات والترميم",
        titleEn: "Turriva General Contracting & Renovation",
        descriptionAr: (c) =>
          `مقاولات عامة وترميم فندقي وسكني في ${c} — بناء عظم، توسعات، وتأهيل المباني القائمة بإشراف هندسي.`,
        descriptionEn: (c) =>
          `General contracting and hotel/residential renovation in ${c} — structural shell, extensions, and building rehabilitation.`,
      },
      {
        slugKey: "namadhij-emar",
        titleAr: "مؤسسة نماذج الإعمار للمقاولات",
        titleEn: "Namadhij Al-Emar Contracting",
        descriptionAr: (c) =>
          `بناء وترميم المباني السكنية والتجارية في ${c} — ملاحق، توسعات، وأعمال عظم بفريق مهندسين معتمد.`,
        descriptionEn: (c) =>
          `Residential and commercial build and renovation in ${c} — annexes, extensions, and structural works.`,
      },
      {
        slugKey: "precision-building",
        titleAr: "شركة البناء المتقن",
        titleEn: "Precision Building Co.",
        descriptionAr: (c) =>
          `مقاولات بناء فلل وقصور في ${c} — تنفيذ دقيق للهيكل الإنشائي والتشطيبات الأولية.`,
        descriptionEn: (c) =>
          `Villa and palace construction in ${c} — precise structural execution and primary finishing packages.`,
      },
      {
        slugKey: "qawaid-shamikh",
        titleAr: "مؤسسة قواعد الشامخ للإنشاءات",
        titleEn: "Qawa'id Al-Shamikh Construction",
        descriptionAr: (c) =>
          `ترميم وتأهيل فنادق ومباني تجارية في ${c} — أعمال إنشائية، MEP rough-in، وتسليم للتشطيب.`,
        descriptionEn: (c) =>
          `Hotel and commercial building renovation in ${c} — structural works, MEP rough-in, and shell handover.`,
      },
      {
        slugKey: "golden-foundation",
        titleAr: "شركة التأسيس الذهبي للمقاولات",
        titleEn: "Golden Foundation Contracting",
        descriptionAr: (c) =>
          `مقاولات عامة للمشاريع السكنية الفاخرة في ${c} — إدارة موقع، جدولة، وتنسيق مع استشاري الإشراف.`,
        descriptionEn: (c) =>
          `General contracting for luxury residential projects in ${c} — site management, scheduling, and consultant coordination.`,
      },
      {
        slugKey: "solid-structure",
        titleAr: "مؤسسة هيكل المتين",
        titleEn: "Solid Structure Co.",
        descriptionAr: (c) =>
          `بناء عظم وملاحق سكنية في ${c} — خرسانة، حديد، وعزل أساسات بمواصفات SBC.`,
        descriptionEn: (c) =>
          `Structural shell and residential annexes in ${c} — concrete, steel, and foundation waterproofing to SBC specs.`,
      },
    ],
  },
  {
    slug: "supervision",
    providerType: "CONSULTANT",
    companies: [
      {
        slugKey: "rakaiz-engineering",
        titleAr: "مكتب ركائز للاستشارات الهندسية",
        titleEn: "Raka'iz Engineering Consultancy",
        descriptionAr: (c) =>
          `إشراف هندسي على مشاريع الفلل والمكاتب في ${c} — تقارير أسبوعية، RFI، ومحاضر استلام مراحل.`,
        descriptionEn: (c) =>
          `Engineering supervision for villas and offices in ${c} — weekly reports, RFIs, and phase sign-off minutes.`,
      },
      {
        slugKey: "pro-supervision",
        titleAr: "شركة إشراف برو للمشاريع",
        titleEn: "Pro Supervision Projects",
        descriptionAr: (c) =>
          `إشراف ميداني وإدارة جودة في ${c} — متابعة المقاول، مطابقة المخططات، وتوثيق بالصور.`,
        descriptionEn: (c) =>
          `Site supervision and quality management in ${c} — contractor oversight, drawing compliance, and photo documentation.`,
      },
      {
        slugKey: "engineer-lens",
        titleAr: "مؤسسة عدسة المهندس للإشراف",
        titleEn: "Engineer Lens Supervision",
        descriptionAr: (c) =>
          `استشارات وإشراف على التشطيبات الفاخرة في ${c} — مراجعة BOQ، اعتماد المواد، وزيارات دورية.`,
        descriptionEn: (c) =>
          `Consultancy and supervision on luxury fit-out in ${c} — BOQ review, material approval, and periodic visits.`,
      },
      {
        slugKey: "quality-paths",
        titleAr: "مكتب مسارات الجودة الهندسية",
        titleEn: "Quality Paths Engineering Office",
        descriptionAr: (c) =>
          `إشراف على مشاريع سكنية وتجارية في ${c} — ضبط جودة، سلامة موقع، وتنسيق مع الدفاع المدني.`,
        descriptionEn: (c) =>
          `Supervision for residential and commercial projects in ${c} — QA/QC, site safety, and civil defense coordination.`,
      },
      {
        slugKey: "supervision-horizon",
        titleAr: "شركة أفق الإشراف الهندسي",
        titleEn: "Supervision Horizon Co.",
        descriptionAr: (c) =>
          `إشراف هندسي شامل في ${c} — من الأساسات حتى التسليم النهائي مع تقارير PDF للمالك.`,
        descriptionEn: (c) =>
          `Full engineering supervision in ${c} — from foundations to final handover with owner PDF reports.`,
      },
      {
        slugKey: "building-assurance",
        titleAr: "مؤسسة ضمان البناء للاستشارات",
        titleEn: "Building Assurance Consultancy",
        descriptionAr: (c) =>
          `استشارات فنية وإشراف على الترميم في ${c} — تقييم حالة المبنى وخطة إصلاح معتمدة.`,
        descriptionEn: (c) =>
          `Technical consultancy and renovation supervision in ${c} — building condition assessment and approved repair plans.`,
      },
    ],
  },
  {
    slug: "hvac",
    providerType: "EXECUTOR",
    companies: [
      {
        slugKey: "abaad-cooling",
        titleAr: "مؤسسة أبعاد البرودة للتكييف المركزي",
        titleEn: "Abaad Cooling Central HVAC",
        descriptionAr: (c) =>
          `توريد وتركيب تكييف مركزي ودكت للمباني في ${c} — صيانة دورية معتمدة وعقود تشغيل.`,
        descriptionEn: (c) =>
          `Central AC and ducting supply and install in ${c} — certified periodic maintenance and O&M contracts.`,
      },
      {
        slugKey: "bahja-climate",
        titleAr: "شركة بهجة المناخ للتكييف",
        titleEn: "Bahja Climate HVAC",
        descriptionAr: (c) =>
          `أنظمة VRF وسبليت للفلل والمكاتب في ${c} — تركيب، صيانة، وطوارئ 24/7.`,
        descriptionEn: (c) =>
          `VRF and split systems for villas and offices in ${c} — install, maintenance, and 24/7 emergency.`,
      },
      {
        slugKey: "sorouh-gharbiya",
        titleAr: "مؤسسة صروح الغربية للتكييف",
        titleEn: "Sorouh Al-Gharbiya HVAC",
        descriptionAr: (c) =>
          `تكييف الفلل الفاخرة والأبراج السكنية في ${c} — حلول توفير طاقة وتكييف مخفي.`,
        descriptionEn: (c) =>
          `AC for luxury villas and residential towers in ${c} — energy-saving and concealed AC solutions.`,
      },
      {
        slugKey: "haram-breeze",
        titleAr: "شركة نسيم الحرم للتكييف",
        titleEn: "Haram Breeze HVAC",
        descriptionAr: (c) =>
          `تكييف فنادق وعمائر فندقية في ${c} — أنظمة عالية الكفاءة للضيافة على مدار العام.`,
        descriptionEn: (c) =>
          `AC for hotels and serviced towers in ${c} — high-efficiency hospitality systems year-round.`,
      },
      {
        slugKey: "mizan-climate",
        titleAr: "مؤسسة ميزان للأنظمة المناخية",
        titleEn: "Mizan Climate Systems",
        descriptionAr: (c) =>
          `صيانة تكييف المستشفيات والمجمعات في ${c} — فريق فني معتمد وقطع غيار أصلية.`,
        descriptionEn: (c) =>
          `Hospital and compound AC maintenance in ${c} — certified technicians and genuine spare parts.`,
      },
      {
        slugKey: "barid-jazeera",
        titleAr: "شركة بارِد الجزيرة للتبريد",
        titleEn: "Barid Al-Jazeera Cooling",
        descriptionAr: (c) =>
          `تبريد مركزي للمكاتب والمراكز التجارية في ${c} — VRF، كاسيت، وعقود تشغيل سنوية.`,
        descriptionEn: (c) =>
          `Central cooling for offices and malls in ${c} — VRF, cassette, and annual O&M contracts.`,
      },
    ],
  },
  {
    slug: "kitchens",
    providerType: "EXECUTOR",
    companies: [
      {
        slugKey: "arkan-kitchens",
        titleAr: "استوديو الأركان للمطابخ الفاخرة",
        titleEn: "Arkan Luxury Kitchens Studio",
        descriptionAr: (c) =>
          `تصميم وتصنيع مطابخ فاخرة حسب الطلب في ${c} — خشبيات ألمانية، quartz، وخزائن walk-in.`,
        descriptionEn: (c) =>
          `Bespoke luxury kitchen design and manufacture in ${c} — German joinery, quartz tops, and walk-in pantries.`,
      },
      {
        slugKey: "rawaa-joinery",
        titleAr: "مؤسسة رواء للخزائن والمطابخ",
        titleEn: "Rawaa Joinery & Kitchens",
        descriptionAr: (c) =>
          `مطابخ وdressing rooms للفلل في ${c} — قياس ميداني، تصنيع محلي، وتركيب خلال 6 أسابيع.`,
        descriptionEn: (c) =>
          `Kitchens and dressing rooms for villas in ${c} — site survey, local manufacture, 6-week install.`,
      },
      {
        slugKey: "chef-corner",
        titleAr: "شركة ركن الشيف للمطابخ",
        titleEn: "Chef Corner Kitchens",
        descriptionAr: (c) =>
          `مطابخ عصرية ومفتوحة للفلل السكنية في ${c} — جزيرة central، أجهزة built-in، وإضاءة LED.`,
        descriptionEn: (c) =>
          `Modern open-plan kitchens for residential villas in ${c} — central islands, built-in appliances, LED lighting.`,
      },
      {
        slugKey: "woodcraft-elite",
        titleAr: "مؤسسة النجارة الراقية",
        titleEn: "Elite Woodcraft Joinery",
        descriptionAr: (c) =>
          `أعمال خشبية تخصصية في ${c} — مطابخ، مكتبات، وخزائن TV بجودة فندقية.`,
        descriptionEn: (c) =>
          `Specialist woodwork in ${c} — kitchens, libraries, and TV units to hospitality-grade quality.`,
      },
      {
        slugKey: "majlis-kitchen",
        titleAr: "شركة مطابخ المجلس",
        titleEn: "Majlis Kitchen Co.",
        descriptionAr: (c) =>
          `مطابخ ومساحات ضيافة للقصور في ${c} — تصميم يراعي المطبخ الخفي ومنطقة التقديم.`,
        descriptionEn: (c) =>
          `Kitchens and hospitality prep for palaces in ${c} — designs for concealed kitchens and service zones.`,
      },
      {
        slugKey: "silk-road-kitchens",
        titleAr: "استوديو طريق الحرير للمطابخ",
        titleEn: "Silk Road Kitchen Studio",
        descriptionAr: (c) =>
          `مطابخ فاخرة مستوردة ومحلية في ${c} — استشارة تصميم، 3D، وتنفيذ متكامل.`,
        descriptionEn: (c) =>
          `Imported and locally crafted luxury kitchens in ${c} — design consultation, 3D, and turnkey install.`,
      },
    ],
  },
  {
    slug: "luxury-materials",
    providerType: "SUPPLIER",
    companies: [
      {
        slugKey: "rowad-lighting",
        titleAr: "شركة الرواد للإضاءة المعمارية",
        titleEn: "Al-Rowad Architectural Lighting",
        descriptionAr: (c) =>
          `توريد إضاءة معمارية وديكورية في ${c} — LED، track lights، وثريات فاخرة للفلل والفنادق.`,
        descriptionEn: (c) =>
          `Architectural and decorative lighting supply in ${c} — LED, track lights, and luxury chandeliers.`,
      },
      {
        slugKey: "marble-crown",
        titleAr: "مؤسسة تاج الرخام",
        titleEn: "Marble Crown Trading",
        descriptionAr: (c) =>
          `توريد رخام وجرانيت فاخر في ${c} — Calacatta، Travertine، وقطع حسب المقاس للواجهات والأرضيات.`,
        descriptionEn: (c) =>
          `Premium marble and granite supply in ${c} — Calacatta, travertine, and cut-to-size for facades and floors.`,
      },
      {
        slugKey: "lumen-design-supply",
        titleAr: "شركة لومن لتجهيزات التصميم",
        titleEn: "Lumen Design Supply",
        descriptionAr: (c) =>
          `مواد تشطيب فاخرة في ${c} — sanitary ware، صنابير، وإكسسوارات حمامات فندقية.`,
        descriptionEn: (c) =>
          `Luxury finish materials in ${c} — sanitary ware, faucets, and hotel-grade bathroom accessories.`,
      },
      {
        slugKey: "stone-gallery",
        titleAr: "معرض الحجر الفاخر",
        titleEn: "Luxury Stone Gallery",
        descriptionAr: (c) =>
          `معرض مواد طبيعية في ${c} — رخام، أونيكس، وجرانيت مع استشارة للمصممين والمقاولين.`,
        descriptionEn: (c) =>
          `Natural materials showroom in ${c} — marble, onyx, and granite with designer and contractor support.`,
      },
      {
        slugKey: "ambient-light",
        titleAr: "شركة الإضاءة المحيطة",
        titleEn: "Ambient Light Trading",
        descriptionAr: (c) =>
          `حلول إضاءة ذكية للمشاريع السكنية في ${c} — DALI، dimming، وإضاءة مخفية.`,
        descriptionEn: (c) =>
          `Smart lighting solutions for residential projects in ${c} — DALI, dimming, and concealed lighting.`,
      },
      {
        slugKey: "trade-atelier",
        titleAr: "مؤسسة أتيليه التوريد",
        titleEn: "Trade Atelier Supply",
        descriptionAr: (c) =>
          `مورد trade للمصممين في ${c} — بلاط فاخر، ورق جدران، ومواد acoustic للمكاتب.`,
        descriptionEn: (c) =>
          `Trade supplier for designers in ${c} — premium tile, wallcoverings, and acoustic materials.`,
      },
    ],
  },
  {
    slug: "outdoor",
    providerType: "EXECUTOR",
    companies: [
      {
        slugKey: "green-oasis",
        titleAr: "مؤسسة الواحة الخضراء للاندسكيب",
        titleEn: "Green Oasis Landscaping",
        descriptionAr: (c) =>
          `تنسيق حدائق فلل وقصور في ${c} — زراعة، ري ذكي، ومسطحات خضراء بمعايير فاخرة.`,
        descriptionEn: (c) =>
          `Villa and palace landscaping in ${c} — planting, smart irrigation, and premium lawns.`,
      },
      {
        slugKey: "paradise-pools",
        titleAr: "شركة جنة المسابح",
        titleEn: "Paradise Pools & Outdoor",
        descriptionAr: (c) =>
          `مسابح وشلالات خارجية في ${c} — تصميم، تنفيذ، وصيانة موسمية للفلل الساحلية.`,
        descriptionEn: (c) =>
          `Outdoor pools and water features in ${c} — design, build, and seasonal maintenance for coastal villas.`,
      },
      {
        slugKey: "garden-lines",
        titleAr: "مؤسسة خطوط الحديقة",
        titleEn: "Garden Lines Landscape",
        descriptionAr: (c) =>
          `لاندسكape معاصر في ${c} — hardscape، pergolas، وإضاءة خارجية متكاملة.`,
        descriptionEn: (c) =>
          `Contemporary landscaping in ${c} — hardscape, pergolas, and integrated exterior lighting.`,
      },
      {
        slugKey: "palm-grove",
        titleAr: "شركة بساتين النخيل",
        titleEn: "Palm Grove Outdoor Design",
        descriptionAr: (c) =>
          `حدائق ومساحات خارجية للفنادق في ${c} — نباتات محلية مقاومة للحرارة وتصميم sustainable.`,
        descriptionEn: (c) =>
          `Hotel gardens and outdoor spaces in ${c} — heat-tolerant native plants and sustainable design.`,
      },
      {
        slugKey: "terrace-living",
        titleAr: "مؤسسة تراس المعيشة",
        titleEn: "Terrace Living Outdoor",
        descriptionAr: (c) =>
          `تراسات وroof gardens في ${c} — أثاث خارجي، مظلات، ودهانات مقاومة للطقس.`,
        descriptionEn: (c) =>
          `Terraces and roof gardens in ${c} — outdoor furniture, shading, and weather-resistant finishes.`,
      },
      {
        slugKey: "nature-craft",
        titleAr: "شركة حرفة الطبيعة",
        titleEn: "Nature Craft Landscaping",
        descriptionAr: (c) =>
          `تنسيق حدائق سكنية في ${c} — ممرات، شجيرات، وإضاءة path lights للفلل الحديثة.`,
        descriptionEn: (c) =>
          `Residential garden design in ${c} — pathways, shrubs, and path lighting for modern villas.`,
      },
    ],
  },
  {
    slug: "maintenance",
    providerType: "EXECUTOR",
    companies: [
      {
        slugKey: "shield-fm",
        titleAr: "شركة درع الصيانة لتشغيل المباني",
        titleEn: "Shield FM & Maintenance",
        descriptionAr: (c) =>
          `عقود صيانة سنوية للفلل والمكاتب في ${c} — كهرباء، سباكة، وتكييف ضمن SLA واضح.`,
        descriptionEn: (c) =>
          `Annual maintenance contracts for villas and offices in ${c} — electrical, plumbing, and AC under clear SLA.`,
      },
      {
        slugKey: "roof-seal",
        titleAr: "مؤسسة ختم السقف للعزل",
        titleEn: "Roof Seal Waterproofing",
        descriptionAr: (c) =>
          `عزل أسطح وخزانات في ${c} — فوم، epoxy، ومعالجة تسربات بضمان يصل 10 سنوات.`,
        descriptionEn: (c) =>
          `Roof and tank waterproofing in ${c} — foam, epoxy, and leak treatment with up to 10-year warranty.`,
      },
      {
        slugKey: "care-villa",
        titleAr: "شركة رعاية الفيلا للصيانة",
        titleEn: "Villa Care Maintenance",
        descriptionAr: (c) =>
          `صيانة دورية للفلل الفاخرة في ${c} — زيارات شهرية، تقارير، وطوارئ.`,
        descriptionEn: (c) =>
          `Periodic maintenance for luxury villas in ${c} — monthly visits, reports, and emergency response.`,
      },
      {
        slugKey: "building-pulse",
        titleAr: "مؤسسة نبض المباني",
        titleEn: "Building Pulse FM",
        descriptionAr: (c) =>
          `تشغيل وصيانة مباني تجارية في ${c} — BMS، مصاعد، وHVAC ضمن عقد FM شامل.`,
        descriptionEn: (c) =>
          `Commercial building O&M in ${c} — BMS, elevators, and HVAC under comprehensive FM contracts.`,
      },
      {
        slugKey: "rapid-fix",
        titleAr: "شركة الإصلاح السريع",
        titleEn: "Rapid Fix Maintenance",
        descriptionAr: (c) =>
          `صيانة طوارئ 24/7 في ${c} — سباكة، كهرباء، وأبواب أمنية للمنازل والمحلات.`,
        descriptionEn: (c) =>
          `24/7 emergency maintenance in ${c} — plumbing, electrical, and security doors for homes and retail.`,
      },
      {
        slugKey: "preserve-home",
        titleAr: "مؤسسة حفظ المنزل",
        titleEn: "Preserve Home Maintenance",
        descriptionAr: (c) =>
          `برامج صيانة وقائية للفلل في ${c} — فحص ما قبل الموسم، تنظيف AC، وفحص كهرباء.`,
        descriptionEn: (c) =>
          `Preventive villa maintenance programs in ${c} — pre-season checks, AC cleaning, and electrical inspection.`,
      },
    ],
  },
];

const COMPANIES_PER_CELL = 6;
const EXPECTED_LISTING_COUNT =
  MARKETPLACE_CATEGORIES.length * CITIES.length * COMPANIES_PER_CELL;

function tierForIndex(index: number): RuwaqTier {
  return index < 2 ? "PRO" : "VERIFIED";
}

function assertListingSeeds(seeds: ListingSeed[]): void {
  if (seeds.length !== EXPECTED_LISTING_COUNT) {
    throw new Error(
      `Expected ${EXPECTED_LISTING_COUNT} listing seeds, got ${seeds.length}`
    );
  }

  const slugs = seeds.map((s) => s.slug);
  const phones = seeds.map((s) => s.phone);
  const slugDupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  const phoneDupes = phones.filter((p, i) => phones.indexOf(p) !== i);

  if (slugDupes.length > 0) {
    throw new Error(
      `Duplicate listing slugs: ${[...new Set(slugDupes)].join(", ")}`
    );
  }
  if (phoneDupes.length > 0) {
    throw new Error(
      `Duplicate listing phones: ${[...new Set(phoneDupes)].join(", ")}`
    );
  }
  if (seeds.some((s) => !s.isVerified)) {
    throw new Error("All listing seeds must set isVerified: true");
  }

  for (let i = 0; i < seeds.length; i++) {
    const expectedPhone = `+966551234${String(i + 1).padStart(3, "0")}`;
    if (seeds[i].phone !== expectedPhone) {
      throw new Error(
        `Listing #${i + 1} (${seeds[i].slug}) expected phone ${expectedPhone}, got ${seeds[i].phone}`
      );
    }
  }
}

export function buildMarketplaceListingSeeds(): ListingSeed[] {
  const seeds: ListingSeed[] = [];
  let phoneIndex = 1;

  for (const catalog of CATEGORY_CATALOG) {
    if (catalog.companies.length !== COMPANIES_PER_CELL) {
      throw new Error(
        `Category ${catalog.slug} must have ${COMPANIES_PER_CELL} companies, got ${catalog.companies.length}`
      );
    }

    for (const city of CITIES) {
      const meta = CITY_META[city];

      catalog.companies.forEach((company, index) => {
        const tier = tierForIndex(index);
        const slug = `${company.slugKey}-${meta.slug}`;
        const phone = `+966551234${String(phoneIndex).padStart(3, "0")}`;
        phoneIndex++;

        seeds.push({
          categorySlug: catalog.slug,
          city,
          slug,
          titleAr: company.titleAr,
          titleEn: company.titleEn,
          descriptionAr: company.descriptionAr(meta.nameAr),
          descriptionEn: company.descriptionEn(meta.nameEn),
          phone,
          whatsapp: phone,
          address: `${meta.nameAr} - ${meta.districts[index]}`,
          isVerified: true,
          isFeatured: tier === "PRO",
          directoryTier: tier,
          providerType: catalog.providerType,
          images: [DEFAULT_IMAGE],
        });
      });
    }
  }

  assertListingSeeds(seeds);
  return seeds;
}
