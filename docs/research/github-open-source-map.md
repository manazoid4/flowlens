# Open-source / GitHub landscape (directional, this session)

- **ShareX** — mature, widely used open-source Windows screenshot/screen-recording tool;
  strong capture primitives, zero AI/team-workflow layer.
- **Various OCR/screenshot-to-text projects** exist as building blocks (e.g. Tesseract
  bindings) that a future FlowLens capture pipeline could use for field extraction (see the
  invoice-approval demo capture's "auto-extract invoice fields" finding).
- **Browser extension boilerplates** (MV3 starter kits) are relevant to `apps/extension`.
- **Tauri** is the chosen desktop shell framework (see `apps/desktop`) specifically because
  its open-source ecosystem is mature for lightweight, cross-platform native capture apps
  without an Electron-sized footprint.

No FlowLens code in this build was copied from any of the above; they are referenced here as
prior art / architecture inspiration for post-MVP native capture work (see
`apps/desktop/NEXT_STEPS.md` and `apps/extension/NEXT_STEPS.md`).
