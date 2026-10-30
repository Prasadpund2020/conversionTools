import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Free Converting Tools provides browser-based file conversion and utility tools.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-16 text-slate-800">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-semibold text-emerald-700">
          Free Converting Tools
        </Link>
        <h1 className="mt-6 text-3xl font-bold">About Free Converting Tools</h1>
        <p className="mt-5 leading-7 text-slate-600">
          Free Converting Tools is a collection of browser-based utilities for
          common PDF, image, audio, video, and file conversion tasks. The tools
          are designed to be straightforward to use without requiring an
          account.
        </p>
        <h2 className="mt-10 text-xl font-bold">How processing works</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Where a tool is marked client-side, processing happens in your
          browser. The exact supported formats and limitations are shown on
          each tool page. Do not upload confidential files to a tool unless its
          page explicitly explains the processing path.
        </p>
        <h2 className="mt-10 text-xl font-bold">Explore the tools</h2>
        <p className="mt-3 leading-7 text-slate-600">
          <Link href="/all-tools" className="font-semibold text-emerald-700">
            Browse all available tools
          </Link>{" "}
          or start with the{" "}
          <Link href="/all-tools/pdf" className="font-semibold text-emerald-700">
            PDF tools collection
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
