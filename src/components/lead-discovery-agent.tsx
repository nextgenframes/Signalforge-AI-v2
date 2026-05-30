"use client";

import { useEffect, useMemo, useState } from "react";
import { useLaunchProfile } from "@/components/launch-state";

type Lead = {
  company: string;
  domain: string;
  segment: string;
  score: number;
  signal: string;
  fit: string;
  trigger: string;
  decisionMaker: string;
  angle: string;
  size: string;
  funding: string;
  tags: string[];
};

const seedLeads: Lead[] = [
  {
    company: "Northstar BioSystems",
    domain: "northstarbio.io",
    segment: "Healthcare AI",
    score: 94,
    signal: "Hired a new CRO in the last 45 days, actively migrating from Salesforce to HubSpot, and posted 4 open commercial analytics roles this month.",
    fit: "Series C healthcare AI company entering a commercial growth phase — high budget, clear revenue ops pain, and a new executive actively evaluating GTM tools.",
    trigger: "New CRO (Sarah Chen, ex-Veeva) started 6 weeks ago. New leaders evaluate and replace tooling in their first 90 days at a 3× higher rate.",
    decisionMaker: "Chief Revenue Officer or VP of Revenue Operations. Secondary: Head of Commercial Analytics.",
    angle: "Congrats on the new CRO hire — most commercial teams at your stage spend the first 90 days rebuilding their analytics stack. We help healthcare companies do that without a 6-month implementation. Worth 20 minutes?",
    size: "51-200",
    funding: "Series C",
    tags: ["New CRO", "HubSpot migration", "Hiring surge", "High intent"],
  },
  {
    company: "AtlasGrid Energy",
    domain: "atlasgrid.energy",
    segment: "Climate SaaS",
    score: 88,
    signal: "Closed a $22M Series B in Q1, launched 3 new regional landing pages targeting enterprise fleet buyers, and added a VP of Sales and 2 SDR roles in the last 30 days.",
    fit: "Post-Series B climate SaaS with a newly funded sales team and zero existing GTM infrastructure — a textbook early customer with both budget and urgency.",
    trigger: "Series B closed 90 days ago. Companies typically spend the first 60–90 days post-raise building out the GTM stack. This is the exact buying window.",
    decisionMaker: "VP of Sales (recently hired) or the CEO if VP is still ramping. Budget likely controlled by the CEO for the first 2 quarters post-raise.",
    angle: "Saw the Series B announcement — congrats. Most climate SaaS teams at your stage are trying to build a repeatable outbound motion from scratch. We've helped 3 similar companies cut ramp time by 40%. Would a quick overview be useful?",
    size: "51-200",
    funding: "Series B",
    tags: ["Post-Series B", "Hiring sales team", "New regional pages", "GTM buildout"],
  },
  {
    company: "Quantora Finance",
    domain: "quantora.capital",
    segment: "Fintech",
    score: 82,
    signal: "Updated pricing page 3 times in the last 60 days (visible via Wayback Machine), competitor comparison keywords ranking and rising, and a job post for a Product Marketing Manager went live this week.",
    fit: "Seed-stage fintech actively repositioning — pricing experimentation and PMM hiring signal a company trying to find its GTM motion. These teams are acutely open to outside perspective.",
    trigger: "Repeated pricing page changes indicate they haven't found a model that converts. This is a direct opening to a pricing and positioning conversation.",
    decisionMaker: "CEO or Co-founder (at 11–50 stage, they own GTM). The incoming PMM hire will be an influencer once onboarded.",
    angle: "Noticed Quantora's pricing page has been evolving — we track these signals as a strong indicator a team is actively working on positioning. We've helped fintech founders run pricing experiments that lift conversion by 20–35% in 30 days. Interested in a quick look?",
    size: "11-50",
    funding: "Seed",
    tags: ["Pricing experiments", "PMM hiring", "Repositioning", "SEO signals rising"],
  },
  {
    company: "Keystone Logistics",
    domain: "keystonelogistics.com",
    segment: "Supply chain",
    score: 91,
    signal: "Opened 3 new regional service pages in Texas, Ohio, and Georgia, added 2 enterprise sales director roles, and a press release about a new Fortune 500 partnership went live last week.",
    fit: "Mid-market logistics company in active geographic expansion with a new enterprise segment and enterprise sales headcount to match — high urgency, real budget, clear pain.",
    trigger: "Geographic expansion + enterprise partnership = new sales motion they haven't run before. This exact combination creates a 6–9 month window of high tool-buying activity.",
    decisionMaker: "VP of Enterprise Sales or Chief Commercial Officer. The new sales directors are secondary influencers who will advocate for tools that make them look good quickly.",
    angle: "Saw the Keystone announcement about the Fortune 500 partnership and the new regional pages — that's a big move. Most logistics companies at that inflection point struggle to operationalize enterprise selling at speed. We help teams like yours close that gap. 15 minutes this week?",
    size: "201-500",
    funding: "Growth",
    tags: ["Geographic expansion", "Enterprise sales push", "New partnership", "High urgency"],
  },
  {
    company: "BrightPath Dental Group",
    domain: "brightpathdental.com",
    segment: "Local services",
    score: 87,
    signal: "Added patient financing copy to all service pages, launched a new location page for a 3rd clinic, and review velocity jumped from 2 to 11 reviews/month in the last 60 days.",
    fit: "Multi-location dental group in active growth mode — new locations, financing offers, and proactive reputation management all signal an owner-operator investing in patient acquisition.",
    trigger: "Third location opening creates a new patient acquisition challenge they haven't solved before. Multi-location operators almost always need new marketing infrastructure at this stage.",
    decisionMaker: "Practice Owner or Office Manager. At this size, the owner makes buying decisions for anything marketing-related.",
    angle: "Noticed BrightPath just opened a third location — congrats! Most dental groups at that stage find that what worked for location #1 doesn't scale to location #3 without a system. We help multi-location practices build a patient acquisition engine that runs across all locations. Worth a 15-minute call?",
    size: "11-50",
    funding: "Bootstrapped",
    tags: ["New location", "Review velocity up", "Patient financing", "Multi-location growth"],
  },
  {
    company: "Summit Home Pros",
    domain: "summithomepros.com",
    segment: "Home services",
    score: 93,
    signal: "Running Google Ads for emergency HVAC and roofing with high spend, publishing 2 new service area pages per week, and responded to every Google review in the last 30 days (12 total).",
    fit: "Active home services operator with a real marketing budget, consistent content output, and engaged owner — a buyer who already believes in paid marketing and is ready to scale.",
    trigger: "High review response rate + active ad spend = an owner who is serious about growth and paying attention to their online presence. This is a decision-maker, not a skeptic.",
    decisionMaker: "Business Owner directly. At this size, the owner handles all vendor decisions and responds quickly to peer-level outreach.",
    angle: "Saw Summit Home Pros' recent Google review responses and the new service area pages — that's more intentional than 90% of competitors in your space. We help home service companies turn that signal into booked jobs at lower cost per lead. Want to see how?",
    size: "11-50",
    funding: "Bootstrapped",
    tags: ["Active ad spend", "High review engagement", "Content velocity", "Decision-maker accessible"],
  },
  {
    company: "CivicRoast Coffee",
    domain: "civicroast.co",
    segment: "Food and beverage",
    score: 84,
    signal: "Launched a coffee subscription page, added a community events calendar, and a Yelp review mentioned they're 'expanding to a second location soon' — confirmed by a job post for a location manager.",
    fit: "Community-focused coffee brand scaling from 1 to 2 locations with subscription revenue and events — a founder building a brand, not just a cafe. Higher LTV and more marketing-aware than typical F&B.",
    trigger: "Second location hiring + subscription launch in the same quarter = a founder in growth mode. The subscription model signals they're thinking about recurring revenue, which opens the door to a broader GTM conversation.",
    decisionMaker: "Founder/Owner directly. Coffee shop owners at this stage are accessible and responsive to local operators who understand their business.",
    angle: "Love what CivicRoast is building — the subscription + events combination is exactly how the best independent coffee brands build a moat against chains. We help food and beverage founders scale that model to a second location without losing the community feel. Quick call?",
    size: "1-10",
    funding: "Bootstrapped",
    tags: ["Second location", "Subscription launch", "Community events", "Founder-led brand"],
  },
  {
    company: "FitLoop Labs",
    domain: "fitloop.app",
    segment: "Health and fitness",
    score: 86,
    signal: "Added 4 creator partnership pages in the last 30 days, running A/B tests on onboarding (visible in Hotjar public heatmaps), and a job post for a Growth Lead mentions 'improving D7 retention'.",
    fit: "Consumer fitness app in an active growth phase, focused on retention optimization and creator distribution — a team that knows what their problem is and is actively trying to solve it.",
    trigger: "Hiring a Growth Lead specifically mentioning D7 retention means they have a retention problem and are about to bring in someone who will want tools to fix it. Reach out before the hire, not after.",
    decisionMaker: "CEO or Head of Product for immediate decisions. The incoming Growth Lead will be the day-to-day champion once hired — worth reaching both.",
    angle: "Saw FitLoop is hiring a Growth Lead with a focus on D7 retention — that's a specific and solvable problem. We've helped 3 fitness apps improve D7 by 25–40% using a combination of onboarding triggers and cohort analysis. Want to share what worked before your new hire starts?",
    size: "11-50",
    funding: "Seed",
    tags: ["Retention focus", "Creator partnerships", "A/B testing active", "Growth hire incoming"],
  },
  {
    company: "ApplyPilot AI",
    domain: "applypilot.ai",
    segment: "Career software",
    score: 90,
    signal: "Updated pricing from flat-fee to tiered subscription, comparison keywords for 'Teal alternative' and 'Kickresume vs' ranking in positions 3–8, and a Product Hunt launch scheduled for next month (leaked in a founder tweet).",
    fit: "AI career tool actively repositioning toward subscription revenue and preparing for a public launch — high intent to buy GTM tools in the next 30 days while preparing for the Product Hunt moment.",
    trigger: "Imminent Product Hunt launch creates a 30-day window of maximum buying intent for anything that helps them convert launch traffic into paying customers. This is a time-sensitive opportunity.",
    decisionMaker: "Founder/CEO. At Seed stage, the founder owns all GTM decisions and is acutely aware of the cost of a failed launch.",
    angle: "Saw the upcoming Product Hunt launch in the works — exciting. The conversion window from launch day traffic is narrow (48–72 hours) and most teams aren't set up to capture it. We've helped 5 AI tools turn PH launches into 3-month growth curves. Worth talking before you launch?",
    size: "11-50",
    funding: "Seed",
    tags: ["Pricing change", "PH launch incoming", "SEO rising", "Time-sensitive"],
  },
  {
    company: "Harbor HVAC",
    domain: "harborhvac.com",
    segment: "Home services",
    score: 89,
    signal: "Added a same-day booking page with emergency SERP targeting, running Google Local Service Ads for the first time, and 3 recent Yelp reviews mention 'faster than any competitor' as the main reason for choosing them.",
    fit: "Local HVAC operator who has found a differentiation angle (speed) and is actively investing in digital — a business owner ready to scale what's working.",
    trigger: "Recent reviews consistently mentioning 'speed' as a differentiator is a positioning signal. They know what their customers value — they just need a system to amplify it.",
    decisionMaker: "Business Owner. HVAC owners at this size make all vendor decisions themselves, often based on a single compelling recommendation from a peer.",
    angle: "Noticed Harbor's recent reviews keep mentioning same-day speed as the reason customers chose you — that's a strong positioning signal most HVAC companies ignore. We help home service companies turn that single differentiator into a full acquisition system. 15 minutes?",
    size: "51-200",
    funding: "Growth",
    tags: ["Clear differentiator", "New ad channel", "Positive review signal", "Scaling phase"],
  },
  {
    company: "MetroFleet Wash",
    domain: "metrofleetwash.com",
    segment: "Auto services",
    score: 85,
    signal: "Launched a dedicated B2B fleet service page, updated apartment complex partnership copy, and is bidding on 'commercial fleet wash [city]' keywords for the first time this quarter.",
    fit: "Auto service business pivoting from consumer to B2B fleet — a transition that always creates new sales motion challenges and demand for B2B-specific marketing tools.",
    trigger: "The pivot to B2B fleet is recent (page launched 6 weeks ago). Early-stage B2B pivots create an 8–12 week window where the owner is actively evaluating every piece of their new sales motion.",
    decisionMaker: "Owner/Operator. The B2B pivot decision was made at the top, so the decision maker is the same person running the fleet sales outreach.",
    angle: "Saw MetroFleet's new B2B fleet page — that's a smart pivot. The challenge most auto service companies hit is that fleet buyers need a completely different approach than consumer buyers. We help local service businesses build a B2B pipeline without a dedicated sales team. Interested?",
    size: "11-50",
    funding: "Bootstrapped",
    tags: ["B2B pivot", "New service line", "Fleet market entry", "First paid search"],
  },
  {
    company: "NimbleOps Studio",
    domain: "nimbleops.studio",
    segment: "B2B services",
    score: 81,
    signal: "Posted a contract role for a Revenue Operations specialist, testing a competitor alternative landing page targeting 'Zapier alternatives for agencies', and their founder published a LinkedIn post last week about 'broken agency ops.'",
    fit: "Small agency with a clear ops bottleneck, actively looking for solutions, and a founder publicly articulating the problem — the highest-conversion archetype in outbound.",
    trigger: "The founder's LinkedIn post about 'broken agency ops' is a public buying signal. When a founder writes about a pain publicly, they are almost always actively evaluating solutions.",
    decisionMaker: "Founder directly — and they're already talking about the problem publicly, which means they're receptive to relevant outreach.",
    angle: "Read your LinkedIn post about broken agency ops — you described our exact customer. We built [product] specifically for agencies hitting that wall at the 1–10 person stage. Would it be worth 20 minutes to show you what we put in place for 3 similar studios?",
    size: "1-10",
    funding: "Bootstrapped",
    tags: ["Public pain signal", "RevOps hiring", "Competitor research", "Founder accessible"],
  },
];

