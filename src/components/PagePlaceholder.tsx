import Link from "next/link";

/**
 * Stand-in for a page that has a route but no converted content yet.
 * Each page replaces this with its real sections as it is ported.
 */
export function PagePlaceholder({
  eyebrow,
  title,
  sourceFile,
  links,
}: {
  eyebrow?: string;
  title: string;
  /** WordPress file the copy will be ported from. */
  sourceFile?: string;
  links?: { label: string; href: string }[];
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>}
      <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-muted">
        This page is routed but not converted yet.
        {sourceFile && (
          <>
            {" "}
            Source: <code className="text-gold-soft">{sourceFile}</code>
          </>
        )}
      </p>

      {links && links.length > 0 && (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="glass-dark glass-edge block rounded-2xl p-6 font-heading text-lg text-white transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
