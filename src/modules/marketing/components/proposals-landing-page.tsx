import Link from "next/link";
import { TemplateSampleGallery } from "@/modules/marketing/components/template-sample-gallery";
import { NasaqBrandLockup } from "@/shared/components/nasaq-brand-lockup";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["pages"]["proposalsLanding"];
  nasaq: Messages["nasaq"];
  sales: Messages["sales"];
  templates: Messages["templates"];
  locale: Locale;
  isSignedIn: boolean;
  startProposalLabel: string;
};

export function ProposalsLandingPage({
  copy,
  nasaq,
  sales,
  templates,
  locale,
  isSignedIn,
  startProposalLabel,
}: Props) {
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-join-editorial">
        <aside className="ruwaq-join-editorial-aside">
          <p className="ruwaq-ad-eyebrow">{copy.brandFromRuwaq}</p>
          <NasaqBrandLockup name={nasaq.name} tagline={nasaq.tagline} className="mt-3" />
          <h1 className="ruwaq-ad-section-title mt-6">
            {copy.title}{" "}
            <span className="text-ruwaq-gold">{copy.titleHighlight}</span>
          </h1>
          <p className="ruwaq-ad-section-lead mt-4">{copy.asideLead}</p>

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
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <h2 className="ruwaq-ad-card-title text-base">{copy.ecosystemTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{copy.ecosystemBody}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <Link
                href="/join"
                className="text-sm font-semibold text-neutral-950 underline underline-offset-4"
              >
                {copy.ecosystemJoinLink}
              </Link>
              <Link
                href="/how-we-match"
                className="text-sm font-semibold text-neutral-950 underline underline-offset-4"
              >
                {copy.ecosystemMatchLink}
              </Link>
            </div>
          </div>
        </aside>

        <div className="ruwaq-join-editorial-form">
          <div className="border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <h2 className="ruwaq-ad-card-title text-lg">{copy.ctaCardTitle}</h2>
            <p className="mt-2 text-sm text-neutral-600">{copy.ctaCardNote}</p>

            {isSignedIn ? (
              <p className="mt-4 text-sm text-neutral-600">
                {copy.signedInHint}{" "}
                <Link
                  href="/workspace/proposals"
                  className="font-semibold text-neutral-950 underline underline-offset-2"
                >
                  {copy.myProposals}
                </Link>
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/proposals/new" className="ruwaq-pro-btn-solid px-8 py-3 text-center">
                {copy.ctaPrimary} {arrow}
              </Link>
              <Link href="/templates/sample" className="ruwaq-pro-btn-outline px-8 py-3 text-center">
                {copy.ctaSecondary}
              </Link>
              <Link href="/pricing" className="ruwaq-pro-btn-outline px-8 py-3 text-center">
                {copy.ctaPricing}
              </Link>
            </div>
          </div>

          <section className="mt-10 border-t border-neutral-200 pt-10">
            <h2 className="ruwaq-ad-card-title text-lg">{copy.featuresTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
              {sales.features.subtitle}
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {sales.features.items.map((item) => (
                <div key={item.title} className="border border-neutral-200 bg-white p-5">
                  <h3 className="font-semibold text-neutral-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 border-t border-neutral-200 pt-10">
            <h2 className="ruwaq-ad-card-title text-lg">{copy.samplesTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
              {copy.samplesIntro}
            </p>
            <div className="mt-8">
              <TemplateSampleGallery
                locale={locale}
                items={templates.gallery}
                labels={{
                  openSample: templates.openSample,
                  openSampleHint: templates.openSampleHint,
                  note: templates.note,
                  previewLabel: templates.previewLabel,
                  paletteTitle: templates.paletteTitle,
                  paletteHint: templates.paletteHint,
                  customColors: templates.customColors,
                  primaryColor: templates.primaryColor,
                  accentColor: templates.accentColor,
                  surfaceColor: templates.surfaceColor,
                  previewCta: templates.previewCta,
                  closePreview: templates.closePreview,
                  startWithLook: templates.startWithLook,
                  subscribeHint: templates.subscribeHint,
                  frameTitle: templates.frameTitle,
                  frameHint: templates.frameHint,
                  watermarkToggle: templates.watermarkToggle,
                }}
                startCta={startProposalLabel}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
