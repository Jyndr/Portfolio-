import { Code2, ExternalLink, Globe } from "lucide-react";
import { sortedProjects } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { Card, Pill, Badge, Button } from "@/components/ui/primitives";
import { ConfigImage } from "@/components/common/config-image";
import { FadeIn } from "@/components/common/motion";

export function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      index="06"
      label="FEATURED PROJECTS"
      title={
        <>
          Ideas to Impact. <span className="text-accent">Built for Scale.</span>
        </>
      }
      description="A showcase of production-grade full-stack systems, distributed architectures, and AI integrations."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {sortedProjects.map((project) => (
          <FadeIn key={project.id}>
            <Card className="group flex flex-col h-full overflow-hidden p-0">
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted border-b border-border">
                <ConfigImage
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  width={640}
                  height={400}
                  placeholderLabel={project.shortTitle || project.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <Badge>{project.category}</Badge>
                  <Badge>{project.year}</Badge>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col justify-between flex-1 p-6 sm:p-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Pill key={tech}>{tech}</Pill>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="mt-8 flex items-center gap-4 pt-4 border-t border-border/50">
                  {project.github ? (
                    <Button
                      as="a"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                    >
                      <Code2 size={16} />
                      <span>Source Code</span>
                    </Button>
                  ) : null}

                  {project.live ? (
                    <Button
                      as="a"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                    >
                      <Globe size={16} />
                      <span>Live Demo</span>
                    </Button>
                  ) : null}
                </div>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}
