import { config } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { FadeIn } from "@/components/common/motion";

export function TechStackSection() {
  const stackCategories = [
    {
      title: "Languages",
      skills: config.skills.languages || ["C++", "JavaScript", "TypeScript", "Python"],
    },
    {
      title: "Frontend",
      skills: config.skills.frontend || ["React", "Next.js", "Tailwind CSS", "HTML / CSS"],
    },
    {
      title: "Backend",
      skills: config.skills.backend || ["Node.js", "Express.js", "REST APIs", "Redis"],
    },
    {
      title: "Database & Tools",
      skills: [...(config.skills.databases || []), ...(config.skills.devops || [])].slice(0, 6),
    },
  ];

  return (
    <SectionShell
      id="tech"
      index="05"
      label="TOOLS & USAGE"
      title="Tech Stack"
      description="Technologies that power my work."
      quote="Good tools make great builders."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stackCategories.map((cat) => (
          <FadeIn key={cat.title}>
            <div className="flex flex-col p-5 sm:p-6 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] h-full">
              <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-4 pb-2 border-b border-[#E6E6E6]">
                {cat.title}
              </h3>
              <div className="flex flex-col gap-2.5">
                {cat.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                    <span className="text-xs font-medium text-[#666666]">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}

