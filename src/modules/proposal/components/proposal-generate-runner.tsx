"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/shared/i18n/context";
import { TierUpgradeModal } from "@/modules/billing/components/tier-upgrade-modal";
import type { CompanyEntitlements } from "@/modules/billing/server/entitlements.service";

type Props = {
  proposalId: string;
  editKey?: string;
};

function mapGenerateError(message: string, fallback: string): string {
  if (
    message.includes("fetch failed") ||
    message.includes("Failed to fetch") ||
    message.includes("NetworkError") ||
    message.includes("Load failed")
  ) {
    return "انقطع الاتصال أثناء التوليد. تحقق من الإنترنت ثم أعد المحاولة.";
  }
  if (
    message.includes("Clause pack not found") ||
    message.includes("CLAUSE_PACK_NOT_FOUND")
  ) {
    return "مكتبة البنود لم تُحمَّل بعد. انتظر دقيقة ثم أعد المحاولة، أو أعد نشر التطبيق.";
  }
  return message || fallback;
}

type GateCode = "SIGN_IN_REQUIRED" | "PROFILE_INCOMPLETE" | "QUOTA_EXCEEDED";

export function ProposalGenerateRunner({ proposalId, editKey }: Props) {
  const t = useT();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [gate, setGate] = useState<GateCode | null>(null);
  const [quotaEntitlements, setQuotaEntitlements] = useState<CompanyEntitlements | null>(
    null
  );
  const [progress, setProgress] = useState(15);
  const started = useRef(false);

  const runGenerate = useCallback(async () => {
    setError(null);
    setGate(null);
    setQuotaEntitlements(null);
    setProgress(25);

    const timer = window.setInterval(() => {
      setProgress((p) => (p < 90 ? p + 4 : p));
    }, 2500);

    try {
      const res = await fetch(`/api/proposals/${proposalId}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editKey ? { editKey } : {}),
        credentials: "same-origin",
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        code?: GateCode;
        entitlements?: CompanyEntitlements;
      };

      if (!res.ok || !data.success) {
        if (
          data.code === "SIGN_IN_REQUIRED" ||
          data.code === "PROFILE_INCOMPLETE" ||
          data.code === "QUOTA_EXCEEDED"
        ) {
          setGate(data.code);
          if (data.code === "QUOTA_EXCEEDED" && data.entitlements) {
            setQuotaEntitlements(data.entitlements);
          }
          setProgress(0);
          return;
        }
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      setProgress(100);
      const stripKey = editKey
        ? window.location.pathname
        : `/proposals/${proposalId}`;
      router.replace(stripKey);
      router.refresh();
    } catch (err) {
      const raw = err instanceof Error ? err.message : t.form.errors.generic;
      setError(mapGenerateError(raw, t.form.errors.generic));
      setProgress(0);
    } finally {
      window.clearInterval(timer);
    }
  }, [proposalId, editKey, router, t.form.errors.generic]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void runGenerate();
  }, [runGenerate]);

  if (gate === "QUOTA_EXCEEDED") {
    return (
      <>
        <TierUpgradeModal
          open
          onClose={() => setGate(null)}
          entitlements={quotaEntitlements}
          upgradeHref="/pricing"
        />
        <div className="app-content-area max-w-xl py-16 text-center">
          <p className="text-sm text-neutral-500">{t.gates.quotaExceeded}</p>
        </div>
      </>
    );
  }

  if (gate) {
    const gateContent: Record<
      GateCode,
      { message: string; ctaLabel: string; href: string }
    > = {
      SIGN_IN_REQUIRED: {
        message: t.gates.signInRequired,
        ctaLabel: t.gates.signInCta,
        href: `/login?callbackUrl=${encodeURIComponent(
          typeof window !== "undefined" ? window.location.pathname : "/"
        )}`,
      },
      PROFILE_INCOMPLETE: {
        message: t.gates.profileIncomplete,
        ctaLabel: t.gates.profileIncompleteCta,
        href: "/workspace/settings/company",
      },
      QUOTA_EXCEEDED: {
        message: t.gates.quotaExceeded,
        ctaLabel: t.gates.quotaExceededCta,
        href: "/pricing",
      },
    };
    const content = gateContent[gate];
    return (
      <div className="app-content-area max-w-xl">
        <div className="ruwaq-pro-join-form border-neutral-200">
          <p className="text-sm leading-relaxed text-neutral-700">{content.message}</p>
          <a href={content.href} className="ruwaq-pro-btn-solid mt-6 inline-block px-6 py-3">
            {content.ctaLabel}
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-content-area max-w-xl">
        <div className="ruwaq-pro-join-form border-neutral-200">
          <p className="text-sm leading-relaxed text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => void runGenerate()}
            className="ruwaq-pro-btn-solid mt-4 px-6 py-2"
          >
            {t.errors.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-content-area flex flex-col items-center justify-center py-16">
      <div className="h-0.5 w-full max-w-md overflow-hidden bg-neutral-200">
        <div
          className="h-full bg-neutral-950 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-neutral-600">
        {progress < 50 ? t.form.generatingAnalyze : t.form.generatingWrite}
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-widest text-neutral-400">
        {t.form.generatingWaitHint}
      </p>
    </div>
  );
}
