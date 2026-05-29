import { NextResponse } from "next/server";

const keys = [
  {
    name: "AIMLAPI_KEY",
    label: "AIMLAPI",
    purpose: "Agent reasoning and structured JSON generation",
  },
  {
    name: "AIMLAPI_MODEL",
    label: "AIMLAPI model",
    purpose: "Default model override",
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
