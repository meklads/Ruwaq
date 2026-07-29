"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type ContractorNavItem = {
  href: string;
  label: string;
};

type Props = {
  hubLabel: string;
  items: ContractorNavItem[];
  className?: string;
};

export function ContractorNavMenu({ hubLabel, items, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-ruwaq-header-gold inline-flex gap-1.5 px-4 py-2.5 text-xs sm:px-5 sm:text-sm"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {hubLabel}
        <span className="text-[0.65rem] opacity-80" aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute end-0 top-[calc(100%+0.5rem)] z-50 min-w-[15rem] rounded-2xl border border-ruwaq-stone/80 bg-white py-2 shadow-ruwaq-lg ring-1 ring-black/5"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block px-4 py-2.5 text-sm font-medium text-ruwaq-ink transition hover:bg-ruwaq-linen"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
