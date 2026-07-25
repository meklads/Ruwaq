/**
 * Turriva Trust Layer v1 — Pre-vetted clause library (Arabic primary).
 * AI may select/fill placeholders only — never draft legal text.
 */

import {
  PLACEHOLDER_DEFAULTS,
  type PlaceholderKey,
} from "./clause-placeholder-defaults";

export { PLACEHOLDER_DEFAULTS };

export type PlaceholderDef = { key: string; default: string };

export type ClauseSeed = {
  clauseKey: string;
  category:
    | "materials"
    | "permits"
    | "payment"
    | "warranty"
    | "scope_change"
    | "delay"
    | "vat"
    | "compliance"
    | "escalation"
    | "soil"
    | "other";
  riskSide: "protects_contractor" | "balanced";
  textAr: string;
  textEn: string;
  placeholders: PlaceholderDef[];
  sortOrder: number;
  isMandatory: boolean;
  alternativeGroup?: string;
  autoTriggerRules?: { minDurationDays?: number };
  sourceRef?: string;
};

/** Approved defaults — re-exported from shared constants (single source of truth) */

function ph(...keys: string[]): PlaceholderDef[] {
  return keys.map((key) => ({
    key,
    default: PLACEHOLDER_DEFAULTS[key as PlaceholderKey] ?? "",
  }));
}

export type PackSeed = {
  slug: string;
  nameAr: string;
  nameEn: string;
  archetype: "fit_out" | "supervision" | "maintenance";
  version: string;
  clauses: ClauseSeed[];
};

// ---------------------------------------------------------------------------
// Shared cross-pack clauses (duplicated per pack with pack-specific keys)
// ---------------------------------------------------------------------------

const sbcResidentialCompliance = (
  prefix: string,
  sortOrder: number
): ClauseSeed => ({
  clauseKey: `${prefix}-SBC-1101-RESIDENTIAL`,
  category: "compliance",
  riskSide: "protects_contractor",
  textAr: `يلتزم الطرف الثاني (العميل) بأن جميع الأعمال والتعديلات الإنشائية أو المعمارية ضمن نطاق هذا العرض تتوافق مع متطلبات كود البناء السعودي (SBC) ومنها SBC 1101 للمباني السكنية، بما في ذلك متطلبات السلامة الإنشائية، والعزل، والتهوية، ومقاومة الحريق، والارتفاعات، والمساحات الدنيا للغرف. لا يتحمل الطرف الأول (المقاول/مقدم الخدمة) أي مسؤولية عن مخالفات ناتجة عن طلبات العميل التي تخرق أحكام الكود، ويحق للطرف الأول إيقاف العمل مؤقتاً حتى اعتماد تصحيح هندسي معتمد أو موافقة رسمية من الجهة المختصة.`,
  textEn: `The Client shall ensure that all works and structural or architectural modifications within this proposal comply with Saudi Building Code (SBC) requirements, including SBC 1101 for residential buildings (structural safety, insulation, ventilation, fire resistance, heights, and minimum room areas). The Contractor shall not be liable for violations arising from Client requests that breach the Code and may suspend works until an approved engineering correction or official authority approval is obtained.`,
  placeholders: [],
  sortOrder,
  isMandatory: true,
  sourceRef: "SBC 1101 — Residential Buildings",
});

