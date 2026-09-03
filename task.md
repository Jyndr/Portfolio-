# Premium Developer Portfolio Website

> This document defines every requirement for building my personal portfolio.
>
> Read this ENTIRE document before writing any code.
>
> Do not skip any section.
>
> The goal is to build a production-quality portfolio, not a template.

---

# Project Vision

Build a beautiful, minimal and premium portfolio website that represents me as a Full Stack Software Engineer.

The website should immediately communicate

• Engineering ability
• Clean design sense
• Professionalism
• Attention to detail
• Consistency
• Problem solving ability

This is NOT a landing page.

This is NOT an AI generated portfolio.

This is NOT a fancy animation showcase.

It is a premium engineering portfolio.

---

# Design Philosophy

The entire design language should feel inspired by

• Apple
• Linear
• Vercel
• Stripe
• Notion
• Arc Browser

Characteristics

✔ Minimal

✔ Premium

✔ Clean

✔ Elegant

✔ Spacious

✔ Soft

✔ Modern

✔ Fast

✔ Functional

Everything should have a purpose.

Nothing should exist only because it looks cool.

---

# Things To Avoid

Never create

❌ Cyberpunk UI

❌ Hacker UI

❌ Neon UI

❌ Glassmorphism everywhere

❌ Heavy gradients

❌ RGB borders

❌ Animated backgrounds

❌ Floating random objects

❌ Huge glowing effects

❌ Overuse of shadows

❌ Random illustrations

❌ Huge icons

❌ Decorative elements without meaning

❌ Template looking layouts

Avoid making the portfolio feel AI generated.

---

# Reference Images

A folder named

/references

will be provided.

These images define

• Layout
• Alignment
• Typography
• Colors
• Cards
• Section spacing
• Margins
• Visual hierarchy

The implementation should remain faithful to these references.

Improve only

• Responsiveness
• Accessibility
• Performance
• Code Quality
• Micro interactions

Do NOT redesign layouts.

---

# Primary Goal

If someone opens the portfolio for 10 seconds,

they should immediately think

"This developer builds production software."

Not

"This developer knows animations."

---

# Tech Stack

Use

• Next.js (Latest App Router)

• TypeScript

• TailwindCSS

• Framer Motion

• Shadcn UI

• Lucide Icons

• React Hook Form

• Zod

• TanStack Query (if useful)

---

# Folder Structure

Use a clean and scalable architecture.

Separate

Components

Sections

Services

Hooks

Utilities

Configuration

Assets

Public

Types

Animations

Never mix business logic with UI.

---

# Architecture

The website must be configuration driven.

Every section must receive data from

portfolio.config.ts

Never hardcode content inside components.

Changing the configuration file should automatically update the UI.

The portfolio configuration acts as the database of the application.

---

# Data Driven Architecture

The following should come from configuration.

Personal Info

Hero

About

Projects

Skills

Achievements

Certificates

Experience

Education

Social Links

GitHub

LeetCode

Codeforces

CodeChef

Contact

SEO

Theme

Navigation

Feature Flags

Animations

Everything.

---

# Important Rule

After the project is complete

I should only edit

portfolio.config.ts

Nothing else.

Adding a project should automatically create another project card.

Adding another certificate should automatically create another achievement card.

Removing a project should automatically remove it from the UI.

No UI changes should ever be required.

---

# Theme

Use only

White

Light Gray

Dark Gray

Black

One Purple Accent

Everything should derive colors from one theme object.

Changing the accent color once should update

Buttons

Links

Icons

Hover states

Active navigation

Highlights

Cards

Section titles

Everywhere.

---

# Typography

Use Inter.

Large headings.

Readable paragraphs.

Excellent spacing.

Consistent font weights.

Large whitespace between sections.

Avoid long paragraphs.

Prefer concise communication.

---

# Layout

The website should have generous whitespace.

Nothing should feel cramped.

Every section should breathe.

Maximum width should remain readable on large screens.

Cards should have subtle shadows only.

Rounded corners should remain consistent across the website.

---

# Animation Philosophy

Animations should improve UX.

Not distract from content.

Preferred animations

Fade

Slide

Opacity

Small scale

Tiny hover lift

Soft transitions

Avoid

Rotation

Bounce

Heavy parallax

Crazy scrolling effects

Long animation chains

Animations should feel invisible.

---

# Cursor

Integrate the Neko cursor.

Repository

https://github.com/crgimenes/neko

Requirements

Desktop only

Disabled automatically on touch devices

Smooth performance

No lag

Should not interfere with clicking

---

# Performance

