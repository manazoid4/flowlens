export interface CompareEntry {
  slug: string;
  competitor: string;
  summary: string;
  theirStrength: string;
  flowlensDifference: string[];
}

export const compareEntries: CompareEntry[] = [
  {
    slug: "windows-steps-recorder",
    competitor: "Windows Steps Recorder",
    summary: "Microsoft's built-in Steps Recorder captured basic click-by-click screenshots and was deprecated, leaving a documentation gap on Windows.",
    theirStrength: "Free, built into Windows, zero setup.",
    flowlensDifference: [
      "AI explains what happened instead of a raw screenshot list",
      "Friction scoring and automation suggestions, not just steps",
      "Routes directly into SOPs, tickets, and training guides",
    ],
  },
  {
    slug: "scribe",
    competitor: "Scribe",
    summary: "Scribe auto-generates step-by-step how-to guides from screen captures, focused on documentation.",
    theirStrength: "Fast, polished step-by-step guide generation.",
    flowlensDifference: [
      "Goes beyond documentation into friction and risk analysis",
      "Generates bug reports, tickets, and audit packs, not just guides",
      "Measures time and money saved, not just documents the steps",
    ],
  },
  {
    slug: "tango",
    competitor: "Tango",
    summary: "Tango creates visual step-by-step guides and workflows, similar in spirit to Scribe.",
    theirStrength: "Clean guide formatting and browser extension capture.",
    flowlensDifference: [
      "AI Workflow Doctor diagnoses friction, bugs, and automation opportunities",
      "Structured exports for engineering and compliance, not just how-to guides",
      "Friction/automation scoring across an entire workflow",
    ],
  },
  {
    slug: "loom",
    competitor: "Loom",
    summary: "Loom is a screen-and-webcam video recorder built for async video messaging.",
    theirStrength: "Best-in-class video recording and sharing experience.",
    flowlensDifference: [
      "Structured step data instead of an unsearchable video timeline",
      "AI findings and friction scores, not just a recording",
      "Direct routing into SOPs, tickets, and training guides",
    ],
  },
  {
    slug: "sharex",
    competitor: "ShareX",
    summary: "ShareX is a free, open-source screenshot and screen-recording tool popular with power users.",
    theirStrength: "Free, highly configurable, huge capture format support.",
    flowlensDifference: [
      "No AI analysis, friction scoring, or asset generation in ShareX",
      "FlowLens turns captures into operational assets automatically",
      "Built for teams, not just individual power users",
    ],
  },
];

export function getCompareEntry(slug: string) {
  return compareEntries.find((c) => c.slug === slug);
}
