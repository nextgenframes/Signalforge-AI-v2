"use client";

import { useMemo } from "react";
import { AppShell } from "@/components/app-shell";
import { LaunchContextPanel, useLaunchProfile, type LaunchProfile } from "@/components/launch-state";
import { generateCampaignContent, type CampaignContent, type Campaign } from "@/lib/page-content";

const defaultProfile: LaunchProfile = {
  idea: "Residential HVAC repair with same-day booking",
  industry: "Home services",
  location: "Charlotte, NC",
  budget: "$6,500",
  businessType: "Local service",
};

const statusStyles: Record<Campaign["status"], string> = {
  Live: "border-lime-400/30 bg-lime-400/15 text-lime-200",
  Ready: "border-cyan-400/30 bg-cyan-400/15 text-cyan-200",
  Draft: "border-slate-700 bg-slate-900 text-slate-400",
  Paused: "border-amber-400/30 bg-amber-400/15 text-amber-200",
};

export default function CampaignsPage() {
  const profile = useLaunchProfile() ?? defaultProfile;
  const content = useMemo(() => generateCampaignContent(profile), [profile]);

  return (
    <AppShell>
      <div className="space-y-6">
        <Header content={content} />
        <LaunchContextPanel label="Campaigns loaded for" />
        <CampaignList content={content} />
        <PrinciplesSection content={content} />
      </div>
    </AppShell>
  );
}

function Header({ content }: { content: CampaignContent }) {
  const live = content.campaigns.filter((c) => c.status === "Live").length;
  const ready = content.campaigns.filter((c) => c.status === "Ready").length;

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-xs font-bold uppercase text-cyan-300">SignalForge GTM</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Campaigns</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{content.headline}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 text-center">
            <p className="text-2xl font-bold text-lime-200">{live}</p>
            <p className="text-xs font-bold text-slate-500">Live</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 text-center">
            <p className="text-2xl font-bold text-cyan-200">{ready}</p>
            <p className="text-xs font-bold text-slate-500">Ready to launch</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 text-center">
            <p className="text-2xl font-bold text-slate-100">{content.totalBudget}</p>
            <p className="text-xs font-bold text-slate-500">Total budget</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CampaignList({ content }: { content: CampaignContent }) {
  return (
    <div className="space-y-4">
      {content.campaigns.map((campaign, i) => (
        <CampaignCard key={campaign.name} campaign={campaign} index={i} />
      ))}
    </div>
  );
}

function CampaignCard({ campaign, index }: { campaign: Campaign; index: number }) {
  const progressNum = parseInt(campaign.progress, 10);

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5 shadow-sm shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-800 font-mono text-xs font-bold text-slate-400">
            {index + 1}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">{campaign.name}</h2>
              <span className={`rounded-lg border px-2.5 py-0.5 text-xs font-bold ${statusStyles[campaign.status]}`}>
                {campaign.status}
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-500">{campaign.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
          <span className="text-xs font-bold text-slate-500">Budget</span>
          <span className="font-mono text-sm font-bold text-lime-200">{campaign.budgetSplit}</span>
        </div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-lime-300"
          style={{ width: campaign.progress }}
        />
      </div>
      <p className="mt-1.5 text-xs font-bold text-slate-500">{progressNum}% ready to launch</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase text-cyan-300">Goal</p>
          <p className="mt-1.5 text-sm leading-6 text-slate-300">{campaign.goal}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase text-cyan-300">Channel</p>
          <p className="mt-1.5 text-sm font-semibold text-slate-400">{campaign.channel}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase text-cyan-300">Copy angle</p>
        <p className="mt-1.5 rounded-lg bg-slate-900/70 px-4 py-3 text-sm leading-6 text-slate-300 font-mono">
          {campaign.copyAngle}
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-lime-400/20 bg-lime-400/10 p-3">
          <p className="text-xs font-bold uppercase text-lime-300">Success metric</p>
          <p className="mt-1.5 text-sm font-semibold text-slate-200">{campaign.successMetric}</p>
        </div>
        <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-3">
          <p className="text-xs font-bold uppercase text-cyan-300">Next action</p>
          <p className="mt-1.5 text-sm font-semibold text-slate-200">{campaign.nextAction}</p>
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection({ content }: { content: CampaignContent }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
      <p className="text-sm font-bold text-cyan-300">Campaign principles</p>
      <ul className="mt-4 space-y-3">
        {content.principles.map((rule) => (
          <li key={rule} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan-400" />
            <p className="text-sm leading-6 text-slate-300">{rule}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
