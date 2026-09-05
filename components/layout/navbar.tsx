"use client";

import Link from "next/link";
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { config, enabledNavigation } from "@/lib/config";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { isSoundEnabled, toggleSound, playPop, playTick } from "@/lib/sound";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const active = useActiveSection(enabledNavigation.map((item) => item.href));

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleSoundChange = (e: Event) => {
      setSoundOn((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener("sound-state-change", handleSoundChange);
    return () => window.removeEventListener("sound-state-change", handleSoundChange);
  }, []);

  const handleSoundToggle = () => {
    const updated = toggleSound();
    setSoundOn(updated);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-8 lg:px-12 flex items-center justify-between pointer-events-none">
      {/* Brand & Open to Work Pill - Left */}
      <Link
        href="#hero"
        onClick={() => playPop()}
        onMouseEnter={() => playTick()}
        className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] focus-ring"
        aria-label="Jayendra Patel"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
        </span>
        <span className="text-xs font-bold tracking-tight text-[#1C1C1C]">
          {config.personal.firstName}
        </span>
        <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full tag-badge-green font-semibold">
          Open to Work
        </span>
      </Link>

      {/* Center Navigation Pill */}
      <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-sm transition-all">
        {enabledNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => playPop()}
            onMouseEnter={() => playTick()}
            className={cn(
              "text-xs font-medium transition-all duration-200 rounded-full px-3 py-1 whitespace-nowrap",
              active === item.href
                ? "bg-[#1C1C1C] text-white font-semibold shadow-xs"
                : "text-[#707070] hover:text-[#1C1C1C] hover:bg-[#F0F0F0]"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Right Controls: Sound Toggle & CV / Menu */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Sound Toggle Button (Dev Ashish design) */}
        <button
          onClick={handleSoundToggle}
          onMouseEnter={() => playTick()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-sm text-xs font-mono text-[#1C1C1C] hover:bg-neutral-50 transition-all active:scale-95 cursor-pointer"
          title={soundOn ? "Turn sound OFF" : "Turn sound ON"}
        >
          {soundOn ? <Volume2 size={13} className="text-[#8B69FA]" /> : <VolumeX size={13} className="text-neutral-400" />}
          <span className="hidden sm:inline font-medium">Sound: {soundOn ? "ON" : "OFF"}</span>
        </button>

        {/* Download CV button */}
        <a
          href={config.personal.resume}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playPop()}
          onMouseEnter={() => playTick()}
          className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#1C1C1C] text-white text-xs font-semibold hover:bg-black transition-all hover:scale-[1.02] shadow-sm"
        >
          <span>CV</span>
          <ArrowUpRight size={13} />
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => {
            playPop();
            setMobileOpen(!mobileOpen);
          }}
          className="flex md:hidden h-8 w-8 items-center justify-center rounded-full bg-[#1C1C1C] text-white hover:bg-black transition-colors focus-ring shadow-xs"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-16 rounded-2xl bg-white border border-black/10 p-5 shadow-xl md:hidden flex flex-col gap-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {enabledNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                playPop();
                setMobileOpen(false);
              }}
              className={cn(
                "text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors",
                active === item.href
                  ? "bg-[#F7F7F7] text-[#1C1C1C]"
                  : "text-[#707070] hover:text-[#1C1C1C]"
              )}
            >
              {item.title}
            </Link>
          ))}
          <a
            href={config.personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1C1C1C] text-white text-xs font-semibold"
          >
            <span>Download CV</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      )}
    </header>
  );
}
