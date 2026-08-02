"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  className?: string;
  mobile?: boolean;
};

export function ProjectsNavLink({ label, className, mobile }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const href = isHome ? "/#off-plan-launches" : "/projects";
  const linkClass = mobile ? "ruwaq-ad-mobile-nav-link" : "ruwaq-ad-nav-link";

  return (
    <Link href={href} className={className ?? linkClass}>
      {label}
    </Link>
  );
}
