"use client";

import { useEffect, useState } from "react";
import { GitBranch, Star, Users, GitCommit, ArrowUpRight, FolderGit2 } from "lucide-react";
import { InteractiveHeatmap, HeatmapDay } from "@/components/common/heatmap";
import { config } from "@/lib/config";
import { FadeIn } from "@/components/common/motion";
import { Container } from "@/components/ui/primitives";
import { playPop, playTick } from "@/lib/sound";

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
    },
    {
      label: "Repositories",
      value: formatStat(data?.repositories),
      icon: GitBranch,
    },
    {
      label: "Total Stars",
      value: formatStat(data?.totalStars),
      icon: Star,
    },
    {
      label: "Followers",
      value: formatStat(data?.followers),
      icon: Users,
    },
  ];

  const pinnedList = data?.pinnedRepositories ?? data?.pinnedRepos ?? [];

  return (
    <section id="github" className="py-24 sm:py-32 relative scroll-mt-12 bg-[#F7F7F7]">
      <Container className="px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8B69FA] font-semibold block mb-2">
              05 / OPEN SOURCE
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#1C1C1C] leading-[0.95]">
              GITHUB{" "}
              <span className="font-serif italic font-normal text-[#8B69FA] lowercase">
                activity
              </span>
            </h2>
          </div>

          <a
            href={config.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playPop()}
            onMouseEnter={() => playTick()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-black/10 shadow-xs hover:shadow-sm text-xs font-mono font-semibold text-[#1C1C1C] hover:text-[#8B69FA] transition-all"
          >
            <span>GitHub Profile</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.label}>
                <div
                  onMouseEnter={() => playTick()}
                  className="p-6 rounded-[24px] bg-white border border-black/10 shadow-xs hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#F7F7F7] text-[#1C1C1C] flex items-center justify-center mb-4">
                    <Icon size={16} />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#1C1C1C] tracking-tight block">
                    {item.value}
                  </span>
                  <span className="text-xs font-mono text-[#707070] mt-1 block">
                    {item.label}
                  </span>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Contribution Calendar Heatmap Card */}
        <FadeIn className="mt-8 p-7 sm:p-9 rounded-[32px] bg-white border border-black/10 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8B69FA] font-bold block">
                ANNUAL COMMIT CALENDAR
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1C1C1C] mt-0.5">
                Public Contributions &amp; Commits
              </h3>
            </div>
            <span className="text-xs font-mono text-[#707070] hidden sm:inline">
              @{config.socials.github.username}
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <InteractiveHeatmap
              data={data?.heatmap ?? data?.contributionCalendar}
              variant="github"
            />
          </div>
        </FadeIn>

        {/* Pinned Repositories Grid (if available) */}
        {pinnedList.length > 0 && (
          <div className="mt-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8B69FA] font-bold block mb-4">
              PINNED REPOSITORIES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedList.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playPop()}
                  onMouseEnter={() => playTick()}
                  className="p-5 rounded-[22px] bg-white border border-black/10 shadow-xs hover:shadow-md transition-all hover:scale-[1.01] flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-[#1C1C1C] group-hover:text-[#8B69FA] transition-colors">
                        <FolderGit2 size={15} />
                        <span>{repo.name}</span>
                      </div>
                      <ArrowUpRight size={13} className="text-[#707070] group-hover:text-[#8B69FA] transition-colors" />
                    </div>
                    <p className="text-xs text-[#707070] line-clamp-2 leading-relaxed">
                      {repo.description || "Open source project on GitHub."}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-[#707070]">
                    <span>{repo.language}</span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span>{repo.stars}</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