const baladyPermitsLiability = (
  prefix: string,
  sortOrder: number
): ClauseSeed => ({
  clauseKey: `${prefix}-BALADY-PERMITS`,
  category: "permits",
  riskSide: "protects_contractor",
  textAr: `الحصول على جميع التراخيص والتصاريح البلدية (بلدي) اللازمة للتنفيذ — بما في ذلك رخصة البناء أو الترميم، وتصاريح الحفر، وتصاريح النقل، وتصاريح العمل خارج أوقات الدوام إن لزم — يقع على عاتق الطرف الثاني (العميل) ما لم يُنص صراحة في هذا العرض على تولي الطرف الأول استخراجها مقابل أتعاب إضافية مكتوبة. يلتزم العميل بتزويد المقاول بنسخ معتمدة من التراخيص قبل بدء أي أعمال ميدانية. أي تأخير أو رفض أو إيقاف من البلدية بسبب نقص مستندات العميل أو مخالفة اشتراطات البلدية لا يُعد تأخيراً من قبل المقاول ولا يستحق غرامات تأخير عليه.`,
  textEn: `Obtaining all required municipal (Balady) permits — including building/renovation licenses, excavation, transport, and after-hours work permits where applicable — is the Client's responsibility unless this proposal explicitly states the Contractor will obtain them for a separately stated fee. The Client shall provide approved permit copies before site works begin. Any Balady delay, rejection, or stoppage due to missing Client documents or municipal non-compliance shall not be deemed Contractor delay and shall not incur delay penalties against the Contractor.`,
  placeholders: [],
  sortOrder,
  isMandatory: true,
  sourceRef: "Balady — Municipal Permits & Licensing",
});

const baladyDebrisDelay = (prefix: string, sortOrder: number): ClauseSeed => ({
  clauseKey: `${prefix}-BALADY-DEBRIS-DELAY`,
  category: "permits",
  riskSide: "protects_contractor",
  textAr: `إزالة مخلفات البناء والهدم ونقلها إلى مواقع التخلص المعتمدة من البلدية تقع على عاتق الطرف الثاني (العميل) ما لم يُدرج بند صريح ضمن نطاق هذا العرض. أي تأخير ناتج عن عدم توفر حاويات مخلفات، أو رفض موقع التخلص، أو إيقاف البلدية لعمليات النقل، أو غرامات بلدية على الموقع — يُعد خارج مسؤولية الطرف الأول ويُمدَّد جدول التنفيذ بمدة التأخير الفعلية دون غرامات على المقاول. يلتزم العميل بسداد أي رسوم بلدية أو غرامات مباشرة أو استردادها للمقاول خلال {debris_fee_days} أيام عمل من تاريخ الفاتورة.`,
  textEn: `Removal and lawful disposal of construction/demolition debris to Balady-approved sites is the Client's responsibility unless explicitly included in scope. Delays caused by unavailable skip containers, rejected disposal sites, municipal transport bans, or on-site municipal fines are outside the Contractor's responsibility and extend the schedule without Contractor delay penalties. The Client shall pay or reimburse any direct municipal fees or fines within {debris_fee_days} business days of invoice.`,
  placeholders: ph("debris_fee_days"),
  sortOrder,
  isMandatory: false,
  sourceRef: "Balady — Waste Management & Site Compliance",
});

const hiddenSoilRock = (prefix: string, sortOrder: number): ClauseSeed => ({
  clauseKey: `${prefix}-SOIL-ROCK-EXCLUSION`,
  category: "soil",
  riskSide: "protects_contractor",
  textAr: `لا يشمل هذا العرض أي أعمال إضافية ناتجة عن ظروف التربة أو الصخور المخفية (بما في ذلك التربة الصخرية، أو الصخور، أو المياه الجوفية، أو التربة غير المستقرة، أو أي عوائق تحت الأرض) التي لا يمكن كشفها إلا بعد بدء الحفر أو الكشف الميداني. عند اكتشاف أي من هذه الظروف، يتوقف العمل فوراً ويُعد أمر تغيير (Variation Order) مكتوب بأسعار منفصلة بعد معاينة مشتركة، ولا يُلزم الطرف الأول باستكمال الأعمال إلا بعد موافقة العميل الخطية على التكلفة والمدة الإضافية.`,
  textEn: `This proposal excludes additional works arising from hidden ground conditions (including rock, boulders, groundwater, unstable soil, or subsurface obstructions) not detectable before excavation or field exposure. Upon discovery, works shall stop immediately and a written Variation Order with separate pricing shall be issued after joint inspection. The Contractor is not obliged to continue until the Client provides written approval of additional cost and time.`,
  placeholders: [],
  sortOrder,
  isMandatory: true,
  sourceRef: "Saudi FIDIC practice — Unforeseen Ground Conditions",
});

