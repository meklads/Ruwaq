import type { MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";

export type JeddahLandingSection = {
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
};

export type JeddahLandingFaq = {
  qAr: string;
  qEn: string;
  aAr: string;
  aEn: string;
};

export type JeddahSectorLanding = {
  categorySlug: MarketplaceCategorySlug;
  heroTitleAr: string;
  heroTitleEn: string;
  heroLeadAr: string;
  heroLeadEn: string;
  metaTitleAr: string;
  metaTitleEn: string;
  metaDescriptionAr: string;
  metaDescriptionEn: string;
  sections: JeddahLandingSection[];
  faq: JeddahLandingFaq[];
  relatedGuideSlugs: string[];
};

export type JeddahIntentLanding = JeddahSectorLanding & {
  intentSlug: string;
};
