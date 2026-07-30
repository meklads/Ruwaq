import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["pages"]["faq"];
  locale: Locale;
};

export function FaqPageContent({ copy, locale }: Props) {
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-page-inner">
        <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
        <h1 className="ruwaq-ad-section-title">{copy.title}</h1>
        <p className="ruwaq-ad-section-lead mt-6">{copy.intro}</p>

        <section className="mt-12 border-t border-neutral-200 pt-12">
          <h2 className="ruwaq-ad-card-title text-xl">{copy.differentiatorsTitle}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {copy.differentiators.map((item) => (
              <div key={item.title} className="border border-neutral-200 p-6">
                <h3 className="font-semibold text-neutral-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-neutral-200 pt-12">
          <h2 className="ruwaq-ad-card-title text-xl">{copy.subscriptionTitle}</h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">{copy.subscriptionIntro}</p>
          <ol className="mt-8 space-y-6">
            {copy.subscriptionSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-neutral-900 text-xs font-semibold">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 border-t border-neutral-200 pt-12">
          <h2 className="ruwaq-ad-card-title text-xl">{copy.questionsTitle}</h2>
          <dl className="mt-8 space-y-8">
            {copy.questions.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-neutral-950">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-16 border border-neutral-950 bg-neutral-950 p-8 text-center text-white sm:p-10">
          <h2 className="text-xl font-semibold sm:text-2xl">{copy.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/75">{copy.ctaSubtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/proposals/new" className="ruwaq-pro-btn-solid border-white bg-white px-8 py-3 text-neutral-950 hover:bg-neutral-100">
              {copy.ctaButton} {arrow}
            </Link>
            <Link href="/pricing" className="ruwaq-pro-btn-outline border-white/40 px-8 py-3 text-white hover:bg-white/10">
              {copy.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
