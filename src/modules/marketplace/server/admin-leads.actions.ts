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
