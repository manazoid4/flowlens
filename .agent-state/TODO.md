# FlowLens — TODO

Markers: [ ] not started, [~] in progress, [x] done+verified, [!] blocked, [?] needs decision

## Phase 0 — Resumability
- [x] .agent-state/ directory + STATE/RUNLOG/TODO/DECISIONS created
- [x] HANDOFF.md, RESUME_PROMPT.md, NEXT_RUN.md
- [x] scripts/agent/schedule-resume.ps1
- [x] scripts/agent/resume.ps1

## Phase 1 — Repo bootstrap
- [x] Root package.json (npm workspaces: apps/*, packages/*)
- [x] .gitignore (.env*, node_modules, .next, .vercel, etc.)
- [x] .env.example
- [x] apps/web Next.js App Router + TS strict + Tailwind scaffold (verified: builds clean)
- [x] packages/capture-core types (WorkspaceRole, CaptureSession, CaptureStep, Annotation,
      AIFinding, FrictionScore, CaptureExport, etc.)
- [x] packages/ai provider abstraction + mock provider
- [x] packages/design-system tokens/theme
- [x] packages/exports generators (markdown/json first, others stubbed)
- [x] packages/integrations typed stubs (GitHub/Jira/Linear/Slack/Notion/Obsidian)
- [x] packages/workflow-intelligence friction score + auto-clip logic (5 Vitest tests pass)
- [x] packages/db Supabase schema/migrations/seed (schema only; no live connection wired)
- [x] Initial commit + push to GitHub manazoid4/flowlens (public, PR #1 open)

## Phase 2 — Research + product docs
- [x] docs/research/* (market-map, reddit-pain-points, github-open-source-map,
      competitor-analysis, corporate-buyers, pricing-benchmarks, design-inspiration)
- [x] docs/product/{thesis,category,positioning,buyer-personas,pricing}.md

## Phase 3 — Web app pages (all verified via build + live HTTP 200 checks)
- [x] `/` landing
- [x] `/pricing`
- [x] `/solutions/*` (operations, qa, support, it, training, compliance, agencies, founders)
- [x] `/compare/*` (steps-recorder, scribe, tango, loom, sharex)
- [x] `/security`, `/enterprise`
- [x] `/dashboard`
- [x] `/captures/[id]` editor
- [x] `/captures/[id]/ai` AI Workflow Doctor
- [x] `/captures/[id]/export`
- [x] `/integrations`
- [x] `/process-library`
- [x] `/settings`

## Phase 4 — Seed demo data
- [x] 3 demo workspaces, 6 demo captures (5-7 steps each) w/ annotations/findings/friction

## Phase 5 — Desktop/extension shells
- [x] apps/desktop Tauri shell + contracts + NEXT_STEPS.md (no working native capture yet)
- [x] apps/extension MV3 shell + contracts + NEXT_STEPS.md (no working browser capture yet)

## Phase 6 — Deploy + CI
- [x] GitHub Actions CI (install+lint+test+build) — .github/workflows/ci.yml — session 1
      marked this done from local verification only; session 2 found GitHub Actions itself
      was actually FAILING on PR #1 (stale lockfile + Node engine mismatch), fixed both,
      pushed, and confirmed the Actions run itself is green (see RUNLOG session 2, D006).
- [x] Vitest tests (friction scoring, auto-clip logic) — 5/5 passing
- [ ] Playwright smoke test (stretch goal — not done)
- [x] Vercel deploy apps/web — production URL verified live in session 1 (200 OK, 13 routes
      checked); not re-checked in session 2 (no Vercel CLI/auth in this container)
- [x] docs/deploy/{vercel,supabase,stripe}.md

## Phase 7 — Remaining docs
- [x] docs/design/design-direction.md
- [x] docs/sales/{demo-script,objection-handling,one-page-enterprise-brief}.md
- [x] docs/growth/{seo-strategy,launch-plan}.md
- [x] docs/playbooks/{operations,qa,support,founder,enterprise-sales}.md
- [x] README.md

## Phase 8 — Wrap-up
- [x] Final HANDOFF.md update (session 1)
- [x] Completion email via Resend (session 1 — unconfirmed whether it actually sent, no
      record found in this container; session 2 sends its own status email regardless)
- [x] Session 2: CI fix (lockfile sync + Node 22) — committed `8eb9a78`, pushed, confirmed
      GitHub Actions green on PR #1, PR mergeable_state now "clean"
- [~] Session 2: HANDOFF/STATE/RUNLOG/TODO/DECISIONS updated; completion email sending next

## Next-session backlog (see HANDOFF.md for the ranked, detailed version) — all optional,
## none blocking "MVP complete" status
- [ ] Merge PR #1 into master (CI is green; just needs a human/agent merge decision)
- [ ] Stripe checkout + webhook wiring
- [ ] Real Supabase queries replacing demo-data.ts
- [ ] apps/desktop real Tauri capture implementation
- [ ] apps/extension real MV3 capture implementation
- [ ] Live (non-mock) AI provider option
- [ ] Remaining export formats (pdf/html/docx/zip/audit-pack/etc.)
- [ ] Remaining /compare/* competitors (~10 more)
- [ ] Tighten Supabase RLS policies before real customer data
- [ ] Playwright smoke test (stretch goal)
