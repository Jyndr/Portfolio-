"use client";

import { useEffect, useState } from "react";
import { GitBranch, Star, Users, FolderGit2 } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { InteractiveHeatmap } from "@/components/common/heatmap";
import { config } from "@/lib/config";

type GitHubData = {
  isAvailable: boolean;
  repositories?: number;
  followers?: number;
  following?: number;
  stars?: number;
  pinnedRepos?: Array<{ name: string; description: string; url: string; stars: number; language: string }>;
  heatmap?: Array<{ date: string; count: number; level: number }>;
};

export function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    async function loadGitHubData() {
      try {
        const username = config.github.username;
        const res = await fetch(`/api/github?username=${username}`);
        const json = await res.json();
        setData(json);
      } catch {
        setData({ isAvailable: false });
      }
    }
    loadGitHubData();
  }, []);

  const stats = [
    {
      label: "Repositories",
      value: data?.repositories ?? 52,
      icon: GitBranch,
    },
    {
      label: "Followers",
      value: data?.followers ?? 320,
      icon: Users,
    },
    {
      label: "Following",
      value: data?.following ?? 180,
      icon: Users,
    },
    {
      label: "Total Stars",
      value: data?.stars ? `${data.stars}` : "9.2k",
      icon: Star,
    },
  ];

  const pinned = data?.pinnedRepos && data.pinnedRepos.length > 0
    ? data.pinnedRepos
    : [
      {
        name: "AI-Chat-Platform",
        description: "Full-stack AI chat application",
        url: config.socials.github.url,
        stars: 120,
        language: "TypeScript",
      },
      {
        name: "SIH-20249",
        description: "Government project for SIH 2024.",
        url: config.socials.github.url,
        stars: 85,
        language: "JavaScript",
      },
      {
        name: "Portfolio",
        description: "My personal portfolio website",
        url: config.socials.github.url,
        stars: 42,
        language: "TypeScript",
      },
    ];

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

        {/* Contribution Heatmap Container */}
        <div className="p-6 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
              Contribution Heatmap
            </h4>
            <a
              href={config.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#1A1A1A] hover:underline"
            >
              GitHub Profile ↗
            </a>
          </div>
          <InteractiveHeatmap data={data?.heatmap || []} />
        </div>

        {/* Pinned Repositories Row */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3">
            Pinned Repositories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pinned.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between p-4 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FolderGit2 size={16} className="text-[#1A1A1A]" />
                    <span className="text-xs font-bold text-[#1A1A1A] truncate">{repo.name}</span>
                  </div>
                  <p className="text-xs text-[#666666] line-clamp-2">{repo.description}</p>
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
      </div>
    </SectionShell>
  );
}
