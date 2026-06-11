"use client";

import { useEffect, useRef, useState } from "react";
import { BOOT_LINES } from "@/lib/data";

/**
 * FR-001: Full-screen terminal boot animation.
 * Plays once per session (sessionStorage), skippable via any key/click,
 * total ~4s, then fades out and reveals the app.
 */
export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setExiting(true);
      setTimeout(onDone, 650);
    };

    // Reveal lines progressively across ~3.2s, progress bar alongside
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
          setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        }, 350 + i * 420)
      );
    });

    timers.push(setTimeout(() => setShowSkip(true), 1000));
    timers.push(setTimeout(finish, 4000));

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone]);

  const filled = Math.round((progress / 100) * 28);

  return (
    <div
      aria-label="System boot sequence — press any key to skip"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050510] transition-opacity duration-[600ms] ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="font-mono-ui w-[min(640px,90vw)] text-[14px] leading-[1.8] text-[#06B6D4]">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-[#67E8F9]">█</span>
            <span
              className={
                line.startsWith("IDENTITY") || line.startsWith("CLEARANCE")
                  ? "text-[#A78BFA]"
                  : line === "SYSTEM READY"
                  ? "text-[#10B981] font-medium"
                  : ""
              }
            >
              {line}
            </span>
          </div>
        ))}
        <div className="mt-3 flex items-center gap-3">
          <span className="text-[#475569]">[</span>
          <span className="tracking-[-0.1em]">
            {"▰".repeat(filled)}
            <span className="text-[#1e293b]">{"▱".repeat(28 - filled)}</span>
          </span>
          <span className="text-[#475569]">]</span>
          <span className="text-[#67E8F9] w-12 text-right">{progress}%</span>
        </div>
        <span className="blink inline-block mt-2">█</span>
      </div>

      <div
        className={`absolute bottom-10 left-0 right-0 text-center font-mono-ui text-[11px] tracking-[0.3em] text-[#475569] transition-opacity duration-500 ${
          showSkip ? "opacity-100" : "opacity-0"
        }`}
      >
        [ PRESS ANY KEY TO SKIP ]
      </div>
    </div>
  );
}
