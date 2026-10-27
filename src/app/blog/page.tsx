import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Blog", path: "/blog/" });

// WP: posts live only in the database (inc/blog-grid-order.php sets the order).
// Export them before converting — they are not in the build scripts.
export default function BlogPage() {
  return <PagePlaceholder eyebrow="Resources" title="Blog" />;
}