// ─── dynamic lead generation ──────────────────────────────────────────────────

type IndustryTemplate = {
  prefixes: string[];
  suffixes: string[];
  tlds: string[];
  sizes: string[];
  fundings: string[];
  roles: string[];
  signalTemplates: string[];
  fitTemplates: string[];
  triggerTemplates: string[];
  angleTemplates: string[];
  tagSets: string[][];
};

const industryTemplates: Record<string, IndustryTemplate> = {
  saas: {
    prefixes: ["Claraview", "Draftline", "Stacksync", "Pulseio", "Loopfire", "Vantabase", "Corepath", "Meshwork"],
    suffixes: ["", " AI", " Labs", " HQ", ""],
    tlds: [".io", ".ai", ".co", ".app"],
    sizes: ["11-50", "51-200", "11-50", "51-200"],
    fundings: ["Seed", "Series A", "Series A", "Series B"],
    roles: ["VP of Growth", "Head of Revenue", "CEO", "VP of Sales"],
    signalTemplates: [
      "Hired a new VP of Sales last month, posted 5 SDR roles this week, and updated their pricing page from flat-fee to seat-based.",
      "Closed a Series A 60 days ago, rebranded their product website, and a job post for a Revenue Operations Lead went live yesterday.",
      "Competitor comparison page targeting 3 alternatives now live, G2 review activity spiking, and a Product Hunt launch date announced on their blog.",
      "Three new integrations added to their website, hiring a customer success lead for the first time, and a case study featuring a Fortune 500 customer just published.",
    ],
    fitTemplates: [
      "Post-funding SaaS team with new commercial leadership and zero existing GTM infrastructure — the highest-value buyer window in the market.",
      "SaaS company actively repositioning and evaluating their entire tool stack. New leadership creates a 90-day window of maximum buying intent.",
      "Series A SaaS with an active outbound motion but no clear measurement framework — exactly the stage where buyers seek GTM tooling.",
    ],
    triggerTemplates: [
      "New VP of Sales in seat for 45 days. Executives evaluate and replace tooling in the first 90 days at a 3× higher rate than any other period.",
      "Post-Series A companies typically allocate 15–20% of the raise to GTM infrastructure in the first 60 days. This is the buying window.",
      "Competitor research page launch is a direct signal they are in active evaluation mode — for themselves and for the tools they use.",
    ],
    angleTemplates: [
      "Congrats on the new VP hire — most SaaS teams at your stage spend the first quarter rebuilding the revenue stack from scratch. We help you skip the rebuild. 20 minutes this week?",
      "Saw the Series A announcement — well deserved. Most teams at this stage tell us the hardest part isn't funding the motion, it's measuring what's working. We solve exactly that. Worth a look?",
      "Noticed the new competitor comparison page — that's a strong GTM signal. We help SaaS teams like yours convert that comparison intent into pipeline. 15 minutes?",
    ],
    tagSets: [
      ["New VP Sales", "SDR hiring", "Pricing change", "High intent"],
      ["Post-Series A", "Rebranding", "RevOps hiring", "GTM buildout"],
      ["Competitor research", "G2 active", "PH launch", "Evaluation window"],
    ],
  },
  local: {
    prefixes: ["Pinnacle", "Cornerstone", "Evergreen", "Precision", "Summit", "Landmark", "BlueSky", "Clearview"],
    suffixes: [" Services", " Group", " Pros", " Co", " Solutions"],
    tlds: [".com", ".com", ".co"],
    sizes: ["1-10", "11-50", "11-50"],
    fundings: ["Bootstrapped", "Bootstrapped", "Growth"],
    roles: ["Owner", "Operations Manager", "General Manager"],
    signalTemplates: [
      "Published 4 new neighborhood service pages this month, running Google Local Service Ads for the first time, and 6 new 5-star Google reviews mention 'fast response' in the last 30 days.",
      "Opened a second location last quarter, added a booking widget to the website, and recent reviews on Yelp show a jump in response velocity.",
      "Updated service pricing on their website (3 revisions visible), added a 'financing available' badge to the homepage, and a new truck/vehicle visible in recent Instagram posts.",
      "Google Maps listing recently verified and fully updated, adding new service area pages weekly, and reply time on reviews dropped from 5 days to same-day.",
    ],
    fitTemplates: [
      "Active local operator with a real marketing budget, consistent digital investment, and an owner who responds to customers — a buyer who already understands the value of reputation.",
      "Multi-location local business in growth mode — the exact stage where operators need a system, not just more effort.",
      "Local business owner investing in digital for the first time — they've proven the business model and are ready to scale acquisition.",
    ],
    triggerTemplates: [
      "New service area pages being added weekly signals an owner actively trying to capture local search demand. This is the right moment for an SEO and paid local conversation.",
      "Second location opening creates a new patient/customer acquisition challenge they haven't solved before. Multi-location operators almost always need new infrastructure at this stage.",
      "Review response velocity jump shows an engaged owner. Owners who respond to reviews at this rate are 4× more likely to invest in their online presence.",
    ],
    angleTemplates: [
      "Noticed the new service area pages and the recent Google reviews — that's more intentional than 90% of competitors in your market. We help local businesses turn those signals into booked jobs at a lower cost per lead. 15 minutes?",
      "Congrats on the second location — that's a real milestone. The challenge most operators hit is that what worked for location #1 doesn't scale without a system. We help you build that system. Quick call?",
      "Saw the recent Google review responses — the speed and personalization stands out. We help owners like you turn that reputation into a lead generation engine. Worth a look?",
    ],
    tagSets: [
      ["Service area expansion", "First paid search", "High review velocity", "Ready to scale"],
      ["Second location", "New booking system", "Review surge", "Multi-location growth"],
      ["Pricing update", "Financing offer", "Fleet expansion", "Growth signal"],
    ],
  },
  consumer: {
    prefixes: ["Daybreak", "Groundswell", "Kinetic", "Mosaic", "Drift", "Bloom", "Radiant", "Tempo"],
    suffixes: [" App", " Labs", "", " Co", ""],
    tlds: [".app", ".co", ".io", ".com"],
    sizes: ["1-10", "11-50", "11-50"],
    fundings: ["Bootstrapped", "Seed", "Seed"],
    roles: ["Founder", "CEO", "Head of Growth"],
    signalTemplates: [
      "Added a creator affiliate program page, running TikTok ads for the first time, and App Store reviews spiked to 47 this month from 12 last month.",
      "Launched a referral program, updated the onboarding flow (visible via App Store screenshots), and the founder published a LinkedIn post about hitting 1,000 paying subscribers.",
      "New pricing tier added with an annual option, running a limited-time launch offer, and 3 creator partnership announcements this week on their social channels.",
      "Featured by a mid-size creator in the last 30 days, onboarding has been redesigned per App Store changelog, and a job post for a Community Manager just went live.",
    ],
    fitTemplates: [
      "Consumer app with early creator traction and a growing paid user base — a founder who has proven product-market fit and is now focused on scaling distribution.",
      "Subscription consumer app at the inflection point between founder-led growth and scalable acquisition — the stage where smart GTM investment compounds fastest.",
      "Consumer brand with community momentum — the creator strategy is working but the founder needs a system to measure and scale it without burning out.",
    ],
    triggerTemplates: [
      "Creator affiliate program launch signals they are moving from organic to structured distribution. This creates demand for tracking, conversion, and attribution tools.",
      "Referral program launch at the same time as an onboarding redesign means the team is actively working on activation and virality — both are high-value GTM conversations.",
      "Annual pricing option added signals the team is focused on reducing churn. This is a direct opening to a retention and LTV conversation.",
    ],
    angleTemplates: [
      "Saw the new creator affiliate program launch — smart move. The teams that win in consumer apps are the ones who build the measurement layer before scaling the creator spend. We help with exactly that. 20 minutes?",
      "Congrats on 1,000 subscribers — that's a real milestone. Most founders at that stage tell us the hardest part is knowing which channel to double down on. We help you find that signal. Worth a call?",
      "Noticed the annual pricing option just added — that's a sign you're thinking about LTV seriously. We help consumer apps improve retention at the onboarding level, where it matters most. Interested?",
    ],
    tagSets: [
      ["Creator affiliate", "First paid social", "Review velocity", "Distribution scaling"],
      ["Referral launch", "Onboarding redesign", "Founder milestone", "Activation focus"],
      ["Annual pricing", "Launch offer", "Creator partnerships", "LTV focus"],
    ],
  },
};

