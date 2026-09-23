"use client";

import { Brain, Calendar, LineChart } from "lucide-react";

const FEATURES = [
  {
    number: "01",
    icon: Brain,
    title: "AI-assisted planning",
    description:
      "Describe your day in plain language. TimePilot turns it into a realistic, prioritized schedule — around your energy, not against it.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Smart scheduling",
    description:
      "Your focus blocks, meetings, and breaks fit together automatically. No more squeezing twelve hours into eight.",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Focus analytics",
    description:
      "See where your time actually goes. Understand your patterns, protect your best hours, and improve every week.",
  },
];

export default function Features() {
  return (
    <section id="features" className="w-full bg-[#f6f4ee] py-20 lg:py-28">
      <div className="tp-container">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="tp-eyebrow">What TimePilot does</p>
          <h2 className="tp-serif mt-4 text-[34px] leading-[1.1] tracking-[-0.02em] text-[#0d1420] sm:text-[42px]">
            Three things. Done well.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-[#344052]">
            We removed everything that wasn&apos;t essential. What&apos;s left
            is what actually helps you finish your day.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.number}
                className="group rounded-[20px] border border-[rgba(13,20,32,0.08)] bg-[#fffdf8] p-7 transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: "0 10px 30px rgba(13,20,32,0.04)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#0a1422] text-[#f6f4ee]">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="text-[12px] font-medium tracking-[0.14em] text-[#c49a61]">
                    {f.number}
                  </span>
                </div>

                <h3 className="mt-7 text-[19px] font-medium tracking-[-0.02em] text-[#0d1420]">
                  {f.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-7 text-[#344052]">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}