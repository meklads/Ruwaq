/**
 * Public entry to the Radar app. Optional: the "Enter Radar" button renders only when
 * NEXT_PUBLIC_RADAR_APP_URL is set to an approved https URL on a public host.
 * Local, private or non-https addresses are rejected so they can never surface as a destination.
 */
function isLocalOrPrivateHost(host: string): boolean {
  const h = host.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".test") || h === "::1" || h === "[::1]") return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h) || /^0\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  return false;
}

export function getRadarAppUrl(raw: string | undefined = process.env.NEXT_PUBLIC_RADAR_APP_URL): string | null {
  const value = raw?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || isLocalOrPrivateHost(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}
