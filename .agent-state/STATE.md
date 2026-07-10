# FlowLens — STATE

Last updated: 2026-07-10 (session 7, verification-only run; MVP scope complete, PR #3 open/CI-green, not yet merged — 4 sessions running; re-notified user, see Next action)

## Mission
Build FlowLens: a "Workflow Evidence & Process Intelligence Platform" — capture messy work,
auto-clip, annotate, AI-explain, and route into SOPs/bug reports/training guides/tickets, with
friction scoring and ROI measurement. Standalone product, no branding overlap with JobFilter/
MAZos/OpenFlowKit/etc.

## Repo
Local path (session 2): /home/user/flowlens (remote container). Prior session's local path
was C:\Users\manaz\Desktop\flowlens — different machine, same GitHub remote.
GitHub: https://github.com/manazoid4/flowlens (public)
Branch: PR #1 (feature/flowlens-mvp -> master) merged 2026-07-08 (commit 31bf5ca); PR #2
(same branch name, recreated, docs-only) also merged 2026-07-08 (commit e65a38f). master is
the up-to-date branch, currently at e65a38f. Session 4 recreated a local feature/flowlens-mvp
branch from origin/master (per convention) to hold this checkpoint's doc-only commit.
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

PR #1 has since been merged into master (commit 31bf5ca). Session 3 was a verification-only
run: re-ran the full check suite against the merged master (npm install, build, lint, vitest,
and a clean `npm ci` matching CI exactly) — all pass, no regressions, no drift in
package-lock.json. Confirmed via GitHub Actions API that the CI run triggered by the merge
commit itself (run 28957352682) completed with conclusion "success".

Remaining: only the previously-identified optional next-session deepening work (Stripe, live
Supabase, live AI provider, real desktop/extension capture, remaining integrations/export
formats) — none of it required for MVP-complete per TODO.md's phases. The PR #1 merge backlog
item is now done.

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

## Files changed (session 3)
- .agent-state/{RUNLOG,STATE,TODO,HANDOFF}.md only (verification-only session, no product
  code changes — DECISIONS.md untouched, no new durable decision made)

## Files changed (session 4, session 5, session 6)
- .agent-state/{RUNLOG,STATE,TODO,HANDOFF}.md only, all three sessions (verification-only, no
  product code changes — DECISIONS.md untouched, no new durable decision made any session)

Prior session's files: everything else under the repo except .git internals — see git log
(6 commits on feature/flowlens-mvp: bootstrap, pages, vercel-fix, docs+shells+tests+CI,
sales/growth/playbooks, session-2 CI fix).

## Blockers
None. Open follow-ups are tracked as ranked next-session tasks in HANDOFF.md, not blockers.

## Next action
PR #3 is now open across FOUR sessions (4, 5, 6, 7), still CI-green and `mergeable_state:
clean`, still unmerged. The root cause (confirmed independently by sessions 4-7 via
`list_triggers`) is trigger `trig_01MoN3zeUDqnnfWrQadCy35N` ("FlowLens Build Resume", cron
`10 */5 * * *`, no `persistent_session_id`) firing a brand-new memoryless session every 5
hours, plus at least two parallel hourly `send_later` self-check-in chains (each session that
subscribed to PR #3 armed its own loop) that have been re-arming since 2026-07-08 with no end
condition other than "PR merged/closed". Session 5 sent one push notification about this at
~02:18Z; session 6 (05:18Z) judged one quiet cycle acceptable. Session 7 (this one, 10:13Z —
~8h after the original notification, 4th consecutive session finding zero user action) judged
that threshold crossed and sent a second, more explicit push notification recommending the
user either (a) merge PR #3, and/or (b) disable/adjust the "FlowLens Build Resume" cron, and/or
(c) reply asking this session to do either — see HANDOFF.md for full detail. This routine
still has NOT taken either action unilaterally (merging a PR / editing the user's own
automation triggers are both treated as needing explicit authorization). Optional deepening
work is ranked in HANDOFF.md if a future session wants to continue past MVP scope.

## Verification status (session 7, this container)
- `git status` at start: HEAD detached at `e65a38f` (origin/master tip, PR #2's merge commit).
  `git fetch origin master feature/flowlens-mvp` -> `origin/feature/flowlens-mvp` at `4bd32d8`,
  9 commits ahead of `origin/master` — PR #3 still open (4th consecutive session to find it
  unmerged).
- Checked out `origin/feature/flowlens-mvp` directly (did not recreate from master, PR still open).
- `npm install` (root): PASS (431 packages).
- `npm run build`: PASS (42 static pages via Turbopack, all routes generated, no errors).
- `npm run lint`: PASS (0 errors).
- `npx vitest run` (apps/web): PASS (5/5 tests).
- `rm -rf node_modules apps/*/node_modules packages/*/node_modules && npm ci` (clean-room):
  PASS (428 packages, 0 EUSAGE/EBADENGINE), `git status --short` clean afterward — no drift.
- GitHub Actions on `master` tip (`e65a38f`, PR #2's merge commit, run `28976963747`):
  `conclusion: success`.
- GitHub MCP `list_pull_requests` (state=open): only PR #3, unchanged since session 6.
- `list_triggers`: confirmed "FlowLens Build Resume" (`trig_01MoN3zeUDqnnfWrQadCy35N`) still
  `enabled: true`, `last_fired_at` this session's own firing (`2026-07-10T10:10:29Z`),
  `next_run_at 2026-07-10T15:10:00Z`. Also counted ~20+ fired-and-re-armed hourly
  `send_later` triggers across two distinct `persistent_session_id`s, all watching PR #3,
  dating back to 2026-07-08T21:27Z and 2026-07-09T23:50Z respectively — confirms HANDOFF's
  "two parallel loops" note and that they've been running ~37-60h uninterrupted.
- Sent a second push notification (see HANDOFF.md) — did not disable the cron or merge PR #3.
- No code changes made — pure verification pass per the routine's "already complete, no
  make-work" instruction.

## Verification status (session 6, this container)
- `git status` at start: HEAD detached at `e65a38f` (earlier point than session 5's container).
  `git fetch origin master feature/flowlens-mvp` -> `origin/feature/flowlens-mvp` at `a5d839c`,
  7 commits ahead of `origin/master` — PR #3 still open (third consecutive session to find it
  unmerged).
- Checked out `origin/feature/flowlens-mvp` directly (did not recreate from master).
- `rm -rf node_modules apps/*/node_modules packages/*/node_modules && npm ci` (clean-room):
  PASS (431 packages, 0 EUSAGE/EBADENGINE).
- `npm run build`: PASS, all routes generated, no errors.
- `npm run lint`: PASS (0 errors).
- `npx vitest run` (apps/web): PASS (5/5 tests).
- `git status --short` clean throughout — no drift.
- GitHub MCP `get_check_runs` on PR #3's current head (`a5d839c`): both `build` checks
  `completed`/`success`.
- Re-confirmed via `list_triggers` that the "FlowLens Build Resume" cron is still enabled and
  still the root cause of the repeated sessions (see Next action above). Did not send another
  push notification (already sent in session 5, nothing new to report).
- No code changes made — pure verification pass per the routine's "already complete, no
  make-work" instruction.

## Verification status (session 5, this container)
- `git status` at start: HEAD detached at `e65a38f`. `git fetch origin --prune` showed PR #3's
  branch (`origin/feature/flowlens-mvp`, tip `79f4038`) still exists and is 2 commits ahead of
  `origin/master` — PR #3 has NOT been merged (unlike PR #1/#2 which were merged by the time
  the next session started).
- GitHub MCP `list_pull_requests` (state=open): only PR #3, `mergeable_state: clean`.
- GitHub MCP `pull_request_read get_check_runs` on PR #3: both `build` checks
  `completed`/`success` (run 29058436271 and companion).
- Checked out `origin/feature/flowlens-mvp` directly (did not recreate from master, since the
  PR is still open) to continue on session 4's commits.
- `npm install` (root): PASS (431 packages), `git status --short` clean afterward.
- `npm run build`: PASS, all routes generated, no errors.
- `npm run lint`: PASS (0 errors).
- `npx vitest run` (apps/web): PASS (5/5 tests).
- `rm -rf node_modules apps/*/node_modules packages/*/node_modules && npm ci`: PASS (431
  packages, 0 EUSAGE/EBADENGINE), `git status --short` clean afterward — no lockfile drift.
- No code changes made — pure verification pass per the routine's "already complete, no
  make-work" instruction.

## Verification status (session 4, this container)
- `git status` at start: HEAD detached at `e65a38f`. `git fetch origin master` -> origin/master
  tip also `e65a38f`, confirming session 3's PR #2 is merged.
- GitHub MCP `list_pull_requests` (state=all): PR #1 and PR #2 both `merged: true`; no open PRs.
- GitHub MCP `actions_list`: run 28976963747 (merge-of-PR#2 commit) -> `conclusion: success`.
- `npm install` (root): PASS (431 packages), `git status --short` clean afterward.
- `npm run build`: PASS, all routes generated, no errors.
- `npm run lint`: PASS (0 errors).
- `npx vitest run` (apps/web): PASS (5/5 tests).
- No code changes made — pure verification pass per the routine's "already complete, no
  make-work" instruction.

## Verification status (session 3, this container)
- `git fetch origin master` -> HEAD (detached, then feature/flowlens-mvp recreated from it)
  matches origin/master tip 31bf5ca (the PR #1 merge commit).
- `npm install` (root): PASS (431 packages)
- `npm run build`: PASS (42 static pages via Turbopack)
- `npm run lint`: PASS (0 errors)
- `npx vitest run` (apps/web): PASS (5/5 tests)
- `rm -rf node_modules && npm ci`: PASS, `git status` clean afterward (no lockfile drift)
- GitHub Actions on master (run 28957352682, triggered by the merge commit): conclusion
  "success"
- No code changes were necessary this session — this was a pure verification pass per the
  scheduled routine's "if TODO shows fully complete, do not do make-work" instruction.

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
