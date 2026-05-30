import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { GTMGenerator } from "@/components/gtm-generator";

export default function Home() {
  return (
    <AppShell>
      <section className="mb-8 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 text-white shadow-xl shadow-black/20">
        <div className="grid gap-8 p-6 lg:grid-cols-[1fr_420px] lg:p-10">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {["Live web intelligence", "AI GTM agents", "Hackathon ready"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold sm:text-5xl xl:text-6xl">
              Launch smarter with AI-powered GTM intelligence.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
              SignalForge GTM helps small businesses launch smarter by turning
              live web data into ICPs, competitor insights, pricing strategy,
              and launch plans.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#gtm-scan"
                className="rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Start GTM Scan
              </a>
              <Link
                href="/demo"
                className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Demo Mode
              </Link>
            </div>
          </div>
          <aside className="rounded-lg border border-white/10 bg-white/10 p-5">
            <p className="text-xs font-bold uppercase text-cyan-200">
              Agent output
            </p>
            <div className="mt-5 space-y-4">
              {[
                ["ICP", "Buyer segments + triggers"],
                ["Competitors", "SERP gaps + pricing signals"],
                ["Launch", "30 day action plan"],
              ].map(([label, value], index) => (
                <div key={label} className="rounded-lg bg-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{label}</p>
                    <p className="text-xs font-bold text-lime-200">
                      {80 + index * 5}%
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{value}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-lg bg-white/10">
                    <div
                      className="h-full rounded-lg bg-gradient-to-r from-cyan-300 to-lime-300"
                      style={{ width: `${80 + index * 5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="gtm-scan" className="scroll-mt-24">
      <GTMGenerator />
      </section>

      <section className="mt-8 rounded-lg border border-slate-800 bg-slate-950/90 p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-sm font-bold text-cyan-300">Tech stack</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-100">
            Built for live market intelligence
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Bright Data SERP API",
            "Bright Data Web Scraper API",
            "Bright Data Scraping Browser",
            "Bright Data MCP Server",
            "DeepSeek V3 (Featherless AI)",
            "Next.js",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-sm font-bold text-slate-300"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-8 rounded-lg border border-slate-800 bg-slate-950/90 p-5 text-center text-sm font-semibold text-slate-500">
        SignalForge GTM. Live web data when keys are connected, local fallback
        mode when not.
      </footer>
    </AppShell>
  );
}
