"use client";

import type { CSSProperties } from "react";
import Link from "next/link";

const stars = [
  { left: "4%", top: "12%", delay: "0s", duration: "4s" },
  { left: "9%", top: "25%", delay: "1s", duration: "5s" },
  { left: "14%", top: "8%", delay: "2s", duration: "4.5s" },
  { left: "19%", top: "20%", delay: "0.5s", duration: "5.5s" },
  { left: "25%", top: "32%", delay: "1.5s", duration: "4.2s" },
  { left: "31%", top: "14%", delay: "2.5s", duration: "5s" },
  { left: "37%", top: "27%", delay: "0.8s", duration: "4.7s" },
  { left: "43%", top: "10%", delay: "1.8s", duration: "5.3s" },
  { left: "49%", top: "30%", delay: "3s", duration: "4.4s" },
  { left: "55%", top: "16%", delay: "0.2s", duration: "5.6s" },
  { left: "61%", top: "7%", delay: "1.3s", duration: "4.8s" },
  { left: "67%", top: "24%", delay: "2.3s", duration: "5.2s" },
  { left: "73%", top: "12%", delay: "0.7s", duration: "4.3s" },
  { left: "79%", top: "30%", delay: "1.7s", duration: "5.4s" },
  { left: "85%", top: "17%", delay: "2.7s", duration: "4.6s" },
  { left: "91%", top: "8%", delay: "0.4s", duration: "5.1s" },
  { left: "96%", top: "27%", delay: "2s", duration: "4.5s" },

  { left: "7%", top: "45%", delay: "1.1s", duration: "5s" },
  { left: "16%", top: "55%", delay: "2.1s", duration: "4.5s" },
  { left: "27%", top: "48%", delay: "0.9s", duration: "5.5s" },
  { left: "38%", top: "58%", delay: "2.8s", duration: "4.8s" },
  { left: "62%", top: "52%", delay: "1.4s", duration: "5.2s" },
  { left: "72%", top: "45%", delay: "2.5s", duration: "4.6s" },
  { left: "84%", top: "56%", delay: "0.6s", duration: "5.4s" },
  { left: "94%", top: "48%", delay: "1.9s", duration: "4.3s" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#02050a] text-white"
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#02050a]"
      />

      {/* Blue space glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[radial-gradient(ellipse_at_50%_70%,rgba(20,80,150,0.28),transparent_55%)]
        "
      />

      {/* =====================================================
          FALLING STARS
          ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
      >
        {stars.map((star, index) => (
          <span
            key={index}
            className="tp-falling-star"
            style={
              {
                left: star.left,
                top: star.top,
                width: index % 3 === 0 ? "3px" : "2px",
                height: index % 3 === 0 ? "3px" : "2px",
                animationDelay: star.delay,
                animationDuration: star.duration,
                "--tp-drift": `${(index % 2 === 0 ? 1 : -1) * 25}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* =====================================================
          EARTH
          ===================================================== */}

      <img
        src="/images/earth.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="
          pointer-events-none
          absolute
          left-1/2
          bottom-[-38%]
          z-[8]
          w-[1350px]
          max-w-none
          -translate-x-1/2
          select-none
          object-contain
          drop-shadow-[0_-25px_110px_rgba(30,125,255,0.42)]
          sm:w-[1500px]
          md:w-[1700px]
          lg:w-[1900px]
          xl:w-[2100px]
        "
      />

      {/* Earth atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-5%]
          left-1/2
          z-[9]
          h-[220px]
          w-[1100px]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse,rgba(35,140,255,0.20),transparent_70%)]
          blur-3xl
        "
      />

      {/* =====================================================
          HERO CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-30
          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1400px]
          items-center
          justify-center
          px-5
          pb-[18vh]
          pt-[135px]
          text-center
          sm:px-8
          lg:px-12
        "
      >
        <div className="flex w-full max-w-[1050px] flex-col items-center">

          {/* Eyebrow */}

          <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/15
              bg-black/40
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#C49A61]
                shadow-[0_0_14px_rgba(196,154,97,0.9)]
              "
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
              Intelligent time management
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              m-0
              max-w-[1000px]
              text-[clamp(50px,7vw,94px)]
              font-semibold
              leading-[0.94]
              tracking-[-0.06em]
              text-white
              drop-shadow-[0_8px_40px_rgba(0,0,0,0.7)]
            "
          >
            <span className="block">
              Take control
            </span>

            <span className="block">
              of your{" "}
              <span className="text-[#EAD9BD]">
                time.
              </span>
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-7
              max-w-[700px]
              text-[15px]
              leading-7
              text-white/75
              sm:text-[17px]
              sm:leading-8
            "
          >
            TimePilot helps you plan your day, prioritize
            what matters, and turn your available time into
            focused progress.
          </p>

          {/* Buttons */}

          <div
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            <Link
              href="/signup"
              className="
                inline-flex
                h-[54px]
                min-w-[185px]
                items-center
                justify-center
                gap-2
                rounded-[13px]
                bg-white
                px-7
                text-[14px]
                font-semibold
                text-[#07101b]
                shadow-[0_15px_45px_rgba(255,255,255,0.18)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#F6F4EE]
              "
            >
              <span className="text-[#07101b]">
                Get started
              </span>

              <span className="text-[#C49A61]">
                →
              </span>
            </Link>

            <Link
              href="#features"
              className="
                inline-flex
                h-[54px]
                min-w-[185px]
                items-center
                justify-center
                rounded-[13px]
                border
                border-white/25
                bg-black/30
                px-7
                text-[14px]
                font-semibold
                text-white
                backdrop-blur-xl
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-white/10
              "
            >
              Explore TimePilot
            </Link>
          </div>

          {/* Benefits */}

          <div
            className="
              mt-9
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-8
              gap-y-3
            "
          >
            <div className="flex items-center gap-2 text-[12px] text-white/65">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              AI-powered planning
            </div>

            <div className="flex items-center gap-2 text-[12px] text-white/65">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              Focused schedules
            </div>

            <div className="flex items-center gap-2 text-[12px] text-white/65">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              One place for your day
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}