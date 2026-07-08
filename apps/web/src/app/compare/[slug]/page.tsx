import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { compareEntries, getCompareEntry } from "@/lib/compare";

export function generateStaticParams() {
  return compareEntries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCompareEntry(slug);
  return { title: entry ? `FlowLens vs ${entry.competitor}` : "Compare - FlowLens" };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCompareEntry(slug);
  if (!entry) notFound();

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Compare</span>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">FlowLens vs {entry.competitor}</h1>
          <p className="mt-4 text-lg text-[var(--muted)]">{entry.summary}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-2">
          <div className="fl-card p-6">
            <h2 className="font-semibold">Where {entry.competitor} is strong</h2>
            <p className="mt-4 text-sm text-[var(--muted)]">{entry.theirStrength}</p>
          </div>
          <div className="fl-card p-6">
            <h2 className="font-semibold">Where FlowLens goes further</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {entry.flowlensDifference.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]">
            See a live capture <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Other comparisons</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {compareEntries.filter((c) => c.slug !== slug).map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm transition hover:bg-[var(--card)]">
                vs {c.competitor}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
