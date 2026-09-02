import { MARKETING_IMAGES } from "@/content/marketing-images";
import { graphicsHouseProjectLaunchReferralUrl } from "@/shared/constants/brand";
import { EcosystemImageAd } from "@/modules/marketplace/components/ecosystem-image-ad";
import type { Locale } from "@/shared/i18n/locale";

const GRAPHICS_HOUSE_AD = {
  ar: {
    alt: "جرافيكس هاوس — ProjectLaunch™ لإطلاق المشاريع العقارية",
  },
  en: {
    alt: "Graphics House — ProjectLaunch™ for real estate developments",
  },
} as const;

type Props = {
  locale: Locale;
  campaign?: string;
};

/** Graphics House ProjectLaunch™ — developer / visualization surfaces. */
export function GraphicsHousePromoBanner({
  locale,
  campaign = "graphics_house_ad",
}: Props) {
  const ad = GRAPHICS_HOUSE_AD[locale];

  return (
    <EcosystemImageAd
      id="visualization"
      href={graphicsHouseProjectLaunchReferralUrl(campaign)}
      src={MARKETING_IMAGES.graphicsHouseAd}
      alt={ad.alt}
      sectionTone="stone"
      external
    />
  );
}
