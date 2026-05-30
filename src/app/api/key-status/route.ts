import { NextResponse } from "next/server";

const keys = [
  {
    name: "FEATHERLESS_API_KEY",
    label: "Featherless AI",
    purpose: "Agent reasoning and structured JSON generation (DeepSeek-V3-0324)",
  },
  {
    name: "FEATHERLESS_MODEL",
    label: "Featherless model override",
    purpose: "Optional model override (default: deepseek-ai/DeepSeek-V3-0324)",
  },
  {
    name: "BRIGHT_DATA_API_KEY",
    label: "Bright Data API key",
    purpose: "Web intelligence API access",
  },
  {
    name: "BRIGHT_DATA_SERP_ZONE",
    label: "Bright Data SERP zone",
    purpose: "Competitor discovery and SERP ranking",
  },
  {
    name: "BRIGHT_DATA_SCRAPER_ZONE",
    label: "Bright Data Scraper zone",
    purpose: "Competitor page and pricing scrape",
  },
  {
    name: "BRIGHT_DATA_BROWSER_ZONE",
    label: "Bright Data Browser zone",
    purpose: "Dynamic website checks",
  },
];

export function GET() {
  return NextResponse.json({
    keys: keys.map((key) => ({
      ...key,
      configured: Boolean(process.env[key.name]),
    })),
  });
}
