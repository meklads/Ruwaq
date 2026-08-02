import { redirect } from "next/navigation";
import { getSession } from "@/modules/auth/server/session";
import { isAdminEmail } from "@/shared/lib/env";
import { db } from "@/shared/lib/db";
import { AppPageHero } from "@/shared/components/app-page-hero";
import type { UsageEventType } from "@/shared/lib/usage-events";

export const dynamic = "force-dynamic";

const EVENT_TYPES: { type: UsageEventType; label: string }[] = [
  { type: "proposal_created", label: "عروض أُنشئت" },
  { type: "proposal_generated", label: "عروض ولّدها الذكاء الاصطناعي" },
  { type: "pdf_exported", label: "ملفات PDF صُدّرت" },
  { type: "guest_claimed", label: "زوار سجّلوا حساباً بعد عرض ضيف" },
  { type: "marketplace_lead_submitted", label: "طلبات عرض سعر (marketplace)" },
  { type: "off_plan_brochure_lead", label: "تحميل brochure off-plan" },
  { type: "visualization_lead_submitted", label: "تسجيل CGI / visualization" },
  { type: "pro_apply_click", label: "نقرات انضمام PRO" },
  { type: "tour_shop_click", label: "Shop the Tour" },
  { type: "developer_inquiry", label: "استفسارات المطورين" },
  { type: "server_error", label: "أخطاء سيرفر" },
  { type: "quota_blocked", label: "طلبات مرفوضة (تجاوز الباقة)" },
];

const WINDOWS = [
  { key: "24h", label: "آخر 24 ساعة", ms: 24 * 60 * 60 * 1000 },
  { key: "7d", label: "آخر 7 أيام", ms: 7 * 24 * 60 * 60 * 1000 },
  { key: "30d", label: "آخر 30 يوماً", ms: 30 * 24 * 60 * 60 * 1000 },
] as const;

async function countsFor(type: UsageEventType) {
  const now = Date.now();
  const [h24, d7, d30, allTime] = await Promise.all([
    db.usageEvent.count({
      where: { type, createdAt: { gte: new Date(now - WINDOWS[0].ms) } },
    }),
    db.usageEvent.count({
      where: { type, createdAt: { gte: new Date(now - WINDOWS[1].ms) } },
    }),
    db.usageEvent.count({
      where: { type, createdAt: { gte: new Date(now - WINDOWS[2].ms) } },
    }),
    db.usageEvent.count({ where: { type } }),
  ]);
  return { h24, d7, d30, allTime };
}

