import { describe, it, expect } from "vitest";
import { computeFrictionScore, autoClipMeaningfulSteps } from "@flowlens/workflow-intelligence";
import type { CaptureStep } from "@flowlens/capture-core";

function makeStep(overrides: Partial<CaptureStep> = {}): CaptureStep {
  return {
    id: overrides.id ?? "s1",
    index: overrides.index ?? 0,
    title: overrides.title ?? "Step",
    screenshotUrl: "https://example.com/shot.png",
    timestampMs: overrides.timestampMs ?? 0,
    tags: overrides.tags ?? [],
    annotations: [],
    ...overrides,
  };
}

describe("computeFrictionScore", () => {
  it("returns zero/low friction for a clean, well-documented workflow", () => {
    const steps = [
      makeStep({ id: "a", index: 0, description: "Open the app", action: "open" }),
      makeStep({ id: "b", index: 1, description: "Click submit", action: "click" }),
    ];
    const score = computeFrictionScore({ steps, totalDurationMs: 2000 });
    expect(score.repeatedActions).toBe(0);
    expect(score.unclearSteps).toBe(0);
    expect(score.manualCopyPasteEvents).toBe(0);
    expect(score.riskLevel).toBe("low");
  });

  it("detects repeated actions, copy-paste events, and unclear steps", () => {
    const steps = [
      makeStep({ id: "a", index: 0, action: "click", description: "Click A" }),
      makeStep({ id: "b", index: 1, action: "click", description: "" }),
      makeStep({ id: "c", index: 2, action: "click", tags: ["copy-paste"] }),
      makeStep({ id: "d", index: 3, action: "type", tags: ["copy-paste"] }),
    ];
    const score = computeFrictionScore({ steps, totalDurationMs: 5000 });
    expect(score.repeatedActions).toBeGreaterThanOrEqual(1);
    expect(score.unclearSteps).toBeGreaterThanOrEqual(1);
    expect(score.manualCopyPasteEvents).toBe(2);
    expect(score.overall).toBeGreaterThan(0);
  });

  it("raises risk level as waiting time increases", () => {
    const steps = [
      makeStep({ id: "a", index: 0, durationMs: 60000, description: "Waiting on approval", action: "wait", tags: ["waiting"] }),
      makeStep({ id: "b", index: 1, durationMs: 60000, description: "Still waiting", action: "wait", tags: ["waiting"] }),
    ];
    const score = computeFrictionScore({ steps, totalDurationMs: 120000 });
    expect(score.waitingTimeSeconds).toBeGreaterThan(0);
    expect(["medium", "high", "critical"]).toContain(score.riskLevel);
  });
});

describe("autoClipMeaningfulSteps", () => {
  it("drops idle and noise-tagged steps", () => {
    const steps = [
      makeStep({ id: "a", index: 0, action: "click" }),
      makeStep({ id: "b", index: 1, tags: ["idle"] }),
      makeStep({ id: "c", index: 2, tags: ["noise"] }),
      makeStep({ id: "d", index: 3, changeDetected: true }),
    ];
    const clipped = autoClipMeaningfulSteps(steps);
    expect(clipped.map((s) => s.id)).toEqual(["a", "d"]);
  });

  it("drops steps with no action, no change, and no tags", () => {
    const steps = [
      makeStep({ id: "a", index: 0 }),
      makeStep({ id: "b", index: 1, action: "click" }),
    ];
    const clipped = autoClipMeaningfulSteps(steps);
    expect(clipped.map((s) => s.id)).toEqual(["b"]);
  });
});
