"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  LaunchInput,
  type LaunchProfile,
  useLaunchProfile,
} from "@/components/launch-state";
import { demoInputs, generateReport, type GTMReport } from "@/lib/gtm-data";

export default function DashboardPage() {
  const profile = useLaunchProfile();
  const report = useMemo(() => {
    if (!profile) {
      return generateReport({ ...demoInputs["HVAC Company"], dataMode: "mock" });
    }

    return generateReport({
      idea: profile.idea,
      industry: profile.industry,
      location: profile.location,
      website: "",
      budget: profile.budget,
      type: profile.businessType,
      dataMode: "mock",
    });
  }, [profile]);
  const completedActions = 3;
  const totalActions = report.launchPlan.length;

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/90 text-white shadow-lg shadow-black/20">
          <div className="p-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <SourceBadge source={report.dataSource} />
              </div>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">
                SignalForge GTM command center
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                AI agent workspace for launching small businesses with live web
                intelligence, API-backed agents, and clear next actions.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
                >
                  Run GTM Agent
                </Link>
                <Link
                  href="/demo"
                  className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  Demo Mode
                </Link>
              </div>
            </div>
          </div>
        </section>

        <LaunchInput />
        <AgentPipeline profile={profile} />

        <div className="grid gap-4 md:grid-cols-4">
          <Metric label="ICP clarity" value="86%" helper="Buyer segment set" />
          <Metric label="Competitor gaps" value="3" helper="Open wedges found" />
          <Metric label="Channels ready" value="4" helper="Tests queued" />
          <Metric label="30 day tasks" value={`${completedActions}/${totalActions}`} helper="Action plan progress" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card title="ICP Summary">
            <div className="space-y-3">
              {report.icp.map((item) => (
                <div key={item} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Value Proposition" dark>
            <p className="text-xl font-bold leading-8 text-white">
              {report.valueProposition}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Fast outcome", "Clear proof", "Simple next step"].map((item) => (
                <Badge key={item} tone="dark">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Top Competitors">
          <div className="grid gap-4 md:grid-cols-3">
            {report.competitors.map((competitor, index) => (
              <article
                key={competitor.name}
                className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 shadow-sm shadow-black/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase text-cyan-300">
                      Rank #{index + 1}
                    </p>
                    <h3 className="mt-2 font-bold text-slate-100">
                      {competitor.name}
                    </h3>
                  </div>
                  <Badge tone="slate">SERP</Badge>
                </div>
                <p className="mt-3 text-sm font-bold text-slate-300">
                  {competitor.position}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {competitor.gap}
                </p>
              </article>
            ))}
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="Pricing Recommendation">
            <Checklist items={report.pricing} completed={2} />
          </Card>

          <Card title="Best Distribution Channels">
            <Checklist items={report.distribution} completed={2} />
          </Card>

          <Card title="Market Signals Feed">
            <div className="space-y-3">
              {report.signals.map((signal, index) => (
                <div
                  key={signal}
                  className="rounded-lg border border-slate-800 bg-slate-900/70 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone={index === 0 ? "green" : "slate"}>
                      {index === 0 ? "High intent" : "Signal"}
                    </Badge>
                    <span className="text-xs font-bold text-slate-400">
                      now
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {signal}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="30 Day Launch Plan">
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <div className="space-y-3">
              {report.launchPlan.map((item, index) => (
                <div
                  key={item}
                  className="grid gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-4 sm:grid-cols-[96px_1fr]"
                >
                  <div>
                    <Badge tone={index < completedActions ? "green" : "slate"}>
                      {index < completedActions ? "Ready" : "Next"}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold leading-6 text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <aside className="rounded-lg bg-slate-950 p-5 text-white">
              <p className="text-xs font-bold uppercase text-cyan-200">
                Action checklist
              </p>
              <div className="mt-5 space-y-4">
                {[
                  ["Landing page claims", true],
                  ["Competitor gap notes", true],
                  ["Outreach sprint", true],
                  ["Paid channel test", false],
                  ["Review capture loop", false],
                ].map(([label, done]) => (
                  <div key={String(label)} className="flex items-center gap-3">
                    <span
                      className={`grid size-6 place-items-center rounded-lg text-xs font-bold ${
                        done ? "bg-lime-300 text-slate-950" : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {done ? "OK" : ""}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Progress value={(completedActions / totalActions) * 100} dark />
              </div>
            </aside>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Metric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5 shadow-sm shadow-black/20">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold text-slate-100">{value}</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{helper}</p>
    </section>
  );
}

function Card({
  title,
  children,
  dark = false,
}: {
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={
        dark
          ? "rounded-lg border border-slate-800 bg-slate-950/90 p-5 text-white shadow-xl shadow-black/20"
          : "rounded-lg border border-slate-800 bg-slate-950/90 p-5 shadow-sm shadow-black/20"
      }
    >
      <h2
        className={
          dark
            ? "mb-4 text-sm font-bold uppercase text-cyan-200"
            : "mb-4 text-sm font-bold uppercase text-cyan-300"
        }
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Checklist({ items, completed }: { items: string[]; completed: number }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item} className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <Badge tone={index < completed ? "green" : "slate"}>
              {index < completed ? "Validated" : "Test"}
            </Badge>
            <span className="text-xs font-bold text-slate-400">
              {Math.min(90, 55 + index * 10)}%
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-300">{item}</p>
          <Progress value={Math.min(90, 55 + index * 10)} />
        </div>
      ))}
    </div>
  );
}

function Progress({ value, dark = false }: { value: number; dark?: boolean }) {
  return (
    <div className={`mt-3 h-2 overflow-hidden rounded-lg ${dark ? "bg-white/10" : "bg-slate-800"}`}>
      <div
        className="h-full rounded-lg bg-gradient-to-r from-cyan-300 to-lime-300"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "cyan" | "green" | "slate" | "dark";
}) {
  const styles = {
    cyan: "border-cyan-400/30 bg-cyan-400/15 text-cyan-200",
    green: "border-lime-400/30 bg-lime-400/15 text-lime-200",
    slate: "border-slate-700 bg-slate-900 text-slate-300",
    dark: "border-white/10 bg-white/10 text-cyan-100",
  };

  return (
    <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-bold ${styles[tone]}`}>
      {children}
    </span>
  );
}

function SourceBadge({ source }: { source: GTMReport["dataSource"] }) {
  const tone =
    source === "live web data" ? "green" : source === "demo data" ? "cyan" : "slate";
  const labels = {
    "live web data": "Live web data",
    "demo data": "Preset report",
    "mock data": "Local fallback",
  };

  return <Badge tone={tone}>{labels[source]}</Badge>;
}

function AgentPipeline({ profile }: { profile: LaunchProfile | null }) {
  const [runId, setRunId] = useState(0);
  const [activeStep, setActiveStep] = useState(profile ? 6 : 0);
  const steps = [
    ["MarketDiscoveryAgent", "Searches category, local intent, and demand signals"],
    ["ICPAgent", "Builds buyer segments, pains, and triggers"],
    ["CompetitorIntelAgent", "Finds competitors, gaps, and SERP pressure"],
    ["PricingAgent", "Benchmarks packages and offer ladder"],
    ["DistributionAgent", "Ranks channels by intent and budget fit"],
    ["LaunchPlanAgent", "Creates 30 day execution plan"],
    ["GTMScoreAgent", "Checks readiness and next best action"],
  ];

  useEffect(() => {
    function replay() {
      setRunId((current) => current + 1);
    }

    window.addEventListener("signalforge-launch", replay);
    return () => window.removeEventListener("signalforge-launch", replay);
  }, []);

  useEffect(() => {
    const reset = window.setTimeout(() => setActiveStep(0), 0);

    if (!profile) {
      return () => window.clearTimeout(reset);
    }

    const timer = window.setInterval(() => {
      setActiveStep((current) => {
        if (current >= steps.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 360);

    return () => {
      window.clearTimeout(reset);
      window.clearInterval(timer);
    };
  }, [profile, runId, steps.length]);

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5 shadow-sm shadow-black/20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-cyan-300">Agent pipeline replay</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-100">
            {profile ? profile.idea : "Waiting for launch"}
          </h2>
        </div>
        <Badge tone={activeStep >= steps.length ? "green" : "cyan"}>
          {activeStep >= steps.length ? "Complete" : "Running"}
        </Badge>
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-7">
        {steps.map(([agent, action], index) => {
          const done = activeStep > index;
          const running = activeStep === index;

          return (
            <div
              key={agent}
              className={`rounded-lg border p-3 ${
                done
                  ? "border-lime-400/30 bg-lime-400/10"
                  : running
                    ? "border-cyan-400/40 bg-cyan-400/10"
                    : "border-slate-800 bg-slate-900/60"
              }`}
            >
              <p className="text-xs font-bold uppercase text-slate-400">
                Step {index + 1}
              </p>
              <p className="mt-2 text-sm font-bold text-slate-100">{agent}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{action}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
