"use client";

import { SessionProvider } from "next-auth/react";
import { LocaleProvider } from "@/shared/i18n/context";
import type { Locale } from "@/shared/i18n/locale";

export function Providers({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </SessionProvider>
  );
}
