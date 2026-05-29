import { NextResponse } from "next/server";
import { runGTMOrchestrator } from "@/lib/agents/orchestrator";
import {
  discoverCompetitors,
  scrapePage,
  type CompetitorDiscoveryResult,
  type PageScrapeResult,
} from "@/lib/brightdata/client";
import type { BusinessProfile } from "@/lib/agents/types";

type GenerateGTMRequest = {
  businessIdea?: string;
  industry?: string;
  location?: string;
  website?: string;
  budget?: string;
  businessType?: string;
};

export async function POST(request: Request) {
  const body = await readJSON<GenerateGTMRequest>(request);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const profile = normalizeRequest(body);

  const competitorDiscovery = await discoverCompetitors(
    profile.idea,
    profile.location,
    profile.dataMode,
  );
  const scrapedCompetitors = await Promise.all(
    competitorDiscovery.data.slice(0, 3).map(async (competitor) => ({
      competitor,
      page: competitor.url
        ? (await scrapePage(competitor.url, profile.dataMode)).data
        : null,
    })),
  );
  const report = await runGTMOrchestrator(profile);

  return NextResponse.json({
    profile,
    marketDiscovery: {
      ...report.agents.marketDiscovery,
      scrapedCompetitors: formatScrapedCompetitors(
        competitorDiscovery.data,
        scrapedCompetitors,
      ),
    },
    icp: report.agents.icp,
    competitors: report.competitors,
    valueProposition: report.valueProposition,
    pricing: report.agents.pricing,
    distribution: report.agents.distribution,
    launchPlan: report.agents.launchPlan,
    gtmScore: report.agents.score,
    dataSource: report.dataSource,
  });
}

async function readJSON<T>(request: Request) {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

function normalizeRequest(body: GenerateGTMRequest): BusinessProfile {
  return {
    idea: body.businessIdea || "New small business launch",
    industry: body.industry || "target industry",
    location: body.location || "target market",
    website: body.website || "",
    budget: body.budget || "starter budget",
    type: body.businessType || "business",
  };
}

function formatScrapedCompetitors(
  discovered: CompetitorDiscoveryResult[],
  scraped: Array<{
    competitor: CompetitorDiscoveryResult;
    page: PageScrapeResult | null;
  }>,
) {
  return discovered.slice(0, 3).map((competitor, index) => ({
    ...competitor,
    scrapedPage:
      scraped.find((item) => item.competitor.url === competitor.url)?.page ||
      scraped[index]?.page ||
      null,
  }));
}
