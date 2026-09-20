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
      className="relative min-h-screen overflow-hidden bg-[#02050a] text-white"
    >
      {/* =====================================================
          EARTH BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute left-1/2 top-1/2 h-[115%] w-[115%] min-w-[1200px] -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/space-bg.jpg"
          aria-hidden="true"
        >
          <source
            src={EARTH_VIDEO}
            type="video/mp4"
          />
        </video>

        {/* Deep space tint */}
        <div className="absolute inset-0 bg-[#02050a]/35" />

        {/* Blue atmospheric tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,rgba(20,130,255,0.16),transparent_48%)]" />

        {/* Top darkness */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-black/80 via-black/35 to-transparent" />

        {/* Bottom darkness */}
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#02050a] via-[#02050a]/65 to-transparent" />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.7)_100%)]" />

        {/* Earth glow */}
        <div className="absolute bottom-[-180px] left-1/2 h-[500px] w-[1100px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
      </div>

      {/* =====================================================
          LIQUID BACKGROUND LIGHT
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {/* Liquid blob 1 */}
        <div
          className="absolute left-[8%] top-[18%] h-[280px] w-[280px] rounded-full bg-cyan-400/[0.10] blur-[90px]"
          style={{
            animation:
              "liquidFloatOne 12s ease-in-out infinite",
          }}
        />

        {/* Liquid blob 2 */}
        <div
          className="absolute right-[8%] top-[25%] h-[360px] w-[360px] rounded-full bg-blue-500/[0.10] blur-[110px]"
          style={{
            animation:
              "liquidFloatTwo 15s ease-in-out infinite",
          }}
        />

        {/* Liquid blob 3 */}
        <div
          className="absolute bottom-[12%] left-[35%] h-[260px] w-[420px] rounded-full bg-violet-500/[0.07] blur-[120px]"
          style={{
            animation:
              "liquidFloatThree 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* =====================================================
          LIQUID GLASS DISTORTION LAYER
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div
          className="absolute left-1/2 top-[43%] h-[360px] w-[760px] -translate-x-1/2 rounded-full opacity-40 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, rgba(60,160,255,0.04) 35%, transparent 70%)",
          }}
        />
      </div>

      {/* =====================================================
          FALLING STARS
      ====================================================== */}

      <Starfield />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="relative z-20 flex min-h-screen items-center justify-center px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
        <div className="w-full max-w-[1180px] text-center">

          {/* =================================================
              LIQUID GLASS BADGE
          ================================================== */}

          <div
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.13), rgba(255,255,255,0.035))",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
            </span>

            <span>
              Intelligent time management
            </span>

            <ArrowUpRight
              size={13}
              className="text-white/45"
            />
          </div>

          {/* =================================================
              MAIN HEADING
          ================================================== */}

          <h1 className="mx-auto mt-8 max-w-[1080px] text-[clamp(52px,9vw,124px)] font-semibold leading-[0.84] tracking-[-0.075em]">
            <span
              className="block text-white"
              style={{
                textShadow:
                  "0 10px 60px rgba(0,0,0,0.85)",
              }}
            >
              Take control
            </span>

            <span
              className="mt-3 block font-normal tracking-[-0.085em]"
              style={{
                color: "rgba(255,255,255,0.48)",
                textShadow:
                  "0 10px 50px rgba(0,0,0,0.8)",
              }}
            >
              of your time.
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p className="mx-auto mt-8 max-w-[650px] text-[15px] leading-7 text-white/70 sm:text-lg sm:leading-8">
            TimePilot turns your tasks, priorities and
            schedule into a focused day you can
            actually finish.
          </p>

          {/* =================================================
              LIQUID GLASS BUTTONS
          ================================================== */}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            {/* GET STARTED */}

            <Link
              href="/signup"
              className="liquid-button group relative flex h-[60px] w-full items-center justify-center gap-4 overflow-hidden rounded-full px-7 text-[15px] font-semibold !text-black sm:w-auto"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(225,240,255,0.78))",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,1), 0 15px 50px rgba(0,0,0,0.4)",
              }}
            >
              {/* Liquid shine */}
              <span className="pointer-events-none absolute -left-20 top-0 h-full w-20 rotate-[20deg] bg-white/50 blur-xl transition-transform duration-700 group-hover:translate-x-[420px]" />

              <span className="relative z-10 !text-black">
                Get started
              </span>

              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black !text-white shadow-lg transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight
                  size={17}
                  className="!text-white"
                  strokeWidth={2.2}
                />
              </span>
            </Link>

            {/* EXPLORE */}

            <a
              href="#features"
              className="liquid-glass-button group relative flex h-[60px] w-full items-center justify-center gap-5 overflow-hidden rounded-full px-7 text-[15px] font-semibold !text-white sm:w-auto"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.08] via-white/[0.02] to-white/[0.07]" />

              <span className="pointer-events-none absolute -left-24 top-0 h-full w-24 rotate-[20deg] bg-white/10 blur-2xl transition-transform duration-700 group-hover:translate-x-[420px]" />

              <span className="relative z-10 !text-white">
                Explore TimePilot
              </span>

              <ArrowDown
                size={18}
                className="relative z-10 !text-white/70 transition-transform duration-300 group-hover:translate-y-1"
                strokeWidth={2}
              />
            </a>
          </div>

          {/* =================================================
              FEATURES
          ================================================== */}

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-white/55">

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-violet-300/20 bg-violet-400/10 text-violet-300">
                <Check size={12} />
              </span>

              <span>
                AI-assisted planning
              </span>
            </div>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-300/20 bg-blue-400/10 text-blue-300">
                <Check size={12} />
              </span>

              <span>
                Smart scheduling
              </span>
            </div>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-emerald-300">
                <Check size={12} />
              </span>

              <span>
                Focus analytics
              </span>
            </div>
          </div>

          {/* =================================================
              LIQUID ORBIT
          ================================================== */}

          <div className="relative mx-auto mt-14 h-[70px] max-w-[600px]">

            <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div
              className="absolute left-1/2 top-1/2 h-12 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.025] blur-[0.2px]"
              style={{
                boxShadow:
                  "inset 0 1px 10px rgba(255,255,255,0.05), 0 0 50px rgba(60,160,255,0.08)",
              }}
            />

            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.9)]" />
          </div>

          <div className="text-[10px] uppercase tracking-[0.28em] text-white/30">
            Plan your day · Own your time
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM TRANSITION
      ====================================================== */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-36 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent" />

      {/* =====================================================
          ANIMATION STYLES
      ====================================================== */}

      <style jsx>{`
        @keyframes liquidFloatOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          33% {
            transform: translate3d(80px, 35px, 0) scale(1.15);
          }

          66% {
            transform: translate3d(-40px, 70px, 0) scale(0.9);
          }
        }

        @keyframes liquidFloatTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          35% {
            transform: translate3d(-70px, 50px, 0) scale(0.88);
          }

          70% {
            transform: translate3d(40px, -40px, 0) scale(1.12);
          }
        }

        @keyframes liquidFloatThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          40% {
            transform: translate3d(60px, -45px, 0) scale(1.12);
          }

          75% {
            transform: translate3d(-80px, 25px, 0) scale(0.92);
          }
        }

        .liquid-button,
        .liquid-glass-button {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease,
            border-color 300ms ease;
        }

        .liquid-button:hover,
        .liquid-glass-button:hover {
          transform: translateY(-3px);
        }

        .liquid-glass-button {
          border: 1px solid rgba(255, 255, 255, 0.2);
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.12),
              rgba(255, 255, 255, 0.035)
            );
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.12),
            inset 0 -1px 1px rgba(0, 0, 0, 0.2),
            0 15px 50px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .liquid-glass-button:hover {
          border-color: rgba(255, 255, 255, 0.32);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.16),
            0 20px 60px rgba(0, 0, 0, 0.45);
        }

        @media (prefers-reduced-motion: reduce) {
          .liquid-button,
          .liquid-glass-button,
          .liquid-button span,
          .liquid-glass-button span {
            transition: none !important;
          }

          .liquid-button:hover,
          .liquid-glass-button:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}