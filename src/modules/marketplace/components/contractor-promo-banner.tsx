import type { Messages } from "@/shared/i18n/messages/types";
import { EditorialFeaturedAd } from "@/modules/marketplace/components/editorial-featured-ad";
import { ProposalAdMockup } from "@/modules/marketplace/components/ad-mockups/proposal-ad-mockup";

type Props = {
  copy: Messages["marketplace"]["contractorPromo"];
};

export function ContractorPromoBanner({ copy }: Props) {
  return (
    <EditorialFeaturedAd
      id="contractor-promo"
      titleId="contractor-featured-title"
      copy={copy}
      sectionTone="stone"
      cta={{ href: "/proposals/new", label: copy.cta }}
      visual={<ProposalAdMockup />}
    />
  );
}
