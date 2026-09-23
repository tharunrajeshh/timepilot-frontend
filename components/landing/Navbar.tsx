"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TimePilotLogo from "@/components/ui/TimePilotLogo";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "AI Planner", href: "#ai-planner" },
  { label: "Analytics", href: "#analytics" },
  { label: "Calendar", href: "#calendar" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Lock body scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Subtle backdrop change on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? "bg-[#f6f4ee]/85 backdrop-blur-xl border-b border-[rgba(13,20,32,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <TimePilotLogo variant="dark" size="md" />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[13.5px] font-medium text-[#344052] transition-colors duration-200 hover:bg-[rgba(13,20,32,0.05)] hover:text-[#0d1420]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="text-[13.5px] font-medium text-[#344052] transition-colors hover:text-[#0d1420]"
            >
              Log in
            </Link>
            <Button href="/signup" variant="primary" size="sm">
              Get started
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0d1420] transition hover:bg-[rgba(13,20,32,0.06)] lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[60] bg-[#f6f4ee] lg:hidden"
        >
          <div className="flex h-[68px] items-center justify-between px-5 sm:px-8">
            <TimePilotLogo variant="dark" size="md" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0d1420] hover:bg-[rgba(13,20,32,0.06)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-5 pt-6 sm:px-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-4 text-[16px] font-medium text-[#0d1420] transition hover:bg-[rgba(13,20,32,0.05)]"
              >
                {link.label}
              </a>
            ))}

            <div className="tp-divider my-4" />

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-4 text-[16px] font-medium text-[#344052] hover:bg-[rgba(13,20,32,0.05)]"
            >
              Log in
            </Link>

            <div className="mt-3 px-4">
              <Button href="/signup" variant="primary" size="lg" fullWidth>
                Get started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}