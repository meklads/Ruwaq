/**
 * Glossary terms approved by the owner on 2026-11-12. General explanations written by Ruwaq,
 * not regulatory text. New terms start in ./drafts.ts and move here after review.
 */
const D = "2026-11-12";
const t = (o: Record<string, unknown>) => ({ publishedAt: D, reviewedAt: D, ...o });

export const APPROVED_TERMS: unknown[] = [
  t({
    slug: "render", category: "visualization", aliases: ["Render", "رندرة", "تصوير معماري ثلاثي الأبعاد"], next: "graphicshouse",
    term: { ar: "رندر", en: "Render" },
    definition: { ar: "صورة واقعية لمبنى أو مساحة لم تُبنَ بعد، تُنتج بالحاسب من نموذج ثلاثي الأبعاد مع الإضاءة والخامات والمحيط، لتُظهر شكل المشروع قبل تنفيذه." },
    example: { ar: "يعرض المطور على المشترين صورة للواجهة وقت الغروب، وصورة لصالة شقة نموذجية، قبل أن يبدأ البناء." },
    related: ["cgi-film", "3d-model", "sales-gallery"],
  }),
  t({
    slug: "cgi-film", category: "visualization", aliases: ["CGI", "أنيميشن معماري", "فيلم المشروع"], next: "graphicshouse",
    term: { ar: "فيلم CGI معماري", en: "Architectural CGI film" },
    definition: { ar: "فيلم مصنوع بالحاسب يتنقل داخل المشروع وحوله كما لو كان مبنيًا، ويجمع اللقطات والحركة والموسيقى لرواية قصة المشروع." },
    example: { ar: "فيلم مدته دقيقتان يُعرض في حفل الإطلاق وعلى شاشة صالة البيع، يبدأ بلقطة جوية للموقع وينتهي داخل الوحدة." },
    related: ["render", "sales-gallery"],
  }),
  t({
    slug: "3d-model", category: "visualization", aliases: ["3D Model", "نموذج رقمي"],
    term: { ar: "النموذج ثلاثي الأبعاد", en: "3D model" },
    definition: { ar: "تمثيل رقمي للمبنى بأبعاده الحقيقية، تُبنى عليه الصور والأفلام والتجارب التفاعلية، ويُبنى عادة من المخططات المعتمدة." },
    example: { ar: "يُبنى نموذج للبرج من مخططات الاستشاري، ثم تُستخرج منه صور الواجهات ولقطات الفيلم دون إعادة العمل." },
    related: ["render", "bim", "digital-twin"],
  }),
  t({
    slug: "maquette", category: "models", aliases: ["ماكيت", "مجسم معماري", "Scale model"], next: "graphicshouse",
    term: { ar: "المجسم المعماري (الماكيت)", en: "Architectural scale model" },
    definition: { ar: "نموذج مادي مصغر للمشروع بمقياس محدد، يُعرض على طاولة ليرى الزائر الكتل والطرق والمساحات الخضراء في نظرة واحدة." },
    example: { ar: "مجسم لمخطط سكني بمقياس 1:500 في وسط صالة البيع، يشير فيه موظف المبيعات إلى موقع الوحدة المطلوبة." },
    related: ["scale", "smart-model", "masterplan"],
  }),
  t({
    slug: "smart-model", category: "models", aliases: ["مجسم تفاعلي", "Interactive model"], next: "graphicshouse",
    term: { ar: "المجسم الذكي", en: "Smart (interactive) model" },
    definition: { ar: "مجسم معماري مزوّد بإضاءة وتحكم رقمي، يضيء الوحدات أو المرافق عند اختيارها من شاشة أو جهاز لوحي، فيربط النموذج المادي ببيانات المشروع." },
    example: { ar: "يختار العميل على الشاشة «شقق ثلاث غرف متاحة»، فتضيء مواقعها في المجسم أمامه." },
    related: ["maquette", "sales-gallery"],
  }),
  t({
    slug: "scale", category: "models", aliases: ["Scale", "مقياس الرسم", "1:400"],
    term: { ar: "المقياس (مثل 1:400)", en: "Scale (e.g. 1:400)" },
    definition: { ar: "النسبة بين حجم النموذج أو الرسم وحجم الواقع. في مقياس 1:400 يساوي سنتيمتر واحد في المجسم أربعة أمتار في الواقع. كلما صغر الرقم الثاني ظهرت تفاصيل أكثر." },
    example: { ar: "مخطط حي كامل يناسبه 1:1000 أو 1:500، أما مبنى واحد بتفاصيل واجهته فيناسبه 1:200 أو 1:100." },
    related: ["maquette"],
  }),
  t({
    slug: "sales-gallery", category: "sales", aliases: ["صالة البيع", "مركز المبيعات", "Sales center"], next: "turriva",
    term: { ar: "صالة البيع", en: "Sales gallery" },
    definition: { ar: "المكان الذي يستقبل فيه المطور المشترين قبل اكتمال المشروع، ويعرض فيه المجسم والأفلام والعينات، وغالبًا وحدة نموذجية." },
    example: { ar: "صالة قرب موقع المشروع فيها مجسم، وشاشة للفيلم، وركن للخامات، وغرفة لتوقيع العقود." },
    related: ["show-unit", "maquette", "smart-model"],
  }),
  t({
    slug: "show-unit", category: "sales", aliases: ["الوحدة النموذجية", "شقة نموذجية", "Show apartment"], next: "turriva",
    term: { ar: "الوحدة النموذجية", en: "Show unit" },
    definition: { ar: "وحدة منفذة بالحجم الحقيقي والتشطيب والأثاث كما سيستلمها المشتري، ليعيش التجربة قبل الشراء." },
    example: { ar: "داخل صالة البيع تُبنى غرفة معيشة ومطبخ بالخامات نفسها المذكورة في المواصفات." },
    related: ["sales-gallery"],
  }),
  t({
    slug: "masterplan", category: "development", aliases: ["Master plan", "المخطط الشامل"],
    term: { ar: "المخطط العام", en: "Masterplan" },
    definition: { ar: "الخطة التي تحدد توزيع الأرض في المشروع: القطع والاستخدامات والطرق والحدائق والمرافق، وتُبنى عليها المراحل." },
    example: { ar: "مخطط حي جديد يقسم الأرض إلى قطع سكنية وتجارية، ويحدد مواقع المدرسة والمسجد والممشى." },
    related: ["maquette", "phase"],
  }),
  t({
    slug: "phase", category: "development", aliases: ["Phase", "مرحلة الإطلاق"],
    term: { ar: "المرحلة", en: "Phase" },
    definition: { ar: "جزء من مشروع كبير يُطرح ويُنفذ مستقلًا، فيبيع المطور ويبني على دفعات بدل المشروع كله مرة واحدة." },
    example: { ar: "يُطلق المرحلة الأولى بمئتي فيلا، وبعد بيع معظمها يطلق الثانية بتصاميم معدّلة." },
    related: ["masterplan", "project-launch"],
  }),
  t({
    slug: "project-launch", category: "sales", aliases: ["Launch", "إطلاق مشروع"], next: "graphicshouse",
    term: { ar: "الإطلاق العقاري", en: "Project launch" },
    definition: { ar: "اللحظة التي يعلن فيها المطور مشروعه ويبدأ عرضه للبيع، ويجتمع فيها عادة الهوية والصور والفيلم وصالة البيع والحملة." },
    example: { ar: "حفل يُكشف فيه المجسم ويُعرض الفيلم، تتبعه حملة رقمية لثلاثة أشهر." },
    related: ["phase", "brand-identity", "sales-gallery"],
  }),
  t({
    slug: "brand-identity", category: "sales", aliases: ["هوية المشروع", "Branding"], next: "graphicshouse",
    term: { ar: "هوية المشروع", en: "Project identity" },
    definition: { ar: "الاسم والشعار والألوان والخطوط وأسلوب الكتابة الخاصة بمشروع واحد، لتظهر كل مواده بشخصية واحدة يعرفها الناس." },
    example: { ar: "مشروع سكني باسم مستوحى من الحي، وشعار يظهر على اللوحة الإعلانية والكتيب وموقع الحجز بالشكل نفسه." },
    related: ["project-launch"],
  }),
  t({
    slug: "content-retainer", category: "sales", aliases: ["محتوى شهري", "Content retainer"], next: "beesmotion",
    term: { ar: "المحتوى الشهري للمشروع", en: "Monthly project content" },
    definition: { ar: "إنتاج منتظم لمقاطع وصور ومنشورات عن المشروع بعد إطلاقه، ليبقى حاضرًا أثناء مدة البيع والتنفيذ." },
    example: { ar: "مقطع شهري يوثق تقدم البناء، ومنشورات أسبوعية عن المرافق والوحدات المتاحة." },
    related: ["project-launch"],
  }),
  t({
    slug: "bim", category: "architecture", aliases: ["BIM", "نمذجة معلومات البناء"],
    term: { ar: "نمذجة معلومات البناء (BIM)", en: "Building Information Modelling (BIM)" },
    definition: { ar: "نموذج رقمي للمبنى لا يحمل الشكل فقط بل معلومات كل عنصر: المادة والكمية والمواصفة، ويعمل عليه المصمم والمهندس والمقاول معًا." },
    example: { ar: "يُستخرج من النموذج جدول كميات البلاط والأبواب مباشرة بدل حسابها يدويًا." },
    related: ["3d-model", "digital-twin"],
  }),
  t({
    slug: "digital-twin", category: "architecture", aliases: ["Digital twin", "التوأم الرقمي"],
    term: { ar: "التوأم الرقمي", en: "Digital twin" },
    definition: { ar: "نسخة رقمية من مبنى أو مدينة قائمة، تُحدَّث ببيانات من الواقع مثل الحساسات والصيانة، لمتابعة التشغيل واتخاذ القرار." },
    example: { ar: "إدارة مجمع تتابع استهلاك الطاقة في كل مبنى على نسخته الرقمية، وتعرف أين يجب التدخل." },
    related: ["bim", "3d-model"],
  }),
];
