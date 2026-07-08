# FlowLens — STATE

Last updated: 2026-07-08 (session 2, CI fixed + verified green; MVP scope complete)

## Mission
Build FlowLens: a "Workflow Evidence & Process Intelligence Platform" — capture messy work,
auto-clip, annotate, AI-explain, and route into SOPs/bug reports/training guides/tickets, with
friction scoring and ROI measurement. Standalone product, no branding overlap with JobFilter/
MAZos/OpenFlowKit/etc.

## Repo
Local path (session 2): /home/user/flowlens (remote container). Prior session's local path
was C:\Users\manaz\Desktop\flowlens — different machine, same GitHub remote.
GitHub: https://github.com/manazoid4/flowlens (public)
Branch: feature/flowlens-mvp (PR #1 open against master, mergeable_state: clean)
Vercel: linked at repo root, production deploy verified live in session 1 (200 OK on all key
routes) — not re-verified in session 2 (no Vercel CLI/credentials in this container).

## Phase
Priority-order items 1-4 (working web app, seeded pages, GitHub push, Vercel deploy) are
DONE and verified. Item 5 (docs) is done. Item 6 (desktop/extension) done as typed shells
per spec. Item 7 (full sales/growth doc set) trimmed to highest-leverage files per spec's
own fallback instruction.

Session 2 found and fixed a real gap: session 1's TODO/HANDOFF claimed CI was "done" but had
only run build/lint/test locally — GitHub Actions itself was failing on every push (lockfile
out of sync + Node engine mismatch). Fixed, pushed, and confirmed CI now green (see RUNLOG).

Remaining: only the previously-identified optional next-session deepening work (Stripe, live
Supabase, live AI provider, real desktop/extension capture, remaining integrations/export
formats, PR #1 merge) — none of it required for MVP-complete per TODO.md's phases.

## Key decisions
See DECISIONS.md (D001-D006).

D005 — 2026-07-08 — Vercel deploy runs from repo root, not apps/web
Context: npm workspaces mean apps/web depends on packages/* via workspace protocol; running
`vercel` from inside apps/web only uploads that directory and fails on `@flowlens/*` 404s.
Decision: `.vercel/project.json` lives at the repo root; all `vercel` commands must be run
from there. Documented in docs/deploy/vercel.md.
Consequence: future sessions must `cd` to repo root before any vercel command.
Reversal condition: none expected; this is the correct pattern for npm-workspace monorepos.

## Files changed (session 2)
- package-lock.json (regenerated: added missing @flowlens/desktop, @flowlens/extension
  workspace entries so `npm ci` works)
- .github/workflows/ci.yml (node-version 20 -> 22)
- .agent-state/{RUNLOG,STATE,TODO,HANDOFF,DECISIONS}.md (this checkpoint)

Prior session's files: everything else under the repo except .git internals — see git log
(6 commits on feature/flowlens-mvp: bootstrap, pages, vercel-fix, docs+shells+tests+CI,
sales/growth/playbooks, session-2 CI fix).

## Blockers
None. Open follow-ups are tracked as ranked next-session tasks in HANDOFF.md, not blockers.

## Next action
Send the session status email via Resend to manazoid4@gmail.com, then stop for this session.
After that: no required next action — MVP scope is complete and CI-green. Optional deepening
work is ranked in HANDOFF.md if a future session wants to continue.

## Verification status (session 2, this container)
- `npm install` (root): PASS
- `npm run build`: PASS (20 static pages via Turbopack — 13 web routes incl. dynamic
  solutions/[slug] x8, compare/[slug] x5)
- `npm run lint`: PASS (0 errors)
- `npx vitest run` (apps/web): PASS (5/5 tests)
- `rm -rf node_modules && npm ci` (post lockfile fix): PASS — this is what GitHub Actions
  runs; confirms the CI fix is correct, not just "works on my machine"
- GitHub Actions on PR #1 (after push of fix commit `8eb9a78`): both `build` checks
  completed/success (runs 28953770454, 28953767439)
- PR #1 `mergeable_state`: "clean" (was "unstable" before the fix)
- Vercel production URL: NOT re-checked this session (no Vercel CLI/auth in this container;
  session 1 verified it live with HTTP 200 on 13 routes — see prior HANDOFF for that record)
