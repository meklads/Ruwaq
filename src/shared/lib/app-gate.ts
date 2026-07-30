/**
 * Preview / pre-launch gate — HTTP Basic Auth.
 * Set APP_GATE_PASSWORD in env; when unset, gate is disabled (local dev).
 *
 * APP_GATE_FULL_SITE (default false): when password is set, only dashboard/API
 * routes are gated — marketing stays public. Set to "true" to lock the entire site.
 */

export const APP_GATE_REALM = "Ruwaq · Pre-launch";

/** Static assets — never gated */
function isStaticAssetPath(pathname: string): boolean {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/brand")) return true;
  if (pathname.startsWith("/uploads")) return true;
  if (pathname.startsWith("/favicon")) return true;
  return false;
}

/** Client-facing share links — stay public so contractors can send proposals */
function isClientSharePath(pathname: string): boolean {
  if (pathname === "/share" || pathname.startsWith("/share/")) return true;
  if (pathname.startsWith("/api/share/")) return true;
  return false;
}

/** Marketing & public assets — accessible when full-site gate is off */
export function isPublicAppPath(pathname: string): boolean {
  if (pathname === "/") return true;

  const publicPrefixes = [
    "/about",
    "/contact",
    "/construction",
    "/interior-design",
    "/our-work",
    "/how-it-works",
    "/join",
    "/pro",
    "/pricing",
    "/listing",
    "/privacy",
    "/terms",
    "/services",
    "/pricing",
    "/faq",
    "/templates/sample",
    "/design",
    "/login",
  ];

  if (publicPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return true;
  }

  if (isStaticAssetPath(pathname)) return true;

  return false;
}

/** Public API — health, marketing samples, client share, design studio */
export function isPublicApiPath(pathname: string): boolean {
  if (pathname === "/api/health") return true;
  if (pathname.startsWith("/api/templates/")) return true;
  if (pathname.startsWith("/api/share/")) return true;
  if (pathname.startsWith("/api/design/")) return true;
  if (pathname.startsWith("/api/auth/")) return true;
  return false;
}

export function isGateEnabled(): boolean {
  return Boolean(process.env.APP_GATE_PASSWORD?.trim());
}

/** Default false — marketing public; only app routes gated when password is set. */
export function isFullSiteGate(): boolean {
  return process.env.APP_GATE_FULL_SITE?.trim().toLowerCase() === "true";
}

export function getGateCredentials(): { user: string; password: string } | null {
  const password = process.env.APP_GATE_PASSWORD?.trim();
  if (!password) return null;
  const user = process.env.APP_GATE_USER?.trim() || "ruwaq";
  return { user, password };
}

export function verifyBasicAuth(
  authorizationHeader: string | null,
  credentials: { user: string; password: string }
): boolean {
  if (!authorizationHeader?.startsWith("Basic ")) return false;

  try {
    const encoded = authorizationHeader.slice(6);
    const decoded = atob(encoded);
    const separator = decoded.indexOf(":");
    if (separator === -1) return false;

    const user = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);

    return user === credentials.user && password === credentials.password;
  } catch {
    return false;
  }
}

export function shouldProtectPath(pathname: string): boolean {
  if (isStaticAssetPath(pathname)) return false;
  if (isClientSharePath(pathname)) return false;

  if (isGateEnabled() && isFullSiteGate()) {
    if (pathname.startsWith("/api/") && isPublicApiPath(pathname)) return false;
    return true;
  }

  if (isPublicAppPath(pathname)) return false;
  if (pathname.startsWith("/api/") && isPublicApiPath(pathname)) return false;
  return true;
}
