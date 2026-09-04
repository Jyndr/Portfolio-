import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { config } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { ContactForm } from "@/components/forms/contact-form";

export function ContactSection() {
  const contactLinks = [
    {
      label: "Email",
      value: config.contact.email,
      icon: Mail,
      href: `mailto:${config.contact.email}`,
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
    {
      label: "Resume",
      value: "Download my resume",
      icon: FileText,
      href: config.personal.resume,
    },
  ];

  return (
    <SectionShell
      id="contact"
      index="08"
      label="GET IN TOUCH"
      title="Let's Build Something."
      description="Open to opportunities, collaborations and interesting conversations."
      quote="Good Ideas Better People."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Contact Methods List */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          {contactLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7F7F5] text-[#1A1A1A] shrink-0">
                  <Icon size={18} />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold text-[#1A1A1A] block">{item.label}</span>
                  <span className="text-xs text-[#666666] truncate block mt-0.5">{item.value}</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </SectionShell>
  );
}

