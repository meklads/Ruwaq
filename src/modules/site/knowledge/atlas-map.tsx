"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/shared/lib/analytics";
import { KSA_PATH, KSA_VIEWBOX, type MapStyle } from "./map-data";

/** Everything the panel shows for a published style, already resolved to the page locale on the server. */
export type StylePanel = {
  slug: string;
  name: string;
  region: string;
  summary: string;
  characteristics: string[];
  materials: string[];
  colours: string[];
  hero?: { src: string; alt: string; concept: boolean };
  gallery: { src: string; alt: string; caption: string; kind: string; concept: boolean; width: number; height: number }[];
};

export type AtlasMapLabels = {
  hint: string; approx: string; open: string; soon: string; pick: string; pickBody: string;
  close: string; prev: string; next: string; region: string; characteristics: string; materials: string;
  colours: string; gallery: string; concept: string; documentary: string; soonBody: string; tryLive: string;
  source: string; sourceUrl: string;
  tour: string; stopTour: string; details: string; overview: string; drag: string; reliefNote: string;
};

/** Three.js is loaded only on this page, and only when the browser can draw WebGL. */
const AtlasMap3D = dynamic(() => import("./atlas-map-3d"), { ssr: false });

function canUseWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

const [, , VB_W, VB_H] = KSA_VIEWBOX.split(" ").map(Number) as [number, number, number, number];

/**
 * Interactive map of the 19 styles. Hovering a point shows its name; clicking opens a panel under the
 * map with everything Ruwaq has published on that style. Unpublished styles say so plainly; we never
 * invent facts for them. The selection is kept in ?s= so a style can be shared as a link.
 */
