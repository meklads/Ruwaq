/**
 * SYNTHETIC preview samples ("بيانات معاينة — ليست معلومات فعلية").
 * Names, sources and dates are fictional; source hosts use the reserved *.invalid domain.
 * Loaded only when NODE_ENV === "development"; excluded from production (including direct URLs),
 * sitemap, structured data and related lists.
 */
export const PREVIEW_UPDATES: unknown[] = [
  {
    slug: "preview-update-a",
    preview: true,
    title: {
      ar: "تحديث تجريبي: مشروع افتراضي «أ» ينتقل إلى مرحلة التصميم",
      en: "Sample update: hypothetical project “A” moves into design",
    },
    summary: {
      ar: "مثال لشكل تحديث المشروع: ما أُعلن، ومصدره، وتواريخه، وما لم يتضح.",
      en: "An example of how a project update looks: what was announced, its source, dates and what is unclear.",
    },
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    project: { name: { ar: "مشروع افتراضي «أ»", en: "Hypothetical project “A”" }, location: { ar: "مدينة افتراضية", en: "Hypothetical city" } },
    what: {
      ar: "نص تجريبي يصف إعلانًا افتراضيًا ببدء مرحلة التصميم. لا يشير إلى واقعة حقيقية.",
      en: "Sample text describing a hypothetical announcement that design has started. It does not refer to a real event.",
    },
    eventDate: "unknown",
    entities: [
      { name: { ar: "جهة افتراضية «س»", en: "Hypothetical organisation “S”" }, roleAsStated: { ar: "الدور كما يرد في مصدر افتراضي", en: "Role as stated in a hypothetical source" } },
    ],
    sources: [{ label: "Hypothetical source — no real link", url: "https://source.example.invalid/preview-update-a", accessedAt: "2026-11-03" }],
    unclear: [
      { ar: "ميزانية المشروع والجهات المنفِّذة غير معروفة في هذا المثال.", en: "The project budget and delivery parties are unknown in this example." },
    ],
    analysis: {
      ar: "تحليل تجريبي منفصل بعنوان «لماذا يستحق المتابعة؟». هذا استنتاج توضيحي وليس واقعة.",
      en: "A separate sample analysis titled “Why it is worth following”. This is an illustrative inference, not a fact.",
    },
  },
];

export const PREVIEW_INSIGHTS: unknown[] = [
  {
    slug: "preview-insight-a",
    preview: true,
    title: { ar: "رؤية تجريبية: شكل تقرير بسؤال وفترة ومنهجية" },
    summary: { ar: "مثال لشكل التقرير. هذه المادة بالعربية فقط لتوضيح سياسة اللغة." },
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    question: { ar: "سؤال افتراضي: كيف يُعرض سؤال التقرير في أعلى الصفحة؟" },
    period: { from: "2026-01-01", to: "2026-06-30" },
    scope: { ar: "نطاق افتراضي: لا يمثل تغطية حقيقية لأي مدينة أو قطاع." },
    methodology: { ar: "وصف تجريبي لطريقة اختيار المصادر وحدودها." },
    findings: [{ ar: "نتيجة تجريبية تُعرض كواقعة مستندة إلى مصدر." }],
    analysis: [{ ar: "قراءة تجريبية تُعرض منفصلة بوصفها تحليلًا." }],
    limits: { ar: "حدود تغطية افتراضية: العينة انتقائية ولا يُستنتج منها اتجاه عام." },
    sources: [{ label: "مصدر افتراضي — لا رابط حقيقي", url: "https://source.example.invalid/preview-insight-a", accessedAt: "2026-11-03" }],
  },
];

export const PREVIEW_ENTITIES: unknown[] = [
  {
    slug: "preview-entity-s",
    preview: true,
    name: { en: "Hypothetical firm “S”" },
    disciplines: [{ en: "Sample discipline A" }],
    city: { en: "Hypothetical city 1" },
    publishedAt: "2026-11-03",
    selfPublished: { about: { en: "Sample text supplied by the entity (hypothetical). This page is available in English only to show the language policy." } },
    reviewedByRuwaq: { reviewedAt: "2026-11-03", scope: ["entity_identity"], note: { en: "Sample review note." } },
    sources: [{ label: "Hypothetical source — no real link", url: "https://source.example.invalid/preview-entity-s", accessedAt: "2026-11-03" }],
  },
  {
    slug: "preview-entity-p",
    preview: true,
    name: { ar: "جهة افتراضية «ص»", en: "Hypothetical firm “P”" },
    disciplines: [{ ar: "تخصص تجريبي ب", en: "Sample discipline B" }],
    city: { ar: "مدينة افتراضية ٢", en: "Hypothetical city 2" },
    workArea: { ar: "نطاق عمل افتراضي", en: "Hypothetical work area" },
    publishedAt: "2026-11-03",
    selfPublished: {
      about: { ar: "نص تجريبي قدّمته الجهة افتراضيًا.", en: "Sample text supplied by the entity (hypothetical)." },
    },
    publishedOnOfficialSources: {
      works: [{ title: { ar: "عمل افتراضي منشور على موقع الجهة", en: "Hypothetical work listed on the entity’s site" }, sourceLabel: "Hypothetical source", sourceUrl: "https://source.example.invalid/preview-entity-p-work" }],
    },
    reviewedByRuwaq: { reviewedAt: "2026-11-03", scope: ["entity_identity", "works_attribution"] },
    sources: [{ label: "Hypothetical source — no real link", url: "https://source.example.invalid/preview-entity-p", accessedAt: "2026-11-03" }],
  },
];
