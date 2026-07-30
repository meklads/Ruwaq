import type { Messages } from "@/shared/i18n/messages/types";
import { EditorialFeaturedAd } from "@/modules/marketplace/components/editorial-featured-ad";
import { VisualizationAdMockup } from "@/modules/marketplace/components/ad-mockups/visualization-ad-mockup";

type Props = {
  copy: Messages["marketplace"]["graphicsHousePromo"];
};

export function GraphicsHousePromoBanner({ copy }: Props) {
  return (
    <EditorialFeaturedAd
      id="visualization"
      titleId="graphics-house-featured-title"
      copy={copy}
      cta={{ href: "/visualization", label: copy.cta }}
      visual={<VisualizationAdMockup />}
    />
  );
}
