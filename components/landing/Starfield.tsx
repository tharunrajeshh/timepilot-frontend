"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  speed: number;
  size: number;
  length: number;
  opacity: number;
};

type ShootingStar = {
  x: number;
  y: number;
  speed: number;
  length: number;
  life: number;
  maxLife: number;
  angle: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    let animationFrame = 0;

    let lastTime = performance.now();

    let shootingTimer = 2 + Math.random() * 4;

    const stars: Star[] = [];

    const shootingStars: ShootingStar[] = [];

    const createStars = () => {
      stars.length = 0;

      const count = Math.min(
        230,
        Math.max(
          100,
          Math.floor((width * height) / 8500)
        )
      );

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,

          y: Math.random() * height,

          speed: 18 + Math.random() * 70,

          size: 0.4 + Math.random() * 1.5,

          length: 4 + Math.random() * 16,

          opacity: 0.25 + Math.random() * 0.7,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;

      height = window.innerHeight;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = width * dpr;

      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;

      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      createStars();
    };

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.9,

        y: Math.random() * height * 0.25,

        speed: 500 + Math.random() * 300,

        length: 80 + Math.random() * 100,

        life: 0,

        maxLife: 0.6 + Math.random() * 0.5,

        angle:
          Math.PI * 0.28 +
          Math.random() * 0.16,
      });
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    const animate = (now: number) => {
      const delta = Math.min(
        (now - lastTime) / 1000,
        0.05
      );

      lastTime = now;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
       * NORMAL FALLING STARS
       */

      stars.forEach((star) => {
        star.y += star.speed * delta;

        if (star.y > height + 30) {
          star.y = -30;

          star.x =
            Math.random() * width;
        }

        const gradient =
          ctx.createLinearGradient(
            star.x,
            star.y - star.length,
            star.x,
            star.y
          );

        gradient.addColorStop(
          0,
          "rgba(180,220,255,0)"
        );

        gradient.addColorStop(
          0.65,
          `rgba(190,225,255,${star.opacity * 0.35})`
        );

        gradient.addColorStop(
          1,
          `rgba(255,255,255,${star.opacity})`
        );

        ctx.beginPath();

        ctx.moveTo(
          star.x,
          star.y - star.length
        );

        ctx.lineTo(
          star.x,
          star.y
        );

        ctx.strokeStyle = gradient;

        ctx.lineWidth = star.size;

        ctx.stroke();

        /*
         * STAR HEAD
         */

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;

        ctx.fill();

        /*
         * SMALL GLOW
         */

        if (star.size > 1.1) {
          const glow =
            ctx.createRadialGradient(
              star.x,
              star.y,
              0,
              star.x,
              star.y,
              9
            );

          glow.addColorStop(
            0,
            `rgba(150,210,255,${star.opacity * 0.25})`
          );

          glow.addColorStop(
            1,
            "rgba(150,210,255,0)"
          );

          ctx.fillStyle = glow;

          ctx.beginPath();

          ctx.arc(
            star.x,
            star.y,
            9,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      });

      /*
       * SHOOTING STARS
       */

      shootingTimer -= delta;

      if (shootingTimer <= 0) {
        spawnShootingStar();

        shootingTimer =
          3.5 + Math.random() * 5;
      }

      for (
        let i = shootingStars.length - 1;
        i >= 0;
        i--
      ) {
        const star =
          shootingStars[i];

        star.life += delta;

        star.x +=
          Math.cos(star.angle) *
          star.speed *
          delta;

        star.y +=
          Math.sin(star.angle) *
          star.speed *
          delta;

        if (
          star.life >= star.maxLife ||
          star.x > width + 200 ||
          star.y > height + 200
        ) {
          shootingStars.splice(i, 1);

          continue;
        }

        const progress =
          star.life / star.maxLife;

        const fade =
          progress < 0.15
            ? progress / 0.15
            : 1 -
              (progress - 0.15) /
                0.85;

        const tailX =
          star.x -
          Math.cos(star.angle) *
            star.length;

        const tailY =
          star.y -
          Math.sin(star.angle) *
            star.length;

        const gradient =
          ctx.createLinearGradient(
            star.x,
            star.y,
            tailX,
            tailY
          );

        gradient.addColorStop(
          0,
          `rgba(255,255,255,${fade})`
        );

        gradient.addColorStop(
          0.4,
          `rgba(100,190,255,${fade * 0.6})`
        );

        gradient.addColorStop(
          1,
          "rgba(100,190,255,0)"
        );

        ctx.strokeStyle = gradient;

        ctx.lineWidth = 1.8;

        ctx.beginPath();

        ctx.moveTo(
          star.x,
          star.y
        );

        ctx.lineTo(
          tailX,
          tailY
        );

        ctx.stroke();

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          1.7,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${fade})`;

        ctx.fill();
      }

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    animationFrame =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}