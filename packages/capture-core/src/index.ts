// FlowLens capture-core — shared domain types for capture sessions, steps, annotations,
// AI findings, friction scoring, and export formats. This is the single source of truth
// consumed by apps/web, packages/ai, packages/exports, packages/workflow-intelligence.

export type WorkspaceRole =
  | "owner"
  | "admin"
  | "editor"
  | "reviewer"
  | "viewer";

export type CaptureMode =
  | "bug-report"
  | "sop"
  | "training"
  | "support"
  | "it-troubleshooting"
  | "qa"
  | "audit-evidence"
  | "product-improvement"
  | "customer-onboarding"
  | "agency-client-report"
  | "automation-discovery";

export interface CaptureEnvironment {
  os?: string;
  browser?: string;
  appVersion?: string;
  url?: string;
  deviceType?: "desktop" | "laptop" | "mobile" | "tablet";
  locale?: string;
}

export type StepSeverity = "info" | "low" | "medium" | "high" | "critical";

export type AnnotationKind =
  | "arrow"
  | "box"
  | "highlight"
  | "blur"
  | "text"
  | "numbered-marker"
  | "crop";

export interface Annotation {
  id: string;
  kind: AnnotationKind;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  text?: string;
  color?: string;
  order?: number;
  createdBy?: string;
  createdAt: string;
}

export interface CaptureStep {
  id: string;
  index: number;
  title: string;
  description?: string;
  screenshotUrl: string;
  thumbnailUrl?: string;
  timestampMs: number;
  durationMs?: number;
  appName?: string;
  action?: string;
  tags: string[];
  severity?: StepSeverity;
  annotations: Annotation[];
  redacted?: boolean;
  changeDetected?: boolean;
  aiSummary?: string;
}

export type AIFindingKind =
  | "bug"
  | "friction"
  | "automation"
  | "missing-context"
  | "security"
  | "compliance"
  | "product-idea"
  | "training-gap"
  | "support-gap"
  | "process-risk"
  | "playbook";

export type AIFindingImpact = "low" | "medium" | "high" | "critical";

export interface AIFinding {
  id: string;
  kind: AIFindingKind;
  title: string;
  description: string;
  impact: AIFindingImpact;
  relatedStepIds: string[];
  suggestedAction?: string;
  suggestedOwner?: string;
  confidence?: number; // 0-1
  createdAt: string;
}

export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface FrictionScore {
  overall: number; // 0-100, higher = more friction
  repeatedActions: number;
  unclearSteps: number;
  manualCopyPasteEvents: number;
  waitingTimeSeconds: number;
  automationOpportunity: number; // 0-100
  documentationQuality: number; // 0-100
  riskLevel: RiskLevel;
}

export type ExportFormat =
  | "markdown"
  | "pdf"
  | "html"
  | "docx"
  | "json"
  | "zip"
  | "github-issue"
  | "jira-ticket"
  | "linear-issue"
  | "notion-page"
  | "obsidian-note"
  | "confluence-page"
  | "audit-pack"
  | "training-guide";

export interface CaptureExport {
  id: string;
  captureId: string;
  format: ExportFormat;
  createdAt: string;
  url?: string;
  content?: string;
  metadata?: Record<string, unknown>;
}

export interface CaptureComment {
  id: string;
  stepId?: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface CaptureSession {
  id: string;
  workspaceId: string;
  title: string;
  description?: string;
  mode: CaptureMode;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  environment?: CaptureEnvironment;
  steps: CaptureStep[];
  comments: CaptureComment[];
  findings: AIFinding[];
  frictionScore?: FrictionScore;
  exports: CaptureExport[];
  status: "draft" | "processing" | "ready" | "archived" | "needs-review";
  estimatedTimeSavedMinutes?: number;
  estimatedMoneySavedGbp?: number;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: "starter" | "team" | "business" | "enterprise" | "agency" | "founder";
  createdAt: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  name: string;
  email: string;
}
