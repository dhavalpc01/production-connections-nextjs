import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans, Outfit } from "next/font/google";
import "./(site)/globals.css";

// With one root layout per ported WordPress page there is no single layout to
// build a 404 from, so unmatched URLs land here (experimental.globalNotFound).
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page not found - Production Connections",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en-US" className={`${outfit.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">404</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">That page took the day off.</h1>
        <p className="mt-6 text-muted">The link is wrong or the page moved. Start from the top.</p>
        <Link href="/" className="glass-amber glass-edge mt-10 inline-block rounded-full px-6 py-3 font-semibold text-white">
          Back to Home
        </Link>
      </body>
    </html>
  );
}
