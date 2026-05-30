"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ApiKeyStatus } from "@/components/api-key-status";

type KeyStatus = {
  name: string;
  label: string;
  purpose: string;
  configured: boolean;
};

type LastScanMeta = {
  idea: string;
  savedAt: string;
};

type LastProfileMeta = {
  idea: string;
};

export default function SettingsPage() {
  const [keys, setKeys] = useState<KeyStatus[]>([]);
  const [lastScan, setLastScan] = useState<LastScanMeta | null>(null);
  const [lastProfile, setLastProfile] = useState<LastProfileMeta | null>(null);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    fetch("/api/key-status")
      .then((r) => r.json())
      .then((data: { keys: KeyStatus[] }) => setKeys(data.keys))
      .catch(() => setKeys([]));
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("signalforge.lastScan");
      if (raw) {
        const stored = JSON.parse(raw) as { input: { idea: string }; savedAt: string };
        if (stored.input?.idea) {
          setLastScan({ idea: stored.input.idea, savedAt: stored.savedAt });
        }
      }
    } catch {}

    try {
      const raw = window.localStorage.getItem("signalforge.launchProfile");
      if (raw) {
        const stored = JSON.parse(raw) as { idea: string };
        if (stored?.idea) {
          setLastProfile({ idea: stored.idea });
        }
      }
    } catch {}
  }, []);

  function clearScan() {
    window.localStorage.removeItem("signalforge.lastScan");
    setLastScan(null);
  }

  function clearProfile() {
    window.localStorage.removeItem("signalforge.launchProfile");
    setLastProfile(null);
  }

  function clearAll() {
    window.localStorage.removeItem("signalforge.lastScan");
    window.localStorage.removeItem("signalforge.launchProfile");
    setLastScan(null);
    setLastProfile(null);
    setCleared(true);
    setTimeout(() => setCleared(false), 2500);
  }

  const allConfigured = keys.length > 0 && keys.every((k) => k.configured);

  const redBtnClass =
    "rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-300 transition hover:bg-red-400/15";

  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-bold text-cyan-300">Settings</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-100">
            Settings &amp; diagnostics
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <ApiKeyStatus />

            {/* Data sources panel */}
            <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-6 shadow-sm">
              <p className="text-sm font-bold text-cyan-300">Data sources</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-100">
                {allConfigured ? "Live web data active" : "Running in fallback mode"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {allConfigured
                  ? "All API keys are configured. GTM scans use live Bright Data SERP results and AIMLAPI synthesis."
                  : "Some API keys are missing. GTM scans use local heuristics and market archetypes — no external calls are made."}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-xs font-bold uppercase text-slate-500">Current mode</p>
                  <p className="mt-2 font-bold text-slate-100">
                    {allConfigured ? "Live" : "Fallback"}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-xs font-bold uppercase text-slate-500">Report speed</p>
                  <p className="mt-2 font-bold text-slate-100">
                    {allConfigured ? "5–15 seconds" : "Instant"}
                  </p>
                </div>
              </div>
            </section>

            {/* Saved data panel */}
            <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-6 shadow-sm">
              <p className="text-sm font-bold text-cyan-300">Saved data</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-100">
                Local storage
              </h2>
              <div className="mt-4 space-y-3">
                {lastScan ? (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-500">Last GTM scan</p>
                        <p className="mt-2 font-bold text-slate-100">{lastScan.idea}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Saved {new Date(lastScan.savedAt).toLocaleString()}
                        </p>
                      </div>
                      <button type="button" onClick={clearScan} className={redBtnClass}>
                        Clear scan
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-500">
                    No saved scan.{" "}
                    <Link href="/" className="underline hover:text-slate-300">
                      Run a GTM scan
                    </Link>{" "}
                    to save one.
                  </div>
                )}

                {lastProfile ? (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-500">Launch profile</p>
                        <p className="mt-2 font-bold text-slate-100">{lastProfile.idea}</p>
                      </div>
                      <button type="button" onClick={clearProfile} className={redBtnClass}>
                        Clear profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-500">
                    No saved launch profile.
                  </div>
                )}

                <div className="pt-2">
                  <button type="button" onClick={clearAll} className={redBtnClass}>
                    {cleared ? "Cleared!" : "Clear all saved data"}
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="rounded-lg bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/20">
            <p className="text-sm font-bold text-cyan-200">How data modes work</p>
            <div className="mt-4 space-y-5">
              <div>
                <p className="font-bold text-slate-100">Live mode</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Bright Data fetches real SERP data and competitor pages. AIMLAPI synthesizes
                  findings into GTM cards. Requires all API keys to be configured.
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-100">Fallback mode</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  All GTM content is generated locally from your business inputs using market
                  archetypes and heuristics. No API calls are made. Results are instant.
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-100">Demo mode</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Uses preset business profiles with pre-built reports. Great for sharing or
                  testing without entering your own idea.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
