import Link from "next/link";
import type { Locale } from "@/shared/i18n/locale";
import { getContentCopy } from "../content/copy";
import { getKnowledgeCopy } from "./copy";
import { GroupLink } from "./group-link";
import type { GroupTarget } from "./schema";

/** Public placeholder while a knowledge section has nothing published. Never lists drafts. */
export function KnowledgeSoon({ title, body, locale }: { title: string; body: string; locale: Locale }) {
  const c = getContentCopy(locale);
  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <p className="rw-eyebrow">{c.soon.badge}</p>
          <h1 className="rw-display">{title}</h1>
          <p className="rw-lead">{body}</p>
          <div className="rw-actions">
            <Link href="/contact" className="rw-btn rw-btn--ghost">{c.soon.contactCta}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function DraftBadge({ locale }: { locale: Locale }) {
  return <span className="rwc-tag rwc-tag--draft">{getKnowledgeCopy(locale).draftBadge}</span>;
}

/** The one "next step" box on a knowledge page: one group company, clearly named as part of the group. */
export function GroupBox({ target, section, page, locale }: { target: GroupTarget; section: string; page: string; locale: Locale }) {
  const g = getKnowledgeCopy(locale).group;
  return (
    <aside className="rwc-section rwk-group">
      <h2>{g.heading}</h2>
      <p className="rw-body">{g[target].body}</p>
      <GroupLink target={target} section={section} page={page} className="rw-btn rw-btn--primary">{g[target].cta}</GroupLink>
    </aside>
  );
}
