"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  CalendarDays,
  Check,
  Clock3,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

/* ================================================================
   CONFIG
================================================================ */

const HERO = {
  eyebrow: "Intelligent time management",

  titleLine1: "Take control",
  titleLine2: "of your time.",

  description:
    "TimePilot turns your tasks, priorities and schedule into a focused day you can actually finish.",

  primaryCta: {
    label: "Get started",
    href: "/signup",
  },

  secondaryCta: {
    label: "Explore TimePilot",
    href: "#features",
  },

  trust: [
    {
      label: "AI-assisted planning",
      accent: "purple" as const,
    },
    {
      label: "Smart scheduling",
      accent: "blue" as const,
    },
    {
      label: "Focus analytics",
      accent: "green" as const,
    },
  ],
};

const BRAND = {
  name: "TimePilot",
  logoLetter: "T",
};

const BACKGROUND_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4";

const FLOATING_AI_CARD = {
  title: "AI suggestion",
  subtitle: "Schedule optimized",
};

const FLOATING_FOCUS_CARD = {
  label: "Focus mode",
  time: "52 min",
};

const APP_SIDEBAR = {
  nav: [
    {
      label: "Today",
      icon: "calendar" as const,
      active: true,
    },
    {
      label: "AI Planner",
      icon: "brain" as const,
      active: false,
    },
    {
      label: "Analytics",
      icon: "chart" as const,
      active: false,
    },
  ],

  workspace: {
    name: "My workspace",
    type: "Personal",
    avatar: "M",
  },
};

const APP_DASHBOARD = {
  date: "THURSDAY, SEPTEMBER 24",
  greeting: "Good morning.",
  subtitle: "Here's your plan for today.",
  profileAvatar: "M",

  stats: [
    {
      title: "Focus time",
      value: "4h 32m",
      change: "+18%",
    },
    {
      title: "Tasks completed",
      value: "8 / 11",
      change: "+3",
    },
    {
      title: "Deep work",
      value: "72%",
      change: "+12%",
    },
  ],

  schedule: [
    {
      time: "09:00",
      title: "Deep work",
      description: "Product strategy",
      active: true,
      type: "focus" as const,
    },
    {
      time: "11:00",
      title: "Team sync",
      description: "Weekly planning",
      active: false,
      type: "meeting" as const,
    },
    {
      time: "13:30",
      title: "Lunch break",
      description: "Take a real break",
      active: false,
      type: "break" as const,
    },
    {
      time: "14:30",
      title: "Project work",
      description: "Dashboard redesign",
      active: false,
      type: "focus" as const,
    },
  ],

  aiPanel: {
    label: "AI PLANNER",
    headline: "Your strongest focus window is",
    headlineStrong: "9:00 – 11:00.",
    body: "TimePilot protected it for your highest-priority task.",
    footLeft: "Optimized just now",
    footRight: "94%",
    progress: 94,
  },
};

const PREVIEW_CAPTION = {
  left: "A calmer way to plan your day.",
  right: "Built around how you actually work.",
};

/* ================================================================
   FALLING STAR SYSTEM
================================================================ */

type StarDef = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  length: number;
  opacity: number;
};

/*
  Deterministic stars.
  This avoids hydration mismatch caused by Math.random().
*/

function createStars(count: number): StarDef[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i * 47) % 101;
    const b = (i * 73) % 97;
    const c = (i * 31) % 89;

    return {
      left: a,
      top: -10 - (b % 35),
      size: 1 + (c % 3) * 0.55,
      duration: 3.2 + (c % 7) * 0.45,
      delay: -((i * 1.37) % 10),
      drift: -90 + ((i * 53) % 181),
      length: 35 + ((i * 29) % 60),
      opacity: 0.45 + ((i * 17) % 55) / 100,
    };
  });
}

/* ================================================================
   HERO
================================================================ */

