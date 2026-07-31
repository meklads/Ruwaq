import type { RuwaqGuide } from "@/content/guides/types";
import { GUIDE_IMAGES } from "@/content/marketing-images";

export const villaMaintenanceContractGuide: RuwaqGuide = {
  slug: "villa-maintenance-contract",
  citySlug: "jeddah",
  categorySlug: "maintenance",
  titleAr: "عقد صيانة سنوي للفيلا في جدة: AMC، SLA، والصيانة الوقائية",
  titleEn: "Annual villa maintenance contract in Jeddah: AMC, SLA, and preventive care",
  excerptAr:
    "ماذا يشمل عقد FM السنوي؟ HVAC، كهرباء، سباكة، حريق، فحص أسطح قبل الأمطار، SLA للطوارئ، وعزل كل 5–7 سنوات — دليل قبل التوقيع.",
  excerptEn:
    "What does an annual FM contract cover? HVAC, electrical, plumbing, fire, pre-rain roof checks, emergency SLA, and waterproofing every 5–7 years — a guide before you sign.",
  seoKeywordsAr: [
    "عقد صيانة فيلا جدة",
    "AMC صيانة سنوية",
    "SLA صيانة طوارئ",
    "صيانة وقائية PPM",
    "عزل أسطح فيلا",
    "صيانة تكييف مركزي",
    "Vision 2030 FM",
    "شركات صيانة فلل جدة",
  ],
  seoKeywordsEn: [
    "villa maintenance contract Jeddah",
    "annual maintenance contract AMC",
    "FM SLA emergency response",
    "preventive maintenance PPM",
    "roof waterproofing villa",
    "HVAC maintenance Saudi Arabia",
    "Vision 2030 facilities management",
    "villa FM companies Jeddah",
  ],
  readMinutes: 14,
  heroImage: GUIDE_IMAGES.maintenance,
  publishedAt: "2025-08-15",
  updatedAt: "2026-07-31",
  blocksAr: [
    {
      type: "p",
      text: "الفيلا في جدة استثمار طويل الأمد — الرطوبة الساحلية، موسم الأمطار، وأنظمة MEP المعقّدة تتطلب صيانة منظّمة لا «إصلاحاً عند العطل» فقط. عقد الصيانة السنوي (AMC — Annual Maintenance Contract) يحوّل الصيانة من رد فعل إلى خطة: زيارات وقائية شهرية، SLA للطوارئ، وتقارير بعد كل زيارة. هذا الدليل يشرح ما يجب أن يشمله العقد، وكيف تربط بين PPM والتكلفة على مدى 5–10 سنوات.",
    },
    {
      type: "h2",
      text: "ماذا يشمل AMC القياسي للفلل؟",
    },
    {
      type: "p",
      text: "عقود FM للفلل السكنية في جدة تختلف في التفاصيل، لكن النطاق الجيد يغطي الأنظمة التي تتعطل باهظاً: التكييف (مركزي أو VRF)، الكهرباء (لوحات، تمديدات، إضاءة خارجية)، السباكة (ضغط، تسربات، سخانات)، أنظمة الحريق والإنذار، وفحص الأسطح والخزانات قبل موسم الأمطار. اطلب قائمة checklist مكتوبة — لا عبارة «صيانة شاملة» دون تفصيل.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.maintenanceRoof,
      alt: "فحص سطح فيلا قبل موسم الأمطار في جدة",
      caption: "فحص الأسطح والعزل قبل الأمطار يمنع تسربات تكلف عشرات الآلاف لاحقاً.",
    },
    {
      type: "h3",
      text: "أنظمة يجب أن تكون صريحة في العقد",
    },
    {
      type: "ul",
      items: [
        "HVAC: تنظيف فلاتر، فحص غاز، calibration للthermostats، فحص duct leaks.",
        "كهرباء: لوحة رئيسية، earth leakage، إضاءة خارجية ومواتير بوابات.",
        "سباكة: ضغط خطوط، صمامات، pumps، water heaters.",
        "حريق: detectors، extinguishers، panel test (حسب اشتراط البلدية).",
        "أسطح: visual inspection + توصية عزل كل 5–7 سنوات.",
        "خزانات: فحص تسربات وتنظيف دوري للخزان العلوي.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "SLA للطوارئ",
      text: "اطلب SLA مكتوباً: مثلاً استجابة خلال 4 ساعات للتكييف أو تسرب مياه حرج، وزيارة وقائية شهرية واحدة على الأقل. بدون SLA، «عقد سنوي» قد يعني بطاقة اتصال لا تُرد.",
    },
    {
      type: "h2",
      text: "جدول SLA وزيارات — نموذج للمقارنة",
    },
    {
      type: "table",
      caption: "مقارنة مستويات AMC شائعة في فلل جدة",
      headers: ["المستوى", "زيارات وقائية", "SLA طوارئ", "أنظمة مشمولة"],
      rows: [
        ["أساسي", "4/سنة (فصلية)", "24 ساعة", "HVAC + سباكة أساسية"],
        ["متوسط", "12/سنة (شهرية)", "8 ساعات", "+ كهرباء + أسطح visual"],
        ["ممتاز", "12/سنة + seasonal", "4 ساعات", "+ حريق + خزانات + تقارير PDF"],
        ["ممتاز + عزل", "كالممتاز", "4 ساعات", "+ تجديد waterproofing كل 5–7 سنوات"],
      ],
    },
    {
      type: "cta",
      lead: "تريد مقارنة عروض AMC من شركات صيانة معتمدة في جدة؟",
      label: "تصفّح شركات الصيانة في جدة",
      href: "/jeddah/maintenance",
    },
    {
      type: "h2",
      text: "PPM مقابل الصيانة التفاعلية — التكلفة على 10 سنوات",
    },
    {
      type: "p",
      text: "الصيانة الوقائية المخطّطة (PPM) تكلف أكثر في السنوات الأولى — لكنها تقلّل الأعطال الكارثية: ضاغط تكييف محترق، تسرب سقف، دائرة كهربائية قصيرة. في فلل جدة، الرطوبة تسرّع تآكل التمديدات والأسطح. الرسم البياني التالي يقارب نسب التكلفة التراكمية (PPM + إصلاحات بسيطة) مقابل «إصلاح عند العطل» فقط — الأرقام توضيحية لكن الاتجاه مثبت في FM عالمياً.",
    },
    {
      type: "chart",
      caption: "تكلفة صيانة تراكمية على 10 سنوات — فيلا 400–600 م² (مؤشر نسبي، reactive = 100)",
      unit: "نقطة",
      items: [
        { label: "Reactive فقط (بدون AMC)", value: 100, max: 100 },
        { label: "AMC أساسي + بعض الطوارئ", value: 78, max: 100 },
        { label: "PPM كامل + SLA 4h", value: 58, max: 100 },
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "عزل الأسطح والخزانات",
      text: "waterproofing للأسطح والخزانات يُجدّد كل 5–7 سنوات في المناخ الساحلي. ادمجه في AMC أو كـ variation منفصل — تأجيله يعني إصلاح تشطيبات داخلية لاحقاً.",
    },
    {
      type: "h3",
      text: "Vision 2030 واتجاهات FM في المملكة",
    },
    {
      type: "p",
      text: "برامج رؤية 2030 ونمو القطاع السكني الفاخر رفعتا توقعات إدارة المرافق: تقارير رقمية، IoT sensors للتكييف والتسربات، وعقود مرتبطة بـ KPIs (uptime، زمن استجابة، رضا المستأجر). حتى في فيلا واحدة، يمكنك طلب portal بسيط أو PDF شهري — هذا يصبح أرشيفاً عند البيع أو التأجير. شركات FM المتقدمة في جدة تبدأ بدمج preventive analytics مع الزيارات التقليدية.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.maintenance,
      alt: "صيانة منظّمة تحمي استثمار الفيلا على المدى الطويل",
      caption: "AMC جيد يُترجم إلى راحة يومية وتكلفة أقل على مدى العقد.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "اقرأ Exclusions",
      text: "معظم العقود تستثني «أضرار سوء استخدام» أو «تعديلات بدون إبلاغ». وثّق أي تعديل MEP (مثل إضافة غرفة أو split unit) وأبلغ شركة الصيانة — وإلا قد تُرفض مطالبة SLA.",
    },
    {
      type: "h2",
      text: "Checklist قبل التوقيع",
    },
    {
      type: "ol",
      items: [
        "قائمة أنظمة مشمولة + spare parts policy (من يدفع؟).",
        "SLA طوارئ + ساعات عمل + غرامات تأخير (إن وُجدت).",
        "عدد الزيارات الوقائية + ماذا يحدث في كل زيارة.",
        "تنسيق pre-rain roof inspection (أكتوبر–نوفمبر في جدة).",
        "خطة عزل 5–7 سنوات أو right of first refusal للتجديد.",
        "تقارير PDF + contact escalation (مدير حساب).",
      ],
    },
    {
      type: "cta",
      lead: "جاهز لعقد AMC يحمي فيلتك قبل موسم الأمطار القادم؟",
      label: "اطلب عروض صيانة من شركات معتمدة",
      href: "/jeddah/maintenance",
    },
    {
      type: "sources",
      title: "مصادر ومراجع",
      items: [
        { label: "Vision 2030 — Kingdom of Saudi Arabia", url: "https://www.vision2030.gov.sa/" },
        { label: "International Facility Management Association (IFMA)", url: "https://www.ifma.org/" },
        { label: "Saudi Energy Efficiency Center", url: "https://www.seec.gov.sa/en" },
        { label: "ISO 41001 — Facility Management Systems", url: "https://www.iso.org/standard/67812.html" },
      ],
    },
  ],
  blocksEn: [
    {
      type: "p",
      text: "A villa in Jeddah is a long-term asset — coastal humidity, the rain season, and complex MEP systems need structured care, not repair-only when something breaks. An Annual Maintenance Contract (AMC) turns maintenance into a plan: monthly preventive visits, emergency SLA, and reports after every call-out. This guide explains what the contract should cover and how PPM compares to reactive cost over 5–10 years.",
    },
    {
      type: "h2",
      text: "What a standard villa AMC includes",
    },
    {
      type: "p",
      text: "Residential FM contracts in Jeddah vary in detail, but a strong scope covers systems that fail expensively: AC (central or VRF), electrical (panels, circuits, exterior lighting), plumbing (pressure, leaks, heaters), fire and alarm systems, and pre-rain roof and tank checks. Insist on a written checklist — not a vague “full maintenance” line.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.maintenanceRoof,
      alt: "Villa roof inspection before Jeddah rain season",
      caption: "Pre-rain roof and waterproofing checks prevent leaks that cost tens of thousands later.",
    },
    {
      type: "h3",
      text: "Systems that must be explicit in the contract",
    },
    {
      type: "ul",
      items: [
        "HVAC: filter cleaning, refrigerant checks, thermostat calibration, duct leak inspection.",
        "Electrical: main panel, earth leakage, exterior lighting and gate motors.",
        "Plumbing: line pressure, valves, pumps, water heaters.",
        "Fire: detectors, extinguishers, panel test (per municipal rules).",
        "Roofs: visual inspection + waterproofing renewal every 5–7 years.",
        "Tanks: leak checks and periodic upper-tank cleaning.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Emergency SLA",
      text: "Demand a written SLA: e.g. 4-hour response for critical AC or water leaks, plus at least one monthly preventive visit. Without SLA, an “annual contract” may be a phone number that rarely answers.",
    },
    {
      type: "h2",
      text: "SLA and visit schedule — comparison template",
    },
    {
      type: "table",
      caption: "Common AMC tiers for Jeddah villas",
      headers: ["Tier", "Preventive visits", "Emergency SLA", "Systems covered"],
      rows: [
        ["Basic", "4/year (quarterly)", "24 hours", "HVAC + core plumbing"],
        ["Standard", "12/year (monthly)", "8 hours", "+ electrical + roof visual"],
        ["Premium", "12/year + seasonal", "4 hours", "+ fire + tanks + PDF reports"],
        ["Premium + waterproofing", "Same as premium", "4 hours", "+ roof/tank renewal every 5–7 years"],
      ],
    },
    {
      type: "cta",
      lead: "Want to compare AMC quotes from verified maintenance firms in Jeddah?",
      label: "Browse maintenance companies in Jeddah",
      href: "/jeddah/maintenance",
    },
    {
      type: "h2",
      text: "PPM vs reactive maintenance — 10-year cost view",
    },
    {
      type: "p",
      text: "Planned preventive maintenance (PPM) costs more in early years but reduces catastrophic failures: burnt AC compressors, roof leaks, electrical shorts. In Jeddah villas, humidity accelerates wear on services and roofs. The chart below approximates cumulative cost (PPM + minor fixes) versus break-fix only — figures are illustrative but the trend is well established in global FM practice.",
    },
    {
      type: "chart",
      caption: "10-year cumulative maintenance cost — 400–600 m² villa (relative index; reactive = 100)",
      unit: "pts",
      items: [
        { label: "Reactive only (no AMC)", value: 100, max: 100 },
        { label: "Basic AMC + some emergencies", value: 78, max: 100 },
        { label: "Full PPM + 4h SLA", value: 58, max: 100 },
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "Roof and tank waterproofing",
      text: "Roof and tank waterproofing renews every 5–7 years in a coastal climate. Bundle it in the AMC or as a separate variation — delaying it means interior fit-out repairs later.",
    },
    {
      type: "h3",
      text: "Vision 2030 and FM trends in the Kingdom",
    },
    {
      type: "p",
      text: "Vision 2030 programs and growth in luxury housing have raised FM expectations: digital reports, IoT sensors for AC and leaks, and contracts tied to KPIs (uptime, response time, tenant satisfaction). Even for a single villa, ask for a simple portal or monthly PDF — it becomes an archive at sale or lease. Advanced FM firms in Jeddah are blending preventive analytics with traditional visits.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.maintenance,
      alt: "Organized maintenance protecting long-term villa investment",
      caption: "A solid AMC translates into daily comfort and lower lifetime cost.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Read the exclusions",
      text: "Most contracts exclude “misuse damage” or “unreported modifications.” Document any MEP change (extra room, split unit) and notify the maintenance firm — otherwise an SLA claim may be rejected.",
    },
    {
      type: "h2",
      text: "Pre-sign checklist",
    },
    {
      type: "ol",
      items: [
        "Covered systems list + spare parts policy (who pays?).",
        "Emergency SLA + working hours + delay penalties (if any).",
        "Preventive visit count + scope per visit.",
        "Pre-rain roof inspection timing (October–November in Jeddah).",
        "5–7 year waterproofing plan or first-refusal on renewal.",
        "PDF reports + escalation contact (account manager).",
      ],
    },
    {
      type: "cta",
      lead: "Ready for an AMC that protects your villa before the next rain season?",
      label: "Request maintenance quotes from verified firms",
      href: "/jeddah/maintenance",
    },
    {
      type: "sources",
      title: "Sources & references",
      items: [
        { label: "Vision 2030 — Kingdom of Saudi Arabia", url: "https://www.vision2030.gov.sa/" },
        { label: "International Facility Management Association (IFMA)", url: "https://www.ifma.org/" },
        { label: "Saudi Energy Efficiency Center", url: "https://www.seec.gov.sa/en" },
        { label: "ISO 41001 — Facility Management Systems", url: "https://www.iso.org/standard/67812.html" },
      ],
    },
  ],
};
