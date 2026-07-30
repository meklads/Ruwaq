import Image from "next/image";
import Link from "next/link";
import { MARKETING_IMAGES } from "@/content/marketing-images";

/** Graphics House partner banner — pre-designed asset (ad2.png). */
export function GraphicsHousePromoBanner() {
  return (
    <section
      id="visualization"
      className="ruwaq-ad-featured-section ruwaq-ad-featured-section--stone scroll-mt-28"
      aria-label="Graphics House"
    >
      <div className="ruwaq-ad-featured-section__frame">
        <Link href="/visualization" className="ruwaq-ad-featured-image-link">
          <Image
            src={MARKETING_IMAGES.graphicsHouseAd}
            alt="Graphics House — We Build Visual Sales Systems"
            width={1844}
            height={853}
            className="ruwaq-ad-featured-image-banner"
            sizes="(max-width: 768px) 100vw, 1140px"
          />
        </Link>
      </div>
    </section>
  );
}
