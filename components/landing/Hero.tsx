"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";

/* ============================================================
   SOCIAL ICONS
   Lucide removed all brand/logo icons (Facebook, Dribbble,
   Instagram, LinkedIn, etc.) starting in v1, so these are small
   inline SVGs instead of a lucide-react import — this keeps the
   build working regardless of which lucide-react version you're
   on. Swap the paths for your own brand SVGs any time.
============================================================ */

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

function DribbbleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94M21.75 12.84c-6.62-1.41-12.14-1-16.38 3.02" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17Z" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* ============================================================
   NAV DATA
============================================================ */

const NAV_LINKS = ["Features", "Integrations", "Pricing", "Blog"];

/* ============================================================
   FOOTER DATA
============================================================ */

const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "PRODUCT",
    links: ["Features", "Integrations", "Pricing", "Changelog"],
  },
  {
    title: "COMPANY",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "RESOURCES",
    links: ["Help Center", "Docs", "Community", "Status"],
  },
  {
    title: "LEGAL",
    links: ["Privacy", "Terms", "Security"],
  },
];

/* ============================================================
   HERO
   Single-viewport layout: nav, looping background video, centered
   hero content, and a multi-column footer pinned to the bottom.
============================================================ */

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  /* Mount/animate the mobile menu in two steps so the entrance
     transition actually runs, and unmount only after the exit
     transition has had time to finish. */
  useEffect(() => {
    if (mobileMenuOpen) {
      const raf = requestAnimationFrame(() => setMenuVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [mobileMenuOpen]);

  const openMenu = () => setMobileMenuOpen(true);

  const closeMenu = () => {
    setMenuVisible(false);
    window.setTimeout(() => setMobileMenuOpen(false), 500);
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col bg-[#050505] text-white"
      style={{
        fontFamily: '"Helvetica Now Var", Helvetica, Arial, sans-serif',
      }}
    >
      {/* =========================================================
          BACKGROUND VIDEO
          Replace the empty <source> below with your own hosted,
          cinematic loop. earth-bg.jpg is used as the poster/fallback
          so the section still looks right before the video loads.
      ========================================================== */}

      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/earth-bg.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      >
        {/* TODO: point this at your own hosted background video */}
        <source src="" type="video/mp4" />
      </video>

      {/* Gradient wash so nav/footer text stays readable over the video */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,5,9,0.35) 0%, rgba(3,5,9,0.15) 30%, rgba(3,5,9,0.55) 75%, #050505 100%)",
        }}
      />

      {/* Decorative violet/blue glows, matching TimePilot's palette */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 top-[25%] h-[460px] w-[460px] rounded-full bg-blue-600/15 blur-[130px]" />

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* =====================================================
            NAVIGATION
        ====================================================== */}

        <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white text-sm font-bold text-black">
              T
            </span>
            <span className="text-xl font-bold tracking-wider text-white">
              TimePilot
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-wide text-white/80 transition-colors duration-200 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Login button */}
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white lg:inline-flex"
          >
            LOG IN
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={mobileMenuOpen ? closeMenu : openMenu}
            className="relative z-[60] flex h-9 w-9 items-center justify-center lg:hidden"
          >
            <Menu
              className={`absolute h-6 w-6 transition-all duration-300 ${
                mobileMenuOpen
                  ? "-rotate-90 scale-75 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute h-6 w-6 transition-all duration-300 ${
                mobileMenuOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "rotate-90 scale-75 opacity-0"
              }`}
            />
          </button>
        </nav>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

        {mobileMenuOpen && (
          <>
            <div
              onClick={closeMenu}
              className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-400 ${
                menuVisible ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="absolute left-0 right-0 top-[68px] z-50">
              <div className="absolute inset-0 rounded-b-2xl backdrop-blur-xl" />

              <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-10">
                {NAV_LINKS.map((link, index) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={closeMenu}
                    className="text-lg font-light tracking-[0.08em] text-white/80 transition-all ease-out hover:text-white sm:text-xl"
                    style={{
                      transitionDuration: "400ms",
                      transitionDelay: menuVisible
                        ? `${350 + index * 50}ms`
                        : "0ms",
                      opacity: menuVisible ? 1 : 0,
                      transform: menuVisible
                        ? "translateY(0)"
                        : "translateY(12px)",
                    }}
                  >
                    {link}
                  </a>
                ))}

                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition-all ease-out"
                  style={{
                    transitionDuration: "400ms",
                    transitionDelay: menuVisible
                      ? `${350 + NAV_LINKS.length * 50}ms`
                      : "0ms",
                    opacity: menuVisible ? 1 : 0,
                    transform: menuVisible
                      ? "translateY(0)"
                      : "translateY(12px)",
                  }}
                >
                  LOG IN
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </>
        )}

        {/* =====================================================
            HERO CONTENT
        ====================================================== */}

        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-16 md:py-0">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex h-[34px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 text-[11px] font-semibold text-white/75 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
            Intelligent time management
          </div>

          {/* Headline — two lines, second one lighter, matching the
              subtitle-then-headline rhythm of the reference layout */}
          <h1 className="max-w-3xl text-[48px] font-black leading-[0.95] tracking-tighter text-white sm:text-[64px] md:text-[88px] lg:text-[104px]">
            <span
              className="block hero-glow"
              style={{ textShadow: "0 0 80px rgba(255,255,255,0.25)" }}
            >
              Take control
            </span>
            <span className="block font-light text-white/50">
              of your time.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            TimePilot turns your tasks, priorities and schedule into a
            focused day you can actually finish.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="/signup"
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-white"
            >
              Get started
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-3.5 text-sm font-medium tracking-wide text-white/85 backdrop-blur-xl transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.1]"
            >
              Explore TimePilot
              <span className="text-white/45">↓</span>
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-white/45 sm:gap-5">
            <TrustItem color="violet" label="AI-assisted planning" />
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <TrustItem color="blue" label="Smart scheduling" />
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <TrustItem color="green" label="Focus analytics" />
          </div>
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="relative z-10 px-4 pb-8 pt-10 sm:px-6 sm:pb-10 md:px-12 lg:px-16 lg:pt-16">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className="mb-3 text-[10px] font-bold tracking-[0.15em] text-white sm:mb-4 sm:text-xs">
                  {column.title}
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[10px] text-white/50 transition-colors duration-200 hover:text-white/80 sm:text-xs"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter + Social */}
            <div className="col-span-2">
              <h4 className="mb-3 text-[10px] font-bold tracking-[0.15em] text-white sm:mb-4 sm:text-xs">
                JOIN FOR PRODUCT UPDATES
              </h4>

              <form className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Type your email to sign up"
                  className="min-w-0 flex-1 rounded-l-md bg-white px-3 py-2 text-xs text-black outline-none placeholder:text-black/40"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-r-md bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-2 text-xs font-bold tracking-wider text-white"
                >
                  SEND IT
                </button>
              </form>

              <h4 className="mb-3 mt-5 text-[10px] font-bold tracking-[0.15em] text-white sm:mt-6 sm:text-xs">
                CONNECT
              </h4>

              <div className="flex gap-3">
                {[
                  FacebookIcon,
                  TwitterIcon,
                  DribbbleIcon,
                  YoutubeIcon,
                  LinkedinIcon,
                  InstagramIcon,
                ].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-white/50 transition-colors duration-200 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* =========================================================
          STYLES — the liquid-glass border trick needs raw CSS
          (mask-composite isn't expressible as a Tailwind utility)
      ========================================================== */}

      <style jsx>{`
        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(255, 255, 255, 0.15) 20%,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0) 60%,
            rgba(255, 255, 255, 0.15) 80%,
            rgba(255, 255, 255, 0.45) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-glow,
          .animate-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ===============================================================
   TRUST ITEM
================================================================ */

function TrustItem({
  label,
  color,
}: {
  label: string;
  color: "violet" | "blue" | "green";
}) {
  const styles = {
    violet: "bg-violet-500/16 text-violet-300",
    blue: "bg-blue-500/16 text-blue-300",
    green: "bg-emerald-500/16 text-emerald-300",
  }[color];

  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-[19px] w-[19px] items-center justify-center rounded-full ${styles}`}
      >
        <Check className="h-3 w-3" strokeWidth={2.7} />
      </span>
      <span>{label}</span>
    </div>
  );
}