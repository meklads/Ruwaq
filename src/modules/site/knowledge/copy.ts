import type { Locale } from "@/shared/i18n/locale";
import type { GroupTarget, TermCategory } from "./schema";

/** The 19 styles of the Saudi Architecture Map, as named in public reporting of its launch (16 March 2025). */
const MAP_STYLES_AR = [
  "العمارة النجدية", "عمارة نجد الشمالية", "عمارة ساحل تبوك", "عمارة المدينة المنورة", "عمارة ريف المدينة المنورة",
  "العمارة الحجازية الساحلية", "عمارة الطائف", "عمارة جبال السروات", "عمارة أصدار عسير", "عمارة سفوح تهامة",
  "عمارة ساحل تهامة", "عمارة مرتفعات أبها", "عمارة جزر فرسان", "عمارة صحراء بيشة", "عمارة نجران",
  "عمارة واحات الأحساء", "عمارة القطيف", "عمارة الساحل الشرقي", "عمارة نجد الشرقية",
];

const ar = {
  glossary: {
    title: "معجم العمارة والتطوير",
    lead: "شرح مبسط لمصطلحات الإظهار المعماري والمجسمات والتطوير العقاري، لكل مصطلح تعريف ومثال.",
    soon: "نجهّز المعجم الآن، ويُفتح بعد مراجعة مصطلحاته.",
    definition: "التعريف", example: "مثال", aliases: "يُسمّى أيضًا", related: "مصطلحات مرتبطة", sources: "المصادر",
    noSources: "تعريف عام كتبه فريق رواق، وليس نصًا تنظيميًا.",
    back: "كل المصطلحات", reviewed: "آخر مراجعة",
    categories: { visualization: "الإظهار المعماري", models: "المجسمات", sales: "الإطلاق والبيع", development: "التطوير", regulation: "التنظيم", architecture: "العمارة والتقنية" } as Record<TermCategory, string>,
  },
  atlas: {
    title: "أطلس العمارة السعودية المرئي",
    lead: "صفحة لكل طراز: خصائصه وموادّه وألوانه، وكيف يُطبّق في مشروع معاصر. نلخّص المصادر الرسمية ونربط بها، ولا نحل محلها.",
    soon: "نجهّز الأطلس الآن، وتُفتح صفحاته بعد مراجعتها من معماري.",
    mapTitle: "الطرز الـ19 في خريطة العمارة السعودية",
    mapNote: "أُعلنت الخريطة في 16 مارس 2025. نضيف صفحة لكل طراز تباعًا.",
    mapSource: "المصدر: CNBC عربية، نقلًا عن وكالة الأنباء السعودية",
    mapSourceUrl: "https://www.cnbcarabia.com/135559/2025/16/03/تشمل-19-طرازاً-معمارياً..-ولي-العهد-السعودي-يطلق-خريطة-العمارة-السعودية",
    mapStyles: MAP_STYLES_AR,
    region: "النطاق", characteristics: "الخصائص", materials: "المواد", colours: "الألوان", readings: "التقليدي والانتقالي والمعاصر",
    reading: { traditional: "تقليدي", transitional: "انتقالي", contemporary: "معاصر" },
    apply: "كيف تطبّقه في مشروعك", unclear: "ما لم نتحقق منه بعد", sources: "المصادر", back: "الأطلس",
    architect: "راجعه معماري في", notArchitect: "لم يراجعه معماري بعد.", reviewed: "آخر مراجعة",
  },
  group: {
    heading: "تحتاج تطبيق هذا في مشروعك؟",
    graphicshouse: { body: "جرافيكس هاوس، من مجموعة تسامي: الإظهار المعماري والمجسمات ومواد الإطلاق.", cta: "زر موقع جرافيكس هاوس" },
    turriva: { body: "توريفا، من مجموعة تسامي: تنفيذ صالات البيع والوحدات النموذجية والتشطيب.", cta: "زر موقع توريفا" },
    beesmotion: { body: "بيزموشن، من مجموعة تسامي: المحتوى والتسويق الرقمي للمشاريع.", cta: "زر موقع بيزموشن" },
  } as Record<"heading", string> & Record<GroupTarget, { body: string; cta: string }>,
  draftBadge: "مسودة مراجعة",
};

type K = typeof ar;

const en: K = {
  glossary: {
    title: "Architecture and development glossary",
    lead: "Plain explanations of terms in architectural visualisation, scale models and real estate development, each with a definition and an example.",
    soon: "The glossary is being prepared and opens once its terms are reviewed.",
    definition: "Definition", example: "Example", aliases: "Also called", related: "Related terms", sources: "Sources",
    noSources: "A general explanation written by the Ruwaq team, not regulatory text.",
    back: "All terms", reviewed: "Last reviewed",
    categories: { visualization: "Visualisation", models: "Scale models", sales: "Launch and sales", development: "Development", regulation: "Regulation", architecture: "Architecture and technology" },
  },
  atlas: {
    title: "Visual atlas of Saudi architecture",
    lead: "One page per style: its characteristics, materials and colours, and how it applies to a contemporary project. We summarise and link to official sources; we do not replace them.",
    soon: "The atlas is being prepared; pages open after an architect's review.",
    mapTitle: "The 19 styles of the Saudi Architecture Map",
    mapNote: "The map was announced on 16 March 2025. We add a page for each style in turn.",
    mapSource: "Source: CNBC Arabia, citing the Saudi Press Agency",
    mapSourceUrl: ar.atlas.mapSourceUrl,
    mapStyles: MAP_STYLES_AR,
    region: "Area", characteristics: "Characteristics", materials: "Materials", colours: "Colours", readings: "Traditional, transitional, contemporary",
    reading: { traditional: "Traditional", transitional: "Transitional", contemporary: "Contemporary" },
    apply: "Applying it in your project", unclear: "Not yet confirmed", sources: "Sources", back: "Atlas",
    architect: "Reviewed by an architect on", notArchitect: "Not yet reviewed by an architect.", reviewed: "Last reviewed",
  },
  group: {
    heading: "Want to apply this in your project?",
    graphicshouse: { body: "Graphics House, part of Tasami group: architectural visualisation, scale models and launch materials.", cta: "Visit Graphics House" },
    turriva: { body: "Turriva, part of Tasami group: sales galleries, show units and fit-out.", cta: "Visit Turriva" },
    beesmotion: { body: "Bees Motion, part of Tasami group: content and digital marketing for projects.", cta: "Visit Bees Motion" },
  },
  draftBadge: "Draft for review",
};

export const getKnowledgeCopy = (locale: Locale): K => (locale === "en" ? en : ar);
