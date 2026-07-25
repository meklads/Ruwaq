import { cookies } from "next/headers";

/**
 * Cost guard for anonymous (not-signed-in) visitors. A guest may generate
 * ONE full AI proposal to feel the product, then must sign in with Google
 * to continue — sign-in is one click, so this barely adds friction while
 * closing the obvious "script hits the AI endpoint all day" abuse path.
 *
 * Cookie-based, not IP-based: good enough to stop casual abuse without
 * adding infra (Redis, etc.) for an MVP launch-trial month. A determined
 * abuser can clear cookies, but that's a much higher bar than "no barrier
 * at all", and paired with the OpenAI account's own spend cap it's enough.
 */

const GUEST_USES_COOKIE = "ruwaq_guest_ai_uses";
export const GUEST_FREE_GENERATIONS = 1;

export async function getGuestGenerationCount(): Promise<number> {
  const store = await cookies();
  const raw = store.get(GUEST_USES_COOKIE)?.value;
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export async function guestHasFreeGenerationLeft(): Promise<boolean> {
  const used = await getGuestGenerationCount();
  return used < GUEST_FREE_GENERATIONS;
}

export async function recordGuestGeneration(): Promise<void> {
  const store = await cookies();
  const used = await getGuestGenerationCount();
  store.set(GUEST_USES_COOKIE, String(used + 1), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    // Long-lived on purpose — the point is to survive a normal browsing
    // session, not just one tab.
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
}
