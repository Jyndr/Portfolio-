"use client";

import { ArrowRight, Download } from "lucide-react";
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
      className="page-section min-h-screen flex flex-col justify-between py-12 pt-28 sm:pt-32 relative scroll-mt-0"
    >
      {/* Top right page index */}
      <div className="absolute top-10 right-8 sm:right-14 text-right z-10">
        <span className="text-xl font-serif font-light text-[#1A1A1A]">01</span>
        <span className="text-xs font-serif text-[#999999] block -mt-1">/ 08</span>
      </div>

      <Container className="w-full my-auto py-8 px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Minimal Name & Intro (100% Original Jayendra Patel Content & Typography) */}
          <FadeIn className="flex flex-col items-start justify-center lg:col-span-6 xl:col-span-7">
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

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as="a" href={config.hero.primaryButton.link} variant="primary" size="lg">
                <span>View Projects</span>
                <ArrowRight size={15} />
              </Button>
              <Button
                as="a"
                href={config.hero.secondaryButton.link}
                variant="outline"
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
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center justify-center relative w-full min-h-[380px]">
            {/* The anchor target measured dynamically by RubiksMotionSystem */}
            <div
              id="hero-cube-anchor"
              className="w-[300px] h-[300px] flex items-center justify-center relative pointer-events-none"
            >
              {/* "👋 Drag me!" badge */}
              <div className="absolute -top-4 right-4 z-30 px-3 py-1 rounded-full bg-white/95 border border-black/10 shadow-sm text-[11px] font-mono font-semibold text-[#1A1A1A] flex items-center gap-1.5 pointer-events-none">
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
