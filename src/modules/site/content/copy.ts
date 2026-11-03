import type { Locale } from "@/shared/i18n/locale";
import type { EntityReviewScope } from "./schema";

/** UI strings for the three content templates. Content itself carries its own languages. */
type C = {
  nav: { updates: string; insights: string; specialists: string };
  tag: { update: string; insight: string; entity: string };
  preview: string;
  draft: string;
  privateBanner: string;
  draftNotice: string;
  archival: string;
  archivalNote: string;
  onlyIn: { ar: string; en: string }; // list tag: available only in this language
  fallback: { ar: string; en: string }; // detail notice: shown in this language only
  back: { updates: string; insights: string; specialists: string };
  unknown: string;
  list: {
    updates: { title: string; lead: string };
    insights: { title: string; lead: string };
    specialists: { title: string; lead: string; fine: string };
  };
  home: { eyebrow: string; title: string; body: string; all: { updates: string; insights: string; specialists: string } };
  update: {
    published: string; eventDate: string; reviewed: string; what: string; project: string; location: string;
    entities: string; role: string; unclear: string; analysis: string; analysisNote: string; dateNote: string;
  };
  insight: {
    published: string; updated: string; reviewed: string; question: string; period: string; scope: string;
    methodology: string; findings: string; analysis: string; limits: string; analysisNote: string; readingDate: string;
  };
  entity: {
    provided: string; official: string; supported: string; editorialNote: string; reviewed: string; website: string; works: string; city: string; disciplines: string;
    workArea: string; contacts: string; reviewedAt: string; scope: string; disclaimer: string; filterDiscipline: string;
    filterCity: string; all: string; noMatch: string; scopeLabels: Record<EntityReviewScope, string>;
  };
  sources: { title: string; publisher: string; published: string; accessed: string; placeholder: string };
};

const ar: C = {
  nav: { updates: "المشاريع والتحديثات", insights: "رؤى وتقارير", specialists: "دليل الجهات" },
  tag: { update: "تحديث مشروع", insight: "رؤية وتقرير", entity: "ملف جهة" },
  preview: "بيانات معاينة — ليست معلومات فعلية",
  draft: "مسودة مراجعة",
  privateBanner: "معاينة خاصة — محتوى قيد المراجعة",
  draftNotice: "معاينة خاصة — محتوى قيد المراجعة. محتوى حقيقي لم يُعتمد بعد، ولا يظهر في الموقع العام.",
  archival: "مادة أرشيفية مختارة",
  archivalNote: "مادة قديمة تُعرض بتاريخها بوصفها أرشيفًا مختارًا، وليست حدثًا جاريًا.",
  onlyIn: { ar: "بالعربية فقط", en: "بالإنجليزية فقط" },
  fallback: { ar: "هذه المادة متاحة بالعربية فقط.", en: "هذه المادة متاحة بالإنجليزية فقط." },
  back: { updates: "كل التحديثات", insights: "كل الرؤى والتقارير", specialists: "كل الجهات" },
  unknown: "غير معروف",
  list: {
    updates: {
      title: "المشاريع والتحديثات",
      lead: "ماذا أُعلن أو تغيّر في مشاريع مختارة، مع المصدر والتواريخ وما لم يتضح بعد. الاختيار تحريري ولا يعني تغطية السوق كله.",
    },
    insights: {
      title: "رؤى وتقارير",
      lead: "تحليلات مركّزة على سؤال محدد وفترة ونطاق، مع المنهجية وحدود التغطية. لا تمثل السوق كله.",
    },
    specialists: {
      title: "دليل الجهات المتخصصة",
      lead: "ملفات تعريفية لجهات تعمل في منظومة المشاريع، تفصل بين ما تنشره الجهة عن نفسها، وما يدعمه مصدر آخر، وما راجعته رواق فعلًا.",
      fine: "ملفات تحريرية مبنية على مصادر معلنة، ولا تعني علاقة تجارية أو تزكية. الانتقاء لا يعني اعتمادًا مهنيًا ولا ضمانًا لجودة الخدمات، وليس هذا الدليل أداة لاختيار مقاول.",
    },
  },
  home: {
    eyebrow: "من معرفة رواق",
    title: "معرفة مختارة عن السوق",
    body: "مواد منتقاة بالمصدر والتاريخ. الاختيار تحريري ولا يعني شمول السوق.",
    all: { updates: "كل التحديثات", insights: "كل الرؤى والتقارير", specialists: "كل الجهات" },
  },
  update: {
    published: "نُشر في رواق", eventDate: "تاريخ الحدث", reviewed: "راجعته رواق", what: "ماذا أُعلن أو تغيّر",
    project: "المشروع", location: "الموقع", entities: "الجهات المذكورة", role: "الدور كما ورد في المصدر",
    unclear: "ما لم يتضح بعد", analysis: "لماذا يستحق المتابعة؟", analysisNote: "تحليل رواق: استنتاج وليس واقعة.",
    dateNote: "تاريخ النشر في رواق لا يعني تاريخ وقوع الحدث.",
  },
  insight: {
    published: "نُشر في رواق", updated: "آخر تحديث", reviewed: "راجعته رواق", question: "السؤال", period: "الفترة",
    scope: "النطاق", methodology: "المنهجية", findings: "النتائج (وقائع مستندة إلى المصادر)",
    analysis: "التحليل", limits: "حدود التغطية", analysisNote: "استنتاجات رواق، وليست وقائع.", readingDate: "تاريخ القراءة",
  },
  entity: {
    provided: "تنشره الجهة عن نفسها", official: "منشور في مصادرها الرسمية", supported: "يدعمه مصدر آخر",
    editorialNote: "ملف تعريفي تحريري مبني على مصادر معلنة، ولا يعني علاقة تجارية أو تزكية.", reviewed: "راجعته رواق", website: "الموقع الرسمي",
    works: "أعمال منشورة على موقع الجهة", city: "المدينة", disciplines: "التخصصات", workArea: "نطاق العمل",
    contacts: "قنوات التواصل التي قدّمتها الجهة", reviewedAt: "تاريخ المراجعة", scope: "نطاق المراجعة",
    disclaimer: "المراجعة تقتصر على النطاق المذكور. لا تشمل تقييم جودة الخدمات، ولا تُعد توصية أو ضمانًا.",
    filterDiscipline: "التخصص", filterCity: "المدينة", all: "الكل", noMatch: "لا توجد جهات مطابقة.",
    scopeLabels: {
      entity_identity: "هوية الجهة", official_website: "الموقع الرسمي", contact_channels: "قنوات التواصل",
      works_attribution: "نسبة الأعمال المنشورة إلى الجهة",
    },
  },
  sources: { title: "المصادر", publisher: "الناشر", published: "نُشر المصدر", accessed: "اطُّلع عليه", placeholder: "رابط افتراضي (معاينة)" },
};

