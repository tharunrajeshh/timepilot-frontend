"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
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

/* ═══════════════════════════════════════════════════════════════
   ✏️  CUSTOMIZE YOUR CONTENT HERE
═══════════════════════════════════════════════════════════════ */

const BRAND = {
  name: "TimePilot",
  logoLetter: "T",
};

const HERO = {
  eyebrow: "Intelligent time management",
  titleLine1: "Take control",
  titleLine2: "of your time.",
  description:
    "TimePilot turns your tasks, priorities and schedule into a focused day you can actually finish.",
  primaryCta: { label: "Get started", href: "/signup" },
  secondaryCta: { label: "Explore TimePilot", href: "#features" },
  trust: [
    { label: "AI-assisted planning", accent: "purple" as const },
    { label: "Smart scheduling",     accent: "blue"   as const },
    { label: "Focus analytics",      accent: "green"  as const },
  ],
};

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
    { label: "Today",      icon: "calendar" as const, active: true },
    { label: "AI Planner", icon: "brain"    as const, active: false },
    { label: "Analytics",  icon: "chart"    as const, active: false },
  ],
  workspace: { name: "My workspace", type: "Personal", avatar: "M" },
};

const APP_DASHBOARD = {
  date: "THURSDAY, SEPTEMBER 24",
  greeting: "Good morning.",
  subtitle: "Here's your plan for today.",
  profileAvatar: "M",
  stats: [
    { title: "Focus time",      value: "4h 32m", change: "+18%" },
    { title: "Tasks completed", value: "8 / 11", change: "+3"   },
    { title: "Deep work",       value: "72%",    change: "+12%" },
  ],
  schedule: [
    { time: "09:00", title: "Deep work",    description: "Product strategy",   active: true,  type: "focus"   as const },
    { time: "11:00", title: "Team sync",    description: "Weekly planning",    active: false, type: "meeting" as const },
    { time: "13:30", title: "Lunch break",  description: "Take a real break",  active: false, type: "break"   as const },
    { time: "14:30", title: "Project work", description: "Dashboard redesign", active: false, type: "focus"   as const },
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

/* Background video — cinematic space footage */
const BACKGROUND_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_051048_5ef213b5-26db-4da8-b604-7ef823760b6b.mp4";

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Ensure autoplay works even if browser throttles it */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      /* Autoplay blocked — video just stays paused on first frame */
    });
  }, []);

  return (
    <section id="top" className="tp-hero" ref={heroRef}>
      {/* ═══════════════════════════════════════════════════════
          BACKGROUND VIDEO
      ═══════════════════════════════════════════════════════ */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="tp-hero-video"
      >
        <source src={BACKGROUND_VIDEO} type="video/mp4" />
      </video>

      {/* Cinematic gradient overlays for text legibility */}
      <div className="tp-hero-overlay" />
      <div className="tp-hero-vignette" />

      {/* Subtle floating glows */}
      <div className="tp-hero-glow tp-hero-glow-left" />
      <div className="tp-hero-glow tp-hero-glow-right" />

      {/* ═══════════════════════════════════════════════════════
          CONTENT
      ═══════════════════════════════════════════════════════ */}
      <div className="tp-hero-container">
        {/* Liquid glass eyebrow pill */}
        <div className="tp-hero-eyebrow liquid-glass">
          <span className="tp-eyebrow-dot" />
          <span>{HERO.eyebrow}</span>
          <span className="tp-eyebrow-arrow">↗</span>
        </div>

        {/* Title */}
        <h1 className="tp-hero-title">
          <span>{HERO.titleLine1}</span>
          <span className="tp-hero-title-light">{HERO.titleLine2}</span>
        </h1>

        {/* Description */}
        <p className="tp-hero-description">{HERO.description}</p>

        {/* Buttons */}
        <div className="tp-hero-buttons">
          <Link href={HERO.primaryCta.href} className="tp-get-started">
            <span>{HERO.primaryCta.label}</span>
            <span className="tp-get-started-icon">
              <ArrowUpRight size={18} strokeWidth={2.2} />
            </span>
          </Link>

          <a href={HERO.secondaryCta.href} className="tp-explore liquid-glass">
            <span>{HERO.secondaryCta.label}</span>
            <span className="tp-explore-arrow">↓</span>
          </a>
        </div>

        {/* Trust row */}
        <div className="tp-trust">
          {HERO.trust.map((item, i) => (
            <div key={item.label} className="tp-trust-group">
              {i > 0 && <span className="tp-trust-divider" />}
              <div className={`tp-trust-item tp-trust-${item.accent}`}>
                <span className="tp-trust-icon">
                  <Check size={12} strokeWidth={2.7} />
                </span>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            PRODUCT SHOWCASE
        ═══════════════════════════════════════════════════════ */}
        <div className="tp-preview-wrapper">
          {/* Floating AI card */}
          <div className="tp-ai-card liquid-glass">
            <div className="tp-ai-card-icon">
              <Sparkles size={17} />
            </div>
            <div className="tp-ai-card-content">
              <div className="tp-ai-card-title">{FLOATING_AI_CARD.title}</div>
              <div className="tp-ai-card-subtitle">{FLOATING_AI_CARD.subtitle}</div>
            </div>
            <span className="tp-ai-live" />
          </div>

          {/* Floating focus card */}
          <div className="tp-focus-card liquid-glass">
            <div className="tp-focus-card-icon">
              <Clock3 size={17} />
            </div>
            <div>
              <div className="tp-focus-card-label">{FLOATING_FOCUS_CARD.label}</div>
              <div className="tp-focus-card-time">{FLOATING_FOCUS_CARD.time}</div>
            </div>
          </div>

          {/* Browser mock */}
          <div className="tp-browser-window">
            <div className="tp-browser-header">
              <div className="tp-browser-controls">
                <span /><span /><span />
              </div>
              <div className="tp-browser-address">app.{BRAND.name.toLowerCase()}</div>
              <MoreHorizontal size={18} className="tp-browser-more" />
            </div>

            <div className="tp-app">
              <aside className="tp-app-sidebar">
                <div className="tp-app-logo">{BRAND.logoLetter}</div>

                <div className="tp-app-navigation">
                  {APP_SIDEBAR.nav.map((item) => {
                    const Icon =
                      item.icon === "calendar" ? CalendarDays
                      : item.icon === "brain"   ? Brain
                      :                           BarChart3;
                    return (
                      <div key={item.label} className={`tp-app-nav ${item.active ? "active" : ""}`}>
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="tp-app-user">
                  <div className="tp-user-avatar">{APP_SIDEBAR.workspace.avatar}</div>
                  <div>
                    <div className="tp-user-name">{APP_SIDEBAR.workspace.name}</div>
                    <div className="tp-user-type">{APP_SIDEBAR.workspace.type}</div>
                  </div>
                </div>
              </aside>

              <main className="tp-app-main">
                <div className="tp-app-heading">
                  <div>
                    <div className="tp-app-date">{APP_DASHBOARD.date}</div>
                    <h2>{APP_DASHBOARD.greeting}</h2>
                    <p>{APP_DASHBOARD.subtitle}</p>
                  </div>
                  <div className="tp-profile">{APP_DASHBOARD.profileAvatar}</div>
                </div>

                <div className="tp-stats">
                  {APP_DASHBOARD.stats.map((s) => (
                    <MiniStat key={s.title} title={s.title} value={s.value} change={s.change} />
                  ))}
                </div>

                <div className="tp-dashboard-grid">
                  <div className="tp-schedule">
                    <div className="tp-section-heading">
                      <div>
                        <span>TODAY</span>
                        <h3>Your schedule</h3>
                      </div>
                      <button type="button">View all</button>
                    </div>

                    <div className="tp-schedule-list">
                      {APP_DASHBOARD.schedule.map((row) => (
                        <Schedule
                          key={row.time + row.title}
                          time={row.time}
                          title={row.title}
                          description={row.description}
                          active={row.active}
                          type={row.type}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="tp-ai-panel">
                    <div className="tp-ai-panel-icon">
                      <Sparkles size={17} />
                    </div>
                    <span className="tp-ai-panel-label">{APP_DASHBOARD.aiPanel.label}</span>
                    <h3>
                      {APP_DASHBOARD.aiPanel.headline}{" "}
                      <strong>{APP_DASHBOARD.aiPanel.headlineStrong}</strong>
                    </h3>
                    <p>{APP_DASHBOARD.aiPanel.body}</p>
                    <div className="tp-progress">
                      <span style={{ width: `${APP_DASHBOARD.aiPanel.progress}%` }} />
                    </div>
                    <div className="tp-ai-panel-bottom">
                      <span>{APP_DASHBOARD.aiPanel.footLeft}</span>
                      <strong>{APP_DASHBOARD.aiPanel.footRight}</strong>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

          {/* Caption */}
          <div className="tp-preview-caption">
            <span>{PREVIEW_CAPTION.left}</span>
            <span className="tp-caption-divider" />
            <span>{PREVIEW_CAPTION.right}</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STYLES
      ═══════════════════════════════════════════════════════════ */}
      <style jsx>{`
        /* ─── HERO SHELL ─────────────────────────────────── */
        .tp-hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          padding-top: 150px;
          padding-bottom: 100px;
          overflow: hidden;
          background: #050505;
          color: #ffffff;
          isolation: isolate;
        }

        /* ─── VIDEO BACKGROUND ────────────────────────────── */
        .tp-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
          transform: scale(1.02);
        }

        /* Gradient overlays for text legibility */
        .tp-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 30%, rgba(0, 0, 0, 0.05), transparent 45%),
            linear-gradient(
              to bottom,
              rgba(3, 5, 9, 0.55) 0%,
              rgba(3, 5, 9, 0.35) 35%,
              rgba(3, 5, 9, 0.55) 70%,
              rgba(3, 5, 9, 0.92) 100%
            );
        }

        .tp-hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 45%,
            rgba(0, 0, 0, 0.55) 100%
          );
        }

        /* ─── DECORATIVE GLOWS ────────────────────────────── */
        .tp-hero-glow {
          position: absolute;
          width: 620px;
          height: 620px;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          opacity: 0.35;
          z-index: 2;
          animation: tp-glow-drift 18s ease-in-out infinite;
        }

        .tp-hero-glow-left {
          top: 8%;
          left: -380px;
          background: rgba(92, 62, 190, 0.28);
        }

        .tp-hero-glow-right {
          top: 45%;
          right: -380px;
          background: rgba(40, 100, 180, 0.24);
          animation-delay: -9s;
        }

        @keyframes tp-glow-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(30px, -20px) scale(1.08); }
        }

        /* ─── CONTAINER ───────────────────────────────────── */
        .tp-hero-container {
          position: relative;
          z-index: 10;
          width: min(1280px, calc(100% - 40px));
          margin: 0 auto;
          text-align: center;
        }

        /* ─── LIQUID GLASS UTILITY ────────────────────────── */
        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(10px) saturate(140%);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          border: none;
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.1),
            0 12px 40px rgba(0, 0, 0, 0.28);
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
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* ─── EYEBROW ─────────────────────────────────────── */
        .tp-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          height: 38px;
          padding: 0 16px;
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.85);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          animation: tp-fade-up 700ms cubic-bezier(.16, 1, .3, 1) both;
        }

        .tp-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #62f7c2;
          box-shadow: 0 0 12px rgba(98, 247, 194, 0.85);
          animation: tp-pulse 2.5s ease-in-out infinite;
        }

        .tp-eyebrow-arrow {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        }

        /* ─── TITLE ───────────────────────────────────────── */
        .tp-hero-title {
          max-width: 1000px;
          margin: 28px auto 0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: clamp(56px, 8.5vw, 118px);
          line-height: 0.90;
          letter-spacing: -0.075em;
          font-weight: 720;
          color: #ffffff;
          text-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
          animation: tp-fade-up 800ms 100ms cubic-bezier(.16, 1, .3, 1) both;
        }

        .tp-hero-title > span { display: block; }

        .tp-hero-title-light {
          color: rgba(255, 255, 255, 0.55);
          font-weight: 420;
          letter-spacing: -0.082em;
        }

        /* ─── DESCRIPTION ─────────────────────────────────── */
        .tp-hero-description {
          max-width: 620px;
          margin: 32px auto 0;
          color: rgba(255, 255, 255, 0.65);
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.6;
          letter-spacing: -0.018em;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
          animation: tp-fade-up 800ms 200ms cubic-bezier(.16, 1, .3, 1) both;
        }

        /* ─── BUTTONS ─────────────────────────────────────── */
        .tp-hero-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 34px;
          animation: tp-fade-up 800ms 300ms cubic-bezier(.16, 1, .3, 1) both;
        }

        .tp-get-started {
          height: 58px;
          padding: 0 9px 0 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 999px;
          background: #ffffff;
          color: #050505;
          font-size: 15px;
          font-weight: 650;
          letter-spacing: -0.025em;
          text-decoration: none;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.5);
          transition: transform 0.35s cubic-bezier(.16, 1, .3, 1),
                      box-shadow 0.35s ease,
                      background 0.3s ease;
        }

        .tp-get-started:hover {
          transform: translateY(-3px);
          background: #f3f3f3;
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.6);
        }

        .tp-get-started-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #050505;
          color: #ffffff;
          transition: transform 0.35s cubic-bezier(.16, 1, .3, 1);
        }

        .tp-get-started:hover .tp-get-started-icon {
          transform: translate(2px, -2px) rotate(4deg);
        }

        .tp-explore {
          height: 58px;
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.92);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.025em;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tp-explore:hover {
          transform: translateY(-3px);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.15),
            0 18px 45px rgba(0, 0, 0, 0.45);
        }

        .tp-explore-arrow {
          color: rgba(255, 255, 255, 0.55);
          font-size: 19px;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .tp-explore:hover .tp-explore-arrow {
          color: #ffffff;
          transform: translateY(3px);
        }

        /* ─── TRUST ROW ───────────────────────────────────── */
        .tp-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 17px;
          margin-top: 30px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 12px;
          font-weight: 500;
          animation: tp-fade-up 800ms 400ms cubic-bezier(.16, 1, .3, 1) both;
        }

        .tp-trust-group { display: flex; align-items: center; gap: 17px; }

        .tp-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.25s ease;
        }

        .tp-trust-icon {
          width: 19px;
          height: 19px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .tp-trust-purple .tp-trust-icon { background: rgba(139, 92, 246, 0.22); color: #a78bfa; box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.06); }
        .tp-trust-purple:hover           { color: #c4b5fd; }
        .tp-trust-purple:hover .tp-trust-icon { transform: scale(1.12); }

        .tp-trust-blue .tp-trust-icon { background: rgba(59, 130, 246, 0.22); color: #60a5fa; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.06); }
        .tp-trust-blue:hover          { color: #93c5fd; }
        .tp-trust-blue:hover .tp-trust-icon { transform: scale(1.12); }

        .tp-trust-green .tp-trust-icon { background: rgba(16, 185, 129, 0.22); color: #34d399; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.06); }
        .tp-trust-green:hover           { color: #6ee7b7; }
        .tp-trust-green:hover .tp-trust-icon { transform: scale(1.12); }

        .tp-trust-divider {
          width: 1px;
          height: 18px;
          background: rgba(255, 255, 255, 0.15);
        }

        /* ─── PRODUCT PREVIEW ─────────────────────────────── */
        .tp-preview-wrapper {
          position: relative;
          width: 100%;
          margin-top: 80px;
          animation: tp-fade-up 1000ms 500ms cubic-bezier(.16, 1, .3, 1) both;
        }

        /* ─── BROWSER ─────────────────────────────────────── */
        .tp-browser-window {
          position: relative;
          width: min(1080px, calc(100% - 80px));
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 30px;
          background: #ffffff;
          box-shadow:
            0 55px 140px rgba(0, 0, 0, 0.7),
            0 20px 55px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          transform: perspective(1600px) rotateX(1deg);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .tp-browser-window:hover {
          transform: perspective(1600px) rotateX(0deg) translateY(-5px);
          box-shadow:
            0 65px 145px rgba(0, 0, 0, 0.75),
            0 18px 50px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        .tp-browser-header {
          height: 58px;
          padding: 0 22px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
          background: rgba(255, 255, 255, 0.96);
        }

        .tp-browser-controls { display: flex; align-items: center; gap: 8px; }
        .tp-browser-controls span { width: 9px; height: 9px; border-radius: 50%; background: #d8d8d8; }
        .tp-browser-controls span:first-child { background: #c5c5c5; }

        .tp-browser-address {
          min-width: 130px;
          height: 34px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 999px;
          background: #f8f8f8;
          color: #9a9a9a;
          font-size: 10px;
          font-weight: 500;
        }

        .tp-browser-more { justify-self: end; color: #aaa; }

        /* ─── APP LAYOUT ──────────────────────────────────── */
        .tp-app {
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          min-height: 475px;
          background: #f6f6f6;
          text-align: left;
        }

        .tp-app * { text-align: left; }

        .tp-app-sidebar {
          padding: 22px 13px;
          display: flex;
          flex-direction: column;
          background: #fff;
          border-right: 1px solid rgba(0, 0, 0, 0.07);
        }

        .tp-app-logo {
          width: 36px;
          height: 36px;
          margin: 0 8px 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #000;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.14);
        }

        .tp-app-navigation { display: flex; flex-direction: column; gap: 5px; }

        .tp-app-nav {
          position: relative;
          height: 42px;
          padding: 0 11px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 11px;
          color: #999;
          font-size: 11px;
          font-weight: 550;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .tp-app-nav:hover { background: #f7f7f7; color: #444; transform: translateX(2px); }
        .tp-app-nav.active { background: #f1f1f1; color: #111; font-weight: 650; }

        .tp-app-nav.active::before {
          content: "";
          position: absolute;
          left: -13px;
          top: 9px;
          width: 3px;
          height: 24px;
          border-radius: 999px;
          background: #000;
        }

        .tp-app-user {
          margin-top: auto;
          padding: 15px 8px 8px;
          display: flex;
          align-items: center;
          gap: 9px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .tp-user-avatar {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #111;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .tp-user-name { color: #333; font-size: 9px; font-weight: 650; }
        .tp-user-type { margin-top: 2px; color: #aaa; font-size: 8px; }

        .tp-app-main {
          min-width: 0;
          padding: 28px 30px 32px;
          background: linear-gradient(180deg, #f7f7f7 0%, #f4f4f4 100%);
        }

        .tp-app-heading {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tp-app-date { color: #a1a1a1; font-size: 9px; font-weight: 650; letter-spacing: 0.09em; }

        .tp-app-heading h2 {
          margin: 7px 0 4px;
          color: #111;
          font-size: 29px;
          line-height: 1;
          font-weight: 650;
          letter-spacing: -0.055em;
        }

        .tp-app-heading p { margin: 0; color: #999; font-size: 10px; }

        .tp-profile {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #111;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.14);
        }

        /* ─── STATS ───────────────────────────────────────── */
        .tp-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 24px;
        }

        .tp-mini-stat {
          min-width: 0;
          padding: 15px 16px;
          border: 1px solid rgba(0, 0, 0, 0.065);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.82);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.025);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .tp-mini-stat:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 0, 0, 0.11);
          box-shadow: 0 9px 24px rgba(0, 0, 0, 0.055);
        }

        .tp-mini-stat-label { color: #9b9b9b; font-size: 8px; font-weight: 650; text-transform: uppercase; letter-spacing: 0.06em; }
        .tp-mini-stat-value { margin-top: 7px; color: #111; font-size: 18px; line-height: 1; font-weight: 700; letter-spacing: -0.045em; }
        .tp-mini-stat-change { margin-top: 7px; color: #777; font-size: 8px; font-weight: 550; }

        .tp-mini-stat::after { content: ""; display: block; width: 20px; height: 2px; margin-top: 10px; border-radius: 999px; background: #d9d9d9; }
        .tp-mini-stat:nth-child(1)::after { background: #8B5CF6; }
        .tp-mini-stat:nth-child(2)::after { background: #3B82F6; }
        .tp-mini-stat:nth-child(3)::after { background: #10B981; }

        /* ─── DASHBOARD GRID ──────────────────────────────── */
        .tp-dashboard-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(220px, 0.75fr);
          gap: 12px;
          margin-top: 12px;
          align-items: stretch;
        }

        .tp-schedule {
          min-width: 0;
          padding: 18px;
          border: 1px solid rgba(0, 0, 0, 0.065);
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 5px 18px rgba(0, 0, 0, 0.025);
        }

        .tp-section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .tp-section-heading span { color: #aaa; font-size: 8px; font-weight: 650; letter-spacing: 0.08em; }
        .tp-section-heading h3 { margin: 5px 0 0; color: #111; font-size: 15px; line-height: 1; font-weight: 650; letter-spacing: -0.035em; }

        .tp-section-heading button {
          padding: 6px 9px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 7px;
          background: #fafafa;
          color: #888;
          font-size: 9px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .tp-section-heading button:hover { background: #f1f1f1; color: #222; }

        .tp-schedule-list { width: 100%; }

        .tp-schedule-row {
          position: relative;
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          gap: 0;
          min-height: 57px;
        }

        .tp-schedule-time { padding-top: 10px; color: #a0a0a0; font-size: 9px; line-height: 1; font-weight: 650; }

        .tp-schedule-content {
          min-width: 0;
          padding: 9px 12px;
          border-left: 1px solid #e5e5e5;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .tp-schedule-row:hover .tp-schedule-content {
          background: #fafafa;
          border-radius: 0 9px 9px 0;
        }

        .tp-schedule-row.active .tp-schedule-content {
          border-left: 2px solid #111;
          background: linear-gradient(90deg, #f7f7f7, #ffffff);
          border-radius: 0 10px 10px 0;
        }

        .tp-schedule-title { color: #1c1c1c; font-size: 10px; line-height: 1.2; font-weight: 700; }
        .tp-schedule-description { margin-top: 4px; color: #a0a0a0; font-size: 8px; line-height: 1.2; }

        .tp-schedule-row[data-type="break"] .tp-schedule-content {
          border-left-style: dashed;
          background: transparent;
        }

        /* ─── AI PANEL ────────────────────────────────────── */
        .tp-ai-panel {
          min-width: 0;
          min-height: 100%;
          padding: 19px;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          background: linear-gradient(145deg, #151515, #0c0c0c);
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.13);
          overflow: hidden;
        }

        .tp-ai-panel-icon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .tp-ai-panel-label { margin-top: 20px; color: #777; font-size: 8px; font-weight: 650; letter-spacing: 0.12em; }

        .tp-ai-panel h3 {
          max-width: 240px;
          margin: 10px 0 0;
          color: #fff;
          font-size: 15px;
          line-height: 1.38;
          font-weight: 450;
          letter-spacing: -0.035em;
        }

        .tp-ai-panel h3 strong { color: #fff; font-weight: 700; }
        .tp-ai-panel p { max-width: 220px; margin: 11px 0 0; color: #777; font-size: 9px; line-height: 1.55; }

        .tp-progress {
          height: 4px;
          margin-top: auto;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
        }

        .tp-progress span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #fff, #d0d0d0);
        }

        .tp-ai-panel-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          color: #666;
          font-size: 8px;
        }

        .tp-ai-panel-bottom strong { color: #aaa; }

        /* ─── FLOATING CARDS (liquid glass) ───────────────── */
        .tp-ai-card {
          position: absolute;
          z-index: 5;
          left: max(0px, calc((100% - 1160px) / 2));
          top: 75px;
          width: 210px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 11px;
          border-radius: 16px;
          color: #fff;
          animation: tp-float-one 5s ease-in-out infinite;
        }

        .tp-ai-card-icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #ffffff;
          color: #000;
        }

        .tp-ai-card-content { min-width: 0; }
        .tp-ai-card-title { color: #fff; font-size: 10.5px; font-weight: 700; }
        .tp-ai-card-subtitle { margin-top: 3px; color: rgba(255, 255, 255, 0.55); font-size: 8.5px; }

        .tp-ai-live {
          width: 6px;
          height: 6px;
          margin-left: auto;
          flex-shrink: 0;
          border-radius: 50%;
          background: #62f7c2;
          box-shadow: 0 0 10px rgba(98, 247, 194, 0.8);
          animation: tp-pulse 2s ease-in-out infinite;
        }

        .tp-focus-card {
          position: absolute;
          z-index: 5;
          right: max(0px, calc((100% - 1160px) / 2));
          bottom: 75px;
          width: 170px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 16px;
          color: #fff;
          animation: tp-float-two 6s ease-in-out infinite;
        }

        .tp-focus-card-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .tp-focus-card-label { color: rgba(255, 255, 255, 0.55); font-size: 8.5px; }
        .tp-focus-card-time  { margin-top: 2px; color: #ffffff; font-size: 15px; font-weight: 700; letter-spacing: -0.04em; }

        /* ─── CAPTION ─────────────────────────────────────── */
        .tp-preview-caption {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .tp-caption-divider {
          width: 30px;
          height: 1px;
          background: rgba(255, 255, 255, 0.22);
        }

        /* ─── ANIMATIONS ──────────────────────────────────── */
        @keyframes tp-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes tp-pulse {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50%      { transform: scale(1.1); opacity: 1; }
        }

        @keyframes tp-float-one {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        @keyframes tp-float-two {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(8px); }
        }

        /* ─── RESPONSIVE ──────────────────────────────────── */
        @media (max-width: 1100px) {
          .tp-browser-window { width: calc(100% - 40px); }
        }

        @media (max-width: 900px) {
          .tp-app { grid-template-columns: 165px minmax(0, 1fr); }
          .tp-app-main { padding: 23px; }
          .tp-dashboard-grid { grid-template-columns: minmax(0, 1fr); }
          .tp-ai-panel { min-height: 190px; }
          .tp-ai-card { left: 4px; }
          .tp-focus-card { right: 4px; }
        }

        @media (max-width: 720px) {
          .tp-hero { padding-top: 115px; padding-bottom: 60px; }
          .tp-hero-container { width: calc(100% - 28px); }
          .tp-hero-title { font-size: clamp(46px, 14vw, 76px); }
          .tp-hero-description { max-width: 480px; font-size: 15px; }
          .tp-trust { flex-wrap: wrap; max-width: 440px; margin-left: auto; margin-right: auto; }
          .tp-trust-divider { display: none; }
          .tp-preview-wrapper { margin-top: 55px; }
          .tp-browser-window { width: 100%; border-radius: 22px; }
          .tp-app { grid-template-columns: 1fr; }
          .tp-app-sidebar { display: none; }
          .tp-app-main { padding: 18px; }
          .tp-app-heading h2 { font-size: 23px; }
          .tp-dashboard-grid { grid-template-columns: 1fr; }
          .tp-ai-panel { min-height: 180px; }
          .tp-ai-card { left: 0; top: 45px; transform: scale(0.78); transform-origin: left top; }
          .tp-focus-card { right: 0; bottom: 55px; transform: scale(0.78); transform-origin: right bottom; }
        }

        @media (max-width: 600px) {
          .tp-hero-buttons { width: 100%; flex-direction: column; gap: 10px; }
          .tp-get-started, .tp-explore { width: 100%; }
          .tp-trust { flex-direction: column; gap: 10px; }
          .tp-browser-header { height: 50px; padding: 0 14px; }
          .tp-browser-address { min-width: 90px; height: 30px; padding: 0 12px; }
          .tp-app-main { padding: 15px; }
          .tp-app-heading h2 { font-size: 21px; }
          .tp-app-heading p { font-size: 9px; }
          .tp-profile { width: 31px; height: 31px; }
          .tp-stats { grid-template-columns: 1fr 1fr; }
          .tp-mini-stat:last-child { grid-column: span 2; }
          .tp-mini-stat { padding: 12px; }
          .tp-mini-stat-value { font-size: 15px; }
          .tp-schedule { padding: 14px; }
          .tp-preview-caption { flex-direction: column; gap: 5px; }
          .tp-caption-divider { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tp-hero-glow,
          .tp-eyebrow-dot,
          .tp-ai-live,
          .tp-ai-card,
          .tp-focus-card {
            animation: none !important;
          }
          .tp-hero-video { display: none; }
          .tp-hero { background: radial-gradient(circle at 50% 40%, #0a0e1a, #02030a); }
          .tp-browser-window { transform: none; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MINI STAT
═══════════════════════════════════════════════════════════════ */

function MiniStat({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="tp-mini-stat">
      <div className="tp-mini-stat-label">{title}</div>
      <div className="tp-mini-stat-value">{value}</div>
      <div className="tp-mini-stat-change">{change} this week</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCHEDULE ROW
═══════════════════════════════════════════════════════════════ */

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
    <div className={`tp-schedule-row ${active ? "active" : ""}`} data-type={type}>
      <div className="tp-schedule-time">{time}</div>
      <div className="tp-schedule-content">
        <div className="tp-schedule-title">{title}</div>
        <div className="tp-schedule-description">{description}</div>
      </div>
    </div>
  );
}