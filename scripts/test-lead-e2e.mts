/**
 * Local E2E — submit a test marketplace lead and verify DB persistence.
 * Requires DATABASE_URL in .env
 *
 * Usage: npx tsx scripts/test-lead-e2e.mts
 */
import { PrismaClient } from "@prisma/client";
import { submitLead } from "../src/modules/marketplace/server/lead.actions.ts";

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    console.error("DATABASE_URL is not set — skipping lead E2E.");
    process.exit(1);
  }

  const stamp = Date.now().toString(36);
  const result = await submitLead({
    clientName: `E2E Test ${stamp}`,
    clientPhone: "0512345678",
    citySlug: "jeddah",
    categorySlug: "fit-out",
    projectDetails: `Automated E2E smoke test lead (${stamp}) — safe to delete.`,
    locale: "ar",
  });

  if (!result.success) {
    console.error("submitLead failed:", result.error);
    process.exit(1);
  }

  const saved = await prisma.marketplaceLead.findUnique({
    where: { id: result.leadId },
    include: { category: true },
  });

  if (!saved) {
    console.error("Lead not found in DB after submitLead");
    process.exit(1);
  }

  console.log("✓ Lead E2E passed");
  console.log("  id:", result.leadId);
  console.log("  ref:", result.referenceCode);
  console.log("  status:", result.status);
  console.log("  category:", saved.category.slug);
  console.log("  whatsAppUrl:", result.whatsAppUrl ? "set" : "missing (RUWQ_SUPPORT_WHATSAPP unset)");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
