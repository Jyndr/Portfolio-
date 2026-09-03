import { Award, Code2, ExternalLink, Trophy } from "lucide-react";
import { config } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { Card, Badge, Grid } from "@/components/ui/primitives";
import { ConfigImage } from "@/components/common/config-image";
import { FadeIn } from "@/components/common/motion";

export function AchievementsSection() {
  const problemSolvingStats = [
    {
      label: "Problems Solved (Overall)",
      value: `${config.problemSolving.totalSolved}+`,
      href: config.socials.codolio.url,
    },
    {
      label: "LeetCode Max Rating",
      value: config.problemSolving.leetcode.maxRating,
      href: config.socials.leetcode.url,
    },
    {
      label: "CodeChef Max Rating",
      value: config.problemSolving.codechef.maxRating,
      href: config.socials.codechef.url,
    },
    {
      label: "Codeforces Rank",
      value: config.problemSolving.codeforces.rank,
      href: config.socials.codeforces.url,
    },
  ];

  return (
    <SectionShell
      id="achievements"
      index="03"
      label="ACHIEVEMENTS"
      title={
        <>
          Milestones &amp; <span className="text-accent">Competitive Excellence</span>
        </>
      }
      description="Highlights from hackathons, competitive programming contests, and continuous problem solving."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Hackathons & Certificates */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Trophy size={20} />
            </div>
            <h3 className="text-xl font-bold text-foreground">Hackathons &amp; Recognition</h3>
          </div>

          <div className="flex flex-col gap-6">
            {config.achievements.map((item) => (
              <FadeIn key={`${item.title}-${item.year}`}>
                <Card className="flex flex-col sm:flex-row gap-6 p-6">
                  {item.image ? (
                    <div className="relative w-full sm:w-48 aspect-[4/3] shrink-0 overflow-hidden rounded-xl border border-border">
                      <ConfigImage
                        src={item.image}
                        alt={`${item.title} certificate`}
                        width={300}
                        height={225}
                        placeholderLabel={item.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h4 className="text-lg font-bold text-foreground">{item.title}</h4>
                        <Badge>{item.year}</Badge>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-accent">{item.organization}</p>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>

                    {item.certificate ? (
                      <a
                        href={item.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                      >
                        <span>View Certificate</span>
                        <ExternalLink size={14} />
                      </a>
                    ) : null}
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Right Column: Problem Solving Statistics */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Code2 size={20} />
            </div>
            <h3 className="text-xl font-bold text-foreground">Problem Solving Stats</h3>
          </div>

          <Card className="flex flex-col gap-4 p-6">
            {problemSolvingStats.map((stat) => {
              const isValidLink = stat.href && stat.href !== "TODO" && stat.href !== "#";
              return (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border/50 hover:border-accent/30 transition-colors"
                >
                  <div>
                    <span className="text-2xl font-extrabold text-accent">{stat.value}</span>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                  {isValidLink ? (
                    <a
                      href={stat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-muted-foreground hover:text-accent hover:bg-accent-soft transition-colors"
                      aria-label={`View ${stat.label} profile`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  ) : null}
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
