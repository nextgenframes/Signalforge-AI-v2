"use client";

import { useMemo, useState } from "react";

type Lead = {
  company: string;
  domain: string;
  segment: string;
  score: number;
  signal: string;
  size: string;
  funding: string;
};

const baseLeads: Lead[] = [
  {
    company: "Northstar BioSystems",
    domain: "northstarbio.io",
    segment: "Healthcare AI",
    score: 94,
    signal: "New CRO, HubSpot migration, and commercial analytics hiring.",
    size: "51-200",
    funding: "Series C",
  },
  {
    company: "AtlasGrid Energy",
    domain: "atlasgrid.energy",
    segment: "Climate SaaS",
    score: 88,
    signal: "Series B hiring sales ops and launching new regional pages.",
    size: "51-200",
    funding: "Series B",
  },
  {
    company: "Quantora Finance",
    domain: "quantora.capital",
    segment: "Fintech",
    score: 82,
    signal: "Pricing page updated and competitor comparison keywords rising.",
    size: "11-50",
    funding: "Seed",
  },
  {
    company: "Keystone Logistics",
    domain: "keystonelogistics.com",
    segment: "Supply chain",
    score: 91,
    signal: "Opened 3 new regional pages and added enterprise sales roles.",
    size: "201-500",
    funding: "Growth",
  },
];

export function LeadDiscoveryAgent() {
  const [filters, setFilters] = useState({
    industry: "Healthcare AI",
    size: "51-200",
    location: "United States",
    keywords: "commercial analytics, CRM migration, growth",
    funding: "Series B",
  });
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");

  const leads = useMemo(() => filterLeads(scoreLeads(filters), search), [filters, search]);

  function update(key: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5">
        <div className="mb-5">
          <p className="text-sm font-bold text-cyan-300">AI Lead Discovery Agent</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-100">
            Generate ICP-matched companies
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Match accounts from industry, company size, location, keywords, and
            funding stage. Demo mode uses local lead intelligence.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_0.7fr_0.8fr]">
          <Field label="Industry">
            <input
              className="field"
              value={filters.industry}
              onChange={(event) => update("industry", event.target.value)}
            />
          </Field>
          <Field label="Company size">
            <select
              className="field"
              value={filters.size}
              onChange={(event) => update("size", event.target.value)}
            >
              <option>1-10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201-500</option>
              <option>500+</option>
            </select>
          </Field>
          <Field label="Location">
            <input
              className="field"
              value={filters.location}
              onChange={(event) => update("location", event.target.value)}
            />
          </Field>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.7fr_180px]">
          <Field label="Keywords">
            <input
              className="field"
              value={filters.keywords}
              onChange={(event) => update("keywords", event.target.value)}
            />
          </Field>
          <Field label="Funding stage">
            <select
              className="field"
              value={filters.funding}
              onChange={(event) => update("funding", event.target.value)}
            >
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

      <section className="rounded-lg border border-slate-800 bg-slate-950/90 shadow-sm">
        <div className="grid gap-4 border-b border-slate-800 px-5 py-4 lg:grid-cols-[1fr_320px_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold text-cyan-300">
              ICP matched companies
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {submitted ? "Generated from current filters" : "Preview from default ICP"}
            </p>
          </div>
          <Field label="Search leads">
            <input
              className="field"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Company, segment, signal, funding..."
            />
          </Field>
          <span className="rounded-lg border border-lime-400/30 bg-lime-400/15 px-3 py-1.5 text-xs font-bold text-lime-200">
            {leads.length} matches
          </span>
        </div>
        <div className="grid grid-cols-[1.2fr_0.8fr_80px_1fr] gap-4 border-b border-slate-800 px-5 py-3 text-xs font-bold uppercase text-slate-500 max-md:hidden">
          <span>Company</span>
          <span>Fit</span>
          <span>Score</span>
          <span>Buying signal</span>
        </div>
        {leads.map((lead) => (
          <div
            key={lead.company}
            className="grid grid-cols-1 gap-3 border-b border-slate-900 px-5 py-4 last:border-b-0 md:grid-cols-[1.2fr_0.8fr_80px_1fr]"
          >
            <div>
              <p className="font-bold text-slate-100">{lead.company}</p>
              <p className="text-sm font-semibold text-slate-500">{lead.domain}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[lead.segment, lead.size, lead.funding].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs font-bold text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="font-bold text-cyan-200">{lead.score}</p>
            <p className="text-sm leading-6 text-slate-400">{lead.signal}</p>
          </div>
        ))}
        {leads.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm font-semibold text-slate-400">
            No leads match current search. Try segment, funding stage, or buying signal.
          </div>
        ) : null}
      </section>
    </div>
  );
}

function filterLeads(leads: Lead[], search: string) {
  const query = search.trim().toLowerCase();
  if (!query) return leads;

  return leads.filter((lead) =>
    [
      lead.company,
      lead.domain,
      lead.segment,
      lead.signal,
      lead.size,
      lead.funding,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
}

function scoreLeads(filters: {
  industry: string;
  size: string;
  location: string;
  keywords: string;
  funding: string;
}) {
  const keywordText = filters.keywords.toLowerCase();

  return baseLeads
    .map((lead) => {
      let score = lead.score;
      if (lead.segment.toLowerCase().includes(filters.industry.toLowerCase())) {
        score += 4;
      }
      if (lead.size === filters.size) score += 3;
      if (lead.funding === filters.funding) score += 3;
      if (keywordText.split(",").some((keyword) => lead.signal.toLowerCase().includes(keyword.trim()))) {
        score += 3;
      }
      return { ...lead, score: Math.min(score, 99) };
    })
    .sort((a, b) => b.score - a.score);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}
