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

      {/* Space image/video background */}

      <video
        className="
          absolute
          inset-0
          z-0
          h-full
          w-full
          object-cover
          opacity-[0.45]
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
          SPACE OVERLAY
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[radial-gradient(circle_at_50%_70%,rgba(25,90,170,0.18),transparent_45%),linear-gradient(to_bottom,rgba(2,5,10,0.25),rgba(2,5,10,0.05)_55%,rgba(2,5,10,0.55))]
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
          z-[5]
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
          inset-x-0
          bottom-0
          z-[4]
          h-[58%]
        "
      >
        <img
          src="/images/earth.png"
          alt=""
          draggable={false}
          className="
            absolute
            left-1/2
            top-[12%]
            w-[1100px]
            max-w-none
            -translate-x-1/2
            select-none
            object-contain
            drop-shadow-[0_-18px_90px_rgba(35,130,255,0.35)]
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
          bottom-[-10%]
          left-1/2
          z-[6]
          h-[400px]
          w-[1100px]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse,rgba(40,150,255,0.18),transparent_68%)]
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
          pt-[125px]
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
              relative
              z-30
              m-0
              max-w-[1000px]
              text-[clamp(50px,7vw,94px)]
              font-semibold
              leading-[0.94]
              tracking-[-0.06em]
              text-white
              drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]
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
              relative
              z-30
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
                shadow-[0_15px_45px_rgba(255,255,255,0.16)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#F6F4EE]
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
                inline-flex
                h-[54px]
                min-w-[185px]
                items-center
                justify-center
                rounded-[13px]
                border
                border-white/25
                bg-black/25
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
              relative
              z-30
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

      {/* =====================================================
          SOFT BOTTOM BLEND
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
          h-[18%]
          bg-gradient-to-t
          from-[#02050a]/60
          to-transparent
        "
      />
    </section>
  );
}