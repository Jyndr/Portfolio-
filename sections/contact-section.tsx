"use client";

import { useState } from "react";
import { Mail, Linkedin, Github, FileText, Check, ExternalLink } from "lucide-react";
import { config } from "@/lib/config";
import { SectionShell } from "@/components/ui/section-shell";
import { ContactForm } from "@/components/forms/contact-form";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(config.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
    window.location.href = `mailto:${config.contact.email}`;
  };

  const contactLinks = [
    {
      label: "Email",
      value: config.contact.email,
      icon: Mail,
      onClick: handleEmailClick,
      isEmail: true,
      href: `mailto:${config.contact.email}`,
    },
    {
      label: "LinkedIn",
      value: config.socials.linkedin.url.replace("https://", ""),
      icon: Linkedin,
      href: config.socials.linkedin.url,
      isExternal: true,
    },
    {
      label: "GitHub",
      value: config.socials.github.url.replace("https://", ""),
      icon: Github,
      href: config.socials.github.url,
      isExternal: true,
    },
    {
      label: "Resume",
      value: "Download PDF Resume",
      icon: FileText,
      href: config.personal.resume,
      isExternal: true,
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
        {/* Left Column: Interactive Contact Cards */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          {contactLinks.map((item) => {
            const Icon = item.icon;
            if (item.isEmail) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="group relative flex items-center justify-between p-4 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] hover:-translate-y-1 hover:shadow-md transition-all duration-200 text-left w-full cursor-pointer overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F7F5] text-[#1A1A1A] group-hover:bg-[#5B5CF6]/12 group-hover:text-[#5B5CF6] transition-colors shrink-0">
                      {copiedEmail ? <Check size={19} className="text-emerald-600" /> : <Icon size={19} />}
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-[#1A1A1A] block">{item.label}</span>
                      <span className="text-xs text-[#666666] truncate block mt-0.5">{item.value}</span>
                    </div>
                  </div>
                  {copiedEmail ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shrink-0">
                      Copied!
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-[#888888] group-hover:text-[#5B5CF6] transition-colors shrink-0">
                      Click to copy & mail
                    </span>
                  )}
                </button>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : "_self"}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between p-4 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F7F5] text-[#1A1A1A] group-hover:bg-[#5B5CF6]/12 group-hover:text-[#5B5CF6] transition-colors shrink-0">
                    <Icon size={19} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-[#1A1A1A] block">{item.label}</span>
                    <span className="text-xs text-[#666666] truncate block mt-0.5">{item.value}</span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-[#999999] group-hover:text-[#5B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
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
