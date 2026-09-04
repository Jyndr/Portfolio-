# TASK.md

# Portfolio Scroll Improvement Task

## Objective

The portfolio UI is considered **feature complete**.

The only task is to improve the scrolling experience.

Everything else is locked.

---

# 🚫 DO NOT MODIFY

Do NOT change any of the following:

- Color palette
- Theme
- Typography
- Fonts
- Font sizes
- Card layouts
- Section layouts
- Component hierarchy
- Navbar design
- Project cards
- Tech stack cards
- Achievement cards
- GitHub section
- LeetCode section
- Contact section
- Hero section
- About section
- Images
- Icons
- Spacing
- Margins
- Padding
- Borders
- Border radius
- Shadows
- Animations (except scrolling)
- Hover effects
- Button styles
- Responsive design
- Existing content
- Text
- CSS unrelated to scrolling

Assume the current UI has been approved.

If a change is not directly required for scrolling,
DO NOT TOUCH IT.

---

# Allowed Changes

You may ONLY modify code related to:

- scrolling
- wheel handling
- touch gestures
- keyboard navigation
- CSS Scroll Snap
- scroll locking
- project navigation logic
- scroll performance
- section snapping

Nothing else.

---

# Scroll Goal

Improve the scrolling experience while preserving the existing UI exactly.

Desired behavior:

- smooth scrolling
- predictable navigation
- no accidental skips
- no double scrolling
- no layout shifts
- no blank spaces
- no broken section alignment
- no regressions

---

# Projects Section

Projects may receive custom scrolling behavior if needed.

This includes:

- previous / next project navigation
- wheel handling
- arrow navigation
- touch gestures

But:

- Do NOT redesign the project cards.
- Do NOT change project content.
- Do NOT resize project cards.
- Do NOT alter typography.

---

# Code Quality

During implementation:

- Remove unused scrolling code.
- Remove experimental scroll logic.
- Remove dead event listeners.
- Remove obsolete helper functions.
- Remove commented-out scroll experiments.

Do NOT remove code that is still used.

---

# Validation Checklist

Before finishing:

- npm run lint
- npm run build

Verify:

- No TypeScript errors
- No ESLint errors
- No console errors
- No UI regressions
- No visual changes except scrolling improvements

---

# Golden Rule

If you are about to modify anything unrelated to scrolling,

STOP.

Do not change it.

Only improve the scrolling behavior while preserving the current portfolio exactly as it is.