export default async function AdminMetricsPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin/metrics");
  if (!isAdminEmail(session.user.email)) redirect("/proposals");

  const [rows, distinctUsers7d, last14Days, recentErrors] = await Promise.all([
    Promise.all(
      EVENT_TYPES.map(async ({ type, label }) => ({
        type,
        label,
        ...(await countsFor(type)),
      }))
    ),
    db.usageEvent.findMany({
      where: {
        type: "proposal_created",
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        userId: { not: null },
      },
      distinct: ["userId"],
      select: { userId: true },
    }),
    db.$queryRaw<{ day: Date; count: bigint }[]>`
      SELECT date_trunc('day', "createdAt") as day, COUNT(*)::bigint as count
      FROM "UsageEvent"
      WHERE "type" = 'proposal_created' AND "createdAt" >= NOW() - INTERVAL '14 days'
      GROUP BY day
      ORDER BY day DESC
    `.catch(() => [] as { day: Date; count: bigint }[]),
    db.usageEvent.findMany({
      where: { type: "server_error" },
      orderBy: { createdAt: "desc" },
      take: 15,
      select: { id: true, createdAt: true, metadata: true, proposalId: true },
    }),
  ]);

  const created = rows.find((r) => r.type === "proposal_created");
  const generated = rows.find((r) => r.type === "proposal_generated");
  const exported = rows.find((r) => r.type === "pdf_exported");
  const marketplaceLeads = rows.find((r) => r.type === "marketplace_lead_submitted");
  const brochureLeads = rows.find((r) => r.type === "off_plan_brochure_lead");
  const vizLeads = rows.find((r) => r.type === "visualization_lead_submitted");

  const genRate7d =
    created && created.d7 > 0 && generated
      ? Math.round((generated.d7 / created.d7) * 100)
      : null;
  const exportRate7d =
    generated && generated.d7 > 0 && exported
      ? Math.round((exported.d7 / generated.d7) * 100)
      : null;

  return (
    <>
      <AppPageHero
        eyebrow="لوحة داخلية"
        title="مؤشرات الاستخدام"
        subtitle="أرقام حقيقية من قاعدة البيانات — بدون خدمة خارجية."
      />
      <div className="app-content-area max-w-4xl space-y-10">
        <section>
          <h2 className="mb-3 text-sm font-semibold text-ruwaq-ink">
            الأحداث
          </h2>
          <div className="overflow-hidden rounded-2xl border border-ruwaq-stone/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ruwaq-canvas-soft text-start text-xs text-ruwaq-ink-muted">
                  <th className="px-4 py-3 text-start font-medium">الحدث</th>
                  <th className="px-4 py-3 text-start font-medium">24 ساعة</th>
                  <th className="px-4 py-3 text-start font-medium">7 أيام</th>
                  <th className="px-4 py-3 text-start font-medium">30 يوماً</th>
                  <th className="px-4 py-3 text-start font-medium">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.type} className="border-t border-ruwaq-stone/50">
                    <td className="px-4 py-3 font-medium text-ruwaq-ink">{r.label}</td>
                    <td className="px-4 py-3 tabular-nums">{r.h24}</td>
                    <td className="px-4 py-3 tabular-nums">{r.d7}</td>
                    <td className="px-4 py-3 tabular-nums">{r.d30}</td>
                    <td className="px-4 py-3 tabular-nums font-semibold">{r.allTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-ruwaq-ink">
            قمع التحويل (آخر 7 أيام)
          </h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="rounded-2xl border border-ruwaq-stone/50 px-5 py-4">
              <div className="text-xs text-ruwaq-ink-muted">مستخدمون فريدون أنشؤوا عرضاً</div>
              <div className="mt-1 text-2xl font-bold text-ruwaq-ink">
                {distinctUsers7d.length}
              </div>
            </div>
            <div className="rounded-2xl border border-ruwaq-stone/50 px-5 py-4">
              <div className="text-xs text-ruwaq-ink-muted">معدل التوليد بالذكاء الاصطناعي</div>
              <div className="mt-1 text-2xl font-bold text-ruwaq-ink">
                {genRate7d !== null ? `${genRate7d}%` : "—"}
              </div>
            </div>
            <div className="rounded-2xl border border-ruwaq-stone/50 px-5 py-4">
              <div className="text-xs text-ruwaq-ink-muted">معدل تصدير PDF بعد التوليد</div>
              <div className="mt-1 text-2xl font-bold text-ruwaq-ink">
                {exportRate7d !== null ? `${exportRate7d}%` : "—"}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-ruwaq-ink">
            قمع السوق (آخر 7 أيام)
          </h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="rounded-2xl border border-ruwaq-stone/50 px-5 py-4">
              <div className="text-xs text-ruwaq-ink-muted">طلبات عرض سعر</div>
              <div className="mt-1 text-2xl font-bold text-ruwaq-ink">
                {marketplaceLeads?.d7 ?? 0}
              </div>
            </div>
            <div className="rounded-2xl border border-ruwaq-stone/50 px-5 py-4">
              <div className="text-xs text-ruwaq-ink-muted">brochure off-plan</div>
              <div className="mt-1 text-2xl font-bold text-ruwaq-ink">
                {brochureLeads?.d7 ?? 0}
              </div>
            </div>
            <div className="rounded-2xl border border-ruwaq-stone/50 px-5 py-4">
              <div className="text-xs text-ruwaq-ink-muted">تسجيل CGI</div>
              <div className="mt-1 text-2xl font-bold text-ruwaq-ink">
                {vizLeads?.d7 ?? 0}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-ruwaq-ink">
            عروض جديدة يومياً — آخر 14 يوماً
          </h2>
          {last14Days.length === 0 ? (
            <p className="text-sm text-ruwaq-ink-muted">لا بيانات كافية بعد.</p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-ruwaq-stone/50">
              <table className="w-full text-sm">
                <tbody>
                  {last14Days.map((d) => (
                    <tr key={d.day.toISOString()} className="border-t border-ruwaq-stone/50 first:border-t-0">
                      <td className="px-4 py-2 text-ruwaq-ink-muted">
                        {new Date(d.day).toLocaleDateString("ar-SA", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-2 tabular-nums font-medium text-ruwaq-ink">
                        {Number(d.count)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-ruwaq-ink">
            آخر أخطاء السيرفر
          </h2>
          {recentErrors.length === 0 ? (
            <p className="text-sm text-ruwaq-ink-muted">لا أخطاء مسجّلة — تمام.</p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-ruwaq-stone/50">
              <table className="w-full text-sm">
                <tbody>
                  {recentErrors.map((e) => {
                    const meta = (e.metadata ?? {}) as {
                      context?: string;
                      message?: string;
                    };
                    return (
                      <tr key={e.id} className="border-t border-ruwaq-stone/50 first:border-t-0">
                        <td className="px-4 py-3 align-top text-xs text-ruwaq-ink-muted whitespace-nowrap">
                          {e.createdAt.toLocaleString("ar-SA")}
                        </td>
                        <td className="px-4 py-3 align-top text-xs font-semibold text-ruwaq-ink whitespace-nowrap">
                          {meta.context ?? "—"}
                        </td>
                        <td className="px-4 py-3 align-top text-xs text-red-600">
                          {meta.message ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
