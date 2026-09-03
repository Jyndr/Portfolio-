import { AboutSection } from "@/sections/about-section";
import { AchievementsSection } from "@/sections/achievements-section";
import { ContactSection } from "@/sections/contact-section";
import { Footer } from "@/sections/footer";
import { GitHubSection } from "@/sections/github-section";
import { HeroSection } from "@/sections/hero-section";
import { LeetCodeSection } from "@/sections/leetcode-section";
import { ProjectsSection } from "@/sections/projects-section";
import { TechStackSection } from "@/sections/tech-stack-section";
import { config } from "@/lib/config";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      {config.features.achievements ? <AchievementsSection /> : null}
      {config.features.leetcode ? <LeetCodeSection /> : null}
      {config.features.github ? <GitHubSection /> : null}
      {config.features.projects ? <ProjectsSection /> : null}
      <TechStackSection />
      {config.features.contactForm ? <ContactSection /> : null}
      <Footer />
    </main>
  );
}
