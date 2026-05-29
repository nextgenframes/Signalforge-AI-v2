"use client";

import { useLaunchProfile } from "@/components/launch-state";

export function LaunchInsights({ mode }: { mode: "strategy" | "outreach" | "campaigns" }) {
  const profile = useLaunchProfile();

  if (!profile) return null;

  const terms = buildTerms(profile.idea, profile.industry);
  const cards =
    mode === "strategy"
      ? [
          ["Beachhead", `${profile.location} buyers searching ${terms[0]} or ${terms[1]}.`],
          ["Offer wedge", `Package ${profile.idea} around speed, proof, and low-risk first step.`],
          ["Budget rule", `Keep first channel test under ${profile.budget}; scale only after replies.`],
        ]
      : mode === "outreach"
        ? [
            ["Lead trigger", `Mention ${terms[0]}, local competitor gap, or recent review signal.`],
            ["Best opener", `Saw ${profile.industry.toLowerCase()} demand moving in ${profile.location}.`],
            ["CTA", "Offer a 1-page GTM scan, not a sales call."],
          ]
        : [
            ["Campaign 1", `${profile.location} intent landing page for ${terms[0]}.`],
            ["Campaign 2", `Founder proof post: why ${profile.idea} now.`],
            ["Campaign 3", `Partner list around ${profile.industry.toLowerCase()} buyers.`],
          ];

  return (
    <section className="grid gap-3 md:grid-cols-3">
      {cards.map(([title, body]) => (
        <div
          key={title}
          className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4"
        >
          <p className="text-xs font-bold uppercase text-cyan-200">{title}</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
            {body}
          </p>
        </div>
      ))}
    </section>
  );
}

function buildTerms(idea: string, industry: string) {
  const words = `${idea} ${industry}`
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9]/gi, "").toLowerCase())
    .filter((word) => word.length > 3);

  return [words[0] || "launch", words[1] || "growth"];
}
