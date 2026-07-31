import type { RuwaqGuide } from "@/content/guides/types";
import { guideCtaHref } from "@/content/guides/types";
import { GUIDE_IMAGES } from "@/content/marketing-images";

const meta = {
  slug: "marble-jeddah-climate",
  citySlug: "jeddah" as const,
  categorySlug: "luxury-materials" as const,
};

const ctaHref = guideCtaHref(meta);

export const marbleJeddahClimateGuide: RuwaqGuide = {
  ...meta,
  titleAr:
    "اختيار الرخام والجرانيت لفلل جدة: دليل شامل للمناخ الساحلي والملوحة والواجهات",
  titleEn:
    "Choosing Marble and Granite for Jeddah Villas: A Complete Guide to Coastal Climate, Salt Air, and Facades",
  excerptAr:
    "مناخ جدة الساحلي يفرض معايير مختلفة عن الداخل — من امتصاص الماء والملوحة إلى نظام الواجهة المتهوية. دليل عملي يساعدك على اختيار الخامة الصحيحة قبل الشراء.",
  excerptEn:
    "Jeddah's coastal climate demands different specs than interiors — from water absorption and salt corrosion to ventilated facade systems. A practical guide to choosing the right stone before you buy.",
  seoKeywordsAr: [
    "رخام فلل جدة الساحلية",
    "جرانيت مقاوم للملوحة جدة",
    "اختيار رخام الواجهات الخارجية جدة",
    "معالجة travertine للمناخ الرطب",
    "صيانة رخام Calacatta Carrara",
    "واجهة ventilated facade جدة",
    "موردي مواد فاخرة جدة",
    "نسبة امتصاص الماء للرخام الساحلي",
  ],
  seoKeywordsEn: [
    "marble selection Jeddah coastal villas",
    "salt-resistant granite Jeddah facades",
    "travertine sealing coastal climate",
    "Calacatta Carrara interior maintenance Jeddah",
    "ventilated facade stone cladding Saudi",
    "water absorption stone coastal humidity",
    "luxury stone suppliers Jeddah",
    "granite vs marble vs travertine comparison",
  ],
  readMinutes: 16,
  heroImage: GUIDE_IMAGES.marble,
  publishedAt: "2025-10-01",
  updatedAt: "2026-07-31",
  blocksAr: [
    {
      type: "h2",
      text: "لماذا يختلف اختيار الحجر في جدة عن المدن الداخلية؟",
    },
    {
      type: "p",
      text: "فلل جدة تقع على ساحل البحر الأحمر، حيث تجمع بين رطوبة مرتفعة نسبياً وهواء بحري محمّل بأملاح. هذه الظروف تؤثر مباشرة على عمر الرخام والجرانيت والtravertine — سواء في الواجهات الخارجية أو الأرضيات الداخلية القريبة من المداخل المفتوحة. قبل أن تتعاقد مع مورد المواد الفاخرة، من الضروري فهم كيف تتفاعل كل خامة مع الملوحة والرطوبة، وما هي معايير الامتصاص والمعالجة التي يجب أن تطلبها في المواصفات الفنية.",
    },
    {
      type: "callout",
      variant: "fact",
      title: "حقيقة علمية",
      text: "مراجع علمية في ScienceDirect تشير إلى أن الحجر ذو المسامية المنخفضة — مثل الجرانيت — يقاوم تآكل الأملاح البحرية بشكل أفضل من الرخام الناعم غير المعالج، خاصة في البيئات الساحلية.",
    },
    {
      type: "h2",
      text: "تأثير الملوحة والرطوبة على الحجر الطبيعي",
    },
    {
      type: "p",
      text: "الأملاح البحرية تتغلغل عبر المسام الدقيقة في سطح الحجر، وتتبلور عند التبخر وتولّد ضغطاً داخلياً يؤدي إلى تقشر الطبقة السطحية. في جدة، حيث تتكرر دورات الرطوبة والحرارة، هذه العملية تتسارع. الرطوبة العالية تزيد أيضاً من امتصاص الماء، ما يوسّع البقع ويضعف المعالجات السطحية إن لم تُجدَّد دورياً.",
    },
    {
      type: "h3",
      text: "معيار امتصاص الماء للبيئة الساحلية",
    },
    {
      type: "p",
      text: "للواجهات والاستخدام الخارجي في جدة، يُفضَّل أن تكون نسبة امتصاص الماء أقل من 0.5%. الجرانيت منخفض المسامية يحقق هذا المعيار بسهولة، بينما الرخام والtravertine قد يتجاوزان هذه النسبة ما لم يُختارا بعناية ويُعالجا بشكل احترافي.",
    },
    {
      type: "ul",
      items: [
        "الجرانيت: مسامية منخفضة، مقاومة ممتازة للملوحة، مناسب للواجهات والمدارج الخارجية.",
        "الرخام: جمال بصري عالٍ، يحتاج sealant دوري للخارج، ممتاز للداخل مع صيانة.",
        "الtravertine: مظهر دافئ، مسامية أعلى، يتطلب معالجة كل 6–12 شهراً للواجهات.",
        "الحجر الجيري: اقتصادي لكنه الأقل مقاومة للملوحة — تجنّبه في المناطق المعرّضة مباشرة للرذاذ البحري.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.marbleFacade,
      alt: "واجهة فيلا clad بالحجر الطبيعي في جدة",
      caption: "الواجهة الحجرية في جدة تحتاج نظام تثبيت ومعالجة يتناسب مع البيئة الساحلية.",
    },
    {
      type: "h2",
      text: "مقارنة الجرانيت والرخام والtravertine",
    },
    {
      type: "table",
      caption: "مقارنة خامات الحجر الطبيعي لفلل جدة",
      headers: ["المعيار", "الجرانيت", "الرخام", "Travertine"],
      rows: [
        ["امتصاص الماء", "أقل من 0.2%", "0.1–0.5%", "0.5–2%"],
        ["مقاومة الملوحة", "ممتازة", "متوسطة (مع معالجة)", "متوسطة إلى ضعيفة"],
        ["الاستخدام الخارجي", "مثالي", "محدود (مع sealant)", "ممكن مع صيانة دورية"],
        ["الاستخدام الداخلي", "ممتاز", "ممتاز (Calacatta/Carrara)", "ممتاز للأرضيات والجدران"],
        ["تكرار المعالجة الخارجية", "كل 2–3 سنوات", "كل 6–12 شهر", "كل 6–12 شهر"],
        ["نطاق السعر (تقريبي)", "متوسط–مرتفع", "مرتفع–فاخر", "متوسط"],
      ],
    },
    {
      type: "chart",
      caption: "نسبة امتصاص الماء (% — كلما انخفضت كان أفضل للساحل)",
      unit: "%",
      items: [
        { label: "جرانيت", value: 0.15, max: 2 },
        { label: "رخام", value: 0.35, max: 2 },
        { label: "Travertine", value: 1.2, max: 2 },
      ],
    },
    {
      type: "h2",
      text: "الواجهات الخارجية: نظام Ventilated Facade",
    },
    {
      type: "p",
      text: "أفضل ممارسة لواجهات فلل جدة هي نظام الواجهة المتهوية (ventilated facade) — طبقة حجرية خارجية مع فجوة هوائية بينها وبين جدار العزل. هذه الفجوة تسمح بتصريف الرطوبة وتقليل انتقال الحرارة، وتمنع تراكم الأملاح خلف اللوح مباشرة. التثبيت يجب أن يستخدم مراسي من فولاذ AISI 316 المقاوم للتآكل، وليس الفولاذ الكربوني العادي الذي يصدأ بسرعة في البيئة الساحلية.",
    },
    {
      type: "ol",
      items: [
        "تأكد من وجود طبقة عزل مائي (waterproofing membrane) خلف نظام التثبيت.",
        "استخدم مراسي AISI 316 مع حساب الأحمال وفق وزن اللوح وسرعة الرياح الساحلية.",
        "اترك فجوة تهوية لا تقل عن 2–4 سم بين الحجر والعزل.",
        "صمّم نقاط تصريف في أسفل الواجهة لمنع تجمع المياه.",
        "اطلب شهادة اختبار للحجر من المورد يتضمن نسبة امتصاص الماء.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "تحذير",
      text: "تركيب رخام ناعم غير معالج مباشرة على واجهة معرّضة للرذاذ البحري — بدون واجهة متهوية وبدون معالجة سطحية — يؤدي غالباً إلى تقشّر وتغيّر لون خلال 18–24 شهراً في جدة.",
    },
    {
      type: "h2",
      text: "الاستخدام الداخلي: Calacatta و Carrara والمجالس",
    },
    {
      type: "p",
      text: "داخل الفيلا، حيث لا تتعرض الأسطح مباشرة للملوحة، يبرز جمال الرخام الناعم. Calacatta و Carrara يعملان بشكل ممتاز في المجالس ومداخل الفلل والدرج الداخلي. المفتاح هو الصيانة الوقائية: تنظيف فوري للانسكابات، استخدام sealant مناسب للداخل، وتجنّب المنظفات الحمضية.",
    },
    {
      type: "ul",
      items: [
        "الأرضيات: Calacatta/Carrara مع sealant impregnating قبل التركيب.",
        "الجدران: slabs كبيرة مع فواصل قليلة لإطلالة فاخرة.",
        "الدرج: حافة rounded أو chamfered لتقليل الكسر عند الاستخدام اليومي.",
        "الحمامات: تجنّب الرخام الناعم في أرضيات الدش ما لم يُعالج بمعالج م specialized للرطوبة.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.marbleInterior,
      alt: "رخام Calacatta في مجلس داخلي بفيلا جدة",
      caption: "الرخام الداخلي في جدة يتطلب صيانة دورية لكنه يقدّم أعلى قيمة جمالية.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "نصيحة من رواق",
      text: "اطلب sample board بحجم 30×30 سم على الأقل، وضعه في موقع المشروع لمدة أسبوعين — بجانب المدخل أو الشرفة — لترى كيف يتفاعل اللون مع الضوء الطبيعي والرطوبة قبل أمر الشراء الكامل.",
    },
    {
      type: "h2",
      text: "جدول الصيانة للحجر في المناخ الساحلي",
    },
    {
      type: "p",
      text: "الصيانة ليست اختيارية في جدة — هي جزء من تكلفة امتلاك الحجر. بدون جدول صيانة واضح، حتى أفضل خامة ستفقد بريقها وتتدهور قبل الأوان.",
    },
    {
      type: "ol",
      items: [
        "الواجهات الخارجية (travertine/marble): إعادة sealant كل 6–12 شهر.",
        "الواجهات الخارجية (granite): فحص سنوي وإعادة sealant كل 2–3 سنوات.",
        "الأرضيات الداخلية: تنظيف pH-neutral يومي، sealant كل 12–18 شهر.",
        "فحص المراسي: مرة سنوياً للواجهات المتهوية — خاصة AISI 316.",
        "تنظيف الملوحة: شطف بالماء العذب بعد العواصف الرملية أو الرذاذ البحري.",
      ],
    },
    {
      type: "cta",
      lead: "تبحث عن مورد موثوق للرخام والجرانيت في جدة؟",
      label: "تصفّح موردي المواد الفاخرة في جدة",
      href: ctaHref,
    },
    {
      type: "h2",
      text: "خطوات الشراء الذكية قبل التعاقد",
    },
    {
      type: "p",
      text: "عند التعامل مع موردي المواد الفاخرة في جدة، تأكد أن العرض يتضمن: مواصفات فنية للحجر (نوع، منشأ، امتصاص ماء)، خطة معالجة و sealant، نظام تثبيت للواجهات، وضمان على التوريد. قارن بين 3 موردين على الأقل، واطلب زيارة مشروع منفّذ سابقاً في منطقة ساحلية مشابهة.",
    },
    {
      type: "ul",
      items: [
        "اطلب شهادة اختبار امتصاص الماء (ASTM C97 أو معادل).",
        "حدّد نظام التثبيت (ventilated vs. direct bond) في العقد.",
        "اشترط sample approval قبل بدء القص والتوريد.",
        "وثّق لون وعروق كل batch في محضر استلام.",
      ],
    },
    {
      type: "cta",
      lead: "جاهز لمقارنة عروض موردي الحجر في جدة؟",
      label: "ابدأ من دليل المواد الفاخرة",
      href: ctaHref,
    },
    {
      type: "sources",
      title: "المصادر",
      items: [
        {
          label: "ScienceDirect — Salt weathering and durability of natural stone in marine environments",
          url: "https://www.sciencedirect.com/science/article/abs/pii/S0263261116303867",
        },
        {
          label: "ASTM C97 — Standard Test Methods for Absorption and Bulk Specific Gravity of Dimension Stone",
          url: "https://www.astm.org/c0097-18.html",
        },
        {
          label: "Natural Stone Institute — Exterior Stone Cladding Best Practices",
          url: "https://www.naturalstoneinstitute.org/default/assets/File/consumers/exterior_cladding.pdf",
        },
        {
          label: "European Commission — Ventilated Facade Systems Technical Guide",
          url: "https://ec.europa.eu/growth/sectors/construction/product-regulation_en",
        },
      ],
    },
  ],
  blocksEn: [
    {
      type: "h2",
      text: "Why Stone Selection in Jeddah Differs from Inland Cities",
    },
    {
      type: "p",
      text: "Jeddah villas sit on the Red Sea coast, where relatively high humidity meets salt-laden marine air. These conditions directly affect the lifespan of marble, granite, and travertine — whether on exterior facades or interior floors near open entryways. Before contracting with a luxury materials supplier, you need to understand how each stone reacts to salt and moisture, and which absorption and treatment standards to specify in your technical documents.",
    },
    {
      type: "callout",
      variant: "fact",
      title: "Research insight",
      text: "ScienceDirect reviews on marine salt exposure show that low-porosity stone — particularly granite — resists salt corrosion far better than untreated soft marble in coastal environments.",
    },
    {
      type: "h2",
      text: "How Salt Air and Humidity Affect Natural Stone",
    },
    {
      type: "p",
      text: "Marine salts penetrate fine surface pores, crystallise during evaporation, and generate internal pressure that spalls the face of the stone. In Jeddah, where humidity and heat cycles repeat year-round, this process accelerates. High humidity also increases water absorption, spreading stains and weakening surface treatments unless they are renewed on schedule.",
    },
    {
      type: "h3",
      text: "The 0.5% Water Absorption Benchmark for Coastal Use",
    },
    {
      type: "p",
      text: "For exterior cladding and outdoor applications in Jeddah, water absorption should ideally stay below 0.5%. Low-porosity granite meets this threshold easily, while marble and travertine may exceed it unless carefully selected and professionally treated.",
    },
    {
      type: "ul",
      items: [
        "Granite: low porosity, excellent salt resistance, ideal for facades and external steps.",
        "Marble: high visual appeal, needs periodic sealant outdoors, excellent indoors with maintenance.",
        "Travertine: warm aesthetic, higher porosity, requires sealing every 6–12 months on exteriors.",
        "Limestone: economical but least salt-resistant — avoid in zones directly exposed to sea spray.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.marbleFacade,
      alt: "Natural stone clad villa facade in Jeddah",
      caption: "Stone facades in Jeddah need fixing systems and treatments matched to the coastal environment.",
    },
    {
      type: "h2",
      text: "Granite vs Marble vs Travertine: Side-by-Side",
    },
    {
      type: "table",
      caption: "Natural stone comparison for Jeddah villas",
      headers: ["Criterion", "Granite", "Marble", "Travertine"],
      rows: [
        ["Water absorption", "Below 0.2%", "0.1–0.5%", "0.5–2%"],
        ["Salt resistance", "Excellent", "Moderate (with treatment)", "Moderate to low"],
        ["Exterior use", "Ideal", "Limited (with sealant)", "Possible with regular maintenance"],
        ["Interior use", "Excellent", "Excellent (Calacatta/Carrara)", "Excellent for floors and walls"],
        ["Exterior reseal interval", "Every 2–3 years", "Every 6–12 months", "Every 6–12 months"],
        ["Price range (approx.)", "Mid–high", "High–luxury", "Mid-range"],
      ],
    },
    {
      type: "chart",
      caption: "Water absorption rate (% — lower is better for coastal Jeddah)",
      unit: "%",
      items: [
        { label: "Granite", value: 0.15, max: 2 },
        { label: "Marble", value: 0.35, max: 2 },
        { label: "Travertine", value: 1.2, max: 2 },
      ],
    },
    {
      type: "h2",
      text: "Exterior Facades: Ventilated Cladding Systems",
    },
    {
      type: "p",
      text: "Best practice for Jeddah villa facades is a ventilated cladding system — a stone outer layer with an air gap between it and the insulation board behind. This cavity allows moisture to drain and reduces heat transfer, while preventing salt from sitting directly against the structural wall. Fixings must use AISI 316 stainless steel anchors, not standard carbon steel that rusts quickly in coastal air.",
    },
    {
      type: "ol",
      items: [
        "Confirm a waterproofing membrane sits behind the fixing subframe.",
        "Specify AISI 316 anchors sized for panel weight and coastal wind loads.",
        "Maintain a 2–4 cm ventilation cavity between stone and insulation.",
        "Design drainage points at the base of each facade zone.",
        "Request supplier test certificates including water absorption data.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Warning",
      text: "Installing untreated soft marble directly on a sea-exposed facade — without ventilated cladding and sealant — typically leads to spalling and colour shift within 18–24 months in Jeddah.",
    },
    {
      type: "h2",
      text: "Interiors: Calacatta, Carrara, and Majlis Spaces",
    },
    {
      type: "p",
      text: "Inside the villa, where surfaces are shielded from salt, soft marble shines. Calacatta and Carrara work beautifully in majlis rooms, entry halls, and internal staircases. The key is preventive care: wipe spills promptly, apply the right impregnating sealant, and avoid acidic cleaners that etch the surface.",
    },
    {
      type: "ul",
      items: [
        "Floors: Calacatta/Carrara with impregnating sealant applied before installation.",
        "Walls: large-format slabs with minimal joints for a seamless luxury look.",
        "Stairs: rounded or chamfered nosing to reduce chip risk in daily use.",
        "Bathrooms: avoid soft marble on shower floors unless treated with a moisture-specific sealant.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.marbleInterior,
      alt: "Calacatta marble in a Jeddah villa majlis interior",
      caption: "Interior marble in Jeddah delivers the highest aesthetic value with scheduled maintenance.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Ruwaq tip",
      text: "Request a sample board at least 30×30 cm and place it on-site for two weeks — near the entry or a balcony — to see how the colour responds to natural light and humidity before placing the full order.",
    },
    {
      type: "h2",
      text: "Maintenance Schedule for Coastal Stone",
    },
    {
      type: "p",
      text: "Maintenance is not optional in Jeddah — it is part of the cost of owning stone. Without a clear schedule, even the best material will dull and degrade ahead of its time.",
    },
    {
      type: "ol",
      items: [
        "Exterior travertine/marble: reseal every 6–12 months.",
        "Exterior granite: annual inspection, reseal every 2–3 years.",
        "Interior floors: pH-neutral daily cleaning, reseal every 12–18 months.",
        "Fixing inspection: annual check on ventilated facades — especially AISI 316 anchors.",
        "Salt rinse: fresh-water wash after sandstorms or heavy sea spray.",
      ],
    },
    {
      type: "cta",
      lead: "Looking for a verified marble and granite supplier in Jeddah?",
      label: "Browse luxury material suppliers in Jeddah",
      href: ctaHref,
    },
    {
      type: "h2",
      text: "Smart Procurement Steps Before You Sign",
    },
    {
      type: "p",
      text: "When dealing with luxury material suppliers in Jeddah, ensure the proposal includes: technical stone specs (type, origin, absorption rate), a sealant and treatment plan, a facade fixing system, and supply warranty. Compare at least three suppliers and ask to visit a completed project in a similar coastal zone.",
    },
    {
      type: "ul",
      items: [
        "Request water absorption test certificates (ASTM C97 or equivalent).",
        "Define the fixing system (ventilated vs. direct bond) in the contract.",
        "Require sample approval before cutting and delivery begins.",
        "Document colour and vein pattern of each batch in a sign-off log.",
      ],
    },
    {
      type: "cta",
      lead: "Ready to compare stone supplier proposals in Jeddah?",
      label: "Start from the luxury materials directory",
      href: ctaHref,
    },
    {
      type: "sources",
      title: "Sources",
      items: [
        {
          label: "ScienceDirect — Salt weathering and durability of natural stone in marine environments",
          url: "https://www.sciencedirect.com/science/article/abs/pii/S0263261116303867",
        },
        {
          label: "ASTM C97 — Standard Test Methods for Absorption and Bulk Specific Gravity of Dimension Stone",
          url: "https://www.astm.org/c0097-18.html",
        },
        {
          label: "Natural Stone Institute — Exterior Stone Cladding Best Practices",
          url: "https://www.naturalstoneinstitute.org/default/assets/File/consumers/exterior_cladding.pdf",
        },
        {
          label: "European Commission — Ventilated Facade Systems Technical Guide",
          url: "https://ec.europa.eu/growth/sectors/construction/product-regulation_en",
        },
      ],
    },
  ],
};
