"use client";

import { useEffect, useRef } from "react";

type FallingStar = {
  x: number;
  y: number;
  speed: number;
  size: number;
  length: number;
  alpha: number;
  drift: number;
  twinkle: number;
  phase: number;
  color: "white" | "blue" | "violet";
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  width: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    /* ============================================================
       CONFIG
    ============================================================ */

    const STAR_COUNT = Math.min(
      220,
      Math.max(
        120,
        Math.floor(
          (width * height) / 7000
        )
      )
    );

    const SHOOTING_STAR_MIN_DELAY = 2.5;
    const SHOOTING_STAR_MAX_DELAY = 6;

    /* ============================================================
       STAR CREATION
    ============================================================ */

    const createFallingStar =
      (): FallingStar => {
        const depth =
          Math.random();

        const colorRoll =
          Math.random();

        return {
          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          /*
            Different speeds create depth.
            Front stars move faster.
          */
          speed:
            35 +
            depth * 105,

          /*
            Small stars are more common.
          */
          size:
            0.45 +
            depth * 1.45,

          /*
            Falling trail.
          */
          length:
            7 +
            depth * 25,

          alpha:
            0.25 +
            depth * 0.65,

          /*
            Slight horizontal movement.
          */
          drift:
            -10 +
            Math.random() * 20,

          twinkle:
            0.5 +
            Math.random() * 1.5,

          phase:
            Math.random() *
            Math.PI *
            2,

          color:
            colorRoll > 0.94
              ? "violet"
              : colorRoll > 0.84
                ? "blue"
                : "white",
        };
      };

    const stars: FallingStar[] =
      Array.from(
        {
          length: STAR_COUNT,
        },
        createFallingStar
      );

    /* ============================================================
       SHOOTING STARS
    ============================================================ */

    let shootingStars: ShootingStar[] =
      [];

    let timeToNextShootingStar =
      reduceMotion
        ? Infinity
        : SHOOTING_STAR_MIN_DELAY +
          Math.random() *
            (
              SHOOTING_STAR_MAX_DELAY -
              SHOOTING_STAR_MIN_DELAY
            );

    const spawnShootingStar =
      () => {
        /*
          Start mostly from the upper
          part of the screen.
        */

        const startFromLeft =
          Math.random() < 0.5;

        const startX =
          startFromLeft
            ? Math.random() *
                width *
                0.55
            : width *
                (0.45 +
                  Math.random() *
                    0.5);

        const startY =
          Math.random() *
            height *
            0.28;

        /*
          Slight diagonal downward
          movement.
        */

        const angle =
          Math.PI *
            (0.18 +
              Math.random() *
                0.14);

        const speed =
          520 +
          Math.random() * 360;

        const direction =
          startFromLeft
            ? 1
            : -1;

        shootingStars.push({
          x: startX,

          y: startY,

          vx:
            Math.cos(angle) *
            speed *
            direction,

          vy:
            Math.sin(angle) *
            speed,

          life: 0,

          maxLife:
            0.65 +
            Math.random() * 0.5,

          length:
            90 +
            Math.random() * 100,

          width:
            1 +
            Math.random() * 1.2,
        });
      };

    /* ============================================================
       RESIZE
    ============================================================ */

    const resize = () => {
      width =
        window.innerWidth;

      height =
        window.innerHeight;

      dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width =
        Math.floor(
          width * dpr
        );

      canvas.height =
        Math.floor(
          height * dpr
        );

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    /* ============================================================
       POINTER PARALLAX
    ============================================================ */

    const pointer = {
      x: 0,
      y: 0,
    };

    const targetPointer = {
      x: 0,
      y: 0,
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      targetPointer.x =
        (event.clientX /
          width -
          0.5) *
        2;

      targetPointer.y =
        (event.clientY /
          height -
          0.5) *
        2;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    /* ============================================================
       COLORS
    ============================================================ */

    const getColor = (
      color: FallingStar["color"],
      alpha: number
    ) => {
      if (color === "violet") {
        return `rgba(
          202,
          176,
          255,
          ${alpha}
        )`;
      }

      if (color === "blue") {
        return `rgba(
          155,
          215,
          255,
          ${alpha}
        )`;
      }

      return `rgba(
        255,
        255,
        255,
        ${alpha}
      )`;
    };

    /* ============================================================
       ANIMATION
    ============================================================ */

    let animationFrame = 0;

    let lastTime =
      performance.now();

    let elapsed = 0;

    const render = (
      now: number
    ) => {
      const delta = Math.min(
        (now - lastTime) /
          1000,
        0.05
      );

      lastTime = now;

      elapsed += delta;

      /*
        Smooth pointer movement.
      */

      pointer.x +=
        (
          targetPointer.x -
          pointer.x
        ) * 0.045;

      pointer.y +=
        (
          targetPointer.y -
          pointer.y
        ) * 0.045;

      /*
        IMPORTANT:
        Transparent canvas.

        We do NOT paint a background.
        The Earth video stays visible.
      */

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /* ========================================================
         FALLING STARS
      ======================================================== */

      for (
        let i = 0;
        i < stars.length;
        i++
      ) {
        const star =
          stars[i];

        if (!reduceMotion) {
          /*
            Main falling movement.
          */

          star.y +=
            star.speed *
            delta;

          /*
            Tiny horizontal drift.
          */

          star.x +=
            Math.sin(
              elapsed *
                0.35 +
                star.phase
            ) *
            star.drift *
            delta;

          /*
            Reset at bottom.
          */

          if (
            star.y >
            height + 50
          ) {
            star.y =
              -20 -
              Math.random() *
                100;

            star.x =
              Math.random() *
              width;
          }

          /*
            Keep stars inside
            horizontal area.
          */

          if (
            star.x <
            -50
          ) {
            star.x =
              width + 50;
          }

          if (
            star.x >
            width + 50
          ) {
            star.x = -50;
          }
        }

        /*
          Parallax.
        */

        const px =
          star.x +
          pointer.x *
            (5 +
              star.size *
                8);

        const py =
          star.y +
          pointer.y *
            (5 +
              star.size *
                8);

        /*
          Twinkle.
        */

        const twinkle =
          reduceMotion
            ? 1
            : 0.68 +
              0.32 *
                Math.sin(
                  elapsed *
                    star.twinkle +
                    star.phase
                );

        const alpha =
          star.alpha *
          twinkle;

        /* ======================================================
           FALLING STAR TRAIL
        ====================================================== */

        if (
          !reduceMotion &&
          star.length > 9
        ) {
          const gradient =
            ctx.createLinearGradient(
              px,
              py -
                star.length,
              px,
              py
            );

          gradient.addColorStop(
            0,
            getColor(
              star.color,
              0
            )
          );

          gradient.addColorStop(
            0.55,
            getColor(
              star.color,
              alpha * 0.12
            )
          );

          gradient.addColorStop(
            1,
            getColor(
              star.color,
              alpha * 0.5
            )
          );

          ctx.beginPath();

          ctx.moveTo(
            px,
            py -
              star.length
          );

          ctx.lineTo(
            px,
            py
          );

          ctx.strokeStyle =
            gradient;

          ctx.lineWidth =
            Math.max(
              0.35,
              star.size *
                0.45
            );

          ctx.stroke();
        }

        /* ======================================================
           STAR CORE
        ====================================================== */

        ctx.beginPath();

        ctx.arc(
          px,
          py,
          star.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          getColor(
            star.color,
            alpha
          );

        ctx.fill();

        /*
          Soft glow for
          larger stars.
        */

        if (
          star.size >
          1.15
        ) {
          ctx.beginPath();

          ctx.arc(
            px,
            py,
            star.size * 3.2,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            getColor(
              star.color,
              alpha * 0.08
            );

          ctx.fill();
        }
      }

      /* ========================================================
         SHOOTING STARS
      ======================================================== */

      if (!reduceMotion) {
        timeToNextShootingStar -=
          delta;

        if (
          timeToNextShootingStar <=
          0
        ) {
          spawnShootingStar();

          timeToNextShootingStar =
            SHOOTING_STAR_MIN_DELAY +
            Math.random() *
              (
                SHOOTING_STAR_MAX_DELAY -
                SHOOTING_STAR_MIN_DELAY
              );
        }

        shootingStars =
          shootingStars.filter(
            (star) => {
              star.life +=
                delta;

              star.x +=
                star.vx *
                delta;

              star.y +=
                star.vy *
                delta;

              /*
                Fade in and out.
              */

              const progress =
                star.life /
                star.maxLife;

              let fade = 1;

              if (
                progress <
                0.15
              ) {
                fade =
                  progress /
                  0.15;
              } else {
                fade =
                  1 -
                  (progress -
                    0.15) /
                    0.85;
              }

              if (
                fade <= 0 ||
                star.life >=
                  star.maxLife ||
                star.x <
                  -300 ||
                star.x >
                  width + 300 ||
                star.y >
                  height + 300
              ) {
                return false;
              }

              /*
                Calculate tail.
              */

              const angle =
                Math.atan2(
                  star.vy,
                  star.vx
                );

              const tailX =
                star.x -
                Math.cos(angle) *
                  star.length;

              const tailY =
                star.y -
                Math.sin(angle) *
                  star.length;

              /*
                Main shooting-star
                gradient.
              */

              const gradient =
                ctx.createLinearGradient(
                  star.x,
                  star.y,
                  tailX,
                  tailY
                );

              gradient.addColorStop(
                0,
                `rgba(
                  255,
                  255,
                  255,
                  ${fade}
                )`
              );

              gradient.addColorStop(
                0.2,
                `rgba(
                  220,
                  242,
                  255,
                  ${fade * 0.9}
                )`
              );

              gradient.addColorStop(
                0.55,
                `rgba(
                  130,
                  190,
                  255,
                  ${fade * 0.45}
                )`
              );

              gradient.addColorStop(
                1,
                "rgba(130,190,255,0)"
              );

              ctx.beginPath();

              ctx.moveTo(
                star.x,
                star.y
              );

              ctx.lineTo(
                tailX,
                tailY
              );

              ctx.strokeStyle =
                gradient;

              ctx.lineWidth =
                star.width;

              ctx.lineCap =
                "round";

              ctx.stroke();

              /*
                Bright head.
              */

              ctx.beginPath();

              ctx.arc(
                star.x,
                star.y,
                1.8,
                0,
                Math.PI * 2
              );

              ctx.fillStyle =
                `rgba(
                  255,
                  255,
                  255,
                  ${fade}
                )`;

              ctx.fill();

              /*
                Head glow.
              */

              ctx.beginPath();

              ctx.arc(
                star.x,
                star.y,
                6,
                0,
                Math.PI * 2
              );

              ctx.fillStyle =
                `rgba(
                  120,
                  200,
                  255,
                  ${fade * 0.12}
                )`;

              ctx.fill();

              return true;
            }
          );
      }

      animationFrame =
        requestAnimationFrame(
          render
        );
    };

    animationFrame =
      requestAnimationFrame(
        render
      );

    /* ============================================================
       CLEANUP
    ============================================================ */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-[4]
        h-full
        w-full
      "
      aria-hidden="true"
    />
  );
}