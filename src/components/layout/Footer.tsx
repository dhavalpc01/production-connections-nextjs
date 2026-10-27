import Link from "next/link";
import { footerNav, site } from "@/content/site";

/** WP: Footer 4 (assets/css/footer-4.css). Placeholder until the footer is converted. */
export function Footer() {
  return (
    <footer className="mt-auto bg-ink-deep">
      <hr className="fade-line" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-heading text-xl font-semibold text-white">{site.name}</p>
          <ul className="mt-4 space-y-1 text-sm text-muted">
            <li>
              <a href={site.phone.href} className="hover:text-gold">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </li>
            {site.hours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">{group.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-grey">
        © {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
