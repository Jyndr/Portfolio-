"use client";

import { useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import { config } from "@/lib/config";
import { TerminalText } from "@/components/common/terminal-text";
import { FadeIn } from "@/components/common/motion";
import { Button, Container } from "@/components/ui/primitives";

export function HeroSection() {
  const [isRevealed, setIsRevealed] = useState(false);

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
    <section id="hero" className="page-section min-h-screen flex flex-col justify-between py-12 pt-28 sm:pt-32 relative scroll-mt-0">
      {/* Top right page index */}
      <div className="absolute top-10 right-8 sm:right-14 text-right">
        <span className="text-xl font-serif font-light text-[#1A1A1A]">01</span>
        <span className="text-xs font-serif text-[#999999] block -mt-1">/ 08</span>
      </div>

      <Container className="w-full my-auto py-8 px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clean Minimal Name & Intro */}
          <FadeIn className="lg:col-span-7 flex flex-col items-start justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#1A1A1A] leading-[1.05]">
              {config.personal.firstName}<br />{config.personal.lastName}
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

          {/* Right Column: Clean Organic Blob Image Reveal */}
          <FadeIn className="lg:col-span-5 flex items-center justify-center relative">
            <div
              onMouseEnter={() => setIsRevealed(true)}
              onMouseLeave={() => setIsRevealed(false)}
              onClick={() => setIsRevealed(!isRevealed)}
              className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-84 lg:h-84 cursor-pointer group"
            >
              {/* Organic blob container */}
              <div
                className="w-full h-full bg-[#EFEFEF] overflow-hidden border border-[#E6E6E6] shadow-xs transition-all duration-700 ease-out flex items-center justify-center relative group-hover:shadow-md"
                style={{
                  borderRadius: "58% 42% 65% 35% / 45% 55% 45% 55%"
                }}
              >
                {/* Clean background when hidden */}
                <div
                  className={`absolute inset-0 bg-[#F7F7F5] transition-opacity duration-500 ${isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                />

                {/* Profile photo revealed smoothly on interaction */}
                <img
                  src={config.personal.avatar}
                  alt={config.personal.fullName}
                  className={`w-full h-full object-cover transition-all duration-700 ${isRevealed ? "opacity-100 scale-100 filter-none" : "opacity-0 scale-105 blur-sm"
                    }`}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}


