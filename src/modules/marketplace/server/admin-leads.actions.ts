"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { MarketplaceLeadStatus } from "@prisma/client";
import { db } from "@/shared/lib/db";
import { getAdminSessionEmail } from "@/modules/marketplace/server/require-admin";
import { sendClientLeadMatchEmail, sendContractorLeadMatchEmail } from "@/modules/marketplace/server/lead-notify-email";
import { quoteStatusUrl } from "@/modules/marketplace/lib/quote-status";
import { leadReferenceCode } from "@/modules/marketplace/lib/lead-phone";
import {
  citySlugFromEnum,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";

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
    select: {
      id: true,
      categoryId: true,
      city: true,
      clientName: true,
      clientPhone: true,
      clientEmail: true,
      projectDetails: true,
      locale: true,
      category: { select: { nameAr: true, nameEn: true } },
    },
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
            notifiedAt: new Date(),
          },
        })
      ),
      ...(parsed.data.matches.length > 0
        ? [
            db.marketplaceLead.update({
              where: { id: parsed.data.leadId },
              data: { status: "BROADCASTED_TO_PARTNERS" },
            }),
          ]
        : []),
    ]);

    if (parsed.data.matches.length > 0) {
      const matchRows = await db.marketplaceLeadMatch.findMany({
        where: { leadId: parsed.data.leadId },
        orderBy: { rank: "asc" },
        select: {
          rank: true,
          listing: {
            select: {
              titleAr: true,
              titleEn: true,
              slug: true,
              owner: { select: { email: true } },
              directoryApplication: { select: { contactEmail: true } },
            },
          },
        },
      });

      const citySlug = citySlugFromEnum(lead.city);
      const cityMeta = getCityBySlug(citySlug);
      const locale = lead.locale === "en" ? "en" : "ar";
      const cityLabel =
        locale === "ar" ? (cityMeta?.nameAr ?? lead.city) : (cityMeta?.nameEn ?? lead.city);
      const categoryLabel =
        locale === "ar" ? lead.category.nameAr : lead.category.nameEn;
      const referenceCode = leadReferenceCode(lead.id);
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://ruwaq.co";
      const inboxUrl = `${baseUrl}/leads`;

      if (lead.clientEmail) {
        try {
          await sendClientLeadMatchEmail({
            locale,
            clientName: lead.clientName,
            clientEmail: lead.clientEmail,
            referenceCode,
            cityLabel,
            categoryLabel,
            statusUrl: quoteStatusUrl(lead.id),
            matches: matchRows.map((row) => ({
              rank: row.rank,
              companyName:
                locale === "ar"
                  ? row.listing.titleAr
                  : (row.listing.titleEn ?? row.listing.titleAr),
              listingUrl: `${baseUrl}/listing/${row.listing.slug}`,
            })),
          });
        } catch (err) {
          console.error("[setMarketplaceLeadMatches] client match email failed", err);
        }
      }

      for (const row of matchRows) {
        const contractorEmail =
          row.listing.owner?.email ?? row.listing.directoryApplication?.contactEmail;
        if (!contractorEmail) continue;

        try {
          await sendContractorLeadMatchEmail({
            locale,
            contractorEmail,
            companyName: row.listing.titleAr,
            rank: row.rank,
            referenceCode,
            cityLabel,
            categoryLabel,
            clientName: lead.clientName,
            clientPhone: lead.clientPhone,
            projectDetails: lead.projectDetails,
            inboxUrl,
          });
        } catch (err) {
          console.error("[setMarketplaceLeadMatches] contractor match email failed", err);
        }
      }
    }

    revalidatePath("/workspace/admin/leads");
    revalidatePath("/workspace/leads");
    revalidatePath(`/quote/status/${parsed.data.leadId}`);
    return { success: true };
  } catch (err) {
    console.error("[setMarketplaceLeadMatches]", err);
    return { success: false, error: "server" };
  }
}
