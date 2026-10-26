/**
 * Home page copy (v4). One idea, understood at first glance:
 * send the contractor's quote, get it back reviewed for the owner within 48 hours.
 * Commercial review only — no technical inspection, no engineering judgement.
 */

type Locale = "ar" | "en";

type SheetRow = { item: string; qty: string; price: string; note?: string; flag?: "spec" | "missing" | "terms" };

const ar = {
  title: "قبل أن توقّع عقد التشطيب، اعرف ما ينقص عرض المقاول.",
  lead: "أرسل إلينا عرض السعر الذي بين يديك، ونعيده إليك خلال ٤٨ ساعة وعليه البنود الغائبة، وما يحتاج توضيحاً مكتوباً، وما يستحق التفاوض. رواق يعمل لصالح المالك وحده.",
  primaryCta: "أرسل عرض السعر مجاناً",
  secondaryCta: "شاهد نموذج تقرير",
  facts: [
    { value: "٤٨ ساعة", label: "للمراجعة المجانية" },
    { value: "٢٩٩ ريالاً", label: "للتقرير المفصّل" },
    { value: "مستقل", label: "لا يشتري أي مقاول ترشيحاً منا" },
  ],
  sheet: {
    title: "عرض سعر: تشطيب فيلا",
    meta: "شمال جدة، ٣٢٠ م²",
    cols: { item: "البند", qty: "الكمية", price: "ريال" },
    rows: [
      { item: "بلاط أرضيات سيراميك", qty: "٣٢٠ م²", price: "٣٨٬٤٠٠", note: "اطلب العلامة التجارية والمقاس والدرجة كتابةً.", flag: "spec" },
      { item: "دهانات داخلية", qty: "٨٥٠ م²", price: "٢١٬٢٥٠", note: "عدد الأوجه والماركة غير مذكورين.", flag: "spec" },
      { item: "أعمال الجبس والإنارة", qty: "مقطوعية", price: "٤٦٬٠٠٠" },
      { item: "أدوات صحية", qty: "٦ حمامات", price: "٣٣٬٠٠٠" },
      { item: "العزل المائي للحمامات", qty: "", price: "", note: "غير مذكور في العرض، وغالباً يُطلب لاحقاً كعمل إضافي.", flag: "missing" },
    ] as SheetRow[],
    payment: { label: "الدفعة المقدّمة", value: "٥٠٪ عند التوقيع", note: "تفاوض على ربطها بتوريد المواد.", flag: "terms" as const },
    by: "ملاحظات رواق",
    summary: "٤ ملاحظات قبل التوقيع",
  },
  stepsTitle: "كيف تعمل المراجعة",
  steps: [
    { title: "أرسل العرض", body: "صورة أو ملف PDF، عبر الموقع أو واتساب. لا تحتاج إلى حساب." },
    { title: "نراجعه خلال ٤٨ ساعة", body: "نقرأ كل بند، ونقارنه بنطاق مشروعك وبالأسعار المتداولة في السوق." },
    { title: "توقّع وأنت تعرف", body: "تصلك قائمة واضحة بما تطلبه من المقاول قبل التوقيع، والقرار لك وحدك." },
  ],
  findTitle: "ما الذي نجده عادةً في عروض التشطيب",
  find: [
    { title: "بنود غائبة", body: "سعر مغرٍ في البداية، ثم «أعمال إضافية» لم تكن في الحسبان." },
    { title: "مواصفات فضفاضة", body: "«بلاط درجة أولى» بلا علامة ولا مقاس، فيُركَّب الأرخص دون مخالفة للعقد." },
    { title: "دفعة مقدّمة كبيرة", body: "مبلغ يُدفع قبل أن يُنجَز شيء، دون ربطه بمرحلة أو بتوريد." },
    { title: "ضمان غير مكتوب", body: "وعد شفهي لا يُلزم أحداً حين يظهر العيب بعد السكن." },
  ],
  findCta: "شاهد نموذج تقرير كاملاً",
  servicesTitle: "ابدأ من حيث تقف اليوم",
  services: [
    { title: "مراجعة عرض السعر", when: "لديك عرض وتوشك أن توقّع", price: "مجاناً، أو ٢٩٩ ريالاً للتقرير المفصّل", href: "/check", cta: "أرسل عرضك" },
    { title: "ملف المشروع", when: "تريد ثلاثة عروض قابلة للمقارنة", price: "عرض سعر خلال يوم عمل", href: "/project-file", cta: "اطلب ملف مشروعك" },
    { title: "الحاسبة التقديرية", when: "تريد رقماً مبدئياً قبل أي عرض", price: "مجانية", href: "/estimate", cta: "احسب تكلفة مشروعك" },
  ],
  independenceTitle: "لا يستطيع أي مقاول أن يشتري ترشيحاً من رواق.",
  independenceBody: "أتعابنا يدفعها المالك، ونعلنها قبل أن نبدأ. وأي مبلغ يدفعه مقاول لرواق ثابت وموحّد ومعلن، ولا يغيّر ما نكتبه في تقريرك.",
  independenceLink: "اقرأ ميثاق الاستقلال",
  guidesTitle: "اقرأ قبل أن توقّع",
  guidesAll: "جميع الأدلة",
  contractorsText: "مقاول تعتزّ بعملك وتريد عملاء جادّين؟",
  contractorsCta: "انضم إلى شبكة رواق",
};

