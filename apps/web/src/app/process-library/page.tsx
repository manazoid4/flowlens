import Link from "next/link";
import { BookOpen } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { demoCaptures } from "@/lib/demo-data";

export const metadata = { title: "Process library - FlowLens" };

export default function ProcessLibraryPage() {
  const byMode = demoCaptures.reduce<Record<string, typeof demoCaptures>>((acc, c) => {
    (acc[c.mode] ??= []).push(c);
    return acc;
  }, {});

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2">
            <BookOpen className="text-[var(--brand)]" size={22} />
            <h1 className="text-2xl font-semibold">Process library</h1>
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Every documented workflow, grouped by type, searchable and reusable across your team.
          </p>

          <div className="mt-10 space-y-10">
            {Object.entries(byMode).map(([mode, captures]) => (
              <div key={mode}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">{mode.replace("-", " ")}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {captures.map((c) => (
                    <Link key={c.id} href={`/captures/${c.id}`} className="fl-card block p-5 transition hover:shadow-lg">
                      <p className="font-medium">{c.title}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">{c.description}</p>
                    </Link>
                  ))}
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
