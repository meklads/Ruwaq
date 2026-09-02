import { MARKETING_IMAGES } from "@/content/marketing-images";
import { EcosystemImageAd } from "@/modules/marketplace/components/ecosystem-image-ad";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  locale: Locale;
};

const PROPOSALS_AD = {
  ar: {
    src: MARKETING_IMAGES.proposalsAdAr,
    alt: "نَسَق من رواق — عروض احترافية تفوز بالعملاء في دقائق",
  },
  en: {
    src: MARKETING_IMAGES.proposalsAdEn,
    alt: "NASAQ by Ruwaq — Create professional proposals that win clients in minutes",
  },
} as const;

/** Ruwaq proposal tool — /pricing. */
export function ContractorPromoBanner({ locale }: Props) {
  const ad = PROPOSALS_AD[locale];

  return (
    <EcosystemImageAd
      id="contractor-promo"
      href="/proposals/new"
      src={ad.src}
      alt={ad.alt}
    />
  );
}
