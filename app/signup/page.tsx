"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/layout/AuthShell";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import OrbitalClockVisual from "@/components/auth/OrbitalClockVisual";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "One number", test: (p: string) => /\d/.test(p) },
  { id: "special", label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
] as const;

const STRENGTH_LABELS = ["", "Very weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["#e5e2da", "#c75b5b", "#d68a4a", "#c49a61", "#8aa3c4", "#4f8b72"];
const STRENGTH_TEXT = ["", "#c75b5b", "#d68a4a", "#b58645", "#5a7ba8", "#4f8b72"];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountedAtRef = useRef(Date.now());

  const passwordChecks = useMemo(
    () => PASSWORD_RULES.map((r) => ({ ...r, passed: r.test(password) })),
    [password],
  );
  const passwordScore = passwordChecks.filter((c) => c.passed).length;
  const passwordStrong = passwordScore === PASSWORD_RULES.length;

  const emailValid = EMAIL_RE.test(email.trim());
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const handleGoogleSignup = () => {
    if (loading) return;
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (honeypotRef.current?.value) return;
    if (Date.now() - mountedAtRef.current < 1200) {
      setError("Please take a moment to review your details.");
      return;
    }

    if (!name.trim()) return setError("Please enter your full name.");
    if (!emailValid) return setError("Please enter a valid email address.");
    if (!passwordStrong) return setError("Your password doesn't meet all requirements yet.");
    if (!passwordsMatch) return setError("Passwords don't match.");
    if (!agreed) return setError("Please accept the Terms and Privacy Policy.");

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
        if (code === "EMAIL_TAKEN") {
          setError("That email is already registered. Try logging in instead.");
          return;
        }
        const detail = (data as { detail?: unknown }).detail;
        if (typeof detail === "string") return setError(detail);
        if (Array.isArray(detail)) {
          return setError(
            detail.map((i: { msg?: string }) => i.msg ?? "Invalid input.").join(" "),
          );
        }
        return setError("We couldn't create your account. Please try again.");
      }

      // Redirect to verify with the email pre-filled
      router.push(`/verify?email=${encodeURIComponent(email.trim())}`);
    } catch (err) {
      console.error(err);
      setError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="GET STARTED"
      title="Build a calmer, more intentional day."
      subtitle="Create your account and let TimePilot plan around how you actually work."
      visual={<OrbitalClockVisual />}
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#0d1420] hover:text-[#c49a61]"
          >
            Log in
          </Link>
        </>
      }
    >
      <div
        className="rounded-[20px] border border-[rgba(13,20,32,0.08)] bg-[#fffdf8] p-6 sm:p-8"
        style={{ boxShadow: "0 24px 70px rgba(13,20,32,0.08)" }}
      >
        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="flex h-[46px] w-full items-center justify-center gap-3 rounded-[12px] border border-[rgba(13,20,32,0.14)] bg-white text-[14px] font-medium text-[#0d1420] transition-all duration-200 hover:border-[rgba(13,20,32,0.24)] hover:bg-[#f6f4ee] disabled:opacity-50"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[rgba(13,20,32,0.08)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#707a89]">
            or
          </span>
          <div className="h-px flex-1 bg-[rgba(13,20,32,0.08)]" />
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-5 rounded-[12px] border border-[rgba(199,91,91,0.25)] bg-[rgba(199,91,91,0.06)] px-4 py-3 text-[13px] leading-5 text-[#c75b5b]"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Honeypot */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <input ref={honeypotRef} tabIndex={-1} autoComplete="off" name="company" />
          </div>

          <TextField
            label="Full name"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Mike Johnson"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <TextField
              label="Password"
              id="password"
              name="new-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="rounded-lg px-2 py-1 text-[12px] font-medium text-[#707a89] hover:bg-[rgba(13,20,32,0.05)] hover:text-[#0d1420]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              }
            />

            {/* Password requirements — compact */}
            <div className="mt-3 rounded-[12px] border border-[rgba(13,20,32,0.06)] bg-[#f6f4ee] px-3 py-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#344052]">
                  Password requirements
                </span>
                {password && (
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: STRENGTH_TEXT[passwordScore] }}
                  >
                    {STRENGTH_LABELS[passwordScore]}
                  </span>
                )}
              </div>

              <div className="mb-3 flex gap-1" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((step) => (
                  <span
                    key={step}
                    className="h-[3px] flex-1 rounded-full transition-colors"
                    style={{
                      background:
                        step <= passwordScore
                          ? STRENGTH_COLORS[passwordScore]
                          : "rgba(13,20,32,0.08)",
                    }}
                  />
                ))}
              </div>

              <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-[12px] sm:grid-cols-2">
                {passwordChecks.map((rule) => (
                  <li
                    key={rule.id}
                    className="flex items-center gap-1.5"
                    style={{
                      color: rule.passed ? "#4f8b72" : "#707a89",
                    }}
                  >
                    <span
                      className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: rule.passed
                          ? "rgba(79,139,114,0.15)"
                          : "rgba(13,20,32,0.06)",
                        color: rule.passed ? "#4f8b72" : "transparent",
                      }}
                    >
                      {rule.passed && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      )}
                    </span>
                    <span>{rule.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <TextField
              label="Confirm password"
              id="confirmPassword"
              name="confirm-password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={passwordsMismatch ? "Passwords don't match yet." : undefined}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="rounded-lg px-2 py-1 text-[12px] font-medium text-[#707a89] hover:bg-[rgba(13,20,32,0.05)] hover:text-[#0d1420]"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              }
            />
            {passwordsMatch && !passwordsMismatch && (
              <p className="mt-1.5 text-[12px] text-[#4f8b72]">Passwords match</p>
            )}
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-[rgba(13,20,32,0.08)] bg-[#f6f4ee] p-3.5 text-[12.5px] leading-5 text-[#344052]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[rgba(13,20,32,0.2)] accent-[#0a1422]"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="font-medium text-[#0d1420] underline underline-offset-2">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-medium text-[#0d1420] underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <div className="pt-1">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center text-[11px] text-[#707a89]">
          We&apos;ll send a verification link to your email.
        </p>
      </div>
    </AuthShell>
  );
}

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