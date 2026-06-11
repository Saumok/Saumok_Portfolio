"use client";

import { useEffect, useRef } from "react";

/**
 * FR-002.9: Glowing cursor with a short color trail.
 * Desktop pointer:fine only; disabled for reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    document.body.classList.add("custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const trails = trailRefs.current;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    const trailPos = trails.map(() => ({ x: -100, y: -100 }));
    let raf: number;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as HTMLElement;
      hovering = !!t.closest("a, button, [role='button'], input, textarea, .interactive");
    };

    const loop = () => {
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px) scale(${hovering ? 1.6 : 1})`;
      ring.style.borderColor = hovering ? "rgba(6,182,212,0.8)" : "rgba(124,58,237,0.6)";

      let px = mx;
      let py = my;
      trailPos.forEach((p, i) => {
        p.x += (px - p.x) * 0.35;
        p.y += (py - p.y) * 0.35;
        const el = trails[i];
        el.style.transform = `translate(${p.x - 3}px, ${p.y - 3}px)`;
        el.style.opacity = String(0.5 - i * 0.08);
        px = p.x;
        py = p.y;
      });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] hidden md:block">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="absolute h-[6px] w-[6px] rounded-full"
          style={{
            background: i % 2 ? "#06B6D4" : "#7C3AED",
            filter: "blur(1px)",
          }}
        />
      ))}
      <div
        ref={ringRef}
        className="absolute h-8 w-8 rounded-full border transition-[border-color] duration-200"
        style={{ borderColor: "rgba(124,58,237,0.6)" }}
      />
      <div
        ref={dotRef}
        className="absolute h-2 w-2 rounded-full bg-white"
        style={{ boxShadow: "0 0 10px #7C3AED, 0 0 20px #7C3AED" }}
      />
    </div>
  );
}
