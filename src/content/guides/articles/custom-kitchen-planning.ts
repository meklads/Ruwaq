import type { RuwaqGuide } from "@/content/guides/types";
import { guideCtaHref } from "@/content/guides/types";
import { GUIDE_IMAGES } from "@/content/marketing-images";

const meta = {
  slug: "custom-kitchen-planning",
  citySlug: "jeddah" as const,
  categorySlug: "kitchens" as const,
};

const ctaHref = guideCtaHref(meta);

export const customKitchenPlanningGuide: RuwaqGuide = {
  ...meta,
  titleAr:
    "تخطيط المطبخ المخصص للفيلا السعودية: من المطبخ الرئيسي والفرن إلى zones العمل وMEP",
  titleEn:
    "Custom Kitchen Planning for Saudi Villas: Main Kitchen, Dirty Kitchen, Work Zones, and MEP Coordination",
  excerptAr:
    "المطبخ الفاخر في الفيلا السعودية أكثر من مثلث عمل — main kitchen وdirty kitchen وpantry وservice loop. دليل يربط التخطيط بالتشطيب قبل الجبس.",
  excerptEn:
    "A luxury villa kitchen in Saudi Arabia is more than a work triangle — main kitchen, dirty kitchen, pantry, and service loop all matter. A guide that ties planning to fit-out before gypsum closes.",
  seoKeywordsAr: [
    "تخطيط مطبخ مخصص فيلا سعودية",
    "مطبخ رئيسي ومطبخ خدمة جدة",
    "zones العمل مطبخ 2026",
    "تنسيق MEP قبل الجبس مطبخ",
    "عرض aisles مطبخ فاخر 1.2 م",
    "HPL MDF مطابخ الرطوبة",
    "3D render مطبخ قبل التصنيع",
    "استوديو مطابخ معتمد جدة",
  ],
  seoKeywordsEn: [
    "custom kitchen planning Saudi villa",
    "main kitchen dirty kitchen Jeddah",
    "kitchen work zones 2026 design",
    "MEP coordination before gypsum kitchen",
    "luxury kitchen aisle width 1.2m",
    "HPL MDF humidity kitchen joinery",
    "3D kitchen render before manufacture",
    "verified kitchen studio Jeddah",
  ],
  readMinutes: 16,
  heroImage: GUIDE_IMAGES.kitchen,
  publishedAt: "2025-09-10",
  updatedAt: "2026-07-31",
  blocksAr: [
    {
      type: "h2",
      text: "المطبخ في الفيلا السعودية: أكثر من غرفة واحدة",
    },
    {
      type: "p",
      text: "في الفلل السعودية الفاخرة، المطبخ ليس مساحة واحدة — بل نظام من المطبخ الرئيسي حيث يُعرض الطعام ويُستقبل الضيوف، والمطبخ الخلفي (dirty kitchen) حيث يحدث الطبخ الفعلي والتنظيف الثقيلة، ومخزن جاف (pantry)، وممر خدمة يربطها بباقي الفيلا. هذا التقسيم يحافظ على أناقة المطبخ الأمامي ويعزل الروائح والحرارة. التخطيط يبدأ قبل أعمال التشطيب — أي تغيير بعد الجبس مكلف.",
    },
    {
      type: "callout",
      variant: "fact",
      title: "اتجاه 2026",
      text: "House Beautiful ومصمّمو المطابخ العالميون يتحولون من «مثلث العمل» الكلاسيكي (ثلاجة–حوض–موقد) إلى مناطق عمل متخصصة: تحضير، طبخ، تنظيف، وتخزين — كل منطقة بمعدات وإضاءة مخصصة.",
    },
    {
      type: "h2",
      text: "تخطيط المساحات: Main Kitchen و Dirty Kitchen و Pantry",
    },
    {
      type: "p",
      text: "المطبخ الرئيسي يطل غالباً على غرفة الطعام أو مجلس مفتوح — يحتاج جزيرة أو شبه جزيرة، تشطيبات فاخرة، وربما عرض للنبيذ. المطبخ الخلفي يوضع خلف جدار أو في جناح منفصل — فيه موقد كبير، شفاط قوي، حوض عميق، ومساحة تحضير. المخزن يربط بينهما للتخزين الجاف والأجهزة الصغيرة.",
    },
    {
      type: "ul",
      items: [
        "Main kitchen: عرض، island، finishes ظاهرة — رخام، خشب solid، إضاءة accent.",
        "Dirty kitchen: طبخ فعلي، hood 1200+ m³/h، sink كبير، easy-clean surfaces.",
        "Pantry: shelves للمواد الجافة، microwave، coffee station.",
        "Service loop: ممر 1.1–1.2 م يربط المطبخ بالمخزن ومدخل الخدمة.",
        "Utility: غسالة، مجفف — ideally في dirty kitchen أو adjacent room.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.kitchen,
      alt: "مطبخ مخصص فاخر في فيلا سعودية",
      caption: "المطبخ الرئيسي في الفيلا السعودية يجمع بين العرض والوظيفة — التخطيط يبدأ مبكراً.",
    },
    {
      type: "h2",
      text: "مناطق العمل بدلاً من المثلث الكلاسيكي",
    },
    {
      type: "p",
      text: "مثلث العمل (ثلاجة–حوض–موقد) لا يزال مفيداً لكنه غير كافٍ للمطابخ الكبيرة. مناطق العمل الحديثة تقسم المطبخ إلى مناطق وظيفية، كل منطقة بمسافات ومعدات محددة. في فيلا 40+ م² مطبخ، هذا النهج يقلل التداخل ويسرّع سير العمل.",
    },
    {
      type: "table",
      caption: "Zones العمل في المطبخ المخصص",
      headers: ["Zone", "المكونات", "Clearance موصى", "ملاحظات"],
      rows: [
        ["Prep", "Island أو counter، cutting board storage", "90 cm أمام counter", "إضاءة task فوق counter"],
        ["Cooking", "Range/cooktop، hood، spices", "90 cm أمام، 60 cm جانبي", "Gas point و electrical منفصلان"],
        ["Clean-up", "Sink، dishwasher، waste", "90 cm أمام sink", "Drainage slope 2% minimum"],
        ["Storage", "Pantry، fridge، base cabinets", "90 cm أمام doors", "Pull-out shelves للعمق"],
        ["Display", "Island seating، open shelves", "1.1 m aisle minimum", "Main kitchen فقط"],
      ],
    },
    {
      type: "h3",
      text: "عرض الممرات والممرات الخدمية",
    },
    {
      type: "p",
      text: "في المطابخ الفاخرة، عرض الممر بين الكونترات المتوازية يجب أن يكون 1.1–1.3 م — ليتسنى لشخصين العمل معاً. ممرات الخدمة التي تربط المطبخ بباقي الفيلا: 1.1–1.2 م كحد أدنى. أقل من ذلك يخلق ازدحاماً عند المناسبات الكبيرة.",
    },
    {
      type: "ol",
      items: [
        "Aisles رئيسية (parallel counters): 1.2–1.3 ideal.",
        "Aisles بجانب island: 1.1 م minimum، 1.2 م أفضل.",
        "Service corridors: 1.1–1.2 م — لا تقل عن 1.0 م.",
        "Door swings: account لـ 90 cm clearance عند فتح cabinet doors.",
        "Wheelchair/access: 1.5 م إذا مطلوب — نادر في فلل لكن worth noting.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "نصيحة",
      text: "ضع الثلاجة في منطقة التحضير — ليس في زاوية نائية — لتقليل خطوات بين التخزين والتحضير. في المطبخ الخلفي، ثلاجة ثانية اختيارية للمكونات كثيرة الاستخدام.",
    },
    {
      type: "h2",
      text: "MEP قبل الجبس: التنسيق الحاسم",
    },
    {
      type: "p",
      text: "خطأ مكلف: تصنيع وتركيب الخزائن قبل تأكيد نقاط MEP. خط الغاز، إمداد المياه، الصرف، ومخارج الكهرباء يجب أن تُحدَّد في shop drawings وتُنفَّذ قبل إغلاق الجبس للسقف والجدران. استوديو المطبخ ينسق مع مقاول التشطيب — وليس العكس.",
    },
    {
      type: "ul",
      items: [
        "Gas: point لل range/cooktop + spare لل outdoor grill إن وجد.",
        "Water: hot/cold لكل sink — main و dirty kitchen منفصلان.",
        "Drainage: slope 2% minimum، grease trap في dirty kitchen.",
        "Power: dedicated circuits لل oven، fridge، dishwasher — 16A minimum.",
        "Hood duct: route to exterior قبل ceiling close — لا recirculating في dirty kitchen.",
        "Data: smart appliances، under-cabinet lighting circuits.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.kitchenPlan,
      alt: "مخطط مطبخ 3D مع zones العمل",
      caption: "Shop drawings تُظهر نقاط MEP و zones قبل بدء التصنيع — التعديل بعد الإنتاج مكلف.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "تحذير",
      text: "تغيير موقع الحوض أو الموقد بعد تصنيع الخزائن يكلّف 30–50% من قيمة المطبخ في أوامر تغيير. ثبّت التخطيط قبل اعتماد shop drawings.",
    },
    {
      type: "h2",
      text: "اختيار الخامات: رطوبة جدة و finishes",
    },
    {
      type: "p",
      text: "رطوبة جدة الساحلية تؤثر على الخشبيات. MDF مغلف HPL (High Pressure Laminate) مقاوم للرطوبة — ideal للخزائن السفلية والمطبخ الخلفي. الخشب الصلب — بلوط، جوز — جميل للجزيرة والواجهات الظاهرة في المطبخ الرئيسي، مع معالجة سطحية مناسبة. الكونترات: quartz أو engineered stone للمتانة، رخام طبيعي لمناطق العرض مع sealant.",
    },
    {
      type: "table",
      caption: "خامات Joinery للمطابخ في جدة",
      headers: ["الخامة", "الاستخدام", "مقاومة الرطوبة", "الصيانة"],
      rows: [
        ["MDF + HPL", "Base cabinets، dirty kitchen", "ممتازة", "مسح routine"],
        ["Solid wood", "Island، visible panels", "جيدة (مع sealant)", "Reseal كل 2–3 سنوات"],
        ["Plywood + veneer", "Mid-range option", "جيدة", "Moderate"],
        ["Quartz countertop", "All zones", "ممتازة", "Minimal"],
        ["Natural marble", "Main kitchen display", "Moderate", "Sealant سنوي"],
      ],
    },
    {
      type: "chart",
      caption: "مقاومة الرطوبة النسبية (100 = الأفضل)",
      unit: "نقطة",
      items: [
        { label: "MDF + HPL", value: 95, max: 100 },
        { label: "Quartz", value: 98, max: 100 },
        { label: "Solid wood (sealed)", value: 75, max: 100 },
        { label: "Marble", value: 60, max: 100 },
      ],
    },
    {
      type: "h2",
      text: "3D Render و Sample قبل التصنيع",
    },
    {
      type: "p",
      text: "قبل أي cutting في المصنع، اطلب: 3D render photorealistic يُظهر materials و lighting و appliances، و physical sample لـ door finish و countertop edge. Sign-off على render + sample = contract milestone. أي change بعد ذلك = variation order ب cost و delay.",
    },
    {
      type: "ol",
      items: [
        "3D render: all elevations + island view + dirty kitchen layout.",
        "Sample board: door finish، handle، countertop 20×20 cm minimum.",
        "Appliance specs: confirm dimensions fit في cabinet openings.",
        "Lighting plan: task + ambient + accent — coordinated مع render.",
        "Written sign-off: owner + designer + kitchen studio — dated.",
      ],
    },
    {
      type: "cta",
      lead: "تبحث عن استوديو مطابخ معتمد في جدة؟",
      label: "استوديوهات المطابخ في جدة",
      href: ctaHref,
    },
    {
      type: "h2",
      text: "Timeline التخطيط إلى التركيب",
    },
    {
      type: "p",
      text: "مطبخ مخصص quality يأخذ 12–16 أسبوع من sign-off إلى install. التخطيط مع fit-out ي overlap — MEP في week 1–4، manufacture week 5–12، install بعد flooring و before final paint.",
    },
    {
      type: "ul",
      items: [
        "Week 1–2: Brief، measure، concept layout.",
        "Week 3–4: Shop drawings + MEP coordination + sign-off.",
        "Week 5–12: Manufacture (lead time varies by studio).",
        "Week 13–14: Delivery، install carcasses، connect MEP.",
        "Week 15–16: Countertop template/install، appliances، snagging.",
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "في رواق",
      text: "استوديوهات المطابخ المعتمدة في دليل رواق تقدّم proposals موحّدة — shop drawings، timeline، و warranty — يسهّل الم comparison بين 3 studios قبل القرار.",
    },
    {
      type: "h2",
      text: "Checklist قبل التعاقد",
    },
    {
      type: "p",
      text: "قبل التوقيع مع استوديو المطبخ، تأكد أن العرض يتضمن: layout للمطبخ الرئيسي والخلفي، shop drawings مع نقاط MEP، 3D render، milestone لاعتماد العينات، ضمان على الخشبيات (5+ سنوات) والhardware (2+ سنوات)، وجدول تركيب مكتوباً.",
    },
    {
      type: "ol",
      items: [
        "Compare 3 studios — same brief، same appliance list.",
        "Visit completed project — check alignment، soft-close، finishes.",
        "Confirm who coordinates MEP — studio or fit-out contractor.",
        "Clarify variation process و cost per change order.",
        "Request maintenance guide لـ finishes و sealant schedule.",
      ],
    },
    {
      type: "cta",
      lead: "جاهز لمقارنة عروض المطابخ في جدة؟",
      label: "ابدأ من دليل استوديوهات المطابخ",
      href: ctaHref,
    },
    {
      type: "sources",
      title: "المصادر",
      items: [
        {
          label: "House Beautiful — Kitchen Work Zones Replace the Triangle (2026)",
          url: "https://www.housebeautiful.com/room-decorating/kitchens/a62845644/kitchen-work-zones-2026/",
        },
        {
          label: "NKBA — Kitchen Planning Guidelines (Clearances & Aisle Widths)",
          url: "https://nkba.org/planning-guidelines/",
        },
        {
          label: "AWI — Architectural Woodwork Standards for Casework",
          url: "https://www.awinet.org/standards/",
        },
        {
          label: "Saudi Building Code — Mechanical & Plumbing Requirements for Residential Kitchens",
          url: "https://sbc.gov.sa/en/Pages/default.aspx",
        },
      ],
    },
  ],
  blocksEn: [
    {
      type: "h2",
      text: "The Kitchen in a Saudi Villa: More Than One Room",
    },
    {
      type: "p",
      text: "In luxury Saudi villas, the kitchen is not a single space — it is a system of main kitchen (where food is presented and guests gather), dirty kitchen (where heavy cooking and cleaning happen), pantry for dry storage, and a service loop linking them via back-of-house corridors. This split keeps the front kitchen elegant while isolating odours and heat. Planning starts before fit-out — any change after gypsum is expensive.",
    },
    {
      type: "callout",
      variant: "fact",
      title: "2026 design shift",
      text: "House Beautiful and leading kitchen designers are moving beyond the classic work triangle (fridge–sink–cooktop) toward dedicated work zones: prep, cooking, clean-up, and storage — each with its own equipment and lighting.",
    },
    {
      type: "h2",
      text: "Space Planning: Main Kitchen, Dirty Kitchen, Pantry",
    },
    {
      type: "p",
      text: "The main kitchen typically faces the dining room or open majlis — it needs an island or peninsula, premium finishes, and perhaps wine display. The dirty kitchen sits behind a wall or in a separate wing — with a large range, powerful hood, deep sink, and prep space. The pantry connects both for dry storage and small appliances.",
    },
    {
      type: "ul",
      items: [
        "Main kitchen: display, island, visible finishes — marble, solid wood, accent lighting.",
        "Dirty kitchen: actual cooking, 1200+ m³/h hood, large sink, easy-clean surfaces.",
        "Pantry: dry goods shelving, microwave, coffee station.",
        "Service loop: 1.1–1.2 m corridor linking kitchen to store and service entry.",
        "Utility: washer, dryer — ideally in dirty kitchen or adjacent room.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.kitchen,
      alt: "Custom luxury kitchen in a Saudi villa",
      caption: "The main kitchen in a Saudi villa blends display and function — planning starts early.",
    },
    {
      type: "h2",
      text: "Work Zones Instead of the Classic Triangle",
    },
    {
      type: "p",
      text: "The work triangle (fridge–sink–cooktop) remains useful but is insufficient for large kitchens. Modern work zones divide the space into functional areas, each with defined clearances and equipment. In a 40+ sqm villa kitchen, this approach reduces crossover and speeds workflow.",
    },
    {
      type: "table",
      caption: "Work zones in a custom kitchen",
      headers: ["Zone", "Components", "Recommended clearance", "Notes"],
      rows: [
        ["Prep", "Island or counter, cutting board storage", "90 cm in front of counter", "Task lighting above counter"],
        ["Cooking", "Range/cooktop, hood, spices", "90 cm front, 60 cm side", "Separate gas and electrical points"],
        ["Clean-up", "Sink, dishwasher, waste", "90 cm in front of sink", "Drainage slope 2% minimum"],
        ["Storage", "Pantry, fridge, base cabinets", "90 cm in front of doors", "Pull-out shelves for depth"],
        ["Display", "Island seating, open shelves", "1.1 m aisle minimum", "Main kitchen only"],
      ],
    },
    {
      type: "h3",
      text: "Aisle Widths and Service Corridors",
    },
    {
      type: "p",
      text: "In luxury kitchens, aisle width between parallel counters should be 1.1–1.3 m — allowing two people to work simultaneously. Service corridors connecting the kitchen to the rest of the villa: 1.1–1.2 m minimum. Less creates bottlenecks during large events.",
    },
    {
      type: "ol",
      items: [
        "Primary aisles (parallel counters): 1.2–1.3 m ideal.",
        "Aisles beside island: 1.1 m minimum, 1.2 m preferred.",
        "Service corridors: 1.1–1.2 m — never below 1.0 m.",
        "Door swings: allow 90 cm clearance when cabinet doors open.",
        "Access needs: 1.5 m if required — rare in villas but worth noting.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Tip",
      text: "Place the fridge in the prep zone — not in a distant corner — to cut steps between storage and preparation. A second fridge in the dirty kitchen is optional for heavy-use ingredients.",
    },
    {
      type: "h2",
      text: "MEP Before Gypsum: Critical Coordination",
    },
    {
      type: "p",
      text: "The costly mistake: manufacturing and installing cabinets before MEP points are confirmed. Gas line, water supply, drainage, and power outlets must be fixed in shop drawings and executed before gypsum board closes ceilings and walls. The kitchen studio coordinates with the fit-out contractor — not the other way around.",
    },
    {
      type: "ul",
      items: [
        "Gas: point for range/cooktop plus spare for outdoor grill if planned.",
        "Water: hot/cold to each sink — main and dirty kitchen separate.",
        "Drainage: 2% minimum slope, grease trap in dirty kitchen.",
        "Power: dedicated circuits for oven, fridge, dishwasher — 16A minimum.",
        "Hood duct: route to exterior before ceiling close — no recirculating in dirty kitchen.",
        "Data: smart appliances, under-cabinet lighting circuits.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.kitchenPlan,
      alt: "3D kitchen plan showing work zones and MEP points",
      caption: "Shop drawings show MEP points and zones before manufacture — post-production changes are costly.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Warning",
      text: "Moving a sink or range after cabinets are manufactured typically costs 30–50% of the kitchen value in variations. Freeze the layout before shop drawing sign-off.",
    },
    {
      type: "h2",
      text: "Material Selection: Jeddah Humidity and Finishes",
    },
    {
      type: "p",
      text: "Jeddah's coastal humidity affects joinery. HPL-coated MDF resists moisture — ideal for base cabinets and the dirty kitchen. Solid wood — oak, walnut — suits islands and visible panels in the main kitchen, with proper sealant. Countertops: quartz or engineered stone for durability, natural marble for display areas with sealant.",
    },
    {
      type: "table",
      caption: "Joinery materials for Jeddah kitchens",
      headers: ["Material", "Use", "Humidity resistance", "Maintenance"],
      rows: [
        ["MDF + HPL", "Base cabinets, dirty kitchen", "Excellent", "Routine wipe"],
        ["Solid wood", "Island, visible panels", "Good (with sealant)", "Reseal every 2–3 years"],
        ["Plywood + veneer", "Mid-range option", "Good", "Moderate"],
        ["Quartz countertop", "All zones", "Excellent", "Minimal"],
        ["Natural marble", "Main kitchen display", "Moderate", "Annual sealant"],
      ],
    },
    {
      type: "chart",
      caption: "Relative humidity resistance (100 = best)",
      unit: "pts",
      items: [
        { label: "MDF + HPL", value: 95, max: 100 },
        { label: "Quartz", value: 98, max: 100 },
        { label: "Solid wood (sealed)", value: 75, max: 100 },
        { label: "Marble", value: 60, max: 100 },
      ],
    },
    {
      type: "h2",
      text: "3D Render and Sample Before Manufacture",
    },
    {
      type: "p",
      text: "Before any factory cutting, request: a photorealistic 3D render showing materials, lighting, and appliances, plus a physical sample of door finish and countertop edge. Sign-off on render + sample = contract milestone. Any change after that = variation order with cost and delay.",
    },
    {
      type: "ol",
      items: [
        "3D render: all elevations + island view + dirty kitchen layout.",
        "Sample board: door finish, handle, countertop 20×20 cm minimum.",
        "Appliance specs: confirm dimensions fit cabinet openings.",
        "Lighting plan: task + ambient + accent — coordinated with render.",
        "Written sign-off: owner + designer + kitchen studio — dated.",
      ],
    },
    {
      type: "cta",
      lead: "Looking for a verified kitchen studio in Jeddah?",
      label: "Kitchen studios in Jeddah",
      href: ctaHref,
    },
    {
      type: "h2",
      text: "Planning to Installation Timeline",
    },
    {
      type: "p",
      text: "A quality custom kitchen takes 12–16 weeks from sign-off to install. Planning overlaps with fit-out — MEP in weeks 1–4, manufacture weeks 5–12, install after flooring and before final paint.",
    },
    {
      type: "ul",
      items: [
        "Weeks 1–2: Brief, measure, concept layout.",
        "Weeks 3–4: Shop drawings + MEP coordination + sign-off.",
        "Weeks 5–12: Manufacture (lead time varies by studio).",
        "Weeks 13–14: Delivery, install carcasses, connect MEP.",
        "Weeks 15–16: Countertop template/install, appliances, snagging.",
      ],
    },
    {
      type: "callout",
      variant: "fact",
      title: "On Ruwaq",
      text: "Verified kitchen studios in the Ruwaq directory offer standardised proposals — shop drawings, timeline, and warranty — making it easier to compare three studios before deciding.",
    },
    {
      type: "h2",
      text: "Pre-Contract Checklist",
    },
    {
      type: "p",
      text: "Before signing with a kitchen studio, ensure the proposal includes: layout for main + dirty kitchen, shop drawings with MEP points, 3D render, sample approval milestone, joinery warranty (5+ years) and hardware warranty (2+ years), and a written install timeline.",
    },
    {
      type: "ol",
      items: [
        "Compare three studios — same brief, same appliance list.",
        "Visit a completed project — check alignment, soft-close, finishes.",
        "Confirm who coordinates MEP — studio or fit-out contractor.",
        "Clarify variation process and cost per change order.",
        "Request maintenance guide for finishes and sealant schedule.",
      ],
    },
    {
      type: "cta",
      lead: "Ready to compare kitchen proposals in Jeddah?",
      label: "Start from the kitchen studios directory",
      href: ctaHref,
    },
    {
      type: "sources",
      title: "Sources",
      items: [
        {
          label: "House Beautiful — Kitchen Work Zones Replace the Triangle (2026)",
          url: "https://www.housebeautiful.com/room-decorating/kitchens/a62845644/kitchen-work-zones-2026/",
        },
        {
          label: "NKBA — Kitchen Planning Guidelines (Clearances & Aisle Widths)",
          url: "https://nkba.org/planning-guidelines/",
        },
        {
          label: "AWI — Architectural Woodwork Standards for Casework",
          url: "https://www.awinet.org/standards/",
        },
        {
          label: "Saudi Building Code — Mechanical & Plumbing Requirements for Residential Kitchens",
          url: "https://sbc.gov.sa/en/Pages/default.aspx",
        },
      ],
    },
  ],
};
