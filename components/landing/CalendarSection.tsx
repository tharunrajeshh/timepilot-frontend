"use client";

export default function CalendarSection() {
  return (
    <section id="calendar" className="w-full bg-[#efeee9] py-20 lg:py-28">
      <div className="tp-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ─── LEFT — Copy ─── */}
          <div>
            <p className="tp-eyebrow">Calendar</p>
            <h2 className="tp-serif mt-4 text-[34px] leading-[1.1] tracking-[-0.02em] text-[#0d1420] sm:text-[42px]">
              Your week, planned before it starts.
            </h2>
            <p className="mt-5 max-w-[480px] text-[16px] leading-7 text-[#344052]">
              Every Sunday, TimePilot builds a week around your priorities.
              When something shifts, the whole schedule adapts in seconds.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Automatic time-blocking based on your calendar",
                "Buffer time between meetings, protected by default",
                "Drag to reschedule — the rest of the week follows",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(196,154,97,0.15)] text-[#c49a61]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-6 text-[#344052]">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── RIGHT — Calendar mock ─── */}
          <div
            className="rounded-[24px] border border-[rgba(13,20,32,0.08)] bg-[#fffdf8] p-6 sm:p-8"
            style={{ boxShadow: "0 24px 70px rgba(13,20,32,0.08)" }}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#707a89]">
                  This week
                </p>
                <p className="mt-1 text-[16px] font-medium text-[#0d1420]">
                  Mon — Fri
                </p>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="h-2 w-2 rounded-full bg-[rgba(13,20,32,0.12)]"
                  />
                ))}
              </div>
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { day: "Mon", blocks: ["focus", "focus", "meeting"] },
                { day: "Tue", blocks: ["meeting", "focus", "break"] },
                { day: "Wed", blocks: ["focus", "focus", "focus"] },
                { day: "Thu", blocks: ["meeting", "focus", "break"] },
                { day: "Fri", blocks: ["focus", "break", "meeting"] },
              ].map((col) => (
                <div key={col.day} className="space-y-1.5">
                  <p className="mb-2 text-center text-[10.5px] font-medium text-[#707a89]">
                    {col.day}
                  </p>
                  {col.blocks.map((b, i) => (
                    <div
                      key={i}
                      className={`h-10 rounded-[8px] ${
                        b === "focus"
                          ? "bg-[rgba(196,154,97,0.22)]"
                          : b === "meeting"
                            ? "bg-[rgba(10,20,34,0.12)]"
                            : "bg-[rgba(13,20,32,0.05)]"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-5 border-t border-[rgba(13,20,32,0.08)] pt-5">
              {[
                { color: "bg-[rgba(196,154,97,0.5)]", label: "Focus" },
                { color: "bg-[rgba(10,20,34,0.4)]", label: "Meetings" },
                { color: "bg-[rgba(13,20,32,0.12)]", label: "Break" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-sm ${l.color}`} />
                  <span className="text-[11px] text-[#344052]">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}