export function AtlasMap({ styles, panels, locale, labels }: { styles: MapStyle[]; panels: Record<string, StylePanel>; locale: "ar" | "en"; labels: AtlasMapLabels }) {
  const [hover, setHover] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [three, setThree] = useState(false);
  const [touring, setTouring] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const num = (n: number) => n.toLocaleString(locale === "ar" ? "ar-SA-u-nu-latn" : "en-US");
  const name = (s: MapStyle) => (locale === "ar" ? s.ar : s.en);
  const panelOf = (s: MapStyle) => (s.slug ? panels[s.slug] : undefined);
  const firstLive = styles.find((s) => panelOf(s));

  // Pick the 3D map when WebGL works; the SVG map stays as the fallback and first paint.
  useEffect(() => { setThree(canUseWebGL()); }, []);

  // Open a style from a shared link (?s=key).
  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("s");
    if (k && styles.some((s) => s.key === k)) setActive(k);
  }, [styles]);

  const select = useCallback((key: string | null, scroll = true, fromTour = false) => {
    if (!fromTour) setTouring(false);
    setActive(key);
    const url = new URL(window.location.href);
    if (key) url.searchParams.set("s", key); else url.searchParams.delete("s");
    window.history.replaceState(null, "", url.toString());
    if (key && !fromTour) trackEvent("atlas_style_select", { style: key });
    if (key && scroll) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" }));
    }
  }, []);

  const idx = active ? styles.findIndex((s) => s.key === active) : -1;
  const cur = idx >= 0 ? styles[idx] : undefined;
  const step = (d: number) => {
    const i = idx < 0 ? 0 : (idx + d + styles.length) % styles.length;
    select(styles[i]!.key, false);
  };
  const tip = styles.find((s) => s.key === hover);

  // Guided tour: fly from style to style until the visitor takes over.
  useEffect(() => {
    if (!touring) return;
    let i = idx;
    const go = () => { i = (i + 1) % styles.length; select(styles[i]!.key, false, true); };
    if (idx < 0) go();
    const id = window.setInterval(go, 5200);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touring]);

  const pickFromList = (key: string) => {
    select(key, false);
    if (three) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stageRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
    } else {
      select(key, true);
    }
  };
  const toPanel = () => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  };
  const curPanel = cur ? panelOf(cur) : undefined;

  return (
    <div className="rwk-mapwrap">
      <div className={`rwk-mapbox${three ? " rwk-mapbox--3d" : ""}`} ref={stageRef}>
        {three ? (
          <div className="rwk-3dwrap">
            <AtlasMap3D
              styles={styles}
              live={new Set(styles.filter((s) => panelOf(s)).map((s) => s.key))}
              active={active}
              hover={hover}
              onSelect={(k) => select(k, false)}
              onHover={setHover}
              name={name}
              num={num}
              ariaLabel={labels.hint}
            />
            <div className="rwk-3d__tools">
              <button type="button" className={`rwk-3d__tool${touring ? " is-on" : ""}`} onClick={() => setTouring((v) => !v)}>
                {touring ? `■ ${labels.stopTour}` : `▶ ${labels.tour}`}
              </button>
              {active && <button type="button" className="rwk-3d__tool" onClick={() => select(null, false)}>⤢ {labels.overview}</button>}
            </div>
            {cur && (
              <div key={cur.key} className="rwk-3d__card" aria-live="polite">
                <span className="rwk-panel__num">{num(idx + 1)} / {num(styles.length)}{curPanel ? ` · ${curPanel.region}` : ""}</span>
                <h3>{name(cur)}</h3>
                <p>{curPanel ? curPanel.summary : labels.soonBody}</p>
                <div className="rwk-3d__actions">
                  {curPanel && <Link href={`/atlas/${curPanel.slug}`} className="rwh-btn rwh-btn--gold">{labels.open}</Link>}
                  <button type="button" className="rwh-btn rwh-btn--ghost" onClick={toPanel}>{labels.details} ↓</button>
                </div>
                <div className="rwk-3d__step">
                  <button type="button" onClick={() => step(-1)} aria-label={labels.prev}>{locale === "ar" ? "→" : "←"}</button>
                  <button type="button" onClick={() => step(1)} aria-label={labels.next}>{locale === "ar" ? "←" : "→"}</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rwk-mapstage">
            <svg viewBox={KSA_VIEWBOX} className="rwk-map-svg" role="group" aria-label={labels.hint}>
              <defs>
                <linearGradient id="rwk-land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1e4d3b" />
                  <stop offset="100%" stopColor="#0c2a20" />
                </linearGradient>
              </defs>
              <path d={KSA_PATH} fill="url(#rwk-land)" stroke="#c9a35b" strokeWidth="1.5" strokeLinejoin="round" />
              {styles.map((s, i) => {
                const on = s.key === active;
                return (
                  <g
                    key={s.key}
                    className={`rwk-pin${on ? " is-active" : ""}${panelOf(s) ? " is-live" : ""}${s.key === hover ? " is-hover" : ""}`}
                    transform={`translate(${s.x} ${s.y})`}
                    tabIndex={0}
                    role="button"
                    aria-pressed={on}
                    aria-label={name(s)}
                    onMouseEnter={() => setHover(s.key)}
                    onMouseLeave={() => setHover((h) => (h === s.key ? null : h))}
                    onFocus={() => setHover(s.key)}
                    onBlur={() => setHover((h) => (h === s.key ? null : h))}
                    onClick={() => select(s.key)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(s.key); } }}
                  >
                    <circle r={on ? 24 : 18} className="rwk-pin__halo" />
                    <circle r={on ? 16 : 13} className="rwk-pin__dot" />
                    <text y="5" textAnchor="middle" className="rwk-pin__num">{num(i + 1)}</text>
                  </g>
                );
              })}
            </svg>
            {tip && (
              <div className="rwk-tip" style={{ left: `${(tip.x / VB_W) * 100}%`, top: `${(tip.y / VB_H) * 100}%` }} role="tooltip">
                <b>{num(styles.indexOf(tip) + 1)}</b> {name(tip)}
                {panelOf(tip) ? <span className="rwk-tip__live">●</span> : null}
              </div>
            )}
          </div>
        )}
        <p className="rwk-mapbox__hint">{three ? `${labels.drag} ` : ""}{labels.hint} {labels.approx} {three ? labels.reliefNote : ""}</p>
      </div>

      <div className="rwk-chips" role="list">
        {styles.map((s, i) => (
          <button key={s.key} type="button" role="listitem" className={`rwk-chip${s.key === active ? " is-active" : ""}${panelOf(s) ? " is-live" : ""}`}
            onClick={() => pickFromList(s.key)} onMouseEnter={() => setHover(s.key)} onMouseLeave={() => setHover(null)}>
            <b>{num(i + 1)}</b>{name(s)}
          </button>
        ))}
      </div>

      <div ref={panelRef} className="rwk-panelslot" aria-live="polite">
        {!cur ? (
          <div className="rwk-panel rwk-panel--empty">
            <h3>{labels.pick}</h3>
            <p>{labels.pickBody}</p>
          </div>
        ) : (
          <article key={cur.key} className="rwk-panel">
            <header className="rwk-panel__bar">
              <span className="rwk-panel__num">{num(idx + 1)} / {num(styles.length)}</span>
              <div className="rwk-panel__nav">
                <button type="button" onClick={() => step(-1)} aria-label={labels.prev}>{locale === "ar" ? "→" : "←"}</button>
                <button type="button" onClick={() => step(1)} aria-label={labels.next}>{locale === "ar" ? "←" : "→"}</button>
                <button type="button" onClick={() => select(null, false)} aria-label={labels.close}>✕</button>
              </div>
            </header>
            <PanelBody p={panelOf(cur)} name={name(cur)} labels={labels} firstLive={firstLive && firstLive.key !== cur.key ? firstLive : undefined} onPick={(k) => select(k, false)} liveName={firstLive ? name(firstLive) : ""} />
          </article>
        )}
      </div>
    </div>
  );
}

