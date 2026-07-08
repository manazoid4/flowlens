# Competitor analysis summary

See `apps/web/src/lib/compare.ts` for the structured comparison data rendered on
`/compare/[slug]`. Summary:

| Competitor | Strength | Where FlowLens goes further |
|---|---|---|
| Windows Steps Recorder | Free, built-in | AI diagnosis, routing, deprecated by Microsoft |
| Scribe | Fast guide generation | Friction/automation scoring, ticket/audit routing |
| Tango | Clean guide formatting | Whole-workflow diagnosis, not just step docs |
| Loom | Best video UX | Structured, searchable data vs. an opaque video |
| ShareX | Free, configurable | No AI layer, no team workflow, no export routing |

Not directly benchmarked in this session (would need live pricing/feature pages, flagged as
a next-session task): Guidde, Supademo, Jam.dev, Marker.io, Ybug, Userflow, Whatfix, WalkMe,
Process Street, Trainual, Snagit, ClickUp Clips. `/compare/*` routes exist today for the five
above; adding the remainder is a template-following task (add an entry to `compareEntries` in
`apps/web/src/lib/compare.ts` — `generateStaticParams` already picks up new slugs
automatically).
