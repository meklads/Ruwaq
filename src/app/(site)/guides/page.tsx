import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_GUIDES } from "@/content/guides";
import { GuideCard } from "@/modules/marketplace/components/guide-card";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.marketplace.guides.metaTitle,
    description: t.marketplace.guides.metaDescription,
  };
}

export default async function GuidesIndexPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.guides;

  return (
    <div className="ruwaq-ad-page">
      <header className="ruwaq-ad-section border-b border-neutral-200 pb-10">
        <div className="mx-auto max-w-7xl">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title">{copy.title}</h1>
          <p className="ruwaq-ad-section-lead">{copy.subtitle}</p>
        </div>
      </header>
      <div className="ruwaq-ad-section">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RUWQ_GUIDES.map((guide) => (
              <GuideCard
                key={guide.slug}
                guide={guide}
                locale={locale}
                readLabel={copy.readGuide}
                minReadLabel={copy.minRead}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
