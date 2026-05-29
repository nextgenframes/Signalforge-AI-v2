import { CompetitorIntelAgent } from "./competitor";
import { DistributionAgent } from "./distribution";
import { ICPAgent } from "./icp";
import { LaunchPlanAgent } from "./launch-plan";
import { MarketDiscoveryAgent } from "./market-discovery";
import { PricingAgent } from "./pricing";
import { GTMScoreAgent } from "./score";
import type { BusinessProfile, FullGTMReport } from "./types";

export async function runGTMOrchestrator(
  profile: BusinessProfile,
): Promise<FullGTMReport> {
  const normalized = normalizeProfile(profile);
  const [
    marketDiscovery,
    icp,
    competitorIntel,
    pricing,
    distribution,
    launchPlan,
    score,
  ] = await Promise.all([
    MarketDiscoveryAgent(normalized),
    ICPAgent(normalized),
    CompetitorIntelAgent(normalized),
    PricingAgent(normalized),
    DistributionAgent(normalized),
    LaunchPlanAgent(normalized),
    GTMScoreAgent(normalized),
  ]);

  return {
    title: normalized.idea,
    summary: `${normalized.type} launch in ${normalized.location}. Use focused ICP, fast validation, and local signal capture before scaling spend.`,
    dataSource: resolveReportSource([
      marketDiscovery.meta.source,
      icp.meta.source,
      competitorIntel.meta.source,
      pricing.meta.source,
      distribution.meta.source,
      launchPlan.meta.source,
      score.meta.source,
    ]),
    score: score.score,
    icp: [
      ...safeStringList(icp.segments).slice(0, 2),
      `Trigger: ${safeStringList(icp.buyingTriggers)[0].toLowerCase()}`,
    ],
    competitors: safeCompetitors(competitorIntel.competitors),
    valueProposition: `${normalized.idea} helps ${normalized.location} customers get a clearer outcome faster by combining AI-assisted research, practical execution, and simple next steps.`,
    pricing: safeStringList(pricing.packages),
    distribution: safeStringList(distribution.channels),
    launchPlan: safeStringList(launchPlan.plan),
    signals: [
      ...safeStringList(marketDiscovery.demandSignals).slice(0, 2),
      ...safeStringList(competitorIntel.whitespace).slice(0, 1),
    ],
    agents: {
      marketDiscovery,
      icp,
      competitorIntel,
      pricing,
      distribution,
      launchPlan,
      score,
    },
  };
}

function normalizeProfile(profile: BusinessProfile): BusinessProfile {
  return {
    idea: profile.idea || "New small business launch",
    industry: profile.industry || "target industry",
    location: profile.location || "target market",
    website: profile.website || "",
    budget: profile.budget || "starter budget",
    type: profile.type || "business",
    dataMode: profile.dataMode,
  };
}

function resolveReportSource(sources: FullGTMReport["dataSource"][]) {
  if (sources.includes("live web data")) return "live web data";
  if (sources.includes("demo data")) return "demo data";
  return "mock data";
}

function safeStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    const items = value
      .map((item) => (typeof item === "string" ? item : JSON.stringify(item)))
      .filter(Boolean);
    if (items.length > 0) return items;
  }

  if (typeof value === "string" && value.trim()) return [value.trim()];
  return ["Review market signal and choose the next best launch action."];
}

function safeCompetitors(value: unknown) {
  if (!Array.isArray(value)) {
    return [
      {
        name: "Local incumbent",
        position: "Known provider in the target category",
        gap: "Win with sharper offer, faster response, and clearer proof.",
      },
    ];
  }

  return value
    .map((item) => {
      const competitor = item as Partial<{
        name: string;
        position: string;
        gap: string;
      }>;

      return {
        name: competitor.name || "Competitor",
        position: competitor.position || "Market alternative",
        gap: competitor.gap || "Differentiate with proof, speed, and niche focus.",
      };
    })
    .slice(0, 5);
}
