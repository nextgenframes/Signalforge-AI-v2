import { getMarketSignals } from "@/lib/brightdata/client";
import { generateAIResponse, parseAIJSON } from "@/lib/ai/aimlapi";
import type { Agent, ICPResult } from "./types";

export const ICPAgent: Agent<ICPResult> = async (profile) => {
  const location = profile.location || "target market";
  const industry = profile.industry || "target industry";
  const intentSignals = await getMarketSignals(
    `${profile.idea} ${industry} buying intent`,
    profile.dataMode,
  );

  const fallback: ICPResult = {
    meta: {
      agent: "ICPAgent",
      mode: intentSignals.source === "live web data" ? "live" : "mock",
      source: intentSignals.source,
      confidence: 0.86,
    },
    segments: [
      `Primary buyer: people or teams in ${location} with urgent ${industry.toLowerCase()} need.`,
      "Best early segment: buyers who value speed, trust, and done-for-you guidance over lowest price.",
      "Secondary segment: comparison shoppers frustrated by unclear offers or slow follow-up.",
    ],
    pains: [
      "Too many options and not enough confidence.",
      "Slow vendor response or unclear next step.",
      "Fear of wasting money on weak outcomes.",
    ],
    buyingTriggers: [
      "Active search with local or niche intent.",
      "Recent life, business, weather, hiring, or operational event.",
      "Visible dissatisfaction with current provider or tool.",
    ],
  };

  const content = await generateAIResponse({
    systemPrompt:
      "You are ICPAgent. Use buying intent signals. Return JSON with segments, pains, buyingTriggers, and meta. No markdown.",
    userPrompt: JSON.stringify({ profile, intentSignals: intentSignals.data }),
  });

  return parseAIJSON(content, {
    ...fallback,
    meta: fallback.meta,
  });
};
