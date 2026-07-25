"use client";

import Link from "next/link";

const FALLBACK = {
  ar: {
    title: "حدث خطأ",
    message: "عذراً، حدث خطأ غير متوقع. حاول مرة أخرى.",
    retry: "إعادة المحاولة",
    home: "الصفحة الرئيسية",
  },
  en: {
    title: "Something went wrong",
    message: "Sorry, an unexpected error occurred. Please try again.",
    retry: "Try again",
    home: "Home",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const lang =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en"
      ? "en"
      : "ar";
  const t = FALLBACK[lang];
  const detail =
    error?.message &&
    !error.message.includes("Server Components render") &&
    error.message.length < 280
      ? error.message
      : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-xl font-bold text-ruwaq-ink">{t.title}</h1>
      <p className="mt-2 max-w-md text-sm text-ruwaq-ink-soft">
        {detail ?? t.message}
      </p>
      {error?.digest ? (
        <p className="mt-2 text-xs text-ruwaq-ink-muted">#{error.digest}</p>
      ) : null}
      <div className="mt-6 flex gap-3">
        <button onClick={reset} className="btn-ruwaq-primary px-4 py-2">
          {t.retry}
        </button>
        <Link href="/proposals/new" className="btn-ruwaq-secondary px-4 py-2">
          {t.home}
        </Link>
      </div>
    </div>
  );
}
