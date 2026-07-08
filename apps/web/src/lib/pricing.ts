// FlowLens pricing tiers. Corporate plans first, Founder tier last per positioning brief.

export interface PricingTier {
  id: string;
  name: string;
  audience: string;
  priceMonthlyGbp: number | "custom";
  seats: string;
  captures: string;
  highlight?: boolean;
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "Small teams getting started",
    priceMonthlyGbp: 120,
    seats: "Up to 5 seats",
    captures: "100 captures / month",
    features: [
      "AI Workflow Doctor (limited findings)",
      "Markdown & JSON exports",
      "Community support",
    ],
  },
  {
    id: "team",
    name: "Team",
    audience: "A single ops, QA, or support team",
    priceMonthlyGbp: 450,
    seats: "Up to 15 seats",
    captures: "500 captures / month",
    features: [
      "AI Workflow Doctor on every capture",
      "Friction & automation scoring",
      "Markdown, PDF, JSON exports",
      "GitHub & Slack integrations",
      "Standard support",
    ],
  },
  {
    id: "business",
    name: "Business",
    audience: "Multi-department operations",
    priceMonthlyGbp: 1200,
    seats: "Up to 50 seats",
    captures: "Unlimited captures",
    highlight: true,
    features: [
      "AI Workflow Doctor on every capture",
      "Friction & automation scoring",
      "All export formats incl. audit packs",
      "GitHub, Jira, Linear, Slack integrations",
      "Workspace roles & approvals",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Multi-region orgs with compliance needs",
    priceMonthlyGbp: "custom",
    seats: "Unlimited seats",
    captures: "Unlimited captures",
    features: [
      "SSO/SCIM, custom data retention",
      "Dedicated audit-evidence pipeline",
      "Custom integrations & SLAs",
      "Named customer success manager",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    audience: "Consultancies & agencies serving multiple clients",
    priceMonthlyGbp: 650,
    seats: "Up to 20 seats, unlimited client workspaces",
    captures: "750 captures / month",
    features: [
      "Client-branded export packs",
      "Per-client workspace isolation",
      "Agency reporting dashboard",
      "Priority support",
    ],
  },
  {
    id: "founder",
    name: "Founder",
    audience: "Solo builders documenting their own process",
    priceMonthlyGbp: 19,
    seats: "1 seat",
    captures: "25 captures / month",
    features: [
      "AI Workflow Doctor (limited findings)",
      "Markdown export",
      "Community support",
    ],
  },
];
