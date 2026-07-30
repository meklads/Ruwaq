/** Default page size for marketplace directory / search results */
export const MARKETPLACE_LISTINGS_PAGE_SIZE = 20;

export const MARKETPLACE_LISTINGS_MAX_PAGE_SIZE = 48;

export type ListingsSort = "featured" | "newest" | "name";

export function marketplaceListingsSkip(
  page: number,
  pageSize = MARKETPLACE_LISTINGS_PAGE_SIZE
): number {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  return (safePage - 1) * pageSize;
}

export function parseListingsSort(value: string | undefined): ListingsSort {
  if (value === "newest" || value === "name") return value;
  return "featured";
}

export function parseFeaturedOnly(value: string | undefined): boolean {
  return value === "1" || value === "true";
}
