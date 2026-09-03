import { ArrowRight, Download } from "lucide-react";
import { config } from "@/lib/config";
import { TerminalText } from "@/components/common/terminal-text";
import { FadeIn } from "@/components/common/motion";
import { Button, Container } from "@/components/ui/primitives";
import { DeveloperIllustration } from "@/components/common/developer-illustration";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-36 lg:pb-28 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Intro Copy & Terminal */}
          <FadeIn className="lg:col-span-7 flex flex-col items-start justify-center">
            <span className="text-sm sm:text-base font-bold tracking-wider text-accent uppercase mb-2">
              {config.hero.greeting}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.06]">
              {config.personal.fullName}
            </h1>
            <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground/80">
              {config.hero.role}
            </p>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {config.personal.intro}
            </p>

            <div className="mt-6 w-full max-w-xl">
              <TerminalText items={config.hero.terminalAnimation} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button as="a" href={config.hero.primaryButton.link} variant="primary" size="lg">
                <span>{config.hero.primaryButton.text}</span>
                <ArrowRight size={20} />
              </Button>
              <Button
                as="a"
                href={config.hero.secondaryButton.link}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{config.hero.secondaryButton.text}</span>
                <Download size={20} />
              </Button>
            </div>
          </FadeIn>

          {/* Right Column: Vertically Centered Illustration */}
          <FadeIn className="lg:col-span-5 flex items-center justify-center">
            <DeveloperIllustration />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
