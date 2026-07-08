// FlowLens integrations — typed connect/export contracts for third-party tools.
// Each integration is a stub: real HTTP calls are not made yet, but the interface is
// stable so apps/web can build UI against it and a future session can implement the
// network layer without changing call sites.

export type IntegrationId =
  | "github"
  | "jira"
  | "linear"
  | "slack"
  | "notion"
  | "obsidian";

export interface IntegrationConnection {
  id: IntegrationId;
  connected: boolean;
  accountLabel?: string;
  connectedAt?: string;
}

export interface IntegrationExportRequest {
  integration: IntegrationId;
  captureId: string;
  title: string;
  body: string;
  targetProjectOrChannel?: string;
}

export interface IntegrationExportResult {
  success: boolean;
  externalUrl?: string;
  error?: string;
}

export interface Integration {
  id: IntegrationId;
  label: string;
  description: string;
  connect(): Promise<IntegrationConnection>;
  disconnect(): Promise<void>;
  export(request: IntegrationExportRequest): Promise<IntegrationExportResult>;
}

function stubIntegration(id: IntegrationId, label: string, description: string): Integration {
  return {
    id,
    label,
    description,
    async connect() {
      return { id, connected: false, accountLabel: undefined };
    },
    async disconnect() {
      // no-op stub
    },
    async export(request) {
      return {
        success: false,
        error: `${label} export is not wired up yet in this build. Request captured: ${request.title}`,
      };
    },
  };
}

export const INTEGRATIONS: Record<IntegrationId, Integration> = {
  github: stubIntegration("github", "GitHub", "Create issues directly from a capture's findings."),
  jira: stubIntegration("jira", "Jira", "Push AI findings as tickets into a Jira project."),
  linear: stubIntegration("linear", "Linear", "Create Linear issues from friction findings."),
  slack: stubIntegration("slack", "Slack", "Post capture summaries into a Slack channel."),
  notion: stubIntegration("notion", "Notion", "Publish SOPs and training guides as Notion pages."),
  obsidian: stubIntegration("obsidian", "Obsidian", "Export captures as notes into an Obsidian vault."),
};
