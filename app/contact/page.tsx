import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact and Support",
  description:
    "Get in touch with the Free Converting Tools team regarding bug reports, feature suggestions, unsupported formats, or privacy inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-16 text-slate-800">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-semibold text-emerald-700">
          Free Converting Tools
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Contact and Support</h1>
        <p className="mt-5 leading-7 text-slate-600">
          Need help with a conversion, found a broken link, or want to report
          an inaccurate tool description? Send a concise report with the page
          URL, browser, input format, and the error message. Do not send the
          file itself or include confidential information.
        </p>
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="font-bold text-emerald-900">Support channel</h2>
          <p className="mt-2 text-sm leading-6 text-emerald-800">
            Report bugs and request improvements through the{" "}
            <a
              href="https://github.com/Prasadpund2020/conversionTools/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              public project issue tracker
            </a>
            .
          </p>
        </div>
        <h2 className="mt-10 text-xl font-bold">Before reporting a problem</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-600">
          <li>Confirm that the input format is listed on the tool page.</li>
          <li>Try an up-to-date Chrome, Firefox, Safari, or Edge browser.</li>
          <li>Include steps to reproduce the issue without sharing the file.</li>
        </ul>
      </article>
    </main>
  );
}
