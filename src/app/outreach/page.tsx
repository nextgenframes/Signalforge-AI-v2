"use client";

import { useMemo } from "react";
import { AppShell } from "@/components/app-shell";
import { LaunchContextPanel, useLaunchProfile, type LaunchProfile } from "@/components/launch-state";
import { generateOutreachContent, type OutreachContent } from "@/lib/page-content";

const defaultProfile: LaunchProfile = {
  idea: "Residential HVAC repair with same-day booking",
  industry: "Home services",
  location: "Charlotte, NC",
  budget: "$6,500",
  businessType: "Local service",
};

export default function OutreachPage() {
  const profile = useLaunchProfile() ?? defaultProfile;
  const content = useMemo(() => generateOutreachContent(profile), [profile]);

  return (
    <AppShell>
      <div className="space-y-6">
        <Header content={content} />
        <LaunchContextPanel label="Outreach loaded for" />
        <MetricsRow content={content} />
        <SegmentsSection content={content} />
        <SequenceSection content={content} />
        <ObjectionsSection content={content} />
        <TokensSection content={content} />
        <RulesSection content={content} />
      </div>
    </AppShell>
  );
}

function Header({ content }: { content: OutreachContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-xs font-bold uppercase text-cyan-300">SignalForge GTM</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-100">Outreach</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{content.headline}</p>
    </section>
  );
}

function MetricsRow({ content }: { content: OutreachContent }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {content.metrics.map(({ label, value }) => (
        <section key={label} className="rounded-lg border border-slate-800 bg-slate-950/90 p-4">
          <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-100">{value}</p>
        </section>
      ))}
    </div>
  );
}

function SegmentsSection({ content }: { content: OutreachContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Target segments</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {content.segments.map((seg) => (
          <div key={seg.name} className="flex flex-col rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-bold text-slate-100">{seg.name}</h2>
              <span className="shrink-0 rounded-lg border border-slate-700 bg-slate-950 px-2 py-0.5 text-xs font-bold text-slate-400">
                {seg.size}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div>
                <p className="text-xs font-bold uppercase text-cyan-200">Signal</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{seg.signal}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-cyan-200">Source</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{seg.source}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-cyan-200">Approach</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{seg.approach}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SequenceSection({ content }: { content: OutreachContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Outreach sequence</p>
      <div className="mt-4 space-y-4">
        {content.sequences.map((seq, i) => (
          <div key={seq.step} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan-400/15 font-mono text-sm font-bold text-cyan-200">
                {i + 1}
              </span>
              <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/15 px-2.5 py-1 text-xs font-bold text-cyan-200">
                {seq.step}
              </span>
              <span className="text-xs font-bold uppercase text-slate-500">{seq.angle}</span>
              <span className="ml-auto rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-400">
                {seq.timing}
              </span>
            </div>
            <p className="mt-4 rounded-lg bg-slate-950 px-4 py-3 text-sm leading-7 text-slate-300 font-mono">
              {seq.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ObjectionsSection({ content }: { content: OutreachContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Objection handling</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {content.objections.map((obj) => (
          <div key={obj.objection} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-red-400" />
              <p className="text-sm font-bold text-slate-200">"{obj.objection}"</p>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-lime-400" />
              <p className="text-sm leading-6 text-slate-400">{obj.response}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TokensSection({ content }: { content: OutreachContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Personalization tokens</p>
      <p className="mt-2 text-xs text-slate-500">Use these in the first line of every outreach message to dramatically increase reply rates.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {content.tokens.map((token) => (
          <span
            key={token}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-300"
          >
            {token}
          </span>
        ))}
      </div>
    </section>
  );
}

function RulesSection({ content }: { content: OutreachContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Outreach rules</p>
      <ul className="mt-4 space-y-3">
        {content.rules.map((rule) => (
          <li key={rule} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan-400" />
            <p className="text-sm leading-6 text-slate-300">{rule}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
