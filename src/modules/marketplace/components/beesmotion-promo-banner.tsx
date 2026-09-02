import { MARKETING_IMAGES } from "@/content/marketing-images";
import { beesmotionReferralUrl } from "@/shared/constants/brand";
import { EcosystemImageAd } from "@/modules/marketplace/components/ecosystem-image-ad";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  locale: Locale;
  campaign?: string;
};

const BEESMOTION_AD = {
  ar: {
    alt: "بيز موشن — تسويق رقمي وإنتاج إعلامي للمنشآت",
  },
  en: {
    alt: "Beesmotion — Digital marketing & media production",
  },
} as const;

/** Beesmotion ad — contractor growth surfaces (/pro). */
export function BeesmotionPromoBanner({
  locale,
  campaign = "beesmotion_ad",
}: Props) {
  const ad = BEESMOTION_AD[locale];

  return (
    <EcosystemImageAd
      id="digital-marketing"
      href={beesmotionReferralUrl(campaign)}
      src={MARKETING_IMAGES.beesmotionAd}
      alt={ad.alt}
      external
    />
  );
}
