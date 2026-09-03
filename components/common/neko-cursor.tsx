"use client";

import { useEffect } from "react";
import { config } from "@/lib/config";
import { initOneko } from "./oneko";

export function NekoCursor() {
  useEffect(() => {
    if (!config.theme.enableNekoCursor) return;
    const cleanup = initOneko();
    return () => {
      cleanup();
    };
  }, []);

  return null;
}
