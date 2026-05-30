"use client";

import { useState } from "react";
import type { GTMReport } from "@/lib/gtm-data";

function Card({
  title,
  children,
  tone = "white",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "white" | "dark";
}) {
  return (
    <section
      className={
        tone === "dark"
          ? "rounded-lg border border-slate-800 bg-slate-950/90 p-5 text-white shadow-xl shadow-black/20"
          : "rounded-lg border border-slate-800 bg-slate-950/90 p-5 shadow-sm"
      }
    >
      <h3 className="mb-4 text-sm font-bold uppercase text-cyan-300">
        {title}
      </h3>
      {children}
    </section>
  );
}

function buildMarkdown(report: GTMReport): string {
  const lines: string[] = [
    `# GTM Report: ${report.title}`,
    "",
    `**Readiness score**: ${report.score}/100`,
    `**Data source**: ${report.dataSource}`,
    "",
    "## Summary",
    report.summary,
    "",
    "## ICP",
    ...report.icp.map((item) => `- ${item}`),
    "",
    "## Value Proposition",
    report.valueProposition,
    "",
    "## Competitors",
    ...report.competitors.map((c) => `- **${c.name}** — ${c.position} — ${c.gap}`),
    "",
    "## Pricing",
    ...report.pricing.map((item) => `- ${item}`),
    "",
    "## Distribution Channels",
    ...report.distribution.map((item) => `- ${item}`),
    "",
    "## 30-Day Launch Plan",
    ...report.launchPlan.map((item, i) => `${i + 1}. ${item}`),
    "",
    "## Market Signals",
    ...report.signals.map((item) => `- ${item}`),
  ];
  return lines.join("\n");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function ExportToolbar({ report }: { report: GTMReport }) {
  const [copied, setCopied] = useState(false);

  function exportMarkdown() {
    const md = buildMarkdown(report);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gtm-report-${slugify(report.title)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyShareLink() {
    const url = window.location.origin + "/?idea=" + encodeURIComponent(report.title);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {/* ignore */});
  }

  const btnClass =
    "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 transition hover:text-slate-100";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
      <p className="text-sm font-bold text-cyan-300">GTM Report</p>
      <div className="flex items-center gap-2">
        <button type="button" onClick={exportMarkdown} className={btnClass}>
          Export Markdown
        </button>
        <button type="button" onClick={copyShareLink} className={btnClass}>
          {copied ? "Copied!" : "Copy share link"}
        </button>
      </div>
    </div>
  );
}

export function ReportView({ report }: { report: GTMReport }) {
  return (
    <div className="space-y-5">
      <ExportToolbar report={report} />
      <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-bold text-cyan-300">Generated GTM report</p>
              <DataSourceBadge source={report.dataSource} />
            </div>
            <h2 className="mt-2 max-w-3xl text-2xl font-bold text-slate-100 sm:text-3xl">
              {report.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              {report.summary}
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-5 text-white">
            <p className="text-xs font-bold uppercase text-cyan-100">
              Readiness
            </p>
            <p className="mt-2 text-5xl font-bold">{report.score}</p>
            <p className="text-sm font-semibold text-cyan-50">out of 100</p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="ICP">
          <ul className="space-y-3">
            {report.icp.map((item) => (
              <li key={item} className="rounded-lg bg-slate-900/70 p-4 text-sm leading-6 text-slate-300">
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Value proposition" tone="dark">
          <p className="text-lg font-bold leading-8 text-slate-50">
            {report.valueProposition}
          </p>
        </Card>
      </div>

      <Card title="Competitor analysis">
        <div className="grid gap-4 md:grid-cols-3">
          {report.competitors.map((item) => (
            <article key={item.name} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
              <h4 className="font-bold text-slate-100">{item.name}</h4>
              <p className="mt-2 text-sm font-semibold text-cyan-300">{item.position}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.gap}</p>
            </article>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Pricing">
          <List items={report.pricing} />
        </Card>
        <Card title="Distribution">
          <List items={report.distribution} />
        </Card>
        <Card title="Web signals">
          <List items={report.signals} />
        </Card>
      </div>

      <Card title="30 day launch plan">
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
          {report.launchPlan.map((item, index) => (
            <div key={item} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-white">
              <p className="font-mono text-xs font-bold text-cyan-200">
                Step {index + 1}
              </p>
              <p className="mt-3 text-sm leading-6">{item}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Agent data sources">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(report.agents).map((agent) => (
            <div
              key={agent.meta.agent}
              className="rounded-lg border border-slate-800 bg-slate-900/70 p-3"
            >
              <p className="text-xs font-bold text-slate-100">
                {agent.meta.agent}
              </p>
              <div className="mt-2">
                <DataSourceBadge source={agent.meta.source} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="text-sm leading-6 text-slate-300">
          <span className="mr-2 inline-block size-2 rounded-lg bg-cyan-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function DataSourceBadge({ source }: { source: GTMReport["dataSource"] }) {
  const styles = {
    "live web data": "border-lime-400/30 bg-lime-400/15 text-lime-200",
    "demo data": "border-cyan-400/30 bg-cyan-400/15 text-cyan-200",
    "mock data": "border-slate-700 bg-slate-900 text-slate-300",
  };
  const labels = {
    "live web data": "Live web data",
    "demo data": "Preset report",
    "mock data": "Local fallback",
  };

  return (
    <span className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${styles[source]}`}>
      {labels[source]}
    </span>
  );
}
