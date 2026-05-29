import type {
  BusinessProfile,
  Competitor,
  FullGTMReport,
  GTMScoreResult,
} from "./agents/types";

export type BusinessInput = {
  idea: string;
  industry: string;
  location: string;
  website: string;
  budget: string;
  type: string;
} & BusinessProfile;

export type DemoKey =
  | "AI Resume Tool"
  | "Mobile Car Wash"
  | "Local Coffee Shop"
  | "HVAC Company"
  | "Fitness App";

export type { Competitor };
export type GTMReport = FullGTMReport;

export const blankInput: BusinessInput = {
  idea: "",
  industry: "",
  location: "",
  website: "",
  budget: "$5,000",
  type: "Service business",
};

export const demoInputs: Record<DemoKey, BusinessInput> = {
  "AI Resume Tool": {
    idea: "AI resume rewrite and job application assistant",
    industry: "Career software",
    location: "United States",
    website: "https://example.com",
    budget: "$12,000",
    type: "SaaS",
    dataMode: "demo",
  },
  "Mobile Car Wash": {
    idea: "On-demand eco mobile car wash for offices and apartments",
    industry: "Auto services",
    location: "Phoenix, AZ",
    website: "",
    budget: "$4,000",
    type: "Local service",
    dataMode: "demo",
  },
  "Local Coffee Shop": {
    idea: "Neighborhood coffee shop with subscriptions and events",
    industry: "Food and beverage",
    location: "Austin, TX",
    website: "",
    budget: "$8,000",
    type: "Brick and mortar",
    dataMode: "demo",
  },
  "HVAC Company": {
    idea: "Residential HVAC repair with same-day booking",
    industry: "Home services",
    location: "Charlotte, NC",
    website: "https://example-hvac.com",
    budget: "$6,500",
    type: "Local service",
    dataMode: "demo",
  },
  "Fitness App": {
    idea: "Adaptive strength coaching app for busy parents",
    industry: "Health and fitness",
    location: "United States",
    website: "",
    budget: "$15,000",
    type: "Mobile app",
    dataMode: "demo",
  },
};

export function generateReport(input: BusinessInput): GTMReport {
  const idea = input.idea || "New small business launch";
  const industry = input.industry || "target industry";
  const location = input.location || "target market";
  const type = input.type || "business";
  const budget = input.budget || "starter budget";
  const score = scoreInput(input);
  const source = input.dataMode === "demo" ? "demo data" : "mock data";
  const competitors = pickCompetitors(input);
  const icp = [
    `Primary buyer: people or teams in ${location} with urgent ${industry.toLowerCase()} need.`,
    "Best early segment: buyers who value speed, trust, and done-for-you guidance over lowest price.",
    "Trigger: active search, recent life or business event, or clear pain with current options.",
  ];
  const pricing = [
    `Starter: low-friction entry offer aligned to ${budget} acquisition budget.`,
    "Core: best-value package with delivery guarantee, onboarding, and proof assets.",
    "Premium: concierge tier with faster turnaround, priority support, and measurable launch outcomes.",
  ];
  const distribution = [
    "Google Business Profile, local SEO pages, and review capture for high-intent demand.",
    "Short-form proof content: before/after, customer story, founder POV, and launch progress.",
    "Partner channel: complementary local businesses, creators, agencies, or community groups.",
    "Outbound: 50 targeted weekly messages using location, pain signal, and clear offer.",
  ];
  const launchPlan = [
    "Days 1-3: validate audience, offer, competitors, and 3 sharp landing page claims.",
    "Days 4-7: ship landing page, intake form, demo proof, and tracking dashboard.",
    "Days 8-14: run outreach sprint, collect objections, and publish 5 proof assets.",
    "Days 15-21: launch paid test, retarget visitors, and close first customer interviews.",
    "Days 22-30: refine pricing, package repeatable offer, and scale best channel.",
  ];
  const scoreAgent: GTMScoreResult = {
    meta: { agent: "GTMScoreAgent", mode: "mock", source, confidence: 0.81 },
    score,
    drivers: [
      "Specific audience and location improve launch precision.",
      "Website and proof assets raise conversion readiness.",
      "Budget clarity improves channel choice and test size.",
    ],
  };

  return {
    title: idea,
    summary: `${type} launch in ${location}. Use focused ICP, fast validation, and local signal capture before scaling spend.`,
    dataSource: source,
    score,
    icp,
    competitors,
    valueProposition: `${idea} helps ${location} customers get a clearer outcome faster by combining AI-assisted research, practical execution, and simple next steps.`,
    pricing,
    distribution,
    launchPlan,
    signals: [
      "Search demand: prioritize keywords with local or urgent intent.",
      "Review gaps: mine competitor reviews for unmet expectations.",
      "Offer gap: make first result measurable within 7 days.",
    ],
    agents: {
      marketDiscovery: {
        meta: {
          agent: "MarketDiscoveryAgent",
          mode: "mock",
          source,
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
      },
      icp: {
        meta: { agent: "ICPAgent", mode: "mock", source, confidence: 0.86 },
        segments: icp,
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
      },
      competitorIntel: {
        meta: {
          agent: "CompetitorIntelAgent",
          mode: "mock",
          source,
          confidence: 0.8,
        },
        competitors,
        whitespace: [
          "Sharper niche promise than broad incumbents.",
          "Faster first response and stronger proof capture.",
          "Offer packaging around specific outcome, not generic features.",
        ],
      },
      pricing: {
        meta: { agent: "PricingAgent", mode: "mock", source, confidence: 0.78 },
        packages: pricing,
        pricingLogic:
          "Anchor on outcome value, keep first package easy to buy, and use premium tier for urgent buyers.",
      },
      distribution: {
        meta: {
          agent: "DistributionAgent",
          mode: "mock",
          source,
          confidence: 0.84,
        },
        channels: distribution,
        firstTests: [
          "One landing page variant by audience segment.",
          "One paid search or local service ad test.",
          "One partner referral script with tracked offer.",
        ],
      },
      launchPlan: {
        meta: { agent: "LaunchPlanAgent", mode: "mock", source, confidence: 0.87 },
        plan: launchPlan,
      },
      score: scoreAgent,
    },
  };
}

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

function pickCompetitors(input: BusinessInput) {
  const text = `${input.industry} ${input.type}`.toLowerCase();
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

function scoreInput(input: BusinessInput) {
  let score = 62;
  if (input.idea.length > 18) score += 8;
  if (input.industry) score += 7;
  if (input.location) score += 6;
  if (input.website) score += 5;
  if (input.budget) score += 4;
  if (input.type) score += 5;
  return Math.min(score, 94);
}
