/**
 * S3-compatible object storage (Cloudflare R2 or AWS S3) for user uploads
 * (currently: company logos). Falls back gracefully — callers should check
 * isCloudStorageConfigured() and keep a local-disk fallback for dev/unset.
 *
 * Why this exists: local disk storage (public/uploads/...) does not survive
 * a redeploy on most PaaS hosts (Coolify included) since the container
 * filesystem is rebuilt from the image each deploy. Logos saved locally
 * disappear silently and break previously-exported proposal branding.
 */

let cachedClient: import("@aws-sdk/client-s3").S3Client | null = null;

function getConfig() {
  const accessKeyId = process.env.STORAGE_ACCESS_KEY?.trim();
  const secretAccessKey = process.env.STORAGE_SECRET_KEY?.trim();
  const bucket = process.env.STORAGE_BUCKET?.trim();
  const endpoint = process.env.STORAGE_ENDPOINT?.trim();
  if (!accessKeyId || !secretAccessKey || !bucket || !endpoint) return null;

  const region = process.env.STORAGE_REGION?.trim() || "auto";
  // Public base for constructing object URLs — a Cloudflare R2 custom domain
  // or r2.dev URL, or (for AWS S3) usually https://{bucket}.s3.{region}.amazonaws.com.
  // Falls back to "{endpoint}/{bucket}" which works for path-style buckets.
  const publicBaseUrl =
    process.env.STORAGE_PUBLIC_URL?.trim() ||
    `${endpoint.replace(/\/$/, "")}/${bucket}`;

  return { accessKeyId, secretAccessKey, bucket, endpoint, region, publicBaseUrl };
}

export function isCloudStorageConfigured(): boolean {
  return getConfig() !== null;
}

async function getClient() {
  const config = getConfig();
  if (!config) throw new Error("Cloud storage is not configured");
  if (cachedClient) return { client: cachedClient, config };

  const { S3Client } = await import("@aws-sdk/client-s3");
  cachedClient = new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    // R2 and most non-AWS S3-compatible stores need path-style addressing.
    forcePathStyle: true,
  });
  return { client: cachedClient, config };
}

/**
 * Uploads a buffer to the configured bucket and returns its public URL.
 * Throws if cloud storage isn't configured — callers should fall back to
 * local disk in that case (see api/company/logo/route.ts).
 */
export async function uploadPublicObject(
  key: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const { client, config } = await getClient();
  const { PutObjectCommand } = await import("@aws-sdk/client-s3");

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return `${config.publicBaseUrl.replace(/\/$/, "")}/${key}`;
}
