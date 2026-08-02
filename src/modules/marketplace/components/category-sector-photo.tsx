import Image from "next/image";
import { CATEGORY_IMAGES } from "@/content/marketing-images";
import type { MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";

type Props = {
  slug: MarketplaceCategorySlug;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

export function CategorySectorPhoto({
  slug,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw",
}: Props) {
  const src = CATEGORY_IMAGES[slug];
  if (!src) return null;

  return (
    <div className="ruwaq-category-photo">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes={sizes}
      />
      <div className="ruwaq-category-photo__shade" aria-hidden />
    </div>
  );
}
