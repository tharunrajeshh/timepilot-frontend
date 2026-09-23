"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import Starfield from "./Starfield";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-screen overflow-hidden bg-[#03060b] text-white"
    >
      {/* BACKGROUND LAYERS */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] scale-[1.01] object-cover object-center"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#03060b]/30" />

        {/* Top blend to hide navbar seam */}
        <div className="absolute inset-x-0 top-0 z-[8] h-32 bg-gradient-to-b from-[#03060b] via-[#03060b]/70 to-transparent" />

        {/* Earth */}
        <img
          src="/images/earth.png"
          alt=""
          draggable={false}
          className="absolute bottom-[-14%] left-1/2 z-[4] w-full max-w-[1250px] -translate-x-1/2 select-none object-contain drop-shadow-[0_-20px_90px_rgba(40,130,255,0.2)]"
        />

        {/* Earth glow */}
        <div className="absolute bottom-[-5%] left-1/2 z-[3] h-[280px] w-full max-w-[1050px] -translate-x-1/2 rounded-full bg-blue-400/[0.12] blur-[110px]" />

        {/* Top darkness */}
        <div className="absolute inset-x-0 top-0 z-[6] h-[40%] bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 z-[6] h-[32%] bg-gradient-to-t from-[#03060b] via-[#03060b]/50 to-transparent" />

        {/* Vignette */}
        <div className="absolute inset-0 z-[7] bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* FALLING STARS */}
      <Starfield />

      {/* CONTENT */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-5 pb-24 pt-32 sm:px-8">
        <div className="w-full max-w-[1180px] text-center">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium text-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <span>Intelligent time management</span>
            <ArrowUpRight size={13} className="text-white/45" />
          </div>

          {/* Heading */}
          <h1 className="mx-auto mt-8 max-w-[1050px] text-[clamp(52px,9vw,124px)] font-semibold leading-[0.86] tracking-[-0.075em]">
            <span className="block text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.95)]">
              Take control
            </span>
            <span className="mt-3 block font-normal tracking-[-0.085em] text-white/55 drop-shadow-[0_15px_50px_rgba(0,0,0,0.95)]">
              of your time.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-[650px] text-[15px] leading-7 text-white/65 drop-shadow-[0_5px_25px_rgba(0,0,0,0.95)] sm:text-lg sm:leading-8">
            TimePilot turns your tasks, priorities and schedule into a focused
            day you can actually finish.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="group flex h-[60px] w-full items-center justify-center gap-4 rounded-full bg-white px-7 text-[15px] font-semibold !text-black shadow-[0_15px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 sm:w-auto"
            >
              <span className="!text-black">Get started</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black !text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight
                  size={17}
                  className="!text-white"
                  strokeWidth={2.2}
                />
              </span>
            </Link>

            <a
              href="#preview"
              className="group flex h-[60px] w-full items-center justify-center gap-5 rounded-full border border-white/20 bg-white/[0.06] px-7 text-[15px] font-semibold !text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1] sm:w-auto"
            >
              <span className="!text-white">Explore TimePilot</span>
              <ArrowDown
                size={18}
                className="!text-white/70 transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>
          </div>

          {/* Feature points */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-white/55">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                <Check size={12} />
              </span>
              <span>AI-assisted planning</span>
            </div>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                <Check size={12} />
              </span>
              <span>Smart scheduling</span>
            </div>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <Check size={12} />
              </span>
              <span>Focus analytics</span>
            </div>
          </div>

          {/* Bottom label */}
          <div className="mx-auto mt-14 max-w-[700px]">
            <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/30">
              <span className="h-px w-12 bg-white/15" />
              <span>Plan your day · Own your time</span>
              <span className="h-px w-12 bg-white/15" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-28 bg-gradient-to-t from-[#03060b] to-transparent" />
    </section>
  );
}