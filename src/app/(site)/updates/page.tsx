import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { PageHero } from "@/modules/site/home/page-hero";
import { getPagesCopy } from "@/modules/site/pages/copy";
import "@/modules/site/home/home.css";
import { getContentCopy } from "@/modules/site/content/copy";
import { getUpdates } from "@/modules/site/content/loader";
import { UpdateCard, ComingSoon } from "@/modules/site/content/components";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContentCopy(await getLocale()).list.updates;
  return { title: c.title, description: c.lead };
}

export default async function UpdatesPage() {
  const locale = await getLocale();
  const pc = getPagesCopy(locale);
  const items = getUpdates();
  if (items.length === 0) return <ComingSoon section="updates" locale={locale} />;
  const c = getContentCopy(locale).list.updates;
  return (
    <div className="rw rwh">
      <PageHero img={pc.soon.sections.updates.img} alt={pc.soon.sections.updates.alt} eyebrow={pc.soon.sections.updates.eyebrow} title={c.title} lead={c.lead} credit={pc.credit}>
      </PageHero>
      <section className="rwh-section">
        <div className="rw-wrap">
          <div className="rwc-grid">{items.map((it) => <UpdateCard key={it.slug} item={it} locale={locale} />)}</div>
        </div>
      </section>
    </div>
  );
}
