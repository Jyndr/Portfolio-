"use client";

import Image from "next/image";

export function DeveloperIllustration() {
  return (
    <div className="relative w-full max-w-[460px] lg:max-w-[520px] aspect-[4/3] sm:aspect-square mx-auto flex items-center justify-center">
      <Image
        src="/assets/profile/hero.png"
        alt="Jayendra Patel - Developer Illustration"
        width={540}
        height={540}
        priority
        className="object-contain w-full h-auto drop-shadow-sm"
      />
    </div>
  );
}
