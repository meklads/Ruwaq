import Link from "next/link";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop";

const QUICK_CATEGORY_SLUGS = ["fit-out", "contracting", "hvac"] as const;

type Props = {
  copy: Messages["marketplace"]["proDirectory"];
  locale: Locale;
  citySlug?: (typeof MARKETPLACE_CITIES)[number]["slug"];
};

export function RuwaqProHero({
  copy,
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
        <p className="ruwaq-pro-eyebrow">{copy.eyebrow}</p>
        <h1
          id="ruwaq-pro-hero-title"
          className="ruwaq-pro-display mt-4 font-serif text-4xl tracking-tight md:text-6xl"
        >
          {copy.title}
        </h1>
        <p className="ruwaq-pro-subtitle">{copy.subtitle}</p>

        {/* Dual-CTA: clients — category pills */}
        <div className="ruwaq-pro-hero-dual-cta mt-10 w-full max-w-4xl">
          <p className="ruwaq-pro-hero-section-label">{copy.clientsSection}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {quickCategories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="ruwaq-pro-chip">
                {cat.label}
              </Link>
            ))}
            <Link href="/categories" className="ruwaq-pro-chip">
              {copy.allCategories}
            </Link>
            <Link href="/pro" className="ruwaq-pro-chip">
              {copy.featuredLink}
            </Link>
          </div>
        </div>

        {/* Dual-CTA: providers — join directory */}
        <div className="ruwaq-pro-hero-dual-cta mt-10 flex flex-col items-center">
          <p className="ruwaq-pro-hero-section-label">{copy.providersSection}</p>
          <Link href={copy.applyHref} className="ruwaq-pro-apply mt-4">
            {copy.applyCta}
          </Link>
          <p className="mt-3 max-w-md text-[10px] uppercase tracking-widest text-white/60">
            {copy.applyHint}
          </p>
        </div>
      </div>
    </section>
  );
}
