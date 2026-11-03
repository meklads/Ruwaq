import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
import { getContentCopy } from "@/modules/site/content/copy";
import { getEntity } from "@/modules/site/content/loader";
import { pickText } from "@/modules/site/content/localize";
import { FallbackNotice, PreviewNotice, SourcesList, Tags, Tx, fmtDate } from "@/modules/site/content/components";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale();
  const item = getEntity(params.slug);
  if (!item) return {};
  return {
    title: pickText(item.name, locale)?.text,
    description: pickText(item.selfPublished.about, locale)?.text,
    robots: item.preview || item.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function SpecialistPage({ params }: Props) {
  const locale = await getLocale();
  const item = getEntity(params.slug);
  if (!item) notFound();
  const c = getContentCopy(locale);
  const e = c.entity;
  const d = (v: string) => fmtDate(v, locale, c.unknown);

  return (
    <div className="rw">
      <article className="rw-section">
        <div className="rw-wrap rw-narrow">
          <Link href="/specialists" className="rw-link">{c.back.specialists}</Link>
          <div style={{ marginBlockStart: "1.25rem" }}>
            <Tags kind="entity" preview={item.preview} draft={item.draft} only={null} locale={locale} />
          </div>
          <h1 className="rw-display" style={{ marginBlockStart: "0.9rem" }}><Tx l={item.name} locale={locale} /></h1>
          <div style={{ display: "grid", gap: "0.75rem", marginBlockStart: "1.25rem" }}>
            {item.preview && <PreviewNotice locale={locale} />}
            {item.draft && <PreviewNotice locale={locale} draft />}
            <p className="rwc-notice">{e.editorialNote}</p>
            <FallbackNotice title={item.selfPublished.about} locale={locale} />
          </div>

          <dl className="rwc-dates">
            <div>
              <dt>{e.disciplines}</dt>
              <dd>{item.disciplines.map((x, i) => (<span key={i}>{i > 0 ? " · " : ""}<Tx l={x} locale={locale} /></span>))}</dd>
            </div>
            {item.city && <div><dt>{e.city}</dt><dd><Tx l={item.city} locale={locale} /></dd></div>}
            {item.workArea && <div><dt>{e.workArea}</dt><dd><Tx l={item.workArea} locale={locale} /></dd></div>}
          </dl>

          <div className="rwc-triad" style={{ marginBlockStart: "2rem" }}>
            <section>
              <h2>{e.provided}</h2>
              <p className="rw-body"><Tx l={item.selfPublished.about} locale={locale} /></p>
              {item.selfPublished.contacts.length > 0 && (
                <>
                  <p className="rw-small" style={{ marginBlockStart: "0.9rem" }}>{e.contacts}</p>
                  <ul className="rwc-list">
                    {item.selfPublished.contacts.map((ct, i) => (<li key={i} dir="ltr">{ct.label ? <><Tx l={ct.label} locale={locale} />: </> : null}{ct.value}</li>))}
                  </ul>
                </>
              )}
            </section>

            <section>
              <h2>{e.official}</h2>
              {item.website && (
                <p className="rw-body">
                  {e.website}: <a className="rw-link" href={item.website} target="_blank" rel="noopener noreferrer nofollow" dir="ltr">{item.website}</a>
                </p>
              )}
              {item.publishedOnOfficialSources.works.length > 0 && (
                <>
                  <p className="rw-small" style={{ marginBlockStart: "0.9rem" }}>{e.works}</p>
                  <ul className="rwc-list">
                    {item.publishedOnOfficialSources.works.map((w, i) => {
                      const placeholder = new URL(w.sourceUrl).hostname.endsWith(".invalid");
                      return (
                        <li key={i}>
                          <Tx l={w.title} locale={locale} />
                          {w.role && <> — <Tx l={w.role} locale={locale} /></>}
                          {" · "}
                          {placeholder ? w.sourceLabel : <a className="rw-link" href={w.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" dir="ltr">{w.sourceLabel}</a>}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </section>

            {item.supportedByOtherSources.length > 0 && (
              <section>
                <h2>{e.supported}</h2>
                <ul className="rwc-list">
                  {item.supportedByOtherSources.map((x, i) => (
                    <li key={i}><Tx l={x.claim} locale={locale} /> · <a className="rw-link" href={x.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" dir="ltr">{x.sourceLabel}</a></li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2>{e.reviewed}</h2>
              <p className="rw-body">{e.reviewedAt}: {d(item.reviewedByRuwaq.reviewedAt)}</p>
              <p className="rw-small" style={{ marginBlockStart: "0.6rem" }}>{e.scope}</p>
              <ul className="rwc-list">{item.reviewedByRuwaq.scope.map((s) => <li key={s}>{e.scopeLabels[s]}</li>)}</ul>
              {item.reviewedByRuwaq.note && <p className="rw-body" style={{ marginBlockStart: "0.6rem" }}><Tx l={item.reviewedByRuwaq.note} locale={locale} /></p>}
              <p className="rw-fineprint" style={{ marginBlockStart: "0.9rem" }}>{e.disclaimer}</p>
            </section>
          </div>

          <section className="rwc-section"><h2>{c.sources.title}</h2><SourcesList sources={item.sources} locale={locale} /></section>
        </div>
      </article>
      {!item.preview && !item.draft && item.website && (
        <JsonLdScript
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: pickText(item.name, locale)?.text,
            url: item.website,
            mainEntityOfPage: `${RUWQ_PUBLIC_URL}/specialists/${item.slug}`,
          }}
        />
      )}
    </div>
  );
}
