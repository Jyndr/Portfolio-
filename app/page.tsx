import { HeroSection } from "@/sections/hero-section";
import { AboutSection } from "@/sections/about-section";
import { AchievementsSection } from "@/sections/achievements-section";
import { ProjectsSection } from "@/sections/projects-section";
import { TechStackSection } from "@/sections/tech-stack-section";
import { LeetCodeSection } from "@/sections/leetcode-section";
import { GitHubSection } from "@/sections/github-section";
import { ContactSection } from "@/sections/contact-section";
export default function Home() {
  return (
    <div className="relative bg-[#F7F7F7] min-h-screen text-[#1C1C1C]">
      <main className="relative z-10">
        {/* 01: Hero */}
        <HeroSection />
        {/* 02: Work Experience & Background */}
        <AboutSection />
        {/* 03: Case Studies (Featured Projects) */}
        <ProjectsSection />
        {/* 04: Problem Solving Metrics (LeetCode) */}
        <LeetCodeSection />
        {/* 05: Open Source (GitHub) */}
        <GitHubSection />
        {/* 06: Technical Stack */}
        <TechStackSection />
        {/* 07: Beyond The Screen */}
        <AchievementsSection />
        {/* 08: Contact & Footer */}
        <ContactSection />
      </main>
    </div>
  );
}
