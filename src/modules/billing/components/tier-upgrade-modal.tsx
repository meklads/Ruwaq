"use client";

import Link from "next/link";
import type { CompanyEntitlements } from "@/modules/billing/server/entitlements.service";

type Props = {
  open: boolean;
  onClose: () => void;
  entitlements?: CompanyEntitlements | null;
  upgradeHref?: string;
};

export function TierUpgradeModal({
  open,
  onClose,
  entitlements,
  upgradeHref = "/pricing",
}: Props) {
  if (!open) return null;

  const used = entitlements?.usedThisMonth ?? 3;
  const limit = entitlements?.monthlyLimit ?? 3;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tier-upgrade-title"
    >
      <div className="w-full max-w-lg border border-neutral-200 bg-white p-8 shadow-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          RUWAQ PRO
        </p>
        <h2
          id="tier-upgrade-title"
          className="mt-3 font-serif text-2xl font-medium tracking-tight text-neutral-950 md:text-3xl"
        >
          ترقية حسابك لإنشاء المزيد من العروض
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          لقد استنفدت الحد المجاني ({limit} عروض — استخدمت {used}). اشترك في باقة{" "}
          <strong className="font-semibold text-neutral-950">Ruwaq Verified</strong> لفتح 30
          عرضاً شهرياً والحصول على شارة التوثيق في الدليل.
        </p>

        <ul className="mt-6 space-y-2 border-s border-neutral-950 ps-4 text-sm text-neutral-700">
          <li>30 عرضاً شهرياً + بنود قانونية كاملة</li>
          <li>PDF نظيف بدون علامة مائية</li>
          <li>شارة «معتمد» في دليل Ruwaq PRO</li>
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={upgradeHref}
            className="ruwaq-pro-btn-solid flex-1 py-3 text-center"
            onClick={onClose}
          >
            ترقية الحساب الآن
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="ruwaq-pro-btn-outline flex-1 py-3"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
