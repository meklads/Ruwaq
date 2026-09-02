import { redirect } from "next/navigation";
import Link from "next/link";
import type { MarketplaceLeadStatus } from "@prisma/client";
import { getSession } from "@/modules/auth/server/session";
import { isAdminEmail } from "@/shared/lib/env";
import { db } from "@/shared/lib/db";
import { AppPageHero } from "@/shared/components/app-page-hero";
import { AdminMarketplaceLeadActions } from "@/modules/marketplace/components/admin/admin-marketplace-lead-actions";
import { AdminLeadMatcher } from "@/modules/marketplace/components/admin/admin-lead-matcher";
import { AdminPartnerLeadActions } from "@/modules/marketplace/components/admin/admin-partner-lead-actions";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { leadReferenceCode } from "@/modules/marketplace/lib/lead-phone";
import { scoreLeadMatchCandidates } from "@/modules/marketplace/lib/lead-match-scoring";
import type { Locale } from "@/shared/i18n/locale";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: { view?: string };
};

function parseView(value: string | undefined): "open" | "all" | "closed" {
  if (value === "all" || value === "closed") return value;
  return "open";
}

function statusBadgeClass(status: MarketplaceLeadStatus): string {
  switch (status) {
    case "ASSIGNED_TO_TURRIVA":
      return "bg-amber-100 text-amber-900";
    case "BROADCASTED_TO_PARTNERS":
      return "bg-sky-100 text-sky-900";
    case "CLOSED":
      return "bg-neutral-200 text-neutral-700";
    default:
      return "bg-emerald-100 text-emerald-900";
  }
}

