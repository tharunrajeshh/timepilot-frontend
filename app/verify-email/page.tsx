"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState("");

  const resendVerification = async () => {
    if (!email || resending) return;

    setResending(true);
    setError("");
    setResent(false);

    try {
      const response = await fetch(
        `${API_URL}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            "Unable to resend verification email."
        );
      }

      setResent(true);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to resend verification email."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Stars */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `
              radial-gradient(circle at 18% 12%, rgba(255,255,255,.8) 0 1px, transparent 1.5px),
              radial-gradient(circle at 31% 6%, rgba(255,255,255,.6) 0 1px, transparent 1.5px),
              radial-gradient(circle at 47% 18%, rgba(255,255,255,.5) 0 1px, transparent 1.5px),
              radial-gradient(circle at 72% 9%, rgba(255,255,255,.7) 0 1px, transparent 1.5px),
              radial-gradient(circle at 83% 25%, rgba(255,255,255,.6) 0 1px, transparent 1.5px),
              radial-gradient(circle at 11% 36%, rgba(255,255,255,.4) 0 1px, transparent 1.5px),
              radial-gradient(circle at 91% 42%, rgba(255,255,255,.5) 0 1px, transparent 1.5px)
            `,
          }}
        />

        {/* Horizon glow */}
        <div className="absolute left-1/2 top-[30%] h-[220px] w-[1000px] -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-[100px]" />

        {/* Bottom landscape */}
        <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-t from-[#190b06] via-[#160b08]/90 to-transparent" />

        <div
          className="absolute bottom-0 left-0 right-0 h-[32%] opacity-80"
          style={{
            clipPath:
              "polygon(0 65%, 7% 54%, 14% 62%, 21% 45%, 28% 58%, 36% 48%, 43% 64%, 51% 43%, 59% 57%, 66% 46%, 74% 62%, 82% 49%, 90% 60%, 100% 42%, 100% 100%, 0 100%)",
            background:
              "linear-gradient(to top, #160a05, #35170c)",
          }}
        />
      </div>

      {/* NAVIGATION */}

      <nav className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
            T
          </span>

          <span className="text-lg font-semibold tracking-tight">
            TimePilot
          </span>
        </Link>

        <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60 backdrop-blur-xl">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-white hover:text-emerald-300"
          >
            Log in
          </Link>
        </div>
      </nav>

      {/* CONTENT */}

      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-5 pb-12 pt-4">
        <div className="w-full max-w-[590px]">
          <div className="rounded-[30px] border border-white/[0.13] bg-black/40 px-6 py-10 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:px-12 sm:py-12">
            
            {/* ICON */}

            <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-[20px] bg-emerald-500/[0.14]">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="#00E5A0"
                  strokeWidth="1.8"
                />

                <path
                  d="M4 7L12 13L20 7"
                  stroke="#00E5A0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* TITLE */}

            <h1 className="mt-7 text-center text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Check your inbox
            </h1>

            <p className="mx-auto mt-4 max-w-[440px] text-center text-sm leading-6 text-white/55 sm:text-base">
              We sent a verification link to{" "}
              <strong className="font-semibold text-white">
                {email || "your email address"}
              </strong>
              .
              <br />
              Click it to activate your account.
            </p>

            {/* SUCCESS */}

            {resent && (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 text-center text-sm text-emerald-300">
                Verification email sent again.
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3 text-center text-sm text-red-300">
                {error}
              </div>
            )}

            {/* RESEND */}

            <button
              type="button"
              onClick={resendVerification}
              disabled={!email || resending}
              className="mt-8 flex min-h-[64px] w-full items-center justify-center rounded-2xl bg-white px-5 text-base font-medium text-black transition-all duration-200 hover:bg-white/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resending
                ? "Sending verification email..."
                : "Resend verification email"}
            </button>

            {/* WRONG EMAIL */}

            <Link
              href="/signup"
              className="mt-4 flex min-h-[64px] w-full items-center justify-center rounded-2xl border border-white/[0.13] bg-white/[0.045] px-5 text-base font-medium text-white/75 transition-all duration-200 hover:bg-white/[0.07] hover:text-white"
            >
              Wrong email? Start over
            </Link>

            {/* LOGIN */}

            <div className="mt-7 text-center">
              <Link
                href="/login"
                className="text-sm font-semibold text-white transition-colors hover:text-emerald-300"
              >
                Back to log in
              </Link>
            </div>

            {/* HELP */}

            <p className="mt-8 text-center text-xs leading-5 text-white/30">
              Didn&apos;t receive the email? Check your spam or
              promotions folder.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}