export default function Hero() {
  const stars = useMemo(() => createStars(55), []);

  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const starsLayerRef = useRef<HTMLDivElement>(null);
  const glowLeftRef = useRef<HTMLDivElement>(null);
  const glowRightRef = useRef<HTMLDivElement>(null);

  /* ==============================================================
     VIDEO AUTOPLAY
  ============================================================== */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        /*
          Browser may block autoplay temporarily.
          muted + playsInline normally allows autoplay.
        */
      }
    };

    playVideo();
  }, []);

  /* ==============================================================
     MOUSE PARALLAX
  ============================================================== */

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const hero = heroRef.current;

    if (!hero) return;

    let raf = 0;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const handleMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      targetX =
        ((event.clientX - rect.left) /
          rect.width -
          0.5) *
        2;

      targetY =
        ((event.clientY - rect.top) /
          rect.height -
          0.5) *
        2;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      currentX +=
        (targetX - currentX) * 0.045;

      currentY +=
        (targetY - currentY) * 0.045;

      if (videoRef.current) {
        videoRef.current.style.transform =
          `scale(1.045) translate(
            ${currentX * -7}px,
            ${currentY * -5}px
          )`;
      }

      if (starsLayerRef.current) {
        starsLayerRef.current.style.transform =
          `translate(
            ${currentX * 12}px,
            ${currentY * 8}px
          )`;
      }

      if (glowLeftRef.current) {
        glowLeftRef.current.style.transform =
          `translate(
            ${currentX * 22}px,
            ${currentY * 15}px
          )`;
      }

      if (glowRightRef.current) {
        glowRightRef.current.style.transform =
          `translate(
            ${currentX * -22}px,
            ${currentY * -15}px
          )`;
      }

      raf = requestAnimationFrame(tick);
    };

    hero.addEventListener(
      "mousemove",
      handleMove
    );

    hero.addEventListener(
      "mouseleave",
      handleLeave
    );

    raf = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener(
        "mousemove",
        handleMove
      );

      hero.removeEventListener(
        "mouseleave",
        handleLeave
      );

      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="tp-hero"
      ref={heroRef}
    >
      {/* ========================================================
          BACKGROUND
      ========================================================= */}

      <div className="tp-hero-background">
        {/* EARTH VIDEO */}

        <video
          ref={videoRef}
          className="tp-earth-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src={BACKGROUND_VIDEO}
            type="video/mp4"
          />
        </video>

        {/* CINEMATIC DARK OVERLAY */}

        <div className="tp-earth-overlay" />

        {/* FALLING STARS */}

        <div
          className="tp-falling-stars"
          ref={starsLayerRef}
          aria-hidden="true"
        >
          {stars.map((star, index) => (
            <span
              key={index}
              className="tp-star"
              style={
                {
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animationDuration:
                    `${star.duration}s`,
                  animationDelay:
                    `${star.delay}s`,
                  "--tp-drift":
                    `${star.drift}px`,
                  "--tp-trail":
                    `${star.length}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* SUBTLE EARTH GLOW */}

        <div className="tp-earth-glow" />
      </div>

      {/* SIDE LIGHTING */}

      <div
        className="tp-hero-glow tp-hero-glow-left"
        ref={glowLeftRef}
      />

      <div
        className="tp-hero-glow tp-hero-glow-right"
        ref={glowRightRef}
      />

      {/* ========================================================
          HERO CONTENT
      ========================================================= */}

      <div className="tp-hero-container">
        {/* EYEBROW */}

        <div className="tp-hero-eyebrow">
          <span className="tp-eyebrow-dot" />

          <span>
            {HERO.eyebrow}
          </span>

          <span className="tp-eyebrow-arrow">
            ↗
          </span>
        </div>

        {/* TITLE */}

        <h1 className="tp-hero-title">
          <span>
            {HERO.titleLine1}
          </span>

          <span className="tp-hero-title-light">
            {HERO.titleLine2}
          </span>
        </h1>

        {/* DESCRIPTION */}

        <p className="tp-hero-description">
          {HERO.description}
        </p>

        {/* BUTTONS */}

        <div className="tp-hero-buttons">
          <Link
            href={HERO.primaryCta.href}
            className="tp-get-started"
          >
            <span>
              {HERO.primaryCta.label}
            </span>

            <span className="tp-get-started-icon">
              <ArrowUpRight
                size={18}
                strokeWidth={2.2}
              />
            </span>
          </Link>

          <a
            href={HERO.secondaryCta.href}
            className="tp-explore"
          >
            <span>
              {HERO.secondaryCta.label}
            </span>

            <span className="tp-explore-arrow">
              ↓
            </span>
          </a>
        </div>

        {/* TRUST */}

        <div className="tp-trust">
          {HERO.trust.map(
            (item, index) => (
              <div
                key={item.label}
                className="tp-trust-group"
              >
                {index > 0 && (
                  <span className="tp-trust-divider" />
                )}

                <div
                  className={`tp-trust-item tp-trust-${item.accent}`}
                >
                  <span className="tp-trust-icon">
                    <Check
                      size={12}
                      strokeWidth={2.7}
                    />
                  </span>

                  <span>
                    {item.label}
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {/* ======================================================
            PRODUCT PREVIEW
        ======================================================= */}

        <div className="tp-preview-wrapper">
          {/* FLOATING AI CARD */}

          <div className="tp-ai-card">
            <div className="tp-ai-card-icon">
              <Sparkles size={17} />
            </div>

            <div className="tp-ai-card-content">
              <div className="tp-ai-card-title">
                {FLOATING_AI_CARD.title}
              </div>

              <div className="tp-ai-card-subtitle">
                {FLOATING_AI_CARD.subtitle}
              </div>
            </div>

            <span className="tp-ai-live" />
          </div>

          {/* FLOATING FOCUS CARD */}

          <div className="tp-focus-card">
            <div className="tp-focus-card-icon">
              <Clock3 size={17} />
            </div>

            <div>
              <div className="tp-focus-card-label">
                {FLOATING_FOCUS_CARD.label}
              </div>

              <div className="tp-focus-card-time">
                {FLOATING_FOCUS_CARD.time}
              </div>
            </div>
          </div>

          {/* BROWSER */}

          <div className="tp-browser-window">
            {/* Browser header */}

            <div className="tp-browser-header">
              <div className="tp-browser-controls">
                <span />
                <span />
                <span />
              </div>

              <div className="tp-browser-address">
                app.
                {BRAND.name.toLowerCase()}
              </div>

              <MoreHorizontal
                size={18}
                className="tp-browser-more"
              />
            </div>

            {/* Application */}

            <div className="tp-app">
              {/* SIDEBAR */}

              <aside className="tp-app-sidebar">
                <div className="tp-app-logo">
                  {BRAND.logoLetter}
                </div>

                <div className="tp-app-navigation">
                  {APP_SIDEBAR.nav.map(
                    (item) => {
                      const Icon =
                        item.icon ===
                        "calendar"
                          ? CalendarDays
                          : item.icon ===
                              "brain"
                            ? Brain
                            : BarChart3;

                      return (
                        <div
                          key={item.label}
                          className={`tp-app-nav ${
                            item.active
                              ? "active"
                              : ""
                          }`}
                        >
                          <Icon size={16} />

                          <span>
                            {item.label}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="tp-app-user">
                  <div className="tp-user-avatar">
                    {
                      APP_SIDEBAR
                        .workspace
                        .avatar
                    }
                  </div>

                  <div>
                    <div className="tp-user-name">
                      {
                        APP_SIDEBAR
                          .workspace
                          .name
                      }
                    </div>

                    <div className="tp-user-type">
                      {
                        APP_SIDEBAR
                          .workspace
                          .type
                      }
                    </div>
                  </div>
                </div>
              </aside>

              {/* MAIN */}

              <main className="tp-app-main">
                <div className="tp-app-heading">
                  <div>
                    <div className="tp-app-date">
                      {APP_DASHBOARD.date}
                    </div>

                    <h2>
                      {APP_DASHBOARD.greeting}
                    </h2>

                    <p>
                      {APP_DASHBOARD.subtitle}
                    </p>
                  </div>

                  <div className="tp-profile">
                    {
                      APP_DASHBOARD
                        .profileAvatar
                    }
                  </div>
                </div>

                {/* STATS */}

                <div className="tp-stats">
                  {APP_DASHBOARD.stats.map(
                    (stat) => (
                      <MiniStat
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                      />
                    )
                  )}
                </div>

                {/* DASHBOARD */}

                <div className="tp-dashboard-grid">
                  {/* SCHEDULE */}

                  <div className="tp-schedule">
                    <div className="tp-section-heading">
                      <div>
                        <span>
                          TODAY
                        </span>

                        <h3>
                          Your schedule
                        </h3>
                      </div>

                      <button type="button">
                        View all
                      </button>
                    </div>

                    <div className="tp-schedule-list">
                      {APP_DASHBOARD.schedule.map(
                        (row) => (
                          <Schedule
                            key={
                              row.time +
                              row.title
                            }
                            time={row.time}
                            title={
                              row.title
                            }
                            description={
                              row.description
                            }
                            active={
                              row.active
                            }
                            type={
                              row.type
                            }
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* AI PANEL */}

                  <div className="tp-ai-panel">
                    <div className="tp-ai-panel-icon">
                      <Sparkles size={17} />
                    </div>

                    <span className="tp-ai-panel-label">
                      {
                        APP_DASHBOARD
                          .aiPanel
                          .label
                      }
                    </span>

                    <h3>
                      {
                        APP_DASHBOARD
                          .aiPanel
                          .headline
                      }{" "}
                      <strong>
                        {
                          APP_DASHBOARD
                            .aiPanel
                            .headlineStrong
                        }
                      </strong>
                    </h3>

                    <p>
                      {
                        APP_DASHBOARD
                          .aiPanel
                          .body
                      }
                    </p>

                    <div className="tp-progress">
                      <span
                        style={{
                          width: `${APP_DASHBOARD.aiPanel.progress}%`,
                        }}
                      />
                    </div>

                    <div className="tp-ai-panel-bottom">
                      <span>
                        {
                          APP_DASHBOARD
                            .aiPanel
                            .footLeft
                        }
                      </span>

                      <strong>
                        {
                          APP_DASHBOARD
                            .aiPanel
                            .footRight
                        }
                      </strong>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

          {/* CAPTION */}

          <div className="tp-preview-caption">
            <span>
              {PREVIEW_CAPTION.left}
            </span>

            <span className="tp-caption-divider" />

            <span>
              {PREVIEW_CAPTION.right}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          STYLES
      ========================================================= */}

      <style jsx>{`
        /* ======================================================
           HERO
        ====================================================== */

        .tp-hero {
          position: relative;

          width: 100%;
          min-height: 100vh;

          padding-top: 150px;
          padding-bottom: 100px;

          overflow: hidden;

          background: #020408;

          color: #ffffff;
        }

        /* ======================================================
           BACKGROUND
        ====================================================== */

        .tp-hero-background {
          position: absolute;

          inset: 0;

          z-index: 0;

          overflow: hidden;

          pointer-events: none;

          background: #020408;
        }

        /* ======================================================
           EARTH VIDEO
        ====================================================== */

        .tp-earth-video {
          position: absolute;

          inset: -3%;

          width: 106%;
          height: 106%;

          object-fit: cover;

          object-position: center center;

          display: block;

          background: #020408;

          opacity: 0.88;

          filter:
            brightness(0.68)
            saturate(1.12)
            contrast(1.08);

          transform:
            scale(1.045);

          will-change: transform;
        }

        /* ======================================================
           VIDEO OVERLAY
        ====================================================== */

        .tp-earth-overlay {
          position: absolute;

          inset: 0;

          z-index: 1;

          background:
            linear-gradient(
              to bottom,
              rgba(1, 3, 7, 0.38) 0%,
              rgba(1, 3, 7, 0.20) 28%,
              rgba(1, 3, 7, 0.28) 52%,
              rgba(1, 3, 7, 0.68) 78%,
              #020408 100%
            );
        }

        .tp-earth-overlay::after {
          content: "";

          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              ellipse at center,
              rgba(0, 0, 0, 0.02) 0%,
              rgba(0, 0, 0, 0.12) 48%,
              rgba(0, 0, 0, 0.48) 100%
            );
        }

        /* ======================================================
           FALLING STARS
        ====================================================== */

        .tp-falling-stars {
          position: absolute;

          inset: -15%;

          z-index: 4;

          overflow: hidden;

          pointer-events: none;

          will-change: transform;
        }

        .tp-star {
          position: absolute;

          display: block;

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              #ffffff 0%,
              #d9f2ff 45%,
              rgba(130, 205, 255, 0.8) 75%,
              transparent 100%
            );

          box-shadow:
            0 0 5px
              rgba(255, 255, 255, 0.95),
            0 0 14px
              rgba(80, 180, 255, 0.8);

          animation-name:
            tp-star-fall;

          animation-timing-function:
            linear;

          animation-iteration-count:
            infinite;

          animation-fill-mode:
            both;

          will-change:
            transform,
            opacity;
        }

        .tp-star::after {
          content: "";

          position: absolute;

          right: 100%;

          top: 50%;

          width:
            var(--tp-trail);

          height: 1px;

          transform:
            translateY(-50%);

          transform-origin:
            right center;

          background:
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(150, 220, 255, 0.05) 10%,
              rgba(150, 220, 255, 0.30) 45%,
              rgba(220, 245, 255, 0.90) 100%
            );

          filter:
            blur(0.25px);
        }

        @keyframes tp-star-fall {
          0% {
            transform:
              translate3d(
                0,
                -15vh,
                0
              )
              rotate(-8deg)
              scale(0.7);

            opacity: 0;
          }

          7% {
            opacity: 1;
          }

          55% {
            opacity: 0.95;
          }

          88% {
            opacity: 0.72;
          }

          100% {
            transform:
              translate3d(
                var(--tp-drift),
                125vh,
                0
              )
              rotate(-8deg)
              scale(1);

            opacity: 0;
          }
        }

        /* ======================================================
           EARTH GLOW
        ====================================================== */

        .tp-earth-glow {
          position: absolute;

          z-index: 3;

          left: 50%;
          bottom: -5%;

          width:
            min(1000px, 90vw);

          height: 300px;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(40, 145, 255, 0.20),
              rgba(25, 100, 220, 0.07) 38%,
              transparent 72%
            );

          filter:
            blur(55px);

          pointer-events: none;
        }

        /* ======================================================
           SIDE GLOWS
        ====================================================== */

        .tp-hero-glow {
          position: absolute;

          z-index: 5;

          width: 600px;
          height: 600px;

          border-radius: 50%;

          filter:
            blur(120px);

          pointer-events: none;

          opacity: 0.25;

          will-change:
            transform;
        }

        .tp-hero-glow-left {
          top: 120px;
          left: -420px;

          background:
            rgba(92, 62, 190, 0.18);
        }

        .tp-hero-glow-right {
          top: 450px;
          right: -420px;

          background:
            rgba(40, 100, 180, 0.16);
        }

        /* ======================================================
           CONTENT
        ====================================================== */

        .tp-hero-container {
          position: relative;

          z-index: 10;

          width:
            min(
              1280px,
              calc(100% - 40px)
            );

          margin: 0 auto;

          text-align: center;
        }

        /* ======================================================
           EYEBROW
        ====================================================== */

        .tp-hero-eyebrow {
          display: inline-flex;

          align-items: center;

          gap: 9px;

          height: 34px;

          padding: 0 14px;

          border:
            1px solid
            rgba(255, 255, 255, 0.14);

          border-radius: 999px;

          background:
            rgba(10, 15, 22, 0.58);

          color:
            rgba(255, 255, 255, 0.76);

          font-size: 11px;

          font-weight: 600;

          box-shadow:
            0 10px 35px
            rgba(0, 0, 0, 0.28);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);
        }

        .tp-eyebrow-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            #62f7c2;

          box-shadow:
            0 0 12px
            rgba(98, 247, 194, 0.9);

          animation:
            tp-pulse
            2.5s
            ease-in-out
            infinite;
        }

        .tp-eyebrow-arrow {
          color:
            rgba(255, 255, 255, 0.42);
        }

        /* ======================================================
           TITLE
        ====================================================== */

        .tp-hero-title {
          max-width: 1000px;

          margin:
            25px auto 0;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          font-size:
            clamp(
              58px,
              8.5vw,
              118px
            );

          line-height:
            0.90;

          letter-spacing:
            -0.075em;

          font-weight:
            720;

          color:
            #ffffff;

          text-shadow:
            0 8px 50px
            rgba(0, 0, 0, 0.65);
        }

        .tp-hero-title > span {
          display: block;
        }

        .tp-hero-title-light {
          color:
            rgba(255, 255, 255, 0.52);

          font-weight:
            420;

          letter-spacing:
            -0.082em;
        }

        /* ======================================================
           DESCRIPTION
        ====================================================== */

        .tp-hero-description {
          max-width: 620px;

          margin:
            30px auto 0;

          color:
            rgba(255, 255, 255, 0.68);

          font-size:
            clamp(
              15px,
              1.5vw,
              18px
            );

          line-height:
            1.6;

          letter-spacing:
            -0.018em;

          text-shadow:
            0 4px 25px
            rgba(0, 0, 0, 0.65);
        }

        /* ======================================================
           BUTTONS
        ====================================================== */

        .tp-hero-buttons {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          margin-top: 32px;
        }

        .tp-get-started {
          height: 58px;

          padding:
            0 9px 0 25px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 18px;

          border:
            1px solid
            rgba(255, 255, 255, 0.9);

          border-radius: 999px;

          background:
            #ffffff;

          color:
            #050505;

          font-size:
            15px;

          font-weight:
            650;

          text-decoration:
            none;

          box-shadow:
            0 12px 35px
            rgba(0, 0, 0, 0.45);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .tp-get-started:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0 18px 45px
            rgba(0, 0, 0, 0.58);
        }

        .tp-get-started-icon {
          width: 40px;
          height: 40px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background:
            #050505;

          color:
            #ffffff;

          transition:
            transform 0.3s ease;
        }

        .tp-get-started:hover
        .tp-get-started-icon {
          transform:
            translate(
              2px,
              -2px
            )
            rotate(4deg);
        }

        .tp-explore {
          height: 58px;

          padding:
            0 22px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 20px;

          border:
            1px solid
            rgba(255, 255, 255, 0.18);

          border-radius: 999px;

          background:
            rgba(8, 13, 20, 0.55);

          color:
            rgba(255, 255, 255, 0.90);

          font-size:
            15px;

          font-weight:
            600;

          text-decoration:
            none;

          box-shadow:
            0 8px 30px
            rgba(0, 0, 0, 0.28);

          backdrop-filter:
            blur(15px);

          -webkit-backdrop-filter:
            blur(15px);

          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .tp-explore:hover {
          transform:
            translateY(-3px);

          background:
            rgba(255, 255, 255, 0.10);
        }

        .tp-explore-arrow {
          color:
            rgba(255, 255, 255, 0.55);

          font-size:
            19px;

          transition:
            transform 0.3s ease;
        }

        .tp-explore:hover
        .tp-explore-arrow {
          transform:
            translateY(3px);
        }

        /* ======================================================
           TRUST
        ====================================================== */

        .tp-trust {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 17px;

          margin-top: 27px;

          color:
            rgba(255, 255, 255, 0.52);

          font-size:
            12px;
        }

        .tp-trust-group {
          display: flex;

          align-items: center;

          gap: 17px;
        }

        .tp-trust-item {
          display: flex;

          align-items: center;

          gap: 8px;
        }

        .tp-trust-icon {
          width: 19px;
          height: 19px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;
        }

        .tp-trust-purple
        .tp-trust-icon {
          background:
            rgba(139, 92, 246, 0.18);

          color:
            #a78bfa;
        }

        .tp-trust-blue
        .tp-trust-icon {
          background:
            rgba(59, 130, 246, 0.18);

          color:
            #60a5fa;
        }

        .tp-trust-green
        .tp-trust-icon {
          background:
            rgba(16, 185, 129, 0.18);

          color:
            #34d399;
        }

        .tp-trust-divider {
          width: 1px;

          height: 18px;

          background:
            rgba(255, 255, 255, 0.16);
        }

        /* ======================================================
           PREVIEW
        ====================================================== */

        .tp-preview-wrapper {
          position: relative;

          width: 100%;

          margin-top: 70px;
        }

        .tp-browser-window {
          position: relative;

          width:
            min(
              1080px,
              calc(100% - 80px)
            );

          margin:
            0 auto;

          overflow:
            hidden;

          border:
            1px solid
            rgba(255, 255, 255, 0.14);

          border-radius:
            30px;

          background:
            #ffffff;

          box-shadow:
            0 45px 120px
              rgba(0, 0, 0, 0.60),
            0 15px 45px
              rgba(0, 0, 0, 0.35);

          transform:
            perspective(1600px)
            rotateX(1deg);

          transition:
            transform 0.5s ease;
        }

        .tp-browser-window:hover {
          transform:
            perspective(1600px)
            rotateX(0deg)
            translateY(-4px);
        }

        /* ======================================================
           BROWSER HEADER
        ====================================================== */

        .tp-browser-header {
          height: 58px;

          padding:
            0 22px;

          display: grid;

          grid-template-columns:
            1fr auto 1fr;

          align-items: center;

          border-bottom:
            1px solid
            rgba(0, 0, 0, 0.07);

          background:
            rgba(255, 255, 255, 0.96);
        }

        .tp-browser-controls {
          display: flex;

          align-items: center;

          gap: 8px;
        }

        .tp-browser-controls span {
          width: 9px;
          height: 9px;

          border-radius: 50%;

          background:
            #d8d8d8;
        }

        .tp-browser-controls span:first-child {
          background:
            #c5c5c5;
        }

        .tp-browser-address {
          min-width:
            130px;

          height:
            34px;

          padding:
            0 18px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border:
            1px solid
            rgba(0, 0, 0, 0.07);

          border-radius:
            999px;

          background:
            #f8f8f8;

          color:
            #9a9a9a;

          font-size:
            10px;
        }

        .tp-browser-more {
          justify-self:
            end;

          color:
            #aaa;
        }

        /* ======================================================
           APP
        ====================================================== */

        .tp-app {
          display:
            grid;

          grid-template-columns:
            190px
            minmax(0, 1fr);

          min-height:
            475px;

          background:
            #f6f6f6;

          text-align:
            left;
        }

        .tp-app * {
          text-align:
            left;
        }

        /* ======================================================
           SIDEBAR
        ====================================================== */

        .tp-app-sidebar {
          padding:
            22px 13px;

          display:
            flex;

          flex-direction:
            column;

          background:
            #ffffff;

          border-right:
            1px solid
            rgba(0, 0, 0, 0.07);
        }

        .tp-app-logo {
          width:
            36px;

          height:
            36px;

          margin:
            0 8px 30px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            11px;

          background:
            #000000;

          color:
            #ffffff;

          font-size:
            14px;

          font-weight:
            700;
        }

        .tp-app-navigation {
          display:
            flex;

          flex-direction:
            column;

          gap:
            5px;
        }

        .tp-app-nav {
          position:
            relative;

          height:
            42px;

          padding:
            0 11px;

          display:
            flex;

          align-items:
            center;

          gap:
            10px;

          border-radius:
            11px;

          color:
            #999999;

          font-size:
            11px;

          font-weight:
            550;
        }

        .tp-app-nav.active {
          background:
            #f1f1f1;

          color:
            #111111;
        }

        .tp-app-nav.active::before {
          content:
            "";

          position:
            absolute;

          left:
            -13px;

          top:
            9px;

          width:
            3px;

          height:
            24px;

          border-radius:
            999px;

          background:
            #000000;
        }

        .tp-app-user {
          margin-top:
            auto;

          padding:
            15px 8px 8px;

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          border-top:
            1px solid
            rgba(0, 0, 0, 0.06);
        }

        .tp-user-avatar {
          width:
            30px;

          height:
            30px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            50%;

          background:
            #111111;

          color:
            #ffffff;

          font-size:
            9px;

          font-weight:
            700;
        }

        .tp-user-name {
          color:
            #333333;

          font-size:
            9px;

          font-weight:
            650;
        }

        .tp-user-type {
          margin-top:
            2px;

          color:
            #aaaaaa;

          font-size:
            8px;
        }

        /* ======================================================
           APP MAIN
        ====================================================== */

        .tp-app-main {
          min-width:
            0;

          padding:
            28px 30px 32px;

          background:
            linear-gradient(
              180deg,
              #f7f7f7 0%,
              #f4f4f4 100%
            );
        }

        .tp-app-heading {
          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;
        }

        .tp-app-date {
          color:
            #a1a1a1;

          font-size:
            9px;

          font-weight:
            650;

          letter-spacing:
            0.09em;
        }

        .tp-app-heading h2 {
          margin:
            7px 0 4px;

          color:
            #111111;

          font-size:
            29px;

          line-height:
            1;

          font-weight:
            650;

          letter-spacing:
            -0.055em;
        }

        .tp-app-heading p {
          margin:
            0;

          color:
            #999999;

          font-size:
            10px;
        }

        .tp-profile {
          width:
            36px;

          height:
            36px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            50%;

          background:
            #111111;

          color:
            #ffffff;

          font-size:
            10px;

          font-weight:
            700;
        }

        /* ======================================================
           STATS
        ====================================================== */

        .tp-stats {
          display:
            grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          gap:
            10px;

          margin-top:
            24px;
        }

        .tp-mini-stat {
          padding:
            15px 16px;

          border:
            1px solid
            rgba(0, 0, 0, 0.065);

          border-radius:
            14px;

          background:
            rgba(255, 255, 255, 0.82);
        }

        .tp-mini-stat-label {
          color:
            #9b9b9b;

          font-size:
            8px;

          font-weight:
            650;

          text-transform:
            uppercase;

          letter-spacing:
            0.06em;
        }

        .tp-mini-stat-value {
          margin-top:
            7px;

          color:
            #111111;

          font-size:
            18px;

          line-height:
            1;

          font-weight:
            700;
        }

        .tp-mini-stat-change {
          margin-top:
            7px;

          color:
            #777777;

          font-size:
            8px;
        }

        .tp-mini-stat::after {
          content:
            "";

          display:
            block;

          width:
            20px;

          height:
            2px;

          margin-top:
            10px;

          border-radius:
            999px;

          background:
            #8b5cf6;
        }

        .tp-mini-stat:nth-child(2)::after {
          background:
            #3b82f6;
        }

        .tp-mini-stat:nth-child(3)::after {
          background:
            #10b981;
        }

        /* ======================================================
           DASHBOARD GRID
        ====================================================== */

        .tp-dashboard-grid {
          display:
            grid;

          grid-template-columns:
            minmax(0, 1.55fr)
            minmax(220px, 0.75fr);

          gap:
            12px;

          margin-top:
            12px;
        }

        /* ======================================================
           SCHEDULE
        ====================================================== */

        .tp-schedule {
          padding:
            18px;

          border:
            1px solid
            rgba(0, 0, 0, 0.065);

          border-radius:
            16px;

          background:
            #ffffff;
        }

        .tp-section-heading {
          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          margin-bottom:
            10px;
        }

        .tp-section-heading span {
          color:
            #aaaaaa;

          font-size:
            8px;

          font-weight:
            650;

          letter-spacing:
            0.08em;
        }

        .tp-section-heading h3 {
          margin:
            5px 0 0;

          color:
            #111111;

          font-size:
            15px;

          line-height:
            1;

          font-weight:
            650;
        }

        .tp-section-heading button {
          padding:
            6px 9px;

          border:
            1px solid
            rgba(0, 0, 0, 0.07);

          border-radius:
            7px;

          background:
            #fafafa;

          color:
            #888888;

          font-size:
            9px;
        }

        .tp-schedule-row {
          display:
            grid;

          grid-template-columns:
            54px minmax(0, 1fr);

          min-height:
            57px;
        }

        .tp-schedule-time {
          padding-top:
            10px;

          color:
            #a0a0a0;

          font-size:
            9px;

          font-weight:
            650;
        }

        .tp-schedule-content {
          padding:
            9px 12px;

          border-left:
            1px solid
            #e5e5e5;
        }

        .tp-schedule-row.active
        .tp-schedule-content {
          border-left:
            2px solid
            #111111;

          background:
            linear-gradient(
              90deg,
              #f7f7f7,
              #ffffff
            );

          border-radius:
            0 10px 10px 0;
        }

        .tp-schedule-title {
          color:
            #1c1c1c;

          font-size:
            10px;

          font-weight:
            700;
        }

        .tp-schedule-description {
          margin-top:
            4px;

          color:
            #a0a0a0;

          font-size:
            8px;
        }

        .tp-schedule-row[data-type="break"]
        .tp-schedule-content {
          border-left-style:
            dashed;

          background:
            transparent;
        }

        /* ======================================================
           AI PANEL
        ====================================================== */

        .tp-ai-panel {
          min-width:
            0;

          min-height:
            100%;

          padding:
            19px;

          display:
            flex;

          flex-direction:
            column;

          border-radius:
            16px;

          background:
            linear-gradient(
              145deg,
              #151515,
              #0c0c0c
            );

          color:
            #ffffff;

          box-shadow:
            0 10px 30px
            rgba(0, 0, 0, 0.13);
        }

        .tp-ai-panel-icon {
          width:
            35px;

          height:
            35px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border:
            1px solid
            rgba(255, 255, 255, 0.08);

          border-radius:
            10px;

          background:
            rgba(255, 255, 255, 0.08);
        }

        .tp-ai-panel-label {
          margin-top:
            20px;

          color:
            #777777;

          font-size:
            8px;

          font-weight:
            650;

          letter-spacing:
            0.12em;
        }

        .tp-ai-panel h3 {
          max-width:
            240px;

          margin:
            10px 0 0;

          color:
            #ffffff;

          font-size:
            15px;

          line-height:
            1.38;

          font-weight:
            450;
        }

        .tp-ai-panel h3 strong {
          font-weight:
            700;
        }

        .tp-ai-panel p {
          max-width:
            220px;

          margin:
            11px 0 0;

          color:
            #777777;

          font-size:
            9px;

          line-height:
            1.55;
        }

        .tp-progress {
          height:
            4px;

          margin-top:
            auto;

          overflow:
            hidden;

          border-radius:
            999px;

          background:
            rgba(255, 255, 255, 0.08);
        }

        .tp-progress span {
          display:
            block;

          height:
            100%;

          border-radius:
            inherit;

          background:
            linear-gradient(
              90deg,
              #ffffff,
              #d0d0d0
            );
        }

        .tp-ai-panel-bottom {
          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          margin-top:
            8px;

          color:
            #666666;

          font-size:
            8px;
        }

        .tp-ai-panel-bottom strong {
          color:
            #aaaaaa;
        }

        /* ======================================================
           FLOATING CARDS
        ====================================================== */

        .tp-ai-card {
          position:
            absolute;

          z-index:
            5;

          left:
            max(
              0px,
              calc(
                (100% - 1160px) / 2
              )
            );

          top:
            75px;

          width:
            190px;

          padding:
            11px;

          display:
            flex;

          align-items:
            center;

          gap:
            10px;

          border:
            1px solid
            rgba(255, 255, 255, 0.14);

          border-radius:
            14px;

          background:
            rgba(10, 13, 18, 0.72);

          backdrop-filter:
            blur(20px);

          -webkit-backdrop-filter:
            blur(20px);

          box-shadow:
            0 20px 45px
            rgba(0, 0, 0, 0.40);

          animation:
            tp-float-one
            5s
            ease-in-out
            infinite;
        }

        .tp-ai-card-icon {
          width:
            35px;

          height:
            35px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            10px;

          background:
            #ffffff;

          color:
            #000000;
        }

        .tp-ai-card-content {
          min-width:
            0;
        }

        .tp-ai-card-title {
          color:
            #ffffff;

          font-size:
            10px;

          font-weight:
            700;
        }

        .tp-ai-card-subtitle {
          margin-top:
            3px;

          color:
            rgba(255, 255, 255, 0.48);

          font-size:
            8px;
        }

        .tp-ai-live {
          width:
            6px;

          height:
            6px;

          margin-left:
            auto;

          border-radius:
            50%;

          background:
            #62f7c2;

          box-shadow:
            0 0 10px
            rgba(98, 247, 194, 0.8);

          animation:
            tp-pulse
            2s
            ease-in-out
            infinite;
        }

        .tp-focus-card {
          position:
            absolute;

          z-index:
            5;

          right:
            max(
              0px,
              calc(
                (100% - 1160px) / 2
              )
            );

          bottom:
            75px;

          width:
            150px;

          padding:
            11px;

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          border:
            1px solid
            rgba(255, 255, 255, 0.14);

          border-radius:
            14px;

          background:
            rgba(10, 13, 18, 0.72);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

          box-shadow:
            0 20px 45px
            rgba(0, 0, 0, 0.40);

          animation:
            tp-float-two
            6s
            ease-in-out
            infinite;
        }

        .tp-focus-card-icon {
          width:
            34px;

          height:
            34px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            10px;

          background:
            rgba(255, 255, 255, 0.10);
        }

        .tp-focus-card-label {
          color:
            rgba(255, 255, 255, 0.45);

          font-size:
            8px;
        }

        .tp-focus-card-time {
          margin-top:
            2px;

          color:
            #ffffff;

          font-size:
            14px;

          font-weight:
            700;
        }

        /* ======================================================
           CAPTION
        ====================================================== */

        .tp-preview-caption {
          margin-top:
            18px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            12px;

          color:
            rgba(255, 255, 255, 0.42);

          font-size:
            9px;
        }

        .tp-caption-divider {
          width:
            30px;

          height:
            1px;

          background:
            rgba(255, 255, 255, 0.20);
        }

        /* ======================================================
           ANIMATIONS
        ====================================================== */

        @keyframes tp-pulse {
          0%,
          100% {
            transform:
              scale(0.8);

            opacity:
              0.5;
          }

          50% {
            transform:
              scale(1.1);

            opacity:
              1;
          }
        }

        @keyframes tp-float-one {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-8px);
          }
        }

        @keyframes tp-float-two {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(8px);
          }
        }

        /* ======================================================
           TABLET
        ====================================================== */

        @media (max-width: 1100px) {
          .tp-browser-window {
            width:
              calc(100% - 40px);
          }
        }

        @media (max-width: 900px) {
          .tp-app {
            grid-template-columns:
              165px
              minmax(0, 1fr);
          }

          .tp-app-main {
            padding:
              23px;
          }

          .tp-dashboard-grid {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .tp-ai-panel {
            min-height:
              190px;
          }

          .tp-ai-card {
            left:
              4px;
          }

          .tp-focus-card {
            right:
              4px;
          }
        }

        /* ======================================================
           MOBILE
        ====================================================== */

        @media (max-width: 720px) {
          .tp-hero {
            padding-top:
              115px;

            padding-bottom:
              60px;
          }

          .tp-hero-container {
            width:
              calc(100% - 28px);
          }

          .tp-hero-title {
            font-size:
              clamp(
                48px,
                14vw,
                76px
              );
          }

          .tp-hero-description {
            max-width:
              480px;

            font-size:
              15px;
          }

          .tp-trust {
            flex-wrap:
              wrap;

            max-width:
              440px;

            margin-left:
              auto;

            margin-right:
              auto;
          }

          .tp-trust-divider {
            display:
              none;
          }

          .tp-preview-wrapper {
            margin-top:
              50px;
          }

          .tp-browser-window {
            width:
              100%;

            border-radius:
              22px;
          }

          .tp-app {
            grid-template-columns:
              1fr;
          }

          .tp-app-sidebar {
            display:
              none;
          }

          .tp-app-main {
            padding:
              18px;
          }

          .tp-app-heading h2 {
            font-size:
              23px;
          }

          .tp-dashboard-grid {
            grid-template-columns:
              1fr;
          }

          .tp-ai-panel {
            min-height:
              180px;
          }

          .tp-ai-card {
            left:
              0;

            top:
              45px;

            transform:
              scale(0.78);

            transform-origin:
              left top;
          }

          .tp-focus-card {
            right:
              0;

            bottom:
              55px;

            transform:
              scale(0.78);

            transform-origin:
              right bottom;
          }

          .tp-earth-video {
            inset:
              -5%;

            width:
              110%;

            height:
              110%;

            object-position:
              center center;
          }

          .tp-star::after {
            width:
              calc(
                var(--tp-trail) * 0.72
              );
          }
        }

        /* ======================================================
           SMALL MOBILE
        ====================================================== */

        @media (max-width: 600px) {
          .tp-hero-buttons {
            width:
              100%;

            flex-direction:
              column;

            gap:
              10px;
          }

          .tp-get-started,
          .tp-explore {
            width:
              100%;
          }

          .tp-trust {
            flex-direction:
              column;

            gap:
              10px;
          }

          .tp-browser-header {
            height:
              50px;

            padding:
              0 14px;
          }

          .tp-browser-address {
            min-width:
              90px;

            height:
              30px;

            padding:
              0 12px;
          }

          .tp-app-main {
            padding:
              15px;
          }

          .tp-app-heading h2 {
            font-size:
              21px;
          }

          .tp-profile {
            width:
              31px;

            height:
              31px;
          }

          .tp-stats {
            grid-template-columns:
              1fr 1fr;
          }

          .tp-mini-stat:last-child {
            grid-column:
              span 2;
          }

          .tp-mini-stat {
            padding:
              12px;
          }

          .tp-mini-stat-value {
            font-size:
              15px;
          }

          .tp-schedule {
            padding:
              14px;
          }

          .tp-preview-caption {
            flex-direction:
              column;

            gap:
              5px;
          }

          .tp-caption-divider {
            display:
              none;
          }

          .tp-earth-video {
            object-position:
              center center;
          }

          .tp-falling-stars {
            inset:
              -10%;
          }

          .tp-star::after {
            width:
              calc(
                var(--tp-trail) * 0.55
              );
          }
        }

        /* ======================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {
          .tp-star,
          .tp-ai-card,
          .tp-focus-card,
          .tp-eyebrow-dot,
          .tp-ai-live {
            animation:
              none !important;
          }

          .tp-browser-window {
            transform:
              none;
          }

          .tp-earth-video {
            transform:
              none;
          }
        }
      `}</style>
    </section>
  );
}

/* ================================================================
   MINI STAT
================================================================ */

function MiniStat({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="tp-mini-stat">
      <div className="tp-mini-stat-label">
        {title}
      </div>

      <div className="tp-mini-stat-value">
        {value}
      </div>

      <div className="tp-mini-stat-change">
        {change} this week
      </div>
    </div>
  );
}

/* ================================================================
   SCHEDULE
================================================================ */

function Schedule({
  time,
  title,
  description,
  active = false,
  type = "focus",
}: {
  time: string;
  title: string;
  description: string;
  active?: boolean;
  type?: "focus" | "meeting" | "break";
}) {
  return (
    <div
      className={`tp-schedule-row ${
        active ? "active" : ""
      }`}
      data-type={type}
    >
      <div className="tp-schedule-time">
        {time}
      </div>

      <div className="tp-schedule-content">
        <div className="tp-schedule-title">
          {title}
        </div>

        <div className="tp-schedule-description">
          {description}
        </div>
      </div>
    </div>
  );
}