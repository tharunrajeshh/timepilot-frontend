"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  color: string;
  glow: string;
};

const navItems: NavItem[] = [
  {
    label: "Features",
    href: "#features",
    color: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.28)",
  },
  {
    label: "AI Planner",
    href: "#ai-planner",
    color: "#3B82F6",
    glow: "rgba(59, 130, 246, 0.28)",
  },
  {
    label: "Analytics",
    href: "#analytics",
    color: "#10B981",
    glow: "rgba(16, 185, 129, 0.28)",
  },
  {
    label: "How it works",
    href: "#how-it-works",
    color: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.28)",
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
        /*
         * Find the section that is currently closest
         * to the top/center of the viewport.
         */

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
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
        /*
         * Navbar is around 70px high.
         * This creates a comfortable activation zone.
         */
        rootMargin: "-100px 0px -55% 0px",
        threshold: 0,
      }
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

  return (
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

        transition: "all 0.35s ease",
      }}
    >
      <nav
        style={{
          position: "relative",

          width: "100%",
          maxWidth: "1180px",

          minHeight: "68px",

          margin: "0 auto",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          padding: "0 10px 0 12px",

          border:
            "1px solid rgba(0, 0, 0, 0.08)",

          borderRadius: "999px",

          background:
            "rgba(255, 255, 255, 0.72)",

          backdropFilter:
            "blur(28px) saturate(180%)",

          WebkitBackdropFilter:
            "blur(28px) saturate(180%)",

          boxShadow: scrolled
            ? "0 15px 45px rgba(0, 0, 0, 0.12)"
            : "0 8px 30px rgba(0, 0, 0, 0.07)",

          boxSizing: "border-box",
        }}
      >
        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <Link
          href="/"
          onClick={handleLogoClick}
          style={{
            position: "relative",
            zIndex: 2,

            display: "flex",
            alignItems: "center",

            gap: "11px",

            flexShrink: 0,

            color: "#000000",

            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: "40px",
              height: "40px",

              minWidth: "40px",

              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background: "#000000",

              color: "#ffffff",

              fontSize: "14px",

              fontWeight: 700,

              boxShadow:
                "0 5px 18px rgba(0, 0, 0, 0.18)",
            }}
          >
            T
          </span>

          <span
            style={{
              display: "block",

              color: "#000000",

              fontSize: "16px",

              lineHeight: "1",

              fontWeight: 650,

              letterSpacing: "-0.03em",

              whiteSpace: "nowrap",
            }}
          >
            TimePilot
          </span>
        </Link>

        {/* ================================================= */}
        {/* DESKTOP NAV */}
        {/* ================================================= */}

        <div
          className="tp-desktop-nav"
          style={{
            position: "absolute",

            left: "50%",

            transform:
              "translateX(-50%)",

            display: "flex",

            alignItems: "center",

            gap: "3px",

            padding: "4px",

            borderRadius: "999px",

            background:
              "rgba(255, 255, 255, 0.28)",
          }}
        >
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
                style={{
                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  height: "38px",

                  padding: "0 14px",

                  borderRadius: "999px",

                  color: isActive
                    ? "#ffffff"
                    : "rgba(0, 0, 0, 0.58)",

                  background: isActive
                    ? item.color
                    : "transparent",

                  boxShadow: isActive
                    ? `0 7px 22px ${item.glow}`
                    : "none",

                  textDecoration: "none",

                  fontSize: "13px",

                  fontWeight: 550,

                  whiteSpace: "nowrap",

                  transition:
                    "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ================================================= */}
        {/* DESKTOP ACTIONS */}
        {/* ================================================= */}

        <div
          className="tp-desktop-actions"
          style={{
            position: "relative",

            zIndex: 2,

            display: "flex",

            alignItems: "center",

            gap: "4px",

            flexShrink: 0,
          }}
        >
          <Link
            href="/login"
            style={{
              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              height: "42px",

              padding: "0 16px",

              borderRadius: "999px",

              color: "#000000",

              textDecoration: "none",

              fontSize: "14px",

              fontWeight: 500,

              whiteSpace: "nowrap",
            }}
          >
            Log in
          </Link>

          <Link
            href="/signup"
            style={{
              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              gap: "8px",

              height: "42px",

              minWidth: "126px",

              padding: "0 18px",

              borderRadius: "999px",

              background: "#000000",

              color: "#ffffff",

              textDecoration: "none",

              fontSize: "14px",

              fontWeight: 600,

              whiteSpace: "nowrap",

              boxShadow:
                "0 5px 18px rgba(0, 0, 0, 0.16)",
            }}
          >
            Get started

            <span
              style={{
                color: "#ffffff",
              }}
            >
              →
            </span>
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
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen((value) => !value)
          }
          style={{
            width: "42px",

            height: "42px",

            minWidth: "42px",

            borderRadius: "50%",

            border:
              "1px solid rgba(0, 0, 0, 0.08)",

            background:
              "rgba(255, 255, 255, 0.72)",

            color: "#000000",

            alignItems: "center",

            justifyContent: "center",

            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: "17px",

              height: "12px",

              display: "flex",

              flexDirection: "column",

              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                height: "1.5px",

                width: "100%",

                background: "#000000",

                transform: menuOpen
                  ? "translateY(5px) rotate(45deg)"
                  : "none",

                transition: "0.25s",
              }}
            />

            <span
              style={{
                height: "1.5px",

                width: "100%",

                background: "#000000",

                opacity: menuOpen ? 0 : 1,

                transition: "0.25s",
              }}
            />

            <span
              style={{
                height: "1.5px",

                width: "100%",

                background: "#000000",

                transform: menuOpen
                  ? "translateY(-5px) rotate(-45deg)"
                  : "none",

                transition: "0.25s",
              }}
            />
          </span>
        </button>

        {/* ================================================= */}
        {/* MOBILE MENU */}
        {/* ================================================= */}

        {menuOpen && (
          <div
            style={{
              position: "absolute",

              top: "76px",

              left: 0,

              right: 0,

              padding: "16px",

              border:
                "1px solid rgba(0, 0, 0, 0.08)",

              borderRadius: "28px",

              background:
                "rgba(255, 255, 255, 0.88)",

              backdropFilter:
                "blur(30px) saturate(180%)",

              WebkitBackdropFilter:
                "blur(30px) saturate(180%)",

              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.12)",
            }}
          >
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
                  style={{
                    display: "block",

                    marginBottom: "4px",

                    padding: "14px 15px",

                    borderRadius: "15px",

                    color: isActive
                      ? "#ffffff"
                      : "rgba(0, 0, 0, 0.72)",

                    background: isActive
                      ? item.color
                      : "transparent",

                    textDecoration: "none",

                    fontSize: "15px",

                    fontWeight: 500,

                    transition:
                      "all 0.3s ease",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "1fr 1fr",

                gap: "8px",

                marginTop: "14px",
              }}
            >
              <Link
                href="/login"
                onClick={() =>
                  setMenuOpen(false)
                }
                style={{
                  height: "48px",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  borderRadius: "999px",

                  border:
                    "1px solid rgba(0, 0, 0, 0.08)",

                  color: "#000000",

                  textDecoration: "none",

                  fontSize: "14px",

                  fontWeight: 500,
                }}
              >
                Log in
              </Link>

              <Link
                href="/signup"
                onClick={() =>
                  setMenuOpen(false)
                }
                style={{
                  height: "48px",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  gap: "7px",

                  borderRadius: "999px",

                  background: "#000000",

                  color: "#ffffff",

                  textDecoration: "none",

                  fontSize: "14px",

                  fontWeight: 600,
                }}
              >
                Get started →
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ================================================= */}
      {/* RESPONSIVE */}
      {/* ================================================= */}

      <style jsx>{`
        .tp-mobile-button {
          display: none;
        }

        @media (max-width: 900px) {
          .tp-desktop-nav {
            display: none !important;
          }

          .tp-desktop-actions {
            display: none !important;
          }

          .tp-mobile-button {
            display: flex !important;
          }
        }

        @media (max-width: 480px) {
          header {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }

          nav {
            min-height: 62px !important;
          }
        }
      `}</style>
    </header>
  );
}