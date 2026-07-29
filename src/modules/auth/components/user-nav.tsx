"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useT } from "@/shared/i18n/context";

export function UserNav() {
  const { data: session, status } = useSession();
  const t = useT();

  if (status === "loading") {
    return <span className="h-9 w-16 animate-pulse rounded-lg bg-ruwaq-cream-bg" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt=""
            className="h-8 w-8 rounded-full ring-2 ring-ruwaq-cream"
          />
        ) : null}
        <span className="hidden max-w-[100px] truncate text-xs font-medium text-ruwaq-navy-soft lg:inline">
          {session.user.name ?? session.user.email}
        </span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/proposals" })}
          className="btn-ruwaq-ghost text-xs"
        >
          {t.nav.signOut}
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="btn-ruwaq-secondary px-4 py-2 text-xs sm:text-sm">
      {t.nav.signIn}
    </Link>
  );
}
