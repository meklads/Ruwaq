import Image from "next/image";
import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";
import { turrivaReferralUrl } from "@/shared/constants/brand";

/** Turriva partner banner, pre-designed asset (ad1.png). */
export function TurrivaPromoBanner() {
  const href = turrivaReferralUrl("homepage_featured_ad");

  return (
    <section
      id="turriva"
      className="ruwaq-ad-featured-section ruwaq-ad-featured-section--white scroll-mt-28"
      aria-label="Turriva"
    >
      <div className="ruwaq-ad-featured-section__frame">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="ruwaq-ad-featured-image-link"
        >
          <Image
            src={MARKETING_IMAGES.turrivaAd}
            alt="Turriva, Architecture, Interior, Construction"
            width={1749}
            height={899}
            className="ruwaq-ad-featured-image-banner"
            sizes="(max-width: 768px) 100vw, 1140px"
            priority={false}
          />
        </Link>
      </div>
    </section>
  );
}
