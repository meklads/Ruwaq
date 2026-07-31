"use client";

import { useCallback, useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  prevLabel: string;
  nextLabel: string;
};

export function FeaturedDirectoryRail({ children, prevLabel, nextLabel }: Props) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "prev" | "next") => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".ruwaq-ad-featured-rail__item");
    const step = card ? card.offsetWidth + 16 : rail.clientWidth * 0.85;
    rail.scrollBy({ left: direction === "next" ? step : -step, behavior: "smooth" });
  }, []);

  return (
    <div className="ruwaq-ad-featured-rail-wrap">
      <div className="ruwaq-ad-featured-rail-nav" aria-hidden={false}>
        <button
          type="button"
          className="ruwaq-ad-featured-rail-nav__btn"
          onClick={() => scroll("prev")}
          aria-label={prevLabel}
        >
          ‹
        </button>
        <button
          type="button"
          className="ruwaq-ad-featured-rail-nav__btn"
          onClick={() => scroll("next")}
          aria-label={nextLabel}
        >
          ›
        </button>
      </div>
      <div ref={railRef} className="ruwaq-ad-featured-rail">
        {children}
      </div>
    </div>
  );
}
