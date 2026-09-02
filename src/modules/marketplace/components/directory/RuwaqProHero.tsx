import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { HeroRotatingHeadlines } from "@/modules/marketplace/components/directory/hero-rotating-headlines";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

const HERO_IMAGE = MARKETING_IMAGES.hero;

type Props = {
  magazineCopy: Messages["marketplace"]["homeMagazine"];
  proCopy: Messages["marketplace"]["proDirectory"];
  locale: Locale;
};

/** Homepage hero — quote-first (Jeddah PMF), editorial links secondary. */
export function RuwaqProHero({ magazineCopy, proCopy, locale }: Props) {
  return (
    <section className="ruwaq-pro-hero" aria-labelledby="ruwaq-pro-hero-title">
      <div
        className="ruwaq-pro-hero-bg"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        aria-hidden
      />
      <div className="ruwaq-pro-hero-overlay" aria-hidden />

      <div className="ruwaq-pro-hero-inner">
        <div className="ruwaq-pro-hero-main">
          <p className="ruwaq-pro-eyebrow">{magazineCopy.heroEyebrow}</p>

          <HeroRotatingHeadlines
            slides={magazineCopy.heroSlides}
            howMatchCta={magazineCopy.heroHowMatchCta}
          />
        </div>

        <div className="ruwaq-pro-hero-foot">
          <div className="ruwaq-pro-hero-editorial-row flex flex-wrap items-center justify-center gap-2">
            <Link href="/tours" className="ruwaq-pro-hero-chip">
              {magazineCopy.heroExploreTours}
            </Link>
            <Link href="/guides" className="ruwaq-pro-hero-chip">
              {magazineCopy.heroReadGuides}
            </Link>
            <Link href="/categories?city=jeddah" className="ruwaq-pro-hero-chip">
              {magazineCopy.heroDirectoryLink}
            </Link>
          </div>

          <p className="ruwaq-pro-hero-trust">{proCopy.trustLine}</p>

          <div className="ruwaq-pro-hero-trade-wrap">
            <Link href={proCopy.applyHref} className="ruwaq-pro-hero-trade-bar">
              {proCopy.tradeApplyBar}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
