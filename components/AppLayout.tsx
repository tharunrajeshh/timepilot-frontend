"use client";

import Link from "next/link";
import { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-black text-white font-bold text-sm">
                T
              </div>
              <span className="text-base font-semibold tracking-tight text-black">
                TimePilot
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden gap-8 md:flex">
              <Link
                href="/features"
                className="text-sm text-black/70 transition hover:text-black"
              >
                Features
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm text-black/70 transition hover:text-black"
              >
                How it works
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-black/70 transition hover:text-black"
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="text-sm text-black/70 transition hover:text-black"
              >
                Blog
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden gap-3 md:flex items-center">
              <Link
                href="/login"
                className="text-sm font-medium text-black/70 transition hover:text-black"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-10 items-center gap-1 rounded-full border border-black/20 bg-black px-5 text-sm font-semibold text-white transition hover:bg-black/90"
              >
                Get started
                <span>→</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-black/70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-black/[0.02]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          {/* Footer Grid */}
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-black text-white font-bold text-sm">
                  T
                </div>
                <span className="text-sm font-semibold">TimePilot</span>
              </Link>
              <p className="mt-3 text-xs text-black/60">
                AI-powered time management for professionals.
              </p>
              <div className="mt-4 flex gap-3">
                {["X", "In", "GH"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-black/60 transition hover:bg-black/5 hover:text-black"
                  >
                    <span className="text-xs font-bold">{social}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-black/40">
                Product
              </h4>
              <nav className="mt-4 space-y-2">
                {[
                  { label: "Features", href: "/features" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "How it works", href: "/how-it-works" },
                  { label: "Security", href: "/security" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-black/70 transition hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-black/40">
                Company
              </h4>
              <nav className="mt-4 space-y-2">
                {[
                  { label: "About", href: "/about" },
                  { label: "Blog", href: "/blog" },
                  { label: "Careers", href: "/careers" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-black/70 transition hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-black/40">
                Legal
              </h4>
              <nav className="mt-4 space-y-2">
                {[
                  { label: "Privacy", href: "/privacy" },
                  { label: "Terms", href: "/terms" },
                  { label: "Cookies", href: "/cookies" },
                  { label: "Status", href: "/status" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-black/70 transition hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-black/10" />

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-black/50">
              © 2024 TimePilot. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-black/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}