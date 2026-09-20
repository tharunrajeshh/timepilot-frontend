"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, createTimeline, stagger } from "animejs";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "One number", test: (p: string) => /\d/.test(p) },
  { id: "special", label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
] as const;

const STRENGTH_LABELS = ["", "Very weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_BAR = [
  "bg-white/20",
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-emerald-500",
];
const STRENGTH_TEXT = [
  "",
  "text-rose-300",
  "text-orange-300",
  "text-amber-300",
  "text-blue-300",
  "text-emerald-300",
];

function useDebounced<T>(value: T, delay = 450) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

type Stage = "form" | "verify";
type EmailStatus = "idle" | "invalid" | "checking" | "available" | "taken" | "error";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [stage, setStage] = useState<Stage>("form");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [resendIn, setResendIn] = useState(0);

  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountedAtRef = useRef(Date.now());

  const [attempts, setAttempts] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(Date.now());
  const cooldownLeft = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));

  const [currentTime, setCurrentTime] = useState(new Date());

  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const verifyHeadingRef = useRef<HTMLHeadingElement>(null);
  const emailAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const draft = sessionStorage.getItem("timepilot.signup.draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (typeof parsed.name === "string") setName(parsed.name);
        if (typeof parsed.email === "string") setEmail(parsed.email);
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "timepilot.signup.draft",
      JSON.stringify({ name, email }),
    );
  }, [name, email]);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    const n = setInterval(() => setNow(Date.now()), 500);
    return () => {
      clearInterval(t);
      clearInterval(n);
    };
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(".signup-nav", { opacity: [0, 1], translateY: [-15, 0], duration: 500 });

    if (cardRef.current) {
      tl.add(
        cardRef.current,
        { opacity: [0, 1], translateY: [30, 0], duration: 700 },
        "-=280",
      );
    }
    tl.add(
      ".signup-field",
      { opacity: [0, 1], translateY: [12, 0], duration: 450, delay: stagger(45) },
      "-=400",
    );
    return () => {
      tl.pause();
    };
  }, []);

  const debouncedEmail = useDebounced(email.trim(), 500);

  useEffect(() => {
    if (!debouncedEmail) {
      setEmailStatus("idle");
      return;
    }
    if (!EMAIL_RE.test(debouncedEmail)) {
      setEmailStatus("invalid");
      return;
    }

    emailAbortRef.current?.abort();
    const controller = new AbortController();
    emailAbortRef.current = controller;

    setEmailStatus("checking");

    fetch(`${API_URL}/auth/check-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: debouncedEmail }),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("check failed");
        const data = (await res.json()) as { available: boolean };
        setEmailStatus(data.available ? "available" : "taken");
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setEmailStatus("error");
      });

    return () => controller.abort();
  }, [debouncedEmail]);

  useEffect(() => {
    if (formError && errorRef.current) errorRef.current.focus();
  }, [formError]);

  useEffect(() => {
    if (stage === "verify") verifyHeadingRef.current?.focus();
  }, [stage]);

  const passwordChecks = useMemo(
    () => PASSWORD_RULES.map((r) => ({ ...r, passed: r.test(password) })),
    [password],
  );
  const passwordScore = passwordChecks.filter((c) => c.passed).length;
  const passwordStrong = passwordScore === PASSWORD_RULES.length;

  const emailValid = EMAIL_RE.test(email.trim());
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const fieldErrors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (touched.name && !name.trim()) errs.name = "Enter your full name.";
    if (touched.email) {
      if (!email.trim()) errs.email = "Enter your email address.";
      else if (!emailValid) errs.email = "That email doesn't look right.";
      else if (emailStatus === "taken") errs.email = "That email is already registered.";
    }
    if (touched.password) {
      if (!password) errs.password = "Choose a password.";
      else if (!passwordStrong) errs.password = "Password doesn't meet all requirements yet.";
    }
    if (touched.confirmPassword) {
      if (!confirmPassword) errs.confirmPassword = "Re-enter your password.";
      else if (!passwordsMatch) errs.confirmPassword = "Passwords don't match.";
    }
    if (touched.agreed && !agreed) errs.agreed = "Please accept the terms to continue.";
    return errs;
  }, [
    touched, name, email, emailValid, emailStatus,
    password, passwordStrong, confirmPassword, passwordsMatch, agreed,
  ]);

  const handleGoogleSignup = useCallback(() => {
    const state = crypto.randomUUID();
    sessionStorage.setItem("timepilot.oauth.state", state);
    const url = new URL(`${API_URL}/auth/google`);
    url.searchParams.set("state", state);
    url.searchParams.set("redirect", "/onboarding");
    window.location.href = url.toString();
  }, []);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (honeypotRef.current?.value) return;
    if (Date.now() - mountedAtRef.current < 1500) {
      setFormError("Please take a moment to review your details.");
      return;
    }

    setTouched({
      name: true, email: true, password: true,
      confirmPassword: true, agreed: true,
    });

    if (!name.trim()) return setFormError("Enter your full name.");
    if (!emailValid) return setFormError("Enter a valid email address.");
    if (emailStatus === "taken") return setFormError("That email is already registered.");
    if (!passwordStrong) return setFormError("Your password doesn't meet all requirements yet.");
    if (!passwordsMatch) return setFormError("Passwords don't match.");
    if (!agreed) return setFormError("Please accept the Terms of Service and Privacy Policy.");

    if (cooldownLeft > 0) {
      setFormError(`Too many attempts. Try again in ${cooldownLeft}s.`);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const code = (data as { code?: string }).code;

        if (res.status === 429 || code === "RATE_LIMITED") {
          setAttempts((a) => a + 1);
          setCooldownUntil(Date.now() + 30_000);
          setFormError("Too many attempts. Please wait 30 seconds and try again.");
          return;
        }

        if (code === "EMAIL_TAKEN") {
          setEmailStatus("taken");
          setFormError("That email is already registered. Try logging in instead.");
          return;
        }

        const detail = (data as { detail?: unknown }).detail;
        if (typeof detail === "string") setFormError(detail);
        else if (Array.isArray(detail)) {
          setFormError(
            detail.map((i: { msg?: string }) => i.msg ?? "Invalid input.").join(" "),
          );
        } else {
          setFormError("We couldn't create your account. Please try again.");
        }
        return;
      }

      sessionStorage.removeItem("timepilot.signup.draft");
      setStage("verify");
      setResendIn(60);
    } catch (err) {
      console.error(err);
      setFormError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendIn > 0) return;
    setResendIn(60);
    try {
      await fetch(`${API_URL}/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch {}
  };

  const handleButtonEnter = () => {
    if (!buttonRef.current || loading) return;
    animate(buttonRef.current, { scale: 1.015, duration: 220, ease: "outQuad" });
  };
  const handleButtonLeave = () => {
    if (!buttonRef.current || loading) return;
    animate(buttonRef.current, { scale: 1, duration: 220, ease: "outQuad" });
  };

  const digitalTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const date = currentTime.toLocaleDateString("en-IN", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });

  const submitDisabled =
    loading ||
    cooldownLeft > 0 ||
    emailStatus === "taken" ||
    (touched.password && !passwordStrong);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/mars-surface.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent" />
        <div className="absolute left-0 right-0 top-[38%] h-[45%] bg-gradient-to-b from-transparent via-orange-500/10 to-transparent blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_35%,rgba(0,0,0,0.85)_100%)]" />

        <Stars layer={1} count={60} size={1} duration={3} opacity={0.55} />
        <Stars layer={2} count={40} size={1.5} duration={5} opacity={0.75} />
        <Stars layer={3} count={25} size={2} duration={7} opacity={1} />

        <ShootingStars />

        <div className="absolute right-[8%] top-[8%] h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300 via-blue-400 to-blue-700 shadow-[0_0_60px_20px_rgba(56,189,248,0.35)]" />
          <div className="absolute -inset-1 rounded-full border border-sky-300/30 blur-sm" />
        </div>

        <div className="absolute left-[15%] top-[12%] h-3 w-3 rounded-full bg-slate-200/70 shadow-[0_0_12px_3px_rgba(226,232,240,0.5)]" />

        <div className="absolute left-0 right-0 top-[30%] h-[10%] bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent blur-xl" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-900/40 via-orange-800/10 to-transparent" />

        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* NAV */}
      <nav className="signup-nav relative z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black shadow-[0_8px_25px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-105">
            T
          </span>
          <span className="text-lg font-semibold tracking-[-0.04em] text-white">
            TimePilot
          </span>
        </Link>

        <Link
          href="/login"
          className="group flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.22] hover:bg-white/[0.12] hover:text-white"
        >
          Already have an account?
          <span className="font-semibold text-white transition-transform duration-200 group-hover:translate-x-0.5">
            Log in
          </span>
        </Link>
      </nav>

      {/* CONTENT */}
      <div className="relative z-20 flex min-h-[calc(100vh-82px)] items-center justify-center px-5 pb-16 pt-8 sm:px-8">
        <div className="w-full max-w-[470px]">
          {stage === "form" ? (
            <>
              <div className="mb-10 text-center">
                <h1 className="signup-field text-4xl font-semibold leading-[1.1] tracking-[-0.06em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-5xl">
                  Create your account
                </h1>
                <p className="signup-field mx-auto mt-4 max-w-sm text-sm leading-6 text-white/60 sm:text-base">
                  Take control of your time and build a smarter, more intentional workday.
                </p>
              </div>

              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-[30px] border border-white/[0.12] bg-black/40 p-5 shadow-[0_35px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:rounded-[34px] sm:p-7"
              >
                <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[250px] w-[350px] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[90px]" />

                <div className="relative">
                  {/* Live clock */}
                  <div className="signup-field mb-6 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <AnalogClock time={currentTime} />
                      <div>
                        <p className="font-mono text-sm font-medium tracking-[0.08em] text-white">
                          {digitalTime}
                        </p>
                        <p className="mt-0.5 max-w-[190px] truncate text-xs text-white/50">
                          {date}
                        </p>
                      </div>
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                        Live
                      </span>
                    </div>
                  </div>

                  {/* Google */}
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="signup-field flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 text-sm font-semibold text-white/85 shadow-[0_5px_20px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.2] hover:bg-white/[0.12] hover:text-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  >
                    <GoogleIcon />
                    Continue with Google
                  </button>

                  {/* Divider */}
                  <div className="signup-field my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/[0.1]" />
                    <span className="text-xs font-medium text-white/40">or</span>
                    <div className="h-px flex-1 bg-white/[0.1]" />
                  </div>

                  {/* Error */}
                  {formError && (
                    <div
                      ref={errorRef}
                      tabIndex={-1}
                      role="alert"
                      aria-live="assertive"
                      className="mb-5 flex items-start gap-3 rounded-xl border border-rose-400/25 bg-rose-500/[0.1] px-4 py-3.5 text-sm text-rose-200 outline-none"
                    >
                      <AlertIcon />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form
                    ref={formRef}
                    onSubmit={handleSignup}
                    className="space-y-4"
                    noValidate
                    aria-busy={loading}
                  >
                    {/* Honeypot */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor="company">Company</label>
                      <input
                        ref={honeypotRef}
                        id="company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Name */}
                    <Field
                      id="name"
                      label="Full name"
                      icon={<UserIcon />}
                      error={fieldErrors.name}
                      touched={touched.name}
                    >
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        placeholder="Mike Johnson"
                        required
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        className={inputClass(Boolean(fieldErrors.name))}
                      />
                    </Field>

                    {/* Email */}
                    <Field
                      id="email"
                      label="Email address"
                      icon={<MailIcon />}
                      error={fieldErrors.email}
                      touched={touched.email}
                      trailing={
                        touched.email && emailValid ? (
                          <EmailStatusBadge status={emailStatus} />
                        ) : null
                      }
                    >
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        placeholder="you@example.com"
                        required
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        className={inputClass(Boolean(fieldErrors.email))}
                      />
                    </Field>

                    {/* Password */}
                    <Field
                      id="password"
                      label="Password"
                      icon={<LockIcon />}
                      error={fieldErrors.password}
                      touched={touched.password}
                    >
                      <div className="relative">
                        <input
                          id="password"
                          name="new-password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                          placeholder="Create a strong password"
                          required
                          minLength={8}
                          aria-invalid={Boolean(fieldErrors.password)}
                          aria-describedby="password-requirements"
                          className={`${inputClass(Boolean(fieldErrors.password))} pr-16`}
                        />
                        <VisibilityToggle
                          shown={showPassword}
                          onToggle={() => setShowPassword((s) => !s)}
                          label={showPassword ? "Hide password" : "Show password"}
                        />
                      </div>

                      {/* ── PASSWORD REQUIREMENTS — COMPACT VERSION ── */}
                      <div
                        id="password-requirements"
                        className="mt-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2"
                      >
                        <div className="mb-1.5 flex items-center justify-between gap-3">
                          <span className="text-[10.5px] font-semibold tracking-wide text-white/60">
                            Password requirements
                          </span>
                          <span
                            className={`text-[10.5px] font-semibold ${
                              password ? STRENGTH_TEXT[passwordScore] : "text-white/30"
                            }`}
                          >
                            {password ? STRENGTH_LABELS[passwordScore] : ""}
                          </span>
                        </div>

                        <div className="mb-2 flex gap-1" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((step) => (
                            <span
                              key={step}
                              className={`h-[3px] flex-1 rounded-full transition-colors ${
                                step <= passwordScore
                                  ? STRENGTH_BAR[passwordScore]
                                  : "bg-white/10"
                              }`}
                            />
                          ))}
                        </div>

                        <ul className="grid grid-cols-1 gap-x-4 gap-y-1 text-[11px] sm:grid-cols-2">
                          {passwordChecks.map((rule) => (
                            <li
                              key={rule.id}
                              className={`flex items-center gap-1.5 ${
                                rule.passed ? "text-emerald-300" : "text-white/45"
                              }`}
                            >
                              <span
                                className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full ${
                                  rule.passed ? "bg-emerald-400/25" : "bg-white/[0.08]"
                                }`}
                                aria-hidden="true"
                              >
                                {rule.passed ? <CheckIcon /> : null}
                              </span>
                              <span>{rule.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Field>

                    {/* Confirm password */}
                    <Field
                      id="confirmPassword"
                      label="Confirm password"
                      icon={<LockIcon />}
                      error={fieldErrors.confirmPassword}
                      touched={touched.confirmPassword}
                    >
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onBlur={() =>
                            setTouched((t) => ({ ...t, confirmPassword: true }))
                          }
                          placeholder="Repeat your password"
                          required
                          aria-invalid={passwordsMismatch}
                          aria-describedby="confirm-status"
                          className={`${inputClass(passwordsMismatch)} pr-16`}
                        />
                        <VisibilityToggle
                          shown={showConfirmPassword}
                          onToggle={() => setShowConfirmPassword((s) => !s)}
                          label={
                            showConfirmPassword
                              ? "Hide confirmation password"
                              : "Show confirmation password"
                          }
                        />
                      </div>

                      <div id="confirm-status" className="min-h-[16px]">
                        {passwordsMatch && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
                            <CheckIcon />
                            Passwords match
                          </div>
                        )}
                        {passwordsMismatch && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-rose-300">
                            <AlertIcon />
                            Passwords don&apos;t match yet
                          </div>
                        )}
                      </div>
                    </Field>

                    {/* Terms */}
                    <label
                      className={`signup-field flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs leading-5 transition ${
                        touched.agreed && !agreed
                          ? "border-rose-400/40 bg-rose-500/[0.08] text-rose-200"
                          : "border-white/[0.08] bg-white/[0.04] text-white/60 hover:bg-white/[0.07]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => {
                          setAgreed(e.target.checked);
                          setTouched((t) => ({ ...t, agreed: true }));
                        }}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-white"
                      />
                      <span>
                        I agree to the{" "}
                        <LegalLink kind="terms" />
                        {" "}and{" "}
                        <LegalLink kind="privacy" />
                        .
                      </span>
                    </label>

                    {/* Submit */}
                    <button
                      ref={buttonRef}
                      type="submit"
                      disabled={submitDisabled}
                      onMouseEnter={handleButtonEnter}
                      onMouseLeave={handleButtonLeave}
                      className="signup-field flex min-h-[58px] w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-[0_15px_35px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2.5">
                          <Spinner />
                          Creating account…
                        </span>
                      ) : cooldownLeft > 0 ? (
                        <span>Try again in {cooldownLeft}s</span>
                      ) : (
                        <span className="flex items-center gap-2.5">
                          Create account
                          <ArrowIcon />
                        </span>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-white/40">
                      We&apos;ll send a verification link to your email.
                    </p>
                  </form>

                  <p className="signup-field mt-7 text-center text-sm text-white/50">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-white transition hover:text-blue-300"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </div>

              <p className="signup-field mt-6 text-center text-xs font-medium tracking-wide text-white/35">
                Your time is valuable — use it intentionally
              </p>
            </>
          ) : (
            /* VERIFY STAGE */
            <div
              ref={cardRef}
              className="rounded-[30px] border border-white/[0.12] bg-black/40 p-7 text-center shadow-[0_35px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:rounded-[34px] sm:p-10"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-emerald-400"
                >
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </div>

              <h1
                ref={verifyHeadingRef}
                tabIndex={-1}
                className="text-2xl font-semibold tracking-[-0.04em] text-white outline-none sm:text-3xl"
              >
                Check your inbox
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/60">
                We sent a verification link to{" "}
                <span className="font-semibold text-white">{email}</span>. Click it
                to activate your account.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendIn > 0}
                  className="min-h-[52px] w-full rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {resendIn > 0
                    ? `Resend in ${resendIn}s`
                    : "Resend verification email"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStage("form");
                    setFormError("");
                  }}
                  className="min-h-[52px] w-full rounded-xl border border-white/[0.12] bg-white/[0.06] px-5 text-sm font-semibold text-white/80 backdrop-blur-xl transition hover:border-white/[0.22] hover:bg-white/[0.12] hover:text-white"
                >
                  Wrong email? Start over
                </button>

                <Link
                  href="/login"
                  className="mt-2 text-xs font-semibold text-white/50 transition hover:text-white"
                >
                  Back to log in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════ */

function Field({
  id, label, icon, error, touched, trailing, children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  touched?: boolean;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="signup-field">
      <div className="mb-2 flex items-center justify-between gap-2">
        <label htmlFor={id} className="block text-sm font-semibold text-white/70">
          {label}
        </label>
        {trailing}
      </div>
      <div className="relative">
        {icon}
        {children}
      </div>
      {touched && error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

function VisibilityToggle({
  shown, onToggle, label,
}: { shown: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={shown}
      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-white/40 transition hover:bg-white/[0.08] hover:text-white"
    >
      {shown ? "Hide" : "Show"}
    </button>
  );
}

function EmailStatusBadge({ status }: { status: EmailStatus }) {
  if (status === "checking") {
    return (
      <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/50">
        <span className="h-3 w-3 animate-spin rounded-full border border-white/20 border-t-white/60" />
        Checking…
      </span>
    );
  }
  if (status === "available") {
    return (
      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
        <CheckIcon /> Available
      </span>
    );
  }
  if (status === "taken") {
    return (
      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-300">
        <AlertIcon /> Already in use
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="text-[11px] font-medium text-white/40">
        Couldn&apos;t verify
      </span>
    );
  }
  return null;
}

function LegalLink({ kind }: { kind: "terms" | "privacy" }) {
  const [open, setOpen] = useState(false);
  const label = kind === "terms" ? "Terms of Service" : "Privacy Policy";

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
      >
        {label}
      </button>

      {open && <LegalModal kind={kind} onClose={() => setOpen(false)} />}
    </>
  );
}

function LegalModal({
  kind, onClose,
}: { kind: "terms" | "privacy"; onClose: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const title = kind === "terms" ? "Terms of Service" : "Privacy Policy";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-h-[80vh] w-full max-w-lg overflow-hidden rounded-2xl bg-[#0f0f11] shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
          <h2
            id="legal-title"
            ref={headingRef}
            tabIndex={-1}
            className="text-base font-semibold text-white outline-none"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-white/50 transition hover:bg-white/[0.06] hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-5 text-sm leading-6 text-white/60">
          {kind === "terms" ? <TermsContent /> : <PrivacyContent />}
        </div>

        <div className="border-t border-white/[0.08] px-6 py-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function TermsContent() {
  return (
    <>
      <p>
        By creating a TimePilot account you agree to use the service in
        accordance with these terms. You are responsible for maintaining the
        confidentiality of your credentials and for all activity that occurs
        under your account.
      </p>
      <h3 className="mt-4 font-semibold text-white">1. Acceptable use</h3>
      <p>
        You agree not to misuse the service, attempt to access it by any
        method other than the interface we provide, or use it to violate any
        law or the rights of others.
      </p>
      <h3 className="mt-4 font-semibold text-white">2. Your content</h3>
      <p>
        You retain ownership of the data you submit. We only process it to
        provide and improve the service, as described in the Privacy Policy.
      </p>
      <h3 className="mt-4 font-semibold text-white">3. Termination</h3>
      <p>
        You may close your account at any time. We may suspend accounts that
        violate these terms.
      </p>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <p>
        We collect the minimum information needed to run TimePilot: your
        name, email address, and the content you create inside the app.
      </p>
      <h3 className="mt-4 font-semibold text-white">What we don&apos;t do</h3>
      <p>
        We don&apos;t sell your data, and we don&apos;t share it with
        advertisers. We don&apos;t use your tasks or notes to train third-party
        models.
      </p>
      <h3 className="mt-4 font-semibold text-white">Security</h3>
      <p>
        Passwords are hashed with a modern algorithm. Sessions are
        transmitted over TLS. You can enable two-factor authentication from
        your account settings.
      </p>
      <h3 className="mt-4 font-semibold text-white">Your rights</h3>
      <p>
        You can export or permanently delete your data from your account at
        any time.
      </p>
    </>
  );
}

/* Helpers */

function inputClass(invalid: boolean) {
  return `min-h-[54px] w-full rounded-xl border bg-white/[0.06] py-3 pl-11 text-sm text-white outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-white/30 focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.05)] ${
    invalid
      ? "border-rose-400/60 focus:border-rose-400"
      : "border-white/[0.1] focus:border-white/[0.25]"
  }`;
}

/* Analog clock */

function AnalogClock({ time }: { time: Date }) {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white"
      aria-hidden="true"
    >
      <div className="relative h-6 w-6">
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-0 h-[3px] w-[1px] -translate-x-1/2 bg-black/25"
            style={{ transform: `rotate(${deg}deg) translateY(0px)` }}
          />
        ))}
        <span
          className="absolute bottom-1/2 left-1/2 h-[6px] w-[1.6px] origin-bottom -translate-x-1/2 rounded-full bg-black"
          style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
        />
        <span
          className="absolute bottom-1/2 left-1/2 h-[9px] w-[1.3px] origin-bottom -translate-x-1/2 rounded-full bg-black/85"
          style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }}
        />
        <span
          className="absolute bottom-1/2 left-1/2 h-[10px] w-[1px] origin-bottom -translate-x-1/2 rounded-full bg-[#F5A623] transition-transform duration-200 ease-linear"
          style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }}
        />
        <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

/* Mars background — stars & shooting stars */

function Stars({
  count,
  size,
  duration,
  opacity,
  layer,
}: {
  count: number;
  size: number;
  duration: number;
  opacity: number;
  layer: number;
}) {
  const stars = useMemo(() => {
    let seed = layer * 9301 + 49297;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }).map(() => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 60}%`,
      delay: `${rand() * 5}s`,
      dur: `${duration + rand() * 2}s`,
      opacity: 0.4 + rand() * 0.6,
    }));
  }, [count, duration, layer]);

  return (
    <div
      className="absolute inset-x-0 top-0 h-[65%]"
      style={{ opacity }}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="mars-star absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: s.delay,
            animationDuration: s.dur,
            opacity: s.opacity,
            boxShadow:
              size >= 2
                ? "0 0 6px 1px rgba(255,255,255,0.8)"
                : "0 0 3px 0.5px rgba(255,255,255,0.5)",
          }}
        />
      ))}
    </div>
  );
}

function ShootingStars() {
  const meteors = useMemo(
    () => [
      { top: "8%", left: "10%", delay: "0s", duration: "3s" },
      { top: "18%", left: "55%", delay: "6s", duration: "3.5s" },
      { top: "4%", left: "75%", delay: "12s", duration: "2.8s" },
      { top: "25%", left: "30%", delay: "18s", duration: "4s" },
    ],
    [],
  );

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {meteors.map((m, i) => (
        <span
          key={i}
          className="shooting-star absolute h-[2px] w-[120px] rounded-full"
          style={{
            top: m.top,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 60%, #ffffff 100%)",
            boxShadow: "0 0 12px 2px rgba(255,255,255,0.5)",
            transform: "rotate(-35deg)",
            transformOrigin: "right center",
          }}
        />
      ))}
    </div>
  );
}

/* Icons */

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black" />
  );
}

function UserIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      className="mt-0.5 shrink-0"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5" />
      <path d="M12 16.5h.01" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.87c2.27-2.09 3.59-5.17 3.59-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.27a12 12 0 0 0 0 10.75l4-3.11Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.63l4 3.1C6.22 6.87 8.87 4.75 12 4.75Z" />
    </svg>
  );
}