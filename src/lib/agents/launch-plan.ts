import { generateAIResponse, parseAIJSON } from "@/lib/ai/aimlapi";
import type { Agent, LaunchPlanResult } from "./types";

export const LaunchPlanAgent: Agent<LaunchPlanResult> = async (profile) => {
  const fallback: LaunchPlanResult = {
    meta: {
      agent: "LaunchPlanAgent",
      mode: profile.dataMode === "demo" ? "mock" : "mock",
      source: profile.dataMode === "demo" ? "demo data" : "mock data",
      confidence: 0.87,
    },
    plan: [
      "Days 1-3: validate audience, offer, competitors, and 3 sharp landing page claims.",
      "Days 4-7: ship landing page, intake form, demo proof, and tracking dashboard.",
      "Days 8-14: run outreach sprint, collect objections, and publish 5 proof assets.",
      "Days 15-21: launch paid test, retarget visitors, and close first customer interviews.",
      "Days 22-30: refine pricing, package repeatable offer, and scale best channel.",
    ],
  };

  const content = await generateAIResponse({
    systemPrompt:
      "You are LaunchPlanAgent. Return JSON with plan array of five 30-day launch phases and meta. No markdown.",
    userPrompt: JSON.stringify(profile),
  });

  return parseAIJSON(content, {
    ...fallback,
    meta: fallback.meta,
  });
};
