"use client";

import { useState } from "react";
import { ArrowUpRight, Github, Sparkles, Terminal, Layers, ArrowRight } from "lucide-react";
import { sortedProjects } from "@/lib/config";
import { FadeIn } from "@/components/common/motion";
import { Container } from "@/components/ui/primitives";
import { playPop, playTick } from "@/lib/sound";

// Custom impact metrics for Jayendra's projects matching Dev Ashish's case study badges
const projectMetrics: Record<string, { badge: string; subtitle: string }> = {
  "gpt-backend-platform": {
    badge: "100% SECURE",
    subtitle: "By decoupling client-side requests from direct LLM access, enforcing validation, and managing conversation state.",
  },
  "cloud-video-storage": {
    badge: "HLS STREAMING",
    subtitle: "Decoupling multipart uploads, asynchronous background transcoding via Kafka, and adaptive bitrate media delivery.",
  },
  "quick-commerce": {
    badge: "SUB-100MS",
    subtitle: "Real-time catalog synchronization, WebSocket cart state, and instant Elasticsearch product discovery.",
  },
  "hackcrux": {
    badge: "1ST OF 90+ TEAMS",
    subtitle: "Automated public disaster source collection, BERT NLP duplicate filtering, and verified emergency feeds.",
  },
};

export function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const categories = ["All", "AI Backend", "Distributed Backend", "Full Stack", "AI / NLP"];

  const filteredProjects = selectedFilter === "All"
    ? sortedProjects
    : sortedProjects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="py-24 sm:py-32 relative scroll-mt-12 bg-[#F7F7F7]">
      <Container className="px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8B69FA] font-semibold block mb-2">
              03 / SELECTED WORK
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#1C1C1C] leading-[0.95]">
              CASE{" "}
              <span className="font-serif italic font-normal text-[#8B69FA] lowercase">
                studies
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playPop();
                  setSelectedFilter(cat);
                }}
                onMouseEnter={() => playTick()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${selectedFilter === cat
                    ? "bg-[#1C1C1C] text-white shadow-xs"
                    : "bg-white text-[#707070] hover:text-[#1C1C1C] border border-black/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Stack (Dev Ashish Dewangan format) */}
        <div className="mt-12 flex flex-col gap-8">
          {filteredProjects.map((project, idx) => {
            const meta = projectMetrics[project.id] || {
              badge: "PRODUCTION",
              subtitle: project.summary,
            };

            return (
              <FadeIn key={project.id}>
                <div
                  onMouseEnter={() => playTick()}
                  className="group relative p-8 sm:p-10 lg:p-12 rounded-[32px] bg-white border border-black/10 shadow-xs hover:shadow-lg transition-all duration-300 hover:scale-[1.008] flex flex-col justify-between overflow-hidden"
                >
                  {/* Background Accent Hover Gradient */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#F9F2FF] to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Top Row: Category, Metric Badge & Year */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tag-badge-lavender">
                          {project.category.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1C1C1C] text-white">
                          {meta.badge}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#707070] font-medium">
                        0{idx + 1} • {project.year}
                      </span>
                    </div>

                    {/* Headline: Impact-focused title */}
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C1C1C] tracking-tight leading-[1.08] relative z-10 group-hover:text-[#8B69FA] transition-colors">
                      {project.title}
                    </h3>

                    {/* Subtitle describing solution & problem */}
                    <p className="mt-4 text-sm sm:text-base lg:text-lg text-[#707070] font-normal leading-relaxed max-w-4xl relative z-10">
                      {meta.subtitle}
                    </p>

                    {/* Problem & Architecture Highlights */}
                    <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B69FA] font-bold block mb-1">
                          Core Challenge &amp; Solution
                        </span>
                        <p className="text-xs sm:text-sm text-[#1C1C1C] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B69FA] font-bold block mb-1">
                          Key Architecture Highlights
                        </span>
                        <ul className="text-xs sm:text-sm text-[#707070] space-y-1">
                          {project.highlights.slice(0, 3).map((h) => (
                            <li key={h} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8B69FA]" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Tech Stack Pills & Action Button */}
                  <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[#F7F7F7] border border-black/5 text-xs font-mono text-[#1C1C1C]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playPop()}
                          onMouseEnter={() => playTick()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1C1C1C] text-white hover:bg-black text-xs font-semibold shadow-xs transition-all hover:scale-105"
                        >
                          <Github size={14} />
                          <span>Code Repository</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playPop()}
                          onMouseEnter={() => playTick()}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#8B69FA] text-white hover:bg-[#7C3AED] text-xs font-semibold shadow-xs transition-all hover:scale-105"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
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
