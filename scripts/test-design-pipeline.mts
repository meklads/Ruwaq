import { readFile } from "node:fs/promises";
import { resolveDesignImageMime, saveDesignImageBuffer } from "../src/modules/design/server/design-storage.ts";
import { generateDesignAfter } from "../src/modules/design/server/design-ai.service.ts";
import { buildWatermarkedPreviewFromBuffer } from "../src/modules/design/server/design-preview.service.ts";
import { deductCredit, refundCredit, getCreditBalance } from "../src/modules/design/server/design-credits.service.ts";
import { db } from "../src/shared/lib/db.ts";

const testUserId = process.env.DESIGN_TEST_USER_ID?.trim();

async function runPipeline(label: string, imagePath: string) {
  console.log(`\n=== ${label} ===`);
  const buffer = await readFile(imagePath);
  const file = new File([buffer], "room.jpg", { type: "" });
  const mime = resolveDesignImageMime(file, buffer);
  console.log("mime:", mime);

  const beforeUrl = await saveDesignImageBuffer(buffer, mime, "pipeline-test");
  console.log("beforeUrl:", beforeUrl);

  const result = await generateDesignAfter({
    beforeUrl,
    beforeBuffer: buffer,
    styleId: "modern",
    spaceType: "interior",
    roomType: "villa",
    locale: "ar",
    userId: "pipeline-test",
  });
  console.log("after mock:", result.isMock, "bytes:", result.afterBuffer.length);

  const preview = await buildWatermarkedPreviewFromBuffer(result.afterBuffer);
  console.log("preview bytes:", preview.length);
}

async function runDb(userId: string) {
  console.log("\n=== DB credit + generation save ===");
  const before = await getCreditBalance(userId);
  console.log("credits before:", before);

  const deducted = await deductCredit(userId);
  console.log("deduct:", deducted);
  if (!deducted.ok) return;

  try {
    const generation = await db.designGeneration.create({
      data: {
        userId,
        spaceType: "interior",
        roomType: "villa",
        styleId: "modern",
        beforeUrl: "/uploads/designs/test.jpg",
        afterUrl: "/uploads/designs/test-after.jpg",
        afterUrlSource: "/uploads/designs/test-src.jpg",
        isMock: true,
        locale: "ar",
        materials: [],
        furniture: [],
      },
    });
    console.log("generation id:", generation.id);
    await db.designGeneration.delete({ where: { id: generation.id } });
  } finally {
    await refundCredit(userId);
    console.log("credits after refund:", await getCreditBalance(userId));
  }
}

async function main() {
  await runPipeline("logo png", "public/brand/ruwaq/logo-transparent.png");

  try {
    const res = await fetch(
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85"
    );
    const room = Buffer.from(await res.arrayBuffer());
    const { writeFile, mkdir } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const tmp = join(process.cwd(), "public", "uploads", "designs");
    await mkdir(tmp, { recursive: true });
    const roomPath = join(tmp, "_pipeline-room.jpg");
    await writeFile(roomPath, room);
    await runPipeline("room photo", roomPath);
  } catch (error) {
    console.error("room pipeline skipped:", error);
  }

  if (testUserId) {
    await runDb(testUserId);
  } else {
    console.log("\n(skip DB — set DESIGN_TEST_USER_ID to a real user id)");
  }
}

main().catch((error) => {
  console.error("PIPELINE FAILED:", error);
  process.exit(1);
});
