import { SectionIllustrationCard } from "@/modules/marketing/components/section-illustration-card";
import { TrustPartnerSection } from "@/modules/marketing/components/trust-partner-section";
import Link from "next/link";
import { HeroServiceTickets } from "@/modules/marketing/components/hero-service-tickets";
import { MarketingHero } from "@/modules/marketing/components/marketing-hero";
import { HeroStepsStrip } from "@/modules/marketing/components/hero-steps-strip";
import { SectionHeader } from "@/modules/marketing/components/section-header";
import {
  LANDING_SECTION_IMAGES,
  SectionVisual,
  landingSectionAlts,
} from "@/modules/marketing/components/section-visual";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  t: Messages;
  locale: Locale;
};

/** Root landing — Apple minimalist light canvas. */
export function LandingPage({ t, locale }: Props) {
  const s = t.sales;
  const arrow = locale === "ar" ? "←" : "→";
  const sectionAlts = landingSectionAlts(locale);
  return (
    <div className="ruwaq-landing-shell">
      <MarketingHero hero={s.hero} locale={locale} />

      <HeroServiceTickets tickets={s.heroTickets} />

      <section className="ruwaq-landing-section ruwaq-landing-section--soft ruwaq-landing-section--after-tickets ruwaq-reveal ruwaq-reveal-delay-1">
        <div className="ruwaq-landing-section-inner max-w-5xl">
          <HeroStepsStrip title={s.heroSteps.title} steps={s.heroSteps.items} />
          <div className="mt-12 text-center">
            <Link href="/proposals/new" className="btn-ruwaq-primary inline-flex px-9 py-3.5">
              {s.hero.cta} {arrow}
            </Link>
          </div>
        </div>
      </section>

      <section className="ruwaq-landing-section ruwaq-reveal ruwaq-reveal-delay-2">
        <div className="ruwaq-landing-section-inner">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow={s.problem.eyebrow}
                title={s.problem.title}
                subtitle={s.problem.body}
                align="start"
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="ruwaq-light-card">
                  <p className="ruwaq-compare-label text-red-500/80">{s.problem.traditionalLabel}</p>
                  <ul className="mt-4 space-y-2.5">
                    {s.problem.traditional.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ruwaq-ink-soft">
                        <span className="mt-0.5 shrink-0 text-red-400" aria-hidden>
                          ✕
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ruwaq-light-card ruwaq-light-card--highlight">
                  <p className="ruwaq-compare-label text-ruwaq-gold">{s.problem.ruwaqLabel}</p>
                  <ul className="mt-4 space-y-2.5">
                    {s.problem.ruwaq.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ruwaq-ink">
                        <span className="mt-0.5 shrink-0 text-ruwaq-gold" aria-hidden>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <SectionVisual
              src={LANDING_SECTION_IMAGES.problem}
              alt={sectionAlts.problem}
              priority
              variant="tall"
            />
          </div>
        </div>
      </section>

      <section className="ruwaq-landing-section ruwaq-landing-section--warm ruwaq-reveal">
        <div className="ruwaq-landing-section-inner ruwaq-landing-section-inner--narrow">
          <SectionHeader
            eyebrow={s.features.eyebrow}
            title={s.features.title}
            subtitle={s.features.subtitle}
            align="center"
          />
          <div className="ruwaq-illustration-grid ruwaq-illustration-grid--features mt-14 lg:mt-16">
            {s.features.items.map((item) => (
              <SectionIllustrationCard
                key={item.title}
                illustration={item.illustration}
                title={item.title}
                body={item.body}
              />
            ))}
          </div>
        </div>
      </section>

      <TrustPartnerSection trust={s.trustPartner} locale={locale} />

      <section className="ruwaq-landing-section ruwaq-reveal">
        <div className="ruwaq-landing-section-inner ruwaq-landing-section-inner--narrow">
          <SectionHeader
            eyebrow={s.why.eyebrow}
            title={s.why.title}
            subtitle={s.why.subtitle}
            align="center"
          />
          <div className="ruwaq-comparison-table mt-14 lg:mt-16">
            <div className="hidden grid-cols-[1fr_1fr_1fr] border-b border-slate-100 bg-ruwaq-canvas-soft text-xs font-semibold uppercase tracking-wider text-ruwaq-ink-muted sm:grid">
              <div className="px-6 py-4">{s.why.table.need}</div>
              <div className="border-s border-slate-100 px-6 py-4">{s.why.table.others}</div>
              <div className="border-s border-slate-100 px-6 py-4 text-ruwaq-gold">{s.why.table.ruwaq}</div>
            </div>
            {s.why.rows.map((row) => (
              <div key={row.need} className="grid border-t border-slate-100 sm:grid-cols-[1fr_1fr_1fr]">
                <div className="px-6 py-5 text-sm font-medium text-ruwaq-ink">{row.need}</div>
                <div className="border-t border-slate-100 px-6 py-5 text-sm text-ruwaq-ink-soft sm:border-t-0 sm:border-s">
                  <span className="mb-1 block text-[10px] font-bold uppercase text-ruwaq-ink-muted sm:hidden">
                    {s.why.table.others}
                  </span>
                  {row.others}
                </div>
                <div className="ruwaq-row-highlight border-t border-slate-100 px-6 py-5 text-sm font-medium sm:border-s sm:border-t-0">
                  <span className="mb-1 block text-[10px] font-bold uppercase text-ruwaq-gold/70 sm:hidden">
                    {s.why.table.ruwaq}
                  </span>
                  {row.ruwaq}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ruwaq-landing-section ruwaq-landing-section--soft">
        <div className="ruwaq-landing-section-inner">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionVisual src={LANDING_SECTION_IMAGES.trust} alt={sectionAlts.trust} variant="landscape" />
            <div>
              <SectionHeader
                eyebrow={s.sample.eyebrow}
                title={s.sample.title}
                subtitle={s.sample.body}
                align="start"
              />
              <Link href="/proposals/new" className="btn-ruwaq-primary mt-8 inline-flex px-9 py-3.5">
                {s.hero.cta} {arrow}
              </Link>
              <Link
                href="/templates/sample"
                className="btn-ruwaq-accent mt-4 inline-flex px-8 py-3 sm:ms-3 sm:mt-8"
              >
                {s.sample.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ruwaq-landing-cta">
        <div className="ruwaq-landing-section-inner max-w-3xl text-center">
          <h2 className="ruwaq-cta-title">{s.ctaFinal.title}</h2>
          <p className="ruwaq-cta-lead mx-auto mt-5 max-w-xl">{s.ctaFinal.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/proposals/new" className="btn-ruwaq-primary px-10 py-4 text-base">
              {s.ctaFinal.primary} {arrow}
            </Link>
            <Link href="/templates/sample" className="btn-ruwaq-accent px-8 py-3.5">
              {s.ctaFinal.secondary}
            </Link>
          </div>
          <p className="mt-5 text-xs text-ruwaq-ink-muted">{s.ctaFinal.microcopy}</p>
        </div>
      </section>
    </div>
  );
}
