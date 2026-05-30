import type { LaunchProfile } from "@/components/launch-state";

// ─── shared helpers ───────────────────────────────────────────────────────────

function isLocal(profile: LaunchProfile) {
  return /,\s*[A-Z]{2}$|city|town|local|neighborhood/.test(profile.location) ||
    /local|brick|hvac|plumb|clean|repair|dental|clinic|salon|gym|restaurant|coffee|bar/.test(
      `${profile.businessType} ${profile.industry}`.toLowerCase(),
    );
}

function isSaaS(profile: LaunchProfile) {
  return /saas|software|app|platform|tool|api/.test(
    `${profile.businessType} ${profile.industry}`.toLowerCase(),
  );
}

function isConsumer(profile: LaunchProfile) {
  return /mobile app|consumer|fitness|health|food|beverage|creator|media/.test(
    `${profile.businessType} ${profile.industry}`.toLowerCase(),
  );
}

function budgetNum(profile: LaunchProfile): number {
  return parseInt(profile.budget.replace(/[^0-9]/g, ""), 10) || 5000;
}

function budgetTier(profile: LaunchProfile): "bootstrap" | "early" | "growth" {
  const n = budgetNum(profile);
  if (n < 5000) return "bootstrap";
  if (n < 15000) return "early";
  return "growth";
}

function primaryKeyword(profile: LaunchProfile): string {
  const words = profile.idea.split(" ").filter((w) => w.length > 4);
  return words[0] ?? profile.industry.split(" ")[0] ?? "launch";
}

function city(profile: LaunchProfile): string {
  return profile.location.split(",")[0].trim();
}

// ─── STRATEGY ─────────────────────────────────────────────────────────────────

export type StrategyPriority = {
  title: string;
  body: string;
  tag: string;
};

export type StrategyChannel = {
  channel: string;
  play: string;
  target: string;
  priority: "High" | "Medium" | "Test";
};

export type StrategyPackage = {
  name: string;
  price: string;
  includes: string[];
  bestFor: string;
};

export type StrategyPhase = {
  phase: string;
  days: string;
  actions: string[];
  milestone: string;
};

export type StrategyMetric = {
  label: string;
  target: string;
  cadence: string;
};

export type StrategyRisk = {
  risk: string;
  mitigation: string;
};

export type StrategyContent = {
  positioning: string;
  beachhead: string;
  priorities: StrategyPriority[];
  channels: StrategyChannel[];
  packages: StrategyPackage[];
  roadmap: StrategyPhase[];
  metrics: StrategyMetric[];
  risks: StrategyRisk[];
  decisionRules: string[];
};

