"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type LoginResponse = {
  detail?: string | Array<{ msg?: string } | string>;
  access_token?: string;
  user_id?: string;
  name?: string;
  email?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleGoogleLogin() {
    if (loading) return;
    window.location.href = `${API_URL}/auth/google`;
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Enter your email address to continue.");
      return;
    }

    if (!password) {
      setError("Enter your password to continue.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const responseText = await response.text();
      let data: LoginResponse = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText) as LoginResponse;
        } catch {
          data = { detail: responseText };
        }
      }

      if (!response.ok) {
        const detail = Array.isArray(data.detail)
          ? data.detail
              .map((item) =>
                typeof item === "string"
                  ? item
                  : item?.msg ?? String(item)
              )
              .join(", ")
          : data.detail;

        setError(
          typeof detail === "string" && detail
            ? detail
            : "We couldn't sign you in. Check your email and password."
        );
        return;
      }

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

      router.replace("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to TimePilot. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#17202c]">
      <div className="grid min-h-screen lg:grid-cols-[1.04fr_0.96fr]">
        {/* Brand and product panel */}
        <section className="relative hidden overflow-hidden bg-[#101b2b] px-10 py-9 text-white lg:flex lg:flex-col xl:px-16">
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#627df5]/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#53c6ad]/10 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="relative z-10 flex items-center gap-3">
            <BrandMark />
            <span className="text-lg font-semibold tracking-tight">
              TimePilot
            </span>
          </div>

          <div className="relative z-10 my-auto max-w-xl py-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white/75">
              <span className="h-2 w-2 rounded-full bg-[#55d6b0] shadow-[0_0_12px_rgba(85,214,176,0.75)]" />
              Your workspace, in sync
            </div>

            <h1 className="max-w-lg text-5xl font-semibold leading-[1.08] tracking-[-0.045em] xl:text-6xl">
              Make space for
              <span className="block bg-gradient-to-r from-[#aebcff] to-[#73e1c4] bg-clip-text text-transparent">
                meaningful work.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-white/60">
              Plan your day, bring your team together, and stay focused on
              what matters most.
            </p>

            {/* Product preview */}
            <div className="mt-12 max-w-lg rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    Today&apos;s focus
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Tuesday, your day at a glance
                  </p>
                </div>
                <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-xs text-white/65">
                  This week
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#55d6b0]/10">
                  <div className="absolute inset-1 rounded-full border-[3px] border-white/10" />
                  <div className="absolute inset-1 rounded-full border-[3px] border-transparent border-t-[#55d6b0] border-r-[#55d6b0] rotate-[35deg]" />
                  <span className="text-sm font-semibold text-white">72%</span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">Daily progress</span>
                    <span className="text-[#77e0c2]">On track</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#71a7ff] to-[#55d6b0]" />
                  </div>
                  <p className="mt-2 text-xs text-white/40">
                    4 of 6 priorities completed
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <PreviewStat label="Focus time" value="4h 28m" />
                <PreviewStat label="Tasks done" value="12 / 16" />
                <PreviewStat label="Team pace" value="Strong" />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                <Avatar initials="AM" color="bg-[#7c8cff]" />
                <Avatar initials="JR" color="bg-[#e5a474]" />
                <Avatar initials="SK" color="bg-[#62b9a5]" />
                <Avatar initials="+8" color="bg-[#35445a]" />
              </div>
              <p className="text-xs text-white/50">
                Helping teams make their time count
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/40">
            <span>© {new Date().getFullYear()} TimePilot</span>
            <div className="flex gap-5">
              <Link
                href="/privacy"
                className="transition hover:text-white/75"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="transition hover:text-white/75"
              >
                Terms
              </Link>
            </div>
          </div>
        </section>

        {/* Login panel */}
        <section className="flex min-h-screen flex-col bg-white px-5 py-6 sm:px-10 lg:px-12 xl:px-20">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 lg:invisible"
              aria-label="TimePilot home"
            >
              <BrandMark />
              <span className="text-base font-semibold tracking-tight text-[#17202c]">
                TimePilot
              </span>
            </Link>

            <p className="ml-auto text-sm text-[#77808c]">
              New to TimePilot?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#435bd5] transition hover:text-[#3047bc]"
              >
                Create an account
              </Link>
            </p>
          </header>

          <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-12">
            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef1ff] text-[#435bd5]">
                <KeyIcon />
              </div>

              <p className="text-sm font-semibold text-[#435bd5]">
                Welcome back
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#17202c] sm:text-[36px]">
                Sign in to your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#77808c]">
                Pick up where you left off. Your workspace is waiting.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#e3e7ed] bg-white text-sm font-semibold text-[#27313d] transition hover:border-[#cbd2dc] hover:bg-[#fafbfc] focus:outline-none focus:ring-4 focus:ring-[#435bd5]/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e9ecf0]" />
              <span className="text-xs font-medium text-[#a0a7b1]">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-[#e9ecf0]" />
            </div>

            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-5 rounded-xl border border-[#f2c9c9] bg-[#fff5f5] px-4 py-3 text-sm leading-5 text-[#a33838]"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#37414d]"
                >
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  className="h-12 w-full rounded-xl border border-[#dfe4ea] bg-white px-4 text-sm text-[#17202c] outline-none transition placeholder:text-[#a5acb5] hover:border-[#c7ced8] focus:border-[#6679e8] focus:ring-4 focus:ring-[#435bd5]/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#37414d]"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-[#435bd5] transition hover:text-[#3047bc]"
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
                    autoComplete="current-password"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfe4ea] bg-white px-4 pr-16 text-sm text-[#17202c] outline-none transition placeholder:text-[#a5acb5] hover:border-[#c7ced8] focus:border-[#6679e8] focus:ring-4 focus:ring-[#435bd5]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-[#78818d] transition hover:bg-[#f3f5f8] hover:text-[#27313d]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#65707d]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-[#cbd2dc] accent-[#435bd5] focus:ring-[#435bd5]"
                />
                Keep me signed in
              </label>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#435bd5] px-5 text-sm font-semibold text-white shadow-[0_5px_12px_rgba(67,91,213,0.18)] transition hover:bg-[#354dc5] hover:shadow-[0_7px_16px_rgba(67,91,213,0.24)] focus:outline-none focus:ring-4 focus:ring-[#435bd5]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowIcon />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-[#f7f8fa] px-4 py-3.5">
              <ShieldIcon />
              <p className="text-xs leading-5 text-[#77808c]">
                Your account is protected with secure authentication. We’ll
                never share your information without permission.
              </p>
            </div>

            <p className="mt-8 text-center text-xs text-[#a0a7b1] lg:hidden">
              © {new Date().getFullYear()} TimePilot. All rights reserved.
            </p>
          </div>

          <footer className="hidden items-center justify-between pt-5 text-xs text-[#a0a7b1] lg:flex">
            <span>© {new Date().getFullYear()} TimePilot</span>
            <div className="flex gap-5">
              <Link href="/privacy" className="transition hover:text-[#596473]">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-[#596473]">
                Terms
              </Link>
              <Link href="/help" className="transition hover:text-[#596473]">
                Help center
              </Link>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}

function BrandMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#435bd5] text-white shadow-[0_4px_10px_rgba(67,91,213,0.25)]">
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3v9l6 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

function PreviewStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3">
      <p className="text-[10px] text-white/40">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function Avatar({
  initials,
  color,
}: {
  initials: string;
  color: string;
}) {
  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#101b2b] ${color} text-[9px] font-bold text-white`}
    >
      {initials}
    </span>
  );
}

function KeyIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.5 10.5a5 5 0 1 0-4.94 5.72L12 18.67V21h2.33v-2.33h2.34v-2.34h2.33V14l-4.62-4.62a5.03 5.03 0 0 0 .12-1.08Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="mt-0.5 shrink-0 text-[#6075dd]"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3 19 6v5c0 4.5-2.8 8.5-7 10-4.2-1.5-7-5.5-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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