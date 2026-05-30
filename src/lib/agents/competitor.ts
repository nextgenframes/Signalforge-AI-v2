import { generateAIResponse, parseAIJSON } from "@/lib/ai/aimlapi";
import { discoverCompetitors, searchSERP } from "@/lib/brightdata/client";
import { generateCompetitors } from "@/lib/gtm-data";
import type { Agent, Competitor, CompetitorIntelResult } from "./types";

function serpToCompetitor(item: { title: string; url: string; snippet: string; rank: number }): Competitor {
  return {
    name: item.title,
    position: derivePosition(item.snippet),
    gap: deriveGap(item.snippet),
  };
}

function derivePosition(snippet: string): string {
  const lower = snippet.toLowerCase();
  if (/enterprise|large.?scale|fortune/.test(lower)) return "Enterprise-focused platform";
  if (/free|freemium|open.?source/.test(lower)) return "Freemium or open-source offering";
  if (/ai|machine learning|automation/.test(lower)) return "AI-assisted platform";
  if (/local|near me|city|region/.test(lower)) return "Local or regional competitor";
  if (/saas|cloud|software/.test(lower)) return "Cloud software platform";
  if (/marketplace|connect|find/.test(lower)) return "Marketplace or lead aggregator";
  return "Established market player";
}

function deriveGap(snippet: string): string {
  const lower = snippet.toLowerCase();
  if (/expensive|pricing|cost/.test(lower)) return "Win with clearer pricing and a lower-risk entry offer.";
  if (/complex|difficult|hard to/.test(lower)) return "Win with a faster setup and simpler onboarding experience.";
  if (/slow|response|support/.test(lower)) return "Win with faster response time and a direct owner relationship.";
  if (/generic|broad|all.in.one/.test(lower)) return "Win with vertical-specific positioning and a tighter niche promise.";
  if (/enterprise|large/.test(lower)) return "Win with SMB-friendly pricing, speed-to-value, and no long-term contracts.";
  return "Win with sharper niche positioning, proof assets, and a faster first outcome.";
}

export const CompetitorIntelAgent: Agent<CompetitorIntelResult> = async (profile) => {
  const [discovered, serp] = await Promise.all([
    discoverCompetitors(profile.idea || profile.industry, profile.location, profile.dataMode),
    searchSERP(profile.idea || profile.industry, profile.location, profile.dataMode),
  ]);

  const isLive = discovered.source === "live web data" || serp.source === "live web data";
  const source = isLive ? "live web data" : discovered.source;

  const normalizedDiscovered = discovered.data.map((item) => ({
    title: item.name,
    url: item.url,
    snippet: item.snippet,
    rank: item.rank,
  }));

  const liveCompetitors: Competitor[] = isLive
    ? [...normalizedDiscovered, ...serp.data]
        .filter((item, index, arr) => arr.findIndex((x) => x.title === item.title) === index)
        .slice(0, 5)
        .map(serpToCompetitor)
    : [];

  const fallbackCompetitors = generateCompetitors({
    idea: profile.idea,
    industry: profile.industry,
    location: profile.location,
    website: profile.website ?? "",
    budget: profile.budget,
    type: profile.type,
  });

  const fallback: CompetitorIntelResult = {
    meta: {
      agent: "CompetitorIntelAgent",
      mode: isLive ? "live" : "mock",
      source,
      confidence: 0.8,
    },
    competitors: liveCompetitors.length > 0 ? liveCompetitors : fallbackCompetitors,
    whitespace: [
      "Sharper niche promise than broad incumbents.",
      "Faster first response and stronger proof capture.",
      "Offer packaging around a specific outcome, not generic features.",
    ],
  };

  const aiPrompt = `
You are CompetitorIntelAgent. Based on the business profile and SERP data below, identify the top 3-4 ACTUAL competing companies or products (not directories, review sites, or aggregators like Yelp, Angi, G2, Capterra).

Business: ${profile.idea}
Industry: ${profile.industry}
Location: ${profile.location}

SERP results:
${[...normalizedDiscovered, ...serp.data]
  .slice(0, 8)
  .map((item) => `- ${item.title}: ${item.snippet}`)
  .join("\n")}

Return JSON with this exact shape:
{
  "competitors": [
    {
      "name": "Actual company or product name (not full page title, not a directory)",
      "position": "Their market position in 5-8 words",
      "gap": "One sentence starting with 'Win with...' describing the specific opportunity against them"
    }
  ],
  "whitespace": ["3 specific market gaps or positioning opportunities"],
  "meta": { "agent": "CompetitorIntelAgent", "mode": "${isLive ? "live" : "mock"}", "source": "${source}", "confidence": 0.85 }
}`.trim();

  const content = await generateAIResponse({
    systemPrompt: "You are a precise GTM analyst. Return only valid JSON matching the exact shape requested. Never include directories, review sites, or aggregators as competitors.",
    userPrompt: aiPrompt,
  });

  return parseAIJSON(content, fallback);
};
