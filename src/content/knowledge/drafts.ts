/**
 * DRAFTS for the owner's review (2026-11-12). Shown only in development and in the private preview.
 * Definitions are written by Ruwaq in plain words; they are general explanations, not regulatory text.
 * Regulatory terms cite the Real Estate General Authority's own pages and describe, not interpret, the rules.
 */
const D = "2026-11-12";
const t = (o: Record<string, unknown>) => ({ draft: true, publishedAt: D, reviewedAt: D, ...o });
/** Next batch of terms for review. Move each to a published file after the owner approves it. */
export const DRAFT_TERMS: unknown[] = [];

export const DRAFT_STYLES: unknown[] = [
  {
    draft: true, publishedAt: D, reviewedAt: D,
    slug: "makkah-architecture",
    name: { ar: "عمارة مكة المكرمة والمشاعر المقدسة", en: "Makkah and Holy Sites architecture" },
    region: { ar: "مكة المكرمة والمشاعر المقدسة", en: "Makkah and the Holy Sites" },
    summary: {
      ar: "موجهات تصميم أطلقتها الهيئة الملكية لمدينة مكة المكرمة والمشاعر المقدسة في مايو 2025، ضمن مبادرة العمارة السعودية. وهي موجهات خاصة بمكة، وليست أحد الطرز الـ19 في خريطة العمارة السعودية.",
    },
    characteristics: [
      { ar: "تستمد عناصرها من ثلاثة مصادر: التوسعة السعودية الثانية للمسجد الحرام بوصفها المصدر المحوري، والمناظر الطبيعية، والعمارة التقليدية." },
      { ar: "تقوم على ستة محاور للتصميم: الوحدانية، والحرم، والخشوع، والحركة، والطبيعة، والتجريد." },
    ],
    materials: [{ ar: "مواد محلية تعكس البيئة الطبيعية لمكة المكرمة، مع بدائل بناء متعددة تحقق الانسجام العمراني." }],
    applyInYourProject: {
      ar: "قبل تصميم واجهة مشروع في مكة، يُراجع المصمم الموجهات الرسمية ويختبر الواجهة بصور واقعية من زوايا الشارع، ليتأكد أن الكتل والمواد تنسجم مع المحاور الستة قبل التنفيذ.",
    },
    unclear: [
      { ar: "لم نطّلع بعد على وثيقة الموجهات الرسمية نفسها؛ هذه الصفحة مبنية على خبر صحفي." },
      { ar: "الألوان المعتمدة ونطاق الإلزام (أي المشاريع تشملها) غير مذكورة في المصدر." },
    ],
    sources: [
      { label: "السعودية تطلق «عمارة مكة» و«المشاعر المقدسة» لتعزيز جودة الحياة", publisher: "الشرق الأوسط", url: "https://aawsat.com/node/5139317", publishedAt: "2025-05-04", accessedAt: D },
    ],
  },
];
