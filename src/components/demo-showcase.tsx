"use client";

import { useMemo, useState } from "react";
import { ReportView } from "@/components/report-view";
import {
  demoInputs,
  generateReport,
  type DemoKey,
  type GTMReport,
} from "@/lib/gtm-data";

const presets = Object.keys(demoInputs) as DemoKey[];

const behindScenes = [
  {
    title: "Bright Data SERP",
    body: "Searched competitors, local search intent, SERP rankings, and category demand.",
  },
  {
    title: "Bright Data Scraper",
    body: "Pulled competitor pricing pages, package language, guarantees, and proof signals.",
  },
  {
    title: "Scraping Browser",
    body: "Checked dynamic websites where pricing, locations, and service pages render client-side.",
  },
  {
    title: "AIMLAPI",
    body: "Generated ICP, pricing, messaging, channel strategy, launch plan, and readiness score.",
  },
];

export function DemoShowcase() {
  const [selected, setSelected] = useState<DemoKey>("AI Resume Tool");
  const report = useMemo(() => generateReport(demoInputs[selected]), [selected]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 text-white shadow-xl shadow-black/20">
        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_360px] lg:p-8">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>Judge demo</Badge>
              <Badge>Instant report</Badge>
              <Badge>Demo data</Badge>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold sm:text-5xl">
              Pick business. Watch GTM plan appear.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              SignalForge simulates live market intelligence and AI agent
              reasoning so judges can see full workflow without waiting on
              external APIs.
            </p>
          </div>

          <ScorePanel report={report} />
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-5">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setSelected(preset)}
            className={`rounded-lg border p-4 text-left shadow-sm transition ${
              selected === preset
                ? "border-cyan-300 bg-cyan-400/15"
                : "border-slate-800 bg-slate-950/90 hover:border-cyan-400/40 hover:bg-slate-900/80"
            }`}
          >
            <p className="text-sm font-bold text-slate-100">{preset}</p>
            <p className="mt-2 text-xs font-semibold text-slate-500">
              {demoInputs[preset].industry}
            </p>
          </button>
        ))}
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-cyan-300">
              What happened behind the scenes
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-100">
              Agent pipeline replay
            </h2>
          </div>
          <span className="rounded-lg bg-lime-400/15 px-3 py-2 text-xs font-bold text-lime-200">
            Completed in demo mode
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {behindScenes.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-lg border border-slate-800 bg-slate-900/70 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-slate-950 font-bold text-white">
                  {index + 1}
                </span>
                <span className="rounded-lg bg-lime-400/15 px-2 py-1 text-xs font-bold text-lime-200">
                  done
                </span>
              </div>
              <h3 className="mt-4 font-bold text-slate-100">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {step.body}
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-lg bg-slate-800">
                <div className="h-full w-full rounded-lg bg-gradient-to-r from-cyan-300 to-lime-300" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <ReportView report={report} />
    </div>
  );
}

function ScorePanel({ report }: { report: GTMReport }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-5">
      <p className="text-xs font-bold uppercase text-cyan-200">
        Current preset
      </p>
      <h2 className="mt-2 text-xl font-bold">{report.title}</h2>
      <div className="mt-5 flex items-end gap-3">
        <p className="text-6xl font-bold">{report.score}</p>
        <p className="pb-3 text-sm font-bold text-slate-300">readiness</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-lg bg-white/10">
        <div
          className="h-full rounded-lg bg-gradient-to-r from-cyan-300 to-lime-300"
          style={{ width: `${report.score}%` }}
        />
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">
      {children}
    </span>
  );
}
