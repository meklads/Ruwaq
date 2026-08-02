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
  email?: string | null;
  crNumber?: string | null;
  about?: string | null;
} | null;

/**
 * Minimum bar before we spend real OpenAI credits on a registered user's
 * proposal: company name + logo + contact email + at least one identity
 * signal (CR or about). Builds subscriber data and branded PDF output.
 */
export function isCompanyProfileReadyForGeneration(
  profile: CompanyProfileForGeneration
): boolean {
  if (!profile?.companyName?.trim()) return false;
  if (!profile?.logoUrl?.trim()) return false;
  if (!profile?.email?.trim()) return false;
  const hasCr = !!profile.crNumber?.trim();
  const hasAbout = !!profile.about?.trim();
  return hasCr || hasAbout;
}
