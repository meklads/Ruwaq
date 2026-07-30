import type { ProviderListing, ServiceCategory } from "@prisma/client";
import {
  DEFAULT_MARKETING_HERO,
  categoryImageForSlug,
} from "@/content/marketing-images";

type ListingWithCategory = ProviderListing & { category?: ServiceCategory };

export function listingGalleryImages(listing: ProviderListing): string[] {
  const images = listing.images;
  if (!Array.isArray(images)) return [];
  return images.filter((item): item is string => typeof item === "string" && item.length > 0);
}

export function listingHeroImage(listing: ListingWithCategory): string {
  const gallery = listingGalleryImages(listing);
  if (gallery.length > 0) return gallery[0]!;
  return categoryImageForSlug(listing.category?.slug) ?? DEFAULT_MARKETING_HERO;
}

export function listingGalleryWithFallback(listing: ListingWithCategory): string[] {
  const gallery = listingGalleryImages(listing);
  if (gallery.length > 0) return gallery;
  return [listingHeroImage(listing)];
}
