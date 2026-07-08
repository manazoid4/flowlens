# Pricing rationale

See `apps/web/src/lib/pricing.ts` for the canonical tier data rendered on `/pricing`.

Tiers, corporate-first, Founder last: Starter (£120/mo) -> Team (£450/mo) -> Business
(£1,200/mo, highlighted) -> Enterprise (custom) -> Agency (£650/mo) -> Founder (£19/mo).

Rationale:
- **Business** is the highlighted/anchor plan because the primary buyer (COO/Ops) sits here.
- **Enterprise** is priced as "custom" to support SSO/SCIM, dedicated audit pipelines, and
  negotiated SLAs rather than a fixed self-serve number.
- **Agency** sits between Team and Enterprise on price because it needs per-client workspace
  isolation and branded exports, which Team doesn't offer.
- **Founder** is deliberately the cheapest and listed last, reflecting the brief's priority
  order (founders/builders are the lowest-priority buyer, not the primary market).

Benchmarking notes (directional, not sourced from live competitor pricing pages in this
session): Scribe and Tango's team plans generally sit in the $20-40/seat/month range; Loom
Business sits around $12-15/seat/month; enterprise SOP/knowledge tools (Whatfix, WalkMe) are
typically custom-quoted in the tens of thousands per year. FlowLens's per-workspace pricing
(rather than strict per-seat) reflects that the primary value driver is captures/findings
processed, not just headcount.
