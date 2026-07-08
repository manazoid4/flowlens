# Playbook: QA

**Goal**: cut bug reproduction time by attaching structured evidence, not prose.

1. Capture the bug the moment it's found, including the environment (OS/browser/app
   version) — this is stored automatically per capture.
2. Let the AI Workflow Doctor draft severity, root-cause hints, and a bug-report export.
3. Export directly to GitHub/Jira/Linear (contract in `packages/integrations`; live wiring is
   a next-session task — see that package's stub notes) rather than re-typing the report.
4. Tag recurring bug patterns across captures to build a "known issues" view in the process
   library over time.
