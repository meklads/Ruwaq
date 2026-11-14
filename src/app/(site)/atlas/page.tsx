import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { Tx } from "@/modules/site/content/components";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";
import { getStyles } from "@/modules/site/knowledge/loader";
import { MAP_STYLES } from "@/modules/site/knowledge/map-data";
import { AtlasMap, type StylePanel } from "@/modules/site/knowledge/atlas-map";
import { pickText } from "@/modules/site/content/localize";
import { DraftBadge } from "@/modules/site/knowledge/components";
import "@/modules/site/home/home.css";
import "@/modules/site/knowledge/atlas.css";

export async function generateMetadata(): Promise<Metadata> {
  const a = getKnowledgeCopy(await getLocale()).atlas;
  return { title: a.title, description: a.lead };
}

/**
 * The map is public from day one: its facts (the 19 official style names) are sourced. Style pages
 * appear only once published; drafts show in development and the private preview, never in production.
 */
export default async function AtlasPage() {
  const locale = await getLocale();
  const a = getKnowledgeCopy(locale).atlas;
  const styles = getStyles();
  const tx = (l: { ar?: string; en?: string } | undefined) => (l ? pickText(l, locale)?.text ?? "" : "");
  const panels: Record<string, StylePanel> = Object.fromEntries(
    styles.map((s) => [
      s.slug,
      {
        slug: s.slug,
        name: tx(s.name),
        region: tx(s.region),
        summary: tx(s.summary),
        characteristics: s.characteristics.map(tx),
        materials: s.materials.map(tx),
        colours: s.colours.map(tx),
        hero: s.hero ? { src: s.hero.src, alt: tx(s.hero.alt), concept: s.hero.nature === "concept" } : undefined,
        gallery: s.gallery.map((g) => ({ src: g.src, alt: tx(g.alt), caption: tx(g.caption), kind: a.kinds[g.kind], concept: g.nature === "concept", width: g.width, height: g.height })),
      },
    ]),
  );
  const fmt = (n: number) => n.toLocaleString(locale === "ar" ? "ar-SA-u-nu-latn" : "en-US");

  return (
    <div className="rw rwh">
      <section className="rwh-section" style={{ paddingBlockEnd: "2rem" }}>
        <div className="rw-wrap">
          <span className="rwh-eyebrow">{a.title}</span>
          <h1 className="rwh-title" style={{ fontSize: "clamp(32px, 4.4vw, 56px)" }}>{fmt(MAP_STYLES.length)} {a.styleCount}{locale === "ar" ? "، لكل منطقة لغتها" : ", each region with its own language"}</h1>
          <p className="rwh-body">{a.lead}</p>
        </div>
      </section>

      <section className="rwh-section" style={{ paddingBlockStart: 0 }}>
        <div className="rw-wrap">
          <AtlasMap
            styles={MAP_STYLES}
            panels={panels}
            locale={locale}
            labels={{
              hint: a.mapHint, approx: a.mapApprox, open: a.mapOpen, soon: a.mapSoon, pick: a.mapPick, pickBody: a.mapPickBody,
              close: a.mapClose, prev: a.mapPrev, next: a.mapNext, region: a.region, characteristics: a.characteristics,
              materials: a.materials, colours: a.colours, gallery: a.gallery, concept: a.concept, documentary: a.documentary,
              soonBody: a.mapSoonBody, tryLive: a.mapTryLive, source: a.mapSource, sourceUrl: a.mapSourceUrl,
              tour: a.mapTour, stopTour: a.mapStopTour, details: a.mapDetails, overview: a.mapOverview, drag: a.mapDrag, reliefNote: a.mapReliefNote,
            }}
          />
          <p className="rw-fineprint" style={{ marginBlockStart: "1rem" }}>
            <a className="rw-link" href={a.mapSourceUrl} target="_blank" rel="noopener noreferrer nofollow">{a.mapSource}</a>
          </p>
        </div>
      </section>

      {styles.length > 0 && (
        <section className="rwh-section" style={{ paddingBlockStart: 0 }}>
          <div className="rw-wrap">
            <div className="rwh-cards">
              {styles.map((s, i) => (
                <Link key={s.slug} href={`/atlas/${s.slug}`} className="rwh-card">
                  {s.hero && (
                    <div className="rwh-card__media">
                      <Image src={s.hero.src} alt={pickAlt(s.hero.alt, locale)} fill sizes="(min-width: 1100px) 25vw, (min-width: 720px) 50vw, 100vw" />
                      <span className="rwh-card__chip rwh-card__chip--on">{a.concept}</span>
                    </div>
                  )}
                  <div className="rwh-card__body">
                    <span className="rwh-card__num">{fmt(i + 1)}</span>
                    {s.draft && <div className="rwc-tags"><DraftBadge locale={locale} /></div>}
                    <h3 className="rwh-card__title"><Tx l={s.name} locale={locale} /></h3>
                    <p className="rwh-card__text"><Tx l={s.summary} locale={locale} /></p>
                    <span className="rwh-card__more"><Tx l={s.region} locale={locale} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function pickAlt(l: { ar?: string; en?: string }, locale: "ar" | "en"): string {
  return l[locale] ?? l.ar ?? l.en ?? "";
}
