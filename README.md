# FlowLens

FlowLens is a Workflow Evidence & Process Intelligence Platform: capture messy real work,
have AI explain what happened and where the friction is, and turn one capture into SOPs, bug
reports, training guides, audit evidence, and tickets — with friction scoring and measurable
ROI.

Core loop: **Capture -> Understand -> Improve -> Route -> Measure.**

## Repo layout
```
apps/
  web/         Next.js (App Router) SaaS app — the primary deliverable
  desktop/     Tauri desktop capture app shell (typed contracts, not yet implemented)
  extension/   Chrome/Edge MV3 extension shell (typed contracts, not yet implemented)
packages/
  capture-core/          Shared domain types (CaptureSession, CaptureStep, AIFinding, ...)
  ai/                    AI provider abstraction + mock provider + AI Workflow Doctor
  workflow-intelligence/ Friction scoring + auto-clip heuristics
  exports/               Markdown/JSON export generators + typed stubs for other formats
  integrations/          Typed connect/export stubs (GitHub, Jira, Linear, Slack, Notion, Obsidian)
  design-system/         Shared design tokens
  db/                    Supabase schema (packages/db/migrations)
docs/                    Research, product, design, sales, growth, playbooks, deploy docs
.agent-state/            Build resumability files (see below)
```

## Getting started
```bash
npm install
npm run dev --workspace=apps/web
```

Copy `.env.example` to `apps/web/.env.local` and fill in real values. With no keys set, the
app runs entirely on in-memory seed data (`apps/web/src/lib/demo-data.ts`) and the mock AI
provider (`packages/ai`), so it works out of the box with zero external services.

## Build
```bash
npm run build --workspace=apps/web
```

## Deploying
See `docs/deploy/vercel.md` — must run `vercel` from the **repo root**, not `apps/web`,
because this is an npm-workspaces monorepo.

## Resuming a paused build session
This project was built by an AI agent across multiple sessions. If you're picking this back
up, read `.agent-state/HANDOFF.md` and `.agent-state/RESUME_PROMPT.md` first, or run
`powershell -File scripts/agent/resume.ps1`.
