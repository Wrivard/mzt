---
name: Initial HTML versus missing CSS
description: Distinguish the simplified pre-JavaScript content from a stylesheet failure on refresh.
---

When refresh briefly shows a dark header and plain page text, inspect the initial HTML fallback before treating it as missing CSS. Preserve readable no-JavaScript content and ensure any startup indicator has a bounded failure recovery.

**Why:** Moving the stylesheet earlier did not resolve the reported refresh flash: the simplified HTML was being shown before React replaced it.

**How to apply:** For future loading changes, verify the pre-JavaScript state, the mounted app, and script failure separately. Do not hide fallback content permanently or claim stylesheet delivery was the confirmed cause.
