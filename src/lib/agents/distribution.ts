import { generateAIResponse, parseAIJSON } from "@/lib/ai/aimlapi";
import { getMarketSignals, searchSERP } from "@/lib/brightdata/client";
import type { Agent, DistributionResult } from "./types";

export const DistributionAgent: Agent<DistributionResult> = async (profile) => {
  const serp = await searchSERP(profile.idea || profile.industry, profile.location, profile.dataMode);
  const signals = await getMarketSignals(
    `${profile.idea} acquisition channels buying intent`,
    profile.dataMode,
  );
  const source = serp.source === "live web data" ? serp.source : signals.source;
  const fallback: DistributionResult = {
    meta: {
      agent: "DistributionAgent",
      mode: source === "live web data" ? "live" : "mock",
      source,
      confidence: 0.84,
    },
    channels: [
      "Google Business Profile, local SEO pages, and review capture for high-intent demand.",
      "Short-form proof content: before/after, customer story, founder POV, and launch progress.",
      "Partner channel: complementary local businesses, creators, agencies, or community groups.",
      "Outbound: 50 targeted weekly messages using location, pain signal, and clear offer.",
    ],
    firstTests: [
      "One landing page variant by audience segment.",
      "One paid search or local service ad test.",
      "One partner referral script with tracked offer.",
    ],
  };

  const content = await generateAIResponse({
    systemPrompt:
      "You are DistributionAgent. Use SERP ranking and market/buying-intent signals. Return JSON with channels array, firstTests array, and meta. No markdown.",
    userPrompt: JSON.stringify({ profile, serp: serp.data, signals: signals.data }),
  });

  return parseAIJSON(content, {
    ...fallback,
    meta: fallback.meta,
  });
};
