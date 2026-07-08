# FlowLens — STATE

Last updated: 2026-07-08 (session 1, substantially complete)

## Mission
Build FlowLens: a "Workflow Evidence & Process Intelligence Platform" — capture messy work,
auto-clip, annotate, AI-explain, and route into SOPs/bug reports/training guides/tickets, with
friction scoring and ROI measurement. Standalone product, no branding overlap with JobFilter/
MAZos/OpenFlowKit/etc.

## Repo
Local path: C:\Users\manaz\Desktop\flowlens
GitHub: https://github.com/manazoid4/flowlens (public)
Branch: feature/flowlens-mvp (PR #1 open against master)
Vercel: linked at repo root, production deploy verified live (200 OK on all key routes)

## Phase
Priority-order items 1-4 (working web app, seeded pages, GitHub push, Vercel deploy) are
DONE and verified. Item 5 (docs) is done. Item 6 (desktop/extension) done as typed shells
per spec. Item 7 (full sales/growth doc set) trimmed to highest-leverage files per spec's
own fallback instruction.

Remaining: send completion email (next immediate action), then optional next-session
deepening work listed in HANDOFF.md's ranked list (Stripe, live Supabase, live AI provider,
real capture implementations, remaining integrations/export formats).

## Key decisions
See DECISIONS.md (D001-D004, plus D005 below).

D005 — 2026-07-08 — Vercel deploy runs from repo root, not apps/web
Context: npm workspaces mean apps/web depends on packages/* via workspace protocol; running
`vercel` from inside apps/web only uploads that directory and fails on `@flowlens/*` 404s.
Decision: `.vercel/project.json` lives at the repo root; all `vercel` commands must be run
from there. Documented in docs/deploy/vercel.md.
Consequence: future sessions must `cd` to repo root before any vercel command.
Reversal condition: none expected; this is the correct pattern for npm-workspace monorepos.

## Files changed
Everything under C:\Users\manaz\Desktop\flowlens except .git internals — see git log for the
full commit history (4 commits on feature/flowlens-mvp: bootstrap, pages, vercel-fix, docs+
shells+tests+CI, sales/growth/playbooks).

## Blockers
None blocking further work. Open follow-ups are tracked as ranked next-session tasks in
HANDOFF.md, not blockers.

## Next action
Send the completion status email via Resend to manazoid4@gmail.com (using the key in
apps/web/.env.local), then stop for this session.

## Verification status
- `npm run build --workspace=apps/web`: PASS (42 static pages)
- `npx vitest run`: PASS (5/5 tests)
- `npm run lint --workspace=apps/web`: PASS (0 errors)
- Production Vercel URL: PASS (HTTP 200 on 13 key routes, checked via curl)
- GitHub push: PASS (master + feature/flowlens-mvp pushed, PR #1 open)
