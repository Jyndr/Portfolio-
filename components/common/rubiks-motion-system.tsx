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
  scatterX: number;
  scatterY: number;
  scatterZ: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  faces: FaceColors;
}

// Portfolio-native color palette:
// At First (Hero): ALL 6 exterior faces of the 3x3 Rubik's cube are 100% clean WHITE!
// Subtle lighting tones provide crisp 3D volume and depth perception without any green.
const COLOR_WHITE_TOP = "#FFFFFF";      // Brilliant overhead white
const COLOR_WHITE_FRONT = "#FAFAF8";    // Crisp white
const COLOR_WHITE_SIDE = "#F2F2EE";     // Subtle shaded white
const COLOR_WHITE_BOTTOM = "#EBEBE5";   // Shaded white

// Soft light green / pastel mint for tumbling accents (ONLY when broken/moving):
// NOT dark green! Soft, airy, delicate light mint!
const COLOR_LIGHT_MINT = "#A7F3D0";     // Soft pastel mint (Tailwind emerald-200)
const COLOR_PALE_MINT = "#D1FAE5";      // Pale mint cream (Tailwind emerald-100)

function createCubieConfigs(): CubieConfig[] {
  const configs: CubieConfig[] = [];
  let id = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Deterministic pseudo-random scatter trajectory (from prev approved movement)
        const scatterX = Math.sin(id * 3.7 + 1.2) * 75;
        const scatterY = Math.cos(id * 2.3 + 0.8) * 80;
        const scatterZ = Math.sin(id * 5.1 + 2.1) * 75;

        // Individual tumbling rates
        const spinX = (0.7 + (id % 4) * 0.3) * (id % 2 === 0 ? 1 : -1);
        const spinY = (0.8 + ((id * 3) % 5) * 0.25) * (id % 3 === 0 ? 1 : -1);
        const spinZ = (0.6 + ((id * 7) % 4) * 0.2) * (id % 2 !== 0 ? 1 : -1);

        // At First (Hero): All visible exterior faces are 100% clean white!
        // Inner faces reveal soft light mint ONLY when broken apart.
        configs.push({
          id,
          x,
          y,
          z,
          scatterX,
          scatterY,
          scatterZ,
          spinX,
          spinY,
          spinZ,
          faces: {
            top: COLOR_WHITE_TOP,
            front: COLOR_WHITE_FRONT,
            right: COLOR_WHITE_SIDE,
            left: COLOR_WHITE_SIDE,
            bottom: COLOR_WHITE_BOTTOM,
            back: z === -1 ? COLOR_WHITE_FRONT : (id % 2 === 0 ? COLOR_LIGHT_MINT : COLOR_PALE_MINT),
          },
        });
        id++;
      }
    }
  }

  return configs;
}

const CUBIES = createCubieConfigs();

// The hand-picked 7 cubies that persist after the 1st slide (Hero):
// Symmetrically distributed across corners, edges, and center faces
const SURVIVOR_INDICES = [2, 6, 10, 12, 16, 20, 24];
const SURVIVOR_SET = new Set(SURVIVOR_INDICES);

