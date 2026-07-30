import Link from "next/link";
import type { ReactNode } from "react";

type Cta = {
  href: string;
  label: string;
  external?: boolean;
};

type Props = {
  id: string;
  titleId: string;
  variant?: "greige" | "stone";
  headlineBefore: string;
  headlineEmphasis: string;
  offerLine: string;
  cta: Cta;
  visual: ReactNode;
  partnerMark?: ReactNode;
};

export function EditorialFeaturedAd({
  id,
  titleId,
  variant = "greige",
  headlineBefore,
  headlineEmphasis,
  offerLine,
  cta,
  visual,
  partnerMark,
}: Props) {
  const bandClass =
    variant === "stone" ? "ruwaq-ad-band-stone" : "ruwaq-ad-band-greige";

  const ctaClass = "ruwaq-ad-featured-cta";

  return (
    <section
      id={id}
      className={`ruwaq-ad-featured-banner ${bandClass} scroll-mt-28`}
      aria-labelledby={titleId}
    >
      <div className="ruwaq-ad-featured-banner__inner">
        <div className="ruwaq-ad-featured-banner__copy">
          {partnerMark ? <div className="mb-4">{partnerMark}</div> : null}
          <h2 id={titleId} className="ruwaq-ad-featured-headline">
            {headlineBefore}{" "}
            <em className="ruwaq-ad-featured-headline-em">{headlineEmphasis}</em>
          </h2>
          <p className="ruwaq-ad-featured-offer">{offerLine}</p>
        </div>

        <div className="ruwaq-ad-featured-banner__visual">{visual}</div>

        <div className="ruwaq-ad-featured-banner__cta">
          {cta.external ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClass}
            >
              {cta.label}
            </a>
          ) : (
            <Link href={cta.href} className={ctaClass}>
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
