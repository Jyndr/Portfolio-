"use client";

import { Award, Flame, LineChart, ExternalLink, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionShell } from "@/components/ui/section-shell";
import { Card, Badge } from "@/components/ui/primitives";
import { Skeleton } from "@/components/ui/skeleton";
import { InteractiveHeatmap } from "@/components/common/heatmap";
import { config } from "@/lib/config";

type LeetCodeData = {
  isAvailable: boolean;
  username?: string;
  totalSolved?: number | null;
  easySolved?: number | null;
  mediumSolved?: number | null;
  hardSolved?: number | null;
  rating?: number | null;
  globalRanking?: number | null;
  contestsAttended?: number;
  badges?: Array<{ name: string; icon?: string }>;
  heatmap?: Array<{ date: string; count: number; level: number }>;
  contestHistory?: Array<{ title: string; rating: number }>;
};

export function LeetCodeSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      <div className="lg:col-span-7">
        <Skeleton className="h-[340px] w-full rounded-2xl" />
      </div>
      <div className="lg:col-span-5">
        <Skeleton className="h-[340px] w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function LeetCodeSection() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeetCodeData() {
      try {
        const res = await fetch("/api/leetcode");
        const json = await res.json();
        setData(json);
      } catch {
        setData({ isAvailable: false });
      } finally {
        setLoading(false);
      }
    }
    loadLeetCodeData();
  }, []);

  if (loading) {
    return (
      <SectionShell
        id="leetcode"
        index="04"
        label="LEETCODE JOURNEY"
        title={
          <>
            Practice Compounds. <span className="text-accent">Skill Follows.</span>
          </>
        }
        description="Problem solving consistency, contest rating, badges, and difficulty distribution."
      >
        <LeetCodeSkeleton />
      </SectionShell>
    );
  }

  const profileUrl = config.socials.leetcode.url;

  return (
    <SectionShell
      id="leetcode"
      index="04"
      label="LEETCODE JOURNEY"
      title={
        <>
          Practice Compounds. <span className="text-accent">Skill Follows.</span>
        </>
      }
      description="Problem solving consistency, contest rating, badges, and difficulty distribution."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Submission Heatmap & Problem Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Flame size={22} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Submission Heatmap</h3>
              </div>

              {profileUrl && profileUrl !== "TODO" ? (
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                >
                  <span>LeetCode Profile</span>
                  <ExternalLink size={13} />
                </a>
              ) : null}
            </div>

            <InteractiveHeatmap days={data?.heatmap || []} />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="flex flex-col p-4 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-2xl font-extrabold text-accent">
                  {data?.totalSolved ?? config.problemSolving.totalSolved ?? "N/A"}+
                </span>
                <span className="text-xs font-medium text-muted-foreground mt-0.5">Total Solved</span>
              </div>
              <div className="flex flex-col p-4 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-2xl font-extrabold text-emerald-600">
                  {data?.easySolved ?? "N/A"}
                </span>
                <span className="text-xs font-medium text-muted-foreground mt-0.5">Easy</span>
              </div>
              <div className="flex flex-col p-4 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-2xl font-extrabold text-amber-600">
                  {data?.mediumSolved ?? "N/A"}
                </span>
                <span className="text-xs font-medium text-muted-foreground mt-0.5">Medium</span>
              </div>
              <div className="flex flex-col p-4 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-2xl font-extrabold text-rose-600">
                  {data?.hardSolved ?? "N/A"}
                </span>
                <span className="text-xs font-medium text-muted-foreground mt-0.5">Hard</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Rating, Badges & Contest History */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <LineChart size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Contest Rating</h3>
                  <span className="text-2xl font-extrabold text-accent">
                    {data?.rating ?? config.problemSolving.leetcode.maxRating ?? "N/A"}
                  </span>
                </div>
              </div>
              {data?.globalRanking ? (
                <div className="text-right">
                  <span className="text-xs text-muted-foreground block font-medium">Global Rank</span>
                  <span className="text-sm font-bold text-foreground">#{data.globalRanking.toLocaleString()}</span>
                </div>
              ) : null}
            </div>

            {/* Badges */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} className="text-accent" />
                <h4 className="text-sm font-bold text-foreground">Badges</h4>
              </div>
              {data?.badges && data.badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.badges.map((b, idx) => (
                    <Badge key={idx}>{b.name}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Badges currently unavailable.</p>
              )}
            </div>

            {/* Recent Contest History */}
            {data?.contestHistory && data.contestHistory.length > 0 ? (
              <div className="pt-2 border-t border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy size={16} className="text-accent" />
                  <h4 className="text-sm font-bold text-foreground">Recent Contests</h4>
                </div>
                <div className="flex flex-col gap-2">
                  {data.contestHistory.map((c, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                      <span className="font-semibold text-foreground truncate max-w-[200px]">{c.title}</span>
                      <span className="font-bold text-accent">{c.rating} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
