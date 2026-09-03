"use client";

import { Activity, BarChart3, ExternalLink, GitBranch, Github, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionShell } from "@/components/ui/section-shell";
import { Card, Badge } from "@/components/ui/primitives";
import { Skeleton } from "@/components/ui/skeleton";
import { InteractiveHeatmap } from "@/components/common/heatmap";
import { config } from "@/lib/config";

type GitHubData = {
  isAvailable: boolean;
  profile?: string;
  repositories?: number;
  followers?: number;
  following?: number;
  stars?: number;
  totalContributions?: number | null;
  languages?: Array<{ name: string; percentage: number; color: string }>;
  pinnedRepos?: Array<{ name: string; description: string; url: string; stars: number; language: string }>;
  recentActivity?: Array<{ title: string; subtitle: string; time: string }>;
  heatmap?: Array<{ date: string; count: number; level: number }>;
};

export function GitHubSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <Skeleton className="h-[340px] w-full rounded-2xl" />
      </div>
      <div className="lg:col-span-5 flex flex-col gap-6">
        <Skeleton className="h-[160px] w-full rounded-2xl" />
        <Skeleton className="h-[160px] w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGitHubData() {
      try {
        const username = config.github.username;
        const res = await fetch(`/api/github?username=${username}`);
        const json = await res.json();
        setData(json);
      } catch {
        setData({ isAvailable: false });
      } finally {
        setLoading(false);
      }
    }
    loadGitHubData();
  }, []);

  if (loading) {
    return (
      <SectionShell
        id="github"
        index="05"
        label="GIT &amp; CONTRIBUTIONS"
        title={
          <>
            Consistent Effort. <span className="text-accent">Visible Impact.</span>
          </>
        }
        description="Live GitHub activity, repositories, language distribution, and public events."
      >
        <GitHubSkeleton />
      </SectionShell>
    );
  }

  const stats: Array<{ label: string; value: string | number; Icon: LucideIcon }> = [
    { label: "Repositories", value: data?.repositories ?? "N/A", Icon: GitBranch },
    { label: "Stars", value: data?.stars ?? "N/A", Icon: Star },
    { label: "Followers", value: data?.followers ?? "N/A", Icon: Activity },
    { label: "Contributions", value: data?.totalContributions ?? "N/A", Icon: BarChart3 },
  ];

  return (
    <SectionShell
      id="github"
      index="05"
      label="GIT &amp; CONTRIBUTIONS"
      title={
        <>
          Consistent Effort. <span className="text-accent">Visible Impact.</span>
        </>
      }
      description="Live GitHub activity, repositories, language distribution, and public events."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Main Column: Heatmap & Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Github size={22} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Contribution Heatmap</h3>
              </div>
              <a
                href={data?.profile || config.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
              >
                <span>GitHub Profile</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <InteractiveHeatmap days={data?.heatmap || []} />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {stats.map(({ label, value, Icon }) => (
                <div key={label} className="flex flex-col p-4 rounded-xl bg-muted/40 border border-border/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent mb-2">
                    <Icon size={16} />
                  </div>
                  <span className="text-2xl font-extrabold text-accent">{value}</span>
                  <span className="text-xs font-medium text-muted-foreground mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pinned Repositories */}
          {data?.pinnedRepos && data.pinnedRepos.length > 0 ? (
            <Card className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-foreground">Pinned &amp; Top Repositories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.pinnedRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-muted/20 hover:border-accent/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-foreground text-sm truncate">{repo.name}</span>
                        <ExternalLink size={12} className="text-muted-foreground shrink-0" />
                      </div>
                      {repo.description ? (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{repo.description}</p>
                      ) : null}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      {repo.language ? <span className="font-semibold text-accent">{repo.language}</span> : <span />}
                      <span className="flex items-center gap-1"><Star size={12} />{repo.stars}</span>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          ) : null}
        </div>

        {/* Side Column: Languages & Recent Activity */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-foreground">Top Languages</h3>
            {data?.languages && data.languages.length > 0 ? (
              <div className="flex flex-col gap-3">
                {data.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span className="font-semibold text-foreground">{lang.name}</span>
                    </div>
                    <span className="font-bold text-muted-foreground">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Language data currently unavailable.</p>
            )}
          </Card>

          <Card className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
            {data?.recentActivity && data.recentActivity.length > 0 ? (
              <div className="flex flex-col gap-3">
                {data.recentActivity.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-2 border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">{item.subtitle}</p>
                    </div>
                    <Badge>{item.time}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Recent activity currently unavailable.</p>
            )}
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
