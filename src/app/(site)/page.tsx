import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { RUWQ_GUIDES } from "@/content/guides";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/modules/marketplace/seo/site-jsonld";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).home;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: env.NEXT_PUBLIC_APP_URL },
  };
}

export default async function HomePage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).home;
  const s = c.sheet;
  const guides = RUWQ_GUIDES.slice(0, 3);

  return (
    <div className="rw">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd(locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteJsonLd(locale)) }} />

      {/* Hero: the reviewed quote */}
      <section className="rw-hero">
        <div className="rw-wrap rw-hero__grid">
          <div>
            <p className="rw-eyebrow">{c.eyebrow}</p>
            <h1 className="rw-display">{c.title}</h1>
            <p className="rw-lead" style={{ marginBlockStart: "1.5rem" }}>
              {c.lead}
            </p>
            <div className="rw-hero__actions">
              <Link href="/check" className="rw-btn rw-btn--primary">
                {c.primaryCta}
              </Link>
              <Link href="/how-it-works" className="rw-btn rw-btn--outline">
                {c.secondaryCta}
              </Link>
            </div>
            <ul className="rw-trust">
              {c.trust.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="rw-sheet-stage" aria-hidden="true">
            <div className="rw-sheet">
              <div className="rw-sheet__head">
                <span className="rw-sheet__title">{s.title}</span>
                <span className="rw-sheet__meta">{s.meta}</span>
              </div>
              <div className="rw-sheet__cols">
                <span>{locale === "ar" ? "البند" : "Item"}</span>
                <span className="rw-sheet__num">{locale === "ar" ? "الكمية" : "Qty"}</span>
                <span className="rw-sheet__num">{locale === "ar" ? "ريال" : "SAR"}</span>
              </div>
              {s.rows.map((r, i) => (
                <div key={r.item} className="rw-sheet__row">
                  <span className="rw-sheet__item">
                    <span
                      className={
                        r.kind === "circle"
                          ? "rw-mark-circle rw-reveal rw-reveal--1"
                          : r.kind === "underline"
                            ? "rw-mark-under"
                            : undefined
                      }
                    >
                      {r.item}
                    </span>
                    {r.note ? (
                      <span className={`rw-note rw-reveal rw-reveal--${i === 0 ? 1 : 2}`}>{r.note}</span>
                    ) : null}
                  </span>
                  <span className="rw-sheet__num">{r.qty}</span>
                  <span className="rw-sheet__num">{r.price}</span>
                </div>
              ))}
              <p className="rw-sheet__missing rw-reveal rw-reveal--3">＋ {s.missing}</p>
              <p className="rw-sheet__payment">
                <span className="rw-strike">{s.payment}</span>
                <span className="rw-note rw-reveal rw-reveal--4">{s.paymentNote}</span>
              </p>
              <span className="rw-stamp rw-reveal rw-reveal--5">{s.stamp}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why owners worry */}
      <section className="rw-section">
        <div className="rw-wrap rw-split">
          <div className="rw-split__sticky">
            <h2 className="rw-h2">{c.fearsTitle}</h2>
            <p className="rw-body" style={{ marginBlockStart: "1rem" }}>
              {c.fearsLead}
            </p>
          </div>
          <ul className="rw-issues">
            {c.fears.map((f) => (
              <li key={f.title}>
                <h3 className="rw-h3">{f.title}</h3>
                <p className="rw-body">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services — a real three-step journey */}
      <section className="rw-section rw-section--stone" id="services">
        <div className="rw-wrap">
          <h2 className="rw-h2" style={{ maxWidth: "40rem" }}>
            {c.servicesTitle}
          </h2>
          <p className="rw-body" style={{ marginBlockStart: "0.75rem" }}>
            {c.servicesLead}
          </p>
          <div className="rw-steps3">
            {c.services.map((sv) => (
              <article key={sv.href} className="rw-step">
                <span className="rw-step__num">{sv.step}</span>
                <p className="rw-step__when">{sv.when}</p>
                <h3 className="rw-step__title">{sv.title}</h3>
                <p className="rw-step__body">{sv.body}</p>
                <p className="rw-step__meta">{sv.meta}</p>
                <div className="rw-step__cta">
                  <Link href={sv.href} className="rw-link">
                    {sv.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principle, with the family photograph shown whole */}
      <section className="rw-photo-split">
        <div className="rw-photo-split__img">
          <Image
            src="/images/marketing/hero-villa-family.jpg"
            alt={locale === "ar" ? "أسرة أمام فيلتها في جدة" : "A family in front of their villa in Jeddah"}
            width={1920}
            height={1920}
            sizes="(min-width: 960px) 50vw, 100vw"
          />
        </div>
        <div className="rw-photo-split__text">
          <h2 className="rw-h2">{c.principleTitle}</h2>
          <p>{c.principleBody}</p>
          <Link href="/about" className="rw-link">
            {c.principleLink}
          </Link>
        </div>
      </section>

      {/* Seven safeguards */}
      <section className="rw-section" id="protect">
        <div className="rw-wrap">
          <h2 className="rw-h2" style={{ maxWidth: "40rem" }}>
            {c.measuresTitle}
          </h2>
          <p className="rw-body" style={{ marginBlockStart: "0.75rem" }}>
            {c.measuresLead}
          </p>
          <ol className="rw-measures">
            {c.measures.map((m, i) => (
              <li key={m.title}>
                <span className="rw-measures__n">{(i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US")}</span>
                <div>
                  <h3 className="rw-h3">{m.title}</h3>
                  <p className="rw-body">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contractor door — visible, mid-page */}
      <section className="rw-section" style={{ paddingBlockStart: 0 }}>
        <div className="rw-wrap">
          <div className="rw-door">
            <div>
              <p className="rw-eyebrow">{c.contractorsEyebrow}</p>
              <h2 className="rw-h2">{c.contractorsTitle}</h2>
              <p>{c.contractorsBody}</p>
              <div className="rw-door__actions">
                <Link href="/pro" className="rw-btn rw-btn--gold">
                  {c.contractorsPrimary}
                </Link>
                <Link href="/proposals" className="rw-btn rw-btn--outline-light">
                  {c.contractorsSecondary}
                </Link>
              </div>
            </div>
            <ul className="rw-door__points">
              {c.contractorsPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head-row">
            <div>
              <h2 className="rw-h2">{c.guidesTitle}</h2>
              <p className="rw-body" style={{ marginBlockStart: "0.75rem", maxWidth: "36rem" }}>
                {c.guidesLead}
              </p>
            </div>
            <Link href="/guides" className="rw-link">
              {c.guidesAll}
            </Link>
          </div>
          <div className="rw-guides">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="rw-guide">
                <Image src={g.heroImage} alt="" width={900} height={600} sizes="(min-width: 760px) 33vw, 100vw" />
                <h3>{locale === "ar" ? g.titleAr : g.titleEn}</h3>
                <p>{locale === "ar" ? g.excerptAr : g.excerptEn}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
