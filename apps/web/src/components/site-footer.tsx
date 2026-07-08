import Link from "next/link";

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/pricing", label: "Pricing" },
      { href: "/integrations", label: "Integrations" },
      { href: "/process-library", label: "Process library" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { href: "/solutions/operations", label: "Operations" },
      { href: "/solutions/qa", label: "QA" },
      { href: "/solutions/support", label: "Support" },
      { href: "/solutions/compliance", label: "Compliance" },
    ],
  },
  {
    heading: "Compare",
    links: [
      { href: "/compare/scribe", label: "vs Scribe" },
      { href: "/compare/tango", label: "vs Tango" },
      { href: "/compare/loom", label: "vs Loom" },
      { href: "/compare/windows-steps-recorder", label: "vs Steps Recorder" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/security", label: "Security" },
      { href: "/enterprise", label: "Enterprise" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--card-border)] py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {columns.map((col) => (
          <div key={col.heading}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{col.heading}</p>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--muted)] transition hover:text-[var(--foreground)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-6 text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} FlowLens. Workflow evidence and process intelligence for teams that run on process.
      </div>
    </footer>
  );
}
