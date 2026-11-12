"use client";

import { trackEvent } from "@/shared/lib/analytics";
import type { GroupTarget } from "./schema";

/** One place for the group's addresses, so every referral carries the same campaign tags. */
const BASE: Record<GroupTarget, string> = {
  graphicshouse: "https://www.3dgraphicshouse.com/",
  turriva: "https://turriva.com/",
  beesmotion: "https://beesmotion.com/",
};

export function groupHref(target: GroupTarget, section: string, page: string): string {
  const u = new URL(BASE[target]);
  u.searchParams.set("utm_source", "ruwaq");
  u.searchParams.set("utm_medium", "referral");
  u.searchParams.set("utm_campaign", section);
  u.searchParams.set("utm_content", page);
  return u.toString();
}

/** Outbound link to one group company; records `group_referral` so referrals can be counted per page. */
export function GroupLink({ target, section, page, className, children }: { target: GroupTarget; section: string; page: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={groupHref(target, section, page)}
      className={className}
      target="_blank"
      rel="noopener"
      onClick={() => trackEvent("group_referral", { target, section, page })}
    >
      {children}
    </a>
  );
}
