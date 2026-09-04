// Responsive Oneko Cat Cursor with touch support, curious/tamed state mechanics, crisp pixel art, white eyes & contact form obstacle avoidance

export function initOneko() {
  if (typeof window === "undefined") return () => { };

  const nekoEl = document.createElement("div");
  nekoEl.id = "oneko";
  nekoEl.ariaHidden = "true";
  nekoEl.style.width = "38px";
  nekoEl.style.height = "38px";
  nekoEl.style.position = "fixed";
  nekoEl.style.pointerEvents = "auto";
  nekoEl.style.cursor = "pointer";
  nekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')";
  nekoEl.style.backgroundSize = "calc(38px * 8) calc(38px * 4)";
  nekoEl.style.imageRendering = "pixelated";
  nekoEl.style.left = "140px";
  nekoEl.style.top = "140px";
  nekoEl.style.zIndex = "999999";
  // Invert filter creates pure black body with bright white eyes and crisp pupil contrast
  nekoEl.style.filter = "invert(0.95) contrast(1.8) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.35))";

  document.body.appendChild(nekoEl);

  let nekoPosX = 140;
  let nekoPosY = 140;
  let targetX = 140;
  let targetY = 140;

  let velX = 0;
  let velY = 0;

  let pointerX = -1000;
  let pointerY = -1000;

  type CatMode = "curious" | "fleeing" | "tamed";
  let catMode: CatMode = "curious";

  let lastMoveTime = Date.now();
  let idleState: "idle" | "scratching" | "sitting" | "sleeping" = "idle";
  let idleTimer = 0;

  let frameCount = 0;
  let lastFrameTime = performance.now();
  let animationFrameId: number;

  const spriteSets: Record<string, number[][]> = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, -4], [-6, -4], [-7, -4]],
    scratchWallN: [[0, -1], [0, -2]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, -2], [-4, -3]],
    tired: [[-3, -2]],
    sleeping: [[-2, -0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, -0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -0], [-4, -1]],
    NW: [[-1, -0], [-1, -1]],
  };

  function setSprite(name: string, frame: number) {
    const set = spriteSets[name] || spriteSets.idle;
    const sprite = set[frame % set.length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 38}px ${sprite[1] * 38}px`;
  }

  // Tame on click or touch
  const tameCat = (e: Event) => {
    e.stopPropagation();
    catMode = "tamed";
    setSprite("alert", 0);
  };

  nekoEl.onclick = tameCat;
  nekoEl.ontouchstart = tameCat;

  const handlePointerMove = (x: number, y: number) => {
    pointerX = x;
    pointerY = y;
    lastMoveTime = Date.now();

    if (idleState === "sleeping" || idleState === "sitting") {
      idleState = "idle";
      idleTimer = 0;
      setSprite("alert", 0);
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    handlePointerMove(event.clientX, event.clientY);
  };

  const onTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      handlePointerMove(event.touches[0].clientX, event.touches[0].clientY);
    }
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("touchstart", onTouchMove, { passive: true });

  // Collision detection helper to keep the cat outside the contact form container
  function applyContactFormObstacle(px: number, py: number): { x: number; y: number } {
    const formEl = document.getElementById("contact-form");
    if (!formEl) return { x: px, y: py };

    const rect = formEl.getBoundingClientRect();
    const margin = 30; // Safety buffer distance around form

    const minX = rect.left - margin;
    const maxX = rect.right + margin;
    const minY = rect.top - margin;
    const maxY = rect.bottom + margin;

    // Check if point is inside restricted form bounding box
    if (px >= minX && px <= maxX && py >= minY && py <= maxY) {
      const distLeft = Math.abs(px - minX);
      const distRight = Math.abs(maxX - px);
      const distTop = Math.abs(py - minY);
      const distBottom = Math.abs(maxY - py);

      const minDist = Math.min(distLeft, distRight, distTop, distBottom);

      if (minDist === distLeft) return { x: minX, y: py };
      if (minDist === distRight) return { x: maxX, y: py };
      if (minDist === distTop) return { x: px, y: minY };
      return { x: px, y: maxY };
    }

    return { x: px, y: py };
  }

  function tick(timestamp: number) {
    animationFrameId = requestAnimationFrame(tick);

    if (timestamp - lastFrameTime < 60) return;
    lastFrameTime = timestamp;
    frameCount++;

    const distToPointer = Math.hypot(nekoPosX - pointerX, nekoPosY - pointerY);
    const now = Date.now();
    const timeSincePointerMove = now - lastMoveTime;

    // Check catch attempt (pointer overlaps cat within 25px)
    if (catMode !== "tamed" && distToPointer < 25) {
      if (catMode === "curious") {
        catMode = "fleeing";
        const angle = Math.atan2(nekoPosY - pointerY, nekoPosX - pointerX);
        targetX = Math.min(Math.max(38, nekoPosX + Math.cos(angle) * 180), window.innerWidth - 70);
        targetY = Math.min(Math.max(38, nekoPosY + Math.sin(angle) * 180), window.innerHeight - 70);
      } else {
        catMode = "tamed";
      }
    }

    if (catMode === "curious") {
      if (distToPointer > 65) {
        targetX = pointerX;
        targetY = pointerY;
        idleState = "idle";
        idleTimer = 0;
      } else {
        targetX = nekoPosX;
        targetY = nekoPosY;
        if (timeSincePointerMove > 4000) {
          if (frameCount % 30 === 0) {
            idleTimer++;
            if (idleTimer > 6) idleState = "sleeping";
            else if (idleTimer > 3) idleState = "sitting";
            else if (Math.random() < 0.3) idleState = "scratching";
          }
        }
      }
    } else if (catMode === "fleeing") {
      if (distToPointer > 160) {
        catMode = "curious";
      }
    } else if (catMode === "tamed") {
      if (distToPointer > 40) {
        targetX = pointerX;
        targetY = pointerY;
        idleState = "idle";
        idleTimer = 0;
      } else {
        targetX = nekoPosX;
        targetY = nekoPosY;
        if (timeSincePointerMove > 5000) {
          if (frameCount % 30 === 0) {
            idleTimer++;
            if (idleTimer > 6) idleState = "sleeping";
            else if (idleTimer > 3) idleState = "sitting";
          }
        }
      }
    }

    // Apply contact form obstacle avoidance to target coordinates
    const safeTarget = applyContactFormObstacle(targetX, targetY);
    targetX = safeTarget.x;
    targetY = safeTarget.y;

    const dx = targetX - nekoPosX;
    const dy = targetY - nekoPosY;
    const distance = Math.hypot(dx, dy);

    if (distance > 4) {
      const maxSpeed = catMode === "fleeing" ? 8 : catMode === "tamed" ? 7 : 6;
      const targetSpeed = Math.min(distance * 0.1, maxSpeed);
      velX = velX * 0.78 + (dx / distance) * targetSpeed * 0.22;
      velY = velY * 0.78 + (dy / distance) * targetSpeed * 0.22;

      nekoPosX += velX;
      nekoPosY += velY;

      // Ensure cat position itself never enters contact form restricted area
      const safePos = applyContactFormObstacle(nekoPosX, nekoPosY);
      nekoPosX = safePos.x;
      nekoPosY = safePos.y;

      // Bound to viewport boundaries on mobile and desktop
      nekoPosX = Math.min(Math.max(19, nekoPosX), window.innerWidth - 19);
      nekoPosY = Math.min(Math.max(19, nekoPosY), window.innerHeight - 19);

      let dir = "";
      dir += velY < -0.3 ? "N" : velY > 0.3 ? "S" : "";
      dir += velX < -0.3 ? "W" : velX > 0.3 ? "E" : "";
      setSprite(dir || "idle", frameCount);
    } else {
      velX *= 0.4;
      velY *= 0.4;

      if (idleState === "sleeping") {
        setSprite("sleeping", Math.floor(frameCount / 4));
      } else if (idleState === "sitting") {
        setSprite("tired", 0);
      } else if (idleState === "scratching") {
        setSprite("scratchSelf", Math.floor(frameCount / 3));
      } else {
        setSprite("idle", 0);
      }
    }

    nekoEl.style.left = `${Math.round(nekoPosX - 19)}px`;
    nekoEl.style.top = `${Math.round(nekoPosY - 19)}px`;
  }

  animationFrameId = requestAnimationFrame(tick);

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchstart", onTouchMove);
    cancelAnimationFrame(animationFrameId);
    nekoEl.remove();
  };
}
