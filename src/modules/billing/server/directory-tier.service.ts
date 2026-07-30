import { db } from "@/shared/lib/db";
import type { RuwaqTier } from "@prisma/client";
import { directoryFlagsForTier } from "@/modules/billing/lib/tiers";

export async function syncDirectoryListingsForUser(
  userId: string,
  tier: RuwaqTier
): Promise<number> {
  const flags = directoryFlagsForTier(tier);

  const result = await db.providerListing.updateMany({
    where: { ownerUserId: userId },
    data: {
      directoryTier: flags.directoryTier,
      directorySortRank: flags.directorySortRank,
      isFeatured: flags.isFeatured,
      isVerified: flags.isVerified,
    },
  });

  return result.count;
}

export async function syncAllListingsDirectoryTierFromSeedRow(row: {
  isFeatured: boolean;
  isVerified: boolean;
}): Promise<{
  directoryTier: RuwaqTier;
  directorySortRank: number;
}> {
  if (row.isFeatured) {
    return directoryFlagsForTier("PRO");
  }
  if (row.isVerified) {
    return directoryFlagsForTier("VERIFIED");
  }
  return directoryFlagsForTier("STARTER");
}
