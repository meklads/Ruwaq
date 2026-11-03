import Link from "next/link";
import type { Locale } from "@/shared/i18n/locale";
import { getContentCopy } from "./copy";
import { availableLocales, pickText, type Picked } from "./localize";
import type { Entity, Insight, Localized, Source, Update } from "./schema";
import "./content.css";

/** Renders localized text; marks language and direction when it is a fallback language. */
export function Tx({ l, locale, as: As = "span" }: { l: Localized | undefined; locale: Locale; as?: "span" | "p" | "div" }) {
  const p = pickText(l, locale);
  if (!p) return null;
  return p.fallback ? (
    <As lang={p.lang} dir={p.lang === "ar" ? "rtl" : "ltr"}>
      {p.text}
    </As>
  ) : (
    <As>{p.text}</As>
  );
}

export function fmtDate(d: string, locale: Locale, unknown: string): string {
  if (d === "unknown") return unknown;
  return new Date(`${d}T00:00:00Z`).toLocaleDateString(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-GB", {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
  });
}

export function PreviewTag({ locale }: { locale: Locale }) {
  return <span className="rwc-tag rwc-tag--preview">{getContentCopy(locale).preview}</span>;
}

export function Tags({ kind, preview, draft = false, archival = false, only, locale }: { kind: "update" | "insight" | "entity"; preview: boolean; draft?: boolean; archival?: boolean; only: Picked["lang"] | null; locale: Locale }) {
  const c = getContentCopy(locale);
  return (
    <div className="rwc-tags">
      <span className={`rwc-tag rwc-tag--${kind}`}>{c.tag[kind]}</span>
      {preview && <PreviewTag locale={locale} />}
      {draft && <span className="rwc-tag rwc-tag--draft">{c.draft}</span>}
      {archival && <span className="rwc-tag rwc-tag--lang">{c.archival}</span>}
      {only && <span className="rwc-tag rwc-tag--lang">{c.onlyIn[only]}</span>}
    </div>
  );
}

/** Language this item is limited to in the current view, or null when the current language is available. */
function onlyLang(title: Localized, locale: Locale): Locale | null {
  return availableLocales(title).includes(locale) ? null : availableLocales(title)[0] ?? null;
}

export function UpdateCard({ item, locale }: { item: Update; locale: Locale }) {
  const c = getContentCopy(locale);
  return (
    <Link href={`/updates/${item.slug}`} className="rwc-card">
      <Tags kind="update" preview={item.preview} draft={item.draft} archival={item.archival} only={onlyLang(item.title, locale)} locale={locale} />
      <h3 className="rwc-card__title"><Tx l={item.title} locale={locale} /></h3>
      <p className="rwc-card__body"><Tx l={item.summary} locale={locale} /></p>
      <span className="rwc-card__meta">{c.update.published}: {fmtDate(item.publishedAt, locale, c.unknown)}</span>
    </Link>
  );
}

export function InsightCard({ item, locale }: { item: Insight; locale: Locale }) {
  const c = getContentCopy(locale);
  return (
    <Link href={`/insights/${item.slug}`} className="rwc-card">
      <Tags kind="insight" preview={item.preview} draft={item.draft} only={onlyLang(item.title, locale)} locale={locale} />
      <h3 className="rwc-card__title"><Tx l={item.title} locale={locale} /></h3>
      <p className="rwc-card__body"><Tx l={item.summary} locale={locale} /></p>
      <span className="rwc-card__meta">
        {item.period.from === item.period.to
          ? <>{c.insight.readingDate}: {fmtDate(item.period.from, locale, c.unknown)}</>
          : <>{c.insight.period}: {fmtDate(item.period.from, locale, c.unknown)} – {fmtDate(item.period.to, locale, c.unknown)}</>}
      </span>
    </Link>
  );
}

export function EntityCard({ item, locale }: { item: Entity; locale: Locale }) {
  const c = getContentCopy(locale);
  return (
    <Link href={`/specialists/${item.slug}`} className="rwc-card">
      <Tags kind="entity" preview={item.preview} draft={item.draft} only={onlyLang(item.selfPublished.about, locale)} locale={locale} />
      <h3 className="rwc-card__title"><Tx l={item.name} locale={locale} /></h3>
      <p className="rwc-card__body">
        {item.disciplines.map((d, i) => (<span key={i}>{i > 0 ? " · " : ""}<Tx l={d} locale={locale} /></span>))}
        {item.city && (<> — <Tx l={item.city} locale={locale} /></>)}
      </p>
      <span className="rwc-card__meta">{c.entity.reviewedAt}: {fmtDate(item.reviewedByRuwaq.reviewedAt, locale, c.unknown)}</span>
    </Link>
  );
}

export function SourcesList({ sources, locale }: { sources: Source[]; locale: Locale }) {
  const c = getContentCopy(locale);
  return (
    <ul className="rwc-sources">
      {sources.map((s, i) => {
        const placeholder = new URL(s.url).hostname.endsWith(".invalid");
        return (
          <li key={i}>
            {placeholder ? (
              <span>{s.label} <small>{c.sources.placeholder}</small></span>
            ) : (
              <a className="rw-link" href={s.url} target="_blank" rel="noopener noreferrer nofollow" dir="ltr">{s.label}</a>
            )}
            <small>
              {s.publisher && <>{c.sources.publisher}: {s.publisher} · </>}
              {s.publishedAt && <>{c.sources.published}: {fmtDate(s.publishedAt, locale, c.unknown)} · </>}
              {c.sources.accessed}: {fmtDate(s.accessedAt, locale, c.unknown)}
            </small>
          </li>
        );
      })}
    </ul>
  );
}

export function PreviewNotice({ locale, draft = false }: { locale: Locale; draft?: boolean }) {
  const c = getContentCopy(locale);
  return <p className="rwc-notice rwc-notice--preview">{draft ? c.draftNotice : c.preview}</p>;
}

export function FallbackNotice({ title, locale }: { title: Localized; locale: Locale }) {
  const only = onlyLang(title, locale);
  if (!only) return null;
  return <p className="rwc-notice">{getContentCopy(locale).fallback[only]}</p>;
}

/** Public placeholder for a section that has no published content yet. Never shows items or drafts. */
export function ComingSoon({ section, locale }: { section: "updates" | "insights" | "specialists"; locale: Locale }) {
  const c = getContentCopy(locale);
  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <p className="rw-eyebrow">{c.soon.badge}</p>
          <h1 className="rw-display">{c.list[section].title}</h1>
          <p className="rw-lead">{c.soon[section]}</p>
          <p className="rw-fineprint" style={{ marginBlockStart: "1rem" }}>{c.soon.note}</p>
          <div className="rw-actions">
            <Link href="/radar" className="rw-btn rw-btn--primary">{c.soon.radarCta}</Link>
            <Link href="/contact" className="rw-btn rw-btn--outline">{c.soon.contactCta}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
