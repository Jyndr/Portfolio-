import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function GET() {
  const username = config.github.username;
  if (!username || username === "TODO") {
    return NextResponse.json({
      isAvailable: false,
      error: "GitHub username is set to TODO in portfolio.config.ts.",
    }, { status: 400 });
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { "User-Agent": "PortfolioApp" },
      next: { revalidate: 3600 },
    });

    if (!userRes.ok) {
      const errorText = await userRes.text();
      return NextResponse.json({
        isAvailable: false,
        error: `GitHub API HTTP ${userRes.status}: ${userRes.statusText || errorText}`,
      }, { status: userRes.status });
    }

    const [reposRes, eventsRes, contribRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: { "User-Agent": "PortfolioApp" },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
        headers: { "User-Agent": "PortfolioApp" },
        next: { revalidate: 900 },
      }),
      fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const userData = await userRes.json();
    const reposData = reposRes.status === "fulfilled" && reposRes.value.ok ? await reposRes.value.json() : [];
    const eventsData = eventsRes.status === "fulfilled" && eventsRes.value.ok ? await eventsRes.value.json() : [];
    const contribData = contribRes.status === "fulfilled" && contribRes.value.ok ? await contribRes.value.json() : null;

    const languageCounts: Record<string, number> = {};
    let totalStars = 0;

    for (const repo of reposData) {
      if (repo.stargazers_count) totalStars += repo.stargazers_count;
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] ?? 0) + 1;
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

    const pinnedRepos = reposData.slice(0, 4).map((repo: { name: string; description: string; html_url: string; stargazers_count: number; language: string }) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count ?? 0,
      language: repo.language,
    }));

    const recentActivity = eventsData.slice(0, 5).map((event: { type: string; repo?: { name: string }; created_at: string }) => ({
      title: event.type.replace("Event", ""),
      subtitle: event.repo?.name ?? username,
      time: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(event.created_at)),
    }));

    let heatmap: Array<{ date: string; count: number; level: number }> = [];
    if (contribData && Array.isArray(contribData.contributions)) {
      heatmap = contribData.contributions.map((day: { date?: string; count?: number; intensity?: number }) => {
        const count = day.count ?? day.intensity ?? 0;
        const level = typeof day.intensity === "number" ? day.intensity : count > 10 ? 4 : count > 5 ? 3 : count > 2 ? 2 : count > 0 ? 1 : 0;
        return {
          date: day.date ?? "Contribution day",
          count,
          level,
        };
      });
    }

    return NextResponse.json({
      isAvailable: true,
      profile: userData?.html_url ?? `https://github.com/${username}`,
      repositories: userData?.public_repos ?? reposData.length,
      followers: userData?.followers ?? 0,
      following: userData?.following ?? 0,
      stars: totalStars,
      totalContributions: contribData?.totalContributions ?? null,
      languages,
      pinnedRepos,
      recentActivity,
      heatmap,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      isAvailable: false,
      error: `GitHub API network request failed: ${errorMsg}`,
    }, { status: 500 });
  }
}
