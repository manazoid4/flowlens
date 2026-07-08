import { notFound } from "next/navigation";
import { Download, CheckCircle2, Clock } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { demoCaptures, getCapture } from "@/lib/demo-data";
import { exportToMarkdown, EXPORT_FORMAT_STATUS } from "@flowlens/exports";

export function generateStaticParams() {
  return demoCaptures.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const capture = getCapture(id);
  return { title: capture ? `Export - ${capture.title}` : "Export - FlowLens" };
}

export default async function CaptureExportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const capture = getCapture(id);
  if (!capture) notFound();

  const markdown = exportToMarkdown(capture);

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-semibold">Export - {capture.title}</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Every capture can become a document, an audit pack, or a routed ticket. Formats marked
            &quot;coming soon&quot; have a stable contract already defined in packages/exports.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Available formats</h2>
              <div className="mt-4 space-y-2">
                {EXPORT_FORMAT_STATUS.map((f) => (
                  <div key={f.format} className="fl-card flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium capitalize">{f.format.replace("-", " ")}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{f.notes}</p>
                    </div>
                    {f.implemented ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600"><CheckCircle2 size={14} /> Ready</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-[var(--muted)]"><Clock size={14} /> Coming soon</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                <Download size={14} /> Markdown preview
              </h2>
              <pre className="fl-card mt-4 max-h-[600px] overflow-auto whitespace-pre-wrap p-4 text-xs">{markdown}</pre>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
