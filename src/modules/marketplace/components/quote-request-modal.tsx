"use client";

import { useEffect, useRef, useState } from "react";
import { QuoteRequestForm } from "@/modules/marketplace/components/quote-request-form";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  triggerLabel: string;
  closeLabel: string;
  copy: Messages["marketplace"]["quote"];
  visualizationCopy: Messages["marketplace"]["visualization"];
  locale: Locale;
  className?: string;
  initialCity?: string;
  initialCategory?: string;
  initialIntent?: "marketplace" | "visualization";
  initialProjectDetails?: string;
  initialBudgetRange?: string;
  disabled?: boolean;
};

export function QuoteRequestModal({
  triggerLabel,
  closeLabel,
  copy,
  visualizationCopy,
  locale,
  className = "",
  initialCity,
  initialCategory,
  initialIntent = "marketplace",
  initialProjectDetails,
  initialBudgetRange,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        {triggerLabel}
      </button>
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-[100] m-0 h-full max-h-none w-full max-w-none border-0 bg-black/45 p-4 backdrop:bg-black/45 open:flex open:items-center open:justify-center"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
      >
        <div
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-1 shadow-ruwaq-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute end-4 top-4 z-10 rounded-full p-2 text-ruwaq-ink-muted transition hover:bg-ruwaq-linen hover:text-ruwaq-ink"
            onClick={() => setOpen(false)}
            aria-label={closeLabel}
          >
            ✕
          </button>
          <QuoteRequestForm
            key={`${initialCity ?? "jeddah"}-${initialCategory ?? "fit-out"}-${initialIntent}-${initialProjectDetails ?? ""}`}
            copy={copy}
            visualizationCopy={visualizationCopy}
            locale={locale}
            initialCity={initialCity}
            initialCategory={initialCategory}
            initialIntent={initialIntent}
            initialProjectDetails={initialProjectDetails}
            initialBudgetRange={initialBudgetRange}
            variant="modal"
            onSuccessClose={() => setOpen(false)}
          />
        </div>
      </dialog>
    </>
  );
}