export function generateStrategyContent(profile: LaunchProfile): StrategyContent {
  const local = isLocal(profile);
  const saas = isSaaS(profile);
  const consumer = isConsumer(profile);
  const tier = budgetTier(profile);
  const kw = primaryKeyword(profile);
  const loc = city(profile);
  const budget = profile.budget;
  const idea = profile.idea;
  const industry = profile.industry;
  const type = profile.businessType;

  const positioning = local
    ? `${idea} is the fastest way for ${loc} customers to get a trusted ${industry.toLowerCase()} outcome without the friction, slow follow-up, or generic service they've been settling for.`
    : saas
    ? `${idea} gives ${industry.toLowerCase()} teams the clarity and speed they need to act on the right signals — without building a full stack of tools or waiting on analysts.`
    : `${idea} helps ${industry.toLowerCase()} buyers move from "considering" to "confident" faster than any current alternative by combining a clear promise with proof they can see on day one.`;

  const beachhead = local
    ? `${loc} ${industry.toLowerCase()} buyers who are actively searching, have a recent trigger event (new project, seasonal need, or competitor disappointment), and value a fast, trustworthy response over lowest price.`
    : saas
    ? `${industry} teams at seed-to-Series A companies (10–100 people) who are running manual workflows, have a clear data or operations bottleneck, and are evaluating solutions in the next 30–60 days.`
    : `Early-adopter ${industry.toLowerCase()} buyers who follow the space, consume educational content, and are willing to pay a premium for an outcome they can measure in the first week.`;

  const priorities: StrategyPriority[] = [
    {
      title: "Beachhead buyer",
      body: local
        ? `Owner-operators and decision-makers in ${loc} with a live ${industry.toLowerCase()} need and visible buying signals — active search, recent reviews, or known pain with current provider.`
        : `${industry} practitioners with a specific workflow bottleneck. They know what they want; your job is to make the outcome undeniable and the first step zero-risk.`,
      tag: "ICP",
    },
    {
      title: "Pain trigger",
      body: local
        ? `Recent seasonal pressure, a competitor failure, a referral conversation, or an urgent job they need done in the next 7–14 days. Catch them at the moment of intent.`
        : `Active evaluation of alternatives, recent team growth, a new hire in a relevant role, or a failed previous solution. These are the highest-conversion entry points.`,
      tag: "Timing",
    },
    {
      title: "Core promise",
      body: `${idea} delivers a measurable outcome — not a feature list. Lead with the result: faster, cheaper, or more certain than what they have now. Quantify it wherever possible.`,
      tag: "Messaging",
    },
    {
      title: "Proof asset",
      body: local
        ? `Before/after photos or numbers, a named customer story from ${loc}, a response-time guarantee, and 5-star review quotes that speak directly to the buyer's fear.`
        : `A live demo, a benchmark comparison, a case study with real metrics, or a free trial outcome that shows value before asking for a commitment.`,
      tag: "Proof",
    },
  ];

  const channels: StrategyChannel[] = local
    ? [
        {
          channel: "Google Search & Maps",
          play: `Create a dedicated "${industry.toLowerCase()} ${loc}" landing page, claim and optimize your Google Business Profile, and run a $${Math.round(budgetNum(profile) * 0.25).toLocaleString()} search ad test targeting emergency and near-me intent keywords.`,
          target: "First 10 inbound leads",
          priority: "High",
        },
        {
          channel: "Review velocity program",
          play: `After each job, send a 2-message SMS sequence asking for a Google review. Respond to every review within 4 hours. Aim for 10 new reviews in the first 30 days — this directly lifts Maps ranking and conversion.`,
          target: "10 reviews / month",
          priority: "High",
        },
        {
          channel: "Neighborhood outbound",
          play: `Build a list of 200 local businesses and homeowners using Google Maps + LinkedIn. Send a 3-touch sequence: trigger observation → specific offer → soft close. Personalize the first line with something visible on their site or Maps listing.`,
          target: "15% reply rate",
          priority: "Medium",
        },
        {
          channel: "Local partner referrals",
          play: `Identify 10 complementary local businesses (real estate agents, property managers, adjacent trades) and offer a mutual referral deal: you send them leads, they send you leads. Track with a simple shared sheet.`,
          target: "5 active partners",
          priority: "Medium",
        },
        {
          channel: "Short-form proof content",
          play: `Post 3× per week on Instagram or Facebook: job before/after, customer story, tip relevant to ${industry.toLowerCase()} buyers in ${loc}. Boost the top-performing post weekly with $50.`,
          target: "2 inbound DMs/week",
          priority: "Test",
        },
      ]
    : saas
    ? [
        {
          channel: "SEO comparison pages",
          play: `Build "${idea} vs [Competitor]" and "best ${kw} tools" pages targeting buyers already in evaluation mode. These convert at 3–5× the rate of brand-term pages because intent is highest.`,
          target: "500 organic visits / month",
          priority: "High",
        },
        {
          channel: "Cold outbound (LinkedIn + email)",
          play: `Build a list of 500 target accounts using Apollo or Clay. Send a 4-touch sequence over 14 days: trigger observation → relevant stat → short demo offer → breakup. Keep each message under 80 words.`,
          target: "8–12% reply rate",
          priority: "High",
        },
        {
          channel: "Founder-led LinkedIn",
          play: `Post 3× per week: one insight from a customer call, one teardown of a market problem, one behind-the-scenes build update. Comment on 10 posts from target buyers daily. No product pitching — build trust first.`,
          target: "500 followers / 60 days",
          priority: "Medium",
        },
        {
          channel: "Product Hunt / Hacker News",
          play: `Launch on Product Hunt on a Tuesday with a focused story: what problem, for who, and what makes it different. Prepare 50 upvote commitments in advance. Write a Show HN post the same week.`,
          target: "Top 5 of the day",
          priority: "Medium",
        },
        {
          channel: "Content SEO",
          play: `Write 2 long-form posts per week targeting bottom-of-funnel keywords: "${kw} pricing", "${kw} for [persona]", "how to [job-to-be-done]". Distribute each post in 3 relevant Slack communities or subreddits.`,
          target: "1,000 organic visits / 90 days",
          priority: "Test",
        },
      ]
    : [
        {
          channel: "Creator partnerships",
          play: `Identify 20 micro-creators (5k–50k followers) in the ${industry.toLowerCase()} space. Offer free product + a $100–$300 flat fee for an honest review. Track sales with unique codes. Start with 5 tests before scaling.`,
          target: "5 active partnerships",
          priority: "High",
        },
        {
          channel: "Community seeding",
          play: `Find the top 5 subreddits, Facebook groups, and Discord servers where your buyer lives. Answer 3 questions per day without pitching. After 2 weeks, make a value-first post that mentions your product naturally.`,
          target: "200 community members engaged",
          priority: "High",
        },
        {
          channel: "Paid social (Meta)",
          play: `Run a $${Math.round(budgetNum(profile) * 0.2).toLocaleString()} Meta test targeting 3 audiences: lookalike of email list, interest stack for ${industry.toLowerCase()}, and retargeting visitors. Use UGC-style video ads, not polished brand content.`,
          target: "CAC under $40",
          priority: "Medium",
        },
        {
          channel: "Email list building",
          play: `Offer a free resource (checklist, guide, or tool) in exchange for an email. Send a 5-email welcome sequence that delivers value before asking for a purchase. Build to 1,000 subscribers before running a launch campaign.`,
          target: "1,000 subscribers",
          priority: "Medium",
        },
        {
          channel: "App store optimization",
          play: `A/B test 3 icon and 3 screenshot variants. Write a description front-loaded with the core job-to-be-done. Seed 20 ratings in the first week. Track keyword rank weekly for 10 target terms.`,
          target: "Top 50 in category",
          priority: "Test",
        },
      ];

  const packages: StrategyPackage[] = local
    ? [
        {
          name: "Quick Start",
          price: `$${Math.round(budgetNum(profile) * 0.08).toLocaleString()}–$${Math.round(budgetNum(profile) * 0.12).toLocaleString()}`,
          includes: [
            `Single ${industry.toLowerCase()} service visit`,
            "Online booking confirmation",
            "Post-job photo documentation",
            "Review request follow-up",
          ],
          bestFor: "First-time customers who want to test before committing",
        },
        {
          name: "Core Service",
          price: `$${Math.round(budgetNum(profile) * 0.2).toLocaleString()}–$${Math.round(budgetNum(profile) * 0.35).toLocaleString()}`,
          includes: [
            `Full ${industry.toLowerCase()} service package`,
            "Priority scheduling window",
            "Before/after documentation",
            "30-day satisfaction guarantee",
            "Direct owner contact",
          ],
          bestFor: "Buyers who value reliability and a clear outcome guarantee",
        },
        {
          name: "Premium / Recurring",
          price: `$${Math.round(budgetNum(profile) * 0.5).toLocaleString()}+/mo`,
          includes: [
            "Recurring service agreement",
            "Priority dispatch (same-day when available)",
            "Annual plan discount (2 months free)",
            "Dedicated account contact",
            "Referral bonus program",
          ],
          bestFor: "High-value customers who want set-it-and-forget-it reliability",
        },
      ]
    : saas
    ? [
        {
          name: "Starter",
          price: `$${Math.round(budgetNum(profile) * 0.005).toLocaleString()}–$${Math.round(budgetNum(profile) * 0.012).toLocaleString()}/mo`,
          includes: [
            "Core feature set",
            "Up to 3 users",
            "Email support (48h response)",
            "Basic reporting",
            "Self-serve onboarding",
          ],
          bestFor: "Solo founders and small teams evaluating the product",
        },
        {
          name: "Pro",
          price: `$${Math.round(budgetNum(profile) * 0.02).toLocaleString()}–$${Math.round(budgetNum(profile) * 0.05).toLocaleString()}/mo`,
          includes: [
            "Full feature set with advanced workflows",
            "Up to 15 users",
            "Priority support (4h response)",
            "Custom reporting and exports",
            "API access",
            "Onboarding call included",
          ],
          bestFor: "Growing teams with active workflows and a clear budget owner",
        },
        {
          name: "Enterprise",
          price: "Custom (annual contract)",
          includes: [
            "Unlimited users and seats",
            "Dedicated CSM and onboarding",
            "SSO, audit logs, and compliance",
            "Custom integrations",
            "SLA with uptime guarantee",
            "Quarterly business reviews",
          ],
          bestFor: "Larger teams with security, compliance, or integration requirements",
        },
      ]
    : [
        {
          name: "Free / Trial",
          price: "Free",
          includes: [
            "Core feature access (7–14 days)",
            "Onboarding checklist",
            "Community access",
            "Email support",
          ],
          bestFor: "Curious buyers who need to see value before spending",
        },
        {
          name: "Core",
          price: `$${Math.round(budgetNum(profile) * 0.003).toLocaleString()}–$${Math.round(budgetNum(profile) * 0.008).toLocaleString()}/mo`,
          includes: [
            "Full feature access",
            "Unlimited usage within plan limits",
            "In-app support",
            "Progress tracking and insights",
          ],
          bestFor: "Committed buyers who want the full experience",
        },
        {
          name: "Premium",
          price: `$${Math.round(budgetNum(profile) * 0.015).toLocaleString()}+/mo`,
          includes: [
            "Everything in Core",
            "Personalized coaching or concierge",
            "Priority support",
            "Exclusive content or features",
            "Early access to new releases",
          ],
          bestFor: "Power users and buyers who want outcomes, not just access",
        },
      ];

  const roadmap: StrategyPhase[] = [
    {
      phase: "Validation sprint",
      days: "Days 1–7",
      actions: [
        `Interview 10 ${local ? `${loc} ` : ""}${industry.toLowerCase()} buyers — ask about their last bad experience, not their wishlist.`,
        "Write 3 landing page headline variants. Test with 5 people before publishing.",
        `Map the top 5 competitors. Note their pricing page language, guarantee copy, and review themes.`,
        "Define one measurable outcome your first customer will get in their first 30 days.",
        `Identify your first 50 outreach targets using ${local ? "Google Maps and LinkedIn" : "Apollo, Clay, or LinkedIn Sales Navigator"}.`,
      ],
      milestone: "Clear ICP, offer, and proof hypothesis locked in",
    },
    {
      phase: "Foundation build",
      days: "Days 8–21",
      actions: [
        "Publish landing page with headline, proof, offer, and one clear CTA.",
        local
          ? "Claim and fully optimize Google Business Profile with photos, services, and first review ask."
          : "Set up product analytics (Mixpanel or PostHog) with 5 key events tracked from day one.",
        `Launch outreach sequence to first 50 targets. Personalize the first line of every message.`,
        "Collect 3 objections from conversations. Write a response script for each.",
        tier === "bootstrap"
          ? "Publish 5 organic pieces of content this week (posts, comments, or video clips)."
          : `Allocate $${Math.round(budgetNum(profile) * 0.15).toLocaleString()} to a paid test on the highest-intent channel.`,
      ],
      milestone: "First 3 conversations booked and landing page live",
    },
    {
      phase: "First revenue",
      days: "Days 22–45",
      actions: [
        "Close first paying customer. Offer a pilot price if needed — but get a real commitment.",
        "Document the full onboarding journey. Note every friction point.",
        local
          ? "Ask first customer for a video testimonial or named quote within 7 days of service."
          : "Instrument a 30-day activation sequence. Measure if buyers reach the key value moment.",
        "Run a second outreach batch of 100 contacts using the objection scripts from phase one.",
        `Review channel performance. Double spend on what works; cut what doesn't after 2-week data.`,
      ],
      milestone: "First paying customer and first proof asset published",
    },
    {
      phase: "Scale signal",
      days: "Days 46–90",
      actions: [
        "Identify the one channel with the best reply/conversion ratio. Scale it 3×.",
        "Build a referral program: existing customers get a discount or credit for every referral that converts.",
        local
          ? "Apply for local awards, press mentions, and community sponsorships to build trust at scale."
          : "Publish a case study with real numbers from your first customer. Use it in all outreach.",
        `Hit ${local ? "20 reviews and a 4.8+ Maps rating" : "10 live case study data points and a public metrics page"}.`,
        "Plan month 4 budget allocation based on proven channel data — not assumptions.",
      ],
      milestone: `${local ? "$5k+ monthly revenue run rate" : "10 active paying customers and clear CAC data"}`,
    },
  ];

  const metrics: StrategyMetric[] = local
    ? [
        { label: "Inbound leads per week", target: "5–10 by week 4", cadence: "Weekly" },
        { label: "Lead-to-booking conversion", target: ">40%", cadence: "Weekly" },
        { label: "Average job value", target: `>${Math.round(budgetNum(profile) * 0.04).toLocaleString()}`, cadence: "Monthly" },
        { label: "Google Maps rating", target: "4.8+ with 20+ reviews", cadence: "Monthly" },
        { label: "Repeat customer rate", target: ">30% in 90 days", cadence: "Monthly" },
        { label: "Revenue per channel", target: "Track all 3 channels separately", cadence: "Weekly" },
      ]
    : saas
    ? [
        { label: "Weekly active trials", target: "10+ by week 4", cadence: "Weekly" },
        { label: "Trial-to-paid conversion", target: ">15%", cadence: "Weekly" },
        { label: "Time to first value moment", target: "<10 minutes", cadence: "Weekly" },
        { label: "Net revenue retention", target: ">100% at month 3", cadence: "Monthly" },
        { label: "CAC by channel", target: "Track all channels separately", cadence: "Monthly" },
        { label: "Churn rate", target: "<5% monthly", cadence: "Monthly" },
      ]
    : [
        { label: "Daily active users", target: "100+ by week 6", cadence: "Daily" },
        { label: "Trial-to-paid rate", target: ">10%", cadence: "Weekly" },
        { label: "D30 retention", target: ">40%", cadence: "Monthly" },
        { label: "CAC from paid social", target: `<$${Math.round(budgetNum(profile) * 0.006)}`, cadence: "Weekly" },
        { label: "App store rating", target: "4.5+ with 50+ ratings", cadence: "Monthly" },
        { label: "Referral rate", target: ">15% of new users", cadence: "Monthly" },
      ];

  const risks: StrategyRisk[] = [
    {
      risk: "Spreading budget across too many channels before any channel is proven",
      mitigation: `Pick one primary channel for the first 30 days. Invest at least ${tier === "bootstrap" ? "80%" : "60%"} of effort there before testing a second.`,
    },
    {
      risk: "Positioning too broad — appealing to everyone means converting no one",
      mitigation: `Describe one specific person with one specific problem in ${local ? loc : `the ${industry} space`}. Every piece of copy should make that person say "this is for me."`,
    },
    {
      risk: "Waiting for the perfect product before talking to customers",
      mitigation: "Book 10 customer conversations in the first 2 weeks. Sell the outcome before building the delivery. The insights will change what you build.",
    },
    {
      risk: local ? "Relying on word-of-mouth before having a repeatable inbound system" : "Depending on founder network for early customers instead of a scalable channel",
      mitigation: local
        ? "Set up Google Search ads and Google Business Profile optimization in week one. These work while you sleep."
        : "Build at least one channel that doesn't require your personal involvement — content SEO, paid ads, or a referral program.",
    },
  ];

  const decisionRules = [
    `Do not scale any channel until you have 2 weeks of data showing cost per lead under ${local ? `$${Math.round(budgetNum(profile) * 0.04)}` : `$${Math.round(budgetNum(profile) * 0.02)}`}.`,
    "Do not add a new feature until you've talked to 5 customers about why they're not converting.",
    `If outbound reply rate is below 8%, fix the first line before changing anything else.`,
    local
      ? "Do not compete on price. Compete on speed, trust, and proof. Raise prices after 10 reviews."
      : "Do not build an enterprise tier until you have 20 paying SMB customers with clear retention.",
    "Measure channel performance weekly. Kill channels with no signal after 3 weeks. Double down on channels with signal after 1 week.",
  ];

  return { positioning, beachhead, priorities, channels, packages, roadmap, metrics, risks, decisionRules };
}

