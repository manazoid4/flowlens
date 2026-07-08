// FlowLens demo/seed data. Deliberately separated from UI + business logic so pages stay
// thin and this file can later be swapped for real Supabase queries without touching JSX.

import type {
  CaptureSession,
  FrictionScore,
  Workspace,
} from "@flowlens/capture-core";
import { computeFrictionScore } from "@flowlens/workflow-intelligence";

export const demoWorkspaces: Workspace[] = [
  { id: "ws-acme-ops", name: "Acme Operations", slug: "acme-ops", plan: "business", createdAt: "2026-01-14T09:00:00Z" },
  { id: "ws-qa-team", name: "QA Team", slug: "qa-team", plan: "team", createdAt: "2026-02-02T09:00:00Z" },
  { id: "ws-support-team", name: "Support Team", slug: "support-team", plan: "team", createdAt: "2026-02-20T09:00:00Z" },
];

function shot(seed: string) {
  return `https://placehold.co/960x600/1b2454/e2eaff?text=${encodeURIComponent(seed)}`;
}

function withFriction(session: Omit<CaptureSession, "frictionScore">): CaptureSession {
  const frictionScore: FrictionScore = computeFrictionScore({
    steps: session.steps,
    totalDurationMs: session.steps.reduce((sum, s) => sum + (s.durationMs ?? 0), 0),
  });
  return { ...session, frictionScore };
}

