import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function GET() {
  const configuredUsername = config.leetcode.username;
  const fallbackUsername = config.socials.leetcode.username;
  const username =
    configuredUsername && configuredUsername !== "TODO"
      ? configuredUsername
      : fallbackUsername && fallbackUsername !== "TODO"
        ? fallbackUsername
        : null;

  if (!username) {
    return NextResponse.json({
      isAvailable: false,
      error: "LeetCode username is set to TODO in portfolio.config.ts.",
    }, { status: 400 });
  }

  let lastError = "";

  // Provider 1: LeetCode Direct GraphQL API
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "PortfolioApp" },
      body: JSON.stringify({
        query: `query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
            userCalendar {
              submissionCalendar
            }
            badges {
              id
              displayName
              icon
            }
          }
          userContestRanking(username: $username) {
            rating
            globalRanking
            attendedContestsCount
          }
        }`,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const json = await response.json();
      const matchedUser = json.data?.matchedUser;
      const contestRanking = json.data?.userContestRanking;

      if (matchedUser) {
        const stats = matchedUser.submitStats?.acSubmissionNum ?? [];
        const totalSolved = stats.find((s: { difficulty: string }) => s.difficulty === "All")?.count ?? null;
        const easySolved = stats.find((s: { difficulty: string }) => s.difficulty === "Easy")?.count ?? null;
        const mediumSolved = stats.find((s: { difficulty: string }) => s.difficulty === "Medium")?.count ?? null;
        const hardSolved = stats.find((s: { difficulty: string }) => s.difficulty === "Hard")?.count ?? null;
        const rating = contestRanking?.rating ? Math.round(contestRanking.rating) : config.problemSolving.leetcode.maxRating ?? null;
        const globalRanking = contestRanking?.globalRanking ?? null;
        const badges = (matchedUser.badges ?? []).map((b: { displayName: string }) => ({ name: b.displayName }));

        let heatmap: Array<{ date: string; count: number; level: number }> = [];
        if (matchedUser.userCalendar?.submissionCalendar) {
          try {
            const calendarObj = JSON.parse(matchedUser.userCalendar.submissionCalendar) as Record<string, number>;
            heatmap = Object.entries(calendarObj).map(([timestampStr, count]) => {
              const dateStr = new Date(parseInt(timestampStr, 10) * 1000).toISOString().split("T")[0];
              const level = count > 8 ? 4 : count > 5 ? 3 : count > 2 ? 2 : count > 0 ? 1 : 0;
              return { date: dateStr, count, level };
            });
          } catch {
            heatmap = [];
          }
        }

        return NextResponse.json({
          isAvailable: true,
          username,
          totalSolved,
          easySolved,
          mediumSolved,
          hardSolved,
          rating,
          globalRanking,
          badges,
          heatmap,
        });
      }
    } else {
      lastError = `LeetCode GraphQL HTTP ${response.status}: ${response.statusText}`;
    }
  } catch (err: unknown) {
    lastError = `LeetCode GraphQL fetch failed: ${err instanceof Error ? err.message : String(err)}`;
  }

  // Provider 2: LeetCode Stats API
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        return NextResponse.json({
          isAvailable: true,
          username,
          totalSolved: data.totalSolved ?? null,
          easySolved: data.easySolved ?? null,
          mediumSolved: data.mediumSolved ?? null,
          hardSolved: data.hardSolved ?? null,
          rating: config.problemSolving.leetcode.maxRating ?? null,
          globalRanking: data.ranking ?? null,
          badges: [],
          heatmap: [],
        });
      }
    }
  } catch (err: unknown) {
    lastError += ` | LeetCode Stats API fallback failed: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json({
    isAvailable: false,
    error: lastError || "LeetCode API request failed on all endpoints.",
  }, { status: 503 });
}
