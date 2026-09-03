import { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";

type SectionShellProps = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
};

export function SectionShell({ id, index, label, title, description, children }: SectionShellProps) {
  return (
    <section id={id} className="py-20 sm:py-28 lg:py-32 scroll-mt-20">
      <Container>
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-sm font-bold tracking-widest text-accent uppercase">
            <span className="text-base">{index}</span>
            <span className="h-4 w-px bg-accent/30" />
            <span>{label}</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl max-w-4xl leading-[1.15]">
            {title}
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-accent" />
          {description ? (
            <p className="mt-4 text-base text-muted-foreground sm:text-lg lg:text-xl max-w-3xl leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
