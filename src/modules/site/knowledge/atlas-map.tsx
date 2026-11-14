"use client";

import Link from "next/link";
import { useState } from "react";
import { KSA_PATH, KSA_VIEWBOX, type MapStyle } from "./map-data";

type Labels = { hint: string; approx: string; open: string; soon: string };

/**
 * Interactive map of the 19 styles. Each point is a button (keyboard and touch friendly); the selected
 * style shows a card that links to its page when one exists. Positions are approximate by design.
 */
export function AtlasMap({ styles, available, locale, labels }: { styles: MapStyle[]; available: string[]; locale: "ar" | "en"; labels: Labels }) {
  const first = styles.find((s) => s.slug && available.includes(s.slug)) ?? styles[0]!;
  const [active, setActive] = useState<string>(first.key);
  const cur = styles.find((s) => s.key === active) ?? first;
  const num = (n: number) => n.toLocaleString(locale === "ar" ? "ar-SA" : "en-US");
  const live = (s: MapStyle) => Boolean(s.slug && available.includes(s.slug));

  return (
    <div className="rwk-mapwrap">
      <div className="rwk-mapbox">
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
                className={`rwk-pin${on ? " is-active" : ""}${live(s) ? " is-live" : ""}`}
                transform={`translate(${s.x} ${s.y})`}
                tabIndex={0}
                role="button"
                aria-pressed={on}
                aria-label={locale === "ar" ? s.ar : s.en}
                onMouseEnter={() => setActive(s.key)}
                onFocus={() => setActive(s.key)}
                onClick={() => setActive(s.key)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(s.key); } }}
              >
                <circle r={on ? 24 : 18} className="rwk-pin__halo" />
                <circle r={on ? 16 : 13} className="rwk-pin__dot" />
                <text y="5" textAnchor="middle" className="rwk-pin__num">{num(i + 1)}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="rwk-mapcard" aria-live="polite">
        <span className="rwk-mapcard__num">{num(styles.indexOf(cur) + 1)} / {num(styles.length)}</span>
        <h3 className="rwk-mapcard__title">{locale === "ar" ? cur.ar : cur.en}</h3>
        {live(cur) ? (
          <Link href={`/atlas/${cur.slug}`} className="rwh-btn rwh-btn--gold">{labels.open}</Link>
        ) : (
          <span className="rwk-mapcard__soon">{labels.soon}</span>
        )}
        <ol className="rwk-maplist">
          {styles.map((s, i) => (
            <li key={s.key}>
              <button type="button" className={s.key === active ? "is-active" : ""} onClick={() => setActive(s.key)} onMouseEnter={() => setActive(s.key)}>
                <b>{num(i + 1)}</b> {locale === "ar" ? s.ar : s.en}{live(s) ? " •" : ""}
              </button>
            </li>
          ))}
        </ol>
        <p className="rwk-mapcard__note">{labels.hint} {labels.approx}</p>
      </div>
    </div>
  );
}
