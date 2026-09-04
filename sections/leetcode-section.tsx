"use client";

import { Flame, Star, Award, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionShell } from "@/components/ui/section-shell";
import { InteractiveHeatmap } from "@/components/common/heatmap";
import { config } from "@/lib/config";

type LeetCodeData = {
  isAvailable: boolean;
  totalSolved?: number | null;
  streak?: number | null;
  rating?: number | null;
  globalRanking?: number | null;
  heatmap?: Array<{ date: string; count: number; level: number }>;
};

export function LeetCodeSection() {
  const [data, setData] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    async function loadLeetCodeData() {
      try {
        const res = await fetch("/api/leetcode");
        const json = await res.json();
        setData(json);
      } catch {
        setData({ isAvailable: false });
      }
    }
    loadLeetCodeData();
  }, []);

  const stats = [
    {
      label: "Problems Solved",
      value: data?.totalSolved ? `${data.totalSolved}+` : "520+",
      icon: Flame,
    },
    {
      label: "Day Streak",
      value: data?.streak ? `${data.streak}` : "180",
      icon: TrendingUp,
    },
    {
      label: "Contest Rating",
      value: data?.rating ? `${data.rating}+` : "1,800+",
      icon: Award,
    },
    {
      label: "Global Rank",
      value: data?.globalRanking ? `Top ${data.globalRanking}%` : "Top 15%",
      icon: Star,
    },
  ];

  return (
    <SectionShell
      id="leetcode"
      index="06"
      label="PROBLEM SOLVING"
      title="LeetCode"
      description="Consistent practice. Steady progress."
      quote="One problem at a time."
    >
      <div className="flex flex-col gap-6">
        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3.5 p-4 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7F7F5] text-[#1A1A1A] shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A] block">
                    {item.value}
                  </span>
                  <span className="text-xs text-[#666666] block">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contribution Heatmap Dashboard Card */}
        <div className="p-6 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
              Problem Solving Activity
            </h4>
            <a
              href={config.socials.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#1A1A1A] hover:underline"
            >
              View Profile ↗
            </a>
          </div>
          <InteractiveHeatmap data={data?.heatmap || []} />
        </div>
      </div>
    </SectionShell>
  );
}

