import { db } from "@/shared/lib/db";
import { sendContractorLeadReminderEmail } from "@/modules/marketplace/server/lead-notify-email";
import { leadReferenceCode } from "@/modules/marketplace/lib/lead-phone";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";

const DEFAULT_SLA_HOURS = 4;

function slaHours(): number {
  const raw = Number.parseInt(process.env.LEAD_RESPONSE_SLA_HOURS ?? "", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_SLA_HOURS;
}

export type LeadReminderRunResult = {
  scanned: number;
  sent: number;
  skipped: number;
};

export async function processContractorLeadReminders(): Promise<LeadReminderRunResult> {
  const hours = slaHours();
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://ruwaq.co";
  const inboxUrl = `${baseUrl}/leads`;

  const matches = await db.marketplaceLeadMatch.findMany({
    where: {
      viewedAt: null,
      reminderSentAt: null,
      notifiedAt: { not: null, lte: cutoff },
      lead: { status: "BROADCASTED_TO_PARTNERS" },
    },
    take: 50,
    orderBy: { notifiedAt: "asc" },
    select: {
      id: true,
      rank: true,
      listing: {
        select: {
          titleAr: true,
          owner: { select: { email: true } },
          directoryApplication: { select: { contactEmail: true } },
        },
      },
      lead: {
        select: {
          id: true,
          clientName: true,
          locale: true,
          city: true,
          category: { select: { nameAr: true, nameEn: true, slug: true } },
        },
      },
    },
  });

  let sent = 0;
  let skipped = 0;

  for (const match of matches) {
    const contractorEmail =
      match.listing.owner?.email ?? match.listing.directoryApplication?.contactEmail;
    if (!contractorEmail) {
      skipped += 1;
      continue;
    }

    const locale = match.lead.locale === "en" ? "en" : "ar";
    const citySlug = citySlugFromEnum(match.lead.city);
    const cityMeta = getCityBySlug(citySlug);
    const categoryMeta = getCategoryBySlug(match.lead.category.slug);
    const cityLabel =
      locale === "ar" ? (cityMeta?.nameAr ?? match.lead.city) : (cityMeta?.nameEn ?? match.lead.city);
    const categoryLabel =
      locale === "ar"
        ? (categoryMeta?.nameAr ?? match.lead.category.nameAr)
        : (categoryMeta?.nameEn ?? match.lead.category.nameEn);

    try {
      await sendContractorLeadReminderEmail({
        locale,
        contractorEmail,
        companyName: match.listing.titleAr,
        rank: match.rank,
        referenceCode: leadReferenceCode(match.lead.id),
        clientName: match.lead.clientName,
        cityLabel,
        categoryLabel,
        slaHours: hours,
        inboxUrl,
      });
      await db.marketplaceLeadMatch.update({
        where: { id: match.id },
        data: { reminderSentAt: new Date() },
      });
      sent += 1;
    } catch (err) {
      console.error("[processContractorLeadReminders]", match.id, err);
      skipped += 1;
    }
  }

  return { scanned: matches.length, sent, skipped };
}
