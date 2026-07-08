import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Sparkles,
  Route,
  Gauge,
  ShieldCheck,
  FileText,
  Bug,
  GraduationCap,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const pipeline = [
  { icon: Camera, title: "Capture", body: "Record the real, messy workflow — clicks, screens, and context — not a scripted demo." },
  { icon: Sparkles, title: "Understand", body: "AI explains what happened, flags friction, bugs, and risk, step by step." },
  { icon: Workflow, title: "Improve", body: "Surface automation opportunities and process risks before they cost you." },
  { icon: Route, title: "Route", body: "Turn one capture into an SOP, bug report, training guide, or ticket — automatically." },
  { icon: Gauge, title: "Measure", body: "Track time and money saved across every workflow you've documented." },
];

const useCases = [
  { title: "Operations", body: "Turn tribal knowledge into SOPs your team can actually follow.", href: "/solutions/operations" },
  { title: "QA & Product", body: "Reproducible bug evidence with full step-by-step context.", href: "/solutions/qa" },
  { title: "Support & CX", body: "Cut resolution time with visual, shareable ticket evidence.", href: "/solutions/support" },
  { title: "IT & MSPs", body: "Document fixes once, resolve the next ten tickets instantly.", href: "/solutions/it" },
  { title: "Compliance & Audit", body: "Evidence packs ready for SOC 2, ISO, and internal audit.", href: "/solutions/compliance" },
  { title: "Training & Enablement", body: "Generate onboarding guides straight from real work.", href: "/solutions/training" },
  { title: "Agencies & Consultants", body: "Client-ready reports without the manual writeup.", href: "/solutions/agencies" },
  { title: "Founders & Builders", body: "Document your own process before you hire for it.", href: "/solutions/founders" },
];

