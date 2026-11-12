import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { SourcesList, Tx, fmtDate } from "@/modules/site/content/components";
import { pickText } from "@/modules/site/content/localize";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";
import { getStyle } from "@/modules/site/knowledge/loader";
import { DraftBadge, GroupBox } from "@/modules/site/knowledge/components";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale();
  const s = getStyle(params.slug);
  if (!s) return {};
  return {
    title: pickText(s.name, locale)?.text,
    description: pickText(s.summary, locale)?.text,
    robots: s.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function StylePage({ params }: Props) {
  const locale = await getLocale();
  const s = getStyle(params.slug);
  if (!s) notFound();
  const a = getKnowledgeCopy(locale).atlas;
  const list = (title: string, items: typeof s.characteristics) =>
    items.length > 0 && (
      <section className="rwc-section">
        <h2>{title}</h2>
        <ul className="rwk-list">{items.map((it, i) => <li key={i}><Tx l={it} locale={locale} /></li>)}</ul>
      </section>
    );

  return (
    <div className="rw">
      <article className="rw-section">
        <div className="rw-wrap rw-narrow">
          <Link href="/atlas" className="rw-link">{a.back}</Link>
          {s.draft && <div className="rwc-tags" style={{ marginBlockStart: "1.25rem" }}><DraftBadge locale={locale} /></div>}
          <h1 className="rw-display" style={{ marginBlockStart: "0.9rem" }}><Tx l={s.name} locale={locale} /></h1>
          <p className="rw-fineprint">{a.region}: <Tx l={s.region} locale={locale} /></p>
          <p className="rw-lead" style={{ marginBlockStart: "1rem" }}><Tx l={s.summary} locale={locale} /></p>

          {s.image && (
            <figure className="rwc-section">
              <Image src={s.image.src} alt={pickText(s.image.alt, locale)?.text ?? ""} width={1600} height={900} style={{ width: "100%", height: "auto" }} />
              <figcaption className="rw-fineprint">{s.image.credit} · {s.image.license}</figcaption>
            </figure>
          )}

          {list(a.characteristics, s.characteristics)}
          {list(a.materials, s.materials)}
          {list(a.colours, s.colours)}
          {s.readings.length > 0 && (
            <section className="rwc-section">
              <h2>{a.readings}</h2>
              <dl className="rw-rows">
                {s.readings.map((r) => (
                  <div key={r.kind}><dt className="rw-h3">{a.reading[r.kind]}</dt><dd><Tx l={r.text} locale={locale} /></dd></div>
                ))}
              </dl>
            </section>
          )}
          <section className="rwc-section"><h2>{a.apply}</h2><p className="rw-body"><Tx l={s.applyInYourProject} locale={locale} /></p></section>
          {s.unclear.length > 0 && list(a.unclear, s.unclear)}

          <section className="rwc-section">
            <h2>{a.sources}</h2>
            <SourcesList sources={s.sources} locale={locale} />
            <p className="rw-fineprint" style={{ marginBlockStart: "0.5rem" }}>
              {s.architectReviewed ? `${a.architect} ${fmtDate(s.architectReviewed, locale, "—")}` : a.notArchitect} · {a.reviewed}: {fmtDate(s.reviewedAt, locale, "—")}
            </p>
          </section>

          <GroupBox target="graphicshouse" section="atlas" page={s.slug} locale={locale} />
        </div>
      </article>
    </div>
  );
}
