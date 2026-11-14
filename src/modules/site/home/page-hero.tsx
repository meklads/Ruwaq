import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Image hero for the main pages, in the home page's language: full-bleed photo, emerald veil,
 * gold eyebrow, large title. Optional actions and a stats strip under it.
 */
export function PageHero({
  img, alt, eyebrow, title, lead, credit, actions, stats, children,
}: {
  img: string; alt: string; eyebrow: string; title: ReactNode; lead?: ReactNode; credit?: string;
  actions?: ReactNode; stats?: { value: string; label: string }[]; children?: ReactNode;
}) {
  return (
    <>
      <section className="rwh-hero rwh-hero--page">
        <Image src={img} alt={alt} fill priority sizes="100vw" className="rwh-hero__img" />
        <div className="rw-wrap rwh-hero__inner">
          <span className="rwh-eyebrow">{eyebrow}</span>
          <h1 className="rwh-hero__title">{title}</h1>
          {lead && <p className="rwh-hero__lead">{lead}</p>}
          {children}
          {actions && <div className="rwh-hero__actions">{actions}</div>}
          {credit && <p className="rwh-hero__credit">{credit}</p>}
        </div>
      </section>
      {stats && stats.length > 0 && (
        <section className="rwh-stats">
          <div className="rw-wrap rwh-stats__grid" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
            {stats.map((s) => <div key={s.label} className="rwh-stat"><strong>{s.value}</strong><span>{s.label}</span></div>)}
          </div>
        </section>
      )}
    </>
  );
}
