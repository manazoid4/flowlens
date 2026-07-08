# Objection handling

**"We already use Loom/Scribe/Tango."**
Those are documentation tools — they stop at the how-to guide. FlowLens diagnoses friction,
scores automation opportunity, and routes the same capture into tickets and audit packs
without extra work. Ask: "What do you do today when a capture reveals a process is broken,
not just undocumented?"

**"Is this just OCR/screen recording with a wrapper?"**
No — the AI Workflow Doctor analyzes the whole workflow (friction score, automation
opportunity, risk) not just individual frames, and every output routes into a real asset
(SOP, bug report, training guide, ticket) rather than staying a recording.

**"We're worried about sensitive data in screenshots."**
Redaction tooling exists in the annotation editor, and AI flags likely-sensitive fields. See
`/security` for current posture vs. roadmap — we're upfront that SOC 2 certification and
SSO/SCIM are roadmap items, not shipped today.

**"Is this AI-generated content reliable enough to send to an auditor / engineer?"**
Every generated asset is editable before export — think of it as a fast first draft grounded
in the actual capture data, not a fully autonomous system making unreviewed claims.

**"Why not just have someone write it up?"**
Because that doesn't scale past a handful of workflows, and manual writeups don't include
friction scoring, automation detection, or ROI measurement — the parts that make this
"process intelligence" rather than "documentation."
