import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { config } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { Card } from "@/components/ui/primitives";
import { ContactForm } from "@/components/forms/contact-form";

export function ContactSection() {
  const contactInfo = [
    {
      label: "Email",
      value: config.contact.email,
      icon: Mail,
      href: `mailto:${config.contact.email}`,
    },
    {
      label: "Phone",
      value: config.contact.phone,
      icon: Phone,
      href: `tel:${config.contact.phone}`,
    },
    {
      label: "Location",
      value: config.contact.location,
      icon: MapPin,
      href: "",
    },
    {
      label: "LinkedIn",
      value: config.socials.linkedin.url.replace("https://", ""),
      icon: Linkedin,
      href: config.socials.linkedin.url,
    },
    {
      label: "GitHub",
      value: config.socials.github.url.replace("https://", ""),
      icon: Github,
      href: config.socials.github.url,
    },
  ];

  return (
    <SectionShell
      id="contact"
      index="08"
      label="CONTACT ME"
      title={
        <>
          Let&apos;s Build <span className="text-accent">Something Great.</span>
        </>
      }
      description={config.contact.availability}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Send size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Get In Touch</h3>
            </div>

            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const Content = (
                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/40 border border-border/50 hover:border-accent/30 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-accent shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-foreground truncate block mt-0.5">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                    {Content}
                  </a>
                ) : (
                  <div key={item.label}>{Content}</div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Mail size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Send a Message</h3>
            </div>
            <ContactForm />
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