// ─── OUTREACH ─────────────────────────────────────────────────────────────────

export type OutreachSegment = {
  name: string;
  signal: string;
  source: string;
  approach: string;
  size: string;
};

export type OutreachSequence = {
  step: string;
  angle: string;
  copy: string;
  timing: string;
};

export type OutreachObjection = {
  objection: string;
  response: string;
};

export type OutreachContent = {
  headline: string;
  metrics: { label: string; value: string }[];
  segments: OutreachSegment[];
  sequences: OutreachSequence[];
  tokens: string[];
  objections: OutreachObjection[];
  rules: string[];
};

export function generateOutreachContent(profile: LaunchProfile): OutreachContent {
  const local = isLocal(profile);
  const saas = isSaaS(profile);
  const loc = city(profile);
  const idea = profile.idea;
  const industry = profile.industry;
  const kw = primaryKeyword(profile);

  const headline = local
    ? `Targeted outreach to ${loc} ${industry.toLowerCase()} buyers using live buying signals, not cold lists.`
    : `Trigger-based outreach to ${industry} buyers showing active intent — not spray-and-pray.`;

  const metrics = [
    { label: "Weekly accounts touched", value: local ? "50–75" : "100–150" },
    { label: "Target reply rate", value: "12–20%" },
    { label: "Meetings booked / week", value: local ? "3–5" : "5–10" },
    { label: "Follow-up window", value: "7 days" },
    { label: "Messages per sequence", value: "3–4 touches" },
    { label: "Best send time", value: "Tue–Thu, 8–10am local" },
  ];

  const segments: OutreachSegment[] = local
    ? [
        {
          name: `Active searchers in ${loc}`,
          signal: `Searching "${industry.toLowerCase()} near me", "${industry.toLowerCase()} ${loc}", or urgent service keywords on Google.`,
          source: "Google Ads keyword planner, Google Maps reviews",
          approach: `Reach them via Google Search ads and Maps optimization. These buyers have the highest intent — they've already decided to buy, just not from whom.`,
          size: "High volume, high intent",
        },
        {
          name: "Recent review complainers",
          signal: `Left a 1–3 star review for a competitor in the last 30 days. Explicitly mentioned slow response, no-show, or poor quality.`,
          source: "Google Maps, Yelp, Facebook reviews",
          approach: `Send a direct message: acknowledge their bad experience, introduce your service guarantee, offer a free estimate. These buyers are actively looking for a replacement.`,
          size: "Small but highest conversion",
        },
        {
          name: "Local business owners",
          signal: `Own or manage a local business in ${loc} that regularly needs ${industry.toLowerCase()} services — offices, retail, property management, restaurants.`,
          source: "LinkedIn, Google Maps, local chamber directories",
          approach: `Cold email or LinkedIn DM with a business-focused offer: recurring service contract, priority scheduling, invoicing flexibility. B2B local buyers want reliability over price.`,
          size: "Medium volume, high LTV",
        },
      ]
    : saas
    ? [
        {
          name: "Active tool evaluators",
          signal: `Viewed competitor pricing pages, searched "${kw} alternatives" or "${kw} pricing", or posted about a workflow problem in the last 14 days.`,
          source: "G2, Capterra, LinkedIn activity, Twitter/X",
          approach: `Lead with the specific comparison: "We solve [X] differently than [Competitor] because [specific reason]." These buyers are already sold on the category — you just need to win the comparison.`,
          size: "Medium volume, very high conversion",
        },
        {
          name: "New hires in relevant roles",
          signal: `Started a new ${industry}-adjacent role in the last 30–60 days. New hires evaluate tools in their first 90 days at a 3× higher rate than established employees.`,
          source: "LinkedIn job change notifications, Sales Navigator",
          approach: `Reach out within 30 days of their start date: "Congrats on the new role — most [job title]s in their first 60 days hit [specific problem]. We built [idea] to solve exactly that."`,
          size: "High volume, strong timing advantage",
        },
        {
          name: "Competitor review leavers",
          signal: `Left a 3-star or lower review for a direct competitor on G2 or Capterra in the last 60 days. Mentioned a specific missing feature or broken workflow.`,
          source: "G2, Capterra, Trustpilot",
          approach: `Message them directly: quote their review (without revealing you scraped it), confirm the pain, and show how you solve exactly that issue. Conversion rate on this segment is typically 25–35%.`,
          size: "Small but very high-intent",
        },
        {
          name: `Growing ${industry} teams`,
          signal: `Hiring for ops, analytics, or ${kw}-adjacent roles. Headcount growth of >20% in the last 6 months indicates scaling pains and tool evaluation cycles.`,
          source: "LinkedIn, job boards, Crunchbase, Apollo",
          approach: `Lead with a relevant benchmark: "Most ${industry} teams at your stage spend [X hours] on [problem]. We cut that by 60% in the first week — want to see the data?"`,
          size: "Large volume, medium conversion",
        },
      ]
    : [
        {
          name: "High-engagement community members",
          signal: `Regularly posting or commenting in ${industry.toLowerCase()} subreddits, Facebook groups, or Discord servers. Asking for recommendations or sharing their current pain.`,
          source: "Reddit, Facebook Groups, Discord, Twitter/X",
          approach: `Build genuine rapport first — answer 5 questions before making any mention of your product. When you do introduce it, frame it as a tool you built to solve your own version of their problem.`,
          size: "Medium volume, high trust conversion",
        },
        {
          name: "Creator audience overlap",
          signal: `Follows 3+ ${industry.toLowerCase()} creators or influencers. Engages with content similar to your offer. Likely to discover products through recommendations, not ads.`,
          source: "Creator comment sections, similar audience targeting",
          approach: `Partner with the 5 micro-creators who overlap with your target audience. Offer a free account plus commission. These warm referrals convert at 4–6× the rate of cold paid ads.`,
          size: "Large volume via leverage",
        },
        {
          name: "Lapsed free users",
          signal: `Signed up but didn't activate in the first 7 days. Saw the product, had intent, but hit friction or distraction.`,
          source: "Your own CRM / product analytics",
          approach: `3-touch reactivation: Day 1: "Did you hit a snag?" Day 4: share the one feature most users miss. Day 7: offer a 15-min onboarding call. This segment converts at 2× the rate of cold outreach.`,
          size: "High value — already warm",
        },
      ];

  const sequences: OutreachSequence[] = local
    ? [
        {
          step: "Message 1",
          angle: "Trigger observation",
          copy: `Hi [Name], noticed [specific signal — new project, recent review complaint, upcoming season]. We specialize in ${industry.toLowerCase()} for [${loc} businesses / homeowners] and have helped [X] similar [customers / properties] in the last 90 days. Would it be useful to see a quick estimate for your situation?`,
          timing: "Day 1",
        },
        {
          step: "Message 2",
          angle: "Proof + specificity",
          copy: `Following up — wanted to share what we did for [similar customer type] recently: [specific outcome — saved $X, fixed in under 4 hours, passed inspection first try]. Happy to put together a no-obligation estimate for [their specific situation]. Takes about 15 minutes.`,
          timing: "Day 4",
        },
        {
          step: "Message 3",
          angle: "Soft close",
          copy: `Last note — if the timing isn't right, no problem at all. But if you're planning to address [their need] in the next 30–60 days, I'd rather you hear from us early than scramble when it becomes urgent. Booking link here: [link]`,
          timing: "Day 8",
        },
      ]
    : saas
    ? [
        {
          step: "Email 1",
          angle: "Trigger + credibility",
          copy: `Hi [Name], saw your team [specific trigger — new hire, funding round, product launch, competitor switch]. Most ${industry} teams at that stage hit [specific problem] within 60 days. We built ${idea} to solve exactly that — [one-sentence mechanism]. Would a 15-minute demo be worth your time this week?`,
          timing: "Day 1",
        },
        {
          step: "Email 2",
          angle: "Relevant proof",
          copy: `Wanted to share what [similar company type] did with ${idea}: [specific outcome — reduced X by Y%, saved Z hours/week, closed X more deals]. The setup took less than a day. Happy to show you exactly how they did it — any 20-minute slot work this week?`,
          timing: "Day 4",
        },
        {
          step: "Email 3",
          angle: "Contrast + urgency",
          copy: `Most teams solving [their problem] manually are spending [X hours or $Y] per week on something ${idea} handles automatically. I'm not sure if that math applies to your team, but it usually resonates. Worth a look?`,
          timing: "Day 9",
        },
        {
          step: "Email 4",
          angle: "Breakup",
          copy: `I'll stop reaching out after this — clearly the timing isn't right. If [their problem] becomes a priority in Q[next quarter], I'd love to reconnect. In the meantime, here's our [benchmark report / pricing page / demo recording] in case it's useful: [link]`,
          timing: "Day 14",
        },
      ]
    : [
        {
          step: "DM 1",
          angle: "Genuine observation",
          copy: `Hey [Name], been following your content for a while — [specific observation about their work or pain]. I built ${idea} because I hit the exact same wall. Not pitching — just thought you might find it useful to try. Happy to give you access if you want to poke around.`,
          timing: "Day 1",
        },
        {
          step: "DM 2",
          angle: "Value delivery",
          copy: `Wanted to share something relevant to [their content topic]: [short insight, tip, or mini-teardown]. This is the kind of thing ${idea} surfaces automatically. Let me know if you want a walkthrough — takes 10 minutes.`,
          timing: "Day 5",
        },
        {
          step: "DM 3",
          angle: "Low-friction ask",
          copy: `Last one — if ${idea} isn't a fit right now, totally fine. But if you ever find yourself [specific pain scenario], come back and I'll set you up with a free month. No catch.`,
          timing: "Day 10",
        },
      ];

  const tokens = local
    ? [
        `recent review quote from their Google Maps profile`,
        `specific neighborhood or service area you've worked in`,
        `seasonal or weather-related trigger (storm, cold snap, etc.)`,
        `adjacent business type that referred you`,
        `specific service they might need based on property type`,
        `competitor they're likely using right now`,
      ]
    : saas
    ? [
        `recent funding round or headcount milestone`,
        `specific competitor they're likely using`,
        `job posting that signals a relevant pain`,
        `a recent LinkedIn post or article they published`,
        `industry benchmark that makes the problem concrete`,
        `stack they're likely using (identified from job posts)`,
      ]
    : [
        `specific piece of content they've posted recently`,
        `community they're active in`,
        `pain they've mentioned publicly`,
        `similar creator or brand they've referenced`,
        `goal they've stated (audience size, revenue, fitness milestone, etc.)`,
        `platform they're most active on`,
      ];

  const objections: OutreachObjection[] = [
    {
      objection: "I'm not interested right now.",
      response: local
        ? `Totally fair — most people reach out when the need is urgent. Would it help if I sent over our pricing and a couple of recent job photos so you have them when the time comes?`
        : `Understood. Would it be useful to have a short demo recording you can watch on your own time? No commitment — just so you have the context if it becomes relevant.`,
    },
    {
      objection: "We already have someone for this.",
      response: local
        ? `That's great — having a reliable provider is huge. The only thing I'd ask: if you ever have a situation where they're unavailable or the response time doesn't work, we're set up to handle overflow. Worth having a backup?`
        : `Makes sense. The reason most teams still talk to us is that we handle [specific gap your product fills] differently than most tools. Happy to show just that part — 10 minutes. Would that be worth it?`,
    },
    {
      objection: "It's too expensive.",
      response: `Appreciate the honesty. Can I ask what you're spending on [alternative] right now — time, tools, or outsourcing? Most buyers find we're cheaper than the status quo once we do the math together. Want to walk through it?`,
    },
    {
      objection: "Send me more information.",
      response: `Happy to. To make sure I send the most relevant stuff — what's the most important thing for you to understand before making a decision? [Price? Proof? How it works?] That'll help me point you to the right resources.`,
    },
  ];

  const rules = [
    "Never send more than 4 messages in a sequence. If they haven't replied by message 4, they're not a fit right now.",
    "Personalize the first line of every message. Generic openers cut reply rates by 30–50%.",
    local
      ? "Do not lead with price. Lead with the trigger observation and a specific outcome. Price comes after rapport."
      : "Do not lead with features. Lead with the problem and a specific metric that makes it tangible.",
    "Reply to every positive response within 2 hours. Speed of follow-up is the single highest predictor of close rate.",
    "Track reply rate, not just send volume. If reply rate drops below 8%, stop and rewrite the first message before sending more.",
  ];

  return { headline, metrics, segments, sequences, tokens, objections, rules };
}

