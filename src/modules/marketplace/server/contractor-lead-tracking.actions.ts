"use server";

import { db } from "@/shared/lib/db";

async function assertMatchOwnership(
  userId: string,
  email: string | null | undefined,
  matchId: string
): Promise<boolean> {
  const match = await db.marketplaceLeadMatch.findUnique({
    where: { id: matchId },
    select: {
      listing: {
        select: {
          id: true,
          ownerUserId: true,
          directoryApplication: { select: { contactEmail: true } },
        },
      },
    },
  });
  if (!match) return false;

  if (match.listing.ownerUserId === userId) return true;
  if (email && match.listing.directoryApplication?.contactEmail === email) return true;
  return false;
}

export async function markLeadMatchesViewed(
  userId: string,
  email: string | null | undefined,
  matchIds: string[]
): Promise<void> {
  if (matchIds.length === 0) return;

  const now = new Date();
  for (const matchId of matchIds) {
    const allowed = await assertMatchOwnership(userId, email, matchId);
    if (!allowed) continue;
    await db.marketplaceLeadMatch.updateMany({
      where: { id: matchId, viewedAt: null },
      data: { viewedAt: now },
    });
  }
}

export async function markLeadMatchResponded(
  userId: string,
  email: string | null | undefined,
  matchId: string,
  channel: "whatsapp" | "email"
): Promise<void> {
  const allowed = await assertMatchOwnership(userId, email, matchId);
  if (!allowed) return;

  await db.marketplaceLeadMatch.updateMany({
    where: { id: matchId, respondedAt: null },
    data: { respondedAt: new Date(), responseChannel: channel },
  });
}
