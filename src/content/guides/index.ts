import { marbleJeddahClimateGuide } from "@/content/guides/articles/marble-jeddah-climate";
import { concealedVsCentralAcGuide } from "@/content/guides/articles/concealed-vs-central-ac";
import { customKitchenPlanningGuide } from "@/content/guides/articles/custom-kitchen-planning";
import { engineeringSupervisionBasicsGuide } from "@/content/guides/articles/engineering-supervision-basics";
import { villaMaintenanceContractGuide } from "@/content/guides/articles/villa-maintenance-contract";
import { landscapeMadinahVillasGuide } from "@/content/guides/articles/landscape-madinah-villas";
import { gypsumCeilingJeddahGuide } from "@/content/guides/articles/gypsum-ceiling-jeddah-villas";
import { countGuideWords, type RuwaqGuide } from "@/content/guides/types";

export type { GuideBlock, RuwaqGuide } from "@/content/guides/types";
export { guideCtaHref, guideDirectoryHref } from "@/content/guides/types";

const RAW_GUIDES: RuwaqGuide[] = [
  marbleJeddahClimateGuide,
  concealedVsCentralAcGuide,
  customKitchenPlanningGuide,
  engineeringSupervisionBasicsGuide,
  villaMaintenanceContractGuide,
  landscapeMadinahVillasGuide,
  gypsumCeilingJeddahGuide,
];

function withReadMinutes(guide: RuwaqGuide): RuwaqGuide {
  const wordsEn = countGuideWords(guide.blocksEn);
  const wordsAr = countGuideWords(guide.blocksAr);
  const minutes = Math.max(1, Math.ceil(Math.max(wordsEn, wordsAr) / 180));
  return { ...guide, readMinutes: minutes };
}

export const RUWQ_GUIDES: RuwaqGuide[] = RAW_GUIDES.map(withReadMinutes);

export function getGuide(slug: string): RuwaqGuide | undefined {
  return RUWQ_GUIDES.find((g) => g.slug === slug);
}
