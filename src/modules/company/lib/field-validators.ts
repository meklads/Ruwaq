/**
 * Shared client + server validation for company profile contact fields.
 * Plain functions (no framework deps) so both the form (instant feedback)
 * and the API route (never trust the client) can import the exact same
 * rules — one place to loosen/tighten them.
 */

/** Loose but real: strips spaces/dashes/parens, then requires digits only
 * (optional leading +), 7-15 digits — covers Saudi local (05XXXXXXXX),
 * international (+9665XXXXXXXX), and other GCC/landline formats without
 * rejecting legitimate variants, while still catching letters/garbage. */
export function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/[\s\-().]/g, "");
  return /^\+?\d{7,15}$/.test(cleaned);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Must be a real http(s) URL — rejects free text like "مش موقع". */
export function isValidHttpUrl(value: string): boolean {
  const candidate = value.trim();
  if (!/^https?:\/\//i.test(candidate)) return false;
  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
