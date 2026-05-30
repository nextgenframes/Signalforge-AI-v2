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
  const competitors = generateCompetitors(input);
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

export function generateCompetitors(input: BusinessInput): Competitor[] {
  const text = `${input.idea} ${input.industry} ${input.type}`.toLowerCase();

  if (/resume|career|job|cv/.test(text)) {
    return [
      { name: "Teal", position: "Career workflow platform", gap: "Win with speed and niche templates." },
      { name: "Resume.io", position: "Template builder", gap: "Win with AI-personalized rewrites." },
      { name: "Kickresume", position: "AI resume and cover letter suite", gap: "Win with guided outcomes and ROI clarity." },
      { name: "Rezi", position: "ATS optimization focus", gap: "Win with job-match specificity." },
    ];
  }

  if (/hvac|heat|cool|furnace|air conditioning/.test(text)) {
    return [
      { name: "ServiceTitan", position: "Enterprise field service", gap: "Win with simplicity and local speed." },
      { name: "Housecall Pro", position: "Mid-market FSM", gap: "Win with same-day booking and trust signals." },
      { name: "Thumbtack", position: "Marketplace model", gap: "Win with direct relationship and guarantee." },
      { name: "Google LSA", position: "Pay-per-lead, no differentiation", gap: "Win with owned brand presence." },
    ];
  }

  if (/coffee|cafe|roast|brew|espresso/.test(text)) {
    return [
      { name: "Toast", position: "Restaurant POS", gap: "Win with cafe-specific simplicity." },
      { name: "Square for Restaurants", position: "Generic POS", gap: "Win with community and subscription features." },
      { name: "Clover", position: "Hardware-first POS", gap: "Win with digital-native experience." },
      { name: "Lightspeed", position: "Enterprise focus", gap: "Win with indie operator pricing and support." },
    ];
  }

  if (/fitness|gym|workout|strength|coach/.test(text)) {
    return [
      { name: "Mindbody", position: "Bloated and expensive", gap: "Win with simplicity and mobile-first UX." },
      { name: "Trainerize", position: "Trainer-focused platform", gap: "Win with adaptive AI programming." },
      { name: "Fitbod", position: "Algorithm-driven app", gap: "Win with human coaching layer." },
      { name: "MyFitnessPal", position: "Tracking-only app", gap: "Win with full coaching and accountability." },
    ];
  }

  if (/car wash|auto|vehicle|detail|mechanic/.test(text)) {
    return [
      { name: "DRB Systems", position: "Legacy enterprise", gap: "Win with modern UX and fast setup." },
      { name: "Washify", position: "Subscription wash platform", gap: "Win with fleet and B2B focus." },
      { name: "Spiffy", position: "On-demand model", gap: "Win with location flexibility." },
      { name: "AutoLeap", position: "Shop management software", gap: "Win with customer-facing booking experience." },
    ];
  }

  if (/dental|clinic|patient|medical|therapy/.test(text)) {
    return [
      { name: "Dentrix", position: "Complex enterprise", gap: "Win with modern UX and patient communication." },
      { name: "Carestream", position: "Imaging-focused platform", gap: "Win with full practice workflow." },
      { name: "Weave", position: "Communication tool", gap: "Win with integrated scheduling and intake." },
      { name: "SimplePractice", position: "Therapy-focused platform", gap: "Win with dental/medical specialization." },
    ];
  }

  if (/saas|software|platform|api|developer/.test(text)) {
    return [
      { name: "Notion", position: "Horizontal tool", gap: "Win with vertical-specific workflows." },
      { name: "Monday.com", position: "Project mgmt framing", gap: "Win with GTM-specific use case." },
      { name: "Airtable", position: "Database framing", gap: "Win with opinionated structure for the use case." },
      { name: "Zapier", position: "Integration layer only", gap: "Win with end-to-end workflow ownership." },
    ];
  }

  if (/restaurant|food|delivery|menu/.test(text)) {
    return [
      { name: "Toast", position: "Dominant but expensive", gap: "Win with zero-commission delivery and indie pricing." },
      { name: "Square", position: "Generic POS", gap: "Win with restaurant-specific marketing features." },
      { name: "Olo", position: "Enterprise delivery platform", gap: "Win with direct ordering and owner economics." },
      { name: "Popmenu", position: "Website-focused platform", gap: "Win with full revenue ops suite." },
    ];
  }

  // Default fallback
  return [
    { name: "HubSpot", position: "CRM behemoth", gap: "Win with speed-to-value and vertical specificity." },
    { name: "Apollo.io", position: "Data platform", gap: "Win with workflow automation and AI synthesis." },
    { name: "Salesforce", position: "Enterprise complexity", gap: "Win with founder-friendly setup and clear ROI." },
    { name: "Clay", position: "Technical users only", gap: "Win with no-code accessibility." },
  ];
}

function scoreInput(input: BusinessInput) {
  let score = 50;

  // Idea quality
  if (input.idea.length > 30) score += 8;
  if (input.idea.length > 60) score += 4;
  if (/\d/.test(input.idea)) score += 4;

  // Industry
  if (input.industry) score += 6;

  // Location
  if (input.location) {
    score += 5;
    if (/,|new york|los angeles|chicago|houston|phoenix|san antonio|san diego|dallas|san jose|austin|jacksonville|fort worth|columbus|charlotte|san francisco|seattle|denver|boston|nashville|portland/.test(input.location.toLowerCase())) {
      score += 3;
    }
  }

  // Website
  if (input.website) score += 5;

  // Budget
  if (input.budget) {
    score += 3;
    const budgetNum = parseInt(input.budget.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(budgetNum)) {
      if (budgetNum > 10000) score += 4;
      if (budgetNum > 25000) score += 3;
    }
  }

  // Business type
  if (input.type) {
    score += 4;
    if (input.type === "SaaS") score += 2;
    if (input.type === "Local service") score += 2;
  }

  return Math.max(50, Math.min(score, 97));
}
