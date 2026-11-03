/**
 * REAL content awaiting the owner's review ("مسودات مراجعة").
 * Sources are real and were read on the access date below; wording is original (no copied text).
 * Loaded ONLY when NODE_ENV === "development": never bundled into production, never in the sitemap,
 * structured data or direct URLs. To publish an item after approval: move it to ../index.ts and
 * change `draft: true` to `draft: false` (or remove the key).
 */

const ACCESSED = "2026-11-03";
const REVIEWED = "2026-11-03";

const DAR_NEWS = {
  label: "Dar — “JCDC Appoints Dar to Master Plan and Design Phase 1 of the Transformational $20bn Jeddah Central Project” (التاريخ المعروض في الصفحة: 02.06.22)",
  publisher: "Dar (Dar Al-Handasah)",
  url: "https://www.dar.com/news/details/jcdc-appoints-dar-to-master-plan-and-design-phase-1-of-the-transformational-$20bn-jeddah-central-project-?org=news",
  // publishedAt intentionally omitted: the page shows "02.06.22" and its day/month reading is unresolved.
  accessedAt: ACCESSED,
};
const DAR_HOME = { label: "Dar — الصفحة الرئيسية", publisher: "Dar (Dar Al-Handasah)", url: "https://www.dar.com", accessedAt: ACCESSED };
const HL_PROJECT = {
  label: "Henning Larsen — Jeddah Opera House (صفحة المشروع)",
  publisher: "Henning Larsen",
  url: "https://henninglarsen.com/projects/jeddah-opera-house",
  accessedAt: ACCESSED,
};
const HL_HOME = { label: "Henning Larsen — الصفحة الرئيسية", publisher: "Henning Larsen", url: "https://henninglarsen.com", accessedAt: ACCESSED };

export const DRAFT_UPDATES: unknown[] = [
  {
    slug: "dar-jeddah-central-phase-1-master-plan",
    draft: true,
    archival: true,
    title: { ar: "جدة المركزية تعيّن «دار» لتصميم المخطط التفصيلي للمرحلة الأولى" },
    summary: {
      ar: "إعلان منشور على موقع «دار» (يعود إلى عام 2022؛ التاريخ المعروض 02.06.22 لم يُحسم تفسيره) عن تعاقدها مع شركة جدة المركزية للتطوير لتصميم المخطط التفصيلي للمرحلة الأولى من المشروع. مادة أرشيفية.",
    },
    publishedAt: REVIEWED,
    reviewedAt: REVIEWED,
    project: { name: { ar: "جدة المركزية (Jeddah Central)" }, location: { ar: "جدة، المملكة العربية السعودية" } },
    what: {
      ar: "أعلنت «دار» على موقعها أن شركة جدة المركزية للتطوير (JCDC) عيّنتها لإعداد تصميم المخطط التفصيلي للمرحلة الأولى من مشروع جدة المركزية. وتذكر الصفحة أن نطاق المرحلة الأولى يشمل أربعة معالم: دار الأوبرا، والملعب، وأوشيانيريوم ومزارع الشعاب المرجانية، والمتحف، إضافة إلى تطوير الأصول أفقيًا ورأسيًا وتقديم الاستشارات التصميمية والفنية للتحضير للتنفيذ.",
    },
    eventDate: "unknown",
    entities: [
      { name: { ar: "شركة جدة المركزية للتطوير (JCDC)", en: "Jeddah Central Development Company (JCDC)" }, roleAsStated: { ar: "صاحب المشروع، وتصفها الصفحة بأنها مملوكة بالكامل لصندوق الاستثمارات العامة" } },
      { name: { ar: "Dar Al-Handasah (Dar)", en: "Dar Al-Handasah (Dar)" }, roleAsStated: { ar: "الجهة المعيَّنة لتصميم المخطط التفصيلي للمرحلة الأولى، بحسب إعلانها" } },
    ],
    sources: [DAR_NEWS],
    unclear: [
      { ar: "تاريخ توقيع العقد غير مذكور. والتاريخ المعروض في الصفحة (02.06.22) غير صريح التنسيق ولم يُحسم تفسيره (يوم/شهر)، فلا يُعرض تاريخ قطعي. الظاهر منه بيقين هو عام 2022 فقط." },
      { ar: "قيمة العقد ومدته وموعد الانتقال إلى التنفيذ غير مذكورة. والأرقام الواردة في الصفحة تخص المشروع كله لا هذا العقد." },
      { ar: "الإعلان منشور على موقع «دار» نفسها، ولم يُراجع هنا مصدر مستقل يؤكده." },
      { ar: "لا تتيح هذه المادة معرفة حالة المشروع اليوم، فهي تعود إلى عام 2022." },
    ],
    analysis: {
      ar: "ورود المعالم الأربعة في نطاق واحد يساعد على تتبع تعيينات وتطورات لاحقة مرتبطة بكل منها. هذا استنتاج تحليلي، ولا يعني وجود طلبات شراء أو ميزانيات أو احتياج لدى أي جهة.",
    },
  },
  {
    slug: "henning-larsen-jeddah-opera-house",
    draft: true,
    title: { ar: "دار أوبرا جدة: صفحة «هيننغ لارسن» تصف المشروع بأنه «قيد الإنشاء» (2024–2027)، وتاريخ تحديثها غير ظاهر" },
    summary: {
      ar: "ما تذكره صفحة المشروع على موقع «هيننغ لارسن» (تاريخ تحديثها غير ظاهر): صاحب المشروع، والحالة والفترة كما تصفهما الشركة، والبرنامج المعلن للقاعات. لا تُعرض الحالة هنا كحقيقة محدثة.",
    },
    publishedAt: REVIEWED,
    reviewedAt: REVIEWED,
    project: { name: { ar: "دار أوبرا جدة (Jeddah Opera House)" }, location: { ar: "جدة، على واجهة البحر الأحمر" } },
    what: {
      ar: "بحسب صفحة المشروع على موقع «هيننغ لارسن» (تاريخ نشرها وتحديثها غير ظاهر)، تعرض الشركة المشروع ضمن صفحة مشاريعها: الموقع في جدة على واجهة البحر الأحمر، وصاحب المشروع شركة جدة المركزية للتطوير، والحالة «قيد الإنشاء»، والفترة 2024–2027. والبرنامج المعلن: دار أوبرا بسعة 1,500 مقعد، ومسرح بسعة 750 مقعدًا، وقاعة بروفات بسعة 150 مقعدًا، إضافة إلى مساحات أداء مرنة ومسار ثقافي ومحيط عام يربط المدينة بالبحر.",
    },
    eventDate: "unknown",
    entities: [
      { name: { ar: "شركة جدة المركزية للتطوير (JCDC)", en: "Jeddah Central Development Company (JCDC)" }, roleAsStated: { ar: "صاحب المشروع، بحسب الصفحة" } },
      { name: { ar: "Henning Larsen", en: "Henning Larsen" }, roleAsStated: { ar: "تعرض المشروع على موقعها وتسمّي ثلاثة أعضاء من فريقها بمناصبهم (تصميم وتصميم مناظر). لا تحدد الصفحة طبيعة تعاقدها" } },
    ],
    sources: [HL_PROJECT],
    unclear: [
      { ar: "تاريخ نشر الصفحة وآخر تحديث لها غير ظاهرين." },
      { ar: "لا تذكر الصفحة نطاق عمل الشركة بدقة، ولا المقاولين، ولا قيمة المشروع، ولا مساحة المبنى." },
      { ar: "الحالة «قيد الإنشاء» والفترة (2024–2027) منسوبتان إلى صفحة الشركة وحدها، وتاريخ تحديثها غير ظاهر، فلا يُعرف إن كانت تعكس الوضع الحالي. ولم تُقارن بمصدر مستقل." },
    ],
  },
];

