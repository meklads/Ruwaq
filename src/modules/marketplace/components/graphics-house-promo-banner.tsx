import Image from "next/image";
import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { graphicsHouseProjectLaunchReferralUrl } from "@/shared/constants/brand";
import type { Locale } from "@/shared/i18n/locale";

const GRAPHICS_HOUSE_AD = {
  ar: {
    alt: "جرافيكس هاوس، أنظمة المبيعات البصرية",
  },
  en: {
    alt: "Graphics House, We Build Visual Sales Systems",
  },
} as const;

type Props = {
  locale: Locale;
};

/** Graphics House banner (shared ad2En2 asset for all locales). */
export function GraphicsHousePromoBanner({ locale }: Props) {
  const ad = GRAPHICS_HOUSE_AD[locale];

  return (
    <section
      id="visualization"
      className="ruwaq-ad-featured-section ruwaq-ad-featured-section--stone scroll-mt-28"
      aria-label={ad.alt}
    >
      <div className="ruwaq-ad-featured-section__frame">
        <Link
          href={graphicsHouseProjectLaunchReferralUrl("homepage_featured_ad")}
          target="_blank"
          rel="noopener noreferrer"
          className="ruwaq-ad-featured-image-link"
        >
          <Image
            src={MARKETING_IMAGES.graphicsHouseAd}
            alt={ad.alt}
            width={1749}
            height={718}
            className="ruwaq-ad-featured-image-banner"
            sizes="(max-width: 768px) 100vw, 1140px"
          />
        </Link>
      </div>
    </section>
  );
}
