---
name: Local build environment
description: Environment difference between managed web workflows and direct shell builds
---

Direct shell build commands do not inherit the managed web workflow's runtime variables. When verifying the production bundle locally, supply both a valid PORT and BASE_PATH in the command environment.

**Why:** The first direct build failed without PORT, and the next failed without BASE_PATH, even though the managed preview workflow ran successfully.

**How to apply:** For a direct web artifact build in this workspace, explicitly set both variables rather than treating a missing-variable build failure as a source-code regression. Prefer the workflow environment for preview checks.

Vercel's function compilation must discover the Node-specific TypeScript configuration itself; a separately named configuration used only by a local check is not sufficient.

**Why:** The frontend build and local API type check passed, but Vercel's subsequent function compilation inherited an empty types list and failed on Node built-ins.

**How to apply:** Keep a discoverable configuration beside the functions and have local checks inherit it. When verifying a Vercel change, check both the frontend build and the API configuration, not only the Vite bundle.

Vercel's Node TypeScript builder applies its default module mode to raw configurations before resolving `extends`. Every server package it compiles needs an explicit module mode, not just the entrypoint package.

**Why:** Adding Node types fixed the entrypoint error but exposed NodeNext import-resolution failures in shared packages despite passing normal local checks. The builder's configuration order was confirmed in its source and reproduced locally.

**How to apply:** Preserve the workspace's intended ESNext/Bundler mode explicitly on server packages and run the Vercel-style source check. Do not rely on locally generated declarations masking shared-source diagnostics.