"use client";

import Image from "next/image";
import { useState } from "react";
import type { Messages } from "@/shared/i18n/messages/types";

type Props = {
  images: string[];
  title: string;
  copy: Messages["marketplace"]["listingDetail"];
};

export function ListingGallery({ images, title, copy }: Props) {
  const [active, setActive] = useState(0);
  const slides = images.filter(Boolean);

  if (slides.length === 0) return null;

  const activeSrc = slides[active] ?? slides[0]!;

  return (
    <section className="ruwaq-pro-listing-gallery" aria-label={copy.galleryTitle}>
      <div className="ruwaq-pro-listing-gallery-main">
        <Image
          src={activeSrc}
          alt={title}
          width={1400}
          height={788}
          className="h-full w-full object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
        />
      </div>
      {slides.length > 1 ? (
        <div className="ruwaq-pro-listing-gallery-thumbs">
          {slides.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className={`ruwaq-pro-listing-gallery-thumb${index === active ? " is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`${copy.galleryTitle} ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
            >
              <Image
                src={src}
                alt=""
                width={160}
                height={90}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
