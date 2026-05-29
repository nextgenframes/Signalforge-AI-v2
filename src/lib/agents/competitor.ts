import { generateAIResponse, parseAIJSON } from "@/lib/ai/aimlapi";
import { discoverCompetitors, searchSERP } from "@/lib/brightdata/client";
import type { Agent, Competitor, CompetitorIntelResult } from "./types";

const competitorSets: Record<string, Competitor[]> = {
  software: [
    {
      name: "Teal",
      position: "Career workflow platform",
      gap: "Powerful, but broad. Win with speed, niche templates, and lower setup time.",
    },
    {
      name: "Resume.io",
      position: "Resume builder",
      gap: "Template-led. Win with personalized rewrites tied to target jobs.",
    },
    {
      name: "Kickresume",
      position: "AI resume and cover letter suite",
      gap: "Feature-heavy. Win with guided outcomes and clearer ROI.",
    },
  ],
  local: [
    {
      name: "Top-ranked local incumbent",
      position: "Strong Google Maps presence",
      gap: "Win with faster response, proof, and focused landing pages.",
    },
    {
      name: "Budget operator",
      position: "Low-price competitor",
      gap: "Avoid price war. Package trust, convenience, and guarantee.",
    },
    {
      name: "Franchise brand",
      position: "Known name, slower personalization",
      gap: "Win with neighborhood specificity and owner-led service.",
    },
  ],
  consumer: [
    {
      name: "Category leader",
      position: "Large brand with broad audience",
      gap: "Win with sharper persona and community-driven content.",
    },
    {
      name: "Creator-led niche brand",
      position: "Strong organic trust",
      gap: "Win with product consistency and better onboarding.",
    },
    {
      name: "Low-cost alternative",
      position: "Discount positioning",
      gap: "Win with outcomes, retention, and premium support.",
    },
  ],
};

function pickCompetitors(profile: { industry: string; type: string }) {
  const text = `${profile.industry} ${profile.type}`.toLowerCase();
  if (text.includes("saas") || text.includes("software") || text.includes("app")) {
    return competitorSets.software;
  }
  if (
    text.includes("local") ||
    text.includes("service") ||
    text.includes("hvac") ||
    text.includes("auto") ||
    text.includes("coffee")
  ) {
    return competitorSets.local;
  }
  return competitorSets.consumer;
}

export const CompetitorIntelAgent: Agent<CompetitorIntelResult> = async (profile) => {
  const discovered = await discoverCompetitors(
    profile.idea || profile.industry,
    profile.location,
    profile.dataMode,
  );
  const serp = await searchSERP(profile.idea || profile.industry, profile.location, profile.dataMode);
  const source = discovered.source === "live web data" ? discovered.source : serp.source;
  const fallback: CompetitorIntelResult = {
    meta: {
      agent: "CompetitorIntelAgent",
      mode: source === "live web data" ? "live" : "mock",
      source,
      confidence: 0.8,
    },
    competitors:
      discovered.source === "live web data"
        ? discovered.data.slice(0, 3).map((item) => ({
            name: item.name,
            position: `SERP rank #${item.rank}`,
            gap: item.snippet || "Review live page for positioning gap.",
          }))
        : pickCompetitors(profile),
    whitespace: [
      "Sharper niche promise than broad incumbents.",
      "Faster first response and stronger proof capture.",
      "Offer packaging around specific outcome, not generic features.",
    ],
  };

  const content = await generateAIResponse({
    systemPrompt:
      "You are CompetitorIntelAgent. Use SERP ranking and discovered competitors. Return JSON with competitors array of {name, position, gap}, whitespace array, and meta. No markdown.",
    userPrompt: JSON.stringify({ profile, competitors: discovered.data, serp: serp.data }),
  });

  return parseAIJSON(content, {
    ...fallback,
    meta: fallback.meta,
  });
};
