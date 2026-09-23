import type { ReactNode } from "react";
import TimePilotLogo from "@/components/ui/TimePilotLogo";

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  visual,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  visual: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="relative min-h-[100svh] w-full bg-[#f6f4ee] text-[#0d1420]">
      <div className="mx-auto grid min-h-[100svh] w-full max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        {/* ─── LEFT: Dark brand panel (desktop only) ─── */}
        <aside className="relative hidden overflow-hidden bg-[#0a1422] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, rgba(196,154,97,0.10), transparent 45%), radial-gradient(circle at 20% 80%, rgba(138,163,196,0.08), transparent 50%)",
            }}
          />

          <TimePilotLogo variant="light" size="md" />

          <div className="relative flex flex-1 items-center justify-center py-10">
            {visual}
          </div>

          <div className="relative max-w-md">
            {eyebrow && (
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c49a61]">
                {eyebrow}
              </p>
            )}
            <h2 className="tp-serif text-[28px] leading-[1.15] text-[#f6f4ee] xl:text-[32px]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-[14px] leading-6 text-[#f6f4ee]/55">
                {subtitle}
              </p>
            )}
          </div>
        </aside>

        {/* ─── RIGHT: Form column ─── */}
        <section className="flex min-h-[100svh] flex-col">
          {/* Mobile logo */}
          <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:hidden">
            <TimePilotLogo variant="dark" size="md" />
            <a
              href="/"
              className="text-[13px] font-medium text-[#707a89] hover:text-[#0d1420]"
            >
              Back home
            </a>
          </div>

          <div className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
            <div className="w-full max-w-[440px]">
              {/* Mobile heading */}
              <div className="mb-8 text-center lg:hidden">
                <h1 className="text-[32px] font-medium leading-[1.1] tracking-[-0.03em] text-[#0d1420]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mx-auto mt-3 max-w-sm text-[14px] leading-6 text-[#707a89]">
                    {subtitle}
                  </p>
                )}
              </div>

              {children}
            </div>
          </div>

          {footer && (
            <div className="border-t border-[rgba(13,20,32,0.08)] px-5 py-5 text-center text-[12px] text-[#707a89] sm:px-8">
              {footer}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}