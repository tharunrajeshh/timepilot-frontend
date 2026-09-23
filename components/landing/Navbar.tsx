"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TimePilotLogo from "@/components/ui/TimePilotLogo";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "AI Planner",
    href: "#ai-planner",
  },
  {
    label: "Analytics",
    href: "#analytics",
  },
  {
    label: "How it works",
    href: "#how-it-works",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  /* =====================================================
     NAVBAR SCROLL STATE
     ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     ACTIVE SECTION DETECTION
     ===================================================== */

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visibleSections.length > 0) {
          const id =
            visibleSections[0].target.getAttribute("id");

          if (id) {
            setActive(`#${id}`);
          }
        }
      },
      {
        rootMargin: "-100px 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =====================================================
     CLICK NAVIGATION
     ===================================================== */

  const handleNavClick = (href: string) => {
    setActive(href);
    setMenuOpen(false);
  };

  /* =====================================================
     LOGO
     ===================================================== */

  const handleLogoClick = () => {
    setActive("");
    setMenuOpen(false);
  };

  /* =====================================================
     MOBILE MENU BODY LOCK
     ===================================================== */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =====================================================
     ESCAPE KEY
     ===================================================== */

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,

          padding: scrolled
            ? "12px 16px"
            : "18px 16px",

          transition:
            "padding 0.3s ease",
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            position: "relative",

            width: "100%",
            maxWidth: "1180px",

            minHeight: "68px",

            margin: "0 auto",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            padding: "0 10px 0 16px",

            border:
              "1px solid rgba(13, 20, 32, 0.10)",

            borderRadius: "20px",

            background:
              "rgba(255, 253, 248, 0.88)",

            backdropFilter:
              "blur(20px) saturate(150%)",

            WebkitBackdropFilter:
              "blur(20px) saturate(150%)",

            boxShadow: scrolled
              ? "0 16px 45px rgba(13, 20, 32, 0.10)"
              : "0 8px 30px rgba(13, 20, 32, 0.06)",

            boxSizing: "border-box",
          }}
        >
          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <div
            onClick={handleLogoClick}
            style={{
              position: "relative",
              zIndex: 2,
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <TimePilotLogo
              variant="dark"
              size="md"
            />
          </div>

          {/* ================================================= */}
          {/* DESKTOP NAV */}
          {/* ================================================= */}

          <div className="tp-desktop-nav">
            {navItems.map((item) => {
              const isActive = active === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    handleNavClick(item.href)
                  }
                  className={
                    isActive
                      ? "tp-nav-link tp-nav-link-active"
                      : "tp-nav-link"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* ================================================= */}
          {/* DESKTOP ACTIONS */}
          {/* ================================================= */}

          <div className="tp-desktop-actions">
            <Link
              href="/login"
              className="tp-login-link"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="tp-start-link"
            >
              Get started
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* ================================================= */}
          {/* MOBILE BUTTON */}
          {/* ================================================= */}

          <button
            className="tp-mobile-button"
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
          >
            <span className="tp-menu-icon">
              <span
                className={
                  menuOpen
                    ? "tp-menu-line tp-menu-line-top-open"
                    : "tp-menu-line"
                }
              />

              <span
                className={
                  menuOpen
                    ? "tp-menu-line tp-menu-line-middle-open"
                    : "tp-menu-line"
                }
              />

              <span
                className={
                  menuOpen
                    ? "tp-menu-line tp-menu-line-bottom-open"
                    : "tp-menu-line"
                }
              />
            </span>
          </button>

          {/* ================================================= */}
          {/* MOBILE MENU */}
          {/* ================================================= */}

          {menuOpen && (
            <>
              <button
                type="button"
                aria-label="Close navigation menu"
                className="tp-mobile-overlay"
                onClick={() => setMenuOpen(false)}
              />

              <div
                id="mobile-navigation"
                className="tp-mobile-menu"
              >
                {/* Mobile navigation links */}

                <div className="tp-mobile-links">
                  {navItems.map((item) => {
                    const isActive =
                      active === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() =>
                          handleNavClick(item.href)
                        }
                        className={
                          isActive
                            ? "tp-mobile-link tp-mobile-link-active"
                            : "tp-mobile-link"
                        }
                      >
                        <span>{item.label}</span>

                        <span
                          aria-hidden="true"
                          className="tp-mobile-arrow"
                        >
                          →
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile actions */}

                <div className="tp-mobile-actions">
                  <Link
                    href="/login"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="tp-mobile-login"
                  >
                    Log in
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="tp-mobile-start"
                  >
                    Get started
                    <span aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </nav>
      </header>

      {/* =====================================================
          RESPONSIVE / NAVBAR STYLES
          ===================================================== */}

      <style jsx>{`
        /* -----------------------------------------------
           DESKTOP NAV
           ----------------------------------------------- */

        .tp-desktop-nav {
          position: absolute;

          left: 50%;

          transform: translateX(-50%);

          display: flex;

          align-items: center;

          gap: 4px;

          padding: 4px;

          border: 1px solid
            rgba(13, 20, 32, 0.06);

          border-radius: 14px;

          background:
            rgba(13, 20, 32, 0.035);
        }

        .tp-nav-link {
          display: flex;

          align-items: center;
          justify-content: center;

          height: 38px;

          padding: 0 14px;

          border-radius: 10px;

          color:
            rgba(13, 20, 32, 0.62);

          text-decoration: none;

          font-size: 13px;

          font-weight: 550;

          white-space: nowrap;

          transition:
            color 0.2s ease,
            background-color 0.2s ease,
            transform 0.2s ease;
        }

        .tp-nav-link:hover {
          color: var(--tp-ink);

          background:
            rgba(255, 255, 255, 0.72);
        }

        .tp-nav-link-active {
          color: var(--tp-ink);

          background:
            rgba(255, 255, 255, 0.96);

          box-shadow:
            0 4px 14px
              rgba(13, 20, 32, 0.07);
        }

        /* -----------------------------------------------
           DESKTOP ACTIONS
           ----------------------------------------------- */

        .tp-desktop-actions {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          gap: 6px;

          flex-shrink: 0;
        }

        .tp-login-link {
          display: flex;

          align-items: center;
          justify-content: center;

          height: 42px;

          padding: 0 15px;

          border-radius: 10px;

          color: var(--tp-ink);

          text-decoration: none;

          font-size: 14px;

          font-weight: 500;

          transition:
            background-color 0.2s ease,
            transform 0.2s ease;
        }

        .tp-login-link:hover {
          background:
            rgba(13, 20, 32, 0.05);

          transform: translateY(-1px);
        }

        .tp-start-link {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          height: 42px;

          min-width: 126px;

          padding: 0 18px;

          border-radius: 11px;

          background: var(--tp-night);

          color: #ffffff;

          text-decoration: none;

          font-size: 14px;

          font-weight: 600;

          box-shadow:
            0 8px 22px
              rgba(10, 20, 34, 0.15);

          transition:
            background-color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .tp-start-link:hover {
          background: var(--tp-night-soft);

          transform: translateY(-1px);

          box-shadow:
            0 12px 28px
              rgba(10, 20, 34, 0.19);
        }

        /* -----------------------------------------------
           MOBILE BUTTON
           ----------------------------------------------- */

        .tp-mobile-button {
          display: none;

          width: 44px;

          height: 44px;

          min-width: 44px;

          align-items: center;

          justify-content: center;

          border: 1px solid
            rgba(13, 20, 32, 0.10);

          border-radius: 12px;

          background:
            rgba(255, 253, 248, 0.9);

          color: var(--tp-ink);

          cursor: pointer;

          transition:
            background-color 0.2s ease,
            border-color 0.2s ease;
        }

        .tp-mobile-button:hover {
          background: #ffffff;

          border-color:
            rgba(13, 20, 32, 0.16);
        }

        .tp-menu-icon {
          width: 18px;

          height: 14px;

          display: flex;

          flex-direction: column;

          justify-content: space-between;
        }

        .tp-menu-line {
          width: 100%;

          height: 1.5px;

          border-radius: 999px;

          background: var(--tp-ink);

          transition:
            transform 0.25s ease,
            opacity 0.2s ease;
        }

        .tp-menu-line-top-open {
          transform:
            translateY(6px)
            rotate(45deg);
        }

        .tp-menu-line-middle-open {
          opacity: 0;
        }

        .tp-menu-line-bottom-open {
          transform:
            translateY(-6px)
            rotate(-45deg);
        }

        /* -----------------------------------------------
           MOBILE OVERLAY
           ----------------------------------------------- */

        .tp-mobile-overlay {
          position: fixed;

          inset: 0;

          z-index: -1;

          width: 100vw;

          height: 100vh;

          border: 0;

          background:
            rgba(10, 20, 34, 0.18);

          backdrop-filter: blur(3px);

          -webkit-backdrop-filter: blur(3px);

          cursor: default;
        }

        /* -----------------------------------------------
           MOBILE MENU
           ----------------------------------------------- */

        .tp-mobile-menu {
          position: absolute;

          top: calc(100% + 10px);

          left: 0;

          right: 0;

          z-index: 20;

          padding: 12px;

          border: 1px solid
            rgba(13, 20, 32, 0.10);

          border-radius: 20px;

          background:
            rgba(255, 253, 248, 0.97);

          backdrop-filter:
            blur(22px)
            saturate(150%);

          -webkit-backdrop-filter:
            blur(22px)
            saturate(150%);

          box-shadow:
            0 24px 70px
              rgba(13, 20, 32, 0.14);

          animation:
            tp-mobile-menu-in 0.22s
            ease-out both;
        }

        .tp-mobile-links {
          display: flex;

          flex-direction: column;

          gap: 3px;
        }

        .tp-mobile-link {
          display: flex;

          align-items: center;

          justify-content: space-between;

          min-height: 48px;

          padding: 0 14px;

          border-radius: 12px;

          color:
            rgba(13, 20, 32, 0.72);

          text-decoration: none;

          font-size: 15px;

          font-weight: 500;

          transition:
            background-color 0.2s ease,
            color 0.2s ease;
        }

        .tp-mobile-link:hover {
          background:
            rgba(13, 20, 32, 0.045);

          color: var(--tp-ink);
        }

        .tp-mobile-link-active {
          background: var(--tp-night);

          color: #ffffff;
        }

        .tp-mobile-arrow {
          color: var(--tp-gold);

          font-size: 16px;

          transition:
            transform 0.2s ease;
        }

        .tp-mobile-link:hover
          .tp-mobile-arrow {
          transform: translateX(3px);
        }

        .tp-mobile-actions {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 8px;

          margin-top: 12px;

          padding-top: 12px;

          border-top: 1px solid
            rgba(13, 20, 32, 0.08);
        }

        .tp-mobile-login,
        .tp-mobile-start {
          min-height: 48px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          border-radius: 11px;

          text-decoration: none;

          font-size: 14px;

          font-weight: 600;
        }

        .tp-mobile-login {
          border: 1px solid
            rgba(13, 20, 32, 0.12);

          color: var(--tp-ink);

          background:
            rgba(255, 255, 255, 0.72);
        }

        .tp-mobile-start {
          background: var(--tp-night);

          color: #ffffff;

          box-shadow:
            0 8px 20px
              rgba(10, 20, 34, 0.13);
        }

        /* -----------------------------------------------
           ANIMATION
           ----------------------------------------------- */

        @keyframes tp-mobile-menu-in {
          from {
            opacity: 0;

            transform:
              translateY(-6px)
              scale(0.985);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }
        }

        /* -----------------------------------------------
           TABLET / MOBILE
           ----------------------------------------------- */

        @media (max-width: 900px) {
          .tp-desktop-nav,
          .tp-desktop-actions {
            display: none !important;
          }

          .tp-mobile-button {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          header {
            padding-left: 8px !important;

            padding-right: 8px !important;
          }

          nav {
            min-height: 62px !important;

            padding-left: 12px !important;

            padding-right: 8px !important;

            border-radius: 17px !important;
          }

          .tp-mobile-menu {
            border-radius: 18px;
          }
        }

        /* -----------------------------------------------
           REDUCED MOTION
           ----------------------------------------------- */

        @media (prefers-reduced-motion: reduce) {
          .tp-mobile-menu,
          .tp-nav-link,
          .tp-login-link,
          .tp-start-link,
          .tp-mobile-link,
          .tp-menu-line {
            animation: none !important;

            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}