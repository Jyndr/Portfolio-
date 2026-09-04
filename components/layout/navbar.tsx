"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { enabledNavigation } from "@/lib/config";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
      <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E6E6E6] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300">
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

      {/* Right Circle Toggle Menu / Action */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] text-[#FFFFFF] hover:bg-[#333333] transition-colors focus-ring shadow-xs"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-x-6 top-16 rounded-2xl bg-[#FFFFFF] border border-[#E6E6E6] p-5 shadow-xl md:hidden flex flex-col gap-2.5 z-50">
          {enabledNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-xs font-semibold py-2 border-b border-[#E6E6E6]/60 last:border-0",
                active === item.href ? "text-[#1A1A1A]" : "text-[#666666]"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

