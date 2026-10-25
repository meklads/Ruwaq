import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { GuidesSection } from "@/modules/marketplace/components/guides-section";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/modules/marketplace/seo/site-jsonld";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";

export default async function HomePage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).home;
  const orgJsonLd = buildOrganizationJsonLd(locale);
  const siteJsonLd = buildWebSiteJsonLd(locale);

  return (
    <div className="ruwaq-qc">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />

      {/* Hero */}
      <section className="ruwaq-qc-hero ruwaq-home-hero ruwaq-surface-dark">
        <div className="ruwaq-qc-wrap">
          <p className="ruwaq-qc-eyebrow">{c.eyebrow}</p>
          <h1 className="ruwaq-qc-title ruwaq-home-title">{c.title}</h1>
          <p className="ruwaq-qc-lead">{c.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/check" className="ruwaq-pro-btn-solid bg-[#c9a063] px-8 py-3.5 text-neutral-950 hover:bg-[#d4b47a]">
              {c.primaryCta}
            </Link>
            <a href="#protect" className="inline-flex items-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white">
              {c.secondaryCta}
            </a>
          </div>
          <ul className="ruwaq-qc-trust">
            {c.trust.map((t) => (
              <li key={t}>
                <span aria-hidden>✓</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fears */}
      <section className="ruwaq-qc-section">
        <div className="ruwaq-qc-wrap">
          <h2 className="ruwaq-qc-h2">{c.fearsTitle}</h2>
          <ul className="ruwaq-qc-problems">
            {c.fears.map((f) => (
              <li key={f.title}>
                <strong className="block text-neutral-950">{f.title}</strong>
                {f.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="ruwaq-qc-section ruwaq-qc-section--muted" id="services">
        <div className="ruwaq-qc-wrap">
          <p className="ruwaq-qc-eyebrow">{c.servicesEyebrow}</p>
          <h2 className="ruwaq-qc-h2 mt-2">{c.servicesTitle}</h2>
          <div className="ruwaq-qc-grid ruwaq-home-services">
            {c.services.map((s) => (
              <Link key={s.href} href={s.href} className="ruwaq-qc-card ruwaq-home-service">
                <span className="ruwaq-home-step">{s.step}</span>
                <h3 className="ruwaq-qc-card-title">{s.title}</h3>
                <p className="ruwaq-home-price">{s.price}</p>
                <p className="ruwaq-qc-card-body">{s.body}</p>
                <span className="ruwaq-home-service-cta">{s.cta} {locale === "ar" ? "←" : "→"}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seven locks */}
      <section className="ruwaq-qc-section" id="protect">
        <div className="ruwaq-qc-wrap">
          <p className="ruwaq-qc-eyebrow">{c.locksEyebrow}</p>
          <h2 className="ruwaq-qc-h2 mt-2">{c.locksTitle}</h2>
          <ol className="ruwaq-qc-grid">
            {c.locks.map((l, i) => (
              <li key={l.title} className="ruwaq-qc-card">
                <span className="ruwaq-qc-num">{i + 1}</span>
                <h3 className="ruwaq-qc-card-title">{l.title}</h3>
                <p className="ruwaq-qc-card-body">{l.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Principle */}
      <section className="ruwaq-qc-hero ruwaq-surface-dark">
        <div className="ruwaq-qc-wrap ruwaq-qc-narrow">
          <p className="ruwaq-qc-eyebrow">{c.principleTitle}</p>
          <p className="mt-4 text-lg leading-relaxed text-white/90 sm:text-xl">{c.principleBody}</p>
        </div>
      </section>

      <GuidesSection />

    </div>
  );
}
