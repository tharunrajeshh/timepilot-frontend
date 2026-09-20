"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import Starfield from "./Starfield";

const EARTH_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[#020408] text-white"
    >
      {/* =========================================================
          EARTH VIDEO BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/space-bg.jpg"
        >
          <source
            src={EARTH_VIDEO}
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#020408]/55" />

        {/* Top darkness for navbar */}
        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/75 via-black/30 to-transparent" />

        {/* Bottom darkness */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#020408] via-[#020408]/75 to-transparent" />

        {/* Side vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.75)_100%)]" />

        {/* Blue Earth glow */}
        <div className="absolute bottom-[-150px] left-1/2 h-[420px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[100px]" />
      </div>

      {/* =========================================================
          FALLING STARS
      ========================================================= */}

      <Starfield />

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}

      <div className="relative z-20 flex min-h-screen items-center justify-center px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
        <div className="w-full max-w-[1180px] text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium text-white/75 shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

            <span>
              Intelligent time management
            </span>

            <ArrowUpRight
              size={13}
              className="text-white/45"
            />
          </div>

          {/* Main heading */}
          <h1 className="mx-auto mt-7 max-w-[1050px] text-[clamp(52px,9vw,124px)] font-semibold leading-[0.86] tracking-[-0.075em] text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
            <span className="block">
              Take control
            </span>

            <span className="mt-2 block font-normal tracking-[-0.085em] text-white/55">
              of your time.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-[650px] text-[15px] leading-7 text-white/65 sm:text-lg sm:leading-8">
            TimePilot turns your tasks, priorities and
            schedule into a focused day you can
            actually finish.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="group flex h-[58px] w-full items-center justify-center gap-4 rounded-full bg-white px-6 text-[15px] font-semibold text-black shadow-[0_15px_45px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:bg-white/90 sm:w-auto"
            >
              <span>
                Get started
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={17} />
              </span>
            </Link>

            <a
              href="#features"
              className="group flex h-[58px] w-full items-center justify-center gap-5 rounded-full border border-white/20 bg-black/30 px-6 text-[15px] font-semibold text-white/85 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/10 sm:w-auto"
            >
              <span>
                Explore TimePilot
              </span>

              <ArrowDown
                size={18}
                className="text-white/60 transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                <Check size={12} />
              </span>

              <span>
                AI-assisted planning
              </span>
            </div>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                <Check size={12} />
              </span>

              <span>
                Smart scheduling
              </span>
            </div>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <Check size={12} />
              </span>

              <span>
                Focus analytics
              </span>
            </div>
          </div>

          {/* =====================================================
              SMALL EARTH CAPTION
          ===================================================== */}

          <div className="mx-auto mt-14 max-w-[760px]">
            <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/35">
              <span className="h-px w-12 bg-white/15" />

              <span>
                Plan your day. Own your time.
              </span>

              <span className="h-px w-12 bg-white/15" />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM FADE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-[#08090B] to-transparent" />
    </section>
  );
}