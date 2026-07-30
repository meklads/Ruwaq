import Image from "next/image";
import { FEATURED_AD_IMAGES } from "@/content/marketing-images";

/** AD-style device pair — proposal desk preview. */
export function ProposalAdMockup() {
  return (
    <div className="ruwaq-ad-featured-devices" aria-hidden>
      <div className="ruwaq-ad-featured-device ruwaq-ad-featured-device--tablet">
        <div className="ruwaq-ad-featured-screen ruwaq-ad-featured-screen--photo">
          <Image
            src={FEATURED_AD_IMAGES.proposals}
            alt=""
            fill
            className="object-cover"
            sizes="90px"
          />
        </div>
      </div>
      <div className="ruwaq-ad-featured-device ruwaq-ad-featured-device--phone">
        <div className="ruwaq-ad-featured-screen ruwaq-ad-featured-screen--photo">
          <Image
            src={FEATURED_AD_IMAGES.proposals}
            alt=""
            fill
            className="object-cover object-[center_40%]"
            sizes="48px"
          />
        </div>
      </div>
    </div>
  );
}
