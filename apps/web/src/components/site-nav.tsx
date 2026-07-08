import Link from "next/link";
import { Eye } from "lucide-react";

const links = [
  { href: "/solutions/operations", label: "Solutions" },
  { href: "/compare/scribe", label: "Compare" },
  { href: "/security", label: "Security" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--card-border)] bg-[var(--background)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-white">
            <Eye size={18} />
          </span>
          FlowLens
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-[var(--muted)] md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-[var(--foreground)]">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden text-sm text-[var(--muted)] hover:text-[var(--foreground)] sm:block">
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--brand-strong)]"
          >
            View demo
          </Link>
        </div>
      </div>
    </header>
  );
}
