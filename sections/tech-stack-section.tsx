"use client";

import { Terminal, Server, Database, Cloud, Sparkles, Layout } from "lucide-react";
import { config } from "@/lib/config";
import { FadeIn } from "@/components/common/motion";
import { Container } from "@/components/ui/primitives";
import { playTick } from "@/lib/sound";

export function TechStackSection() {
  const stackGroups = [
    {
      title: "Core Languages",
      icon: Terminal,
      skills: config.skills.languages || ["C++", "JavaScript", "TypeScript", "Python"],
      accent: "bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]",
    },
    {
      title: "Backend & Systems",
      icon: Server,
      skills: config.skills.backend || ["Node.js", "Express.js", "REST APIs", "JWT", "WebSockets"],
      accent: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    },
    {
      title: "Databases & Cache",
      icon: Database,
      skills: config.skills.databases || ["MongoDB", "PostgreSQL", "Redis", "Elasticsearch"],
      accent: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
    },
    {
      title: "Distributed & Cloud",
      icon: Cloud,
      skills: [
        ...(config.skills.systems || ["Apache Kafka", "Event-Driven Architecture", "HLS Streaming"]),
        ...(config.skills.cloud || ["Docker", "AWS EC2", "Nginx"]),
      ],
      accent: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
    },
    {
      title: "AI & Modern Integrations",
      icon: Sparkles,
      skills: config.skills.ai || ["OpenAI API", "Gemini API", "Vector Embeddings", "AI Agents"],
      accent: "bg-[#FDF2F8] text-[#DB2777] border-[#FBCFE8]",
    },
    {
      title: "Frontend & Tooling",
      icon: Layout,
      skills: [
        ...(config.skills.frontend || ["React.js", "Next.js", "Tailwind CSS"]),
        ...(config.skills.devops || ["Git", "GitHub", "CI/CD"]),
      ],
      accent: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
    },
  ];

  return (
    <section id="tech" className="py-24 sm:py-32 relative scroll-mt-12 bg-[#F7F7F7]">
      <Container className="px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8B69FA] font-semibold block mb-2">
              06 / ENGINEERING CRAFT
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#1C1C1C] leading-[0.95]">
              TECHNICAL{" "}
              <span className="font-serif italic font-normal text-[#8B69FA] lowercase">
                stack
              </span>
            </h2>
          </div>
          <span className="text-xs font-mono text-[#707070] hidden sm:block">
            Production toolset &amp; competencies
          </span>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackGroups.map((group) => {
            const Icon = group.icon;
            return (
              <FadeIn key={group.title}>
                <div
                  onMouseEnter={() => playTick()}
                  className="p-7 rounded-[28px] bg-white border border-black/10 shadow-xs hover:shadow-md transition-all hover:scale-[1.01] flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <h3 className="text-sm font-bold text-[#1C1C1C] uppercase tracking-wider">
                        {group.title}
                      </h3>
                      <div className="w-8 h-8 rounded-xl bg-[#F7F7F7] text-[#1C1C1C] flex items-center justify-center">
                        <Icon size={15} />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          onMouseEnter={() => playTick()}
                          className="px-3 py-1 rounded-full bg-[#F7F7F7] hover:bg-[#EDE9FE] hover:text-[#6D28D9] border border-black/5 text-xs font-mono text-[#1C1C1C] transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-[#707070]">
                    <span>{group.skills.length} competencies</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
