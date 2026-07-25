"use client";

import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

/** Compact app hero — breathing room below sticky header (PandaDoc / Linear pattern). */
export function AppPageHero({ eyebrow, title, subtitle, children }: Props) {
  return (
    <section className="app-page-hero" aria-labelledby="app-page-title">
      <div className="app-page-hero-inner">
        {eyebrow ? <p className="ruwaq-eyebrow">{eyebrow}</p> : null}
        <h1 id="app-page-title" className="ruwaq-app-title">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ruwaq-ink-muted sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-4 flex flex-wrap items-center gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
