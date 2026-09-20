"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { animate, createTimeline, stagger } from "animejs";
import Clock3D from "@/components/landing/Clock3D";
import Starfield from "@/components/landing/Starfield";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/* ============================================================
   RESPONSIVE HOOK
============================================================ */

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${breakpoint}px)`
    );
    const update = () => setIsDesktop(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}

/* ============================================================
   LOGIN PAGE
============================================================ */

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorKey, setErrorKey] = useState(0);

  const isDesktop = useIsDesktop();

  const pageRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const showError = (message: string) => {
    setError(message);
    setErrorKey((key) => key + 1);
  };

  /* ============================================================
     PAGE ENTRANCE
  ============================================================ */

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const timeline = createTimeline({
      defaults: { ease: "outExpo" },
    });

    timeline.add(".login-brand", {
      opacity: [0, 1],
      y: [-10, 0],
      duration: 450,
    });

    timeline.add(
      ".clock-area",
      {
        opacity: [0, 1],
        x: [-30, 0],
        scale: [0.97, 1],
        duration: 750,
      },
      "-=220"
    );

    timeline.add(
      ".login-title",
      {
        opacity: [0, 1],
        y: [18, 0],
        duration: 500,
      },
      "-=500"
    );

    timeline.add(
      ".login-subtitle",
      {
        opacity: [0, 1],
        y: [12, 0],
        duration: 450,
      },
      "-=350"
    );

    if (cardRef.current) {
      timeline.add(
        cardRef.current,
        {
          opacity: [0, 1],
          y: [25, 0],
          duration: 550,
        },
        "-=250"
      );
    }

    timeline.add(
      ".login-field",
      {
        opacity: [0, 1],
        y: [8, 0],
        duration: 350,
        delay: stagger(35),
      },
      "-=300"
    );

    return () => {
      timeline.pause();
    };
  }, []);

  /* ============================================================
     ERROR ANIMATION
  ============================================================ */

  useEffect(() => {
    if (!error || !errorRef.current) return;

    errorRef.current.focus();

    const animation = animate(errorRef.current, {
      x: [0, -6, 6, -4, 4, 0],
      opacity: [0, 1],
      duration: 400,
      ease: "outQuad",
    });

    return () => {
      animation.pause();
    };
  }, [error, errorKey]);

  /* ============================================================
     BUTTON ANIMATION
  ============================================================ */

  const handleButtonEnter = () => {
    if (!buttonRef.current || loading) return;
    animate(buttonRef.current, {
      scale: 1.015,
      duration: 180,
      ease: "outQuad",
    });
  };

  const handleButtonLeave = () => {
    if (!buttonRef.current || loading) return;
    animate(buttonRef.current, {
      scale: 1,
      duration: 180,
      ease: "outQuad",
    });
  };

  /* ============================================================
     GOOGLE LOGIN
  ============================================================ */

  function handleGoogleLogin() {
    if (loading) return;
    window.location.href = `${API_URL}/auth/google`;
  }

  /* ============================================================
     LOGIN
  ============================================================ */

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      showError("Please enter your email address.");
      return;
    }

    if (!password) {
      showError("Please enter your password.");
      return;
    }

    setLoading(true);

    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: [1, 0.97, 1],
        duration: 260,
        ease: "outQuad",
      });
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const text = await response.text();
      let data: any = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = { detail: text };
        }
      }

      if (!response.ok) {
        const detail = Array.isArray(data?.detail)
          ? data.detail
              .map((item: any) => item?.msg ?? String(item))
              .join(", ")
          : data?.detail;

        showError(
          typeof detail === "string" && detail
            ? detail
            : "Invalid email or password."
        );

        return;
      }

      const storage = rememberMe ? localStorage : sessionStorage;
      const otherStorage = rememberMe
        ? sessionStorage
        : localStorage;

      otherStorage.removeItem("timepilot_token");
      otherStorage.removeItem("timepilot_user");

      if (data.access_token) {
        storage.setItem("timepilot_token", data.access_token);
      }

      storage.setItem(
        "timepilot_user",
        JSON.stringify({
          id: data.user_id,
          name: data.name,
          email: data.email,
        })
      );

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (pageRef.current && !reduceMotion) {
        await new Promise<void>((resolve) => {
          animate(pageRef.current!, {
            opacity: [1, 0],
            scale: [1, 0.985],
            duration: 350,
            ease: "inQuad",
            onComplete: () => resolve(),
          });
        });
      }

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      showError(
        "Unable to connect to the TimePilot server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     UI
  ============================================================ */

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-x-hidden bg-[#05060f] text-white"
    >
      {/* ========================================================
          SPACE BACKGROUND
      ======================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Deep space base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0d0c22_0%,_#05060f_55%,_#020208_100%)]" />

        {/* Nebula glow — violet */}
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-violet-600/25 blur-[140px]" />

        {/* Nebula glow — blue */}
        <div className="absolute -right-32 top-[15%] h-[460px] w-[460px] rounded-full bg-blue-600/20 blur-[130px]" />

        {/* Nebula glow — emerald */}
        <div className="absolute bottom-[-180px] left-1/2 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px]" />

        {/* Tech grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Animated canvas stars */}
      <Starfield />

      {/* ========================================================
          NAVIGATION
      ======================================================== */}

      <nav className="login-brand relative z-30 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-white text-sm font-bold text-black shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-transform duration-300 group-hover:scale-105">
            T
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.04em] text-white sm:text-lg">
            TimePilot
          </span>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="hidden text-sm text-white/45 sm:inline">
            Don&apos;t have an account?
          </span>

          <Link
            href="/signup"
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* ========================================================
          MAIN
      ======================================================== */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-82px)] w-full max-w-[1440px] items-center px-5 pb-10 pt-2 sm:px-8 sm:pb-12 lg:px-12 lg:pt-0">
        <div className="grid w-full items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:gap-16">
          {/* ==================================================
              DESKTOP CLOCK
          ================================================== */}

          <div className="clock-area relative hidden min-h-[600px] items-center justify-center lg:flex xl:min-h-[650px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] xl:h-[500px] xl:w-[500px]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] xl:h-[600px] xl:w-[600px]" />

            <div className="absolute inset-0 flex items-center justify-center">
              {isDesktop && <Clock3D />}
            </div>

            {/* Focus Card */}
            <div className="absolute left-[3%] top-[18%] rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 shadow-[0_15px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl xl:left-[6%]">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.9)]" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Focus mode
                  </p>
                  <p className="mt-0.5 text-xs text-white/40">
                    Time well spent
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="absolute bottom-[20%] right-[3%] rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 shadow-[0_15px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl xl:right-[6%]">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12.5L9.5 17L19 7"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Day on track
                  </p>
                  <p className="mt-0.5 text-xs text-white/40">
                    Keep moving
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="absolute bottom-[4%] left-1/2 w-full -translate-x-1/2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35 xl:text-xs">
                Your time is your most valuable asset
              </p>

              <h2 className="mt-2.5 text-3xl font-semibold tracking-[-0.055em] text-white xl:text-4xl">
                Make every hour count.
              </h2>
            </div>
          </div>

          {/* ==================================================
              MOBILE CLOCK
          ================================================== */}

          <div className="clock-area relative -mx-2 flex h-[245px] items-center justify-center sm:h-[300px] lg:hidden">
            <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.15] blur-[70px] sm:h-[280px] sm:w-[280px]" />

            <div className="relative h-full w-full">
              {!isDesktop && <Clock3D />}
            </div>
          </div>

          {/* ==================================================
              LOGIN
          ================================================== */}

          <div className="flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-[460px]">
              {/* Heading */}
              <div className="mb-6 text-center lg:text-left">
                <p className="login-title mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300/70 sm:text-xs">
                  Welcome back
                </p>

                <h1 className="login-title text-[34px] font-semibold leading-[1.05] tracking-[-0.055em] text-white sm:text-5xl">
                  Sign in to
                  <br />
                  <span className="text-white/40">
                    your TimePilot.
                  </span>
                </h1>

                <p className="login-subtitle mx-auto mt-3 max-w-[390px] text-[13px] leading-5 text-white/45 sm:text-sm sm:leading-6 lg:mx-0">
                  Continue planning your day, managing your
                  tasks, and making your time work for you.
                </p>
              </div>

              {/* Login Card */}
              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-3xl sm:rounded-[28px] sm:p-7"
              >
                {/* Top highlight */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="login-field flex min-h-[52px] w-full items-center justify-center gap-3 rounded-[15px] border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.1] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>

                {/* Divider */}
                <div className="login-field my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
                    or
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Error */}
                {error && (
                  <div
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    className="mb-5 rounded-2xl border border-rose-400/25 bg-rose-500/[0.08] px-4 py-3 text-sm leading-5 text-rose-200 outline-none"
                  >
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Email */}
                  <div className="login-field">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold text-white/75 sm:text-sm"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="h-[52px] w-full rounded-[15px] border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:border-violet-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-500/[0.12]"
                    />
                  </div>

                  {/* Password */}
                  <div className="login-field">
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-xs font-semibold text-white/75 sm:text-sm"
                      >
                        Password
                      </label>

                      <Link
                        href="/forgot-password"
                        className="text-[11px] font-medium text-white/40 transition-colors hover:text-violet-300 sm:text-xs"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) =>
                          setPassword(event.target.value)
                        }
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                        className="h-[52px] w-full rounded-[15px] border border-white/10 bg-white/[0.03] px-4 pr-[70px] text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:border-violet-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-500/[0.12]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1.5 text-xs font-medium text-white/50 transition hover:bg-white/[0.08] hover:text-white"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <label className="login-field flex min-h-[24px] cursor-pointer items-center gap-2.5 text-xs text-white/55 sm:text-sm">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet-500"
                    />
                    <span>Remember me</span>
                  </label>

                  {/* Login Button */}
                  <button
                    ref={buttonRef}
                    type="submit"
                    disabled={loading}
                    onMouseEnter={handleButtonEnter}
                    onMouseLeave={handleButtonLeave}
                    className="login-field mt-1 flex min-h-[54px] w-full items-center justify-center rounded-[15px] bg-gradient-to-b from-violet-500 to-violet-600 px-5 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(124,58,237,0.45)] transition-all duration-200 hover:from-violet-400 hover:to-violet-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing in…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Log in
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 12H19M13 6L19 12L13 18"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                </form>

                {/* Signup */}
                <p className="login-field mt-6 text-center text-xs text-white/50 sm:text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-white transition-colors hover:text-violet-300"
                  >
                    Create one
                  </Link>
                </p>
              </div>

              {/* Security */}
              <div className="login-field mt-4 flex items-center justify-center gap-2 text-[10px] text-white/35 sm:text-xs">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3L19 6V11C19 15.5 16.2 19.5 12 21C7.8 19.5 5 15.5 5 11V6L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Securely manage your time with TimePilot.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM STATUS
      ======================================================== */}

      <div className="pointer-events-none fixed bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 shadow-sm backdrop-blur-xl sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
        TimePilot is ready
      </div>
    </main>
  );
}

/* ============================================================
   GOOGLE ICON
============================================================ */

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.87c2.27-2.09 3.59-5.17 3.59-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.27a12 12 0 0 0 0 10.75l4-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.63l4 3.1C6.22 6.87 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}