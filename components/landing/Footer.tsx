import Link from "next/link";
import TimePilotLogo from "@/components/ui/TimePilotLogo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "AI Planner", href: "#ai-planner" },
      { label: "Analytics", href: "#analytics" },
      { label: "Calendar", href: "#calendar" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/signup" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(13,20,32,0.08)] bg-[#f6f4ee]">
      <div className="tp-container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Left — brand + tagline */}
          <div>
            <TimePilotLogo variant="dark" size="md" />
            <p className="mt-5 max-w-xs text-[14px] leading-6 text-[#707a89]">
              The calm operating system for your day. Plan less, do more of
              what matters.
            </p>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0d1420]">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-[#344052] transition-colors hover:text-[#0d1420]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[rgba(13,20,32,0.08)] pt-8 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-[#707a89]">
            © {year} TimePilot. All rights reserved.
          </p>
          <p className="text-[12.5px] text-[#707a89]">
            Built for people who want to work with more intention.
          </p>
        </div>
      </div>
    </footer>
  );
}