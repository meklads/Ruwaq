"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useT } from "@/shared/i18n/context";

export default function LoginForm({
  googleAuthEnabled,
}: {
  googleAuthEnabled: boolean;
}) {
  const t = useT();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/proposals";
  const perks = [
    t.login.perks.profile,
    t.login.perks.support,
    t.login.perks.maintenance,
    t.login.perks.help,
  ];

  return (
    <div className="relative flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-ruwaq-ink">{t.login.title}</h1>
        <p className="mt-1 text-sm text-ruwaq-ink-muted">{t.login.subtitle}</p>

        <ul className="mt-5 space-y-2 rounded-xl border border-ruwaq-stone/50 bg-white p-5 shadow-ruwaq">
          {perks.map((perk) => (
            <li
              key={perk}
              className="flex items-start gap-2 text-xs leading-relaxed text-ruwaq-ink-soft"
            >
              <span className="mt-0.5 text-brand-500" aria-hidden>
                ✓
              </span>
              <span>{perk}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            onClick={() => googleAuthEnabled && signIn("google", { callbackUrl })}
            disabled={!googleAuthEnabled}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-ruwaq-stone bg-white px-4 py-2.5 text-sm font-medium text-ruwaq-ink-soft shadow-ruwaq hover:bg-ruwaq-linen disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t.login.google}
          </button>
          {!googleAuthEnabled && (
            <p className="mt-2 text-center text-xs text-amber-700">
              {t.login.googleUnavailable}
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-ruwaq-ink-muted">{t.login.hint}</p>

        <div className="mt-8 rounded-xl border border-ruwaq-stone/50 bg-ruwaq-linen/60 p-4">
          <p className="text-sm font-medium text-ruwaq-ink">{t.login.servicesTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-ruwaq-ink-muted">
            {t.login.servicesBody}
          </p>
          <Link
            href="/services"
            className="mt-3 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {t.login.servicesCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
