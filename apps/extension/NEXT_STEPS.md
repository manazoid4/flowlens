# apps/extension — next steps

This is a typed-contract shell (manifest.json + message types), not a working extension.

1. Add `background.js` (MV3 service worker) implementing the `ExtensionMessage` protocol in
   `src-contracts/capture-agent.ts`: on `START_CAPTURE`, use `chrome.tabs.captureVisibleTab`
   or `chrome.desktopCapture` plus DOM click/navigation listeners injected via a content
   script to detect "meaningful" steps.
2. Add a content script that listens for clicks/form submits/navigation and posts
   `STEP_CAPTURED` messages with a screenshot data URL + DOM context back to the background
   worker.
3. Add a popup UI (reuse `@flowlens/design-system` tokens) showing capture status
   (`ExtensionCaptureState`) with start/stop controls.
4. On stop, POST the accumulated steps to the same `apps/web` capture ingestion API described
   in `apps/desktop/NEXT_STEPS.md`.
5. Redact sensitive fields client-side before upload where possible (password inputs,
   `type="password"` fields, common credit-card patterns) using logic shared with
   `packages/ai`'s redaction suggestions.

Until this is implemented, all capture data in the product is the seed data in
`apps/web/src/lib/demo-data.ts`.
