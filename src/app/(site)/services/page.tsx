import Link from "next/link";
import { serviceCategories, servicesInCategory } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Services", path: "/services/" });

// WP: the `services` post-type archive (assets/css/services-stack.css,
// assets/js/pc-service-index.js). /our-services/ redirects here.
export default function ServicesPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">Services</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">What We Do</h1>

      {serviceCategories.map((category) => (
        <div key={category.slug} id={category.slug} className="mt-16 scroll-mt-28">
          <h2 className="text-2xl font-semibold">{category.title}</h2>
          <hr className="fade-line mt-4" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicesInCategory(category.slug).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}/`}
                  className="glass-dark glass-edge block rounded-2xl p-6 font-heading text-lg text-white transition-colors hover:text-gold"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
