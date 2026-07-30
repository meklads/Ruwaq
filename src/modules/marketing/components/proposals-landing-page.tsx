import Link from "next/link";
import { TemplateSampleGallery } from "@/modules/marketing/components/template-sample-gallery";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["pages"]["proposalsLanding"];
  sales: Messages["sales"];
  templates: Messages["templates"];
  locale: Locale;
  isSignedIn: boolean;
  startProposalLabel: string;
};

export function ProposalsLandingPage({
  copy,
  sales,
  templates,
  locale,
  isSignedIn,
  startProposalLabel,
}: Props) {
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-page-inner">
        <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
        <h1 className="ruwaq-ad-section-title mt-3">
          {copy.title}{" "}
          <span className="text-ruwaq-gold">{copy.titleHighlight}</span>
        </h1>
        <p className="ruwaq-ad-section-lead mt-6">{copy.intro}</p>

        {isSignedIn ? (
          <p className="mt-6 text-sm text-neutral-600">
            {copy.signedInHint}{" "}
            <Link href="/workspace/proposals" className="font-semibold text-neutral-950 underline underline-offset-2">
              {copy.myProposals}
            </Link>
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/proposals/new" className="ruwaq-pro-btn-solid px-8 py-3">
            {copy.ctaPrimary} {arrow}
          </Link>
          <Link href="/templates/sample" className="ruwaq-pro-btn-outline px-8 py-3">
            {copy.ctaSecondary}
          </Link>
          <Link href="/pricing" className="ruwaq-pro-btn-outline px-8 py-3">
            {copy.ctaPricing}
          </Link>
        </div>

        <section className="mt-14 border-t border-neutral-200 pt-12">
          <h2 className="ruwaq-ad-card-title text-xl">{copy.featuresTitle}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sales.features.items.map((item) => (
              <div key={item.title} className="border border-neutral-200 p-6">
                <h3 className="font-semibold text-neutral-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-neutral-200 pt-12">
          <h2 className="ruwaq-ad-card-title text-xl">{copy.samplesTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">{copy.samplesIntro}</p>
          <div className="mt-10">
            <TemplateSampleGallery
              locale={locale}
              items={templates.gallery}
              labels={{
                openSample: templates.openSample,
                openSampleHint: templates.openSampleHint,
                note: templates.note,
                previewLabel: templates.previewLabel,
              }}
              startCta={startProposalLabel}
            />
          </div>
        </section>

        <section className="mt-14 border-t border-neutral-200 pt-12">
          <h2 className="ruwaq-ad-card-title text-xl">{sales.steps.title}</h2>
          <ol className="mt-8 space-y-6">
            {sales.steps.items.map((step, index) => (
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
      </div>
    </div>
  );
}
