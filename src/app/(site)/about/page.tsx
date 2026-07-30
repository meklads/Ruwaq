import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";

export default async function AboutPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const content = t.marketplace.aboutPage;

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-page-inner">
        <p className="ruwaq-ad-eyebrow">{content.eyebrow}</p>
        <h1 className="ruwaq-ad-section-title">{content.title}</h1>
        <p className="ruwaq-ad-section-lead mt-6">{content.intro}</p>

        <p className="mt-8 border border-neutral-200 bg-neutral-50 p-6 text-sm leading-relaxed text-neutral-700">
          {content.businessNote}
        </p>

        <div className="mt-12 space-y-10 border-t border-neutral-200 pt-12">
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="ruwaq-ad-card-title text-xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-14 text-xs uppercase tracking-widest text-neutral-500">
          {content.closingHint}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/categories" className="ruwaq-pro-btn-solid px-8 py-3">
            {t.nav.browseCategories}
          </Link>
          <Link href="/how-it-works" className="ruwaq-pro-btn-outline px-8 py-3">
            {t.site.nav.howItWorks}
          </Link>
          <Link href="/proposals" className="ruwaq-pro-btn-outline px-8 py-3">
            {t.nav.contractorHub}
          </Link>
        </div>
      </div>
    </div>
  );
}
