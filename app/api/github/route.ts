import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubLanguage {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubPinnedRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
}

export interface GitHubResponseData {
  isAvailable: boolean;
  totalContributions?: number | null;
  followers?: number | null;
  following?: number | null;
  repositories?: number | null;
  totalStars?: number | null;
  languages?: GitHubLanguage[];
  pinnedRepositories?: GitHubPinnedRepo[];
  pinnedRepos?: GitHubPinnedRepo[];
  contributionCalendar?: GitHubContributionDay[];
  heatmap?: GitHubContributionDay[];
  error?: string;
  details?: unknown;
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME || config.github.username;
  const token = process.env.GITHUB_TOKEN;

  if (!username || username === "TODO") {
    console.error("[GitHub API] Error: Username not configured.");
    return NextResponse.json<GitHubResponseData>(
      {
        isAvailable: false,
        error: "GitHub username is not configured.",
      },
      { status: 400 }
    );
  }

  const headers: Record<string, string> = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const query = `
    query getGitHubData($username: String!) {
      user(login: $username) {
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          totalCount
          nodes {
            name
            stargazerCount
            primaryLanguage {
              name
              color
            }
          }
        }
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              primaryLanguage {
                name
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  let res: Response;
  try {
    res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });
  } catch (error: unknown) {
    const err = error as Error & { cause?: unknown };
    console.error("GitHub fetch error:", err);
    console.error("Cause:", err.cause);
    console.error("Stack:", err.stack);
    return await fetchFallbackGitHubData(username, headers, err);
  }

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unable to read error text");
    console.error(`[GitHub API] HTTP Error ${res.status}: ${errorText}`);
    return await fetchFallbackGitHubData(username, headers, new Error(`GitHub GraphQL HTTP ${res.status}: ${errorText}`));
  }

  let json: { data?: { user?: Record<string, unknown> }; errors?: Array<{ message: string }> };
  try {
    json = await res.json();
  } catch (error: unknown) {
    const err = error as Error & { cause?: unknown };
    console.error("GitHub JSON parse error:", err);
    console.error("Cause:", err.cause);
    console.error("Stack:", err.stack);
    return await fetchFallbackGitHubData(username, headers, err);
  }

  if (json.errors && json.errors.length > 0) {
    console.error("[GitHub API] GraphQL Errors:", json.errors);
    return await fetchFallbackGitHubData(username, headers, new Error(json.errors.map(e => e.message).join(", ")));
  }

  const user = json.data?.user as {
    followers?: { totalCount?: number };
    following?: { totalCount?: number };
    repositories?: { totalCount?: number; nodes?: Array<{ name?: string; stargazerCount?: number; primaryLanguage?: { name?: string; color?: string } }> };
    pinnedItems?: { nodes?: Array<{ name?: string; description?: string; url?: string; stargazerCount?: number; primaryLanguage?: { name?: string } }> };
    contributionsCollection?: {
      contributionCalendar?: {
        totalContributions?: number;
        weeks?: Array<{
          contributionDays?: Array<{
            date: string;
            contributionCount: number;
            contributionLevel: string;
          }>;
        }>;
      };
    };
  } | undefined;

  if (!user) {
    console.error("[GitHub API] User object not found in GraphQL response");
    return await fetchFallbackGitHubData(username, headers, new Error("User object not found in response"));
  }

  const followers = user.followers?.totalCount ?? 0;
  const following = user.following?.totalCount ?? 0;
  const repositories = user.repositories?.totalCount ?? 0;

  let totalStars = 0;
  const languageCounts: Record<string, { count: number; color: string }> = {};

  const repoNodes = user.repositories?.nodes ?? [];
  for (const repo of repoNodes) {
    totalStars += repo.stargazerCount ?? 0;
    if (repo.primaryLanguage?.name) {
      const langName = repo.primaryLanguage.name;
      const color = repo.primaryLanguage.color ?? "#64748B";
      if (!languageCounts[langName]) {
        languageCounts[langName] = { count: 0, color };
      }
      languageCounts[langName].count += 1;
    }
  }

  const totalLangCount = Object.values(languageCounts).reduce((acc, curr) => acc + curr.count, 0);
  const languages: GitHubLanguage[] = Object.entries(languageCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([name, data]) => ({
      name,
      percentage: totalLangCount > 0 ? Math.round((data.count / totalLangCount) * 100) : 0,
      color: data.color,
    }));

  const pinnedNodes = user.pinnedItems?.nodes ?? [];
  let pinnedRepositories: GitHubPinnedRepo[] = pinnedNodes.map(
    (repo) => ({
      name: repo.name ?? "",
      description: repo.description ?? "",
      url: repo.url ?? `https://github.com/${username}/${repo.name ?? ""}`,
      stars: repo.stargazerCount ?? 0,
      language: repo.primaryLanguage?.name ?? "TypeScript",
    })
  );

  if (pinnedRepositories.length === 0 && repoNodes.length > 0) {
    pinnedRepositories = repoNodes.slice(0, 4).map((repo) => ({
      name: repo.name ?? "",
      description: "",
      url: `https://github.com/${username}/${repo.name ?? ""}`,
      stars: repo.stargazerCount ?? 0,
      language: repo.primaryLanguage?.name ?? "TypeScript",
    }));
  }

  const levelMap: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

  const contributionCalendar: GitHubContributionDay[] = [];
  const weeks = user.contributionsCollection?.contributionCalendar?.weeks ?? [];
  let calculatedContributions = 0;
  for (const week of weeks) {
    for (const day of week.contributionDays ?? []) {
      const count = day.contributionCount ?? 0;
      calculatedContributions += count;
      const level = levelMap[day.contributionLevel] ?? (count > 8 ? 4 : count > 5 ? 3 : count > 2 ? 2 : count > 0 ? 1 : 0);
      contributionCalendar.push({
        date: day.date,
        count,
        level,
      });
    }
  }

  const totalContributions = user.contributionsCollection?.contributionCalendar?.totalContributions ?? calculatedContributions;

  return NextResponse.json<GitHubResponseData>({
    isAvailable: true,
    totalContributions,
    followers,
    following,
    repositories,
    totalStars,
    languages,
    pinnedRepositories,
    pinnedRepos: pinnedRepositories,
    contributionCalendar,
    heatmap: contributionCalendar,
  });
}

