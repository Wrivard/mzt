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

Native Node fetch typings can lose Response members in mixed Web-global compilation contexts. Include complete Web API declarations on server packages using fetch instead of casting responses or suppressing diagnostics.

**Why:** Deployment continued to report missing Response members even after the ordinary source check passed. A regression fixture exercising Node's conditional Web-global branch reproduced those exact diagnostics.

**How to apply:** Retain explicit ES2022/DOM libraries on fetch consumers and the mixed-global regression fixture. A successful local configuration check is not proof of a successful hosted Vercel build.

Vercel's traced TypeScript functions need a JavaScript-resolvable ESM import graph; successful type checks and `tsx` tests do not establish runtime compatibility.

**Why:** The published quote endpoint crashed even on GET with `FUNCTION_INVOCATION_FAILED`. A compiled-only cold-start reproduction exposed workspace exports pointing to `.ts`, while the builder renames traced sources to `.js` without rewriting those package exports.

**How to apply:** Preserve explicit relative `.js` imports in the serverless runtime graph, including shared-source dependencies. Keep a plain-Node cold-start check without TypeScript loaders in the deployment checks, alongside type checks and simulated-mail tests. Without hosted logs, distinguish the reproduced packaging failure from a confirmed remote stack trace.