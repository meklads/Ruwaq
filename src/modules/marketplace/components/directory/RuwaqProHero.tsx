import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import type { Messages } from "@/shared/i18n/messages/types";

const HERO_IMAGE = MARKETING_IMAGES.hero;

type Props = {
  magazineCopy: Messages["marketplace"]["homeMagazine"];
  proCopy: Messages["marketplace"]["proDirectory"];
};

export function RuwaqProHero({ magazineCopy, proCopy }: Props) {
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

        <div className="ruwaq-pro-hero-dual-cta mt-8 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <Link href="/tours" className="ruwaq-pro-hero-category-box sm:min-w-[11rem]">
            {magazineCopy.heroExploreTours}
          </Link>
          <Link href="/guides" className="ruwaq-pro-hero-category-box sm:min-w-[11rem]">
            {magazineCopy.heroReadGuides}
          </Link>
        </div>

        <p className="mt-6">
          <Link href="#directory" className="ruwaq-pro-hero-meta-link ruwaq-pro-hero-meta-link--gold">
            {magazineCopy.heroDirectoryLink}
          </Link>
        </p>

        <div className="ruwaq-pro-hero-trade-wrap">
          <Link href={proCopy.applyHref} className="ruwaq-pro-hero-trade-bar">
            {proCopy.tradeApplyBar}
          </Link>
        </div>
      </div>
    </section>
  );
}
