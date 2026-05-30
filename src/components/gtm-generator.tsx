"use client";

import { useEffect, useState } from "react";
import {
  blankInput,
  demoInputs,
  generateReport,
  type BusinessInput,
  type DemoKey,
  type GTMReport,
} from "@/lib/gtm-data";
import { ReportView } from "@/components/report-view";

const demos = Object.keys(demoInputs) as DemoKey[];

export function GTMGenerator({ mode = "full" }: { mode?: "full" | "demo" }) {
  const firstDemo = mode === "demo" ? demoInputs["AI Resume Tool"] : blankInput;
  const [input, setInput] = useState<BusinessInput>(firstDemo);
  const [submitted, setSubmitted] = useState(mode === "demo");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<GTMReport | null>(() =>
    mode === "demo" ? generateReport(firstDemo) : null,
  );

  useEffect(() => {
    if (mode === "demo") {
      void generate(firstDemo);
      return;
    }
    // Restore last scan from localStorage on mount
    try {
      const raw = window.localStorage.getItem("signalforge.lastScan");
      if (raw) {
        const stored = JSON.parse(raw) as { input: BusinessInput; report: GTMReport; savedAt: string };
        if (stored.input?.idea) {
          setInput(stored.input);
          setReport(stored.report);
          setSubmitted(true);
        }
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  function update<K extends keyof BusinessInput>(key: K, value: BusinessInput[K]) {
    setInput((current) => ({ ...current, [key]: value, dataMode: undefined }));
  }

  function loadDemo(key: DemoKey) {
    const demo =
      mode === "demo" ? demoInputs[key] : { ...demoInputs[key], dataMode: undefined };
    setInput(demo);
    setSubmitted(true);
    void generate(demo);
  }

  async function generate(profile: BusinessInput) {
    setLoading(true);
    try {
      const response = await fetch("/api/gtm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("GTM API failed");
      }

      const data = (await response.json()) as GTMReport;
      setReport(data);
      window.localStorage.setItem(
        "signalforge.lastScan",
        JSON.stringify({ input: profile, report: data, savedAt: new Date().toISOString() }),
      );
    } catch {
      const fallback = generateReport(profile);
      setReport(fallback);
      window.localStorage.setItem(
        "signalforge.lastScan",
        JSON.stringify({ input: profile, report: fallback, savedAt: new Date().toISOString() }),
      );
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  }

  function clearScan() {
    window.localStorage.removeItem("signalforge.lastScan");
    setInput(blankInput);
    setReport(null);
    setSubmitted(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <aside className="h-fit rounded-lg border border-slate-800 bg-slate-950/90 p-5 shadow-sm">
        <div className="mb-5">
          <p className="text-sm font-bold text-cyan-300">Launch input</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-100">
            Forge market plan from business signal.
          </h1>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {demos.map((demo) => (
            <button
              key={demo}
              type="button"
              onClick={() => loadDemo(demo)}
              className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 text-left text-sm font-bold text-slate-300 transition hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-100"
            >
              {demo}
            </button>
          ))}
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void generate(input);
          }}
        >
          <Field label="Business idea">
            <textarea
              value={input.idea}
              onChange={(event) => update("idea", event.target.value)}
              placeholder="AI agent for local roofing estimates"
              className="min-h-24 w-full rounded-lg border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Field label="Industry">
              <input
                value={input.industry}
                onChange={(event) => update("industry", event.target.value)}
                placeholder="Home services"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              />
            </Field>
            <Field label="Target location">
              <input
                value={input.location}
                onChange={(event) => update("location", event.target.value)}
                placeholder="Denver, CO"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              />
            </Field>
            <Field label="Website optional">
              <input
                value={input.website}
                onChange={(event) => update("website", event.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              />
            </Field>
            <Field label="Budget">
              <input
                value={input.budget}
                onChange={(event) => update("budget", event.target.value)}
                placeholder="$5,000"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              />
            </Field>
            <Field label="Business type">
              <select
                value={input.type}
                onChange={(event) => update("type", event.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              >
                <option>SaaS</option>
                <option>Local service</option>
                <option>Brick and mortar</option>
                <option>Mobile app</option>
                <option>Service business</option>
              </select>
            </Field>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-cyan-300 px-5 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {loading ? "Generating..." : "Generate GTM report"}
            </button>
            {submitted && report ? (
              <button
                type="button"
                onClick={clearScan}
                className="text-xs font-semibold text-slate-500 underline transition hover:text-red-400"
              >
                Clear scan
              </button>
            ) : null}
          </div>
        </form>
      </aside>

      <section>
        {loading ? (
          <LoadingState />
        ) : submitted && report ? (
          <ReportView report={report} />
        ) : (
          <div className="grid min-h-[640px] place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-950/80 p-8 text-center">
            <div className="max-w-md">
              <p className="text-sm font-bold uppercase text-cyan-300">
                Ready
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Empty scan canvas
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Add business details or select preset. SignalForge will return
                ICP, competitors, value prop, pricing, distribution, 30 day
                plan, and readiness score.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-[640px] rounded-lg border border-slate-800 bg-slate-950/90 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-cyan-300">Running GTM agents</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-100">
            Scanning market signals...
          </h2>
          <p className="mt-1 font-mono text-xs font-bold text-cyan-400">DeepSeek V3 synthesizing research</p>
        </div>
        <div className="size-12 animate-spin rounded-lg border-4 border-slate-800 border-t-cyan-500" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          "Bright Data SERP — competitor discovery",
          "Bright Data Scraper — pricing intelligence",
          "DeepSeek V3 — ICP + positioning synthesis",
          "DeepSeek V3 — launch plan + readiness score",
        ].map((item) => (
          <div key={item} className="rounded-lg bg-slate-900/70 p-4">
            <div className="h-4 w-40 rounded-lg bg-slate-800" />
            <p className="mt-3 text-sm font-bold text-slate-500">{item}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-lg bg-slate-800">
              <div className="h-full w-2/3 animate-pulse rounded-lg bg-gradient-to-r from-cyan-300 to-lime-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