const comparisons = [
  { capability: "Captures screen + context", flowlens: true, video: false, screenshot: true, sopdoc: false },
  { capability: "AI friction & risk analysis", flowlens: true, video: false, screenshot: false, sopdoc: false },
  { capability: "Auto-generates SOPs", flowlens: true, video: false, screenshot: false, sopdoc: true },
  { capability: "Auto-generates bug reports", flowlens: true, video: false, screenshot: true, sopdoc: false },
  { capability: "Auto-generates training guides", flowlens: true, video: false, screenshot: false, sopdoc: true },
  { capability: "Friction / automation scoring", flowlens: true, video: false, screenshot: false, sopdoc: false },
  { capability: "Ticket routing (GitHub/Jira/Linear)", flowlens: true, video: false, screenshot: false, sopdoc: false },
  { capability: "ROI / time-saved measurement", flowlens: true, video: false, screenshot: false, sopdoc: false },
];
function Check({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle2 className="mx-auto text-[var(--brand)]" size={18} />
  ) : (
    <span className="mx-auto block text-[var(--muted)]">-</span>
  );
}

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="fl-gradient-hero border-b border-[var(--card-border)] px-6 pb-20 pt-20 sm:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
              <Sparkles size={14} /> An AI process intelligence layer, not another screen recorder
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              Turn one messy workflow into every operational asset you need
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)]">
              FlowLens captures real work, has AI explain what happened and where the friction is,
              and routes it into SOPs, bug reports, training guides, and tickets, automatically.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]"
              >
                See a live capture <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] px-6 py-3 text-sm font-semibold transition hover:bg-[var(--card)]"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--card-border)] px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">
              Your best process knowledge is trapped in people's heads and forgotten video links
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { icon: Bug, text: "Bugs get reported as a paragraph of prose, so engineers spend half their time reproducing them." },
                { icon: FileText, text: "SOPs go stale the moment the person who wrote them changes the process." },
                { icon: GraduationCap, text: "New hires learn by shadowing someone, not from documentation that reflects reality." },
              ].map((item, i) => (
                <div key={i} className="fl-card p-6">
                  <item.icon className="text-[var(--brand)]" size={22} />
                  <p className="mt-4 text-sm text-[var(--muted)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--card-border)] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">One capture becomes every asset</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--muted)]">
              Capture, Understand, Improve, Route, Measure. The same recording powers documentation,
              engineering, training, and compliance, without redoing the work five times.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-5">
              {pipeline.map((step, i) => (
                <div key={step.title} className="fl-card relative p-5">
                  <span className="text-xs font-semibold text-[var(--muted)]">Step {i + 1}</span>
                  <step.icon className="mt-3 text-[var(--brand)]" size={22} />
                  <h3 className="mt-3 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--card-border)] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">Built for teams that run on process</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((u) => (
                <Link key={u.title} href={u.href} className="fl-card block p-5 transition hover:shadow-lg">
                  <h3 className="font-semibold">{u.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{u.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--card-border)] px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
                <Sparkles size={14} /> AI Workflow Doctor
              </span>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Ask what happened. Get a diagnosis, not a transcript.</h2>
              <p className="mt-4 text-[var(--muted)]">
                For every capture, FlowLens answers: what was attempted, did it succeed, where the
                friction is, what's automatable, what's risky or needs redaction, and what this
                capture should become next.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Bug, friction, and process-risk detection per step",
                  "Automation opportunity scoring across the whole workflow",
                  "Redaction suggestions for sensitive information",
                  "One-click routing to SOP, bug report, training guide, or ticket",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--brand)]" size={16} />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/captures/cap-invoice-approval/ai" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                See the AI Workflow Doctor in action <ArrowRight size={16} />
              </Link>
            </div>
            <div className="fl-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Sample diagnosis</p>
              <p className="mt-3 text-sm">
                This invoice approval took 72 seconds and stalled for 45 of them waiting on Slack.
                The manual re-typing step is the highest-confidence automation opportunity, an
                OCR-based intake could remove it entirely.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-[var(--brand)]/10 px-3 py-1 text-[var(--brand)]">Automation: high impact</span>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-amber-600">Friction: bottleneck found</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--card-border)] px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">A category above screen recorders and SOP docs</h2>
            <div className="fl-card mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-[var(--card-border)] text-left text-xs uppercase tracking-wide text-[var(--muted)]">
                    <th className="p-4 font-medium">Capability</th>
                    <th className="p-4 text-center font-medium">FlowLens</th>
                    <th className="p-4 text-center font-medium">Video tools</th>
                    <th className="p-4 text-center font-medium">Screenshot tools</th>
                    <th className="p-4 text-center font-medium">SOP docs</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row) => (
                    <tr key={row.capability} className="border-b border-[var(--card-border)] last:border-0">
                      <td className="p-4">{row.capability}</td>
                      <td className="p-4 text-center"><Check value={row.flowlens} /></td>
                      <td className="p-4 text-center"><Check value={row.video} /></td>
                      <td className="p-4 text-center"><Check value={row.screenshot} /></td>
                      <td className="p-4 text-center"><Check value={row.sopdoc} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--card-border)] px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
            {[
              { stat: "22 min", label: "average time saved per documented workflow", },
              { stat: "4.2x", label: "faster bug reproduction with step-by-step evidence" },
              { stat: "1 capture", label: "becomes an SOP, a ticket, and a training guide" },
            ].map((s) => (
              <div key={s.label} className="fl-card p-6 text-center">
                <p className="text-3xl font-semibold text-[var(--brand)]">{s.stat}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[var(--card-border)] px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="fl-card flex flex-col gap-6 p-8 sm:flex-row sm:items-center">
              <ShieldCheck className="text-[var(--brand)]" size={36} />
              <div>
                <h2 className="text-xl font-semibold">Built with enterprise trust in mind</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Redaction tooling for sensitive fields, workspace-scoped access controls, and audit-ready
                  export packs. FlowLens is designed for SOC 2-style evidence workflows from day one -
                  see our <Link href="/security" className="font-medium text-[var(--brand)]">security page</Link> for
                  our current posture and roadmap.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--card-border)] px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Plans for every team that runs on process</h2>
            <p className="mt-3 text-[var(--muted)]">From solo builders to enterprise operations teams.</p>
            <Link href="/pricing" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]">
              See pricing <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-3xl rounded-2xl bg-[var(--brand)] p-12 text-center text-white">
            <h2 className="text-2xl font-semibold sm:text-3xl">Stop losing process knowledge to memory and chat threads</h2>
            <p className="mt-3 text-white/80">Capture your next messy workflow and see what FlowLens finds.</p>
            <Link href="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-strong)] transition hover:bg-white/90">
              See a live capture <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
