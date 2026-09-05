import { RubiksMotionSystem } from "@/components/common/rubiks-motion-system";
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
    <div className="relative bg-[#F8F8F5] min-h-screen text-[#1A1A1A]">
      {/* 3D Rubik's Cube Scroll-Breaking & Revolving Motion System */}
      <RubiksMotionSystem />

      <main className="relative z-10">
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
    </div>
  );
}

