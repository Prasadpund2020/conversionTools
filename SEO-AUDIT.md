# Free Converting Tools SEO Audit

**Audit scope:** Next.js App Router source in this repository plus public HTTP checks  
**Audit date:** 2026-10-30  
**Site:** https://freeconvertingtools.co.in  

## Executive summary

The site is crawlable: the live home page, category page, tool page, `robots.txt`, and
`sitemap.xml` responded successfully during this audit. The application already has
route-level metadata, canonical declarations, Open Graph/Twitter metadata, breadcrumbs,
and JSON-LD on most tool routes.

The highest-impact issues are consistency and URL correctness rather than a blanket
indexing block. The site uses `freeconvertingtools.co.in` as its canonical host but the
visual logo says `.com`; metadata and visible copy also alternate between the public
brand and the internal “FileLab” name. The dynamic tool route accepts a category alias
for tools in the `more` category, which can create duplicate URLs. Sitemap timestamps
also use a future hard-coded fallback and filesystem timestamps, which are deployment
timestamps rather than reliable content-change timestamps.

No Google Search Console property or URL Inspection result was available in this
workspace. This report therefore does **not** claim that any URL is indexed.

## Baseline findings

| Category | Status | Finding | Priority |
|---|---|---|---|
| Technical SEO | Needs improvement | App Router metadata is present on the home, index, category, and tool routes, but brand strings are inconsistent (`FileLab`, `.com`, and the `.co.in` site). | High |
| On-page SEO | Needs improvement | Tool pages generally have useful descriptions and related links, but many pages depend on client tool components for visible headings and instructions; coverage is not centrally enforced. | Medium |
| Indexing | Good with caveat | `robots.txt` allows the site and blocks only `/api/`; unpublished tools are excluded from the sitemap and dynamic route metadata uses `noindex`. | Medium |
| Sitemap | Needs improvement | Sitemap URLs are generated from published tools and existing page files, but fallback dates are hard-coded to `2026-10-24` and filesystem `mtime` is not a content timestamp. | High |
| Robots.txt | Good | The live file allows public pages and disallows `/api/`. The repeated bot-specific rules are redundant but not blocking important pages. | Low |
| Structured data | Needs improvement | WebSite, CollectionPage, WebApplication, BreadcrumbList, FAQPage, and HowTo JSON-LD are present. FAQ/HowTo claims must remain synchronized with visible, tool-specific content; generic schemas should not be used where the UI does not show the same answers. | High |
| Core Web Vitals | Unverified | No field or lab measurements were available. The project uses client-heavy tool components and a large hero image; actual LCP/INP/CLS must be measured in PageSpeed Insights or CrUX. | High |
| Image SEO | Needs improvement | The Open Graph PNG assets are large (approximately 770 KB and 460 KB) and image usage needs a complete `alt`/dimension review. | Medium |
| Content quality | Needs improvement | Legal/trust pages (privacy, terms, contact, disclaimer, about) are not represented as first-class routes in the inspected `app` tree. Tool-specific content exists, but quality and factual capability claims vary by page. | High |
| Internal linking | Good with caveat | Footer, category grids, breadcrumbs, and related-tool links provide a strong base. Search/filter interactions are client-side and should not be treated as indexable landing pages. | Medium |
| Security | Needs review | `/api/` is excluded from crawling. Client-side processing claims are generally clear, but downloader/API behavior and privacy copy must be verified against deployment configuration; no secret values were exposed by this audit. | Medium |

## Route and metadata inventory

- 54 `page.tsx` files exist below `app/all-tools`.
- Route-level `metadata` or `generateMetadata` is present in the inspected pages.
- The sitemap includes the home page, `/all-tools`, active categories, and published
  tools with an on-disk route.
- The site has direct hand-authored tool routes plus a dynamic
  `/all-tools/[category]/[slug]` route. This is a duplicate-URL risk unless the dynamic
  route accepts only the tool's canonical category.
