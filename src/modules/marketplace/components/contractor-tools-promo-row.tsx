import Image from "next/image";
import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { beesmotionReferralUrl } from "@/shared/constants/brand";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  locale: Locale;
};

const AD_WIDTH = 1749;
const AD_HEIGHT = 718;

const BEESMOTION_AD = {
  ar: {
    alt: "بيز موشن، التسويق الرقمي والإنتاج الإعلامي",
  },
  en: {
    alt: "Beesmotion, Digital Marketing & Media Production",
  },
} as const;

const PROPOSALS_AD = {
  ar: {
    src: MARKETING_IMAGES.proposalsAdAr,
    alt: "رواق، أداة العروض الاحترافية",
  },
  en: {
    src: MARKETING_IMAGES.proposalsAdEn,
    alt: "Ruwaq, Professional proposal tool",
  },
} as const;

/** Beesmotion + Ruwaq proposals, side by side on desktop, stacked on mobile. */
export function ContractorToolsPromoRow({ locale }: Props) {
  const beesmotion = BEESMOTION_AD[locale];
  const proposals = PROPOSALS_AD[locale];
  const beesmotionHref = beesmotionReferralUrl("homepage_featured_ad");

  return (
    <section
      className="ruwaq-ad-partner-row ruwaq-ad-partner-row--white"
      aria-label={locale === "ar" ? "أدوات المنشآت" : "Business tools"}
    >
      <div className="ruwaq-ad-partner-row__frame">
        <a
          id="digital-marketing"
          href={beesmotionHref}
          target="_blank"
          rel="noopener noreferrer"
          className="ruwaq-ad-partner-row__item"
        >
          <Image
            src={MARKETING_IMAGES.beesmotionAd}
            alt={beesmotion.alt}
            width={AD_WIDTH}
            height={AD_HEIGHT}
            className="ruwaq-ad-partner-row__image"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </a>

        <Link
          id="contractor-promo"
          href="/proposals/new"
          className="ruwaq-ad-partner-row__item"
        >
          <Image
            src={proposals.src}
            alt={proposals.alt}
            width={AD_WIDTH}
            height={AD_HEIGHT}
            className="ruwaq-ad-partner-row__image"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </Link>
      </div>
    </section>
  );
}
