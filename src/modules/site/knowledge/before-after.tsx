"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Before/after comparison. A native range input drives the split, so it works with mouse, touch and
 * keyboard, and screen readers announce the value. The "after" image is revealed from the start side.
 */
export function BeforeAfter({ before, after, width, height, labels, rtl }: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  width: number;
  height: number;
  labels: { before: string; after: string; slider: string };
  rtl: boolean;
}) {
  const [pos, setPos] = useState(50);
  // In RTL the "start" is the right edge, so the revealed (after) part grows from the right.
  const clip = rtl ? `inset(0 0 0 ${100 - pos}%)` : `inset(0 ${100 - pos}% 0 0)`;
  const handle = rtl ? { right: `${pos}%`, transform: "translateX(50%)" } : { left: `${pos}%`, transform: "translateX(-50%)" };

  return (
    <div className="rwk-ba" style={{ aspectRatio: `${width} / ${height}` }}>
      <Image src={before.src} alt={before.alt} fill sizes="(min-width: 960px) 60rem, 100vw" className="rwk-ba__img" />
      <div className="rwk-ba__after" style={{ clipPath: clip }}>
        <Image src={after.src} alt={after.alt} fill sizes="(min-width: 960px) 60rem, 100vw" className="rwk-ba__img" />
      </div>
      <span className="rwk-ba__tag rwk-ba__tag--after">{labels.after}</span>
      <span className="rwk-ba__tag rwk-ba__tag--before">{labels.before}</span>
      <span className="rwk-ba__handle" style={handle} aria-hidden="true"><span>⇆</span></span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="rwk-ba__range"
        aria-label={labels.slider}
        dir={rtl ? "rtl" : "ltr"}
      />
    </div>
  );
}
