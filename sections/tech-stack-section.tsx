import {
  Brain,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Server,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { config } from "@/lib/config";
import { titleCase } from "@/lib/utils";
import { SectionShell } from "@/components/ui/section-shell";
import { Card, Pill, Grid } from "@/components/ui/primitives";
import { FadeIn } from "@/components/common/motion";

const categoryIcons: Record<string, LucideIcon> = {
  languages: Code2,
  frontend: Globe,
  backend: Server,
  databases: Database,
  cloud: Layers,
  devops: Wrench,
  systems: Cpu,
  ai: Brain,
  fundamentals: Terminal,
};

export function TechStackSection() {
  return (
    <SectionShell
      id="tech"
      index="07"
      label="TECH STACK"
      title={
        <>
          Technologies &amp; <span className="text-accent">Tooling</span>
        </>
      }
      description="The languages, frameworks, databases, systems, and cloud infrastructure I use to craft software."
    >
      <Grid cols={3}>
        {Object.entries(config.skills).map(([group, skills]) => {
          const Icon = categoryIcons[group.toLowerCase()] ?? Code2;
          return (
            <FadeIn key={group}>
              <Card className="flex flex-col h-full gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent shrink-0">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{titleCase(group)}</h3>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Pill key={skill}>{skill}</Pill>
                  ))}
                </div>
              </Card>
            </FadeIn>
          );
        })}
      </Grid>
    </SectionShell>
  );
}
