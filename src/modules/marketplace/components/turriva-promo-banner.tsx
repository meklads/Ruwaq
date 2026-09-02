import { MARKETING_IMAGES } from "@/content/marketing-images";
import { turrivaReferralUrl } from "@/shared/constants/brand";
import { EcosystemImageAd } from "@/modules/marketplace/components/ecosystem-image-ad";
import type { Locale } from "@/shared/i18n/locale";

const TURRIVA_AD = {
  ar: {
    alt: "توريفا — هندسة معمارية وتشطيبات وبناء فاخر",
  },
  en: {
    alt: "Turriva — Architecture, Interior, Construction",
  },
} as const;

type Props = {
  locale?: Locale;
  campaign?: string;
};

/** Turriva partner ad — tours / execution context. */
export function TurrivaPromoBanner({
  locale = "ar",
  campaign = "turriva_ad",
}: Props) {
  const ad = TURRIVA_AD[locale];

  return (
    <EcosystemImageAd
      id="turriva"
      href={turrivaReferralUrl(campaign)}
      src={MARKETING_IMAGES.turrivaAd}
      alt={ad.alt}
      external
    />
  );
}
