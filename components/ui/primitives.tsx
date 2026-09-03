import { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className, ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12", className)} {...props}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  ...props
}: {
  id?: string;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className={cn("py-20 sm:py-28 scroll-mt-20", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

export function Heading({
  children,
  className,
  as: Component = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Component
      className={cn(
        "text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.12]",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function SubHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg lg:text-xl leading-relaxed", className)}>
      {children}
    </p>
  );
}

export function Card({
  children,
  className,
  hoverable = true,
}: {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius)] border border-border bg-card p-6 sm:p-8 shadow-sm",
        hoverable && "transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-accent/40",
        className
      )}
    >
      {children}
    </div>
  );
}

export function IconCard({
  icon: Icon,
  title,
  subtitle,
  className,
}: {
  icon: ElementType;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col items-start gap-4", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </Card>
  );
}

export function StatCard({
  title,
  subtitle,
  className,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col items-center text-center p-6 sm:p-8", className)}>
      <span className="text-3xl font-extrabold text-accent sm:text-4xl">{title}</span>
      <span className="mt-2 text-sm font-semibold text-muted-foreground sm:text-base">{subtitle}</span>
    </Card>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  as: Component = "button",
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  as?: ElementType;
  [key: string]: unknown;
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/90 shadow-sm hover:-translate-y-0.5 hover:shadow-md",
    outline: "border border-border bg-card text-foreground hover:bg-muted hover:-translate-y-0.5 hover:border-accent/40",
    ghost: "text-foreground hover:bg-muted hover:text-accent",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-3.5 text-base sm:text-lg min-h-[52px]",
  };

  return (
    <Component className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Component>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent-soft hover:text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Grid({
  children,
  cols = 3,
  className,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return <div className={cn("grid gap-6 sm:gap-8", colClasses[cols], className)}>{children}</div>;
}

export function Stack({
  children,
  space = "normal",
  className,
}: {
  children: ReactNode;
  space?: "tight" | "normal" | "loose";
  className?: string;
}) {
  const spaces = {
    tight: "gap-3",
    normal: "gap-6",
    loose: "gap-10",
  };

  return <div className={cn("flex flex-col", spaces[space], className)}>{children}</div>;
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("my-12 border-border sm:my-16", className)} />;
}

export function NeutralPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex min-h-[200px] w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border bg-muted/40 p-6 text-center text-sm font-medium text-muted-foreground"
      role="img"
      aria-label={`${label} image unavailable`}
    >
      <span>{label} Image Unavailable</span>
    </div>
  );
}
