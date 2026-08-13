import { Resend } from "resend";
import type { MarketplaceLeadStatus } from "@prisma/client";
import { RUWQ_PUBLIC_EMAIL, RUWQ_PUBLIC_URL } from "@/shared/constants/brand";

type TurrivaEmailPayload = {
  leadId: string;
  clientName: string;
  clientPhone: string;
  city: string;
  categorySlug: string;
  categoryLabel: string;
  projectDetails: string;
  budgetRange?: string | null;
  status: MarketplaceLeadStatus;
};

type MarketplaceOpsEmailPayload = TurrivaEmailPayload & {
  locale: "ar" | "en";
  referenceCode: string;
};

type ClientConfirmationEmailPayload = {
  locale: "ar" | "en";
  clientName: string;
  clientEmail: string;
  referenceCode: string;
  cityLabel: string;
  categoryLabel: string;
};

type JoinApplicationOpsPayload = {
  applicationId: string;
  companyName: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string | null;
  cityLabel: string;
  categoryLabel: string;
  crNumber?: string | null;
  portfolioUrl?: string | null;
  message?: string | null;
  locale: "ar" | "en";
};

type JoinApplicationConfirmationPayload = {
  locale: "ar" | "en";
  contactName: string;
  contactEmail: string;
  companyName: string;
  statusUrl: string;
};

type JoinApplicationApprovedPayload = {
  locale: "ar" | "en";
  contactName: string;
  contactEmail: string;
  companyName: string;
  listingUrl: string;
  tier: "VERIFIED" | "PRO";
};

type JoinApplicationRejectedPayload = {
  locale: "ar" | "en";
  contactName: string;
  contactEmail: string;
  companyName: string;
  reviewNote: string;
};

type GraphicsHouseEmailPayload = {
  leadId: string;
  clientName: string;
  clientPhone: string;
  companyName?: string | null;
  citySlug?: string | null;
  projectType: string;
  projectDetails: string;
  budgetRange?: string | null;
  locale: string;
};

function resolveResendFrom(): string {
  return process.env.RESEND_FROM?.trim() || "Ruwaq Leads <onboarding@resend.dev>";
}

function resolveResendRecipients(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

function resolveRuwaqOpsEmails(): string[] {
  const fromEnv = resolveResendRecipients(process.env.RUWQ_LEAD_EMAIL?.trim());
  if (fromEnv.length > 0) return fromEnv;
  return [RUWQ_PUBLIC_EMAIL];
}

function adminLeadsUrl(): string {
  return `${process.env.NEXT_PUBLIC_APP_URL ?? RUWQ_PUBLIC_URL}/workspace/admin/leads`;
}

function adminApplicationsUrl(): string {
  return `${process.env.NEXT_PUBLIC_APP_URL ?? RUWQ_PUBLIC_URL}/workspace/admin/applications`;
}

async function sendPlainEmail(opts: {
  to: string[];
  subject: string;
  text: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey || opts.to.length === 0) return;

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: resolveResendFrom(),
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
    });
  } catch (err) {
    console.error("[marketplace-lead] Resend email failed", err);
  }
}

