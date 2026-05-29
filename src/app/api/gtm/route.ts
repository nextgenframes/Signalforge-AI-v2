import { NextResponse } from "next/server";
import { runGTMOrchestrator } from "@/lib/agents/orchestrator";
import type { BusinessProfile } from "@/lib/agents/types";

export async function POST(request: Request) {
  const profile = await readJSON<BusinessProfile>(request);
  if (!profile) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const report = await runGTMOrchestrator(profile);
  return NextResponse.json(report);
}

async function readJSON<T>(request: Request) {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
