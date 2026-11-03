import type { Locale } from "@/shared/i18n/locale";

/**
 * Public-site copy. Positioning: Ruwaq is a knowledge umbrella about projects and organisations
 * in the Saudi market, still under construction. Radar is a secondary item: an internal trial at
 * Graphics House, not open to external users. Nothing here claims live data, full coverage,
 * results, a sign-up, a waitlist or a launch date. Example content is labelled as illustrative.
 */
type Card = { title: string; body: string };
type Step = { title: string; body: string };

type Copy = {
  header: { radar: string; about: string; contact: string; cta: string; enter: string; menu: string };
  footer: {
    about: string; sections: string; radar: string; tools: string; nasaq: string; ready: string; guides: string;
    company: string; aboutLink: string; contact: string; privacy: string; terms: string; enter: string;
    rights: string; cta: string; ctaBody: string; ctaButton: string;
  };
  home: {
    eyebrow: string; title: string; lead: string; cta: string; ctaSecondary: string; trust: string[];
    status: { label: string; title: string; footnote: string; available: string; soon: string; internal: string; radarName: string };
    sections: {
      eyebrow: string; title: string; body: string; open: string;
      items: { updates: Card; insights: Card; specialists: Card };
    };
    how: { eyebrow: string; title: string; body: string; cards: Card[] };
    radar: { eyebrow: string; title: string; body: string; cta: string };
    tools: { eyebrow: string; title: string; body: string; link: string; ready: string };
  };
  radar: {
    eyebrow: string; title: string; lead: string; status: string;
    audience: { title: string; body: string };
    works: { title: string; items: string[] };
    planned: { title: string; items: string[] };
    journey: { title: string; body: string; steps: Step[] };
    example: { label: string; title: string; footnote: string; rows: { key: string; tag?: string; inferred?: boolean; value: string }[] };
    states: { title: string; body: string };
    contact: { title: string; body: string; button: string };
  };
  about: { eyebrow: string; title: string; lead: string; sections: Card[]; cta: string };
  contact: { eyebrow: string; title: string; lead: string; email: string; whatsapp: string; fine: string; radar: string };
  meta: { title: string; description: string; ogLine: string; jsonLd: string };
};

