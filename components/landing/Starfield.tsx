"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 20 + Math.random() * 70,
      size: 0.5 + Math.random() * 1.5,
      length: 3 + Math.random() * 14,
      opacity: 0.25 + Math.random() * 0.75,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
      );
    };

    resize();

    window.addEventListener("resize", resize);

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = Math.min(
        (currentTime - lastTime) / 1000,
        0.05
      );

      lastTime = currentTime;

      context.clearRect(
        0,
        0,
        width,
        height
      );

      stars.forEach((star) => {
        star.y += star.speed * delta;

        if (star.y > height + 30) {
          star.y = -30;
          star.x = Math.random() * width;
        }

        const gradient =
          context.createLinearGradient(
            star.x,
            star.y - star.length,
            star.x,
            star.y
          );

        gradient.addColorStop(
          0,
          "rgba(120,190,255,0)"
        );

        gradient.addColorStop(
          0.65,
          `rgba(180,220,255,${star.opacity * 0.45})`
        );

        gradient.addColorStop(
          1,
          `rgba(255,255,255,${star.opacity})`
        );

        context.beginPath();

        context.moveTo(
          star.x,
          star.y - star.length
        );

        context.lineTo(
          star.x,
          star.y
        );

        context.strokeStyle = gradient;

        context.lineWidth = star.size;

        context.stroke();

        context.beginPath();

        context.arc(
          star.x,
          star.y,
          star.size,
          0,
          Math.PI * 2
        );

        context.fillStyle = `rgba(255,255,255,${star.opacity})`;

        context.fill();
      });

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
      aria-hidden="true"
    />
  );
}