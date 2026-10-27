"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavLink } from "@/content/site";

/** Off-canvas menu below the lg breakpoint. Nested levels are <details>. */
export function MobileNav({ items }: { items: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="glass-white glass-edge rounded-full px-4 py-2 text-sm font-medium text-white"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-ink-deep px-4 py-6"
        >
          <ul className="space-y-1">
            {items.map((item) => (
              <MobileItem key={item.href} item={item} onNavigate={close} />
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

function MobileItem({ item, onNavigate }: { item: NavLink; onNavigate: () => void }) {
  if (!item.children?.length) {
    return (
      <li>
        <Link href={item.href} onClick={onNavigate} className="block rounded-xl px-3 py-3 text-text hover:text-gold">
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <details>
        <summary className="cursor-pointer list-none rounded-xl px-3 py-3 text-text hover:text-gold">
          {item.label}
        </summary>
        <ul className="ml-3 border-l border-white/10 pl-3">
          <li>
            <Link href={item.href} onClick={onNavigate} className="block px-3 py-2 text-sm text-muted hover:text-gold">
              All {item.label}
            </Link>
          </li>
          {item.children.map((child) => (
            <MobileItem key={child.href} item={child} onNavigate={onNavigate} />
          ))}
        </ul>
      </details>
    </li>
  );
}
