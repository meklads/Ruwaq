import Link from "next/link";
import type { Metadata } from "next";
import { SPONSORED_LAUNCH_PACKAGES } from "@/content/sponsored-launch-packages";
import { GraphicsHousePromoBanner } from "@/modules/marketplace/components/graphics-house-promo-banner";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.site.developers.metaTitle,
    description: t.site.developers.metaDescription,
  };
}

export default async function DevelopersPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.site.developers;
  const isAr = locale === "ar";

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-content py-12 lg:py-16">
        <header className="ruwaq-ad-section-header max-w-3xl">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title">{copy.title}</h1>
          <p className="ruwaq-ad-section-lead">{copy.lead}</p>
        </header>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {SPONSORED_LAUNCH_PACKAGES.map((pkg) => (
            <li
              key={pkg.tier}
              className={
                pkg.highlighted
                  ? "ruwaq-dev-package ruwaq-dev-package--highlight"
                  : "ruwaq-dev-package"
              }
            >
              <p className="ruwaq-dev-package__tier">{isAr ? pkg.nameAr : pkg.nameEn}</p>
              <p className="ruwaq-dev-package__price">
                {isAr ? pkg.priceNoteAr : pkg.priceNoteEn}
              </p>
              <p className="ruwaq-dev-package__summary">
                {isAr ? pkg.summaryAr : pkg.summaryEn}
              </p>
              <ul className="ruwaq-dev-package__includes">
                {(isAr ? pkg.includesAr : pkg.includesEn).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <section className="mt-12 max-w-2xl border border-neutral-200 bg-neutral-50 p-8">
          <h2 className="ruwaq-ad-section-title text-xl">{copy.contactTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">{copy.contactLead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/visualization" className="ruwaq-pro-btn-solid px-6 py-3">
              {copy.contactCta}
            </Link>
            <Link href="/contact" className="ruwaq-pro-btn-outline px-6 py-3">
              {copy.contactAlt}
            </Link>
          </div>
        </section>
      </div>

      <GraphicsHousePromoBanner locale={locale} campaign="developers_page_ad" />
    </div>
  );
}
