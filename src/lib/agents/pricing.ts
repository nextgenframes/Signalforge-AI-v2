import { generateAIResponse, parseAIJSON } from "@/lib/ai/aimlapi";
import { discoverCompetitors, scrapeCompetitorPricing } from "@/lib/brightdata/client";
import type { Agent, PricingResult } from "./types";

export const PricingAgent: Agent<PricingResult> = async (profile) => {
  const budget = profile.budget || "starter budget";
  const discovered = await discoverCompetitors(
    profile.idea || profile.industry,
    profile.location,
    profile.dataMode,
  );
  const pricingResearch = discovered.data[0]?.url
    ? await scrapeCompetitorPricing(discovered.data[0].url, profile.dataMode)
    : null;
  const source = pricingResearch?.source || discovered.source;

  const fallback: PricingResult = {
    meta: {
      agent: "PricingAgent",
      mode: source === "live web data" ? "live" : "mock",
      source,
      confidence: 0.78,
    },
    packages: [
      `Starter: low-friction entry offer aligned to ${budget} acquisition budget.`,
      "Core: best-value package with delivery guarantee, onboarding, and proof assets.",
      "Premium: concierge tier with faster turnaround, priority support, and measurable launch outcomes.",
    ],
    pricingLogic:
      "Anchor on outcome value, keep first package easy to buy, and use premium tier for urgent buyers.",
  };

  const content = await generateAIResponse({
    systemPrompt:
      "You are PricingAgent. Use competitor pricing research. Return JSON with packages array, pricingLogic, and meta. No markdown.",
    userPrompt: JSON.stringify({
      profile,
      competitorPricing: pricingResearch?.data,
    }),
  });

  return parseAIJSON(content, {
    ...fallback,
    meta: fallback.meta,
  });
};
