"use client";

import { trackEvent, type AnalyticsEvent } from "@/shared/lib/analytics";

/** External/anchor link that records one analytics event on click. */
export function TrackedLink({
  href,
  event,
  className,
  children,
  external = false,
}: {
  href: string;
  event: AnalyticsEvent;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent(event)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