function getTemplate(profile: { industry: string; businessType: string }): IndustryTemplate {
  const text = `${profile.businessType} ${profile.industry}`.toLowerCase();
  if (/saas|software|app|platform|tool|api|tech|ai/.test(text)) return industryTemplates.saas;
  if (/local|brick|hvac|plumb|clean|repair|dental|clinic|salon|gym|restaurant|coffee|auto|home service/.test(text)) return industryTemplates.local;
  return industryTemplates.consumer;
}

function buildRelatedLeads(
  filters: { industry: string; size: string; location: string; keywords: string; funding: string },
  profile: { industry: string; businessType: string } | null,
  idea?: string,
): Lead[] {
  const tmpl = getTemplate(profile ?? { industry: filters.industry, businessType: "" });
  const loc = filters.location.split(",")[0].trim() || "your market";
  const ideaText = idea || `${filters.industry} solution`;

  return tmpl.prefixes.slice(0, 8).map((prefix, index) => {
    const suffix = tmpl.suffixes[index % tmpl.suffixes.length];
    const tld = tmpl.tlds[index % tmpl.tlds.length];
    const company = `${prefix}${suffix}`;
    const domain = `${prefix.toLowerCase().replace(/\s/g, "")}${tld}`;
    const sigIdx = index % tmpl.signalTemplates.length;
    const fitIdx = index % tmpl.fitTemplates.length;
    const trigIdx = index % tmpl.triggerTemplates.length;
    const angleIdx = index % tmpl.angleTemplates.length;
    const tagIdx = index % tmpl.tagSets.length;

    return {
      company,
      domain,
      segment: filters.industry,
      score: 92 - index,
      signal: `${loc}: ${tmpl.signalTemplates[sigIdx]}`,
      fit: `${tmpl.fitTemplates[fitIdx]} Evaluating solutions for "${ideaText}".`,
      trigger: tmpl.triggerTemplates[trigIdx],
      decisionMaker: tmpl.roles[index % tmpl.roles.length],
      angle: tmpl.angleTemplates[angleIdx],
      size: tmpl.sizes[index % tmpl.sizes.length],
      funding: tmpl.fundings[index % tmpl.fundings.length],
      tags: tmpl.tagSets[tagIdx],
    };
  });
}

