import Image from "next/image";
import Link from "next/link";
import { mainNav, site } from "@/content/site";
import { MobileNav } from "./MobileNav";

/**
 * One navbar site-wide (WP: Header 4 via scripts/apply-site-chrome.php).
 * Desktop dropdowns open on hover/focus with CSS only; the third level
 * (individual services / industries) is a flyout, as in the WP theme.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Image src="/images/pc-icon-white.svg" alt="" width={36} height={40} priority />
          <span className="font-heading text-lg font-semibold tracking-tight text-white">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="block rounded-full px-4 py-2 text-sm font-medium text-text transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="glass-edge invisible absolute left-0 top-full bg-ink-deep/95 shadow-2xl min-w-64 rounded-2xl p-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href} className="group/sub relative">
                        <Link
                          href={child.href}
                          className="block rounded-xl px-4 py-2 text-sm text-text hover:bg-white/10 hover:text-gold"
                        >
                          {child.label}
                        </Link>
                        {child.children && child.children.length > 0 && (
                          <ul className="glass-edge invisible absolute left-full top-0 bg-ink-deep/95 shadow-2xl min-w-64 rounded-2xl p-2 opacity-0 transition-opacity group-focus-within/sub:visible group-focus-within/sub:opacity-100 group-hover/sub:visible group-hover/sub:opacity-100">
                            {child.children.map((leaf) => (
                              <li key={leaf.href}>
                                <Link
                                  href={leaf.href}
                                  className="block rounded-xl px-4 py-2 text-sm text-text hover:bg-white/10 hover:text-gold"
                                >
                                  {leaf.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact-us/"
            className="glass-amber glass-edge hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white sm:inline-block"
          >
            Let&rsquo;s Talk
          </Link>
          <MobileNav items={mainNav} />
        </div>
      </div>
    </header>
  );
}
