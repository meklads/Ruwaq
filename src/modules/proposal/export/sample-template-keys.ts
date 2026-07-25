export const SAMPLE_TEMPLATE_SLUGS = [
  "ruwaq-classic",
  "ruwaq-executive",
  "graphics-house",
] as const;

export type SampleTemplateSlug = (typeof SAMPLE_TEMPLATE_SLUGS)[number];

export function isSampleTemplateSlug(value: string): value is SampleTemplateSlug {
  return (SAMPLE_TEMPLATE_SLUGS as readonly string[]).includes(value);
}

export function sampleSlugToTemplateId(
  slug: SampleTemplateSlug
): "ruwaq" | "ruwaq_executive" | "graphics_house" {
  switch (slug) {
    case "ruwaq-classic":
      return "ruwaq";
    case "ruwaq-executive":
      return "ruwaq_executive";
    case "graphics-house":
      return "graphics_house";
  }
}
