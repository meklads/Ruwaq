import type { Locale } from "@/shared/i18n/locale";

/**
 * Public-site copy for the unified Ruwaq site (positioning: business-opportunity
 * intelligence; Radar is the main product). Nothing here claims that collection, AI,
 * alerts or subscriptions are live. Example content is labelled as illustrative.
 * The development-status statement appears once per page (see `status` fields).
 */
type Step = { title: string; body: string };
type Card = { title: string; body: string };

type Copy = {
  header: { radar: string; how: string; tools: string; about: string; contact: string; cta: string; enter: string; menu: string };
  footer: {
    about: string; product: string; radar: string; how: string; tools: string; nasaq: string; guides: string;
    company: string; aboutLink: string; contact: string; legal: string; privacy: string; terms: string;
    rights: string; cta: string; ctaBody: string; ctaButton: string;
  };
  home: {
    eyebrow: string; title: string; lead: string; cta: string; ctaSecondary: string; trust: string[];
    example: {
      label: string; title: string; footnote: string;
      rows: { key: string; tag?: string; inferred?: boolean; value: string }[];
    };
    problem: { eyebrow: string; title: string; body: string; cards: Card[] };
    how: { eyebrow: string; title: string; body: string; steps: Step[] };
    radar: { eyebrow: string; title: string; body: string; cta: string; points: string[]; status: string };
    principles: { eyebrow: string; title: string; body: string; cards: Card[] };
    tools: { eyebrow: string; title: string; body: string; link: string };
  };
  radar: {
    eyebrow: string; title: string; lead: string; status: string;
    audience: { title: string; body: string };
    problem: { title: string; body: string };
    journey: { title: string; body: string; steps: Step[] };
    states: { title: string; body: string };
    contact: { title: string; body: string; button: string };
  };
  about: { eyebrow: string; title: string; lead: string; sections: Card[]; cta: string };
  contact: { eyebrow: string; title: string; lead: string; email: string; whatsapp: string; fine: string; radar: string };
};

