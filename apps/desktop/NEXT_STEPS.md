# apps/desktop — next steps

This is a typed-contract shell, not a working Tauri app. To implement real native capture:

1. `npm create tauri-app@latest` inside `apps/desktop`, choosing the vanilla/TS frontend
   template (or point it at a thin React UI reusing `@flowlens/design-system` tokens).
2. Implement the Rust side of `TAURI_COMMANDS` in `src-contracts/capture-agent.ts`:
   - `start_capture_session` / `stop_capture_session`: hook into OS screenshot APIs
     (Windows: `windows` crate `BitBlt`/`PrintWindow`; consider `scap` or `xcap` crates for
     cross-platform screen capture).
   - Detect "meaningful" moments (window focus change, click, or periodic interval) and emit
     a `CaptureStep` (from `@flowlens/capture-core`) per moment via a Tauri event.
   - `get_capture_environment`: read OS version, active browser/app name, and screen
     resolution into a `CaptureEnvironment`.
3. On the frontend, call `autoClipMeaningfulSteps` from `@flowlens/workflow-intelligence` to
   filter noise before uploading to the web app's capture API.
4. Upload captured steps to `apps/web` via a new authenticated API route (not yet built) —
   e.g. `POST /api/captures/:id/steps`.
5. Reuse `@flowlens/ai` and `@flowlens/workflow-intelligence` server-side (in apps/web) for
   analysis; the desktop app itself should stay a thin capture client.

Until this is implemented, all capture data in the product is the seed data in
`apps/web/src/lib/demo-data.ts`.
