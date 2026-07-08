# Design direction

Premium, calm, high-signal SaaS design — closer to youmind.com's spacious editorial feel
than a typical dev-tool dashboard. No lorem ipsum; every page uses real, specific microcopy.

## Principles
- **Spacious over dense.** Generous padding, large type scale for headings, room to breathe.
- **Calm color, one accent.** Neutral ink/background scale with a single brand blue accent
  (`--brand`), used sparingly for CTAs, icons, and highlighted states — see
  `packages/design-system/src/index.ts` for the token source of truth.
- **Cards with real depth.** Soft borders + subtle shadow (`.fl-card` in globals.css), never
  heavy drop shadows or skeuomorphism.
- **Restrained motion.** Hover states use `transition` on color/shadow only; no
  scroll-triggered animation in this build (kept out to avoid slowing perceived load).
- **Dark + light aware.** `--background`/`--foreground`/`--card`/`--muted` CSS variables
  respond to `prefers-color-scheme` and a `data-theme` attribute override.
- **Polished empty/edge states.** Seed data (`apps/web/src/lib/demo-data.ts`) exists
  specifically so no page in this build ever renders visibly empty.

## What was deliberately not copied
No assets, layout code, or exact wording were copied from youmind.com or any competitor —
it was used only as a design-quality reference point per the build brief.