- The public sitemap and robots endpoints were reachable during the live check.
- No assertion about Google indexing was made because Search Console access was not
  available.

## Changes implemented from this audit

1. Align the public logo suffix with the canonical `.co.in` host.
2. Make tool lookup strict for canonical category paths, preventing the `more` tools
   from also resolving under `/all-tools/edit-convert/...`.
3. Remove the future hard-coded sitemap fallback and use a route or tool timestamp
   only when it is available.
4. Add a reusable site-level `WebSite` identity with a stable `SearchAction` target and
   consistent public brand metadata.
5. Add indexable About, Privacy Policy, Terms of Use, Disclaimer, and a helpful 404
   route, and link the core legal pages from the footer.
6. Add a contact/support page, exclude unfinished dynamic fallback tool pages from
   indexing, remove generic FAQ/HowTo schema that was not supported by visible
   tool-specific content, and cache immutable static image assets.

## Final implementation status

- **Issue groups identified:** 11 baseline categories in the table above.
- **Critical issues fixed:** 0 identified; no evidence of a site-wide crawl block or
  exposed secret was found.
- **High-priority issues fixed:** 6: public host/brand mismatch, duplicate category
  route resolution, future sitemap fallback dates, missing core trust/legal routes,
  missing support route, and unsupported generic FAQ/HowTo markup on unfinished
  fallback pages.
- **Medium/low issues pending:** re-encoding the social PNG assets without reducing
  preview compatibility, measured Core Web Vitals, tool-by-tool content verification,
  downloader/API privacy validation, and structured-data parity checks on dedicated
  tool pages.
- **Build validation:** `npm run build` passed; `npm run typecheck` passed; targeted
  ESLint validation for the new SEO route files passed. The full lint run still
  reports a pre-existing `HomeClient` hooks warning and unused state variable.
- **Performance measurement:** PageSpeed Insights was opened for the mobile homepage,
  but the live report remained in “Running analysis / data loading”; no LCP, INP,
  CLS, FCP, or TBT values are claimed.
- **Indexing status:** not asserted. Google Search Console access was not available.

## Remaining work and measurement plan

### Pages needing additional content

Prioritize the category pages and the most commercially useful tools: PDF to Word,
Merge PDF, Compress Image, PDF to JPG, Image to PDF, Video to MP3, OCR Scanner, and
the downloader pages. Each should have visible, factual sections for purpose,
supported inputs/outputs, steps, limits, privacy, and FAQs. Do not copy one generic
paragraph across tools.

### Candidate noindex pages

Do not noindex all tool pages. Keep functional, published tools indexable when they
have unique visible content. Noindex unpublished/coming-soon tools and any future
internal search/filter URLs if those URLs become crawlable. API endpoints should remain
blocked from crawling and should not be included in the sitemap.

### Recommended keyword themes

- PDF: `pdf to word converter`, `merge pdf online`, `compress pdf`, `pdf to jpg`,
  `split pdf`, `protect pdf`
- Images: `compress image online`, `jpg to png`, `resize image`, `convert webp`,
  `remove image background`
- Media: `video to mp3`, `trim video online`, `audio converter`, `video to gif`
- Utility: `qr code generator`, `ocr scanner`, `excel to pdf`, `markdown to pdf`

### 30-day roadmap

1. **Days 1–7:** verify every sitemap URL with an automated HTTP 200/canonical check;
   connect Google Search Console; submit the sitemap; inspect representative URLs.
2. **Days 8–14:** add and link privacy, terms, contact, disclaimer, and about pages;
   verify downloader/API privacy and legal copy.
3. **Days 15–21:** improve the eight priority tool pages with unique instructions,
   limits, format tables, and visible FAQs; validate JSON-LD against visible content.
4. **Days 22–30:** measure mobile PageSpeed/CrUX, reduce hero image bytes, inspect
   JavaScript waterfalls, and fix any LCP/INP/CLS regressions.

## Reference standards

- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Central: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Central: Structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google Search Central: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
