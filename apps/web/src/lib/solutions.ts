export interface Solution {
  slug: string;
  title: string;
  tagline: string;
  painPoints: string[];
  outcomes: string[];
}

export const solutions: Solution[] = [
  {
    slug: "operations",
    title: "Operations",
    tagline: "Turn tribal knowledge into SOPs your team can actually follow.",
    painPoints: [
      "Process knowledge lives in one person's head",
      "SOPs go stale the moment the process changes",
      "No visibility into where handoffs break down",
    ],
    outcomes: [
      "Auto-generated, always-current SOPs from real work",
      "Friction scoring highlights where processes break down",
      "Automation opportunities surfaced without a consultant",
    ],
  },
  {
    slug: "qa",
    title: "QA & Product",
    tagline: "Reproducible bug evidence with full step-by-step context.",
    painPoints: [
      "Bug reports are a paragraph of prose engineers can't reproduce",
      "Screenshots without context waste triage time",
      "No severity or environment metadata attached to reports",
    ],
    outcomes: [
      "Step-by-step reproduction with environment metadata",
      "AI-suggested severity and root-cause hints",
      "One-click export to GitHub, Jira, or Linear",
    ],
  },
  {
    slug: "support",
    title: "Support & CX",
    tagline: "Cut resolution time with visual, shareable ticket evidence.",
    painPoints: [
      "Agents repeat the same manual steps across tickets",
      "Customers can't clearly describe what went wrong",
      "Escalations lose context between tiers",
    ],
    outcomes: [
      "Visual evidence attached directly to tickets",
      "Friction scoring flags repeatable automation wins",
      "Faster tier-1 to tier-2 handoffs with full context",
    ],
  },
  {
    slug: "it",
    title: "IT & MSPs",
    tagline: "Document fixes once, resolve the next ten tickets instantly.",
    painPoints: [
      "The same fix gets re-documented by every technician",
      "Provisioning workflows touch five disconnected systems",
      "Knowledge leaves when a technician leaves",
    ],
    outcomes: [
      "Reusable, searchable process library",
      "Automation opportunities for repetitive provisioning",
      "Faster onboarding for new IT technicians",
    ],
  },
  {
    slug: "compliance",
    title: "Compliance & Audit",
    tagline: "Evidence packs ready for SOC 2, ISO, and internal audit.",
    painPoints: [
      "Audit evidence is scattered across screenshots and emails",
      "Manual access reviews are hard to prove after the fact",
      "No consistent format for audit-ready documentation",
    ],
    outcomes: [
      "Structured audit-evidence export packs",
      "Compliance risk findings flagged automatically",
      "Consistent, timestamped evidence trail",
    ],
  },
  {
    slug: "training",
    title: "Training & Enablement",
    tagline: "Generate onboarding guides straight from real work.",
    painPoints: [
      "New hires learn by shadowing, not documentation",
      "Training materials lag behind the actual process",
      "No way to spot where trainees consistently struggle",
    ],
    outcomes: [
      "Training guides generated directly from real captures",
      "Training-gap findings show where guides are missing",
      "Consistent onboarding regardless of who trains whom",
    ],
  },
  {
    slug: "agencies",
    title: "Agencies & Consultants",
    tagline: "Client-ready reports without the manual writeup.",
    painPoints: [
      "Monthly client reporting eats billable hours",
      "Manually combining data from multiple client tools",
      "Inconsistent reporting quality across account managers",
    ],
    outcomes: [
      "Client-branded evidence packs generated automatically",
      "Consistent reporting quality across every account",
      "Per-client workspace isolation",
    ],
  },
  {
    slug: "founders",
    title: "Founders & Builders",
    tagline: "Document your own process before you hire for it.",
    painPoints: [
      "You're the only one who knows how anything works",
      "No time to write documentation while building",
      "Hard to hand off tasks without a demo call",
    ],
    outcomes: [
      "Capture your own workflow once, hand it off cleanly",
      "SOPs ready before your first hire starts",
      "See where your own process has hidden friction",
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
