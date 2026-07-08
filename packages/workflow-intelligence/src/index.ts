// FlowLens workflow-intelligence — friction scoring and auto-clip heuristics.
// Pure functions, no side effects, so they're easy to unit test.

import type { CaptureStep, FrictionScore, RiskLevel } from "@flowlens/capture-core";

export interface FrictionInputs {
  steps: CaptureStep[];
  totalDurationMs: number;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function riskFromScore(overall: number): RiskLevel {
  if (overall >= 75) return "critical";
  if (overall >= 50) return "high";
  if (overall >= 25) return "medium";
  return "low";
}

/**
 * Computes a FrictionScore from a set of capture steps. Heuristics:
 * - repeated actions: steps whose `action` field repeats back-to-back
 * - unclear steps: steps missing a description
 * - manual copy/paste events: steps tagged "copy-paste"
 * - waiting time: sum of any step gaps > 3s (approximated from durationMs)
 * - automation opportunity: rises with repeated actions + copy/paste + waiting
 * - documentation quality: falls with unclear steps
 */
export function computeFrictionScore(inputs: FrictionInputs): FrictionScore {
  const { steps } = inputs;

  let repeatedActions = 0;
  for (let i = 1; i < steps.length; i++) {
    if (steps[i].action && steps[i].action === steps[i - 1].action) repeatedActions++;
  }

  const unclearSteps = steps.filter((s) => !s.description || s.description.trim().length < 5).length;
  const manualCopyPasteEvents = steps.filter((s) => s.tags.includes("copy-paste")).length;
  const waitingTimeSeconds = steps
    .filter((s) => (s.durationMs ?? 0) > 3000)
    .reduce((sum, s) => sum + (s.durationMs ?? 0) / 1000, 0);

  const automationOpportunity = clamp(
    repeatedActions * 15 + manualCopyPasteEvents * 12 + Math.min(waitingTimeSeconds, 60) * 0.5,
    0,
    100,
  );

  const documentationQuality = clamp(100 - unclearSteps * 12, 0, 100);

  const overall = clamp(
    repeatedActions * 8 +
      unclearSteps * 6 +
      manualCopyPasteEvents * 10 +
      Math.min(waitingTimeSeconds, 120) * 0.3,
    0,
    100,
  );

  return {
    overall: Math.round(overall),
    repeatedActions,
    unclearSteps,
    manualCopyPasteEvents,
    waitingTimeSeconds: Math.round(waitingTimeSeconds),
    automationOpportunity: Math.round(automationOpportunity),
    documentationQuality: Math.round(documentationQuality),
    riskLevel: riskFromScore(overall),
  };
}

/**
 * Auto-clipping: given a raw sequence of steps (potentially including idle/noise steps),
 * return only the "meaningful" ones — those with a real action, a screenshot change, or an
 * explicit tag — dropping steps that look like idle/no-op frames.
 */
export function autoClipMeaningfulSteps(steps: CaptureStep[]): CaptureStep[] {
  return steps.filter((step) => {
    if (step.tags.includes("idle") || step.tags.includes("noise")) return false;
    if (!step.changeDetected && !step.action && step.tags.length === 0) return false;
    return true;
  });
}
