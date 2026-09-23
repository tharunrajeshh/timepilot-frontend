"use client";

import Link from "next/link";
import Starfield from "@/components/landing/Starfield";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative
        isolate
        min-h-[100svh]
        w-full
        overflow-hidden
        bg-[#020711]
        text-white
      "
    >
      {/* =====================================================
          SPACE BACKGROUND
          ===================================================== */}

      <div className="absolute inset-0 z-0 bg-[#020711]" />

      {/* Subtle cinematic glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[radial-gradient(circle_at_50%_45%,rgba(25,80,145,0.22),transparent_48%)]
        "
      />

      {/* =====================================================
          FALLING STARS
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[10]
        "
      >
        <Starfield />
      </div>

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
          pt-[120px]
          text-center
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            flex
            w-full
            max-w-[1050px]
            flex-col
            items-center
          "
        >
          {/* =================================================
              EYEBROW
              ================================================= */}

          <div
            className="
              mb-8
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/15
              bg-black/35
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

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white/80
              "
            >
              Intelligent time management
            </span>
          </div>

          {/* =================================================
              HEADING
              ================================================= */}

          <h1
            className="
              m-0
              max-w-[1000px]
              text-[clamp(50px,7vw,94px)]
              font-semibold
              leading-[0.94]
              tracking-[-0.06em]
              text-white
              drop-shadow-[0_8px_40px_rgba(0,0,0,0.75)]
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

          {/* =================================================
              DESCRIPTION
              ================================================= */}

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

          {/* =================================================
              BUTTONS
              ================================================= */}

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
            {/* Get Started */}

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

            {/* Explore */}

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

          {/* =================================================
              BENEFITS
              ================================================= */}

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
            <div
              className="
                flex
                items-center
                gap-2
                text-[12px]
                text-white/65
              "
            >
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              AI-powered planning
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-[12px]
                text-white/65
              "
            >
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              Focused schedules
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-[12px]
                text-white/65
              "
            >
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              One place for your day
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SOFT BOTTOM FADE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[25]
          h-24
          bg-gradient-to-t
          from-[#020711]/30
          to-transparent
        "
      />
    </section>
  );
}