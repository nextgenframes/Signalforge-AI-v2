import { AppShell } from "@/components/app-shell";
import { ApiKeyStatus } from "@/components/api-key-status";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-6 shadow-sm">
            <p className="text-sm font-bold text-cyan-300">Settings</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-100">
              MVP controls
            </h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Data mode", "Live if keys are configured"],
                ["Auth", "Off for judge demo"],
                ["Report speed", "Instant fallback"],
                ["Export", "Ready for next build"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-xs font-bold uppercase text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 font-bold text-slate-100">{value}</p>
                </div>
              ))}
            </div>
          </section>
          <ApiKeyStatus />
        </div>
        <aside className="rounded-lg bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/20">
          <p className="text-sm font-bold text-cyan-200">Next integrations</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
            <li>Connect live search provider.</li>
            <li>Add Supabase saved reports.</li>
            <li>Add Vercel deployment env controls.</li>
            <li>Add PDF and share links.</li>
          </ul>
        </aside>
      </div>
    </AppShell>
  );
}
