import { ShieldCheck, Lock, Eye, FileCheck } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata = { title: "Security - FlowLens" };

const pillars = [
  { icon: Lock, title: "Redaction by design", body: "Annotation tooling lets anyone blur or remove sensitive fields before a capture is shared, and AI flags likely-sensitive content automatically." },
  { icon: Eye, title: "Workspace-scoped access", body: "Every capture, export, and finding is scoped to a workspace with role-based access (owner, admin, editor, reviewer, viewer)." },
  { icon: FileCheck, title: "Audit-ready evidence packs", body: "Audit-evidence exports are timestamped and structured for SOC 2, ISO 27001, and internal audit review." },
  { icon: ShieldCheck, title: "Built for compliance from day one", body: "Security architecture is designed around evidence integrity, not bolted on after launch." },
];

export default function SecurityPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">Security & trust</h1>
          <p className="mt-4 text-[var(--muted)]">
            FlowLens handles screenshots of real, sometimes sensitive workflows. Here is our current
            security posture and what is on the roadmap as we grow.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="fl-card p-6">
              <p.icon className="text-[var(--brand)]" size={22} />
              <h2 className="mt-3 font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="text-lg font-semibold">Roadmap - designed for, not yet certified</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            FlowLens is a new product. We are honest about what exists today versus what is planned:
            SOC 2 Type II, SSO/SCIM, and customer-managed encryption keys are on our enterprise roadmap
            and are not yet in place. Ask us for our current security questionnaire and target timeline.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
