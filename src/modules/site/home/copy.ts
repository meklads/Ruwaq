import type { Locale } from "@/shared/i18n/locale";

/**
 * Home page copy (2026-11-13 redesign). Positioning from the owner-approved content plan:
 * Ruwaq is the visual Arabic reference for architecture and real estate development in Saudi Arabia.
 * Numbers shown on the page are counted from published content at render time, never typed in here.
 */
const ar = {
  hero: {
    eyebrow: "رواق · مرجع العمارة والتطوير",
    title: "المرجع العربي المرئي للعمارة والتطوير العقاري في السعودية",
    lead: "معجم يشرح مصطلحات المهنة، وأطلس لطرز العمارة السعودية، ومتابعة موثّقة للمشاريع والجهات. نذكر المصدر حين يكون للمعلومة مصدر، وتاريخ المراجعة لكل مادة.",
    primary: "تصفّح المعجم",
    secondary: "استكشف الأقسام",
    alt: "رواق معماري معاصر بمشربيات حجازية من النحاس في ضوء الغروب",
    credit: "صورة تصوّرية من إنتاج مجموعة تسامي",
  },
  stats: { terms: "مصطلحًا في المعجم", styles: "طرازًا في خريطة العمارة السعودية", sections: "أقسام معرفية" },
  sections: {
    eyebrow: "أقسام رواق",
    title: "أربعة أبواب إلى المعرفة",
    body: "نفتح كل قسم حين تكتمل مواده وتُراجع، ونبيّن ما هو متاح وما هو قريب.",
    available: "متاح",
    soon: "قريبًا",
    open: "ادخل القسم",
    items: {
      glossary: { title: "معجم العمارة والتطوير", body: "رندر، ماكيت، صالة بيع، بيع على الخارطة... تعريف واضح ومثال لكل مصطلح.", alt: "مجسم معماري أبيض لحي متعدد الاستخدامات على طاولة خضراء بإضاءة نحاسية" },
      atlas: { title: "أطلس العمارة السعودية", body: "طرز المناطق من النجدية إلى الحجازية والعسيرية: الخصائص والمواد، وكيف تُطبّق اليوم.", alt: "تفاصيل من العمارة النجدية والحجازية والعسيرية متجاورة" },
      updates: { title: "المشاريع والتحديثات", body: "ما أُعلن وما تغيّر في مشاريع مختارة، مع المصدر وما لم يتضح بعد.", alt: "منظر جوي لمشروع ساحلي قيد الإنشاء على البحر الأحمر وقت الغروب" },
      specialists: { title: "دليل الجهات المتخصصة", body: "مكاتب هندسية ومقيّمون ووسطاء مرخّصون، يُدرجون بعد التحقق من ترخيصهم.", alt: "مخططات معمارية وعينات خامات على مكتب معماري" },
    },
  },
  glossary: {
    eyebrow: "من المعجم",
    title: "لغة المهنة، بكلمات واضحة",
    body: "مصطلحات الإظهار المعماري والمجسمات والإطلاق والتنظيم، كما يستخدمها المطورون والمعماريون في السوق السعودي.",
    all: "كل المصطلحات",
  },
  atlas: {
    eyebrow: "أطلس العمارة",
    title: "تسعة عشر طرازًا، لكل منطقة لغتها",
    body: "أعلنت خريطة العمارة السعودية في مارس 2025. نبني صفحة لكل طراز، يراجعها معماري قبل نشرها.",
    cta: "إلى الأطلس",
  },
  method: {
    eyebrow: "منهجيتنا",
    title: "ما يجعل رواق مرجعًا",
    items: [
      { title: "المصدر أولًا", body: "كل معلومة تنظيمية من مصدرها الرسمي، مع الرابط وتاريخ الاطلاع." },
      { title: "الحقيقة منفصلة عن الرأي", body: "ما ورد في المصدر يُعرض كما ورد، وما نستنتجه يُعلَّم أنه استنتاج." },
      { title: "مراجعة قبل النشر", body: "صفحات الطرز يراجعها معماري، ولا نقدّم تقييمًا عقاريًا ولا توصية استثمارية." },
    ],
  },
  tools: {
    eyebrow: "أدوات من رواق",
    nasaq: { title: "نَسَق", body: "عروض أسعار احترافية بهوية شركتك، بالعربية والإنجليزية.", cta: "ابدأ عرضًا" },
    radar: { title: "الرادار", body: "أداة داخلية لمتابعة الفرص، نختبرها في جرافيكس هاوس وغير متاحة للاشتراك.", cta: "عن الرادار" },
  },
  owner: "رواق مشروع معرفي من مجموعة تسامي.",
};

