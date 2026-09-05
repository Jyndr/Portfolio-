"use client";

import { useEffect, useState } from "react";

export function useActiveSection(itemHrefs: string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const cleanIds = itemHrefs
      .map((href) => (href.startsWith("#") ? href.slice(1) : href))
      .filter(Boolean);

    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      // 1. Scrolled to the bottom of the page -> activate the final section (e.g. #contact)
      if (scrollY + winH >= docH - 50) {
        const lastId = cleanIds[cleanIds.length - 1];
        if (lastId) {
          setActive(`#${lastId}`);
          return;
        }
      }

      // 2. At Hero section (top of the page) -> none of the nav links should be highlighted
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const aboutRect = aboutEl.getBoundingClientRect();
        if (aboutRect.top > winH * 0.45) {
          setActive("");
          return;
        }
      }

      // 3. Focal line at 35% from the top of the viewport
      const targetLine = winH * 0.35;
      let currentActiveId = "";

      for (const id of cleanIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= targetLine && rect.bottom > targetLine) {
          currentActiveId = id;
          break;
        }
      }

      // 4. Fallback: closest visible section to the focal line
      if (!currentActiveId) {
        let minDistance = Infinity;
        for (const id of cleanIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < winH) {
            const dist = Math.abs(rect.top - targetLine);
            if (dist < minDistance) {
              minDistance = dist;
              currentActiveId = id;
            }
          }
        }
      }

      if (currentActiveId) {
        setActive(`#${currentActiveId}`);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [JSON.stringify(itemHrefs)]);

  return active;
}
