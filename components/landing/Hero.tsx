"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  Check,
} from "lucide-react";

import Starfield from "./Starfield";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#03060b]
        text-white
      "
    >
      {/* =====================================================
          FULL SCREEN BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0">

        {/* 🎬 VIDEO BACKGROUND (Replaces space-bg.jpg) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            opacity-70
          "
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
            type="video/mp4"
          />
        </video>

        {/* Space darkness overlay */}
        <div
          className="
            absolute
            inset-0
            bg-[#03060b]/40
          "
        />

        {/* =================================================
            EARTH
        ================================================== */}

        <Image
          src="/images/earth.png"
          alt=""
          width={1360}
          height={750}
          draggable={false}
          priority
          sizes="(min-width: 1250px) 1250px, 100vw"
          className="
            absolute
            bottom-[-14%]
            left-1/2
            z-[4]
            w-full
            max-w-[1250px]
            h-auto
            -translate-x-1/2
            select-none
            object-contain
            drop-shadow-[0_-20px_90px_rgba(40,130,255,0.2)]
          "
        />

        {/* Earth glow */}

        <div
          className="
            absolute
            bottom-[-5%]
            left-1/2
            z-[3]
            h-[280px]
            w-full
            max-w-[1050px]
            -translate-x-1/2
            rounded-full
            bg-[#5ec8d8]/[0.12]
            blur-[110px]
          "
        />

        {/* =================================================
            CINEMATIC LIGHTING
        ================================================== */}

        {/* Top darkness */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            z-[6]
            h-[40%]
            bg-gradient-to-b
            from-black/75
            via-black/30
            to-transparent
          "
        />

        {/* Bottom fade */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-[6]
            h-[32%]
            bg-gradient-to-t
            from-[#03060b]
            via-[#03060b]/50
            to-transparent
          "
        />

        {/* Soft vignette */}

        <div
          className="
            absolute
            inset-0
            z-[7]
            bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.55)_100%)]
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
          items-center
          justify-center
          px-5
          pb-24
          pt-32
          sm:px-8
        "
      >
        <div className="w-full max-w-[1180px] text-center">

          {/* Badge */}

          <div
            className="
              mx-auto
              inline-flex
              items-center
              gap-2.5
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
                bg-[#ff9f4a]
                shadow-[0_0_12px_rgba(255,159,74,0.9)]
              "
            />

            <span>
              Intelligent time management
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              mx-auto
              mt-8
              max-w-[1050px]
              font-[family-name:var(--font-serif-display)]
              text-[clamp(52px,9vw,124px)]
              font-medium
              leading-[0.9]
              tracking-[-0.02em]
            "
          >
            <span
              className="
                block
                text-white
                drop-shadow-[0_15px_50px_rgba(0,0,0,0.95)]
              "
            >
              Take control
            </span>

            <span
              className="
                mt-1
                block
                italic
                font-normal
                text-white/55
                drop-shadow-[0_15px_50px_rgba(0,0,0,0.95)]
              "
            >
              of your time.
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-8
              max-w-[650px]
              text-[15px]
              leading-7
              text-white/65
              drop-shadow-[0_5px_25px_rgba(0,0,0,0.95)]
              sm:text-lg
              sm:leading-8
            "
          >
            TimePilot turns your tasks, priorities and
            schedule into a focused day you can
            actually finish.
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
                group
                flex
                h-[60px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#ff9f4a]
                px-8
                text-[15px]
                font-semibold
                !text-[#06090f]
                shadow-[0_15px_50px_rgba(255,159,74,0.25)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#ffb26c]
                sm:w-auto
              "
            >
              <span className="!text-[#06090f]">
                Get started
              </span>
            </Link>

            
              href="#preview"
              className="
                group
                flex
                h-[60px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-white/20
                bg-white/[0.06]
                px-8
                text-[15px]
                font-semibold
                !text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/[0.1]
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

          {/* Feature points */}

          <div
            className="
              mt-9
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-3
              text-xs
              text-white/55
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
                  bg-[#ff9f4a]/15
                  text-[#ff9f4a]
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
                  bg-[#5ec8d8]/15
                  text-[#5ec8d8]
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
                  bg-[#ff9f4a]/15
                  text-[#ff9f4a]
                "
              >
                <Check size={12} />
              </span>

              <span>Focus analytics</span>
            </div>
          </div>

          {/* Bottom label */}

          <p
            className="
              mx-auto
              mt-14
              max-w-[420px]
              text-sm
              text-white/35
            "
          >
            Plan your day. Own your time.
          </p>
        </div>
      </div>

      {/* Bottom transition */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-30
          h-28
          bg-gradient-to-t
          from-[#08090B]
          to-transparent
        "
      />
    </section>
  );
}