import type { Locale } from "../locale";

export type LuxuryMessages = {
  brand: { name: string; tagline: string };
  nav: {
    home: string;
    interiorDesign: string;
    construction: string;
    ourWork: string;
    about: string;
    contact: string;
    workspace: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  partnership: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
    ctaLabel: string;
    ctaHref: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: readonly { title: string; description: string }[];
  };
  spotlight: {
    eyebrow: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    items: readonly {
      title: string;
      category: string;
      description: string;
      execution: string;
    }[];
  };
  services: {
    eyebrow: string;
    title: string;
    items: readonly {
      title: string;
      description: string;
      cta: string;
      href: string;
    }[];
  };
  why: {
    eyebrow: string;
    title: string;
    items: readonly { title: string; description: string }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    cta: string;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: readonly { title: string; description: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: readonly { quote: string; author: string; role: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    about: string;
    quickLinks: string;
    importantLinks: string;
    servicesLinks: string;
    solutionsLinks: string;
    offices: string;
    countries: {
      saudiArabia: string;
      oman: string;
      bahrain: string;
      egypt: string;
    };
    contact: string;
    workspace: string;
    workspaceDesc: string;
    workspaceCta: string;
    copyright: string;
    privacy: string;
    terms: string;
    address: string;
    email: string;
    phone: string;
    poweredByPrefix: string;
    poweredByLink: string;
    insightsLink: string;
    ghProjectLaunchLink: string;
  };
  pages: {
    interiorDesign: { title: string; intro: string };
    construction: { title: string; intro: string };
    ourWork: { title: string; intro: string };
    about: { title: string; intro: string };
    contact: { title: string; intro: string; formName: string; formEmail: string; formMessage: string; formSubmit: string };
  };
};

const en: LuxuryMessages = {
  brand: { name: "TURRIVA", tagline: "FIXED DECOR · CONTRACTING" },
  nav: {
    home: "HOME",
    interiorDesign: "LUXURY FIT-OUT",
    construction: "CONTRACTING",
    ourWork: "OUR WORK",
    about: "ABOUT",
    contact: "CONTACT",
    workspace: "WORKSPACE",
  },
  hero: {
    eyebrow: "Fixed decor & premium contracting",
    title: "Luxury fit-out\nyou can walk into.",
    subtitle:
      "Turriva Real Estate executes fixed interior decor for villas and palaces, premium contracting, and seasonal exhibition booths — with a calm luxury aesthetic and site-ready delivery across Jeddah, Makkah, and Riyadh.",
    ctaPrimary: "DISCUSS YOUR PROJECT",
    ctaSecondary: "VIEW SELECTED WORK",
  },
  partnership: {
    eyebrow: "Execution with Graphics House",
    title: "The on-site arm for fixed decor & campaign build-outs",
    body:
      "Turriva is the executive contracting arm of Graphics House for fixed interior decor and fixed advertising environments. We turn approved visual concepts into real materials, joinery, lighting, and booth structures — without turning your property into a visualization studio.",
    note:
      "When a launch needs cinematic CGI or interactive sales suites, Graphics House leads the experience layer; Turriva leads build, fit-out, and handover.",
    ctaLabel: "Graphics House ProjectLaunch™",
    ctaHref: "https://3dgraphicshouse.com/solutions/project-launch.html",
  },
  capabilities: {
    eyebrow: "What we execute",
    title: "Built for permanence — and for high-stakes seasons",
    items: [
      {
        title: "Villas & palaces",
        description:
          "Full fixed fit-out: joinery, stone, metal, lighting, and bespoke furniture — luxury residential without compromise.",
      },
      {
        title: "Premium contracting",
        description:
          "Structured delivery, trade coordination, and QC so design intent survives the construction site.",
      },
      {
        title: "Seasonal exhibitions",
        description:
          "Fixed advertising decor and booth environments for seasonal fairs and institutional showcases — installed, styled, and ready to sell.",
      },
    ],
  },
  spotlight: {
    eyebrow: "Selected context",
    title: "Enriched by Graphics House experience",
    subtitle:
      "A few launch environments from the Graphics House ecosystem — Turriva’s role is execution, materials, and on-site decor.",
    disclaimer:
      "References illustrate capability context; Turriva remains a decor and contracting company, not a visualization agency.",
    items: [
      {
        title: "Anan Eskan",
        category: "Residential launch · Riyadh",
        description:
          "A developer needed sales readiness before concrete caught up with the masterplan — unified visual language across film, model, and showroom.",
        execution:
          "Turriva-class delivery: fixed showroom decor, material continuity, and install discipline so the project reads as market-ready.",
      },
      {
        title: "Institutional exhibition environment",
        category: "Museum-grade booth · Makkah region",
        description:
          "A high-profile exhibition demanded institutional presence, large-format storytelling, and tight timelines.",
        execution:
          "Fixed decor, structural booth elements, and on-site styling — the physical layer that makes the narrative believable in minutes.",
      },
      {
        title: "Private luxury villa",
        category: "Fixed interior · Western Region",
        description:
          "Quiet luxury: warm palettes, custom joinery, and lighting layers that feel collected, not staged.",
        execution:
          "End-to-end fit-out with Turriva craftsmanship standards — the kind of finish clients expect in palace-grade residences.",
      },
    ],
  },
  services: {
    eyebrow: "OUR CRAFT",
    title: "Decor and contracting — not renders",
    items: [
      {
        title: "Fixed luxury interiors",
        description:
          "Permanent decor for villas, palaces, and private residences — materials, joinery, and lighting executed on site.",
        cta: "FIT-OUT SERVICES",
        href: "/interior-design",
      },
      {
        title: "Contracting & delivery",
        description:
          "Premium contracting with disciplined phasing, trade management, and handover that matches the design intent.",
        cta: "CONTRACTING",
        href: "/construction",
      },
      {
        title: "Exhibition & fixed advertising decor",
        description:
          "Seasonal booths, sales suites, and campaign build-outs — built to sell, then dismantled or refreshed on schedule.",
        cta: "TALK TO US",
        href: "/contact",
      },
    ],
  },
  why: {
    eyebrow: "WHY TURRIVA",
    title: "The Art of Luxury Living",
    items: [
      { title: "Timeless Design", description: "Elegant proportions and refined aesthetics that endure beyond trends." },
      { title: "Premium Quality", description: "Fine materials, vetted suppliers, and uncompromising standards." },
      { title: "Attention to Detail", description: "Every junction, texture, and finish considered with care." },
      { title: "On-Time Delivery", description: "Structured project management with clear milestones and accountability." },
    ],
  },
  projects: {
    eyebrow: "OUR WORK",
    title: "Crafting Extraordinary Spaces",
    cta: "VIEW ALL PROJECTS",
  },
  process: {
    eyebrow: "OUR PROCESS",
    title: "From Vision to Reality",
    steps: [
      { title: "Discovery", description: "Understanding your vision, lifestyle, and spatial requirements." },
      { title: "Design", description: "Concept development, materials, and detailed design documentation." },
      { title: "Execution", description: "Skilled craftsmen and site teams bringing the design to life." },
      { title: "Delivery", description: "Final styling, quality checks, and a flawless handover." },
    ],
  },
  testimonials: {
    eyebrow: "CLIENT VOICES",
    title: "Trusted by Discerning Clients",
    items: [
      {
        quote: "Turriva transformed our villa into a sanctuary of calm luxury. Every detail exceeded our expectations.",
        author: "Private Client",
        role: "Luxury Villa, Riyadh",
      },
      {
        quote: "Exceptional craftsmanship and seamless project management from first meeting to handover.",
        author: "Development Group",
        role: "Hospitality Project, Jeddah",
      },
    ],
  },
  cta: {
    title: "Let's Build Something Extraordinary",
    subtitle: "Share your vision with our team and begin your luxury project journey.",
    button: "GET IN TOUCH",
  },
  footer: {
    about:
      "Turriva Real Estate executes fixed decor and premium contracting for villas, palaces, and seasonal exhibition environments — the on-site arm of Graphics House for build and handover.",
    quickLinks: "Quick Links",
    importantLinks: "Important Links",
    servicesLinks: "Services",
    solutionsLinks: "Solutions",
    offices: "Offices",
    countries: {
      saudiArabia: "Saudi Arabia",
      oman: "Oman",
      bahrain: "Bahrain",
      egypt: "Egypt",
    },
    contact: "Contact Us",
    workspace: "Platform",
    workspaceDesc: "Professional quotes and project management for your team.",
    workspaceCta: "Open workspace",
    copyright: "© Turriva. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    address: "Riyadh, Saudi Arabia",
    email: "hello@turriva.co",
    phone: "+966 11 000 0000",
    poweredByPrefix: "Turriva by",
    poweredByLink: "Graphics House",
    insightsLink: "Design preview (internal)",
    ghProjectLaunchLink: "ProjectLaunch™ by Graphics House",
  },
  pages: {
    interiorDesign: {
      title: "Luxury fit-out",
      intro: "Bespoke luxury interiors for Saudi Arabia's most discerning clients.",
    },
    construction: {
      title: "Construction",
      intro: "Premium construction for villas, palaces, and exclusive developments.",
    },
    ourWork: {
      title: "Our Work",
      intro: "A curated portfolio of luxury residential and hospitality projects.",
    },
    about: {
      title: "About Turriva Real Estate",
      intro: "Craftsmanship, elegance, and quiet confidence — built in Saudi Arabia.",
    },
    contact: {
      title: "Contact Us",
      intro: "Begin your luxury project with a private consultation.",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Tell us about your project",
      formSubmit: "Send Message",
    },
  },
};

const ar: LuxuryMessages = {
  brand: { name: "توريفا العقارية", tagline: "ديكور ثابت · مقاولات" },
  nav: {
    home: "الرئيسية",
    interiorDesign: "التشطيب الفاخر",
    construction: "المقاولات",
    ourWork: "أعمالنا",
    about: "من نحن",
    contact: "تواصل",
    workspace: "المنصة",
  },
  hero: {
    eyebrow: "ديكور ثابت ومقاولات فاخرة",
    title: "ديكور ثابت\nتدخله وتعيشه.",
    subtitle:
      "توريفا العقارية تنفّذ الديكور الثابت للفلل والقصور، التشطيبات الفاخرة، وديكور البوث والمعارض الموسمية — بأسلوب luxury هادئ وتسليم ميداني في جدة ومكة والرياض.",
    ctaPrimary: "ناقش مشروعك",
    ctaSecondary: "أعمال مختارة",
  },
  partnership: {
    eyebrow: "التنفيذ مع Graphics House",
    title: "الذراع التنفيذي للديكور الثابت والإعلاني",
    body:
      "توريفا العقارية هي الذراع التنفيذي لـ Graphics House في الديكور الداخلي الثابت والديكور الإعلاني الثابت. نحوّل المفاهيم المعتمدة إلى خامات حقيقية، نجارة، إضاءة، وهياكل بوث — دون أن يتحول مشروعك إلى استوديو تصور.",
    note:
      "عندما يحتاج الإطلاق إلى CGI سينمائي أو صالات بيع تفاعلية، Graphics House تقود طبقة التجربة؛ توريفا تقود التنفيذ والتشطيب والتسليم.",
    ctaLabel: "ProjectLaunch™ من Graphics House",
    ctaHref: "https://3dgraphicshouse.com/solutions/project-launch.html",
  },
  capabilities: {
    eyebrow: "ماذا ننفّذ",
    title: "للثبات في الفلل — وللمواسم الحاسمة",
    items: [
      {
        title: "فلل وقصور",
        description:
          "تشطيب ثابت كامل: نجارة، حجر، معدن، إضاءة، وأثاث مخصص — سكن فاخر بلا مساومة.",
      },
      {
        title: "مقاولات فاخرة",
        description:
          "تنسيق trades ومراحل واضحة وضبط جودة حتى يصل التصميم إلى الموقع كما وُعد.",
      },
      {
        title: "معارض موسمية",
        description:
          "ديكور إعلاني ثابت وبوث للمعارض الموسمية والفعاليات — تركيب وتنسيق وجاهزية للبيع.",
      },
    ],
  },
  spotlight: {
    eyebrow: "سياق مختار",
    title: "إثراء من خبرة Graphics House",
    subtitle:
      "بيئات إطلاق من منظومة Graphics House — دور توريفا هو التنفيذ والخامات والديكور الميداني.",
    disclaimer:
      "المراجع توضّح السياق فقط؛ توريفا شركة ديكور ومقاولات وليست وكالة تصور.",
    items: [
      {
        title: "عنان إسكان",
        category: "إطلاق سكني · الرياض",
        description:
          "مطوّر يحتاج جاهزية بيع قبل أن تلحق الخرسانة بالمخطط — لغة بصرية واحدة بين الفيلم والمجسم وصالة العرض.",
        execution:
          "تنفيذ من نوع توريفا: ديكور ثابت لصالة العرض، استمرارية خامات، وانضباط تركيب يقرأ المشروع جاهزاً للسوق.",
      },
      {
        title: "بيئة معرض مؤسسية",
        category: "بوث بمعايير مؤسسية · مكة المكرمة",
        description:
          "معرض برتبة مؤسسية يتطلب حضوراً قوياً، سرداً كبيراً، وجداول زمنية ضيقة.",
        execution:
          "ديكور ثابت، عناصر بوث هيكلية، وتنسيق ميداني — الطبقة المادية التي تقنع الزائر في دقائق.",
      },
      {
        title: "فيلا فاخرة خاصة",
        category: "ديكور داخلي ثابت · المنطقة الغربية",
        description:
          "فخامة هادئة: خامات دافئة، نجارة مخصصة، وطبقات إضاءة تبدو مُجمّعة لا «مسرّحاً».",
        execution:
          "تشطيب متكامل بمعايير حرفية توريفا — تشطيب يليق بالقصور والفلل الراقية.",
      },
    ],
  },
  services: {
    eyebrow: "حرفتنا",
    title: "ديكور ومقاولات — لا معاينات فقط",
    items: [
      {
        title: "ديكور داخلي ثابت",
        description:
          "ديكور دائم للفلل والقصور — خامات ونجارة وإضاءة تُنفَّذ في الموقع.",
        cta: "خدمات التشطيب",
        href: "/interior-design",
      },
      {
        title: "مقاولات وتسليم",
        description:
          "مقاولات فاخرة بمراحل واضحة وإدارة trades وتسليم يطابق التصميم.",
        cta: "المقاولات",
        href: "/construction",
      },
      {
        title: "معارض وديكور إعلاني",
        description:
          "بوث موسمية وصالات بيع — تُبنى لتقنع العميل ثم تُفك أو تُحدَّث حسب الموسم.",
        cta: "تواصل معنا",
        href: "/contact",
      },
    ],
  },
  why: {
    eyebrow: "لماذا توريفا العقارية",
    title: "فن العيش الفاخر",
    items: [
      { title: "تصميم خالد", description: "تناسق أنيق وجماليات راقية تتجاوز الموضة." },
      { title: "جودة فائقة", description: "مواد فاخرة وموردون موثوقون ومعايير لا تقبل المساومة." },
      { title: "اهتمام بالتفاصيل", description: "كل وصلة وتفصيلة ولمسة نهائية مدروسة بعناية." },
      { title: "تسليم في الوقت", description: "إدارة مشاريع منظمة بمراحل واضحة ومساءلة." },
    ],
  },
  projects: {
    eyebrow: "أعمالنا",
    title: "نصنع مساحات استثنائية",
    cta: "عرض كل المشاريع",
  },
  process: {
    eyebrow: "منهجيتنا",
    title: "من الرؤية إلى الواقع",
    steps: [
      { title: "الاكتشاف", description: "فهم رؤيتك وأسلوب حياتك ومتطلبات المساحة." },
      { title: "التصميم", description: "تطوير المفهوم والمواد والوثائق التفصيلية." },
      { title: "التنفيذ", description: "حرفيون وفرق ميدانية تحوّل التصميم إلى واقع." },
      { title: "التسليم", description: "تنسيق نهائي وفحص جودة وتسليم بلا عيوب." },
    ],
  },
  testimonials: {
    eyebrow: "آراء العملاء",
    title: "ثقة عملاء مميزين",
    items: [
      {
        quote: "حوّلت توريفا العقارية فيلتنا إلى ملاذ من الفخامة الهادئة. كل تفصيلة فاقت توقعاتنا.",
        author: "عميل خاص",
        role: "فيلا فاخرة، الرياض",
      },
      {
        quote: "حرفية استثنائية وإدارة مشروع سلسة من أول لقاء حتى التسليم.",
        author: "مجموعة تطوير",
        role: "مشروع ضيافة، جدة",
      },
    ],
  },
  cta: {
    title: "لنبني شيئاً استثنائياً",
    subtitle: "شاركنا رؤيتك وابدأ رحلة مشروعك الفاخر مع فريقنا.",
    button: "تواصل معنا",
  },
  footer: {
    about:
      "توريفا العقارية تنفّذ الديكور الثابت والمقاولات الفاخرة للفلل والقصور وبيئات المعارض الموسمية — الذراع التنفيذي لـ Graphics House في البناء والتسليم.",
    quickLinks: "روابط سريعة",
    importantLinks: "أهم الروابط",
    servicesLinks: "الخدمات",
    solutionsLinks: "الحلول",
    offices: "مكاتبنا",
    countries: {
      saudiArabia: "السعودية",
      oman: "سلطنة عُمان",
      bahrain: "مملكة البحرين",
      egypt: "مصر",
    },
    contact: "تواصل معنا",
    workspace: "المنصة",
    workspaceDesc: "عروض احترافية وإدارة مشاريعك في مكان واحد.",
    workspaceCta: "الدخول إلى المنصة",
    copyright: "© توريفا العقارية. جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    address: "الرياض، المملكة العربية السعودية",
    email: "hello@turriva.co",
    phone: "+966 11 000 0000",
    poweredByPrefix: "توريفا العقارية بواسطة",
    poweredByLink: "جرافيكس هاوس",
    insightsLink: "معاينة تصميم (داخلية)",
    ghProjectLaunchLink: "ProjectLaunch™ — Graphics House",
  },
  pages: {
    interiorDesign: {
      title: "التصميم الداخلي",
      intro:
        "تصاميم داخلية فاخرة مخصصة للفلل والقصور والضيافة في المملكة — من المفهوم الأول حتى آخر لمسة تشطيب.",
    },
    construction: {
      title: "الإنشاءات",
      intro:
        "إنشاءات فاخرة للفلل والقصور والمشاريع الحصرية بإشراف هندسي وميداني ومعايير جودة عالمية.",
    },
    ourWork: {
      title: "أعمالنا",
      intro:
        "معرض منتقى من مشاريعنا السكنية والضيافية — مساحات صُمّمت وبُنيت بعناية فائقة.",
    },
    about: {
      title: "عن توريفا العقارية",
      intro:
        "توريفا العقارية شركة سعودية للديكور والمقاولات تجمع بين الحرفية والأناقة والثقة الهادئة.",
    },
    contact: {
      title: "تواصل معنا",
      intro: "ابدأ مشروعك الفاخر باستشارة خاصة مع فريق توريفا العقارية.",
      formName: "الاسم",
      formEmail: "البريد الإلكتروني",
      formMessage: "أخبرنا عن مشروعك",
      formSubmit: "إرسال الرسالة",
    },
  },
};

export function getLuxuryMessages(locale: Locale): LuxuryMessages {
  return locale === "ar" ? ar : en;
}

/** Luxury interior photography — Unsplash (replace with owned assets in production). */
export const LUXURY_IMAGES = {
  hero: "/brand/luxury/hero-villa.jpg",
  interior: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  construction: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  fitout: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  project1: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  project2: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  project3: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  project4: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
} as const;
