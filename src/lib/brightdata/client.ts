export type DataSource = "live web data" | "demo data" | "mock data";

export type BrightDataResult<T> = {
  source: DataSource;
  data: T;
};

export type SERPResult = {
  title: string;
  url: string;
  snippet: string;
  rank: number;
};

export type PageScrapeResult = {
  url: string;
  title: string;
  text: string;
};

export type PricingResearchResult = {
  url: string;
  prices: string[];
  packagingSignals: string[];
};

export type CompetitorDiscoveryResult = {
  name: string;
  url: string;
  rank: number;
  snippet: string;
};

export type MarketSignalResult = {
  signal: string;
  intent: "high" | "medium" | "low";
  source: string;
};

const BRIGHT_DATA_ENDPOINT = "https://api.brightdata.com/request";

function profileSource(dataMode?: string): DataSource {
  return dataMode === "demo" ? "demo data" : "mock data";
}

async function requestBrightData<T>(
  zone: string | undefined,
  url: string,
  fallback: T,
  dataMode?: string,
): Promise<BrightDataResult<T>> {
  const apiKey = process.env.BRIGHT_DATA_API_KEY;

  if (!apiKey || !zone) {
    return { source: profileSource(dataMode), data: fallback };
  }

  try {
    const response = await fetch(BRIGHT_DATA_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zone,
        url,
        format: "raw",
      }),
    });

    if (!response.ok) {
      return { source: profileSource(dataMode), data: fallback };
    }

    const text = await response.text();
    return { source: "live web data", data: parseBrightData<T>(text, fallback) };
  } catch {
    return { source: profileSource(dataMode), data: fallback };
  }
}

function parseBrightData<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    if (typeof fallback === "string") return text as T;
    return fallback;
  }
}

export async function searchSERP(
  query: string,
  location: string,
  dataMode?: string,
): Promise<BrightDataResult<SERPResult[]>> {
  const fallback = mockSERP(query, location);
  const params = new URLSearchParams({
    q: `${query} ${location}`.trim(),
    brd_json: "1",
  });
  const result = await requestBrightData<unknown>(
    process.env.BRIGHT_DATA_SERP_ZONE,
    `https://www.google.com/search?${params.toString()}`,
    fallback,
    dataMode,
  );

  if (result.source !== "live web data") {
    return result as BrightDataResult<SERPResult[]>;
  }

  return {
    source: result.source,
    data: normalizeSERP(result.data, fallback),
  };
}

export async function scrapePage(
  url: string,
  dataMode?: string,
): Promise<BrightDataResult<PageScrapeResult>> {
  const fallback = {
    url,
    title: "Demo scraped page",
    text: "Mock scraped content: pricing, service area, customer proof, and offer language.",
  };
  const zone = process.env.BRIGHT_DATA_SCRAPER_ZONE || process.env.BRIGHT_DATA_BROWSER_ZONE;
  const result = await requestBrightData<string>(zone, url, fallback.text, dataMode);

  if (result.source !== "live web data") {
    return { source: result.source, data: fallback };
  }

  return {
    source: result.source,
    data: {
      url,
      title: extractTitle(result.data),
      text: stripHTML(result.data).slice(0, 4000),
    },
  };
}

export async function scrapeCompetitorPricing(
  url: string,
  dataMode?: string,
): Promise<BrightDataResult<PricingResearchResult>> {
  const page = await scrapePage(url, dataMode);
  const prices = page.data.text.match(/\$\s?\d[\d,.]*(?:\s?\/\s?\w+)?/g) ?? [
    "$49 starter",
    "$149 core",
    "$399 premium",
  ];

  return {
    source: page.source,
    data: {
      url,
      prices: prices.slice(0, 6),
      packagingSignals: [
        "Entry offer reduces buying friction.",
        "Middle tier anchors expected value.",
        "Premium tier captures urgent or done-for-you buyers.",
      ],
    },
  };
}

export async function discoverCompetitors(
  businessIdea: string,
  location: string,
  dataMode?: string,
): Promise<BrightDataResult<CompetitorDiscoveryResult[]>> {
  const serp = await searchSERP(`${businessIdea} competitors`, location, dataMode);
  return {
    source: serp.source,
    data: serp.data.slice(0, 5).map((item) => ({
      name: item.title,
      url: item.url,
      rank: item.rank,
      snippet: item.snippet,
    })),
  };
}

export async function getMarketSignals(
  query: string,
  dataMode?: string,
): Promise<BrightDataResult<MarketSignalResult[]>> {
  const serp = await searchSERP(`${query} buying intent trends reviews pricing`, "", dataMode);
  return {
    source: serp.source,
    data: serp.data.slice(0, 5).map((item, index) => ({
      signal: item.snippet || `${query} demand signal ${index + 1}`,
      intent: index < 2 ? "high" : index < 4 ? "medium" : "low",
      source: item.url,
    })),
  };
}

function normalizeSERP(data: unknown, fallback: SERPResult[]) {
  type BrightSERPItem = {
    title?: string;
    link?: string;
    url?: string;
    description?: string;
    snippet?: string;
  };
  const root = data as {
    organic?: BrightSERPItem[];
    organic_results?: BrightSERPItem[];
  };
  const organic = root.organic || root.organic_results || [];

  if (!Array.isArray(organic) || organic.length === 0) return fallback;

  return organic.slice(0, 10).map((item, index) => ({
    title: item.title || `Result ${index + 1}`,
    url: item.link || item.url || "",
    snippet: item.description || item.snippet || "",
    rank: index + 1,
  }));
}

function mockSERP(query: string, location: string): SERPResult[] {
  return [
    {
      title: "Top-ranked local incumbent",
      url: "https://example.com/incumbent",
      snippet: `Strong search presence for ${query} in ${location || "target market"}.`,
      rank: 1,
    },
    {
      title: "Budget operator",
      url: "https://example.com/budget",
      snippet: "Low-price offer with weak differentiation and limited proof.",
      rank: 2,
    },
    {
      title: "Premium specialist",
      url: "https://example.com/premium",
      snippet: "Higher trust positioning, but slower response and broader messaging.",
      rank: 3,
    },
  ];
}

function extractTitle(html: string) {
  return html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]?.trim() || "Scraped page";
}

function stripHTML(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ");
}