export const DRAFT_INSIGHTS: unknown[] = [
  {
    slug: "memo-jeddah-central-two-design-sources",
    draft: true,
    title: { ar: "مذكرة: ماذا تقول مادتان عن التصميم في «جدة المركزية» وماذا لا تقول؟" },
    summary: {
      ar: "مذكرة تفسيرية محدودة، وليست تقريرًا: قراءة مادتين صادرتين عن جهتين معنيّتين لفهم ما يمكن وما لا يمكن استنتاجه منهما.",
    },
    publishedAt: REVIEWED,
    reviewedAt: REVIEWED,
    question: { ar: "ما الذي تقوله مادتان منشورتان عن مرحلة التصميم في الجزء الأول من مشروع «جدة المركزية»، وما الذي لا تقوله؟" },
    // A single reading date (from === to): this is a reading of two sources on that date, not a continuous period.
    period: { from: REVIEWED, to: REVIEWED },
    scope: {
      ar: "قراءة في مصدرين راجعتهما رواق بتاريخ 3 نوفمبر 2026، وليست متابعة متصلة للفترة 2022–2026. المصدران عن مشروع واحد في جدة: إعلان على موقع «دار» (يعود إلى 2022، وتاريخه المعروض لم يُحسم تفسيره) وصفحة «هيننغ لارسن» عن دار الأوبرا (تاريخ تحديثها غير ظاهر). لا تغطي المذكرة بقية معالم المشروع ولا غيره من المشاريع.",
    },
    methodology: {
      ar: "قراءة نص المادتين من موقعي الجهتين، واستخراج ما يذكره كل مصدر وما يتفقان عليه، دون استخدام مصادر أخرى ودون جمع بيانات إضافية.",
    },
    findings: [
      { ar: "يذكر إعلان «دار» أن دار الأوبرا من معالم المرحلة الأولى التي عُيّنت «دار» لتصميم مخططها التفصيلي." },
      { ar: "تذكر صفحة «هيننغ لارسن» أن صاحب مشروع دار أوبرا جدة هو شركة جدة المركزية للتطوير، وأن حالته «قيد الإنشاء» للفترة 2024–2027." },
      { ar: "كل مصدر صادر عن الجهة المعنية نفسها، ولا يذكر أي منهما علاقة تعاقدية بين «دار» و«هيننغ لارسن»." },
    ],
    analysis: [
      { ar: "تُظهر المادتان أن مشروعًا واحدًا قد يظهر في مصادر مختلفة تنسب كل منها نفسها إلى جزء من العمل، ما يبرر تتبع المشروع عبر أكثر من مصدر قبل تفسير دور أي جهة. هذا استنتاج تحليلي." },
    ],
    limits: {
      ar: "عينة من مادتين. لا يُستنتج منها اتجاه عام في السوق أو في مشاريع جدة أو في أسلوب التعاقد، ولا حالة المشروع اليوم، ولا تعاون بين الجهتين. وكلا المصدرين ذاتي، ولم يُقارنا بمصدر مستقل.",
    },
    sources: [DAR_NEWS, HL_PROJECT],
  },
];

