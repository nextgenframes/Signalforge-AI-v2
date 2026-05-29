import { generateAIResponse, parseAIJSON } from "@/lib/ai/aimlapi";
import { getMarketSignals, searchSERP } from "@/lib/brightdata/client";
import type { Agent, BusinessProfile, GTMScoreResult } from "./types";

function scoreProfile(profile: BusinessProfile) {
  let score = 62;
  if (profile.idea.length > 18) score += 8;
  if (profile.industry) score += 7;
  if (profile.location) score += 6;
  if (profile.website) score += 5;
  if (profile.budget) score += 4;
  if (profile.type) score += 5;
  return Math.min(score, 94);
}

export const GTMScoreAgent: Agent<GTMScoreResult> = async (profile) => {
  const serp = await searchSERP(profile.idea || profile.industry, profile.location, profile.dataMode);
  const signals = await getMarketSignals(
    `${profile.idea} market demand pricing reviews`,
    profile.dataMode,
  );
  const source = serp.source === "live web data" ? serp.source : signals.source;
  const fallback: GTMScoreResult = {
    meta: {
      agent: "GTMScoreAgent",
      mode: source === "live web data" ? "live" : "mock",
      source,
      confidence: 0.81,
    },
    score: scoreProfile(profile),
    drivers: [
      "Specific audience and location improve launch precision.",
      "Website and proof assets raise conversion readiness.",
      "Budget clarity improves channel choice and test size.",
    ],
  };

  const content = await generateAIResponse({
    systemPrompt:
      "You are GTMScoreAgent. Use SERP and market signals. Return JSON with score number 0-100, drivers array, and meta. No markdown.",
    userPrompt: JSON.stringify({ profile, serp: serp.data, signals: signals.data }),
  });

  return parseAIJSON(content, {
    ...fallback,
    meta: fallback.meta,
  });
};
