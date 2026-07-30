import type { Locale } from "@/shared/i18n/locale";
import { localeToBcp47 } from "@/shared/i18n/locale";
import { getMessages } from "@/shared/i18n";
import type { ProposalExportData } from "./proposal-export-types";
import type { SampleTemplateSlug } from "./sample-template-keys";
import { sampleSlugToTemplateId } from "./sample-template-keys";
import { appBaseUrlFromEnv } from "./proposal-export-utils";

function dateStrings(locale: Locale) {
  const bcp47 = localeToBcp47(locale);
  const now = new Date();
  const validity = new Date();
  validity.setDate(validity.getDate() + 30);
  return {
    date: now.toLocaleDateString(bcp47, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    validityDate: validity.toLocaleDateString(bcp47, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

function fitOutClauses(locale: Locale) {
  const messages = getMessages(locale);
  const isAr = locale === "ar";

  return [
    {
      category: "compliance",
      categoryLabel: messages.review.clauses.categories.compliance ?? "compliance",
      text: isAr
        ? "يلتزم العميل بأن جميع الأعمال تتوافق مع كود البناء السعودي SBC 1101 للمباني السكنية. لا يتحمل المقاول مسؤولية مخالفات طلبات العميل التي تخرق الكود."
        : "The Client ensures all works comply with Saudi Building Code SBC 1101 for residential buildings. The Contractor is not liable for violations from Client requests that breach the Code.",
      sourceRef: "SBC 1101 — Residential Buildings",
    },
    {
      category: "permits",
      categoryLabel: messages.review.clauses.categories.permits ?? "permits",
      text: isAr
        ? "استخراج رخص البناء والترميم والحفر على عاتق العميل ما لم يُنص صراحة على خلاف ذلك. التأخير البلدي لا يُعد تأخيراً من المقاول."
        : "Building, renovation, and excavation permits are the Client's responsibility unless explicitly stated otherwise. Municipal delay is not contractor delay.",
      sourceRef: "Balady — Municipal Permits",
    },
    {
      category: "vat",
      categoryLabel: messages.review.clauses.categories.vat ?? "vat",
      text: isAr
        ? "الأسعار خاضعة لضريبة القيمة المضافة حيث ينطبق. يلتزم المقاول بإصدار فواتير ضريبية وفق متطلبات هيئة الزكاة والضريبة والجمارك."
        : "Prices are subject to VAT where applicable. The Contractor issues tax invoices per Zakat, Tax and Customs Authority requirements.",
      sourceRef: "ZATCA — VAT Regulations",
    },
    {
      category: "scope_change",
      categoryLabel: messages.review.clauses.categories.scope_change ?? "scope_change",
      text: isAr
        ? "لا يُنفَّذ أي عمل خارج النطاق المعتمد إلا بأمر تغيير مكتوب يحدد التكلفة والمدة. العمل الإضافي الشفهي غير ملزم."
        : "No out-of-scope work without a written change order defining cost and time. Verbal extras are not binding.",
      sourceRef: "FIDIC-inspired — Change Order",
    },
  ];
}

function buildRuwaqClassicSample(locale: Locale, base: string): ProposalExportData {
  const isAr = locale === "ar";
  const { date, validityDate } = dateStrings(locale);

  return {
    platformBranding: true,
    templateId: "ruwaq",
    appBaseUrl: base,
    projectName: isAr ? "تشطيب فيلا سكنية — حي الملقا" : "Residential villa fit-out — Al Malqa",
    clientName: isAr ? "أ. محمد العتيبي" : "Mr. Mohammed Al-Otaibi",
    companyName: isAr ? "شركة النخيل للتشطيب" : "Al Nakheel Fit-out Co.",
    address: isAr ? "الرياض — حي العليا" : "Riyadh — Al Olaya",
    about: isAr
      ? "مكتب تشطيب عقاري متخصص في المشاريع السكنية والتجارية منذ 2012."
      : "Real estate fit-out firm specializing in residential and commercial projects since 2012.",
    crNumber: "1010456789",
    vatNumber: "310123456700003",
    companyPhone: "+966 50 123 4567",
    companyEmail: "info@alnakheel-fitout.sa",
    website: "https://alnakheel-fitout.sa",
    proposalNumber: "PROP-2026-0142",
    introduction: isAr
      ? "يسرنا تقديم عرضنا لتشطيب فيلتكم السكنية وفق المواصفات المتفق عليها، مع الالتزام بمعايير الجودة والجدول الزمني المرفق."
      : "We are pleased to submit our proposal for your villa fit-out in line with the agreed specifications, quality standards, and timeline below.",
    date,
    validityDate,
    projectLocation: isAr ? "الرياض — حي الملقا" : "Riyadh — Al Malqa",
    propertyType: "villa",
    areaSqm: 450,
    commercialMode: "fixed_price",
    budget: 850000,
    scopeItems: isAr
      ? [
          {
            title: "أعمال التكسية والدهان",
            description: "تجهيز الأسطح، معالجة العيوب، دهان داخلي بمواد معتمدة.",
          },
          {
            title: "أعمال الأرضيات",
            description: "تركيب بورسلان وباركيه حسب المخططات المعتمدة.",
          },
          {
            title: "أعمال الكهرباء والإضاءة",
            description: "تمديدات، لوحات، إنارة ديكورية، نقاط شبكة وكاميرات.",
          },
        ]
      : [
          {
            title: "Finishing & painting",
            description: "Surface prep, defect treatment, interior paint with approved materials.",
          },
          {
            title: "Flooring",
            description: "Porcelain and parquet installation per approved drawings.",
          },
          {
            title: "Electrical & lighting",
            description: "Wiring, panels, decorative lighting, network and camera points.",
          },
        ],
    deliverables: isAr
      ? [
          { name: "مخطط تنفيذي", description: "نسخة PDF معتمدة قبل بدء التنفيذ" },
          { name: "تسليم مرحلي", description: "محاضر استلام لكل مرحلة رئيسية" },
        ]
      : [
          { name: "Execution drawings", description: "Approved PDF set before work starts" },
          { name: "Phased handover", description: "Signed acceptance for each major phase" },
        ],
    timeline: {
      duration: isAr ? "14 أسبوعاً" : "14 weeks",
      milestones: isAr
        ? [{ name: "التصميم والتوريد" }, { name: "التنفيذ" }, { name: "التسليم النهائي" }]
        : [{ name: "Design & procurement" }, { name: "Execution" }, { name: "Final handover" }],
    },
    commercialTerms: {
      paymentSchedule: [
        { label: isAr ? "دفعة مقدمة" : "Advance", percentage: 30, amount: 255000 },
        { label: isAr ? "عند التسليم" : "On delivery", percentage: 40, amount: 340000 },
        { label: isAr ? "بعد الاستلام" : "After acceptance", percentage: 30, amount: 255000 },
      ],
    },
    assumptions: isAr
      ? ["توفير صلاحية الدخول للموقع خلال ساعات العمل.", "جاهزية الموقع للتشطيب دون أعمال إنشائية إضافية."]
      : ["Site access during working hours.", "Site ready for fit-out without additional structural work."],
    exclusions: isAr
      ? ["الموافقات البلدية والرسوم الحكومية.", "الأثاث والمفروشات."]
      : ["Municipality approvals and government fees.", "Furniture and furnishings."],
    boqLines: isAr
      ? [
          { label: "تشطيب ودهان", amount: 340000, percent: 40, category: "finishing", isEstimated: false },
          { label: "أرضيات وبورسلان", amount: 212500, percent: 25, category: "flooring", isEstimated: false },
          { label: "كهرباء وإضاءة", amount: 297500, percent: 35, category: "mep", isEstimated: false },
        ]
      : [
          { label: "Finishing & paint", amount: 340000, percent: 40, category: "finishing", isEstimated: false },
          { label: "Flooring & porcelain", amount: 212500, percent: 25, category: "flooring", isEstimated: false },
          { label: "Electrical & lighting", amount: 297500, percent: 35, category: "mep", isEstimated: false },
        ],
    clauseItems: fitOutClauses(locale),
    clausePackName: isAr ? "حزمة تشطيب داخلي" : "Interior fit-out pack",
    clausePackVersion: "1.0",
  };
}

function buildRuwaqExecutiveSample(locale: Locale, base: string): ProposalExportData {
  const isAr = locale === "ar";
  const { date, validityDate } = dateStrings(locale);

  return {
    platformBranding: true,
    templateId: "ruwaq_executive",
    appBaseUrl: base,
    projectName: isAr
      ? "إشراف هندسي — برج مكاتب حي العليا"
      : "Engineering supervision — Al Olaya office tower",
    clientName: isAr ? "شركة الأفق العقارية" : "Al Ofuq Real Estate Co.",
    companyName: isAr ? "مكتب البيان للاستشارات الهندسية" : "Al Bayan Engineering Consultants",
    address: isAr ? "الرياض — طريق الملك فهد" : "Riyadh — King Fahd Road",
    about: isAr
      ? "مكتب استشارات هندسية مرخّص يقدّم إشرافاً ميدانياً وتقارير جودة لمشاريع المكاتب والتجزئة."
      : "Licensed engineering consultancy providing site supervision and quality reporting for office and retail projects.",
    crNumber: "1010987654",
    vatNumber: "310987654300003",
    companyPhone: "+966 11 456 7890",
    companyEmail: "projects@albayan-eng.sa",
    website: "https://albayan-eng.sa",
    proposalNumber: "ENG-2026-0088",
    introduction: isAr
      ? "نقدّم عرضنا لخدمات الإشراف الهندسي على مشروع البرج وفق نطاق العمل والجدول الزمني أدناه، مع تقارير دورية ومحاضر استلام معتمدة."
      : "We submit our engineering supervision proposal for the tower project per the scope and timeline below, including periodic reports and signed handover minutes.",
    date,
    validityDate,
    projectLocation: isAr ? "الرياض — حي العليا" : "Riyadh — Al Olaya",
    propertyType: "office",
    areaSqm: 12000,
    commercialMode: "fixed_price",
    budget: 420000,
    scopeItems: isAr
      ? [
          {
            title: "الإشراف على الأعمال الإنشائية",
            description: "مراجعة التنفيذ، مطابقة المخططات، وتوثيق الملاحظات الميدانية.",
          },
          {
            title: "إدارة الجودة والسلامة",
            description: "فحوصات دورية، محاضر عدم مطابقة، ومتابعة الإغلاق.",
          },
          {
            title: "التقارير والاجتماعات",
            description: "تقرير أسبوعي، محضر اجتماع شهري، وتوصيات للمالك.",
          },
        ]
      : [
          {
            title: "Structural works supervision",
            description: "Execution review, drawing compliance, and field observation logs.",
          },
          {
            title: "Quality & safety management",
            description: "Periodic inspections, NCRs, and closure follow-up.",
          },
          {
            title: "Reporting & meetings",
            description: "Weekly report, monthly meeting minutes, and owner recommendations.",
          },
        ],
    deliverables: isAr
      ? [
          { name: "تقرير إشراف أسبوعي", description: "PDF مع صور ميدانية ونسب الإنجاز" },
          { name: "محاضر استلام مرحلية", description: "موقّعة من المالك والمقاول" },
        ]
      : [
          { name: "Weekly supervision report", description: "PDF with site photos and progress %" },
          { name: "Phased handover minutes", description: "Signed by owner and contractor" },
        ],
    timeline: {
      duration: isAr ? "18 شهراً" : "18 months",
      milestones: isAr
        ? [
            { name: "الهيكل الإنشائي" },
            { name: "الواجهات والتشطيبات" },
            { name: "التسليم النهائي" },
          ]
        : [
            { name: "Structural shell" },
            { name: "Facades & finishes" },
            { name: "Final handover" },
          ],
    },
    commercialTerms: {
      paymentSchedule: [
        { label: isAr ? "عند التعاقد" : "On contract", percentage: 20, amount: 84000 },
        { label: isAr ? "شهرياً" : "Monthly", percentage: 60, amount: 252000 },
        { label: isAr ? "عند الإغلاق" : "On closure", percentage: 20, amount: 84000 },
      ],
    },
    assumptions: isAr
      ? ["توفير مخططات معتمدة قبل بدء الإشراف.", "حضور ممثل المالك للاجتماعات الدورية."]
      : ["Approved drawings available before supervision starts.", "Owner representative attends periodic meetings."],
    exclusions: isAr
      ? ["تصميم هندسي إضافي خارج النطاق.", "اختبارات مخبرية متخصصة."]
      : ["Additional engineering design outside scope.", "Specialized laboratory testing."],
    boqLines: isAr
      ? [
          { label: "إشراف ميداني", amount: 252000, percent: 60, category: "supervision", isEstimated: false },
          { label: "تقارير واجتماعات", amount: 105000, percent: 25, category: "reporting", isEstimated: false },
          { label: "إدارة جودة", amount: 63000, percent: 15, category: "qa", isEstimated: false },
        ]
      : [
          { label: "Site supervision", amount: 252000, percent: 60, category: "supervision", isEstimated: false },
          { label: "Reports & meetings", amount: 105000, percent: 25, category: "reporting", isEstimated: false },
          { label: "Quality management", amount: 63000, percent: 15, category: "qa", isEstimated: false },
        ],
    clauseItems: fitOutClauses(locale).slice(0, 3),
    clausePackName: isAr ? "حزمة إشراف هندسي" : "Engineering supervision pack",
    clausePackVersion: "1.0",
  };
}

function buildGraphicsHouseSample(locale: Locale, base: string): ProposalExportData {
  const isAr = locale === "ar";
  const { date, validityDate } = dateStrings(locale);

  return {
    platformBranding: true,
    templateId: "graphics_house",
    appBaseUrl: base,
    logoUrl: `${base}/brand/graphics-house/logo-mark.png`,
    projectName: isAr
      ? "حزمة تصور ثلاثي الأبعاد — مشروع سكني فاخر"
      : "3D visualization package — luxury residential project",
    clientName: isAr ? "مجموعة الرؤية للتطوير العقاري" : "Al Ru'ya Development Group",
    companyName: "Graphics House",
    address: isAr ? "جدة — المملكة العربية السعودية" : "Jeddah — Saudi Arabia",
    about: isAr
      ? "استوديو تصميم وتصوير معماري يقدّم عروضاً بصرية احترافية للمطورين والمكاتب الهندسية منذ أكثر من 15 عاماً."
      : "Design and architectural visualization studio serving developers and engineering firms for over 15 years.",
    companyPhone: "+966 12 345 6789",
    companyEmail: "hello@3dgraphicshouse.com",
    website: "https://3dgraphicshouse.com",
    proposalNumber: "GH-2026-0315",
    introduction: isAr
      ? "نقدّم عرضنا لإنتاج حزمة تصوير ثلاثي الأبعاد كاملة للمشروع السكني، تشمل مناظر خارجية وداخلية وعرضاً تفاعلياً للمبيعات."
      : "We propose a complete 3D visualization package for the residential project, including exterior and interior renders plus an interactive sales presentation.",
    date,
    validityDate,
    projectLocation: isAr ? "الرياض — حي الياسمين" : "Riyadh — Al Yasmin",
    propertyType: "villa",
    areaSqm: 680,
    commercialMode: "fixed_price",
    budget: 185000,
    scopeItems: isAr
      ? [
          {
            title: "مناظر خارجية فوتorealistic",
            description: "8 زوايا رئيسية، إضاءة نهارية وليلية، وتعديلات جوية.",
          },
          {
            title: "مناظر داخلية للفيلا",
            description: "12 مشهدًا للصالات والغرف الرئيسية بمواد واقعية.",
          },
          {
            title: "عرض تفاعلي للمبيعات",
            description: "جولة 360° وملف فيديو قصير للحملات التسويقية.",
          },
        ]
      : [
          {
            title: "Photorealistic exteriors",
            description: "8 key angles, day and night lighting, atmospheric variants.",
          },
          {
            title: "Villa interior renders",
            description: "12 scenes for living areas and primary rooms with realistic materials.",
          },
          {
            title: "Interactive sales presentation",
            description: "360° tour and short video file for marketing campaigns.",
          },
        ],
    deliverables: isAr
      ? [
          { name: "ملفات 4K", description: "PNG وTIFF جاهزة للطباعة والرقمي" },
          { name: "عرض تفاعلي", description: "رابط ويب خاص بالمشروع لمدة 12 شهراً" },
        ]
      : [
          { name: "4K deliverables", description: "Print-ready PNG and TIFF files" },
          { name: "Interactive presentation", description: "Private project web link for 12 months" },
        ],
    timeline: {
      duration: isAr ? "6 أسابيع" : "6 weeks",
      milestones: isAr
        ? [{ name: "النمذجة والإضاءة" }, { name: "المناظر الأولية" }, { name: "التسليم النهائي" }]
        : [{ name: "Modeling & lighting" }, { name: "Draft renders" }, { name: "Final delivery" }],
    },
    commercialTerms: {
      paymentSchedule: [
        { label: isAr ? "عند الاعتماد" : "On approval", percentage: 40, amount: 74000 },
        { label: isAr ? "المناظر الأولية" : "Draft renders", percentage: 30, amount: 55500 },
        { label: isAr ? "التسليم النهائي" : "Final delivery", percentage: 30, amount: 55500 },
      ],
    },
    assumptions: isAr
      ? ["توفير مخططات CAD أو Revit معتمدة.", "جولتين تعديل مجانية على كل مشهد."]
      : ["Approved CAD or Revit drawings provided.", "Two revision rounds per scene included."],
    exclusions: isAr
      ? ["تصميم معماري جديد.", "ترجمة نصوص تسويقية."]
      : ["New architectural design.", "Marketing copy translation."],
    boqLines: isAr
      ? [
          { label: "خارجي 3D", amount: 74000, percent: 40, category: "exterior", isEstimated: false },
          { label: "داخلي 3D", amount: 92500, percent: 50, category: "interior", isEstimated: false },
          { label: "عرض تفاعلي", amount: 18500, percent: 10, category: "interactive", isEstimated: false },
        ]
      : [
          { label: "Exterior 3D", amount: 74000, percent: 40, category: "exterior", isEstimated: false },
          { label: "Interior 3D", amount: 92500, percent: 50, category: "interior", isEstimated: false },
          { label: "Interactive tour", amount: 18500, percent: 10, category: "interactive", isEstimated: false },
        ],
    clauseItems: [],
    clausePackName: null,
    clausePackVersion: null,
  };
}

export function buildSampleExportData(
  locale: Locale,
  slug: SampleTemplateSlug,
  baseUrl?: string,
  headerFooterStyleId?: string
): ProposalExportData {
  const base = (baseUrl ?? appBaseUrlFromEnv()).replace(/\/$/, "");
  sampleSlugToTemplateId(slug);

  const data = (() => {
    switch (slug) {
      case "ruwaq-classic":
        return buildRuwaqClassicSample(locale, base);
      case "ruwaq-executive":
        return buildRuwaqExecutiveSample(locale, base);
      case "graphics-house":
        return buildGraphicsHouseSample(locale, base);
    }
  })();

  // Only the free "ruwaq" classic template honors header/footer skins.
  return headerFooterStyleId ? { ...data, headerFooterStyleId } : data;
}

/** @deprecated Use buildSampleExportData(locale, "ruwaq-classic", baseUrl) */
export function buildRuwaqSampleExportData(
  locale: Locale,
  baseUrl?: string
): ProposalExportData {
  return buildSampleExportData(locale, "ruwaq-classic", baseUrl);
}

const STRESS_LINE_LABELS_AR = [
  "تكسيات ودهانات داخلية — صالات ومجالس",
  "أرضيات بورسلان — مناطق رطبة",
  "باركيه خشبي — غرف نوم",
  "أعمال جبس بورد — أسقف مستعارة",
  "إضاءة LED ديكورية — جميع الغرف",
  "تمديدات كهربائية — لوحات وقواطع",
  "نقاط شبكة وكاميرات مراقبة",
  "تمديدات سباكة — حمامات رئيسية",
  "خزائن مطبخ — MDF مطلي",
  "رخام طبيعي — واجهات ومداخل",
  "عزل حراري وصوتي — جدران خارجية",
  "أبواب خشبية — داخلية ومدخل رئيسي",
  "نوافذ ألومنيوم — حرارية",
  "تكييف مخفي — VRF",
  "تهوية وشفط — مطابخ وحمامات",
  "أعمال حدائق — ري وتشجير",
  "أسوار وبوابات — حديد مشغول",
  "مصاعد منزلية — توريد وتركيب",
  "نظام منزل ذكي — تحكم إضاءة وتكييف",
  "تنظيف نهائي وتسليم — محضر استلام",
  "إشراف هندسي — زيارات دورية",
  "تراخيص بلدية — تنسيق (على العميل)",
] as const;

const STRESS_LINE_LABELS_EN = [
  "Interior finishes & paint — living areas",
  "Porcelain flooring — wet areas",
  "Wood parquet — bedrooms",
  "Gypsum board — suspended ceilings",
  "Decorative LED lighting — all rooms",
  "Electrical wiring — panels & breakers",
  "Network & CCTV points",
  "Plumbing — master bathrooms",
  "Kitchen cabinets — coated MDF",
  "Natural marble — facades & entries",
  "Thermal & acoustic insulation — external walls",
  "Wood doors — internal & main entry",
  "Thermal break aluminum windows",
  "Concealed VRF HVAC",
  "Ventilation & exhaust — kitchens & baths",
  "Landscaping — irrigation & planting",
  "Gates & fences — wrought iron",
  "Home elevator — supply & install",
  "Smart home — lighting & HVAC control",
  "Final cleaning & handover",
  "Engineering supervision — periodic visits",
  "Municipality permits — coordination (client)",
] as const;

/** Stress-test BOQ for PDF pagination / RTL QA (default 22 lines). */
export function buildStressTestExportData(
  locale: Locale,
  lineCount = 22,
  baseUrl?: string
): ProposalExportData {
  const base = buildRuwaqClassicSample(locale, (baseUrl ?? appBaseUrlFromEnv()).replace(/\/$/, ""));
  const labels = locale === "ar" ? STRESS_LINE_LABELS_AR : STRESS_LINE_LABELS_EN;
  const count = Math.min(Math.max(lineCount, 3), labels.length);
  const unit = Math.round(base.budget / count);

  return {
    ...base,
    projectName:
      locale === "ar"
        ? `تشطيب فيلا — اختبار PDF (${count} بند)`
        : `Villa fit-out — PDF stress test (${count} lines)`,
    boqLines: labels.slice(0, count).map((label, index) => ({
      label,
      amount: unit + (index % 3) * 1500,
      percent: Math.round(100 / count),
      category: "finishing",
      isEstimated: index % 7 === 0,
    })),
  };
}
