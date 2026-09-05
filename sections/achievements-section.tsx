"use client";

import { Trophy, Flame, Globe, Sparkles, ArrowUpRight, Compass, Heart, Terminal } from "lucide-react";
import { config } from "@/lib/config";
import { FadeIn } from "@/components/common/motion";
import { Container } from "@/components/ui/primitives";
import { playPop, playTick } from "@/lib/sound";

export function AchievementsSection() {
  const cards = [
    {
      title: "550+ Days Streak",
      category: "DISCIPLINE",
      desc: "Daily problem-solving habit maintained across LeetCode, Codeforces, and competitive platforms.",
      icon: Flame,
      color: "bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]",
    },
    {
      title: "130+ Contests",
      category: "COMPETITIVE ARENA",
      desc: "Regular participant in global timed coding contests, reaching top global ranks on CodeChef (#398).",
      icon: Globe,
      color: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    },
    {
      title: "AI & Distributed Systems",
      category: "CURIOSITY",
      desc: "Exploring modern LLM orchestration, vector databases, event-driven architectures, and high-concurrency systems.",
      icon: Sparkles,
      color: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
    },
  ];

  return (
    <section id="achievements" className="py-24 sm:py-32 relative scroll-mt-12 bg-[#F7F7F7]">
      <Container className="px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8B69FA] font-semibold block mb-2">
              07 / BEYOND THE SCREEN
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#1C1C1C] leading-[0.95]">
              WHEN I&apos;M NOT{" "}
              <span className="font-serif italic font-normal text-[#8B69FA] lowercase">
                coding
              </span>
            </h2>
          </div>

          <span className="text-xs font-mono text-[#707070] hidden sm:block">
            Philosophy &amp; Curiosity
          </span>
        </div>

        {/* Narrative Block (Dev Ashish design) */}
        <FadeIn className="mt-8 max-w-3xl">
          <p className="text-lg sm:text-xl text-[#1C1C1C] leading-relaxed">
            I’m drawn to distributed systems architecture puzzles, real-time algorithmic showdowns, exploring cutting-edge AI agent frameworks, and collaborating with fellow builders to build products that solve real problems.
          </p>
        </FadeIn>

        {/* 3 Interactive Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <FadeIn key={card.title}>
                <div
                  onMouseEnter={() => playTick()}
                  className="p-8 rounded-[30px] bg-white border border-black/10 shadow-xs hover:shadow-md transition-all hover:scale-[1.01] flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${card.color}`}>
                        {card.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#1C1C1C] group-hover:bg-[#EDE9FE] group-hover:text-[#6D28D9] transition-colors">
                        <Icon size={16} />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-[#1C1C1C] tracking-tight group-hover:text-[#8B69FA] transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#707070] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-[#707070]">
                    <span>Continuous Growth</span>
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
