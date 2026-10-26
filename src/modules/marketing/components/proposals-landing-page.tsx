import Link from "next/link";
import { TemplateSampleGallery } from "@/modules/marketing/components/template-sample-gallery";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";
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
  sales,
  templates,
  locale,
  isSignedIn,
  startProposalLabel,
}: Props) {
  const c = getTrustCopy(locale).nasaq;

  return (
    <div className="rw">
      <section className="rw-page-hero rw-page-hero--ink">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display" style={{ maxWidth: "46rem" }}>
            {c.title}
          </h1>
          <p className="rw-lead">{c.lead}</p>
          <div className="rw-actions">
            <Link href="/proposals/new" className="rw-btn rw-btn--gold">
              {c.primary}
            </Link>
            <Link href="/pricing" className="rw-btn rw-btn--outline-light">
              {c.secondary}
            </Link>
          </div>
          {isSignedIn ? (
            <p className="rw-fineprint" style={{ marginBlockStart: "1rem", color: "rgba(255,255,255,0.65)" }}>
              {c.signedIn}{" "}
              <Link href="/workspace/proposals" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: "0.3em" }}>
                {c.myProposals}
              </Link>
            </p>
          ) : (
            <p className="rw-fineprint" style={{ marginBlockStart: "1rem", color: "rgba(255,255,255,0.65)" }}>
              {copy.ctaCardNote}
            </p>
          )}
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.featuresTitle}</h2>
          </div>
          <div className="rw-grid rw-grid--3">
            {sales.features.items.slice(0, 3).map((item) => (
              <article key={item.title} className="rw-card">
                <h3 className="rw-h3">{item.title}</h3>
                <p className="rw-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.samplesTitle}</h2>
            <p className="rw-body">{copy.samplesIntro}</p>
          </div>
          <div className="rw-card">
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
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head-row" style={{ marginBlockEnd: 0 }}>
            <div className="rw-head">
              <h2 className="rw-h2">{c.networkTitle}</h2>
              <p className="rw-body">{c.networkBody}</p>
            </div>
            <Link href="/pro" className="rw-btn rw-btn--outline">
              {c.networkCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
