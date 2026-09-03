import { config } from "@/lib/config";

export type LeetCodeOverview = {
  totalSolved: number | null;
  easySolved: number | null;
  mediumSolved: number | null;
  hardSolved: number | null;
  maxRating: number | string | null;
  badges: Array<{ name: string; icon?: string }>;
  heatmap: number[];
  topics: Array<{ name: string; count: number }>;
  isAvailable: boolean;
};

export class LeetCodeService {
  async getOverview(): Promise<LeetCodeOverview> {
    const configuredUsername = config.leetcode.username;
    const fallbackUsername = config.socials.leetcode.username;
    const username =
      configuredUsername && configuredUsername !== "TODO"
        ? configuredUsername
        : fallbackUsername && fallbackUsername !== "TODO"
        ? fallbackUsername
        : null;

    if (!username) {
      return this.getUnavailableState();
    }

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
            }
          }`,
          variables: { username },
        }),
      });

      if (!response.ok) {
        return this.getUnavailableState();
      }

      const json = await response.json();
      const matchedUser = json.data?.matchedUser;
      const contestRanking = json.data?.userContestRanking;

      if (!matchedUser) {
        return this.getUnavailableState();
      }

      const stats = matchedUser.submitStats?.acSubmissionNum ?? [];
      const totalSolved = stats.find((s: { difficulty: string }) => s.difficulty === "All")?.count ?? null;
      const easySolved = stats.find((s: { difficulty: string }) => s.difficulty === "Easy")?.count ?? null;
      const mediumSolved = stats.find((s: { difficulty: string }) => s.difficulty === "Medium")?.count ?? null;
      const hardSolved = stats.find((s: { difficulty: string }) => s.difficulty === "Hard")?.count ?? null;

      const maxRating = contestRanking?.rating ? Math.round(contestRanking.rating) : config.problemSolving.leetcode.maxRating ?? null;

      const badges = (matchedUser.badges ?? []).map((b: { displayName: string; icon?: string }) => ({
        name: b.displayName,
        icon: b.icon?.startsWith("http") ? b.icon : b.icon ? `https://leetcode.com${b.icon}` : undefined,
      }));

      let heatmap: number[] = [];
      if (matchedUser.userCalendar?.submissionCalendar) {
        try {
          const calendarObj = JSON.parse(matchedUser.userCalendar.submissionCalendar) as Record<string, number>;
          const counts = Object.values(calendarObj);
          heatmap = counts.map((c) => (c > 8 ? 4 : c > 5 ? 3 : c > 2 ? 2 : c > 0 ? 1 : 0));
        } catch {
          heatmap = [];
        }
      }

      return {
        totalSolved: totalSolved ?? config.problemSolving.totalSolved ?? null,
        easySolved,
        mediumSolved,
        hardSolved,
        maxRating,
        badges,
        heatmap,
        topics: [],
        isAvailable: true,
      };
    } catch {
      return this.getUnavailableState();
    }
  }

  getUnavailableState(): LeetCodeOverview {
    return {
      totalSolved: config.problemSolving.totalSolved ?? null,
      easySolved: null,
      mediumSolved: null,
      hardSolved: null,
      maxRating: config.problemSolving.leetcode.maxRating ?? null,
      badges: [],
      heatmap: [],
      topics: [],
      isAvailable: false,
    };
  }
}
