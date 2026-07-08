import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquare, Sparkles, Download, Gauge } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { demoCaptures, getCapture } from "@/lib/demo-data";

export function generateStaticParams() {
  return demoCaptures.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const capture = getCapture(id);
  return { title: capture ? `${capture.title} - FlowLens` : "Capture - FlowLens" };
}

export default async function CapturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const capture = getCapture(id);
  if (!capture) notFound();

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                {capture.mode.replace("-", " ")}
              </p>
              <h1 className="mt-1 text-2xl font-semibold">{capture.title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">{capture.description}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/captures/${capture.id}/ai`} className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--card)]">
                <Sparkles size={16} /> AI Workflow Doctor
              </Link>
              <Link href={`/captures/${capture.id}/export`} className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--brand-strong)]">
                <Download size={16} /> Export
              </Link>
            </div>
          </div>

          {capture.frictionScore && (
            <div className="fl-card mt-6 flex flex-wrap gap-8 p-5">
              <div className="flex items-center gap-2">
                <Gauge className="text-[var(--brand)]" size={18} />
                <span className="text-sm">Friction score: <strong>{capture.frictionScore.overall}/100</strong> ({capture.frictionScore.riskLevel} risk)</span>
              </div>
              <span className="text-sm text-[var(--muted)]">Automation opportunity: {capture.frictionScore.automationOpportunity}/100</span>
              <span className="text-sm text-[var(--muted)]">Documentation quality: {capture.frictionScore.documentationQuality}/100</span>
            </div>
          )}

          <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              {capture.steps.map((step) => (
                <div key={step.id} className="fl-card overflow-hidden">
                  <div className="relative aspect-video w-full bg-[var(--card-border)]">
                    <Image src={step.screenshotUrl} alt={step.title} fill unoptimized className="object-cover" />
                    <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-xs font-semibold text-white">
                      {step.index + 1}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="font-medium">{step.title}</p>
                    {step.description && <p className="mt-1 text-sm text-[var(--muted)]">{step.description}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.appName && <span className="rounded-full bg-[var(--brand)]/10 px-2.5 py-1 text-xs text-[var(--brand)]">{step.appName}</span>}
                      {step.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[var(--muted)]/10 px-2.5 py-1 text-xs text-[var(--muted)]">{tag}</span>
                      ))}
                      {step.severity && step.severity !== "info" && (
                        <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-600">{step.severity} severity</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="fl-card p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold"><MessageSquare size={16} /> Comments</h2>
                {capture.comments.length === 0 ? (
                  <p className="mt-3 text-sm text-[var(--muted)]">No comments yet.</p>
                ) : (
                  <ul className="mt-3 space-y-3 text-sm">
                    {capture.comments.map((c) => (
                      <li key={c.id}>
                        <p className="font-medium">{c.author}</p>
                        <p className="text-[var(--muted)]">{c.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="fl-card p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold"><Sparkles size={16} /> Top findings</h2>
                <ul className="mt-3 space-y-3 text-sm">
                  {capture.findings.slice(0, 3).map((f) => (
                    <li key={f.id}>
                      <p className="font-medium">{f.title}</p>
                      <p className="text-[var(--muted)]">{f.description}</p>
                    </li>
                  ))}
                </ul>
                <Link href={`/captures/${capture.id}/ai`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
                  See full diagnosis <ArrowRight size={14} />
                </Link>
              </div>

              <div className="fl-card p-5">
                <h2 className="text-sm font-semibold">Metadata</h2>
                <dl className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                  <div className="flex justify-between"><dt>Created by</dt><dd>{capture.createdBy}</dd></div>
                  <div className="flex justify-between"><dt>Environment</dt><dd>{capture.environment?.os ?? "-"}</dd></div>
                  <div className="flex justify-between"><dt>Browser</dt><dd>{capture.environment?.browser ?? "-"}</dd></div>
                  <div className="flex justify-between"><dt>Status</dt><dd>{capture.status.replace("-", " ")}</dd></div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
