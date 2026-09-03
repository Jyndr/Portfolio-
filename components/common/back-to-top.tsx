"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { config } from "@/lib/config";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!config.footer.showBackToTop || !visible) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:text-accent focus-ring"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
