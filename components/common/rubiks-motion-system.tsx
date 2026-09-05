"use client";

import React, { useEffect, useRef, useState } from "react";
import { playTick, playPop } from "@/lib/sound";

interface FaceColors {
  front: string;
  back: string;
  right: string;
  left: string;
  top: string;
  bottom: string;
}

interface CubieConfig {
  id: number;
  x: number; // -1, 0, 1
  y: number; // -1, 0, 1
  z: number; // -1, 0, 1
  nx: number;
  ny: number;
  nz: number;
  scatterX: number;
  scatterY: number;
  scatterZ: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  faces: FaceColors;
}

// Portfolio-native color palette (White, Off-White, Emerald Green & Soft Mint — ZERO PURPLE)
const COLOR_WHITE = "#FFFFFF";
const COLOR_OFFWHITE = "#F8F8F5";
const COLOR_CREAM = "#FAFAF8";
const COLOR_GREEN = "#10B981"; // Emerald green
const COLOR_MINT = "#D1FAE5";  // Soft mint

function createCubieConfigs(): CubieConfig[] {
  const configs: CubieConfig[] = [];
  let id = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const len = Math.hypot(x, y, z) || 1;
        const nx = x === 0 && y === 0 && z === 0 ? 0 : x / len;
        const ny = x === 0 && y === 0 && z === 0 ? 0.6 : y / len;
        const nz = x === 0 && y === 0 && z === 0 ? 0.8 : z / len;

        // Deterministic pseudo-random scatter trajectory
        const scatterX = Math.sin(id * 3.7 + 1.2) * 180;
        const scatterY = Math.cos(id * 2.3 + 0.8) * 160;
        const scatterZ = Math.sin(id * 5.1 + 2.1) * 150;

        // Individual tumbling rates
        const spinX = (0.7 + (id % 4) * 0.3) * (id % 2 === 0 ? 1 : -1);
        const spinY = (0.8 + ((id * 3) % 5) * 0.25) * (id % 3 === 0 ? 1 : -1);
        const spinZ = (0.6 + ((id * 7) % 4) * 0.2) * (id % 2 !== 0 ? 1 : -1);

        configs.push({
          id,
          x,
          y,
          z,
          nx,
          ny,
          nz,
          scatterX,
          scatterY,
          scatterZ,
          spinX,
          spinY,
          spinZ,
          faces: {
            top: COLOR_WHITE,
            bottom: COLOR_OFFWHITE,
            right: COLOR_GREEN,
            left: COLOR_CREAM,
            front: (x + y + z) % 2 === 0 ? COLOR_GREEN : COLOR_WHITE,
            back: COLOR_MINT,
          },
        });
        id++;
      }
    }
  }

  return configs;
}

const CUBIES = createCubieConfigs();

