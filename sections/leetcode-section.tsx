"use client";

import { useEffect, useState } from "react";
import { Flame, CheckCircle, TrendingUp, Award, Trophy, Globe, Zap, Calendar } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { InteractiveHeatmap, HeatmapDay } from "@/components/common/heatmap";
import { config } from "@/lib/config";

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

  const formatStat = (val: number | null | undefined): string => {
    if (val === null || val === undefined || data?.isAvailable === false) {
      return "--";
    }
    return val.toLocaleString();
  };

  const stats = [
    {
      label: "Total Solved",
      value: formatStat(data?.totalSolved),
      icon: Flame,
      iconBg: "bg-emerald-500/12 text-emerald-600",
    },
    {
      label: "Easy Solved",
      value: formatStat(data?.easySolved),
      icon: CheckCircle,
      iconBg: "bg-green-500/12 text-green-600",
    },
    {
      label: "Medium Solved",
      value: formatStat(data?.mediumSolved),
      icon: TrendingUp,
      iconBg: "bg-amber-500/12 text-amber-600",
    },
    {
      label: "Hard Solved",
      value: formatStat(data?.hardSolved),
      icon: Award,
      iconBg: "bg-rose-500/12 text-rose-600",
    },
    {
      label: "Contest Rating",
      value: formatStat(data?.contestRating ?? data?.rating),
      icon: Trophy,
      iconBg: "bg-orange-500/12 text-orange-600",
    },
    {
      label: "Global Rank",
      value: formatStat(data?.globalRanking),
      icon: Globe,
      iconBg: "bg-sky-500/12 text-sky-600",
    },
    {
      label: "Current Streak",
      value: data?.streak !== null && data?.streak !== undefined && data?.isAvailable ? `${data.streak} Days` : "--",
      icon: Zap,
      iconBg: "bg-emerald-500/12 text-emerald-600",
    },
    {
      label: "Active Days",
      value: formatStat(data?.totalActiveDays),
      icon: Calendar,
      iconBg: "bg-teal-500/12 text-teal-600",
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
        {/* Top 8 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3.5 p-4 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg} shrink-0`}>
                  <Icon size={19} />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-serif font-extrabold text-[#1A1A1A] block">
                    {item.value}
                  </span>
                  <span className="text-xs font-medium text-[#666666] block">{item.label}</span>
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
          <InteractiveHeatmap data={data?.heatmap || []} variant="leetcode" />
        </div>
      </div>
    </SectionShell>
  );
}
