"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  velocity: number;
  drift: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.5 + 0.3,
          velocity: Math.random() * 0.05 + 0.02,
          drift: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    initStars();

    // Animation loop
    const animate = () => {
      // Clear canvas with dark background
      ctx.fillStyle = "rgba(8, 9, 11, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      starsRef.current.forEach((star) => {
        // Update position
        star.y -= star.velocity;
        star.x += star.drift;

        // Wrap around
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius + 1.5, 0, Math.PI * 2);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-[1]
      "
    />
  );
}