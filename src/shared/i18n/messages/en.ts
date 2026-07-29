import type { Messages } from "./types";

export const en: Messages = {
 app: {
  name: "Ruwaq",
  subtitle: "Easiest, most trusted real estate proposals",
 },
 nav: {
  myProposals: "My Proposals",
  companyProfile: "Company profile",
  settings: "Company profile",
  signIn: "Sign In",
  signOut: "Sign Out",
  newProposal: "New Proposal",
  previewSample: "Preview sample",
  requestQuote: "Request a quote",
  browseCategories: "Categories",
 },
 marketplace: {
  hero: {
   title: "Ruwaq | Western Region engineering & property directory",
   subtitle:
    "Connect with verified contracting, HVAC, fit-out, and elevator firms in Jeddah, Makkah, and Madinah.",
   ctaPrimary: "Get a quote",
   ctaSecondary: "Browse verified providers",
  },
  search: {
   cityLabel: "City",
   cityAll: "All cities",
   categoryLabel: "Service category",
   categoryPlaceholder: "Select category",
   queryPlaceholder: "Search services (e.g. central AC maintenance, villa fit-out...)",
   submit: "Search",
  },
  categories: {
   title: "Approved categories",
   subtitle: "7 high-ticket sectors across Western Region cities",
  },
  contractorSection: {
   title: "Proposal tool for contractors",
   subtitle: "Draft professional AI proposals and export branded PDFs in minutes.",
   cta: "Start a proposal",
  },
  quote: {
   title: "Get competitive quotes within 24 hours",
   submit: "Send request — free",
   success: "Request received. We will contact you soon.",
   errors: {
    validation: "Please fill in all required fields.",
    invalid_phone: "Enter a valid KSA mobile number (05xxxxxxxx).",
    category_missing: "Category unavailable. Try again later.",
    server: "Something went wrong. Please try again.",
   },
   fields: {
    name: "Full name",
    phone: "Mobile number",
    city: "City",
    category: "Service type",
    details: "Project details",
    budget: "Budget range (optional)",
   },
  },
  listing: {
   verified: "Verified",
   featured: "Featured",
   whatsapp: "WhatsApp",
   empty: "No verified providers yet. Request a quote and we will match you.",
   requestCta: "Request a quote for this category",
  },
 },
 form: {
  title: "Create a professional real estate proposal",
  subtitle: "Just 3 inputs, Ruwaq writes the full document for you.",
  steps: {
   project: "Project",
   details: "Details & price",
  },
  commercialSection: "Commercial offer",
  optionalDetails: {
   title: "More details (optional)",
   hint: "Anything you add here enriches the proposal, nothing is required.",
   location: "City / district",
   locationPlaceholder: "e.g. Riyadh, Al Malqa",
   propertyType: "Property type",
   propertyTypeNone: "Not specified",
   propertyTypes: {
    villa: "Villa",
    apartment: "Apartment",
    office: "Office",
    retail: "Retail",
    other: "Other",
   },
   areaSqm: "Area (sqm)",
   areaSqmPlaceholder: "300",
   duration: "Expected duration",
   durationPlaceholder: "e.g. 6–8 weeks",
   specifications: "Additional technical specs",
   specificationsPlaceholder:
    "e.g. porcelain flooring, Jotun paints, IKEA kitchens...",
  },
  projectName: "Project name",
  projectNamePlaceholder: "e.g. Interior fit-out, Al Malqa Villa",
  clientName: "Client name",
  clientNamePlaceholder: "e.g. Ahmed Al-Otaibi",
  description: "Briefly describe the work",
  descriptionPlaceholder:
   "e.g. Interior fit-out for a 300 sqm villa in Riyadh. Includes flooring, painting, kitchens, bathrooms, and lighting.",
  descriptionHint: "English only, Arabic text is not accepted in this mode.",
  budget: "Total price (SAR)",
  budgetPlaceholder: "e.g. 185000",
  budgetOptional: "Optional, leave blank for preliminary estimate",
  commercialMode: "Commercial type",
  commercialModeFixed: "Fixed price",
  commercialModeEstimate: "Preliminary estimate, confirmed after site visit",
  paymentStructure: "Payment structure",
  paymentOptions: {
   milestone_30_40_30: "30% down, 40% on delivery, 30% after handover",
   monthly: "Monthly installments",
   fixed: "Single payment on completion",
   custom: "Custom schedule",
  },
  continue: "Continue",
  back: "Back",
  generate: "Generate proposal",
  generatingAnalyze: "Analyzing your project...",
  generatingWrite: "Writing your proposal...",
  generatingWaitHint: "This usually takes 1–2 minutes. Please keep this tab open.",
  errors: {
   projectRequired: "Project name and client name are required.",
   descriptionRequired: "Please describe the work briefly.",
   budgetRequired: "Enter a price or choose preliminary estimate.",
   arabicOnly: "Please use Arabic only, English is not allowed in this mode.",
   englishOnly: "Please use English only, Arabic is not allowed in this mode.",
   generic: "Something went wrong. Please try again.",
  },
 },
 review: {
  trustBanner:
   "Ruwaq organizes the proposal, you confirm assumptions, exclusions, and price before sending.",
  reviewGatesTitle: "Review gates before sending",
  reviewGatesHint: "Confirm BOQ breakdown, clause pack, and commercial terms before export.",
  exportBlocked: "Complete all required review gates before exporting.",
  estimateOnlyBadge: "Preliminary estimate",
  profileIncomplete:
   "Complete your company profile, it appears on every PDF and builds client trust.",
  profileIncompleteLink: "Complete company profile",
  guestBanner: "Sign in to save this proposal to your account.",
  guestLink: "Sign in",
  backToNew: "New proposal",
  draftBadge: "Draft, review before sending",
  pageSubtitle: "Review required sections, then export a PDF with your company identity.",
  reviewedCount: (n: number, total: number) => `${n}/${total} sections reviewed`,
  allReviewed: "Reviewed",
  exported: "Exported",
  regenerate: "Regenerate",
  regenerating: "Regenerating...",
  regenerateConfirm:
   "Regenerate the entire proposal? Your current edits will be replaced.",
  regenerateFailed: "Regeneration failed. Please try again.",
  downloadPdf: "Open printable document",
  printHint:
   "Opens a print-ready HTML page. Use your browser Print → Save as PDF.",
  exporting: "Opening document...",
  preparedFor: "Prepared for:",
  preparedBy: "Prepared by:",
  date: "Date:",
  sections: {
   scopeItems: "Scope of Work",
   commercialTerms: "Commercial Terms",
   timeline: "Timeline",
   deliverables: "Deliverables",
   assumptions: "Assumptions",
   exclusions: "Exclusions",
  },
  total: "Total:",
  currency: "SAR",
  milestone: "Milestone",
  percentage: "%",
  amount: "Amount",
  duration: "Duration:",
  aiDraftHint: "AI-generated draft, review before sending to the client.",
  noAssumptions: "No assumptions.",
  noExclusions: "No exclusions.",
  addItem: "+ Add item",
  addAssumption: "+ Add assumption",
  addExclusion: "+ Add exclusion",
  markReviewed: "Mark reviewed",
  reviewed: "Reviewed",
  badges: {
   review: "Review",
   aiEstimated: "AI estimate",
  },
  placeholders: {
   itemTitle: "Item title",
   itemDescription: "Description",
  },
  localeMismatch:
   "This proposal was created in a different language. Switch language to edit it.",
  claimSuccess: "Proposal saved to your account.",
  claiming: "Saving proposal to your account...",
  postExportGuest: "Sign in to save this proposal and access it later from My Proposals.",
  copyWhatsApp: "Copy WhatsApp message",
  whatsAppCopied: "Message copied!",
  regenerateSection: "Regenerate",
  sectionRegenerating: "Regenerating...",
  introduction: "Introduction",
  removeItem: "Remove",
  gatesProgress: (confirmed: number, total: number) =>
   `${confirmed}/${total} gates confirmed`,
  confirmUnderstanding:
   "I confirm the project understanding and client details are accurate",
  confirmDeliverables:
   "I confirm the deliverables listed above are accurate and complete",
  boq: {
   title: "Financial breakdown (Smart BOQ)",
   lineItem: "Line item",
   empty: "No BOQ lines yet. Regenerate the proposal to create a breakdown.",
   budgetLockMatch: "Matches your total",
   budgetLockMismatch: "Sum mismatch, check amounts",
   estimateBadge: "Estimated",
   estimateDisclaimerTop: (pct: number) =>
    `Preliminary non-binding budget, subject to ±${pct}% variation depending on final material selection and site conditions.`,
   estimateDisclaimerBottom: (pct: number) =>
    `All figures above are preliminary estimates (±${pct}%) and not a binding contract until final written acceptance.`,
   confirmCommercial: "I confirm the commercial terms and payment schedule",
   confirmBoq: "I confirm the financial breakdown (Smart BOQ)",
   redistributeToast: "Amounts redistributed, total unchanged",
  },
  clauses: {
   title: "Approved clause pack",
   empty: "No clauses loaded. Regenerate the proposal to apply the Saudi clause pack.",
   defaultPackName: "Saudi clause pack",
   approvedCount: (n: number) => `${n} approved clauses`,
   mandatory: "Mandatory",
   recommended: "Recommended",
   source: "Reference",
   confirmClauses: "I confirm the approved clauses in this pack",
   legalDisclaimer:
    "I understand Ruwaq does not provide legal advice, clauses are pre-vetted templates only",
   categories: {
    materials: "Materials",
    permits: "Permits & municipality",
    payment: "Payment",
    warranty: "Warranty & SLA",
    scope_change: "Scope change",
    delay: "Delay",
    vat: "VAT (ZATCA)",
    compliance: "SBC compliance",
    escalation: "Price escalation",
    soil: "Soil & ground conditions",
    other: "Other",
   },
  },
 },
 landing: {
  title: "Easiest, most trusted real estate proposals",
  subtitle:
   "3 inputs → complete professional proposal. Fit-out, supervision, maintenance, with assumptions and exclusions built in.",
  cta: "Start a proposal",
  ctaSecondary: "My proposals",
  feature1: "3 inputs only",
  feature2: "Approved SBC · ZATCA clauses",
  feature3: "Arabic/EN + CR/VAT",
  trustLine: "Start without an account · company profile · support & help included",
 },
 sales: {
  hero: {
   eyebrow: "Saudi real estate, private clients",
      title: "Professional real estate proposals in minutes",
   titleHighlight: "not days",
   subtitleIntro: "Just 3 inputs:",
   subtitleInputs: ["Client name", "Work description", "Price or estimate"],
   subtitleOutcomeBefore: "Ruwaq drafts full scope with ",
   subtitleHighlight: "an approved clause pack that protects you",
   subtitleOutcomeAfter: ", then exports a PDF under your brand.",
   cta: "Start a proposal now",
   ctaSecondary: "View a sample",
   microcopy: "No account · No card · Ready in under 10 minutes",
   imageBadgeTitle: "Your partner in the field",
   imageBadge: "Approved clauses · SBC · ZATCA",
  },
  heroSteps: {
   title: "Three steps, your proposal ready",
   items: [
    { label: "Three inputs only", hint: "" },
    { label: "Ruwaq writes the proposal", hint: "" },
    { label: "PDF ready under your brand", hint: "" },
   ],
  },
  heroTickets: [
   {
    illustration: "scope",
    title: "Professional scope of work",
    body: "Clear, organized clauses tailored for the Saudi market.",
   },
   {
    illustration: "timeline",
    title: "Clear project timeline",
    body: "A realistic schedule your client can understand.",
   },
   {
    illustration: "payments",
    title: "Structured payment schedule",
    body: "Advance payment, progress milestones, and payment terms.",
   },
   {
    illustration: "pdf",
    title: "PDF ready to send",
    body: "Under your company name and logo in minutes.",
   },
  ],
  mock: {
   previewEyebrow: "See the transformation",
   previewTitle: "From 3 fields to a complete proposal",
   previewSubtitle: "Simple inputs on one side, an 11-layer professional document on the other.",
   inputLabel: "Your inputs",
   outputLabel: "Your full proposal",
   fields: ["Project name", "Client name", "Fit-out / supervision description"],
   generate: "Generate proposal →",
   sections: [
    "Project understanding",
    "Scope of work",
    "Deliverables",
    "Commercial offer",
    "Assumptions",
    "Exclusions",
   ],
   badge1: "✓ Commercial terms",
   badge2: "✓ Exclusions",
  },
  problem: {
   eyebrow: "The problem",
   title: "Stop copying old Word files",
   body:
    "Most real estate contractors send proposals from outdated templates, incomplete, inconsistent, and missing clear assumptions. Clients hesitate. You lose time and trust.",
   traditionalLabel: "The old way",
   ruwaqLabel: "With Ruwaq",
   traditional: [
    "2 hours in Word, copy-paste from an old proposal",
    "Vague scope that opens disputes later",
    "No assumptions or exclusions, \"we misunderstood\"",
    "PDF without your brand, or with someone else's logo",
   ],
   ruwaq: [
    "3 inputs → complete draft in minutes",
    "11 organized layers: scope, deliverables, payments, timeline",
    "Mandatory review gates before export",
    "PDF with your company identity only, Ruwaq stays invisible",
   ],
  },
  features: {
   eyebrow: "Why Ruwaq",
   title: "Built for private clients, not government tender uploads",
   subtitle:
    "Not ERP. Not a template library. A smart translator that turns what you know into a trust-building document.",
   items: [
    {
     illustration: "inputs",
     title: "3 inputs only",
     body: "Client, work description, fixed price or preliminary estimate. Extra details are optional, never blocking.",
    },
    {
     illustration: "shield",
     title: "Assumptions & exclusions",
     body: "Before export you confirm what's included and what's not, protection for you and your client.",
    },
    {
     illustration: "brand",
     title: "PDF under your brand",
     body: "Your logo, CR, VAT. The client sees your firm, not a third-party platform.",
    },
    {
     illustration: "estimate",
     title: "Preliminary estimate mode",
     body: "\"Estimate only\" for projects that need a site visit before final pricing.",
    },
    {
     illustration: "bilingual",
     title: "Arabic & English",
     body: "Content suited to the Saudi market, CR, VAT, professional tone.",
    },
    {
     illustration: "instant",
     title: "Start without an account",
     body: "Try instantly. Save proposals and set up your company profile when ready.",
    },
   ],
  },
  steps: {
   eyebrow: "How it works",
   title: "Three steps from idea to PDF",
   learnMore: "Full details",
   items: [
    {
     title: "Enter 3 inputs",
     body: "Project name, client, work description. Location, area, or property type, all optional.",
    },
    {
     title: "Ruwaq writes the proposal",
     body: "Scope, deliverables, timeline, commercial terms, assumptions, and exclusions, ready to review.",
    },
    {
     title: "Review & export",
     body: "Confirm terms, assumptions, and exclusions, then download a professional PDF with your brand.",
    },
   ],
  },
  why: {
   eyebrow: "Why us",
   title: "Why clients choose Ruwaq",
   subtitle:
    "Not because we're \"an AI platform\", because we solve a daily problem for everyone sending proposals in real estate & engineering.",
   table: { need: "Your need", others: "Alternatives", ruwaq: "Ruwaq" },
   rows: [
    {
     need: "Fast reply after a call or WhatsApp",
     others: "Upload full RFP booklet or complex ERP",
     ruwaq: "3 fields → proposal in minutes",
    },
    {
     need: "Private client (developer, owner, property manager)",
     others: "Government tender / Etimad tools",
     ruwaq: "Built for private real estate sector",
    },
    {
     need: "Protection from disputes",
     others: "Pretty PDF without clear assumptions",
     ruwaq: "Mandatory assumptions & exclusions review",
    },
    {
     need: "Look like an established firm",
     others: "Platform branding on the document",
     ruwaq: "Your company identity only in client PDF",
    },
    {
     need: "Estimate before site visit",
     others: "Mandatory price or detailed BOQ",
     ruwaq: "Built-in \"preliminary estimate\" mode",
    },
   ],
  },
  audience: {
   eyebrow: "Built for",
   title: "Real estate & engineering, anyone who sends proposals daily",
   items: [
    {
     icon: "🔨",
     title: "Fit-out contractors",
     body: "Villas, offices, retail, clear proposals after site visit or preliminary estimate.",
    },
    {
     icon: "📐",
     title: "Engineering offices",
     body: "Design, supervision, consulting, professional scope and deliverables.",
    },
    {
     icon: "🏗️",
     title: "Property developers",
     body: "Proposals for your projects or contractors, with clear terms and assumptions.",
    },
    {
     icon: "🔧",
     title: "Maintenance companies",
     body: "Recurring maintenance and FM contracts with structured payments.",
    },
    {
     icon: "🏢",
     title: "Real estate agencies",
     body: "Service proposals, property management, documents that match your clients.",
    },
    {
     icon: "📣",
     title: "Real estate marketing",
     body: "Campaigns, launches, and media, fast, professional proposals.",
    },
    {
     icon: "🧱",
     title: "Building material suppliers",
     body: "Supply and delivery quotes with clear scope and commercial terms.",
    },
    {
     icon: "🌿",
     title: "Landscape contractors",
     body: "Site landscaping, gardens, and outdoor maintenance, full proposals.",
    },
   ],
  },
  sample: {
   eyebrow: "See for yourself",
   title: "Proposal sample gallery",
   body:
    "Three live samples: villa fit-out, engineering supervision, and 3D visualization — Ruwaq and Graphics House designs.",
   cta: "Browse all three samples",
   comingSoon: "Coming soon",
   items: [
    {
     title: "Villa fit-out — Ruwaq",
     body: "Scope, BOQ, payments, and approved clause pack.",
     live: true,
    },
    {
     title: "Engineering supervision — Ruwaq executive",
     body: "Formal layout for engineering firms and site supervision.",
     live: true,
    },
    {
     title: "3D visualization — Graphics House",
     body: "Design studio identity for architectural visualization.",
     live: true,
    },
    {
     title: "Recurring maintenance",
     body: "Service scope, frequency, and commercial terms.",
     live: false,
    },
   ],
  },
  document: {
   eyebrow: "Inside every proposal",
   title: "11 layers, not a single page",
   subtitle:
    "Every Ruwaq proposal is structured like a consulting firm document: from project understanding to acceptance.",
   layers: [
    "Company identity",
    "Proposal metadata",
    "Project understanding",
    "Scope of work",
    "Deliverables",
    "Commercial offer",
    "Payment terms",
    "Timeline",
    "Assumptions",
    "Exclusions",
    "Validity & acceptance",
   ],
  },
  trustPartner: {
   eyebrow: "Your partner in the field",
   title: "Ruwaq stands with you, protecting your interest before the client signs",
   subtitle:
    "We don't just write a beautiful proposal. We embed pre-vetted clauses grounded in SBC, ZATCA, and Balady, so the client trusts you and you are protected before work begins.",
   pillars: [
    {
     illustration: "partner",
     title: "Partner, not competitor",
     body: "Ruwaq is your ally: assistant, companion, and backer. The goal is for the contractor to win and the client to trust, not to leave you alone with Word.",
    },
    {
     illustration: "protection",
     title: "Protection before dispute",
     body: "Assumptions, exclusions, and mandatory clauses reviewed before export. What is clear today prevents \"we misunderstood\" tomorrow.",
    },
    {
     illustration: "regulations",
     title: "Updated regulations",
     body: "Clauses tied to official references: building code, VAT, municipal permits, and more, kept current.",
    },
    {
     illustration: "verified",
     title: "Documented references",
     body: "Every clause carries a clear source. The client sees professionalism; you rely on approved templates, not improvisation.",
    },
   ],
   packTitle: "Approved clause pack",
   packMeta: "Interior fit-out pack · v1.0 · 9 approved clauses",
   clauses: [
    {
     category: "SBC Building Code",
     title: "Compliance with SBC 1101 for residential buildings",
     excerpt:
      "The client ensures works comply with Saudi Building Code. The contractor is not liable for violations from client requests that breach the code.",
     source: "SBC 1101 — Residential Buildings",
    },
    {
     category: "Permits & municipality",
     title: "Balady permits are the client's responsibility",
     excerpt:
      "Building and renovation permits sit with the client unless explicitly stated otherwise. Municipal delay is not contractor delay.",
     source: "Balady — Municipal Permits",
    },
    {
     category: "Waste management",
     title: "Construction debris and municipal delays",
     excerpt:
      "Debris removal is on the client unless explicitly in scope. Municipal stops extend the schedule without penalties on the contractor.",
     source: "Balady — Waste Management",
    },
    {
     category: "Soil & geotechnical",
     title: "Rock and unforeseen ground conditions excluded",
     excerpt:
      "Excavation assumes normal soil. Rock or groundwater discovery requires a change order and new pricing agreement.",
     source: "Industry Standard — Geotechnical",
    },
    {
     category: "Materials",
     title: "Material standards and supply",
     excerpt:
      "Materials per agreed specifications. Upgrades or substitutions require written approval and price adjustment.",
     source: "SASO / Project Spec",
    },
    {
     category: "VAT (ZATCA)",
     title: "VAT per Zakat, Tax and Customs Authority rules",
     excerpt:
      "Prices subject to VAT where applicable. Contractor issues tax invoices per ZATCA requirements.",
     source: "ZATCA — VAT Regulations",
    },
    {
     category: "Change order",
     title: "Every change goes through a formal change order",
     excerpt:
      "No out-of-scope work without a written change order defining cost and time. Verbal extras are not binding.",
     source: "FIDIC-inspired — Change Order",
    },
   ],
   disclaimer:
    "Pre-vetted templates to protect contractors. Ruwaq does not provide legal advice; review with your advisor when needed.",
   cta: "Start a protected proposal",
  },
  ctaFinal: {
   title: "Your client is waiting for a professional reply, send it today",
   subtitle:
    "3 inputs. Smart review. PDF under your brand. Start now without an account, see the difference on your first proposal.",
   primary: "Create your first proposal",
   secondary: "View sample",
   microcopy: "Free to start · No card · Support available",
  },
 },
 site: {
  nav: {
   howItWorks: "How it works",
   about: "About Ruwaq",
   services: "Services",
   pricing: "Pricing",
   faq: "FAQ",
   privacy: "Privacy policy",
   terms: "Terms of service",
   startProposal: "Start a proposal",
  },
  hero: {
   eyebrow: "Saudi real estate sector",
  },
  home: {
   stepsTitle: "Three steps only",
   learnMore: "Learn more",
   steps: [
    {
     title: "Project & client",
     body: "Project name, client name, and work description, 3 core inputs.",
    },
    {
     title: "Price & details",
     body: "Fixed price or preliminary estimate, plus optional context fields.",
    },
    {
     title: "Review & export",
     body: "Confirm terms, assumptions, and exclusions, then download a PDF with your company identity.",
    },
   ],
  },
  footer: {
   tagline: "Professionalism builds trust, the easiest, most trusted real estate & engineering proposals.",
   address: "Jeddah, Al-Zahra District, Saudi Arabia",
   product: "Product",
   company: "Company",
   legal: "Legal",
   contact: "Contact us",
   copyright: "© Ruwaq. All rights reserved.",
   sponsoredBy: "Ruwaq is powered by",
   sponsoredByLink: "Graphics House",
   ctaTitle: "Let's talk",
   ctaSubtitle: "Send your first professional proposal today, no account or card required.",
   ctaButton: "Start a proposal",
  },
 },
 pages: {
  howItWorks: {
   title: "How Ruwaq works",
   intro:
    "Ruwaq turns what you know about a project into a professional proposal, without complex forms or hours of writing.",
   steps: [
    {
     title: "Enter 3 core inputs",
     body: "Project name, client name, and work description. Location, property type, area, and duration are optional.",
    },
    {
     title: "Ruwaq drafts with AI",
     body: "Scope, deliverables, timeline, commercial terms, assumptions, and exclusions, organized and ready to review.",
    },
    {
     title: "Review what builds trust",
     body: "Before export, you confirm commercial terms, assumptions, and exclusions, for your protection and client trust.",
    },
    {
     title: "Export a PDF with your brand",
     body: "Client documents show your company only. Ruwaq stays in the background.",
    },
   ],
   reviewTitle: "Why 3 review steps?",
   reviewBody:
    "In real estate, clients trust vendors who clarify assumptions, exclusions, and price. Ruwaq organizes, you confirm before sending.",
  },
  about: {
   title: "About Ruwaq",
   intro:
    "Ruwaq is your partner for turning project knowledge into a trust-building proposal, for everyone in Saudi real estate & engineering.",
   sections: [
    {
     title: "What we do",
     body: "We translate user intent into a professional proposal document: scope, terms, assumptions, and exclusions, in language clients can act on.",
    },
    {
     title: "Who we serve",
     body: "Real estate & engineering: contractors, engineering offices, developers, maintenance, agencies, suppliers, and more.",
    },
    {
     title: "What we are not",
     body: "Not a PDF tool alone, not empty form builders, not ERP. Ruwaq is a professional translator, you own the final content.",
    },
   ],
   values: [
    { title: "Trust first", body: "Assumptions and exclusions are core, not an afterthought." },
    { title: "Real simplicity", body: "3 inputs to start. Everything else is optional." },
    { title: "Your identity", body: "Your proposals show your company, Ruwaq works behind the scenes." },
    { title: "Built for KSA", body: "Arabic/English, CR/VAT, local real estate context." },
   ],
   sponsoredTitle: "Powered by Graphics House",
   sponsoredBody:
    "Ruwaq is built with the design and brand expertise of Graphics House, professional visual identity for proposals that build trust.",
   sponsoredLink: "3dgraphicshouse.com",
  },
  privacy: {
   title: "Privacy policy",
   updated: "Last updated: June 2026",
   intro:
    "We respect your privacy. This policy explains how we collect and use your data when you use Ruwaq (ruwaq.co).",
   sections: [
    {
     title: "Data we collect",
     body: "When you sign in: name and email from Google. When you create proposals: project and client data you enter. Company profile: name, logo, CR, VAT, contact, optional.",
    },
    {
     title: "How we use data",
     body: "To run the service: save proposals, generate content, and export PDFs. We do not sell your data to third parties.",
    },
    {
     title: "Artificial intelligence",
     body: "We use AI providers to process your project description and draft proposals. We do not use your data to train public models without consent.",
    },
    {
     title: "Storage & security",
     body: "Data is stored on secure servers. We apply standard security practices, no system is 100% immune.",
    },
    {
     title: "Your rights",
     body: "You may request account and data deletion by contacting us. Guests can create proposals without signing in, with save limitations.",
    },
    {
     title: "Cookies",
     body: "We use essential cookies for session and language. No third-party ads in the current version.",
    },
   ],
   contact: "Questions:",
  },
  terms: {
   title: "Terms of service",
   updated: "Last updated: June 2026",
   intro:
    "By using Ruwaq (ruwaq.co) you agree to these terms. Please read them before creating or sending proposals.",
   sections: [
    {
     title: "Service description",
     body: "Ruwaq helps contractors and firms draft, review, and export professional proposals. AI-generated content is a starting point — you are responsible for reviewing accuracy before client delivery.",
    },
    {
     title: "Accounts & guest access",
     body: "You may start without an account. Guest proposals are protected by a private edit link; keep it safe. Signing in lets you save proposals to your company profile.",
    },
    {
     title: "Acceptable use",
     body: "Do not use Ruwaq for unlawful content, impersonation, or spam. Do not attempt to bypass security or access other users' data.",
    },
    {
     title: "Intellectual property",
     body: "You retain ownership of your project data and exported documents. Ruwaq retains rights to the platform, templates, and branding.",
    },
    {
     title: "Disclaimer",
     body: "Proposals and clauses are not legal advice. Consult qualified counsel for binding contracts. Ruwaq is provided as-is without warranties of uninterrupted service.",
    },
    {
     title: "Changes",
     body: "We may update these terms or the service. Continued use after updates constitutes acceptance. Material changes will be reflected on this page.",
    },
   ],
   contact: "Questions:",
  },
  faq: {
   eyebrow: "Ruwaq guide",
   title: "Everything you need to know before you start",
   intro:
    "Why Ruwaq is different, and exactly how the free trial and subscription work — no ambiguity, no surprises later.",
   differentiatorsTitle: "Why Ruwaq?",
   differentiators: [
    {
     title: "From idea to a ready proposal in minutes, not hours",
     body: "Instead of drafting scope, commercial terms, and a timeline from scratch every time, AI writes a full draft in minutes — you review and edit before sending.",
    },
    {
     title: "Built specifically for Saudi real estate & contracting",
     body: "Not a generic translated tool. The clause library, timelines, and payment terms are grounded in real fit-out, supervision, and maintenance practice in Saudi Arabia.",
    },
    {
     title: "Your full company identity on every proposal",
     body: "Your logo, details, and commercial registration appear automatically on every exported document — giving even a solo operator the look of a large consultancy.",
    },
    {
     title: "A live link your client can actually interact with",
     body: "Your client opens a link, reviews the proposal section by section, and can approve or request a change directly — not a static PDF that gets lost in an inbox.",
    },
   ],
   subscriptionTitle: "How the trial and subscription work",
   subscriptionIntro:
    "The platform is currently in a launch trial: everything is free and unlimited for now, while we confirm it genuinely serves you. Here's the permanent structure once the trial period ends:",
   subscriptionSteps: [
    {
     title: "Try it with no sign-up",
     body: "Create your first proposal instantly, no account or card required. You get one free AI-generated proposal as a guest to see the output quality yourself.",
    },
    {
     title: "Sign in with Google (one step)",
     body: "To create more proposals, sign in with Google — no new password to remember, just seconds.",
    },
    {
     title: "Complete your company profile once",
     body: "Your company name, logo, and contact details — filled in once, then applied automatically to every proposal after that.",
    },
    {
     title: "Stay free or upgrade as you grow",
     body: "The free plan covers occasional use. If your monthly volume grows, pick a plan that fits from the pricing page — no annual lock-in required.",
    },
   ],
   questionsTitle: "Frequently asked questions",
   questions: [
    {
     q: "Is Ruwaq really free?",
     a: "Yes. The platform is currently in a fully free launch trial with no limits. Even after that trial ends, a permanent free plan covers a limited number of proposals per month — no card needed to start.",
    },
    {
     q: "Do I need a credit card to sign up?",
     a: "No. Sign-in is via Google only. A payment method is only needed if you later choose to upgrade to a paid plan for higher monthly volume.",
    },
    {
     q: "Can I use my own company logo and details?",
     a: "Absolutely — that's the whole point. Fill in your logo, company name, and commercial registration once in Company Profile, and they appear automatically on every proposal you export.",
    },
    {
     q: "Are the generated proposals legally binding contracts?",
     a: "Proposals and clauses are a strong starting point that save you drafting time, but they are not legal advice. Always review them, and for high-value contracts consult qualified counsel before signing.",
    },
    {
     q: "How is this different from writing it myself in Word or using ChatGPT directly?",
     a: "ChatGPT gives you generic text you have to format yourself from scratch every time. Ruwaq builds a structured, export-ready proposal — scope, timeline, payment terms, and your branding — with no manual formatting or copy-pasting.",
    },
    {
     q: "Is there a limit on how many proposals I can create?",
     a: "During the current launch trial: no limit at all. Afterward, the free plan includes a set number per month, and paid plans offer higher or unlimited volume — see the pricing page for details.",
    },
    {
     q: "How does my client view the final proposal?",
     a: "You send them a direct link (or an exported PDF) — they open it on any device without needing to sign in, and can approve or request changes from the same page.",
    },
    {
     q: "Is my data or my clients' data shared or sold?",
     a: "No. Your data is used only to generate your proposals. Full details are on the Privacy Policy page.",
    },
    {
     q: "Does the platform support both Arabic and English?",
     a: "Yes, fully — you choose the language for each proposal when creating it, and the platform interface itself is available in both Arabic and English.",
    },
   ],
   ctaTitle: "Ready to try it yourself?",
   ctaSubtitle: "Your first professional proposal is ready in minutes — no sign-up, no credit card.",
   ctaButton: "Start a free proposal",
   ctaSecondary: "View pricing",
  },
 },
 templates: {
  title: "Proposal sample gallery",
  subtitle:
   "Three samples to explore: villa fit-out (Ruwaq classic), engineering supervision (Ruwaq executive), and 3D visualization (Graphics House).",
  openSample: "Open in new tab",
  openSampleHint: "Demo data for preview only, not for client delivery.",
  note: "Your real proposals show your company identity only.",
  previewLabel: "Preview",
  back: "Back",
  gallery: [
   {
    slug: "ruwaq-classic",
    brand: "Ruwaq",
    title: "Residential villa fit-out",
    body: "Fit-out scope, BOQ, 30/40/30 payments, and approved clause pack.",
    badge: "Primary sample",
   },
   {
    slug: "ruwaq-executive",
    brand: "Ruwaq — Executive",
    title: "Engineering supervision — office tower",
    body: "A more formal layout for engineering firms: supervision, reports, timeline.",
    badge: "Ruwaq sample 2",
   },
   {
    slug: "graphics-house",
    brand: "Graphics House",
    title: "3D visualization package",
    body: "Graphics House identity for design and architectural visualization proposals.",
    badge: "GH sample",
   },
  ],
  headerFooterShowcase: {
   title: "Customize your proposal look — 10 ready-made color styles",
   subtitle: "Pick a style from the list and see a full real proposal in it — header, body, and footer.",
   selectCta: "Start my proposal in this style",
   premiumBadge: "Subscription",
   premiumNote: "3 styles are free for everyone; the other 7 unlock automatically with any paid plan.",
   openInNewTab: "Open in a new tab",
  },
 },
 list: {
  title: "My Proposals",
  subtitle: "All your proposals in one place, track status, edit, or export.",
  new: "+ New proposal",
  empty: "No proposals yet.",
  emptyCta: "Create your first proposal",
  untitled: "Untitled",
  delete: "Delete",
  duplicate: "Duplicate",
  deleteConfirm: "Delete this proposal? This cannot be undone.",
  groups: {
   review: "In review",
   draft: "Drafts",
   published: "Published",
  },
  groupEmpty: {
   review: "No proposals awaiting review.",
   draft: "No drafts.",
   published: "No published proposals yet.",
  },
  gatesProgress: (confirmed: number, total: number) =>
   `${confirmed}/${total} Gates Confirmed`,
  proposalCount: (n: number) =>
   n === 1 ? "1 proposal" : `${n} proposals`,
  status: {
   draft: "Draft",
   generating: "Generating",
   review: "In review",
   reviewed: "Reviewed",
   exported: "Exported",
  },
 },
 login: {
  title: "Sign in",
  subtitle: "Save proposals and build your company profile, on every export.",
  google: "Sign in with Google",
  googleUnavailable:
   "Google sign-in is not configured yet, contact the Ruwaq team or try again later.",
  hint: "No account needed to create proposals. Sign in to save and manage your company profile.",
  perks: {
   profile: "Full company profile, logo, CR, VAT, and links",
   support: "Customer service and help building proposals",
   maintenance: "Ongoing platform maintenance and updates",
   help: "Free guidance when you need it",
  },
  servicesTitle: "Want a stronger identity?",
  servicesBody:
   "Ruwaq helps with identity, design, and marketing, so your proposals match a big-office standard.",
  servicesCta: "Explore Ruwaq services →",
 },
 services: {
  title: "Ruwaq services",
  subtitle:
   "Identity, design, and marketing, for real estate professionals who want big-office proposals.",
  supportNote:
   "We help you build your company profile, set up proposals, and keep things running, support when you need it.",
  items: {
   identity: {
    title: "Visual identity",
    body: "Logo, colors, and a profile block that appears on every proposal you send.",
   },
   design: {
    title: "Proposal & brand design",
    body: "Professional PDF templates and marketing materials aligned with your brand.",
   },
   marketing: {
    title: "Web & marketing",
    body: "A landing page or site that reflects your business, not just a contact form.",
   },
  },
  cta: "Start a proposal",
  ctaSecondary: "Contact the team",
  back: "← Back to sign in",
 },
 company: {
  title: "Company profile",
  subtitle: "Fill once, it appears on every proposal and builds client trust.",
  sections: {
   identity: "Identity & contact",
   marketing: "About & links",
   export: "Export design",
  },
  marketingHint:
   "Optional links enrich your proposal and market your business, no ads inside client documents.",
  errors: {
   invalidPhone: "Invalid phone number — digits only, with or without a country code (e.g. 0501234567).",
   invalidEmail: "Invalid email address.",
   invalidUrl: "Invalid link — must start with https:// or http://.",
  },
  companyName: "Company name",
  logoUrl: "Logo URL",
  logoUrlPlaceholder: "https://example.com/logo.png",
  logoUrlHint: "Upload a file below or paste a direct image link.",
  logoUpload: "Upload logo",
  logoUploading: "Uploading...",
  logoUploadFailed: "Logo upload failed. Use PNG, JPEG, WebP, or SVG under 2 MB.",
  logoStorageWarning: "Heads up: cloud storage isn't enabled yet — this logo is saved temporarily and may be lost on the next deploy.",
  headerFooter: {
   title: "Header & footer style",
   hint: "Pick the color scheme shown at the top and bottom of your proposal — the preview updates live with your real details.",
   previewBadge: "Proposal",
   previewCompanyFallback: "Your company name",
   prefilledNotice: "This is the style you picked on the template gallery — adjust it or save as-is.",
  },
  exportTemplate: "Proposal template",
  exportTemplateHint:
   "Choose the layout used when you export proposals. Preview samples in the template gallery.",
  exportTemplateOptions: {
   ruwaq: "Ruwaq Classic — fit-out & general contracting",
   ruwaq_executive: "Ruwaq Executive — engineering & supervision",
   graphics_house: "Graphics House — visualization & creative",
  },
  address: "Address",
  addressPlaceholder: "e.g. Riyadh, Al Malqa",
  about: "About your company",
  aboutPlaceholder:
   "e.g. Real estate fit-out firm since 2015, residential and commercial projects across Riyadh.",
  crNumber: "CR number",
  vatNumber: "VAT number",
  phone: "Phone",
  email: "Email",
  website: "Website",
  portfolioUrl: "Portfolio",
  portfolioUrlPlaceholder: "https://",
  catalogUrl: "Catalog / services page",
  catalogUrlPlaceholder: "https://",
  save: "Save profile",
  saving: "Saving...",
  saveFailed: "Failed to save. Please try again.",
  saveSuccess: "Saved successfully.",
 },
 upgrade: {
  title: "Unlock premium templates",
  subtitle: "Ruwaq Executive and Graphics House templates — a higher-end look for your proposals.",
  price: "$15 one-time",
  priceNote: "Paid via PayPal for now (a Saudi payment gateway is coming soon). The base template stays free forever.",
  cta: "Upgrade now",
  inlineTitle: "Premium templates available",
  inlineBody: "Unlock the \"Ruwaq Executive\" and \"Graphics House\" templates with a single small payment.",
  lockedSuffix: "locked",
  notConfigured: "Payments aren't enabled yet. Contact hello@ruwaq.co.",
  close: "Close",
  error: "Payment could not be completed. Try again or contact us.",
  trialNotice: "All templates are free for now during the trial period.",
 },
 graphicsHouseUpsell: {
  title: "Make this proposal look top-tier",
  body: "Graphics House offers 3D renders, brand identity, and professional design templates for your next proposals.",
  cta: "See Graphics House services",
 },
 gates: {
  signInRequired: "You tried Ruwaq for free — nice! Sign in with Google (one click) to create more proposals.",
  signInCta: "Sign in with Google",
  profileIncomplete: "Complete your company name and logo in Company Profile first — they appear on every exported proposal.",
  profileIncompleteCta: "Complete company profile",
  quotaExceeded: "You've reached this month's proposal limit for your current plan.",
  quotaExceededCta: "View plans",
 },
 pricing: {
  eyebrow: "Pricing",
  title: "Ruwaq plans",
  subtitle: "Start free, upgrade when your workload grows.",
  perMonth: "/ month",
  freeLabel: "Free",
  unlimitedLabel: "Unlimited",
  proposalsPerMonth: "proposals / month",
  currentPlanNote: "Your current plan",
  trialActiveNote: "The launch trial is live right now — everything is free and unlimited for a limited time.",
  contactCta: "Contact us to subscribe",
  mostPopular: "Most popular",
 },
 errors: {
  title: "Something went wrong",
  message: "Sorry, an unexpected error occurred. Please try again.",
  retry: "Try again",
  home: "Go home",
  notFoundTitle: "Page not found",
  notFoundMessage: "We couldn't find the page you're looking for.",
 },
 export: {
  savePdf: "Print or save as PDF",
  footer: "Please review this proposal before final acceptance.",
  sampleBadge: "Design sample, preview only",
  sampleFooter: "Ruwaq design sample, not for client delivery.",
  logoPlaceholder: "Your logo here",
  preparedFor: "Prepared for:",
  preparedBy: "Prepared by:",
  proposalNumber: "Proposal #:",
  date: "Date:",
  validity: "Valid until:",
  location: "Location:",
  propertyType: "Property type:",
  area: "Area:",
  address: "Address:",
  aboutUs: "About us",
  websiteLink: "Website",
  portfolioLink: "Portfolio",
  catalogLink: "Services catalog",
  scopeOfWork: "Scope of Work",
  deliverables: "Deliverables",
  timeline: "Timeline",
  duration: "Duration:",
  commercialTerms: "Commercial Terms",
  total: "Total:",
  milestone: "Milestone",
  percentage: "%",
  amount: "Amount",
  assumptions: "Assumptions",
  exclusions: "Exclusions",
  estimateOnly: "Preliminary estimate, final price confirmed after site visit.",
  estimatePending: "To be confirmed after site visit",
  estimateIndicative: "indicative amount",
  tbd: "TBD",
  crNumber: "CR:",
  vatNumber: "VAT:",
  phone: "Phone:",
  email: "Email:",
  acceptance: "Acceptance & Signature",
  acceptanceText:
   "By accepting this proposal, both parties agree to the scope and terms above. This proposal is valid for 30 days from the issue date.",
  clientSignature: "Client signature",
  providerSignature: "Service provider signature",
 },
 share: {
  downloadOfficialPdf: "Download Official PDF",
  confidentialNotice: "Confidential, client copy",
  notFoundTitle: "Proposal not found",
  notFoundMessage:
   "This link may have expired or is no longer valid. Contact the sender for an updated link.",
  goHome: "Go to Ruwaq",
  poweredBy: "Delivered via Ruwaq, professional proposals for Saudi contractors.",
 },
};
