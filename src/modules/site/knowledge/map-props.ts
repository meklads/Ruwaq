import type { Locale } from "@/shared/i18n/locale";
import { pickText } from "@/modules/site/content/localize";
import { getKnowledgeCopy } from "./copy";
import { getStyles } from "./loader";
import type { AtlasMapLabels, StylePanel } from "./atlas-map";

/**
 * Server-side props for <AtlasMap>: the published styles resolved to the page locale, and the labels.
 * Shared by the atlas page and the home page so both maps show the same content.
 */
export function atlasMapProps(locale: Locale): { panels: Record<string, StylePanel>; labels: AtlasMapLabels } {
  const a = getKnowledgeCopy(locale).atlas;
  const tx = (l: { ar?: string; en?: string } | undefined) => (l ? pickText(l, locale)?.text ?? "" : "");
  const panels: Record<string, StylePanel> = Object.fromEntries(
    getStyles().map((s) => [
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
  const labels: AtlasMapLabels = {
    hint: a.mapHint, approx: a.mapApprox, open: a.mapOpen, soon: a.mapSoon, pick: a.mapPick, pickBody: a.mapPickBody,
    close: a.mapClose, prev: a.mapPrev, next: a.mapNext, region: a.region, characteristics: a.characteristics,
    materials: a.materials, colours: a.colours, gallery: a.gallery, concept: a.concept, documentary: a.documentary,
    soonBody: a.mapSoonBody, tryLive: a.mapTryLive, source: a.mapSource, sourceUrl: a.mapSourceUrl,
    tour: a.mapTour, stopTour: a.mapStopTour, details: a.mapDetails, overview: a.mapOverview, drag: a.mapDrag, reliefNote: a.mapReliefNote,
  };
  return { panels, labels };
}
