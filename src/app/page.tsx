import { PagePlaceholder } from "@/components/PagePlaceholder";

// WP: the Home page (Nimo Home 05), copy from scripts/apply-home-copy.php and
// inc/home-copy-render.php, layout fixes in assets/css/home-viewport.css.
export default function HomePage() {
  return (
    <PagePlaceholder
      eyebrow="Home"
      title="Production Connections"
      sourceFile="scripts/apply-home-copy.php"
      links={[
        { label: "Services", href: "/services/" },
        { label: "Industries", href: "/industries/" },
        { label: "About Us", href: "/about-us/" },
        { label: "Contact", href: "/contact-us/" },
      ]}
    />
  );
}
