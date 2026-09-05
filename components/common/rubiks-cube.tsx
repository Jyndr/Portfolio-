"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { RotateCw, Shuffle, RotateCcw, Sparkles } from "lucide-react";

interface FaceColors {
  front: string;
  back: string;
  right: string;
  left: string;
  top: string;
  bottom: string;
}

interface CubieData {
  id: number;
  x: number; // -1, 0, 1
  y: number; // -1 (top), 0 (mid), 1 (bot)
  z: number; // -1 (back), 0 (mid), 1 (front)
  faces: FaceColors;
}

// Portfolio-native color palette (White, Off-White, Emerald Green & Soft Mint — ZERO PURPLE)
const COLOR_WHITE = "#FFFFFF";
const COLOR_OFFWHITE = "#F8F8F5";
const COLOR_CREAM = "#FAFAF8";
const COLOR_GREEN = "#10B981"; // Emerald green
const COLOR_MINT = "#D1FAE5";  // Soft mint

function getInitialFaces(x: number, y: number, z: number): FaceColors {
  return {
    top: COLOR_WHITE,
    bottom: COLOR_OFFWHITE,
    right: COLOR_GREEN,
    left: COLOR_CREAM,
    front: (x + y + z) % 2 === 0 ? COLOR_GREEN : COLOR_WHITE,
    back: COLOR_MINT,
  };
}

function createInitialCubies(): CubieData[] {
  const cubies: CubieData[] = [];
  let id = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubies.push({
          id: id++,
          x,
          y,
          z,
          faces: getInitialFaces(x, y, z),
        });
      }
    }
  }
  return cubies;
}

interface AnimatingSlice {
  axis: "x" | "y" | "z";
  index: number; // -1, 0, 1
  angle: number; // in degrees: 90 or -90
  direction: 1 | -1;
}

