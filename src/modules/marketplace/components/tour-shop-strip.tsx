"use client";

import Link from "next/link";
import { getTourShopLinks } from "@/content/tour-shop-links";
import { trackEvent } from "@/shared/lib/analytics";
import { logClientProductEvent } from "@/modules/marketplace/server/product-event.actions";
import type { Locale } from "@/shared/i18n/locale";

type Copy = {
  title: string;
  lead: string;
};

type Props = {
  tourSlug: string;
  locale: Locale;
  copy: Copy;
};

export function TourShopStrip({ tourSlug, locale, copy }: Props) {
  const links = getTourShopLinks(tourSlug);
  if (links.length === 0) return null;

  const onClick = (slug: string, href: string) => {
    trackEvent("tour_shop_click", { tour_slug: tourSlug, listing_slug: slug });
    void logClientProductEvent("tour_shop_click", {
      tourSlug,
      listingSlug: slug,
      href,
    });
  };

  return (
    <section className="ruwaq-tour-shop mt-12 border-t border-neutral-200 pt-10">
      <h2 className="ruwaq-pf-section-heading">{copy.title}</h2>
      <p className="ruwaq-pf-about-text mt-2">{copy.lead}</p>
      <ul className="ruwaq-tour-shop__grid mt-6">
        {links.map((link) => (
          <li key={link.slug}>
            <Link
              href={link.href}
              className="ruwaq-tour-shop__card group"
              onClick={() => onClick(link.slug, link.href)}
            >
              <span className="ruwaq-tour-shop__label">
                {locale === "ar" ? link.labelAr : link.labelEn}
              </span>
              <span className="ruwaq-tour-shop__arrow" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
