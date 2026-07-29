/** Normalize Saudi mobile to E.164 +9665xxxxxxxx */
export function normalizeKsaPhone(raw: string): string {
  const compact = raw.replace(/[\s-]/g, "").trim();
  let digits = compact.replace(/\D/g, "");

  if (compact.startsWith("+")) {
    if (!digits.startsWith("966")) {
      throw new Error("invalid_phone");
    }
  } else if (digits.startsWith("966")) {
    // ok
  } else if (digits.startsWith("05") && digits.length === 10) {
    digits = `966${digits.slice(1)}`;
  } else if (digits.startsWith("5") && digits.length === 9) {
    digits = `966${digits}`;
  } else if (digits.startsWith("0")) {
    digits = `966${digits.slice(1)}`;
  }

  if (!/^9665\d{8}$/.test(digits)) {
    throw new Error("invalid_phone");
  }

  return `+${digits}`;
}

export function buildWhatsAppUrl(phoneE164: string, message: string): string {
  const digits = phoneE164.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function leadReferenceCode(leadId: string): string {
  return leadId.slice(-8).toUpperCase();
}

export function supportWhatsAppE164(): string {
  const raw =
    process.env.RUWQ_SUPPORT_WHATSAPP?.trim() ||
    process.env.NEXT_PUBLIC_RUWQ_SUPPORT_WHATSAPP?.trim() ||
    "";
  if (!raw) return "";
  try {
    return normalizeKsaPhone(raw);
  } catch {
    return raw.startsWith("+") ? raw : `+${raw.replace(/\D/g, "")}`;
  }
}

export function buildClientFollowUpWhatsAppMessage(opts: {
  locale: "ar" | "en";
  referenceCode: string;
  clientName: string;
  cityLabel: string;
  categoryLabel: string;
}): string {
  if (opts.locale === "ar") {
    return (
      `مرحباً رواق،\n` +
      `أرسلتُ طلب عرض سعر (مرجع: ${opts.referenceCode}).\n` +
      `الاسم: ${opts.clientName}\n` +
      `المدينة: ${opts.cityLabel}\n` +
      `القطاع: ${opts.categoryLabel}\n` +
      `أود متابعة الطلب عبر واتساب.`
    );
  }
  return (
    `Hi Ruwaq,\n` +
    `I submitted a quote request (ref: ${opts.referenceCode}).\n` +
    `Name: ${opts.clientName}\n` +
    `City: ${opts.cityLabel}\n` +
    `Category: ${opts.categoryLabel}\n` +
    `I'd like to follow up on WhatsApp.`
  );
}
