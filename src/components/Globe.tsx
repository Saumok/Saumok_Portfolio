"use client";

import { useEffect, useRef } from "react";

export interface GlobePin {
  name: string;
  lat: number;
  lon: number;
  color: string;
  label?: string;
}

export interface GlobeArc {
  from: { lat: number; lon: number };
  to: { lat: number; lon: number };
  color: string;
}

/**
 * Dot-matrix data globe (canvas 2D) — orthographic projection, slow rotation,
 * glowing location pins, great-circle transmission arcs with traveling pulses.
 * Used in About (FR-003.5) and Experience (FR-005.2/3).
 */
export default function Globe({
  pins = [],
  arcs = [],
  className = "",
}: {
  pins?: GlobePin[];
  arcs?: GlobeArc[];
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
    });
    io.observe(canvas);

    // Fibonacci sphere points
    const N = 700;
    const pts: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    const toXYZ = (lat: number, lon: number) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + 180) * Math.PI) / 180;
      return {
        x: -Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    };

    const slerp = (
      a: { x: number; y: number; z: number },
      b: { x: number; y: number; z: number },
      t: number
    ) => {
      const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
      const omega = Math.acos(dot);
      if (omega < 1e-5) return { ...a };
      const so = Math.sin(omega);
      const f1 = Math.sin((1 - t) * omega) / so;
      const f2 = Math.sin(t * omega) / so;
      // Lift arc above surface
      const lift = 1 + Math.sin(t * Math.PI) * 0.25;
      return {
        x: (a.x * f1 + b.x * f2) * lift,
        y: (a.y * f1 + b.y * f2) * lift,
        z: (a.z * f1 + b.z * f2) * lift,
      };
    };

    const pinXYZ = pins.map((p) => ({ ...p, v: toXYZ(p.lat, p.lon) }));
    const arcXYZ = arcs.map((a) => ({
      color: a.color,
      from: toXYZ(a.from.lat, a.from.lon),
      to: toXYZ(a.to.lat, a.to.lon),
    }));

    /* Gentle sway instead of a full spin — a continuous rotation carried the
       pins to the far hemisphere half the time. This keeps Kolkata, Chengdu
       and Melbourne on the visible side at all times while the globe still
       feels alive. */
    const ROT_BASE = 3.3; // hemisphere centered on South/East Asia + Oceania
    const ROT_AMP = 0.4;
    let rot = ROT_BASE;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!running) return;

      const w = canvas.width;
      const h = canvas.height;
      const R = Math.min(w, h) * 0.36;
      const cx = w / 2;
      const cy = h / 2;
      rot = ROT_BASE + Math.sin(now * 0.00022) * ROT_AMP;

      ctx.clearRect(0, 0, w, h);

      const project = (v: { x: number; y: number; z: number }) => {
        const x = v.x * Math.cos(rot) - v.z * Math.sin(rot);
        const z = v.x * Math.sin(rot) + v.z * Math.cos(rot);
        return { sx: cx + x * R, sy: cy - v.y * R, z };
      };

      // Sphere halo
      const grad = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.25);
      grad.addColorStop(0, "rgba(6,182,212,0.06)");
      grad.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Dots
      for (const p of pts) {
        const { sx, sy, z } = project(p);
        if (z < -0.15) continue;
        const a = 0.08 + (z + 0.15) * 0.32;
        ctx.fillStyle = `rgba(103,232,249,${a.toFixed(3)})`;
        const size = (0.8 + z * 0.8) * dpr;
        ctx.fillRect(sx, sy, size, size);
      }

      // Arcs with pulses
      arcXYZ.forEach((arc, ai) => {
        ctx.strokeStyle = arc.color + "55";
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= 48; i++) {
          const v = slerp(arc.from, arc.to, i / 48);
          const { sx, sy, z } = project(v);
          if (z < -0.2) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(sx, sy);
            started = true;
          } else ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        // Traveling pulse — full traversal in 2s
        const t = ((now / 2000 + ai * 0.5) % 1 + 1) % 1;
        const pv = slerp(arc.from, arc.to, t);
        const pp = project(pv);
        if (pp.z > -0.2) {
          ctx.fillStyle = arc.color;
          ctx.shadowColor = arc.color;
          ctx.shadowBlur = 12 * dpr;
          ctx.beginPath();
          ctx.arc(pp.sx, pp.sy, 2.4 * dpr, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Pins — never fully culled; fade if they drift toward the limb
      ctx.font = `600 ${11 * dpr}px monospace`;
      for (const p of pinXYZ) {
        const { sx, sy, z } = project(p.v);
        const alpha = z > 0.05 ? 1 : Math.max(0.35, (z + 0.45) / 0.5);
        ctx.globalAlpha = alpha;
        const pulse = 1 + Math.sin(now / 400) * 0.25;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 14 * dpr;
        ctx.beginPath();
        ctx.arc(sx, sy, 3 * dpr * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(248,250,252,0.92)";
        ctx.fillText(p.name.toUpperCase(), sx + 8 * dpr, sy + 3 * dpr);
        ctx.globalAlpha = 1;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [pins, arcs]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      role="img"
      aria-label="Globe showing Kolkata, Chengdu and Melbourne with live transmission arcs"
    />
  );
}
