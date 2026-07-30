import Image from "next/image";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { beesmotionReferralUrl } from "@/shared/constants/brand";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  locale: Locale;
};

const BEESMOTION_AD = {
  ar: {
    alt: "بيز موشن، التسويق الرقمي والإنتاج الإعلامي",
  },
  en: {
    alt: "Beesmotion, Digital Marketing & Media Production",
  },
} as const;

/** Beesmotion banner for contractors — between partner row and proposals ad. */
export function BeesmotionPromoBanner({ locale }: Props) {
  const ad = BEESMOTION_AD[locale];
  const href = beesmotionReferralUrl("homepage_featured_ad");

  return (
    <section
      id="digital-marketing"
      className="ruwaq-ad-featured-section ruwaq-ad-featured-section--white scroll-mt-28"
      aria-label={ad.alt}
    >
      <div className="ruwaq-ad-featured-section__frame">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="ruwaq-ad-featured-image-link"
        >
          <Image
            src={MARKETING_IMAGES.beesmotionAd}
            alt={ad.alt}
            width={1774}
            height={887}
            className="ruwaq-ad-featured-image-banner"
            sizes="(max-width: 768px) 100vw, 1140px"
          />
        </a>
      </div>
    </section>
  );
}
