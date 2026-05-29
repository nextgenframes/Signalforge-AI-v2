import { AppShell } from "@/components/app-shell";
import { LaunchInsights } from "@/components/launch-insights";
import { LaunchContextPanel } from "@/components/launch-state";

const campaigns = [
  ["Local SEO sprint", "Landing pages + reviews", "Live", "78%"],
  ["Founder proof clips", "Short-form customer proof", "Draft", "42%"],
  ["Partner outreach", "Local referral partners", "Ready", "65%"],
];

export default function CampaignsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <Header title="Campaigns" subtitle="Launch experiments and channel tests." />
        <LaunchContextPanel label="Campaigns loaded for" />
        <LaunchInsights mode="campaigns" />
        <div className="grid gap-4 lg:grid-cols-3">
          {campaigns.map(([name, type, status, progress]) => (
            <section key={name} className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{name}</h2>
                  <p className="mt-2 text-sm font-semibold text-slate-500">{type}</p>
                </div>
                <span className="rounded-lg border border-lime-400/30 bg-lime-400/15 px-2.5 py-1 text-xs font-bold text-lime-200">
                  {status}
                </span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-lg bg-slate-800">
                <div className="h-full rounded-lg bg-gradient-to-r from-cyan-300 to-lime-300" style={{ width: progress }} />
              </div>
              <p className="mt-3 text-xs font-bold text-slate-500">{progress} complete</p>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-xs font-bold uppercase text-cyan-300">
        SignalForge GTM
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-100">{title}</h1>
      <p className="mt-2 text-sm font-semibold text-slate-400">{subtitle}</p>
    </section>
  );
}
