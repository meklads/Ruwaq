import { QUOTE_CHECK_DETAILED_PRICE_SAR } from "@/modules/marketplace/lib/quote-check";

type Locale = "ar" | "en";

const price = QUOTE_CHECK_DETAILED_PRICE_SAR;

const ar = {
  metaTitle: "افحص عرض المقاول قبل التوقيع | رواق",
  metaDescription:
    "أرسل عرض سعر التشطيب أو البناء، ويتولّى مختص من رواق مراجعته خلال ٤٨ ساعة: البنود الناقصة، والمواصفات المبهمة، ومدى معقولية السعر في سوق جدة.",
  hero: {
    eyebrow: "خدمة فحص العروض",
    title: "قبل أن توقّع، دع خبيراً يقرأ العرض نيابةً عنك.",
    lead: "عرض السعر هو أهم وثيقة في مشروعك، وأرخص لحظة لاكتشاف أخطائه هي الآن. أرسله إلينا، ونعيده إليك خلال ٤٨ ساعة مقروءاً بعين هندسية، بلغة واضحة.",
    primaryCta: "أرسل عرضك مجاناً",
    secondaryCta: "ما الذي نراجعه؟",
    trust: ["سرية تامة", "لا نرشّح مقاولاً إلا إن طلبت", "الرد خلال ٤٨ ساعة"],
  },
  problem: {
    title: "معظم خلافات التشطيب تُكتب في العرض قبل أن تظهر في الموقع",
    items: [
      "«بلاط سيراميك» بلا علامة ولا درجة ولا سماكة؛ هنا يبدأ استبدال المواد.",
      "سعر يقلّ كثيراً عن غيره؛ غالباً لأن بنوداً أساسية لم تُذكر، وستعود إليك لاحقاً بفاتورة إضافية.",
      "دفعة مقدّمة كبيرة غير مربوطة بإنجاز؛ أكبر مخاطرة على مالك.",
      "لا جدول زمني، ولا غرامة تأخير، ولا ضمان مكتوب؛ أي لا شيء يحمي حقك.",
    ],
    closing: "العرض الذي بين يديك اليوم هو أقلّ نقطة تكلفةً لتصحيح المسار.",
  },
  checks: {
    title: "ما الذي نراجعه",
    items: [
      { title: "نطاق العمل", body: "هل يشمل العرض كل الأعمال التي يحتاجها مشروعك؟ وما الغائب منها؟" },
      { title: "المواصفات", body: "هل كل مادة محددة بعلامتها التجارية ودرجتها ومقاسها؟" },
      { title: "السعر", body: "هل يقع ضمن النطاق المعقول لهذا المستوى من التشطيب في جدة؟" },
      { title: "الدفعات", body: "هل ترتبط كل دفعة بمرحلة إنجاز يمكن التحقق منها؟" },
      { title: "المدة والغرامات", body: "هل يتضمن العرض جدولاً زمنياً وغرامة تأخير واضحة؟" },
      { title: "الضمان والاستلام", body: "هل يتضمن ضماناً مكتوباً ونسبة محتجزة حتى الاستلام النهائي؟" },
    ],
  },
  steps: {
    title: "كيف تعمل الخدمة",
    items: [
      { title: "سجّل طلبك", body: "دقيقة واحدة، وتحصل على رقم مرجعي." },
      { title: "أرسل العرض", body: "صورة أو ملف PDF عبر واتساب، حتى ثلاثة عروض." },
      { title: "استلم القراءة", body: "تقرير واضح خلال ٤٨ ساعة، ومعه الأسئلة التي ينبغي أن تطرحها على المقاول قبل التوقيع." },
    ],
  },
  packages: {
    title: "اختر نوع المراجعة",
    free: {
      name: "المراجعة السريعة",
      price: "مجاناً",
      items: ["أهم خمس ملاحظات على العرض", "تقييم عام بثلاثة مستويات", "عرض واحد"],
    },
    detailed: {
      name: "التقرير المفصّل",
      price: `${price} ريالاً`,
      badge: "الأشمل",
      items: [
        "قراءة كاملة للبنود والمواصفات والسعر والدفعات والضمان",
        "حتى ثلاثة عروض في تقرير مقارن واحد",
        "أسئلة جاهزة تطرحها على المقاول",
        "مكالمة ١٥ دقيقة مع المراجع",
      ],
    },
    note: "تُخصم قيمة التقرير المفصّل إذا واصلت معنا إلى «ملف المشروع».",
  },
  why: {
    title: "لماذا رواق",
    items: [
      { title: "لا مصلحة لنا في عرضك", body: "لا نتقاضى من أي مقاول مقابل هذه المراجعة، فرأينا خالص لك." },
      { title: "خبرة في السوق المحلي", body: "فريق بخبرة خمسة عشر عاماً في التصميم والتنفيذ المعماري بالمملكة، يعرف أين تختبئ الثغرات في العروض." },
      { title: "سرية كاملة", body: "لا يطّلع على عرضك ولا على اسم مقاولك أحد خارج فريق المراجعة." },
    ],
  },
  form: {
    title: "سجّل طلب الفحص",
    lead: "بعد التسجيل، أرسل ملف العرض عبر واتساب مع رقمك المرجعي.",
    fields: {
      name: "الاسم الكريم",
      phone: "رقم الجوال (واتساب)",
      phonePlaceholder: "05xxxxxxxx",
      city: "المدينة",
      projectType: "نوع المشروع",
      area: "المساحة التقريبية (م²) — اختياري",
      level: "مستوى التشطيب",
      quotesCount: "عدد العروض",
      signed: "هل وقّعت العقد؟",
      package: "نوع المراجعة",
      notes: "ملاحظات — اختياري",
      notesPlaceholder: "مثال: لديّ عرضان والفارق بينهما كبير، وأرغب في معرفة السبب.",
    },
    options: {
      city: { jeddah: "جدة", makkah: "مكة المكرمة", madinah: "المدينة المنورة", other: "مدينة أخرى" },
      projectType: {
        villa_fitout: "تشطيب فيلا",
        apartment_fitout: "تشطيب شقة",
        renovation: "ترميم وتجديد",
        construction: "بناء (هيكل أو تسليم مفتاح)",
      },
      level: { economy: "اقتصادي", standard: "متوسط", luxury: "فاخر" },
      signed: { no: "لم أوقّع بعد", yes: "نعم، وقّعت" },
      package: { free: "المراجعة السريعة — مجاناً", detailed: `التقرير المفصّل — ${price} ريالاً` },
      quotes: { 1: "عرض واحد", 2: "عرضان", 3: "ثلاثة عروض" } as Record<number, string>,
    },
    submit: "سجّل الطلب",
    submitting: "جارٍ التسجيل…",
    errors: {
      invalid_phone: "يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05.",
      validation: "يرجى استكمال الحقول المطلوبة.",
      server: "تعذّر إرسال الطلب مؤقتاً. يرجى المحاولة مجدداً، أو التواصل معنا عبر واتساب.",
    },
    privacy: "بياناتك وعروضك سرية، ولا تُستخدم إلا لإعداد المراجعة.",
  },
  success: {
    title: "استلمنا طلبك",
    refLabel: "رقمك المرجعي",
    body: "خطوة أخيرة: أرسل صورة العرض أو ملفه عبر واتساب. أعددنا لك الرسالة مع رقمك المرجعي، وما عليك إلا إرفاق الملف.",
    whatsAppCta: "أرسِل العرض عبر واتساب",
    noWhatsApp: "سنتواصل معك خلال ساعات العمل لاستلام العرض.",
    sla: "تبدأ مهلة الـ٤٨ ساعة من لحظة استلام ملف العرض.",
  },
  faq: {
    title: "أسئلة شائعة",
    items: [
      { q: "هل المراجعة السريعة مجانية فعلاً؟", a: "نعم، دون أي التزام. تحصل على أهم خمس ملاحظات وتقييم عام للعرض." },
      { q: "من يراجع العرض؟", a: "فريق رواق الفني المتخصص في التصميم والتنفيذ." },
      { q: "هل ستقترحون عليّ مقاولاً آخر؟", a: "لا، ما لم تطلب ذلك بنفسك. غايتنا أن توقّع وأنت على بيّنة." },
      { q: "وقّعت العقد بالفعل، هل تستطيعون المساعدة؟", a: "نعم. نراجع العقد ونبيّن لك ما يحمي حقك فيه، وما ينقصه، والخطوات المتاحة لك الآن." },
      { q: "هل تضمنون جودة التنفيذ؟", a: "المراجعة رأي فني في العرض المكتوب، وليست ضماناً للتنفيذ. ولمرافقة التنفيذ نفسه صمّمنا خدمة «رواق أمان»." },
    ],
  },
  finalCta: { title: "أمامك عرض سعر؟", button: "افحصه قبل أن توقّع" },
  whatsAppMessage: (o: { referenceCode: string; clientName: string; packageLabel: string; quotesCount: number }) =>
    `السلام عليكم،\n` +
    `سجّلت طلب فحص عرض سعر عبر موقع رواق.\n` +
    `الرقم المرجعي: ${o.referenceCode}\n` +
    `الاسم: ${o.clientName}\n` +
    `الباقة: ${o.packageLabel}\n` +
    `عدد العروض: ${o.quotesCount}\n` +
    `أرفقت لكم ملف العرض.`,
};

