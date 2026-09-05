"use client";

import { useState } from "react";
import { Mail, Linkedin, Github, Download, Check, ArrowUpRight, Phone } from "lucide-react";
import { config } from "@/lib/config";
import { ContactForm } from "@/components/forms/contact-form";
import { FadeIn } from "@/components/common/motion";
import { Container } from "@/components/ui/primitives";
import { playPop, playTick } from "@/lib/sound";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    playPop();
    navigator.clipboard.writeText(config.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative scroll-mt-12 bg-[#F7F7F7]">
      <Container className="px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="border-b border-black/10 pb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8B69FA] font-semibold block mb-2">
            08 / GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#1C1C1C] leading-[0.95]">
            LOOKING FOR AN{" "}
            <span className="font-serif italic font-normal text-[#8B69FA] lowercase">
              engineer?
            </span>
            <br />
            LET&apos;S{" "}
            <span className="font-serif italic font-normal text-[#8B69FA] lowercase">
              talk
            </span>
          </h2>
        </div>

        {/* Large Pastel Footer Container (exact Dev Ashish #F9F2FF footer card) */}
        <FadeIn className="mt-12">
          <div className="p-8 sm:p-12 lg:p-16 rounded-[40px] bg-[#F9F2FF] border border-[#E9D5FF] shadow-sm flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Links & Action Pills */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full tag-badge-green text-xs font-mono font-bold mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    <span>AVAILABLE FOR FULL-TIME ROLES</span>
                  </span>

                  <h3 className="text-2xl sm:text-4xl font-black text-[#1C1C1C] tracking-tight leading-tight">
                    Let&apos;s build something reliable, fast, and impactful together.
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-[#707070] leading-relaxed max-w-md">
                    Whether you have an open engineering role, a distributed systems challenge, or want to discuss backend architectures, feel free to reach out directly.
                  </p>
                </div>

                {/* Big Action Pills (Dev Ashish design) */}
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                  {/* Email Pill */}
                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={() => playTick()}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-neutral-50 text-[#1C1C1C] text-xs sm:text-sm font-mono font-semibold border border-black/10 shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Mail size={15} className="text-[#8B69FA]" />
                    <span>{config.contact.email}</span>
                    {copiedEmail ? (
                      <span className="text-[11px] text-emerald-600 font-bold ml-1">Copied!</span>
                    ) : (
                      <span className="text-[10px] text-neutral-400 font-normal ml-1">click to copy</span>
                    )}
                  </button>

                  {/* LinkedIn Pill */}
                  <a
                    href={config.socials.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playPop()}
                    onMouseEnter={() => playTick()}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-neutral-50 text-[#1C1C1C] text-xs sm:text-sm font-mono font-semibold border border-black/10 shadow-xs transition-all hover:scale-[1.02]"
                  >
                    <Linkedin size={15} className="text-[#0A66C2]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} />
                  </a>

                  {/* GitHub Pill */}
                  <a
                    href={config.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playPop()}
                    onMouseEnter={() => playTick()}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-neutral-50 text-[#1C1C1C] text-xs sm:text-sm font-mono font-semibold border border-black/10 shadow-xs transition-all hover:scale-[1.02]"
                  >
                    <Github size={15} />
                    <span>GitHub (@{config.socials.github.username})</span>
                    <ArrowUpRight size={13} />
                  </a>

                  {/* Resume Pill */}
                  <a
                    href={config.personal.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playPop()}
                    onMouseEnter={() => playTick()}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1C1C1C] hover:bg-black text-white text-xs sm:text-sm font-mono font-semibold shadow-xs transition-all hover:scale-[1.02]"
                  >
                    <Download size={14} />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Message Form */}
              <div className="lg:col-span-6 p-7 sm:p-9 rounded-[32px] bg-white border border-black/10 shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8B69FA] font-bold block mb-1">
                  DIRECT MESSAGE
                </span>
                <h4 className="text-lg font-bold text-[#1C1C1C] mb-5">
                  Send a note
                </h4>
                <ContactForm />
              </div>
            </div>

            {/* Bottom Copyright & Colophon */}
            <div className="mt-14 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#707070]">
              <span>© 2026 {config.personal.fullName}. All rights reserved.</span>
              <span className="flex items-center gap-2">
                <span>Built with Next.js, Tailwind CSS &amp; CSS 3D</span>
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
