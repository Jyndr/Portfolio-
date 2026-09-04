"use client";

import { useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { sortedProjects } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/primitives";
import { ConfigImage } from "@/components/common/config-image";

export function ProjectsSection() {
  const [currentProject, setCurrentProject] = useState(0);

  const prevProject = () => {
    setCurrentProject((prev) => Math.max(0, prev - 1));
  };

  const nextProject = () => {
    setCurrentProject((prev) => Math.min(sortedProjects.length - 1, prev + 1));
  };

  return (
    <SectionShell
      id="projects"
      index="04"
      totalIndex="08"
      label="FEATURED WORK"
      title="Selected Projects"
      description="A selection of recent projects highlighting scalable architecture, clean backend design, and full-stack engineering."
      quote="Build Ship Learn Repeat."
    >
      <div className="relative w-full">
        {/* Navigation Bar Header: Carousel Controls & Counter */}
        <div className="flex items-center justify-between mb-6 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#FAFAF8] border border-[#E8E8E5] text-[#1A1A1A]">
              Project {currentProject + 1} of {sortedProjects.length}
            </span>
          </div>

          {/* Left & Right Arrow Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevProject}
              disabled={currentProject === 0}
              aria-label="Previous Project"
              className="p-2 sm:p-2.5 rounded-full border border-[#E8E8E5] bg-[#FAFAF8] text-[#1A1A1A] hover:bg-[#F0F0ED] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Step Indicators */}
            <div className="flex items-center gap-1.5 px-1">
              {sortedProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentProject(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentProject
                      ? "w-6 bg-[#1A1A1A]"
                      : "w-2 bg-[#E8E8E5] hover:bg-[#999999]"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              disabled={currentProject === sortedProjects.length - 1}
              aria-label="Next Project"
              className="p-2 sm:p-2.5 rounded-full border border-[#E8E8E5] bg-[#FAFAF8] text-[#1A1A1A] hover:bg-[#F0F0ED] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track Window */}
        <div className="w-full overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentProject * 100}%)`,
            }}
          >
            {sortedProjects.map((project, index) => (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E5] shadow-xs"
              >
                {/* Left Details */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-[#F5F5F2] border border-[#E8E8E5] text-[#1A1A1A]">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-[#666666]">
                        {project.year}
                      </span>
                      <span className="text-xs font-mono text-[#999999] ml-auto">
                        04.{index + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1A1A]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#666666] leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[#F5F5F2] border border-[#E8E8E5] text-xs font-semibold text-[#1A1A1A]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="mt-7 flex items-center gap-3">
                      {project.live ? (
                        <Button
                          as="a"
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="sm"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={14} />
                        </Button>
                      ) : null}

                      {project.github ? (
                        <Button
                          as="a"
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          size="sm"
                        >
                          <span>View Code</span>
                          <Github size={14} />
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Right Image Frame */}
                <div className="lg:col-span-6">
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#E8E8E5] bg-[#1A1A1A] p-2 shadow-md">
                    <div className="w-full h-full rounded-lg overflow-hidden bg-[#262626]">
                      <ConfigImage
                        src={project.image}
                        alt={`${project.title} preview`}
                        width={640}
                        height={400}
                        placeholderLabel={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