const en: typeof ar = {
  metaTitle: "Check your contractor quote before you sign | Ruwaq",
  metaDescription:
    "Send us the fit-out or construction quote you received. Within 48 hours a Ruwaq specialist tells you what's missing, what's vague, and whether the price is reasonable in Jeddah.",
  hero: {
    eyebrow: "Ruwaq · Quote check",
    title: "Before you sign with a contractor, let an expert review the quote.",
    lead: "Send us the quote you received. Within 48 hours we tell you what's missing, what's vague, and whether the price makes sense in Jeddah.",
    primaryCta: "Send your quote — free",
    secondaryCta: "What exactly do we check?",
    trust: ["Confidential review", "We don't sell contractors", "Reply within 48h"],
  },
  problem: {
    title: "Most fit-out problems start in the quote, not on site",
    items: [
      "“Ceramic tiles” with no brand, grade or thickness? That's where material swaps begin.",
      "Much cheaper than the others? Usually missing items that come back later as “extras”.",
      "A large down payment not tied to progress? That's the biggest risk to your money.",
      "No delay penalty, no written warranty, no schedule? Then nothing protects you.",
    ],
    closing: "The quote in your hand is the cheapest moment to catch a problem.",
  },
  checks: {
    title: "6 things we review in every quote",
    items: [
      { title: "Scope", body: "Does the quote cover all the required work? What's missing?" },
      { title: "Specifications", body: "Is every material defined by brand, grade and size?" },
      { title: "Price", body: "Is it within a reasonable range for this finish level in Jeddah?" },
      { title: "Payments", body: "Are payments tied to clear, verifiable milestones?" },
      { title: "Schedule & penalties", body: "Is there a timeline and a delay penalty?" },
      { title: "Warranty & handover", body: "Is there a written warranty and a retention until final handover?" },
    ],
  },
  steps: {
    title: "How it works",
    items: [
      { title: "Register your request", body: "Fill in the form in under a minute and get a reference code." },
      { title: "Send the quote on WhatsApp", body: "A photo or PDF (up to 3 quotes) with your reference code." },
      { title: "Get your report", body: "Within 48 hours on WhatsApp, in plain language, with the questions to ask before signing." },
    ],
  },
  packages: {
    title: "Choose your review",
    free: {
      name: "Quick review",
      price: "Free",
      items: ["Top 5 findings on the quote", "Overall rating: green / amber / red", "Within 48 hours"],
    },
    detailed: {
      name: "Detailed report",
      price: `SAR ${price}`,
      badge: "Most useful",
      items: [
        "Full report of missing items and vague specs",
        "Price compared with the Jeddah market range",
        "Review of payments, schedule, penalties and warranty",
        "Compare up to 3 quotes in one report",
        "Ready questions for the contractor + 15-min call",
      ],
    },
    note: "Payment for the detailed report is arranged after confirmation on WhatsApp, and credited if you continue with a Ruwaq Project File.",
  },
  why: {
    title: "We're on your side",
    items: [
      { title: "We don't sell contractors", body: "The review isn't influenced by any contractor, and no party pays us a commission for it." },
      { title: "Saudi market experience", body: "A team with 15 years in architectural design and execution in the Kingdom, who know where quotes hide their gaps." },
      { title: "Fully confidential", body: "We never share your quote or your contractor's name." },
    ],
  },
  form: {
    title: "Register a quote check",
    lead: "After registering, send the quote file on WhatsApp with your reference code.",
    fields: {
      name: "Name",
      phone: "Mobile (WhatsApp)",
      phonePlaceholder: "05xxxxxxxx",
      city: "City",
      projectType: "Project type",
      area: "Approximate area (m²) — optional",
      level: "Finish level",
      quotesCount: "How many quotes?",
      signed: "Have you signed already?",
      package: "Review type",
      notes: "Notes (optional)",
      notesPlaceholder: "e.g. I have two quotes with a big price gap and want to know why.",
    },
    options: {
      city: { jeddah: "Jeddah", makkah: "Makkah", madinah: "Madinah", other: "Other city" },
      projectType: {
        villa_fitout: "Villa fit-out",
        apartment_fitout: "Apartment fit-out",
        renovation: "Renovation",
        construction: "Construction (shell or turnkey)",
      },
      level: { economy: "Economy", standard: "Standard", luxury: "Luxury" },
      signed: { no: "Not yet", yes: "Yes, signed" },
      package: { free: "Quick review (free)", detailed: `Detailed report (SAR ${price})` },
      quotes: { 1: "One quote", 2: "Two quotes", 3: "3 quotes" },
    },
    submit: "Register request",
    submitting: "Submitting…",
    errors: {
      invalid_phone: "Invalid mobile number. Use a Saudi number starting with 05.",
      validation: "Please complete the required fields.",
      server: "Temporary error. Please try again or reach us on WhatsApp.",
    },
    privacy: "Your details and quotes are confidential and used only for the review.",
  },
  success: {
    title: "Request registered ✓",
    refLabel: "Your reference",
    body: "Last step: send a photo or PDF of the quote on WhatsApp. The message is ready with your reference — just attach the file.",
    whatsAppCta: "Send the quote on WhatsApp",
    noWhatsApp: "We'll contact you during working hours to receive the quote.",
    sla: "The 48-hour window starts once we receive the quote file.",
  },
  faq: {
    title: "FAQ",
    items: [
      { q: "Is the quick review really free?", a: "Yes. You get the top 5 findings and an overall rating, with no obligation." },
      { q: "Who reviews the quote?", a: "Ruwaq's technical team, specialised in design and execution, line by line." },
      { q: "Will you push a contractor on me?", a: "No, unless you ask. The goal is that you sign with full understanding." },
      { q: "I already signed — can you help?", a: "Yes. We review the contract, tell you what protects you and what's missing, and what you can do now." },
      { q: "Do you guarantee execution quality?", a: "The review is a technical opinion on the written quote and is not a guarantee of execution or an obligation to any party." },
    ],
  },
  finalCta: { title: "Got a quote on the table?", button: "Check it before you sign" },
  whatsAppMessage: (o) =>
    `Hi Ruwaq,\n` +
    `I registered a quote check (ref: ${o.referenceCode}).\n` +
    `Name: ${o.clientName}\n` +
    `Package: ${o.packageLabel}\n` +
    `Quotes: ${o.quotesCount}\n` +
    `Attaching the quote file 👇`,
};

export type QuoteCheckCopy = typeof ar;

export function getQuoteCheckCopy(locale: Locale): QuoteCheckCopy {
  return locale === "en" ? en : ar;
}