export function RubiksMotionSystem() {
  const [mounted, setMounted] = useState(false);
  const [isHeroState, setIsHeroState] = useState(true);

  // References
  const stageRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const cubieRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sphereRef = useRef<HTMLDivElement>(null);
  const hitboxRef = useRef<HTMLDivElement>(null);

  // Drag rotation angles for Hero interaction (default viewing angle)
  const rotX = useRef(-24);
  const rotY = useRef(32);
  const targetRotX = useRef(-24);
  const targetRotY = useRef(32);
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
      const docH = Math.max(document.documentElement.scrollHeight - winH, 1);
      const scrollFraction = Math.min(1, Math.max(0, scrollY / docH));
      const isMobile = winW < 768;

      // Base cubie sizing: prominent size that matches the hero corner perfectly
      const cubieSize = isMobile ? 68 : 84;
      const baseStep = cubieSize + 4;

      // --- BREAKING PROGRESS ---
      // Ramps from 0 at Hero to 1 as user scrolls away
      const rawBreak = Math.min(1, Math.max(0, (scrollY - 20) / 280));
      const targetBreak = rawBreak * rawBreak * (3 - 2 * rawBreak);
      smoothBreakRef.current += (targetBreak - smoothBreakRef.current) * 0.12;
      const bProgress = smoothBreakRef.current;

      // Update hero interactive state flag
      const nextIsHero = bProgress < 0.15;
      if (nextIsHero !== isHeroStateRef.current) {
        isHeroStateRef.current = nextIsHero;
        setIsHeroState(nextIsHero);
      }

      // Drag inertia & damping (active at Hero)
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
          rotY.current += 0.10;
          targetRotY.current = rotY.current;
        }
      }
      rotX.current = Math.max(-65, Math.min(65, rotX.current));

      // Measure Hero Anchor Position (placed down in the corner)
      const heroAnchor = document.getElementById("hero-cube-anchor");
      let heroX = winW * 0.80;
      let heroY = winH * 0.65;

      if (heroAnchor) {
        const rect = heroAnchor.getBoundingClientRect();
        heroX = rect.left + rect.width / 2;
        heroY = rect.top + rect.height / 2;
      } else if (isMobile) {
        heroX = winW * 0.5;
        heroY = winH * 0.58;
      }

      if (hitboxRef.current) {
        hitboxRef.current.style.left = `${heroX}px`;
        hitboxRef.current.style.top = `${heroY}px`;
      }

      // --- PREVIOUS REVOLVING MOVEMENT LOGIC (Restored with 100% Fidelity) ---
      // User is the Sun at viewport center: (sunX, sunY)
      // Cubes are Earth revolving around the user in a 3D celestial orbit
      const sunX = winW * 0.5;
      const sunY = winH * 0.5;
      const rx = isMobile ? winW * 0.40 : winW * 0.44;
      const ry = isMobile ? winH * 0.38 : winH * 0.42;

      // Starting angle aligned with the Hero anchor
      const heroAngle = Math.atan2(heroY - sunY, heroX - sunX);

      // Orbital revolution angle: combines scroll progress (1.5 full orbits) + continuous planetary time
      const scrollOrbit = scrollFraction * (Math.PI * 2 * 1.5);
      const timeOrbit = time * 0.35;
      const currentOrbitAngle = heroAngle + (scrollOrbit + timeOrbit) * bProgress;

      let targetX = heroX;
      let targetY = heroY;
      const sectionExplosionMult = 0.8;

      if (bProgress > 0.01) {
        // Planetary orbital ellipse around the user (Sun)
        const orbitX = sunX + Math.cos(currentOrbitAngle) * rx;
        const orbitY = sunY + Math.sin(currentOrbitAngle) * ry;

        // Smooth transition from hero anchor into orbit
        targetX = heroX + (orbitX - heroX) * bProgress;
        targetY = heroY + (orbitY - heroY) * bProgress;
      }

      // Smooth position interpolation (lerp)
      if (currentPosRef.current.x === 0 && currentPosRef.current.y === 0) {
        currentPosRef.current.x = heroX;
        currentPosRef.current.y = heroY;
      } else {
        currentPosRef.current.x += (targetX - currentPosRef.current.x) * 0.15;
        currentPosRef.current.y += (targetY - currentPosRef.current.y) * 0.15;
      }

      // Position Stage Center
      if (stageRef.current) {
        stageRef.current.style.transform = `translate3d(${currentPosRef.current.x}px, ${currentPosRef.current.y}px, 0px)`;
      }

      // 3D Revolution Angles of the Whole Cluster
      // Like Earth tilted at an angle, revolving and rotating in 3D
      const clusterPitch = rotX.current + Math.sin(scrollY * 0.002 + time * 0.5) * 16 * bProgress;
      const clusterYaw = rotY.current + (scrollY * 0.20 + time * 14) * bProgress;
      const clusterRoll = (scrollY * 0.06 + Math.cos(time * 0.4) * 10) * bProgress;
      const bobY = Math.sin(time * 1.6) * (bProgress > 0.5 ? 10 : 6);

      // Deep 3D perspective pushback so cubes stay in the background and don't block text
      const orbitalZ = Math.sin(currentOrbitAngle) * 50;
      const pushBackZ = (-170 + orbitalZ) * bProgress;

      if (clusterRef.current) {
        clusterRef.current.style.transform = `translate3d(0, ${bobY}px, ${pushBackZ}px) rotateX(${clusterPitch}deg) rotateY(${clusterYaw}deg) rotateZ(${clusterRoll}deg)`;
      }

      // --- CUBIE EXPLOSION & TANGENTIAL ARC STREAM ---
      const maxExplosion = (isMobile ? 65 : 100) * sectionExplosionMult;
      const currentExplosion = bProgress * maxExplosion;
      const tangentAngle = currentOrbitAngle + Math.PI / 2;

      // Slice sliding angles during early scroll
      const slideTopDeg = bProgress < 0.3 ? Math.min(1, Math.max(0, scrollY / 140)) * 90 : 0;
      const slideRightDeg = bProgress < 0.3 ? Math.min(1, Math.max(0, (scrollY - 140) / 140)) * 90 : 0;

      // Cubies dynamically reduce in size after the first slide (from 1.0 down to ~0.50)
      const cubieScale = 1 - bProgress * 0.50;

      for (let i = 0; i < CUBIES.length; i++) {
        const c = CUBIES[i];
        const el = cubieRefs.current[i];
        if (!el) continue;

        const isSurvivor = SURVIVOR_SET.has(i);

        // Only a few cubies (7 total) persist after the first slide; the other 20 fade out cleanly
        let opacity = 1;
        let currentScale = cubieScale;

        if (!isSurvivor) {
          if (bProgress <= 0.05) {
            opacity = 1;
            currentScale = 1;
          } else {
            const fade = Math.max(0, 1 - (bProgress - 0.05) / 0.28);
            opacity = fade;
            currentScale = cubieScale * fade;
            if (fade <= 0.001) {
              el.style.display = "none";
              continue;
            }
          }
        }
        el.style.display = "block";
        el.style.opacity = `${opacity}`;

        // Base grid offset
        let bx = c.x * (baseStep + currentExplosion);
        let by = c.y * (baseStep + currentExplosion);
        let bz = c.z * (baseStep + currentExplosion);
        let sliceRotX = 0;
        let sliceRotY = 0;

        // Subtle slice solving twist at the very beginning before full break
        if (bProgress < 0.2) {
          if (c.y === -1 && Math.abs(slideTopDeg) > 0.01) {
            const rad = (slideTopDeg * Math.PI) / 180;
            const xNew = bx * Math.cos(rad) - bz * Math.sin(rad);
            const zNew = bx * Math.sin(rad) + bz * Math.cos(rad);
            bx = xNew;
            bz = zNew;
            sliceRotY = slideTopDeg;
          }
          if (c.x === 1 && Math.abs(slideRightDeg) > 0.01) {
            const rad = (slideRightDeg * Math.PI) / 180;
            const yNew = by * Math.cos(rad) - bz * Math.sin(rad);
            const zNew = by * Math.sin(rad) + bz * Math.cos(rad);
            by = yNew;
            bz = zNew;
            sliceRotX = slideRightDeg;
          }
        }

        // Tangential stream along the orbit arc:
        // Survivors are gracefully distributed across the celestial orbit
        let arcX = 0;
        let arcY = 0;

        if (isSurvivor) {
          const survivorOrder = SURVIVOR_INDICES.indexOf(i); // 0 to 6
          const arcSpread = (survivorOrder - 3) * (isMobile ? 55 : 85) * bProgress;
          arcX = Math.cos(tangentAngle) * arcSpread;
          arcY = Math.sin(tangentAngle) * arcSpread;
        } else {
          const cubieArcOffset = ((i - 13) / 27) * 40 * bProgress;
          arcX = Math.cos(tangentAngle) * cubieArcOffset;
          arcY = Math.sin(tangentAngle) * cubieArcOffset;
        }

        // Position: Base grid + radial explosion + scatter + orbital arc stream
        const posX = bx + c.scatterX * bProgress + arcX;
        const posY = by + c.scatterY * bProgress + arcY;
        const posZ = bz + c.scatterZ * bProgress;

        // Local 3D tumbling (axial rotation, like Earth spinning on its axis)
        const localRx = sliceRotX * (1 - bProgress) + c.spinX * (scrollY * 0.35 + time * 24) * bProgress;
        const localRy = sliceRotY * (1 - bProgress) + c.spinY * (scrollY * 0.45 + time * 30) * bProgress;
        const localRz = c.spinZ * (scrollY * 0.25 + time * 18) * bProgress;

        el.style.transform = `translate3d(${posX}px, ${posY}px, ${posZ}px) rotateX(${localRx}deg) rotateY(${localRy}deg) rotateZ(${localRz}deg) scale3d(${currentScale}, ${currentScale}, ${currentScale})`;
      }

      // Update Floating Soft-Mint Accent Sphere (Moon orbiting the cluster)
      if (sphereRef.current) {
        if (bProgress < 0.05) {
          sphereRef.current.style.opacity = "0";
        } else {
          sphereRef.current.style.opacity = `${Math.min(1, (bProgress - 0.05) * 4)}`;
          const sphereOrbitAngle = time * 2.2 + scrollY * 0.006;
          const sphereRadius = 85 + bProgress * 55;
          const sphereX = Math.cos(sphereOrbitAngle) * sphereRadius;
          const sphereY = Math.sin(sphereOrbitAngle * 0.7) * (sphereRadius * 0.6) - 30;
          const sphereZ = Math.sin(sphereOrbitAngle) * (sphereRadius * 0.8);
          sphereRef.current.style.transform = `translate3d(${sphereX}px, ${sphereY}px, ${sphereZ}px)`;
        }
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

  const cubieSize = 84;
  const halfSize = cubieSize / 2;

  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none transition-[z-index] duration-300 ${isHeroState ? "z-20" : "z-0"
        }`}
      style={{ perspective: "1100px" }}
    >
      {/* Invisible hit-box at Hero for seamless drag capture */}
      {isHeroState && (
        <div
          ref={hitboxRef}
          className="absolute w-[440px] h-[440px] rounded-full cursor-grab active:cursor-grabbing pointer-events-auto"
          style={{
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      )}

      {/* Dynamic 3D Stage Anchor */}
      <div
        ref={stageRef}
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: 0,
          width: "0px",
          height: "0px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Revolving 3D Cluster */}
        <div
          ref={clusterRef}
          className="relative pointer-events-none"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* 27 Cubies */}
          {CUBIES.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => {
                cubieRefs.current[i] = el;
              }}
              className={`absolute ${isHeroState ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
                }`}
              onClick={() => isHeroState && playPop()}
              onMouseEnter={() => isHeroState && playTick()}
              style={{
                width: `${cubieSize}px`,
                height: `${cubieSize}px`,
                left: `-${halfSize}px`,
                top: `-${halfSize}px`,
                transformStyle: "preserve-3d",
                transformOrigin: "50% 50% 0px",
              }}
            >
              {/* Front Face (Z+) - 100% White at first */}
              <div
                className="absolute inset-0 rounded-[12px] border-[2px] border-[#1A1A1A]"
                style={{
                  backgroundColor: c.faces.front,
                  transform: `translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.7), inset 0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
              {/* Back Face (Z-) - Soft Light Mint (revealed when broken) */}
              <div
                className="absolute inset-0 rounded-[12px] border-[2px] border-[#1A1A1A]"
                style={{
                  backgroundColor: c.faces.back,
                  transform: `rotateY(180deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.5), inset 0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
              {/* Right Face (X+) - 100% White (subtle shaded tone) */}
              <div
                className="absolute inset-0 rounded-[12px] border-[2px] border-[#1A1A1A]"
                style={{
                  backgroundColor: c.faces.right,
                  transform: `rotateY(90deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
              {/* Left Face (X-) - 100% White (subtle shaded tone) */}
              <div
                className="absolute inset-0 rounded-[12px] border-[2px] border-[#1A1A1A]"
                style={{
                  backgroundColor: c.faces.left,
                  transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
              {/* Top Face (Y-) - 100% Brilliant White */}
              <div
                className="absolute inset-0 rounded-[12px] border-[2px] border-[#1A1A1A]"
                style={{
                  backgroundColor: c.faces.top,
                  transform: `rotateX(90deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.8), inset 0 2px 4px rgba(0,0,0,0.04)",
                }}
              />
              {/* Bottom Face (Y+) - 100% White (subtle shaded tone) */}
              <div
                className="absolute inset-0 rounded-[12px] border-[2px] border-[#1A1A1A]"
                style={{
                  backgroundColor: c.faces.bottom,
                  transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
                  backfaceVisibility: "hidden",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.5), inset 0 2px 4px rgba(0,0,0,0.06)",
                }}
              />
            </div>
          ))}

          {/* Floating Soft-Mint Accent Sphere (Moon) */}
          <div
            ref={sphereRef}
            className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#A7F3D0] shadow-[0_0_15px_rgba(167,243,208,0.7)] pointer-events-none transition-opacity duration-300"
            style={{
              transformStyle: "preserve-3d",
            }}
          />
        </div>
      </div>
    </div>
  );
}
