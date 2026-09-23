"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthShell from "@/components/layout/AuthShell";
import Button from "@/components/ui/Button";
import OrbitalClockVisual from "@/components/auth/OrbitalClockVisual";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function VerifyPage() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [resendIn, setResendIn] = useState(60);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    const e = params.get("email");
    if (e) setEmail(e);
  }, [params]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const handleResend = async () => {
    if (resendIn > 0 || resending) return;
    setResending(true);
    try {
      await fetch(`${API_URL}/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setResent(true);
      setResendIn(60);
    } catch {
      /* silent — user can try again */
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthShell
      eyebrow="ONE MORE STEP"
      title="Check your inbox to continue."
      subtitle="Verifying your email keeps your account secure and helps us reach you when it matters."
      visual={<OrbitalClockVisual />}
      footer={
        <>
          Wrong email?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#0d1420] hover:text-[#c49a61]"
          >
            Start over
          </Link>
        </>
      }
    >
      <div
        className="rounded-[20px] border border-[rgba(13,20,32,0.08)] bg-[#fffdf8] p-6 text-center sm:p-8"
        style={{ boxShadow: "0 24px 70px rgba(13,20,32,0.08)" }}
      >
        {/* Mail icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#f6f4ee]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d1420" strokeWidth="1.6">
            <rect x="3.5" y="5" width="17" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-[22px] font-medium tracking-[-0.02em] text-[#0d1420]">
          Verify your email
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-6 text-[#707a89]">
          We sent a verification link to{" "}
          {email ? (
            <span className="font-medium text-[#0d1420]">{email}</span>
          ) : (
            "your inbox"
          )}
          . Click it to activate your account.
        </p>

        <div className="mt-8 space-y-3">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleResend}
            disabled={resendIn > 0 || resending}
          >
            {resending
              ? "Sending…"
              : resendIn > 0
                ? `Resend in ${resendIn}s`
                : "Resend verification email"}
          </Button>

          <Button href="/login" variant="secondary" size="lg" fullWidth>
            Back to log in
          </Button>
        </div>

        {resent && (
          <p className="mt-4 text-[12px] text-[#4f8b72]">
            Verification email sent. Please check your inbox.
          </p>
        )}
      </div>

      <p className="mt-5 text-center text-[12px] text-[#707a89]">
        Didn&apos;t receive it? Check your spam folder.
      </p>
    </AuthShell>
  );
}