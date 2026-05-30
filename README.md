# SignalForge GTM — Featherless AI Edition

SignalForge GTM is an AI-powered go-to-market intelligence platform that helps entrepreneurs and small businesses launch smarter. This edition uses **Featherless AI** as the inference provider, running **DeepSeek V3-0324** as the reasoning model across all GTM agents.

It combines live web data from Bright Data with DeepSeek V3 to produce personalized ICPs, competitor analysis, pricing strategy, outreach sequences, campaign plans, and 30-day launch plans.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| AI model | DeepSeek V3-0324 via Featherless AI |
| Web intelligence | Bright Data SERP API, Scraper API, Scraping Browser |
| Styling | Tailwind CSS v4 |
| Deployment | Vercel |

## Features

### GTM Scan (Home)
- Input a business idea, industry, location, website, budget, and business type
- Runs 7 parallel AI agents powered by DeepSeek V3: MarketDiscovery, ICP, CompetitorIntel, Pricing, Distribution, LaunchPlan, GTMScore
- Idea-specific competitor generation across 8 verticals (HVAC, resume tools, coffee, fitness, auto, dental, SaaS, restaurant)
- Readiness score algorithm weighted across idea specificity, budget, location, website presence, and business type
- Scan results persist in localStorage and restore on page refresh
- Export report as Markdown or copy a shareable URL

### Dashboard
- Reads your last GTM scan result automatically — no re-running needed
- Agent pipeline replay animation showing all 7 DeepSeek-powered agents
- ICP summary, value proposition, competitor cards, pricing, distribution channels, and market signals
- 30-day launch plan with progress tracking

### Strategy
- Personalized positioning statement and beachhead market definition
- 4 strategic priorities with tags (ICP, Timing, Messaging, Proof)
- 5-channel strategy with priority tiers (High / Medium / Test) and specific plays
- 3-tier pricing ladder with inclusions and "best for" guidance
- 4-phase 90-day GTM roadmap with actions and milestones
- 6 KPIs with targets and review cadence
- 4 risks with specific mitigations
- Decision rules to prevent common launch mistakes

### Outreach
- 6 outreach metrics (accounts/week, reply rate, meetings booked, etc.)
- 3 ICP-matched target segments with buying signals, data sources, and approach
- 3–4 touch outreach sequence with actual ready-to-send copy
- 4 objection-handling scripts
- Personalization tokens specific to the business type
- Outreach rules to maintain reply rate

### Campaigns
- 5 tailored campaigns per business type (local / SaaS / consumer)
- Each campaign: goal, channel, copy angle, budget split, success metric, next action
- Live / Ready / Draft status tracking
- Campaign principles for disciplined execution

### Lead Explorer
- ICP-matched company discovery with filters (industry, size, location, keywords, funding)
- Full intel cards per lead: buying signal, ICP fit rationale, trigger event, decision maker, outreach angle
- "Full intel" expand/collapse toggle per card
- Domain links open the company website directly
- Filters initialise from your launch profile — changing any filter starts from your business values, not defaults

### Demo Mode
- 5 preset businesses: AI Resume Tool, Mobile Car Wash, Local Coffee Shop, HVAC Company, Fitness App
- Instant GTM report without API calls
- Agent pipeline replay showing Bright Data + DeepSeek V3 steps prominently
- Full report with export and share

### Settings
- API key status panel (Featherless AI + all Bright Data zones)
- Live vs. fallback mode indicator
- Saved data panel: view and clear stored scan or launch profile
- Explanation of Live / Fallback / Demo data modes

## Data Modes

| Mode | When active | What happens |
|---|---|---|
| **Live** | All API keys configured | Bright Data fetches real SERP + competitor pages; DeepSeek V3 synthesizes findings |
| **Fallback** | Keys missing or request fails | Content generated locally from business inputs using market archetypes and heuristics |
| **Demo** | Demo mode tab | Preset business profiles with pre-built reports; no API calls |

## AI Agent Pipeline (DeepSeek V3)

All agents run in parallel via `runGTMOrchestrator`. DeepSeek V3-0324 powers every synthesis step:

1. **MarketDiscoveryAgent** — searches category, local intent, and demand signals
2. **ICPAgent** — builds buyer segments, pains, and triggers
3. **CompetitorIntelAgent** — finds real competitors via SERP (filters directories like Angi, Yelp, G2), enriched by DeepSeek V3
4. **PricingAgent** — benchmarks packages and offer ladder
5. **DistributionAgent** — ranks channels by intent and budget fit
6. **LaunchPlanAgent** — creates 30-day execution plan
7. **GTMScoreAgent** — checks readiness and next best action

## Run Locally

```bash
npm install
cp .env.example .env
# Add your keys to .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```bash
# Required for AI synthesis (DeepSeek V3 via Featherless)
FEATHERLESS_API_KEY=your_key_here

# Optional model override (default: deepseek-ai/DeepSeek-V3-0324)
# FEATHERLESS_MODEL=deepseek-ai/DeepSeek-V3-0324

# Required for live web intelligence
BRIGHT_DATA_API_KEY=your_key_here
BRIGHT_DATA_SERP_ZONE=your_zone
BRIGHT_DATA_SCRAPER_ZONE=your_zone
BRIGHT_DATA_BROWSER_ZONE=your_zone
```

Get your Featherless AI key at [featherless.ai](https://featherless.ai).
Get your Bright Data keys at [brightdata.com](https://brightdata.com).

## API Routes

### `POST /api/gtm`
Internal route used by the GTM scan UI. Accepts `BusinessProfile`, returns `FullGTMReport`.

### `POST /api/generate-gtm`
External-friendly route with Bright Data competitor scraping included.

**Input:**
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

**Returns:** profile, marketDiscovery (with scraped competitor pages), icp, competitors, valueProposition, pricing, distribution, launchPlan, gtmScore, dataSource.

### `GET /api/key-status`
Returns configuration status of all API keys (values hidden, boolean only).

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
