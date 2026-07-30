/**
 * Ruwaq database seed — aligned with prisma/schema.prisma
 *
 * Model mapping (there is NO Category / Listing model):
 * - User              → prisma.user           (marketplaceRole, not role; no password field)
 * - ServiceCategory   → prisma.serviceCategory
 * - ProviderListing   → prisma.providerListing (categoryId, ownerUserId — NOT serviceCategoryId / userId)
 *
 * Enum: MarketplaceCity (JEDDAH | MAKKAH | MADINAH) — NOT "City"
 *
 * Set SEED_RESET=true to wipe marketplace tables before seeding (dev only; never deletes User rows).
 */
import {
  Prisma,
  PrismaClient,
  type MarketplaceCity,
  type ServiceCategory,
  type User,
} from "@prisma/client";
import { CLAUSE_PACKS, PLACEHOLDER_DEFAULTS } from "../src/shared/constants/clause-pack-seed";
import { MARKETPLACE_LISTING_SEEDS } from "./data/marketplace-listings.seed";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@ruwaq.co";

function assertDatabaseUrl(): void {
  if (process.env.DATABASE_URL?.trim()) return;
  throw new Error(
    [
      "DATABASE_URL is not set.",
      "Copy .env.example to .env and set your PostgreSQL connection string, e.g.:",
      '  DATABASE_URL="postgresql://USER@localhost:5432/ruwaq?schema=public"',
      "Then run: npx prisma db push && SEED_RESET=true npx prisma db seed",
    ].join("\n")
  );
}

const SERVICE_CATEGORIES = [
  {
    slug: "hvac",
    nameAr: "التكييف والتبريد",
    nameEn: "HVAC & Cooling",
    icon: "Snowflake",
  },
  {
    slug: "fit-out",
    nameAr: "التشطيبات والتصميم الداخلي",
    nameEn: "Fit-Out & Interior Decor",
    icon: "Sparkles",
  },
  {
    slug: "contracting",
    nameAr: "المقاولات العامة والترميم",
    nameEn: "General Contracting & Renovations",
    icon: "Building2",
  },
  {
    slug: "elevators",
    nameAr: "المصاعد والأنظمة الميكانيكية",
    nameEn: "Elevators & Mechanical Systems",
    icon: "ArrowUpDown",
  },
  {
    slug: "waterproofing",
    nameAr: "العزل المائي والحراري",
    nameEn: "Waterproofing & Insulation",
    icon: "Droplet",
  },
  {
    slug: "furnishing",
    nameAr: "الفرش والتأثيث الفندقي والسكني",
    nameEn: "FF&E & Furnishing",
    icon: "Armchair",
  },
  {
    slug: "facades",
    nameAr: "تنظيف وجلي الواجهات والرخام",
    nameEn: "Facade & Marble Restoration",
    icon: "Sparkle",
  },
] as const;

const ADMIN_USER_CREATE: Prisma.UserCreateInput = {
  email: ADMIN_EMAIL,
  name: "منصة رواق - الإدارة",
  phone: "+966500000000",
  marketplaceRole: "TURRIVA_ADMIN",
};

const ADMIN_USER_UPDATE: Prisma.UserUpdateInput = {
  name: ADMIN_USER_CREATE.name,
  phone: ADMIN_USER_CREATE.phone,
  marketplaceRole: ADMIN_USER_CREATE.marketplaceRole,
};

async function maybeResetMarketplace(): Promise<void> {
  if (process.env.SEED_RESET !== "true") return;

  console.log("🧹 SEED_RESET=true — clearing marketplace data (User rows preserved)…");
  // Delete order respects foreign keys: leads & listings → categories
  await prisma.marketplaceLead.deleteMany();
  await prisma.providerListing.deleteMany();
  await prisma.serviceCategory.deleteMany();
  console.log("  ✓ MarketplaceLead, ProviderListing, ServiceCategory cleared");
}

async function seedAdminUser(): Promise<User> {
  console.log("🌱 Seeding User (TURRIVA_ADMIN)…");

  const existing = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: ADMIN_USER_UPDATE,
      })
    : await prisma.user.create({
        data: ADMIN_USER_CREATE,
      });

  console.log(`  ✓ User ${user.email} (${user.marketplaceRole})`);
  return user;
}

/** ServiceCategory — required: slug, nameAr, nameEn */
async function seedMarketplaceCategories(): Promise<Map<string, ServiceCategory>> {
  console.log("🌱 Seeding ServiceCategory (7 sectors)…");
  const bySlug = new Map<string, ServiceCategory>();
  const reset = process.env.SEED_RESET === "true";

  for (const [i, cat] of SERVICE_CATEGORIES.entries()) {
    const payload = {
      slug: cat.slug,
      nameAr: cat.nameAr,
      nameEn: cat.nameEn,
      icon: cat.icon,
      sortOrder: i,
    };

    const row = reset
      ? await prisma.serviceCategory.create({ data: payload })
      : await prisma.serviceCategory.upsert({
          where: { slug: cat.slug },
          create: payload,
          update: payload,
        });

    bySlug.set(row.slug, row);
  }

  console.log(`  ✓ ${bySlug.size} service categories`);
  return bySlug;
}

