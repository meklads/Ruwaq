import { db } from "@/shared/lib/db";
import { CLAUSE_PACKS } from "@/shared/constants/clause-pack-seed";

let seedPromise: Promise<void> | null = null;

/** Idempotent — creates any missing clause packs (fit_out_v1, etc.). */
export async function ensureClausePacksSeeded(): Promise<void> {
  const existing = await db.clausePack.findMany({ select: { slug: true } });
  const have = new Set(existing.map((p) => p.slug));
  const missing = CLAUSE_PACKS.filter((p) => !have.has(p.slug));
  if (missing.length === 0) return;

  if (!seedPromise) {
    seedPromise = runClausePackSeed().finally(() => {
      seedPromise = null;
    });
  }

  await seedPromise;
}

async function runClausePackSeed(): Promise<void> {
  console.log("[clause-pack-seed] Seeding missing Ruwaq clause packs…");

  for (const pack of CLAUSE_PACKS) {
    const found = await db.clausePack.findUnique({
      where: { slug: pack.slug },
    });

    if (found) continue;

    await db.clausePack.create({
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
      `[clause-pack-seed] ✓ ${pack.slug} — ${pack.clauses.length} clauses`
    );
  }
}
