"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full bg-transparent">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            rounded-full
            border
            border-white/10
            bg-black/40
            px-4
            py-3
            backdrop-blur-xl
          "
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
              T
            </div>
            <span className="text-sm font-semibold text-white">
              TimePilot
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="#features"
              className="rounded-full bg-violet-500/20 px-4 py-2 text-xs font-medium text-violet-300"
            >
              Features
            </Link>
            <Link
              href="#ai-planner"
              className="rounded-full px-4 py-2 text-xs font-medium text-white/60 hover:text-white"
            >
              AI Planner
            </Link>
            <Link
              href="#analytics"
              className="rounded-full px-4 py-2 text-xs font-medium text-white/60 hover:text-white"
            >
              Analytics
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-full px-4 py-2 text-xs font-medium text-white/60 hover:text-white"
            >
              How it works
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-medium text-white/70 hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
            >
              Get started
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}