The website should feel extremely fast.

Lazy load heavy components.

Optimize images.

Avoid unnecessary client rendering.

Avoid hydration mismatches.

Use code splitting.

Reduce bundle size wherever possible.

---

# Accessibility

Keyboard accessible

Visible focus states

ARIA labels

Semantic HTML

Correct heading hierarchy

Good contrast

Proper button labels

Image alt text

---

# Responsive Design

Desktop

Laptop

Tablet

Mobile

Every section should adapt naturally.

No horizontal scrolling.

No overlapping cards.

No broken layouts.

---

# Navigation

Sticky Navbar

Active Section Highlight

Smooth Scrolling

Scroll Progress Bar

Back To Top Button

Active state updates while scrolling.

---

# Content Rules

Never invent content.

Never invent achievements.

Never invent ratings.

Never invent projects.

Never invent links.

Never invent usernames.

If data is missing

Leave placeholders.

Do not hallucinate information.

---

# Code Standards

Use meaningful names.

Keep components small.

Prefer composition over duplication.

Avoid deeply nested code.

Write reusable utilities.

Keep logic separate from presentation.

Use strict TypeScript.

No "any".

No inline CSS.

No hardcoded values.

---

# API Architecture

Do not fetch data directly inside UI components.

Create dedicated services.

GitHub Service

LeetCode Service

Codeforces Service

CodeChef Service

Email Service

If an API fails,

display graceful fallback UI.

Never crash the application.

---

# Section Order

01 Hero

↓

02 About

↓

03 Achievements & Problem Solving

↓

04 LeetCode Journey

↓

05 GitHub Journey

↓

06 Projects

↓

07 Tech Stack

↓

08 Contact

The story should flow naturally from introduction to proof of work and finally to contact.

---

# General Expectations

This portfolio should feel handcrafted.

Every animation should have a purpose.

Every section should contribute to my personal brand.

The final product should resemble something built by an experienced software engineer rather than a cloned template.

Maintain a consistent visual language from the first section to the last.

Quality is always more important than quantity.

# SECTION IMPLEMENTATION

Every section should be implemented exactly as described below.

Do not redesign layouts.

Do not add unnecessary content.

Follow the attached reference images closely.

Maintain a consistent visual language across the website.

------------------------------------------------------------

# 01 HERO

This is the first impression.

The hero should immediately communicate who I am.

Layout

Left Side

• Greeting
• Full Name
• Role (Full Stack Engineer)
• Short introduction (2–3 lines)
• Two CTA buttons
    - View Projects
    - Download Resume
• Animated terminal

Terminal Animation

The typing animation should continuously cycle between

> Backend Development

> Problem Solving

> System Design

> Building Scalable Products

Typing should look natural.

No blinking rainbow cursor.

Simple terminal styling.

Right Side

Use the attached developer illustration.

Do not replace it.

Do not redesign it.

The illustration should remain static.

Micro interactions

• Buttons slightly lift on hover.
• Navigation smoothly updates.
• Hero fades in once.
• No unnecessary animations.

------------------------------------------------------------

# 02 ABOUT

Purpose

Introduce me as an engineer.

This section should remain concise.

Avoid long paragraphs.

Layout

Heading

Who I Am

Main headline

Building digital solutions that create real impact.

Small paragraph

(Comes from portfolio.config.ts)

Bottom contains four cards.

Cards

Years of Coding

Projects Built

Problem Solving

Continuous Learning

All card values come from portfolio.config.ts

Do not hardcode anything.

------------------------------------------------------------

# 03 ACHIEVEMENTS

Purpose

Show credibility.

Split layout into two sections.

LEFT

Achievements

Dynamic list.

Initially

HackCrux Winner

LNMIIT Jaipur

Certificate preview

When more achievements are added inside

portfolio.config.ts

New cards should automatically appear.

RIGHT

Problem Solving

Display

Total Problems Solved

LeetCode Rating

CodeChef Rating

Codeforces Rank

Platform profile links

Codolio

LeetCode

Codeforces

CodeChef

Everything configurable.

------------------------------------------------------------

# 04 LEETCODE

Purpose

Show consistency.

Everything should be fetched automatically.

Display

Submission Heatmap

Contest Rating

Contest Graph

Current Streak

Badges

Topic Distribution

Recent Contests

Global Ranking (if available)

Gracefully handle unavailable APIs.

Display loading skeletons.

Display fallback state.

Do not crash.

------------------------------------------------------------

# 05 GITHUB

Purpose

Show engineering consistency.

Display

Contribution Heatmap

Current Streak