// ─── scoring ──────────────────────────────────────────────────────────────────

function scoreLeads(
  leads: Lead[],
  filters: { industry: string; size: string; location: string; keywords: string; funding: string },
) {
  const keywordText = filters.keywords.toLowerCase();
  return leads
    .map((lead) => {
      let score = lead.score;
      if (lead.segment.toLowerCase().includes(filters.industry.toLowerCase())) score += 4;
      if (lead.size === filters.size) score += 3;
      if (lead.funding === filters.funding) score += 3;
      if (keywordText.split(",").some((kw) => lead.signal.toLowerCase().includes(kw.trim()))) score += 3;
      return { ...lead, score: Math.min(score, 99) };
    })
    .sort((a, b) => b.score - a.score);
}

function filterLeads(leads: Lead[], search: string) {
  const query = search.trim().toLowerCase();
  if (!query) return leads;
  return leads.filter((lead) =>
    [lead.company, lead.domain, lead.segment, lead.signal, lead.fit, lead.tags.join(" "), lead.size, lead.funding]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
}

function buildKeywords(idea: string, industry: string) {
  const words = `${idea} ${industry}`
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9]/gi, "").toLowerCase())
    .filter((w) => w.length > 3)
    .slice(0, 5);
  return [...words, "pricing", "reviews", "growth"].join(", ");
}

