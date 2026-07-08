# FlowLens — TODO

Markers: [ ] not started, [~] in progress, [x] done+verified, [!] blocked, [?] needs decision

## Phase 0 — Resumability
- [x] .agent-state/ directory + STATE/RUNLOG/TODO/DECISIONS created
- [~] HANDOFF.md, RESUME_PROMPT.md, NEXT_RUN.md
- [ ] scripts/agent/schedule-resume.ps1
- [ ] scripts/agent/resume.ps1

## Phase 1 — Repo bootstrap
- [ ] Root package.json (npm workspaces: apps/*, packages/*)
- [ ] .gitignore (.env*, node_modules, .next, .vercel, etc.)
- [ ] .env.example
- [ ] apps/web Next.js App Router + TS strict + Tailwind scaffold
- [ ] packages/capture-core types (WorkspaceRole, CaptureSession, CaptureStep, Annotation,
      AIFinding, FrictionScore, CaptureExport, etc.)
- [ ] packages/ai provider abstraction + mock provider
- [ ] packages/design-system tokens/theme
- [ ] packages/exports generators (markdown/json first, others stubbed)
- [ ] packages/integrations typed stubs (GitHub/Jira/Linear/Slack/Notion/Obsidian)
- [ ] packages/workflow-intelligence friction score + auto-clip logic
- [ ] packages/db Supabase schema/migrations/seed
- [ ] Initial commit + push to GitHub manazoid4/flowlens

## Phase 2 — Research + product docs
- [ ] docs/research/* (market-map, reddit-pain-points, github-open-source-map,
      competitor-analysis, corporate-buyers, pricing-benchmarks, design-inspiration)
- [ ] docs/product/{thesis,category,positioning,buyer-personas,pricing}.md

## Phase 3 — Web app pages
- [ ] `/` landing
- [ ] `/pricing`
- [ ] `/solutions/*` (operations, qa, support, it, training, compliance, agencies, founders)
- [ ] `/compare/*` (steps-recorder, scribe, tango, loom, sharex)
- [ ] `/security`, `/enterprise`
- [ ] `/dashboard`
- [ ] `/captures/[id]` editor
- [ ] `/captures/[id]/ai` AI Workflow Doctor
- [ ] `/captures/[id]/export`
- [ ] `/integrations`
- [ ] `/process-library`
- [ ] `/settings/*`

## Phase 4 — Seed demo data
- [ ] 2-3 demo workspaces, 4-6 demo captures w/ steps/annotations/findings/friction/exports

## Phase 5 — Desktop/extension shells
- [ ] apps/desktop Tauri shell + contracts + next-steps doc
- [ ] apps/extension MV3 shell + contracts + next-steps doc

## Phase 6 — Deploy + CI
- [ ] GitHub Actions CI (install+lint+build)
- [ ] Vitest tests (friction scoring, auto-clip logic)
- [ ] Playwright smoke test (stretch)
- [ ] Vercel deploy apps/web
- [ ] docs/deploy/{vercel,supabase,stripe}.md

## Phase 7 — Remaining docs
- [ ] docs/design/design-direction.md
- [ ] docs/sales/{demo-script,objection-handling,one-page-enterprise-brief}.md
- [ ] docs/growth/{seo-strategy,launch-plan}.md
- [ ] docs/playbooks/{operations,qa,support,founder,enterprise-sales}.md
- [ ] README.md

## Phase 8 — Wrap-up
- [ ] Final HANDOFF.md update
- [ ] Completion email via Resend