async function fetchFallbackGitHubData(username: string, headers: Record<string, string>, primaryError: Error & { cause?: unknown }): Promise<NextResponse<GitHubResponseData>> {
  let userRes: Response;
  try {
    userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });
  } catch (error: unknown) {
    const err = error as Error & { cause?: unknown };
    console.error("GitHub REST fallback fetch error:", err);
    console.error("Cause:", err.cause);
    console.error("Stack:", err.stack);

    const causeDetail = err.cause ? (typeof err.cause === "object" ? JSON.stringify(err.cause) : String(err.cause)) : null;
    const detailMsg = causeDetail ? `${err.message} (Cause: ${causeDetail})` : err.message;

    return NextResponse.json<GitHubResponseData>(
      {
        isAvailable: false,
        error: `GitHub API connection failed: ${detailMsg}`,
        details: { primaryError: primaryError.message, fallbackError: err.message, cause: err.cause },
      },
      { status: 502 }
    );
  }

  if (!userRes.ok) {
    return NextResponse.json<GitHubResponseData>(
      {
        isAvailable: false,
        error: `GitHub API REST HTTP ${userRes.status}: ${userRes.statusText}`,
      },
      { status: userRes.status }
    );
  }

  try {
    const userData = await userRes.json();
    let reposData: Array<{ name: string; description: string; html_url: string; stargazers_count: number; language: string }> = [];
    try {
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      });
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }
    } catch (reposErr) {
      console.error("GitHub REST repos fetch error:", reposErr);
    }

    let totalStars = 0;
    for (const r of reposData) {
      if (r.stargazers_count) totalStars += r.stargazers_count;
    }

    const pinnedRepositories: GitHubPinnedRepo[] = reposData.slice(0, 4).map((repo) => ({
      name: repo.name,
      description: repo.description ?? "",
      url: repo.html_url,
      stars: repo.stargazers_count ?? 0,
      language: repo.language ?? "TypeScript",
    }));

    return NextResponse.json<GitHubResponseData>({
      isAvailable: true,
      totalContributions: null,
      followers: userData.followers ?? null,
      following: userData.following ?? null,
      repositories: userData.public_repos ?? reposData.length,
      totalStars,
      languages: [],
      pinnedRepositories,
      pinnedRepos: pinnedRepositories,
      contributionCalendar: [],
      heatmap: [],
    });
  } catch (parseErr: unknown) {
    const err = parseErr as Error;
    console.error("GitHub REST JSON parse error:", err);
    return NextResponse.json<GitHubResponseData>(
      {
        isAvailable: false,
        error: `GitHub REST data parsing failed: ${err.message}`,
      },
      { status: 500 }
    );
  }
}
