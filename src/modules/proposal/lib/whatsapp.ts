import type { Locale } from "@/shared/i18n/locale";
import { formatSar } from "@/shared/lib/format";

export function buildWhatsAppMessage(
  locale: Locale,
  data: {
    projectName: string;
    clientName: string;
    budget: number;
    shareUrl: string;
  }
): string {
  const amount = formatSar(data.budget, locale);
  if (locale === "en") {
    return `Hello ${data.clientName},\n\nPlease find our proposal for "${data.projectName}" — total value SAR ${amount}.\n\nView proposal: ${data.shareUrl}\n\nBest regards`;
  }
  return `السلام عليكم ${data.clientName}،\n\nنرفق لكم عرضنا لمشروع «${data.projectName}» بقيمة ${amount} ريال.\n\nرابط العرض: ${data.shareUrl}\n\nمع التحية`;
}

export function whatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
