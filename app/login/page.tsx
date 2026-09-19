"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { animate, createTimeline, stagger } from "animejs";
import Clock3D from "@/components/landing/Clock3D";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/* ============================================================
   Responsive hook — used so we only mount ONE Clock3D instance
   instead of two (one in the desktop column, one in mobile).
   ============================================================ */
function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}

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

  /* Helper — bumps the key so repeated identical errors re-shake. */
  const showError = (message: string) => {
    setError(message);
    setErrorKey((k) => k + 1);
  };

  // ============================================================
  // PAGE ENTRANCE
  // ============================================================

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const timeline = createTimeline({
      defaults: {
        ease: "outExpo",
      },
    });

    timeline.add(".login-brand", {
      opacity: [0, 1],
      y: [-12, 0],
      duration: 500,
    });

    timeline.add(
      ".clock-area",
      {
        opacity: [0, 1],
        x: [-35, 0],
        scale: [0.96, 1],
        duration: 900,
      },
      "-=250"
    );

    timeline.add(
      ".login-title",
      {
        opacity: [0, 1],
        y: [22, 0],
        duration: 600,
      },
      "-=600"
    );

    timeline.add(
      ".login-subtitle",
      {
        opacity: [0, 1],
        y: [16, 0],
        duration: 500,
      },
      "-=400"
    );

    if (cardRef.current) {
      timeline.add(
        cardRef.current,
        {
          opacity: [0, 1],
          y: [35, 0],
          duration: 650,
        },
        "-=300"
      );
    }

    timeline.add(
      ".login-field",
      {
        opacity: [0, 1],
        y: [12, 0],
        duration: 420,
        delay: stagger(45),
      },
      "-=400"
    );

    return () => {
      timeline.pause();
    };
  }, []);

  // ============================================================
  // ERROR ANIMATION + FOCUS
  // ============================================================

  useEffect(() => {
    if (!error || !errorRef.current) return;

    errorRef.current.focus();

    const animation = animate(errorRef.current, {
      x: [0, -8, 8, -6, 6, -3, 3, 0],
      opacity: [0, 1],
      duration: 500,
      ease: "outQuad",
    });

    return () => {
      animation.pause();
    };
  }, [error, errorKey]);

  // ============================================================
  // BUTTON HOVER
  // ============================================================

  const handleButtonEnter = () => {
    if (!buttonRef.current || loading) return;

    animate(buttonRef.current, {
      scale: 1.02,
      duration: 200,
      ease: "outQuad",
    });
  };

  const handleButtonLeave = () => {
    if (!buttonRef.current || loading) return;

    animate(buttonRef.current, {
      scale: 1,
      duration: 200,
      ease: "outQuad",
    });
  };

  // ============================================================
  // OAUTH
  // ============================================================

  function handleGoogleLogin() {
    if (loading) return;
    window.location.href = `${API_URL}/auth/google`;
  }

  // ============================================================
  // LOGIN
  // ============================================================

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
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
        scale: [1, 0.96, 1],
        duration: 280,
        ease: "outQuad",
      });
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      // Safely parse the response (FastAPI may return text or JSON).
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

      // Clear the OTHER storage bucket so a stale token can't linger.
      const storage = rememberMe ? localStorage : sessionStorage;
      const otherStorage = rememberMe ? sessionStorage : localStorage;

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
            scale: [1, 0.98],
            duration: 400,
            ease: "inQuad",
            onComplete: () => resolve(),
          });
        });
      }

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);

      showError(
        "Unable to connect to the TimePilot server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-white text-black"
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-white" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute left-[8%] top-[25%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.07] blur-[140px]" />
        <div className="absolute right-[5%] top-[15%] h-[450px] w-[450px] rounded-full bg-blue-500/[0.055] blur-[140px]" />
        <div className="absolute bottom-[-15%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-400/[0.035] blur-[150px]" />
      </div>

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <nav className="login-brand relative z-30 mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
            T
          </span>

          <span className="text-lg font-semibold tracking-[-0.04em]">
            TimePilot
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-black/50 sm:inline">
            Don&apos;t have an account?
          </span>

          <Link
            href="/signup"
            className="rounded-full border border-black/10 bg-white/75 px-4 py-2.5 font-medium text-black shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-[1440px] items-center px-6 pb-12 pt-4 sm:px-10 lg:px-14">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:grid-cols-[1.2fr_0.8fr]">
          {/* ==================================================
              LEFT — 3D CLOCK (desktop)
          ================================================== */}

          <div className="clock-area relative hidden min-h-[650px] items-center justify-center lg:flex">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.035]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.025]" />

            {isDesktop && <Clock3D />}

            {/* Focus card */}
            <div className="absolute left-[4%] top-[19%] rounded-2xl border border-black/[0.07] bg-white/75 px-4 py-3 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                </span>

                <div>
                  <p className="text-xs font-semibold">Focus mode</p>
                  <p className="mt-0.5 text-xs text-black/45">
                    Time well spent
                  </p>
                </div>
              </div>
            </div>

            {/* Progress card */}
            <div className="absolute bottom-[19%] right-[4%] rounded-2xl border border-black/[0.07] bg-white/75 px-4 py-3 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                  <p className="text-xs font-semibold">Day on track</p>
                  <p className="mt-0.5 text-xs text-black/45">Keep moving</p>
                </div>
              </div>
            </div>

            {/* Main message */}
            <div className="absolute bottom-[4%] left-1/2 w-full -translate-x-1/2 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/35">
                Your time is your most valuable asset
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-black xl:text-4xl">
                Make every hour count.
              </h2>
            </div>
          </div>

          {/* ==================================================
              MOBILE CLOCK
          ================================================== */}

          <div className="clock-area relative -mx-2 flex min-h-[320px] items-center justify-center lg:hidden">
            <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.07] blur-[80px]" />

            {!isDesktop && <Clock3D />}
          </div>

          {/* ==================================================
              RIGHT — LOGIN
          ================================================== */}

          <div className="flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-[470px]">
              <div className="mb-7">
                <p className="login-title mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                  Welcome back
                </p>

                <h1 className="login-title text-4xl font-semibold tracking-[-0.055em] text-black sm:text-5xl">
                  Sign in to
                  <br />
                  <span className="text-black/45">your TimePilot.</span>
                </h1>

                <p className="login-subtitle mt-4 max-w-md text-sm leading-6 text-black/45">
                  Continue planning your day, managing your tasks, and
                  making your time work for you.
                </p>
              </div>

              {/* LOGIN CARD */}

              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/75 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur-3xl sm:p-8"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                {/* GOOGLE */}

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="login-field flex min-h-[54px] w-full items-center justify-center gap-3 rounded-2xl border border-black/[0.08] bg-white px-4 text-sm font-medium text-black transition-colors duration-300 hover:border-black/15 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

                {/* DIVIDER */}

                <div className="login-field my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-black/[0.08]" />
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">
                    or
                  </span>
                  <div className="h-px flex-1 bg-black/[0.08]" />
                </div>

                {/* ERROR */}

                {error && (
                  <div
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    className="mb-5 rounded-2xl border border-rose-500/15 bg-rose-500/[0.06] px-4 py-3 text-sm text-rose-600 outline-none"
                  >
                    {error}
                  </div>
                )}

                {/* FORM */}

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* EMAIL */}

                  <div className="login-field">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-black/75"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="h-[54px] w-full rounded-2xl border border-black/[0.09] bg-black/[0.025] px-4 text-sm text-black outline-none transition-all duration-300 placeholder:text-black/25 focus:border-black/25 focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.025)]"
                    />
                  </div>

                  {/* PASSWORD */}

                  <div className="login-field">
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-black/75"
                      >
                        Password
                      </label>

                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-black/40 transition hover:text-black"
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
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                        className="h-[54px] w-full rounded-2xl border border-black/[0.09] bg-black/[0.025] px-4 pr-16 text-sm text-black outline-none transition-all duration-300 placeholder:text-black/25 focus:border-black/25 focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.025)]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-black/40 transition hover:text-black"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* REMEMBER ME */}

                  <label className="login-field flex cursor-pointer items-center gap-2.5 text-sm text-black/50">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      className="h-4 w-4 rounded border-black/20 accent-black"
                    />
                    Remember me
                  </label>

                  {/* LOGIN BUTTON */}

                  <button
                    ref={buttonRef}
                    type="submit"
                    disabled={loading}
                    onMouseEnter={handleButtonEnter}
                    onMouseLeave={handleButtonLeave}
                    className="login-field flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white shadow-xl shadow-black/10 transition-colors duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
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

                {/* SIGNUP */}

                <p className="login-field mt-7 text-center text-sm text-black/45">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-black transition hover:text-purple-600"
                  >
                    Create one
                  </Link>
                </p>
              </div>

              {/* SECURITY NOTE */}

              <p className="login-field mt-5 text-center text-xs text-black/35">
                Securely manage your time with TimePilot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM STATUS */}

      <div className="pointer-events-none fixed bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/35 shadow-sm backdrop-blur-xl sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        TimePilot is ready
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════
   Icons
═══════════════════════════════════════════════ */

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
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