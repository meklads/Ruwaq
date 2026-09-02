import Image from "next/image";
import Link from "next/link";

/** Native aspect of partner banner assets (1749×718). */
export const ECOSYSTEM_AD_ASPECT = 1749 / 718;

type Props = {
  id?: string;
  href: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  external?: boolean;
  sectionTone?: "white" | "stone";
};

/**
 * Compact horizontal partner ad — max ~900×368 display, preserves 1749:718 ratio.
 * AD disclosure strip on the physical left.
 */
export function EcosystemImageAd({
  id,
  href,
  src,
  alt,
  width = 1749,
  height = 718,
  external = false,
  sectionTone = "white",
}: Props) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="ruwaq-ecosystem-ad__image"
      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 720px, 900px"
    />
  );

  return (
    <section
      id={id}
      className={`ruwaq-ad-featured-section ruwaq-ad-featured-section--compact ruwaq-ad-featured-section--${sectionTone} scroll-mt-28`}
      aria-label={alt}
    >
      <div className="ruwaq-ad-featured-section__frame">
        <div className="ruwaq-ecosystem-ad">
          <span className="ruwaq-ecosystem-ad__label" aria-hidden>
            <span className="ruwaq-ecosystem-ad__label-char">A</span>
            <span className="ruwaq-ecosystem-ad__label-char">D</span>
          </span>
          {external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="ruwaq-ecosystem-ad__link"
            >
              {image}
            </a>
          ) : (
            <Link href={href} className="ruwaq-ecosystem-ad__link">
              {image}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
