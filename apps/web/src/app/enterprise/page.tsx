import Link from "next/link";
import { ArrowRight, Building2, Users, ShieldCheck, Gauge } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata = { title: "Enterprise - FlowLens" };

const points = [
  { icon: Building2, title: "Multi-department rollout", body: "Separate workspaces per department with shared visibility for operations leadership." },
  { icon: Users, title: "Role-based governance", body: "Owner, admin, editor, reviewer, and viewer roles keep sensitive captures controlled." },
  { icon: ShieldCheck, title: "Audit-ready evidence", body: "Structured, timestamped evidence packs built for compliance and internal audit review." },
  { icon: Gauge, title: "ROI you can report upward", body: "Time and money saved per workflow, rolled up across every team using FlowLens." },
];

export default function EnterprisePage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">FlowLens for enterprise operations</h1>
          <p className="mt-4 text-[var(--muted)]">
            Roll out workflow evidence and process intelligence across operations, QA, support, IT,
            and compliance, with governance built in from the start.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="fl-card p-6">
              <p.icon className="text-[var(--brand)]" size={22} />
              <h2 className="mt-3 font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <Link href="/pricing" className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]">
            View enterprise pricing <ArrowRight size={16} />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
