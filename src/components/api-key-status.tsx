"use client";

import { useEffect, useState } from "react";

type KeyStatus = {
  name: string;
  label: string;
  purpose: string;
  configured: boolean;
};

export function ApiKeyStatus() {
  const [keys, setKeys] = useState<KeyStatus[]>([]);

  useEffect(() => {
    let active = true;

    fetch("/api/key-status")
      .then((response) => response.json())
      .then((data: { keys: KeyStatus[] }) => {
        if (active) setKeys(data.keys);
      })
      .catch(() => {
        if (active) setKeys([]);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/90 p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-cyan-300">API key status</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-100">
            Runtime configuration
          </h2>
        </div>
        <span className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-300">
          secrets hidden
        </span>
      </div>
      <div className="space-y-3">
        {keys.map((key) => (
          <div
            key={key.name}
            className="grid gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-4 md:grid-cols-[1fr_140px]"
          >
            <div>
              <p className="font-bold text-slate-100">{key.label}</p>
              <p className="mt-1 font-mono text-xs font-bold text-slate-500">
                {key.name}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {key.purpose}
              </p>
            </div>
            <div className="md:text-right">
              <span
                className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-bold ${
                  key.configured
                    ? "border-lime-400/30 bg-lime-400/15 text-lime-200"
                    : "border-slate-700 bg-slate-950 text-slate-400"
                }`}
              >
                {key.configured ? "configured" : "missing"}
              </span>
            </div>
          </div>
        ))}
        {keys.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-sm font-semibold text-slate-400">
            Unable to load key status.
          </div>
        ) : null}
      </div>
    </section>
  );
}