const ar: Copy = {
  header: { radar: "الرادار", about: "من نحن", contact: "تواصل", cta: "تواصل", enter: "دخول العملاء", menu: "القائمة الرئيسية" },
  footer: {
    about: "مظلة معرفية قيد البناء عن المشاريع والجهات في السوق السعودي.",
    sections: "الأقسام", radar: "الرادار (تجربة داخلية)", tools: "أدوات", nasaq: "نَسَق: إعداد عروض الأسعار", ready: "العروض الجاهزة (نماذج نَسَق)", guides: "الأدلة",
    company: "رواق", aboutLink: "من نحن", contact: "تواصل", privacy: "الخصوصية", terms: "الشروط", enter: "دخول العملاء",
    rights: "جميع الحقوق محفوظة", cta: "تواصل معنا", ctaBody: "للاستفسار عن رواق أو لإبداء ملاحظاتك.", ctaButton: "تواصل",
  },
  home: {
    eyebrow: "مظلة معرفية قيد البناء",
    title: "رواق: معرفة موثّقة عن المشاريع والجهات في السوق السعودي",
    lead: "نبني رواق لتكون مرجعًا للمشاريع والجهات وما يتغيّر في السوق السعودي، مع المصدر والتاريخ وما لم يتأكد بعد. المنصة قيد البناء، ونعلن بوضوح ما هو متاح منها.",
    cta: "استكشف الأقسام",
    ctaSecondary: "من نحن",
    trust: ["نركّز على السوق السعودي", "المصدر والتاريخ حين يتوفران", "الحقيقة منفصلة عن الاستنتاج"],
    status: {
      label: "حالة الأقسام اليوم",
      title: "أين وصلنا",
      footnote: "نعرض الحالة كما هي: لا محتوى وهميًا، ولا نعدّ قسمًا متاحًا قبل مراجعة مادته.",
      available: "متاح", soon: "قريبًا", internal: "تجربة داخلية", radarName: "الرادار",
    },
    sections: {
      eyebrow: "الأقسام",
      title: "ثلاثة أقسام تُبنى بعناية",
      body: "كل قسم له غرض واضح، وسيُفتح حين تكتمل مواده ومراجعتها.",
      open: "تفاصيل القسم",
      items: {
        updates: { title: "المشاريع والتحديثات", body: "ماذا أُعلن أو تغيّر في مشاريع مختارة، مع المصدر وتاريخ النشر وما لم يتضح بعد." },
        insights: { title: "الرؤى والتقارير", body: "تحليلات وتقارير قصيرة حول سؤال محدد وفترة ونطاق، مع المنهجية وحدود التغطية." },
        specialists: { title: "دليل الجهات المتخصصة", body: "ملفات تعريفية لجهات تعمل في منظومة المشاريع، تفصل بين ما تنشره الجهة عن نفسها وما راجعته رواق فعلًا." },
      },
    },
    how: {
      eyebrow: "كيف نعمل",
      title: "مبادئ نلتزم بها",
      body: "الاختيار تحريري، ولا نعد بتغطية شاملة للسوق.",
      cards: [
        { title: "المصدر والتاريخ", body: "نعرض المصدر وتاريخ النشر وتاريخ الحدث حين يتوفران، ونفرّق بينها." },
        { title: "الحقيقة منفصلة عن الاستنتاج", body: "ما ورد في مصدر يُعرض كما ورد، وما نستنتجه يُعلَّم أنه استنتاج." },
        { title: "ما ينقص ظاهر", body: "نذكر ما لا نعرفه بدل أن نملأه بتخمين." },
        { title: "لا تغطية شاملة", body: "نختار مواد محددة ونعرضها بمصادرها، ولا نزعم أنها تمثل السوق كله." },
      ],
    },
    radar: {
      eyebrow: "قيد التطوير والتجربة الداخلية",
      title: "الرادار: تجربة داخلية لمتابعة الفرص",
      body: "الرادار أداة نطوّرها داخل رواق لمتابعة تغيّرات المشاريع والجهات وتحويلها إلى فرص تجارية قابلة للمراجعة. نختبره حاليًا داخل جرافيكس هاوس، وهو غير متاح للاشتراك أو الاستخدام الخارجي. وسنقرر تقديمه للغير بناءً على نتائج التجربة.",
      cta: "عن الرادار",
    },
    tools: {
      eyebrow: "أدوات",
      title: "نَسَق لإعداد عروض الأسعار",
      body: "أداة مستقلة لإعداد عروض أسعار احترافية، وهي قائمة بذاتها ولا ترتبط بمحتوى رواق.",
      link: "تعرّف على نَسَق",
      ready: "العروض الجاهزة",
    },
  },
  radar: {
    eyebrow: "الرادار",
    title: "الرادار: تجربة داخلية لمتابعة الفرص",
    lead: "الرادار أداة نطوّرها داخل رواق لمتابعة المشاريع والجهات والأحداث في سوق العقار والإنشاء السعودي، وتحويل ما يتغيّر إلى فرص تجارية مفسّرة مع دليلها وما ينقصها.",
    status: "الرادار قيد التطوير والتجربة الداخلية. نختبره داخل جرافيكس هاوس، وهو غير متاح للاشتراك أو الاستخدام الخارجي حاليًا. لا يوجد تسجيل عام ولا قائمة انتظار ولا موعد إطلاق معلن.",
    audience: { title: "لمن هو؟", body: "لفرق تطوير الأعمال في الشركات التي تبيع خدماتها ومنتجاتها لمشاريع العقار والإنشاء في السعودية. نبدأ بتجربة داخلية في جرافيكس هاوس، وسنقرر تقديمه للغير بناءً على نتائجها." },
    works: {
      title: "ما بُني حتى الآن (نموذج أولي)",
      items: [
        "تسجيل المصادر والإشارات يدويًا، رابطًا رابطًا، مع تمييز تاريخ النشر عن تاريخ الحدث.",
        "مراجعة بشرية لكل إشارة قبل أن تتحول إلى فرصة.",
        "منع تكرار الخبر نفسه والتنبيه عند احتمال التكرار.",
        "قائمة فرص وسجل متابعة فيه المسؤول والموعد والنتيجة.",
      ],
    },
    planned: {
      title: "المخطط له ولم يُفعَّل بعد",
      items: [
        "الجمع الآلي من مصادر مختارة بعد اعتماد كل مصدر على حدة.",
        "تقرير أسبوعي بالفرص.",
        "فتح الرادار لجهات أخرى، وذلك بناءً على نتائج التجربة.",
      ],
    },
    journey: {
      title: "الرحلة المستهدفة",
      body: "أربع مراحل، وفائدة كل منها.",
      steps: [
        { title: "المصدر", body: "تعرف من أين جاءت المعلومة، فتقرر مقدار ثقتك بها." },
        { title: "الحدث", body: "ترى ما تغيّر ومتى، فلا يفوتك تحوّل مهم في مشروع أو جهة." },
        { title: "الفرصة", body: "تصلك فرصة مقترحة مع سبب ظهورها وما ينقصها، لتقرر هل تستحق وقتك." },
        { title: "المتابعة", body: "تتحول الفرصة إلى خطوة لها مسؤول وموعد، وتعرف ما أثمرت عنه." },
      ],
    },
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
    states: {
      title: "المعلومة والاستنتاج",
      body: "نميّز بين ما نُشر في المصادر، وما راجعه الفريق، وما يُطرح بوصفه استنتاجًا. ونوضح المعلومات الناقصة أو التي تحتاج تحديثًا.",
    },
    contact: { title: "تواصل", body: "للاستفسار أو لإبداء ملاحظاتك على الفكرة.", button: "تواصل معنا" },
  },
  about: {
    eyebrow: "من نحن",
    title: "رواق",
    lead: "رواق مشروع ضمن مجموعة تسامي، يبني مظلة معرفية عن المشاريع والجهات في السوق السعودي. المنصة قيد البناء.",
    sections: [
      { title: "ما نبنيه", body: "ثلاثة أقسام: المشاريع والتحديثات، والرؤى والتقارير، ودليل الجهات المتخصصة. لكل قسم مادة موثقة بالمصدر والتاريخ، وتُفتح الأقسام تدريجيًا بعد مراجعة موادها." },
      { title: "كيف نعمل", body: "نفصل بين المعلومة والاستنتاج، ونُظهر المصدر والتاريخ حين يتوفران، ونذكر ما ينقص. الاختيار تحريري ولا نزعم تغطية شاملة للسوق." },
      { title: "الرادار", body: "الرادار أداة داخل رواق، قيد التطوير والتجربة الداخلية في جرافيكس هاوس، وغير متاحة للاستخدام الخارجي حاليًا." },
    ],
    cta: "الأقسام",
  },
  contact: {
    eyebrow: "تواصل",
    title: "تواصل مع رواق",
    lead: "للاستفسار أو لإبداء ملاحظاتك.",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب",
    fine: "نردّ على الرسائل حسب الإمكان.",
    radar: "عن الرادار",
  },
  meta: {
    title: "رواق | معرفة موثّقة عن المشاريع والجهات في السوق السعودي",
    description: "رواق مظلة معرفية قيد البناء عن المشاريع والجهات وما يتغيّر في السوق السعودي، مع المصدر والتاريخ. أقسام المشاريع والتحديثات والرؤى والتقارير ودليل الجهات قريبًا. الرادار تجربة داخلية لجرافيكس هاوس وغير متاح للاستخدام الخارجي.",
    ogLine: "معرفة موثّقة عن المشاريع والجهات في السوق السعودي",
    jsonLd: "مظلة معرفية قيد البناء عن المشاريع والجهات في السوق السعودي. الرادار تجربة داخلية لجرافيكس هاوس وغير متاح للاستخدام الخارجي.",
  },
};

