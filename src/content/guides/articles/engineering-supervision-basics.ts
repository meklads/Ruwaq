import type { RuwaqGuide } from "@/content/guides/types";
import { GUIDE_IMAGES } from "@/content/marketing-images";

export const engineeringSupervisionBasicsGuide: RuwaqGuide = {
  slug: "engineering-supervision-basics",
  categorySlug: "supervision",
  titleAr: "أساسيات الإشراف الهندسي المستقل للفلل والمشاريع السكنية",
  titleEn: "Independent engineering supervision basics for villas and residential projects",
  excerptAr:
    "متى يحمي الإشراف المستقل حقوق المالك؟ نطاق الزيارات، مطابقة BOQ، محاضر الاستلام، ومراجعة شهادات الدفع — دليل عملي قبل توقيع العقد.",
  excerptEn:
    "When does independent supervision protect the owner? Site visits, BOQ compliance, sign-off minutes, and payment certificate review — a practical guide before you sign.",
  seoKeywordsAr: [
    "إشراف هندسي مستقل",
    "إشراف مشاريع فلل",
    "محاضر استلام مراحل",
    "كود البناء السعودي",
    "مراجعة شهادات الدفع",
    "BOQ",
    "إشراف SGS",
    "مكاتب إشراف جدة",
  ],
  seoKeywordsEn: [
    "independent engineering supervision",
    "villa construction oversight",
    "phase sign-off minutes",
    "Saudi Building Code",
    "payment certificate review",
    "BOQ compliance",
    "third-party supervision Saudi Arabia",
    "construction quality control",
  ],
  readMinutes: 14,
  heroImage: GUIDE_IMAGES.supervision,
  publishedAt: "2025-08-25",
  updatedAt: "2026-07-31",
  blocksAr: [
    {
      type: "p",
      text: "في مشروع الفيلا، يكون المالك غالباً بين مصمم يعد المخططات ومقاول ينفّذها — وقد يختلف كل منهما عن الآخر. الإشراف الهندسي المستقل طرف ثالث محايد يمثلك في الموقع: يراجع التنفيذ مقابل المخططات المعتمدة وجداول الكميات (BOQ)، ويوثّق كل مرحلة قبل الانتقال للتالية. هذا الدليل يشرح متى تحتاج الإشراف، ماذا يشمل، وكيف يختلف عن «إشراف المقاول على نفسه».",
    },
    {
      type: "h2",
      text: "لماذا الإشراف المستقل ضروري عندما ينفّذ مقاول ≠ المصمم؟",
    },
    {
      type: "p",
      text: "عندما يكون المصمم والمنفّذ كيانين منفصلين، يزداد خطر سوء الفهم في المواصفات، أو استبدال مواد، أو تأخير غير مبرّر. المالك لا يملك عادةً الخبرة لمراجعة الحديد والخرسانة والتمديدات يومياً. مكتب الإشراف يترجم المخططات إلى متطلبات موقعية واضحة، ويُصدر تقارير دورية PDF تحمي حقك في أي نزاع لاحق. المشاريع التي تتجاوز 2 مليون ريال سعودي — خاصة الفلل متعددة الطوابق والتشطيبات الفاخرة — تستفيد أكثر من الإشراف المنظّم لأن تكلفة الخطأ فيها مرتفعة.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.supervisionSite,
      alt: "مهندس إشراف يراجع مخططات موقع بناء فيلّا",
      caption: "الإشراف المستقل يربط بين المخططات المعتمدة والتنفيذ الفعلي في الموقع.",
    },
    {
      type: "h3",
      text: "نطاق الإشراف القياسي في مشاريع الفلل",
    },
    {
      type: "ul",
      items: [
        "زيارات موقع دورية (أسبوعية أو حسب المرحلة) مع توثيق مصوّر.",
        "مطابقة التنفيذ مع BOQ المعتمد — الكميات، المواصفات، والبدائل.",
        "محاضر استلام واعتماد مراحل: الأساسات، الهيكل، MEP، التشطيب.",
        "مراجعة شهادات الدفع (Payment Certificates) قبل تحويل أي دفعة للمقاول.",
        "التحقق من الالتزام بكود البناء السعودي (SBC) والاشتراطات البلدية.",
        "تنسيق الاستجابة للملاحظات الفنية بين المالك والمقاول والاستشاري.",
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "الفرق الجوهري",
      text: "«إشراف المقاول على نفسه» يعني أن من ينفّذ يُقيّم نفسه — لا يوجد محايد. الإشراف المستقل يُوقّع محاضر رسمية باسم مكتب مرخّص من الهيئة السعودية للمهندسين، ويمكن الاستناد إليها في التحكيم أو مطالبات الضمان.",
    },
    {
      type: "h2",
      text: "ماذا تطلب في عقد الإشراف؟",
    },
    {
      type: "table",
      caption: "عناصر عقد الإشراف — checklist للمالك",
      headers: ["البند", "ما يجب أن يتضمنه", "لماذا يهم"],
      rows: [
        ["عدد الزيارات", "حد أدنى مكتوب (مثلاً 2–4 زيارات/شهر)", "يمنع غياب المهندس في مراحل حرجة"],
        ["التقارير", "PDF بعد كل زيارة + ملخص شهري", "أرشيف قانوني وتشغيلي"],
        ["محاضر الاستلام", "نموذج موحّد لكل مرحلة", "لا دفع كامل دون توقيع"],
        ["BOQ", "مرجعية واضحة + آلية Variation", "يحدّ من التوسع في النطاق"],
        ["شهادات الدفع", "مراجعة قبل كل دفعة", "حماية مالية"],
        ["SBC", "التزام صريح بكود البناء", "امتثال بلدي وتأمين"],
      ],
    },
    {
      type: "cta",
      lead: "تبحث عن مكتب إشراف معتمد يتحدث لغة العقود والمحاضر نفسها؟",
      label: "تصفّح مكاتب الإشراف في جدة",
      href: "/jeddah/supervision",
    },
    {
      type: "h2",
      text: "الامتثال لكود البناء السعودي (SBC)",
    },
    {
      type: "p",
      text: "كود البناء السعودي يحدّد الحد الأدنى الإلزامي للمتطلبات الفنية — من مقاومة الحريق إلى العزل وكفاءة الطاقة. مكتب الإشراف الجيد لا يكتفي بـ«الشكل يبدو صحيحاً»، بل يراجع المواد والتركيبات مقابل فصول SBC ذات الصلة. في الفلل، أبرز نقاط المراقبة: عزل الأسطح والرطوبة، تمديدات الغاز، أنظمة الحريق، وسلامة السلالم والدرابزين. الإصدار 2024 من الكود في مرحلة انتقال؛ تأكد أن فريق الإشراف على دراية بالمتطلبات المطبّقة في بلديتك.",
    },
    {
      type: "chart",
      caption: "مؤشر تكلفة معالجة العيوب — مشاريع فلل فوق 2M ريال (نسبي، بدون إشراف = 100)",
      unit: "نقطة",
      items: [
        { label: "بدون إشراف مستقل", value: 100, max: 100 },
        { label: "إشراف دوري (زيارات)", value: 62, max: 100 },
        { label: "إشراف مقيم + QA/QC", value: 38, max: 100 },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "تنبيه للمالك",
      text: "لا توقّع محضر استلام نهائي دون زيارة إشراف مستقلة على MEP والتشطيب. كثير من العيوب (تسربات، تكييف، تشققات) تظهر بعد 6–12 شهراً — والتوثيق المبكر يحدّد المسؤولية.",
    },
    {
      type: "h3",
      text: "مرجعية السوق: SGS، MCKEEN، سيلا للهندسة",
    },
    {
      type: "p",
      text: "في السوق السعودي، تقدّم شركات مثل SGS وMCKEEN Consult وسيلا للهندسة (Silaeng) نماذج إشراف متنوعة — من الزيارات الدورية إلى المهندس المقيم. لا يلزم أن تكون هذه الأسماء هي اختيارك، لكنها مرجع جيد لمعايير الخدمة: تقارير منظمة، امتثال SBC، ومراجعة ITP وNCR في المشاريع الكبيرة. في رواق، مكاتب الإشراف المعتمدة تُقيَّم وفق نفس معايير Proposal OS لتسهيل مقارنة العروض.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.supervision,
      alt: "مفاتيح فيلّا جديدة — رمز لتسليم مشروع مُشرَف عليه",
      caption: "التسليم الناجح يبدأ بمحاضر استلام موثّقة في كل مرحلة، لا بجولة سريعة في اليوم الأخير.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "نصيحة عملية",
      text: "اربط دفعات المقاول بمحاضر استلام مرحلية موقّعة من الإشراف — مثلاً 20% عند اعتماد الهيكل، 15% عند MEP rough-in. هذا أقوى من أي وعد شفهي.",
    },
    {
      type: "h2",
      text: "خطوات البدء قبل أول زيارة موقع",
    },
    {
      type: "ol",
      items: [
        "تسليم مكتب الإشراف المخططات IFC وBOQ المعتمدين وعقد المقاول.",
        "تحديد جدول زيارات مرتبط بمراحل المشروع (ليس تقويماً عاماً فقط).",
        "الاتفاق على قالب محاضر الاستلام وقناة رفع الملاحظات (WhatsApp + PDF رسمي).",
        "تفعيل الإشراف قبل صب الأساسات — التأخير هنا يكلف أضعاف رسوم الإشراف.",
      ],
    },
    {
      type: "cta",
      lead: "جاهز لمقارنة عروض إشراف مع نطاق واضح ومحاضر موحّدة؟",
      label: "اطلب عروضاً من مكاتب الإشراف",
      href: "/jeddah/supervision",
    },
    {
      type: "sources",
      title: "مصادر ومراجع",
      items: [
        { label: "المركز السعودي لكود البناء (SBC)", url: "https://sbc.gov.sa/ar/Pages/default.aspx" },
        { label: "SGS — Construction Supervision (Saudi Arabia)", url: "https://www.sgs.com/en-sa/services/construction-supervision" },
        { label: "MCKEEN Consult — Site Supervision", url: "https://mckeen.sa/site-supervision/" },
        { label: "Sila Engineering — Comprehensive Engineering Supervision", url: "https://silaeng.com/en/services/engineering-supervision-services" },
      ],
    },
  ],
  blocksEn: [
    {
      type: "p",
      text: "On a villa project, the owner often sits between a designer who produces drawings and a contractor who builds them — and those parties may differ. Independent engineering supervision is a neutral third party representing you on site: it checks execution against approved drawings and the Bill of Quantities (BOQ), and documents each phase before the next begins. This guide explains when you need supervision, what it covers, and how it differs from contractor self-supervision.",
    },
    {
      type: "h2",
      text: "Why independent supervision matters when executor ≠ designer",
    },
    {
      type: "p",
      text: "When designer and builder are separate entities, the risk of spec drift, material substitution, or unjustified delay rises. Most owners lack the expertise to review rebar, concrete, and MEP daily. A supervision firm translates drawings into clear site requirements and issues periodic PDF reports that protect you in any later dispute. Projects above SAR 2 million — especially multi-storey villas and high-end fit-outs — benefit most from structured oversight because the cost of defects is high.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.supervisionSite,
      alt: "Supervision engineer reviewing villa construction site drawings",
      caption: "Independent supervision bridges approved drawings and what is actually built on site.",
    },
    {
      type: "h3",
      text: "Standard supervision scope for villa projects",
    },
    {
      type: "ul",
      items: [
        "Periodic site visits (weekly or phase-based) with photo documentation.",
        "BOQ compliance — quantities, specifications, and approved alternatives.",
        "Phase sign-off minutes: foundations, structure, MEP, fit-out.",
        "Payment certificate review before any contractor disbursement.",
        "Verification of Saudi Building Code (SBC) and municipal requirements.",
        "Coordination of technical responses between owner, contractor, and consultant.",
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "The core difference",
      text: "Contractor self-supervision means the party executing also judges its own work — there is no neutral party. Independent supervision produces signed minutes from a firm licensed with the Saudi Council of Engineers, usable in arbitration or warranty claims.",
    },
    {
      type: "h2",
      text: "What to require in the supervision contract",
    },
    {
      type: "table",
      caption: "Supervision contract checklist for owners",
      headers: ["Item", "What to include", "Why it matters"],
      rows: [
        ["Visit frequency", "Minimum written schedule (e.g. 2–4 visits/month)", "Prevents absence during critical phases"],
        ["Reports", "PDF after each visit + monthly summary", "Legal and operational archive"],
        ["Sign-off minutes", "Standard template per phase", "No full payment without sign-off"],
        ["BOQ", "Clear baseline + variation process", "Limits scope creep"],
        ["Payment certs", "Review before each tranche", "Financial protection"],
        ["SBC", "Explicit code compliance clause", "Municipal and insurance alignment"],
      ],
    },
    {
      type: "cta",
      lead: "Looking for a verified supervision office that speaks the same contract language?",
      label: "Browse supervision firms in Jeddah",
      href: "/jeddah/supervision",
    },
    {
      type: "h2",
      text: "Saudi Building Code (SBC) compliance",
    },
    {
      type: "p",
      text: "The Saudi Building Code sets mandatory minimum technical requirements — from fire resistance to insulation and energy efficiency. A strong supervision team does not rely on “it looks fine”; it checks materials and installation against relevant SBC chapters. On villas, key watch points include roof and moisture insulation, gas routing, fire systems, and stair or railing safety. The 2024 code edition is in transition; confirm your supervision team knows the requirements enforced in your municipality.",
    },
    {
      type: "chart",
      caption: "Defect remediation cost index — villa projects above SAR 2M (relative; no supervision = 100)",
      unit: "pts",
      items: [
        { label: "No independent supervision", value: 100, max: 100 },
        { label: "Periodic visits", value: 62, max: 100 },
        { label: "Resident engineer + QA/QC", value: 38, max: 100 },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Owner alert",
      text: "Do not sign a final handover minute without independent review of MEP and fit-out. Many defects (leaks, AC issues, cracks) appear 6–12 months later — early documentation defines liability.",
    },
    {
      type: "h3",
      text: "Market reference: SGS, MCKEEN, Sila Engineering",
    },
    {
      type: "p",
      text: "In the Saudi market, firms such as SGS, MCKEEN Consult, and Sila Engineering (Silaeng) offer varied supervision models — from periodic visits to resident engineers. You need not choose these names specifically, but they are useful benchmarks: structured reports, SBC alignment, and ITP/NCR review on larger jobs. On Ruwaq, verified supervision offices are evaluated against Proposal OS standards to simplify comparing proposals.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.supervision,
      alt: "Keys to a new villa — symbol of a supervised handover",
      caption: "Successful handover starts with documented phase sign-offs, not a rushed walk-through on the last day.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Practical tip",
      text: "Tie contractor payments to supervision-signed phase minutes — e.g. 20% at structure approval, 15% at MEP rough-in. This is stronger than any verbal promise.",
    },
    {
      type: "h2",
      text: "Steps before the first site visit",
    },
    {
      type: "ol",
      items: [
        "Provide IFC drawings, approved BOQ, and the contractor agreement to the supervision firm.",
        "Set a visit schedule tied to project phases (not a generic calendar only).",
        "Agree on sign-off templates and a snag-raising channel (WhatsApp + formal PDF).",
        "Activate supervision before foundation pour — delay here costs multiples of the supervision fee.",
      ],
    },
    {
      type: "cta",
      lead: "Ready to compare supervision proposals with clear scope and unified minutes?",
      label: "Request quotes from supervision firms",
      href: "/jeddah/supervision",
    },
    {
      type: "sources",
      title: "Sources & references",
      items: [
        { label: "Saudi Building Code National Center (SBC)", url: "https://sbc.gov.sa/en/BC/Pages/BuildingCode/BCSelect.aspx" },
        { label: "SGS — Construction Supervision (Saudi Arabia)", url: "https://www.sgs.com/en-sa/services/construction-supervision" },
        { label: "MCKEEN Consult — Site Supervision", url: "https://mckeen.sa/site-supervision/" },
        { label: "Sila Engineering — Comprehensive Engineering Supervision", url: "https://silaeng.com/en/services/engineering-supervision-services" },
      ],
    },
  ],
};
