"use client";

import { Download } from "lucide-react";
import { config } from "@/lib/config";
import { TerminalText } from "@/components/common/terminal-text";
import { FadeIn } from "@/components/common/motion";
import { Button, Container } from "@/components/ui/primitives";

export function HeroSection() {
  const typingItems = [
    "System Design",
    "Backend Development",
    "Distributed Systems",
    "AI Engineering",
    "DevOps",
    "REST APIs",
    "Problem Solving",
  ];

  return (
    <section
      id="hero"
      className="page-section min-h-screen flex flex-col justify-start pt-20 sm:pt-24 lg:pt-28 pb-12 relative scroll-mt-0"
    >
      <Container className="w-full px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Minimal Name & Intro */}
          <FadeIn className="flex flex-col items-start justify-start lg:col-span-6 xl:col-span-7 pt-2 lg:pt-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#1A1A1A] leading-[1.05]">
              {config.personal.firstName}
              <br />
              {config.personal.lastName}
            </h1>
            <p className="mt-3 text-xs sm:text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
              {config.personal.role}
            </p>

            <div className="mt-4 w-full max-w-md">
              <TerminalText items={typingItems} />
            </div>

            <div className="mt-8 flex items-center">
              <Button
                as="a"
                href={config.hero.secondaryButton.link}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download Resume</span>
                <Download size={15} />
              </Button>
            </div>
          </FadeIn>

          {/* Right Column: 3D Rubik's Cube Centerpiece Anchor */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center lg:items-end justify-center lg:justify-end relative w-full min-h-[380px] lg:min-h-[440px] pt-8 lg:pt-12">
            {/* The anchor target measured dynamically by RubiksMotionSystem */}
            <div
              id="hero-cube-anchor"
              className="w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] flex items-center justify-center relative pointer-events-none lg:translate-x-6 lg:translate-y-8"
            >
              {/* "👋 Drag me!" badge */}
              <div className="absolute top-2 right-4 sm:right-8 z-30 px-3 py-1 rounded-full bg-white/95 border border-black/10 shadow-sm text-[11px] font-mono font-semibold text-[#1A1A1A] flex items-center gap-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>👋 Drag me!</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