const en: Copy = {
  header: { radar: "Radar", about: "About", contact: "Contact", cta: "Contact", enter: "Client login", menu: "Main menu" },
  footer: {
    about: "A knowledge umbrella, under construction, about projects and organisations in the Saudi market.",
    sections: "Sections", radar: "Radar (internal trial)", tools: "Tools", nasaq: "NASAQ: quotation builder", ready: "Ready proposals (NASAQ samples)", guides: "Guides",
    company: "Ruwaq", aboutLink: "About", contact: "Contact", privacy: "Privacy", terms: "Terms", enter: "Client login",
    rights: "All rights reserved", cta: "Get in touch", ctaBody: "Questions about Ruwaq, or your feedback.", ctaButton: "Contact",
  },
  home: {
    eyebrow: "A knowledge umbrella under construction",
    title: "Ruwaq: documented knowledge about projects and organisations in the Saudi market",
    lead: "We are building Ruwaq as a reference for projects, organisations and what changes in the Saudi market, with the source, the date and what is not yet confirmed. The platform is under construction, and we say plainly what is available.",
    cta: "Explore the sections",
    ctaSecondary: "About",
    trust: ["Focused on the Saudi market", "Source and date when available", "Fact kept apart from inference"],
    status: {
      label: "Section status today",
      title: "Where we are",
      footnote: "We show the status as it is: no placeholder content, and a section is not counted as available until its material has been reviewed.",
      available: "Available", soon: "Coming soon", internal: "Internal trial", radarName: "Radar",
    },
    sections: {
      eyebrow: "Sections",
      title: "Three sections, built with care",
      body: "Each section has a clear purpose and opens once its material has been written and reviewed.",
      open: "Section details",
      items: {
        updates: { title: "Projects & updates", body: "What was announced or changed in selected projects, with the source, publication date and what is still unclear." },
        insights: { title: "Insights & reports", body: "Short analyses and reports built around one question, period and scope, with the methodology and coverage limits." },
        specialists: { title: "Specialist directory", body: "Profiles of organisations in the projects ecosystem, separating what each says about itself from what Ruwaq actually reviewed." },
      },
    },
    how: {
      eyebrow: "How we work",
      title: "Principles we hold to",
      body: "Selection is editorial, and we do not promise full market coverage.",
      cards: [
        { title: "Source and date", body: "We show the source, publication date and event date when available, and keep them distinct." },
        { title: "Fact apart from inference", body: "What a source says is shown as stated; what we infer is marked as inference." },
        { title: "Gaps stay visible", body: "We state what we do not know instead of filling it with a guess." },
        { title: "No full coverage claim", body: "We pick specific items and show them with their sources, without claiming they represent the whole market." },
      ],
    },
    radar: {
      eyebrow: "In development and internal trial",
      title: "Radar: an internal trial for following opportunities",
      body: "Radar is a tool we are developing inside Ruwaq to follow changes in projects and organisations and turn them into opportunities a person can review. We are testing it inside Graphics House, and it is not available for subscription or external use. We will decide whether to offer it to others based on the results of the trial.",
      cta: "About Radar",
    },
    tools: {
      eyebrow: "Tools",
      title: "NASAQ for quotations",
      body: "A standalone tool for preparing professional quotations. It stands on its own and is not tied to Ruwaq’s content.",
      link: "Discover NASAQ",
      ready: "Ready proposals",
    },
  },
  radar: {
    eyebrow: "Radar",
    title: "Radar: an internal trial for following opportunities",
    lead: "Radar is a tool we are developing inside Ruwaq to follow projects, organisations and events in the Saudi real estate and construction market, and turn what changes into explained commercial opportunities, with their evidence and what is missing.",
    status: "Radar is in development and internal trial. We are testing it inside Graphics House, and it is not available for subscription or external use at present. There is no public sign-up, no waitlist and no announced launch date.",
    audience: { title: "Who is it for?", body: "Business-development teams at companies that sell services and products to real estate and construction projects in Saudi Arabia. We start with an internal trial at Graphics House, and will decide whether to offer it to others based on its results." },
    works: {
      title: "Built so far (prototype)",
      items: [
        "Recording sources and signals by hand, one link at a time, keeping publication date apart from event date.",
        "A person reviews every signal before it can become an opportunity.",
        "Prevention of recording the same story twice, with a warning when a duplicate is possible.",
        "An opportunity list and a follow-up log with owner, date and outcome.",
      ],
    },
    planned: {
      title: "Planned, not yet enabled",
      items: [
        "Automated collection from selected sources, after each source is approved on its own.",
        "A weekly opportunities report.",
        "Opening Radar to other organisations, depending on the results of the trial.",
      ],
    },
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
    states: {
      title: "Fact and inference",
      body: "We distinguish what was published in sources, what the team has reviewed, and what is put forward as an inference. We also point out what is missing or needs updating.",
    },
    contact: { title: "Contact", body: "For questions, or feedback on the idea.", button: "Get in touch" },
  },
  about: {
    eyebrow: "About",
    title: "Ruwaq",
    lead: "Ruwaq is a project within the Tasami group, building a knowledge umbrella about projects and organisations in the Saudi market. The platform is under construction.",
    sections: [
      { title: "What we are building", body: "Three sections: projects and updates, insights and reports, and a specialist directory. Each carries material documented with its source and date, and sections open gradually once their material has been reviewed." },
      { title: "How we work", body: "We keep fact apart from inference, show the source and date when available, and say what is missing. Selection is editorial and we do not claim full market coverage." },
      { title: "Radar", body: "Radar is a tool inside Ruwaq, in development and internal trial at Graphics House, and not available for external use at present." },
    ],
    cta: "Sections",
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact Ruwaq",
    lead: "For questions, or your feedback.",
    email: "Email",
    whatsapp: "WhatsApp",
    fine: "We reply as we can.",
    radar: "About Radar",
  },
  meta: {
    title: "Ruwaq | Documented knowledge about projects and organisations in the Saudi market",
    description: "Ruwaq is a knowledge umbrella, under construction, about projects, organisations and what changes in the Saudi market, with source and date. Project updates, insights and reports, and a specialist directory are coming soon. Radar is an internal trial at Graphics House and is not available for external use.",
    ogLine: "Documented knowledge about projects and organisations in the Saudi market",
    jsonLd: "A knowledge umbrella, under construction, about projects and organisations in the Saudi market. Radar is an internal trial at Graphics House and is not available for external use.",
  },
};

export function getSiteCopy(locale: Locale): Copy {
  return locale === "ar" ? ar : en;
}
