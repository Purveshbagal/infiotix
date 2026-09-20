"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "all", label: "All" },
  { id: "software", label: "Software" },
  { id: "iot", label: "IoT Products" },
] as const;

type Tab = (typeof tabs)[number]["id"];

type ProjectFilterProps = {
  counts: Record<Tab, number>;
  /** Server-rendered cards; each must carry data-cat="software" | "iot" */
  children: ReactNode;
};

/**
 * Tab buttons that filter the project cards below them. The cards stay server-rendered and are
 * always in the page (so they work without JavaScript); the buttons only flip `data-filter`,
 * and the CSS rule in globals.css hides the other category.
 */
export default function ProjectFilter({ counts, children }: ProjectFilterProps) {
  const [filter, setFilter] = useState<Tab>("all");

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-[0.6rem]">
        {tabs.map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "inline-flex h-[2.6rem] items-center gap-2 rounded-full border px-[1.2rem] fs-92 font-semibold transition-all duration-300",
                active
                  ? "border-transparent bg-[linear-gradient(90deg,#1c64f2_0%,#3b5bff_55%,#5b3df5_100%)] text-white shadow-[0_10px_26px_-10px_rgba(59,91,255,0.8)]"
                  : "border-[rgba(88,110,255,0.4)] bg-[rgba(12,22,58,0.5)] text-[#b9c7e6] hover:border-[rgba(130,160,255,0.85)] hover:text-white",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "grid min-w-[1.5rem] place-items-center rounded-full px-1.5 py-0.5 fs-72 leading-none",
                  active ? "bg-white/25 text-white" : "bg-white/[0.08] text-[#9db0d0]",
                )}
              >
                {counts[tab.id]}
              </span>
            </button>
          );
        })}
      </div>

      <div data-filter={filter} className="mt-[1.6rem]">
        {children}
      </div>
    </div>
  );
}
