import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">
        This page could not be found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
        The tool or page may have moved. Browse the available conversion tools
        to find what you need.
      </p>
      <Link
        href="/all-tools"
        className="mt-8 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-slate-700"
      >
        Browse all tools
      </Link>
    </main>
  );
}
