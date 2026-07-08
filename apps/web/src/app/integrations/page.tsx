import { PlugZap } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { INTEGRATIONS } from "@flowlens/integrations";

export const metadata = { title: "Integrations - FlowLens" };

export default function IntegrationsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-semibold">Integrations</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Route AI findings, SOPs, and tickets straight into the tools your team already uses.
            Connections shown here are typed and ready for a future session to wire up real OAuth
            flows and API calls.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {Object.values(INTEGRATIONS).map((integration) => (
              <div key={integration.id} className="fl-card flex items-start gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
                  <PlugZap size={20} />
                </span>
                <div>
                  <p className="font-medium">{integration.label}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{integration.description}</p>
                  <button className="mt-3 rounded-lg border border-[var(--card-border)] px-3 py-1.5 text-xs font-medium transition hover:bg-[var(--background)]" disabled>
                    Connect (coming soon)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
