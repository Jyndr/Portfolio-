"use client";

import { useEffect, useState } from "react";
import { Flame, CheckCircle, TrendingUp, Award, Trophy, Globe, Zap, ArrowUpRight } from "lucide-react";
import { InteractiveHeatmap, HeatmapDay } from "@/components/common/heatmap";
import { config } from "@/lib/config";
import { FadeIn } from "@/components/common/motion";
import { Container } from "@/components/ui/primitives";
import { playPop, playTick } from "@/lib/sound";

type LeetCodeData = {
  isAvailable: boolean;
  totalSolved?: number | null;
  easySolved?: number | null;
  mediumSolved?: number | null;
  hardSolved?: number | null;
  contestRating?: number | null;
  rating?: number | null;
  globalRanking?: number | null;
  streak?: number | null;
  totalActiveDays?: number | null;
  heatmap?: HeatmapDay[];
};

export function LeetCodeSection() {
  const [data, setData] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    async function loadLeetCodeData() {
      try {
        const res = await fetch("/api/leetcode");
        if (!res.ok) {
          setData({ isAvailable: false });
          return;
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("[LeetCode Section] Error fetching LeetCode data:", err);
        setData({ isAvailable: false });
      }
    }
    loadLeetCodeData();
  }, []);

  const totalSolved = data?.totalSolved ?? config.problemSolving.totalSolved;
  const contestRating = data?.contestRating ?? config.problemSolving.leetcode.maxRating;

  return (
    <section id="leetcode" className="py-24 sm:py-32 relative scroll-mt-12 bg-[#F7F7F7]">
      <Container className="px-6 sm:px-10 lg:px-14">
        {/* Section Header with Dev Ashish typography */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8B69FA] font-semibold block mb-2">
              04 / PROBLEM SOLVING
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#1C1C1C] leading-[0.95]">
              CODE{" "}
              <span className="font-serif italic font-normal text-[#8B69FA] lowercase">
                metrics
              </span>
            </h2>
          </div>

          <a
            href={config.socials.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playPop()}
            onMouseEnter={() => playTick()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-black/10 shadow-xs hover:shadow-sm text-xs font-mono font-semibold text-[#1C1C1C] hover:text-[#8B69FA] transition-all"
          >
            <span>LeetCode Profile</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Story Intro */}
        <FadeIn className="mt-8 max-w-3xl">
          <p className="text-base sm:text-lg text-[#707070] leading-relaxed">
            Consistent competitive programming practice sharpens system design instincts. Tracking problem-solving velocity, contest ratings, and daily coding heatmaps across platforms.
          </p>
        </FadeIn>

        {/* Platform Overview Cards (LeetCode, Codeforces, CodeChef) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LeetCode Card */}
          <FadeIn className="p-7 rounded-[28px] bg-white border border-black/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA]">
                  LEETCODE
                </span>
                <Trophy size={16} className="text-[#EA580C]" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-[#1C1C1C] tracking-tight block">
                {totalSolved}+
              </span>
              <span className="text-xs font-mono text-[#707070] mt-0.5 block">Problems Solved</span>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
              <span className="text-[#707070]">Contest Rating</span>
              <span className="font-bold text-[#1C1C1C]">{contestRating}</span>
            </div>
          </FadeIn>

          {/* Codeforces Card */}
          <FadeIn className="p-7 rounded-[28px] bg-white border border-black/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                  CODEFORCES
                </span>
                <Globe size={16} className="text-[#2563EB]" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-[#1C1C1C] tracking-tight block">
                {config.problemSolving.codeforces.rank}
              </span>
              <span className="text-xs font-mono text-[#707070] mt-0.5 block">
                Rating: {config.problemSolving.codeforces.maxRating}
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
              <span className="text-[#707070]">Handle</span>
              <span className="font-bold text-[#1C1C1C]">Jat1nX</span>
            </div>
          </FadeIn>

          {/* CodeChef Card */}
          <FadeIn className="p-7 rounded-[28px] bg-white border border-black/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]">
                  CODECHEF
                </span>
                <Award size={16} className="text-[#7C3AED]" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-[#1C1C1C] tracking-tight block">
                {config.problemSolving.codechef.maxRating}
              </span>
              <span className="text-xs font-mono text-[#707070] mt-0.5 block">Max Contest Rating</span>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
              <span className="text-[#707070]">Global Rank</span>
              <span className="font-bold text-[#1C1C1C]">#{config.problemSolving.codechef.bestGlobalRank}</span>
            </div>
          </FadeIn>
        </div>

        {/* Heatmap Card (Dev Ashish clean container style) */}
        <FadeIn className="mt-8 p-7 sm:p-9 rounded-[32px] bg-white border border-black/10 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8B69FA] font-bold block">
                DAILY CODING LOG
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1C1C1C] mt-0.5">
                LeetCode Submissions &amp; Activity
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-xs font-mono text-[#707070] hidden sm:inline">Active</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <InteractiveHeatmap
              data={data?.heatmap}
              variant="leetcode"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
