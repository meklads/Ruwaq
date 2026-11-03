import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { getContentCopy } from "@/modules/site/content/copy";
import { getInsights } from "@/modules/site/content/loader";
import { InsightCard } from "@/modules/site/content/components";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContentCopy(await getLocale()).list.insights;
  return { title: c.title, description: c.lead };
}

export default async function InsightsPage() {
  const locale = await getLocale();
  const items = getInsights();
  if (items.length === 0) notFound();
  const c = getContentCopy(locale).list.insights;
  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <h1 className="rw-display">{c.title}</h1>
          <p className="rw-lead">{c.lead}</p>
        </div>
      </section>
      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rwc-grid">{items.map((it) => <InsightCard key={it.slug} item={it} locale={locale} />)}</div>
        </div>
      </section>
    </div>
  );
}
