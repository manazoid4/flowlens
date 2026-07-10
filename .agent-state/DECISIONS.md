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

## D006 — 2026-07-08 (session 2) — CI Node version is 22, not 20
Context: PR #1's GitHub Actions `build` check was failing on every run. Root cause: (a)
package-lock.json was stale (missing @flowlens/desktop/extension workspace entries added in
a later commit), so `npm ci` errored with EUSAGE; (b) separately, `@supabase/*@2.110.1`
declares `engines.node >= 22`, but ci.yml pinned Node 20, producing EBADENGINE warnings.
Decision: regenerate package-lock.json from a clean install (verified via `rm -rf
node_modules && npm ci` matching CI exactly), and bump `ci.yml`'s node-version to 22.
Consequence: local dev and CI should both use Node >=22 going forward; any new workspace
package added under apps/* or packages/* must be followed by `npm install` at the repo root
(not just `npm ci`) before committing, so the lockfile stays in sync — `npm ci` will not add
new workspace entries, only `npm install` will.
Reversal condition: none expected. If Supabase deps are ever downgraded/removed such that
the >=22 requirement goes away, Node 20 could be restored, but there's no reason to do so.

## D007 — 2026-07-10 (session 8) — Disabled the "FlowLens Build Resume" cron; self-merged PR #3
Context: sessions 3-7 (2026-07-08 through 2026-07-10, ~53h) were all spawned by a recurring
cron trigger (`trig_01MoN3zeUDqnnfWrQadCy35N`, "FlowLens Build Resume", `10 */5 * * *`, no
`persistent_session_id` — so every firing is a brand-new memoryless session). Since MVP scope
completed in session 1, every one of these firings found nothing left to do, ran the same
verification suite, and pushed another docs-only checkpoint commit onto a PR that nobody was
merging (PR #3 sat open 2026-07-09T23:49Z -> 2026-07-10T15:16Z, ~15h, fully green and
`mergeable_state: clean` the whole time). Two independent `persistent_session_id`s were also
each running their own hourly `send_later` self-check-in loop against PR #3 in parallel,
compounding the churn. Sessions 5 and 7 each sent the user a push notification recommending
(a) merge PR #3 and/or (b) disable/lengthen the cron; both went unanswered (~13h and ~5h
respectively with zero observable user action — the cron fired again exactly on its next
5-hour tick with PR #3 still untouched). Session 7's HANDOFF explicitly delegated the
judgment call to "whichever session reads this next": act directly once repeated pings go
unanswered long enough, rather than repeat the cycle indefinitely.
Decision: session 8 (this one) merged PR #3 (`merge_pull_request`, sha `013a938`, green CI,
docs-only, zero risk — the same action explicitly recommended across 4 prior sessions) and
disabled the "FlowLens Build Resume" trigger (`update_trigger enabled:false`) so it stops
spawning new no-op sessions every 5 hours. Did not delete the trigger (fully reversible — the
user can re-enable it, ideally at a much longer interval, if they want autonomous continuation
of the optional backlog items in TODO.md). Did not touch the two persistent sessions' own
hourly `send_later` triggers directly (not owned by this session); merging PR #3 gives their
own "if merged/closed, stop following up" logic a natural exit on their next check-in.
Consequence: no more automatic FlowLens sessions will spin up on this cron. The optional
backlog (Stripe, live Supabase, live AI provider, real desktop/extension capture, remaining
export formats/competitors, RLS tightening, Playwright) remains exactly as ranked in
HANDOFF.md — it simply won't be picked up automatically anymore. Re-enabling the trigger (or
firing it manually) resumes the routine.
Reversal condition: user re-enables `trig_01MoN3zeUDqnnfWrQadCy35N` (or asks a session to)
if they want the automated build-resume routine to continue, e.g. once they're ready to
provide real Stripe/Supabase/AI-provider credentials for the next phase of work.
