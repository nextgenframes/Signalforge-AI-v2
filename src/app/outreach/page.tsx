import { AppShell } from "@/components/app-shell";
import { LaunchContextPanel } from "@/components/launch-state";

const sequences = [
  ["Email 1", "Trigger + offer", "Saw your team is expanding. We found 3 competitor gaps and a pricing wedge you can use this month. Want the 1-page scan?"],
  ["Email 2", "Proof + relevance", "Teams like yours usually miss local intent pages and review-led proof. We can map first 30 days of GTM from live web data."],
  ["Email 3", "Soft close", "Worth sending over a sample GTM scan so you can pressure test ICP, pricing, and launch channels?"],
];

const segments = [
  ["Warm local operators", "Recently updated site, active reviews, clear service area", "Google Maps + website"],
  ["Tool-switching teams", "Hiring ops/sales, migration keywords, new integrations", "LinkedIn + job posts"],
  ["Competitor-search buyers", "Searching alternatives, pricing, reviews, local modifiers", "SERP + landing pages"],
];

const metrics = [
  ["Weekly accounts", "50"],
  ["Reply target", "12-20%"],
  ["Booked calls", "3-5"],
  ["Follow-up window", "7 days"],
];

export default function OutreachPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <Header />
        <LaunchContextPanel label="Outreach loaded for" />

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map(([label, value]) => (
            <section key={label} className="rounded-lg border border-slate-800 bg-slate-950/90 p-4">
              <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-100">{value}</p>
            </section>
          ))}
        </div>

        <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
          <p className="text-sm font-bold text-cyan-300">Target segments</p>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {segments.map(([name, signal, source]) => (
              <div key={name} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <h2 className="font-bold text-slate-100">{name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{signal}</p>
                <p className="mt-3 text-xs font-bold uppercase text-cyan-200">{source}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
          <p className="text-sm font-bold text-cyan-300">3-touch sequence</p>
          <div className="mt-4 space-y-3">
            {sequences.map(([step, angle, copy]) => (
              <div key={step} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/15 px-2.5 py-1 text-xs font-bold text-cyan-200">
                    {step}
                  </span>
                  <span className="text-xs font-bold uppercase text-slate-500">
                    {angle}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
          <p className="text-sm font-bold text-cyan-300">Personalization tokens</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "recent review quote",
              "competitor pricing gap",
              "new location page",
              "hiring signal",
              "technology migration",
              "local keyword gap",
            ].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Header() {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-xs font-bold uppercase text-cyan-300">SignalForge GTM</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-100">Outreach</h1>
      <p className="mt-2 text-sm font-semibold text-slate-400">
        Practical target lists, messaging angles, and follow-up sequence for launch.
      </p>
    </section>
  );
}