export function RubiksMotionSystem() {
  const [mounted, setMounted] = useState(false);
  const [isHeroState, setIsHeroState] = useState(true);

  // Stage references
  const stageRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const cubieRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sphereRef = useRef<HTMLDivElement>(null);

  // Drag rotation angles for Hero interaction
  const rotX = useRef(-22);
  const rotY = useRef(26);
  const targetRotX = useRef(-22);
  const targetRotY = useRef(26);
  const velX = useRef(0);
  const velY = useRef(0);
  const isDragging = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });

  // Current interpolated state
  const smoothBreakRef = useRef(0);
  const currentPosRef = useRef({ x: 0, y: 0 });
  const isHeroStateRef = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Main 60-120fps Animation & Scroll Tracking Loop
  useEffect(() => {
    if (!mounted) return;

    let animId: number;
    let time = 0;

    const tick = () => {
      time += 0.016;

      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const docH = Math.max(
        document.documentElement.scrollHeight - winH,
        1
      );
      const scrollFraction = Math.min(1, Math.max(0, scrollY / docH));
      const isMobile = winW < 768;

      // Calculate breaking progress (0 at hero, smoothly ramps to 1 as user scrolls past 300px)
      const rawBreak = Math.min(1, Math.max(0, (scrollY - 20) / 280));
      // Smooth cubic step
      const targetBreak = rawBreak * rawBreak * (3 - 2 * rawBreak);
      smoothBreakRef.current += (targetBreak - smoothBreakRef.current) * 0.12;
      const bProgress = smoothBreakRef.current;

      // Update hero interactive state flag
      const nextIsHero = bProgress < 0.15;
      if (nextIsHero !== isHeroStateRef.current) {
        isHeroStateRef.current = nextIsHero;
        setIsHeroState(nextIsHero);
      }

      // Drag inertia & damping (when at Hero)
      if (isDragging.current) {
        rotX.current += (targetRotX.current - rotX.current) * 0.45;
        rotY.current += (targetRotY.current - rotY.current) * 0.45;
      } else {
        if (Math.abs(velX.current) > 0.01 || Math.abs(velY.current) > 0.01) {
          rotX.current += velX.current;
          rotY.current += velY.current;
          velX.current *= 0.92;
          velY.current *= 0.92;
          targetRotX.current = rotX.current;
          targetRotY.current = rotY.current;
        } else {
          // Continuous gentle idle orbit
          rotY.current += 0.12;
          targetRotY.current = rotY.current;
        }
      }
      rotX.current = Math.max(-65, Math.min(65, rotX.current));

      // Calculate Screen Coordinates (Waypoints) across the sections:
      // Hero anchor position
      const heroAnchor = document.getElementById("hero-cube-anchor");
      let heroX = winW * 0.72;
      let heroY = winH * 0.48;

      if (heroAnchor) {
        const rect = heroAnchor.getBoundingClientRect();
        heroX = rect.left + rect.width / 2;
        heroY = rect.top + rect.height / 2;
      } else if (isMobile) {
        heroX = winW * 0.5;
        heroY = winH * 0.55;
      }

      // Waypoint trajectory through sections ("giving pages one by one"):
      // 0: Hero, 1: About & Experience, 2: LeetCode & GitHub, 3: Projects, 4: Tech Stack, 5: Contact
      let targetX = heroX;
      let targetY = heroY;
      let sectionExplosionMult = 1.0;

      if (bProgress > 0.01) {
        // Break has started: interpolate across section waypoints based on scrollFraction
        if (scrollFraction < 0.22) {
          // Section 2: About & Experience (Top-Right / Right flank)
          const t = Math.min(1, (scrollFraction - 0.05) / 0.17);
          const p2X = isMobile ? winW * 0.75 : winW * 0.82;
          const p2Y = winH * 0.38;
          targetX = heroX + (p2X - heroX) * t;
          targetY = heroY + (p2Y - heroY) * t;
          sectionExplosionMult = 1.0;
        } else if (scrollFraction < 0.45) {
          // Section 3: LeetCode & GitHub (Left flank halo behind cards)
          const t = (scrollFraction - 0.22) / 0.23;
          const p2X = isMobile ? winW * 0.75 : winW * 0.82;
          const p2Y = winH * 0.38;
          const p3X = isMobile ? winW * 0.25 : winW * 0.18;
          const p3Y = winH * 0.48;
          targetX = p2X + (p3X - p2X) * t;
          targetY = p2Y + (p3Y - p2Y) * t;
          sectionExplosionMult = 1.15;
        } else if (scrollFraction < 0.70) {
          // Section 4: Projects & Case Studies (Expanded dual flank framing project cards)
          const t = (scrollFraction - 0.45) / 0.25;
          const p3X = isMobile ? winW * 0.25 : winW * 0.18;
          const p3Y = winH * 0.48;
          const p4X = winW * 0.50;
          const p4Y = winH * 0.50;
          targetX = p3X + (p4X - p3X) * t;
          targetY = p3Y + (p4Y - p3Y) * t;
          sectionExplosionMult = 1.4;
        } else if (scrollFraction < 0.88) {
          // Section 5: Tech Stack & Tools (Center-spread constellation)
          const t = (scrollFraction - 0.70) / 0.18;
          const p4X = winW * 0.50;
          const p4Y = winH * 0.50;
          const p5X = isMobile ? winW * 0.80 : winW * 0.84;
          const p5Y = winH * 0.46;
          targetX = p4X + (p5X - p4X) * t;
          targetY = p4Y + (p5Y - p4Y) * t;
          sectionExplosionMult = 1.25;
        } else {
          // Section 6: Contact & Footer (Lower-right soft orbit)
          const t = (scrollFraction - 0.88) / 0.12;
          const p5X = isMobile ? winW * 0.80 : winW * 0.84;
          const p5Y = winH * 0.46;
          const p6X = isMobile ? winW * 0.75 : winW * 0.78;
          const p6Y = winH * 0.62;
          targetX = p5X + (p6X - p5X) * t;
          targetY = p5Y + (p6Y - p5Y) * t;
          sectionExplosionMult = 0.95;
        }
      }

      // Smooth position interpolation (lerp)
      currentPosRef.current.x += (targetX - currentPosRef.current.x) * 0.15;
      currentPosRef.current.y += (targetY - currentPosRef.current.y) * 0.15;

      // Position Stage Center
      if (stageRef.current) {
        stageRef.current.style.left = `${currentPosRef.current.x}px`;
        stageRef.current.style.top = `${currentPosRef.current.y}px`;
      }

      // 3D Revolution Angles of the Whole Cluster
      // Combines user drag (when at hero) + scroll-driven rotation + continuous orbital time
      const clusterPitch = rotX.current + (Math.sin(scrollY * 0.002 + time * 0.5) * 16) * bProgress;
      const clusterYaw = rotY.current + (scrollY * 0.18 + time * 12) * bProgress;
      const clusterRoll = (scrollY * 0.06 + Math.cos(time * 0.4) * 8) * bProgress;
      const bobY = Math.sin(time * 1.5) * (bProgress > 0.5 ? 12 : 6);

      if (clusterRef.current) {
        clusterRef.current.style.transform = `translate3d(0, ${bobY}px, 0) rotateX(${clusterPitch}deg) rotateY(${clusterYaw}deg) rotateZ(${clusterRoll}deg)`;
      }

      // Update Each of the 27 Cubies
      const cubieSize = isMobile ? 64 : 76;
      const baseStep = cubieSize + 4;
      const maxExplosion = (isMobile ? 180 : 280) * sectionExplosionMult;
      const currentExplosion = bProgress * maxExplosion;

      for (let i = 0; i < CUBIES.length; i++) {
        const c = CUBIES[i];
        const el = cubieRefs.current[i];
        if (!el) continue;

        // Position: Base 3x3x3 grid + radial explosion + deterministic scatter
        const posX = c.x * (baseStep + currentExplosion) + c.scatterX * bProgress;
        const posY = c.y * (baseStep + currentExplosion) + c.scatterY * bProgress;
        const posZ = c.z * (baseStep + currentExplosion) + c.scatterZ * bProgress;

        // Local 3D tumbling (0 at hero, spins actively when broken)
        const localRx = c.spinX * (scrollY * 0.35 + time * 24) * bProgress;
        const localRy = c.spinY * (scrollY * 0.45 + time * 30) * bProgress;
        const localRz = c.spinZ * (scrollY * 0.25 + time * 18) * bProgress;

        el.style.transform = `translate3d(${posX}px, ${posY}px, ${posZ}px) rotateX(${localRx}deg) rotateY(${localRy}deg) rotateZ(${localRz}deg)`;
      }

      // Update Floating Emerald Accent Sphere (portfolio native green)
      if (sphereRef.current) {
        const sphereOrbitAngle = time * 1.8 + scrollY * 0.005;
        const sphereRadius = 140 + bProgress * 180;
        const sphereX = Math.cos(sphereOrbitAngle) * sphereRadius;
        const sphereY = Math.sin(sphereOrbitAngle * 0.7) * (sphereRadius * 0.6) - 40;
        const sphereZ = Math.sin(sphereOrbitAngle) * (sphereRadius * 0.8);
        sphereRef.current.style.transform = `translate3d(${sphereX}px, ${sphereY}px, ${sphereZ}px)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [mounted]);

  // Pointer Drag Handlers (Active at Hero)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isHeroStateRef.current) return;
    isDragging.current = true;
    startPointer.current = { x: e.clientX, y: e.clientY };
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velX.current = 0;
    velY.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    playTick();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !isHeroStateRef.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    targetRotY.current += dx * 0.55;
    targetRotX.current -= dy * 0.55;
    velY.current = dx * 0.35;
    velX.current = -dy * 0.35;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignored
    }
  };

  if (!mounted) return null;

  const cubieSize = 76;
  const halfSize = cubieSize / 2;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
      style={{ perspective: "1100px" }}
    >
      {/* Dynamic 3D Stage Anchor */}
      <div
        ref={stageRef}
        className="absolute w-0 h-0"
        style={{
          transformStyle: "preserve-3d",
          pointerEvents: "none",
        }}
      >
        {/* Invisible hit-box at Hero for seamless drag capture */}
        {isHeroState && (
          <div
            className="absolute -left-[180px] -top-[180px] w-[360px] h-[360px] rounded-full cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{ transform: "translateZ(80px)" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
        )}

        {/* Revolving 3D Cluster */}
        <div
          ref={clusterRef}
          className={`relative w-0 h-0 ${isHeroState ? "cursor-grab active:cursor-grabbing" : ""}`}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* 27 Cubies */}
          {CUBIES.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => {
                cubieRefs.current[i] = el;
              }}
              className="absolute pointer-events-auto cursor-pointer transition-shadow"
              onClick={() => playPop()}
              onMouseEnter={() => playTick()}
              style={{
                width: `${cubieSize}px`,
                height: `${cubieSize}px`,
                left: `-${halfSize}px`,
                top: `-${halfSize}px`,
                transformStyle: "preserve-3d",
                transformOrigin: "50% 50% 0px",
                willChange: "transform",
              }}
            >
              {/* Front (Z+) */}
              <div
                className="absolute inset-0 rounded-[10px] border-[2px] border-[#1A1A1A] overflow-hidden"
                style={{
                  backgroundColor: c.faces.front,
                  transform: `rotateY(0deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
                }}
              />
              {/* Back (Z-) */}
              <div
                className="absolute inset-0 rounded-[10px] border-[2px] border-[#1A1A1A] overflow-hidden"
                style={{
                  backgroundColor: c.faces.back,
                  transform: `rotateY(180deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
                }}
              />
              {/* Right (X+) */}
              <div
                className="absolute inset-0 rounded-[10px] border-[2px] border-[#1A1A1A] overflow-hidden"
                style={{
                  backgroundColor: c.faces.right,
                  transform: `rotateY(90deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
                }}
              />
              {/* Left (X-) */}
              <div
                className="absolute inset-0 rounded-[10px] border-[2px] border-[#1A1A1A] overflow-hidden"
                style={{
                  backgroundColor: c.faces.left,
                  transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
                }}
              />
              {/* Top (Y-) */}
              <div
                className="absolute inset-0 rounded-[10px] border-[2px] border-[#1A1A1A] overflow-hidden"
                style={{
                  backgroundColor: c.faces.top,
                  transform: `rotateX(90deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
                }}
              />
              {/* Bottom (Y+) */}
              <div
                className="absolute inset-0 rounded-[10px] border-[2px] border-[#1A1A1A] overflow-hidden"
                style={{
                  backgroundColor: c.faces.bottom,
                  transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
                }}
              />
            </div>
          ))}

          {/* Floating Emerald Accent Sphere (Green, NO PURPLE) */}
          <div
            ref={sphereRef}
            className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.5)] pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}
