"use client";

import { useMemo } from "react";
import { AppShell } from "@/components/app-shell";
import { LaunchContextPanel, useLaunchProfile, type LaunchProfile } from "@/components/launch-state";
import { generateStrategyContent, type StrategyContent } from "@/lib/page-content";

const defaultProfile: LaunchProfile = {
  idea: "Residential HVAC repair with same-day booking",
  industry: "Home services",
  location: "Charlotte, NC",
  budget: "$6,500",
  businessType: "Local service",
};

export default function StrategyPage() {
  const profile = useLaunchProfile() ?? defaultProfile;
  const content = useMemo(() => generateStrategyContent(profile), [profile]);

  return (
    <AppShell>
      <div className="space-y-6">
        <Header content={content} />
        <LaunchContextPanel label="Strategy built for" />
        <PositioningSection content={content} />
        <PrioritiesSection content={content} />
        <ChannelsSection content={content} />
        <PricingSection content={content} />
        <RoadmapSection content={content} />
        <MetricsSection content={content} />
        <RisksSection content={content} />
        <DecisionRulesSection content={content} />
      </div>
    </AppShell>
  );
}

function Header({ content }: { content: StrategyContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-xs font-bold uppercase text-cyan-300">SignalForge GTM</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-100">Strategy</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
        {content.beachhead}
      </p>
    </section>
  );
}

function PositioningSection({ content }: { content: StrategyContent }) {
  return (
    <section className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-5">
      <p className="text-xs font-bold uppercase text-cyan-300">Positioning statement</p>
      <p className="mt-3 text-lg font-bold leading-8 text-slate-100">{content.positioning}</p>
    </section>
  );
}

function PrioritiesSection({ content }: { content: StrategyContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Strategic priorities</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.priorities.map((p) => (
          <div key={p.title} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-bold text-slate-100">{p.title}</h2>
              <span className="shrink-0 rounded-lg border border-cyan-400/30 bg-cyan-400/15 px-2 py-0.5 text-xs font-bold text-cyan-200">
                {p.tag}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChannelsSection({ content }: { content: StrategyContent }) {
  const toneMap = {
    High: "border-lime-400/30 bg-lime-400/15 text-lime-200",
    Medium: "border-cyan-400/30 bg-cyan-400/15 text-cyan-200",
    Test: "border-slate-700 bg-slate-900 text-slate-400",
  };

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Channel strategy</p>
      <div className="mt-4 space-y-3">
        {content.channels.map((ch) => (
          <div key={ch.channel} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-slate-100">{ch.channel}</h2>
                  <span className={`rounded-lg border px-2 py-0.5 text-xs font-bold ${toneMap[ch.priority]}`}>
                    {ch.priority} priority
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{ch.play}</p>
              </div>
              <div className="shrink-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-lime-200">
                {ch.target}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingSection({ content }: { content: StrategyContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Pricing ladder</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {content.packages.map((pkg, i) => (
          <div
            key={pkg.name}
            className={`rounded-lg border p-5 ${i === 1 ? "border-cyan-400/40 bg-cyan-400/10" : "border-slate-800 bg-slate-900/70"}`}
          >
            {i === 1 && (
              <span className="mb-3 inline-block rounded-lg border border-cyan-400/30 bg-cyan-400/15 px-2.5 py-1 text-xs font-bold text-cyan-200">
                Recommended
              </span>
            )}
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-bold text-slate-100">{pkg.name}</h2>
              <p className="font-mono text-sm font-bold text-lime-200">{pkg.price}</p>
            </div>
            <ul className="mt-4 space-y-2">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-semibold text-slate-500">Best for: {pkg.bestFor}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RoadmapSection({ content }: { content: StrategyContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">90-day GTM roadmap</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {content.roadmap.map((phase, i) => (
          <div key={phase.phase} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-300">Phase {i + 1}</span>
                <h2 className="mt-1 font-bold text-slate-100">{phase.phase}</h2>
                <p className="text-xs font-semibold text-slate-500">{phase.days}</p>
              </div>
              <span className="shrink-0 rounded-lg border border-lime-400/30 bg-lime-400/15 px-2.5 py-1 text-xs font-bold text-lime-200">
                {phase.milestone.split(" ").slice(0, 4).join(" ")}…
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {phase.actions.map((action) => (
                <li key={action} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-600" />
                  {action}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-lime-200">
              Milestone: {phase.milestone}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MetricsSection({ content }: { content: StrategyContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Key metrics to track</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {content.metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-bold uppercase text-slate-500">{m.label}</p>
            <p className="mt-2 text-xl font-bold text-slate-100">{m.target}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">Review: {m.cadence}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RisksSection({ content }: { content: StrategyContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Risks and mitigations</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {content.risks.map((r) => (
          <div key={r.risk} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-red-400" />
              <p className="text-sm font-bold text-slate-200">{r.risk}</p>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-lime-400" />
              <p className="text-sm leading-6 text-slate-400">{r.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DecisionRulesSection({ content }: { content: StrategyContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Decision rules</p>
      <ul className="mt-4 space-y-3">
        {content.decisionRules.map((rule) => (
          <li key={rule} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan-400" />
            <p className="text-sm leading-6 text-slate-300">{rule}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