Total Contributions

Repositories

Followers

Following

Top Languages

Pinned Projects

Recent Activity

Repository Count

Commit Graph

Everything fetched dynamically.

Loading states required.

Fallback required.

No crashes.

------------------------------------------------------------

# 06 PROJECTS

Purpose

This is the most important section.

Projects should be generated from configuration.

Each project card supports

Title

Description

Image

GitHub

Live Demo

Tech Stack

Status

Featured

Case Study

Year

Tags

Hover Effect

Image slightly zooms.

Card lifts 4px.

Shadow increases slightly.

Nothing flashy.

If more projects are added,

layout should automatically adapt.

No UI edits required.

------------------------------------------------------------

# 07 TECH STACK

Purpose

Display technologies.

Grouped into

Languages

Frontend

Backend

Databases

Cloud

DevOps

Tools

Others

Each category generated dynamically.

Icons

Names

Hover effect

Simple.

No unnecessary motion.

------------------------------------------------------------

# 08 CONTACT

Split Layout.

LEFT

Heading

Let's Build Something Great.

Small description.

Contact Information

Email

Phone

Location

LinkedIn

GitHub

LeetCode

RIGHT

Working Contact Form

Fields

Name

Email

Subject

Message

Validation required.

Loading state.

Success state.

Failure state.

No fake submissions.

Connect using

EmailJS

or

Resend

or

my own backend.

------------------------------------------------------------

# FOOTER

Minimal.

Contains

Name

Copyright

Social Icons

Back To Top

No large footer.

------------------------------------------------------------

# API REQUIREMENTS

GitHub

Fetch

Repositories

Followers

Languages

Contribution Data

Pinned Repositories

Recent Activity

LeetCode

Fetch

Solved

Contest

Heatmap

Badges

Contest History

Recent Activity

Do not hardcode these values.

------------------------------------------------------------

# CONFIGURATION

The entire application should read from

portfolio.config.ts

This file is the single source of truth.

Changing it should update

Hero

About

Projects

Skills

Achievements

Certificates

Experience

Contact

Socials

Navigation

SEO

Theme

Everything.

React components should never contain personal data.

------------------------------------------------------------

# FEATURE FLAGS

The following features should be enabled/disabled from portfolio.config.ts

Animations

Cursor Cat

LeetCode

GitHub

Projects

Contact Form

Dark Mode (future)

Blog (future)

Certificates

Testimonials (future)

------------------------------------------------------------

# LOADING STATES

Every API driven section should have

Loading Skeleton

Error State

Empty State

Success State

No blank screens.

------------------------------------------------------------

# MICRO INTERACTIONS

Buttons

Small lift

Cards

Small lift

Images

Tiny zoom

Navigation

Smooth underline

Links

Subtle color transition

Forms

Animated focus

Progress Bar

Smooth

No exaggerated animations.

------------------------------------------------------------

# RESPONSIVENESS

Desktop

Laptop

Tablet

Mobile

Every layout should adapt naturally.

No overflow.

No horizontal scrolling.

------------------------------------------------------------

# ACCESSIBILITY

Keyboard navigation

Visible focus

ARIA labels

Semantic HTML

Alt text

Proper heading hierarchy

High contrast

------------------------------------------------------------

# SEO

Generate

Title

Description

OpenGraph

Twitter Cards

robots.txt

sitemap.xml

Structured Data

Canonical URLs

Favicon

------------------------------------------------------------

# CODE QUALITY

Use

TypeScript

Strict typing

Reusable Components

Reusable Hooks

Reusable Utilities

No duplicated code

No magic values

No inline styles

Clean naming

Readable code

Proper comments only where necessary.

------------------------------------------------------------

# FINAL QUALITY CHECK

Before considering the project complete, verify:

✓ Matches all reference images.

✓ Uses portfolio.config.ts as the single source of truth.

✓ No hardcoded personal information.

✓ Fully responsive.

✓ APIs work correctly.

✓ Contact form works.

✓ Fast loading.

✓ Accessible.

✓ SEO optimized.

✓ Consistent spacing.

✓ Consistent typography.

✓ Smooth animations.

✓ Premium look.

✓ No AI-generated design patterns.

✓ No layout inconsistencies.

✓ Production-ready code.

------------------------------------------------------------

# FINAL INSTRUCTION

Do not optimize for writing code quickly.

Optimize for maintainability, scalability, readability, and long-term quality.

Treat this as a real production application that will continue to evolve over the coming years.

The goal is to build a portfolio that feels handcrafted, minimal, elegant, and technically impressive rather than flashy.