export type { ListingSeed } from "./marketplace-listing-catalog";
export { buildMarketplaceListingSeeds } from "./marketplace-listing-catalog";

import { buildMarketplaceListingSeeds } from "./marketplace-listing-catalog";

/** 7 categories × 3 cities × 6 companies = 126 verified provider listings */
export const MARKETPLACE_LISTING_SEEDS = buildMarketplaceListingSeeds();
