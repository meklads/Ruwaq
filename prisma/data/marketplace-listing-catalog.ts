import type { MarketplaceCity } from "@prisma/client";
import { MARKETPLACE_LISTING_EXPANSION } from "./marketplace-listing-expansion";

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
  images: string[];
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop";

type CompanyDef = {
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  address: string;
};

type CatalogCell = {
  categorySlug: string;
  city: MarketplaceCity;
  companies: [CompanyDef, CompanyDef, CompanyDef];
};

const MARKETPLACE_LISTING_CATALOG: CatalogCell[] = [
  {
    categorySlug: "hvac",
    city: "JEDDAH",
    companies: [
      {
        slug: "abaad-cooling-hvac-jeddah",
        titleAr: "مؤسسة أبعاد البرودة للتكييف المركزي",
        titleEn: "Abaad Cooling Central HVAC",
        descriptionAr:
          "متخصصون في توريد وتركيب أنظمة التكييف المركزي والدكت للمباني السكنية والتجارية، مع صيانة دورية معتمدة.",
        descriptionEn:
          "Supply and install central AC and ducting for residential and commercial buildings, with certified periodic maintenance.",
        address: "جدة - طريق الملك فهد (60)، حي الصفا",
      },
      {
        slug: "bahja-climate-hvac-jeddah",
        titleAr: "شركة بهجة المناخ للتكييف والتهوية",
        titleEn: "Bahja Climate HVAC & Ventilation",
        descriptionAr:
          "تركيب وصيانة أنظمة VRF وسبليت للفلل والمكاتب بجدة، مع خدمة طوارئ على مدار الساعة.",
        descriptionEn:
          "VRF and split system install and maintenance for Jeddah villas and offices — 24/7 emergency service.",
        address: "جدة - حي النزهة، شارع الأمير سلطان",
      },
      {
        slug: "rawabi-cooling-jeddah",
        titleAr: "مؤسسة روابي البرودة للتبريد الصناعي",
        titleEn: "Rawabi Industrial Cooling",
        descriptionAr:
          "حلول التبريد للمستودعات والمصانع الغذائية، غرف التبريد والتجميد بمعايير HACCP.",
        descriptionEn:
          "Cold storage and freezing rooms for warehouses and food plants — HACCP-compliant standards.",
        address: "جدة - حي البوادي، طريق الأمير عبدالمجيد",
      },
    ],
  },
  {
    categorySlug: "hvac",
    city: "MAKKAH",
    companies: [
      {
        slug: "makh-alharmain-hvac-makkah",
        titleAr: "شركة مناخ الحرمين لتكييف الفنادق",
        titleEn: "Makh Al-Haramain Hotel HVAC",
        descriptionAr:
          "تنفيذ مشاريع التكييف للعمائر الفندقية وإسكان الحجاج بمكة المكرمة، أنظمة VRV وكونسيلد عالية الكفاءة.",
        descriptionEn:
          "Hotel tower and pilgrim housing AC projects in Makkah — high-efficiency VRV and concealed systems.",
        address: "مكة المكرمة - الشوقية، الشارع العام",
      },
      {
        slug: "safa-central-hvac-makkah",
        titleAr: "شركة صفا للتكييف المركزي",
        titleEn: "Safa Central HVAC",
        descriptionAr:
          "صيانة وتشغيل أنظمة التكييف المركزي للفنادق والعمائر السكنية في أحياء مكة الشمالية.",
        descriptionEn:
          "Central AC operation and maintenance for Makkah hotels and residential towers in northern districts.",
        address: "مكة المكرمة - حي العزيزية، طريق الحج",
      },
      {
        slug: "wadi-haram-cooling-makkah",
        titleAr: "مؤسسة وادي الحرم للتبريد",
        titleEn: "Wadi Al-Haram Cooling",
        descriptionAr:
          "توريد وتركيب وحدات التكييف للمشاريع السكنية الجديدة قرب المسجد الحرام بكفاءة طاقة عالية.",
        descriptionEn:
          "AC supply and install for new residential projects near the Grand Mosque — high energy efficiency.",
        address: "مكة المكرمة - حي جرول، شارع إبراهيم الخليل",
      },
    ],
  },
  {
    categorySlug: "hvac",
    city: "MADINAH",
    companies: [
      {
        slug: "nesmat-taiba-hvac-madinah",
        titleAr: "مؤسسة نسمة طيبة للتبريد والتكييف",
        titleEn: "Nesmat Taiba Cooling & HVAC",
        descriptionAr:
          "حلول التكييف المتقدمة للفلل والمقرات التجارية بالمدينة المنورة، عقود صيانة سنوية وإصلاح طارئ.",
        descriptionEn:
          "Advanced AC for villas and commercial premises in Madinah — annual maintenance and emergency repair.",
        address: "المدينة المنورة - طريق سلطانة، حي الفتح",
      },
      {
        slug: "noor-taiba-hvac-madinah",
        titleAr: "شركة نور طيبة للتكييف",
        titleEn: "Noor Taiba HVAC",
        descriptionAr:
          "تركيب أنظمة التكييف المركزي للفنادق والشقق المفروشة في المدينة المنورة مع ضمان شامل.",
        descriptionEn:
          "Central AC installation for Madinah hotels and furnished apartments with comprehensive warranty.",
        address: "المدينة المنورة - حي العوالي، طريق الملك عبدالله",
      },
      {
        slug: "rawdat-madinah-cooling",
        titleAr: "مؤسسة روضة المدينة للتبريد",
        titleEn: "Rawdat Al-Madinah Cooling",
        descriptionAr:
          "صيانة دورية وتحديث أنظمة التكييف للمباني الحكومية والتعليمية في المدينة المنورة.",
        descriptionEn:
          "Periodic maintenance and AC system upgrades for government and educational buildings in Madinah.",
        address: "المدينة المنورة - حي الدفاع، شارع قباء",
      },
    ],
  },
  {
    categorySlug: "fit-out",
    city: "JEDDAH",
    companies: [
      {
        slug: "turriva-fitout-jeddah",
        titleAr: "شركة توريفا للتصميم الداخلي والتشطيبات",
        titleEn: "Turriva Interior Design & Fit-Out",
        descriptionAr:
          "الشركة الرائدة في التنفيذ الراقٍ للفلل والمقرات التجارية والتصميم الداخلي الفاخر بالمنطقة الغربية.",
        descriptionEn:
          "Leading luxury fit-out and interior design for villas, commercial premises, and hospitality in the Western Region.",
        address: "جدة - حي الزهراء، شارع البترجي",
      },
      {
        slug: "malaka-interiors-jeddah",
        titleAr: "استديو ملاكا للتصميم الداخلي",
        titleEn: "Malaka Interior Studio",
        descriptionAr:
          "تصميم وتنفيذ المطابخ والحمامات والغرف الرئيسية للفلل الفاخرة بجدة بلمسات عصرية.",
        descriptionEn:
          "Design and fit-out of kitchens, bathrooms, and master suites for luxury Jeddah villas with contemporary finishes.",
        address: "جدة - حي الشاطئ، طريق الكورنيش",
      },
      {
        slug: "khayal-luxury-fitout-jeddah",
        titleAr: "شركة خيال للتشطيبات الفاخرة",
        titleEn: "Khayal Luxury Fit-Out",
        descriptionAr:
          "تشطيب مفتاح للمكاتب والمحلات التجارية في مراكز جدة التجارية، أعمال جبس بورد وإضاءة مخفية.",
        descriptionEn:
          "Turnkey fit-out for offices and retail in Jeddah commercial centers — gypsum board and concealed lighting.",
        address: "جدة - حي الرويس، شارع فلسطين",
      },
    ],
  },
  {
    categorySlug: "fit-out",
    city: "MAKKAH",
    companies: [
      {
        slug: "lamasat-elemaar-decor-makkah",
        titleAr: "مؤسسة لمسات الإعمار للديكور والتشطيب",
        titleEn: "Lamasat Elemaar Decor & Fit-Out",
        descriptionAr:
          "تشطيب مفتاح للفلل والشقق الفندقية، تنفيذ أعمال الجبس بورد والأرضيات والرخام بلمسات معمارية حديثة.",
        descriptionEn:
          "Turnkey fit-out for villas and hotel apartments — gypsum, flooring, and marble with contemporary finishes.",
        address: "مكة المكرمة - حي العزيزية، الشارع التجاري",
      },
      {
        slug: "rawaa-decor-makkah",
        titleAr: "مؤسسة رواء للديكور والتشطيب",
        titleEn: "Rawaa Decor & Fit-Out",
        descriptionAr:
          "تجهيز وتشطيب شقق الإيجار اليومي والفنادق الصغيرة في مكة بمواد عالية الجودة وتسليم سريع.",
        descriptionEn:
          "Fit-out for daily-rental apartments and boutique hotels in Makkah — premium materials and fast handover.",
        address: "مكة المكرمة - حي النسيم، طريق أم القرى",
      },
      {
        slug: "manar-fitout-makkah",
        titleAr: "شركة منار الإعمار للتشطيب",
        titleEn: "Manar Development Fit-Out",
        descriptionAr:
          "تنفيذ أعمال الديكور الداخلي للفلل والاستراحات في أحياء مكة الجبلية بفريق هندسي متخصص.",
        descriptionEn:
          "Interior decor for Makkah hillside villas and chalets with a dedicated engineering team.",
        address: "مكة المكرمة - حي المشاعر، الشارع العام",
      },
    ],
  },
  {
    categorySlug: "fit-out",
    city: "MADINAH",
    companies: [
      {
        slug: "ruya-alrakhaa-fitout-madinah",
        titleAr: "استديو رؤية الرخاء للتصميم والتنفيذ",
        titleEn: "Ruya Al-Rakhaa Design Studio",
        descriptionAr:
          "تنفيذ أعمال التشطيبات الداخلية وتجهيز المكاتب والمحلات التجارية في المدينة المنورة بأعلى معايير الجودة.",
        descriptionEn:
          "Interior fit-out and office/retail handover in Madinah to the highest quality standards.",
        address: "المدينة المنورة - طريق الهجرة، حي السلام",
      },
      {
        slug: "nadwa-design-madinah",
        titleAr: "استوديو ندوة للتصميم والتنفيذ",
        titleEn: "Nadwa Design Studio",
        descriptionAr:
          "تصميم داخلي وتشطيب للفلل والمقرات الإدارية في المدينة المنورة بأسلوب معاصر يجمع بين الأصالة والحداثة.",
        descriptionEn:
          "Interior design and fit-out for Madinah villas and admin offices — contemporary style blending tradition and modernity.",
        address: "المدينة المنورة - حي العقيق، طريق الملك فيصل",
      },
      {
        slug: "wasl-interior-fitout-madinah",
        titleAr: "شركة وصل للتشطيبات الداخلية",
        titleEn: "Wasl Interior Fit-Out",
        descriptionAr:
          "تشطيب وتجهيز المطاعم والمقاهي في المدينة المنورة، أعمال بار وإضاءة ديكورية مخصصة.",
        descriptionEn:
          "Restaurant and café fit-out in Madinah — custom bar work and decorative lighting.",
        address: "المدينة المنورة - حي الحرة الشرقية، شارع ساري",
      },
    ],
  },
  {
    categorySlug: "contracting",
    city: "JEDDAH",
    companies: [
      {
        slug: "turriva-contracting-jeddah",
        titleAr: "شركة توريفا للمقاولات العامة والترميم",
        titleEn: "Turriva General Contracting & Renovation",
        descriptionAr:
          "الشركة الرائدة في المقاولات العامة وترميم الفلل والقصور والمشاريع التجارية بالمنطقة الغربية، تنفيذ متكامل من الهيكل حتى التسليم.",
        descriptionEn:
          "Leading general contracting and renovation for villas, palaces, and commercial projects in the Western Region — full delivery from structure to handover.",
        address: "جدة - حي الزهراء، شارع البترجي",
      },
      {
        slug: "binaa-gharb-contracting-jeddah",
        titleAr: "شركة بناء الغرب للمقاولات",
        titleEn: "Binaa Al-Gharb Contracting",
        descriptionAr:
          "بناء وتشييد الفلل والعمائر السكنية في شمال جدة، هيكل خرساني مسلح ومطابق للكود السعودي.",
        descriptionEn:
          "Villa and residential tower construction in north Jeddah — reinforced concrete compliant with Saudi Building Code.",
        address: "جدة - حي المحمدية، طريق المدينة المنورة",
      },
      {
        slug: "amoud-general-contracting-jeddah",
        titleAr: "مؤسسة العمود للمقاولات العامة",
        titleEn: "Al-Amoud General Contracting",
        descriptionAr:
          "ترميم وتوسعة المباني التجارية والمستودعات في المنطقة الصناعية بجدة بخبرة تزيد على 15 عاماً.",
        descriptionEn:
          "Commercial building and warehouse renovation and extension in Jeddah industrial zone — 15+ years experience.",
        address: "جدة - المنطقة الصناعية الثانية، حي الخمرة",
      },
    ],
  },
  {
    categorySlug: "contracting",
    city: "MAKKAH",
    companies: [
      {
        slug: "surooh-makkah-contracting",
        titleAr: "شركة صروح مكة للمقاولات والترميم",
        titleEn: "Surooh Makkah Contracting & Renovation",
        descriptionAr:
          "ترميم وتحديث الفنادق والعمائر السكنية في مكة المكرمة، معالجة التصدعات وتوسعة المباني.",
        descriptionEn:
          "Hotel and residential tower renovation in Makkah — crack treatment and building extensions.",
        address: "مكة المكرمة - العتيبية، الشارع العام",
      },
      {
        slug: "hijaz-build-contracting-makkah",
        titleAr: "شركة بناء الحجاز للمقاولات",
        titleEn: "Hijaz Build Contracting",
        descriptionAr:
          "مقاولات بناء عظم للفلل والعمائر في أحياء مكة الجديدة، إشراف هندسي كامل من التصميم حتى التسليم.",
        descriptionEn:
          "Structural construction for Makkah villas and towers in new districts — full engineering supervision from design to handover.",
        address: "مكة المكرمة - حي الشرقية، طريق الدائر الثاني",
      },
      {
        slug: "qimmat-makkah-construction",
        titleAr: "مؤسسة قمة مكة للإنشاءات",
        titleEn: "Qimmat Makkah Construction",
        descriptionAr:
          "تنفيذ مشاريع الترميم والتأهيل للمباني القديمة في مكة المكرمة مع الحفاظ على الطابع المعماري.",
        descriptionEn:
          "Renovation and rehabilitation of heritage buildings in Makkah while preserving architectural character.",
        address: "مكة المكرمة - حي المسفلة، شارع إبراهيم الخليل",
      },
    ],
  },
  {
    categorySlug: "contracting",
    city: "MADINAH",
    companies: [
      {
        slug: "arkan-taiba-contracting-madinah",
        titleAr: "مؤسسة أركان طيبة للمقاولات والإعمار",
        titleEn: "Arkan Taiba Contracting & Development",
        descriptionAr:
          "بناء وتأهيل الفلل والعمائر بالمدينة المنورة، تنفيذ هيكل خرساني معتمد ومطابق لكود البناء السعودي.",
        descriptionEn:
          "Villa and building construction in Madinah — certified concrete structure compliant with Saudi Building Code.",
        address: "المدينة المنورة - حي العزيزية، طريق العيون",
      },
      {
        slug: "sahm-madinah-contracting",
        titleAr: "شركة سهم المدينة للمقاولات",
        titleEn: "Sahm Al-Madinah Contracting",
        descriptionAr:
          "مقاولات عامة للمشاريع السكنية والتجارية في المدينة المنورة، بناء وتشطيب وترميم متكامل.",
        descriptionEn:
          "General contracting for residential and commercial projects in Madinah — build, fit-out, and renovation.",
        address: "المدينة المنورة - حي العريض، طريق قباء",
      },
      {
        slug: "hijra-build-renovation-madinah",
        titleAr: "مؤسسة الهجرة للبناء والترميم",
        titleEn: "Al-Hijra Build & Renovation",
        descriptionAr:
          "ترميم وتوسعة الفلل والاستراحات في ضواحي المدينة المنورة بفريق مقاولين معتمدين.",
        descriptionEn:
          "Villa and chalet renovation and extension in Madinah suburbs with certified contractor teams.",
        address: "المدينة المنورة - حي الدفاع، طريق الملك خالد",
      },
    ],
  },
  {
    categorySlug: "elevators",
    city: "JEDDAH",
    companies: [
      {
        slug: "alqimam-elevators-jeddah",
        titleAr: "شركة القمم لمصاعد التناغم الميكانيكية",
        titleEn: "Al-Qimam Harmony Elevators",
        descriptionAr:
          "توريد وتركيب مصاعد إيطالية وألمانية للفلل والعمائر بجدة، مع عقود صيانة واعتماد الدفاع المدني.",
        descriptionEn:
          "Italian and German elevator supply and install for Jeddah villas and towers — maintenance and civil defense approval.",
        address: "جدة - شارع فلسطين، حي المشرفة",
      },
      {
        slug: "ascender-elevators-jeddah",
        titleAr: "شركة أسندر للمصاعد الكهربائية",
        titleEn: "Ascender Electric Elevators",
        descriptionAr:
          "تركيب مصاعد بدون غرفة آلة MRL للعمائر السكنية والتجارية في جدة مع ضمان 5 سنوات.",
        descriptionEn:
          "MRL elevator installation for Jeddah residential and commercial towers — 5-year warranty.",
        address: "جدة - حي الأندلس، طريق الملك عبدالعزيز",
      },
      {
        slug: "vertical-lift-jeddah",
        titleAr: "مؤسسة فيرتيكال للمصاعد والسلالم",
        titleEn: "Vertical Lift & Escalators",
        descriptionAr:
          "صيانة وتحديث المصاعد القديمة في جدة، تركيب سلالم كهربائية للمراكز التجارية والمولات.",
        descriptionEn:
          "Legacy elevator maintenance and modernization in Jeddah — escalator install for malls and commercial centers.",
        address: "جدة - حي الحمراء، شارع التحلية",
      },
    ],
  },
  {
    categorySlug: "elevators",
    city: "MAKKAH",
    companies: [
      {
        slug: "harmain-elevators-makkah",
        titleAr: "مؤسسة مصاعد الحرمين المعتمدة",
        titleEn: "Harmain Certified Elevators",
        descriptionAr:
          "صيانة وتحديث المصاعد الهيدروليكية والتجهيزات الميكانيكية للفنادق والأبراج السكنية بمكة.",
        descriptionEn:
          "Hydraulic elevator maintenance and upgrades for Makkah hotels and residential towers.",
        address: "مكة المكرمة - حي بطحاء قريش",
      },
      {
        slug: "safa-hydraulic-elevators-makkah",
        titleAr: "شركة صفا للمصاعد الهيدروليكية",
        titleEn: "Safa Hydraulic Elevators",
        descriptionAr:
          "توريد وتركيب مصاعد هيدروليكية للفلل والمباني المنخفضة في مكة المكرمة بمعايير أمان عالية.",
        descriptionEn:
          "Hydraulic elevator supply and install for Makkah villas and low-rise buildings — high safety standards.",
        address: "مكة المكرمة - حي الزاهر، طريق المسجد الحرام",
      },
      {
        slug: "rukn-haram-elevators-makkah",
        titleAr: "مؤسسة ركن الحرم للمصاعد",
        titleEn: "Rukn Al-Haram Elevators",
        descriptionAr:
          "صيانة دورية وطوارئ للمصاعد في فنادق مكة، قطع غيار أصلية وفريق فني متاح على مدار الساعة.",
        descriptionEn:
          "Periodic and emergency elevator maintenance for Makkah hotels — OEM parts and 24/7 technical team.",
        address: "مكة المكرمة - حي جرول، شارع أجياد",
      },
    ],
  },
  {
    categorySlug: "elevators",
    city: "MADINAH",
    companies: [
      {
        slug: "khotwa-elevators-madinah",
        titleAr: "شركة خطوة للأنظمة الميكانيكية والمصاعد",
        titleEn: "Khotwa Mechanical Systems & Elevators",
        descriptionAr:
          "تركيب مصاعد بدون غرفة ومصاعد بضائع وبانوراما في المدينة المنورة مع قطع غيار أصلية وضمان شامل.",
        descriptionEn:
          "MRL, freight, and panoramic elevators in Madinah with OEM parts and full warranty.",
        address: "المدينة المنورة - طريق الحزام، حي الخالدية",
      },
      {
        slug: "madinah-lift-systems",
        titleAr: "شركة أنظمة مصاعد المدينة",
        titleEn: "Madinah Lift Systems",
        descriptionAr:
          "تركيب وصيانة مصاعد الركاب والبضائع للفنادق والمستشفيات في المدينة المنورة.",
        descriptionEn:
          "Passenger and freight elevator install and maintenance for Madinah hotels and hospitals.",
        address: "المدينة المنورة - حي بني حارثة، طريق الملك عبدالعزيز",
      },
      {
        slug: "taiba-panoramic-elevators-madinah",
        titleAr: "مؤسسة طيبة للمصاعد البانورامية",
        titleEn: "Taiba Panoramic Elevators",
        descriptionAr:
          "مصاعد زجاجية بانورامية للفلل الفاخرة والمباني التجارية في المدينة المنورة بتصاميم مخصصة.",
        descriptionEn:
          "Glass panoramic elevators for luxury Madinah villas and commercial buildings with custom designs.",
        address: "المدينة المنورة - حي العوالي، شارع قباء",
      },
    ],
  },
  {
    categorySlug: "waterproofing",
    city: "JEDDAH",
    companies: [
      {
        slug: "alder3-waterproofing-jeddah",
        titleAr: "مؤسسة الدرع المائي للعزل والفوم",
        titleEn: "Al-Deraa Waterproofing & Foam",
        descriptionAr:
          "عزل أسطح، خزانات، ومسابح بأحدث مواد العزل المائي والحراري المعتمدة مع ضمان يصل لـ 10 سنوات.",
        descriptionEn:
          "Roof, tank, and pool waterproofing with approved thermal materials — up to 10-year warranty.",
        address: "جدة - حي المروة، طريق الأمير متعب",
      },
      {
        slug: "muahkam-waterproofing-jeddah",
        titleAr: "شركة محكم للعزل المائي",
        titleEn: "Muahkam Waterproofing",
        descriptionAr:
          "معالجة تسربات الأسطح والخزانات في جدة، رش فوم بولي يوريثان للعزل الحراري والمائي.",
        descriptionEn:
          "Roof and tank leak treatment in Jeddah — polyurethane foam spray for thermal and waterproof insulation.",
        address: "جدة - حي الصفا، شارع الأمير مجيد",
      },
      {
        slug: "shield-roof-insulation-jeddah",
        titleAr: "مؤسسة درع العزل للأسطح",
        titleEn: "Shield Roof Insulation",
        descriptionAr:
          "عزل أسطح شينكو والمباني الصناعية في جدة، مواد bituminous membrane معتمدة من SASO.",
        descriptionEn:
          "Corrugated roof and industrial building insulation in Jeddah — SASO-approved bituminous membrane.",
        address: "جدة - حي النهضة، طريق الأمير محمد بن عبدالعزيز",
      },
    ],
  },
  {
    categorySlug: "waterproofing",
    city: "MAKKAH",
    companies: [
      {
        slug: "protection-waterproofing-makkah",
        titleAr: "شركة الحماية الفائقة للعزل المائي",
        titleEn: "Super Protection Waterproofing",
        descriptionAr:
          "معالجة التسربات وعزل الخزانات الأرضية والعلوية للمباني والفنادق بمكة المكرمة بكفاءة عالية.",
        descriptionEn:
          "Leak treatment and ground/overhead tank waterproofing for Makkah buildings and hotels.",
        address: "مكة المكرمة - حي الكعكية",
      },
      {
        slug: "haram-seal-waterproofing-makkah",
        titleAr: "شركة ختم الحرم للعزل",
        titleEn: "Haram Seal Waterproofing",
        descriptionAr:
          "عزل أسطح الفنادق والعمائر في مكة ضد الأمطار والرطوبة، حلول إيبوكسي وبولي يوريثان للخزانات.",
        descriptionEn:
          "Hotel and tower roof waterproofing in Makkah against rain and humidity — epoxy and polyurethane tank solutions.",
        address: "مكة المكرمة - حي العوالي، طريق الهدا",
      },
      {
        slug: "jabal-arafat-foam-makkah",
        titleAr: "مؤسسة جبل عرفات للعزل بالفوم",
        titleEn: "Jabal Arafat Foam Insulation",
        descriptionAr:
          "رش فوم عازل حراري ومائي للمباني الجديدة في مكة، يقلل استهلاك الطاقة بنسبة تصل إلى 40%.",
        descriptionEn:
          "Thermal and waterproof foam spray for new Makkah buildings — reduces energy consumption by up to 40%.",
        address: "مكة المكرمة - حي الشرقية، شارع المطار",
      },
    ],
  },
  {
    categorySlug: "waterproofing",
    city: "MADINAH",
    companies: [
      {
        slug: "taiba-insulation-madinah",
        titleAr: "مؤسسة طيبة للحلول الحرارية والعزل",
        titleEn: "Taiba Thermal & Insulation Solutions",
        descriptionAr:
          "رش فوم بولي يوريثان وعزل أسطح شينكو ومباني بالمدينة المنورة للحد من استهلاك الكهرباء.",
        descriptionEn:
          "Polyurethane foam spray and corrugated roof insulation in Madinah to reduce energy consumption.",
        address: "المدينة المنورة - حي سيد الشهداء",
      },
      {
        slug: "noor-building-insulation-madinah",
        titleAr: "شركة نور العزل للمباني",
        titleEn: "Noor Building Insulation",
        descriptionAr:
          "عزل خزانات المياه والأسطح للفلل والمستشفيات في المدينة المنورة بمواد معتمدة وضمان 10 سنوات.",
        descriptionEn:
          "Water tank and roof insulation for Madinah villas and hospitals — approved materials with 10-year warranty.",
        address: "المدينة المنورة - حي العزيزية، طريق سلطانة",
      },
      {
        slug: "sahara-thermal-waterproof-madinah",
        titleAr: "مؤسسة صحراء العزل الحراري",
        titleEn: "Sahara Thermal Waterproofing",
        descriptionAr:
          "حلول العزل المائي والحراري للمستودعات والمصانع في المدينة المنورة الصناعية.",
        descriptionEn:
          "Waterproof and thermal insulation for warehouses and factories in Madinah industrial zone.",
        address: "المدينة المنورة - المنطقة الصناعية، طريق المدينة",
      },
    ],
  },
  {
    categorySlug: "furnishing",
    city: "JEDDAH",
    companies: [
      {
        slug: "alofoq-furnishing-jeddah",
        titleAr: "شركة الأفق لتأثيث وتجهيز الفنادق",
        titleEn: "Al-Ofoq Hotel FF&E",
        descriptionAr:
          "تجهيز وتأثيث الشقق الفندقية والمقرّات السكنية والفلل بأحدث خطوط الموبيليا والمفروشات الفاخرة.",
        descriptionEn:
          "FF&E for serviced apartments, residential compounds, and villas with premium furniture lines.",
        address: "جدة - شارع الستين، حي الروضة",
      },
      {
        slug: "rihana-furniture-jeddah",
        titleAr: "شركة ريحانة للأثاث والتجهيز",
        titleEn: "Rihana Furniture & FF&E",
        descriptionAr:
          "تأثيث فلل وشقق سكنية في جدة بخطوط أثاث مودرن مستوردة وتصاميم مخصصة.",
        descriptionEn:
          "Villa and apartment furnishing in Jeddah with imported modern furniture lines and custom designs.",
        address: "جدة - حي الأمير عبدالمجيد، شارع التحلية",
      },
      {
        slug: "layali-villa-furnishing-jeddah",
        titleAr: "شركة ليالي لتأثيث الفلل",
        titleEn: "Layali Villa Furnishing",
        descriptionAr:
          "تجهيز وتأثيث الفلل الفاخرة والاستراحات في شمال جدة، غرف نوم ومجالس وصالونات كاملة.",
        descriptionEn:
          "Full furnishing for luxury villas and chalets in north Jeddah — bedrooms, majlis, and living suites.",
        address: "جدة - حي الشاطئ، طريق الكورنيش",
      },
    ],
  },
  {
    categorySlug: "furnishing",
    city: "MAKKAH",
    companies: [
      {
        slug: "deyar-alharam-furnishing-makkah",
        titleAr: "مؤسسة ديار الحرم للتأثيث الفندقي",
        titleEn: "Diyar Al-Haram Hotel Furnishing",
        descriptionAr:
          "متخصصون في تجهيز وتأثيث الفنادق ودور إسكان الحجاج والمعتمرين بمكة بأسعار منافسة ومعايير جودة عالية.",
        descriptionEn:
          "Hotel and pilgrim housing furnishing in Makkah — competitive pricing and high quality standards.",
        address: "مكة المكرمة - حي التنعيم",
      },
      {
        slug: "baraka-hotel-ffe-makkah",
        titleAr: "مؤسسة بركة للتأثيث الفندقي",
        titleEn: "Baraka Hotel FF&E",
        descriptionAr:
          "تأثيث وتجهيز الفنادق والشقق المفروشة في مكة، أسرّة فندقية وستائر ومفروشات بمعايير الضيافة الفندقية.",
        descriptionEn:
          "Hotel and furnished apartment FF&E in Makkah — hotel beds, curtains, and linens to hospitality standards.",
        address: "مكة المكرمة - حي العزيزية، شارع المنصور",
      },
      {
        slug: "ridwan-haram-furniture-makkah",
        titleAr: "شركة أثاث رضوان الحرم",
        titleEn: "Ridwan Al-Haram Furniture",
        descriptionAr:
          "تأثيث دور إسكان الحجاج والمعتمرين في مكة بأسعار جملة وتسليم سريع قبل موسم الحج.",
        descriptionEn:
          "Bulk furnishing for pilgrim housing in Makkah — wholesale pricing and fast delivery before Hajj season.",
        address: "مكة المكرمة - حي المسفلة، طريق أم القرى",
      },
    ],
  },
  {
    categorySlug: "furnishing",
    city: "MADINAH",
    companies: [
      {
        slug: "madinah-luxury-furniture",
        titleAr: "مفروشات أثاث المدينة الفاخرة",
        titleEn: "Madinah Luxury Furniture",
        descriptionAr:
          "فرش وتجهيز الفلل الفاخرة وشقق الإيجار اليومي بالمدينة المنورة مع تصاميم مودرن مخصصة.",
        descriptionEn:
          "Luxury villa and daily-rental apartment furnishing in Madinah with bespoke modern designs.",
        address: "المدينة المنورة - طريق المطار، حي العريض",
      },
      {
        slug: "zahra-taiba-furnishing-madinah",
        titleAr: "شركة زهرة طيبة للتأثيث",
        titleEn: "Zahra Taiba Furnishing",
        descriptionAr:
          "تأثيث الفنادق والشقق الفندقية في المدينة المنورة بخطوط أثاث عصرية وخدمة تركيب مجانية.",
        descriptionEn:
          "Hotel and serviced apartment furnishing in Madinah — contemporary furniture lines with free installation.",
        address: "المدينة المنورة - حي قباء، طريق الملك فيصل",
      },
      {
        slug: "rawdah-furniture-decor-madinah",
        titleAr: "مؤسسة روضة للأثاث والديكور",
        titleEn: "Rawdah Furniture & Decor",
        descriptionAr:
          "تجهيز وتأثيث المكاتب والمقاهي في المدينة المنورة، طاولات وكراسي وإكسسوارات ديكورية.",
        descriptionEn:
          "Office and café furnishing in Madinah — tables, chairs, and decorative accessories.",
        address: "المدينة المنورة - حي السلام، شارع sari",
      },
    ],
  },
  {
    categorySlug: "facades",
    city: "JEDDAH",
    companies: [
      {
        slug: "bareeq-facades-jeddah",
        titleAr: "مؤسسة بريق الواجهات لتلميع الرخام",
        titleEn: "Bareeq Facades & Marble Polish",
        descriptionAr:
          "جلي وتلميع الرخام بالألماس والبلورة، غسيل وتنظيف الواجهات الزجاجية والكلادينج للمباني بجدة.",
        descriptionEn:
          "Diamond marble polish, glass and cladding facade cleaning for Jeddah buildings.",
        address: "جدة - طريق الملك عبد العزيز، حي الشاطئ",
      },
      {
        slug: "crystal-glass-facades-jeddah",
        titleAr: "شركة بلور للواجهات الزجاجية",
        titleEn: "Crystal Glass Facades",
        descriptionAr:
          "تنظيف وصيانة واجهات الزجاج والكلادينج للأبراج التجارية في جدة باستخدام رافعات المرتفعات.",
        descriptionEn:
          "Glass and cladding facade cleaning and maintenance for Jeddah commercial towers using MEWPs.",
        address: "جدة - حي الرويس، برج المملكة",
      },
      {
        slug: "al-almas-marble-polish-jeddah",
        titleAr: "مؤسسة الألماس لجلي الرخام",
        titleEn: "Al-Almas Marble Polish",
        descriptionAr:
          "جلي وتلميع الرخام والجرانيت للفلل والفنادق في جدة، حماية وتلميع بلوري يدوم لسنوات.",
        descriptionEn:
          "Marble and granite polish for Jeddah villas and hotels — crystallization protection lasting years.",
        address: "جدة - حي الحمراء، شارع الأمير سلطان",
      },
    ],
  },
  {
    categorySlug: "facades",
    city: "MAKKAH",
    companies: [
      {
        slug: "almarwa-facades-makkah",
        titleAr: "شركة المروة لصيانة وجلي الواجهات",
        titleEn: "Al-Marwa Facade Maintenance",
        descriptionAr:
          "تنظيف واجهات الأبراج والفنادق بمكة باستخدام السقالات ورافعات المرتفعات، جلي وحماية الأرضيات.",
        descriptionEn:
          "Tower and hotel facade cleaning in Makkah with scaffolding and MEWPs — floor polish and protection.",
        address: "مكة المكرمة - حي الرصيفة",
      },
      {
        slug: "safa-facade-maintenance-makkah",
        titleAr: "شركة صفا لصيانة الواجهات",
        titleEn: "Safa Facade Maintenance",
        descriptionAr:
          "غسيل وتنظيف واجهات الفنادق والعمائر في مكة، إزالة الأوساخ والملاح بمواد صديقة للبيئة.",
        descriptionEn:
          "Hotel and tower facade washing in Makkah — salt and dirt removal with eco-friendly products.",
        address: "مكة المكرمة - حي العزيزية، طريق الحج",
      },
      {
        slug: "noor-cladding-services-makkah",
        titleAr: "مؤسسة نور للكلادينج",
        titleEn: "Noor Cladding Services",
        descriptionAr:
          "صيانة وترميم واجهات الكلادينج الألمنيوم للمباني التجارية والفندقية في مكة المكرمة.",
        descriptionEn:
          "Aluminum cladding facade maintenance and repair for Makkah commercial and hotel buildings.",
        address: "مكة المكرمة - حي الزاهر، شارع أجياد",
      },
    ],
  },
  {
    categorySlug: "facades",
    city: "MADINAH",
    companies: [
      {
        slug: "ballorat-taiba-facades-madinah",
        titleAr: "مؤسسة بلورة طيبة لجلي الرخام والواجهات",
        titleEn: "Ballorat Taiba Marble & Facades",
        descriptionAr:
          "خدمات متخصصة في معالجة وتلميع الرخام الطبيعي وتنظيف واجهات المباني التجارية بالمدينة المنورة.",
        descriptionEn:
          "Natural marble treatment and commercial building facade cleaning in Madinah.",
        address: "المدينة المنورة - حي القبلتين",
      },
      {
        slug: "taiba-marble-polish-madinah",
        titleAr: "شركة طيبة لجلي الرخام",
        titleEn: "Taiba Marble Polish",
        descriptionAr:
          "جلي وتلميع رخام المساجد والفلل في المدينة المنورة، استعادة اللمعان الأصلي للأرضيات.",
        descriptionEn:
          "Mosque and villa marble polish in Madinah — restoring original floor shine.",
        address: "المدينة المنورة - حي العوالي، طريق قباء",
      },
      {
        slug: "qubbat-facade-services-madinah",
        titleAr: "مؤسسة قبة للواجهات",
        titleEn: "Qubbat Facade Services",
        descriptionAr:
          "تنظيف وصيانة واجهات الزجاج والحجر للمباني التاريخية والتجارية في المدينة المنورة.",
        descriptionEn:
          "Glass and stone facade cleaning and maintenance for historic and commercial Madinah buildings.",
        address: "المدينة المنورة - حي بني ظفر، شارع الملك عبدالعزيز",
      },
    ],
  },
];

