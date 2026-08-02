"use client";

import Link from "next/link";
import { trackEvent } from "@/shared/lib/analytics";
import { logClientProductEvent } from "@/modules/marketplace/server/product-event.actions";

type LinkItem = {
  href: string;
  label: string;
  event: "pro_apply_click" | "developer_inquiry";
  source: string;
};

type Props = {
  links: LinkItem[];
  primaryClass: string;
  secondaryClass: string;
};

export function ProApplyTrackedLinks({ links, primaryClass, secondaryClass }: Props) {
  const onNavigate = (item: LinkItem) => {
    trackEvent(item.event, { source: item.source });
    void logClientProductEvent(item.event, { source: item.source, href: item.href });
  };

  return (
    <>
      {links.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={index === 0 ? primaryClass : secondaryClass}
          onClick={() => onNavigate(item)}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
