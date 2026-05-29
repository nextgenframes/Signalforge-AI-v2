# SignalForge GTM

SignalForge GTM is a hackathon demo app that helps small businesses launch smarter by turning live web data into ICPs, competitor insights, pricing strategy, distribution strategy, and 30 day launch plans.

## Hackathon Track

Built for an AI + live web intelligence hackathon track. The product shows how AI agents can combine search results, scraped competitor pages, pricing signals, and LLM reasoning into a practical go-to-market plan for a small business.

## What It Does

- Accepts a business idea, industry, location, website, budget, and business type.
- Discovers competitors and market signals.
- Generates ICP, positioning, pricing, distribution, launch plan, and GTM readiness score.
- Shows whether each report uses live web data, demo data, or mock data.
- Includes a judge-friendly demo mode with five preset businesses.

## Bright Data Usage

SignalForge uses Bright Data as the web intelligence layer:

- Bright Data SERP API: competitor discovery, SERP ranking, market demand signals.
- Bright Data Web Scraper API: competitor page scraping and pricing research.
- Bright Data Scraping Browser: dynamic website checks for client-rendered pages.
- Bright Data MCP Server: planned operator layer for deeper live research workflows.

If Bright Data env vars are missing, the app falls back to demo/mock data so presentations still work.

## AIMLAPI Usage

AIMLAPI powers the AI reasoning layer through an OpenAI-compatible chat completions API. Agents use it to generate structured JSON for:

- ICP
- Positioning and value proposition
- Pricing strategy
- Distribution strategy
- 30 day launch plan
- GTM readiness score

If `AIMLAPI_KEY` is missing or a request fails, local mock responses keep the app usable.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Add keys if available:

```bash
AIMLAPI_KEY=...
AIMLAPI_MODEL=gpt-4o-mini
BRIGHT_DATA_API_KEY=...
BRIGHT_DATA_SERP_ZONE=...
BRIGHT_DATA_SCRAPER_ZONE=...
BRIGHT_DATA_BROWSER_ZONE=...
```

4. Start dev server:

```bash
npm run dev
```

5. Open:

[http://localhost:3000](http://localhost:3000)

## Demo Mode

Open [http://localhost:3000/demo](http://localhost:3000/demo).

Preset businesses:

- AI Resume Tool
- Mobile Car Wash
- Local Coffee Shop
- HVAC Company
- Fitness App

Selecting a preset instantly displays a complete GTM report and a behind-the-scenes panel showing how Bright Data and AIMLAPI would run in live mode.

## API Routes

`POST /api/gtm`

Internal app route. Accepts `BusinessProfile` and returns the full report shape used by the UI.

`POST /api/generate-gtm`

External-friendly route. Input:

```json
{
  "businessIdea": "Mobile car wash",
  "industry": "Auto services",
  "location": "Phoenix, AZ",
  "website": "",
  "budget": "$4,000",
  "businessType": "Local service"
}
```

Returns:

```json
{
  "profile": {},
  "marketDiscovery": {},
  "icp": {},
  "competitors": [],
  "valueProposition": "",
  "pricing": {},
  "distribution": {},
  "launchPlan": {},
  "gtmScore": {},
  "dataSource": "demo data"
}
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```
# Signalforge-AI-v2