const priceEscalation = (prefix: string, sortOrder: number): ClauseSeed => ({
  clauseKey: `${prefix}-PRICE-ESCALATION`,
  category: "escalation",
  riskSide: "protects_contractor",
  textAr: `نظراً لامتداد مدة المشروع ({project_duration_days} يوماً) وتذبذب أسعار مواد البناء (حديد، أسمنت، خشب، تشطيبات، وغيرها) في السوق السعودي، يُفعَّل شرط تذبذب الأسعار: إذا ارتفع مؤشر أسعار المواد الأساسية بنسبة تتجاوز {escalation_threshold_percent}% خلال فترة التنفيذ — وفقاً لبيانات الهيئة العامة للإحصاء أو فواتير الموردين المعتمدة — يحق للطرف الأول تعديل قيمة البنود المتأثرة بما يعادل الزيادة الفعلية في تكلفة التوريد، بعد إشعار خطي للعميل خلال {escalation_notice_days} أيام عمل مع مستندات داعمة. لا يُطبق هذا الشرط على الأعمال المنجزة والمفوترة مسبقاً.`,
  textEn: `Given the project duration ({project_duration_days} days) and volatility of construction material prices in the Saudi market, a price escalation clause applies: if the index of key material prices rises by more than {escalation_threshold_percent}% during execution — per GASTAT data or approved supplier invoices — the Contractor may adjust affected line items by the actual supply cost increase, after {escalation_notice_days} business days' written notice with supporting documents. This clause does not apply to completed and previously invoiced works.`,
  placeholders: ph(
    "project_duration_days",
    "escalation_threshold_percent",
    "escalation_notice_days"
  ),
  sortOrder,
  isMandatory: false,
  autoTriggerRules: { minDurationDays: 90 },
  sourceRef: "Saudi market — Material Price Volatility Mitigation",
});

const vatClause = (prefix: string, sortOrder: number): ClauseSeed => ({
  clauseKey: `${prefix}-VAT-ZATCA`,
  category: "vat",
  riskSide: "balanced",
  textAr: `جميع الأسعار الواردة في هذا العرض {vat_inclusion_text} ضريبة القيمة المضافة بنسبة {vat_rate_percent}% وفقاً لنظام ضريبة القيمة المضافة في المملكة العربية السعودية واللوائح الصادرة عن هيئة الزكاة والضريبة والجمارك (ZATCA). يلتزم الطرف الثاني بتزويد بياناته الضريبية الصحيحة (الرقم الضريبي/السجل التجاري) لإصدار الفواتير الضريبية المعتمدة.`,
  textEn: `All prices in this proposal are {vat_inclusion_text_en} Value Added Tax at {vat_rate_percent}% per KSA VAT regulations and ZATCA rules. The Client shall provide accurate tax registration details (VAT/CR) for compliant tax invoicing.`,
  placeholders: ph("vat_inclusion_text", "vat_inclusion_text_en", "vat_rate_percent"),
  sortOrder,
  isMandatory: true,
  sourceRef: "ZATCA — VAT Regulations",
});

