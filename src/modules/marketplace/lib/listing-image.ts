import type { ProviderListing } from "@prisma/client";

const DEFAULT_EDITORIAL_IMAGE =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop";

export function listingGalleryImages(listing: ProviderListing): string[] {
  const images = listing.images;
  if (!Array.isArray(images)) return [];
  return images.filter((item): item is string => typeof item === "string" && item.length > 0);
}

export function listingHeroImage(listing: ProviderListing): string {
  const gallery = listingGalleryImages(listing);
  if (gallery.length > 0) return gallery[0]!;
  return DEFAULT_EDITORIAL_IMAGE;
}
