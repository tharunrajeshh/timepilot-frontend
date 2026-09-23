"use client";

import Link from "next/link";

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
          CINEMATIC HERO IMAGE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
          bg-[#02050a]
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage:
            "url('/images/timepilot-hero.png')",
        }}
      />

      {/* =====================================================
          DARK CINEMATIC OVERLAY
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[linear-gradient(to_bottom,rgba(2,5,10,0.30)_0%,rgba(2,5,10,0.05)_45%,rgba(2,5,10,0.30)_100%)]
        "
      />

      {/* =====================================================
          CONTENT
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
          pb-[13vh]
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
              mb-7
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/15
              bg-[#07101b]/65
              px-4
              py-2
              shadow-[0_10px_35px_rgba(0,0,0,0.22)]
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
              HEADLINE
              ================================================= */}

          <h1
            className="
              m-0
              max-w-[1000px]
              text-[clamp(50px,7vw,96px)]
              font-semibold
              leading-[0.94]
              tracking-[-0.06em]
              text-white
              drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]
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
            {/* PRIMARY */}

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
                border
                border-white
                bg-white
                px-7
                text-[14px]
                font-semibold
                text-[#07101b]
                shadow-[0_14px_45px_rgba(255,255,255,0.16)]
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

            {/* SECONDARY */}

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
                bg-[#07101b]/50
                px-7
                text-[14px]
                font-semibold
                text-white
                shadow-[0_12px_35px_rgba(0,0,0,0.16)]
                backdrop-blur-xl
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#07101b]/70
                hover:border-white/35
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
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#C49A61]
                "
              />

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
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#C49A61]
                "
              />

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
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#C49A61]
                "
              />

              One place for your day
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUBTLE BOTTOM FADE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-24
          bg-gradient-to-t
          from-[#02050a]/70
          to-transparent
        "
      />
    </section>
  );
}