const variationOrder = (prefix: string, sortOrder: number): ClauseSeed => ({
  clauseKey: `${prefix}-VARIATION-ORDER`,
  category: "scope_change",
  riskSide: "protects_contractor",
  textAr: `أي تعديل على النطاق أو المواصفات أو الكميات أو ترتيب المراحل بعد اعتماد هذا العرض يُعد «أمر تغيير» (Variation Order) ولا يُنفَّذ إلا بعد موافقة خطية من الطرفين على السعر والمدة الإضافية. الطلبات الشفهية أو عبر المراسلات الفورية دون أمر تغيير معتمد لا تُلزم الطرف الأول. يحق للمقاول تعليق الجزء المتأثر من الأعمال حتى اعتماد أمر التغيير.`,
  textEn: `Any change to scope, specifications, quantities, or phase sequencing after acceptance of this proposal constitutes a Variation Order and shall not be executed until both parties agree in writing on additional price and time. Verbal or instant-messaging requests without an approved Variation Order are not binding on the Contractor, who may suspend affected works until approval.`,
  placeholders: [],
  sortOrder,
  isMandatory: true,
  sourceRef: "Turriva — Scope Creep Protection",
});

const retentionPayment = (prefix: string, sortOrder: number): ClauseSeed => ({
  clauseKey: `${prefix}-RETENTION-PAYMENT`,
  category: "payment",
  riskSide: "protects_contractor",
  textAr: `يحتفظ الطرف الثاني بنسبة {retention_percent}% من قيمة كل دفعة كضمان حسن التنفيذ (Retention) لمدة {retention_months} أشهر من تاريخ الاستلام الابتدائي، ثم تُصرف للطرف الأول ما لم تظهر عيوب جسيمة ضمن فترة الضمان. لا يجوز حجب الدفعات المستحقة بحجة طلبات تعديل خارج أمر التغيير المعتمد.`,
  textEn: `{retention_percent}% of each progress payment shall be retained as performance security for {retention_months} months from provisional handover, then released unless substantial defects appear within the warranty period. Due payments may not be withheld for modification requests outside an approved Variation Order.`,
  placeholders: ph("retention_percent", "retention_months"),
  sortOrder,
  isMandatory: false,
  sourceRef: "Saudi contracting practice — Retention",
});

// ---------------------------------------------------------------------------
// Fit-out pack
// ---------------------------------------------------------------------------

const fitOutMaterialsContractor: ClauseSeed = {
  clauseKey: "SA-FITOUT-MAT-SUPPLY-CONTRACTOR",
  category: "materials",
  riskSide: "protects_contractor",
  textAr: `يُورد الطرف الأول (المقاول) جميع مواد التشطيب والتجهيزات المحددة في المواصفات الفنية المرفقة، ويضمن مطابقتها للمواصفات المعتمدة. أي ترقية أو تغيير في الماركة أو الدرجة يُعد أمر تغيير. الأسعار المعتمدة في هذا العرض مبنية على أسعار التوريد السارية عند تاريخ العرض؛ أي تأخير في اعتماد العميل يتجاوز {quote_validity_days} يوماً قد يستوجب مراجعة الأسعار.`,
  textEn: `The Contractor shall supply all finishing materials and fixtures per approved specifications and ensure compliance. Any upgrade or brand/grade change constitutes a Variation Order. Prices are based on supply rates at proposal date; Client approval delays beyond {quote_validity_days} days may require price review.`,
  placeholders: ph("quote_validity_days"),
  sortOrder: 50,
  isMandatory: false,
  alternativeGroup: "fit_out_materials_supply",
  sourceRef: "Turriva Fit-out — Materials Supply",
};

const fitOutMaterialsClient: ClauseSeed = {
  clauseKey: "SA-FITOUT-MAT-SUPPLY-CLIENT",
  category: "materials",
  riskSide: "protects_contractor",
  textAr: `يُورد الطرف الثاني (العميل) جميع مواد التشطيب والتجهيزات الأساسية (بما في ذلك البلاط، الأدوات الصحية، الإضاءة، الأثاث الثابت إن وُجد) ويُسلِّمها للموقع قبل الموعد المتفق عليه. يلتزم المقاول بالتركيب فقط. أي تأخير في توريد العميل يُمدد الجدول ولا يُعد مخالفة من المقاول. المواد الموردة من العميل يجب أن تكون بمواصفات معتمدة مسبقاً؛ المقاول غير مسؤول عن عيوب مصنعية في مواد العميل.`,
  textEn: `The Client shall supply all primary finishing materials and fixtures (tiles, sanitary ware, lighting, fixed furniture if any) to site before the agreed date. The Contractor performs installation only. Client supply delays extend the schedule without Contractor breach. Client-supplied materials must be pre-approved; the Contractor is not liable for manufacturing defects in Client-supplied items.`,
  placeholders: [],
  sortOrder: 51,
  isMandatory: false,
  alternativeGroup: "fit_out_materials_supply",
  sourceRef: "Turriva Fit-out — Client-Supplied Materials",
};

