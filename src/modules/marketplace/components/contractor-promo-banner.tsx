import Image from "next/image";
import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  locale: Locale;
};

const PROPOSALS_AD = {
  ar: {
    src: MARKETING_IMAGES.proposalsAdAr,
    width: 1874,
    height: 839,
    alt: "رواق، أداة العروض الاحترافية",
  },
  en: {
    src: MARKETING_IMAGES.proposalsAdEn,
    width: 1871,
    height: 840,
    alt: "Ruwaq, Professional proposal tool",
  },
} as const;

/** Proposal OS banner, locale-specific asset (ad3Ar / ad3En). */
export function ContractorPromoBanner({ locale }: Props) {
  const ad = PROPOSALS_AD[locale];

  return (
    <section
      id="contractor-promo"
      className="ruwaq-ad-featured-section ruwaq-ad-featured-section--stone scroll-mt-28"
      aria-label={ad.alt}
    >
      <div className="ruwaq-ad-featured-section__frame">
        <Link href="/proposals/new" className="ruwaq-ad-featured-image-link">
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