function guessSize(type: string) {
  const t = type.toLowerCase();
  if (t.includes("saas") || t.includes("software") || t.includes("app")) return "11-50";
  if (t.includes("local") || t.includes("brick")) return "1-10";
  return "11-50";
}

function guessFunding(type: string) {
  const t = type.toLowerCase();
  if (t.includes("saas") || t.includes("app")) return "Seed";
  if (t.includes("local") || t.includes("brick")) return "Bootstrapped";
  return "Growth";
}

// ─── component ────────────────────────────────────────────────────────────────

function scoreColor(score: number) {
  if (score >= 90) return "text-lime-200";
  if (score >= 80) return "text-cyan-200";
  return "text-slate-400";
}

function scoreBg(score: number) {
  if (score >= 90) return "border-lime-400/30 bg-lime-400/10";
  if (score >= 80) return "border-cyan-400/30 bg-cyan-400/10";
  return "border-slate-700 bg-slate-900";
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function profileToFilters(profile: { idea: string; industry: string; location: string; budget: string; businessType: string }) {
  return {
    industry: profile.industry,
    size: guessSize(profile.businessType),
    location: profile.location,
    keywords: buildKeywords(profile.idea, profile.industry),
    funding: guessFunding(profile.businessType),
  };
}

const defaultFilters = {
  industry: "Healthcare AI",
  size: "51-200",
  location: "United States",
  keywords: "commercial analytics, CRM migration, growth",
  funding: "Series B",
};

export function LeadDiscoveryAgent() {
  const launchedProfile = useLaunchProfile();
  const [filters, setFilters] = useState(defaultFilters);
  const [submitted, setSubmitted] = useState(false);
  const [customized, setCustomized] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  // When a profile loads or changes, sync the editable filters to match it
  // so that manual edits start from the profile values, not the hardcoded defaults.
  useEffect(() => {
    if (launchedProfile) {
      setFilters(profileToFilters(launchedProfile));
      setCustomized(false);
      setSubmitted(true);
      setSearch("");
      setExpanded(null);
    }
  }, [launchedProfile]);

  const activeFilters = useMemo(
    () => (launchedProfile && !customized ? profileToFilters(launchedProfile) : filters),
    [customized, filters, launchedProfile],
  );

  const leads = useMemo(() => {
    const dynamic = buildRelatedLeads(activeFilters, launchedProfile, launchedProfile?.idea);
    const all = scoreLeads([...dynamic, ...seedLeads], activeFilters);
    return filterLeads(all, search);
  }, [activeFilters, launchedProfile, search]);

  function update(key: keyof typeof filters, value: string) {
    setCustomized(true);
    setFilters((c) => ({ ...c, [key]: value }));
  }

  return (
    <div className="space-y-6">
      {/* Filter panel */}
      <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
        <div className="mb-5">
          <p className="text-sm font-bold text-cyan-300">AI Lead Discovery Agent</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-100">Generate ICP-matched companies</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Each lead includes a buying signal, ICP fit rationale, recent trigger event, decision maker, and a suggested outreach opening.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_0.7fr_0.8fr]">
          <Field label="Industry">
            <input className="field" value={activeFilters.industry} onChange={(e) => update("industry", e.target.value)} />
          </Field>
          <Field label="Company size">
            <select className="field" value={activeFilters.size} onChange={(e) => update("size", e.target.value)}>
              <option>1-10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201-500</option>
              <option>500+</option>
            </select>
          </Field>
          <Field label="Location">
            <input className="field" value={activeFilters.location} onChange={(e) => update("location", e.target.value)} />
          </Field>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.7fr_180px]">
          <Field label="Keywords">
            <input className="field" value={activeFilters.keywords} onChange={(e) => update("keywords", e.target.value)} />
          </Field>
          <Field label="Funding stage">
            <select className="field" value={activeFilters.funding} onChange={(e) => update("funding", e.target.value)}>
              <option>Bootstrapped</option>
              <option>Seed</option>
              <option>Series A</option>
              <option>Series B</option>
              <option>Series C</option>
              <option>Growth</option>
            </select>
          </Field>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="self-end rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            Generate leads
          </button>
        </div>
      </section>

      {/* Results */}
      <section className="rounded-lg border border-slate-800 bg-slate-950/90 shadow-sm">
        <div className="grid gap-4 border-b border-slate-800 px-5 py-4 lg:grid-cols-[1fr_320px_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold text-cyan-300">ICP matched companies</p>
            <p className="mt-1 text-sm text-slate-500">
              {submitted
                ? `${leads.length} results for ${activeFilters.industry} in ${activeFilters.location}`
                : "Preview from default ICP"}
            </p>
          </div>
          <Field label="Search leads">
            <input
              className="field"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Company, signal, trigger, angle..."
            />
          </Field>
          <span className="rounded-lg border border-lime-400/30 bg-lime-400/15 px-3 py-1.5 text-xs font-bold text-lime-200">
            {leads.length} matches
          </span>
        </div>

        <div className="divide-y divide-slate-900">
          {leads.map((lead) => (
            <LeadCard
              key={lead.company}
              lead={lead}
              isExpanded={expanded === lead.company}
              onToggle={() => setExpanded(expanded === lead.company ? null : lead.company)}
            />
          ))}
        </div>

        {leads.length === 0 && (
          <div className="px-5 py-8 text-center text-sm font-semibold text-slate-400">
            No leads match current search. Try adjusting filters or search terms.
          </div>
        )}
      </section>
    </div>
  );
}

