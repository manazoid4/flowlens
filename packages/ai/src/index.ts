// FlowLens AI provider abstraction. Structured outputs only — no chatbot surface.
// Ships with a deterministic mock provider so the app works without a live API key.

import type {
  AIFinding,
  CaptureSession,
  CaptureStep,
} from "@flowlens/capture-core";

export interface WorkflowDoctorReport {
  whatWasAttempted: string;
  didItSucceed: boolean;
  frictionSummary: string;
  automationOpportunities: string[];
  risksAndRedactions: string[];
  recommendedAssets: Array<{
    asset: "sop" | "bug-report" | "training-guide" | "ticket";
    reason: string;
  }>;
  nextBestAction: string;
  findings: AIFinding[];
}

export interface AIProvider {
  name: string;
  summarizeStep(step: CaptureStep): Promise<string>;
  detectStepIssues(step: CaptureStep, previousStep?: CaptureStep): Promise<AIFinding[]>;
  generateWorkflowDoctorReport(session: CaptureSession): Promise<WorkflowDoctorReport>;
  generateSOP(session: CaptureSession): Promise<string>;
  generateBugReport(session: CaptureSession): Promise<string>;
  generateTrainingGuide(session: CaptureSession): Promise<string>;
}

function pickHighestImpact(findings: AIFinding[]): AIFinding[] {
  return [...findings].sort((a, b) => {
    const order = { low: 0, medium: 1, high: 2, critical: 3 } as const;
    return order[b.impact] - order[a.impact];
  });
}

/**
 * Deterministic mock provider — used in dev, tests, and the deployed demo when no
 * live AI_PROVIDER key is configured. Produces plausible structured output derived
 * from the capture's existing steps/findings rather than calling an external API.
 */
export class MockAIProvider implements AIProvider {
  name = "mock";

  async summarizeStep(step: CaptureStep): Promise<string> {
    return step.description
      ? step.description
      : `${step.action ?? "Action"} performed in ${step.appName ?? "the application"}.`;
  }

  async detectStepIssues(step: CaptureStep): Promise<AIFinding[]> {
    return step.severity && step.severity !== "info"
      ? [
          {
            id: `finding-${step.id}`,
            kind: "friction",
            title: `Possible friction at step ${step.index + 1}`,
            description: step.description ?? "This step may be slower or less clear than necessary.",
            impact: step.severity === "critical" ? "critical" : step.severity === "high" ? "high" : "medium",
            relatedStepIds: [step.id],
            suggestedAction: "Review this step for a simpler or automatable path.",
            confidence: 0.6,
            createdAt: new Date().toISOString(),
          },
        ]
      : [];
  }

  async generateWorkflowDoctorReport(session: CaptureSession): Promise<WorkflowDoctorReport> {
    const findings = pickHighestImpact(session.findings);
    const automationFindings = findings.filter((f) => f.kind === "automation");
    const riskFindings = findings.filter((f) => f.kind === "security" || f.kind === "compliance");

    return {
      whatWasAttempted: session.description ?? session.title,
      didItSucceed: session.status === "ready",
      frictionSummary: session.frictionScore
        ? `Friction score ${session.frictionScore.overall}/100 (risk: ${session.frictionScore.riskLevel}). ` +
          `${session.frictionScore.repeatedActions} repeated actions, ` +
          `${session.frictionScore.manualCopyPasteEvents} manual copy/paste events detected.`
        : "No friction score computed yet.",
      automationOpportunities: automationFindings.map((f) => f.title),
      risksAndRedactions: riskFindings.map((f) => f.title),
      recommendedAssets: [
        { asset: "sop", reason: "Multiple steps follow a repeatable pattern worth standardizing." },
        { asset: "training-guide", reason: "New team members would benefit from a walkthrough of this flow." },
      ],
      nextBestAction:
        findings[0]?.suggestedAction ?? "Review the capture and confirm the workflow is documented correctly.",
      findings,
    };
  }

  async generateSOP(session: CaptureSession): Promise<string> {
    const lines = session.steps.map((s) => `${s.index + 1}. ${s.title}${s.description ? ` — ${s.description}` : ""}`);
    return `# SOP: ${session.title}\n\n${lines.join("\n")}\n`;
  }

  async generateBugReport(session: CaptureSession): Promise<string> {
    const bug = session.findings.find((f) => f.kind === "bug");
    return `# Bug Report: ${session.title}\n\n**Summary:** ${bug?.title ?? "Unexpected behavior observed"}\n\n**Steps to reproduce:**\n${session.steps
      .map((s) => `${s.index + 1}. ${s.title}`)
      .join("\n")}\n\n**Expected vs actual:** ${bug?.description ?? "See attached steps."}\n`;
  }

  async generateTrainingGuide(session: CaptureSession): Promise<string> {
    return `# Training Guide: ${session.title}\n\n${session.steps
      .map((s) => `## Step ${s.index + 1}: ${s.title}\n${s.description ?? ""}\n`)
      .join("\n")}`;
  }
}

export function getAIProvider(): AIProvider {
  // AI_PROVIDER env var selects the provider; only "mock" is implemented in this build.
  // A live OpenAI-compatible provider can be dropped in here later without changing callers.
  return new MockAIProvider();
}
