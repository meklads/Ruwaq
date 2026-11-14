import type { Locale } from "@/shared/i18n/locale";

/** Page-level copy for the redesigned main pages (heroes, stats, editorial intros). */
const ar = {
  credit: "صورة تصوّرية من إنتاج مجموعة تسامي",
  glossary: {
    eyebrow: "معجم رواق",
    title: "لغة المهنة، كما يتداولها أهلها",
    lead: "من الرندر والماكيت إلى صالة البيع والبيع على الخارطة: كلمات يسمعها المطوّر كل يوم، نشرحها بوضوح، ونضرب لكل منها مثلًا من واقع السوق السعودي.",
    alt: "مجسم معماري أبيض لحي متعدد الاستخدامات على طاولة خضراء بإضاءة نحاسية",
    stats: { terms: "مصطلحًا", categories: "مجالات", regulatory: "مصطلحًا تنظيميًا بمصدر رسمي" },
    browse: "تصفّح حسب المجال",
    read: "اقرأ التعريف",
    regNote: "النقطة الذهبية تعني أن للمصطلح مصدرًا تنظيميًا رسميًا.",
  },
  term: { home: "رواق", more: "من المجال نفسه", definition: "التعريف" },
  soon: {
    badge: "قريبًا",
    startHere: "ابدأ بما هو متاح",
    startBody: "إلى أن يُفتح هذا القسم، في رواق ما يستحق الزيارة الآن.",
    sections: {
      updates: {
        eyebrow: "رصد رواق",
        img: "/images/pages/updates.webp", alt: "منظر جوي لمشروع ساحلي قيد الإنشاء على البحر الأحمر وقت الغروب",
        lead: "ما أُعلن وما تغيّر في مشاريع المملكة الكبرى: نرصده بمصدره وتاريخه، ونفصل بين ما قيل رسميًا وما لم يتضح بعد.",
      },
      insights: {
        eyebrow: "قراءات رواق",
        img: "/images/pages/insights.webp", alt: "مكتب معماري يطل على أفق الرياض، وعلى الطاولة تقرير ومخطط عمراني",
        lead: "قراءات هادئة في أرقام السوق وتحولاته، تُكتب بعد أن تكتمل المصادر، لا قبلها.",
      },
      specialists: {
        eyebrow: "دليل رواق",
        img: "/images/pages/specialists.webp", alt: "مخططات معمارية وعينات خامات على مكتب معماري",
        lead: "مكاتب هندسية ومقيّمون ووسطاء مرخّصون، لا يُدرج أحد منهم قبل التحقق من ترخيصه من الجهة الرسمية.",
      },
    },
    cards: {
      glossary: { title: "معجم العمارة والتطوير", body: "مصطلحات المهنة بتعريف واضح ومثال.", img: "/images/home/glossary.webp" },
      atlas: { title: "أطلس العمارة السعودية", body: "تسعة عشر طرازًا على خريطة تفاعلية.", img: "/images/home/atlas.webp" },
    },
  },
  about: {
    img: "/images/pages/about.webp", alt: "فناء بيت نجدي طيني عند الغسق، بفتحاته المثلثة المضاءة ومجلسه",
    eyebrow: "من نحن",
    title: "رواق: مجلس المعرفة في العمارة والتطوير",
    lead: "كان الرواق في المساجد والمدارس العتيقة مجلسًا للعلم، يلتقي فيه السائل بمن يعرف. على هذا المعنى بُنيت رواق: مرجع عربي هادئ، يجمع ما يحتاجه المطوّر والمعماري والمهتم عن العمارة والتطوير في المملكة، موثقًا بمصدره وتاريخه.",
    principles: "ما نؤمن به",
  },
  contact: {
    img: "/images/pages/contact.webp", alt: "مكتب استقبال من الحجر الجيري خلفه مشربية خشبية، ودلة قهوة وفناجين",
    eyebrow: "تواصل",
    title: "يسعدنا أن نسمع منك",
    lead: "سؤال عن مصطلح، تصحيح لمعلومة، أو فكرة تريد أن تراها في رواق: اكتب لنا، ونردّ خلال 24 ساعة.",
    emailHint: "للرسائل التفصيلية والمرفقات",
    whatsappHint: "للأسئلة السريعة",
  },
};

type Copy = typeof ar;

const en: Copy = {
  credit: "Concept image produced by Tasami group",
  glossary: {
    eyebrow: "Ruwaq glossary",
    title: "The language of the trade, as its people speak it",
    lead: "From renders and scale models to sales galleries and off-plan sales: words a developer hears every day, explained plainly, each with an example from the Saudi market.",
    alt: "White architectural scale model of a mixed-use district on a green table under brass light",
    stats: { terms: "terms", categories: "fields", regulatory: "regulatory terms with an official source" },
    browse: "Browse by field",
    read: "Read the definition",
    regNote: "A gold dot means the term has an official regulatory source.",
  },
  term: { home: "Ruwaq", more: "From the same field", definition: "Definition" },
  soon: {
    badge: "Coming soon",
    startHere: "Start with what is ready",
    startBody: "Until this section opens, here is what is worth a visit on Ruwaq now.",
    sections: {
      updates: {
        eyebrow: "Ruwaq tracker",
        img: "/images/pages/updates.webp", alt: "Aerial view of a coastal development under construction on the Red Sea at sunset",
        lead: "What was announced and what changed in the Kingdom's major projects: tracked with source and date, keeping what was said officially apart from what is still unclear.",
      },
      insights: {
        eyebrow: "Ruwaq readings",
        img: "/images/pages/insights.webp", alt: "An architect's studio overlooking the Riyadh skyline, with a report and a master plan on the table",
        lead: "Calm readings of the market's numbers and shifts, written once the sources are complete, not before.",
      },
      specialists: {
        eyebrow: "Ruwaq directory",
        img: "/images/pages/specialists.webp", alt: "Architectural drawings and material samples on an architect's desk",
        lead: "Engineering offices, licensed valuers and brokers. Nobody is listed before their licence is checked with the official authority.",
      },
    },
    cards: {
      glossary: { title: "Architecture and development glossary", body: "The terms of the trade, each with a clear definition and an example.", img: "/images/home/glossary.webp" },
      atlas: { title: "Atlas of Saudi architecture", body: "Nineteen styles on an interactive map.", img: "/images/home/atlas.webp" },
    },
  },
  about: {
    img: "/images/pages/about.webp", alt: "Courtyard of a Najdi mud-brick house at dusk, its triangular openings lit, with a majlis",
    eyebrow: "About",
    title: "Ruwaq: a majlis of knowledge on architecture and development",
    lead: "In old mosques and schools, the riwaq was a hall of learning where the one who asks meets the one who knows. Ruwaq is built on that idea: a calm Arabic reference gathering what developers, architects and the curious need on architecture and development in the Kingdom, documented with source and date.",
    principles: "What we stand by",
  },
  contact: {
    img: "/images/pages/contact.webp", alt: "A limestone reception desk with a carved mashrabiya behind it, a coffee pot and cups",
    eyebrow: "Contact",
    title: "We would love to hear from you",
    lead: "A question about a term, a correction, or an idea you would like to see on Ruwaq: write to us and we reply within 24 hours.",
    emailHint: "For detailed messages and attachments",
    whatsappHint: "For quick questions",
  },
};

export const getPagesCopy = (locale: Locale): Copy => (locale === "en" ? en : ar);
