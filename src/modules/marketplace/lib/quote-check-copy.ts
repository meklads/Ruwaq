import { QUOTE_CHECK_DETAILED_PRICE_SAR } from "@/modules/marketplace/lib/quote-check";

type Locale = "ar" | "en";

const price = QUOTE_CHECK_DETAILED_PRICE_SAR;

const ar = {
  metaTitle: "افحص عرض سعر المقاول قبل التوقيع | رواق",
  metaDescription:
    "أرسل عرض سعر التشطيب أو البناء اللي وصلك، ومهندس من رواق يقول لك خلال 48 ساعة: وش الناقص، وش المبهم، وهل السعر منطقي في جدة.",
  hero: {
    eyebrow: "رواق · خدمة فحص العروض",
    title: "قبل ما توقّع مع المقاول… خلّ مهندس يراجع عرضه.",
    lead: "أرسل لنا عرض السعر اللي وصلك، ونقول لك خلال 48 ساعة: وش الناقص فيه، وش المبهم، وهل السعر منطقي في جدة.",
    primaryCta: "أرسل عرضك الآن — مجاناً",
    secondaryCta: "وش نفحص بالضبط؟",
    trust: ["مراجعة سرية", "ما نبيع لك مقاول", "رد خلال 48 ساعة"],
  },
  problem: {
    title: "أغلب مشاكل التشطيب تبدأ من عرض السعر… مو من التنفيذ",
    items: [
      "«بلاط سيراميك» بدون ماركة ولا درجة ولا سماكة؟ هنا يبدأ تبديل المواد.",
      "سعر أقل بكثير من غيره؟ غالباً فيه بنود ناقصة تطلع لك لاحقاً كـ«أعمال إضافية».",
      "دفعة مقدمة كبيرة بدون ربطها بإنجاز؟ هذي أكبر مخاطرة على فلوسك.",
      "بدون غرامة تأخير، بدون ضمان مكتوب، بدون مواعيد؟ يعني ما في شي يحميك.",
    ],
    closing: "العرض اللي بين يدك هو أرخص وقت تكتشف فيه المشكلة.",
  },
  checks: {
    title: "6 أشياء نراجعها في كل عرض",
    items: [
      { title: "البنود", body: "هل العرض شامل كل الأعمال المطلوبة؟ وش الناقص؟" },
      { title: "المواصفات", body: "هل كل مادة محددة بالماركة والدرجة والمقاس؟" },
      { title: "السعر", body: "هل هو داخل النطاق المنطقي لمستوى التشطيب في جدة؟" },
      { title: "الدفعات", body: "هل الدفعات مربوطة بمراحل إنجاز واضحة؟" },
      { title: "المدة والغرامات", body: "هل في جدول زمني وغرامة تأخير؟" },
      { title: "الضمان والاستلام", body: "هل في ضمان مكتوب ومبلغ محتجز حتى الاستلام النهائي؟" },
    ],
  },
  steps: {
    title: "كيف تعمل الخدمة",
    items: [
      { title: "سجّل طلبك", body: "عبّئ النموذج في أقل من دقيقة، وتحصل على رقم مرجعي." },
      { title: "أرسل العرض على واتساب", body: "صورة أو PDF للعرض (حتى 3 عروض) مع الرقم المرجعي." },
      { title: "يوصلك التقرير", body: "خلال 48 ساعة على واتساب، بلغة واضحة، مع الأسئلة اللي لازم تسألها للمقاول قبل التوقيع." },
    ],
  },
  packages: {
    title: "اختر نوع المراجعة",
    free: {
      name: "المراجعة السريعة",
      price: "مجاناً",
      items: ["أهم 5 ملاحظات على العرض", "تقييم عام: أخضر / أصفر / أحمر", "خلال 48 ساعة"],
    },
    detailed: {
      name: "التقرير المفصّل",
      price: `${price} ريال`,
      badge: "الأكثر فائدة",
      items: [
        "تقرير كامل بالبنود الناقصة والمواصفات المبهمة",
        "مقارنة السعر بنطاق السوق في جدة",
        "مراجعة الدفعات والمدة والغرامات والضمان",
        "مقارنة حتى 3 عروض في تقرير واحد",
        "أسئلة جاهزة للمقاول + مكالمة 15 دقيقة",
      ],
    },
    note: "الدفع للتقرير المفصّل بعد تأكيد الطلب على واتساب. وإذا كمّلت مع رواق في «ملف المشروع» نخصم قيمته.",
  },
  why: {
    title: "إحنا في صفّك أنت",
    items: [
      { title: "ما نبيع مقاولين", body: "المراجعة ما تتأثر بأي مقاول، وما نأخذ عمولة من أي طرف على هذي الخدمة." },
      { title: "خبرة في السوق السعودي", body: "رواق جزء من مجموعة تسامي، بخبرة تتجاوز 15 عاماً في التصميم والتنفيذ المعماري بالمملكة." },
      { title: "سرية تامة", body: "ما نشارك عرضك ولا اسم مقاولك مع أي طرف." },
    ],
  },
  form: {
    title: "سجّل طلب الفحص",
    lead: "بعد التسجيل، ترسل ملف العرض على واتساب مع الرقم المرجعي.",
    fields: {
      name: "الاسم",
      phone: "رقم الجوال (واتساب)",
      phonePlaceholder: "05xxxxxxxx",
      city: "المدينة",
      projectType: "نوع المشروع",
      area: "المساحة التقريبية (م²) — اختياري",
      level: "مستوى التشطيب المطلوب",
      quotesCount: "كم عرض تبغى نراجع؟",
      signed: "هل وقّعت مع المقاول؟",
      package: "نوع المراجعة",
      notes: "ملاحظات (اختياري)",
      notesPlaceholder: "مثال: عندي عرضين والفرق بينهم كبير، أبغى أعرف السبب.",
    },
    options: {
      city: { jeddah: "جدة", makkah: "مكة المكرمة", madinah: "المدينة المنورة", other: "مدينة أخرى" },
      projectType: {
        villa_fitout: "تشطيب فيلا",
        apartment_fitout: "تشطيب شقة",
        renovation: "ترميم / تجديد",
        construction: "بناء (عظم أو تسليم مفتاح)",
      },
      level: { economy: "اقتصادي", standard: "متوسط", luxury: "فاخر" },
      signed: { no: "لا، لسه", yes: "نعم، وقّعت" },
      package: { free: "المراجعة السريعة (مجاناً)", detailed: `التقرير المفصّل (${price} ريال)` },
      quotes: { 1: "عرض واحد", 2: "عرضين", 3: "3 عروض" } as Record<number, string>,
    },
    submit: "سجّل الطلب",
    submitting: "جاري التسجيل…",
    errors: {
      invalid_phone: "رقم الجوال غير صحيح. اكتب رقماً سعودياً يبدأ بـ 05.",
      validation: "تأكد من تعبئة الحقول المطلوبة.",
      server: "صار خطأ مؤقت. حاول مرة ثانية أو تواصل معنا على واتساب.",
    },
    privacy: "بياناتك وعروضك سرية، ونستخدمها فقط لإعداد المراجعة.",
  },
  success: {
    title: "تم تسجيل طلبك ✓",
    refLabel: "رقمك المرجعي",
    body: "الخطوة الأخيرة: أرسل صورة أو PDF لعرض السعر على واتساب. الرسالة جاهزة فيها رقمك المرجعي — بس أرفق الملف.",
    whatsAppCta: "أرسل العرض على واتساب",
    noWhatsApp: "بنتواصل معك على رقمك خلال ساعات العمل لاستلام العرض.",
    sla: "مهلة الـ48 ساعة تبدأ من استلام ملف العرض.",
  },
  faq: {
    title: "أسئلة شائعة",
    items: [
      { q: "هل المراجعة المجانية فعلاً مجانية؟", a: "نعم. تحصل على أهم 5 ملاحظات وتقييم عام، بدون أي التزام." },
      { q: "مين يراجع العرض؟", a: "يراجعه فريق رواق الفني المتخصص في التصميم والتنفيذ، بندًا بندًا." },
      { q: "هل بترشحون لي مقاول؟", a: "لا، إلا إذا طلبت ذلك. هدف الخدمة إنك توقّع وأنت فاهم." },
      { q: "وقّعت خلاص، تقدرون تساعدوني؟", a: "نعم، نراجع العقد ونقول لك وش اللي يحميك فيه ووش اللي ناقص، والخطوات اللي تقدر تسويها الآن." },
      { q: "هل تضمنون جودة التنفيذ؟", a: "المراجعة رأي فني على العرض المكتوب، وما تُعد ضماناً للتنفيذ أو التزاماً تجاه أي طرف." },
    ],
  },
  finalCta: { title: "عندك عرض سعر على الطاولة؟", button: "افحصه قبل ما توقّع" },
  whatsAppMessage: (o: { referenceCode: string; clientName: string; packageLabel: string; quotesCount: number }) =>
    `مرحباً رواق،\n` +
    `سجّلت طلب فحص عرض سعر (مرجع: ${o.referenceCode}).\n` +
    `الاسم: ${o.clientName}\n` +
    `الباقة: ${o.packageLabel}\n` +
    `عدد العروض: ${o.quotesCount}\n` +
    `أرفقت لكم ملف العرض 👇`,
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
      { title: "Saudi market experience", body: "Ruwaq is part of Tasami Group, with 15+ years in architectural design and execution in the Kingdom." },
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