const COMPANIES_PER_CELL = 6;
const EXPECTED_LISTING_COUNT = 21 * COMPANIES_PER_CELL; // 7 categories × 3 cities × 6 companies

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
      `Duplicate listing slugs in seed catalog: ${[...new Set(slugDupes)].join(", ")}`
    );
  }
  if (phoneDupes.length > 0) {
    throw new Error(
      `Duplicate listing phones in seed catalog: ${[...new Set(phoneDupes)].join(", ")}`
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

  for (const cell of MARKETPLACE_LISTING_CATALOG) {
    const expansionKey = `${cell.categorySlug}:${cell.city}` as `${string}:${MarketplaceCity}`;
    const extra = MARKETPLACE_LISTING_EXPANSION[expansionKey] ?? [];
    const allCompanies = [...cell.companies, ...extra];

    if (allCompanies.length !== COMPANIES_PER_CELL) {
      throw new Error(
        `Expected ${COMPANIES_PER_CELL} companies for ${expansionKey}, got ${allCompanies.length}`
      );
    }

    for (let i = 0; i < allCompanies.length; i++) {
      const company = allCompanies[i];
      const phone = `+966551234${String(phoneIndex).padStart(3, "0")}`;
      phoneIndex++;

      seeds.push({
        categorySlug: cell.categorySlug,
        city: cell.city,
        slug: company.slug,
        titleAr: company.titleAr,
        titleEn: company.titleEn,
        descriptionAr: company.descriptionAr,
        descriptionEn: company.descriptionEn,
        phone,
        whatsapp: phone,
        address: company.address,
        isVerified: true,
        isFeatured: i === 0,
        images: [DEFAULT_IMAGE],
      });
    }
  }

  assertListingSeeds(seeds);
  return seeds;
}