const fitOutWarranty: ClauseSeed = {
  clauseKey: "SA-FITOUT-WARRANTY",
  category: "warranty",
  riskSide: "balanced",
  textAr: `يضمن الطرف الأول على أعمال التركيب والتشطيب لمدة {warranty_months} أشهر من تاريخ الاستلام الابتدائي ضد عيوب التنفيذ (وليس سوء الاستخدام أو التعديلات من العميل أو مواد موردة من العميل). لا يشمل الضمان: التشققات الشعرية، تغير لون الدهان بسبب التعرض المباشر للشمس، أو الأعطال في الأجهزة الموردة من العميل.`,
  textEn: `The Contractor warrants installation and finishing workmanship for {warranty_months} months from provisional handover against execution defects (excluding misuse, Client modifications, or Client-supplied materials). Warranty excludes hairline cracks, paint fading from direct sun exposure, and defects in Client-supplied appliances.`,
  placeholders: ph("warranty_months"),
  sortOrder: 90,
  isMandatory: true,
  sourceRef: "Turriva Fit-out — Workmanship Warranty",
};

const fitOutDelayPenaltyContractor: ClauseSeed = {
  clauseKey: "SA-FITOUT-DELAY-PENALTY-CONTRACTOR",
  category: "delay",
  riskSide: "balanced",
  textAr: `في حال تأخر الطرف الأول عن تسليم الأعمال لأسباب تعود إليه (باستثناء: تأخر التراخيص، ظروف التربة، توريد العميل، أو قوة قاهرة)، يُطبق غرام تأخير قدرها {delay_penalty_percent}% من قيمة المرحلة المتأخرة عن كل {delay_penalty_weeks} أسابيع، بحد أقصى {delay_penalty_cap_percent}% من إجمالي العقد.`,
  textEn: `If the Contractor delays handover for reasons attributable to the Contractor (excluding permit delays, ground conditions, Client supply, or force majeure), a delay penalty of {delay_penalty_percent}% of the delayed phase value applies per {delay_penalty_weeks} weeks, capped at {delay_penalty_cap_percent}% of total contract value.`,
  placeholders: ph(
    "delay_penalty_percent",
    "delay_penalty_weeks",
    "delay_penalty_cap_percent"
  ),
  sortOrder: 100,
  isMandatory: false,
  alternativeGroup: "fit_out_delay_penalty",
  sourceRef: "Turriva Fit-out — Delay Penalties (Contractor)",
};

const fitOutDelayPenaltyNone: ClauseSeed = {
  clauseKey: "SA-FITOUT-DELAY-PENALTY-NONE",
  category: "delay",
  riskSide: "protects_contractor",
  textAr: `لا تُطبق غرامات تأخير على الطرف الأول (المقاول) في هذا العرض، على أن يلتزم ببذل العناية المهنية المعقولة في التنفيذ. يحق للعميل إنهاء العقد فقط وفق بند الإنهاء وفي حال التأخر الجسيم غير المبرر.`,
  textEn: `No delay penalties apply to the Contractor under this proposal, provided professional due care is exercised. The Client may terminate only per the termination clause and in cases of material unjustified delay.`,
  placeholders: [],
  sortOrder: 101,
  isMandatory: false,
  alternativeGroup: "fit_out_delay_penalty",
  sourceRef: "Turriva Fit-out — No Delay Penalties",
};

