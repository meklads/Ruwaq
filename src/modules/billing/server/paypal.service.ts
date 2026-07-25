import { db } from "@/shared/lib/db";

/**
 * PayPal REST integration — temporary payment rail (per product decision,
 * 2026-07-02) while a Saudi-native gateway (Moyasar / Tap, Mada support) is
 * evaluated. PayPal cannot settle in SAR, so the premium-template unlock is
 * priced in USD. Swap PAYPAL_ENV to "live" once real credentials are set.
 *
 * Unlocks: premium export templates (ruwaq_executive, graphics_house) —
 * the free "ruwaq" template stays free forever, per the site's existing
 * "no account, no card to start" promise.
 */

export const PREMIUM_TEMPLATES_PRICE_USD = 15;
export const PREMIUM_TEMPLATES_CURRENCY = "USD";
export const PAYMENT_PURPOSE = "premium_templates";

function paypalBaseUrl(): string {
  const env = (process.env.PAYPAL_ENV ?? "sandbox").trim().toLowerCase();
  return env === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

function getCredentials(): { clientId: string; secret: string } | null {
  const clientId = process.env.PAYPAL_CLIENT_ID?.trim();
  const secret = process.env.PAYPAL_CLIENT_SECRET?.trim();
  if (!clientId || !secret) return null;
  return { clientId, secret };
}

export function isPaypalConfigured(): boolean {
  return getCredentials() !== null;
}

async function getAccessToken(): Promise<string> {
  const creds = getCredentials();
  if (!creds) {
    throw new Error(
      "PayPal not configured. Add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET."
    );
  }
  const basic = Buffer.from(`${creds.clientId}:${creds.secret}`).toString(
    "base64"
  );
  const res = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/** Creates a PayPal order for the premium-templates unlock. */
export async function createPremiumTemplatesOrder(userId: string) {
  const accessToken = await getAccessToken();
  const res = await fetch(`${paypalBaseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: userId,
          description: "Turriva — premium proposal templates (one-time unlock)",
          amount: {
            currency_code: PREMIUM_TEMPLATES_CURRENCY,
            value: PREMIUM_TEMPLATES_PRICE_USD.toFixed(2),
          },
        },
      ],
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`PayPal order create failed: ${res.status} ${await res.text()}`);
  }
  const order = (await res.json()) as { id: string };

  await db.payment.create({
    data: {
      userId,
      provider: "paypal",
      providerOrderId: order.id,
      amount: PREMIUM_TEMPLATES_PRICE_USD,
      currency: PREMIUM_TEMPLATES_CURRENCY,
      status: "pending",
      purpose: PAYMENT_PURPOSE,
    },
  });

  return order.id;
}

/**
 * Captures a previously-created PayPal order. Verifies the order actually
 * belongs to this user and is COMPLETED before unlocking anything —
 * never trust the client-side "success" callback alone.
 */
export async function capturePremiumTemplatesOrder(
  userId: string,
  orderId: string
) {
  const payment = await db.payment.findUnique({ where: { providerOrderId: orderId } });
  if (!payment || payment.userId !== userId) {
    throw new Error("Order not found for this user");
  }
  if (payment.status === "completed") {
    return { alreadyCompleted: true };
  }

  const accessToken = await getAccessToken();
  const res = await fetch(
    `${paypalBaseUrl()}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const captureData = (await res.json()) as { status?: string };

  if (!res.ok || captureData.status !== "COMPLETED") {
    await db.payment.update({
      where: { providerOrderId: orderId },
      data: { status: "failed" },
    });
    throw new Error(
      `PayPal capture not completed: ${captureData.status ?? res.status}`
    );
  }

  await db.$transaction([
    db.payment.update({
      where: { providerOrderId: orderId },
      data: { status: "completed" },
    }),
    db.companyProfile.upsert({
      where: { userId },
      update: { isPaid: true, paidAt: new Date() },
      create: { userId, isPaid: true, paidAt: new Date() },
    }),
  ]);

  return { alreadyCompleted: false };
}
