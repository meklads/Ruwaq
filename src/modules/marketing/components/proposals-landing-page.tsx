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
    <div className="nasaq-landing">
      <section className="nasaq-library-hero">
        <div className="nasaq-library-intro">
          <p className="ruwaq-ad-eyebrow">{copy.brandFromRuwaq}</p>
          <NasaqBrandLockup name={nasaq.name} tagline={nasaq.tagline} className="mt-2" />
          <h1 className="nasaq-landing-title mt-4">
            {copy.title} <span className="text-ruwaq-gold">{copy.titleHighlight}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
            {copy.samplesIntro}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/proposals/new" className="ruwaq-pro-btn-solid px-6 py-2.5 text-sm">
              {copy.ctaPrimary} {arrow}
            </Link>
            <Link href="/pricing" className="ruwaq-pro-btn-outline px-5 py-2.5 text-sm">
              {copy.ctaPricing}
            </Link>
          </div>
          {isSignedIn ? (
            <p className="mt-3 text-xs text-neutral-500">
              {copy.signedInHint}{" "}
              <Link
                href="/workspace/proposals"
                className="font-semibold text-neutral-900 underline underline-offset-2"
              >
                {copy.myProposals}
              </Link>
            </p>
          ) : (
            <p className="mt-3 text-xs text-neutral-500">{copy.ctaCardNote}</p>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
          <TemplateSampleGallery
            locale={locale}
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

      <section className="nasaq-landing-more">
        <h2 className="text-base font-semibold text-neutral-900">{copy.featuresTitle}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {sales.features.items.slice(0, 3).map((item) => (
            <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/join" className="font-semibold text-neutral-900 underline underline-offset-4">
            {copy.ecosystemJoinLink}
          </Link>
          <Link
            href="/how-we-match"
            className="font-semibold text-neutral-900 underline underline-offset-4"
          >
            {copy.ecosystemMatchLink}
          </Link>
        </div>
      </section>
    </div>
  );
}
