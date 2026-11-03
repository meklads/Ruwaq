import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { getContentCopy } from "@/modules/site/content/copy";
import { getEntities } from "@/modules/site/content/loader";
import { pickText } from "@/modules/site/content/localize";
import { EntityCard } from "@/modules/site/content/components";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContentCopy(await getLocale()).list.specialists;
  return { title: c.title, description: c.lead };
}

type Props = { searchParams: { discipline?: string; city?: string } };

export default async function SpecialistsPage({ searchParams }: Props) {
  const locale = await getLocale();
  const all = getEntities();
  if (all.length === 0) notFound();
  const c = getContentCopy(locale);

  const disciplinesOf = (e: (typeof all)[number]) => e.disciplines.map((d) => pickText(d, locale)?.text).filter((x): x is string => Boolean(x));
  const cityOf = (e: (typeof all)[number]) => pickText(e.city, locale)?.text;
  const uniq = (xs: (string | undefined)[]) => [...new Set(xs.filter((x): x is string => Boolean(x)))];
  const disciplines = uniq(all.flatMap(disciplinesOf));
  const cities = uniq(all.map(cityOf));

  const { discipline, city } = searchParams;
  const items = all.filter((e) => (!discipline || disciplinesOf(e).includes(discipline)) && (!city || cityOf(e) === city));
  const href = (next: { discipline?: string; city?: string }) => {
    const q = new URLSearchParams();
    const dv = "discipline" in next ? next.discipline : discipline;
    const cv = "city" in next ? next.city : city;
    if (dv) q.set("discipline", dv);
    if (cv) q.set("city", cv);
    return `/specialists${q.size ? `?${q}` : ""}`;
  };

  // Filters appear only when the data has more than one value to choose between.
  const chips = (label: string, values: string[], current: string | undefined, key: "discipline" | "city") =>
    values.length > 1 && (
      <div className="rwc-chips">
        <strong>{label}</strong>
        <Link className="rwc-chip" href={href({ [key]: undefined })} aria-current={!current}>{c.entity.all}</Link>
        {values.map((v) => (
          <Link key={v} className="rwc-chip" href={href({ [key]: v })} aria-current={current === v}>{v}</Link>
        ))}
      </div>
    );

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <h1 className="rw-display">{c.list.specialists.title}</h1>
          <p className="rw-lead">{c.list.specialists.lead}</p>
          <p className="rw-fineprint" style={{ marginBlockStart: "1rem" }}>{c.list.specialists.fine}</p>
        </div>
      </section>
      <section className="rw-section">
        <div className="rw-wrap">
          {chips(c.entity.filterDiscipline, disciplines, discipline, "discipline")}
          {chips(c.entity.filterCity, cities, city, "city")}
          {items.length === 0 ? (
            <p className="rw-body">{c.entity.noMatch}</p>
          ) : (
            <div className="rwc-grid rwc-grid--3">{items.map((it) => <EntityCard key={it.slug} item={it} locale={locale} />)}</div>
          )}
        </div>
      </section>
    </div>
  );
}
