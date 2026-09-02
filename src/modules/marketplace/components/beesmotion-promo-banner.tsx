import Image from "next/image";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { beesmotionReferralUrl } from "@/shared/constants/brand";
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

/** Beesmotion ad — place on contractor growth surfaces (/pro, /join), alone. */
export function BeesmotionPromoBanner({
  locale,
  campaign = "beesmotion_ad",
}: Props) {
  const ad = BEESMOTION_AD[locale];
  const href = beesmotionReferralUrl(campaign);

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
            width={1749}
            height={718}
            className="ruwaq-ad-featured-image-banner"
            sizes="(max-width: 768px) 100vw, 1140px"
          />
        </a>
      </div>
    </section>
  );
}
