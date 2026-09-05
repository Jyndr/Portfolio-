import { Code2, Cpu, Zap, Users, GraduationCap, Briefcase, Target, Sparkles } from "lucide-react";
import { config } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { FadeIn } from "@/components/common/motion";

export function AboutSection() {
  const highlights = [
    { title: "Backend Developer", icon: Cpu },
    { title: "Problem Solver", icon: Code2 },
    { title: "Fast Learner", icon: Zap },
    { title: "Open Source", icon: Users },
  ];

  return (
    <SectionShell
      id="about"
      index="02"
      label="GET TO KNOW ME"
      title="About Me"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Bio & Skill Badges */}
        <FadeIn className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-[#1A1A1A] text-sm sm:text-base leading-relaxed font-serif">
            {config.personal.intro}
          </p>
          <p className="mt-3 text-[#666666] text-xs sm:text-sm leading-relaxed">
            {config.about.description}
          </p>

          {/* Skill Badges Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#E6E6E6] bg-[#FFFFFF] transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F7F5] text-[#1A1A1A] shrink-0">
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Right Column: Informative Overview (Education, Timeline, Current Focus) */}
        <FadeIn className="lg:col-span-6 flex flex-col gap-4">
          {/* Education Card */}
          <div className="p-5 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F7F5] text-[#1A1A1A] shrink-0">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] block">
                Education
              </span>
              <h4 className="text-sm font-bold text-[#1A1A1A] mt-0.5">
                {config.education.degree}
              </h4>
              <p className="text-xs text-[#666666] mt-0.5">
                {config.education.college} • {config.education.duration}
              </p>
            </div>
          </div>

          {/* Experience & Achievements Overview */}
          <div className="p-5 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F7F5] text-[#1A1A1A] shrink-0">
              <Briefcase size={20} />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] block">
                Background &amp; Experience
              </span>
              <h4 className="text-sm font-bold text-[#1A1A1A] mt-0.5">
                Full Stack &amp; Backend Engineering
              </h4>
              <p className="text-xs text-[#666666] mt-0.5">
                2+ years of hands-on experience building production REST APIs, distributed workflows, and AI platform tools.
              </p>
            </div>
          </div>

          {/* Current Focus Card */}
          <div className="p-5 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F7F5] text-[#1A1A1A] shrink-0">
              <Target size={20} />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] block">
                Current Focus
              </span>
              <h4 className="text-sm font-bold text-[#1A1A1A] mt-0.5">
                Distributed Systems &amp; Real-time AI Architecture
              </h4>
              <p className="text-xs text-[#666666] mt-0.5">
                Building scalable event-driven systems using Node.js, Redis, Kafka, and LLM orchestration tools.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}



