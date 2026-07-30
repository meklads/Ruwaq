import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_GUIDES } from "@/content/guides";
import { GuideCard } from "@/modules/marketplace/components/guide-card";

export async function GuidesSection() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.guides;
  const featured = RUWQ_GUIDES.slice(0, 3);

  return (
    <section className="ruwaq-ad-section border-t border-neutral-200" id="guides">
      <div className="mx-auto max-w-7xl">
        <header className="ruwaq-ad-section-header">
          <div>
            <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
            <h2 className="ruwaq-ad-section-title">{copy.title}</h2>
            <p className="ruwaq-ad-section-lead">{copy.subtitle}</p>
          </div>
          <Link href="/guides" className="ruwaq-pro-btn-outline hidden px-5 py-2 sm:inline-flex">
            {copy.viewAll}
          </Link>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((guide) => (
            <GuideCard
              key={guide.slug}
              guide={guide}
              locale={locale}
              readLabel={copy.readGuide}
              minReadLabel={copy.minRead}
            />
          ))}
        </div>

        <p className="mt-8 text-center sm:hidden">
          <Link href="/guides" className="ruwaq-pro-btn-outline px-6 py-2.5">
            {copy.viewAll}
          </Link>
        </p>
      </div>
    </section>
  );
}
