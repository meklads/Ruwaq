import Image from "next/image";
import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { turrivaReferralUrl } from "@/shared/constants/brand";
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

/** Turriva partner ad — place on tours / Jeddah hub (execution context), not stacked with other ecosystem ads. */
export function TurrivaPromoBanner({
  locale = "ar",
  campaign = "turriva_ad",
}: Props) {
  const ad = TURRIVA_AD[locale];
  const href = turrivaReferralUrl(campaign);

  return (
    <section
      id="turriva"
      className="ruwaq-ad-featured-section ruwaq-ad-featured-section--white scroll-mt-28"
      aria-label={ad.alt}
    >
      <div className="ruwaq-ad-featured-section__frame">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="ruwaq-ad-featured-image-link"
        >
          <Image
            src={MARKETING_IMAGES.turrivaAd}
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
