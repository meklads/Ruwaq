import Link from "next/link";
import { SectionHeader } from "@/modules/marketing/components/section-header";
import { SectionIllustrationCard } from "@/modules/marketing/components/section-illustration-card";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  trust: Messages["sales"]["trustPartner"];
  locale: Locale;
};

/** Contractor protection — approved clause pack showcase. */
export function TrustPartnerSection({ trust, locale }: Props) {
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <section className="ruwaq-landing-section ruwaq-landing-section--soft ruwaq-reveal">
      <div className="ruwaq-landing-section-inner ruwaq-landing-section-inner--narrow">
        <SectionHeader
          eyebrow={trust.eyebrow}
          title={trust.title}
          subtitle={trust.subtitle}
          align="center"
        />

        <div className="ruwaq-illustration-grid ruwaq-illustration-grid--pillars mt-14 lg:mt-16">
          {trust.pillars.map((pillar) => (
            <SectionIllustrationCard
              key={pillar.title}
              variant="pillar"
              illustration={pillar.illustration}
              title={pillar.title}
              body={pillar.body}
            />
          ))}
        </div>

        <div className="ruwaq-clause-pack-header mt-20 lg:mt-24">
          <h3 className="ruwaq-clause-pack-title">{trust.packTitle}</h3>
          <p className="ruwaq-clause-pack-meta">{trust.packMeta}</p>
        </div>

        <div className="mt-10 space-y-5 lg:mt-12">
          {trust.clauses.map((clause, index) => (
            <article key={clause.title} className="ruwaq-clause-preview group">
              <div className="ruwaq-clause-preview-head">
                <span className="ruwaq-clause-preview-num" aria-hidden>
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="ruwaq-clause-preview-category">{clause.category}</p>
                  <h4 className="ruwaq-clause-preview-title">{clause.title}</h4>
                </div>
              </div>
              <p className="ruwaq-clause-preview-excerpt">{clause.excerpt}</p>
              <p className="ruwaq-clause-preview-source">
                <span className="font-medium text-ruwaq-ink-muted">
                  {locale === "ar" ? "مرجع:" : "Source:"}
                </span>{" "}
                {clause.source}
              </p>
            </article>
          ))}
        </div>

        <p className="ruwaq-clause-pack-disclaimer mt-10 text-center lg:mt-12">{trust.disclaimer}</p>

        <div className="mt-10 text-center lg:mt-12">
          <Link href="/proposals/new" className="btn-ruwaq-primary inline-flex px-10 py-4">
            {trust.cta} {arrow}
          </Link>
        </div>
      </div>
    </section>
  );
}
