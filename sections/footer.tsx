import { config, socialLinks } from "@/lib/config";
import { Container } from "@/components/ui/primitives";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-10 sm:py-12">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm font-medium text-muted-foreground text-center sm:text-left">
          {config.footer.text} &copy; {new Date().getFullYear()}
        </p>

        {config.footer.showSocials && socialLinks.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors capitalize"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </Container>
    </footer>
  );
}
