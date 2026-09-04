"use client";

import { useMemo, useState } from "react";

export type HeatmapDay = {
  date: string;
  count: number;
  level: number; // 0 to 4
};

type HeatmapProps = {
  days?: HeatmapDay[];
  data?: HeatmapDay[];
  title?: string;
  variant?: "github" | "leetcode";
};

export function InteractiveHeatmap({ days, data, variant = "github" }: HeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  const items = useMemo(() => {
    const rawItems = days || data || [];
    if (rawItems && rawItems.length >= 365) {
      return rawItems.slice(-365);
    }

    const map = new Map<string, HeatmapDay>();
    if (rawItems) {
      for (const item of rawItems) {
        map.set(item.date, item);
      }
    }

    const today = new Date();
    const result: HeatmapDay[] = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const existing = map.get(dateStr);
      if (existing) {
        result.push(existing);
      } else {
        result.push({ date: dateStr, count: 0, level: 0 });
      }
    }

    return result;
  }, [days, data]);

  // Color maps based on platform authentic design
  const githubColors = [
    "bg-[#ebedf0] border-transparent",
    "bg-[#9be9a8] border-transparent",
    "bg-[#40c463] border-transparent",
    "bg-[#30a14e] border-transparent",
    "bg-[#216e39] border-transparent",
  ];

  const leetcodeColors = [
    "bg-[#f5f5f5] border-transparent",
    "bg-[#d9f99d] border-transparent",
    "bg-[#84cc16] border-transparent",
    "bg-[#65a30d] border-transparent",
    "bg-[#3f6212] border-transparent",
  ];

  const levelColors = variant === "leetcode" ? leetcodeColors : githubColors;
  const labelTerm = variant === "leetcode" ? "submission" : "contribution";

  return (
    <div className="flex flex-col gap-3 relative">
      {/* Tooltip Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-[#666666] min-h-[20px]">
        <span>Recent Activity Grid</span>
        {hoveredDay ? (
          <span className="text-[#1A1A1A] font-bold">
            {hoveredDay.count} {labelTerm}{hoveredDay.count === 1 ? "" : "s"} on {hoveredDay.date}
          </span>
        ) : (
          <span className="text-[#888888]">Hover over cells for details</span>
        )}
      </div>

      {/* Grid container */}
      <div className="overflow-x-auto pb-2">
        <div
          className="grid grid-flow-col grid-rows-7 gap-[5px] w-max min-w-full"
          aria-label="Activity Heatmap"
        >
          {items.map((day, idx) => {
            const safeLevel = Math.min(Math.max(0, day.level ?? 0), 4);
            return (
              <div
                key={`${day.date}-${idx}`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                title={`${day.count} ${labelTerm}${day.count === 1 ? "" : "s"} on ${day.date}`}
                className={`h-[13px] w-[13px] rounded-[4px] ${levelColors[safeLevel]} transition-all duration-200 hover:scale-125 hover:z-10 cursor-pointer shadow-sm`}
              />
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 text-xs text-[#666666]">
        <span>Less</span>
        <div className="flex gap-1">
          {levelColors.map((colorClass, idx) => (
            <span key={idx} className={`h-3 w-3 rounded-[3px] ${colorClass}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
