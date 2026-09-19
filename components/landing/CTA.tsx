"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-white px-5 py-24 text-black sm:px-8 lg:px-12 lg:py-32"
    >
      {/* ─────────────────────────────────────────
          Ambient background
      ───────────────────────────────────────── */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.035] blur-[150px]" />

      <div className="pointer-events-none absolute left-[10%] top-[20%] h-[280px] w-[280px] rounded-full bg-blue-500/[0.025] blur-[100px]" />

      <div className="pointer-events-none absolute bottom-[10%] right-[10%] h-[300px] w-[300px] rounded-full bg-emerald-500/[0.025] blur-[110px]" />

      {/* ─────────────────────────────────────────
          Decorative rings
      ───────────────────────────────────────── */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.035]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.02]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.015]" />

      {/* ─────────────────────────────────────────
          Main container
      ───────────────────────────────────────── */}

      <div className="relative mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[34px] border border-black/[0.07] bg-[#F7F7F5] shadow-[0_40px_120px_rgba(0,0,0,0.08)] sm:rounded-[44px]">
          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-24">

            {/* Top glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-purple-500/[0.055] blur-[90px]" />

            <div className="relative">

              {/* ─────────────────────────────────────
                  Eyebrow
              ───────────────────────────────────── */}

              <div className="mb-7 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-black/15" />

                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/60">
                  <SparkIcon />
                  Ready to transform your workflow?
                </span>

                <span className="h-px w-8 bg-black/15" />
              </div>

              {/* ─────────────────────────────────────
                  Heading
              ───────────────────────────────────── */}

              <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-[-0.06em] text-black sm:text-5xl lg:text-7xl">
                Reclaim 2+ hours
                <br />

                <span className="text-black/40">
                  of productive time every day.
                </span>
              </h2>

              {/* ─────────────────────────────────────
                  Description
              ───────────────────────────────────── */}

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-black/65 sm:text-lg">
                Join 50,000+ professionals using TimePilot to automate task scheduling, eliminate context-switching, and get laser-focused work done. See exactly how your time is spent and optimize it in real-time.
              </p>

              {/* ─────────────────────────────────────
                  Stats row
              ───────────────────────────────────── */}

              <div className="mx-auto mt-10 max-w-2xl">
                <div className="grid grid-cols-3 gap-4 rounded-2xl border border-black/[0.1] bg-white p-6 backdrop-blur-sm">
                  <div>
                    <div className="text-3xl font-bold text-black">14h</div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-black/50 font-medium">Saved per week</div>
                  </div>
                  <div className="border-l border-r border-black/[0.1]">
                    <div className="text-3xl font-bold text-black">87%</div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-black/50 font-medium">Less distracted</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-black">3x</div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-black/50 font-medium">More focused work</div>
                  </div>
                </div>
              </div>

              {/* ─────────────────────────────────────
                  Buttons
              ───────────────────────────────────── */}

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-black px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-[0_18px_40px_rgba(0,0,0,0.2)] sm:w-auto"
                >
                  Get started for free

                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>

                <Link
                  href="#demo"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.12] bg-white px-8 py-4 text-base font-semibold text-black backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.2] hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:w-auto"
                >
                  <PlayIcon />
                  Watch 2-min demo
                </Link>
              </div>

              {/* ─────────────────────────────────────
                  Trust points
              ───────────────────────────────────── */}

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 border-t border-b border-black/[0.08] py-6">
                <TrustItem text="No credit card required" />

                <TrustItem text="14-day full access" />

                <TrustItem text="Cancel anytime" />

                <TrustItem text="99.9% uptime" />
              </div>

              {/* ─────────────────────────────────────
                  Product mockup
              ───────────────────────────────────── */}

              <div className="mx-auto mt-14 max-w-4xl">
                <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  
                  {/* Browser chrome */}
                  <div className="border-b border-black/[0.1] bg-[#FAFAF8] px-4 py-3 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      </div>
                      <div className="ml-4 flex-1 text-center">
                        <div className="text-[11px] font-medium text-black/60">app.timepilot.io/dashboard</div>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard content */}
                  <div className="relative bg-white p-6 sm:p-8">
                    
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between border-b border-black/[0.08] pb-6">
                      <div>
                        <h3 className="text-lg font-bold text-black">Today's Focus Time</h3>
                        <p className="mt-1 text-[13px] text-black/55">Saturday, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-emerald-600">5h 42m</div>
                        <div className="text-[10px] uppercase tracking-[0.15em] text-black/50 font-semibold">of focused work</div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4">
                      <TimelineItem 
                        time="9:00 - 10:30" 
                        task="Design System Updates" 
                        color="bg-purple-500"
                        duration="1h 30m"
                        focused={true}
                      />
                      <TimelineItem 
                        time="10:30 - 10:45" 
                        task="Email & Slack Review" 
                        color="bg-red-400"
                        duration="15m"
                        focused={false}
                      />
                      <TimelineItem 
                        time="10:45 - 12:15" 
                        task="Product Development" 
                        color="bg-blue-500"
                        duration="1h 30m"
                        focused={true}
                      />
                      <TimelineItem 
                        time="12:15 - 1:00" 
                        task="Team Standup & Lunch" 
                        color="bg-yellow-500"
                        duration="45m"
                        focused={false}
                      />
                      <TimelineItem 
                        time="1:00 - 3:00" 
                        task="Deep Work - Feature Implementation" 
                        color="bg-emerald-500"
                        duration="2h"
                        focused={true}
                      />
                    </div>

                    {/* Stats footer */}
                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-black/[0.08] pt-6">
                      <div className="text-center">
                        <div className="text-base font-bold text-black">4 blocks</div>
                        <div className="text-[10px] uppercase tracking-[0.1em] text-black/50 font-medium">focus sessions</div>
                      </div>
                      <div className="border-l border-r border-black/[0.08] text-center">
                        <div className="text-base font-bold text-black">1x distraction</div>
                        <div className="text-[10px] uppercase tracking-[0.1em] text-black/50 font-medium">context switch</div>
                      </div>
                      <div className="text-center">
                        <div className="text-base font-bold text-emerald-600">+23%</div>
                        <div className="text-[10px] uppercase tracking-[0.1em] text-black/50 font-medium">vs yesterday</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─────────────────────────────────────
                  Social proof
              ───────────────────────────────────── */}

              <div className="mx-auto mt-12 max-w-2xl">
                <p className="mb-6 text-[10px] uppercase tracking-[0.15em] text-black/50 font-semibold">Trusted by teams at</p>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  <div className="flex items-center gap-2 text-black/60">
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span className="text-[12px] font-semibold">Stripe</span>
                  </div>
                  <div className="flex items-center gap-2 text-black/60">
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span className="text-[12px] font-semibold">Figma</span>
                  </div>
                  <div className="flex items-center gap-2 text-black/60">
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span className="text-[12px] font-semibold">Notion</span>
                  </div>
                  <div className="flex items-center gap-2 text-black/60">
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span className="text-[12px] font-semibold">Linear</span>
                  </div>
                  <div className="flex items-center gap-2 text-black/60">
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span className="text-[12px] font-semibold">Replit</span>
                  </div>
                </div>
              </div>

              {/* ─────────────────────────────────────
                  Ratings
              ───────────────────────────────────── */}

              <div className="mt-8 flex flex-col items-center justify-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
                <p className="text-[12px] font-semibold text-black/70">
                  4.9/5 from 2,340+ reviews on G2
                </p>
              </div>

              {/* ─────────────────────────────────────
                  Bottom tagline
              ───────────────────────────────────── */}

              <p className="mt-8 text-[9px] uppercase tracking-[0.15em] text-black/35 font-medium">
                No setup required · Works with all your tools · Instant results
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Timeline item component
───────────────────────────────────────────── */

function TimelineItem({ 
  time, 
  task, 
  color,
  duration,
  focused 
}: { 
  time: string
  task: string
  color: string
  duration: string
  focused: boolean
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-black/[0.08] bg-white p-4 transition-all hover:border-black/[0.15] hover:bg-white hover:shadow-sm">
      <div className={`h-3 w-1.5 flex-shrink-0 rounded-full ${color}`} />
      <div className="flex-1 text-left">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-semibold text-black">{task}</p>
          <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${focused ? 'text-emerald-600' : 'text-red-500'}`}>
            {focused ? '✓ Focused' : 'Distracted'}
          </span>
        </div>
        <div className="mt-1 flex gap-4 text-[12px] text-black/55">
          <span>{time}</span>
          <span>•</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Trust item
───────────────────────────────────────────── */

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-50 text-emerald-600">
        <CheckIcon />
      </span>

      <span className="text-[11px] font-medium text-black/60">
        {text}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */

function SparkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />

      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h13" />

      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}