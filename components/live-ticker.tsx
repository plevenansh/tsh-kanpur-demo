"use client";

import { useEffect, useRef } from "react";
import { liveActivity } from "@/lib/mock-data";

export function LiveTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-neutral-950 text-white overflow-hidden border-b border-neutral-800">
      <div className="flex items-center">
        <div className="shrink-0 bg-lime-400 text-black text-xs font-bold px-4 py-2.5 uppercase tracking-wider z-10">
          Live
        </div>
        <div className="overflow-hidden flex-1 relative">
          <div className="flex gap-0 animate-[ticker_35s_linear_infinite]" ref={trackRef}>
            {[...liveActivity, ...liveActivity].map((item, i) => (
              <span key={i} className="whitespace-nowrap text-sm text-neutral-300 px-6 py-2.5 border-r border-neutral-800">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
