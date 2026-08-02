import type { RuwaqGuide } from "@/content/guides/types";
import { GUIDE_IMAGES } from "@/content/marketing-images";

export const landscapeMadinahVillasGuide: RuwaqGuide = {
  slug: "landscape-madinah-villas",
  citySlug: "madinah",
  categorySlug: "outdoor",
  titleAr: "تنسيق حدائق فلل المدينة المنورة: نباتات، ري، وhardscape",
  titleEn: "Madinah villa landscaping: plants, irrigation, and hardscape",
  excerptAr:
    "صيف المدينة أحر وأجف من جدة — نخيل، أكاسيا، bougainvillea، ري بالتنقيط 30–40% توفير، hardscape قبل الزراعة، وضمان 12 شهراً.",
  excerptEn:
    "Madinah summers are hotter and drier than Jeddah — palms, acacia, bougainvillea, drip irrigation saving 30–40%, hardscape before planting, and a 12-month warranty.",
  seoKeywordsAr: [
    "تنسيق حدائق المدينة المنورة",
    "لاندسكيب فلل المدينة",
    "ري بالتنقيط",
    "نباتات مقاومة للحرارة",
    "hardscape فيلا",
    "نخيل و أكاسيا",
    "توفير مياه الحدائق",
    "شركات لاندسكيب المدينة",
  ],
  seoKeywordsEn: [
    "Madinah villa landscaping",
    "landscape design Madinah",
    "drip irrigation Saudi Arabia",
    "heat tolerant plants",
    "villa hardscape",
    "date palm acacia bougainvillea",
    "garden water savings",
    "landscaping companies Madinah",
  ],
  readMinutes: 14,
  heroImage: GUIDE_IMAGES.landscape,
  publishedAt: "2025-07-30",
  updatedAt: "2026-07-31",
  blocksAr: [
    {
      type: "p",
      text: "تنسيق حديقة فيلا في المدينة المنورة ليس نفس مشروع جدة الساحلية: الصيف هنا أحر وأجف، والري غير المخطّط يحرق الميزانية والنباتات معاً. الدليل التالي يركّز على نباتات محلية تتحمل الحر (نخيل، أكاسيا، bougainvillea، plumeria، agave)، نظام ري بالتنقيط يوفر 30–40% مقارنة بالري اليدوي، ترتيب التنفيذ (hardscape قبل الزراعة)، وجدول zones للري — مع ضمان لا يقل عن 12 شهراً على الزراعة والري.",
    },
    {
      type: "h2",
      text: "مناخ المدينة vs جدة — لماذا يهم اختيار النبات؟",
    },
    {
      type: "p",
      text: "جدة تستفيد من الرطوبة الساحلية؛ المدينة المنورة inland أكثر جفافاً وحرارة صيفية أعلى. نبات «ينجح في جدة» قد يذبل هنا بدون ظل وري دقيق. فضّل أصنافاً مقاومة للجفاف مع طبقة mulch، وقلّل مساحات العشب (lawn) — أعلى مستهلك للمياه. الظل من النخيل والأكاسيا يخفّض إجهاد الحر على الشجيريات ومسارات المشي.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.landscapeGarden,
      alt: "حديقة فيلا مع نخيل وشجيريات في مناخ حار",
      caption: "النخيل والأكاسيا توفر ظلّاً طبيعياً يخفّض إجهاد الحر على بقية النباتات.",
    },
    {
      type: "h3",
      text: "نباتات موصى بها لفلل المدينة",
    },
    {
      type: "ul",
      items: [
        "نخيل التمر (Date palm): ظل، هوية محلية، صيانة معروفة.",
        "أكاسيا (Acacia): مقاومة للجفاف، مناسبة للحواجز الريحية.",
        "Bougainvillea: ألوان قوية، استهلاك مياه منخفض بعد التأسيس.",
        "Plumeria (Frangipani): زهر عطري، يحتاج drainage جيداً.",
        "Agave و succulents: للحدود ومناطق الزراعة في الحاويات.",
        "شجيريات محلية قليلة المياه بدلاً من عشب واسع.",
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "توفير المياه",
      text: "أنظمة الري بالتنقيط (drip) مع controller ذكي توفر 30–40% من استهلاك المياه مقارنة بالري اليدوي أو الرشّ العشوائي — وفق ممارسات FM وزراعة المناطق الجافة عالمياً.",
    },
    {
      type: "h2",
      text: "Hardscape قبل الزراعة — ترتيب التنفيذ",
    },
    {
      type: "p",
      text: "الخطأ الشائع: زراعة أولاً ثم تركيب البلاط أو pergola — فيُدمر الري والتربة. الترتيب الصحيح: grading و drainage، ثم hardscape (بلاط، walkways، retaining، pergola، إضاءة)، ثم شبكة الري، ثم التربة و mulching، وأخيراً الزراعة. خطّط الإضاءة الخارجية مع مهندس landscape من البداية — تمديد الكابلات بعد التشطيب أغلى.",
    },
    {
      type: "table",
      caption: "جدول zones الري — Madinah villa (liters/m²/week تقريبي)",
      headers: ["Zone", "نوع planting", "طريقة الري", "Liters/m²/week", "ملاحظات"],
      rows: [
        ["A", "Lawn (قلّل المساحة)", "Sprinkler / subsurface", "25–35", "أعلى استهلاك — restrict area"],
        ["B", "Shrubs & groundcover", "Drip line", "8–12", "Mulch 5–8 cm"],
        ["C", "Palms", "Bubbler / ring drip", "15–20", "Deep infrequent"],
        ["D", "Drought (agave, succulents)", "Drip point", "3–6", "Drainage critical"],
      ],
    },
    {
      type: "cta",
      lead: "تبحث عن شركة لاندسكيب في المدينة تفهم zones الري والhardscape؟",
      label: "تصفّح شركات اللاندسكيب في المدينة",
      href: "/request-quote?city=madinah&category=outdoor",
    },
    {
      type: "h2",
      text: "توقيت الري — الصباح الباكر والمساء",
    },
    {
      type: "p",
      text: "في صيف المدينة، الري منتصف النهار يهدر 40%+ من المياه بالتبخر. برمج controller للري بين 5–7 صباحاً أو بعد الغروب. قسّم zones حتى لا يُحمّل المضخة فوق طاقتها. راقب الضغط والـ emitters المسدودة شهرياً — تعطل التنقيط يقتل النباتات ببطء قبل أن تلاحظ.",
    },
    {
      type: "chart",
      caption: "استهلاك مياه شهري — حديقة 500 م² (مؤشر نسبي؛ ري يدوي = 100)",
      unit: "نقطة",
      items: [
        { label: "ري يدوي / hose", value: 100, max: 100 },
        { label: "Sprinkler timer بسيط", value: 82, max: 100 },
        { label: "Drip + smart controller", value: 62, max: 100 },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "ضمان 12 شهراً minimum",
      text: "اطلب ضماناً مكتوباً 12 شهراً على الزراعة ونظام الري — يشمل استبدال النباتات الميتة بسبب تركيب خاطئ (ليس إهمال ري بعد التسليم). الضمان الشفهي لا قيمة له.",
    },
    {
      type: "h3",
      text: "ما يجب أن يشمل عرض مقاول اللاندسكيب",
    },
    {
      type: "ol",
      items: [
        "Plant schedule بأسماء الأصناف والكميات.",
        "Irrigation plan: zones، emitters، controller model.",
        "Hardscape specs: نوع البلاط، الميل، drainage falls.",
        "Lighting layout + IP rating للتركيبات الخارجية.",
        "Maintenance visit schedule (السنة الأولى).",
        "Warranty terms: 12 months planting + irrigation.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.landscape,
      alt: "تنسيق خارجي متكامل لفيلا في المدينة المنورة",
      caption: "Hardscape، ري، وإضاءة مخطّطة معاً — لا كـ afterthought.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "نصيحة للمالك",
      text: "احتفظ بمخطط as-built للري وخريطة الصمامات — أي سباك أو gardener لاحقاً يحتاجها. صوّر كل zone قبل backfill.",
    },
    {
      type: "h2",
      text: "صيانة ما بعد التسليم",
    },
    {
      type: "p",
      text: "السنة الأولى حرجة: pruning للنخيل والأكاسيا، fertilization خفيف، وتعديل أوقات الري كل موسم. في المدينة، الشتاء قصير — ركّز على deep watering في الربيع قبل ذروة الحر. عقد صيانة landscape ربع سنوي أرخص من إعادة زراعة 30% من الحديقة بعد صيف قاسٍ.",
    },
    {
      type: "cta",
      lead: "جاهز لمشروع landscape يتحمل صيف المدينة ويوفر المياه؟",
      label: "اطلب عروضاً من شركات outdoor في المدينة",
      href: "/request-quote?city=madinah&category=outdoor",
    },
    {
      type: "sources",
      title: "مصادر ومراجع",
      items: [
        { label: "Ministry of Environment, Water and Agriculture (MEWA)", url: "https://www.mewa.gov.sa/en" },
        { label: "Saudi Irrigation Organization", url: "https://www.sio.gov.sa/en/Pages/default.aspx" },
        { label: "EPA WaterSense — Outdoor Water Use", url: "https://www.epa.gov/watersense/outdoor" },
        { label: "International Society of Arboriculture (ISA)", url: "https://www.isa-arbor.com/" },
      ],
    },
  ],
  blocksEn: [
    {
      type: "p",
      text: "Landscaping a villa in Madinah is not the same as a coastal Jeddah project: summers here are hotter and drier, and unplanned watering burns both budget and plants. This guide focuses on heat-tolerant local species (date palm, acacia, bougainvillea, plumeria, agave), drip irrigation saving 30–40% versus manual watering, execution order (hardscape before planting), irrigation zone schedules — and a minimum 12-month warranty on planting and irrigation.",
    },
    {
      type: "h2",
      text: "Madinah vs Jeddah climate — why plant choice matters",
    },
    {
      type: "p",
      text: "Jeddah benefits from coastal humidity; Madinah inland is drier with higher peak summer heat. A plant that “works in Jeddah” may fail here without shade and precise irrigation. Prefer drought-tolerant species with mulch layers, and reduce lawn area — the highest water consumer. Shade from palms and acacia lowers heat stress on shrubs and walkways.",
    },
    {
      type: "image",
      src: GUIDE_IMAGES.landscapeGarden,
      alt: "Villa garden with palms and shrubs in hot climate",
      caption: "Palms and acacia provide natural shade that reduces heat stress on understory plants.",
    },
    {
      type: "h3",
      text: "Recommended plants for Madinah villas",
    },
    {
      type: "ul",
      items: [
        "Date palm: shade, local identity, familiar maintenance.",
        "Acacia: drought hardy, suitable for windbreaks.",
        "Bougainvillea: strong color, low water after establishment.",
        "Plumeria (Frangipani): fragrant bloom, needs good drainage.",
        "Agave and succulents: for borders and planter zones.",
        "Low-water local shrubs instead of wide lawn areas.",
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "Water savings",
      text: "Drip irrigation with a smart controller saves 30–40% of water use compared with manual hose watering or random spray — consistent with arid-region landscaping and FM best practice.",
    },
    {
      type: "h2",
      text: "Hardscape before planting — execution order",
    },
    {
      type: "p",
      text: "A common mistake: plant first, then install tile or pergola — destroying irrigation and soil structure. Correct order: grading and drainage, then hardscape (tile, walkways, retaining, pergola, lighting), then irrigation network, then soil and mulch, finally planting. Plan exterior lighting with your landscape architect from day one — cabling after fit-out costs more.",
    },
    {
      type: "table",
      caption: "Irrigation zone schedule — Madinah villa (approx. liters/m²/week)",
      headers: ["Zone", "Planting type", "Irrigation method", "Liters/m²/week", "Notes"],
      rows: [
        ["A", "Lawn (minimize area)", "Sprinkler / subsurface", "25–35", "Highest use — restrict area"],
        ["B", "Shrubs & groundcover", "Drip line", "8–12", "5–8 cm mulch"],
        ["C", "Palms", "Bubbler / ring drip", "15–20", "Deep, infrequent"],
        ["D", "Drought (agave, succulents)", "Drip point", "3–6", "Drainage critical"],
      ],
    },
    {
      type: "cta",
      lead: "Looking for a Madinah landscaper who understands irrigation zones and hardscape?",
      label: "Browse landscaping firms in Madinah",
      href: "/request-quote?city=madinah&category=outdoor",
    },
    {
      type: "h2",
      text: "Watering timing — early morning and evening",
    },
    {
      type: "p",
      text: "In Madinah summer, midday watering wastes 40%+ to evaporation. Program controllers for 5–7 AM or after sunset. Split zones to avoid pump overload. Check pressure and clogged emitters monthly — failed drip kills plants slowly before you notice.",
    },
    {
      type: "chart",
      caption: "Monthly water use — 500 m² garden (relative index; manual = 100)",
      unit: "pts",
      items: [
        { label: "Manual / hose", value: 100, max: 100 },
        { label: "Basic sprinkler timer", value: 82, max: 100 },
        { label: "Drip + smart controller", value: 62, max: 100 },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "12-month warranty minimum",
      text: "Require a written 12-month warranty on planting and irrigation — covering replacement of dead plants due to faulty installation (not owner neglect after handover). Verbal guarantees have no value.",
    },
    {
      type: "h3",
      text: "What the landscaper proposal should include",
    },
    {
      type: "ol",
      items: [
        "Plant schedule with species names and quantities.",
        "Irrigation plan: zones, emitters, controller model.",
        "Hardscape specs: tile type, slope, drainage falls.",
        "Lighting layout + IP rating for exterior fixtures.",
        "Maintenance visit schedule (first year).",
        "Warranty terms: 12 months planting + irrigation.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.landscape,
      alt: "Integrated outdoor landscaping for a Madinah villa",
      caption: "Hardscape, irrigation, and lighting planned together — not as an afterthought.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Owner tip",
      text: "Keep the as-built irrigation plan and valve map — any future plumber or gardener will need them. Photograph each zone before backfill.",
    },
    {
      type: "h2",
      text: "Post-handover maintenance",
    },
    {
      type: "p",
      text: "Year one is critical: palm and acacia pruning, light fertilization, and seasonal irrigation adjustments. In Madinah, winter is short — focus on deep watering in spring before peak heat. A quarterly landscape maintenance contract costs less than replanting 30% of the garden after one harsh summer.",
    },
    {
      type: "cta",
      lead: "Ready for a landscape that survives Madinah summer and saves water?",
      label: "Request quotes from outdoor firms in Madinah",
      href: "/request-quote?city=madinah&category=outdoor",
    },
    {
      type: "sources",
      title: "Sources & references",
      items: [
        { label: "Ministry of Environment, Water and Agriculture (MEWA)", url: "https://www.mewa.gov.sa/en" },
        { label: "Saudi Irrigation Organization", url: "https://www.sio.gov.sa/en/Pages/default.aspx" },
        { label: "EPA WaterSense — Outdoor Water Use", url: "https://www.epa.gov/watersense/outdoor" },
        { label: "International Society of Arboriculture (ISA)", url: "https://www.isa-arbor.com/" },
      ],
    },
  ],
};
