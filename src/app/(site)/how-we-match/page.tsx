import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.howWeMatch;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `${env.NEXT_PUBLIC_APP_URL}/how-we-match`,
    },
  };
}

export default async function HowWeMatchPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.howWeMatch;

  return (
    <div className="ruwaq-pro-directory">
      <header className="ruwaq-pro-directory-header text-center">
        <p className="ruwaq-pro-eyebrow text-neutral-500">{copy.eyebrow}</p>
        <h1 className="ruwaq-pro-directory-title">{copy.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-neutral-600">{copy.lead}</p>
      </header>

      <ol className="ruwaq-ad-content mx-auto mt-12 max-w-3xl space-y-8">
        {copy.steps.map((step) => (
          <li key={step.title} className="border-s-2 border-neutral-900 ps-6">
            <h2 className="text-lg font-semibold text-neutral-900">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
          </li>
        ))}
      </ol>

      <section className="ruwaq-ad-content mx-auto mt-16 max-w-3xl border border-neutral-200 bg-white p-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-900">
          {copy.criteriaTitle}
        </h2>
        <ul className="mt-6 space-y-3">
          {copy.criteria.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a063]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="ruwaq-ad-content mx-auto mt-16 max-w-3xl border border-neutral-950 bg-neutral-950 px-8 py-10 text-center text-white">
        <h2 className="font-serif text-2xl font-medium">{copy.ctaTitle}</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/request-quote" className="ruwaq-pro-btn-solid bg-[#c9a063] px-8 py-3 text-neutral-950 hover:bg-[#d4b47a]">
            {copy.ctaQuote}
          </Link>
          <Link
            href="/join"
            className="inline-flex items-center border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            {copy.ctaJoin}
          </Link>
        </div>
      </section>
    </div>
  );
}
