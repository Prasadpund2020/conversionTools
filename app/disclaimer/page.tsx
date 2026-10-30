import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important limitations and responsible-use guidance for Free Converting Tools.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-16 text-slate-800">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-semibold text-emerald-700">
          Free Converting Tools
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Disclaimer</h1>
        <p className="mt-5 leading-7 text-slate-600">
          Free Converting Tools provides general-purpose utilities, not legal,
          financial, medical, archival, or security advice. Check important
          results against the original source and keep backups of important
          files.
        </p>
        <h2 className="mt-10 text-xl font-bold">Privacy and security</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Client-side processing can reduce file transmission, but it does not
          replace device security, browser security, or safe handling of
          downloaded files. Review each tool page for its specific behavior.
        </p>
        <h2 className="mt-10 text-xl font-bold">Accuracy and availability</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Features, supported formats, and availability may change as the
          project is maintained. Unsupported or corrupted inputs may produce
          errors or incomplete output.
        </p>
      </article>
    </main>
  );
}
