import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { QuoteRequestForm } from "@/modules/marketplace/components/quote-request-form";
import { GraphicsHousePromoBanner } from "@/modules/marketplace/components/graphics-house-promo-banner";
import {
  parseCategorySlug,
  parseCitySlug,
  parseQuoteIntent,
} from "@/modules/marketplace/lib/marketplace-slugs";
import { env } from "@/shared/lib/env";

type Props = {
  searchParams: { city?: string; category?: string };
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getMessages(locale).marketplace.quote;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `${env.NEXT_PUBLIC_APP_URL}/request-quote`,
    },
  };
}

export default async function RequestQuotePage({ searchParams }: Props) {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.quote;
  const initialIntent = parseQuoteIntent(searchParams.category);

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-join-editorial">
        <aside className="ruwaq-join-editorial-aside">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title mt-3">{copy.title}</h1>
          <p className="ruwaq-ad-section-lead mt-4">{copy.pageLead}</p>

          <div className="ruwaq-quote-steps">
            {copy.steps.map((step) => (
              <div key={step.title} className="ruwaq-quote-step">
                <h2 className="text-sm font-semibold text-neutral-950">{step.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <h2 className="ruwaq-ad-card-title text-base">{copy.trustTitle}</h2>
            <ul className="ruwaq-quote-trust-list">
              {copy.trustItems.map((item) => (
                <li key={item}>
                  <span className="mt-0.5 text-neutral-950" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/how-we-match"
              className="mt-5 inline-flex text-sm font-semibold text-neutral-950 underline underline-offset-4"
            >
              {copy.howMatchLink}
            </Link>
          </div>
        </aside>

        <div className="ruwaq-join-editorial-form">
          <QuoteRequestForm
            copy={copy}
            visualizationCopy={t.marketplace.visualization}
            locale={locale}
            initialCity={parseCitySlug(searchParams.city)}
            initialCategory={
              initialIntent === "visualization"
                ? "fit-out"
                : parseCategorySlug(searchParams.category)
            }
            initialIntent={initialIntent}
            variant="page"
          />
        </div>
      </div>

      <GraphicsHousePromoBanner locale={locale} campaign="request_quote_page_ad" />
    </div>
  );
}
