import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { RUWQ_GUIDES } from "@/content/guides";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/modules/marketplace/seo/site-jsonld";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { getHomeCopy } from "@/modules/ruwaq/home-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).home;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: env.NEXT_PUBLIC_APP_URL } };
}

export default async function HomePage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const h = getHomeCopy(locale);
  const s = h.sheet;
  const guides = RUWQ_GUIDES.slice(0, 3);
  const ar = locale === "ar";
  const num = (i: number) => (i + 1).toLocaleString(ar ? "ar-SA" : "en-US");

  return (
    <div className="rw rw-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd(locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteJsonLd(locale)) }} />

      {/* Hero: the idea in one sentence, and the reviewed quote beside it */}
      <section className="rw-hx">
        <div className="rw-wrap rw-hx__grid">
          <div className="rw-hx__text">
            <h1 className="rw-hx__title">{h.title}</h1>
            <p className="rw-hx__lead">{h.lead}</p>
            <div className="rw-actions">
              <Link href="/check" className="rw-btn rw-btn--primary rw-btn--lg">
                {h.primaryCta}
              </Link>
              <Link href="/check/sample" className="rw-btn rw-btn--outline rw-btn--lg">
                {h.secondaryCta}
              </Link>
            </div>
            <dl className="rw-hx__facts">
              {h.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="rw-qd" aria-label={ar ? "مثال على عرض سعر بعد مراجعة رواق" : "Example of a quote after Ruwaq's review"}>
            <div className="rw-qd__paper">
              <header className="rw-qd__head">
                <strong>{s.title}</strong>
                <span>{s.meta}</span>
              </header>
              <div className="rw-qd__cols" aria-hidden="true">
                <span>{s.cols.item}</span>
                <span>{s.cols.qty}</span>
                <span>{s.cols.price}</span>
              </div>
              <ul className="rw-qd__rows">
                {s.rows.map((r) => (
                  <li key={r.item} className={r.flag ? `rw-qd__row rw-qd__row--${r.flag}` : "rw-qd__row"}>
                    <div className="rw-qd__line">
                      <span className="rw-qd__item">{r.item}</span>
                      <span className="rw-qd__num">{r.qty || "—"}</span>
                      <span className="rw-qd__num">{r.price || "—"}</span>
                    </div>
                    {r.note ? <p className="rw-qd__note">{r.note}</p> : null}
                  </li>
                ))}
                <li className="rw-qd__row rw-qd__row--terms">
                  <div className="rw-qd__line">
                    <span className="rw-qd__item">{s.payment.label}</span>
                    <span className="rw-qd__num rw-qd__num--wide">{s.payment.value}</span>
                  </div>
                  <p className="rw-qd__note">{s.payment.note}</p>
                </li>
              </ul>
              <footer className="rw-qd__foot">
                <span>{s.by}</span>
                <strong>{s.summary}</strong>
              </footer>
            </div>
          </figure>
        </div>
      </section>

      {/* How it works: a real three-step sequence */}
      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <h2 className="rw-h2 rw-home__h2">{h.stepsTitle}</h2>
          <ol className="rw-hsteps">
            {h.steps.map((st, i) => (
              <li key={st.title}>
                <span className="rw-hsteps__n" aria-hidden="true">
                  {num(i)}
                </span>
                <h3 className="rw-h3">{st.title}</h3>
                <p className="rw-body">{st.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we usually find */}
      <section className="rw-section">
        <div className="rw-wrap rw-find">
          <div className="rw-find__head">
            <h2 className="rw-h2">{h.findTitle}</h2>
            <Link href="/check/sample" className="rw-link">
              {h.findCta}
            </Link>
          </div>
          <dl className="rw-find__list">
            {h.find.map((f) => (
              <div key={f.title}>
                <dt>{f.title}</dt>
                <dd>{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services as a plain list, not a card kit */}
      <section className="rw-section rw-section--flush-top">
        <div className="rw-wrap">
          <h2 className="rw-h2 rw-home__h2">{h.servicesTitle}</h2>
          <ul className="rw-svc">
            {h.services.map((sv) => (
              <li key={sv.href}>
                <div>
                  <h3 className="rw-svc__title">{sv.title}</h3>
                  <p className="rw-svc__when">{sv.when}</p>
                </div>
                <p className="rw-svc__price">{sv.price}</p>
                <Link href={sv.href} className="rw-btn rw-btn--outline rw-btn--sm">
                  {sv.cta}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Independence */}
      <section className="rw-section rw-section--ink">
        <div className="rw-wrap rw-indep">
          <h2 className="rw-h2">{h.independenceTitle}</h2>
          <div>
            <p className="rw-lead">{h.independenceBody}</p>
            <p style={{ marginBlockStart: "1.25rem" }}>
              <Link href="/charter" className="rw-link">
                {h.independenceLink}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head-row">
            <h2 className="rw-h2">{h.guidesTitle}</h2>
            <Link href="/guides" className="rw-link">
              {h.guidesAll}
            </Link>
          </div>
          <div className="rw-grid rw-grid--3">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="rw-guide">
                <Image src={g.heroImage} alt="" width={900} height={600} sizes="(min-width: 1024px) 33vw, 100vw" />
                <h3>{ar ? g.titleAr : g.titleEn}</h3>
                <p>{ar ? g.excerptAr : g.excerptEn}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contractors: one quiet line */}
      <section className="rw-pro-line">
        <div className="rw-wrap rw-pro-line__inner">
          <p>{h.contractorsText}</p>
          <Link href="/pro" className="rw-link">
            {h.contractorsCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