export const CLAUSE_PACKS: PackSeed[] = [
  {
    slug: "fit_out_v1",
    nameAr: "حزمة تشطيب داخلي",
    nameEn: "Fit-out / Interior Design Pack",
    archetype: "fit_out",
    version: "1.0.0",
    clauses: [
      sbcResidentialCompliance("SA-FITOUT", 10),
      baladyPermitsLiability("SA-FITOUT", 20),
      baladyDebrisDelay("SA-FITOUT", 30),
      hiddenSoilRock("SA-FITOUT", 40),
      fitOutMaterialsContractor,
      fitOutMaterialsClient,
      vatClause("SA-FITOUT", 60),
      retentionPayment("SA-FITOUT", 70),
      variationOrder("SA-FITOUT", 80),
      fitOutWarranty,
      priceEscalation("SA-FITOUT", 110),
      fitOutDelayPenaltyContractor,
      fitOutDelayPenaltyNone,
      {
        clauseKey: "SA-FITOUT-ESTIMATE-DISCLAIMER",
        category: "other",
        riskSide: "balanced",
        textAr: `إذا كان هذا العرض «تقديرياً» (estimate only)، فإن جميع الأرقام في جدول التفصيل المالي تقديرية وغير ملزمة، وقابلة للتغيير بنسبة ±{variance_percent}% حسب الاختيارات النهائية للمواد والمواصفات ونتائج المعاينة الميدانية. لا يُعد هذا العرض عقداً ملزماً حتى اعتماد نهائي خطي من الطرفين.`,
        textEn: `If this proposal is estimate-only, all BOQ figures are preliminary, non-binding, and subject to ±{variance_percent}% variation based on final material selections, specifications, and site survey results. This proposal is not a binding contract until final written acceptance by both parties.`,
        placeholders: ph("variance_percent"),
        sortOrder: 120,
        isMandatory: false,
        sourceRef: "Turriva — Estimate Only Disclaimer",
      },
    ],
  },
  {
    slug: "supervision_v1",
    nameAr: "حزمة إشراف هندسي",
    nameEn: "Engineering Supervision Pack",
    archetype: "supervision",
    version: "1.0.0",
    clauses: [
      sbcResidentialCompliance("SA-SUPERV", 10),
      baladyPermitsLiability("SA-SUPERV", 20),
      {
        clauseKey: "SA-SUPERV-SCOPE-LIMIT",
        category: "compliance",
        riskSide: "protects_contractor",
        textAr: `نطاق خدمات الإشراف الهندسي يقتصر على: مراجعة المخططات، زيارات دورية للموقع ({site_visit_frequency})، إصدار ملاحظات واستمارات عدم المطابقة (NCR)، والرد على RFIs خلال {rfi_response_days} أيام عمل. لا يشمل الإشراف: تنفيذ الأعمال، توريد المواد، تشغيل المعدات، أو إدارة العمالة — وتلك مسؤولية المقاول المنفذ (Contractor of Record).`,
        textEn: `Supervision scope is limited to: drawing review, periodic site visits ({site_visit_frequency}), NCR issuance, and RFI responses within {rfi_response_days} business days. Supervision excludes execution, material supply, equipment operation, and labor management — those remain the Contractor of Record's responsibility.`,
        placeholders: ph("site_visit_frequency", "rfi_response_days"),
        sortOrder: 30,
        isMandatory: true,
        sourceRef: "Turriva Supervision — Scope Limitation",
      },
      hiddenSoilRock("SA-SUPERV", 40),
      {
        clauseKey: "SA-SUPERV-NOT-RESPONSIBLE-MEANS",
        category: "other",
        riskSide: "protects_contractor",
        textAr: `الطرف الأول (الاستشاري/المشرف) غير مسؤول عن وسائل وطرق تنفيذ المقاول، أو عن سلامة عمال المقاول، أو عن أي أضرار ناتجة عن إهمال المقاول أو مخالفته لكود البناء السعودي (SBC) أو تعليمات البلدية. دور المشرف رقابي واستشاري ولا يُعد بديلاً عن إشراف المقاول على أعماله.`,
        textEn: `The Supervisor is not responsible for the executing Contractor's means and methods, Contractor personnel safety, or damages from Contractor negligence or SBC/Balady violations. The Supervisor's role is advisory and does not replace the Contractor's duty to supervise its own works.`,
        placeholders: [],
        sortOrder: 50,
        isMandatory: true,
        sourceRef: "Turriva Supervision — Means & Methods Exclusion",
      },
      vatClause("SA-SUPERV", 60),
      retentionPayment("SA-SUPERV", 70),
      variationOrder("SA-SUPERV", 80),
      priceEscalation("SA-SUPERV", 110),
      {
        clauseKey: "SA-SUPERV-DELAY-NO-PENALTY",
        category: "delay",
        riskSide: "protects_contractor",
        textAr: `لا تُطبق غرامات تأخير على أتعاب الإشراف نتيجة تأخر المقاول المنفذ أو تأخر اعتمادات العميل أو توقف الموقع من البلدية. يُمدد عقد الإشراف بمدة التوقف الفعلية.`,
        textEn: `No supervision fee delay penalties apply due to executing Contractor delay, Client approval delays, or municipal site stoppages. The supervision contract extends by the actual stoppage period.`,
        placeholders: [],
        sortOrder: 100,
        isMandatory: false,
        sourceRef: "Turriva Supervision — Delay Exclusion",
      },
      {
        clauseKey: "SA-SUPERV-PHASE-SIGNOFF",
        category: "scope_change",
        riskSide: "protects_contractor",
        textAr: `اعتماد إنجاز كل مرحلة (Structural, MEP Rough-in, Finishes, Final) يتم عبر رابط العرض المباشر (Live Room) أو محضر استلام موقع. لا يُعد أي جزء من الأعمال معتمداً للدفع التالي إلا بعد توقيع العميل على محضر المرحلة أو الموافقة الناعمة (Soft Approval) المسجلة في النظام.`,
        textEn: `Each phase completion (Structural, MEP Rough-in, Finishes, Final) is accepted via the Live Proposal Room or a site handover minutes. No phase is deemed approved for subsequent payment until the Client signs phase minutes or records Soft Approval in the system.`,
        placeholders: [],
        sortOrder: 130,
        isMandatory: false,
        sourceRef: "Turriva — Phase Sign-off Hook (Live Room)",
      },
    ],
  },
  {
    slug: "maintenance_v1",
    nameAr: "حزمة صيانة سنوية",
    nameEn: "Annual Maintenance Pack",
    archetype: "maintenance",
    version: "1.0.0",
    clauses: [
      {
        clauseKey: "SA-MAINT-SLA-RESPONSE",
        category: "warranty",
        riskSide: "balanced",
        textAr: `يلتزم الطرف الأول بزمن استجابة {sla_response_hours} ساعة للبلاغات الطارئة، و{sla_routine_days} أيام عمل للصيانة الدورية، خلال ساعات العمل {sla_hours}. البلاغات خارج النطاق الجغرافي ({sla_geo_km} كم) أو خارج ساعات الطوارئ قد تُنفذ برسوم إضافية.`,
        textEn: `The Contractor shall respond within {sla_response_hours} hours for emergency calls and {sla_routine_days} business days for routine maintenance, during {sla_hours}. Calls outside the geographic scope ({sla_geo_km} km) or emergency hours may incur additional fees.`,
        placeholders: ph(
          "sla_response_hours",
          "sla_routine_days",
          "sla_hours",
          "sla_geo_km"
        ),
        sortOrder: 10,
        isMandatory: true,
        sourceRef: "Turriva Maintenance — SLA",
      },
      {
        clauseKey: "SA-MAINT-SPARE-PARTS",
        category: "materials",
        riskSide: "protects_contractor",
        textAr: `قطع الغيار الأساسية للمعدات المشمولة بالعقد تُورد ضمن العقد السنوي حتى سقف {spare_parts_cap_sar} ريال سعودي. أي تجاوز أو قطع لمعدات خارج قائمة النطاق تُفوتر بأسعار التوريد الفعلية + {spare_parts_markup_percent}% إدارية.`,
        textEn: `Essential spare parts for covered equipment are included up to SAR {spare_parts_cap_sar} annually. Excess or out-of-scope parts are invoiced at actual supply cost + {spare_parts_markup_percent}% administrative markup.`,
        placeholders: ph("spare_parts_cap_sar", "spare_parts_markup_percent"),
        sortOrder: 20,
        isMandatory: true,
        sourceRef: "Turriva Maintenance — Spare Parts",
      },
      {
        clauseKey: "SA-MAINT-EXCLUDED-EQUIPMENT",
        category: "other",
        riskSide: "protects_contractor",
        textAr: `لا يشمل عقد الصيانة: المعدات التي تجاوز عمرها {excluded_age_years} سنوات دون تجديد، أو المعدات التي لم تُركَّب بواسطة الطرف الأول أو وكيله المعتمد، أو الأعطال الناتجة عن سوء التشغيل أو التعديل غير المصرح به من العميل أو الغير.`,
        textEn: `Maintenance excludes: equipment older than {excluded_age_years} years without renewal, equipment not installed by the Contractor or approved agent, and failures from misuse or unauthorized third-party modifications.`,
        placeholders: ph("excluded_age_years"),
        sortOrder: 30,
        isMandatory: true,
        sourceRef: "Turriva Maintenance — Exclusions",
      },
      baladyPermitsLiability("SA-MAINT", 35),
      vatClause("SA-MAINT", 60),
      variationOrder("SA-MAINT", 80),
      priceEscalation("SA-MAINT", 110),
      {
        clauseKey: "SA-MAINT-ANNUAL-RENEWAL",
        category: "payment",
        riskSide: "balanced",
        textAr: `يُجدَّد عقد الصيانة سنوياً بموافقة الطرفين. يُرسل الطرف الأول عرض التجديد قبل {renewal_notice_days} يوماً من انتهاء العقد. الأسعار السنوية قابلة للمراجعة بنسبة لا تتجاوز {renewal_increase_cap_percent}% سنوياً ما لم تتغير قائمة المعدات أو نطاق الخدمة.`,
        textEn: `The maintenance contract renews annually by mutual agreement. Renewal proposal is sent {renewal_notice_days} days before expiry. Annual fees may be reviewed up to {renewal_increase_cap_percent}% per year unless equipment list or scope changes.`,
        placeholders: ph("renewal_notice_days", "renewal_increase_cap_percent"),
        sortOrder: 120,
        isMandatory: true,
        sourceRef: "Turriva Maintenance — Annual Renewal",
      },
      {
        clauseKey: "SA-MAINT-SBC-SAFETY",
        category: "compliance",
        riskSide: "protects_contractor",
        textAr: `أعمال الصيانة التي تمس السلامة الإنشائية أو أنظمة الحريق أو العزل الحراري يجب أن تتوافق مع كود البناء السعودي (SBC) والاشتراطات البلدية. أي طلب صيانة يتعارض مع SBC يُرفض مع توثيق خطي للعميل، ولا يُعد رفض الخدمة إخلالاً بالعقد.`,
        textEn: `Maintenance affecting structural safety, fire systems, or thermal insulation must comply with SBC and municipal requirements. Requests conflicting with SBC shall be declined with written documentation and shall not constitute contract breach.`,
        placeholders: [],
        sortOrder: 15,
        isMandatory: true,
        sourceRef: "SBC — Maintenance Safety Compliance",
      },
    ],
  },
];