export const demoCaptures: CaptureSession[] = [
  withFriction({
    id: "cap-invoice-approval",
    workspaceId: "ws-acme-ops",
    title: "Invoice approval workflow (Finance)",
    description: "A finance ops lead approves a supplier invoice across email, the ERP, and Slack.",
    mode: "sop",
    createdBy: "Priya Shah",
    createdAt: "2026-06-30T10:00:00Z",
    updatedAt: "2026-06-30T10:20:00Z",
    status: "ready",
    environment: { os: "Windows 11", browser: "Chrome", appVersion: "ERP v4.2", deviceType: "desktop" },
    estimatedTimeSavedMinutes: 22,
    estimatedMoneySavedGbp: 340,
    steps: [
      { id: "s1", index: 0, title: "Open invoice email from supplier", screenshotUrl: shot("Invoice email"), timestampMs: 0, durationMs: 4000, appName: "Outlook", action: "open-email", tags: ["email"], annotations: [] },
      { id: "s2", index: 1, title: "Download PDF attachment", description: "Save invoice PDF to local Invoices folder.", screenshotUrl: shot("Download PDF"), timestampMs: 4000, durationMs: 3000, appName: "Outlook", action: "download", tags: ["manual"], annotations: [] },
      { id: "s3", index: 2, title: "Log in to ERP system", screenshotUrl: shot("ERP login"), timestampMs: 7000, durationMs: 6000, appName: "ERP", action: "login", tags: ["auth"], annotations: [] },
      { id: "s4", index: 3, title: "Manually re-type invoice number and amount", description: "No copy-paste support between PDF and ERP form.", screenshotUrl: shot("Retype invoice"), timestampMs: 13000, durationMs: 9000, appName: "ERP", action: "manual-entry", tags: ["copy-paste"], severity: "medium", annotations: [] },
      { id: "s5", index: 4, title: "Upload PDF as supporting document", screenshotUrl: shot("Upload PDF"), timestampMs: 22000, durationMs: 5000, appName: "ERP", action: "upload", tags: ["manual"], annotations: [] },
      { id: "s6", index: 5, title: "Wait for approver in Slack", description: "Approver often offline; average wait observed across captures.", screenshotUrl: shot("Slack wait"), timestampMs: 27000, durationMs: 45000, appName: "Slack", action: "wait", tags: ["waiting"], severity: "high", annotations: [] },
      { id: "s7", index: 6, title: "Mark invoice as approved in ERP", screenshotUrl: shot("Mark approved"), timestampMs: 72000, durationMs: 3000, appName: "ERP", action: "approve", tags: [], annotations: [] },
    ],
    comments: [
      { id: "c1", stepId: "s4", author: "Priya Shah", body: "This retyping step is where most of our data-entry errors come from.", createdAt: "2026-06-30T10:05:00Z" },
    ],
    findings: [
      { id: "f1", kind: "automation", title: "Auto-extract invoice fields from PDF", description: "OCR/field extraction could remove the manual retype step entirely.", impact: "high", relatedStepIds: ["s4"], suggestedAction: "Evaluate an invoice-parsing API integration for the ERP intake form.", suggestedOwner: "Finance Systems", confidence: 0.82, createdAt: "2026-06-30T10:21:00Z" },
      { id: "f2", kind: "friction", title: "Approver response time is the main bottleneck", description: "45s in this capture, but real-world delays run to hours.", impact: "high", relatedStepIds: ["s6"], suggestedAction: "Add a Slack reminder bot after 2 hours of no response.", confidence: 0.7, createdAt: "2026-06-30T10:22:00Z" },
      { id: "f3", kind: "process-risk", title: "No audit trail linking email to ERP record", description: "The original supplier email is not referenced anywhere in the ERP entry.", impact: "medium", relatedStepIds: ["s1", "s7"], suggestedAction: "Store the email message-id in the ERP record's metadata.", confidence: 0.6, createdAt: "2026-06-30T10:23:00Z" },
    ],
    exports: [
      { id: "e1", captureId: "cap-invoice-approval", format: "markdown", createdAt: "2026-06-30T10:25:00Z" },
    ],
  }),
  withFriction({
    id: "cap-login-bug",
    workspaceId: "ws-qa-team",
    title: "Password reset link expires early (bug)",
    description: "QA reproduces a bug where the password reset link fails after about 2 minutes instead of the documented 30.",
    mode: "bug-report",
    createdBy: "Daniel Ortiz",
    createdAt: "2026-07-01T14:00:00Z",
    updatedAt: "2026-07-01T14:10:00Z",
    status: "needs-review",
    environment: { os: "macOS 15", browser: "Safari", appVersion: "web app v2.9.1", deviceType: "laptop" },
    estimatedTimeSavedMinutes: 15,
    steps: [
      { id: "s1", index: 0, title: "Request password reset", screenshotUrl: shot("Request reset"), timestampMs: 0, durationMs: 2000, appName: "Web app", action: "request-reset", tags: [], annotations: [] },
      { id: "s2", index: 1, title: "Open reset email", screenshotUrl: shot("Reset email"), timestampMs: 2000, durationMs: 2000, appName: "Gmail", action: "open-email", tags: [], annotations: [] },
      { id: "s3", index: 2, title: "Wait 3 minutes before clicking link", description: "Simulating a realistic delay before the user checks email.", screenshotUrl: shot("Wait"), timestampMs: 4000, durationMs: 180000, appName: "Gmail", action: "wait", tags: ["waiting"], annotations: [] },
      { id: "s4", index: 3, title: "Click reset link", screenshotUrl: shot("Click link"), timestampMs: 184000, durationMs: 1000, appName: "Web app", action: "click-link", tags: [], annotations: [] },
      { id: "s5", index: 4, title: "Error: This link has expired", description: "Link expired well before the documented 30-minute window.", screenshotUrl: shot("Expired error"), timestampMs: 185000, durationMs: 2000, appName: "Web app", action: "error", tags: [], severity: "critical", annotations: [] },
    ],
    comments: [],
    findings: [
      { id: "f1", kind: "bug", title: "Reset token TTL misconfigured", description: "Token appears to expire in roughly 2-3 minutes, not the documented 30.", impact: "critical", relatedStepIds: ["s5"], suggestedAction: "Check the reset-token TTL config in the auth service; likely a units bug (seconds vs minutes).", suggestedOwner: "Platform team", confidence: 0.85, createdAt: "2026-07-01T14:11:00Z" },
      { id: "f2", kind: "security", title: "Error message may leak timing info", description: "Confirm the expired-link error does not reveal whether the account exists.", impact: "low", relatedStepIds: ["s5"], confidence: 0.4, createdAt: "2026-07-01T14:12:00Z" },
    ],
    exports: [],
  }),

  withFriction({
    id: "cap-refund-support",
    workspaceId: "ws-support-team",
    title: "Customer refund request handling",
    description: "A support agent processes a refund across the helpdesk, payment processor, and CRM.",
    mode: "support",
    createdBy: "Amara Okafor",
    createdAt: "2026-07-02T11:00:00Z",
    updatedAt: "2026-07-02T11:15:00Z",
    status: "ready",
    environment: { os: "Windows 11", browser: "Edge", appVersion: "Helpdesk v3", deviceType: "desktop" },
    estimatedTimeSavedMinutes: 9,
    estimatedMoneySavedGbp: 60,
    steps: [
      { id: "s1", index: 0, title: "Open refund request ticket", screenshotUrl: shot("Ticket"), timestampMs: 0, durationMs: 3000, appName: "Helpdesk", action: "open-ticket", tags: [], annotations: [] },
      { id: "s2", index: 1, title: "Copy order ID from ticket", screenshotUrl: shot("Copy order id"), timestampMs: 3000, durationMs: 2000, appName: "Helpdesk", action: "copy", tags: ["copy-paste"], annotations: [] },
      { id: "s3", index: 2, title: "Paste order ID into payment processor", screenshotUrl: shot("Paste order id"), timestampMs: 5000, durationMs: 2000, appName: "Payment processor", action: "paste", tags: ["copy-paste"], annotations: [] },
      { id: "s4", index: 3, title: "Issue refund", screenshotUrl: shot("Issue refund"), timestampMs: 7000, durationMs: 4000, appName: "Payment processor", action: "refund", tags: [], annotations: [] },
      { id: "s5", index: 4, title: "Update CRM refund status", screenshotUrl: shot("CRM update"), timestampMs: 11000, durationMs: 3000, appName: "CRM", action: "update-status", tags: [], annotations: [] },
      { id: "s6", index: 5, title: "Reply to customer with confirmation", screenshotUrl: shot("Reply customer"), timestampMs: 14000, durationMs: 5000, appName: "Helpdesk", action: "reply", tags: [], annotations: [] },
    ],
    comments: [],
    findings: [
      { id: "f1", kind: "automation", title: "Auto-sync order ID between helpdesk and CRM", description: "Copy/paste of the order ID appears in nearly every refund ticket.", impact: "medium", relatedStepIds: ["s2", "s3"], suggestedAction: "Add an order-ID lookup integration between the helpdesk and payment processor.", confidence: 0.75, createdAt: "2026-07-02T11:16:00Z" },
      { id: "f2", kind: "training-gap", title: "New agents skip the CRM status update", description: "Several past tickets show refunds issued without CRM sync.", impact: "medium", relatedStepIds: ["s5"], suggestedAction: "Add this step to the onboarding training guide with a screenshot.", confidence: 0.55, createdAt: "2026-07-02T11:17:00Z" },
    ],
    exports: [],
  }),
  withFriction({
    id: "cap-onboarding-it",
    workspaceId: "ws-acme-ops",
    title: "New starter laptop provisioning",
    description: "IT sets up accounts and software for a new starter across five different admin consoles.",
    mode: "it-troubleshooting",
    createdBy: "Sam Whitfield",
    createdAt: "2026-07-03T09:00:00Z",
    updatedAt: "2026-07-03T09:30:00Z",
    status: "ready",
    environment: { os: "Windows 11", browser: "Chrome", deviceType: "laptop" },
    estimatedTimeSavedMinutes: 35,
    estimatedMoneySavedGbp: 210,
    steps: [
      { id: "s1", index: 0, title: "Create account in identity provider", screenshotUrl: shot("IdP account"), timestampMs: 0, durationMs: 6000, appName: "IdP admin", action: "create-account", tags: [], annotations: [] },
      { id: "s2", index: 1, title: "Assign licenses in productivity suite", screenshotUrl: shot("Assign licenses"), timestampMs: 6000, durationMs: 5000, appName: "Admin console", action: "assign-license", tags: [], annotations: [] },
      { id: "s3", index: 2, title: "Re-enter starter details into HR system", description: "Same details entered a third time; no sync from the IdP step.", screenshotUrl: shot("HR system entry"), timestampMs: 11000, durationMs: 8000, appName: "HR system", action: "manual-entry", tags: ["copy-paste"], severity: "medium", annotations: [] },
      { id: "s4", index: 3, title: "Add to relevant Slack channels", screenshotUrl: shot("Slack channels"), timestampMs: 19000, durationMs: 4000, appName: "Slack admin", action: "add-member", tags: [], annotations: [] },
      { id: "s5", index: 4, title: "Wait for hardware asset tag scan", screenshotUrl: shot("Asset tag"), timestampMs: 23000, durationMs: 40000, appName: "Asset system", action: "wait", tags: ["waiting"], severity: "low", annotations: [] },
      { id: "s6", index: 5, title: "Send welcome email with credentials", screenshotUrl: shot("Welcome email"), timestampMs: 63000, durationMs: 4000, appName: "Mail", action: "send-email", tags: [], annotations: [] },
    ],
    comments: [],
    findings: [
      { id: "f1", kind: "automation", title: "Provisioning could be triggered from a single HR event", description: "Four separate systems are updated manually with the same starter details.", impact: "high", relatedStepIds: ["s1", "s2", "s3", "s4"], suggestedAction: "Wire the HR system webhook to the IdP, license, and Slack provisioning APIs.", suggestedOwner: "IT Ops", confidence: 0.8, createdAt: "2026-07-03T09:31:00Z" },
    ],
    exports: [],
  }),

  withFriction({
    id: "cap-audit-evidence-access-review",
    workspaceId: "ws-acme-ops",
    title: "Quarterly access review (SOC 2 evidence)",
    description: "Compliance lead walks through the quarterly user access review for the SOC 2 audit.",
    mode: "audit-evidence",
    createdBy: "Priya Shah",
    createdAt: "2026-07-04T15:00:00Z",
    updatedAt: "2026-07-04T15:20:00Z",
    status: "ready",
    environment: { os: "Windows 11", browser: "Chrome", deviceType: "desktop" },
    steps: [
      { id: "s1", index: 0, title: "Export current user access list", screenshotUrl: shot("Export access list"), timestampMs: 0, durationMs: 5000, appName: "IdP admin", action: "export", tags: [], annotations: [] },
      { id: "s2", index: 1, title: "Cross-check against HR active employee list", screenshotUrl: shot("Cross check"), timestampMs: 5000, durationMs: 12000, appName: "Spreadsheet", action: "review", tags: [], annotations: [] },
      { id: "s3", index: 2, title: "Flag two stale accounts for removal", screenshotUrl: shot("Flag accounts"), timestampMs: 17000, durationMs: 6000, appName: "Spreadsheet", action: "flag", tags: [], severity: "high", annotations: [] },
      { id: "s4", index: 3, title: "Revoke access for flagged accounts", screenshotUrl: shot("Revoke access"), timestampMs: 23000, durationMs: 4000, appName: "IdP admin", action: "revoke", tags: [], annotations: [] },
      { id: "s5", index: 4, title: "Save signed-off review as audit evidence", screenshotUrl: shot("Save evidence"), timestampMs: 27000, durationMs: 3000, appName: "Compliance tool", action: "save", tags: [], annotations: [] },
    ],
    comments: [],
    findings: [
      { id: "f1", kind: "compliance", title: "Stale accounts existed for over 90 days", description: "Two accounts had access well beyond the employee's actual tenure.", impact: "high", relatedStepIds: ["s3"], suggestedAction: "Automate offboarding to trigger same-day access revocation.", confidence: 0.7, createdAt: "2026-07-04T15:21:00Z" },
    ],
    exports: [],
  }),

  withFriction({
    id: "cap-client-report-agency",
    workspaceId: "ws-support-team",
    title: "Monthly client campaign report walkthrough",
    description: "An agency account manager compiles a monthly performance report across three ad platforms.",
    mode: "agency-client-report",
    createdBy: "Amara Okafor",
    createdAt: "2026-07-05T10:00:00Z",
    updatedAt: "2026-07-05T10:25:00Z",
    status: "draft",
    environment: { os: "macOS 15", browser: "Chrome", deviceType: "laptop" },
    estimatedTimeSavedMinutes: 40,
    estimatedMoneySavedGbp: 280,
    steps: [
      { id: "s1", index: 0, title: "Export campaign metrics from ad platform A", screenshotUrl: shot("Export A"), timestampMs: 0, durationMs: 5000, appName: "Ad Platform A", action: "export", tags: [], annotations: [] },
      { id: "s2", index: 1, title: "Export campaign metrics from ad platform B", screenshotUrl: shot("Export B"), timestampMs: 5000, durationMs: 5000, appName: "Ad Platform B", action: "export", tags: [], annotations: [] },
      { id: "s3", index: 2, title: "Manually combine spreadsheets", description: "No unified reporting dashboard across platforms.", screenshotUrl: shot("Combine spreadsheets"), timestampMs: 10000, durationMs: 20000, appName: "Spreadsheet", action: "manual-entry", tags: ["copy-paste"], severity: "medium", annotations: [] },
      { id: "s4", index: 3, title: "Build client-facing slide deck", screenshotUrl: shot("Slide deck"), timestampMs: 30000, durationMs: 15000, appName: "Slides", action: "build-deck", tags: [], annotations: [] },
    ],
    comments: [],
    findings: [
      { id: "f1", kind: "automation", title: "Unify ad platform reporting", description: "A single reporting connector could remove the manual spreadsheet merge.", impact: "high", relatedStepIds: ["s3"], suggestedAction: "Evaluate a reporting aggregation tool or an internal script.", confidence: 0.65, createdAt: "2026-07-05T10:26:00Z" },
    ],
    exports: [],
  }),
];

export function getWorkspace(id: string) {
  return demoWorkspaces.find((w) => w.id === id);
}

export function getCapture(id: string) {
  return demoCaptures.find((c) => c.id === id);
}

export function getCapturesForWorkspace(workspaceId: string) {
  return demoCaptures.filter((c) => c.workspaceId === workspaceId);
}
