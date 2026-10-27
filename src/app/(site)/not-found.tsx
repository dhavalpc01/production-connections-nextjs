import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-32 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">404</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">That page took the day off.</h1>
      <p className="mt-6 text-muted">The link is wrong or the page moved. Start from the top.</p>
      <Link href="/" className="glass-amber glass-edge mt-10 inline-block rounded-full px-6 py-3 font-semibold text-white">
        Back to Home
      </Link>
    </section>
  );
}
