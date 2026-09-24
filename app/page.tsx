import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-5 py-32 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_50%)]" />

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-[-0.06em] text-black lg:text-6xl">
            Take control of your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              time.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-black/60">
            AI-powered planning, deep focus sessions, and smart scheduling for professionals.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-black px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Get started free
              <span>→</span>
            </Link>

            <Link
              href="/features"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-black/15 bg-white px-6 text-sm font-semibold text-black transition hover:bg-black/[0.025]"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}