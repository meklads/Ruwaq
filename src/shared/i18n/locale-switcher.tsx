"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocaleAction } from "./actions";
import type { Locale } from "./locale";
import { useLocale } from "./context";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale || pending) return;
    startTransition(async () => {
      await setLocaleAction(next);
      router.refresh();
    });
  };

  return (
    <div
      className="flex rounded-full border border-slate-200 bg-ruwaq-canvas-soft p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => switchTo("ar")}
        disabled={pending}
        className={`rounded-full px-3 py-1.5 transition-all duration-300 ease-apple ${
          locale === "ar"
            ? "bg-ruwaq-ink text-white shadow-sm"
            : "text-ruwaq-ink-muted hover:text-ruwaq-ink"
        }`}
      >
        عربي
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        disabled={pending}
        className={`rounded-full px-3 py-1.5 transition-all duration-300 ease-apple ${
          locale === "en"
            ? "bg-ruwaq-ink text-white shadow-sm"
            : "text-ruwaq-ink-muted hover:text-ruwaq-ink"
        }`}
      >
        EN
      </button>
    </div>
  );
}
