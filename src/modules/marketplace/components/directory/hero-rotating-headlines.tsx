"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type HeroSlide = {
  title: string;
  lead: string;
  primaryCta: string;
  primaryHref: string;
};

type Props = {
  slides: readonly HeroSlide[];
  howMatchCta: string;
  howMatchHref?: string;
  intervalMs?: number;
};

export function HeroRotatingHeadlines({
  slides,
  howMatchCta,
  howMatchHref = "/how-we-match",
  intervalMs = 5500,
}: Props) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, reduceMotion, slides.length]);

  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  return (
    <>
      <div className="ruwaq-hero-rotate-wrap">
        <h1
          id="ruwaq-pro-hero-title"
          className="ruwaq-pro-display ruwaq-pro-display--hero"
          aria-live="polite"
        >
          <span key={`title-${index}`} className="ruwaq-hero-rotate-panel ruwaq-hero-rotate-title block">
            {slide.title}
          </span>
          <span
            key={`lead-${index}`}
            className="ruwaq-pro-subtitle ruwaq-hero-rotate-panel ruwaq-hero-rotate-lead block"
          >
            {slide.lead}
          </span>
        </h1>
      </div>

      {slides.length > 1 ? (
        <div
          className="ruwaq-hero-rotate-dots flex justify-center gap-2"
          role="tablist"
          aria-label="Hero messages"
        >
          {slides.map((item, i) => (
            <button
              key={item.primaryHref + item.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Message ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-[#d4b47a]" : "bg-white/35 hover:bg-white/55"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}

      <div className="ruwaq-hero-rotate-actions flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          key={`cta-${index}`}
          href={slide.primaryHref}
          className="ruwaq-pro-btn-solid ruwaq-hero-rotate-panel inline-flex min-w-[240px] justify-center px-10 py-4 text-sm"
        >
          {slide.primaryCta}
        </Link>
        <Link
          href={howMatchHref}
          className="ruwaq-pro-btn-outline inline-flex min-w-[200px] justify-center border-white/40 bg-white/5 px-8 py-4 text-sm text-white hover:bg-white/10"
        >
          {howMatchCta}
        </Link>
      </div>
    </>
  );
}
