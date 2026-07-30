import Image from "next/image";
import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import {
  graphicsHouseProjectLaunchReferralUrl,
  turrivaReferralUrl,
} from "@/shared/constants/brand";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  locale: Locale;
};

const TURRIVA_AD = {
  ar: {
    alt: "توريفا، هندسة معمارية وتشطيبات وبناء",
  },
  en: {
    alt: "Turriva, Architecture, Interior, Construction",
  },
} as const;

const GRAPHICS_HOUSE_AD = {
  ar: {
    alt: "جرافيكس هاوس، أنظمة المبيعات البصرية",
  },
  en: {
    alt: "Graphics House, We Build Visual Sales Systems",
  },
} as const;

const PARTNER_AD_WIDTH = 1749;
const PARTNER_AD_HEIGHT = 718;

/** Turriva + Graphics House, side by side on desktop, stacked on mobile. */
export function PartnerPromoRow({ locale }: Props) {
  const turriva = TURRIVA_AD[locale];
  const gh = GRAPHICS_HOUSE_AD[locale];
  const turrivaHref = turrivaReferralUrl("homepage_featured_ad");
  const ghHref = graphicsHouseProjectLaunchReferralUrl("homepage_featured_ad");

  return (
    <section
      className="ruwaq-ad-partner-row"
      aria-label={locale === "ar" ? "شركاء رواق" : "Ruwaq partners"}
    >
      <div className="ruwaq-ad-partner-row__frame">
        <Link
          id="turriva"
          href={turrivaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="ruwaq-ad-partner-row__item"
        >
          <Image
            src={MARKETING_IMAGES.turrivaAd}
            alt={turriva.alt}
            width={PARTNER_AD_WIDTH}
            height={PARTNER_AD_HEIGHT}
            className="ruwaq-ad-partner-row__image"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </Link>

        <Link
          id="visualization"
          href={ghHref}
          target="_blank"
          rel="noopener noreferrer"
          className="ruwaq-ad-partner-row__item"
        >
          <Image
            src={MARKETING_IMAGES.graphicsHouseAd}
            alt={gh.alt}
            width={PARTNER_AD_WIDTH}
            height={PARTNER_AD_HEIGHT}
            className="ruwaq-ad-partner-row__image"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </Link>
      </div>
    </section>
  );
}
