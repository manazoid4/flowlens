// FlowLens desktop capture agent contract (Tauri shell).
// This defines the interface a future Rust/Tauri capture backend must implement so the
// existing apps/web data model (@flowlens/capture-core) can be filled from real OS capture
// instead of demo data. No implementation exists yet in this build.

import type { CaptureStep, CaptureEnvironment } from "@flowlens/capture-core";

export interface DesktopCaptureAgent {
  startSession(options: { mode: string; workspaceId: string }): Promise<{ sessionId: string }>;
  stopSession(sessionId: string): Promise<void>;
  onStepCaptured(callback: (step: CaptureStep) => void): () => void;
  getEnvironment(): Promise<CaptureEnvironment>;
}

// Tauri IPC command names this agent is expected to expose once implemented:
export const TAURI_COMMANDS = {
  startSession: "start_capture_session",
  stopSession: "stop_capture_session",
  getEnvironment: "get_capture_environment",
} as const;
