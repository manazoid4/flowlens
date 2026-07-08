import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { solutions, getSolution } from "@/lib/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  return { title: solution ? `${solution.title} - FlowLens` : "Solutions - FlowLens" };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Solutions</span>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{solution.title}</h1>
          <p className="mt-4 text-lg text-[var(--muted)]">{solution.tagline}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
          <div className="fl-card p-6">
            <h2 className="flex items-center gap-2 font-semibold"><XCircle className="text-red-500" size={18} /> Without FlowLens</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              {solution.painPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="fl-card p-6">
            <h2 className="flex items-center gap-2 font-semibold"><CheckCircle2 className="text-[var(--brand)]" size={18} /> With FlowLens</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {solution.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]">
            See it with demo data <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Other solutions</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {solutions.filter((s) => s.slug !== slug).map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm transition hover:bg-[var(--card)]">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
