import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { pricingTiers } from "@/lib/pricing";

export const metadata = { title: "Pricing - FlowLens" };

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">Plans for every team that runs on process</h1>
          <p className="mt-4 text-[var(--muted)]">
            Every plan includes the AI Workflow Doctor. Higher tiers unlock more export formats,
            integrations, and workspace controls as your evidence needs grow.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`fl-card flex flex-col p-6 ${tier.highlight ? "ring-2 ring-[var(--brand)]" : ""}`}
            >
              {tier.highlight && (
                <span className="mb-3 inline-block w-fit rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h2 className="text-lg font-semibold">{tier.name}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{tier.audience}</p>
              <p className="mt-5 text-3xl font-semibold">
                {tier.priceMonthlyGbp === "custom" ? "Custom" : `£${tier.priceMonthlyGbp}`}
                {tier.priceMonthlyGbp !== "custom" && <span className="text-base font-normal text-[var(--muted)]">/mo</span>}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">{tier.seats} - {tier.captures}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--brand)]" size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`mt-8 rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition ${
                  tier.highlight
                    ? "bg-[var(--brand)] text-white hover:bg-[var(--brand-strong)]"
                    : "border border-[var(--card-border)] hover:bg-[var(--card)]"
                }`}
              >
                {tier.priceMonthlyGbp === "custom" ? "Talk to sales" : "Start with demo data"}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
