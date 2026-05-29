"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/", label: "GTM Scan" },
  { href: "/strategy", label: "Strategy" },
  { href: "/lead-explorer", label: "Lead Explorer" },
  { href: "/outreach", label: "Outreach" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/demo", label: "Demo Mode" },
  { href: "/settings", label: "Settings" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
      {nav.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-w-fit items-center rounded-lg border px-4 py-3 text-sm font-bold transition md:min-w-0 ${
              active
                ? "border-cyan-400/30 bg-cyan-400/15 text-cyan-200"
                : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-100"
            }`}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
