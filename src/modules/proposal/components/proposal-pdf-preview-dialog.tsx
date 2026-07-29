"use client";

import * as Dialog from "@radix-ui/react-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfUrl: string;
  title: string;
  closeLabel: string;
};

export function ProposalPdfPreviewDialog({
  open,
  onOpenChange,
  pdfUrl,
  title,
  closeLabel,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[201] flex h-[min(90vh,820px)] w-[min(96vw,920px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-ruwaq-lg">
          <div className="flex items-center justify-between border-b border-ruwaq-stone/50 px-4 py-3">
            <Dialog.Title className="text-sm font-bold text-ruwaq-ink">{title}</Dialog.Title>
            <Dialog.Close className="rounded-lg px-3 py-1.5 text-xs font-semibold text-ruwaq-ink-muted hover:bg-ruwaq-linen">
              {closeLabel}
            </Dialog.Close>
          </div>
          <iframe
            title={title}
            src={pdfUrl}
            className="min-h-0 flex-1 border-0 bg-slate-100"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
