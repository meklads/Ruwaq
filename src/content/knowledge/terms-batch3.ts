/**
 * Glossary batch 3 (10 terms, completes the first 50), approved by the owner on 2026-11-15.
 * Regulatory terms describe what the official pages publish; they are not legal interpretation.
 */
const D3 = "2026-11-15";
const t3 = (o: Record<string, unknown>) => ({ publishedAt: D3, reviewedAt: D3, ...o });
const SBC = { label: "كود البناء السعودي", publisher: "المركز السعودي لكود البناء", url: "https://www.sbc.gov.sa/ar/Pages/default.aspx", accessedAt: D3 };
const BALADY_PERMIT = { label: "إصدار رخصة بناء", publisher: "منصة بلدي، وزارة البلديات والإسكان", url: "https://balady.gov.sa/ar/node/10472", accessedAt: D3 };
const WHITE_LANDS = { label: "رسوم الأراضي البيضاء", publisher: "وزارة البلديات والإسكان", url: "https://idlelands.momah.gov.sa/ar", accessedAt: D3 };
const RETT = { label: "Real Estate Transaction Tax Law", publisher: "هيئة الزكاة والضريبة والجمارك", url: "https://zatca.gov.sa/en/RulesRegulations/Taxes/Pages/RETTRegulation.aspx", accessedAt: D3 };

