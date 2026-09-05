import { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";

type SectionShellProps = {
  id: string;
  index: string;
  totalIndex?: string;
  label: string;
  title: ReactNode;
  description?: string;
  quote?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  index,
  totalIndex = "08",
  label,
  title,
  description,
  quote,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="page-section min-h-screen py-20 lg:py-24 flex flex-col justify-between relative scroll-mt-0">
      <Container className="w-full flex-1 flex flex-col justify-between px-6 sm:px-12 lg:px-16">
        {/* Header Row with Label & Page Number */}
        <div className="pt-6 sm:pt-8">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#666666] uppercase font-mono">
                {label}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-[#1A1A1A] leading-[1.2]">
                {title}
              </h2>
            </div>
          </div>

          {description ? (
            <p className="mt-2.5 text-xs sm:text-sm text-[#666666] max-w-2xl leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>

        {/* Section Body */}
        <div className="my-auto py-8 sm:py-10">
          {children}
        </div>

        {/* Footer Quote annotation if present */}
        {quote ? (
          <div className="pb-4 pt-3 border-t border-[#E6E6E6] flex items-center justify-between text-xs sm:text-sm">
            <span className="font-handwriting text-base sm:text-lg text-[#666666]">&quot;{quote}&quot;</span>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

