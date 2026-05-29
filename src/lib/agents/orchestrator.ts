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
      ...icp.segments.slice(0, 2),
      `Trigger: ${icp.buyingTriggers[0].toLowerCase()}`,
    ],
    competitors: competitorIntel.competitors,
    valueProposition: `${normalized.idea} helps ${normalized.location} customers get a clearer outcome faster by combining AI-assisted research, practical execution, and simple next steps.`,
    pricing: pricing.packages,
    distribution: distribution.channels,
    launchPlan: launchPlan.plan,
    signals: [
      ...marketDiscovery.demandSignals.slice(0, 2),
      ...competitorIntel.whitespace.slice(0, 1),
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
