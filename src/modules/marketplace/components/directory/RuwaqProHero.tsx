import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
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
        <p className="ruwaq-pro-eyebrow">{magazineCopy.heroEyebrow}</p>

        <h1 id="ruwaq-pro-hero-title" className="ruwaq-pro-display ruwaq-pro-display--hero">
          {magazineCopy.heroTitle}
        </h1>

        <p className="ruwaq-pro-subtitle mt-3 max-w-2xl text-base md:text-lg">
          {magazineCopy.heroSubtitle}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/request-quote"
            className="ruwaq-pro-btn-solid inline-flex min-w-[240px] justify-center px-10 py-4 text-sm"
          >
            {magazineCopy.heroPrimaryCta}
          </Link>
          <Link
            href="/how-we-match"
            className="ruwaq-pro-btn-outline inline-flex min-w-[200px] justify-center border-white/40 bg-white/5 px-8 py-4 text-sm text-white hover:bg-white/10"
          >
            {magazineCopy.heroHowMatchCta}
          </Link>
        </div>

        <div className="ruwaq-pro-hero-editorial-row mt-6 flex flex-wrap items-center justify-center gap-2">
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

        <p className="ruwaq-pro-hero-trust mt-5">{proCopy.trustLine}</p>

        <div className="ruwaq-pro-hero-trade-wrap">
          <Link href={proCopy.applyHref} className="ruwaq-pro-hero-trade-bar">
            {proCopy.tradeApplyBar}
          </Link>
        </div>
      </div>
    </section>
  );
}
