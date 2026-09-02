import type { MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";
import type { JeddahIntentLanding, JeddahSectorLanding } from "./types";

function sector(
  categorySlug: MarketplaceCategorySlug,
  content: Omit<JeddahSectorLanding, "categorySlug">
): JeddahSectorLanding {
  return { categorySlug, ...content };
}

export const JEDDAH_SECTOR_LANDINGS: JeddahSectorLanding[] = [
  sector("fit-out", {
    heroTitleAr: "تشطيب فلل ومكاتب في جدة — نوصّلك بـ 3 مقاولين",
    heroTitleEn: "Villa & office fit-out in Jeddah — we match 3 contractors",
    heroLeadAr:
      "اكتب تفاصيل مشروعك مرة واحدة. فريق رواق يراجع الطلب ويرشّح أفضل 3 شركات تشطيب معتمدة تناسب ميزانيتك وحيّك في جدة.",
    heroLeadEn:
      "Describe your project once. Ruwaq reviews it and shortlists the best 3 verified fit-out firms for your budget and Jeddah district.",
    metaTitleAr: "تشطيب فلل جدة | 3 مقاولين معتمدين خلال 24 ساعة | رواق",
    metaTitleEn: "Jeddah villa fit-out | 3 verified contractors in 24h | Ruwaq",
    metaDescriptionAr:
      "اطلب تشطيب فيلا أو مكتب في جدة — رواق يرشّح 3 مقاولين معتمدين مجاناً. جبس، أرضيات، رخام، وتصميم داخلي.",
    metaDescriptionEn:
      "Request villa or office fit-out in Jeddah — Ruwaq matches 3 verified contractors free. Gypsum, flooring, marble, and interior execution.",
    sections: [
      {
        titleAr: "لماذا طلب واحد بدل عشر اتصالات؟",
        titleEn: "Why one request instead of ten calls?",
        bodyAr:
          "سوق التشطيب في جدة مليء بالعروض العشوائية. رواق يختصر المسار: نموذج واحد، مراجعة بشرية، ثلاث شركات فقط — الأنسب لمساحتك وميزانيتك.",
        bodyEn:
          "Jeddah fit-out is noisy. Ruwaq shortens the path: one form, human review, exactly three firms — the best fit for your area and budget.",
      },
      {
        titleAr: "ماذا نحتاج منك؟",
        titleEn: "What we need from you",
        bodyAr:
          "نوع المشروع (فيلا، شقة، مكتب)، المساحة التقريبية، مستوى التشطيب، الحي، وأي موعد مستهدف. كلما كانت التفاصيل أوضح، كانت المطابقة أدق.",
        bodyEn:
          "Project type (villa, apartment, office), approximate area, finish level, district, and target timeline. Clearer details mean better matching.",
      },
    ],
    faq: [
      {
        qAr: "هل الخدمة مجانية للعميل؟",
        qEn: "Is the service free for clients?",
        aAr: "نعم — طلب المشروع والترشيح مجانيان. تتفاوض مباشرة مع المقاولين الثلاثة.",
        aEn: "Yes — the request and shortlist are free. You negotiate directly with the three contractors.",
      },
      {
        qAr: "كم يستغرق الرد؟",
        qEn: "How fast is the response?",
        aAr: "هدفنا رد خلال 24 ساعة عمل مع بيانات المقاولين الثلاثة.",
        aEn: "We aim to respond within 24 business hours with your three matches.",
      },
    ],
    relatedGuideSlugs: ["gypsum-ceiling-jeddah-villas"],
  }),
  sector("contracting", {
    heroTitleAr: "مقاولات عامة في جدة — 3 شركات لكل طلب",
    heroTitleEn: "General contracting in Jeddah — 3 firms per request",
    heroLeadAr:
      "بناء، توسعة، أو ترميم في جدة؟ اكتب مشروعك مرة — نرشّح 3 مقاولين معتمدين بسجل تجاري ساري ومعرض أعمال موثّق.",
    heroLeadEn:
      "Build, extension, or renovation in Jeddah? Describe once — we shortlist 3 verified contractors with active CR and documented portfolios.",
    metaTitleAr: "مقاولات جدة | ترشيح 3 مقاولين معتمدين | رواق",
    metaTitleEn: "Jeddah general contracting | 3 verified matches | Ruwaq",
    metaDescriptionAr:
      "مقاولات فلل ومباني تجارية في جدة. رواق يراجع طلبك ويوصّلك بـ 3 مقاولين — بدون رسوم على العميل.",
    metaDescriptionEn:
      "Villa and commercial contracting in Jeddah. Ruwaq reviews your request and matches 3 contractors — free for clients.",
    sections: [
      {
        titleAr: "مطابقة حسب نطاق العمل",
        titleEn: "Matching by scope",
        bodyAr:
          "نفرّق بين الهيكل، التشطيب الكامل، والترميم الجزئي. الترشيح يعتمد على خبرة الشركة في نفس نوع المشروع وميزانيتك.",
        bodyEn:
          "We distinguish structure, full fit-out, and partial renovation. Shortlisting depends on firm experience in your project type and budget.",
      },
    ],
    faq: [
      {
        qAr: "هل تغطون مشاريع صغيرة؟",
        qEn: "Do you cover smaller projects?",
        aAr: "نعم — من تجديد غرفة إلى فيلا كاملة. حدّد الميزانية في النموذج لتحسين المطابقة.",
        aEn: "Yes — from a single room refresh to a full villa. State your budget in the form for better matching.",
      },
    ],
    relatedGuideSlugs: [],
  }),
  sector("hvac", {
    heroTitleAr: "تكييف وتهوية في جدة — 3 متخصصين معتمدين",
    heroTitleEn: "HVAC in Jeddah — 3 verified specialists",
    heroLeadAr:
      "مركزي، مخفي، أو صيانة؟ اكتب تفاصيل الوحدة والمساحة — نرشّح 3 شركات تكييف نشطة في جدة بسجل استجابة جيد.",
    heroLeadEn:
      "Central, concealed, or maintenance? Share unit type and area — we match 3 active Jeddah HVAC firms with strong response records.",
    metaTitleAr: "تكييف جدة | 3 شركات معتمدة | رواق",
    metaTitleEn: "Jeddah HVAC | 3 verified companies | Ruwaq",
    metaDescriptionAr:
      "تركيب وصيانة تكييف في جدة. طلب مجاني — رواق يرشّح 3 متخصصين خلال 24 ساعة.",
    metaDescriptionEn:
      "HVAC install and maintenance in Jeddah. Free request — Ruwaq shortlists 3 specialists within 24 hours.",
    sections: [
      {
        titleAr: "اختيار النظام المناسب لمناخ جدة",
        titleEn: "Choosing the right system for Jeddah climate",
        bodyAr:
          "الرطوبة والملوحة يؤثران على العمر الافتراضي للوحدات. نرشّح شركات تقدم ضماناً واضحاً وصيانة ما بعد التركيب.",
        bodyEn:
          "Humidity and salinity affect unit lifespan. We favour firms with clear warranty and post-install service.",
      },
    ],
    faq: [
      {
        qAr: "هل تشمل الصيانة؟",
        qEn: "Does this include maintenance?",
        aAr: "نعم — اذكر في التفاصيل إن كنت تحتاج تركيباً جديداً أو عقد صيانة.",
        aEn: "Yes — note in details whether you need new install or a maintenance contract.",
      },
    ],
    relatedGuideSlugs: ["concealed-vs-central-ac"],
  }),
  sector("kitchens", {
    heroTitleAr: "مطابخ مخصصة في جدة — 3 ورش معتمدة",
    heroTitleEn: "Custom kitchens in Jeddah — 3 verified workshops",
    heroLeadAr:
      "تصميم، قياس، وتنفيذ مطبخ ألمنيوم أو خشب — نموذج واحد وثلاث شركات مناسبة لميزانيتك في جدة.",
    heroLeadEn:
      "Design, measure, and build aluminium or wood kitchens — one form, three firms matched to your Jeddah budget.",
    metaTitleAr: "مطابخ جدة | 3 مقاولين معتمدين | رواق",
    metaTitleEn: "Jeddah custom kitchens | 3 verified matches | Ruwaq",
    metaDescriptionAr:
      "مطابخ فلل وشقق في جدة. رواق يرشّح 3 ورش معتمدة — مجاناً للعميل.",
    metaDescriptionEn:
      "Villa and apartment kitchens in Jeddah. Ruwaq matches 3 verified workshops — free for clients.",
    sections: [
      {
        titleAr: "من القياس إلى التسليم",
        titleEn: "From measure to handover",
        bodyAr:
          "المطبخ الجيد يبدأ بقياس ميداني وخطة تخزين. شاركنا المساحة والأجهزة المطلوبة لترشيح ورش لديها خبرة في نفس النطاق.",
        bodyEn:
          "A good kitchen starts with site measure and storage planning. Share area and appliances needed so we match workshops with relevant experience.",
      },
    ],
    faq: [],
    relatedGuideSlugs: ["custom-kitchen-planning"],
  }),
  sector("luxury-materials", {
    heroTitleAr: "رخام ومواد فاخرة في جدة — 3 موردين معتمدين",
    heroTitleEn: "Marble & luxury materials in Jeddah — 3 verified suppliers",
    heroLeadAr:
      "توريد رخام، إضاءة، أو تشطيبات فاخرة — نرشّح 3 موردين يفهمون مناخ جدة ومتطلبات الفلل الساحلية.",
    heroLeadEn:
      "Marble, lighting, or premium finishes — we shortlist 3 suppliers who understand Jeddah climate and coastal villa needs.",
    metaTitleAr: "رخام ومواد فاخرة جدة | رواق",
    metaTitleEn: "Jeddah marble & luxury materials | Ruwaq",
    metaDescriptionAr:
      "موردو رخام وإضاءة معتمدون في جدة. طلب مجاني — 3 ترشيحات خلال 24 ساعة.",
    metaDescriptionEn:
      "Verified marble and lighting suppliers in Jeddah. Free request — 3 matches within 24 hours.",
    sections: [
      {
        titleAr: "الجودة في المناخ الساحلي",
        titleEn: "Quality in coastal climate",
        bodyAr:
          "الملوحة والحرارة تتطلبان اختياراً دقيقاً للرخام والمعالجة. نفضّل موردين بمعرض أعمال في شمال وجنوب جدة.",
        bodyEn:
          "Salinity and heat demand careful marble choice and treatment. We favour suppliers with portfolios across Jeddah districts.",
      },
    ],
    faq: [],
    relatedGuideSlugs: ["marble-jeddah-climate"],
  }),
  sector("supervision", {
    heroTitleAr: "إشراف هندسي في جدة — 3 مكاتب استشارية",
    heroTitleEn: "Engineering supervision in Jeddah — 3 consultant offices",
    heroLeadAr:
      "إشراف على مقاول التشطيب أو البناء؟ نرشّح 3 مكاتب هندسية معتمدة لحماية الجودة والجدول الزمني.",
    heroLeadEn:
      "Supervision on your fit-out or build contractor? We match 3 accredited engineering offices to protect quality and schedule.",
    metaTitleAr: "إشراف هندسي جدة | رواق",
    metaTitleEn: "Jeddah engineering supervision | Ruwaq",
    metaDescriptionAr:
      "مكاتب إشراف معتمدة في جدة. طلب مجاني — 3 ترشيحات من رواق.",
    metaDescriptionEn:
      "Verified supervision offices in Jeddah. Free request — 3 Ruwaq matches.",
    sections: [
      {
        titleAr: "متى تحتاج إشرافاً مستقلاً؟",
        titleEn: "When do you need independent supervision?",
        bodyAr:
          "عند تجاوز ميزانية محددة أو تعقيد تقني (هيكل، MEP، تشطيب فندقي). الإشراف يقلل مخاطر إعادة العمل.",
        bodyEn:
          "When budget or technical complexity is high (structure, MEP, hotel-grade finish). Supervision reduces rework risk.",
      },
    ],
    faq: [],
    relatedGuideSlugs: ["engineering-supervision-basics"],
  }),
  sector("outdoor", {
    heroTitleAr: "لاندسكيب ومساحات خارجية في جدة — 3 مقاولين",
    heroTitleEn: "Landscaping & outdoor in Jeddah — 3 contractors",
    heroLeadAr:
      "حدائق، مسبح، أو واجهات خارجية — اكتب مشروعك ونرشّح 3 شركات لاندسكيب نشطة في جدة.",
    heroLeadEn:
      "Gardens, pools, or outdoor facades — describe your project and we match 3 active Jeddah landscaping firms.",
    metaTitleAr: "لاندسكيب جدة | رواق",
    metaTitleEn: "Jeddah landscaping | Ruwaq",
    metaDescriptionAr:
      "تنسيق حدائق ومساحات خارجية في جدة. 3 مقاولين معتمدين لكل طلب.",
    metaDescriptionEn:
      "Garden and outdoor design-build in Jeddah. 3 verified contractors per request.",
    sections: [
      {
        titleAr: "استدامة في الحرارة",
        titleEn: "Sustainability in heat",
        bodyAr:
          "اختيار النباتات ونظام الريّ يحددان تكلفة التشغيل. شاركنا مساحة الحديقة والاستخدام المطلوب.",
        bodyEn:
          "Plant choice and irrigation drive running costs. Share garden area and how you will use the space.",
      },
    ],
    faq: [],
    relatedGuideSlugs: [],
  }),
  sector("maintenance", {
    heroTitleAr: "صيانة فلل ومباني في جدة — 3 شركات FM",
    heroTitleEn: "Villa & building maintenance in Jeddah — 3 FM firms",
    heroLeadAr:
      "عقد صيانة دورية أو إصلاح عاجل؟ نرشّح 3 شركات صيانة معتمدة في جدة حسب نوع العقار.",
    heroLeadEn:
      "AMC or urgent repair? We match 3 verified maintenance firms in Jeddah by property type.",
    metaTitleAr: "صيانة فلل جدة | رواق",
    metaTitleEn: "Jeddah villa maintenance | Ruwaq",
    metaDescriptionAr:
      "صيانة دورية وطوارئ في جدة. طلب مجاني — 3 ترشيحات من رواق.",
    metaDescriptionEn:
      "Routine and emergency maintenance in Jeddah. Free request — 3 Ruwaq matches.",
    sections: [
      {
        titleAr: "عقد سنوي أم زيارة واحدة؟",
        titleEn: "Annual contract or one visit?",
        bodyAr:
          "وضّح في الطلب إن كنت تبحث عن AMC لفيلا أو صيانة لمبنى تجاري — المطابقة تختلف حسب النطاق.",
        bodyEn:
          "State whether you need a villa AMC or commercial FM — matching differs by scope.",
      },
    ],
    faq: [],
    relatedGuideSlugs: ["villa-maintenance-contract"],
  }),
];

export const JEDDAH_INTENT_LANDINGS: JeddahIntentLanding[] = [
  {
    intentSlug: "villa-fit-out",
    categorySlug: "fit-out",
    heroTitleAr: "تشطيب فيلا في جدة — نوصّلك بـ 3 مقاولين",
    heroTitleEn: "Jeddah villa fit-out — we match 3 contractors",
    heroLeadAr:
      "فيلا جديدة أو قيد التشطيب؟ اكتب المساحة، الحي، ومستوى التشطيب — نرشّح 3 شركات متخصصة في فلل جدة.",
    heroLeadEn:
      "New or ongoing villa build? Share area, district, and finish level — we shortlist 3 Jeddah villa specialists.",
    metaTitleAr: "تشطيب فيلا جدة | 3 مقاولين | رواق",
    metaTitleEn: "Jeddah villa fit-out | 3 contractors | Ruwaq",
    metaDescriptionAr: "تشطيب فلل سكنية في جدة — طلب مجاني و3 ترشيحات معتمدة خلال 24 ساعة.",
    metaDescriptionEn: "Residential villa fit-out in Jeddah — free request, 3 verified matches within 24 hours.",
    sections: [
      {
        titleAr: "تشطيب يتناسب مع أسلوب حياتك",
        titleEn: "Fit-out that fits how you live",
        bodyAr: "من التوزيع الداخلي إلى اختيار المواد — المقاول المناسب يفهم فلل جدة والبنية التحتية المحلية.",
        bodyEn: "From layout to materials — the right contractor knows Jeddah villas and local infrastructure.",
      },
    ],
    faq: [],
    relatedGuideSlugs: ["gypsum-ceiling-jeddah-villas"],
  },
  {
    intentSlug: "villa-renovation",
    categorySlug: "contracting",
    heroTitleAr: "ترميم فيلا في جدة — 3 مقاولين معتمدين",
    heroTitleEn: "Jeddah villa renovation — 3 verified contractors",
    heroLeadAr:
      "تجديد كامل أو جزئي؟ صف حالة العقار والميزانية — نرشّح 3 مقاولين بخبرة ترميم في جدة.",
    heroLeadEn:
      "Full or partial refresh? Describe property condition and budget — we match 3 Jeddah renovation contractors.",
    metaTitleAr: "ترميم فيلا جدة | رواق",
    metaTitleEn: "Jeddah villa renovation | Ruwaq",
    metaDescriptionAr: "ترميم وتجديد فلل في جدة. 3 مقاولين معتمدين لكل طلب — مجاناً.",
    metaDescriptionEn: "Villa renovation in Jeddah. 3 verified contractors per request — free.",
    sections: [],
    faq: [],
    relatedGuideSlugs: [],
  },
  {
    intentSlug: "hotel-fit-out",
    categorySlug: "fit-out",
    heroTitleAr: "تشطيب فنادق ومشاريع ضيافة في جدة",
    heroTitleEn: "Hotel & hospitality fit-out in Jeddah",
    heroLeadAr:
      "غرف، لوبي، أو مطاعم؟ نرشّح 3 شركات بخبرة ضيافة وفهم معايير التشغيل في جدة.",
    heroLeadEn:
      "Rooms, lobby, or F&B? We shortlist 3 firms with hospitality experience and Jeddah operating standards.",
    metaTitleAr: "تشطيب فنادق جدة | رواق",
    metaTitleEn: "Jeddah hotel fit-out | Ruwaq",
    metaDescriptionAr: "مقاولو تشطيب ضيافة معتمدون في جدة. طلب مجاني — 3 ترشيحات.",
    metaDescriptionEn: "Verified hospitality fit-out contractors in Jeddah. Free request — 3 matches.",
    sections: [],
    faq: [],
    relatedGuideSlugs: [],
  },
];
