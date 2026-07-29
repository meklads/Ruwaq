import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import Link from "next/link";

export default async function AboutPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const content = t.marketplace.aboutPage;

  return (
    <div className="app-content-area max-w-3xl py-12 sm:py-16">
      <p className="ruwaq-eyebrow">{content.eyebrow}</p>
      <h1 className="ruwaq-app-title mt-3">{content.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-ruwaq-ink-soft">{content.intro}</p>

      <div className="mt-12 space-y-10">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold text-ruwaq-ink">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-ruwaq-ink-soft">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link href="/request-quote" className="btn-ruwaq-primary px-8 py-3.5">
          {t.nav.requestQuote}
        </Link>
        <Link href="/categories" className="btn-ruwaq-secondary px-8 py-3.5">
          {t.nav.browseCategories}
        </Link>
      </div>
    </div>
  );
}
