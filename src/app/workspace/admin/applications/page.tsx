import { redirect } from "next/navigation";
import Link from "next/link";
import type { DirectoryApplicationStatus } from "@prisma/client";
import { getSession } from "@/modules/auth/server/session";
import { isAdminEmail } from "@/shared/lib/env";
import { db } from "@/shared/lib/db";
import { AppPageHero } from "@/shared/components/app-page-hero";
import { AdminApplicationActions } from "@/modules/marketplace/components/admin/admin-application-actions";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: { status?: string };
};

const STATUS_BADGE: Record<
  DirectoryApplicationStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-100 text-amber-900",
  },
  REVIEWING: {
    label: "Reviewing",
    className: "bg-sky-100 text-sky-900",
  },
  APPROVED: {
    label: "Approved",
    className: "bg-emerald-100 text-emerald-900",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-neutral-200 text-neutral-800",
  },
};

function parseStatusFilter(value: string | undefined): DirectoryApplicationStatus | "ALL" {
  if (!value || value === "all") return "ALL";
  if (value === "PENDING" || value === "REVIEWING" || value === "APPROVED" || value === "REJECTED") {
    return value;
  }
  return "PENDING";
}

export default async function AdminApplicationsPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    redirect("/login");
  }

  const statusFilter = parseStatusFilter(searchParams.status);

  const [applications, pendingCount] = await Promise.all([
    db.directoryApplication.findMany({
      where: statusFilter === "ALL" ? undefined : { status: statusFilter },
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        category: true,
        listing: { select: { slug: true } },
      },
    }),
    db.directoryApplication.count({ where: { status: "PENDING" } }),
  ]);

  const tabs = [
    { key: "PENDING", label: `Pending (${pendingCount})` },
    { key: "ALL", label: "All" },
    { key: "APPROVED", label: "Approved" },
    { key: "REJECTED", label: "Rejected" },
  ] as const;

  return (
    <>
      <AppPageHero
        eyebrow="Admin"
        title="Join applications — Ruwaq Directory"
        subtitle="Review /join submissions, publish verified listings, or reject with a note."
      />
      <div className="app-content-area space-y-8">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/workspace/admin/leads" className="text-ruwaq-gold hover:underline">
            ← Leads
          </Link>
          <Link href="/workspace/admin/metrics" className="text-ruwaq-ink-soft hover:underline">
            Metrics
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = statusFilter === tab.key;
            const href =
              tab.key === "PENDING"
                ? "/workspace/admin/applications"
                : `/workspace/admin/applications?status=${tab.key.toLowerCase()}`;
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

        <div className="space-y-6">
          {applications.map((application) => {
            const citySlug = citySlugFromEnum(application.city);
            const cityMeta = getCityBySlug(citySlug);
            const categoryMeta = getCategoryBySlug(application.category.slug);
            const badge = STATUS_BADGE[application.status];

            return (
              <article
                key={application.id}
                className="rounded border border-ruwaq-stone bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-ruwaq-ink">{application.companyName}</h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ruwaq-ink-soft">
                      {categoryMeta?.nameEn ?? application.category.slug} ·{" "}
                      {cityMeta?.nameEn ?? citySlug} ·{" "}
                      {application.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                    </p>

                    <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-xs uppercase tracking-widest text-ruwaq-ink-muted">
                          Contact
                        </dt>
                        <dd className="font-medium">{application.contactName}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-widest text-ruwaq-ink-muted">
                          Phone
                        </dt>
                        <dd className="font-mono text-xs" dir="ltr">
                          {application.contactPhone}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-widest text-ruwaq-ink-muted">
                          Email
                        </dt>
                        <dd>{application.contactEmail ?? "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-widest text-ruwaq-ink-muted">
                          CR
                        </dt>
                        <dd>{application.crNumber ?? "—"}</dd>
                      </div>
                    </dl>

                    {application.portfolioUrl ? (
                      <p className="mt-3 text-sm">
                        <span className="text-ruwaq-ink-muted">Portfolio: </span>
                        <a
                          href={application.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-ruwaq-gold hover:underline"
                          dir="ltr"
                        >
                          {application.portfolioUrl}
                        </a>
                      </p>
                    ) : null}

                    {application.message ? (
                      <p className="mt-3 rounded bg-ruwaq-paper p-3 text-sm leading-relaxed text-ruwaq-ink-soft">
                        {application.message}
                      </p>
                    ) : null}

                    {application.reviewNote ? (
                      <p className="mt-3 text-sm text-ruwaq-ink-soft">
                        <span className="font-semibold text-ruwaq-ink">Review note: </span>
                        {application.reviewNote}
                      </p>
                    ) : null}
                  </div>

                  <div className="w-full shrink-0 lg:w-72">
                    <AdminApplicationActions
                      applicationId={application.id}
                      status={application.status}
                      listingSlug={application.listing?.slug}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {applications.length === 0 ? (
          <p className="py-12 text-center text-ruwaq-ink-muted">No applications in this view.</p>
        ) : null}
      </div>
    </>
  );
}
