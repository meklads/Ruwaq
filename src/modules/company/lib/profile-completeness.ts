export type CompanyProfileLike = {
  companyName?: string | null;
  crNumber?: string | null;
  about?: string | null;
} | null;

/** Thin profile = missing name or both CR and about */
export function isCompanyProfileThin(profile: CompanyProfileLike): boolean {
  if (!profile?.companyName?.trim()) return true;
  const hasCr = !!profile.crNumber?.trim();
  const hasAbout = !!profile.about?.trim();
  return !hasCr && !hasAbout;
}

export type CompanyProfileForGeneration = {
  companyName?: string | null;
  logoUrl?: string | null;
  crNumber?: string | null;
  about?: string | null;
} | null;

/**
 * Minimum bar before we spend real OpenAI credits on a registered user's
 * proposal: company name + logo + at least one identity signal (CR or
 * about). Every generated PDF carries the company's branding, so this is
 * also just... a complete proposal, not an arbitrary gate.
 */
export function isCompanyProfileReadyForGeneration(
  profile: CompanyProfileForGeneration
): boolean {
  if (!profile?.companyName?.trim()) return false;
  if (!profile?.logoUrl?.trim()) return false;
  const hasCr = !!profile.crNumber?.trim();
  const hasAbout = !!profile.about?.trim();
  return hasCr || hasAbout;
}
