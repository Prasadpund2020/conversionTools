import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the terms for using Free Converting Tools and its online conversion utilities.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-16 text-slate-800">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-semibold text-emerald-700">
          Free Converting Tools
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Terms of Use</h1>
        <p className="mt-5 leading-7 text-slate-600">
          Use these tools only for lawful purposes and only with files,
          documents, or media that you are authorized to process. You are
          responsible for reviewing every generated file before relying on it.
        </p>
        <h2 className="mt-10 text-xl font-bold">No guarantee of output</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Conversion results depend on the input, browser, and tool
          implementation. The service is provided without a guarantee that
          every input will convert successfully or preserve every feature.
        </p>
        <h2 className="mt-10 text-xl font-bold">Third-party content</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Do not use downloader tools to copy content when doing so violates
          copyright, platform rules, privacy rights, or applicable law.
        </p>
      </article>
    </main>
  );
}
