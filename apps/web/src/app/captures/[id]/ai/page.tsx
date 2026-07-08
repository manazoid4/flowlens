import { notFound } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, Bug, Gauge, ShieldAlert, GraduationCap, Workflow } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { demoCaptures, getCapture } from "@/lib/demo-data";
import { getAIProvider } from "@flowlens/ai";

export function generateStaticParams() {
  return demoCaptures.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const capture = getCapture(id);
  return { title: capture ? `AI Workflow Doctor - ${capture.title}` : "AI Workflow Doctor - FlowLens" };
}

const findingIcons: Record<string, typeof Bug> = {
  bug: Bug,
  friction: Gauge,
  automation: Workflow,
  "missing-context": ShieldAlert,
  security: ShieldAlert,
  compliance: ShieldAlert,
  "product-idea": Sparkles,
  "training-gap": GraduationCap,
  "support-gap": ShieldAlert,
  "process-risk": ShieldAlert,
  playbook: Workflow,
};

export default async function CaptureAIPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const capture = getCapture(id);
  if (!capture) notFound();

  const provider = getAIProvider();
  const report = await provider.generateWorkflowDoctorReport(capture);

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
            <Sparkles size={14} /> AI Workflow Doctor
          </span>
          <h1 className="mt-3 text-2xl font-semibold">{capture.title}</h1>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="fl-card p-5">
              <h2 className="text-sm font-semibold text-[var(--muted)]">What was attempted</h2>
              <p className="mt-2 text-sm">{report.whatWasAttempted}</p>
            </div>
            <div className="fl-card p-5">
              <h2 className="text-sm font-semibold text-[var(--muted)]">Did it succeed?</h2>
              <p className="mt-2 text-sm">{report.didItSucceed ? "Yes - marked ready." : "Not yet - needs review or further steps."}</p>
            </div>
          </div>

          <div className="fl-card mt-6 p-5">
            <h2 className="text-sm font-semibold text-[var(--muted)]">Friction summary</h2>
            <p className="mt-2 text-sm">{report.frictionSummary}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Findings</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {report.findings.map((f) => {
                const Icon = findingIcons[f.kind] ?? Sparkles;
                return (
                  <div key={f.id} className="fl-card p-5">
                    <div className="flex items-center gap-2">
                      <Icon className="text-[var(--brand)]" size={18} />
                      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{f.kind.replace("-", " ")}</span>
                      <span className="ml-auto rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-600">{f.impact}</span>
                    </div>
                    <p className="mt-3 font-medium">{f.title}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{f.description}</p>
                    {f.suggestedAction && (
                      <p className="mt-3 text-sm"><strong>Suggested action:</strong> {f.suggestedAction}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="fl-card p-5">
              <h2 className="text-sm font-semibold text-[var(--muted)]">Recommended assets</h2>
              <ul className="mt-3 space-y-3 text-sm">
                {report.recommendedAssets.map((a) => (
                  <li key={a.asset}>
                    <span className="font-medium capitalize">{a.asset.replace("-", " ")}</span> - {a.reason}
                  </li>
                ))}
              </ul>
              <Link href={`/captures/${capture.id}/export`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
                Generate these exports <ArrowRight size={14} />
              </Link>
            </div>
            <div className="fl-card p-5">
              <h2 className="text-sm font-semibold text-[var(--muted)]">Next best action</h2>
              <p className="mt-2 text-sm">{report.nextBestAction}</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