export async function sendTurrivaLeadEmail(payload: TurrivaEmailPayload): Promise<void> {
  const to = resolveResendRecipients(process.env.TURRIVA_LEAD_EMAIL?.trim());
  if (to.length === 0) return;

  const subject = `[Ruwaq → Turriva] ${payload.categoryLabel} — ${payload.clientName} (${payload.city})`;
  const text = [
    `New Turriva-routed marketplace lead (${payload.status})`,
    `Lead ID: ${payload.leadId}`,
    `Client: ${payload.clientName}`,
    `Phone: ${payload.clientPhone}`,
    `City: ${payload.city}`,
    `Category: ${payload.categorySlug} — ${payload.categoryLabel}`,
    payload.budgetRange ? `Budget: ${payload.budgetRange}` : null,
    "",
    "Project details:",
    payload.projectDetails,
    "",
    `Admin: ${adminLeadsUrl()}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendPlainEmail({ to, subject, text });
}

/** Ops inbox — every marketplace quote request (all categories). */
export async function sendRuwaqOpsLeadEmail(payload: MarketplaceOpsEmailPayload): Promise<void> {
  const to = resolveRuwaqOpsEmails();
  const routing =
    payload.status === "ASSIGNED_TO_TURRIVA" ? "Turriva capture" : "Partner broadcast";

  const subject = `[Ruwaq Ops] ${payload.referenceCode} — ${payload.categoryLabel} (${payload.city})`;
  const text = [
    `New marketplace lead — ${routing}`,
    `Reference: ${payload.referenceCode}`,
    `Lead ID: ${payload.leadId}`,
    `Status: ${payload.status}`,
    `Locale: ${payload.locale}`,
    `Client: ${payload.clientName}`,
    `Phone: ${payload.clientPhone}`,
    `City: ${payload.city}`,
    `Category: ${payload.categorySlug} — ${payload.categoryLabel}`,
    payload.budgetRange ? `Budget: ${payload.budgetRange}` : null,
    "",
    "Project details:",
    payload.projectDetails,
    "",
    `Admin: ${adminLeadsUrl()}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendPlainEmail({ to, subject, text });
}

/** Optional — when the client provided an email on /request-quote. */
export async function sendClientLeadConfirmationEmail(
  payload: ClientConfirmationEmailPayload
): Promise<void> {
  const isAr = payload.locale === "ar";
  const subject = isAr
    ? `رواق — استلمنا طلبك (${payload.referenceCode})`
    : `Ruwaq — we received your request (${payload.referenceCode})`;

  const text = isAr
    ? [
        `مرحباً ${payload.clientName}،`,
        "",
        "تم استلام طلب عرض السعر بنجاح.",
        `رقم المرجع: ${payload.referenceCode}`,
        `المدينة: ${payload.cityLabel}`,
        `القطاع: ${payload.categoryLabel}`,
        "",
        "سيتواصل فريق رواق معك على الواتساب خلال 24 ساعة.",
        "",
        RUWQ_PUBLIC_URL,
      ].join("\n")
    : [
        `Hello ${payload.clientName},`,
        "",
        "Your quote request was received successfully.",
        `Reference: ${payload.referenceCode}`,
        `City: ${payload.cityLabel}`,
        `Category: ${payload.categoryLabel}`,
        "",
        "The Ruwaq team will reach out on WhatsApp within 24 hours.",
        "",
        RUWQ_PUBLIC_URL,
      ].join("\n");

  await sendPlainEmail({ to: [payload.clientEmail], subject, text });
}

export async function sendJoinApplicationOpsEmail(
  payload: JoinApplicationOpsPayload
): Promise<void> {
  const to = resolveRuwaqOpsEmails();
  const subject = `[Ruwaq Join] ${payload.companyName} — ${payload.categoryLabel}`;
  const text = [
    "New directory join application",
    `Application ID: ${payload.applicationId}`,
    `Company: ${payload.companyName}`,
    `Contact: ${payload.contactName}`,
    `Phone: ${payload.contactPhone}`,
    payload.contactEmail ? `Email: ${payload.contactEmail}` : null,
    `City: ${payload.cityLabel}`,
    `Category: ${payload.categoryLabel}`,
    payload.crNumber ? `CR: ${payload.crNumber}` : null,
    payload.portfolioUrl ? `Portfolio: ${payload.portfolioUrl}` : null,
    payload.message ? `\nMessage:\n${payload.message}` : null,
    "",
    `Locale: ${payload.locale}`,
    `Review: ${adminApplicationsUrl()}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendPlainEmail({ to, subject, text });
}

export async function sendJoinApplicationConfirmationEmail(
  payload: JoinApplicationConfirmationPayload
): Promise<void> {
  const isAr = payload.locale === "ar";
  const subject = isAr
    ? `رواق — استلمنا طلب انضمام ${payload.companyName}`
    : `Ruwaq — we received your join request (${payload.companyName})`;

  const text = isAr
    ? [
        `مرحباً ${payload.contactName}،`,
        "",
        `استلمنا طلب انضمام «${payload.companyName}» إلى دليل Ruwaq PRO.`,
        "سنراجع السجل التجاري والملف خلال 3–5 أيام عمل ونتواصل معك بالخطوات التالية.",
        "",
        "تابع حالة الطلب من هنا:",
        payload.statusUrl,
        "",
        RUWQ_PUBLIC_URL,
      ].join("\n")
    : [
        `Hello ${payload.contactName},`,
        "",
        `We received your application for "${payload.companyName}" to join the Ruwaq PRO directory.`,
        "We will review your commercial registration and portfolio within 3–5 business days.",
        "",
        "Track your application here:",
        payload.statusUrl,
        "",
        RUWQ_PUBLIC_URL,
      ].join("\n");

  await sendPlainEmail({ to: [payload.contactEmail], subject, text });
}

export async function sendJoinApplicationApprovedEmail(
  payload: JoinApplicationApprovedPayload
): Promise<void> {
  const isAr = payload.locale === "ar";
  const tierLabel = isAr
    ? payload.tier === "PRO"
      ? "مميز · PRO"
      : "معتمد"
    : payload.tier === "PRO"
      ? "Featured · PRO"
      : "Verified";

  const subject = isAr
    ? `رواق — تمت الموافقة على «${payload.companyName}»`
    : `Ruwaq — "${payload.companyName}" is now live in the directory`;

  const text = isAr
    ? [
        `مرحباً ${payload.contactName}،`,
        "",
        `تمت الموافقة على انضمام «${payload.companyName}» إلى دليل Ruwaq PRO.`,
        `الباقة: ${tierLabel}`,
        "",
        "رابط ملفكم:",
        payload.listingUrl,
        "",
        "يمكن للعملاء الآن التواصل معكم عبر الدليل.",
        RUWQ_PUBLIC_URL,
      ].join("\n")
    : [
        `Hello ${payload.contactName},`,
        "",
        `Your application for "${payload.companyName}" has been approved.`,
        `Tier: ${tierLabel}`,
        "",
        "Your public profile:",
        payload.listingUrl,
        "",
        "Clients can now reach you through the Ruwaq directory.",
        RUWQ_PUBLIC_URL,
      ].join("\n");

  await sendPlainEmail({ to: [payload.contactEmail], subject, text });
}

export async function sendJoinApplicationRejectedEmail(
  payload: JoinApplicationRejectedPayload
): Promise<void> {
  const isAr = payload.locale === "ar";
  const subject = isAr
    ? `رواق — تحديث بخصوص طلب انضمام «${payload.companyName}»`
    : `Ruwaq — update on your join request (${payload.companyName})`;

  const text = isAr
    ? [
        `مرحباً ${payload.contactName}،`,
        "",
        `بعد مراجعة طلب انضمام «${payload.companyName}»، لم نتمكن من الموافقة في الوقت الحالي.`,
        "",
        "ملاحظة الفريق:",
        payload.reviewNote,
        "",
        "يمكنكم تقديم طلب جديد بعد استكمال المتطلبات عبر:",
        `${RUWQ_PUBLIC_URL}/join`,
      ].join("\n")
    : [
        `Hello ${payload.contactName},`,
        "",
        `After reviewing your application for "${payload.companyName}", we cannot approve it at this time.`,
        "",
        "Team note:",
        payload.reviewNote,
        "",
        "You may submit a new application once requirements are met:",
        `${RUWQ_PUBLIC_URL}/join`,
      ].join("\n");

  await sendPlainEmail({ to: [payload.contactEmail], subject, text });
}

export async function sendGraphicsHouseLeadEmail(
  payload: GraphicsHouseEmailPayload
): Promise<void> {
  const to = resolveResendRecipients(
    process.env.GRAPHICS_HOUSE_LEAD_EMAIL?.trim() || process.env.TURRIVA_LEAD_EMAIL?.trim()
  );
  if (to.length === 0) return;

  const cityPart = payload.citySlug ? ` (${payload.citySlug})` : "";
  const subject = `[Ruwaq → GH] ${payload.projectType} — ${payload.clientName}${cityPart}`;

  const text = [
    "New Graphics House visualization lead from Ruwaq",
    `Lead ID: ${payload.leadId}`,
    `Client: ${payload.clientName}`,
    `Phone: ${payload.clientPhone}`,
    payload.companyName ? `Company: ${payload.companyName}` : null,
    payload.citySlug ? `City: ${payload.citySlug}` : null,
    `Project type: ${payload.projectType}`,
    payload.budgetRange ? `Budget: ${payload.budgetRange}` : null,
    `Locale: ${payload.locale}`,
    "",
    "Project details:",
    payload.projectDetails,
    "",
    `Admin: ${adminLeadsUrl()}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendPlainEmail({ to, subject, text });
}
