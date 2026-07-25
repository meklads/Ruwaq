"use client";

import { useRouter } from "next/navigation";
import { deleteProposalAction, duplicateProposalAction } from "@/modules/proposal/server/proposal.actions";
import { useT } from "@/shared/i18n/context";

interface Props {
  proposalId: string;
}

export function ProposalListActions({ proposalId }: Props) {
  const t = useT();
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(t.list.deleteConfirm)) return;
    const result = await deleteProposalAction(proposalId);
    if (result.success) {
      router.refresh();
    } else if (!result.success) {
      alert(result.error ?? t.form.errors.generic);
    }
  };

  const handleDuplicate = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await duplicateProposalAction(proposalId);
    if (result.success && result.id) {
      router.push(`/proposals/${result.id}`);
    } else if (!result.success) {
      alert(result.error ?? t.form.errors.generic);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDuplicate}
        className="rounded px-2 py-1 text-xs text-ruwaq-ink-muted hover:bg-ruwaq-linen hover:text-ruwaq-ink"
      >
        {t.list.duplicate}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50"
      >
        {t.list.delete}
      </button>
    </div>
  );
}
