import { AppShell } from "@/components/app-shell";
import { LeadDiscoveryAgent } from "@/components/lead-discovery-agent";
import { LaunchContextPanel } from "@/components/launch-state";

export default function LeadExplorerPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <Header title="Lead Explorer" subtitle="Realtime company signals ranked by GTM fit." />
        <LaunchContextPanel label="Leads loaded for" />
        <LeadDiscoveryAgent />
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