export const APPROVED_TERMS_BATCH3: unknown[] = [
  // Regulation (official sources, described not interpreted)
  t3({
    slug: "saudi-building-code", category: "regulation", regulatory: true, aliases: ["SBC", "الكود السعودي", "Saudi Building Code"], sources: [SBC],
    term: { ar: "كود البناء السعودي", en: "Saudi Building Code (SBC)" },
    definition: { ar: "مجموعة الاشتراطات والمتطلبات، من أنظمة ولوائح تنفيذية وملاحق، التي تحكم البناء والتشييد في المملكة لضمان السلامة والصحة العامة. يتولاه المركز السعودي لكود البناء، وتلتزم به المكاتب الهندسية والمقاولون في التصميم والتنفيذ." },
    example: { ar: "قبل اعتماد مخططات برج سكني، يراجع الاستشاري متطلبات الكود في الحماية من الحريق ومخارج الطوارئ وإمكانية الوصول." },
    related: ["building-permit", "consultant"],
  }),
  t3({
    slug: "building-permit", category: "regulation", regulatory: true, aliases: ["رخصة البناء", "Building permit", "الرخصة الإنشائية"], sources: [BALADY_PERMIT],
    term: { ar: "رخصة البناء", en: "Building permit" },
    definition: { ar: "ترخيص يصدر إلكترونيًا عبر منصة بلدي قبل البدء في إنشاء أي مبنى. يتقدم به المكتب الهندسي، ويلزم فيه اختيار مقاول بناء مصنّف في المنصة، وتُصدَر قبله وثيقة التأمين ضد العيوب الخفية." },
    example: { ar: "مطور اكتملت مخططات مشروعه، فيرفعها مكتبه الهندسي إلى بلدي مع بيانات المقاول، ولا تبدأ أعمال الموقع إلا بعد صدور الرخصة." },
    related: ["saudi-building-code", "latent-defects-insurance", "main-contractor"],
  }),
  t3({
    slug: "latent-defects-insurance", category: "regulation", regulatory: true, aliases: ["التأمين على العيوب الخفية", "Latent defects insurance", "IDI"], sources: [BALADY_PERMIT],
    term: { ar: "التأمين ضد العيوب الخفية", en: "Latent defects insurance" },
    definition: { ar: "وثيقة تأمين على المبنى تُصدَر قبل رخصة البناء، وتُفعَّل بعد صدور شهادة الإشغال، فتغطي العيوب الإنشائية التي لا تظهر إلا بعد الاستلام. مدتها على المبنى عشر سنوات بحسب منصة بلدي." },
    example: { ar: "مشترٍ يستلم فيلا في مشروع جديد، فيسأل المطور عن وثيقة التأمين ضد العيوب الخفية ومدة سريانها قبل توقيع محضر الاستلام." },
    related: ["building-permit", "handover"],
  }),
  t3({
    slug: "white-land-fees", category: "regulation", regulatory: true, aliases: ["الأراضي البيضاء", "White land fees", "Idle lands"], sources: [WHITE_LANDS],
    term: { ar: "رسوم الأراضي البيضاء", en: "White land fees" },
    definition: { ar: "رسوم سنوية تفرضها وزارة البلديات والإسكان على الأراضي غير المطورة داخل النطاق العمراني، لتحفيز تطويرها وزيادة المعروض. تُحسب بحسب النطاق والمساحة والقيمة التقديرية للأرض، ويُسجّل المالك أرضه عبر البوابة الرسمية للبرنامج." },
    example: { ar: "مالك أرض كبيرة داخل النطاق العمراني يحسب الرسوم المتوقعة في حاسبة البوابة، ثم يقرر تطويرها على مراحل بدل إبقائها فارغة." },
    related: ["masterplan", "phase"],
  }),
  t3({
    slug: "real-estate-transaction-tax", category: "regulation", regulatory: true, aliases: ["RETT", "ضريبة التصرفات العقارية", "Real estate transaction tax"], sources: [RETT],
    term: { ar: "ضريبة التصرفات العقارية", en: "Real Estate Transaction Tax (RETT)" },
    definition: { ar: "ضريبة نسبتها 5% على التصرفات العقارية، تديرها هيئة الزكاة والضريبة والجمارك. صدر بها نظام مستقل نافذ منذ 10 أبريل 2025، حلّ محل الأمر الملكي الصادر بها عام 1442هـ." },
    example: { ar: "عند بيع شقة، يُسجَّل التصرف لدى الهيئة وتُسدَّد الضريبة قبل إتمام نقل الملكية." },
    related: ["real-estate-registry", "off-plan-sale"],
  }),
  // Architecture (ties to the atlas)
  t3({ slug: "rawasheen", category: "architecture", aliases: ["روشان", "رواشين", "Roshan", "Mashrabiya"],
    term: { ar: "الرواشين", en: "Rawasheen (roshan)" },
    definition: { ar: "مفردها روشان: شرفات خشبية مغلقة بارزة من واجهات البيوت، مخرّمة بنقوش دقيقة، تدخل منها نسمة البحر ويرى منها أهل البيت الشارع دون أن يُرَوا. هي علامة العمارة الحجازية الساحلية، وأشهر شواهدها في جدة التاريخية." },
    example: { ar: "مشروع سكني معاصر في جدة يستعير إيقاع الرواشين في واجهته بألواح ألومنيوم مخرّمة، فيحفظ الخصوصية ويخفف حرارة الشمس." },
    related: ["elevation", "courtyard"] }),
  t3({ slug: "courtyard", category: "architecture", aliases: ["الحوش", "الفناء الداخلي", "Courtyard"],
    term: { ar: "الفناء الداخلي (الحوش)", en: "Courtyard" },
    definition: { ar: "مساحة مكشوفة في قلب البيت تلتف حولها الغرف، تجمع الظل والهواء والضوء وتمنح العائلة خصوصيتها. عرفته بيوت نجد والأحساء قرونًا، وتعود إليه العمارة المعاصرة حلًّا للمناخ الحار." },
    example: { ar: "فيلا حديثة في الرياض تتوسطها حديقة صغيرة مكشوفة، تطل عليها الصالة وغرف النوم بواجهات زجاجية بدل النوافذ على الشارع." },
    related: ["rawasheen", "floor-plan", "landscape"] }),
  // Visualisation, models, content
  t3({ slug: "photomontage", category: "visualization", aliases: ["Photomontage", "دمج الرندر بالصورة", "Photo match"], next: "graphicshouse",
    term: { ar: "المونتاج الضوئي", en: "Photomontage" },
    definition: { ar: "دمج رندر المبنى المقترح في صورة فوتوغرافية حقيقية لموقعه، بالزاوية والإضاءة نفسيهما، ليظهر المشروع كأنه قائم فعلًا بين جيرانه وشوارعه." },
    example: { ar: "مطور يعرض على لجنة الاعتماد صورة لشارع قائم ظهر فيه برجه المقترح، ليثبت انسجام ارتفاعه وواجهته مع ما حوله." },
    related: ["render", "aerial-render", "site-plan"] }),
  t3({ slug: "projection-mapping", category: "models", aliases: ["Projection mapping", "الإسقاط الضوئي على المجسم"], next: "graphicshouse",
    term: { ar: "الإسقاط الضوئي على المجسم", en: "Projection mapping" },
    definition: { ar: "عرض ضوئي متحرك يُسقَط بدقة على سطح المجسم المعماري، فيُبرز المراحل والطرق والمرافق والوحدات المتاحة، ويحوّل المجسم الصامت إلى عرض يحكي قصة المشروع." },
    example: { ar: "في صالة البيع، يضيء الإسقاط مسار الممشى ثم المرحلة الأولى ثم الوحدات المتاحة، بينما يشرح مستشار المبيعات للعميل." },
    related: ["maquette", "smart-model", "sales-gallery"] }),
  t3({ slug: "drone-filming", category: "sales", aliases: ["تصوير الدرون", "Drone filming", "التصوير الجوي"], next: "beesmotion",
    term: { ar: "التصوير الجوي بالدرون", en: "Drone filming" },
    definition: { ar: "تصوير الموقع والمشروع من الجو بطائرة مسيّرة، لتوثيق تقدم الأعمال وإظهار الإطلالات والموقع من المدينة. يتطلب تصريحًا من الجهات المختصة قبل الطيران." },
    example: { ar: "مطور ينشر كل شهر مقطعًا جويًا قصيرًا يُظهر تقدم البناء، فيطمئن المشترين على الخارطة ويغذي حساباته بمحتوى حقيقي." },
    related: ["content-retainer", "aerial-render", "off-plan-sale"] }),
];