export function RubiksCube() {
  const [cubies, setCubies] = useState<CubieData[]>(createInitialCubies);
  const [animatingSlice, setAnimatingSlice] = useState<AnimatingSlice | null>(null);
  const [autoTwist, setAutoTwist] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Rotation angles for user drag & idle animation
  const rotX = useRef(-22); // Initial isometric pitch
  const rotY = useRef(26);  // Initial isometric yaw
  const targetRotX = useRef(-22);
  const targetRotY = useRef(26);
  const velX = useRef(0);
  const velY = useRef(0);
  const isDragging = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });
  const idleTimer = useRef(0);

  // Container ref for 60fps direct transforms
  const cubeWrapperRef = useRef<HTMLDivElement>(null);
  const isTwistingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Continuous animation loop: drag inertia, smooth damping, and idle spin
  useEffect(() => {
    let animId: number;
    let floatTime = 0;

    const tick = () => {
      floatTime += 0.02;

      if (isDragging.current) {
        rotX.current += (targetRotX.current - rotX.current) * 0.45;
        rotY.current += (targetRotY.current - rotY.current) * 0.45;
        idleTimer.current = 0;
      } else {
        if (Math.abs(velX.current) > 0.01 || Math.abs(velY.current) > 0.01) {
          rotX.current += velX.current;
          rotY.current += velY.current;
          velX.current *= 0.92;
          velY.current *= 0.92;
          targetRotX.current = rotX.current;
          targetRotY.current = rotY.current;
          idleTimer.current = 0;
        } else {
          idleTimer.current += 1;
          if (idleTimer.current > 25) {
            rotY.current += 0.14; // gentle continuous orbit
            targetRotY.current = rotY.current;
          }
        }
      }

      // Clamp pitch so the cube doesn't flip upside down
      rotX.current = Math.max(-65, Math.min(65, rotX.current));

      // Subtle vertical floating bob
      const bobY = Math.sin(floatTime) * 6;

      if (cubeWrapperRef.current) {
        cubeWrapperRef.current.style.transform = `translateY(${bobY}px) rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer drag listeners
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startPointer.current = { x: e.clientX, y: e.clientY };
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velX.current = 0;
    velY.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    targetRotY.current += dx * 0.55;
    targetRotX.current -= dy * 0.55;

    velY.current = dx * 0.35;
    velX.current = -dy * 0.35;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const totalDist = Math.hypot(
      e.clientX - startPointer.current.x,
      e.clientY - startPointer.current.y
    );
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignored
    }

    // If it was a quick tap/click without dragging, trigger a slice twist
    if (totalDist < 5) {
      triggerRandomTwist();
    }
  };

  // Perform a 90-degree twist on a specific layer
  const twistLayer = useCallback((axis: "x" | "y" | "z", index: number, direction: 1 | -1 = 1) => {
    if (isTwistingRef.current) return;
    isTwistingRef.current = true;

    setAnimatingSlice({
      axis,
      index,
      angle: direction * 90,
      direction,
    });

    setTimeout(() => {
      setCubies((prev) =>
        prev.map((cubie) => {
          const inSlice =
            (axis === "x" && cubie.x === index) ||
            (axis === "y" && cubie.y === index) ||
            (axis === "z" && cubie.z === index);

          if (!inSlice) return cubie;

          let newX = cubie.x;
          let newY = cubie.y;
          let newZ = cubie.z;
          const faces = { ...cubie.faces };

          if (axis === "y") {
            if (direction === 1) {
              newX = cubie.z;
              newZ = -cubie.x;
              faces.right = cubie.faces.front;
              faces.back = cubie.faces.right;
              faces.left = cubie.faces.back;
              faces.front = cubie.faces.left;
            } else {
              newX = -cubie.z;
              newZ = cubie.x;
              faces.left = cubie.faces.front;
              faces.back = cubie.faces.left;
              faces.right = cubie.faces.back;
              faces.front = cubie.faces.right;
            }
          } else if (axis === "x") {
            if (direction === 1) {
              newY = -cubie.z;
              newZ = cubie.y;
              faces.top = cubie.faces.front;
              faces.back = cubie.faces.top;
              faces.bottom = cubie.faces.back;
              faces.front = cubie.faces.bottom;
            } else {
              newY = cubie.z;
              newZ = -cubie.y;
              faces.bottom = cubie.faces.front;
              faces.back = cubie.faces.bottom;
              faces.top = cubie.faces.back;
              faces.front = cubie.faces.top;
            }
          } else if (axis === "z") {
            if (direction === 1) {
              newX = -cubie.y;
              newY = cubie.x;
              faces.bottom = cubie.faces.right;
              faces.left = cubie.faces.bottom;
              faces.top = cubie.faces.left;
              faces.right = cubie.faces.top;
            } else {
              newX = cubie.y;
              newY = -cubie.x;
              faces.top = cubie.faces.right;
              faces.left = cubie.faces.top;
              faces.bottom = cubie.faces.left;
              faces.right = cubie.faces.bottom;
            }
          }

          return {
            ...cubie,
            x: newX,
            y: newY,
            z: newZ,
            faces,
          };
        })
      );

      setAnimatingSlice(null);
      isTwistingRef.current = false;
    }, 420);
  }, []);

  // Trigger a random slice twist
  const triggerRandomTwist = useCallback(() => {
    const axes: Array<"x" | "y" | "z"> = ["x", "y", "z"];
    const indices = [-1, 1]; // Twist outer layers for prominent visual effect
    const directions: Array<1 | -1> = [1, -1];

    const axis = axes[Math.floor(Math.random() * axes.length)];
    const index = indices[Math.floor(Math.random() * indices.length)];
    const dir = directions[Math.floor(Math.random() * directions.length)];

    twistLayer(axis, index, dir);
  }, [twistLayer]);

  // Scramble sequence (3 sequential twists)
  const handleScramble = useCallback(() => {
    if (isTwistingRef.current) return;
    let count = 0;
    const interval = setInterval(() => {
      triggerRandomTwist();
      count++;
      if (count >= 3) {
        clearInterval(interval);
      }
    }, 480);
  }, [triggerRandomTwist]);

  // Reset cube view & colors
  const handleReset = useCallback(() => {
    targetRotX.current = -22;
    targetRotY.current = 26;
    velX.current = 0;
    velY.current = 0;
    setCubies(createInitialCubies());
  }, []);

  // Auto twist timer: twists every 4.5 seconds when idle
  useEffect(() => {
    if (!autoTwist) return;
    const timer = setInterval(() => {
      if (!isDragging.current && !isTwistingRef.current) {
        triggerRandomTwist();
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [autoTwist, triggerRandomTwist]);

  if (!mounted) {
    return <div className="w-[340px] h-[340px]" />;
  }

  // Cubie sizing & spacing parameters
  const cubieSize = 80; // px size of each individual block
  const step = 84;     // px step (cubieSize + 4px gap)
  const halfSize = cubieSize / 2;

  return (
    <div className="flex flex-col items-center select-none relative z-20">
      {/* Floating Accent Sphere (Emerald Green, NO PURPLE) */}
      <div
        className="absolute -top-6 -left-8 w-6 h-6 rounded-full bg-[#10B981] shadow-md shadow-[#10B981]/30 animate-pulse pointer-events-none hidden sm:block"
        style={{ animationDuration: "3s" }}
      />

      {/* Main 3D Rubik's Cube Perspective Stage */}
      <div
        className="relative w-[320px] sm:w-[380px] h-[340px] sm:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          perspective: "900px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Cube Center Wrapper */}
        <div
          ref={cubeWrapperRef}
          className="relative w-0 h-0"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            transition: isDragging.current ? "none" : "transform 0.05s ease-out",
          }}
        >
          {cubies.map((cubie) => {
            const isSliceMember =
              animatingSlice &&
              ((animatingSlice.axis === "x" && cubie.x === animatingSlice.index) ||
                (animatingSlice.axis === "y" && cubie.y === animatingSlice.index) ||
                (animatingSlice.axis === "z" && cubie.z === animatingSlice.index));

            // Position relative to cube center
            const posX = cubie.x * step;
            const posY = cubie.y * step;
            const posZ = cubie.z * step;

            // Rotation applied during active slice twist
            let sliceTransform = "";
            if (isSliceMember && animatingSlice) {
              if (animatingSlice.axis === "y") {
                sliceTransform = `rotateY(${animatingSlice.angle}deg) `;
              } else if (animatingSlice.axis === "x") {
                sliceTransform = `rotateX(${animatingSlice.angle}deg) `;
              } else if (animatingSlice.axis === "z") {
                sliceTransform = `rotateZ(${animatingSlice.angle}deg) `;
              }
            }

            return (
              <div
                key={cubie.id}
                className="absolute"
                style={{
                  width: `${cubieSize}px`,
                  height: `${cubieSize}px`,
                  left: `-${halfSize}px`,
                  top: `-${halfSize}px`,
                  transformStyle: "preserve-3d",
                  transformOrigin: "50% 50% 0px",
                  transform: `${sliceTransform}translate3d(${posX}px, ${posY}px, ${posZ}px)`,
                  transition: isSliceMember
                    ? "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
                }}
              >
                {/* 6 Faces of the Cubie (crisp 1.5px black border, 8px rounded corners) */}
                {/* Front (Z+) */}
                <div
                  className="absolute inset-0 rounded-[8px] border-[1.5px] border-black overflow-hidden flex items-center justify-center transition-colors duration-200"
                  style={{
                    backgroundColor: cubie.faces.front,
                    transform: `rotateY(0deg) translateZ(${halfSize}px)`,
                    backfaceVisibility: "hidden",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
                  }}
                />
                {/* Back (Z-) */}
                <div
                  className="absolute inset-0 rounded-[8px] border-[1.5px] border-black overflow-hidden flex items-center justify-center transition-colors duration-200"
                  style={{
                    backgroundColor: cubie.faces.back,
                    transform: `rotateY(180deg) translateZ(${halfSize}px)`,
                    backfaceVisibility: "hidden",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
                  }}
                />
                {/* Right (X+) */}
                <div
                  className="absolute inset-0 rounded-[8px] border-[1.5px] border-black overflow-hidden flex items-center justify-center transition-colors duration-200"
                  style={{
                    backgroundColor: cubie.faces.right,
                    transform: `rotateY(90deg) translateZ(${halfSize}px)`,
                    backfaceVisibility: "hidden",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
                  }}
                />
                {/* Left (X-) */}
                <div
                  className="absolute inset-0 rounded-[8px] border-[1.5px] border-black overflow-hidden flex items-center justify-center transition-colors duration-200"
                  style={{
                    backgroundColor: cubie.faces.left,
                    transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
                    backfaceVisibility: "hidden",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
                  }}
                />
                {/* Top (Y-) */}
                <div
                  className="absolute inset-0 rounded-[8px] border-[1.5px] border-black overflow-hidden flex items-center justify-center transition-colors duration-200"
                  style={{
                    backgroundColor: cubie.faces.top,
                    transform: `rotateX(90deg) translateZ(${halfSize}px)`,
                    backfaceVisibility: "hidden",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
                  }}
                />
                {/* Bottom (Y+) */}
                <div
                  className="absolute inset-0 rounded-[8px] border-[1.5px] border-black overflow-hidden flex items-center justify-center transition-colors duration-200"
                  style={{
                    backgroundColor: cubie.faces.bottom,
                    transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
                    backfaceVisibility: "hidden",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Soft Drop Shadow under the 3D cube */}
        <div
          className="absolute bottom-6 w-44 h-10 rounded-full bg-black/10 blur-xl pointer-events-none transform -rotate-x-60 scale-y-50"
          style={{ transform: "translateY(135px) scale(1.1)" }}
        />
      </div>

      {/* Interactive Controls & Drag Hint */}
      <div className="mt-2 flex flex-col items-center gap-2">
        <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
          <Sparkles size={12} className="text-[#10B981]" />
          <span>Drag to Orbit • Click to twist</span>
        </p>

        <div className="flex items-center gap-2">
          {/* Twist Layer Button */}
          <button
            onClick={() => triggerRandomTwist()}
            className="px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-white/90 hover:bg-white text-neutral-800 border border-neutral-300 shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            title="Twist a slice 90 degrees"
          >
            <RotateCw size={13} className="text-neutral-600" />
            <span>Twist</span>
          </button>

          {/* Scramble Button */}
          <button
            onClick={handleScramble}
            className="px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-white/90 hover:bg-white text-neutral-800 border border-neutral-300 shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            title="Scramble cube slices"
          >
            <Shuffle size={13} className="text-neutral-600" />
            <span>Scramble</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-white/90 hover:bg-white text-neutral-800 border border-neutral-300 shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            title="Reset cube view"
          >
            <RotateCcw size={13} className="text-neutral-600" />
            <span>Reset</span>
          </button>

          {/* Auto-Twist Toggle */}
          <button
            onClick={() => setAutoTwist((v) => !v)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium border shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer ${autoTwist
                ? "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]"
                : "bg-white/90 text-neutral-600 border-neutral-300"
              }`}
            title="Toggle automatic idle twisting"
          >
            <span>Auto: {autoTwist ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
