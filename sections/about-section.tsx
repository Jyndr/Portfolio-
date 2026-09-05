"use client";

import { Trophy, GraduationCap, Server, Zap, ArrowUpRight, Award } from "lucide-react";
import { config } from "@/lib/config";
import { FadeIn } from "@/components/common/motion";
import { Container } from "@/components/ui/primitives";
import { playPop, playTick } from "@/lib/sound";

export function AboutSection() {
  const stats = [
    { label: "Problems Solved", value: "1750+", sub: "LeetCode & Contests" },
    { label: "Coding Days", value: "550+", sub: "Continuous Streak" },
    { label: "Contests", value: "130+", sub: "Participated" },
    { label: "Hackathon Win", value: "1st Place", sub: "HackCrux 2025" },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative scroll-mt-12 bg-[#F7F7F7]">
      <Container className="px-6 sm:px-10 lg:px-14">
        {/* Section Header with Dev Ashish's iconic typography */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8B69FA] font-semibold block mb-2">
              02 / WORK &amp; ACHIEVEMENTS
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#1C1C1C] leading-[0.95]">
              WORK{" "}
              <span className="font-serif italic font-normal text-[#8B69FA] lowercase">
                experience
              </span>
            </h2>
          </div>

          <span className="text-xs font-mono text-[#707070] hidden sm:block">
            Hover to inspect cards
          </span>
        </div>

        {/* Story Narrative Paragraph (Dev Ashish design) */}
        <FadeIn className="mt-10 max-w-4xl">
          <p className="text-lg sm:text-xl md:text-2xl text-[#1C1C1C] font-normal leading-relaxed">
            My engineering journey began with mastering data structures and algorithmic problem solving—solving <strong className="font-bold text-[#1C1C1C]">1,750+ challenges</strong> and competing in over 130 contests. Over time, that algorithmic discipline evolved into production-grade systems architecture: building high-throughput REST APIs, asynchronous Kafka pipelines, secure AI communication layers, and scalable cloud applications.
          </p>
        </FadeIn>

        {/* Bento Grid: Experience, Hackathon Winner & College */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Card: HackCrux Winner (Dev Ashish highlight card style) */}
          <FadeIn className="md:col-span-8 p-7 sm:p-9 rounded-[28px] bg-white border border-black/10 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] flex flex-col justify-between group">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full tag-badge-green text-xs font-mono font-semibold">
                  <Trophy size={13} className="text-[#30734D]" />
                  <span>WINNER - 1ST OF 90+ TEAMS</span>
                </span>
                <span className="text-xs font-mono text-[#707070]">LNMIIT Jaipur • 2025</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#1C1C1C] tracking-tight group-hover:text-[#8B69FA] transition-colors">
                HackCrux 2025 Hackathon Winner
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#707070] leading-relaxed">
                Led a 4-member team to victory among 90+ competing teams by designing and implementing an AI-powered real-time disaster information aggregation platform with automated BERT NLP filtering, deduplication, and verified emergency feeds.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-mono text-[#707070]">Role: Team Lead &amp; Systems Architect</span>
              <a
                href={config.achievements[0]?.certificate}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playPop()}
                onMouseEnter={() => playTick()}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B69FA] hover:underline"
              >
                <span>View Certificate</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </FadeIn>

          {/* Education Card */}
          <FadeIn className="md:col-span-4 p-7 rounded-[28px] bg-white border border-black/10 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#EDE9FE] text-[#6D28D9] flex items-center justify-center mb-6">
                <GraduationCap size={20} />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#707070] block">
                ACADEMICS
              </span>
              <h4 className="text-lg font-bold text-[#1C1C1C] mt-1">
                {config.education.college}
              </h4>
              <p className="text-xs sm:text-sm text-[#707070] mt-1">
                {config.education.degree}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-[#707070]">
              <span>{config.education.location}</span>
              <span>{config.education.duration}</span>
            </div>
          </FadeIn>

          {/* Stats Bar (4 columns) */}
          <div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            {stats.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => playTick()}
                className="p-5 rounded-2xl bg-white border border-black/10 shadow-xs hover:border-[#8B69FA]/50 transition-colors"
              >
                <span className="text-2xl sm:text-3xl font-black text-[#1C1C1C] tracking-tight block">
                  {item.value}
                </span>
                <span className="text-xs font-bold text-[#1C1C1C] block mt-1">
                  {item.label}
                </span>
                <span className="text-[11px] font-mono text-[#707070] block">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
