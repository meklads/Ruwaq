import type { MarketplaceCity } from "@prisma/client";

export type ExpansionCompanyDef = {
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  address: string;
};

/** 3 additional companies per city×category (21 cells × 3 = 63 listings) */
export const MARKETPLACE_LISTING_EXPANSION: Record<
  `${string}:${MarketplaceCity}`,
  [ExpansionCompanyDef, ExpansionCompanyDef, ExpansionCompanyDef]
> = {
  "hvac:JEDDAH": [
    {
      slug: "sorouh-gharbiya-hvac-jeddah",
      titleAr: "مؤسسة صروح الغربية للتكييف",
      titleEn: "Sorouh Al-Gharbiya HVAC",
      descriptionAr:
        "تركيب وصيانة أنظمة التكييف للفلل الفاخرة والأبراج السكنية في شمال جدة، مع حلول توفير الطاقة.",
      descriptionEn:
        "AC install and maintenance for luxury villas and residential towers in north Jeddah with energy-saving solutions.",
      address: "جدة - حي المحمدية، طريق المدينة المنورة",
    },
    {
      slug: "barid-aljazeera-cooling-jeddah",
      titleAr: "شركة بارِد الجزيرة للتبريد",
      titleEn: "Barid Al-Jazeera Cooling",
      descriptionAr:
        "حلول تبريد مركزي للمكاتب والمراكز التجارية في جدة، أنظمة VRF وكاسيت مع عقود تشغيل سنوية.",
      descriptionEn:
        "Central cooling for Jeddah offices and malls — VRF and cassette systems with annual O&M contracts.",
      address: "جدة - حي الروضة، شارع الستين",
    },
    {
      slug: "mizan-climate-systems-jeddah",
      titleAr: "مؤسسة ميزان للأنظمة المناخية",
      titleEn: "Mizan Climate Systems",
      descriptionAr:
        "صيانة دورية وطوارئ لتكييف الفنادق والمستشفيات في جدة، فريق فني معتمد على مدار الساعة.",
      descriptionEn:
        "Periodic and emergency AC for Jeddah hotels and hospitals — certified 24/7 technical team.",
      address: "جدة - حي الصفا، طريق الملك فهد",
    },
  ],
  "hvac:MAKKAH": [
    {
      slug: "haram-breeze-hvac-makkah",
      titleAr: "شركة نسيم الحرم للتكييف",
      titleEn: "Haram Breeze HVAC",
      descriptionAr:
        "تكييف وتبريد للفنادق والعمائر الفندقية قرب الحرم، أنظمة عالية الكفاءة للضيافة على مدار العام.",
      descriptionEn:
        "AC for hotels and serviced towers near the Haram — high-efficiency hospitality systems year-round.",
      address: "مكة المكرمة - حي العزيزية، طريق الحج",
    },
    {
      slug: "mawaheb-cooling-makkah",
      titleAr: "مؤسسة مواهب التبريد بمكة",
      titleEn: "Mawaheb Makkah Cooling",
      descriptionAr:
        "تركيب وحدات سبليت وVRV لدور إسكان الحجاج والمعتمرين، تسليم سريع قبل المواسم.",
      descriptionEn:
        "Split and VRV install for pilgrim housing — fast delivery before peak seasons.",
      address: "مكة المكرمة - حي النسيم، طريق أم القرى",
    },
    {
      slug: "qimmat-barid-makkah",
      titleAr: "شركة قمة البارد للتكييف",
      titleEn: "Qimmat Al-Barid HVAC",
      descriptionAr:
        "صيانة وتشغيل أنظمة التكييف المركزي للأبراج السكنية في أحياء مكة الجديدة.",
      descriptionEn:
        "Central AC operation and maintenance for residential towers in Makkah's new districts.",
      address: "مكة المكرمة - حي الشرقية، الدائر الثاني",
    },
  ],
  "hvac:MADINAH": [
    {
      slug: "taiba-modern-hvac-madinah",
      titleAr: "شركة طيبة الحديثة للتكييف",
      titleEn: "Taiba Modern HVAC",
      descriptionAr:
        "حلول تكييف للفلل والمجمعات السكنية الحديثة في المدينة المنورة، ضمان شامل وصيانة دورية.",
      descriptionEn:
        "AC solutions for modern Madinah villas and compounds — full warranty and scheduled maintenance.",
      address: "المدينة المنورة - حي العقيق، طريق الملك فيصل",
    },
    {
      slug: "noor-almadinah-cooling",
      titleAr: "مؤسسة نور المدينة للتبريد",
      titleEn: "Noor Al-Madinah Cooling",
      descriptionAr:
        "تركيب أنظمة تكييف للفنادق والشقق المفروشة في المدينة، كفاءة طاقة ومعايير SASO.",
      descriptionEn:
        "AC install for Madinah hotels and furnished apartments — energy efficiency and SASO standards.",
      address: "المدينة المنورة - حي السلام، طريق الهجرة",
    },
    {
      slug: "sahm-taiba-hvac-madinah",
      titleAr: "شركة سهم طيبة للتكييف المركزي",
      titleEn: "Sahm Taiba Central HVAC",
      descriptionAr:
        "صيانة وتحديث أنظمة التكييف للمباني الحكومية والتعليمية في المدينة المنورة.",
      descriptionEn:
        "AC maintenance and upgrades for government and educational buildings in Madinah.",
      address: "المدينة المنورة - حي الدفاع، شارع قباء",
    },
  ],
  "fit-out:JEDDAH": [
    {
      slug: "ruya-alhaditha-fitout-jeddah",
      titleAr: "شركة الرؤية الحديثة للتصميم والتشطيب",
      titleEn: "Al-Ru'ya Al-Haditha Design & Fit-Out",
      descriptionAr:
        "تشطيب فاخر للفلل والقصور في جدة، تصميم داخلي معاصر وتنفيذ مطابخ ورخام بمعايير عالمية.",
      descriptionEn:
        "Luxury fit-out for Jeddah villas and palaces — contemporary interiors, kitchens, and marble to global standards.",
      address: "جدة - حي الزهراء، شارع الأمير سلطان",
    },
    {
      slug: "namazij-elemaar-fitout-jeddah",
      titleAr: "مؤسسة نماذج الإعمار للتشطيبات",
      titleEn: "Namazij Al-Emaar Fit-Out",
      descriptionAr:
        "تشطيب مفتاح للمكاتب والمحلات في مراكز جدة التجارية، جبس بورد وإضاءة LED مخفية.",
      descriptionEn:
        "Turnkey office and retail fit-out in Jeddah commercial centers — gypsum board and concealed LED lighting.",
      address: "جدة - حي الرويس، شارع فلسطين",
    },
    {
      slug: "lamsat-ruwaq-interiors-jeddah",
      titleAr: "استوديو لمسات رواق للتصميم الداخلي",
      titleEn: "Lamsat Ruwaq Interior Studio",
      descriptionAr:
        "تصميم وتنفيذ المجالس والصالات للفلل الساحلية في جدة بلمسات بحرية راقية.",
      descriptionEn:
        "Majlis and living room design for Jeddah coastal villas with refined nautical-inspired finishes.",
      address: "جدة - حي الشاطئ، طريق الكورنيش",
    },
  ],
  "fit-out:MAKKAH": [
    {
      slug: "diyar-alharam-fitout-makkah",
      titleAr: "شركة ديار الحرم للتشطيب الفندقي",
      titleEn: "Diyar Al-Haram Hotel Fit-Out",
      descriptionAr:
        "تشطيب وتجهيز الفنادق والشقق الفندقية في مكة، مواد مقاومة للرطوبة ومعايير الضيافة.",
      descriptionEn:
        "Hotel and serviced apartment fit-out in Makkah — moisture-resistant materials and hospitality standards.",
      address: "مكة المكرمة - حي العزيزية، الشارع التجاري",
    },
    {
      slug: "binaa-lamasat-decor-makkah",
      titleAr: "مؤسسة بناء لمسات للديكور",
      titleEn: "Binaa Lamsat Decor",
      descriptionAr:
        "تشطيب دور الإيجار اليومي والاستراحات في مكة بمواد عالية الجودة وتسليم قبل المواسم.",
      descriptionEn:
        "Fit-out for daily-rental units and chalets in Makkah — premium materials and pre-season handover.",
      address: "مكة المكرمة - حي النسيم، طريق أم القرى",
    },
    {
      slug: "makan-alharam-interiors-makkah",
      titleAr: "شركة مكان الحرم للتصميم الداخلي",
      titleEn: "Makan Al-Haram Interiors",
      descriptionAr:
        "تصميم داخلي للفلل والشقق في أحياء مكة الجبلية، دمج الأصالة مع الراحة العصرية.",
      descriptionEn:
        "Interior design for Makkah hillside villas and apartments — tradition meets modern comfort.",
      address: "مكة المكرمة - حي المشاعر، الشارع العام",
    },
  ],
  "fit-out:MADINAH": [
    {
      slug: "wasl-taiba-design-madinah",
      titleAr: "استوديو وصل طيبة للتصميم والتنفيذ",
      titleEn: "Wasl Taiba Design Studio",
      descriptionAr:
        "تشطيب داخلي للفلل والمكاتب في المدينة المنورة بأسلوب معاصر يحترم الطابع المحلي.",
      descriptionEn:
        "Interior fit-out for Madinah villas and offices — contemporary style respecting local character.",
      address: "المدينة المنورة - حي العقيق، طريق الملك فيصل",
    },
    {
      slug: "nadwa-almadinah-fitout",
      titleAr: "مؤسسة ندوة المدينة للتشطيبات",
      titleEn: "Nadwa Al-Madinah Fit-Out",
      descriptionAr:
        "تجهيز المطاعم والمقاهي في المدينة المنورة، بار وإضاءة ديكورية وتشطيب سريع.",
      descriptionEn:
        "Restaurant and café fit-out in Madinah — bar work, decorative lighting, and fast delivery.",
      address: "المدينة المنورة - حي الحرة الشرقية، شارع ساري",
    },
    {
      slug: "ruya-alrakhaa-expansion-madinah",
      titleAr: "شركة رؤية الرخاء للتشطيب المتكامل",
      titleEn: "Ruya Al-Rakhaa Integrated Fit-Out",
      descriptionAr:
        "تشطيب مفتاح للمجمعات السكنية والتجارية في ضواحي المدينة المنورة.",
      descriptionEn:
        "Turnkey fit-out for residential and commercial compounds in Madinah suburbs.",
      address: "المدينة المنورة - طريق الهجرة، حي السلام",
    },
  ],
  "contracting:JEDDAH": [
    {
      slug: "namazij-mqawlat-jeddah",
      titleAr: "مؤسسة نماذج الإعمار للمقاولات",
      titleEn: "Namazij Al-Emaar Contracting",
      descriptionAr:
        "مقاولات بناء عظم للفلل والعمائر في جدة، هيكل خرساني مسلح وإشراف هندسي متكامل.",
      descriptionEn:
        "Structural construction for Jeddah villas and towers — reinforced concrete and full engineering supervision.",
      address: "جدة - حي السلامة، طريق المدينة",
    },
    {
      slug: "ruya-albinaa-contracting-jeddah",
      titleAr: "شركة رؤية البناء للمقاولات العامة",
      titleEn: "Ruya Al-Binaa General Contracting",
      descriptionAr:
        "ترميم وتوسعة المباني التجارية والمستودعات في جدة، خبرة في المشاريع الصناعية.",
      descriptionEn:
        "Commercial building and warehouse renovation and extension in Jeddah — industrial project experience.",
      address: "جدة - المنطقة الصناعية الثانية، حي الخمرة",
    },
    {
      slug: "sahm-gharb-construction-jeddah",
      titleAr: "مؤسسة سهم الغرب للإنشاءات",
      titleEn: "Sahm Al-Gharb Construction",
      descriptionAr:
        "بناء وتشييد الفلل السكنية في جنوب جدة، مطابقة كاملة للكود السعودي للبناء.",
      descriptionEn:
        "Residential villa construction in south Jeddah — full compliance with Saudi Building Code.",
      address: "جدة - حي أبحر الشمالية، طريق الحرمين",
    },
  ],
  "contracting:MAKKAH": [
    {
      slug: "hijaz-namazij-contracting-makkah",
      titleAr: "شركة نماذج الحجاز للمقاولات",
      titleEn: "Namazij Al-Hijaz Contracting",
      descriptionAr:
        "مقاولات ترميم وتأهيل الفنادق والعمائر في مكة المكرمة قبل موسم الحج.",
      descriptionEn:
        "Hotel and tower renovation and rehabilitation in Makkah before Hajj season.",
      address: "مكة المكرمة - حي العتيبية، الشارع العام",
    },
    {
      slug: "qimmat-haram-build-makkah",
      titleAr: "مؤسسة قمة الحرم للبناء",
      titleEn: "Qimmat Al-Haram Build",
      descriptionAr:
        "بناء عظم للفلل والعمائر في أحياء مكة الجديدة، إشراف هندسي من التصميم حتى التسليم.",
      descriptionEn:
        "Structural build for Makkah villas and towers in new districts — design-to-handover supervision.",
      address: "مكة المكرمة - حي الشرقية، الدائر الثاني",
    },
    {
      slug: "surooh-makkah-renovation",
      titleAr: "شركة صروح مكة للترميم",
      titleEn: "Surooh Makkah Renovation",
      descriptionAr:
        "ترميم المباني القديمة في مكة مع الحفاظ على الطابع المعماري المحلي.",
      descriptionEn:
        "Heritage building renovation in Makkah while preserving local architectural character.",
      address: "مكة المكرمة - حي المسفلة، شارع إبراهيم الخليل",
    },
  ],
  "contracting:MADINAH": [
    {
      slug: "arkan-namazij-madinah",
      titleAr: "مؤسسة نماذج أركان للمقاولات",
      titleEn: "Namazij Arkan Contracting",
      descriptionAr:
        "مقاولات عامة للمشاريع السكنية والتجارية في المدينة المنورة، بناء وترميم متكامل.",
      descriptionEn:
        "General contracting for residential and commercial projects in Madinah — build and renovation.",
      address: "المدينة المنورة - حي العريض، طريق قباء",
    },
    {
      slug: "taiba-binaa-contracting-madinah",
      titleAr: "شركة طيبة البناء للمقاولات",
      titleEn: "Taiba Binaa Contracting",
      descriptionAr:
        "بناء وتأهيل الفلل والاستراحات في ضواحي المدينة المنورة بفريق مقاولين معتمدين.",
      descriptionEn:
        "Villa and chalet construction in Madinah suburbs with certified contractor teams.",
      address: "المدينة المنورة - حي الدفاع، طريق الملك خالد",
    },
    {
      slug: "hijra-namozaj-madinah",
      titleAr: "مؤسسة نماذج الهجرة للإعمار",
      titleEn: "Namazij Al-Hijra Development",
      descriptionAr:
        "توسعة وترميم المباني السكنية في المدينة المنورة، هيكل خرساني معتمد.",
      descriptionEn:
        "Residential building extension and renovation in Madinah — certified concrete structure.",
      address: "المدينة المنورة - حي العزيزية، طريق العيون",
    },
  ],
  "elevators:JEDDAH": [
    {
      slug: "ruya-elevators-jeddah",
      titleAr: "شركة الرؤية للمصاعد الكهربائية",
      titleEn: "Al-Ru'ya Electric Elevators",
      descriptionAr:
        "تركيب مصاعد MRL للأبراج السكنية والتجارية في جدة، ضمان 5 سنوات وصيانة دورية.",
      descriptionEn:
        "MRL elevator install for Jeddah residential and commercial towers — 5-year warranty and maintenance.",
      address: "جدة - حي الأندلس، طريق الملك عبدالعزيز",
    },
    {
      slug: "qimam-almas-elevators-jeddah",
      titleAr: "مؤسسة قمم الألماس للمصاعد",
      titleEn: "Qimam Al-Almas Elevators",
      descriptionAr:
        "توريد وتركيب مصاعد إيطالية وألمانية للفلل الفاخرة في جدة مع اعتماد الدفاع المدني.",
      descriptionEn:
        "Italian and German elevator supply for luxury Jeddah villas with civil defense approval.",
      address: "جدة - شارع فلسطين، حي المشرفة",
    },
    {
      slug: "vertical-plus-lifts-jeddah",
      titleAr: "شركة فيرتيكال بلس للمصاعد والسلالم",
      titleEn: "Vertical Plus Lifts & Escalators",
      descriptionAr:
        "صيانة وتحديث المصاعد القديمة في جدة، تركيب سلالم كهربائية للمولات.",
      descriptionEn:
        "Legacy elevator modernization in Jeddah — escalator install for malls and commercial centers.",
      address: "جدة - حي الحمراء، شارع التحلية",
    },
  ],
  "elevators:MAKKAH": [
    {
      slug: "haram-lift-services-makkah",
      titleAr: "شركة خدمات مصاعد الحرم",
      titleEn: "Haram Lift Services",
      descriptionAr:
        "صيانة طوارئ ودورية للمصاعد في فنادق مكة، قطع غيار أصلية على مدار الساعة.",
      descriptionEn:
        "Emergency and periodic elevator maintenance for Makkah hotels — OEM parts 24/7.",
      address: "مكة المكرمة - حي جرول، شارع أجياد",
    },
    {
      slug: "safa-hotel-elevators-makkah",
      titleAr: "مؤسسة صفا للمصاعد الفندقية",
      titleEn: "Safa Hotel Elevators",
      descriptionAr:
        "تركيب مصاعد هيدروليكية للفلل والمباني المنخفضة في مكة بمعايير أمان عالية.",
      descriptionEn:
        "Hydraulic elevator install for Makkah villas and low-rise buildings — high safety standards.",
      address: "مكة المكرمة - حي الزاهر، طريق المسجد الحرام",
    },
    {
      slug: "rukn-harmain-lifts-makkah",
      titleAr: "شركة ركن الحرمين للمصاعد",
      titleEn: "Rukn Al-Haramain Lifts",
      descriptionAr:
        "تحديث المصاعد الهيدروليكية للأبراج السكنية والفندقية في مكة المكرمة.",
      descriptionEn:
        "Hydraulic elevator upgrades for Makkah residential and hotel towers.",
      address: "مكة المكرمة - حي بطحاء قريش",
    },
  ],
  "elevators:MADINAH": [
    {
      slug: "taiba-mrl-elevators-madinah",
      titleAr: "شركة طيبة للمصاعد بدون غرفة",
      titleEn: "Taiba MRL Elevators",
      descriptionAr:
        "تركيب مصاعد MRL وبانوراما للفلل والمباني التجارية في المدينة المنورة.",
      descriptionEn:
        "MRL and panoramic elevator install for Madinah villas and commercial buildings.",
      address: "المدينة المنورة - حي العوالي، شارع قباء",
    },
    {
      slug: "madinah-freight-lifts",
      titleAr: "مؤسسة مصاعد البضائع بالمدينة",
      titleEn: "Madinah Freight Lifts",
      descriptionAr:
        "مصاعد بضائع وركاب للفنادق والمستشفيات في المدينة المنورة، ضمان شامل.",
      descriptionEn:
        "Freight and passenger elevators for Madinah hotels and hospitals — full warranty.",
      address: "المدينة المنورة - حي بني حارثة، طريق الملك عبدالعزيز",
    },
    {
      slug: "khotwa-plus-elevators-madinah",
      titleAr: "شركة خطوة بلس للأنظمة الميكانيكية",
      titleEn: "Khotwa Plus Mechanical Systems",
      descriptionAr:
        "صيانة وتحديث المصاعد في المدينة المنورة، قطع غيار أصلية وفريق فني متخصص.",
      descriptionEn:
        "Elevator maintenance and modernization in Madinah — OEM parts and specialist technicians.",
      address: "المدينة المنورة - طريق الحزام، حي الخالدية",
    },
  ],
  "waterproofing:JEDDAH": [
    {
      slug: "deraa-plus-waterproof-jeddah",
      titleAr: "مؤسسة الدرع بلس للعزل المائي",
      titleEn: "Al-Deraa Plus Waterproofing",
      descriptionAr:
        "عزل أسطح وخزانات ومسابح في جدة، مواد معتمدة وضمان يصل إلى 10 سنوات.",
      descriptionEn:
        "Roof, tank, and pool waterproofing in Jeddah — approved materials with up to 10-year warranty.",
      address: "جدة - حي المروة، طريق الأمير متعب",
    },
    {
      slug: "muahkam-foam-insulation-jeddah",
      titleAr: "شركة محكم للعزل بالفوم",
      titleEn: "Muahkam Foam Insulation",
      descriptionAr:
        "رش فوم بولي يوريثان للعزل الحراري والمائي في جدة، يقلل استهلاك الكهرباء.",
      descriptionEn:
        "Polyurethane foam spray for thermal and waterproof insulation in Jeddah — reduces energy use.",
      address: "جدة - حي الصفا، شارع الأمير مجيد",
    },
    {
      slug: "shield-plus-roof-jeddah",
      titleAr: "مؤسسة درع بلس لعزل الأسطح",
      titleEn: "Shield Plus Roof Insulation",
      descriptionAr:
        "عزل أسطح شينكو والمباني الصناعية في جدة، membrane bituminous معتمد من SASO.",
      descriptionEn:
        "Corrugated roof and industrial insulation in Jeddah — SASO-approved bituminous membrane.",
      address: "جدة - حي النهضة، طريق الأمير محمد بن عبدالعزيز",
    },
  ],
  "waterproofing:MAKKAH": [
    {
      slug: "haram-seal-plus-makkah",
      titleAr: "شركة ختم الحرم بلس للعزل",
      titleEn: "Haram Seal Plus Waterproofing",
      descriptionAr:
        "عزل أسطح الفنادق والعمائر في مكة ضد الأمطار والرطوبة، حلول إيبوكسي للخزانات.",
      descriptionEn:
        "Hotel and tower roof waterproofing in Makkah — epoxy tank solutions against rain and humidity.",
      address: "مكة المكرمة - حي العوالي، طريق الهدا",
    },
    {
      slug: "protection-plus-makkah",
      titleAr: "مؤسسة الحماية بلس للعزل المائي",
      titleEn: "Protection Plus Waterproofing",
      descriptionAr:
        "معالجة التسربات وعزل الخزانات للمباني والفنادق في مكة المكرمة.",
      descriptionEn:
        "Leak treatment and tank waterproofing for Makkah buildings and hotels.",
      address: "مكة المكرمة - حي الكعكية",
    },
    {
      slug: "jabal-arafat-insulation-makkah",
      titleAr: "شركة جبل عرفات للعزل الحراري",
      titleEn: "Jabal Arafat Thermal Insulation",
      descriptionAr:
        "رش فوم عازل للمباني الجديدة في مكة، يقلل استهلاك الطاقة بنسبة تصل إلى 40%.",
      descriptionEn:
        "Insulation foam spray for new Makkah buildings — up to 40% energy savings.",
      address: "مكة المكرمة - حي الشرقية، شارع المطار",
    },
  ],
  "waterproofing:MADINAH": [
    {
      slug: "taiba-thermal-plus-madinah",
      titleAr: "مؤسسة طيبة بلس للعزل الحراري",
      titleEn: "Taiba Plus Thermal Insulation",
      descriptionAr:
        "رش فوم وعزل أسطح شينكو في المدينة المنورة للحد من استهلاك الكهرباء.",
      descriptionEn:
        "Foam spray and corrugated roof insulation in Madinah to reduce electricity consumption.",
      address: "المدينة المنورة - حي سيد الشهداء",
    },
    {
      slug: "noor-insulation-plus-madinah",
      titleAr: "شركة نور بلس للعزل",
      titleEn: "Noor Plus Insulation",
      descriptionAr:
        "عزل خزانات وأسطح للفلل والمستشفيات في المدينة المنورة، ضمان 10 سنوات.",
      descriptionEn:
        "Tank and roof insulation for Madinah villas and hospitals — 10-year warranty.",
      address: "المدينة المنورة - حي العزيزية، طريق سلطانة",
    },
    {
      slug: "sahara-waterproof-madinah",
      titleAr: "مؤسسة صحراء العزل بالمدينة",
      titleEn: "Sahara Madinah Waterproofing",
      descriptionAr:
        "عزل مائي وحراري للمستودعات والمصانع في المنطقة الصناعية بالمدينة.",
      descriptionEn:
        "Waterproof and thermal insulation for Madinah industrial zone warehouses and factories.",
      address: "المدينة المنورة - المنطقة الصناعية، طريق المدينة",
    },
  ],
  "furnishing:JEDDAH": [
    {
      slug: "ofoq-luxury-ffe-jeddah",
      titleAr: "شركة الأفق الفاخرة للتأثيث",
      titleEn: "Al-Ofoq Luxury FF&E",
      descriptionAr:
        "تأثيث الفلل الفاخرة والشقق السكنية في جدة بخطوط أثاث مودرن مستوردة.",
      descriptionEn:
        "Luxury villa and apartment furnishing in Jeddah with imported modern furniture lines.",
      address: "جدة - شارع الستين، حي الروضة",
    },
    {
      slug: "rihana-plus-furniture-jeddah",
      titleAr: "مؤسسة ريحانة بلس للأثاث",
      titleEn: "Rihana Plus Furniture",
      descriptionAr:
        "تجهيز وتأثيث المقرات السكنية والفلل في شمال جدة، غرف نوم ومجالس كاملة.",
      descriptionEn:
        "Residential compound and villa FF&E in north Jeddah — complete bedrooms and majlis suites.",
      address: "جدة - حي الأمير عبدالمجيد، شارع التحلية",
    },
    {
      slug: "layali-hospitality-ffe-jeddah",
      titleAr: "شركة ليالي الضيافة للتأثيث",
      titleEn: "Layali Hospitality FF&E",
      descriptionAr:
        "تأثيث الشقق الفندقية والاستراحات في جدة بمعايير الضيافة الفاخرة.",
      descriptionEn:
        "Serviced apartment and chalet furnishing in Jeddah to luxury hospitality standards.",
      address: "جدة - حي الشاطئ، طريق الكورنيش",
    },
  ],
  "furnishing:MAKKAH": [
    {
      slug: "diyar-haram-ffe-makkah",
      titleAr: "مؤسسة ديار الحرم للتأثيث",
      titleEn: "Diyar Al-Haram FF&E",
      descriptionAr:
        "تجهيز الفنادق ودور إسكان الحجاج في مكة بأسعار منافسة وجودة عالية.",
      descriptionEn:
        "Hotel and pilgrim housing furnishing in Makkah — competitive pricing and high quality.",
      address: "مكة المكرمة - حي التنعيم",
    },
    {
      slug: "baraka-plus-hotel-ffe-makkah",
      titleAr: "شركة بركة بلس للتأثيث الفندقي",
      titleEn: "Baraka Plus Hotel FF&E",
      descriptionAr:
        "تأثيث الشقق المفروشة في مكة، أسرّة فندقية وستائر بمعايير الضيافة.",
      descriptionEn:
        "Furnished apartment FF&E in Makkah — hotel beds and curtains to hospitality standards.",
      address: "مكة المكرمة - حي العزيزية، شارع المنصور",
    },
    {
      slug: "ridwan-haram-ffe-makkah",
      titleAr: "شركة رضوان الحرم للتأثيث الفندقي",
      titleEn: "Ridwan Al-Haram Hotel FF&E",
      descriptionAr:
        "تأثيث دور إسكان الحجاج والمعتمرين بأسعار جملة وتسليم قبل موسم الحج.",
      descriptionEn:
        "Bulk furnishing for pilgrim housing — wholesale pricing and pre-Hajj delivery.",
      address: "مكة المكرمة - حي المسفلة، طريق أم القرى",
    },
  ],
  "furnishing:MADINAH": [
    {
      slug: "zahra-luxury-furniture-madinah",
      titleAr: "مفروشات زهرة الفاخرة بالمدينة",
      titleEn: "Zahra Luxury Furniture Madinah",
      descriptionAr:
        "فرش وتجهيز الفلل وشقق الإيجار اليومي في المدينة المنورة بتصاميم مودرن.",
      descriptionEn:
        "Villa and daily-rental furnishing in Madinah with modern bespoke designs.",
      address: "المدينة المنورة - طريق المطار، حي العريض",
    },
    {
      slug: "taiba-hotel-ffe-madinah",
      titleAr: "شركة طيبة للتأثيث الفندقي",
      titleEn: "Taiba Hotel FF&E",
      descriptionAr:
        "تأثيث الفنادق والشقق الفندقية في المدينة، تركيب مجاني وخطوط عصرية.",
      descriptionEn:
        "Hotel and serviced apartment FF&E in Madinah — free installation and contemporary lines.",
      address: "المدينة المنورة - حي قباء، طريق الملك فيصل",
    },
    {
      slug: "rawdah-office-furniture-madinah",
      titleAr: "مؤسسة روضة لأثاث المكاتب",
      titleEn: "Rawdah Office Furniture",
      descriptionAr:
        "تجهيز المكاتب والمقاهي في المدينة المنورة، طاولات وكراسي وإكسسوارات.",
      descriptionEn:
        "Office and café furnishing in Madinah — tables, chairs, and accessories.",
      address: "المدينة المنورة - حي السلام، شارع ساري",
    },
  ],
  "facades:JEDDAH": [
    {
      slug: "bareeq-plus-facades-jeddah",
      titleAr: "مؤسسة بريق بلس للواجهات",
      titleEn: "Bareeq Plus Facades",
      descriptionAr:
        "جلي وتلميع الرخام بالألماس، تنظيف واجهات زجاج وكلادينج للأبراج في جدة.",
      descriptionEn:
        "Diamond marble polish and glass/cladding facade cleaning for Jeddah towers.",
      address: "جدة - طريق الملك عبدالعزيز، حي الشاطئ",
    },
    {
      slug: "crystal-facade-care-jeddah",
      titleAr: "شركة كريستال لعناية الواجهات",
      titleEn: "Crystal Facade Care",
      descriptionAr:
        "صيانة واجهات الزجاج للمراكز التجارية في جدة باستخدام رافعات المرتفعات.",
      descriptionEn:
        "Glass facade maintenance for Jeddah commercial centers using MEWPs.",
      address: "جدة - حي الرويس، برج المملكة",
    },
    {
      slug: "almas-marble-care-jeddah",
      titleAr: "مؤسسة الألماس لعناية الرخام",
      titleEn: "Al-Almas Marble Care",
      descriptionAr:
        "جلي وتلميع الرخام والجرانيت للفلل والفنادق في جدة، حماية بلورية طويلة الأمد.",
      descriptionEn:
        "Marble and granite polish for Jeddah villas and hotels — long-lasting crystallization protection.",
      address: "جدة - حي الحمراء، شارع الأمير سلطان",
    },
  ],
  "facades:MAKKAH": [
    {
      slug: "marwa-facade-plus-makkah",
      titleAr: "شركة المروة بلس لصيانة الواجهات",
      titleEn: "Al-Marwa Plus Facade Maintenance",
      descriptionAr:
        "تنظيف واجهات الفنادق والأبراج في مكة بالسقالات ورافعات المرتفعات.",
      descriptionEn:
        "Hotel and tower facade cleaning in Makkah with scaffolding and MEWPs.",
      address: "مكة المكرمة - حي الرصيفة",
    },
    {
      slug: "safa-glass-wash-makkah",
      titleAr: "مؤسسة صفا لغسيل الواجهات",
      titleEn: "Safa Glass Facade Wash",
      descriptionAr:
        "غسيل واجهات زجاج وكلادينج في مكة، إزالة الأوساخ والملاح بمواد صديقة للبيئة.",
      descriptionEn:
        "Glass and cladding facade washing in Makkah — eco-friendly salt and dirt removal.",
      address: "مكة المكرمة - حي العزيزية، طريق الحج",
    },
    {
      slug: "noor-cladding-plus-makkah",
      titleAr: "شركة نور بلس للكلادينج",
      titleEn: "Noor Plus Cladding Services",
      descriptionAr:
        "صيانة وترميم واجهات الكلادينج للمباني الفندقية والتجارية في مكة.",
      descriptionEn:
        "Cladding facade maintenance and repair for Makkah hotel and commercial buildings.",
      address: "مكة المكرمة - حي الزاهر، شارع أجياد",
    },
  ],
  "facades:MADINAH": [
    {
      slug: "ballorat-plus-facades-madinah",
      titleAr: "مؤسسة بلورة بلس للواجهات",
      titleEn: "Ballorat Plus Facades",
      descriptionAr:
        "تلميع الرخام الطبيعي وتنظيف واجهات المباني التجارية في المدينة المنورة.",
      descriptionEn:
        "Natural marble polish and commercial facade cleaning in Madinah.",
      address: "المدينة المنورة - حي القبلتين",
    },
    {
      slug: "taiba-marble-care-madinah",
      titleAr: "شركة طيبة لعناية الرخام",
      titleEn: "Taiba Marble Care",
      descriptionAr:
        "جلي رخام المساجد والفلل في المدينة، استعادة اللمعان الأصلي للأرضيات.",
      descriptionEn:
        "Mosque and villa marble polish in Madinah — restoring original floor shine.",
      address: "المدينة المنورة - حي العوالي، طريق قباء",
    },
    {
      slug: "qubbat-facade-plus-madinah",
      titleAr: "مؤسسة قبة بلس للواجهات",
      titleEn: "Qubbat Plus Facade Services",
      descriptionAr:
        "تنظيف وصيانة واجهات الزجاج والحجر للمباني التاريخية والتجارية.",
      descriptionEn:
        "Glass and stone facade cleaning for historic and commercial Madinah buildings.",
      address: "المدينة المنورة - حي بني ظفر، شارع الملك عبدالعزيز",
    },
  ],
};
