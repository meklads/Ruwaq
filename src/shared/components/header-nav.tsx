"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; status?: "soon" | "available" };

type Props = {
  labels: {
    knowledge: string; menu: string; openMenu: string; closeMenu: string; soon: string; available: string; subscribers: string;
  };
  knowledge: Item[];
  links: Item[];
  subscribersHref: string;
  localeSwitcher: ReactNode;
};

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
    <path d="M2 4.25 6 8l4-3.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Header navigation: grouped knowledge menu on wide screens, a drawer on small ones. */
export function HeaderNav({ labels, knowledge, links, subscribersHref, localeSwitcher }: Props) {
  const pathname = usePathname() ?? "/";
  const [menu, setMenu] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const group = useRef<HTMLDivElement>(null);

  // Close everything when the page changes, on Escape, and when clicking outside the group.
  useEffect(() => {
    setMenu(false);
    setDrawer(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (group.current && !group.current.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const knowledgeActive = knowledge.some((k) => active(k.href));
  const chip = (s?: Item["status"]) =>
    s ? <span className={`rw-chip rw-chip--${s}`}>{s === "soon" ? labels.soon : labels.available}</span> : null;

  return (
    <>
      <nav className="rw-nav" aria-label={labels.menu}>
        <div className="rw-nav__group" ref={group}>
          <button
            type="button"
            className={`rw-nav__trigger${knowledgeActive ? " is-active" : ""}`}
            aria-expanded={menu}
            aria-controls="rw-knowledge-menu"
            aria-haspopup="true"
            onClick={() => setMenu((v) => !v)}
          >
            {labels.knowledge}
            <Chevron />
          </button>
          {menu && (
            <ul id="rw-knowledge-menu" className="rw-nav__menu">
              {knowledge.map((k) => (
                <li key={k.href}>
                  <Link href={k.href} aria-current={active(k.href) ? "page" : undefined}>
                    <span>{k.label}</span>
                    {chip(k.status)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={active(l.href) ? "is-active" : undefined} aria-current={active(l.href) ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="rw-header__actions">
        <Link href={subscribersHref} className="rw-btn rw-btn--outline rw-btn--sm rw-header__subscribers">
          {labels.subscribers}
        </Link>
        {localeSwitcher}
        <button
          type="button"
          className="rw-burger"
          aria-expanded={drawer}
          aria-controls="rw-drawer"
          aria-label={drawer ? labels.closeMenu : labels.openMenu}
          onClick={() => setDrawer((v) => !v)}
        >
          <span aria-hidden="true" className={`rw-burger__icon${drawer ? " is-open" : ""}`} />
        </button>
      </div>

      {drawer && (
        <div id="rw-drawer" className="rw-drawer" role="dialog" aria-label={labels.menu}>
          <div className="rw-wrap">
            <p className="rw-drawer__label">{labels.knowledge}</p>
            <ul className="rw-drawer__list">
              {knowledge.map((k) => (
                <li key={k.href}>
                  <Link href={k.href} aria-current={active(k.href) ? "page" : undefined}>
                    <span>{k.label}</span>
                    {chip(k.status)}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="rw-drawer__list rw-drawer__list--plain">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={active(l.href) ? "page" : undefined}>
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={subscribersHref} className="rw-btn rw-btn--primary rw-btn--block rw-drawer__cta">
              {labels.subscribers}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
