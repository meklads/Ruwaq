import { db } from "@/shared/lib/db";
import {
  getCityBySlug,
  type MarketplaceCategorySlug,
  type MarketplaceCitySlug,
} from "@/shared/constants/marketplace-taxonomy";
import {
  MARKETPLACE_LISTINGS_PAGE_SIZE,
  marketplaceListingsSkip,
  type ListingsSort,
} from "@/modules/marketplace/lib/listings-query";
import type { MarketplaceCity, Prisma } from "@prisma/client";

export type ListingsQueryOptions = {
  query?: string;
  page?: number;
  pageSize?: number;
  featuredOnly?: boolean;
  sort?: ListingsSort;
};

function listingsOrderBy(sort: ListingsSort): Prisma.ProviderListingOrderByWithRelationInput[] {
  switch (sort) {
    case "newest":
      return [{ createdAt: "desc" }];
    case "name":
      return [{ titleAr: "asc" }];
    default:
      return [{ directorySortRank: "asc" }, { isFeatured: "desc" }, { createdAt: "desc" }];
  }
}

export async function getListingsForCityCategory(
  citySlug: MarketplaceCitySlug,
  categorySlug: MarketplaceCategorySlug,
  options: ListingsQueryOptions = {}
) {
  const city = getCityBySlug(citySlug);
  const category = await db.serviceCategory.findUnique({
    where: { slug: categorySlug },
  });
  if (!city || !category) {
    return {
      category: null,
      listings: [],
      total: 0,
      page: 1,
      pageSize: MARKETPLACE_LISTINGS_PAGE_SIZE,
      totalPages: 0,
    };
  }

  const pageSize = options.pageSize ?? MARKETPLACE_LISTINGS_PAGE_SIZE;
  const page = options.page && options.page > 0 ? Math.floor(options.page) : 1;
  const skip = marketplaceListingsSkip(page, pageSize);
  const q = options.query?.trim();
  const sort = options.sort ?? "featured";

  const where: Prisma.ProviderListingWhereInput = {
    city: city.enum as MarketplaceCity,
    categoryId: category.id,
    isVerified: true,
    ...(options.featuredOnly ? { isFeatured: true } : {}),
    ...(q
      ? {
          OR: [
            { titleAr: { contains: q, mode: "insensitive" } },
            { descriptionAr: { contains: q, mode: "insensitive" } },
            { titleEn: { contains: q, mode: "insensitive" } },
            { descriptionEn: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [listings, total] = await Promise.all([
    db.providerListing.findMany({
      where,
      orderBy: listingsOrderBy(sort),
      skip,
      take: pageSize,
    }),
    db.providerListing.count({ where }),
  ]);

  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);

  return { category, listings, total, page, pageSize, totalPages };
}