type K = typeof ar;

const en: K = {
  hero: {
    eyebrow: "Ruwaq · Architecture and development reference",
    title: "The visual Arabic reference for architecture and real estate development in Saudi Arabia",
    lead: "A glossary of the trade, an atlas of Saudi architectural styles, and documented updates on projects and organisations. We cite the source wherever a fact has one, and date every review.",
    primary: "Browse the glossary",
    secondary: "Explore the sections",
    alt: "Contemporary arcade with brass Hijazi rawashin screens at sunset",
    credit: "Concept image produced by Tasami group",
  },
  stats: { terms: "terms in the glossary", styles: "styles in the Saudi Architecture Map", sections: "knowledge sections" },
  sections: {
    eyebrow: "Ruwaq sections",
    title: "Four doors into the subject",
    body: "Each section opens once its material is complete and reviewed; we show what is live and what is coming.",
    available: "Live",
    soon: "Coming soon",
    open: "Open section",
    items: {
      glossary: { title: "Architecture and development glossary", body: "Render, scale model, sales gallery, off-plan sale... a clear definition and an example for every term.", alt: "White architectural scale model of a mixed-use district on a green table under brass light" },
      atlas: { title: "Atlas of Saudi architecture", body: "Regional styles from Najdi to Hijazi and Asiri: characteristics, materials, and how they apply today.", alt: "Najdi, Hijazi and Asiri architectural details side by side" },
      updates: { title: "Projects and updates", body: "What was announced or changed in selected projects, with the source and what is still unclear.", alt: "Aerial view of a coastal development under construction on the Red Sea at sunset" },
      specialists: { title: "Specialist directory", body: "Engineering offices, licensed valuers and brokers, listed after their licence is checked.", alt: "Architectural drawings and material samples on an architect's desk" },
    },
  },
  glossary: {
    eyebrow: "From the glossary",
    title: "The language of the trade, in plain words",
    body: "Terms in visualisation, scale models, launches and regulation, as developers and architects use them in Saudi Arabia.",
    all: "All terms",
  },
  atlas: {
    eyebrow: "Architecture atlas",
    title: "Nineteen styles, each region with its own language",
    body: "The Saudi Architecture Map was announced in March 2025. We are building a page for each style, reviewed by an architect before publication.",
    cta: "To the atlas",
  },
  method: {
    eyebrow: "Our method",
    title: "What makes Ruwaq a reference",
    items: [
      { title: "Source first", body: "Every regulatory fact comes from its official source, with the link and access date." },
      { title: "Fact apart from opinion", body: "What a source says is shown as stated; what we infer is labelled as inference." },
      { title: "Reviewed before publishing", body: "Style pages are reviewed by an architect; we give no valuation or investment advice." },
    ],
  },
  tools: {
    eyebrow: "Tools from Ruwaq",
    nasaq: { title: "Nasaq", body: "Professional quotations in your company's identity, in Arabic and English.", cta: "Start a quotation" },
    radar: { title: "Radar", body: "An internal tool for tracking opportunities, in trial at Graphics House and not open for subscription.", cta: "About Radar" },
  },
  owner: "Ruwaq is a knowledge project of Tasami group.",
};

export const getHomeCopy = (locale: Locale): K => (locale === "en" ? en : ar);
