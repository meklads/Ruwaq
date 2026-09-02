"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { MarketplaceLeadStatus } from "@prisma/client";
import { db } from "@/shared/lib/db";
import { getAdminSessionEmail } from "@/modules/marketplace/server/require-admin";

const statusSchema = z.enum([
  "NEW",
  "ASSIGNED_TO_TURRIVA",
  "BROADCASTED_TO_PARTNERS",
  "CLOSED",
]);

const updateSchema = z.object({
  leadId: z.string().min(1),
  status: statusSchema,
});

const matchListingSchema = z.object({
  listingId: z.string().min(1),
  rank: z.number().int().min(1).max(3),
});

const setMatchesSchema = z.object({
  leadId: z.string().min(1),
  matches: z.array(matchListingSchema).max(3),
});

export type AdminLeadActionResult =
  | { success: true }
  | {
      success: false;
      error: "unauthorized" | "not_found" | "validation" | "server";
    };

export async function updateMarketplaceLeadStatus(
  input: z.infer<typeof updateSchema>
): Promise<AdminLeadActionResult> {
  const adminEmail = await getAdminSessionEmail();
  if (!adminEmail) return { success: false, error: "unauthorized" };

  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "validation" };

  const existing = await db.marketplaceLead.findUnique({
    where: { id: parsed.data.leadId },
    select: { id: true },
  });
  if (!existing) return { success: false, error: "not_found" };

  try {
    await db.marketplaceLead.update({
      where: { id: parsed.data.leadId },
      data: { status: parsed.data.status as MarketplaceLeadStatus },
    });
    revalidatePath("/workspace/admin/leads");
    return { success: true };
  } catch (err) {
    console.error("[updateMarketplaceLeadStatus]", err);
    return { success: false, error: "server" };
  }
}

export type AdminLeadMatchResult =
  | { success: true }
  | {
      success: false;
      error: "unauthorized" | "not_found" | "validation" | "duplicate" | "server";
    };

export async function setMarketplaceLeadMatches(
  input: z.infer<typeof setMatchesSchema>
): Promise<AdminLeadMatchResult> {
  const adminEmail = await getAdminSessionEmail();
  if (!adminEmail) return { success: false, error: "unauthorized" };

  const parsed = setMatchesSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "validation" };

  const ranks = parsed.data.matches.map((m) => m.rank);
  const listingIds = parsed.data.matches.map((m) => m.listingId);
  if (new Set(ranks).size !== ranks.length) return { success: false, error: "validation" };
  if (new Set(listingIds).size !== listingIds.length) return { success: false, error: "duplicate" };

  const lead = await db.marketplaceLead.findUnique({
    where: { id: parsed.data.leadId },
    select: { id: true, categoryId: true, city: true },
  });
  if (!lead) return { success: false, error: "not_found" };

  if (listingIds.length > 0) {
    const listings = await db.providerListing.findMany({
      where: { id: { in: listingIds } },
      select: { id: true, categoryId: true, city: true },
    });
    if (listings.length !== listingIds.length) return { success: false, error: "validation" };
    const invalid = listings.some(
      (l) => l.categoryId !== lead.categoryId || l.city !== lead.city
    );
    if (invalid) return { success: false, error: "validation" };
  }

  try {
    await db.$transaction([
      db.marketplaceLeadMatch.deleteMany({ where: { leadId: parsed.data.leadId } }),
      ...parsed.data.matches.map((m) =>
        db.marketplaceLeadMatch.create({
          data: {
            leadId: parsed.data.leadId,
            listingId: m.listingId,
            rank: m.rank,
          },
        })
      ),
    ]);
    revalidatePath("/workspace/admin/leads");
    return { success: true };
  } catch (err) {
    console.error("[setMarketplaceLeadMatches]", err);
    return { success: false, error: "server" };
  }
}
