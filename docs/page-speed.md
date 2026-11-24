# Page speed optimization

## Scope

Keep the existing copy, typography, colors, layout, image subjects and crops,
form behavior, map, tracking identifiers, and consent requirements.
Do not hide integrations from Lighthouse, bypass consent, or replace photographs.

## Baseline

Mobile Lighthouse 13.6.0 against the public Vercel site,
`https://www.mztconstruction.ca`, November 24, 2026, before these changes:

| Page | Performance | FCP | LCP | Blocking time | Layout shift |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage | 71 | 2.1 s | 7.8 s | 191 ms | 0 |
| Quotation | 70 | 2.1 s | 9.3 s | 210 ms | 0 |

SEO scored 100 on both pages. Reports are in the ignored
`generated-artifacts/pagespeed-*-before.json` files.

These are lab measurements, not Chrome UX Report field data or a promise of
an identical PageSpeed Insights score. Network, CPU, consent state, browser,
third-party responses, and the deployed revision affect results.

## Optimized build verification

Final checks used the built static pages over local HTTPS/HTTP2 with Brotli,
the production hostname resolved locally, and the real Cookiebot, GTM, Analytics,
and Maps requests enabled. This is **not a new Vercel deployment**.

| Page | Mobile performance | Desktop performance | Accessibility | SEO |
| --- | ---: | ---: | ---: | ---: |
| Homepage | 72 | 98 | 97 | 100 |
| Quotation | 72 | 99 | 97 | 100 |

Final mobile LCP was 7.0 s / 6.3 s, with 120 ms / 200 ms blocking time and
zero layout shift. The Cookiebot dialog remained the LCP element.
Results are retained as `generated-artifacts/pagespeed-*-http2-*.json`.
Earlier HTTP/1.1 fixture runs are also retained, but do not match Vercel's
HTTP/2 delivery as closely and are not used in this table.

In the measured mobile loads, first-party transfers fell from approximately
2.41 MB to 0.92 MB on the homepage (**62% less**) and from 2.31 MB to 0.37 MB
on the quotation page (**84% less**). Decoded first-party JavaScript fell from
505 KB to 297 KB / 396 KB respectively. These transfer totals do not include
third-party requests.

The full workspace type check, Vercel-style function type/runtime checks, all
13 page tests, and production build passed. Desktop homepage and mobile form
screenshots retained the existing appearance. No real email was sent.

## Changes

- AVIF alternatives and resolution selection for the same photographs; the
  original images remain as browser fallbacks and are not overwritten.
- A compact, lossless WebP encoding of the navigation/footer/startup logo.
- A correctly sized favicon instead of downloading the original almost-1-MB logo.
- Route-specific JavaScript: the homepage no longer downloads the quotation
  form, validation, and privacy-page implementation at startup.
- Remove unused starter query, tooltip, and toast providers from the rendered
  application; these were not used by the public pages.
- Preload the current route and its appropriate background image, rather than
  eagerly loading every page's implementation.
- Reveal the complete prerendered HTML once the production stylesheet is ready,
  without waiting for JavaScript hydration. Development retains its bounded
  loader because Vite installs styles through JavaScript.
- Preconnect to the necessary consent provider origins and add Vercel cache
  headers for the existing image and certification directories.
- Preserve mobile zoom and repair the contact heading hierarchy without
  changing text or styling.

Some deterministic file-size reductions, independent of Lighthouse timing:

| Asset | Original | Optimized |
| --- | ---: | ---: |
| Favicon image | 958 KiB | 3.9 KiB |
| Displayed company logo | 276 KiB | 55.5 KiB |
| Quotation background | 721 KiB | 59.7 KiB |

The larger originals remain available for fallbacks and structured data.
The company logo's displayed geometry and image content are unchanged.

## Regenerating images

Run `pnpm --filter @workspace/scripts run optimize:images` after changing an
original image used by the responsive-image component. Commit the generated
manifest and optimized files together. This is an offline maintenance step,
not part of form uploads and not required on every Vercel build.

## Reproducing the audit

Build the production artifact, not the Vite development server:

```sh
PORT=20943 BASE_PATH=/ pnpm --filter @workspace/lavallee-construction build
pnpm --filter @workspace/lavallee-construction typecheck
pnpm --filter @workspace/lavallee-construction test
```

Run Lighthouse with a fresh browser profile, the same settings, and the same
consent state. Use `--no-enable-error-reporting` in noninteractive environments.
The diagnostic dependencies live in the scripts package, not the browser bundle.
For example, after deploying:

```sh
CHROME_PATH=/path/to/chromium pnpm --filter @workspace/scripts exec lighthouse \
  https://www.mztconstruction.ca/ \
  --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage' \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=../generated-artifacts/pagespeed-home-live.json \
  --no-enable-error-reporting
```

`scripts/serve-performance-build.mjs` is an optional localhost-only HTTPS fixture
for testing the production output with compression. It requires a local test
certificate in the ignored generated-artifacts directory. It never serves or
proxies the submission API.

## Remaining external constraints

The baseline LCP element was the **Cookiebot dialog**, not the hero photograph.
Its scripts and display timing, the tags configured in GTM, and Google Maps
contribute to loading and execution costs. They remain enabled, in their original
consent order. The map remains eager-loading as requested.

The baseline also recorded a Cookiebot configuration request returning 404 for
`mztconstruction.ca`, a contrast warning inside the Cookiebot accept button, and
Google Maps third-party cookie warnings. Check both `mztconstruction.ca` and
`www.mztconstruction.ca` in the Cookiebot account. Correcting the dialog colors
would change its appearance and is outside the no-visual-change request.

The workspace changes must be deployed to Vercel before a public PageSpeed
Insights run can measure them. A local result is not the deployed score, and
100 cannot be guaranteed while preserving third-party behavior.
