import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Free Converting Tools protects your privacy through local in-browser processing, zero server storage, and strict data safeguards.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-16 text-slate-800">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-semibold text-emerald-700">
          Free Converting Tools
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-5 leading-7 text-slate-600">
          This page explains the general privacy approach for Free Converting
          Tools. Tool pages identify when processing occurs in your browser.
        </p>
        <h2 className="mt-10 text-xl font-bold">Files and tool processing</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Client-side tools process selected files in browser memory and are
          designed not to upload those files to our servers. Browser extensions,
          network services, and downloader tools may have different behavior;
          review the individual tool instructions before use.
        </p>
        <h2 className="mt-10 text-xl font-bold">Analytics and requests</h2>
        <p className="mt-3 leading-7 text-slate-600">
          The site may receive ordinary technical requests required to serve
          pages and may use hosted analytics configured by the deployment.
          Never enter passwords, payment information, or other sensitive
          personal data into a conversion tool.
        </p>
        <p className="mt-10 text-sm text-slate-500">
          If the site’s processing or analytics configuration changes, this
          policy should be updated before the change is deployed.
        </p>
      </article>
    </main>
  );
}
