import type { RuwaqGuide } from "@/content/guides/types";
import { guideCtaHref } from "@/content/guides/types";
import { GUIDE_IMAGES } from "@/content/marketing-images";

const meta = {
  slug: "gypsum-ceiling-jeddah-villas",
  citySlug: "jeddah" as const,
  categorySlug: "fit-out" as const,
};

const ctaHref = guideCtaHref(meta);

/** Week of 2026-08-02 — editorial cadence slot */
export const gypsumCeilingJeddahGuide: RuwaqGuide = {
  ...meta,
  titleAr: "أسقف الجبس في فلل جدة: ارتفاعات، إضاءة مخفية، ومقاومة الرطوبة",
  titleEn: "Gypsum Ceilings in Jeddah Villas: Heights, Hidden Lighting & Humidity",
  excerptAr:
    "كيف تختار ارتفاع السقف المعلق، zones الإضاءة، ومعالجة الرطوبة الساحلية — قبل توقيع عقد التشطيب.",
  excerptEn:
    "How to set drop-ceiling height, lighting zones, and coastal humidity treatment — before you sign the fit-out contract.",
  seoKeywordsAr: [
    "أسقف جبس فلل جدة",
    "إضاءة مخفية سقف",
    "جبس بورد مقاوم رطوبة",
    "ارتفاع السقف المعلق",
    "تشطيب فلل جدة",
  ],
  seoKeywordsEn: [
    "gypsum ceiling Jeddah villa",
    "recessed lighting zones",
    "moisture resistant gypsum board",
    "drop ceiling height",
    "Jeddah villa fit-out",
  ],
  readMinutes: 10,
  heroImage: GUIDE_IMAGES.supervision,
  publishedAt: "2026-08-02",
  updatedAt: "2026-08-02",
  blocksAr: [
    {
      type: "p",
      text: "في فلل جدة، السقف المعلق ليس زينة فقط — هو طبقة تقنية تحمل الإضاءة، التكييف المخفي، ومكبرات الصوت. خطأ في الارتفاع أو نوع الجبس يظهر بعد أول موسم رطوبة. هذا الدليل يركز على قرارات يجب اتخاذها قبل التشطيب.",
    },
    {
      type: "h2",
      text: "ارتفاع السقف: 30 سم أم 40 سم؟",
    },
    {
      type: "ul",
      items: [
        "30 سم: كافٍ للإضاءة المخفية البسيطة ومجاري AC — الأكثر شيوعاً في الممرات.",
        "40–45 سم: للصالات الكبيرة مع cove lighting مزدوج ومسارات LED.",
        "فوق 50 سم: فقط عند دمج سماعات سقف أو مسارات تكييف ضخمة — يقلل إحساس الارتفاع.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "نصيحة Ruwaq PRO",
      text: "اطلب مخطط reflected ceiling plan (RCP) قبل أي عقد — يوضح مواقع الإضاءة، diffusers التكييف، ونقاط الصيانة.",
    },
    {
      type: "h2",
      text: "الرطوبة الساحلية ونوع الجبس",
    },
    {
      type: "p",
      text: "في المناطق القريبة من البحر، استخدم Green أو Moisture-resistant board في الحمامات والمطابخ المفتوحة على الخارج. في الصالات الداخلية، Standard MR كافٍ مع طبقة معالجة قبل الدهان.",
    },
    {
      type: "cta",
      lead: "تبحث عن مقاول تشطيب يطبّق هذه المعايير؟",
      label: "اطلب عرضاً من Ruwaq PRO",
      href: ctaHref,
    },
  ],
  blocksEn: [
    {
      type: "p",
      text: "In Jeddah villas, a drop ceiling is not decoration alone — it carries lighting, concealed AC, and speakers. Wrong height or board type shows up after the first humid season. This guide covers decisions to make before fit-out starts.",
    },
    {
      type: "h2",
      text: "Ceiling drop: 30 cm or 40 cm?",
    },
    {
      type: "ul",
      items: [
        "30 cm: enough for basic recessed lights and AC ducts — common in corridors.",
        "40–45 cm: large living rooms with double cove lighting and LED tracks.",
        "Above 50 cm: only when hiding large speakers or bulky duct runs — reduces perceived height.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Ruwaq PRO tip",
      text: "Request a reflected ceiling plan (RCP) before signing — it shows lighting, AC diffusers, and maintenance access.",
    },
    {
      type: "h2",
      text: "Coastal humidity and board type",
    },
    {
      type: "p",
      text: "Near the coast, use green or moisture-resistant board in bathrooms and kitchens open to the outside. In inner living rooms, standard MR board with a primer coat before paint is usually enough.",
    },
    {
      type: "cta",
      lead: "Looking for a fit-out contractor who follows these specs?",
      label: "Request a quote from Ruwaq PRO",
      href: ctaHref,
    },
  ],
};
