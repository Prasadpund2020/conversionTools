import Link from "next/link";
import type { ReactNode } from "react";

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideLink = {
  href: string;
  title: string;
  description: string;
};

type ToolPageGuideProps = {
  explanationTitle: string;
  explanation: ReactNode;
  stepsTitle: string;
  steps: string[];
  formats: string;
  details: { title: string; body: string }[];
  privacy: string;
  useCases: string[];
  faqs: GuideFaq[];
  linksTitle?: string;
  links?: GuideLink[];
};

export function faqPageJsonLd(faqs: GuideFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function ToolPageIntro({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <header className="mb-5 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {lede}
      </p>
    </header>
  );
}

export default function ToolPageGuide({
  explanationTitle,
  explanation,
  stepsTitle,
  steps,
  formats,
  details,
  privacy,
  useCases,
  faqs,
  linksTitle = "Related tools",
  links = [],
}: ToolPageGuideProps) {
  return (
    <div className="mt-12 flex flex-col gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(faqs)),
        }}
      />

      <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          {explanationTitle}
        </h2>
        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
          {explanation}
        </div>
      </section>

      <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          {stepsTitle}
        </h2>
        <ol className="list-decimal list-inside flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          Formats, features, and limits
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {formats}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="p-4 rounded-2xl bg-stone-50/80 dark:bg-slate-800/60 border border-stone-200/60 dark:border-slate-700"
            >
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
                {detail.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {detail.body}
              </p>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-5 mb-1">
          Privacy
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {privacy}
        </p>
      </section>

      <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          Common uses
        </h2>
        <ul className="list-disc list-inside flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Frequently asked questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
                {faq.question}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {links.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            {linksTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-stone-200/80 dark:border-slate-800 hover:border-stone-300 transition-colors"
              >
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                  {link.title}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {link.description}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
