"use client";

import { useEffect, useState } from "react";

export type LaunchProfile = {
  idea: string;
  industry: string;
  location: string;
  budget: string;
  businessType: string;
};

const STORAGE_KEY = "signalforge.launchProfile";

const defaultProfile: LaunchProfile = {
  idea: "Residential HVAC repair with same-day booking",
  industry: "Home services",
  location: "Charlotte, NC",
  budget: "$6,500",
  businessType: "Local service",
};

export function LaunchInput() {
  const [profile, setProfile] = useState(defaultProfile);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const saved = readLaunchProfile();
      if (saved) {
        setProfile(saved);
        setLaunched(true);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  function update<K extends keyof LaunchProfile>(key: K, value: LaunchProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function launch() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(
      new CustomEvent("signalforge-launch", { detail: profile }),
    );
    setLaunched(true);
  }

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-5 shadow-sm shadow-black/20">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-cyan-300">Launch input</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-100">
            Launch idea across workspace
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Save one business idea. Strategy, leads, outreach, and campaigns use it.
          </p>
        </div>
        {launched ? (
          <span className="rounded-lg border border-lime-400/30 bg-lime-400/15 px-3 py-2 text-xs font-bold text-lime-200">
            Launched
          </span>
        ) : null}
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
        <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <Field label="Business idea">
          <input
            value={profile.idea}
            onChange={(event) => update("idea", event.target.value)}
            className="field"
          />
        </Field>
        <Field label="Industry">
          <input
            value={profile.industry}
            onChange={(event) => update("industry", event.target.value)}
            className="field"
          />
        </Field>
        <Field label="Location">
          <input
            value={profile.location}
            onChange={(event) => update("location", event.target.value)}
            className="field"
          />
        </Field>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-[0.8fr_0.8fr_180px]">
          <Field label="Budget">
            <input
              value={profile.budget}
              onChange={(event) => update("budget", event.target.value)}
              className="field"
            />
          </Field>
          <Field label="Business type">
            <input
              value={profile.businessType}
              onChange={(event) => update("businessType", event.target.value)}
              className="field"
            />
          </Field>
          <button
            type="button"
            onClick={launch}
            className="self-end rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            Launch GTM agent
          </button>
        </div>
      </div>
    </section>
  );
}

export function LaunchContextPanel({ label = "Loaded launch" }: { label?: string }) {
  const profile = useLaunchProfile();

  if (!profile) {
    return (
      <section className="rounded-lg border border-dashed border-slate-700 bg-slate-950/70 p-4">
        <p className="text-sm font-bold text-slate-400">
          No launch loaded. Start from Dashboard launch input.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
      <p className="text-xs font-bold uppercase text-cyan-200">{label}</p>
      <h2 className="mt-2 text-xl font-bold text-slate-100">{profile.idea}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {[profile.industry, profile.location, profile.budget, profile.businessType].map(
          (item) => (
            <span
              key={item}
              className="rounded-lg border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-xs font-bold text-slate-300"
            >
              {item}
            </span>
          ),
        )}
      </div>
    </section>
  );
}

export function useLaunchProfile() {
  const [profile, setProfile] = useState<LaunchProfile | null>(null);

  useEffect(() => {
    function sync(event?: Event) {
      const launchEvent = event as CustomEvent<LaunchProfile>;
      setProfile(launchEvent?.detail || readLaunchProfile());
    }

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("signalforge-launch", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("signalforge-launch", sync);
    };
  }, []);

  return profile;
}

export function readLaunchProfile() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LaunchProfile) : null;
  } catch {
    return null;
  }
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