export default async function AdminLeadsPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    redirect("/login");
  }

  const view = parseView(searchParams.view);

  const leadWhere =
    view === "open"
      ? { status: { not: "CLOSED" as const } }
      : view === "closed"
        ? { status: "CLOSED" as const }
        : undefined;

  const [leads, partnerLeads, openCount, verifiedListings] = await Promise.all([
    db.marketplaceLead.findMany({
      where: leadWhere,
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        category: true,
        matches: {
          orderBy: { rank: "asc" },
          include: { listing: true },
        },
      },
    }),
    db.partnerLead.findMany({
      where: { source: "GRAPHICS_HOUSE" },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    db.marketplaceLead.count({ where: { status: { not: "CLOSED" } } }),
    db.providerListing.findMany({
      where: { isVerified: true },
      select: {
        id: true,
        titleAr: true,
        titleEn: true,
        city: true,
        directorySortRank: true,
        directoryTier: true,
        isFeatured: true,
        isVerified: true,
        category: { select: { slug: true } },
      },
      orderBy: [{ directorySortRank: "asc" }, { titleAr: "asc" }],
    }),
  ]);

  const tabs = [
    { key: "open", label: `Open (${openCount})` },
    { key: "all", label: "All quotes" },
    { key: "closed", label: "Closed" },
  ] as const;

  return (
    <>
      <AppPageHero
        eyebrow="Admin"
        title="Leads — Ruwaq Marketplace"
        subtitle="Update status, contact clients on WhatsApp, and track Turriva vs partner routing."
      />
      <div className="app-content-area space-y-12">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/workspace/admin/metrics" className="text-ruwaq-gold hover:underline">
            ← Metrics
          </Link>
          <Link href="/workspace/admin/applications" className="text-ruwaq-ink-soft hover:underline">
            Join applications
          </Link>
        </div>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ruwaq-ink-muted">
            Marketplace quote requests
          </h2>

          <div className="mb-6 flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const active = view === tab.key;
              const href =
                tab.key === "open"
                  ? "/workspace/admin/leads"
                  : `/workspace/admin/leads?view=${tab.key}`;
              return (
                <Link
                  key={tab.key}
                  href={href}
                  className={
                    active
                      ? "rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white"
                      : "rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-ruwaq-ink-soft hover:border-neutral-900"
                  }
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          <div className="space-y-4">
            {leads.map((lead) => {
              const citySlug = citySlugFromEnum(lead.city);
              const cityMeta = getCityBySlug(citySlug);
              const categoryMeta = getCategoryBySlug(lead.category.slug);
              const locale = (lead.locale === "en" ? "en" : "ar") as Locale;
              const cityLabel =
                cityMeta && locale === "ar" ? cityMeta.nameAr : cityMeta?.nameEn ?? citySlug;
              const categoryLabel =
                categoryMeta && locale === "ar"
                  ? categoryMeta.nameAr
                  : categoryMeta?.nameEn ?? lead.category.slug;
              const referenceCode = leadReferenceCode(lead.id);
              const initialMatches = lead.matches.map((m) => ({
                rank: m.rank,
                listingId: m.listingId,
                label: (locale === "ar" ? m.listing.titleAr : m.listing.titleEn) ?? m.listingId,
              }));
              const matchCandidates = verifiedListings
                .filter(
                  (l) => l.city === lead.city && l.category.slug === lead.category.slug
                )
                .map((l) => ({
                  id: l.id,
                  label: (locale === "ar" ? l.titleAr : l.titleEn) ?? l.id,
                }));
              const scoringPool = verifiedListings.filter(
                (l) => l.city === lead.city && l.category.slug === lead.category.slug
              );
              const suggestedMatches =
                initialMatches.length === 0
                  ? scoreLeadMatchCandidates(scoringPool, locale)
                  : [];

              return (
                <article
                  key={lead.id}
                  className="rounded border border-ruwaq-stone bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-ruwaq-ink">{lead.clientName}</h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClass(lead.status)}`}
                        >
                          {lead.status}
                        </span>
                        <span className="font-mono text-xs text-ruwaq-ink-muted" dir="ltr">
                          #{referenceCode}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ruwaq-ink-soft">
                        {categoryLabel} · {cityLabel} ·{" "}
                        {lead.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                      </p>
                      <p className="mt-1 font-mono text-xs text-ruwaq-ink-muted" dir="ltr">
                        {lead.clientPhone}
                      </p>
                      {lead.budgetRange ? (
                        <p className="mt-2 text-sm">
                          <span className="text-ruwaq-ink-muted">Budget: </span>
                          {lead.budgetRange}
                        </p>
                      ) : null}
                      <p className="mt-3 rounded bg-ruwaq-paper p-3 text-sm leading-relaxed text-ruwaq-ink-soft">
                        {lead.projectDetails}
                      </p>
                      <AdminLeadMatcher
                        leadId={lead.id}
                        citySlug={citySlug}
                        categorySlug={lead.category.slug}
                        candidates={matchCandidates}
                        initialMatches={initialMatches}
                        suggestedMatches={suggestedMatches}
                      />
                    </div>
                    <AdminMarketplaceLeadActions
                      leadId={lead.id}
                      status={lead.status}
                      clientPhone={lead.clientPhone}
                      clientName={lead.clientName}
                      referenceCode={referenceCode}
                      categoryLabel={categoryLabel}
                      locale={locale}
                    />
                  </div>
                </article>
              );
            })}
          </div>

          {leads.length === 0 ? (
            <p className="py-8 text-center text-ruwaq-ink-muted">No quote requests in this view.</p>
          ) : null}
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ruwaq-ink-muted">
            Graphics House visualization
          </h2>
          <div className="space-y-4">
            {partnerLeads.map((lead) => {
              const locale = (lead.locale === "en" ? "en" : "ar") as Locale;
              return (
                <article
                  key={lead.id}
                  className="rounded border border-ruwaq-stone bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-bold text-ruwaq-ink">{lead.clientName}</h3>
                      <p className="mt-1 text-sm text-ruwaq-ink-soft">
                        {lead.projectType}
                        {lead.companyName ? ` · ${lead.companyName}` : ""}
                        {lead.city ? ` · ${citySlugFromEnum(lead.city)}` : ""}
                      </p>
                      <p className="mt-1 font-mono text-xs text-ruwaq-ink-muted" dir="ltr">
                        {lead.clientPhone}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ruwaq-ink-soft">
                        {lead.projectDetails}
                      </p>
                    </div>
                    <AdminPartnerLeadActions
                      clientPhone={lead.clientPhone}
                      clientName={lead.clientName}
                      projectType={lead.projectType}
                      locale={locale}
                    />
                  </div>
                </article>
              );
            })}
          </div>
          {partnerLeads.length === 0 ? (
            <p className="py-8 text-center text-ruwaq-ink-muted">No visualization leads yet.</p>
          ) : null}
        </section>
      </div>
    </>
  );
}
