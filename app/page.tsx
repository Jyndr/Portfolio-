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
    <main className="bg-[#F4F4F2] min-h-screen">
      {/* 01 */}
      <HeroSection />
      {/* 02 */}
      <AboutSection />
      {/* 03 */}
      <AchievementsSection />
      {/* 04 */}
      <LeetCodeSection />
      {/* 05 */}
      <GitHubSection />
      {/* 06 */}
      <ProjectsSection />
      {/* 07 */}
      <TechStackSection />
      {/* 08 */}
      <ContactSection />
    </main>
  );
}

