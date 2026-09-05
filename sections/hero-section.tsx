"use client";

import Image from "next/image";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { config } from "@/lib/config";
import { TerminalText } from "@/components/common/terminal-text";
import { FadeIn } from "@/components/common/motion";
import { Button, Container } from "@/components/ui/primitives";
import { RubiksCube } from "@/components/common/rubiks-cube";
import { playPop, playTick } from "@/lib/sound";

export function HeroSection() {
  const typingItems = [
    "System Design",
    "Backend Development",
    "Distributed Systems",
    "AI Engineering",
    "High-Throughput APIs",
    "Competitive Programming",
  ];

  return (
    <section
      id="hero"
      className="page-section min-h-screen flex flex-col justify-between py-12 pt-28 sm:pt-32 relative scroll-mt-0 overflow-hidden bg-[#F7F7F7]"
    >
      {/* Top right section index */}
      <div className="absolute top-8 right-6 sm:right-12 text-right z-30">
        <span className="text-xl font-mono font-medium text-[#1C1C1C]">01</span>
        <span className="text-xs font-mono text-[#999999] block -mt-1">/ 08</span>
      </div>

      <Container className="w-full my-auto py-6 px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Massive Headline & Story Bio */}
          <FadeIn className="flex flex-col items-start justify-center lg:col-span-7">
            {/* Dev Ashish Dewangan's iconic giant display headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight text-[#1C1C1C] leading-[0.95] uppercase select-none">
              SOLVING{" "}
              <span className="font-serif italic font-normal text-[#8B69FA] lowercase">
                systems
              </span>
              <br />
              PROBLEMS
            </h1>

            {/* Profile Avatar & Bio Card (exact Dev Ashish hero format) */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-2xl">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#1C1C1C] bg-[#E8E5F8] flex-shrink-0 shadow-sm">
                <Image
                  src="/assets/profile/hero.png"
                  alt={config.personal.fullName}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex-1">
                <p className="text-sm sm:text-base text-[#1C1C1C] font-normal leading-relaxed">
                  Hi! I&apos;m <strong className="font-bold text-[#1C1C1C]">{config.personal.fullName}</strong>, a{" "}
                  <span className="font-semibold text-[#8B69FA]">{config.personal.role}</span> from India, transforming complex backend architectures into clean, intuitive, high-performance systems that just make sense.
                </p>
              </div>
            </div>

            {/* Terminal typed highlights */}
            <div className="mt-5 w-full max-w-md">
              <TerminalText items={typingItems} />
            </div>

            {/* Action Buttons & Status Badge */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button
                as="a"
                href="#projects"
                variant="primary"
                size="lg"
                onClick={() => playPop()}
                onMouseEnter={() => playTick()}
                className="rounded-full px-6 py-3 bg-[#1C1C1C] hover:bg-black text-white font-medium text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight size={15} />
              </Button>

              <Button
                as="a"
                href={config.personal.resume}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playPop()}
                onMouseEnter={() => playTick()}
                className="rounded-full px-6 py-3 bg-white/90 hover:bg-white text-[#1C1C1C] border border-black/15 font-medium text-xs sm:text-sm shadow-xs transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Download CV</span>
                <Download size={15} />
              </Button>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full tag-badge-green text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                <span>Available for Full-time Roles</span>
              </span>
            </div>
          </FadeIn>

          {/* Right Column: Interactive 3D Rubik's Cube */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:justify-end mt-4 lg:mt-0 relative">
            <div className="relative">
              {/* Dev Ashish style "👋 Drag me!" badge */}
              <div className="absolute -top-4 right-4 z-30 px-3 py-1 rounded-full bg-white/95 border border-black/10 shadow-sm text-[11px] font-mono font-semibold text-[#1C1C1C] flex items-center gap-1 pointer-events-none">
                <span>👋 Drag me!</span>
              </div>

              {/* The Working 3D Rubik's Cube */}
              <RubiksCube />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
