---
name: Quote dropdown verification
description: Pointer-only checks and in-page controls for the repeatedly reported timeline interaction issue.
---

Verify opening and selecting quote timeframes using pointer-only interactions, not a click followed by keyboard selection. Prefer in-page expandable choices over browser popups for this field.

**Why:** The user continued reporting that the dropdown could not be clicked after both a portalled menu and a native select were tried. Earlier click-plus-keyboard checks did not establish pointer selection worked in their preview.

**How to apply:** Test opening, choosing an option, advancing, and returning with the selection retained at desktop and narrow widths. Do not state a specific overlay or browser bug caused the issue without evidence.
