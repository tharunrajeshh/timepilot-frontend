"use client";

import Link from "next/link";
import Starfield from "@/components/landing/Starfield";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative isolate
        -mt-px
        min-h-[100svh]
        w-full
        overflow-hidden
        bg-[#02050a]
        text-white
      "
    >
      {/* =====================================================
          BASE BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          z-[-30]
          bg-[#02050a]
        "
      />

      {/* =====================================================
          SPACE VIDEO
          ===================================================== */}

      <video
        className="
          absolute
          inset-0
          z-[-25]
          h-full
          w-full
          object-cover
          opacity-[0.55]
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
          CINEMATIC SPACE OVERLAY
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[-20]
          bg-[radial-gradient(circle_at_50%_65%,rgba(20,90,170,0.20),transparent_42%),linear-gradient(to_bottom,rgba(2,5,10,0.48)_0%,rgba(2,5,10,0.08)_42%,rgba(2,5,10,0.88)_100%)]
        "
      />

      {/* =====================================================
          TOP GRADIENT
          Prevents harsh line / edge
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[1]
          h-32
          bg-gradient-to-b
          from-[#02050a]
          via-[#02050a]/70
          to-transparent
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
          h-[55%]
          overflow-hidden
        "
      >
        <img
          src="/images/earth.png"
          alt=""
          draggable={false}
          className="
            absolute
            left-1/2
            bottom-[-55%]
            w-[1050px]
            max-w-none
            -translate-x-1/2
            select-none
            object-contain
            drop-shadow-[0_-20px_90px_rgba(30,120,255,0.28)]
            sm:w-[1250px]
            md:w-[1450px]
            lg:w-[1650px]
            xl:w-[1850px]
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
          bottom-[-15%]
          left-1/2
          z-[6]
          h-[420px]
          w-[1100px]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse,rgba(50,145,255,0.18)_0%,rgba(20,90,180,0.08)_35%,transparent_70%)]
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
          max-w-[1400px]
          items-center
          justify-center
          px-5
          pb-[20vh]
          pt-32
          text-center
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            flex
            max-w-[1000px]
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
              bg-[#0b111a]/70
              px-4
              py-2
              shadow-[0_8px_30px_rgba(0,0,0,0.20)]
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
                !text-white/75
              "
            >
              Intelligent time management
            </span>
          </div>

          {/* =================================================
              HEADLINE
              ================================================= */}

          <h1
            className="
              relative
              z-30
              max-w-[1000px]
              text-[clamp(48px,7.2vw,94px)]
              font-semibold
              leading-[0.94]
              tracking-[-0.06em]
              !text-white
              drop-shadow-[0_8px_35px_rgba(0,0,0,0.45)]
            "
          >
            Take control
            <br />

            <span
              className="
                !text-white
              "
            >
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
              max-w-[690px]
              !text-white/75
              text-[15px]
              leading-7
              sm:text-[17px]
              sm:leading-8
            "
          >
            TimePilot helps you plan your day, prioritize
            what matters, and turn your available time
            into focused progress.
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
            {/* PRIMARY */}

            <Link
              href="/signup"
              className="
                inline-flex
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
                !text-[#07101b]
                text-[14px]
                font-semibold
                shadow-[0_14px_45px_rgba(255,255,255,0.15)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#F6F4EE]
                hover:shadow-[0_18px_50px_rgba(255,255,255,0.20)]
              "
            >
              <span className="!text-[#07101b]">
                Get started
              </span>

              <span
                aria-hidden="true"
                className="
                  !text-[#C49A61]
                  text-[17px]
                "
              >
                →
              </span>
            </Link>

            {/* SECONDARY */}

            <Link
              href="#features"
              className="
                inline-flex
                h-[54px]
                min-w-[180px]
                items-center
                justify-center
                rounded-[13px]
                border
                border-white/20
                bg-white/[0.07]
                px-7
                !text-white
                text-[14px]
                font-semibold
                shadow-[0_12px_35px_rgba(0,0,0,0.12)]
                backdrop-blur-xl
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-white/[0.12]
                hover:border-white/30
              "
            >
              <span className="!text-white">
                Explore TimePilot
              </span>
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
            <div
              className="
                flex
                items-center
                gap-2
                !text-white/60
                text-[12px]
              "
            >
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#C49A61]
                "
              />

              <span className="!text-white/60">
                AI-powered planning
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                !text-white/60
                text-[12px]
              "
            >
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#C49A61]
                "
              />

              <span className="!text-white/60">
                Focused schedules
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                !text-white/60
                text-[12px]
              "
            >
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#C49A61]
                "
              />

              <span className="!text-white/60">
                One place for your day
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CINEMATIC FADE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[10]
          h-[25%]
          bg-gradient-to-t
          from-[#02050a]
          via-[#02050a]/40
          to-transparent
        "
      />

      {/* =====================================================
          MOBILE FADE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[11]
          h-12
          bg-[#02050a]/50
        "
      />
    </section>
  );
}