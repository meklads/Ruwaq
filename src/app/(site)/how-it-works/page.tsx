import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";

export default async function HowItWorksPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.howItWorks;
  const page = t.marketplace.howItWorksPage;

  return (
    <div className="ruwaq-pro-directory">
      <header className="ruwaq-pro-directory-header text-center">
        <p className="ruwaq-pro-eyebrow text-neutral-500">{page.eyebrow}</p>
        <h1 className="ruwaq-pro-directory-title">{copy.title}</h1>
        <p className="ruwaq-pro-directory-meta mt-3 normal-case tracking-normal">{copy.subtitle}</p>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-neutral-600">{page.intro}</p>
      </header>

      <div className="ruwaq-ad-content mt-12 grid gap-12 md:grid-cols-2">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-900">
            {copy.ownersTitle}
          </h2>
          <ol className="mt-6 space-y-6">
            {copy.ownersSteps.map((step, i) => (
              <li key={step.title} className="border-s-2 border-neutral-900 ps-5">
                <p className="font-semibold text-neutral-900">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8">
            <Link href="/request-quote" className="ruwaq-pro-btn-solid px-6 py-2.5">
              {page.ctaOwners}
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-900">
            {copy.contractorsTitle}
          </h2>
          <ol className="mt-6 space-y-6">
            {copy.contractorsSteps.map((step, i) => (
              <li key={step.title} className="border-s-2 border-neutral-300 ps-5">
                <p className="font-semibold text-neutral-900">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex flex-wrap gap-3">
            <Link href="/join" className="ruwaq-pro-btn-solid px-6 py-2.5">
              {page.ctaContractors}
            </Link>
            <Link href="/proposals" className="ruwaq-pro-btn-outline px-6 py-2.5">
              {page.ctaProposals}
            </Link>
          </p>
        </section>
      </div>

      <section className="mx-auto mt-16 max-w-3xl border border-neutral-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-neutral-900">{page.trustTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">{page.trustBody}</p>
        <Link href="/about" className="ruwaq-pro-btn-outline mt-6 inline-flex px-6 py-2.5">
          {copy.learnMore}
        </Link>
      </section>
    </div>
  );
}
