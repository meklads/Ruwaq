import type { Messages } from "@/shared/i18n/messages/types";
import { graphicsHouseReferralUrl } from "@/shared/constants/brand";
import { GraphicsHouseLogo } from "@/shared/components/graphics-house-logo";
import { EditorialFeaturedAd } from "@/modules/marketplace/components/editorial-featured-ad";
import { VisualizationAdMockup } from "@/modules/marketplace/components/ad-mockups/visualization-ad-mockup";

type Props = {
  copy: Messages["marketplace"]["graphicsHousePromo"];
};

export function GraphicsHousePromoBanner({ copy }: Props) {
  const ghUrl = graphicsHouseReferralUrl("homepage_featured_ad");

  return (
    <EditorialFeaturedAd
      id="visualization"
      titleId="graphics-house-featured-title"
      variant="greige"
      headlineBefore={copy.headlineBefore}
      headlineEmphasis={copy.headlineEmphasis}
      offerLine={copy.offerLine}
      cta={{ href: "/visualization", label: copy.cta }}
      visual={<VisualizationAdMockup />}
      partnerMark={<GraphicsHouseLogo href={ghUrl} variant="mark" className="h-6 w-auto opacity-90" />}
    />
  );
}
