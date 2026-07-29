import { PrismaClient } from "@prisma/client";
import { CLAUSE_PACKS, PLACEHOLDER_DEFAULTS } from "../src/shared/constants/clause-pack-seed.ts";
import { MARKETPLACE_CATEGORIES } from "../src/shared/constants/marketplace-taxonomy.ts";

const prisma = new PrismaClient();

async function seedMarketplaceCategories() {
  console.log("🌱 Seeding marketplace service categories…");
  for (const [i, cat] of MARKETPLACE_CATEGORIES.entries()) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      create: {
        slug: cat.slug,
        nameAr: cat.nameAr,
        nameEn: cat.nameEn,
        icon: cat.icon,
        sortOrder: i,
        subcategories: cat.subcategoriesAr,
      },
      update: {
        nameAr: cat.nameAr,
        nameEn: cat.nameEn,
        icon: cat.icon,
        sortOrder: i,
        subcategories: cat.subcategoriesAr,
      },
    });
  }
  console.log(`  ✓ ${MARKETPLACE_CATEGORIES.length} service categories`);
}

async function main() {
  await seedMarketplaceCategories();
  console.log("🌱 Seeding Ruwaq Trust Layer clause packs…");
  console.log(
    "   Approved defaults:",
    JSON.stringify(
      {
        escalation_threshold_percent:
          PLACEHOLDER_DEFAULTS.escalation_threshold_percent,
        escalation_notice_days: PLACEHOLDER_DEFAULTS.escalation_notice_days,
        debris_fee_days: PLACEHOLDER_DEFAULTS.debris_fee_days,
        vat_rate_percent: PLACEHOLDER_DEFAULTS.vat_rate_percent,
        variance_percent: PLACEHOLDER_DEFAULTS.variance_percent,
      },
      null,
      2
    )
  );

  for (const pack of CLAUSE_PACKS) {
    const existing = await prisma.clausePack.findUnique({
      where: { slug: pack.slug },
    });

    if (existing) {
      console.log(`  ↷ Skipping ${pack.slug} (already exists)`);
      continue;
    }

    await prisma.clausePack.create({
      data: {
        slug: pack.slug,
        nameAr: pack.nameAr,
        nameEn: pack.nameEn,
        archetype: pack.archetype,
        version: pack.version,
        isActive: true,
        clauses: {
          create: pack.clauses.map((c) => ({
            clauseKey: c.clauseKey,
            category: c.category,
            riskSide: c.riskSide,
            textAr: c.textAr,
            textEn: c.textEn,
            placeholders: c.placeholders,
            sortOrder: c.sortOrder,
            isMandatory: c.isMandatory,
            alternativeGroup: c.alternativeGroup ?? null,
            autoTriggerRules: c.autoTriggerRules ?? undefined,
            sourceRef: c.sourceRef ?? null,
          })),
        },
      },
    });

    console.log(
      `  ✓ ${pack.slug} — ${pack.clauses.length} clauses (${pack.nameAr})`
    );
  }

  const totalPacks = await prisma.clausePack.count();
  const totalClauses = await prisma.clauseTemplate.count();
  console.log(`\n✅ Done: ${totalPacks} packs, ${totalClauses} clause templates`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
