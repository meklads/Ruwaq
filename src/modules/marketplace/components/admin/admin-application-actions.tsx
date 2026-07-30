"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";
import {
  approveDirectoryApplication,
  rejectDirectoryApplication,
  type AdminApplicationActionResult,
} from "@/modules/marketplace/server/admin-applications.actions";

type Props = {
  applicationId: string;
  status: string;
  listingSlug?: string | null;
};

const ERROR_LABELS: Record<string, string> = {
  unauthorized: "Sign in as admin.",
  not_found: "Application not found.",
  already_reviewed: "Already reviewed.",
  validation: "Check the note (min 10 characters).",
  server: "Something went wrong. Try again.",
};

export function AdminApplicationActions({ applicationId, status, listingSlug }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [tier, setTier] = useState<"VERIFIED" | "PRO">("VERIFIED");
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isPending = status === "PENDING" || status === "REVIEWING";

  const handleResult = (result: AdminApplicationActionResult) => {
    if (result.success) {
      setError(null);
      setSuccess(
        result.listingSlug
          ? `Published at /listing/${result.listingSlug}`
          : "Application updated."
      );
      setRejectOpen(false);
      startTransition(() => router.refresh());
      return;
    }
    setError(ERROR_LABELS[result.error] ?? "Request failed.");
  };

  const onApprove = () => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await approveDirectoryApplication({ applicationId, tier });
      handleResult(result);
    });
  };

  const onReject = () => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await rejectDirectoryApplication({ applicationId, reviewNote: rejectNote });
      handleResult(result);
    });
  };

  if (status === "APPROVED" && listingSlug) {
    return (
      <Link href={`/listing/${listingSlug}`} className="text-sm font-semibold text-ruwaq-gold hover:underline">
        View listing →
      </Link>
    );
  }

  if (!isPending) {
    return <span className="text-xs text-ruwaq-ink-muted">—</span>;
  }

  return (
    <div className="space-y-3">
      {!rejectOpen ? (
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded border border-ruwaq-stone bg-white px-2 py-1.5 text-xs"
            value={tier}
            onChange={(e) => setTier(e.target.value as "VERIFIED" | "PRO")}
            disabled={pending}
          >
            <option value="VERIFIED">Verified</option>
            <option value="PRO">PRO</option>
          </select>
          <button
            type="button"
            className="btn-ruwaq-primary px-3 py-1.5 text-xs disabled:opacity-50"
            onClick={onApprove}
            disabled={pending}
          >
            {pending ? "Publishing…" : "Approve & publish"}
          </button>
          <button
            type="button"
            className="rounded border border-neutral-300 px-3 py-1.5 text-xs font-semibold hover:bg-neutral-50 disabled:opacity-50"
            onClick={() => setRejectOpen(true)}
            disabled={pending}
          >
            Reject
          </button>
        </div>
      ) : (
        <div className="space-y-2 rounded border border-ruwaq-stone bg-ruwaq-paper p-3">
          <label className="block text-xs font-semibold text-ruwaq-ink-muted">
            Rejection note (sent to applicant if email provided)
          </label>
          <textarea
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            rows={3}
            value={rejectNote}
            onChange={(e) => setRejectNote(e.target.value)}
            placeholder="Explain what is missing (CR, portfolio, licenses…)"
            disabled={pending}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
              onClick={onReject}
              disabled={pending || rejectNote.trim().length < 10}
            >
              {pending ? "Sending…" : "Confirm reject"}
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-xs text-ruwaq-ink-soft hover:underline"
              onClick={() => {
                setRejectOpen(false);
                setRejectNote("");
              }}
              disabled={pending}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error ? <p className="text-xs text-red-700">{error}</p> : null}
      {success ? <p className="text-xs text-emerald-700">{success}</p> : null}
    </div>
  );
}
