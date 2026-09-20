"use client";

import { useMemo } from "react";

type Star = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

export default function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 8,
      drift: -60 + Math.random() * 120,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute top-[-5%] rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.75)]"
          style={
            {
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `tp-fall ${star.duration}s linear ${star.delay}s infinite`,
              "--tp-drift": `${star.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}

      <style jsx>{`
        @keyframes tp-fall {
          0% {
            transform: translate(0, -10vh);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tp-drift, 0px), 115vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}