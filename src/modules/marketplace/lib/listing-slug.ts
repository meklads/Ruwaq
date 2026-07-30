import { db } from "@/shared/lib/db";

function asciiSlugPart(value: string, maxLen: number): string {
  const ascii = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x00-\x7F]/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLen);

  return ascii.length >= 2 ? ascii : "";
}

/** Build a unique `/listing/[slug]` from an approved join application. */
export async function buildUniqueListingSlug(opts: {
  companyName: string;
  categorySlug: string;
  citySlug: string;
  applicationId: string;
}): Promise<string> {
  const fromName = asciiSlugPart(opts.companyName, 36);
  const fallback = `partner-${opts.applicationId.slice(-8).toLowerCase()}`;
  const base = fromName || fallback;
  let slug = `${base}-${opts.categorySlug}-${opts.citySlug}`.replace(/-+/g, "-");

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt + 1}`;
    const existing = await db.providerListing.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing) return candidate;
  }

  return `${slug}-${Date.now().toString(36)}`;
}
