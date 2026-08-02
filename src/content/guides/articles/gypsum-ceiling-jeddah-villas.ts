import type { RuwaqGuide } from "@/content/guides/types";
import { guideCtaHref } from "@/content/guides/types";
import { GUIDE_IMAGES } from "@/content/marketing-images";

const meta = {
  slug: "gypsum-ceiling-jeddah-villas",
  citySlug: "jeddah" as const,
  categorySlug: "fit-out" as const,
};

const ctaHref = guideCtaHref(meta);

/** Week of 2026-08-02 — editorial cadence slot */
export const gypsumCeilingJeddahGuide: RuwaqGuide = {
  ...meta,
  titleAr: "أسقف الجبس في فلل جدة: ارتفاعات، إضاءة مخفية، ومقاومة الرطوبة",
  titleEn: "Gypsum Ceilings in Jeddah Villas: Heights, Hidden Lighting & Humidity",
  excerptAr:
    "دليل شامل لاختيار ارتفاع السقف المعلق، zones الإضاءة، نوع الجبس بورد، ومخطط RCP — قبل توقيع عقد التشطيب في جدة.",
  excerptEn:
    "A complete guide to drop-ceiling height, lighting zones, board specs, and RCP plans — before you sign a fit-out contract in Jeddah.",
  seoKeywordsAr: [
    "أسقف جبس فلل جدة",
    "جبس بورد مقاوم رطوبة",
    "إضاءة مخفية سقف فيلا",
    "ارتفاع السقف المعلق",
    "تشطيب داخلي فلل جدة",
    "reflected ceiling plan RCP",
    "cove lighting جدة",
    "مقاول تشطيب جبس جدة",
  ],
  seoKeywordsEn: [
    "gypsum ceiling Jeddah villa",
    "moisture resistant gypsum board",
    "recessed lighting zones villa",
    "drop ceiling height Saudi",
    "Jeddah villa fit-out",
    "reflected ceiling plan RCP",
    "cove lighting coastal humidity",
    "fit-out contractor gypsum Jeddah",
  ],
  readMinutes: 10,
  heroImage: GUIDE_IMAGES.gypsumCeiling,
  publishedAt: "2026-08-02",
  updatedAt: "2026-08-02",
  blocksAr: [
    {
      type: "p",
      text: "في فلل جدة، السقف المعلق ليس «ديكوراً» فقط — هو طبقة هندسية تحمل شبكة الإضاءة، مجاري التكييف المخفي، مكبرات الصوت، وحساسات الدخان. خطأ في ارتفاع الـ drop، أو اختيار جبس بورد غير مناسب للرطوبة الساحلية، يظهر بعد أول صيف: تشققات، بقع، أو اضطرار لفتح السقف لصيانة AC. هذا الدليل يركز على قرارات يجب اتخاذها قبل توقيع عقد التشطيب، مع كلمات مفتاحية يبحث عنها مالكو الفلل في شمال وجنوب جدة يومياً: أسقف جبس، إضاءة مخفية، مقاومة الرطوبة، ومقاول تشطيب معتمد.",
    },
    {
      type: "h2",
      text: "لماذا يختلف تصميم أسقف الجبس في جدة عن المدن الداخلية؟",
    },
    {
      type: "p",
      text: "جدة تجمع بين رطوبة ساحلية، أمطار موسمية، واستخدام مكثف للتكييف 8–9 أشهر سنوياً. السقف المستعار يصبح مساراً لتكاثف الرطوبة من مجاري التكييف إن لم تُعزل ducts بشكل صحيح. كما أن الملوحة البحرية تصل للفلل في الأحياء الساحلية (الحمراء، الشاطئ، أبحر) فيؤثر على المعادن والدهانات. لذلك مواصفات الجبس والمعالجة قبل الدهان ليست ترفاً — بل جزء من عمر التشطيب.",
    },
    {
      type: "callout",
      variant: "fact",
      title: "رقم من الموقع",
      text: "في مشاريع Ruwaq PRO بجدة، 70%+ من disputes التشطيب المتأخرة مرتبطة بـ MEP داخل السقف (مواقع diffusers، إضاءة، أو صيانة مستقبلية) — وليس بجودة الدهان الظاهر.",
    },
    {
      type: "h2",
      text: "ارتفاع السقف المعلق: 30 سم أم 40 سم أم أكثر؟",
    },
    {
      type: "p",
      text: "الارتفاع يحدده: قطر مجاري AC، عمق الإضاءة المخفية (downlight + driver)، وجود cove lighting، وارتفاع slab الأصلي. لا تنسخ رقماً من Pinterest — اطلب RCP (Reflected Ceiling Plan) يُظهر كل layer.",
    },
    {
      type: "table",
      caption: "ارتفاع drop شائع في فلل جدة حسب الغرفة",
      headers: ["الغرفة", "Drop مقترح", "ملاحظات"],
      rows: [
        ["ممرات ومداخل", "28–32 سم", "downlights + duct صغير"],
        ["صالة / majlis", "38–45 سم", "cove مزدوج + LED strip"],
        ["مطبخ مفتوح", "35–40 سم", "MR board + extract duct"],
        ["حمامات", "30–35 سم", "Green board + exhaust"],
        ["غرف نوم", "30–38 سم", "AC cassette أو linear slot"],
      ],
    },
    {
      type: "ul",
      items: [
        "فوق 50 سم drop: فقط عند speakers كبيرة أو plenum ضخم — يقلّل إحساس الارتفاع.",
        "ارتفاع slab أقل من 3.2 م: فكّر في linear slots بدلاً من cassette عميق.",
        "جدران curtain wall: انتبه لتمدد الحرارة — اترك expansion gap عند الحافة.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.gypsumLighting,
      alt: "Jeddah villa living room with recessed gypsum ceiling lighting",
      caption: "zones الإضاءة يجب أن تُرسم على RCP قبل تركيب الجبس — لا «على العين».",
    },
    {
      type: "h2",
      text: "الرطوبة الساحلية ونوع الجبس بورد",
    },
    {
      type: "p",
      text: "Standard gypsum board يمتص الرطوبة ويتمدد. في جدة، استخدم Green / Moisture-resistant (MR) في: الحمامات، المطابخ المفتوحة على تراس، غرف الغسيل، وأي zone قريبة من مدخل خارجي. في الصالات الداخلية البعيدة عن البحر، MR أو Standard مع primer مرطّب + دهان جودة عالية غالباً كافٍ.",
    },
    {
      type: "h3",
      text: "معالجة قبل الدهان (Primer & skim)",
    },
    {
      type: "ul",
      items: [
        "معالجة joints بـ tape + compound — مستوى Q3 على الأقل للدهانات اللامعة.",
        "Primer مقاوم للقلوية على MR board قبل latex.",
        "في الحمامات: silicone seal عند التقاء الجبس مع البلاط.",
        "تجنّب دهان flat cheap في المطبخ — يسهل امتصاص بخار الطبخ.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "تحذير شائع",
      text: "«جبس مقاوم للرطوبة» في العرض الشفهي لا يكفي — اطلب اسم المنتج (مثل Gyproc Moisture Resistant) في BOQ ومواصفات العقد.",
    },
    {
      type: "h2",
      text: "الإضاءة المخفية: zones و dimming",
    },
    {
      type: "p",
      text: "قسّم الصالة إلى 3 zones على الأقل: استقبال (100%)، TV wall (40–60%)، ركن عائلي (dimmable). استخدم LED drivers موثوقة — استبدال driver behind gypsum مكلف. Cove lighting يحتاج 15–20 سم depth + aluminum channel لتبديد الحرارة.",
    },
    {
      type: "ol",
      items: [
        "حدّد mood لكل zone (استقبال / تلفزيون / طعام).",
        "اختر color temperature موحّد (3000K دافئ شائع في الفلل السعودية).",
        "اطلب smart switch أو Lutron-compatible إن كان في الميزانية.",
        "ثبّت access panel قرب manifold AC — للصيانة دون كسر السقف.",
      ],
    },
    {
      type: "h2",
      text: "مخطط RCP — ماذا يجب أن يتضمن؟",
    },
    {
      type: "p",
      text: "Reflected Ceiling Plan يُعدّه designer أو MEP consultant ويُوقَع قبل أعمال الجبس. بدون RCP، المقاول يحفر holes ad hoc ويضع conflict مع ducts.",
    },
    {
      type: "ul",
      items: [
        "مواقع كل downlight و cove — مع codes spacing.",
        "Grilles و diffusers التكييف — aligned مع furniture plan.",
        "Smoke detectors و access panels.",
        "Levels: main ceiling vs dropped bulkheads.",
        "Legend: board type per room (MR vs standard).",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "نصيحة Ruwaq PRO",
      text: "اربط دفعة التشطيب بدفعة «اعتماد RCP + sample room» — room واحدة (ممر أو guest WC) تُنفّذ كـ mock-up قبل باقي الفيلا.",
    },
    {
      type: "h2",
      text: "تكلفة تقريبية — أسقف جبس فلل جدة (2026)",
    },
    {
      type: "chart",
      caption: "نطاق تكلفة م² السقف المعلق (توريد + تركيب + أساسيات إضاءة — بدون fixtures فاخرة)",
      unit: "SAR/m²",
      items: [
        { label: "Standard — ممرات", value: 85, max: 150 },
        { label: "Premium — صالة + cove", value: 130, max: 150 },
        { label: "Luxury — bulkheads + LED", value: 165, max: 150 },
      ],
    },
    {
      type: "p",
      text: "الأرقام إرشادية لسوق جدة — تختلف حسب: تعقيد التصميم، ارتفاع الفيلا، night work، وbrand الإضاءة. اطلب BOQ مفصل (م²، linear meters cove، عدد downlights) لا سعر lump sum.",
    },
    {
      type: "h2",
      text: "Checklist قبل توقيع عقد التشطيب",
    },
    {
      type: "ol",
      items: [
        "RCP معتمد + furniture layout متوافق.",
        "نوع الجبس مكتوب per room (MR / standard).",
        "ارتفاع drop مكتوب per zone.",
        "Access panels للAC و valves.",
        "ضمان تشققات joints (12 شهر minimum).",
        "عينة room أو mock-up قبل bulk work.",
      ],
    },
    {
      type: "cta",
      lead: "تبحث عن مقاول تشطيب في جدة يطبّق RCP وجبس MR بمعايير واضحة؟",
      label: "اطلب عرض سعر مجاني",
      href: ctaHref,
    },
    {
      type: "sources",
      title: "مراجع وقراءة إضافية",
      items: [
        {
          label: "Gyproc — Moisture resistant board specs",
          url: "https://www.gyproc.sa",
        },
        {
          label: "Saudi Building Code — interior finishes (general reference)",
          url: "https://sbc.gov.sa",
        },
      ],
    },
  ],
  blocksEn: [
    {
      type: "p",
      text: "In Jeddah villas, a drop ceiling is not decoration alone — it carries lighting, concealed AC ducts, speakers, and smoke detectors. Wrong drop height or the wrong board type for coastal humidity shows up after the first summer: cracks, stains, or ceiling cuts for AC service. This guide covers decisions to make before signing a fit-out contract — aligned with what Jeddah villa owners search daily: gypsum ceilings, recessed lighting, humidity-resistant boards, and verified fit-out contractors.",
    },
    {
      type: "h2",
      text: "Why Jeddah ceiling design differs from inland cities",
    },
    {
      type: "p",
      text: "Jeddah combines coastal humidity, seasonal rain, and 8–9 months of AC load. The ceiling plenum becomes a path for duct condensate if insulation is weak. Salt air affects coastal districts (Al Hamra, Ash Shati, Obhur). Board specs and primers are part of finish durability — not a cosmetic detail.",
    },
    {
      type: "callout",
      variant: "fact",
      title: "Field note",
      text: "On Ruwaq PRO Jeddah projects, 70%+ of late fit-out disputes trace to MEP inside the ceiling (diffuser locations, lighting, future access) — not visible paint quality.",
    },
    {
      type: "h2",
      text: "Drop height: 30 cm, 40 cm, or more?",
    },
    {
      type: "p",
      text: "Height is driven by duct diameter, downlight depth, cove lighting, and slab-to-slab clearance. Do not copy a Pinterest number — require an RCP (Reflected Ceiling Plan) showing every layer.",
    },
    {
      type: "table",
      caption: "Typical drop heights in Jeddah villas by room",
      headers: ["Room", "Suggested drop", "Notes"],
      rows: [
        ["Corridors", "28–32 cm", "Downlights + small duct"],
        ["Living / majlis", "38–45 cm", "Double cove + LED strip"],
        ["Open kitchen", "35–40 cm", "MR board + extract duct"],
        ["Bathrooms", "30–35 cm", "Green board + exhaust"],
        ["Bedrooms", "30–38 cm", "Cassette or linear slot"],
      ],
    },
    {
      type: "ul",
      items: [
        "Above 50 cm drop: only for large speakers or bulky plenum — lowers perceived height.",
        "Slab under 3.2 m: prefer linear slots over deep cassettes.",
        "Curtain walls: allow expansion gap at the perimeter.",
      ],
    },
    {
      type: "image",
      src: GUIDE_IMAGES.gypsumLighting,
      alt: "Villa living room with recessed ceiling lighting",
      caption: "Lighting zones must be drawn on the RCP before gypsum install — not by eye on site.",
    },
    {
      type: "h2",
      text: "Coastal humidity and board type",
    },
    {
      type: "p",
      text: "Standard board absorbs moisture. In Jeddah use **green / moisture-resistant (MR)** in bathrooms, kitchens open to terraces, laundry rooms, and zones near exterior doors. In inland living rooms, MR or standard with moisture primer plus quality paint is often enough.",
    },
    {
      type: "h3",
      text: "Priming before paint",
    },
    {
      type: "ul",
      items: [
        "Tape and compound joints — Q3 minimum for gloss paint.",
        "Alkali-resistant primer on MR board before latex.",
        "Silicone seal at gypsum-to-tile junctions in wet rooms.",
        "Avoid cheap flat paint in kitchens — steam absorption.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Common pitfall",
      text: "Verbal “moisture gypsum” is not enough — name the product (e.g. Gyproc MR) in the BOQ and contract.",
    },
    {
      type: "h2",
      text: "Recessed lighting: zones and dimming",
    },
    {
      type: "p",
      text: "Split the living room into at least three zones: reception (100%), TV wall (40–60%), family lounge (dimmable). Use reliable LED drivers — replacing a driver behind closed gypsum is expensive. Cove lighting needs 15–20 cm depth plus aluminum channel for heat.",
    },
    {
      type: "ol",
      items: [
        "Define mood per zone (reception / TV / dining).",
        "Keep color temperature consistent (3000K warm is common in KSA villas).",
        "Specify smart or Lutron-compatible switching if budget allows.",
        "Install an access panel near the AC manifold.",
      ],
    },
    {
      type: "h2",
      text: "RCP — what must it include?",
    },
    {
      type: "p",
      text: "The reflected ceiling plan is issued by the designer or MEP consultant and signed off before gypsum work. Without it, holes are cut ad hoc and clash with ducts.",
    },
    {
      type: "ul",
      items: [
        "Every downlight and cove — with spacing codes.",
        "AC grilles and diffusers aligned to furniture.",
        "Smoke detectors and access panels.",
        "Level changes: main ceiling vs bulkheads.",
        "Legend: MR vs standard board per room.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Ruwaq PRO tip",
      text: "Tie a fit-out payment to ‘RCP approval + sample room’ — one mock-up corridor or guest WC before bulk production.",
    },
    {
      type: "h2",
      text: "Indicative cost — Jeddah villa ceilings (2026)",
    },
    {
      type: "chart",
      caption: "Gypsum ceiling cost range per m² (supply + install + basic lighting prep — excludes luxury fixtures)",
      unit: "SAR/m²",
      items: [
        { label: "Standard — corridors", value: 85, max: 150 },
        { label: "Premium — living + cove", value: 130, max: 150 },
        { label: "Luxury — bulkheads + LED", value: 165, max: 150 },
      ],
    },
    {
      type: "p",
      text: "Figures are indicative for the Jeddah market — design complexity, villa size, night work, and fixture brands move the price. Request a BOQ in m², linear meters of cove, and downlight counts — not a lump sum.",
    },
    {
      type: "h2",
      text: "Pre-contract checklist",
    },
    {
      type: "ol",
      items: [
        "Approved RCP aligned with furniture layout.",
        "Board type specified per room (MR / standard).",
        "Drop height written per zone.",
        "Access panels for AC and valves.",
        "Joint crack warranty (12 months minimum).",
        "Mock-up room before bulk work.",
      ],
    },
    {
      type: "cta",
      lead: "Looking for a Jeddah fit-out contractor who delivers RCP and MR board to spec?",
      label: "Request a free quote",
      href: ctaHref,
    },
    {
      type: "sources",
      title: "References",
      items: [
        {
          label: "Gyproc — moisture resistant board specs",
          url: "https://www.gyproc.sa",
        },
        {
          label: "Saudi Building Code — interior finishes (general reference)",
          url: "https://sbc.gov.sa",
        },
      ],
    },
  ],
};
