import { AppShell } from "@/components/app-shell";
import { LaunchInsights } from "@/components/launch-insights";
import { LaunchContextPanel } from "@/components/launch-state";

const priorities = [
  ["Beachhead buyer", "Owner-operator or lean team with urgent revenue pressure and no dedicated GTM ops."],
  ["Pain trigger", "Actively searching competitors, refreshing website, hiring sales/ops, or changing tools."],
  ["Promise", "Turn messy market signals into launch-ready ICP, pricing, channel plan, and 30 day execution."],
  ["Proof asset", "Before/after GTM report, competitor gap snapshot, and 1-page launch checklist."],
];

const channels = [
  ["Google intent", "Create 3 pages: service + city, competitor alternative, pricing guide.", "7 days"],
  ["Partner referrals", "Pitch agencies, chambers, local operators, and SaaS consultants.", "10 partners"],
  ["Founder-led outbound", "50 accounts/week using visible trigger and one clear value prop.", "20% reply goal"],
  ["Proof content", "Publish 5 short posts showing market scan, pricing gap, ICP, launch sprint.", "2/week"],
];

const packages = [
  ["Starter Scan", "$249-$499", "ICP, competitors, pricing signals, 3 launch moves."],
  ["Launch Sprint", "$1.5k-$3k", "30 day plan, landing copy, outreach list, channel tests."],
  ["GTM Operator", "$5k+", "Weekly intelligence, campaign ops, reporting, and iteration."],
];

export default function StrategyPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <Header />
        <LaunchContextPanel label="Strategy built for" />
        <LaunchInsights mode="strategy" />

        <section className="grid gap-4 lg:grid-cols-4">
          {priorities.map(([title, body]) => (
            <Card key={title} title={title}>
              <p className="text-sm leading-6 text-slate-400">{body}</p>
            </Card>
          ))}
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
          <p className="text-sm font-bold text-cyan-300">Channel strategy</p>
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-800">
            {channels.map(([channel, play, target]) => (
              <div
                key={channel}
                className="grid gap-3 border-b border-slate-800 bg-slate-900/50 p-4 last:border-b-0 md:grid-cols-[180px_1fr_120px]"
              >
                <p className="font-bold text-slate-100">{channel}</p>
                <p className="text-sm leading-6 text-slate-400">{play}</p>
                <p className="text-sm font-bold text-lime-200">{target}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
            <p className="text-sm font-bold text-cyan-300">Pricing ladder</p>
            <div className="mt-4 grid gap-3">
              {packages.map(([name, price, value]) => (
                <div
                  key={name}
                  className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-slate-100">{name}</p>
                    <p className="font-mono text-sm font-bold text-cyan-200">{price}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
            <p className="text-sm font-bold text-cyan-300">Decision rules</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              <li>Prioritize channels where buyer intent is visible before contact.</li>
              <li>Do not sell broad AI. Sell one launch outcome in 30 days.</li>
              <li>Use competitor gaps as proof, not fear-based messaging.</li>
              <li>Scale only after one channel gets repeatable replies or bookings.</li>
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function Header() {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-xs font-bold uppercase text-cyan-300">SignalForge GTM</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-100">Strategy</h1>
      <p className="mt-2 text-sm font-semibold text-slate-400">
        Practical GTM decisions: who to target, what to sell, how to package it,
        and which channels to test first.
      </p>
    </section>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <h2 className="text-lg font-bold text-slate-100">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
