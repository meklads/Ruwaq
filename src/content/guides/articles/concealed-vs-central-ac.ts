import type { RuwaqGuide } from "@/content/guides/types";
import { guideCtaHref } from "@/content/guides/types";
import { GUIDE_IMAGES } from "@/content/marketing-images";

const meta = {
  slug: "concealed-vs-central-ac",
  citySlug: "jeddah" as const,
  categorySlug: "hvac" as const,
};

const ctaHref = guideCtaHref(meta);

export const concealedVsCentralAcGuide: RuwaqGuide = {
  ...meta,
  titleAr:
    "التكييف المركزي أم VRF المخفي للفلل في جدة: مقارنة التكلفة والكفاءة والصيانة",
  titleEn:
    "Central Ducted AC vs Concealed VRF for Jeddah Villas: Cost, Efficiency, and Maintenance Compared",
  excerptAr:
    "اختيار نظام التكييف في فيلا جدة قرار طويل الأمد — من حساب heat load مع هامش الرطوبة إلى مقارنة VRF والمركزي والسبlit. دليل يساعدك على اتخاذ القرار قبل التشطيب.",
  excerptEn:
    "Choosing AC for a Jeddah villa is a long-term decision — from heat-load calculations with a humidity margin to comparing VRF, central ducted, and split systems. A guide to help you decide before fit-out begins.",
  seoKeywordsAr: [
    "تكييف مركزي vs VRF فلل جدة",
    "نظام تكييف مخفي concealed cassette",
    "حساب heat load الرطوبة جدة",
    "توفير طاقة VRF الفلل السعودية",
    "مقاول تكييف معتمد جدة",
    "صيانة تكييف VRF سنوية",
    "تكييف فلل متعددة الطوابق جدة",
    "أنظمة VRF للمناخ الجاف",
  ],
  seoKeywordsEn: [
    "central ducted AC vs VRF Jeddah villas",
    "concealed cassette AC luxury homes",
    "heat load calculation humidity margin Jeddah",
    "VRF energy savings Saudi villas",
    "verified HVAC contractor Jeddah",
    "VRF annual maintenance contract",
    "multi-storey villa air conditioning",
    "VRF operating cost arid climate",
  ],
  readMinutes: 16,
  heroImage: GUIDE_IMAGES.hvac,
  publishedAt: "2025-09-20",
  updatedAt: "2026-07-31",
  blocksAr: [
    {
      type: "h2",
      text: "لماذا يختلف قرار التكييف في فلل جدة؟",
    },
    {
      type: "p",
      text: "فلل جدة تجمع بين مساحات واسعة، طوابق متعددة، ومناخ ساحلي يفرض رطوبة أعلى من المناطق الداخلية. نظام التكييف ليس مجرد «وحدات على الجدار» — بل بنية تحتية تُخطَّط قبل الجبس والأسقف المستعارة. الخيار بين التكييف المركزي (ducted) ونظام VRF المخفي (concealed cassette) يؤثر على تكلفة التشغيل، مستوى الضوضاء، مرونة التحكم zone-by-zone، ومساحة السقف المتاحة. هذا الدليل يساعدك على فهم الفروقات قبل التعاقد مع مقاول التكييف.",
    },
    {
      type: "callout",
      variant: "fact",
      title: "رقم من البحث",
      text: "تشير دراسات BRG Buildings إلى أن أنظمة VRF تحقق تكلفة تشغيل أقل بنسبة 20–30% مقارنة بالتكييف المركزي التقليدي في المباني السكنية — بفضل inverter technology والتحكم zone-by-zone.",
    },
    {
      type: "h2",
      text: "التكييف المركزي (Central Ducted): متى يكون الخيار الأفضل؟",
    },
    {
      type: "p",
      text: "التكييف المركزي يوزّع الهواء البارد عبر شبكة ducts مخ hidden في السقف المستعار. يناسب الفلل الكبيرة ذات التخطيط المفتوح والمساحات الموحّدة — حيث تريد درجة حرارة متساوية في majlis كبير أو صالة مزدوجة الارتفاع. مستوى الضوضاء منخفض لأن المكيّفات الداخلية مخ hidden والوحدات الخارجية بعيدة.",
    },
    {
      type: "ul",
      items: [
        "مثالي للفلل الكبيرة (400+ م²) مع توزيع متساوٍ.",
        "ضوضاء منخفضة — diffusers مخ hidden في السقف.",
        "يتطلب مساحة سقف كافية للـ ducts (30–40 سم).",
        "أقل مرونة في التحكم zone-by-zone مقارنة بـ VRF.",
        "تكلفة تركيب أولية أعلى بسبب شبكة الـ ducts.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.hvacDuct,
      alt: "شبكة ducts تكييف مركزي في فيlla",
      caption: "التكييف المركزي يحتاج تخطيط ducts قبل تركيب الجبس والأسقف المستعارة.",
    },
    {
      type: "h2",
      text: "نظام VRF المخفي (Concealed Cassette): المرونة والتوفير",
    },
    {
      type: "p",
      text: "VRF (Variable Refrigerant Flow) يربط عدة وحدات داخلية مخ hidden (cassette أو ducted mini) بوحدة أو أكثر خارجية. كل zone يمكن التحكم فيها بشكل مستقل — مثالي للفلل متعددة الطوابق حيث الطابق الأرضي يُستخدم نهاراً والعلوي ليلاً. الـ inverter يضبط سرعة الضاغط حسب الحمل الفعلي، ما يقلّل استهلاك الطاقة.",
    },
    {
      type: "h3",
      text: "توفير الطاقة في المناخ الجاف",
    },
    {
      type: "p",
      text: "دراسة منشورة في MDPI حول مناخ قطر الجاف — قريب من ظروف جدة — أظهرت توفيراً في الطاقة بنسبة 27% لأنظمة VRF مقارنة بالأنظمة التقليدية. في فلل جدة، حيث التكييف يعمل 7–8 أشهر سنوياً، هذا التوفير يعادل آلاف الريالات سنوياً.",
    },
    {
      type: "ul",
      items: [
        "تحكم zone-by-zone — أطفئ الطابق غير المستخدم.",
        "تكلفة تشغيل أقل 20–30% (BRG Buildings benchmarks).",
        "لا يحتاج ducts كبيرة — cassette في السقف المستعار.",
        "مرونة في التوسع — إضافة zones لاحقاً أسهل.",
        "صيانة أكثر تعقيداً — تحتاج مقاول VRF معتمد.",
      ],
    },
    {
      type: "h2",
      text: "مقارنة شاملة: مركزي vs VRF vs Split",
    },
    {
      type: "table",
      caption: "مقارنة أنظمة التكييف لفلل جدة",
      headers: ["المعيار", "مركزي Ducted", "VRF Concealed", "Split Wall"],
      rows: [
        ["تكلفة التركيب", "مرتفعة", "متوسطة–مرتفعة", "منخفضة"],
        ["تكلفة التشغيل السنوية", "مرجع 100%", "70–80%", "85–95%"],
        ["الضوضاء الداخلية", "منخفضة جداً", "منخفضة", "متوسطة"],
        ["التحكم zone-by-zone", "محدود", "ممتاز", "كل وحدة منفصلة"],
        ["مساحة السقف المطلوبة", "كبيرة (ducts)", "متوسطة (cassette)", "لا يحتاج"],
        ["الفلل المناسبة", "كبيرة موحّدة", "متعددة الطوابق", "غرف محددة"],
        ["عقد الصيانة", "سنوي موصى", "سنوي ضروري", "حسب الحاجة"],
      ],
    },
    {
      type: "chart",
      caption: "مؤشر تكلفة التشغيل السنوية (التكييف المركزي = 100)",
      unit: "نقطة",
      items: [
        { label: "مركزي Ducted", value: 100, max: 120 },
        { label: "VRF Concealed", value: 75, max: 120 },
        { label: "Split Wall", value: 90, max: 120 },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "نصيحة",
      text: "في فلل جدة متعددة الطوابق، الجمع بين VRF للطوابق العلوية ومركزي ducted للصالة الكبيرة في الطابق الأرضي — hybrid approach — يحقق أفضل توازن بين الراحة والتوفير.",
    },
    {
      type: "h2",
      text: "حساب Heat Load في جدة: هامش الرطوبة",
    },
    {
      type: "p",
      text: "خطأ شائع: حساب حمل التبريد بناءً على درجة الحرارة فقط. في جدة، الرطوبة الساحلية تضيف حمل latent heat يجب احتسابه. المقاول المعتمد يضيف هامش 10–15% على حساب الحرارة لاستيعاب الرطوبة — خاصة في الطوابق الأرضية والغرف المطلة على البحر.",
    },
    {
      type: "ol",
      items: [
        "اطلب heat load calculation مكتوباً قبل التسعير.",
        "تأكد من تضمين هامش 10–15% للرطوبة.",
        "حدّد اتجاهات الغرف (شمال/جنوب/بحر) في الحساب.",
        "احسب تأثير الزجاج الواسع والـ skylights.",
        "راجع الحساب عند أي تغيير في التخطيط أو العزل.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.hvac,
      alt: "وحدات VRF خارجية لفيلا في جدة",
      caption: "وحدات VRF الخارجية تحتاج موقعاً جيد التهوية بعيداً عن نوافذ غرف النوم.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "تحذير",
      text: "تصغير سعة نظام التكييف عن الحاجة — لتقليل التكلفة الأولية — يؤدي إلى تشغيل مستمر، فواتير مرتفعة، وتلف الضاغط قبل 5–7 سنوات. لا تقبل عرضاً بدون heat load calculation موثّق.",
    },
    {
      type: "h2",
      text: "الصيانة: استثمار طويل الأمد",
    },
    {
      type: "p",
      text: "التكييف في فلل جدة استثمار لـ 15–20 سنة. عقد صيانة سنوي (AMC) ليس رفاهية — تنظيف coils، فحص refrigerant، ومعايرة thermostats يطيل عمر النظام ويحافظ على الكفاءة. VRF يتطلب فنيين certified من الشركة المصنّعة.",
    },
    {
      type: "ul",
      items: [
        "AMC سنوي: 2–4 زيارات وقائية + استجابة طوارئ.",
        "تنظيف filters شهرياً (يمكن DIY) و coils سنوياً (فني).",
        "VRF: فحص refrigerant leaks و compressor health.",
        "مركزي: فحص ducts للتسريبات وتنظيف diffusers.",
        "وثّق كل زيارة صيانة في log — مفيد عند البيع أو التأجير.",
      ],
    },
    {
      type: "cta",
      lead: "تبحث عن مقاول تكييف معتمد في جدة؟",
      label: "شركات التكييف المعتمدة في جدة",
      href: ctaHref,
    },
    {
      type: "h2",
      text: "خطوات اتخاذ القرار قبل التعاقد",
    },
    {
      type: "p",
      text: "قبل التوقيع مع مقاول HVAC، تأكد أن العرض يتضمن: heat load calculation مكتوباً، مواصفات المعدات (brand, model, capacity)، خطة التركيب مع timeline، وAMC لمدة سنة على الأقل. قارن 3 عروض، واسأل عن مشاريع مماثلة في جدة زرتها.",
    },
    {
      type: "ol",
      items: [
        "حدّد أولوياتك: توفير طاقة، ضوضاء، أو مرونة zones.",
        "شارك plans المعمارية مع المقاول قبل التسعير.",
        "اطلب references لمشاريع VRF أو مركزي في جدة.",
        "اشترط ضمان equipment 5+ سنوات و workmanship 2 سنة.",
        "وثّق نقاط MEP في plans قبل إغلاق الجبس.",
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "ملاحظة للفلل الجديدة",
      text: "في الفلل تحت الإنشاء، قرار VRF vs مركزي يجب أن يُتخذ قبل أعمال السقف المستعار — تغيير النظام بعد تركيب الجبس يكلف 3–5 أضعاف.",
    },
    {
      type: "cta",
      lead: "جاهز لمقارنة عروض التكييف في جدة؟",
      label: "ابدأ من دليل شركات التكييف",
      href: ctaHref,
    },
    {
      type: "sources",
      title: "المصادر",
      items: [
        {
          label: "BRG Buildings — VRF vs Traditional HVAC: Operating Cost Analysis",
          url: "https://www.brgbuildings.com/insights/vrf-vs-traditional-hvac",
        },
        {
          label: "MDPI Applied Sciences — Energy Performance of VRF Systems in Arid Climates (Qatar study)",
          url: "https://www.mdpi.com/2076-3417/12/3/1124",
        },
        {
          label: "ASHRAE — Residential Load Calculation Guidelines",
          url: "https://www.ashrae.org/technical-resources/bookstore/ansi-ashrae-standard-183-2022",
        },
        {
          label: "Saudi Energy Efficiency Center — HVAC Best Practices for Residential Buildings",
          url: "https://www.seec.gov.sa/en/knowledge-center/Pages/default.aspx",
        },
      ],
    },
  ],
  blocksEn: [
    {
      type: "h2",
      text: "Why AC Decisions in Jeddah Villas Are Different",
    },
    {
      type: "p",
      text: "Jeddah villas combine generous floor areas, multiple storeys, and a coastal climate with higher humidity than inland regions. Air conditioning is not just wall units — it is infrastructure planned before gypsum and suspended ceilings go in. Choosing between central ducted AC and concealed VRF cassette systems affects operating cost, noise levels, zone-by-zone control, and available ceiling space. This guide helps you understand the trade-offs before signing with an HVAC contractor.",
    },
    {
      type: "callout",
      variant: "fact",
      title: "Research figure",
      text: "BRG Buildings analysis shows VRF systems deliver 20–30% lower operating costs versus conventional central AC in residential buildings — thanks to inverter technology and zone-by-zone control.",
    },
    {
      type: "h2",
      text: "Central Ducted AC: When It Is the Better Fit",
    },
    {
      type: "p",
      text: "Central ducted systems distribute cooled air through a network of ducts hidden in the suspended ceiling. They suit large villas with open plans and uniform spaces — where you want even temperature across a grand majlis or double-height living room. Noise is low because indoor units are concealed and outdoor condensers sit far from living areas.",
    },
    {
      type: "ul",
      items: [
        "Ideal for large villas (400+ sqm) with even distribution needs.",
        "Low noise — diffusers hidden in ceiling panels.",
        "Requires adequate ceiling void for ductwork (30–40 cm).",
        "Less zone flexibility compared with VRF.",
        "Higher upfront install cost due to duct network.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.hvacDuct,
      alt: "Central AC ductwork in a luxury villa ceiling void",
      caption: "Central ducted AC needs duct routing planned before gypsum and ceiling grids are installed.",
    },
    {
      type: "h2",
      text: "Concealed VRF (Cassette): Flexibility and Savings",
    },
    {
      type: "p",
      text: "VRF (Variable Refrigerant Flow) connects multiple concealed indoor units — cassette or mini-duct — to one or more outdoor condensers. Each zone can be controlled independently, ideal for multi-storey villas where the ground floor runs by day and upper floors by night. The inverter adjusts compressor speed to actual load, cutting energy use.",
    },
    {
      type: "h3",
      text: "Energy Savings in Arid Climates",
    },
    {
      type: "p",
      text: "An MDPI study in Qatar's arid climate — comparable to Jeddah conditions — reported 27% energy savings for VRF systems versus conventional alternatives. In Jeddah villas where AC runs 7–8 months a year, that saving translates to thousands of riyals annually.",
    },
    {
      type: "ul",
      items: [
        "Zone-by-zone control — switch off unused floors.",
        "20–30% lower operating cost (BRG Buildings benchmarks).",
        "No large ducts — cassette units sit in suspended ceiling.",
        "Expansion flexibility — adding zones later is easier.",
        "More complex maintenance — needs certified VRF contractor.",
      ],
    },
    {
      type: "h2",
      text: "Full Comparison: Central vs VRF vs Split",
    },
    {
      type: "table",
      caption: "AC system comparison for Jeddah villas",
      headers: ["Criterion", "Central Ducted", "VRF Concealed", "Split Wall"],
      rows: [
        ["Install cost", "High", "Mid–high", "Low"],
        ["Annual operating cost", "Baseline 100%", "70–80%", "85–95%"],
        ["Indoor noise", "Very low", "Low", "Moderate"],
        ["Zone control", "Limited", "Excellent", "Per unit"],
        ["Ceiling space needed", "Large (ducts)", "Medium (cassette)", "None"],
        ["Best for", "Large uniform villas", "Multi-storey homes", "Specific rooms"],
        ["Maintenance contract", "Annual recommended", "Annual essential", "As needed"],
      ],
    },
    {
      type: "chart",
      caption: "Relative annual operating cost index (central ducted = 100)",
      unit: "pts",
      items: [
        { label: "Central Ducted", value: 100, max: 120 },
        { label: "VRF Concealed", value: 75, max: 120 },
        { label: "Split Wall", value: 90, max: 120 },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Tip",
      text: "In multi-storey Jeddah villas, a hybrid approach — VRF on upper floors and central ducted for the large ground-floor majlis — often delivers the best balance of comfort and savings.",
    },
    {
      type: "h2",
      text: "Heat Load in Jeddah: The Humidity Margin",
    },
    {
      type: "p",
      text: "A common mistake is sizing cooling load on temperature alone. Jeddah's coastal humidity adds latent heat that must be counted. A verified contractor adds a 10–15% margin to the sensible load for moisture — especially on ground floors and sea-facing rooms.",
    },
    {
      type: "ol",
      items: [
        "Request a written heat load calculation before pricing.",
        "Confirm a 10–15% humidity margin is included.",
        "Specify room orientations (north/south/sea-facing) in the calc.",
        "Account for extensive glazing and skylights.",
        "Revise the calculation after any layout or insulation change.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.hvac,
      alt: "VRF outdoor units serving a Jeddah villa",
      caption: "VRF outdoor units need a ventilated location away from bedroom windows.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Warning",
      text: "Undersizing the system — to cut upfront cost — leads to continuous run times, high bills, and compressor failure before 5–7 years. Do not accept a quote without a documented heat load calculation.",
    },
    {
      type: "h2",
      text: "Maintenance: A Long-Term Investment",
    },
    {
      type: "p",
      text: "AC in Jeddah villas is a 15–20 year investment. An annual maintenance contract (AMC) is not a luxury — coil cleaning, refrigerant checks, and thermostat calibration extend system life and preserve efficiency. VRF requires manufacturer-certified technicians.",
    },
    {
      type: "ul",
      items: [
        "Annual AMC: 2–4 preventive visits plus emergency response.",
        "Filter cleaning monthly (DIY) and coil service yearly (technician).",
        "VRF: refrigerant leak checks and compressor health monitoring.",
        "Central: duct leak inspection and diffuser cleaning.",
        "Log every service visit — useful at resale or rental.",
      ],
    },
    {
      type: "cta",
      lead: "Looking for a verified HVAC contractor in Jeddah?",
      label: "Verified HVAC companies in Jeddah",
      href: ctaHref,
    },
    {
      type: "h2",
      text: "Decision Steps Before You Sign",
    },
    {
      type: "p",
      text: "Before signing with an HVAC contractor, ensure the proposal includes: a written heat load calculation, equipment specs (brand, model, capacity), an installation plan with timeline, and at least one year of AMC. Compare three quotes and ask to visit similar completed projects in Jeddah.",
    },
    {
      type: "ol",
      items: [
        "Rank your priorities: energy savings, noise, or zone flexibility.",
        "Share architectural plans with the contractor before pricing.",
        "Request references for VRF or central projects in Jeddah.",
        "Require 5+ years equipment warranty and 2 years workmanship.",
        "Document MEP points on plans before gypsum closes.",
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "Note for new-build villas",
      text: "In villas under construction, the VRF vs central decision must be made before suspended ceiling works — changing systems after gypsum is installed typically costs 3–5× more.",
    },
    {
      type: "cta",
      lead: "Ready to compare AC proposals in Jeddah?",
      label: "Start from the HVAC directory",
      href: ctaHref,
    },
    {
      type: "sources",
      title: "Sources",
      items: [
        {
          label: "BRG Buildings — VRF vs Traditional HVAC: Operating Cost Analysis",
          url: "https://www.brgbuildings.com/insights/vrf-vs-traditional-hvac",
        },
        {
          label: "MDPI Applied Sciences — Energy Performance of VRF Systems in Arid Climates (Qatar study)",
          url: "https://www.mdpi.com/2076-3417/12/3/1124",
        },
        {
          label: "ASHRAE — Residential Load Calculation Guidelines",
          url: "https://www.ashrae.org/technical-resources/bookstore/ansi-ashrae-standard-183-2022",
        },
        {
          label: "Saudi Energy Efficiency Center — HVAC Best Practices for Residential Buildings",
          url: "https://www.seec.gov.sa/en/knowledge-center/Pages/default.aspx",
        },
      ],
    },
  ],
};
