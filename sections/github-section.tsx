"use client";

import { useEffect, useState } from "react";
import { GitBranch, Star, Users, FolderGit2, GitCommit } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { InteractiveHeatmap, HeatmapDay } from "@/components/common/heatmap";
import { config } from "@/lib/config";

type GitHubPinnedRepo = {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
};

type GitHubData = {
  isAvailable: boolean;
  totalContributions?: number | null;
  repositories?: number | null;
  followers?: number | null;
  following?: number | null;
  totalStars?: number | null;
  pinnedRepositories?: GitHubPinnedRepo[];
  pinnedRepos?: GitHubPinnedRepo[];
  contributionCalendar?: HeatmapDay[];
  heatmap?: HeatmapDay[];
};

export function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    async function loadGitHubData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) {
          setData({ isAvailable: false });
          return;
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("[GitHub Section] Error fetching GitHub data:", err);
        setData({ isAvailable: false });
      }
    }
    loadGitHubData();
  }, []);

  const formatStat = (val: number | null | undefined): string => {
    if (val === null || val === undefined || data?.isAvailable === false) {
      return "--";
    }
    return val.toLocaleString();
  };

  const stats = [
    {
      label: "Total Contributions",
      value: formatStat(data?.totalContributions),
      icon: GitCommit,
      iconBg: "bg-emerald-500/12 text-emerald-600",
    },
    {
      label: "Repositories",
      value: formatStat(data?.repositories),
      icon: GitBranch,
      iconBg: "bg-emerald-500/12 text-emerald-600",
    },
    {
      label: "Total Stars",
      value: formatStat(data?.totalStars),
      icon: Star,
      iconBg: "bg-amber-500/12 text-amber-600",
    },
    {
      label: "Followers",
      value: formatStat(data?.followers),
      icon: Users,
      iconBg: "bg-blue-500/12 text-blue-600",
    },
  ];

  const pinnedList = data?.pinnedRepositories ?? data?.pinnedRepos ?? [];
  const totalContributionsText = data?.totalContributions !== null && data?.totalContributions !== undefined && data?.isAvailable
    ? `${data.totalContributions.toLocaleString()} contributions in the last year`
    : "Contributions in the last year";

  return (
    <SectionShell
      id="github"
      index="07"
      label="OPEN SOURCE"
      title="GitHub"
      description="Building in public."
      quote="Code. Commit. Grow."
    >
      <div className="flex flex-col gap-6">
        {/* Top 4 Stat Cards - Uniform Design */}
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

        {/* Contribution Heatmap Container */}
        <div className="p-6 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-1">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Contribution Heatmap
              </h4>
              <p className="text-sm font-bold text-[#16a34a] mt-0.5">
                {totalContributionsText}
              </p>
            </div>
            <a
              href={config.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#1A1A1A] hover:underline shrink-0"
            >
              GitHub Profile ↗
            </a>
          </div>
          <InteractiveHeatmap data={data?.contributionCalendar ?? data?.heatmap ?? []} variant="github" />
        </div>

        {/* Pinned Repositories Row */}
        {pinnedList.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3">
              Pinned Repositories
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pinnedList.slice(0, 3).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-between p-4 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] hover:-translate-y-1 hover:shadow-md transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FolderGit2 size={16} className="text-[#1A1A1A]" />
                      <span className="text-xs font-bold text-[#1A1A1A] truncate">{repo.name}</span>
                    </div>
                    <p className="text-xs text-[#666666] line-clamp-2">{repo.description || "No description provided."}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#666666]">
                    <span className="flex items-center gap-1 font-mono">
                      <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Star size={12} />
                      {repo.stars}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
