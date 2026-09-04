import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export interface LeetCodeBadge {
  id: string;
  name: string;
  icon: string;
}

export interface LeetCodeHeatmapDay {
  date: string;
  count: number;
  level: number;
}

export interface LeetCodeResponseData {
  isAvailable: boolean;
  totalSolved?: number | null;
  easySolved?: number | null;
  mediumSolved?: number | null;
  hardSolved?: number | null;
  contestRating?: number | null;
  rating?: number | null;
  globalRanking?: number | null;
  streak?: number | null;
  totalActiveDays?: number | null;
  activeYears?: number[];
  submissionCalendar?: Record<string, number>;
  badges?: LeetCodeBadge[];
  heatmap?: LeetCodeHeatmapDay[];
  error?: string;
  details?: unknown;
}

export async function GET() {
  const username =
    process.env.LEETCODE_USERNAME ||
    config.leetcode.username ||
    config.socials.leetcode.username;

  if (!username || username === "TODO") {
    console.error("[LeetCode API] Error: LEETCODE_USERNAME is not configured.");
    return NextResponse.json<LeetCodeResponseData>(
      {
        isAvailable: false,
        error: "LeetCode username is not configured.",
      },
      { status: 400 }
    );
  }

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        badges {
          id
          displayName
          icon
        }
        userCalendar {
          streak
          totalActiveDays
          activeYears
          submissionCalendar
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
      }
    }
  `;

  let res: Response;
  try {
    res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });
  } catch (error: unknown) {
    const err = error as Error & { cause?: unknown };
    console.error("LeetCode fetch error:", err);
    console.error("Cause:", err.cause);
    console.error("Stack:", err.stack);

    const causeDetail = err.cause ? (typeof err.cause === "object" ? JSON.stringify(err.cause) : String(err.cause)) : null;
    const detailMsg = causeDetail ? `${err.message} (Cause: ${causeDetail})` : err.message;

    return NextResponse.json<LeetCodeResponseData>(
      {
        isAvailable: false,
        error: `LeetCode API connection failed: ${detailMsg}`,
        details: { message: err.message, cause: err.cause, stack: err.stack },
      },
      { status: 502 }
    );
  }

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unable to read error response");
    console.error(`[LeetCode API] HTTP Error ${res.status}: ${errorText}`);
    return NextResponse.json<LeetCodeResponseData>(
      {
        isAvailable: false,
        error: `LeetCode API HTTP ${res.status}: ${errorText}`,
      },
      { status: res.status }
    );
  }

  let json: {
    data?: {
      matchedUser?: {
        submitStats?: { acSubmissionNum?: Array<{ difficulty: string; count: number }> };
        badges?: Array<{ id?: string; displayName?: string; icon?: string }>;
        userCalendar?: { streak?: number; totalActiveDays?: number; activeYears?: number[]; submissionCalendar?: string };
      };
      userContestRanking?: { rating?: number; globalRanking?: number };
    };
    errors?: Array<{ message: string }>;
  };

  try {
    json = await res.json();
  } catch (error: unknown) {
    const err = error as Error & { cause?: unknown };
    console.error("LeetCode JSON parse error:", err);
    console.error("Cause:", err.cause);
    console.error("Stack:", err.stack);

    return NextResponse.json<LeetCodeResponseData>(
      {
        isAvailable: false,
        error: `LeetCode response parsing failed: ${err.message}`,
      },
      { status: 500 }
    );
  }

  if (json.errors && json.errors.length > 0) {
    console.error("[LeetCode API] GraphQL Errors:", json.errors);
    return NextResponse.json<LeetCodeResponseData>(
      {
        isAvailable: false,
        error: `LeetCode GraphQL query error: ${json.errors.map(e => e.message).join(", ")}`,
      },
      { status: 400 }
    );
  }

  const matchedUser = json.data?.matchedUser;
  const contestRanking = json.data?.userContestRanking;

  if (!matchedUser) {
    console.error("[LeetCode API] Matched user not found");
    return NextResponse.json<LeetCodeResponseData>(
      {
        isAvailable: false,
        error: `LeetCode user '${username}' not found.`,
      },
      { status: 444 }
    );
  }

  const stats = matchedUser.submitStats?.acSubmissionNum ?? [];
  const totalSolved = stats.find((s) => s.difficulty === "All")?.count ?? null;
  const easySolved = stats.find((s) => s.difficulty === "Easy")?.count ?? null;
  const mediumSolved = stats.find((s) => s.difficulty === "Medium")?.count ?? null;
  const hardSolved = stats.find((s) => s.difficulty === "Hard")?.count ?? null;

  const contestRating = contestRanking?.rating ? Math.round(contestRanking.rating) : null;
  const globalRanking = contestRanking?.globalRanking ?? null;

  const streak = matchedUser.userCalendar?.streak ?? null;
  const totalActiveDays = matchedUser.userCalendar?.totalActiveDays ?? null;
  const activeYears = matchedUser.userCalendar?.activeYears ?? [];

  const badges: LeetCodeBadge[] = (matchedUser.badges ?? []).map((b) => ({
    id: b.id ?? "",
    name: b.displayName ?? "",
    icon: b.icon ?? "",
  }));

  let submissionCalendar: Record<string, number> = {};
  const rawCalendarStr = matchedUser.userCalendar?.submissionCalendar;
  if (rawCalendarStr) {
    try {
      submissionCalendar = JSON.parse(rawCalendarStr) as Record<string, number>;
    } catch (parseErr: unknown) {
      const err = parseErr as Error;
      console.error("LeetCode submissionCalendar JSON parse error:", err);
      submissionCalendar = {};
    }
  }

  const heatmap: LeetCodeHeatmapDay[] = [];
  const calendarDatesMap = new Map<string, number>();

  for (const [timestampStr, count] of Object.entries(submissionCalendar)) {
    const timestamp = parseInt(timestampStr, 10);
    if (!isNaN(timestamp)) {
      const dateStr = new Date(timestamp * 1000).toISOString().split("T")[0];
      calendarDatesMap.set(dateStr, (calendarDatesMap.get(dateStr) ?? 0) + count);
    }
  }

  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const count = calendarDatesMap.get(dateStr) ?? 0;
    const level = count > 8 ? 4 : count > 5 ? 3 : count > 2 ? 2 : count > 0 ? 1 : 0;
    heatmap.push({ date: dateStr, count, level });
  }

  return NextResponse.json<LeetCodeResponseData>({
    isAvailable: true,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    contestRating,
    rating: contestRating,
    globalRanking,
    streak,
    totalActiveDays,
    activeYears,
    submissionCalendar,
    badges,
    heatmap,
  });
}
