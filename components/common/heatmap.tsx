"use client";

import { useState } from "react";

type HeatmapDay = {
  date: string;
  count: number;
  level: number; // 0 to 4
};

type HeatmapProps = {
  days: HeatmapDay[];
  title?: string;
};

export function InteractiveHeatmap({ days }: HeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  if (!days || days.length === 0) {
    return (
      <div className="p-8 text-center text-sm font-medium text-muted-foreground bg-muted/20 border border-dashed border-border rounded-xl">
        Contribution heatmap data currently unavailable.
      </div>
    );
  }

  // Level color map
  const levelColors = [
    "bg-muted border-transparent",
    "bg-accent/30 border-accent/20",
    "bg-accent/60 border-accent/40",
    "bg-accent/85 border-accent/60",
    "bg-accent border-accent",
  ];

  return (
    <div className="flex flex-col gap-3 relative">
      {/* Tooltip Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground min-h-[20px]">
        <span>Recent Activity Grid</span>
        {hoveredDay ? (
          <span className="text-accent font-bold">
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
          {days.map((day, idx) => (
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