function LeadCard({
  lead,
  isExpanded,
  onToggle,
}: {
  lead: Lead;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="px-5 py-4">
      {/* Summary row */}
      <div className="flex flex-wrap items-start gap-4">
        {/* Score */}
        <div className={`grid size-12 shrink-0 place-items-center rounded-lg border ${scoreBg(lead.score)}`}>
          <span className={`font-mono text-sm font-bold ${scoreColor(lead.score)}`}>{lead.score}</span>
        </div>

        {/* Name + meta */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-slate-100">{lead.company}</p>
            <a
              href={`https://${lead.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-500 hover:text-cyan-300 transition"
              onClick={(e) => e.stopPropagation()}
            >
              {lead.domain} ↗
            </a>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {lead.tags.map((tag) => (
              <span key={tag} className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs font-bold text-slate-300">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">{lead.signal}</p>
        </div>

        {/* Badges + toggle */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex flex-wrap justify-end gap-1.5">
            {[lead.segment, lead.size, lead.funding].map((item) => (
              <span key={item} className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs font-bold text-slate-400">
                {item}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            {isExpanded ? "Less ↑" : "Full intel ↓"}
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="mt-4 grid gap-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase text-cyan-300">ICP fit</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{lead.fit}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-cyan-300">Why now — trigger event</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{lead.trigger}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-cyan-300">Decision maker to contact</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{lead.decisionMaker}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-lime-300">Suggested outreach opening</p>
            <p className="mt-2 rounded-lg bg-slate-950 px-3 py-2 font-mono text-sm leading-6 text-slate-200">{lead.angle}</p>
          </div>
        </div>
      )}
    </div>
  );
}
