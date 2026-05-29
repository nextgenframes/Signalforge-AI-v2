import { generateAIResponse, parseAIJSON } from "@/lib/ai/aimlapi";
import { getMarketSignals } from "@/lib/brightdata/client";
import type { Agent, MarketDiscoveryResult } from "./types";

export const MarketDiscoveryAgent: Agent<MarketDiscoveryResult> = async (profile) => {
  const industry = profile.industry || "target industry";
  const location = profile.location || "target market";
  const webSignals = await getMarketSignals(
    `${profile.idea} ${industry} ${location}`,
    profile.dataMode,
  );

  const fallback: MarketDiscoveryResult = {
    meta: {
      agent: "MarketDiscoveryAgent",
      mode: webSignals.source === "live web data" ? "live" : "mock",
      source: webSignals.source,
      confidence: 0.82,
    },
    market: `${industry} opportunity in ${location}`,
    trendSignals: [
      "Buyers expect faster response and clearer proof before purchase.",
      "AI-assisted comparison raises bar for positioning and offer clarity.",
      "Local intent and niche keywords can create early low-cost demand.",
    ],
    demandSignals: [
      `Search and referral demand likely strongest around urgent ${industry.toLowerCase()} needs.`,
      `Location specificity matters in ${location} for trust and conversion.`,
      "Review language and competitor FAQ gaps should shape landing page copy.",
    ],
    risks: [
      "Unclear niche can spread launch budget too thin.",
      "Weak proof assets can reduce conversion from high-intent traffic.",
    ],
  };

  const content = await generateAIResponse({
    systemPrompt:
      "You are MarketDiscoveryAgent. Return JSON with market, trendSignals, demandSignals, risks, and meta. No markdown.",
    userPrompt: JSON.stringify({ profile, webSignals: webSignals.data }),
  });

  return parseAIJSON(content, {
    ...fallback,
    meta: fallback.meta,
  });
};
