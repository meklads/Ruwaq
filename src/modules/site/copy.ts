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
  header: {
    knowledge: string; nasaq: string; radar: string; about: string; contact: string; subscribers: string;
    menu: string; openMenu: string; closeMenu: string; soon: string; available: string;
  };
  footer: {
    about: string; sections: string; tools: string; company: string;
    nasaq: string; ready: string; guides: string; aboutLink: string; aboutRadar: string; contact: string;
    privacy: string; terms: string; subscribers: string; rights: string; cta: string; ctaBody: string; ctaButton: string;
  };
  home: {
    eyebrow: string; title: string; lead: string; cta: string; ctaSecondary: string; trust: string[];
    index: { label: string; tools: string; soon: string; available: string; tool: string; internal: string; nasaq: string; radar: string };
    sections: {
      eyebrow: string; title: string; body: string; open: string;
      items: { updates: Card; insights: Card; specialists: Card };
    };
    how: { eyebrow: string; title: string; body: string; cards: Card[] };
    nasaq: { eyebrow: string; title: string; body: string; primary: string; secondary: string; link: string };
    radar: { eyebrow: string; title: string; body: string; cta: string };
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
  header: {
    knowledge: "المعرفة", nasaq: "نَسَق", radar: "عن الرادار", about: "من نحن", contact: "تواصل", subscribers: "دخول المشتركين",
    menu: "القائمة الرئيسية", openMenu: "فتح القائمة", closeMenu: "إغلاق القائمة", soon: "قريبًا", available: "متاح",
  },
  footer: {
    about: "مظلة معرفية عن المشاريع والجهات في السوق السعودي.",
    sections: "الأقسام", tools: "أدوات", company: "رواق",
    nasaq: "نَسَق: إعداد عروض الأسعار", ready: "العروض الجاهزة", guides: "الأدلة", aboutLink: "من نحن", aboutRadar: "عن الرادار", contact: "تواصل",
    privacy: "الخصوصية", terms: "الشروط", subscribers: "دخول المشتركين",
    rights: "جميع الحقوق محفوظة", cta: "تواصل معنا", ctaBody: "للاستفسار عن رواق أو لإبداء ملاحظاتك.", ctaButton: "تواصل",
  },
  home: {
    eyebrow: "رواق",
    title: "ما يتغيّر في مشاريع السوق السعودي وجهاته، بمصدره وتاريخه",
    lead: "تجمع رواق التحديثات والتحليلات وملفات الجهات المتخصصة في مكان واحد، وتفصل في كل مادة بين ما نُشر وما نستنتجه.",
    cta: "استكشف الأقسام",
    ctaSecondary: "نَسَق لعروض الأسعار",
    trust: ["المصدر والتاريخ لكل مادة", "الحقيقة منفصلة عن الاستنتاج", "تحرير انتقائي لا ادعاء شمول"],
    index: { label: "داخل رواق", tools: "أدوات", soon: "قريبًا", available: "متاح", tool: "أداة", internal: "تجربة داخلية", nasaq: "نَسَق", radar: "الرادار" },
    sections: {
      eyebrow: "الأقسام",
      title: "ثلاثة أقسام، لكل منها غرضه",
      body: "نفتح كل قسم حين تكتمل مواده وتُراجع.",
      open: "تفاصيل القسم",
      items: {
        updates: { title: "المشاريع والتحديثات", body: "ماذا أُعلن أو تغيّر في مشاريع مختارة، مع المصدر وتاريخ النشر وما لم يتضح بعد." },
        insights: { title: "الرؤى والتقارير", body: "تحليلات وتقارير قصيرة حول سؤال محدد وفترة ونطاق، مع المنهجية وحدود التغطية." },
        specialists: { title: "دليل الجهات المتخصصة", body: "ملفات تعريفية لجهات تعمل في منظومة المشاريع، تفصل بين ما تنشره الجهة عن نفسها وما راجعته رواق فعلًا." },
      },
    },
    how: {
      eyebrow: "المنهجية",
      title: "كيف نعمل، وأين تنتهي تغطيتنا",
      body: "الاختيار تحريري: نعرض مواد محددة بمصادرها، ولا نزعم أنها تمثل السوق كله.",
      cards: [
        { title: "المصدر والتاريخ", body: "نعرض المصدر وتاريخ النشر وتاريخ الحدث حين يتوفران، ونفرّق بينها." },
        { title: "الحقيقة والاستنتاج", body: "ما ورد في مصدر يُعرض كما ورد، وما نستنتجه يُعلَّم أنه استنتاج." },
        { title: "ما ينقص ظاهر", body: "نذكر ما لا نعرفه بدل أن نملأه بتخمين." },
      ],
    },
    nasaq: {
      eyebrow: "نَسَق",
      title: "عروض أسعار احترافية بهوية شركتك",
      body: "أداة مستقلة لإعداد عرض سعر منظّم بالعربية والإنجليزية، مع نماذج جاهزة تعاينها قبل أن تبدأ.",
      primary: "ابدأ عرضًا",
      secondary: "العروض الجاهزة",
      link: "عن نَسَق",
    },
    radar: {
      eyebrow: "الرادار",
      title: "تجربة داخلية لمتابعة الفرص",
      body: "أداة نطوّرها داخل رواق ونختبرها حاليًا في جرافيكس هاوس، وهي غير متاحة للاشتراك أو للاستخدام الخارجي.",
      cta: "عن الرادار",
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
      { title: "من يملك رواق", body: "رواق تملكه مجموعة تسامي، ومن شركاتها جرافيكس هاوس وتوريفا وبيزموشن. حين تقترح صفحة خدمة لإحدى هذه الشركات نذكر أنها من المجموعة، ولا تأخذ شركات المجموعة أي أفضلية في الدليل أو في ترتيب المحتوى." },
      { title: "منهجية التحرير", body: "كل معلومة تنظيمية من مصدر رسمي مع رابطه وتاريخ الاطلاع. صفحات الطرز المعمارية يراجعها معماري قبل نشرها. الصور من إنتاج المجموعة أو بترخيص مذكور. لا نقدّم تحليلًا عقاريًا ولا تقييمًا ولا توصيات استثمارية. وإن وجدت خطأ فراسلنا لنصححه ونذكر تاريخ التصحيح." },
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
  header: {
    knowledge: "Knowledge", nasaq: "NASAQ", radar: "About Radar", about: "About", contact: "Contact", subscribers: "Subscriber sign-in",
    menu: "Main menu", openMenu: "Open menu", closeMenu: "Close menu", soon: "Soon", available: "Available",
  },
  footer: {
    about: "A knowledge umbrella about projects and organisations in the Saudi market.",
    sections: "Sections", tools: "Tools", company: "Ruwaq",
    nasaq: "NASAQ: quotation builder", ready: "Ready proposals", guides: "Guides", aboutLink: "About", aboutRadar: "About Radar", contact: "Contact",
    privacy: "Privacy", terms: "Terms", subscribers: "Subscriber sign-in",
    rights: "All rights reserved", cta: "Get in touch", ctaBody: "Questions about Ruwaq, or your feedback.", ctaButton: "Contact",
  },
  home: {
    eyebrow: "Ruwaq",
    title: "What is changing in Saudi projects and organisations, with its source and date",
    lead: "Ruwaq brings project updates, short analyses and specialist profiles together, and keeps what was published apart from what we infer.",
    cta: "Explore the sections",
    ctaSecondary: "NASAQ for quotations",
    trust: ["Source and date on every item", "Fact kept apart from inference", "Editorial selection, not a coverage claim"],
    index: { label: "Inside Ruwaq", tools: "Tools", soon: "Soon", available: "Available", tool: "Tool", internal: "Internal trial", nasaq: "NASAQ", radar: "Radar" },
    sections: {
      eyebrow: "Sections",
      title: "Three sections, each with its purpose",
      body: "We open each section once its material has been written and reviewed.",
      open: "Section details",
      items: {
        updates: { title: "Projects & updates", body: "What was announced or changed in selected projects, with the source, publication date and what is still unclear." },
        insights: { title: "Insights & reports", body: "Short analyses and reports built around one question, period and scope, with the methodology and coverage limits." },
        specialists: { title: "Specialist directory", body: "Profiles of organisations in the projects ecosystem, separating what each says about itself from what Ruwaq actually reviewed." },
      },
    },
    how: {
      eyebrow: "Method",
      title: "How we work, and where our coverage ends",
      body: "Selection is editorial: we show specific items with their sources, and we do not claim they represent the whole market.",
      cards: [
        { title: "Source and date", body: "We show the source, publication date and event date when available, and keep them distinct." },
        { title: "Fact and inference", body: "What a source says is shown as stated; what we infer is marked as inference." },
        { title: "Gaps stay visible", body: "We state what we do not know instead of filling it with a guess." },
      ],
    },
    nasaq: {
      eyebrow: "NASAQ",
      title: "Professional quotations in your company’s identity",
      body: "A standalone tool for preparing a well-structured quotation in Arabic or English, with ready samples you can preview before you start.",
      primary: "Start a proposal",
      secondary: "Ready proposals",
      link: "About NASAQ",
    },
    radar: {
      eyebrow: "Radar",
      title: "An internal trial for following opportunities",
      body: "A tool we are developing inside Ruwaq and testing at Graphics House. It is not available for subscription or external use.",
      cta: "About Radar",
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
      { title: "Who owns Ruwaq", body: "Ruwaq is owned by the Tasami group, whose companies include Graphics House, Turriva and Bees Motion. When a page suggests one of these companies we say it belongs to the group, and group companies get no preference in the directory or in how content is ordered." },
      { title: "Editorial method", body: "Every regulatory fact comes from an official source with its link and access date. Architectural style pages are reviewed by an architect before publication. Images are produced by the group or used under a stated licence. We give no real estate analysis, valuation or investment advice. If you find an error, write to us and we will correct it and note the date." },
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
