"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { claimProposalAction } from "@/modules/proposal/server/proposal.actions";
import { useT } from "@/shared/i18n/context";

interface Props {
  proposalId: string;
  isGuest: boolean;
}

export function ClaimProposal({ proposalId, isGuest }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useT();
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isGuest || status !== "authenticated" || !session?.user?.id || claimed) {
      return;
    }

    let cancelled = false;
    (async () => {
      const result = await claimProposalAction(proposalId);
      if (cancelled) return;
      if (result.success) {
        setClaimed(true);
        router.refresh();
      } else if (result.error) {
        setError(result.error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isGuest, status, session?.user?.id, proposalId, claimed, router]);

  if (!isGuest || status === "loading") return null;

  if (claimed) {
    return (
      <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
        {t.review.claimSuccess}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="mb-4 ruwaq-notice-info">
        {t.review.claiming}
      </div>
    );
  }

  return (
    <div className="mb-4 ruwaq-notice-info">
      <Link
        href={`/login?callbackUrl=${encodeURIComponent(`/proposals/${proposalId}?claim=1`)}`}
        className="font-semibold underline"
      >
        {t.review.guestLink}
      </Link>{" "}
      {t.review.guestBanner}
    </div>
  );
}
