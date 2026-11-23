---
name: Initial HTML versus missing CSS
description: Preserve complete initial HTML and bounded loader recovery without introducing a separate crawler-only page.
---

When refresh briefly shows a dark header and plain page text, inspect the initial HTML fallback before treating it as missing CSS. Preserve readable no-JavaScript content and ensure any startup indicator has a bounded failure recovery.

**Why:** Moving the stylesheet earlier did not resolve the reported refresh flash: the simplified HTML was being shown before React replaced it.

**How to apply:** For future loading changes, verify the pre-JavaScript state, the mounted app, and script failure separately. Do not hide fallback content permanently or claim stylesheet delivery was the confirmed cause.

Public pages must provide their full content before JavaScript, while retaining the approved design and copy. Use the same components for initial HTML and the interactive page rather than maintaining a separate abbreviated crawler version.

**Why:** The user explicitly asked to make the site fully crawlable after learning that the earlier static fallback omitted public sections. Keeping one content source prevents differences between what visitors and crawlers receive.

**How to apply:** Preserve build-time rendering and hydration when changing routing or loading. Keep FAQ answers in initial HTML and usable without JavaScript. Do not revert to an empty root, a reduced SEO-only fallback, or an indefinite loader.
