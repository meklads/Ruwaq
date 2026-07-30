import Link from "next/link";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import { MarketplaceSearchBar } from "@/modules/marketplace/components/marketplace-search-bar";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

/** Editorial luxury interior — strong depth for white type + search card */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1618221195710-e0661401dec6?q=80&w=1920&auto=format&fit=crop";

const QUICK_CATEGORY_SLUGS = ["fit-out", "contracting", "kitchens", "luxury-materials"] as const;

type Props = {
  copy: Messages["marketplace"]["proDirectory"];
  searchCopy: Messages["marketplace"]["search"];
  locale: Locale;
  citySlug?: (typeof MARKETPLACE_CITIES)[number]["slug"];
};

export function RuwaqProHero({
  copy,
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
      <div className="ruwaq-pro-hero-vignette" aria-hidden />

      <div className="ruwaq-pro-hero-inner">
        <p className="ruwaq-pro-eyebrow-badge">{copy.eyebrow}</p>

        <h1
          id="ruwaq-pro-hero-title"
          className="ruwaq-pro-display mt-5 text-4xl md:text-[3.35rem] md:leading-[1.12]"
        >
          {copy.titleBefore}{" "}
          <span className="ruwaq-pro-display-accent">{copy.titleAccent}</span>
          {copy.titleAfter ? <> {copy.titleAfter}</> : null}
        </h1>

        <p className="ruwaq-pro-subtitle mt-4 max-w-2xl text-base md:text-lg">{copy.subtitle}</p>

        <MarketplaceSearchBar copy={searchCopy} locale={locale} variant="hero" />

        <p className="ruwaq-pro-hero-trust mt-4">{copy.trustLine}</p>

        <div className="ruwaq-pro-hero-chips mt-8 flex flex-wrap justify-center gap-2">
          {quickCategories.map((cat) => (
            <Link key={cat.href} href={cat.href} className="ruwaq-pro-hero-chip">
              {cat.label}
            </Link>
          ))}
          <Link href="/categories" className="ruwaq-pro-hero-chip">
            {copy.allCategories}
          </Link>
          <Link href="/pro" className="ruwaq-pro-hero-chip ruwaq-pro-hero-chip--accent">
            {copy.featuredLink}
          </Link>
        </div>

        <div className="ruwaq-pro-hero-meta mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
          <Link href="/request-quote" className="ruwaq-pro-hero-meta-link">
            {copy.requestQuoteLink}
          </Link>
          <span className="text-white/35" aria-hidden>
            ·
          </span>
          <Link href="/join" className="ruwaq-pro-hero-meta-link">
            {copy.applyCta}
          </Link>
          <span className="text-white/35" aria-hidden>
            ·
          </span>
          <Link href="/proposals" className="ruwaq-pro-hero-meta-link ruwaq-pro-hero-meta-link--gold">
            {copy.proposalStudioLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
