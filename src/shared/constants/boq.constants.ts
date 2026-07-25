import type { BoqCategory, ProjectArchetype } from "@/shared/types/trust-layer.types";

/** Strict Smart BOQ bounds — enforced in service layer */
export const BOQ_MIN_LINES = 8;
export const BOQ_MAX_LINES = 15;

export const BOQ_SUM_TOLERANCE = 0.01;

export type BoqTemplateLine = {
  category: BoqCategory;
  weight: number;
  labelAr: string;
  labelEn: string;
};

/** Functional breakdown weights per archetype (must sum to 1.0) */
export const BOQ_WEIGHT_TEMPLATES: Record<
  ProjectArchetype,
  readonly BoqTemplateLine[]
> = {
  fit_out: [
    {
      category: "phase",
      weight: 0.08,
      labelAr: "تجهيز الموقع والحماية",
      labelEn: "Site prep & protection",
    },
    {
      category: "phase",
      weight: 0.07,
      labelAr: "أعمال الهدم والإزالة",
      labelEn: "Demolition & removal",
    },
    {
      category: "materials",
      weight: 0.12,
      labelAr: "مواد الأعمال المدنية",
      labelEn: "Civil works materials",
    },
    {
      category: "materials",
      weight: 0.18,
      labelAr: "مواد MEP — التأسيس",
      labelEn: "MEP rough-in materials",
    },
    {
      category: "materials",
      weight: 0.12,
      labelAr: "تجهيزات وتركيبات MEP",
      labelEn: "MEP fixtures & fittings",
    },
    {
      category: "materials",
      weight: 0.22,
      labelAr: "مواد التشطيبات",
      labelEn: "Finishing materials",
    },
    {
      category: "labor",
      weight: 0.15,
      labelAr: "أيدي عاملة التشطيب",
      labelEn: "Finishing labor",
    },
    {
      category: "management",
      weight: 0.06,
      labelAr: "إدارة المشروع والإشراف",
      labelEn: "Project management",
    },
  ],
  supervision: [
    {
      category: "management",
      weight: 0.15,
      labelAr: "مراجعة المخططات والمواصفات",
      labelEn: "Drawing & spec review",
    },
    {
      category: "management",
      weight: 0.2,
      labelAr: "زيارات موقع دورية",
      labelEn: "Periodic site visits",
    },
    {
      category: "management",
      weight: 0.12,
      labelAr: "تقارير الجودة وعدم المطابقة",
      labelEn: "QA/QC & NCR reports",
    },
    {
      category: "management",
      weight: 0.1,
      labelAr: "إدارة RFIs والاستفسارات",
      labelEn: "RFI management",
    },
    {
      category: "management",
      weight: 0.08,
      labelAr: "اجتماعات تقدم المشروع",
      labelEn: "Progress meetings",
    },
    {
      category: "management",
      weight: 0.12,
      labelAr: "الفحص النهائي والاستلام",
      labelEn: "Final inspection & handover",
    },
    {
      category: "management",
      weight: 0.1,
      labelAr: "مستندات As-Built",
      labelEn: "As-built documentation",
    },
    {
      category: "management",
      weight: 0.13,
      labelAr: "تنسيق المقاولين والجهات",
      labelEn: "Contractor & authority coordination",
    },
  ],
  maintenance: [
    {
      category: "labor",
      weight: 0.2,
      labelAr: "زيارات صيانة وقائية",
      labelEn: "Preventive maintenance visits",
    },
    {
      category: "labor",
      weight: 0.18,
      labelAr: "استجابة طوارئ",
      labelEn: "Emergency response",
    },
    {
      category: "materials",
      weight: 0.15,
      labelAr: "مخصص قطع الغيار",
      labelEn: "Spare parts allowance",
    },
    {
      category: "labor",
      weight: 0.12,
      labelAr: "عمالة فنية",
      labelEn: "Technical labor",
    },
    {
      category: "equipment",
      weight: 0.1,
      labelAr: "معايرة المعدات",
      labelEn: "Equipment calibration",
    },
    {
      category: "management",
      weight: 0.08,
      labelAr: "تقارير وتوثيق",
      labelEn: "Reporting & documentation",
    },
    {
      category: "management",
      weight: 0.07,
      labelAr: "إدارة العقد",
      labelEn: "Contract administration",
    },
    {
      category: "materials",
      weight: 0.1,
      labelAr: "مواد استهلاكية",
      labelEn: "Consumables",
    },
  ],
  other: [
    {
      category: "phase",
      weight: 0.2,
      labelAr: "مرحلة التأسيس",
      labelEn: "Mobilization phase",
    },
    {
      category: "materials",
      weight: 0.25,
      labelAr: "مواد وتوريد",
      labelEn: "Materials & supply",
    },
    {
      category: "labor",
      weight: 0.25,
      labelAr: "عمالة وتنفيذ",
      labelEn: "Labor & execution",
    },
    {
      category: "equipment",
      weight: 0.1,
      labelAr: "معدات وأدوات",
      labelEn: "Equipment & tools",
    },
    {
      category: "management",
      weight: 0.1,
      labelAr: "إدارة وتنسيق",
      labelEn: "Management & coordination",
    },
    {
      category: "phase",
      weight: 0.05,
      labelAr: "اختبار وتسليم",
      labelEn: "Testing & handover",
    },
    {
      category: "other",
      weight: 0.03,
      labelAr: "بنود متنوعة",
      labelEn: "Miscellaneous",
    },
    {
      category: "other",
      weight: 0.02,
      labelAr: "احتياطي",
      labelEn: "Contingency",
    },
  ],
};
