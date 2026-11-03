import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { getContentCopy } from "@/modules/site/content/copy";
import { getUpdates } from "@/modules/site/content/loader";
import { UpdateCard, ComingSoon } from "@/modules/site/content/components";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContentCopy(await getLocale()).list.updates;
  return { title: c.title, description: c.lead };
}

export default async function UpdatesPage() {
  const locale = await getLocale();
  const items = getUpdates();
  if (items.length === 0) return <ComingSoon section="updates" locale={locale} />;
  const c = getContentCopy(locale).list.updates;
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
          <div className="rwc-grid">{items.map((it) => <UpdateCard key={it.slug} item={it} locale={locale} />)}</div>
        </div>
      </section>
    </div>
  );
}