const en: typeof ar = {
  title: "Before you sign a fit-out contract, know what the quote leaves out.",
  lead: "Send us the quote you have. Within 48 hours we return it marked with the missing items, what needs written clarification, and what is worth negotiating. Ruwaq works for the owner only.",
  primaryCta: "Send your quote free",
  secondaryCta: "See a sample report",
  facts: [
    { value: "48 hours", label: "for the free review" },
    { value: "SAR 299", label: "for the detailed report" },
    { value: "Independent", label: "no contractor can buy a recommendation" },
  ],
  sheet: {
    title: "Quote: villa fit-out",
    meta: "North Jeddah, 320 m²",
    cols: { item: "Item", qty: "Qty", price: "SAR" },
    rows: [
      { item: "Ceramic floor tiles", qty: "320 m²", price: "38,400", note: "Ask for brand, size and grade in writing.", flag: "spec" },
      { item: "Interior paint", qty: "850 m²", price: "21,250", note: "Number of coats and brand not stated.", flag: "spec" },
      { item: "Gypsum and lighting", qty: "Lump sum", price: "46,000" },
      { item: "Sanitary ware", qty: "6 baths", price: "33,000" },
      { item: "Bathroom waterproofing", qty: "", price: "", note: "Missing from the quote; usually billed later as extra work.", flag: "missing" },
    ],
    payment: { label: "Advance payment", value: "50% on signing", note: "Negotiate tying it to material delivery.", flag: "terms" },
    by: "Ruwaq notes",
    summary: "4 notes before signing",
  },
  stepsTitle: "How the review works",
  steps: [
    { title: "Send the quote", body: "A photo or PDF, through the site or WhatsApp. No account needed." },
    { title: "We review it in 48 hours", body: "We read every line and compare it with your scope and current market prices." },
    { title: "Sign knowing what you sign", body: "You get a clear list of what to ask the contractor before signing. The decision stays yours." },
  ],
  findTitle: "What we usually find in fit-out quotes",
  find: [
    { title: "Missing items", body: "An attractive price at first, then “extra work” nobody planned for." },
    { title: "Loose specifications", body: "“First-grade tiles” with no brand or size, so the cheapest goes in without breaching the contract." },
    { title: "A large advance", body: "Money paid before anything is done, tied to no stage or delivery." },
    { title: "Unwritten warranty", body: "A verbal promise binds no one when a defect appears after you move in." },
  ],
  findCta: "See a full sample report",
  servicesTitle: "Start where you are today",
  services: [
    { title: "Quote review", when: "You have a quote and are about to sign", price: "Free, or SAR 299 for the detailed report", href: "/check", cta: "Send your quote" },
    { title: "Project File", when: "You want three comparable quotes", price: "Price within one working day", href: "/project-file", cta: "Request your Project File" },
    { title: "Cost estimator", when: "You want a first number before any quote", price: "Free", href: "/estimate", cta: "Estimate your project" },
  ],
  independenceTitle: "No contractor can buy a recommendation from Ruwaq.",
  independenceBody: "The owner pays our fees, stated before we start. Anything a contractor pays Ruwaq is fixed, equal and published, and it never changes what we write in your report.",
  independenceLink: "Read the independence charter",
  guidesTitle: "Read before you sign",
  guidesAll: "All guides",
  contractorsText: "A contractor proud of your work, looking for serious clients?",
  contractorsCta: "Join the Ruwaq network",
};

export function getHomeCopy(locale: Locale | string) {
  return locale === "en" ? en : ar;
}