// ─── CAMPAIGNS ────────────────────────────────────────────────────────────────

export type Campaign = {
  name: string;
  type: string;
  status: "Live" | "Ready" | "Draft" | "Paused";
  progress: string;
  goal: string;
  channel: string;
  copyAngle: string;
  budgetSplit: string;
  successMetric: string;
  nextAction: string;
};

export type CampaignContent = {
  headline: string;
  totalBudget: string;
  campaigns: Campaign[];
  principles: string[];
};

export function generateCampaignContent(profile: LaunchProfile): CampaignContent {
  const local = isLocal(profile);
  const saas = isSaaS(profile);
  const loc = city(profile);
  const idea = profile.idea;
  const industry = profile.industry;
  const kw = primaryKeyword(profile);
  const total = budgetNum(profile);
  const tier = budgetTier(profile);

  const headline = local
    ? `${loc} ${industry} campaigns built around buyer intent signals and local proof.`
    : `${idea} campaigns ranked by expected ROI and channel fit for your current stage.`;

  const campaigns: Campaign[] = local
    ? [
        {
          name: `${loc} Search Intent`,
          type: "Google Search Ads",
          status: "Ready",
          progress: "65%",
          goal: `Capture buyers actively searching for ${industry.toLowerCase()} services in ${loc} with high-intent keywords.`,
          channel: "Google Ads + Google Business Profile",
          copyAngle: `"${loc}'s trusted ${industry.toLowerCase()} service — same-day response, satisfaction guarantee." Use urgency and location in every headline.`,
          budgetSplit: `$${Math.round(total * 0.25).toLocaleString()} / month`,
          successMetric: "Cost per lead under $50, 5+ inbound calls/week",
          nextAction: "Set up conversion tracking on phone calls and form submissions before launching ads.",
        },
        {
          name: "Review Velocity Program",
          type: "Reputation + Retention",
          status: "Live",
          progress: "80%",
          goal: "Build to 25+ Google reviews with 4.8+ rating to dominate local Maps rankings.",
          channel: "SMS follow-up sequence + Google Business Profile",
          copyAngle: `Post-job SMS: "Thanks for choosing us, [Name]! If we earned it, a quick Google review helps other ${loc} homeowners find reliable service: [link]"`,
          budgetSplit: "$0 direct cost (time investment)",
          successMetric: "10 new reviews in first 30 days, Maps position in top 3",
          nextAction: "Send review requests to the last 10 completed jobs today.",
        },
        {
          name: "Local Partner Referral",
          type: "Partnership",
          status: "Draft",
          progress: "30%",
          goal: `Build a network of 8–10 local businesses who send qualified ${industry.toLowerCase()} referrals monthly.`,
          channel: "Direct outreach + referral agreement",
          copyAngle: "\"We send you roofing leads, you send us HVAC leads\" — mutual referral partnerships with real estate agents, property managers, and adjacent trades.",
          budgetSplit: "$0 direct cost (10% referral fee on converted jobs)",
          successMetric: "5 active partners sending 2+ referrals/month each",
          nextAction: "List 20 potential partner businesses in your area and send the first 5 outreach messages this week.",
        },
        {
          name: "Before/After Proof Content",
          type: "Social Media",
          status: "Live",
          progress: "55%",
          goal: `Build local brand trust through proof content that shows real work for real ${loc} customers.`,
          channel: "Instagram, Facebook, Nextdoor",
          copyAngle: `Document every job with a before photo, an in-progress photo, and an after photo. Caption: "[Specific neighborhood] job completed today — [specific problem solved]. DM for a free estimate."`,
          budgetSplit: `$${Math.round(total * 0.05).toLocaleString()} / month (boost top posts weekly)`,
          successMetric: "2 inbound DMs/week from organic content within 30 days",
          nextAction: "Take before/after photos on the next 3 jobs and post this week.",
        },
        {
          name: "Neighborhood Outbound Sprint",
          type: "Direct Outreach",
          status: "Ready",
          progress: "45%",
          goal: `Generate 10 new ${industry.toLowerCase()} quotes in ${loc} through personalized direct outreach to high-fit prospects.`,
          channel: "Email, LinkedIn, or door-to-door depending on segment",
          copyAngle: `"We recently completed work for 3 properties on [their street/area]. We have a scheduling window open next week and wanted to offer a free assessment to neighbors." Hyper-local specificity lifts response rates significantly.`,
          budgetSplit: "$0 direct cost (2 hours/week of outreach time)",
          successMetric: "15% response rate, 5 estimates booked per 50 contacts",
          nextAction: "Pull a list of 50 addresses in your top-performing neighborhood and start the sequence.",
        },
      ]
    : saas
    ? [
        {
          name: "Competitor Comparison SEO",
          type: "Content SEO",
          status: "Live",
          progress: "60%",
          goal: `Capture bottom-of-funnel buyers actively evaluating alternatives to competitors. These pages convert at 3–5× average.`,
          channel: "Blog / landing pages + organic search",
          copyAngle: `"${idea} vs [Competitor]: what's actually different" — be honest, specific, and lead with the one thing you do better. Don't bash competitors; let the comparison speak for itself.`,
          budgetSplit: tier === "bootstrap" ? "$0 (founder-written content)" : `$${Math.round(total * 0.08).toLocaleString()} / month (content + SEO tool)`,
          successMetric: "500 organic visits/month to comparison pages within 90 days, >2% conversion to trial",
          nextAction: "Write one comparison page this week targeting your strongest competitor.",
        },
        {
          name: "Cold Outbound Sequence",
          type: "Email + LinkedIn",
          status: "Live",
          progress: "70%",
          goal: `Book 5–10 qualified demos per week from ${industry} teams showing active buying signals.`,
          channel: "Apollo/Clay → email + LinkedIn DM sequence",
          copyAngle: `Lead with a trigger (hiring signal, funding, competitor switch) + a specific metric that makes the problem tangible. Keep every message under 80 words. No attachments in first touch.`,
          budgetSplit: `$${Math.round(total * 0.12).toLocaleString()} / month (Apollo + sending tool)`,
          successMetric: "12%+ reply rate, 5+ demos/week by week 4",
          nextAction: "Review reply rates from last week's sends. Rewrite the subject line and first sentence of anything under 8%.",
        },
        {
          name: "Founder LinkedIn Authority",
          type: "Organic Social",
          status: "Live",
          progress: "50%",
          goal: `Build founder credibility in the ${industry} space so that outreach converts at higher rates and inbound requests start within 60 days.`,
          channel: "LinkedIn (posts + comments)",
          copyAngle: `3 post types per week: (1) a customer insight you learned this week, (2) a teardown of a market problem, (3) a transparent build update. Engage in the comments of 10 target buyer posts daily.`,
          budgetSplit: "$0 direct cost (45 min/day founder time)",
          successMetric: "500 followers in 60 days, 2+ inbound demo requests/week from content",
          nextAction: "Write and schedule 3 posts for this week. Set a daily reminder to comment on 10 posts from target buyers.",
        },
        {
          name: `${industry} Paid Search`,
          type: "Google Ads",
          status: "Draft",
          progress: "25%",
          goal: `Capture bottom-of-funnel buyers searching "${kw} software/tool/platform" and related high-intent terms.`,
          channel: "Google Search Ads",
          copyAngle: `Use the specific outcome in the headline: "Cut ${kw} time by 60%" or "The ${kw} tool [Competitor] users switch to." Send traffic to a dedicated landing page, not the homepage.`,
          budgetSplit: `$${Math.round(total * 0.2).toLocaleString()} / month (test budget)`,
          successMetric: "CPC under $15, trial sign-up rate >4% on landing page",
          nextAction: "Build the dedicated landing page first. Do not run ads until conversion tracking is live.",
        },
        {
          name: "Product Hunt Launch",
          type: "Community Launch",
          status: "Draft",
          progress: "15%",
          goal: "Generate 500+ upvotes, 200+ sign-ups, and 50 media/investor mentions on launch day.",
          channel: "Product Hunt (primary) + Twitter/X, LinkedIn, HN (day-of amplification)",
          copyAngle: `"We built ${idea} because we were [frustrated with problem]. Here's what we learned." Lead with the story and the specific insight, not the feature list. The maker comment is as important as the listing itself.`,
          budgetSplit: "$0 direct cost (prep time: 2 weeks of relationship building before launch)",
          successMetric: "Top 5 product of the day, 200+ sign-ups within 48 hours",
          nextAction: "Line up 50 people who will upvote on day one before choosing your launch date.",
        },
      ]
    : [
        {
          name: "Creator Seeding Sprint",
          type: "Influencer Marketing",
          status: "Ready",
          progress: "55%",
          goal: `Place ${idea} in front of 500k+ targeted ${industry.toLowerCase()} buyers through 10 micro-creator partnerships.`,
          channel: "Instagram, TikTok, YouTube Shorts",
          copyAngle: `Brief creators to show their honest experience — not a polished ad. UGC-style content outperforms branded content 4:1 for conversion. Give them your key message but let them tell it their way.`,
          budgetSplit: `$${Math.round(total * 0.25).toLocaleString()} (free product + $100–$300 per creator)`,
          successMetric: "200+ sign-ups or purchases attributed to creator codes within 30 days",
          nextAction: "DM the top 20 micro-creators in your niche this week with a personalized offer.",
        },
        {
          name: "Community Seeding Program",
          type: "Organic Community",
          status: "Live",
          progress: "65%",
          goal: `Build trust and word-of-mouth in the top 5 communities where ${industry.toLowerCase()} buyers spend time.`,
          channel: "Reddit, Facebook Groups, Discord, Slack communities",
          copyAngle: `Answer questions genuinely for 2 weeks before mentioning your product. When you do introduce it, frame it as "I built this to solve the same problem" — not a sales pitch.`,
          budgetSplit: "$0 direct cost (1 hour/day community engagement)",
          successMetric: "3+ organic mentions of your product per week from non-founders within 30 days",
          nextAction: "Join the top 5 communities today and answer 3 questions in each before the week ends.",
        },
        {
          name: "Paid Social Acquisition",
          type: "Meta Ads",
          status: "Draft",
          progress: "30%",
          goal: `Acquire paying customers at under $${Math.round(total * 0.006)} CAC through targeted Meta ads.`,
          channel: "Facebook + Instagram ads",
          copyAngle: `Test 3 creative angles: (1) problem-first UGC, (2) before/after result, (3) social proof collage. Use 9:16 vertical format. Open with a hook that stops the scroll in the first 3 seconds.`,
          budgetSplit: `$${Math.round(total * 0.2).toLocaleString()} / month test budget`,
          successMetric: `CAC under $${Math.round(total * 0.006)}, ROAS > 2× after 14 days`,
          nextAction: "Create 3 ad creative variations based on your top 3 customer testimonials. Launch with $20/day to each.",
        },
        {
          name: "Email List Launch Sequence",
          type: "Email Marketing",
          status: "Live",
          progress: "70%",
          goal: "Convert 10% of email subscribers into paying customers through a 7-day nurture sequence.",
          channel: "Email (Klaviyo, ConvertKit, or Mailchimp)",
          copyAngle: `7-email sequence: Day 1: welcome + quick win. Day 2: the problem story. Day 3: social proof. Day 4: product walkthrough. Day 5: objection handler. Day 6: limited offer. Day 7: last chance.`,
          budgetSplit: `$${Math.round(total * 0.03).toLocaleString()} / month (email tool)`,
          successMetric: "10%+ email-to-purchase conversion rate, 40%+ open rate on first 3 emails",
          nextAction: "Write emails 1 and 2 today. Schedule them to go out to your existing list immediately.",
        },
        {
          name: "App Store Optimization",
          type: "ASO",
          status: "Ready",
          progress: "40%",
          goal: `Rank in the top 20 for 5 target keywords in the ${industry.toLowerCase()} category on iOS and Android.`,
          channel: "App Store + Google Play",
          copyAngle: `Lead the description with the core job-to-be-done, not your company name. A/B test 3 icon variants and 3 screenshot sequences. First screenshot must communicate the value prop in under 2 seconds.`,
          budgetSplit: `$${Math.round(total * 0.05).toLocaleString()} (ASO tool + design)`,
          successMetric: "Top 50 in category within 60 days, 4.5+ rating with 50+ reviews",
          nextAction: "Rewrite your app store description using the jobs-to-be-done framework. Test a new first screenshot this week.",
        },
      ];

  const principles = [
    "Launch one campaign at a time. Prove it works before adding the next.",
    `Set a clear kill threshold: if a campaign doesn't hit its success metric in ${local ? "3 weeks" : "2 weeks"}, pause and diagnose before spending more.`,
    "Track campaign attribution from day one. If you can't measure it, don't scale it.",
    local
      ? "Local campaigns live and die by response speed. Set up instant notification on all lead forms and phone calls."
      : "B2B campaigns take 2–4 weeks to show meaningful data. Don't optimize too early — wait for statistical significance.",
    "Your best campaigns will come from customer language, not your own. Use exact quotes from customer conversations in your copy.",
  ];

  return { headline, totalBudget: profile.budget, campaigns, principles };
}
