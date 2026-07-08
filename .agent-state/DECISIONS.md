# FlowLens — DECISIONS (durable only)

## D001 — 2026-07-08 — Monorepo tool: npm workspaces (not pnpm/turborepo)
Context: need workspaces for apps/* + packages/*, keep repo concise per spec.
Decision: use plain npm workspaces (package.json "workspaces" field), no Turborepo/Nx.
Consequence: simpler tooling, slightly less caching sophistication; fine for MVP scope.
Reversal condition: if build times become painful once desktop/extension apps are real.

## D002 — 2026-07-08 — No JobFilter/MAZos/OpenFlowKit references anywhere in product
Context: user requires FlowLens be fully standalone, no branding/lingo bleed.
Decision: sibling repo jobfilterv1 used ONLY as a stack/structure reference, never copied
verbatim, never named in FlowLens code/docs/copy.
Consequence: all copy, positioning, and package names invented fresh for FlowLens.
Reversal condition: none — this is a hard product requirement.

## D003 — 2026-07-08 — AI provider abstraction ships with a mock provider
Context: no live OpenAI/Anthropic key provided for this build; need app usable without one.
Decision: packages/ai defines a provider interface; default/dev provider is deterministic
mock data so pages/tests work with zero external API keys.
Consequence: AI Workflow Doctor output in the deployed demo is realistic mock data, not a
live LLM call, until a real key + provider is wired in.
Reversal condition: user supplies an API key and requests live wiring.

## D004 — 2026-07-08 — Desktop + extension are typed shells only for MVP
Context: spec explicitly says don't block MVP on native capture; ship strong contracts.
Decision: apps/desktop (Tauri) and apps/extension (MV3) contain manifest/config + typed
capture contracts + a NEXT_STEPS.md each, no working native capture code yet.
Consequence: real capture only works via demo/seed data in apps/web for now.
Reversal condition: future session implements real capture per each app's NEXT_STEPS.md.

## D005 — 2026-07-08 — Vercel deploy runs from repo root, not apps/web
Context: npm workspaces mean apps/web depends on packages/* via workspace protocol; running
`vercel` from inside apps/web only uploads that directory and fails on `@flowlens/*` 404s.
Decision: `.vercel/project.json` lives at the repo root; all `vercel` commands must be run
from there. Documented in docs/deploy/vercel.md.
Consequence: future sessions must `cd` to repo root before any vercel command.
Reversal condition: none expected; this is the correct pattern for npm-workspace monorepos.
