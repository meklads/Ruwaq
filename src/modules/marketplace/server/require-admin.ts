import { getSession } from "@/modules/auth/server/session";
import { isAdminEmail } from "@/shared/lib/env";

export async function getAdminSessionEmail(): Promise<string | null> {
  const session = await getSession();
  const email = session?.user?.email?.trim();
  if (!email || !isAdminEmail(email)) return null;
  return email;
}
