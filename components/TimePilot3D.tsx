"use client";

type TimePilot3DProps = {
  progress?: number;
  pending?: number;
  completed?: number;
  active?: boolean;
};

export default function TimePilot3D({
  progress = 0,
  pending = 0,
  completed = 0,
  active = false,
}: TimePilot3DProps) {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#10080B] p-5"
      aria-label={`Progress: ${safeProgress}% — ${completed} completed, ${pending} pending`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Today&apos;s progress
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {safeProgress}%
          </p>
        </div>

        <span
          className={`flex h-2 w-2 rounded-full ${
            active ? "animate-pulse bg-amber-300" : "bg-emerald-400"
          }`}
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-amber-300 transition-[width] duration-700"
          style={{ width: `${safeProgress}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
          <p className="text-[10px] text-slate-500">Completed</p>
          <p className="mt-1 text-base font-semibold text-white">{completed}</p>
        </div>

        <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
          <p className="text-[10px] text-slate-500">Pending</p>
          <p className="mt-1 text-base font-semibold text-white">{pending}</p>
        </div>
      </div>
    </div>
  );
}