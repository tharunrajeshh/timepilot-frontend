"use client";

import Link from "next/link";
import Starfield from "@/components/landing/Starfield";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative isolate
        left-1/2
        min-h-screen
        w-screen
        -translate-x-1/2
        overflow-hidden
        bg-[#02050a]
        font-sans
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="absolute inset-0 -z-30 bg-[#02050a]" />

      {/* Space video */}

      <video
        className="
          absolute
          inset-0
          -z-20
          h-full
          w-full
          object-cover
          opacity-[0.72]
        "
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/space-bg.jpg"
      >
        <source
          src="/videos/space.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark cinematic overlay */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(circle_at_50%_65%,rgba(18,72,130,0.22),transparent_42%),linear-gradient(to_bottom,rgba(2,5,10,0.32)_0%,rgba(2,5,10,0.10)_40%,rgba(2,5,10,0.78)_100%)]
        "
      />

      {/* Top darkness */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[1]
          h-[28%]
          bg-gradient-to-b
          from-[#02050a]
          via-[#02050a]/40
          to-transparent
        "
      />

      {/* =====================================================
          FALLING STARS
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
        "
      >
        <Starfield />
      </div>

      {/* =====================================================
          EARTH
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[4]
          flex
          justify-center
        "
      >
        <img
          src="/images/earth.png"
          alt=""
          draggable={false}
          className="
            absolute
            bottom-[-29%]
            left-1/2
            w-[1180px]
            max-w-none
            -translate-x-1/2
            select-none
            object-contain
            drop-shadow-[0_-25px_100px_rgba(30,120,255,0.22)]
            sm:w-[1350px]
            lg:w-[1500px]
            xl:w-[1650px]
          "
        />
      </div>

      {/* Earth atmosphere */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-20%]
          left-1/2
          z-[5]
          h-[500px]
          w-[1000px]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse,rgba(55,145,255,0.18)_0%,rgba(20,90,180,0.08)_35%,transparent_70%)]
          blur-3xl
        "
      />

      {/* =====================================================
          HERO CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-screen
          max-w-[1400px]
          items-center
          justify-center
          px-6
          pb-[26vh]
          pt-32
          text-center
          sm:px-8
          lg:px-12
        "
      >
        <div className="flex max-w-[1050px] flex-col items-center">
          {/* Eyebrow */}

          <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/[0.06]
              px-4
              py-2
              backdrop-blur-md
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#C49A61]
                shadow-[0_0_12px_rgba(196,154,97,0.8)]
              "
            />

            <span
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-white/70
              "
            >
              Intelligent time management
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              whitespace-nowrap
              text-[clamp(42px,7vw,92px)]
              font-semibold
              leading-[0.95]
              tracking-[-0.055em]
              text-white
              drop-shadow-[0_10px_40px_rgba(0,0,0,0.35)]
            "
          >
            Take control
            <br />
            <span className="text-white/90">
              of your time.
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-7
              max-w-[650px]
              !text-white/70
              text-[15px]
              leading-7
              sm:text-[17px]
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
              gap-3
              sm:flex-row
            "
          >
            <Link
              href="/signup"
              className="
                inline-flex
                h-[52px]
                min-w-[155px]
                items-center
                justify-center
                gap-2
                rounded-[12px]
                bg-white
                px-6
                text-[14px]
                font-semibold
                text-[#07101b]
                shadow-[0_12px_40px_rgba(255,255,255,0.12)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#f6f4ee]
              "
            >
              Get started
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="#features"
              className="
                inline-flex
                h-[52px]
                min-w-[155px]
                items-center
                justify-center
                rounded-[12px]
                border
                border-white/15
                bg-white/[0.05]
                px-6
                text-[14px]
                font-medium
                text-white
                backdrop-blur-md
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-white/[0.10]
              "
            >
              Explore TimePilot
            </Link>
          </div>

          {/* Product qualities */}

          <div
            className="
              mt-9
              flex
              flex-wrap
              justify-center
              gap-x-7
              gap-y-3
              text-[12px]
              text-white/55
            "
          >
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              AI-powered planning
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              Focused schedules
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              One place for your day
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM VIGNETTE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[10]
          h-[30%]
          bg-gradient-to-t
          from-[#02050a]
          via-[#02050a]/30
          to-transparent
        "
      />

      {/* =====================================================
          SCROLL INDICATOR
          ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-1/2
          z-30
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-white/40
          sm:flex
        "
      >
        <span
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.25em]
          "
        >
          Scroll
        </span>

        <span
          className="
            h-8
            w-px
            bg-gradient-to-b
            from-white/40
            to-transparent
          "
        />
      </div>
    </section>
  );
}