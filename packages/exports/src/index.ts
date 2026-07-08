// FlowLens exports — turns a CaptureSession into shareable artifacts.
// Markdown and JSON are fully implemented; other formats are typed stubs that document
// their intended shape so a future session can wire in real renderers (pdf/docx/zip) or
// API calls (github-issue/jira-ticket/linear-issue/notion-page/etc).

import type { CaptureExport, CaptureSession, ExportFormat } from "@flowlens/capture-core";

export function exportToMarkdown(session: CaptureSession): string {
  const header = `# ${session.title}\n\n${session.description ?? ""}\n`;
  const steps = session.steps
    .map((s) => `## ${s.index + 1}. ${s.title}\n${s.description ?? ""}\n`)
    .join("\n");
  const findings = session.findings.length
    ? `## AI Findings\n${session.findings.map((f) => `- **${f.title}** (${f.impact}): ${f.description}`).join("\n")}\n`
    : "";
  return `${header}\n${steps}\n${findings}`;
}

export function exportToJSON(session: CaptureSession): string {
  return JSON.stringify(session, null, 2);
}

export interface ExportStub {
  format: ExportFormat;
  implemented: boolean;
  notes: string;
}

export const EXPORT_FORMAT_STATUS: ExportStub[] = [
  { format: "markdown", implemented: true, notes: "Fully implemented." },
  { format: "json", implemented: true, notes: "Fully implemented." },
  { format: "pdf", implemented: false, notes: "Planned: render markdown via a headless print pipeline." },
  { format: "html", implemented: false, notes: "Planned: markdown -> sanitized HTML template." },
  { format: "docx", implemented: false, notes: "Planned: use a docx generation library from the markdown AST." },
  { format: "zip", implemented: false, notes: "Planned: bundle markdown + screenshots + json into a zip." },
  { format: "github-issue", implemented: false, notes: "Planned: POST via GitHub REST API using packages/integrations." },
  { format: "jira-ticket", implemented: false, notes: "Planned: POST via Jira REST API using packages/integrations." },
  { format: "linear-issue", implemented: false, notes: "Planned: Linear GraphQL mutation using packages/integrations." },
  { format: "notion-page", implemented: false, notes: "Planned: Notion API page creation using packages/integrations." },
  { format: "obsidian-note", implemented: false, notes: "Planned: write a markdown file into a local/synced vault." },
  { format: "confluence-page", implemented: false, notes: "Planned: Confluence REST API page creation." },
  { format: "audit-pack", implemented: false, notes: "Planned: zip of markdown + screenshots + signed metadata." },
  { format: "training-guide", implemented: false, notes: "Planned: markdown variant tuned for onboarding tone." },
];

export function buildExportRecord(session: CaptureSession, format: ExportFormat): CaptureExport {
  const content = format === "markdown" ? exportToMarkdown(session) : format === "json" ? exportToJSON(session) : undefined;
  return {
    id: `export-${session.id}-${format}`,
    captureId: session.id,
    format,
    createdAt: new Date().toISOString(),
    content,
  };
}
