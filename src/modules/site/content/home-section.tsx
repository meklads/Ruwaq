import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { getContentCopy } from "./copy";
import { getEntities, getInsights, getUpdates } from "./loader";
import { EntityCard, InsightCard, UpdateCard } from "./components";

/**
 * One compact block on the home page: at most one item per type, so the page stays focused on
 * Ruwaq and Radar. Renders nothing when there is no content (e.g. production today).
 */
export async function HomeKnowledge() {
  const locale = await getLocale();
  const update = getUpdates()[0];
  const insight = getInsights()[0];
  const entity = getEntities()[0];
  if (!update && !insight && !entity) return null;
  const c = getContentCopy(locale);

  return (
    <section className="rw-section">
      <div className="rw-wrap">
        <div className="rw-head">
          <span className="rw-eyebrow">{c.home.eyebrow}</span>
          <h2 className="rw-display">{c.home.title}</h2>
          <p className="rw-body">{c.home.body}</p>
        </div>
        <div className="rwc-grid rwc-grid--3">
          {update && <UpdateCard item={update} locale={locale} />}
          {insight && <InsightCard item={insight} locale={locale} />}
          {entity && <EntityCard item={entity} locale={locale} />}
        </div>
        <p className="rw-small" style={{ marginBlockStart: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem" }}>
          {update && <Link className="rw-link" href="/updates">{c.home.all.updates}</Link>}
          {insight && <Link className="rw-link" href="/insights">{c.home.all.insights}</Link>}
          {entity && <Link className="rw-link" href="/specialists">{c.home.all.specialists}</Link>}
        </p>
      </div>
    </section>
  );
}
