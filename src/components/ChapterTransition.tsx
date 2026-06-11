"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FR-010.2 / design.md §6.3: Terminal command transition.
 * Listens for `chapter-nav` events, plays `> cd /chapter` typing overlay,
 * scrolls to target mid-transition, dissolves.
 */
const CHAPTER_RESPONSES: Record<string, string> = {
  hero: "Rebooting interface...",
  about: "Loading intelligence archive...",
  skills: "Mapping skill constellation...",
  experience: "Decrypting classified records...",
  projects: "Opening project vault...",
  contact: "Establishing secure channel...",
};

export default function ChapterTransition() {
  const [visible, setVisible] = useState(false);
  const [cmd, setCmd] = useState("");
  const [response, setResponse] = useState("");
  const [barProgress, setBarProgress] = useState(0);
  const busyRef = useRef(false);

  useEffect(() => {
    const onNav = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (busyRef.current) return;
      busyRef.current = true;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        document.getElementById(id)?.scrollIntoView();
        busyRef.current = false;
        return;
      }

      const fullCmd = `> cd /${id === "hero" ? "" : id}`;
      setCmd("");
      setResponse("");
      setBarProgress(0);
      setVisible(true);

      const timers: ReturnType<typeof setTimeout>[] = [];

      // Phase 2: type command (80ms/char)
      fullCmd.split("").forEach((_, i) => {
        timers.push(
          setTimeout(() => setCmd(fullCmd.slice(0, i + 1)), 300 + i * 55)
        );
      });

      const typeDone = 300 + fullCmd.length * 55;

      // Phase 3: response + progress bar
      timers.push(
        setTimeout(() => {
          setResponse(CHAPTER_RESPONSES[id] ?? "Loading...");
        }, typeDone + 150)
      );
      timers.push(setTimeout(() => setBarProgress(100), typeDone + 300));

      // Scroll while screen is covered
      timers.push(
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
            if (lenis) lenis.scrollTo(el, { immediate: true, force: true });
            else el.scrollIntoView();
          }
        }, typeDone + 450)
      );

      // Phase 4: dissolve
      timers.push(
        setTimeout(() => {
          setVisible(false);
          busyRef.current = false;
        }, typeDone + 800)
      );
    };

    window.addEventListener("chapter-nav", onNav);
    return () => window.removeEventListener("chapter-nav", onNav);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[90] flex items-center justify-center transition-all duration-300 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0 blur-sm"
      }`}
      style={{ background: "rgba(5, 5, 16, 0.96)" }}
    >
      <div className="font-mono-ui w-[min(480px,85vw)] text-[15px] text-[#06B6D4]">
        <div>
          {cmd}
          <span className="blink">_</span>
        </div>
        {response && (
          <div className="mt-2 text-[13px] text-[#475569]">{response}</div>
        )}
        {response && (
          <div className="mt-3 h-[3px] w-full overflow-hidden rounded bg-[#0F0F28]">
            <div
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] transition-all duration-200 ease-out"
              style={{ width: `${barProgress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
