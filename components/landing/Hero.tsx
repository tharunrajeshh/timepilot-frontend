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
        bg-[#02050a]
        text-white
      "
    >
      {/* =====================================================
          SPACE BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
          bg-[#02050a]
        "
      />

      <video
        className="
          absolute
          inset-0
          z-0
          h-full
          w-full
          object-cover
          opacity-60
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

      {/* =====================================================
          SPACE DARKENING
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[linear-gradient(to_bottom,rgba(2,5,10,0.30)_0%,rgba(2,5,10,0.05)_45%,rgba(2,5,10,0.72)_100%)]
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
          z-[2]
        "
      >
        <Starfield />
      </div>

      {/* =====================================================
          EARTH
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-[3]
          h-[52%]
          overflow-hidden
        "
      >
        <img
          src="/images/earth.png"
          alt=""
          draggable={false}
          className="
            absolute
            bottom-[-57%]
            left-1/2
            w-[1100px]
            max-w-none
            -translate-x-1/2
            select-none
            object-contain
            drop-shadow-[0_-20px_90px_rgba(35,130,255,0.30)]
            sm:w-[1300px]
            md:w-[1500px]
            lg:w-[1750px]
            xl:w-[1950px]
          "
        />
      </div>

      {/* =====================================================
          EARTH ATMOSPHERE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-12%]
          left-1/2
          z-[4]
          h-[400px]
          w-[1100px]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse,rgba(40,140,255,0.18)_0%,rgba(20,90,180,0.06)_40%,transparent_72%)]
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
          min-h-[100svh]
          w-full
          max-w-[1400px]
          items-center
          justify-center
          px-5
          pb-[18vh]
          pt-[150px]
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
              mb-7
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/15
              bg-black/30
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
                shadow-[0_0_14px_rgba(196,154,97,0.8)]
              "
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white/75
              "
            >
              Intelligent time management
            </span>
          </div>

          {/* =================================================
              MAIN HEADING
              ================================================= */}

          <h1
            className="
              relative
              z-30
              m-0
              max-w-[1000px]
              text-[clamp(48px,7vw,94px)]
              font-semibold
              leading-[0.94]
              tracking-[-0.06em]
              text-white
              drop-shadow-[0_8px_35px_rgba(0,0,0,0.55)]
            "
          >
            <span className="block">
              Take control
            </span>

            <span className="block text-white">
              of your time.
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p
            className="
              relative
              z-30
              mt-7
              m-0
              max-w-[700px]
              text-[15px]
              font-normal
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
              relative
              z-30
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
                flex
                h-[54px]
                min-w-[180px]
                items-center
                justify-center
                gap-2
                rounded-[13px]
                border
                border-white
                bg-white
                px-7
                text-[14px]
                font-semibold
                text-[#07101b]
                shadow-[0_14px_45px_rgba(255,255,255,0.15)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#f6f4ee]
              "
            >
              <span className="text-[#07101b]">
                Get started
              </span>

              <span
                aria-hidden="true"
                className="text-[#C49A61]"
              >
                →
              </span>
            </Link>

            <Link
              href="#features"
              className="
                flex
                h-[54px]
                min-w-[180px]
                items-center
                justify-center
                rounded-[13px]
                border
                border-white/20
                bg-white/[0.08]
                px-7
                text-[14px]
                font-semibold
                text-white
                backdrop-blur-xl
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-white/[0.14]
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
              relative
              z-30
              mt-9
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-7
              gap-y-3
            "
          >
            <div className="flex items-center gap-2 text-[12px] text-white/60">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              AI-powered planning
            </div>

            <div className="flex items-center gap-2 text-[12px] text-white/60">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              Focused schedules
            </div>

            <div className="flex items-center gap-2 text-[12px] text-white/60">
              <span className="h-1 w-1 rounded-full bg-[#C49A61]" />
              One place for your day
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FADE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-[10]
          h-[22%]
          bg-gradient-to-t
          from-[#02050a]
          via-[#02050a]/30
          to-transparent
        "
      />
    </section>
  );
}