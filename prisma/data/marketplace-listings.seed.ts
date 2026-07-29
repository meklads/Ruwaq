import type { MarketplaceCity } from "@prisma/client";

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

/** 7 categories × 3 cities = 21 verified provider listings */
export const MARKETPLACE_LISTING_SEEDS: ListingSeed[] = [
  // —— HVAC ——
  {
    categorySlug: "hvac",
    city: "JEDDAH",
    slug: "breeze-central-hvac-jeddah",
    titleAr: "شركة نسيم المركزي للتكييف",
    titleEn: "Breeze Central HVAC",
    descriptionAr:
      "متخصصون في توريد وتركيب وصيانة أنظمة التكييف المركزي والدكت للفلل والفنادق والأبراج في جدة. فريق فني معتمد، عقود صيانة سنوية، واستجابة طوارئ خلال 4 ساعات في المنطقة الغربية.",
    descriptionEn:
      "Central AC and ducting supply, install, and maintenance for villas, hotels, and towers in Jeddah. Certified technicians, annual maintenance contracts, and 4-hour emergency response.",
    phone: "+966512345601",
    whatsapp: "+966512345601",
    address: "جدة، حي الروضة، شارع الأمير سلطان",
    isVerified: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1631545806609-59eccf0542b2?w=800&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269b663947?w=800&q=80",
    ],
  },
  {
    categorySlug: "hvac",
    city: "MAKKAH",
    slug: "haram-cooling-makkah",
    titleAr: "مؤسسة تبريد الحرم للتكييف",
    titleEn: "Haram Cooling Co.",
    descriptionAr:
      "خبرة في صيانة وتشغيل أنظمة التكييف للفنادق والمباني السكنية القريبة من الحرم. نغطي كاسيت وسبليت وVRF مع تقارير دورية للمشتري.",
    descriptionEn:
      "AC operations and maintenance for hotels and residential buildings near the holy sites. Cassette, split, and VRF with periodic owner reports.",
    phone: "+966512345602",
    whatsapp: "+966512345602",
    address: "مكة المكرمة، العزيزية، طريق أم القرى",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"],
  },
  {
    categorySlug: "hvac",
    city: "MADINAH",
    slug: "madinah-chill-hvac",
    titleAr: "مجموعة المدينة للتبريد",
    titleEn: "Madinah Chill Group",
    descriptionAr:
      "تركيب وصيانة تكييف مركزي ومستشفيات ومجمعات سكنية في المدينة المنورة. عقود تشغيل للموسم مع فرق على مدار الساعة.",
    descriptionEn:
      "Central AC for hospitals and residential compounds in Madinah. Seasonal O&M contracts with 24/7 teams.",
    phone: "+966512345603",
    whatsapp: "+966512345603",
    address: "المدينة المنورة، قباء، طريق الملك عبدالعزيز",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80"],
  },

  // —— Fit-out ——
  {
    categorySlug: "fit-out",
    city: "JEDDAH",
    slug: "ruwaq-luxe-fitout-jeddah",
    titleAr: "رواق لوكس للتشطيبات والتصميم",
    titleEn: "Ruwaq Luxe Fit-Out",
    descriptionAr:
      "تصميم داخلي وتشطيب فاخر للفلل والمقرات التجارية والفنادق Boutique في جدة. جبس، رخام، أرضيات، ومطابخ حسب مواصفات الضيافة السعودية.",
    descriptionEn:
      "Luxury interior design and fit-out for villas, offices, and boutique hotels in Jeddah. Gypsum, marble, flooring, and hospitality-grade kitchens.",
    phone: "+966512345604",
    whatsapp: "+966512345604",
    address: "جدة، الشاطئ، كورنيش جدة",
    isVerified: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    ],
  },
  {
    categorySlug: "fit-out",
    city: "MAKKAH",
    slug: "makkah-interiors-fitout",
    titleAr: "مكة للتشطيبات الفندقية",
    titleEn: "Makkah Hotel Interiors",
    descriptionAr:
      "تشطيب وتأثيث غرف فندقية وشقق مفروشة للحج والعمرة. جداول زمنية مضبوطة، مواد معتمدة، وتنسيق مع الدفاع المدني.",
    descriptionEn:
      "Hotel room and serviced apartment fit-out for pilgrimage hospitality. Tight schedules, approved materials, civil defense coordination.",
    phone: "+966512345605",
    whatsapp: "+966512345605",
    address: "مكة المكرمة، شارع إبراهيم الخليل",
    isVerified: true,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"],
  },
  {
    categorySlug: "fit-out",
    city: "MADINAH",
    slug: "nour-design-madinah",
    titleAr: "نور للتصميم الداخلي",
    titleEn: "Nour Interior Design",
    descriptionAr:
      "تصميم وتنفيذ تشطيبات سكنية وتجارية في المدينة مع فريق هندسي معتمد. نركز على كفاءة الطاقة والمواد المحلية عالية الجودة.",
    descriptionEn:
      "Residential and commercial fit-out in Madinah with an certified engineering team. Focus on energy efficiency and premium local materials.",
    phone: "+966512345606",
    whatsapp: "+966512345606",
    address: "المدينة المنورة، العوالي",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"],
  },

  // —— Contracting ——
  {
    categorySlug: "contracting",
    city: "JEDDAH",
    slug: "red-sea-contracting-jeddah",
    titleAr: "مقاولات البحر الأحمر",
    titleEn: "Red Sea General Contracting",
    descriptionAr:
      "مقاولات عامة، ترميم فنادق، وملاحق سكنية في جدة ومكة. إدارة مشروع، HSE، وضمانات بنكية للمشاريع متوسطة وكبرى.",
    descriptionEn:
      "General contracting, hotel renovation, and residential annexes. Project management, HSE, and bank guarantees for mid/large projects.",
    phone: "+966512345607",
    whatsapp: "+966512345607",
    address: "جدة، حي الزهراء، طريق المدينة",
    isVerified: true,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"],
  },
  {
    categorySlug: "contracting",
    city: "MAKKAH",
    slug: "sharafiah-build-makkah",
    titleAr: "شركة الشرافية للمقاولات",
    titleEn: "Sharafiah Contracting",
    descriptionAr:
      "بناء عظم، ترميم مباني قديمة، وتوسعات للفنادق في مكة. خبرة 15 عاماً في مشاريع الحج الموسمية.",
    descriptionEn:
      "Structural works, heritage building renovation, and hotel extensions in Makkah. 15 years on seasonal Hajj projects.",
    phone: "+966512345608",
    whatsapp: "+966512345608",
    address: "مكة المكرمة، الشرائع",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"],
  },
  {
    categorySlug: "contracting",
    city: "MADINAH",
    slug: "hejaz-builders-madinah",
    titleAr: "بناة الحجاز",
    titleEn: "Hejaz Builders",
    descriptionAr:
      "مقاولات ترميم وتشغيل مواقع سكنية وتجارية في المدينة. فرق عمالة منظمة وجدول تسليم واضح.",
    descriptionEn:
      "Renovation and site works for residential and commercial assets in Madinah. Organized crews and clear delivery schedules.",
    phone: "+966512345609",
    whatsapp: "+966512345609",
    address: "المدينة المنورة، الحرة الشرقية",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1590644365607-1c4a519a7225?w=800&q=80"],
  },

  // —— Elevators ——
  {
    categorySlug: "elevators",
    city: "JEDDAH",
    slug: "ascend-elevators-jeddah",
    titleAr: "أسند للمصاعد",
    titleEn: "Ascend Elevators",
    descriptionAr:
      "توريد وتركيب مصاعد ركاب وبضائع للأبراج والفنادق. صيانة دورية واعتمادات الدفاع المدني.",
    descriptionEn:
      "Passenger and freight elevator supply and install for towers and hotels. Maintenance and civil defense approvals.",
    phone: "+966512345610",
    whatsapp: "+966512345610",
    address: "جدة، حي الصفا",
    isVerified: true,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"],
  },
  {
    categorySlug: "elevators",
    city: "MAKKAH",
    slug: "vertical-makkah-elevators",
    titleAr: "فرتيكال مكة للمصاعد",
    titleEn: "Vertical Makkah Elevators",
    descriptionAr:
      "تركيب مصاعد فندقية عالية الاستخدام مع قطع غيار أصلية. عقود SLA للموسم.",
    descriptionEn:
      "High-traffic hotel elevator installs with OEM parts. Seasonal SLA contracts.",
    phone: "+966512345611",
    whatsapp: "+966512345611",
    address: "مكة المكرمة، المسفلة",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"],
  },
  {
    categorySlug: "elevators",
    city: "MADINAH",
    slug: "madinah-lift-co",
    titleAr: "المدينة للمصاعد",
    titleEn: "Madinah Lift Co.",
    descriptionAr:
      "صيانة وتحديث مصاعد المجمعات السكنية والمستشفيات في المدينة المنورة.",
    descriptionEn:
      "Maintenance and modernization for residential and hospital elevators in Madinah.",
    phone: "+966512345612",
    whatsapp: "+966512345612",
    address: "المدينة المنورة، السلام",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"],
  },

  // —— Waterproofing ——
  {
    categorySlug: "waterproofing",
    city: "JEDDAH",
    slug: "shield-waterproof-jeddah",
    titleAr: "شيلد للعزل المائي",
    titleEn: "Shield Waterproofing",
    descriptionAr:
      "عزل أسطح فوم وPU، خزانات، ومسابح للفلل والفنادق الساحلية في جدة. ضمان 10 سنوات على الأعمال.",
    descriptionEn:
      "Foam and PU roof insulation, tanks, and pools for coastal villas and hotels in Jeddah. 10-year workmanship warranty.",
    phone: "+966512345613",
    whatsapp: "+966512345613",
    address: "جدة، أبحر الشمالية",
    isVerified: true,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"],
  },
  {
    categorySlug: "waterproofing",
    city: "MAKKAH",
    slug: "wadi-seal-makkah",
    titleAr: "وادي سيل للعزل",
    titleEn: "Wadi Seal Insulation",
    descriptionAr:
      "معالجة تسربات وعزل حراري للمباني في المناطق الجبلية بمكة. فحص بالتصوير الحراري.",
    descriptionEn:
      "Leak repair and thermal insulation for mountain-area buildings in Makkah. Thermal imaging surveys.",
    phone: "+966512345614",
    whatsapp: "+966512345614",
    address: "مكة المكرمة، العكيشية",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"],
  },
  {
    categorySlug: "waterproofing",
    city: "MADINAH",
    slug: "oasis-insulation-madinah",
    titleAr: "واحة العزل",
    titleEn: "Oasis Insulation",
    descriptionAr:
      "عزل أسطح وخزانات للمشاريع الحكومية والسكنية في المدينة. مواد معتمدة SASO.",
    descriptionEn:
      "Roof and tank waterproofing for government and residential projects in Madinah. SASO-approved materials.",
    phone: "+966512345615",
    whatsapp: "+966512345615",
    address: "المدينة المنورة، بدر",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"],
  },

  // —— Furnishing ——
  {
    categorySlug: "furnishing",
    city: "JEDDAH",
    slug: "hospitality-ff-e-jeddah",
    titleAr: "ضيافة للتأثيث الفندقي",
    titleEn: "Hospitality FF&E",
    descriptionAr:
      "تأثيث فنادق وشقق serviced apartments في جدة. توريد أثاث، ستائر، ومفروشات ضيافة مع التركيب.",
    descriptionEn:
      "Hotel and serviced apartment FF&E in Jeddah. Furniture, drapery, and hospitality soft goods with install.",
    phone: "+966512345616",
    whatsapp: "+966512345616",
    address: "جدة، حي المحمدية",
    isVerified: true,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80"],
  },
  {
    categorySlug: "furnishing",
    city: "MAKKAH",
    slug: "hajj-housing-furnish-makkah",
    titleAr: "إسكان الحج للتأثيث",
    titleEn: "Hajj Housing Furnish",
    descriptionAr:
      "تجهيز إسكان حجاج وغرف جماعية بمفروشات مقاومة للاستخدام العالي. تسليم قبل موسم الحج.",
    descriptionEn:
      "Furnishing pilgrim housing and dorm-style rooms with durable FF&E. Delivery before Hajj season.",
    phone: "+966512345617",
    whatsapp: "+966512345617",
    address: "مكة المكرمة، المعابدة",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"],
  },
  {
    categorySlug: "furnishing",
    city: "MADINAH",
    slug: "madinah-stay-furnishing",
    titleAr: "مدائن للإقامة المفروشة",
    titleEn: "Madinah Stay Furnishing",
    descriptionAr:
      "تأثيث فلل وشقق إيجار يومي بالقرب من المسجد النبوي. حزم جاهزة خلال 72 ساعة.",
    descriptionEn:
      "Furnishing villas and daily-rental apartments near the Prophet's Mosque. Ready packages within 72 hours.",
    phone: "+966512345618",
    whatsapp: "+966512345618",
    address: "المدينة المنورة، المركزية",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"],
  },

  // —— Facades ——
  {
    categorySlug: "facades",
    city: "JEDDAH",
    slug: "crystal-facades-jeddah",
    titleAr: "كريستال لجلي الواجهات",
    titleEn: "Crystal Facade & Marble",
    descriptionAr:
      "غسيل واجهات زجاج وكلادينج، جلي وتلميع رخام للفنادق والأبراج في جدة. فرق معلقة ومعدات معتمدة.",
    descriptionEn:
      "Glass and cladding facade cleaning, marble polish for Jeddah towers and hotels. Rope access and certified equipment.",
    phone: "+966512345619",
    whatsapp: "+966512345619",
    address: "جدة، حي الفيصلية",
    isVerified: true,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"],
  },
  {
    categorySlug: "facades",
    city: "MAKKAH",
    slug: "haram-view-facades-makkah",
    titleAr: "إطلالة الحرم للواجهات",
    titleEn: "Haram View Facades",
    descriptionAr:
      "تنظيف واجهات فندقية بجوار الحرم مع جدولة ليلية لتقليل الإزعاج. جلي رخام المداخل واللوبي.",
    descriptionEn:
      "Facade cleaning for hotels near the Haram with night schedules. Marble care for lobbies and entrances.",
    phone: "+966512345620",
    whatsapp: "+966512345620",
    address: "مكة المكرمة، أجياد",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"],
  },
  {
    categorySlug: "facades",
    city: "MADINAH",
    slug: "marble-pro-madinah",
    titleAr: "محترف الرخام بالمدينة",
    titleEn: "Marble Pro Madinah",
    descriptionAr:
      "جلي وتلميع رخام للفلل والمساجد والمجمعات التجارية. معالجة البقع وحمى كريستالايز.",
    descriptionEn:
      "Marble grinding and polishing for villas, mosques, and retail complexes. Stain treatment and crystallization.",
    phone: "+966512345621",
    whatsapp: "+966512345621",
    address: "المدينة المنورة، الخالدية",
    isVerified: true,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"],
  },
];
