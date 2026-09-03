"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { config, enabledNavigation } from "@/lib/config";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { Button, Container } from "@/components/ui/primitives";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(enabledNavigation.map((item) => item.href));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-xl transition-colors">
      <Container className="flex h-16 sm:h-20 items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="text-xl sm:text-2xl font-black tracking-tight text-foreground focus-ring rounded-lg shrink-0"
          aria-label={`${config.personal.fullName} home`}
        >
          {config.personal.firstName.charAt(0)}
          {config.personal.lastName.charAt(0)}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-5 lg:gap-7 lg:flex" aria-label="Main Navigation">
          {enabledNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-colors focus-ring rounded-lg px-2 py-1.5 whitespace-nowrap",
                active === item.href
                  ? "text-accent font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            as="a"
            href={config.personal.resume}
            variant="outline"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex whitespace-nowrap"
            aria-label="Download resume"
          >
            <span>Resume</span>
            <Download size={15} />
          </Button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground lg:hidden focus-ring"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-2xl lg:hidden">
          <Container className="flex flex-col gap-3 py-4">
            {enabledNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm font-semibold transition-colors py-2 border-b border-border/20 last:border-0 whitespace-nowrap",
                  active === item.href ? "text-accent font-bold" : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
            <Button
              as="a"
              href={config.personal.resume}
              variant="primary"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full sm:hidden"
            >
              <span>Download Resume</span>
              <Download size={16} />
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
