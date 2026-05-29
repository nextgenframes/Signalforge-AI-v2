export type BusinessProfile = {
  idea: string;
  industry: string;
  location: string;
  website?: string;
  budget: string;
  type: string;
  dataMode?: "demo" | "mock";
};

export type AgentMeta = {
  agent: string;
  mode: "mock" | "live";
  source: "live web data" | "demo data" | "mock data";
  confidence: number;
};

export type MarketDiscoveryResult = {
  meta: AgentMeta;
  market: string;
  trendSignals: string[];
  demandSignals: string[];
  risks: string[];
};

export type ICPResult = {
  meta: AgentMeta;
  segments: string[];
  pains: string[];
  buyingTriggers: string[];
};

export type Competitor = {
  name: string;
  position: string;
  gap: string;
};

export type CompetitorIntelResult = {
  meta: AgentMeta;
  competitors: Competitor[];
  whitespace: string[];
};

export type PricingResult = {
  meta: AgentMeta;
  packages: string[];
  pricingLogic: string;
};

export type DistributionResult = {
  meta: AgentMeta;
  channels: string[];
  firstTests: string[];
};

export type LaunchPlanResult = {
  meta: AgentMeta;
  plan: string[];
};

export type GTMScoreResult = {
  meta: AgentMeta;
  score: number;
  drivers: string[];
};

export type FullGTMReport = {
  title: string;
  summary: string;
  dataSource: "live web data" | "demo data" | "mock data";
  score: number;
  icp: string[];
  competitors: Competitor[];
  valueProposition: string;
  pricing: string[];
  distribution: string[];
  launchPlan: string[];
  signals: string[];
  agents: {
    marketDiscovery: MarketDiscoveryResult;
    icp: ICPResult;
    competitorIntel: CompetitorIntelResult;
    pricing: PricingResult;
    distribution: DistributionResult;
    launchPlan: LaunchPlanResult;
    score: GTMScoreResult;
  };
};

export type Agent<T> = (profile: BusinessProfile) => Promise<T>;
