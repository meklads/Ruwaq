"use client";

import { Printer } from "lucide-react";
import { trackEvent, type AnalyticsEvent } from "@/shared/lib/analytics";

export function PrintButton({ label, event }: { label: string; event?: AnalyticsEvent }) {
  return (
    <button
      type="button"
      className="rw-btn rw-btn--outline rw-btn--sm rw-no-print"
      onClick={() => {
        if (event) trackEvent(event);
        window.print();
      }}
    >
      <Printer size={16} strokeWidth={1.7} aria-hidden="true" style={{ marginInlineEnd: "0.5rem" }} />
      {label}
    </button>
  );
}
