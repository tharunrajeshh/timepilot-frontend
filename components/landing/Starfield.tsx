"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const STAR_COUNT = Math.min(280, Math.floor((width * height) / 8500));

    type Star = {
      x: number;
      y: number;
      z: number;
      r: number;
      baseAlpha: number;
      twinkleSpeed: number;
      phase: number;
      hue: "white" | "violet" | "blue";
    };

    type ShootingStar = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      length: number;
    };

    const stars: Star[] = Array.from({ length: STAR_COUNT }).map(() => {
      const z = Math.random();
      const hueRoll = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        r: 0.3 + z * 1.5,
        baseAlpha: 0.25 + z * 0.65,
        twinkleSpeed: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        hue: hueRoll > 0.92 ? "violet" : hueRoll > 0.84 ? "blue" : "white",
      };
    });

    let shootingStars: ShootingStar[] = [];
    let timeToNextShootingStar = reduceMotion
      ? Infinity
      : 2.5 + Math.random() * 4;

    const spawnShootingStar = () => {
      const startX = Math.random() * width * 0.6 + width * 0.2;
      const startY = Math.random() * height * 0.25;
      const angle = Math.PI * 0.22 + Math.random() * 0.15;
      const speed = 620 + Math.random() * 260;

      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.7 + Math.random() * 0.3,
        length: 90 + Math.random() * 60,
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const pointer = { x: 0, y: 0 };
    const targetPointer = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      targetPointer.x = (e.clientX / width - 0.5) * 2;
      targetPointer.y = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);

    const starColor = (hue: Star["hue"], alpha: number) => {
      if (hue === "violet") return `rgba(196,160,255,${alpha})`;
      if (hue === "blue") return `rgba(150,180,255,${alpha})`;
      return `rgba(255,255,255,${alpha})`;
    };

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const render = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += delta;

      pointer.x += (targetPointer.x - pointer.x) * 0.06;
      pointer.y += (targetPointer.y - pointer.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // soft drifting nebula glow, adds depth behind the stars
      if (!reduceMotion) {
        const nx = width * 0.28 + Math.sin(elapsed * 0.05) * 60;
        const ny = height * 0.32 + Math.cos(elapsed * 0.04) * 40;
        const nebula = ctx.createRadialGradient(
          nx,
          ny,
          0,
          nx,
          ny,
          Math.max(width, height) * 0.5
        );
        nebula.addColorStop(0, "rgba(124,58,237,0.05)");
        nebula.addColorStop(0.5, "rgba(59,130,246,0.02)");
        nebula.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = nebula;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!reduceMotion) {
          s.y += (0.02 + s.z * 0.06) * (delta * 60);
          if (s.y > height + 2) s.y = -2;
        }

        const px = s.x + pointer.x * (10 + s.z * 25);
        const py = s.y + pointer.y * (10 + s.z * 25);

        const twinkle = reduceMotion
          ? 1
          : 0.6 + 0.4 * Math.sin(elapsed * s.twinkleSpeed + s.phase);

        const alpha = s.baseAlpha * twinkle;

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = starColor(s.hue, alpha);
        ctx.fill();

        if (s.r > 1.1) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = starColor(s.hue, alpha * 0.08);
          ctx.fill();
        }
      }

      // shooting stars
      if (!reduceMotion) {
        timeToNextShootingStar -= delta;
        if (timeToNextShootingStar <= 0) {
          spawnShootingStar();
          timeToNextShootingStar = 3.5 + Math.random() * 5;
        }

        shootingStars = shootingStars.filter((star) => {
          star.life += delta;
          star.x += star.vx * delta;
          star.y += star.vy * delta;

          const fade =
            star.life < star.maxLife * 0.15
              ? star.life / (star.maxLife * 0.15)
              : 1 - (star.life - star.maxLife * 0.15) / (star.maxLife * 0.85);

          if (fade <= 0 || star.life >= star.maxLife) return false;

          const angle = Math.atan2(star.vy, star.vx);
          const tailX = star.x - Math.cos(angle) * star.length;
          const tailY = star.y - Math.sin(angle) * star.length;

          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            tailX,
            tailY
          );
          gradient.addColorStop(0, `rgba(255,255,255,${fade})`);
          gradient.addColorStop(0.4, `rgba(196,181,253,${fade * 0.6})`);
          gradient.addColorStop(1, "rgba(196,181,253,0)");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(star.x, star.y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${fade})`;
          ctx.fill();

          return true;
        });
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}