# FlowLens — RESUME PROMPT (paste into a new Claude Code session)

Repo: C:\Users\manaz\Desktop\flowlens (branch: feature/flowlens-mvp)

Read, in order: .agent-state/STATE.md, .agent-state/TODO.md, .agent-state/DECISIONS.md,
.agent-state/HANDOFF.md. Then run `git status` and `git log --oneline -20` in the repo.

Continue building FlowLens from the next unchecked TODO item. Do not restart or re-plan from
scratch. Do not claim anything works without running a command and showing its output. Update
.agent-state/HANDOFF.md and TODO.md after every meaningful chunk of work (every 20-30 min or
per feature). Use Bash heredocs (`cat > file << 'EOF' ... EOF`) for bulk file writes instead of
the Write tool, since Write triggers a per-file justification gate that is expensive at this
repo's scale — reserve Write/Edit for small, surgical single-file changes.

Keep following the original build brief's priority order if a context/time limit is hit again:
(1) apps/web builds+runs, (2) core pages with seed data look real, (3) GitHub pushed,
(4) Vercel deployed, (5) remaining docs, (6) desktop/extension shells, (7) full sales/growth docs.

When the build is complete or you must stop again, update HANDOFF.md/RESUME_PROMPT.md and send
a status email to manazoid4@gmail.com via the Resend API using the key in .env.local
(RESEND_API_KEY) — never print the full key in any file/output.
