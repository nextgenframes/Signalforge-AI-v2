import Link from "next/link";
import { SidebarNav } from "@/components/sidebar-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <aside className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:w-72 md:border-b-0 md:border-r md:px-4 md:py-5">
        <div className="flex gap-4 md:h-full md:flex-col">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-lime-300 via-cyan-300 to-violet-500 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-900/20">
              SF
            </span>
            <span className="hidden sm:block">
              <span className="block text-base font-bold text-slate-100">
                SignalForge GTM
              </span>
              <span className="block text-xs font-bold text-slate-500">
                AI market launch agent
              </span>
            </span>
          </Link>
          <div className="min-w-0 flex-1 md:mt-10">
            <SidebarNav />
          </div>
          <div className="hidden rounded-lg border border-slate-800 bg-slate-900/70 p-4 md:block">
            <p className="text-xs font-bold uppercase text-cyan-300">
              Data status
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">
              Live web data when keys connect. Demo/mock fallback always ready.
            </p>
          </div>
        </div>
      </aside>
      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 md:ml-72 lg:py-8">
        {children}
      </main>
    </div>
  );
}
