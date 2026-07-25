import Image from "next/image";
import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

const HERO_IMAGE = "/brand/hero/hero.webp";

type Props = {
  hero: Messages["sales"]["hero"];
  locale: Locale;
};

function HeroSkyBackdrop() {
  return (
    <div className="ruwaq-hero-sky-media" aria-hidden>
      <div className="ruwaq-hero-clouds">
        <span className="ruwaq-hero-cloud ruwaq-hero-cloud--a" />
        <span className="ruwaq-hero-cloud ruwaq-hero-cloud--b" />
        <span className="ruwaq-hero-cloud ruwaq-hero-cloud--c" />
        <span className="ruwaq-hero-cloud ruwaq-hero-cloud--d" />
      </div>
    </div>
  );
}

/** Optimistic sky hero — image left, copy right, animated clouds. */
export function MarketingHero({ hero, locale }: Props) {
  const arrow = locale === "ar" ? "←" : "→";
  const textDir = locale === "ar" ? "rtl" : "ltr";

  return (
    <section className="ruwaq-landing-hero ruwaq-landing-hero--sky">
      <HeroSkyBackdrop />
      <div className="ruwaq-hero-split ruwaq-reveal">
        <div className="ruwaq-hero-copy" dir={textDir}>
          <p className="ruwaq-hero-eyebrow">{hero.eyebrow}</p>
          <h1 className="ruwaq-hero-title mt-5 sm:mt-6">
            {hero.title}
            <span className="ruwaq-hero-title-highlight"> {hero.titleHighlight}</span>
          </h1>
          <div className="ruwaq-hero-subtitle mt-6 sm:mt-7">
            <p className="ruwaq-hero-lead-intro">{hero.subtitleIntro}</p>
            <ul className="ruwaq-hero-inputs" aria-label={hero.subtitleIntro}>
              {hero.subtitleInputs.map((input, i) => (
                <li key={input} className="ruwaq-hero-input-pill">
                  <span className="ruwaq-hero-input-num" aria-hidden>
                    {i + 1}
                  </span>
                  {input}
                </li>
              ))}
            </ul>
            <p className="ruwaq-hero-lead-outcome">
              {hero.subtitleOutcomeBefore}
              <span className="ruwaq-hero-lead-highlight">{hero.subtitleHighlight}</span>
              {hero.subtitleOutcomeAfter}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 sm:mt-12">
            <Link href="/proposals/new" className="btn-ruwaq-hero-gold px-10 py-4 text-base">
              {hero.cta} {arrow}
            </Link>
            <Link href="/templates/sample" className="btn-ruwaq-hero-outline px-8 py-3.5">
              {hero.ctaSecondary}
            </Link>
          </div>
          <p className="ruwaq-hero-microcopy mt-6">{hero.microcopy}</p>
        </div>

        <div className="ruwaq-hero-visual">
          <div className="ruwaq-hero-circle">
            <Image
              src={HERO_IMAGE}
              alt={hero.title}
              fill
              priority
              quality={85}
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 512px"
              className="ruwaq-hero-circle-image object-cover"
            />
          </div>
          <div className="ruwaq-hero-float-badge">
            <span className="ruwaq-hero-float-badge-icon" aria-hidden>
              ✓
            </span>
            <div>
              <p className="ruwaq-hero-float-badge-title">{hero.imageBadgeTitle}</p>
              <p className="ruwaq-hero-float-badge-text">{hero.imageBadge}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
