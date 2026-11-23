# MZT Construction — technical SEO audit

## Scope

Technical audit of the source, generated production HTML, local routes, crawler resources and Vercel configuration. Visible copy, layout, CSS, photography, form behaviour and the always-loaded map were left unchanged. No ranking score or measured Core Web Vitals is claimed.

## Priority finding: canonical domain needs confirmation

Canonical URLs, Open Graph URLs, sitemap links, entity identifiers and AI-readable files currently share the existing `SITE_URL`, `https://mzr-const.replit.app`. The final public domain for the Vercel deployment has not yet been confirmed. If Vercel is replacing that address, all of these signals must use the final domain instead. Do not substitute a development or temporary preview hostname.

Once the final domain is confirmed, update the centralized value, rebuild and verify the live output. If the old site remains publicly accessible, redirect it to the final domain where hosting access permits.

## Implemented without visual or copy changes

- Enriched existing `GeneralContractor` structured data with the established six services, service territory, two public telephone contacts and RBQ licence.
- Connected the page entity to the business; identified the quotation route as a `ContactPage`.
- Corrected the structured-data logo to the current approved logo.
- Allowed large image previews in search metadata and supplied the Open Graph image MIME type and Twitter image alternative.
- Aligned the logo preload with the asset actually used by the loader and navigation, avoiding an unnecessary high-priority image request.
- Added permanent redirects from explicit `index.html` aliases to the corresponding clean URLs.
- Added an HTTP noindex directive for API responses and the explicit 404 document.
- Added long-lived immutable caching only for fingerprinted build assets and shorter revalidated caching for fonts.
- Added regression coverage for structured data and deployment SEO configuration.

Vercel redirects and response headers require a new deployment; local Vite does not implement those platform settings.

## Existing foundations verified

- Three public routes have distinct titles and descriptions, a canonical URL and French-Canadian social metadata.
- Per-route HTML includes meaningful content and navigation without requiring JavaScript.
- The site is a React application with simplified static HTML fallbacks, not full server-rendering of every section. Google can render JavaScript, but some other crawlers cannot; the fallback is useful but does not contain every visible section.
- Sitemap and robots resources are generated from central route data rather than served as an HTML SPA fallback.
- Unknown routes are 404/noindex in the local middleware; the production build emits a dedicated `404.html`.
- The social-sharing image exists as a 1200 × 630 JPEG.
- Fonts are self-hosted and use `font-display: swap`.
- The homepage hero is eager/high-priority; gallery images are lazy-loaded and use WebP.
- One primary heading is present on each main page in the reviewed source.
- No fabricated reviews, ratings, opening hours or postal address were added to structured data.

## Remaining checks on the final published site

1. Confirm final domain and HTTPS/www redirect policy.
2. Verify canonical tags, sitemap host, actual content types, clean-URL redirects, API noindex headers, cache headers and an unknown URL returning HTTP 404.
3. Submit the final-domain sitemap to Google Search Console and use URL Inspection for the homepage and quotation page.
4. Validate structured data with Google's Rich Results Test or Schema.org Validator. A real postal address was not invented to satisfy local-business rich-result requirements.
5. Measure mobile performance with PageSpeed Insights; source inspection alone cannot establish LCP, INP or CLS. The Google Map remains eager per the existing requirement.

No competitor, backlink, Search Console or real-user performance data was available for this audit. Structured data and llms.txt do not guarantee search placement or AI citations.
