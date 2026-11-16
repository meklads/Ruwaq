import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { SourcesList, Tx, fmtDate } from "@/modules/site/content/components";
import { pickText } from "@/modules/site/content/localize";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";
import { getStyle } from "@/modules/site/knowledge/loader";
import { DraftBadge, GroupBox } from "@/modules/site/knowledge/components";
import { BeforeAfter } from "@/modules/site/knowledge/before-after";
import "@/modules/site/home/home.css";
import "@/modules/site/knowledge/atlas.css";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale();
  const s = getStyle(params.slug);
  if (!s) return {};
  return {
    title: pickText(s.name, locale)?.text,
    description: pickText(s.summary, locale)?.text,
    robots: s.draft ? { index: false, follow: false } : undefined,
    alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/atlas/${params.slug}` },
    openGraph: s.hero ? { images: [{ url: s.hero.src }] } : undefined,
  };
}

export default async function StylePage({ params }: Props) {
  const locale = await getLocale();
  const s = getStyle(params.slug);
  if (!s) notFound();
  const a = getKnowledgeCopy(locale).atlas;
  const t = (l: { ar?: string; en?: string } | undefined) => (l ? pickText(l, locale)?.text ?? "" : "");
  const hasConcept = s.hero?.nature === "concept" || s.gallery.some((g) => g.nature === "concept") || s.beforeAfter?.nature === "concept";

  return (
    <div className="rw rwh">
      {/* Hero */}
      {s.hero ? (
        <section className="rwk-shero">
          <Image src={s.hero.src} alt={t(s.hero.alt)} fill priority sizes="100vw" className="rwk-shero__img" />
          <div className="rw-wrap rwk-shero__inner">
            <Link href="/atlas" className="rwh-eyebrow">{a.back}</Link>
            <div className="rwk-badges" style={{ marginBlockStart: "1rem" }}>
              {s.draft && <span className="rwk-badge rwk-badge--gold">{getKnowledgeCopy(locale).draftBadge}</span>}
              <span className="rwk-badge">{t(s.region)}</span>
              {s.hero.nature === "concept" && <span className="rwk-badge">{a.concept}</span>}
            </div>
            <h1><Tx l={s.name} locale={locale} /></h1>
            <p><Tx l={s.summary} locale={locale} /></p>
          </div>
        </section>
      ) : (
        <section className="rwh-section">
          <div className="rw-wrap">
            <Link href="/atlas" className="rwh-eyebrow">{a.back}</Link>
            {s.draft && <div className="rwc-tags" style={{ marginBlockStart: "1rem" }}><DraftBadge locale={locale} /></div>}
            <h1 className="rwh-title"><Tx l={s.name} locale={locale} /></h1>
            <p className="rwh-body"><Tx l={s.summary} locale={locale} /></p>
          </div>
        </section>
      )}

      {/* Before / after */}
      {s.beforeAfter && (
        <section className="rwh-section">
          <div className="rw-wrap">
            <span className="rwh-eyebrow">{a.beforeAfter}</span>
            <h2 className="rwh-title">{a.beforeAfter}</h2>
            <p className="rwh-body" style={{ marginBlockEnd: "1.5rem" }}><Tx l={s.beforeAfter.caption} locale={locale} /></p>
            <BeforeAfter
              before={{ src: s.beforeAfter.before.src, alt: t(s.beforeAfter.before.alt) }}
              after={{ src: s.beforeAfter.after.src, alt: t(s.beforeAfter.after.alt) }}
              width={s.beforeAfter.width}
              height={s.beforeAfter.height}
              labels={{ before: a.before, after: a.after, slider: a.slider }}
              rtl={locale === "ar"}
            />
          </div>
        </section>
      )}

      {/* Characteristics */}
      <section className="rwh-section rwh-method">
        <div className="rw-wrap">
          <span className="rwh-eyebrow">{a.characteristics}</span>
          <h2 className="rwh-title">{a.characteristics}</h2>
          <div className="rwk-facts" style={{ marginBlockStart: "1.5rem" }}>
            {s.characteristics.map((c, i) => <div key={i} className="rwk-fact"><Tx l={c} locale={locale} /></div>)}
          </div>
          {s.materials.length > 0 && (
            <>
              <h3 className="rwh-card__title" style={{ marginBlockStart: "2.25rem" }}>{a.materials}</h3>
              <div className="rwk-facts" style={{ marginBlockStart: "1rem" }}>
                {s.materials.map((m, i) => <div key={i} className="rwk-fact"><Tx l={m} locale={locale} /></div>)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Gallery */}
      {s.gallery.length > 0 && (
        <section className="rwh-section">
          <div className="rw-wrap">
            <span className="rwh-eyebrow">{a.gallery}</span>
            <h2 className="rwh-title">{a.gallery}</h2>
            <div className="rwk-gallery" style={{ marginBlockStart: "1.5rem" }}>
              {s.gallery.map((g, i) => (
                <figure key={g.src} className={`rwk-shot${i === 0 ? " rwk-shot--wide" : ""}`} style={{ aspectRatio: i === 0 ? "16 / 9" : `${g.width} / ${g.height}` }}>
                  <Image src={g.src} alt={t(g.alt)} width={g.width} height={g.height} sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" />
                  <span className="rwk-shot__tag">{g.nature === "concept" ? a.concept : a.documentary}</span>
                  <figcaption><b>{a.kinds[g.kind]}</b>{t(g.caption)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Readings, applying it, what is unclear, sources */}
      <section className="rwh-section rwh-method">
        <div className="rw-wrap">
          {s.readings.length > 0 && (
            <>
              <span className="rwh-eyebrow">{a.readings}</span>
              <div className="rwh-method__grid">
                {s.readings.map((r) => (
                  <div key={r.kind} className="rwh-method__item"><h3>{a.reading[r.kind]}</h3><p><Tx l={r.text} locale={locale} /></p></div>
                ))}
              </div>
            </>
          )}
          <h2 className="rwh-title" style={{ marginBlockStart: "3rem" }}>{a.apply}</h2>
          <p className="rwh-body"><Tx l={s.applyInYourProject} locale={locale} /></p>

          {s.unclear.length > 0 && (
            <>
              <h3 className="rwh-card__title" style={{ marginBlockStart: "2.25rem" }}>{a.unclear}</h3>
              <ul className="rwk-list" style={{ marginBlockStart: "0.75rem" }}>
                {s.unclear.map((u, i) => <li key={i}><Tx l={u} locale={locale} /></li>)}
              </ul>
            </>
          )}

          {hasConcept && <p className="rwk-note" style={{ marginBlockStart: "2rem" }}>{a.conceptNote}</p>}

          <h3 className="rwh-card__title" style={{ marginBlockStart: "2.25rem" }}>{a.sources}</h3>
          <SourcesList sources={s.sources} locale={locale} />
          <p className="rw-fineprint" style={{ marginBlockStart: "0.5rem" }}>
            {s.architectReviewed ? `${a.architect} ${fmtDate(s.architectReviewed, locale, "—")}` : a.notArchitect} · {a.reviewed}: {fmtDate(s.reviewedAt, locale, "—")}
          </p>

          <GroupBox target="graphicshouse" section="atlas" page={s.slug} locale={locale} />
        </div>
      </section>
    </div>
  );
}
