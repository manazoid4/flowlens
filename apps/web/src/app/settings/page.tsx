import { Settings, Users, CreditCard, Shield } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { demoWorkspaces } from "@/lib/demo-data";

export const metadata = { title: "Settings - FlowLens" };

const sections = [
  { icon: Settings, title: "Workspace", body: "Rename your workspace, set default capture modes, and manage retention policy." },
  { icon: Users, title: "Members & roles", body: "Invite teammates and assign owner, admin, editor, reviewer, or viewer roles." },
  { icon: CreditCard, title: "Billing", body: "Manage your plan, seats, and usage." },
  { icon: Shield, title: "Security", body: "Configure redaction defaults and export approval requirements." },
];

export default function SettingsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Workspace: <strong>{demoWorkspaces[0].name}</strong> - Plan: <strong className="capitalize">{demoWorkspaces[0].plan}</strong>
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {sections.map((s) => (
              <div key={s.title} className="fl-card p-5">
                <s.icon className="text-[var(--brand)]" size={20} />
                <h2 className="mt-3 font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
