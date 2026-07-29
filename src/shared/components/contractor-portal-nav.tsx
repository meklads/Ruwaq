"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkItem = { href: string; label: string; key: string };

type Props = {
  links: LinkItem[];
};

export function ContractorPortalNav({ links }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/proposals") {
      return pathname === "/proposals" || pathname === "/workspace/proposals";
    }
    if (href === "/proposals/new") {
      return pathname.endsWith("/proposals/new");
    }
    if (href.includes("/templates/sample")) {
      return pathname.includes("/templates/sample");
    }
    if (href.includes("/settings/company")) {
      return pathname.includes("/settings/company");
    }
    return pathname === href;
  };

  return (
    <nav className="flex flex-1 flex-wrap items-center justify-center gap-1 sm:gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
            isActive(link.href)
              ? "bg-ruwaq-gold text-[#0f2c59]"
              : "text-white/90 hover:bg-white/10"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
