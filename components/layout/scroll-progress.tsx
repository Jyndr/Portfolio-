"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!config.theme.enableScrollProgress) return null;

  return <div className="fixed left-0 top-0 z-50 h-1 bg-accent transition-[width]" style={{ width: `${progress}%` }} />;
}
