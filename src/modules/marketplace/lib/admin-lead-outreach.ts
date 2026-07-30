import type { Locale } from "@/shared/i18n/locale";
import { buildWhatsAppUrl } from "@/modules/marketplace/lib/lead-phone";

export function buildAdminLeadOutreachMessage(opts: {
  locale: Locale;
  referenceCode: string;
  clientName: string;
  categoryLabel: string;
}): string {
  if (opts.locale === "ar") {
    return (
      `مرحباً ${opts.clientName}،\n` +
      `معك فريق رواق بخصوص طلب عرض السعر (مرجع: ${opts.referenceCode}).\n` +
      `القطاع: ${opts.categoryLabel}\n` +
      `كيف نقدر نخدمك؟`
    );
  }
  return (
    `Hello ${opts.clientName},\n` +
    `Ruwaq team here about your quote request (ref: ${opts.referenceCode}).\n` +
    `Category: ${opts.categoryLabel}\n` +
    `How can we help?`
  );
}

export function buildAdminPartnerLeadOutreachMessage(opts: {
  locale: Locale;
  clientName: string;
  projectType: string;
}): string {
  if (opts.locale === "ar") {
    return (
      `مرحباً ${opts.clientName}،\n` +
      `معك فريق رواق بخصوص طلب التصوير المعماري (${opts.projectType}).\n` +
      `نود متابعة التفاصيل معك.`
    );
  }
  return (
    `Hello ${opts.clientName},\n` +
    `Ruwaq team regarding your visualization request (${opts.projectType}).\n` +
    `We'd like to follow up with you.`
  );
}

export function whatsAppLinkForClient(phone: string, message: string): string {
  return buildWhatsAppUrl(phone, message);
}
