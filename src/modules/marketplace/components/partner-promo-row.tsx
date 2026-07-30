import Image from "next/image";
import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { turrivaReferralUrl } from "@/shared/constants/brand";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  locale: Locale;
};

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

/** Turriva + Graphics House, side by side on desktop, stacked on mobile. */
export function PartnerPromoRow({ locale }: Props) {
  const gh = GRAPHICS_HOUSE_AD[locale];
  const turrivaHref = turrivaReferralUrl("homepage_featured_ad");

  return (
    <section
      className="ruwaq-ad-partner-row scroll-mt-28"
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
            alt="Turriva, Architecture, Interior, Construction"
            width={1749}
            height={899}
            className="ruwaq-ad-partner-row__image"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </Link>

        <Link id="visualization" href="/visualization" className="ruwaq-ad-partner-row__item">
          <Image
            src={gh.src}
            alt={gh.alt}
            width={gh.width}
            height={gh.height}
            className="ruwaq-ad-partner-row__image"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </Link>
      </div>
    </section>
  );
}
