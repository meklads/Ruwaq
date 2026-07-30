import Link from "next/link";
import type { ReactNode } from "react";

type Cta = {
  href: string;
  label: string;
  external?: boolean;
};

export type FeaturedAdCopy = {
  headlineBefore: string;
  headlineEmphasis: string;
  offerBefore?: string;
  offerStrike?: string;
  offerHighlight: string;
  offerAfter?: string;
  cta: string;
};

type Props = {
  id: string;
  titleId: string;
  copy: FeaturedAdCopy;
  cta: Cta;
  visual: ReactNode;
};

export function EditorialFeaturedAd({ id, titleId, copy, cta, visual }: Props) {
  return (
    <section
      id={id}
      className="ruwaq-ad-featured-banner scroll-mt-28"
      aria-labelledby={titleId}
    >
      <div className="ruwaq-ad-featured-banner__inner">
        <div className="ruwaq-ad-featured-banner__copy">
          <h2 id={titleId} className="ruwaq-ad-featured-headline">
            {copy.headlineBefore}{" "}
            <em className="ruwaq-ad-featured-headline-em">{copy.headlineEmphasis}</em>
          </h2>
          <p className="ruwaq-ad-featured-offer">
            {copy.offerBefore ? <span>{copy.offerBefore} </span> : null}
            {copy.offerStrike ? <s className="ruwaq-ad-featured-offer-strike">{copy.offerStrike}</s> : null}
            {copy.offerStrike ? " " : null}
            <span className="ruwaq-ad-featured-offer-highlight">{copy.offerHighlight}</span>
            {copy.offerAfter ? <span>{copy.offerAfter}</span> : null}
          </p>
        </div>

        <div className="ruwaq-ad-featured-banner__visual">{visual}</div>

        <div className="ruwaq-ad-featured-banner__cta">
          {cta.external ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ruwaq-ad-featured-cta"
            >
              {cta.label}
            </a>
          ) : (
            <Link href={cta.href} className="ruwaq-ad-featured-cta">
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
