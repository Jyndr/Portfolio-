import { config } from "@/lib/config";

export type GitHubOverview = {
  repositories: number | null;
  followers: number | null;
  following: number | null;
  totalContributions: number | null;
  languages: Array<{ name: string; percentage: number; color: string }>;
  recentActivity: Array<{ title: string; subtitle: string; time: string }>;
  heatmap: number[];
  isAvailable: boolean;
};

export class GitHubService {
  async getOverview(): Promise<GitHubOverview> {
    const username = config.github.username;

    if (!username || username === "TODO") {
      return this.getUnavailableState();
    }

    try {
      const [userResponse, reposResponse, eventsResponse, contribResponse] = await Promise.allSettled([
        fetch(`https://api.github.com/users/${username}`, {
          headers: { "User-Agent": "PortfolioApp" },
        }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
          headers: { "User-Agent": "PortfolioApp" },
        }),
        fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
          headers: { "User-Agent": "PortfolioApp" },
        }),
        fetch(`https://github-contributions-api.deno.dev/${username}.json`),
      ]);

      const userData =
        userResponse.status === "fulfilled" && userResponse.value.ok
          ? await userResponse.value.json()
          : null;

      const reposData =
        reposResponse.status === "fulfilled" && reposResponse.value.ok
          ? ((await reposResponse.value.json()) as Array<{ language: string | null }>)
          : null;

      const eventsData =
        eventsResponse.status === "fulfilled" && eventsResponse.value.ok
          ? ((await eventsResponse.value.json()) as Array<{ type: string; repo?: { name: string }; created_at: string }>)
          : [];

      const contribData =
        contribResponse.status === "fulfilled" && contribResponse.value.ok
          ? await contribResponse.value.json()
          : null;

      if (!userData && !reposData) {
        return this.getUnavailableState();
      }

      const languageCounts: Record<string, number> = {};
      if (reposData) {
        for (const repo of reposData) {
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] ?? 0) + 1;
          }
        }
      }

      const totalLangRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0);
      const languages = Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count], idx) => ({
          name,
          percentage: totalLangRepos > 0 ? Math.round((count / totalLangRepos) * 100) : 0,
          color: ["#5B5CF6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][idx] ?? "#64748B",
        }));

      const recentActivity = eventsData.slice(0, 5).map((event) => ({
        title: event.type.replace("Event", ""),
        subtitle: event.repo?.name ?? username,
        time: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
          new Date(event.created_at)
        ),
      }));

      let heatmap: number[] = [];
      let totalContributions: number | null = null;

      if (contribData && Array.isArray(contribData.contributions)) {
        totalContributions = contribData.totalContributions ?? null;
        heatmap = contribData.contributions.flatMap((day: { intensity?: number; count?: number }) => {
          if (typeof day.intensity === "number") return [day.intensity];
          if (typeof day.count === "number") return [day.count > 10 ? 4 : day.count > 5 ? 3 : day.count > 2 ? 2 : day.count > 0 ? 1 : 0];
          return [0];
        });
      }

      return {
        repositories: userData?.public_repos ?? reposData?.length ?? null,
        followers: userData?.followers ?? null,
        following: userData?.following ?? null,
        totalContributions,
        languages,
        recentActivity,
        heatmap,
        isAvailable: true,
      };
    } catch {
      return this.getUnavailableState();
    }
  }

  getUnavailableState(): GitHubOverview {
    return {
      repositories: null,
      followers: null,
      following: null,
      totalContributions: null,
      languages: [],
      recentActivity: [],
      heatmap: [],
      isAvailable: false,
    };
  }
}
