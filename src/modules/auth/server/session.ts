import { auth } from "./auth.config";

export async function getSession() {
  return await auth();
}

export async function getRequiredSession() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}
