import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { db } from "@/shared/lib/db";
import { getSession } from "@/modules/auth/server/session";

export function createEditToken(): string {
  return randomBytes(24).toString("base64url");
}

function editCookieName(proposalId: string): string {
  return `ruwaq_edit_${proposalId}`;
}

export async function readProposalEditCookie(
  proposalId: string
): Promise<string | null> {
  const store = await cookies();
  return store.get(editCookieName(proposalId))?.value ?? null;
}

export async function setProposalEditCookie(
  proposalId: string,
  token: string
): Promise<void> {
  const store = await cookies();
  store.set(editCookieName(proposalId), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });
}

/** Owner session or matching guest edit cookie. */
export async function hasProposalEditAccess(
  proposalId: string
): Promise<boolean> {
  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { userId: true, editToken: true },
  });
  if (!proposal) return false;

  if (proposal.userId) {
    const session = await getSession();
    return session?.user?.id === proposal.userId;
  }

  if (!proposal.editToken) return false;
  const cookie = await readProposalEditCookie(proposalId);
  return cookie === proposal.editToken;
}

/** Bind `?key=` from email/bookmark and persist as httpOnly cookie. */
export async function bindProposalEditKey(
  proposalId: string,
  key: string
): Promise<boolean> {
  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { userId: true, editToken: true },
  });
  if (!proposal || proposal.userId || !proposal.editToken) return false;
  if (proposal.editToken !== key) return false;

  await setProposalEditCookie(proposalId, key);
  return true;
}
