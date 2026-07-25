import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { getSession } from "@/modules/auth/server/session";
import { isCloudStorageConfigured, uploadPublicObject } from "@/shared/lib/storage";
import { logServerError } from "@/shared/lib/usage-events";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["image/svg+xml", "svg"],
]);

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get("logo");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const ext = ALLOWED_TYPES.get(file.type);
    if (!ext) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const filename = `${session.user.id}-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    // Cloud storage first — survives redeploys. Local disk is a dev-only
    // fallback: on most PaaS hosts (Coolify included) the container
    // filesystem is rebuilt on every deploy, silently losing local uploads.
    if (isCloudStorageConfigured()) {
      const url = await uploadPublicObject(`logos/${filename}`, buffer, file.type);
      return NextResponse.json({ success: true, url });
    }

    const dir = path.join(process.cwd(), "public", "uploads", "logos");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), buffer);

    const url = `/uploads/logos/${filename}`;
    return NextResponse.json({
      success: true,
      url,
      warning:
        "STORAGE_* env vars not set — logo saved to local disk and may be lost on the next deploy.",
    });
  } catch (error) {
    logServerError("logo upload", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
