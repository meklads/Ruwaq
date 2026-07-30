/** Default page size for marketplace directory / search results */
export const MARKETPLACE_LISTINGS_PAGE_SIZE = 20;

export const MARKETPLACE_LISTINGS_MAX_PAGE_SIZE = 48;

export function marketplaceListingsSkip(page: number, pageSize = MARKETPLACE_LISTINGS_PAGE_SIZE): number {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  return (safePage - 1) * pageSize;
}