function PanelBody({ p, name, labels, firstLive, liveName, onPick }: { p?: StylePanel; name: string; labels: AtlasMapLabels; firstLive?: MapStyle; liveName: string; onPick: (k: string) => void }) {
  if (!p) {
    return (
      <div className="rwk-panel__soon">
        <div className="rwk-panel__pattern" aria-hidden="true" />
        <div className="rwk-panel__soontext">
          <span className="rwk-mapcard__soon">{labels.soon}</span>
          <h3 className="rwk-panel__title">{name}</h3>
          <p>{labels.soonBody}</p>
          <p className="rw-fineprint"><a className="rw-link" href={labels.sourceUrl} target="_blank" rel="noopener noreferrer nofollow">{labels.source}</a></p>
          {firstLive && <button type="button" className="rwh-btn rwh-btn--dark" onClick={() => onPick(firstLive.key)}>{labels.tryLive} {liveName}</button>}
        </div>
      </div>
    );
  }
  return (
    <>
      {p.hero && (
        <div className="rwk-panel__hero">
          <Image src={p.hero.src} alt={p.hero.alt} fill sizes="(min-width: 1100px) 1100px, 100vw" className="rwk-panel__heroimg" />
          <div className="rwk-panel__herotext">
            <div className="rwk-badges">
              <span className="rwk-badge">{p.region}</span>
              {p.hero.concept && <span className="rwk-badge">{labels.concept}</span>}
            </div>
            <h3 className="rwk-panel__title rwk-panel__title--light">{p.name}</h3>
          </div>
        </div>
      )}
      <div className="rwk-panel__content">
        {!p.hero && <h3 className="rwk-panel__title">{p.name}</h3>}
        <p className="rwk-panel__summary">{p.summary}</p>
        <div className="rwk-panel__cols">
          <section>
            <h4>{labels.characteristics}</h4>
            <ul className="rwk-list">{p.characteristics.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </section>
          {p.materials.length > 0 && (
            <section>
              <h4>{labels.materials}</h4>
              <ul className="rwk-list">{p.materials.map((c, i) => <li key={i}>{c}</li>)}</ul>
            </section>
          )}
          {p.colours.length > 0 && (
            <section>
              <h4>{labels.colours}</h4>
              <ul className="rwk-list">{p.colours.map((c, i) => <li key={i}>{c}</li>)}</ul>
            </section>
          )}
        </div>
        {p.gallery.length > 0 && (
          <>
            <h4 className="rwk-panel__h4">{labels.gallery}</h4>
            <div className="rwk-panel__strip">
              {p.gallery.slice(0, 4).map((g) => (
                <figure key={g.src} className="rwk-shot">
                  <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 980px) 25vw, 50vw" loading="lazy" />
                  <span className="rwk-shot__tag">{g.concept ? labels.concept : labels.documentary}</span>
                  <figcaption><b>{g.kind}</b>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
        <Link href={`/atlas/${p.slug}`} className="rwh-btn rwh-btn--gold rwk-panel__cta">{labels.open}</Link>
      </div>
    </>
  );
}
