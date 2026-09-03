"use client";

import { useEffect, useState } from "react";

export function TerminalText({ items }: { items: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!items.length) return;
    const target = items[index % items.length];
    const done = text === target;
    const timer = window.setTimeout(() => {
      if (done) {
        setText("");
        setIndex((current) => (current + 1) % items.length);
      } else {
        setText(target.slice(0, text.length + 1));
      }
    }, done ? 1500 : 50);

    return () => window.clearTimeout(timer);
  }, [index, items, text]);

  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 font-mono text-sm sm:text-base text-foreground shadow-sm backdrop-blur-sm"
      aria-label="Engineering focus area"
    >
      <span className="font-bold text-accent">&gt;</span>
      <span className="font-medium text-foreground">{text}</span>
      <span className="h-5 w-2 animate-pulse bg-accent" aria-hidden="true" />
    </div>
  );
}