export const DRAFT_ENTITIES: unknown[] = [
  {
    slug: "dar-al-handasah",
    draft: true,
    name: { ar: "Dar Al-Handasah (Dar)", en: "Dar Al-Handasah (Dar)" },
    disciplines: [
      { ar: "العمارة والتصميم", en: "Architecture and design" },
      { ar: "التخطيط والاستراتيجية", en: "Planning and strategy" },
      { ar: "الهندسة", en: "Engineering" },
      { ar: "إدارة المشاريع والإنشاءات", en: "Project and construction management" },
    ],
    website: "https://www.dar.com",
    publishedAt: REVIEWED,
    selfPublished: {
      about: {
        ar: "تعرض الجهة على موقعها خدمات تشمل العمارة والتصميم، والتخطيط والاستراتيجية، والهندسة، وإدارة المشاريع والإنشاءات، إضافة إلى خدمات أخرى مثل المدن الذكية والاستدامة البيئية. ولا تظهر في الصفحة التي قُرئت مدينة المقر ولا حضورها في السعودية.",
      },
    },
    publishedOnOfficialSources: {
      works: [
        {
          title: { ar: "تصميم المخطط التفصيلي للمرحلة الأولى من مشروع جدة المركزية" },
          role: { ar: "الجهة المعيَّنة بحسب إعلانها (يعود إلى 2022)" },
          sourceLabel: "Dar — news",
          sourceUrl: DAR_NEWS.url,
        },
      ],
    },
    reviewedByRuwaq: {
      reviewedAt: REVIEWED,
      scope: ["official_website", "works_attribution"],
      note: { ar: "راجعت رواق وصف الجهة لنفسها في صفحتها الرئيسية، ونسبة العمل المذكور إلى صفحة الإعلان على موقعها. لم تُراجع مصادر مستقلة ولا قنوات التواصل." },
    },
    sources: [DAR_HOME, DAR_NEWS],
  },
  {
    slug: "henning-larsen",
    draft: true,
    name: { ar: "Henning Larsen", en: "Henning Larsen" },
    disciplines: [
      { ar: "العمارة", en: "Architecture" },
      { ar: "تصميم المناظر الطبيعية", en: "Landscape" },
      { ar: "التخطيط العمراني", en: "Urbanism" },
      { ar: "التصميم الداخلي", en: "Interiors" },
    ],
    website: "https://henninglarsen.com",
    publishedAt: REVIEWED,
    selfPublished: {
      about: {
        ar: "تصف الجهة عملها بأنه يمتد عبر العمارة وتصميم المناظر الطبيعية والتخطيط العمراني والتصميم الداخلي، وتذكر أنها جزء من مجموعة رامبول. ولا تظهر في الصفحة التي قُرئت مكاتبها ولا حضورها في السعودية.",
      },
    },
    publishedOnOfficialSources: {
      works: [
        {
          title: { ar: "دار أوبرا جدة" },
          role: { ar: "تعرض المشروع ضمن مشاريعها (الحالة «قيد الإنشاء» و2024–2027 بحسب صفحتها، وتاريخ تحديثها غير ظاهر). لا تحدد الصفحة طبيعة تعاقدها" },
          sourceLabel: "Henning Larsen — project page",
          sourceUrl: HL_PROJECT.url,
        },
      ],
    },
    reviewedByRuwaq: {
      reviewedAt: REVIEWED,
      scope: ["official_website", "works_attribution"],
      note: { ar: "راجعت رواق وصف الجهة لنفسها في صفحتها الرئيسية، ونسبة المشروع المذكور إلى صفحة المشروع على موقعها. لم تُراجع مصادر مستقلة ولا قنوات التواصل." },
    },
    sources: [HL_HOME, HL_PROJECT],
  },
];
