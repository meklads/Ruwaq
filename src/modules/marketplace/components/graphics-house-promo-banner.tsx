import Image from "next/image";
import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { graphicsHouseProjectLaunchReferralUrl } from "@/shared/constants/brand";
import type { Locale } from "@/shared/i18n/locale";

const GRAPHICS_HOUSE_AD = {
  ar: {
    src: MARKETING_IMAGES.graphicsHouseAdAr,
    width: 1749,
    height: 899,
    alt: "جرافيكس هاوس، أنظمة المبيعات البصرية",
  },
  en: {
    src: MARKETING_IMAGES.graphicsHouseAdEn,
    width: 1749,
    height: 899,
    alt: "Graphics House, We Build Visual Sales Systems",
  },
} as const;

type Props = {
  locale: Locale;
};

/** Graphics House banner, locale-specific asset (ad2Ar / ad2En). */
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
            src={ad.src}
            alt={ad.alt}
            width={ad.width}
            height={ad.height}
            className="ruwaq-ad-featured-image-banner"
            sizes="(max-width: 768px) 100vw, 1140px"
          />
        </Link>
      </div>
    </section>
  );
}
