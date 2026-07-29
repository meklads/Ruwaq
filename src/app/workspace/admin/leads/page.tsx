import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/modules/auth/server/session";
import { isAdminEmail } from "@/shared/lib/env";
import { db } from "@/shared/lib/db";
import { AppPageHero } from "@/shared/components/app-page-hero";
import {
  citySlugFromEnum,
  getCategoryBySlug,
} from "@/shared/constants/marketplace-taxonomy";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const session = await getSession();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    redirect("/login");
  }

  const leads = await db.marketplaceLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { category: true },
  });

  return (
    <>
      <AppPageHero
        eyebrow="Admin"
        title="Leads — Ruwaq Marketplace"
        subtitle="Turriva capture vs partner broadcast"
      />
      <div className="app-content-area overflow-x-auto">
        <p className="mb-6 text-sm text-ruwaq-ink-soft">
          <Link href="/workspace/admin/metrics" className="text-ruwaq-gold hover:underline">
            ← Metrics
          </Link>
        </p>
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ruwaq-stone text-ruwaq-ink-muted">
              <th className="py-2 pe-4">Date</th>
              <th className="py-2 pe-4">Client</th>
              <th className="py-2 pe-4">City</th>
              <th className="py-2 pe-4">Category</th>
              <th className="py-2 pe-4">Status</th>
              <th className="py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const cat = getCategoryBySlug(lead.category.slug);
              return (
                <tr key={lead.id} className="border-b border-ruwaq-stone/50">
                  <td className="py-3 pe-4 whitespace-nowrap text-xs text-ruwaq-ink-muted">
                    {lead.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="py-3 pe-4 font-medium">{lead.clientName}</td>
                  <td className="py-3 pe-4">{citySlugFromEnum(lead.city)}</td>
                  <td className="py-3 pe-4">{cat?.nameAr ?? lead.category.slug}</td>
                  <td className="py-3 pe-4">
                    <span
                      className={
                        lead.status === "ASSIGNED_TO_TURRIVA"
                          ? "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900"
                          : "rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-900"
                      }
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-xs" dir="ltr">
                    {lead.clientPhone}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {leads.length === 0 && (
          <p className="mt-8 text-center text-ruwaq-ink-muted">No leads yet.</p>
        )}
      </div>
    </>
  );
}
