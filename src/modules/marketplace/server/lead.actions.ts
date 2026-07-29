"use server";

import { z } from "zod";
import { db } from "@/shared/lib/db";
import {
  getCategoryBySlug,
  getCityBySlug,
  type MarketplaceCategorySlug,
  type MarketplaceCitySlug,
} from "@/shared/constants/marketplace-taxonomy";
import {
  buildRoutingNote,
  notifyLeadRouting,
  resolveLeadStatus,
} from "@/modules/marketplace/server/lead-routing";
import type { MarketplaceCity } from "@prisma/client";

const ksaPhone = z
  .string()
  .min(9)
  .max(20)
  .transform((v) => v.replace(/\s+/g, ""))
  .refine(
    (v) => /^(\+966|966|05)\d{8,9}$/.test(v) || /^05\d{8}$/.test(v),
    { message: "invalid_phone" }
  );

const leadSchema = z.object({
  clientName: z.string().trim().min(2).max(120),
  clientPhone: ksaPhone,
  citySlug: z.enum(["jeddah", "makkah", "madinah"]),
  categorySlug: z.enum([
    "hvac",
    "fit-out",
    "contracting",
    "elevators",
    "waterproofing",
    "furnishing",
    "facades",
  ]),
  projectDetails: z.string().trim().min(10).max(4000),
  budgetRange: z.string().trim().max(80).optional(),
  locale: z.enum(["ar", "en"]).default("ar"),
});

export type SubmitLeadResult =
  | { success: true; leadId: string; status: string }
  | { success: false; error: string };

export async function submitMarketplaceLeadAction(
  input: z.infer<typeof leadSchema>
): Promise<SubmitLeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    const code = parsed.error.issues[0]?.message;
    if (code === "invalid_phone") {
      return { success: false, error: "invalid_phone" };
    }
    return { success: false, error: "validation" };
  }

  const data = parsed.data;
  const cityMeta = getCityBySlug(data.citySlug);
  const categoryMeta = getCategoryBySlug(data.categorySlug);
  if (!cityMeta || !categoryMeta) {
    return { success: false, error: "validation" };
  }

  let category = await db.serviceCategory.findUnique({
    where: { slug: data.categorySlug },
  });
  if (!category) {
    return { success: false, error: "category_missing" };
  }

  const status = resolveLeadStatus(data.categorySlug as MarketplaceCategorySlug);
  const assignedTo =
    status === "ASSIGNED_TO_TURRIVA" ? "TURRIVA" : null;

  try {
    const lead = await db.marketplaceLead.create({
      data: {
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        city: cityMeta.enum as MarketplaceCity,
        categoryId: category.id,
        projectDetails: data.projectDetails,
        budgetRange: data.budgetRange || null,
        status,
        assignedTo,
        locale: data.locale,
        routingNote: buildRoutingNote(data.categorySlug),
      },
    });

    await notifyLeadRouting({
      leadId: lead.id,
      status,
      clientName: lead.clientName,
      clientPhone: lead.clientPhone,
      city: data.citySlug,
      categorySlug: data.categorySlug,
      projectDetails: lead.projectDetails,
    });

    return { success: true, leadId: lead.id, status };
  } catch (err) {
    console.error("[submitMarketplaceLead]", err);
    return { success: false, error: "server" };
  }
}

export async function getListingsForCityCategory(
  citySlug: MarketplaceCitySlug,
  categorySlug: MarketplaceCategorySlug
) {
  const city = getCityBySlug(citySlug);
  const category = await db.serviceCategory.findUnique({
    where: { slug: categorySlug },
  });
  if (!city || !category) return { category: null, listings: [] };

  const listings = await db.providerListing.findMany({
    where: {
      city: city.enum,
      categoryId: category.id,
      isVerified: true,
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 48,
  });

  return { category, listings };
}
