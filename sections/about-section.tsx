import { Calendar, Code2, GraduationCap, Trophy } from "lucide-react";
import { config } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { StatCard, Grid } from "@/components/ui/primitives";
import { FadeIn } from "@/components/common/motion";

const icons = [Calendar, Code2, Trophy, GraduationCap];

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      index="02"
      label="ABOUT ME"
      title={config.about.heading}
      description={config.about.description}
    >
      <Grid cols={4} className="mt-12 sm:mt-16">
        {config.about.cards.map((card, index) => {
          return (
            <FadeIn key={`${card.title}-${card.subtitle}`}>
              <StatCard title={card.title} subtitle={card.subtitle} />
            </FadeIn>
          );
        })}
      </Grid>
    </SectionShell>
  );
}