const ar: Copy = {
  header: { radar: "الرادار", how: "كيف تعمل", tools: "الأدوات", about: "من نحن", contact: "تواصل", cta: "تعرّف على الرادار", enter: "دخول الرادار", menu: "القائمة الرئيسية" },
  footer: {
    about: "منصة استخبارات فرص تجارية، تبدأ بالسوق السعودي.",
    product: "المنتج", radar: "الرادار", how: "كيف تعمل رواق", tools: "الأدوات والمحتوى", nasaq: "نَسَق: إعداد عروض الأسعار", guides: "الأدلة",
    company: "رواق", aboutLink: "من نحن", contact: "تواصل", legal: "قانوني", privacy: "الخصوصية", terms: "الشروط",
    rights: "جميع الحقوق محفوظة", cta: "تواصل معنا", ctaBody: "للاستفسار عن الرادار أو ملاحظاتك على الفكرة.", ctaButton: "تواصل",
  },
  home: {
    eyebrow: "منصة استخبارات فرص تجارية",
    title: "من إشارات السوق إلى فرص تجارية",
    lead: "تابع المشاريع والأحداث والجهات، وافهم ما تغيّر وما قد يعنيه لنشاطك، لتحدد خطوتك التجارية التالية.",
    cta: "تعرّف على الرادار",
    ctaSecondary: "كيف تعمل رواق",
    trust: ["نبدأ بالسوق السعودي", "الحقيقة منفصلة عن الاستنتاج", "المصدر والتاريخ حين يتوفران"],
    example: {
      label: "مثال توضيحي — ليس فرصة فعلية",
      title: "مشروع سكني افتراضي «أ» ينتقل إلى مرحلة التصميم",
      footnote: "أسماء وبيانات افتراضية لتوضيح الفكرة فقط، ولا تشير إلى مشروع أو جهة أو مصدر حقيقي.",
      rows: [
        { key: "الحدث", tag: "مُبلَّغ عنه", value: "إعلان افتراضي بأن المشروع بدأ مرحلة التصميم." },
        { key: "الدليل المطلوب", value: "إعلان من الجهة المطوِّرة أو خبر منشور، مع تاريخ النشر. لا يُعرض هنا مصدر لأن المثال افتراضي." },
        { key: "الدلالة المحتملة", tag: "استنتاج", inferred: true, value: "قد تبدأ الجهة قريبًا بإعداد مواد العرض والتسويق للمشروع. هذا احتمال، وليس حاجة مؤكدة." },
        { key: "ما لم يتأكد", value: "ميزانية الجهة، وهل تتعاقد مع مزوّدين خارجيين، وموعد قراراتها." },
        { key: "الخطوة التالية", value: "التحقق من الإعلان في مصدره، ثم تقرير هل تستحق الفرصة التواصل." },
      ],
    },
    problem: {
      eyebrow: "المشكلة",
      title: "ما الذي تعالجه رواق؟",
      body: "المعلومة التجارية متفرقة، والتغيّرات فيها تمرّ دون أن تُلاحظ، ويصعب تحديد متى يكون التواصل مناسبًا.",
      cards: [
        { title: "معلومات مشتتة", body: "أخبار المشاريع والجهات موزعة على مصادر كثيرة، ويصعب جمعها في صورة واحدة." },
        { title: "تغيّرات يصعب متابعتها", body: "تحديث في مرحلة مشروع أو تعيين جهة جديدة قد يمرّ دون أن يُرصد." },
        { title: "توقيت غير واضح", body: "لا يتضح دائمًا متى يكون التواصل التجاري مناسبًا، ولماذا." },
      ],
    },
    how: {
      eyebrow: "كيف تعمل",
      title: "كيف تعمل رواق",
      body: "المسار المستهدف الذي يُبنى عليه الرادار.",
      steps: [
        { title: "مشاريع وجهات", body: "تُسجَّل المشاريع والجهات المرتبطة بها، مع مصدر كل معلومة." },
        { title: "أحداث موثقة", body: "تُسجَّل التغيّرات كأحداث لها تواريخ: متى وقعت، ومتى نُشرت، ومتى اكتُشفت." },
        { title: "فرص مفسّرة", body: "تُقترح الفرصة مع سبب ظهورها والدليل عليها وما ينقصها من معلومات." },
        { title: "متابعة تجارية", body: "يُسجَّل المسؤول والموعد والنتيجة، لتعرف ما أثمرت عنه الفرصة." },
      ],
    },
    radar: {
      eyebrow: "الرادار",
      title: "يحوّل تغيّرات السوق إلى فرص يمكن متابعتها",
      body: "للفرق التجارية في الشركات التي تبيع خدماتها ومنتجاتها لمشاريع العقار والإنشاء في السعودية. يرصد ما يتغيّر في المشاريع والجهات، ويقترح الفرص مع دليلها وما ينقصها، ويتابعها حتى نتيجتها.",
      cta: "اقرأ عن الرادار",
      points: ["يفصل بين المعلومة والاستنتاج", "يُظهر ما ينقص قبل أي خطوة", "يتتبع الفرصة حتى نتيجتها"],
      status: "الرادار في مرحلة بناء الإصدار الداخلي لجرافيكس هاوس، ولم يُفتح للاستخدام التجاري بعد. ما يُوصف هنا هو المسار المستهدف، وليست كل وظائفه متاحة الآن.",
    },
    principles: {
      eyebrow: "مبادئ الثقة",
      title: "مبادئ نبني عليها المنتج",
      body: "مبادئ تصميم نلتزم بتطبيقها أثناء البناء.",
      cards: [
        { title: "الحقيقة منفصلة عن الاستنتاج", body: "ما ورد في مصدر يُعرض كما ورد، وما نستنتجه يُعلَّم أنه استنتاج." },
        { title: "المصدر والتاريخ", body: "نعرض المصدر وتاريخ النشر وتاريخ الاكتشاف حين تتوفر." },
        { title: "ما ينقص ظاهر", body: "نذكر ما لا نعرفه بدل أن نملأه بتخمين." },
        { title: "الرعاية لا تؤثر في التقييم", body: "لا يغيّر الدفع أو الرعاية ترتيب الفرص ولا درجتها." },
      ],
    },
    tools: {
      eyebrow: "أدوات مساندة",
      title: "نَسَق لإعداد عروض الأسعار",
      body: "أداة مستقلة لإعداد عروض أسعار احترافية، تعمل بجانب الرادار ولا تغيّر رسالته.",
      link: "تعرّف على نَسَق",
    },
  },
  radar: {
    eyebrow: "الرادار",
    title: "من إشارات السوق إلى فرص مفسّرة",
    lead: "الرادار يُبنى لمتابعة المشاريع والجهات والأحداث في سوق العقار والإنشاء السعودي، وتحويل ما يتغيّر إلى فرص تجارية مفسّرة، مع دليلها وما ينقصها.",
    status: "الرادار في مرحلة بناء الإصدار الداخلي لجرافيكس هاوس، ولم يُفتح للاستخدام التجاري بعد. ما تقرؤه هنا هو الرحلة المستهدفة، وليست كل وظائفها متاحة الآن. لا يوجد تسجيل عام ولا اشتراك ولا تجربة مجانية حاليًا.",
    audience: { title: "لمن الرادار؟", body: "يُطوَّر لفرق تطوير الأعمال في الشركات التي تبيع خدماتها ومنتجاتها للمشاريع العقارية والإنشائية في السعودية، بدءًا بإصدار داخلي لجرافيكس هاوس." },
    problem: { title: "ما المشكلة؟", body: "المعلومات التجارية عن المشاريع والجهات متفرقة، والتغيّرات تمرّ دون ملاحظة، وتوقيت التواصل غير واضح. يُبنى الرادار ليجمع هذه الصورة ويشرحها." },
    journey: {
      title: "الرحلة المستهدفة",
      body: "أربع مراحل، وفائدة كل منها لك.",
      steps: [
        { title: "المصدر", body: "تعرف من أين جاءت المعلومة، فتقرر مقدار ثقتك بها." },
        { title: "الحدث", body: "ترى ما تغيّر ومتى، فلا يفوتك تحوّل مهم في مشروع أو جهة." },
        { title: "الفرصة", body: "تصلك فرصة مقترحة مع سبب ظهورها وما ينقصها، لتقرر هل تستحق وقتك." },
        { title: "المتابعة", body: "تتحول الفرصة إلى خطوة لها مسؤول وموعد، وتعرف ما أثمرت عنه." },
      ],
    },
    states: {
      title: "المعلومة والاستنتاج",
      body: "نميّز بين ما نُشر في المصادر، وما راجعه الفريق، وما يُطرح بوصفه استنتاجًا. ونوضح المعلومات الناقصة أو التي تحتاج تحديثًا.",
    },
    contact: { title: "تواصل", body: "للاستفسار عن الرادار أو لإبداء ملاحظاتك على الفكرة.", button: "تواصل معنا" },
  },
  about: {
    eyebrow: "من نحن",
    title: "رواق",
    lead: "رواق مشروع ضمن مجموعة تسامي، يبني منصة لاستخبارات الفرص التجارية، ويبدأ بالسوق السعودي.",
    sections: [
      { title: "ما نبنيه", body: "الرادار: منتج يتابع المشاريع والأحداث والجهات، ويربط ما يتغيّر بفرص تجارية محتملة مع إظهار الدليل وحدود المعرفة." },
      { title: "كيف نعمل", body: "نفصل بين المعلومة والاستنتاج، ونُظهر المصدر والتاريخ حين يتوفران، ونذكر ما ينقص. لا نعد بنتائج تجارية." },
      { title: "أين نحن الآن", body: "الرادار في مرحلة بناء الإصدار الداخلي لجرافيكس هاوس، ولم يُفتح للاستخدام التجاري بعد." },
    ],
    cta: "تعرّف على الرادار",
  },
  contact: {
    eyebrow: "تواصل",
    title: "تواصل مع رواق",
    lead: "للاستفسار عن الرادار أو لإبداء ملاحظاتك.",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب",
    fine: "نردّ على الرسائل حسب الإمكان.",
    radar: "تعرّف على الرادار",
  },
};

