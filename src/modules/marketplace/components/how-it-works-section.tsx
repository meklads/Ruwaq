import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["howItWorks"];
  locale: Locale;
};

export function HowItWorksSection({ copy, locale }: Props) {
  return (
    <section className="border-t border-neutral-200 bg-white px-4 py-16 sm:px-6">
      <div className="ruwaq-ad-content">
        <h2 className="ruwaq-pro-directory-title text-center text-2xl md:text-3xl">
          {copy.title}
        </h2>
        <p className="ruwaq-pro-directory-meta mt-3 text-center">{copy.subtitle}</p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-900">
              {copy.ownersTitle}
            </h3>
            <ol className="mt-4 space-y-4">
              {copy.ownersSteps.map((step, i) => (
                <li key={step.title} className="border-s-2 border-neutral-900 ps-4">
                  <p className="font-semibold text-neutral-900">
                    {i + 1}. {step.title}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-900">
              {copy.contractorsTitle}
            </h3>
            <ol className="mt-4 space-y-4">
              {copy.contractorsSteps.map((step, i) => (
                <li key={step.title} className="border-s-2 border-neutral-300 ps-4">
                  <p className="font-semibold text-neutral-900">
                    {i + 1}. {step.title}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="mt-10 text-center">
          <Link href="/how-it-works" className="ruwaq-pro-btn-outline px-6 py-2.5">
            {copy.learnMore}
          </Link>
        </p>
      </div>
    </section>
  );
}
