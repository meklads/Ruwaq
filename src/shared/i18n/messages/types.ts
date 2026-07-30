export type Messages = {
  app: { name: string; subtitle: string };
  nav: {
    myProposals: string;
    companyProfile: string;
    settings: string;
    signIn: string;
    signOut: string;
    newProposal: string;
    previewSample: string;
    requestQuote: string;
    browseCategories: string;
    contractorHub: string;
    aboutPlatform: string;
    backToDirectory: string;
    closeModal: string;
  };
  marketplace: {
    hero: {
      title: string;
      titleHighlight: string;
      subtitle: string;
      eyebrow: string;
      trustLine: string;
      ctaPrimary: string;
      ctaSecondary: string;
      ctaContractor: string;
    };
    search: {
      cityLabel: string;
      cityAll: string;
      categoryLabel: string;
      categoryPlaceholder: string;
      queryPlaceholder: string;
      submit: string;
    };
    categories: {
      title: string;
      subtitle: string;
    };
    contractorSection: {
      title: string;
      subtitle: string;
      cta: string;
    };
    contractorPromo: {
      headlineBefore: string;
      headlineEmphasis: string;
      offerBefore?: string;
      offerStrike?: string;
      offerHighlight: string;
      offerAfter?: string;
      cta: string;
    };
    graphicsHousePromo: {
      headlineBefore: string;
      headlineEmphasis: string;
      offerBefore?: string;
      offerStrike?: string;
      offerHighlight: string;
      offerAfter?: string;
      cta: string;
    };
    visualization: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      subtitle: string;
      formLabel: string;
      services: readonly string[];
      trustTitle: string;
      trustItems: readonly string[];
      partnerNote: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      externalCta: string;
      privacyNote: string;
      privacyLink: string;
      fields: {
        name: string;
        company: string;
        companyPlaceholder: string;
        phone: string;
        phonePlaceholder: string;
        projectType: string;
        city: string;
        cityOptional: string;
        details: string;
        budget: string;
      };
      projectTypes: {
        residential: string;
        commercial: string;
        hospitality: string;
        mixed_use: string;
        government: string;
        other: string;
      };
      errors: {
        validation: string;
        invalid_phone: string;
        server: string;
      };
    };
    howItWorks: {
      title: string;
      subtitle: string;
      ownersTitle: string;
      ownersSteps: readonly { title: string; body: string }[];
      contractorsTitle: string;
      contractorsSteps: readonly { title: string; body: string }[];
      learnMore: string;
    };
    trustStandards: {
      modalTitle: string;
      intro: string;
      levels: readonly { title: string; body: string }[];
      assurance: string;
      close: string;
    };
    socialProof: {
      title: string;
      subtitle: string;
      items: readonly { quote: string; role: string; city: string }[];
    };
    proposalsPreview: {
      title: string;
      subtitle: string;
      button: string;
    };
    businessTransparency: string;
    footerTransparency: string;
    aboutPage: {
      eyebrow: string;
      title: string;
      intro: string;
      businessNote: string;
      closingHint: string;
      sections: readonly { title: string; body: string }[];
    };
    quote: {
      title: string;
      requestTypeLabel: string;
      requestTypes: {
        marketplace: string;
        visualization: string;
      };
      visualizationTitle: string;
      visualizationSubtitle: string;
      visualizationHint: string;
      visualizationPageLink: string;
      visualizationSubmit: string;
      visualizationSuccess: {
        title: string;
        subtitle: string;
        externalCta: string;
      };
      submit: string;
      submitting: string;
      success: string;
      successModal: {
        title: string;
        subtitle: string;
        referenceLabel: string;
        whatsAppCta: string;
        close: string;
        browseCategories: string;
        noWhatsAppHint: string;
      };
      errors: {
        validation: string;
        invalid_phone: string;
        category_missing: string;
        server: string;
      };
      fields: {
        name: string;
        phone: string;
        phonePlaceholder: string;
        city: string;
        category: string;
        details: string;
        budget: string;
      };
    };
    listing: {
      verified: string;
      verifiedPro: string;
      featured: string;
      featuredPro: string;
      providerExecutor: string;
      providerSupplier: string;
      providerConsultant: string;
      whatsapp: string;
      viewProfile: string;
      empty: string;
      requestCta: string;
    };
    proDirectory: {
      eyebrow: string;
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      title: string;
      subtitle: string;
      trustLine: string;
      allCategories: string;
      applyCta: string;
      applyHint: string;
      applyHref: string;
      directoryLabel: string;
      featuredLink: string;
      clientsSection: string;
      providersSection: string;
      requestQuoteLink: string;
      proposalStudioLink: string;
      tradeApplyBar: string;
    };
    join: {
      eyebrow: string;
      title: string;
      subtitle: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      stepCompany: string;
      stepVerification: string;
      stepPortfolio: string;
      trustTitle: string;
      trustItems: readonly string[];
      errors: {
        validation: string;
        invalid_phone: string;
        category_missing: string;
        server: string;
      };
      fields: {
        companyName: string;
        contactName: string;
        contactPhone: string;
        contactEmail: string;
        crNumber: string;
        city: string;
        category: string;
        portfolioUrl: string;
        message: string;
        phonePlaceholder: string;
      };
    };
    filters: {
      searchPlaceholder: string;
      featuredOnly: string;
      sortLabel: string;
      sortFeatured: string;
      sortNewest: string;
      sortName: string;
      apply: string;
    };
    proShowcase: {
      eyebrow: string;
      title: string;
      subtitle: string;
      allCities: string;
      filterCity: string;
      empty: string;
    };
    listingDetail: {
      galleryTitle: string;
      aboutTitle: string;
      contactTitle: string;
      backToDirectory: string;
    };
    howItWorksPage: {
      eyebrow: string;
      intro: string;
      ctaOwners: string;
      ctaContractors: string;
      ctaProposals: string;
      trustTitle: string;
      trustBody: string;
    };
    homeMagazine: {
      todaysDirectoryEyebrow: string;
      todaysDirectoryTitle: string;
      viewAllFeatured: string;
      trendingEyebrow: string;
      trendingTitle: string;
      allSectors: string;
    };
    projectTours: {
      eyebrow: string;
      title: string;
      subtitle: string;
      viewAll: string;
      readTour: string;
      metaTitle: string;
      metaDescription: string;
      creditsTitle: string;
      viewProfile: string;
      browseCategory: string;
      allTours: string;
      backHome: string;
    };
    guides: {
      eyebrow: string;
      title: string;
      subtitle: string;
      viewAll: string;
      readGuide: string;
      minRead: string;
      metaTitle: string;
      metaDescription: string;
      ctaLead: string;
      allGuides: string;
    };
    footerCta: {
      title: string;
      subtitle: string;
      button: string;
    };
    footerTagline: string;
  };
  form: {
    title: string;
    subtitle: string;
    steps: { project: string; details: string };
    commercialSection: string;
    optionalDetails: {
      title: string;
      hint: string;
      location: string;
      locationPlaceholder: string;
      propertyType: string;
      propertyTypeNone: string;
      propertyTypes: {
        villa: string;
        apartment: string;
        office: string;
        retail: string;
        other: string;
      };
      areaSqm: string;
      areaSqmPlaceholder: string;
      duration: string;
      durationPlaceholder: string;
      specifications: string;
      specificationsPlaceholder: string;
    };
    projectName: string;
    projectNamePlaceholder: string;
    clientName: string;
    clientNamePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    descriptionHint: string;
    budget: string;
    budgetPlaceholder: string;
    budgetOptional: string;
    commercialMode: string;
    commercialModeFixed: string;
    commercialModeEstimate: string;
    paymentStructure: string;
    paymentOptions: {
      milestone_30_40_30: string;
      monthly: string;
      fixed: string;
      custom: string;
    };
    continue: string;
    back: string;
    generate: string;
    generatingAnalyze: string;
    generatingWrite: string;
    generatingWaitHint: string;
    errors: {
      projectRequired: string;
      descriptionRequired: string;
      budgetRequired: string;
      arabicOnly: string;
      englishOnly: string;
      generic: string;
    };
  };
  review: {
    trustBanner: string;
    reviewGatesTitle: string;
    reviewGatesHint: string;
    exportBlocked: string;
    estimateOnlyBadge: string;
    profileIncomplete: string;
    profileIncompleteLink: string;
    guestBanner: string;
    guestLink: string;
    backToNew: string;
    draftBadge: string;
    pageSubtitle: string;
    reviewedCount: (n: number, total: number) => string;
    allReviewed: string;
    exported: string;
    regenerate: string;
    regenerating: string;
    regenerateConfirm: string;
    regenerateFailed: string;
    downloadPdf: string;
    previewPdf: string;
    closePreview: string;
    printHint: string;
    exporting: string;
    preparedFor: string;
    preparedBy: string;
    date: string;
    sections: {
      scopeItems: string;
      commercialTerms: string;
      timeline: string;
      deliverables: string;
      assumptions: string;
      exclusions: string;
    };
    total: string;
    currency: string;
    milestone: string;
    percentage: string;
    amount: string;
    duration: string;
    aiDraftHint: string;
    noAssumptions: string;
    noExclusions: string;
    addItem: string;
    addAssumption: string;
    addExclusion: string;
    markReviewed: string;
    reviewed: string;
    badges: { review: string; aiEstimated: string };
    placeholders: { itemTitle: string; itemDescription: string };
    localeMismatch: string;
    claimSuccess: string;
    claiming: string;
    postExportGuest: string;
    copyWhatsApp: string;
    whatsAppCopied: string;
    regenerateSection: string;
    sectionRegenerating: string;
    introduction: string;
    removeItem: string;
    gatesProgress: (confirmed: number, total: number) => string;
    confirmUnderstanding: string;
    confirmDeliverables: string;
    boq: {
      title: string;
      lineItem: string;
      empty: string;
      budgetLockMatch: string;
      budgetLockMismatch: string;
      estimateBadge: string;
      estimateDisclaimerTop: (pct: number) => string;
      estimateDisclaimerBottom: (pct: number) => string;
      confirmCommercial: string;
      confirmBoq: string;
      redistributeToast: string;
    };
    clauses: {
      title: string;
      empty: string;
      defaultPackName: string;
      approvedCount: (n: number) => string;
      mandatory: string;
      recommended: string;
      source: string;
      confirmClauses: string;
      legalDisclaimer: string;
      categories: Record<string, string>;
    };
  };
  landing: {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    feature1: string;
    feature2: string;
    feature3: string;
    trustLine: string;
  };
  sales: {
    hero: {
      eyebrow: string;
      title: string;
      titleHighlight: string;
      subtitleIntro: string;
      subtitleInputs: readonly string[];
      subtitleOutcomeBefore: string;
      subtitleHighlight: string;
      subtitleOutcomeAfter: string;
      cta: string;
      ctaSecondary: string;
      microcopy: string;
      imageBadgeTitle: string;
      imageBadge: string;
    };
    heroSteps: {
      title: string;
      items: readonly { label: string; hint: string }[];
    };
    heroTickets: readonly {
      illustration: "scope" | "timeline" | "payments" | "pdf";
      title: string;
      body: string;
    }[];
    mock: {
      previewEyebrow: string;
      previewTitle: string;
      previewSubtitle: string;
      inputLabel: string;
      outputLabel: string;
      fields: readonly string[];
      generate: string;
      sections: readonly string[];
      badge1: string;
      badge2: string;
    };
    problem: {
      eyebrow: string;
      title: string;
      body: string;
      traditionalLabel: string;
      ruwaqLabel: string;
      traditional: readonly string[];
      ruwaq: readonly string[];
    };
    features: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: readonly {
        illustration: "inputs" | "shield" | "brand" | "estimate" | "bilingual" | "instant";
        title: string;
        body: string;
      }[];
    };
    steps: {
      eyebrow: string;
      title: string;
      learnMore: string;
      items: readonly { title: string; body: string }[];
    };
    why: {
      eyebrow: string;
      title: string;
      subtitle: string;
      table: { need: string; others: string; ruwaq: string };
      rows: readonly { need: string; others: string; ruwaq: string }[];
    };
    audience: {
      eyebrow: string;
      title: string;
      items: readonly { icon: string; title: string; body: string }[];
    };
    sample: {
      eyebrow: string;
      title: string;
      body: string;
      cta: string;
      comingSoon: string;
      items: readonly { title: string; body: string; live: boolean }[];
    };
    document: {
      eyebrow: string;
      title: string;
      subtitle: string;
      layers: readonly string[];
    };
    trustPartner: {
      eyebrow: string;
      title: string;
      subtitle: string;
      pillars: readonly {
        illustration: "partner" | "protection" | "regulations" | "verified";
        title: string;
        body: string;
      }[];
      packTitle: string;
      packMeta: string;
      clauses: readonly {
        category: string;
        title: string;
        excerpt: string;
        source: string;
      }[];
      disclaimer: string;
      cta: string;
    };
    ctaFinal: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
      microcopy: string;
    };
  };
  site: {
    header: {
      applyNow: string;
      directory: string;
      featured: string;
      howItWorks: string;
      forContractors: string;
      startProposal: string;
      tours: string;
      guides: string;
      mainNavLabel: string;
    };
    nav: {
      howItWorks: string;
      about: string;
      services: string;
      pricing: string;
      faq: string;
      privacy: string;
      terms: string;
      startProposal: string;
    };
    hero: { eyebrow: string };
    home: {
      stepsTitle: string;
      learnMore: string;
      steps: readonly { title: string; body: string }[];
    };
    footer: {
      tagline: string;
      address: string;
      product: string;
      company: string;
      legal: string;
      contact: string;
      copyright: string;
      sponsoredBy: string;
      sponsoredByLink: string;
      ctaTitle: string;
      ctaSubtitle: string;
      ctaOwner: string;
      ctaButton: string;
      ecosystem: string;
      graphicsHouse: string;
      graphicsHouseVisualization: string;
      turriva: string;
      beesmotion: string;
      followUs: string;
      regionLabel: string;
      affiliateNote: string;
    };
  };
  pages: {
    howItWorks: {
      title: string;
      intro: string;
      steps: readonly { title: string; body: string }[];
      reviewTitle: string;
      reviewBody: string;
    };
    about: {
      title: string;
      intro: string;
      sections: readonly { title: string; body: string }[];
      values: readonly { title: string; body: string }[];
      sponsoredTitle: string;
      sponsoredBody: string;
      sponsoredLink: string;
    };
    privacy: {
      title: string;
      updated: string;
      intro: string;
      sections: readonly { title: string; body: string }[];
      contact: string;
    };
    terms: {
      title: string;
      updated: string;
      intro: string;
      sections: readonly { title: string; body: string }[];
      contact: string;
    };
    faq: {
      eyebrow: string;
      title: string;
      intro: string;
      differentiatorsTitle: string;
      differentiators: readonly { title: string; body: string }[];
      subscriptionTitle: string;
      subscriptionIntro: string;
      subscriptionSteps: readonly { title: string; body: string }[];
      questionsTitle: string;
      questions: readonly { q: string; a: string }[];
      ctaTitle: string;
      ctaSubtitle: string;
      ctaButton: string;
      ctaSecondary: string;
    };
    contact: {
      eyebrow: string;
      title: string;
      intro: string;
      emailLabel: string;
      whatsappLabel: string;
      responseTitle: string;
      responseBody: string;
      channels: readonly { title: string; body: string }[];
      ctaQuote: string;
      ctaProposal: string;
      ctaFaq: string;
    };
    proposalsLanding: {
      eyebrow: string;
      title: string;
      titleHighlight: string;
      intro: string;
      signedInHint: string;
      myProposals: string;
      featuresTitle: string;
      samplesTitle: string;
      samplesIntro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      ctaPricing: string;
    };
  };
  templates: {
    title: string;
    subtitle: string;
    openSample: string;
    openSampleHint: string;
    note: string;
    previewLabel: string;
    back: string;
    gallery: readonly {
      slug: "ruwaq-classic" | "ruwaq-executive" | "graphics-house";
      brand: string;
      title: string;
      body: string;
      badge: string;
    }[];
    headerFooterShowcase: {
      title: string;
      subtitle: string;
      selectCta: string;
      premiumBadge: string;
      premiumNote: string;
      openInNewTab: string;
    };
  };
  list: {
    title: string;
    subtitle: string;
    new: string;
    empty: string;
    emptyCta: string;
    untitled: string;
    delete: string;
    duplicate: string;
    deleteConfirm: string;
    groups: {
      review: string;
      draft: string;
      published: string;
    };
    groupEmpty: {
      review: string;
      draft: string;
      published: string;
    };
    gatesProgress: (confirmed: number, total: number) => string;
    proposalCount: (n: number) => string;
    status: {
      draft: string;
      generating: string;
      review: string;
      reviewed: string;
      exported: string;
    };
  };
  login: {
    title: string;
    subtitle: string;
    google: string;
    googleUnavailable: string;
    hint: string;
    perks: {
      profile: string;
      support: string;
      maintenance: string;
      help: string;
    };
    servicesTitle: string;
    servicesBody: string;
    servicesCta: string;
  };
  services: {
    title: string;
    subtitle: string;
    supportNote: string;
    items: {
      identity: { title: string; body: string };
      design: { title: string; body: string };
      marketing: { title: string; body: string };
    };
    cta: string;
    ctaSecondary: string;
    back: string;
  };
  company: {
    title: string;
    subtitle: string;
    sections: { identity: string; marketing: string; export: string };
    marketingHint: string;
    errors: {
      invalidPhone: string;
      invalidEmail: string;
      invalidUrl: string;
    };
    companyName: string;
    logoUrl: string;
    logoUrlPlaceholder: string;
    logoUrlHint: string;
    logoUpload: string;
    logoUploading: string;
    logoUploadFailed: string;
    logoStorageWarning: string;
    headerFooter: {
      title: string;
      hint: string;
      previewBadge: string;
      previewCompanyFallback: string;
      prefilledNotice: string;
    };
    exportTemplate: string;
    exportTemplateHint: string;
    exportTemplateOptions: {
      ruwaq: string;
      ruwaq_executive: string;
      graphics_house: string;
    };
    address: string;
    addressPlaceholder: string;
    about: string;
    aboutPlaceholder: string;
    crNumber: string;
    vatNumber: string;
    phone: string;
    email: string;
    website: string;
    portfolioUrl: string;
    portfolioUrlPlaceholder: string;
    catalogUrl: string;
    catalogUrlPlaceholder: string;
    save: string;
    saving: string;
    saveFailed: string;
    saveSuccess: string;
  };
  upgrade: {
    title: string;
    subtitle: string;
    price: string;
    priceNote: string;
    cta: string;
    inlineTitle: string;
    inlineBody: string;
    lockedSuffix: string;
    notConfigured: string;
    close: string;
    error: string;
    trialNotice: string;
  };
  graphicsHouseUpsell: {
    title: string;
    body: string;
    cta: string;
  };
  gates: {
    signInRequired: string;
    signInCta: string;
    profileIncomplete: string;
    profileIncompleteCta: string;
    quotaExceeded: string;
    quotaExceededCta: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    perMonth: string;
    freeLabel: string;
    unlimitedLabel: string;
    proposalsPerMonth: string;
    currentPlanNote: string;
    trialActiveNote: string;
    contactCta: string;
    mostPopular: string;
  };
  errors: {
    title: string;
    message: string;
    retry: string;
    home: string;
    notFoundTitle: string;
    notFoundMessage: string;
  };
  export: {
    savePdf: string;
    footer: string;
    sampleBadge: string;
    sampleFooter: string;
    logoPlaceholder: string;
    preparedFor: string;
    preparedBy: string;
    proposalNumber: string;
    date: string;
    validity: string;
    location: string;
    propertyType: string;
    area: string;
    address: string;
    aboutUs: string;
    websiteLink: string;
    portfolioLink: string;
    catalogLink: string;
    scopeOfWork: string;
    deliverables: string;
    timeline: string;
    duration: string;
    commercialTerms: string;
    total: string;
    milestone: string;
    percentage: string;
    amount: string;
    assumptions: string;
    exclusions: string;
    estimateOnly: string;
    estimatePending: string;
    estimateIndicative: string;
    tbd: string;
    crNumber: string;
    vatNumber: string;
    phone: string;
    email: string;
    acceptance: string;
    acceptanceText: string;
    clientSignature: string;
    providerSignature: string;
    pdfQuote: {
      description: string;
      qty: string;
      unitPrice: string;
      lineTotal: string;
      subtotal: string;
      vat: string;
      grandTotal: string;
      termsTitle: string;
      paymentTermsTitle: string;
      pageOf: (page: number, total: number) => string;
    };
  };
  share: {
    downloadOfficialPdf: string;
    confidentialNotice: string;
    notFoundTitle: string;
    notFoundMessage: string;
    goHome: string;
    poweredBy: string;
  };
};
