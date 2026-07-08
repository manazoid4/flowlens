// FlowLens browser extension capture agent contract (MV3 shell).
// Defines the messaging contract between the extension's background service worker,
// content scripts, and the popup UI. No implementation exists yet in this build.

import type { CaptureStep } from "@flowlens/capture-core";

export type ExtensionMessage =
  | { type: "START_CAPTURE"; workspaceId: string; mode: string }
  | { type: "STOP_CAPTURE" }
  | { type: "STEP_CAPTURED"; step: CaptureStep }
  | { type: "GET_STATUS" };

export interface ExtensionCaptureState {
  isCapturing: boolean;
  sessionId?: string;
  stepCount: number;
}
