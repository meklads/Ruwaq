import type { ProviderListing, ServiceCategory } from "@prisma/client";
import {
  DEFAULT_MARKETING_HERO,
  categoryImageForSlug,
} from "@/content/marketing-images";
import { getShowcaseListingProfile } from "@/content/showcase-listings";

type ListingWithCategory = ProviderListing & { category?: ServiceCategory };

export function listingGalleryImages(listing: ProviderListing): string[] {
  const images = listing.images;
  if (!Array.isArray(images)) return [];
  return images.filter((item): item is string => typeof item === "string" && item.length > 0);
}

export function listingHeroFromSlug(
  slug: string,
  categorySlug: string | undefined,
  images: unknown
): string {
  const showcase = getShowcaseListingProfile(slug);
  if (showcase?.portfolioImages[0]) return showcase.portfolioImages[0]!;

  if (Array.isArray(images)) {
    const gallery = images.filter(
      (item): item is string => typeof item === "string" && item.length > 0
    );
    if (gallery[0]) return gallery[0];
  }

  return categoryImageForSlug(categorySlug) ?? DEFAULT_MARKETING_HERO;
}

export function listingHeroImage(listing: ListingWithCategory): string {
  const showcase = getShowcaseListingProfile(listing.slug);
  if (showcase?.portfolioImages[0]) return showcase.portfolioImages[0]!;

  const gallery = listingGalleryImages(listing);
  if (gallery.length > 0) return gallery[0]!;
  return categoryImageForSlug(listing.category?.slug) ?? DEFAULT_MARKETING_HERO;
}

export function listingGalleryWithFallback(listing: ListingWithCategory): string[] {
  const showcase = getShowcaseListingProfile(listing.slug);
  if (showcase && showcase.portfolioImages.length > 0) return showcase.portfolioImages;

  const gallery = listingGalleryImages(listing);
  if (gallery.length > 0) return gallery;
  return [listingHeroImage(listing)];
}
