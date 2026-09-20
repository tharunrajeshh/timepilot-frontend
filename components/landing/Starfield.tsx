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

    const STAR_COUNT = Math.min(
      260,
      Math.floor((width * height) / 9000)
    );

    type Star = {
      x: number;
      y: number;
      z: number; // depth 0..1 (parallax)
      r: number;
      baseAlpha: number;
      twinkleSpeed: number;
      phase: number;
    };

    const stars: Star[] = Array.from({ length: STAR_COUNT }).map(() => {
      const z = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        r: 0.3 + z * 1.4,
        baseAlpha: 0.25 + z * 0.65,
        twinkleSpeed: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      };
    });

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

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const render = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += delta;

      // Smooth pointer
      pointer.x += (targetPointer.x - pointer.x) * 0.06;
      pointer.y += (targetPointer.y - pointer.y) * 0.06;

      // Trail fade — gives a subtle "glow smear"
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Drift downward slowly (space drift)
        if (!reduceMotion) {
          s.y += (0.02 + s.z * 0.06) * (delta * 60);
          if (s.y > height + 2) s.y = -2;
        }

        // Parallax with pointer (deeper stars move less)
        const px = s.x + pointer.x * (10 + s.z * 25);
        const py = s.y + pointer.y * (10 + s.z * 25);

        // Twinkle
        const twinkle = reduceMotion
          ? 1
          : 0.6 +
            0.4 *
              Math.sin(elapsed * s.twinkleSpeed + s.phase);

        const alpha = s.baseAlpha * twinkle;

        // Star body
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();

        // Soft glow for larger stars
        if (s.r > 1.1) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,190,255,${alpha * 0.08})`;
          ctx.fill();
        }
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