const en: Copy = {
  header: { radar: "Radar", how: "How it works", tools: "Tools", about: "About", contact: "Contact", cta: "Discover Radar", enter: "Enter Radar", menu: "Main menu" },
  footer: {
    about: "A business-opportunity intelligence platform, starting with the Saudi market.",
    product: "Product", radar: "Radar", how: "How Ruwaq works", tools: "Tools & content", nasaq: "NASAQ: quotation builder", guides: "Guides",
    company: "Ruwaq", aboutLink: "About", contact: "Contact", legal: "Legal", privacy: "Privacy", terms: "Terms",
    rights: "All rights reserved", cta: "Get in touch", ctaBody: "Questions about Radar, or feedback on the idea.", ctaButton: "Contact",
  },
  home: {
    eyebrow: "Business-opportunity intelligence",
    title: "From market signals to business opportunities",
    lead: "Follow projects, events and organisations, understand what changed and what it may mean for your business, and decide your next commercial step.",
    cta: "Discover Radar",
    ctaSecondary: "How Ruwaq works",
    trust: ["Starting with the Saudi market", "Facts kept apart from inference", "Source and date when available"],
    example: {
      label: "Illustrative example — not a real opportunity",
      title: "Hypothetical residential project “A” moves into design",
      footnote: "Hypothetical names and data to explain the idea only. They do not refer to a real project, organisation or source.",
      rows: [
        { key: "Event", tag: "Reported", value: "A hypothetical announcement that the project has entered its design phase." },
        { key: "Evidence needed", value: "An announcement by the developer or a published report, with its publication date. No source is shown here because the example is hypothetical." },
        { key: "Possible meaning", tag: "Inference", inferred: true, value: "The organisation may soon prepare presentation and marketing material for the project. This is a possibility, not a confirmed need." },
        { key: "Not yet confirmed", value: "The organisation’s budget, whether it hires outside providers, and when it decides." },
        { key: "Next step", value: "Check the announcement at its source, then decide whether the opportunity is worth reaching out about." },
      ],
    },
    problem: {
      eyebrow: "The problem",
      title: "What does Ruwaq address?",
      body: "Commercial information is scattered, changes go unnoticed, and it is hard to tell when reaching out makes sense.",
      cards: [
        { title: "Scattered information", body: "News about projects and organisations sits across many sources and is hard to see as one picture." },
        { title: "Changes that are hard to follow", body: "A project moving to a new stage, or a new appointment, can pass unnoticed." },
        { title: "Unclear timing", body: "It is not always clear when outreach is appropriate, or why." },
      ],
    },
    how: {
      eyebrow: "How it works",
      title: "How Ruwaq works",
      body: "The target path Radar is being built around.",
      steps: [
        { title: "Projects and organisations", body: "Projects and the organisations tied to them are recorded, with a source for each fact." },
        { title: "Documented events", body: "Changes are recorded as dated events: when they happened, when they were published, when they were found." },
        { title: "Explained opportunities", body: "An opportunity is proposed with why it appears, its evidence, and what is missing." },
        { title: "Commercial follow-up", body: "An owner, a date and an outcome are recorded, so you learn what each opportunity led to." },
      ],
    },
    radar: {
      eyebrow: "Radar",
      title: "Turns market changes into opportunities you can follow",
      body: "For sales teams at companies that sell services and products to real estate and construction projects in Saudi Arabia. It tracks what changes in projects and organisations, proposes opportunities with their evidence and what is missing, and follows them to an outcome.",
      cta: "Read about Radar",
      points: ["Separates fact from inference", "Shows what is missing before any step", "Tracks an opportunity to its outcome"],
      status: "Radar is at the stage of building the internal release for Graphics House and has not been opened for commercial use. What is described here is the target path; not all of its functions are available today.",
    },
    principles: {
      eyebrow: "Principles",
      title: "Principles the product is built on",
      body: "Design principles we commit to applying as we build.",
      cards: [
        { title: "Fact apart from inference", body: "What a source says is shown as stated; what we infer is marked as inference." },
        { title: "Source and date", body: "We show the source, publication date and discovery date when available." },
        { title: "Gaps stay visible", body: "We state what we do not know instead of filling it with a guess." },
        { title: "Sponsorship does not affect scoring", body: "Payment or sponsorship does not change an opportunity’s rank or score." },
      ],
    },
    tools: {
      eyebrow: "Supporting tools",
      title: "NASAQ for quotations",
      body: "A standalone tool for preparing professional quotations. It works alongside Radar and does not change its message.",
      link: "Discover NASAQ",
    },
  },
  radar: {
    eyebrow: "Radar",
    title: "From market signals to explained opportunities",
    lead: "Radar is being built to follow projects, organisations and events in the Saudi real estate and construction market, and to turn what changes into explained commercial opportunities, with their evidence and what is missing.",
    status: "Radar is at the stage of building the internal release for Graphics House and has not been opened for commercial use. What you read here is the target journey; not all of its functions are available today. There is no public sign-up, subscription or free trial at present.",
    audience: { title: "Who is Radar for?", body: "It is being developed for business-development teams at companies that sell services and products to real estate and construction projects in Saudi Arabia, starting with an internal release for Graphics House." },
    problem: { title: "What is the problem?", body: "Commercial information about projects and organisations is scattered, changes go unnoticed, and the timing of outreach is unclear. Radar is being built to assemble that picture and explain it." },
    journey: {
      title: "The target journey",
      body: "Four stages, and what each gives you.",
      steps: [
        { title: "Source", body: "You see where a piece of information came from, so you can decide how far to trust it." },
        { title: "Event", body: "You see what changed and when, so an important shift in a project or organisation does not slip past." },
        { title: "Opportunity", body: "You get a proposed opportunity with why it appears and what is missing, so you can decide whether it deserves your time." },
        { title: "Follow-up", body: "The opportunity becomes a step with an owner and a date, and you learn what it led to." },
      ],
    },
    states: {
      title: "Fact and inference",
      body: "We distinguish what was published in sources, what the team has reviewed, and what is put forward as an inference. We also point out what is missing or needs updating.",
    },
    contact: { title: "Contact", body: "For questions about Radar, or feedback on the idea.", button: "Get in touch" },
  },
  about: {
    eyebrow: "About",
    title: "Ruwaq",
    lead: "Ruwaq is a project within the Tasami group, building a business-opportunity intelligence platform, starting with the Saudi market.",
    sections: [
      { title: "What we are building", body: "Radar: a product that follows projects, events and organisations and links changes to possible business opportunities, showing the evidence and the limits of knowledge." },
      { title: "How we work", body: "We keep fact apart from inference, show the source and date when available, and say what is missing. We do not promise commercial results." },
      { title: "Where we are now", body: "Radar is at the stage of building the internal release for Graphics House and has not been opened for commercial use." },
    ],
    cta: "Discover Radar",
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact Ruwaq",
    lead: "For questions about Radar, or your feedback.",
    email: "Email",
    whatsapp: "WhatsApp",
    fine: "We reply as we can.",
    radar: "Discover Radar",
  },
};

export function getSiteCopy(locale: Locale): Copy {
  return locale === "ar" ? ar : en;
}