/** ProviderListing — required: titleAr, slug, descriptionAr, city, categoryId, phone, whatsapp */
function toProviderListingCreateInput(
  row: (typeof MARKETPLACE_LISTING_SEEDS)[number],
  categoryId: string,
  ownerUserId: string
): Prisma.ProviderListingCreateInput {
  return {
    slug: row.slug,
    titleAr: row.titleAr,
    titleEn: row.titleEn,
    descriptionAr: row.descriptionAr,
    descriptionEn: row.descriptionEn,
    city: row.city as MarketplaceCity,
    category: { connect: { id: categoryId } },
    owner: { connect: { id: ownerUserId } },
    phone: row.phone,
    whatsapp: row.whatsapp,
    address: row.address,
    isVerified: row.isVerified,
    isFeatured: row.isFeatured,
    images: row.images as Prisma.InputJsonValue,
  };
}

async function seedMarketplaceListings(
  categoriesBySlug: Map<string, ServiceCategory>,
  admin: User
): Promise<void> {
  console.log("🌱 Seeding ProviderListing (126 companies)…");

  let created = 0;
  let updated = 0;
  let skipped = 0;
  const reset = process.env.SEED_RESET === "true";

  for (const row of MARKETPLACE_LISTING_SEEDS) {
    const category = categoriesBySlug.get(row.categorySlug);
    if (!category) {
      console.warn(`  ⚠ Skipping ${row.slug}: unknown category "${row.categorySlug}"`);
      skipped += 1;
      continue;
    }

    if (reset) {
      await prisma.providerListing.create({
        data: toProviderListingCreateInput(row, category.id, admin.id),
      });
      created += 1;
      continue;
    }

    const existing = await prisma.providerListing.findUnique({
      where: { slug: row.slug },
      select: { id: true },
    });

    const data = {
      titleAr: row.titleAr,
      titleEn: row.titleEn,
      descriptionAr: row.descriptionAr,
      descriptionEn: row.descriptionEn,
      city: row.city as MarketplaceCity,
      categoryId: category.id,
      ownerUserId: admin.id,
      phone: row.phone,
      whatsapp: row.whatsapp,
      address: row.address,
      isVerified: row.isVerified,
      isFeatured: row.isFeatured,
      images: row.images as Prisma.InputJsonValue,
    };

    await prisma.providerListing.upsert({
      where: { slug: row.slug },
      create: { slug: row.slug, ...data },
      update: data,
    });

    if (existing) updated += 1;
    else created += 1;
  }

  if (!reset) {
    const seedSlugs = MARKETPLACE_LISTING_SEEDS.map((row) => row.slug);
    const removed = await prisma.providerListing.deleteMany({
      where: { slug: { notIn: seedSlugs } },
    });
    if (removed.count > 0) {
      console.log(
        `  ✓ Removed ${removed.count} stale listing(s) not in the 126-company catalog`
      );
    }
  }

  const total = await prisma.providerListing.count();
  console.log(
    `  ✓ ProviderListing: ${created} created, ${updated} updated, ${skipped} skipped (${total} total)`
  );
}

async function verifyMarketplaceListingCounts(
  categoriesBySlug: Map<string, ServiceCategory>
): Promise<void> {
  const cities: MarketplaceCity[] = ["JEDDAH", "MAKKAH", "MADINAH"];
  let problems = 0;

  for (const [catSlug, category] of categoriesBySlug) {
    for (const city of cities) {
      const count = await prisma.providerListing.count({
        where: { categoryId: category.id, city, isVerified: true },
      });
      if (count !== 6) {
        console.warn(
          `  ⚠ Expected 6 verified listings for ${catSlug}/${city}, found ${count}`
        );
        problems += 1;
      }
    }
  }

  if (problems > 0) {
    console.warn(
      `  ⚠ ${problems} city×category cells have wrong counts — run: SEED_RESET=true npx prisma db seed`
    );
  } else {
    console.log("  ✓ 6 verified listings per city×category (126 total)");
  }
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
            placeholders: c.placeholders as Prisma.InputJsonValue,
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
  assertDatabaseUrl();
  console.log("🌱 Starting Database Seeding for Ruwaq Platform…");

  await maybeResetMarketplace();
  const admin = await seedAdminUser();
  const categories = await seedMarketplaceCategories();
  await seedMarketplaceListings(categories, admin);
  await verifyMarketplaceListingCounts(categories);
  await seedClausePacks();

  console.log("\n🚀 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
