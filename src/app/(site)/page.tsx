import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { RUWQ_GUIDES } from "@/content/guides";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/modules/marketplace/seo/site-jsonld";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { CardIcon, iconAt, CONTRACTOR_ICONS, FEAR_ICONS, MEASURE_ICONS, PROOF_ICONS, SERVICE_ICONS } from "@/modules/ruwaq/icons";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).home;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: env.NEXT_PUBLIC_APP_URL } };
}

export default async function HomePage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).home;
  const s = c.sheet;
  const t = getTrustCopy(locale);
  const guides = RUWQ_GUIDES.slice(0, 3);
  const ar = locale === "ar";

  return (
    <div className="rw">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd(locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteJsonLd(locale)) }} />

      {/* Hero */}
      <section className="rw-hero">
        <div className="rw-wrap rw-hero__grid">
          <div>
            <span className="rw-eyebrow">{c.eyebrow}</span>
            <h1 className="rw-hero-title">{c.title}</h1>
            <p className="rw-lead">{c.lead}</p>
            <div className="rw-actions">
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
                <span>{ar ? "البند" : "Item"}</span>
                <span className="rw-sheet__num">{ar ? "الكمية" : "Qty"}</span>
                <span className="rw-sheet__num">{ar ? "ريال" : "SAR"}</span>
              </div>
              {s.rows.map((r) => (
                <div key={r.item} className="rw-sheet__row">
                  <span>
                    <span className={r.kind === "circle" ? "rw-mark-circle" : r.kind === "underline" ? "rw-mark-under" : undefined}>{r.item}</span>
                    {r.note ? <span className="rw-note">{r.note}</span> : null}
                  </span>
                  <span className="rw-sheet__num">{r.qty}</span>
                  <span className="rw-sheet__num">{r.price}</span>
                </div>
              ))}
              <p className="rw-sheet__missing">＋ {s.missing}</p>
              <p className="rw-sheet__payment">
                <span className="rw-strike">{s.payment}</span>
                <span className="rw-note">{s.paymentNote}</span>
              </p>
              <span className="rw-stamp">{s.stamp}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why owners worry */}
      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.fearsTitle}</h2>
            <p className="rw-body">{c.fearsLead}</p>
          </div>
          <div className="rw-grid rw-grid--4">
            {c.fears.map((f, i) => (
              <article key={f.title} className="rw-card">
                <CardIcon icon={FEAR_ICONS[i]} tone="mark" />
                <h3 className="rw-h3">{f.title}</h3>
                <p className="rw-body">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="rw-section" id="services">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.servicesTitle}</h2>
            <p className="rw-body">{c.servicesLead}</p>
          </div>
          <div className="rw-grid rw-grid--3">
            {c.services.map((sv, i) => (
              <article key={sv.href} className="rw-card rw-service">
                <CardIcon icon={SERVICE_ICONS[i]} />
                <span className="rw-service__step">
                  {ar ? "الخطوة" : "Step"} {sv.step}
                </span>
                <p className="rw-service__when">{sv.when}</p>
                <h3 className="rw-service__title">{sv.title}</h3>
                <p className="rw-service__body">{sv.body}</p>
                <p className="rw-service__meta">{sv.meta}</p>
                <div className="rw-service__cta">
                  <Link href={sv.href} className="rw-btn rw-btn--outline rw-btn--sm">
                    {sv.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proof — verify before trusting */}
      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{t.proof.title}</h2>
            <p className="rw-body">{t.proof.lead}</p>
          </div>
          <div className="rw-proof">
            {t.proof.items.map((p, i) => (
              <article key={p.href} className="rw-card">
                <CardIcon icon={PROOF_ICONS[i]} />
                <h3 className="rw-h3">{p.title}</h3>
                <p className="rw-body">{p.body}</p>
                <Link href={p.href} className="rw-link">
                  {p.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principle */}
      <section className="rw-photo-split">
        <Image
          src="/images/marketing/hero-villa-family.jpg"
          alt={ar ? "أسرة أمام فيلتها في جدة" : "A family in front of their villa in Jeddah"}
          width={1920}
          height={1920}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="rw-photo-split__text">
          <h2 className="rw-h2">{c.principleTitle}</h2>
          <p>{c.principleBody}</p>
          <Link href="/charter" className="rw-link">
            {c.principleLink}
          </Link>
        </div>
      </section>

      {/* Seven safeguards */}
      <section className="rw-section" id="protect">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.measuresTitle}</h2>
            <p className="rw-body">{c.measuresLead}</p>
          </div>
          <div className="rw-grid rw-grid--4">
            {c.measures.map((m, i) => (
              <article key={m.title} className="rw-card">
                <CardIcon icon={MEASURE_ICONS[i]} />
                <h3 className="rw-h3">{m.title}</h3>
                <p className="rw-body">{m.body}</p>
              </article>
            ))}
            <article className="rw-card" style={{ background: "var(--rw-stone)", borderColor: "transparent", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 className="rw-h3">{c.finalTitle}</h3>
              <div style={{ marginBlockStart: "1rem" }}>
                <Link href="/check" className="rw-btn rw-btn--primary rw-btn--sm">
                  {c.finalCta}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head-row">
            <div className="rw-head">
              <h2 className="rw-h2">{c.guidesTitle}</h2>
              <p className="rw-body">{c.guidesLead}</p>
            </div>
            <Link href="/guides" className="rw-link">
              {c.guidesAll}
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
      {/* Contractor door */}
      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-door">
            <div>
              <span className="rw-eyebrow">{c.contractorsEyebrow}</span>
              <h2 className="rw-h2">{c.contractorsTitle}</h2>
              <p>{c.contractorsBody}</p>
              <div className="rw-actions">
                <Link href="/pro" className="rw-btn rw-btn--gold">
                  {c.contractorsPrimary}
                </Link>
                <Link href="/proposals" className="rw-btn rw-btn--outline-light">
                  {c.contractorsSecondary}
                </Link>
              </div>
            </div>
            <ul className="rw-door__points">
              {c.contractorsPoints.map((p, i) => {
                const Icon = iconAt(CONTRACTOR_ICONS, i);
                return (
                  <li key={p} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <Icon size={18} strokeWidth={1.6} color="var(--rw-gold-soft)" aria-hidden="true" />
                    {p}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
