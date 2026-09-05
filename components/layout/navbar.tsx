"use client";

import Link from "next/link";
import { enabledNavigation } from "@/lib/config";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function Navbar() {
  const active = useActiveSection(enabledNavigation.map((item) => item.href));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
      {/* Brand Logo - Top Left */}
      <Link
        href="#hero"
        className="pointer-events-auto text-lg font-serif font-black tracking-tight text-[#1A1A1A] hover:opacity-75 transition-opacity focus-ring rounded-lg bg-[#F4F4F2]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#E6E6E6]"
        aria-label="Jayendra Patel home"
      >
        JP<span className="text-[#666666]">.</span>
      </Link>

      {/* Floating Center Navigation Pill */}
      <nav className="pointer-events-auto flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E6E6E6] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 max-w-[calc(100vw-90px)] overflow-x-auto scrollbar-none">
        {enabledNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-xs font-medium transition-all duration-200 rounded-full px-3 py-1 whitespace-nowrap",
              active === item.href
                ? "bg-[#1A1A1A] text-[#FFFFFF] font-semibold"
                : "text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F7F7F5]"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}

