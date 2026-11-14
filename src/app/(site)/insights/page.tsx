import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { PageHero } from "@/modules/site/home/page-hero";
import { getPagesCopy } from "@/modules/site/pages/copy";
import "@/modules/site/home/home.css";
import { getContentCopy } from "@/modules/site/content/copy";
import { getInsights } from "@/modules/site/content/loader";
import { InsightCard, ComingSoon } from "@/modules/site/content/components";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContentCopy(await getLocale()).list.insights;
  return { title: c.title, description: c.lead };
}

export default async function InsightsPage() {
  const locale = await getLocale();
  const pc = getPagesCopy(locale);
  const items = getInsights();
  if (items.length === 0) return <ComingSoon section="insights" locale={locale} />;
  const c = getContentCopy(locale).list.insights;
  return (
    <div className="rw rwh">
      <PageHero img={pc.soon.sections.insights.img} alt={pc.soon.sections.insights.alt} eyebrow={pc.soon.sections.insights.eyebrow} title={c.title} lead={c.lead} credit={pc.credit}>
      </PageHero>
      <section className="rwh-section">
        <div className="rw-wrap">
          <div className="rwc-grid">{items.map((it) => <InsightCard key={it.slug} item={it} locale={locale} />)}</div>
        </div>
      </section>
    </div>
  );
}
