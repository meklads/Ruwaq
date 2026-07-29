import { PrismaClient } from "@prisma/client";
import { CLAUSE_PACKS, PLACEHOLDER_DEFAULTS } from "../src/shared/constants/clause-pack-seed";
import { MARKETPLACE_CATEGORIES } from "../src/shared/constants/marketplace-taxonomy";
import { MARKETPLACE_LISTING_SEEDS } from "./data/marketplace-listings.seed";

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
        subcategories: {
          ar: cat.subcategoriesAr,
          en: cat.subcategoriesEn,
        },
      },
      update: {
        nameAr: cat.nameAr,
        nameEn: cat.nameEn,
        icon: cat.icon,
        sortOrder: i,
        subcategories: {
          ar: cat.subcategoriesAr,
          en: cat.subcategoriesEn,
        },
      },
    });
  }
  console.log(`  ✓ ${MARKETPLACE_CATEGORIES.length} service categories`);
}

async function seedMarketplaceListings() {
  console.log("🌱 Seeding provider listings (21 companies)…");

  const categories = await prisma.serviceCategory.findMany({
    select: { id: true, slug: true },
  });
  const bySlug = new Map(categories.map((c) => [c.slug, c.id]));

  let created = 0;
  let updated = 0;

  for (const row of MARKETPLACE_LISTING_SEEDS) {
    const categoryId = bySlug.get(row.categorySlug);
    if (!categoryId) {
      console.warn(`  ⚠ Skipping ${row.slug}: unknown category ${row.categorySlug}`);
      continue;
    }

    const existing = await prisma.providerListing.findUnique({
      where: { slug: row.slug },
    });

    const data = {
      titleAr: row.titleAr,
      titleEn: row.titleEn,
      descriptionAr: row.descriptionAr,
      descriptionEn: row.descriptionEn,
      city: row.city,
      categoryId,
      phone: row.phone,
      whatsapp: row.whatsapp,
      address: row.address,
      isVerified: row.isVerified,
      isFeatured: row.isFeatured,
      images: row.images,
    };

    if (existing) {
      await prisma.providerListing.update({
        where: { slug: row.slug },
        data,
      });
      updated += 1;
    } else {
      await prisma.providerListing.create({
        data: { slug: row.slug, ...data },
      });
      created += 1;
    }
  }

  const total = await prisma.providerListing.count();
  console.log(`  ✓ Listings: ${created} created, ${updated} updated (${total} total)`);
}

async function seedClausePacks() {
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
  console.log(`  ✓ ${totalPacks} packs, ${totalClauses} clause templates`);
}

async function main() {
  await seedMarketplaceCategories();
  await seedMarketplaceListings();
  await seedClausePacks();
  console.log("\n✅ Database seed complete (categories, listings, clause packs)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
