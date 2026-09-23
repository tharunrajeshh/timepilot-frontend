"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const PRODUCT_LINKS: FooterLink[] = [
  { label: "Features", href: "#features" },
  { label: "AI planner", href: "#ai-planner" },
  { label: "Calendar sync", href: "#calendar" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing", href: "#pricing" },
  { label: "What's new", href: "#changelog" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Blog", href: "#blog" },
  { label: "Press", href: "#press" },
];

const RESOURCES_LINKS: FooterLink[] = [
  { label: "Help center", href: "#help" },
  { label: "Documentation", href: "#docs" },
  { label: "Community", href: "#community" },
  { label: "System status", href: "#status" },
];

const ACCOUNT_LINKS: FooterLink[] = [
  { label: "Sign in", href: "/login" },
  { label: "Create account", href: "/signup" },
  { label: "Security", href: "#security" },
  { label: "Contact sales", href: "#contact" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Follow TimePilot on X",
    href: "https://x.com/timepilotapp",
    icon: <XIcon />,
  },
  {
    label: "Follow TimePilot on LinkedIn",
    href: "https://www.linkedin.com/company/timepilot",
    icon: <LinkedInIcon />,
  },
  {
    label: "View TimePilot on GitHub",
    href: "https://github.com/timepilot",
    icon: <GitHubIcon />,
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy policy", href: "#privacy" },
  { label: "Terms of service", href: "#terms" },
  { label: "Cookie settings", href: "#cookies" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("done");
      setEmail("");
    }, 600);
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#08090B] px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        {/* Main footer */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5A623] text-black">
                <ClockIcon />
              </div>
              <span className="text-base font-semibold tracking-tight text-white">
                TimePilot
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/45">
              A smarter way to plan your day, protect your focus and make better use of your time.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map((link) => (
                <SocialButton key={link.href} {...link} />
              ))}
            </div>
          </div>

          {/* Product */}
          <FooterColumn title="Product">
            {PRODUCT_LINKS.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            {COMPANY_LINKS.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
          </FooterColumn>

          {/* Resources */}
          <FooterColumn title="Resources">
            {RESOURCES_LINKS.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
          </FooterColumn>

          {/* Account */}
          <FooterColumn title="Account">
            {ACCOUNT_LINKS.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
          </FooterColumn>
        </div>

        {/* Newsletter */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-white/85">
                Get product updates in your inbox
              </p>
              <p className="mt-1 text-xs text-white/40">
                One email a month. No spam, unsubscribe anytime.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm items-center gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status !== "idle"}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#F5A623]/60 focus:ring-2 focus:ring-[#F5A623]/20 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status !== "idle"}
                className="shrink-0 rounded-xl bg-[#F5A623] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#ffb83e] disabled:opacity-70"
              >
                {status === "done" ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} TimePilot, Inc. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/30 transition hover:text-white/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// Components
function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-5 text-xs font-semibold text-white/45">{title}</p>
      <ul className="flex flex-col items-start gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, label }: FooterLink) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/40 transition hover:translate-x-0.5 hover:text-white/80"
      >
        {label}
      </Link>
    </li>
  );
}

function SocialButton({ label, href, icon }: SocialLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/40 transition hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5A623]/60"
    >
      {icon}
    </a>
  );
}

// Icons
function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.2 8.2H3.4V20h2.8V8.2ZM4.8 4C3.8 4 3 4.8 3 5.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8S5.8 4 4.8 4ZM20.6 13.2c0-3.5-1.9-5.2-4.5-5.2-2.1 0-3 .9-3.5 1.7V8.2H9.8V20h2.8v-5.8c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.6 1.8 3V20h2.8l.1-6.8Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.3.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.5 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.5 10.5 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.2-2.6 5.2-5.1 5.5.4.3.7 1 .7 1.9V22c0 .3.2.7.8.6A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  );
}