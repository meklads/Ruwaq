import Link from "next/link";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { MarketplaceSearchBar } from "@/modules/marketplace/components/marketplace-search-bar";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

const HERO_IMAGE = MARKETING_IMAGES.hero;

const QUICK_CATEGORY_SLUGS = ["fit-out", "contracting", "kitchens", "luxury-materials"] as const;

type Props = {
  magazineCopy: Messages["marketplace"]["homeMagazine"];
  proCopy: Messages["marketplace"]["proDirectory"];
  searchCopy: Messages["marketplace"]["search"];
  locale: Locale;
  citySlug?: (typeof MARKETPLACE_CITIES)[number]["slug"];
};

/** Homepage hero — directory-first (search + sectors), editorial links secondary. */
export function RuwaqProHero({
  magazineCopy,
  proCopy,
  searchCopy,
  locale,
  citySlug = "jeddah",
}: Props) {
  const quickCategories = QUICK_CATEGORY_SLUGS.flatMap((slug) => {
    const cat = MARKETPLACE_CATEGORIES.find((c) => c.slug === slug);
    if (!cat) return [];
    return [
      {
        href: `/${citySlug}/${slug}`,
        label: locale === "ar" ? cat.nameAr : cat.nameEn,
      },
    ];
  });

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

        <MarketplaceSearchBar copy={searchCopy} locale={locale} variant="hero" />

        <div className="ruwaq-pro-hero-category-row">
          {quickCategories.map((cat) => (
            <Link key={cat.href} href={cat.href} className="ruwaq-pro-hero-category-box">
              {cat.label}
            </Link>
          ))}
          <Link href="/categories" className="ruwaq-pro-hero-category-box">
            {proCopy.allCategories}
          </Link>
        </div>

        <div className="ruwaq-pro-hero-editorial-row mt-5 flex flex-wrap items-center justify-center gap-2">
          <Link href="#directory" className="ruwaq-pro-hero-chip ruwaq-pro-hero-chip--accent">
            {magazineCopy.heroDirectoryCta}
          </Link>
          <Link href="/tours" className="ruwaq-pro-hero-chip">
            {magazineCopy.heroExploreTours}
          </Link>
          <Link href="/guides" className="ruwaq-pro-hero-chip">
            {magazineCopy.heroReadGuides}
          </Link>
        </div>

        <p className="ruwaq-pro-hero-trust mt-4">{proCopy.trustLine}</p>

        <div className="ruwaq-pro-hero-trade-wrap">
          <Link href={proCopy.applyHref} className="ruwaq-pro-hero-trade-bar">
            {proCopy.tradeApplyBar}
          </Link>
        </div>
      </div>
    </section>
  );
}
