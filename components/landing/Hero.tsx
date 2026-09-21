"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
} from "lucide-react";

import Starfield from "./Starfield";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative
        isolate
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
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#02050a]">

        {/* Deep space */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_18%,#18243a_0%,#0c1422_28%,#050a12_58%,#020409_100%)]
          "
        />

        {/* Soft atmospheric glow */}

        <div
          className="
            absolute
            left-1/2
            top-[20%]
            h-[500px]
            w-[1000px]
            -translate-x-1/2
            rounded-full
            bg-blue-500/[0.045]
            blur-[160px]
          "
        />

        {/* =================================================
            EARTH
        ================================================== */}

        <img
          src="/images/earth.png"
          alt=""
          draggable={false}
          className="
            absolute
            bottom-[-29%]
            left-1/2
            z-[4]
            w-[1180px]
            max-w-none
            -translate-x-1/2
            select-none
            object-contain
            drop-shadow-[0_-25px_100px_rgba(30,120,255,0.22)]
          "
        />

        {/* Earth glow */}

        <div
          className="
            absolute
            bottom-[-15%]
            left-1/2
            z-[3]
            h-[260px]
            w-[1000px]
            -translate-x-1/2
            rounded-full
            bg-blue-400/[0.13]
            blur-[120px]
          "
        />

        {/* Top cinematic fade */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            z-[6]
            h-[34%]
            bg-gradient-to-b
            from-black/70
            via-black/25
            to-transparent
          "
        />

        {/* Bottom cinematic fade */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-[6]
            h-[30%]
            bg-gradient-to-t
            from-[#02050a]
            via-[#02050a]/55
            to-transparent
          "
        />

        {/* Vignette */}

        <div
          className="
            absolute
            inset-0
            z-[7]
            bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0.5)_100%)]
          "
        />
      </div>

      {/* =====================================================
          FALLING STARS
      ====================================================== */}

      <Starfield />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20
          flex
          min-h-screen
          w-full
          items-center
          justify-center
          px-5
          pb-20
          pt-28
          sm:px-8
        "
      >
        <div className="w-full max-w-[1180px] text-center">

          {/* =================================================
              BADGE
          ================================================== */}

          <div
            className="
              mx-auto
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-black/30
              px-4
              py-2
              text-xs
              font-medium
              text-white/80
              shadow-[0_10px_40px_rgba(0,0,0,0.4)]
              backdrop-blur-xl
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_12px_rgba(52,211,153,0.9)]
              "
            />

            <span>
              Intelligent time management
            </span>

            <ArrowUpRight
              size={13}
              className="text-white/45"
            />
          </div>

          {/* =================================================
              HEADING
          ================================================== */}

          <h1
            className="
              mx-auto
              mt-8
              max-w-[1050px]
              font-sans
              text-[clamp(54px,8.5vw,118px)]
              font-semibold
              leading-[0.88]
              tracking-[-0.075em]
            "
          >
            <span
              className="
                block
                whitespace-nowrap
                text-white
                drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]
              "
            >
              Take control
            </span>

            <span
              className="
                mt-4
                block
                whitespace-nowrap
                font-normal
                tracking-[-0.08em]
                text-white/55
                drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]
              "
            >
              of your time.
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              relative
              z-30
              mx-auto
              mt-8
              max-w-[650px]
              font-sans
              text-[15px]
              font-normal
              leading-7
              !text-white/70
              drop-shadow-[0_5px_25px_rgba(0,0,0,0.95)]
              sm:text-lg
              sm:leading-8
            "
          >
            TimePilot turns your tasks, priorities and
            schedule into a focused day you can
            actually finish.
          </p>

          {/* =================================================
              BUTTONS
          ================================================== */}

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
            {/* Get started */}

            <Link
              href="/signup"
              className="
                group
                flex
                h-[60px]
                w-full
                items-center
                justify-center
                gap-4
                rounded-full
                bg-white
                px-7
                font-sans
                text-[15px]
                font-semibold
                !text-black
                shadow-[0_15px_50px_rgba(0,0,0,0.5)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/90
                sm:w-auto
              "
            >
              <span className="!text-black">
                Get started
              </span>

              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  !text-white
                  transition-transform
                  duration-300
                  group-hover:rotate-45
                "
              >
                <ArrowUpRight
                  size={17}
                  className="!text-white"
                  strokeWidth={2.2}
                />
              </span>
            </Link>

            {/* Explore */}

            <a
              href="#preview"
              className="
                group
                flex
                h-[60px]
                w-full
                items-center
                justify-center
                gap-5
                rounded-full
                border
                border-white/20
                bg-white/[0.07]
                px-7
                font-sans
                text-[15px]
                font-semibold
                !text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/[0.11]
                sm:w-auto
              "
            >
              <span className="!text-white">
                Explore TimePilot
              </span>

              <ArrowDown
                size={18}
                className="
                  !text-white/70
                  transition-transform
                  duration-300
                  group-hover:translate-y-1
                "
              />
            </a>
          </div>

          {/* =================================================
              FEATURES
          ================================================== */}

          <div
            className="
              relative
              z-30
              mt-9
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-3
              font-sans
              text-xs
              !text-white/55
            "
          >
            <div className="flex items-center gap-2">
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-500/15
                  text-violet-300
                "
              >
                <Check size={12} />
              </span>

              <span>AI-assisted planning</span>
            </div>

            <span
              className="
                hidden
                h-4
                w-px
                bg-white/15
                sm:block
              "
            />

            <div className="flex items-center gap-2">
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-500/15
                  text-blue-300
                "
              >
                <Check size={12} />
              </span>

              <span>Smart scheduling</span>
            </div>

            <span
              className="
                hidden
                h-4
                w-px
                bg-white/15
                sm:block
              "
            />

            <div className="flex items-center gap-2">
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-500/15
                  text-emerald-300
                "
              >
                <Check size={12} />
              </span>

              <span>Focus analytics</span>
            </div>
          </div>

          {/* =================================================
              BOTTOM LABEL
          ================================================== */}

          <div className="relative z-30 mx-auto mt-14 max-w-[700px]">
            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                font-sans
                text-[10px]
                uppercase
                tracking-[0.28em]
                text-white/30
              "
            >
              <span className="h-px w-12 bg-white/15" />

              <span>
                Plan your day · Own your time
              </span>

              <span className="h-px w-12 bg-white/15" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-40
          h-24
          bg-gradient-to-t
          from-[#08090B]
          to-transparent
        "
      />
    </section>
  );
}