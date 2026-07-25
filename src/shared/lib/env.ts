import { z } from "zod";
import { normalizeAppUrl } from "./request-url";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  AUTH_SECRET: z.string().min(1).optional(),
  AUTH_URL: z.string().optional(),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
  OPENAI_API_KEY: z.string().optional().default(""),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),
  STORAGE_BUCKET: z.string().optional(),
  STORAGE_ENDPOINT: z.string().optional(),
  /** "auto" works for Cloudflare R2; set a real AWS region for S3. */
  STORAGE_REGION: z.string().optional().default("auto"),
  /** Public base URL for uploaded objects (R2 custom domain / r2.dev / CDN).
   *  Falls back to "{STORAGE_ENDPOINT}/{STORAGE_BUCKET}" when unset. */
  STORAGE_PUBLIC_URL: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  /** PayPal — temporary payment rail for premium templates unlock (USD only) */
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_ENV: z.string().optional().default("sandbox"),
  /** Master switch for the premium-templates paywall. "false" = everything
   *  free (launch trial month). Flip to "true" in Coolify when ready to
   *  charge — no code change needed, the PayPal flow is already wired. */
  BILLING_ENABLED: z.string().optional().default("false"),
  NEXT_PUBLIC_APP_URL: z.string().optional().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Ruwaq"),
  /** When set, HTTP Basic Auth protects dashboard/API (marketing stays public) */
  APP_GATE_PASSWORD: z.string().optional(),
  APP_GATE_USER: z.string().optional(),
  /** Comma-separated emails allowed to view /admin/metrics. */
  ADMIN_EMAILS: z.string().optional().default("radwan3@gmail.com"),
});

type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const isBuildTime =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.npm_lifecycle_event === "build";

  const appUrl = normalizeAppUrl(
    process.env.NEXT_PUBLIC_APP_URL ?? process.env.AUTH_URL,
    isBuildTime ? "http://localhost:3000" : "https://turriva.co"
  );

  const normalized = {
    ...process.env,
    AUTH_URL: normalizeAppUrl(process.env.AUTH_URL, appUrl),
    NEXT_PUBLIC_APP_URL: appUrl,
  };

  const parsed = envSchema.safeParse(normalized);

  if (!parsed.success) {
    console.warn(
      "[env] Some variables missing:",
      JSON.stringify(parsed.error.flatten().fieldErrors)
    );
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET ?? "runtime-placeholder-change-me",
    AUTH_URL: normalizeAppUrl(process.env.AUTH_URL, appUrl),
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
    STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY,
    STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT,
    STORAGE_REGION: process.env.STORAGE_REGION ?? "auto",
    STORAGE_PUBLIC_URL: process.env.STORAGE_PUBLIC_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    PAYPAL_ENV: process.env.PAYPAL_ENV ?? "sandbox",
    BILLING_ENABLED: process.env.BILLING_ENABLED ?? "false",
    NEXT_PUBLIC_APP_URL: appUrl,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "Ruwaq",
    APP_GATE_PASSWORD: process.env.APP_GATE_PASSWORD,
    APP_GATE_USER: process.env.APP_GATE_USER,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS ?? "radwan3@gmail.com",
  };
}

export const env = parseEnv();

/** Google OAuth — supports Auth.js and common alternate env names */
export function getGoogleOAuthCredentials(): {
  clientId: string;
  clientSecret: string;
} | null {
  const clientId =
    process.env.AUTH_GOOGLE_ID?.trim() ||
    process.env.GOOGLE_CLIENT_ID?.trim() ||
    "";
  const clientSecret =
    process.env.AUTH_GOOGLE_SECRET?.trim() ||
    process.env.GOOGLE_CLIENT_SECRET?.trim() ||
    "";
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export const isGoogleAuthConfigured = () => getGoogleOAuthCredentials() !== null;

export const isOpenAIConfigured = () => Boolean(process.env.OPENAI_API_KEY?.trim());

export function getGeminiApiKey(): string | null {
  const key =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_AI_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
  return key || null;
}

export const isGeminiConfigured = () => Boolean(getGeminiApiKey());

export function getGeminiImageModel(): string {
  return process.env.GEMINI_IMAGE_MODEL?.trim() || "gemini-2.5-flash-image";
}

/** Prefer Gemini (Nano Banana) for photo edits; OpenAI is fallback. */
export function getDesignImageProvider(): "gemini" | "openai" | null {
  if (isGeminiConfigured()) return "gemini";
  if (isOpenAIConfigured()) return "openai";
  return null;
}

export const isDesignAIConfigured = () => getDesignImageProvider() !== null;

/** Premium-templates paywall master switch. Defaults to OFF (free trial). */
export const isBillingEnabled = () =>
  (process.env.BILLING_ENABLED ?? "false").trim().toLowerCase() === "true";

/** Who can view /admin/metrics. */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? "radwan3@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}