const en: C = {
  nav: { updates: "Projects & updates", insights: "Insights & reports", specialists: "Specialist directory" },
  tag: { update: "Project update", insight: "Insight / report", entity: "Specialist profile" },
  preview: "Preview data — not real information",
  draft: "Review draft",
  privateBanner: "Private preview — content under review",
  draftNotice: "Private preview — content under review. Real content not yet approved; it does not appear on the public site.",
  archival: "Selected archival item",
  archivalNote: "An older item shown with its date as a selected archive piece, not a current event.",
  onlyIn: { ar: "Arabic only", en: "English only" },
  fallback: { ar: "This item is available in Arabic only.", en: "This item is available in English only." },
  back: { updates: "All updates", insights: "All insights & reports", specialists: "All specialists" },
  unknown: "Unknown",
  list: {
    updates: {
      title: "Projects & updates",
      lead: "What was announced or changed in selected projects, with the source, dates and what is still unclear. Selection is editorial and does not mean full market coverage.",
    },
    insights: {
      title: "Insights & reports",
      lead: "Focused analyses built around one question, period and scope, with the methodology and coverage limits. They do not represent the whole market.",
    },
    specialists: {
      title: "Specialist directory",
      lead: "Profiles of organisations in the projects ecosystem, separating what the organisation says about itself, what another source supports, and what Ruwaq actually reviewed.",
      fine: "Editorial profiles based on public sources; they do not imply a commercial relationship or endorsement. Selection is not a professional accreditation or a guarantee of service quality, and this is not a tool for choosing a contractor.",
    },
  },
  home: {
    eyebrow: "From Ruwaq’s knowledge",
    title: "Selected knowledge about the market",
    body: "Items chosen with their source and date. Selection is editorial and does not mean full market coverage.",
    all: { updates: "All updates", insights: "All insights & reports", specialists: "All specialists" },
  },
  update: {
    published: "Published on Ruwaq", eventDate: "Event date", reviewed: "Reviewed by Ruwaq", what: "What was announced or changed",
    project: "Project", location: "Location", entities: "Organisations mentioned", role: "Role as stated in the source",
    unclear: "What is still unclear", analysis: "Why it is worth following", analysisNote: "Ruwaq’s analysis: an inference, not a fact.",
    dateNote: "The date Ruwaq published this is not the date the event happened.",
  },
  insight: {
    published: "Published on Ruwaq", updated: "Last updated", reviewed: "Reviewed by Ruwaq", question: "Question", period: "Period",
    scope: "Scope", methodology: "Methodology", findings: "Findings (facts supported by the sources)",
    analysis: "Analysis", limits: "Coverage limits", analysisNote: "Ruwaq’s inferences, not facts.", readingDate: "Reading date",
  },
  entity: {
    provided: "Published by the organisation about itself", official: "Published on its official sources", supported: "Supported by another source",
    editorialNote: "An editorial profile based on public sources. It does not imply a commercial relationship or endorsement.", reviewed: "Reviewed by Ruwaq", website: "Official website",
    works: "Works listed on the organisation’s site", city: "City", disciplines: "Disciplines", workArea: "Work area",
    contacts: "Contact channels the organisation provided", reviewedAt: "Review date", scope: "Review scope",
    disclaimer: "The review is limited to the scope listed. It does not assess service quality and is not a recommendation or guarantee.",
    filterDiscipline: "Discipline", filterCity: "City", all: "All", noMatch: "No matching organisations.",
    scopeLabels: {
      entity_identity: "Organisation identity", official_website: "Official website", contact_channels: "Contact channels",
      works_attribution: "Attribution of published works",
    },
  },
  sources: { title: "Sources", publisher: "Publisher", published: "Source published", accessed: "Accessed", placeholder: "Placeholder link (preview)" },
};

export function getContentCopy(locale: Locale): C {
  return locale === "ar" ? ar : en;
}
