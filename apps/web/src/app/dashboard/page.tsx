import Link from "next/link";
import { AlertTriangle, Gauge, Sparkles, Clock, PlugZap, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { demoCaptures, demoWorkspaces } from "@/lib/demo-data";
import { INTEGRATIONS } from "@flowlens/integrations";

export const metadata = { title: "Dashboard - FlowLens" };

function statusColor(status: string) {
  switch (status) {
    case "ready": return "bg-emerald-500/10 text-emerald-600";
    case "needs-review": return "bg-amber-500/10 text-amber-600";
    case "draft": return "bg-[var(--muted)]/10 text-[var(--muted)]";
    default: return "bg-[var(--muted)]/10 text-[var(--muted)]";
  }
}

export default function DashboardPage() {
  const needsReview = demoCaptures.filter((c) => c.status === "needs-review");
  const topFriction = [...demoCaptures]
    .filter((c) => c.frictionScore)
    .sort((a, b) => (b.frictionScore!.overall - a.frictionScore!.overall))
    .slice(0, 3);
  const automationOpportunities = demoCaptures
    .flatMap((c) => c.findings.filter((f) => f.kind === "automation").map((f) => ({ capture: c, finding: f })))
    .slice(0, 4);
  const totalTimeSaved = demoCaptures.reduce((sum, c) => sum + (c.estimatedTimeSavedMinutes ?? 0), 0);
  const totalMoneySaved = demoCaptures.reduce((sum, c) => sum + (c.estimatedMoneySavedGbp ?? 0), 0);

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                {demoWorkspaces.map((w) => w.name).join(" - ")}
              </p>
              <h1 className="mt-1 text-2xl font-semibold">Dashboard</h1>
            </div>
            <Link href="/process-library" className="text-sm font-medium text-[var(--brand)]">
              View process library <ArrowRight className="inline" size={14} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="fl-card p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                <Clock size={14} /> Time saved (est.)
              </div>
              <p className="mt-2 text-2xl font-semibold">{totalTimeSaved} min / workflow cycle</p>
            </div>
            <div className="fl-card p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                <Gauge size={14} /> Money saved (est.)
              </div>
              <p className="mt-2 text-2xl font-semibold">£{totalMoneySaved} / cycle</p>
            </div>
            <div className="fl-card p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                <AlertTriangle size={14} /> Needs review
              </div>
              <p className="mt-2 text-2xl font-semibold">{needsReview.length} capture(s)</p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Recent captures</h2>
              <div className="mt-4 space-y-3">
                {demoCaptures.map((c) => (
                  <Link key={c.id} href={`/captures/${c.id}`} className="fl-card flex items-center justify-between p-4 transition hover:shadow-lg">
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{c.steps.length} steps - {c.mode.replace("-", " ")}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(c.status)}`}>
                      {c.status.replace("-", " ")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  <Gauge size={14} /> Top friction workflows
                </h2>
                <div className="mt-4 space-y-3">
                  {topFriction.map((c) => (
                    <Link key={c.id} href={`/captures/${c.id}/ai`} className="fl-card block p-4 transition hover:shadow-lg">
                      <p className="text-sm font-medium">{c.title}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">Friction score: {c.frictionScore?.overall}/100</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  <Sparkles size={14} /> Automation opportunities
                </h2>
                <div className="mt-4 space-y-3">
                  {automationOpportunities.map(({ capture, finding }) => (
                    <Link key={finding.id} href={`/captures/${capture.id}/ai`} className="fl-card block p-4 transition hover:shadow-lg">
                      <p className="text-sm font-medium">{finding.title}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">from {capture.title}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  <PlugZap size={14} /> Integrations health
                </h2>
                <div className="fl-card mt-4 divide-y divide-[var(--card-border)]">
                  {Object.values(INTEGRATIONS).map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-3 text-sm">
                      <span>{integration.label}</span>
                      <span className="text-xs text-[var(--muted)]">Not connected</span>
                    </div>
                  ))}
                </div>
                <Link href="/integrations" className="mt-3 inline-block text-xs font-medium text-[var(--brand)]">
                  Manage integrations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
