import { Trophy, Award, ExternalLink, Code2, Flame, Globe } from "lucide-react";
import { config } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { FadeIn } from "@/components/common/motion";
import { ConfigImage } from "@/components/common/config-image";

export function AchievementsSection() {
  const problemSolvingStats = [
    {
      label: "Total Problems Solved",
      value: `${config.problemSolving.totalSolved}+`,
      href: config.socials.codolio.url,
      sub: `${config.problemSolving.codingDays}+ Active Days`,
    },
    {
      label: "LeetCode Max Rating",
      value: config.problemSolving.leetcode.maxRating,
      href: config.socials.leetcode.url,
      sub: "Top 15% Global Rank",
    },
    {
      label: "CodeChef Max Rating",
      value: config.problemSolving.codechef.maxRating,
      href: config.socials.codechef.url,
      sub: `Best Rank: #${config.problemSolving.codechef.bestGlobalRank}`,
    },
    {
      label: "Codeforces Rank",
      value: config.problemSolving.codeforces.rank,
      href: config.socials.codeforces.url,
      sub: `Rating: ${config.problemSolving.codeforces.maxRating}`,
    },
  ];

  return (
    <SectionShell
      id="achievements"
      index="03"
      label="MILESTONES"
      title="Achievements & Recognition"
      description="Competitive excellence, hackathons, and problem-solving milestones."
      quote="Progress is a series of small wins."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Hackathons & Certifications */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
            Hackathons &amp; Honors
          </span>
          {config.achievements.map((item) => (
            <FadeIn key={`${item.title}-${item.year}`}>
              <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] transition-transform hover:-translate-y-0.5">
                {item.image ? (
                  <div className="relative w-full sm:w-40 aspect-[4/3] shrink-0 overflow-hidden rounded-xl border border-[#E6E6E6]">
                    <ConfigImage
                      src={item.image}
                      alt={item.title}
                      width={240}
                      height={180}
                      placeholderLabel={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : null}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-[#1A1A1A]">{item.title}</h4>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#F7F7F5] text-[#1A1A1A]">
                        {item.year}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-[#666666]">{item.organization}</p>
                    <p className="mt-2 text-xs sm:text-sm text-[#666666] leading-relaxed">{item.description}</p>
                  </div>

                  {item.certificate ? (
                    <a
                      href={item.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] hover:underline"
                    >
                      <span>View Certificate</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Right Column: Competitive Programming Statistics */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
            Competitive Programming
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {problemSolvingStats.map((stat) => {
              const isValidLink = stat.href && stat.href !== "TODO" && stat.href !== "#";
              return (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-4 rounded-xl border border-[#E6E6E6] bg-[#FFFFFF] hover:border-[#1A1A1A]/30 transition-all"
                >
                  <div>
                    <span className="text-2xl font-serif font-bold text-[#1A1A1A] block">
                      {stat.value}
                    </span>
                    <span className="text-xs font-semibold text-[#1A1A1A] block mt-0.5">
                      {stat.label}
                    </span>
                    <span className="text-xs text-[#666666] block mt-0.5">{stat.sub}</span>
                  </div>
                  {isValidLink ? (
                    <a
                      href={stat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F7F5] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-colors"
                      aria-label={`View ${stat.label}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}


