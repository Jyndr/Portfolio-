"use client";

import { useState } from "react";

type HeatmapDay = {
  date: string;
  count: number;
  level: number; // 0 to 4
};

type HeatmapProps = {
  days?: HeatmapDay[];
  data?: HeatmapDay[];
  title?: string;
};

export function InteractiveHeatmap({ days, data }: HeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const items = days || data || [];


  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-sm font-medium text-[#6e6a61] bg-[#EFEBE0] border border-dashed border-[#E0DACA] rounded-xl">
        Contribution heatmap data currently unavailable.
      </div>
    );
  }

  // Level color map
  const levelColors = [
    "bg-[#EBE6D8] border-transparent",
    "bg-[#d4cebd] border-[#c0b9a6]",
    "bg-[#9e9683] border-[#8a8270]",
    "bg-[#575347] border-[#423f36]",
    "bg-[#1c1b18] border-[#1c1b18]",
  ];

  return (
    <div className="flex flex-col gap-3 relative">
      {/* Tooltip Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-[#6e6a61] min-h-[20px]">
        <span>Recent Activity Grid</span>
        {hoveredDay ? (
          <span className="text-[#1c1b18] font-bold">
            {hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"} on {hoveredDay.date}
          </span>
        ) : (
          <span>Hover over cells for details</span>
        )}
      </div>

      {/* Grid container */}
      <div className="overflow-x-auto pb-2">
        <div
          className="grid grid-flow-col grid-rows-7 gap-1.5 w-max min-w-full"
          aria-label="Activity Heatmap"
        >
          {items.map((day, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              className={`h-3.5 w-3.5 rounded-sm border ${levelColors[Math.min(Math.max(0, day.level), 4)]
                } transition-transform duration-150 hover:scale-125 hover:z-10 cursor-pointer`}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {levelColors.map((colorClass, idx) => (
            <span key={idx} className={`h-3 w-3 rounded-sm border ${colorClass}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

